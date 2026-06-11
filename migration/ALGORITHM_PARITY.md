# Algorithm parity plan

This document defines the minimum standard before this project can claim parity with the original Shiny/R Signal Detection Tool.

## Current status

| Method | Current runtime | Status | Operational use |
| --- | --- | --- | --- |
| EARS | Python prototype | Known-series R fixtures for C1/C2/C3 | No |
| CUSUM | Python prototype | Known-series R fixture | No |
| FarringtonFlexible | R bridge required | Tail known-series R fixture | Yes, via R bridge |
| GLM | R bridge required | GLM mean tail known-series R fixture | Yes, via R bridge |

The frontend may display all methods when enough historical weeks are available. EARS and CUSUM remain native Python worker candidates with known-series fixture checks only. FarringtonFlexible and GLM are delegated to the local R bridge and must continue to match the approved golden tests.

## Golden fixtures currently present

| Method | Fixture coverage | Fixture file |
| --- | --- | --- |
| CUSUM | Reset known-series R output | `migration/python-worker/tests/fixtures/cusum_known_series_r_output.csv` |
| EARS C1 | Known-series R output | `migration/python-worker/tests/fixtures/ears_c1_known_series_r_output.csv` |
| EARS C2 | Known-series R output | `migration/python-worker/tests/fixtures/ears_c2_known_series_r_output.csv` |
| EARS C3 | Known-series R output | `migration/python-worker/tests/fixtures/ears_c3_known_series_r_output.csv` |
| FarringtonFlexible | Tail known-series R output | `migration/python-worker/tests/fixtures/farrington_tail_known_series_r_output.csv` |
| GLM mean | Tail known-series R output | `migration/python-worker/tests/fixtures/glm_mean_tail_known_series_r_output.csv` |

## Golden test datasets

Create a fixture set with:

- Minimal valid line-list with stable weekly counts.
- Final-week spike producing a clear alarm.
- No-alarm baseline.
- Missing ISO weeks requiring zero-filled weekly grids.
- Multiple pathogens.
- Multiple strata: district, age_group, sex.
- Sparse strata with no cases in the detection period.
- Short-history datasets for method availability rules.

Each fixture must include:

- Raw input file.
- Parameters: method, number_of_weeks, filters, strata, alpha where applicable.
- Expected R output exported as CSV/JSON.
- Tolerance rules for floating point fields.

## Required comparisons

For each method and fixture:

- Same ISO year/week sequence.
- Same case counts after preprocessing and filtering.
- Same detection-period rows.
- Same alarm flags.
- Expected and upperbound values within documented tolerance.
- Same stratum labels and missing-value handling.

## Acceptance threshold

Parity can be claimed only when:

1. R outputs are generated from the original repository without manual edits.
2. Python/worker outputs match all golden fixtures.
3. Any numerical differences are documented and approved.
4. CI runs parity tests automatically.
5. The UI labels the method as validated only after the parity suite passes.

Until then, reports must state that native outputs are prototype results and that R-backed methods are delegated through the local bridge.
