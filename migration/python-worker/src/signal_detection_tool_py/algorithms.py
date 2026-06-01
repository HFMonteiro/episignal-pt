from __future__ import annotations

from dataclasses import dataclass
from statistics import NormalDist
from typing import Literal

import numpy as np
import pandas as pd

from .processing import aggregate_data, filter_by_date, preprocess_data
from .r_bridge import run_r_signal_detection

NativeMethod = Literal["ears", "cusum"]
NativeEarsMethod = Literal["C1", "C2", "C3"]

METHOD_PARITY_STATUS: dict[str, dict[str, object]] = {
    "ears": {
        "runtime": "python",
        "status": "prototype",
        "parity": "pending_golden_tests",
        "golden_fixtures": [
            "ears_c1_known_series_r_output.csv",
            "ears_c2_known_series_r_output.csv",
            "ears_c3_known_series_r_output.csv",
        ],
        "notes": "Native Python EARS detector aligned with SignalDetectionTool's surveillance::earsC wrapper. Golden fixture coverage is partial.",
    },
    "cusum": {
        "runtime": "python",
        "status": "prototype",
        "parity": "pending_golden_tests",
        "golden_fixtures": ["cusum_known_series_r_output.csv"],
        "notes": "Native Python CUSUM candidate aligned with the R reset variant and standard transformation. Golden fixtures are still required before operational use.",
    },
    "farrington": {
        "runtime": "r_worker_required",
        "status": "available_via_r_bridge",
        "parity": "golden_fixture_supported",
        "r_method": "farrington",
        "golden_fixtures": ["farrington_tail_known_series_r_output.csv"],
        "notes": "Executed through the local R bridge and the installed SignalDetectionTool package. This is not a native Python port.",
    },
    "glm": {
        "runtime": "r_worker_required",
        "status": "available_via_r_bridge",
        "parity": "golden_fixture_supported",
        "r_method": "glm mean",
        "golden_fixtures": ["glm_mean_tail_known_series_r_output.csv"],
        "notes": "Executed through the local R bridge using the default GLM mean model in the installed SignalDetectionTool package.",
    },
}


@dataclass(frozen=True)
class SignalDetectionConfig:
    method: str = "ears"
    number_of_weeks: int = 6
    alpha_upper: float = 0.05
    date_var: str = "date_report"
    date_start: str | None = None
    date_end: str | None = None
    date_ext: str | None = None
    stratification: tuple[str, ...] = ()
    include_unstratified: bool = True


def _pad_detection_columns(data: pd.DataFrame) -> pd.DataFrame:
    result = data.copy()
    result["alarms"] = pd.NA
    result["upperbound"] = np.nan
    result["expected"] = np.nan
    return result


def _normal_upper_quantile(alpha: float) -> float:
    if not 0 < alpha < 1:
        raise ValueError("alpha must be strictly between 0 and 1")
    return float(NormalDist().inv_cdf(1 - alpha))


def _safe_sample_std(values: np.ndarray, min_sigma: float) -> float:
    if values.size < 2:
        return float(max(0.0, min_sigma))
    sigma = float(np.std(values, ddof=1))
    if np.isnan(sigma):
        sigma = 0.0
    return float(max(sigma, min_sigma))


def detect_ears(
    data_aggregated: pd.DataFrame,
    number_of_weeks: int = 52,
    baseline: int = 7,
    k: float = 3.0,
    method: NativeEarsMethod = "C1",
    min_sigma: float = 0.0,
    alpha: float | None = None,
) -> pd.DataFrame | None:
    """Run a native Python EARS detector aligned with surveillance::earsC.

    The implementation follows SignalDetectionTool's wrapper around
    ``surveillance::earsC``:
    - C1/C2/C3 use alpha = 0.001 unless explicitly overridden.
    - C1/C2 require a minimum baseline of 7 values by default.
    - C3 uses the two-lag extension described in the R source.

    ``k`` is retained for backwards compatibility with the previous prototype
    signature but is no longer used by the default implementation.
    """

    total_weeks = len(data_aggregated)
    calibration_weeks = total_weeks - number_of_weeks
    method = method.upper()
    if method not in {"C1", "C2", "C3"}:
        raise ValueError(f"Unsupported EARS method: {method}")

    if baseline < 3:
        raise ValueError("Minimum baseline to use is 3.")

    if calibration_weeks < 0:
        return None

    min_calibration_weeks = {
        "C1": baseline,
        "C2": baseline + 2,
        "C3": baseline + 4,
    }[method]
    if calibration_weeks < min_calibration_weeks:
        return None

    result = _pad_detection_columns(data_aggregated)
    cases = result["cases"].astype(float).to_numpy()
    start = total_weeks - number_of_weeks
    alpha_value = alpha if alpha is not None else 0.001
    z_alpha = _normal_upper_quantile(alpha_value)

    if method in {"C1", "C2"}:
        lag = 0 if method == "C1" else 2
        for index in range(start, total_weeks):
            ref_start = index - baseline - lag
            ref_end = index - lag
            baseline_values = cases[ref_start:ref_end]
            if baseline_values.size < baseline:
                return None
            expected = float(np.mean(baseline_values))
            sigma = _safe_sample_std(baseline_values, min_sigma)
            upperbound = expected + z_alpha * sigma
            result.loc[index, "upperbound"] = upperbound
            result.loc[index, "alarms"] = bool(cases[index] > upperbound)
        return result

    # C3: use the C2 statistic over the two-day lagged window and propagate it
    # over the monitored period as in the surveillance R source.
    range_c2_start = start - 2
    if range_c2_start < 0:
        return None

    c2_indices = list(range(range_c2_start, total_weeks))
    c2_values: list[float] = []
    c2_sigmas: list[float] = []

    for index in c2_indices:
        ref_start = index - baseline - 2
        ref_end = index - 2
        baseline_values = cases[ref_start:ref_end]
        if baseline_values.size < baseline:
            return None
        expected = float(np.mean(baseline_values))
        sigma = _safe_sample_std(baseline_values, min_sigma)
        c2_sigmas.append(sigma)
        with np.errstate(divide="ignore", invalid="ignore"):
            c2_values.append(float(np.divide(cases[index] - expected, sigma)))

    for position in range(2, len(c2_indices)):
        index = c2_indices[position]
        lag2 = float(np.maximum(0.0, c2_values[position - 2] - 1.0))
        lag1 = float(np.maximum(0.0, c2_values[position - 1] - 1.0))
        sigma = c2_sigmas[position]
        upperbound = float(np.maximum(0.0, cases[index] + sigma * (z_alpha - (lag2 + lag1))))
        result.loc[index, "upperbound"] = upperbound
        result.loc[index, "alarms"] = pd.NA if np.isnan(upperbound) else bool(cases[index] > upperbound)

    return result


