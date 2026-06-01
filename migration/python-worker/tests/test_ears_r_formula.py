from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd

from signal_detection_tool_py import detect_ears


FIXTURES = Path(__file__).parent / "fixtures"


def _series(cases: list[int]) -> pd.DataFrame:
    return pd.DataFrame(
        {
            "year": [2024] * len(cases),
            "week": list(range(1, len(cases) + 1)),
            "cases": cases,
        }
    )


def _assert_matches_fixture(actual: pd.DataFrame, fixture_name: str) -> None:
    expected = pd.read_csv(FIXTURES / fixture_name)
    actual_alarms = [None if pd.isna(value) else bool(value) for value in actual["alarms"]]
    expected_alarms = [None if pd.isna(value) else bool(value) for value in expected["alarms"]]

    assert actual["year"].tolist() == expected["year"].tolist()
    assert actual["week"].tolist() == expected["week"].tolist()
    assert actual["cases"].tolist() == expected["cases"].tolist()
    assert actual_alarms == expected_alarms
    np.testing.assert_allclose(
        actual["upperbound"].astype(float).to_numpy(),
        expected["upperbound"].astype(float).to_numpy(),
        equal_nan=True,
        rtol=0,
        atol=1e-9,
    )
    assert actual["expected"].isna().equals(expected["expected"].isna())


def test_ears_c1_matches_r_golden_fixture() -> None:
    results = detect_ears(_series([1] * 11 + [8]), number_of_weeks=3, method="C1")

    assert results is not None
    _assert_matches_fixture(results, "ears_c1_known_series_r_output.csv")


def test_ears_c2_matches_r_golden_fixture() -> None:
    results = detect_ears(_series([1] * 9 + [5, 1, 1, 1, 8]), number_of_weeks=3, method="C2")

    assert results is not None
    _assert_matches_fixture(results, "ears_c2_known_series_r_output.csv")


def test_ears_c3_matches_r_golden_fixture() -> None:
    results = detect_ears(_series([1] * 9 + [5, 1, 1, 1, 1, 1, 8]), number_of_weeks=3, method="C3")

    assert results is not None
    _assert_matches_fixture(results, "ears_c3_known_series_r_output.csv")
