from __future__ import annotations

from datetime import date
from typing import Iterable

import pandas as pd

from .schema import (
    REGION_ID_COLUMNS,
    YES_NO_UNKNOWN_COLUMNS,
    _is_missing,
    _remove_empty_columns,
)

MISSING_TOKENS = {"", "unknown", "NA", "na"}


def _parse_date(value: object) -> pd.Timestamp | pd.NaT:
    if pd.isna(value):
        return pd.NaT
    if isinstance(value, pd.Timestamp):
        return value.normalize()
    text = str(value).strip()
    if text in MISSING_TOKENS:
        return pd.NaT
    return pd.to_datetime(text, format="%Y-%m-%d", errors="coerce")


def _age_to_group(age: object) -> str | None:
    if pd.isna(age):
        return None
    value = int(age)
    if value < 0 or value >= 115:
        return None
    lower = (value // 5) * 5
    upper = lower + 4
    return f"{lower:02d}-{upper:02d}"


def preprocess_data(data: pd.DataFrame) -> pd.DataFrame:
    """Prepare a surveillance line list for weekly signal detection."""

    result = _remove_empty_columns(data).copy()

    character_columns = [
        column
        for column in result.columns
        if pd.api.types.is_object_dtype(result[column]) or pd.api.types.is_string_dtype(result[column])
    ]
    for column in character_columns:
        result[column] = result[column].map(
            lambda value: None if pd.isna(value) else str(value).strip()
        )

    lower_columns = YES_NO_UNKNOWN_COLUMNS.intersection(result.columns)
    if "sex" in result.columns:
        lower_columns.add("sex")
    for column in lower_columns:
        result[column] = result[column].map(
            lambda value: None if pd.isna(value) else str(value).strip().lower()
        )

    for column in character_columns:
        result[column] = result[column].map(
            lambda value: None if value in MISSING_TOKENS else value
        )

    date_columns = [column for column in result.columns if column.startswith("date")]
    for column in date_columns:
        result[column] = result[column].map(_parse_date)

    result = result.loc[~result["date_report"].isna()].copy()

    for column in REGION_ID_COLUMNS:
        if column in result.columns:
            result[column] = result[column].astype("string")

    if "age" in result.columns:
        result["age"] = pd.to_numeric(result["age"], errors="coerce")
        result.loc[(result["age"] < 0) | (result["age"] >= 115), "age"] = pd.NA

    if "age_group" not in result.columns and "age" in result.columns:
        result.insert(result.columns.get_loc("age") + 1, "age_group", result["age"].map(_age_to_group))

    for column in date_columns:
        iso = result[column].dt.isocalendar()
        result[f"{column}_year"] = iso["year"].astype("Int64")
        result[f"{column}_week"] = iso["week"].astype("Int64")

    return result


def filter_by_date(
    data: pd.DataFrame,
    date_var: str = "date_report",
    date_start: date | str | None = None,
    date_end: date | str | None = None,
) -> pd.DataFrame:
    result = data.copy()
    if date_start is not None:
        start = pd.to_datetime(date_start)
        result = result.loc[result[date_var] >= start]
    if date_end is not None:
        end = pd.to_datetime(date_end)
        result = result.loc[result[date_var] <= end]
    return result


def iso_weeks_between(date_start: date | str, date_end: date | str) -> pd.DataFrame:
    start_ts = pd.to_datetime(date_start)
    end_ts = pd.to_datetime(date_end)
    start_iso = start_ts.isocalendar()
    end_iso = end_ts.isocalendar()
    start_monday = pd.Timestamp.fromisocalendar(start_iso.year, start_iso.week, 1)
    end_monday = pd.Timestamp.fromisocalendar(end_iso.year, end_iso.week, 1)

    weeks = pd.date_range(start_monday, end_monday, freq="W-MON")
    iso = weeks.isocalendar()
    return pd.DataFrame({"year": iso["year"].to_numpy(), "week": iso["week"].to_numpy()})


def _complete_week_grid(
    weeks: pd.DataFrame,
    groups: Iterable[object] | None,
    group: str | None,
) -> pd.DataFrame:
    if group is None:
        return weeks.copy()

    group_values = pd.DataFrame({group: list(groups or [])})
    if group_values.empty:
        return weeks.assign(**{group: pd.Series(dtype="object")})
    return weeks.merge(group_values, how="cross")


def aggregate_data(
    data: pd.DataFrame,
    date_var: str = "date_report",
    date_start: date | str | None = None,
    date_end: date | str | None = None,
    date_ext: date | str | None = None,
    group: str | None = None,
) -> pd.DataFrame:
    """Aggregate a preprocessed line list into complete ISO-week case counts."""

    if data.empty:
        raise ValueError("Cannot aggregate an empty dataset")

    start = pd.to_datetime(date_start) if date_start is not None else data[date_var].min()
    end = pd.to_datetime(date_end) if date_end is not None else data[date_var].max()
    if date_ext is not None:
        end = pd.to_datetime(date_ext)

    working = data.copy()
    iso = working[date_var].dt.isocalendar()
    working["year"] = iso["year"].astype(int)
    working["week"] = iso["week"].astype(int)

    group_values = None
    if group is not None:
        working[group] = working[group].astype("object").where(~working[group].isna(), "NA")
        group_values = sorted(working[group].drop_duplicates().tolist(), key=lambda value: str(value))

    grouping = ["year", "week"] + ([group] if group else [])
    counts = working.groupby(grouping, dropna=False).size().reset_index(name="cases")

    if "outbreak_status" in working.columns:
        outbreak = (
            working.assign(cases_in_outbreak=working["outbreak_status"].eq("yes").astype(int))
            .groupby(grouping, dropna=False)["cases_in_outbreak"]
            .sum()
            .reset_index()
        )
        counts = counts.merge(outbreak, on=grouping, how="left")

    weeks = iso_weeks_between(start, end)
    grid = _complete_week_grid(weeks, group_values, group)
    result = grid.merge(counts, on=grouping, how="left")
    result["cases"] = result["cases"].fillna(0).astype(int)
    if "cases_in_outbreak" in result.columns:
        result["cases_in_outbreak"] = result["cases_in_outbreak"].fillna(0).astype(int)

    return result.sort_values(grouping).reset_index(drop=True)