def detect_cusum(
    data_aggregated: pd.DataFrame,
    number_of_weeks: int = 52,
    k: float = 1.04,
    h: float = 2.26,
) -> pd.DataFrame | None:
    """Run the CUSUM-with-reset detector ported from the R package shape."""

    total_weeks = len(data_aggregated)
    calibration_weeks = total_weeks - number_of_weeks
    if calibration_weeks <= 0:
        return None

    result = _pad_detection_columns(data_aggregated)
    cases = result["cases"].astype(float).to_numpy()
    start = total_weeks - number_of_weeks
    mean_baseline = float(np.mean(cases[:start]))

    if mean_baseline <= 0:
        mean_baseline = 1e-9

    cusum = 0.0
    for index in range(start, total_weeks):
        previous_cusum = cusum
        standardized = (cases[index] - mean_baseline) / np.sqrt(mean_baseline)
        cusum = max(0.0, previous_cusum + standardized - k)
        alarm = cusum >= h
        upperbound = np.ceil(np.sqrt(mean_baseline) * (h + k - previous_cusum) + mean_baseline)
        result.loc[index, "upperbound"] = max(0.0, float(upperbound))
        result.loc[index, "alarms"] = bool(alarm)
        if alarm:
            cusum = 0.0

    return result


def _run_native_method(data_aggregated: pd.DataFrame, method: NativeMethod, number_of_weeks: int) -> pd.DataFrame | None:
    if method == "ears":
        return detect_ears(data_aggregated, number_of_weeks=number_of_weeks)
    if method == "cusum":
        return detect_cusum(data_aggregated, number_of_weeks=number_of_weeks)
    raise ValueError(f"Unsupported native method: {method}")


def _with_metadata(
    data: pd.DataFrame,
    method: str,
    number_of_weeks: int,
    alpha_upper: float | None,
    category: str | None,
    stratum: object | None,
) -> pd.DataFrame:
    result = data.copy()
    result["category"] = category
    result["stratum"] = None if stratum == "NA" else stratum
    result["method"] = method
    result["number_of_weeks"] = number_of_weeks
    result["alpha_upper"] = alpha_upper
    return result


def run_signal_detection(raw_data: pd.DataFrame, config: SignalDetectionConfig) -> pd.DataFrame:
    method = config.method.strip().lower()

    if method in {"farrington", "glm"} or method.startswith("glm "):
        return run_r_signal_detection(
            raw_data,
            method=method,
            number_of_weeks=config.number_of_weeks,
            alpha_upper=config.alpha_upper,
            stratification=config.stratification,
        )

    preprocessed = preprocess_data(raw_data)

    outputs: list[pd.DataFrame] = []

    if config.include_unstratified:
        filtered = filter_by_date(preprocessed, config.date_var, config.date_start, config.date_end)
        aggregated = aggregate_data(
            filtered,
            date_var=config.date_var,
            date_start=config.date_start,
            date_end=config.date_end,
            date_ext=config.date_ext,
        )
        results = _run_native_method(aggregated, method, config.number_of_weeks)
        if results is not None:
            outputs.append(_with_metadata(results, method, config.number_of_weeks, config.alpha_upper, None, None))

    for category in config.stratification:
        filtered = filter_by_date(preprocessed, config.date_var, config.date_start, config.date_end)
        aggregated = aggregate_data(
            filtered,
            date_var=config.date_var,
            date_start=config.date_start,
            date_end=config.date_end,
            date_ext=config.date_ext,
            group=category,
        )
        for stratum, group_data in aggregated.groupby(category, dropna=False, sort=False):
            group_data = group_data.drop(columns=[category]).reset_index(drop=True)
            if group_data.tail(config.number_of_weeks)["cases"].sum() == 0:
                empty = _pad_detection_columns(group_data)
                empty.loc[empty.tail(config.number_of_weeks).index, "alarms"] = False
                outputs.append(_with_metadata(empty, method, config.number_of_weeks, config.alpha_upper, category, stratum))
                continue

            results = _run_native_method(group_data, method, config.number_of_weeks)
            if results is not None:
                outputs.append(_with_metadata(results, method, config.number_of_weeks, config.alpha_upper, category, stratum))

    if not outputs:
        return pd.DataFrame()
    return pd.concat(outputs, ignore_index=True)
