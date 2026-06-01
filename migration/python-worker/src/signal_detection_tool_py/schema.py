from __future__ import annotations

import re
from collections.abc import Iterable

import pandas as pd

MANDATORY_COLUMNS = {"case_id", "date_report", "country", "country_id", "pathogen"}
AGE_COLUMNS = {"age", "age_group"}
SEX_LEVELS = {"male", "female", "diverse", "unknown", "", None}
YES_NO_UNKNOWN_COLUMNS = {"hospitalization", "death", "vaccination", "outbreak_status"}
YES_NO_UNKNOWN_LEVELS = {"yes", "no", "unknown", "", None}
REGION_COLUMNS = (
    "country",
    "state",
    "county",
    "community",
    "region_level1",
    "region_level2",
    "region_level3",
)
REGION_ID_COLUMNS = (
    "country_id",
    "state_id",
    "county_id",
    "community_id",
    "region_level1_id",
    "region_level2_id",
    "region_level3_id",
)
DATE_RE = re.compile(r"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$")
AGE_GROUP_RE = re.compile(r"^<?\d+[-_—]?\d*$|^\d+[+]$|^>\d+$")


def _is_missing(value: object) -> bool:
    if pd.isna(value):
        return True
    if isinstance(value, str):
        return value.strip() in {"", "NA"}
    return False


def _normalised_strings(series: pd.Series) -> pd.Series:
    return series.map(lambda value: None if pd.isna(value) else str(value).strip().lower())


def _column_is_empty(series: pd.Series) -> bool:
    return bool(series.map(_is_missing).all())


def _remove_empty_columns(data: pd.DataFrame) -> pd.DataFrame:
    keep = [name for name in data.columns if not _column_is_empty(data[name])]
    return data.loc[:, keep].copy()


def _check_levels(data: pd.DataFrame, column: str, allowed: Iterable[object]) -> list[str]:
    if column not in data.columns:
        return []

    allowed_values = set(allowed)
    values = _normalised_strings(data[column])
    bad_values = sorted({value for value in values if value not in allowed_values})
    if bad_values:
        return [f"{column} contains unsupported values: {', '.join(map(str, bad_values))}"]
    return []


def _check_iso_dates(data: pd.DataFrame, column: str) -> list[str]:
    values = data[column]
    invalid = []
    for index, value in values.items():
        if _is_missing(value) or str(value).strip().lower() == "unknown":
            continue
        if isinstance(value, pd.Timestamp):
            continue
        text = str(value).strip()
        if not DATE_RE.match(text):
            invalid.append(index)
            continue
        try:
            pd.to_datetime(text, format="%Y-%m-%d", errors="raise")
        except (TypeError, ValueError):
            invalid.append(index)

    if invalid:
        return [f"{column} is not valid ISO 8601 YYYY-MM-DD in {len(invalid)} row(s)"]
    return []


def _check_age_group(data: pd.DataFrame) -> list[str]:
    if "age_group" not in data.columns:
        return []

    invalid = []
    values = data["age_group"]
    for index, value in values.items():
        if _is_missing(value) or str(value).strip().lower() == "unknown":
            continue
        if not AGE_GROUP_RE.match(str(value).strip()):
            invalid.append(index)

    if invalid:
        return ["age_group does not follow the required interval format"]
    return []


def _check_region_consistency(data: pd.DataFrame) -> list[str]:
    errors: list[str] = []
    for region, region_id in zip(REGION_COLUMNS, REGION_ID_COLUMNS, strict=True):
        if region not in data.columns or region_id not in data.columns:
            continue

        pairs = data[[region_id, region]].dropna().drop_duplicates()
        duplicated_ids = pairs[region_id].duplicated(keep=False)
        if duplicated_ids.any():
            errors.append(
                f"{region_id} maps to multiple values in {region}; check region spelling or coding"
            )
    return errors


def check_raw_surveillance_data(data: pd.DataFrame) -> list[str]:
    """Validate the raw line-list schema before preprocessing.

    This intentionally mirrors the R package checks, with two stricter behaviours:
    columns that are present but completely empty count as missing, and invalid
    calendar dates are rejected rather than only regex-checked.
    """

    errors: list[str] = []

    if data.empty:
        return ["Loaded data is empty"]

    empty_rows = data.apply(lambda row: all(_is_missing(value) for value in row), axis=1)
    if empty_rows.any():
        errors.append("Empty rows in the data")

    data = _remove_empty_columns(data)

    missing_columns = sorted(column for column in MANDATORY_COLUMNS if column not in data.columns)
    if missing_columns:
        errors.extend(f"Missing mandatory column '{column}'" for column in missing_columns)

    if not AGE_COLUMNS.intersection(data.columns):
        errors.append("Missing mandatory column 'age or age_group'")

    if "case_id" in data.columns:
        case_id = data["case_id"]
        if case_id.map(_is_missing).any():
            errors.append("Missing/empty case_ids inside data")
        if case_id.duplicated().any():
            errors.append("Duplicate case_id in data")

    for column in [name for name in data.columns if name.startswith("date")]:
        errors.extend(_check_iso_dates(data, column))

    if "age" in data.columns:
        age = pd.to_numeric(data["age"], errors="coerce")
        non_missing_original = ~data["age"].map(_is_missing)
        if age[non_missing_original].isna().any() or (age.dropna() % 1 != 0).any():
            errors.append("age is not an integer")

    errors.extend(_check_age_group(data))
    errors.extend(_check_levels(data, "sex", SEX_LEVELS))

    for column in YES_NO_UNKNOWN_COLUMNS.intersection(data.columns):
        errors.extend(_check_levels(data, column, YES_NO_UNKNOWN_LEVELS))

    errors.extend(_check_region_consistency(data))
    return errors

