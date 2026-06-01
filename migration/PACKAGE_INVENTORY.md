# Package inventory and parity constraints

This note records what is currently available locally and what that means for algorithm parity with the original Shiny/R Signal Detection Tool.

## Local Python worker

Declared dependencies in `migration/python-worker/pyproject.toml`:

| Area | Packages |
| --- | --- |
| Core computation | `numpy`, `pandas` |
| API | `fastapi`, `python-multipart`, `uvicorn[standard]` |
| Tests | `pytest` |

Observed installed worker packages include `fastapi`, `numpy`, `pandas`, `pydantic`, `pytest`, `starlette`, `uvicorn`, and their runtime dependencies.

Not currently available in the Python worker environment:

- `scipy`
- `statsmodels`
- `rpy2`
- an R runtime on `PATH`

R is installed on the machine at `C:\Program Files\R\R-4.6.0\bin\Rscript.exe`. The installed R library includes `SignalDetectionTool`, `surveillance`, and `dplyr`, so golden outputs can be generated with an absolute `Rscript.exe` path even though `Rscript` is not on `PATH`.

## Original R/Shiny dependencies

The upstream `DESCRIPTION` imports include:

`bslib`, `checkmate`, `config`, `dplyr`, `DT`, `flexdashboard`, `flextable`, `ggforce`, `ggplot2`, `golem`, `htmlwidgets`, `ISOweek`, `lubridate`, `magrittr`, `plotly`, `purrr`, `readr`, `readxl`, `rlang`, `rmarkdown`, `markdown`, `scales`, `sf`, `shiny`, `shinybusy`, `shinyjs`, `shinyvalidate`, `shinyWidgets`, `stringr`, `surveillance`, `tidyr`, `forcats`, `plyr`, `base64enc`, and `zip`.

Suggested packages include `aeddo`, `knitr`, `spelling`, `testthat`, `DBI`, and `RSQLite`.

## Algorithm implications

| Method | Current Python feasibility | Parity position |
| --- | --- | --- |
| CUSUM | Feasible with `numpy/pandas`; formula has been ported from the R implementation shape. | Needs R golden output comparison before operational use. |
| EARS | A simple EARS-style detector is feasible. Exact parity with `surveillance::earsC` is not guaranteed without R golden fixtures or a statistical dependency plan. | Prototype only. |
| FarringtonFlexible | Not credible as a blind Python rewrite with the current package set. The R code delegates to `surveillance::farringtonFlexible`. | Use an R worker or a separately validated port. |
| GLM | Not credible as a blind Python rewrite with the current package set. The R implementation includes seasonal, Fourier and intervention variants. | Use an R worker or add a tested statistical stack. |

## Practical next step

Use the absolute Rscript path to run the golden-output harness in `migration/r-worker/export_golden_outputs.R`. Those outputs should become fixtures for the Python worker tests before changing any UI status from prototype to validated.

The first CUSUM fixture has been generated from the installed R package and added under `migration/python-worker/tests/fixtures/cusum_known_series_r_output.csv`.
