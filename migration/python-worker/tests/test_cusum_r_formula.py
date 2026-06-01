from __future__ import annotations

import numpy as np
import pandas as pd

from signal_detection_tool_py import detect_cusum


def _known_series() -> pd.DataFrame:
    return pd.DataFrame(
        {
            "year": [2024] * 10,
            "week": list(range(1, 11)),
            "cases": [1, 1, 1, 1, 1, 1, 1, 1, 6, 1],
        }
    )


def test_cusum_matches_r_reset_formula_for_known_series() -> None:
    results = detect_cusum(_known_series(), number_of_weeks=2)

    assert results is not None
    detection = results.tail(2).reset_index(drop=True)
    assert detection["upperbound"].tolist() == [5.0, 5.0]
    assert detection["alarms"].tolist() == [True, False]
    assert np.isnan(detection["expected"].astype(float)).all()


def test_cusum_matches_r_golden_fixture() -> None:
    fixture_path = __file__.replace("test_cusum_r_formula.py", "fixtures/cusum_known_series_r_output.csv")
    expected = pd.read_csv(fixture_path).tail(2).reset_index(drop=True)

    results = detect_cusum(_known_series(), number_of_weeks=2)

    assert results is not None
    actual = results.tail(2).reset_index(drop=True)
    assert actual["year"].tolist() == expected["year"].tolist()
    assert actual["week"].tolist() == expected["week"].tolist()
    assert actual["cases"].tolist() == expected["cases"].tolist()
    assert actual["alarms"].tolist() == expected["alarms"].tolist()
    assert actual["upperbound"].tolist() == expected["upperbound"].tolist()
