from __future__ import annotations

import os
import shutil
import subprocess
import sys
from io import StringIO
from pathlib import Path

import numpy as np
import pandas as pd
import pytest


FIXTURES = Path(__file__).parent / "fixtures"
DEFAULT_WINDOWS_RSCRIPT = Path(r"C:\Program Files\R\R-4.6.0\bin\Rscript.exe")
RUN_R_REFERENCE_TESTS = os.environ.get("RUN_R_REFERENCE_TESTS", "").strip().lower() in {"1", "true", "yes"}

pytestmark = pytest.mark.skipif(
    not RUN_R_REFERENCE_TESTS,
    reason="R reference fixture tests are opt-in; set RUN_R_REFERENCE_TESTS=1 to execute local Rscript.",
)


def _rscript_path() -> str | None:
    configured = os.environ.get("RSCRIPT")
    if configured:
        return configured
    discovered = shutil.which("Rscript")
    if discovered:
        return discovered
    if DEFAULT_WINDOWS_RSCRIPT.exists():
        return str(DEFAULT_WINDOWS_RSCRIPT)
    return None


def _run_r_reference(expression: str) -> pd.DataFrame:
    rscript = _rscript_path()
    if rscript is None:
        pytest.skip("Rscript is not available")

    check = subprocess.run(
        [rscript, "-e", "cat(requireNamespace('SignalDetectionTool', quietly=TRUE))"],
        check=True,
        capture_output=True,
        text=True,
    )
    if check.stdout.strip() != "TRUE":
        pytest.skip("SignalDetectionTool is not installed in the active R library")

    completed = subprocess.run(
        [rscript, "-e", expression],
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        if sys.platform == "win32" and completed.returncode == 3221225477:
            pytest.skip("Rscript crashed while running SignalDetectionTool from pytest on Windows")
        completed.check_returncode()
    return pd.read_csv(StringIO(completed.stdout))


def _known_aggregated_series_r_call(method_call: str) -> str:
    return f"""
library(SignalDetectionTool)
data_aggregated <- data.frame(
  year=rep(2020:2023, each=52),
  week=rep(1:52, 4),
  cases=rep(c(rep(1,51),8),4)
)
results <- {method_call}
write.csv(tail(results, 8), stdout(), row.names=FALSE, na='')
"""


def _assert_frame_matches_fixture(actual: pd.DataFrame, fixture_name: str) -> None:
    expected = pd.read_csv(FIXTURES / fixture_name)
    assert actual["year"].tolist() == expected["year"].tolist()
    assert actual["week"].tolist() == expected["week"].tolist()
    assert actual["cases"].tolist() == expected["cases"].tolist()

    for column in ["alarms"]:
        actual_values = [None if pd.isna(value) else bool(value) for value in actual[column]]
        expected_values = [None if pd.isna(value) else bool(value) for value in expected[column]]
        assert actual_values == expected_values

    for column in set(actual.columns).intersection({"upperbound", "expected", "expected_pad"}):
        np.testing.assert_allclose(
            actual[column].astype(float).to_numpy(),
            expected[column].astype(float).to_numpy(),
            equal_nan=True,
            rtol=0,
            atol=1e-9,
        )


def test_farrington_reference_fixture_matches_installed_r_package() -> None:
    actual = _run_r_reference(
        _known_aggregated_series_r_call(
            "SignalDetectionTool:::get_signals_farringtonflexible(data_aggregated, number_of_weeks=3, alpha_upper=0.05)"
        )
    )

    _assert_frame_matches_fixture(actual, "farrington_tail_known_series_r_output.csv")


def test_glm_mean_reference_fixture_matches_installed_r_package() -> None:
    actual = _run_r_reference(
        _known_aggregated_series_r_call(
            "SignalDetectionTool:::get_signals_glm(data_aggregated, number_of_weeks=3, model='mean', time_trend=FALSE, alpha_upper=0.05)"
        )
    )

    _assert_frame_matches_fixture(actual, "glm_mean_tail_known_series_r_output.csv")
