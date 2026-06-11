from __future__ import annotations

import pandas as pd
from fastapi.testclient import TestClient

from signal_detection_tool_py.api import app
from signal_detection_tool_py import (
    METHOD_PARITY_STATUS,
    aggregate_data,
    check_raw_surveillance_data,
    detect_cusum,
    detect_ears,
    preprocess_data,
)


def _sample_line_list() -> pd.DataFrame:
    dates = [
        "2024-01-01",
        "2024-01-08",
        "2024-01-15",
        "2024-01-22",
        "2024-01-29",
        "2024-02-05",
        "2024-02-12",
        "2024-02-19",
        "2024-02-26",
        "2024-03-04",
        "2024-03-11",
        "2024-03-18",
    ]
    rows = []
    for index, date_report in enumerate(dates, start=1):
        rows.append(
            {
                "case_id": f"case-{index}",
                "date_report": date_report,
                "country": "Portugal",
                "country_id": "PT",
                "pathogen": "Example pathogen",
                "age": 30,
                "sex": "female",
                "outbreak_status": "no",
            }
        )

    for extra in range(20):
        rows.append(
            {
                "case_id": f"spike-{extra}",
                "date_report": "2024-03-18",
                "country": "Portugal",
                "country_id": "PT",
                "pathogen": "Example pathogen",
                "age": 30,
                "sex": "female",
                "outbreak_status": "yes",
            }
        )
    return pd.DataFrame(rows)


def test_raw_schema_accepts_minimal_valid_data() -> None:
    errors = check_raw_surveillance_data(_sample_line_list())
    assert errors == []


def test_raw_schema_rejects_duplicate_case_id() -> None:
    data = _sample_line_list()
    data.loc[1, "case_id"] = data.loc[0, "case_id"]
    assert "Duplicate case_id in data" in check_raw_surveillance_data(data)


def test_preprocess_adds_iso_columns_and_age_group() -> None:
    data = preprocess_data(_sample_line_list())
    assert "date_report_year" in data.columns
    assert "date_report_week" in data.columns
    assert data["age_group"].iloc[0] == "30-34"
    assert data["date_report"].isna().sum() == 0


def test_aggregate_data_fills_iso_week_grid() -> None:
    raw = _sample_line_list()
    raw = raw.loc[raw["date_report"] != "2024-02-12"].copy()
    data = preprocess_data(raw)
    aggregated = aggregate_data(data)
    missing_week = aggregated.loc[(aggregated["year"] == 2024) & (aggregated["week"] == 7)]
    assert int(missing_week["cases"].iloc[0]) == 0


def test_ears_detects_large_final_spike() -> None:
    aggregated = aggregate_data(preprocess_data(_sample_line_list()))
    results = detect_ears(aggregated, number_of_weeks=3)
    assert results is not None
    assert bool(results["alarms"].iloc[-1]) is True


def test_cusum_returns_detection_period_flags() -> None:
    aggregated = aggregate_data(preprocess_data(_sample_line_list()))
    results = detect_cusum(aggregated, number_of_weeks=3)
    assert results is not None
    assert results["alarms"].tail(3).notna().all()


def test_method_parity_registry_is_explicit() -> None:
    assert METHOD_PARITY_STATUS["ears"]["parity"] == "pending_golden_tests"
    assert METHOD_PARITY_STATUS["cusum"]["parity"] == "pending_golden_tests"
    assert METHOD_PARITY_STATUS["farrington"]["runtime"] == "r_worker_required"
    assert METHOD_PARITY_STATUS["farrington"]["status"] == "available_via_r_bridge"
    assert METHOD_PARITY_STATUS["farrington"]["r_method"] == "farrington"
    assert METHOD_PARITY_STATUS["glm"]["runtime"] == "r_worker_required"
    assert METHOD_PARITY_STATUS["glm"]["status"] == "available_via_r_bridge"
    assert METHOD_PARITY_STATUS["glm"]["r_method"] == "glm mean"
    assert "farrington_tail_known_series_r_output.csv" in METHOD_PARITY_STATUS["farrington"]["golden_fixtures"]
    assert "glm_mean_tail_known_series_r_output.csv" in METHOD_PARITY_STATUS["glm"]["golden_fixtures"]


def test_methods_endpoint_exposes_bridge_metadata() -> None:
    client = TestClient(app)
    response = client.get("/methods")
    assert response.status_code == 200

    payload = response.json()
    assert payload["available_methods"] == ["ears", "cusum", "farrington", "glm"]
    assert payload["parity_status"]["ears"]["golden_fixtures"] == [
        "ears_c1_known_series_r_output.csv",
        "ears_c2_known_series_r_output.csv",
        "ears_c3_known_series_r_output.csv",
    ]
    assert payload["parity_status"]["cusum"]["golden_fixtures"] == ["cusum_known_series_r_output.csv"]
    assert payload["parity_status"]["farrington"]["status"] == "available_via_r_bridge"
    assert payload["parity_status"]["glm"]["r_method"] == "glm mean"
    all_fixtures = [
        fixture
        for method in payload["parity_status"].values()
        for fixture in method["golden_fixtures"]
    ]
    assert sorted(all_fixtures) == sorted(
        [
            "cusum_known_series_r_output.csv",
            "ears_c1_known_series_r_output.csv",
            "ears_c2_known_series_r_output.csv",
            "ears_c3_known_series_r_output.csv",
            "farrington_tail_known_series_r_output.csv",
            "glm_mean_tail_known_series_r_output.csv",
        ]
    )


def test_root_redirects_to_ui() -> None:
    client = TestClient(app)
    response = client.get("/", allow_redirects=False)
    assert response.status_code in {307, 308}
    assert response.headers["location"] == "/ui"
