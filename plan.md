# EpiSignal PT project plan

Last updated: 2026-05-28

## Current state

This workspace contains a Portuguese-facing prototype migration of the United4Surveillance Signal Detection Tool into a Next.js app with a Python/R migration path.

Implemented so far:

- Next.js web app under `apps/web`.
- Local app target: `http://127.0.0.1:8090/`.
- Python worker prototype under `migration/python-worker`.
- Supabase schema and Vercel structure notes under `migration/`.
- Portuguese synthetic line-list sample with 220 ISO weeks, 2 pathogens and 18 districts.
- Dynamic analytical view with:
  - district SVG map for Portugal mainland districts;
  - age group and sex bar charts;
  - weekly time-series threshold chart;
  - filters for pathogen, district, sex and date range;
  - selectable strata;
  - report artifact export in HTML/JSON;
  - sample CSV export.
- Institutional header with DGS and Governo de Portugal logos.
- PT/EN code path started for header, tabs, principal controls and report/data labels.
- `methodology.md` with methodological and governance notes.
- `migration/ALGORITHM_PARITY.md` with the parity plan.
- `migration/PACKAGE_INVENTORY.md` with Python/R dependency inventory.
- R golden-output harness at `migration/r-worker/export_golden_outputs.R`.
- First CUSUM golden fixture generated from local R `SignalDetectionTool`.
- Python parity tests include CUSUM comparison against the R fixture.

Validation completed:

- `npm run build` passed for `apps/web`.
- Python worker tests passed after adding the CUSUM R fixture.
- R exists locally at `C:\Program Files\R\R-4.6.0\bin\Rscript.exe`.
- R packages `SignalDetectionTool`, `surveillance` and `dplyr` are installed.

Important caveat:

- The browser run on `8090` appeared stale during the final PT/EN/query-string test. The build passed, but the local dev server should be restarted before continuing UI verification.

## What the main tabs are intended to do

### Data

Equivalent to the Shiny `Data` tab. It should load a line-list CSV, validate mandatory fields, show data quality feedback, identify columns not directly used by the current prototype, display uploaded rows, and document the expected dataset variable structure.

Relevant original files:

- `R/mod_tabpanel_data.R`
- `R/data_checks.R`
- `inst/rmd/help_tab.Rmd`

### Input parameters

Equivalent to the Shiny `Input parameters` tab. It should define the analytical dataset subset and model configuration: date range, pathogen, filters, number of detection weeks, possible algorithms based on historical data, p-value cutoff, minimum signal rule and stratification variables.

Relevant original files:

- `R/mod_tabpanel_input.R`
- `R/get_possible_methods.R`
- `R/get_signals.R`
- `inst/rmd/help_tab.Rmd`

### Signals

Equivalent to the Shiny `Signals` tab. It should run detection with the selected parameters and render the main visual/tabled outputs: summary counts, stratified signal graphics, time-series view and signal table.

Relevant original files:

- `R/mod_tabpanel_signals.R`
- `R/plot_time_series.R`
- `R/results_table.R`
- `R/get_signals.R`

### Report

Equivalent to the Shiny `Report` tab. It should generate a downloadable report based on the selected data, filters, methods and stratifications. Original Shiny supports HTML and DOCX through `run_report()`; the Next prototype currently exports Shiny-like HTML and JSON, but true DOCX/HTML parity still requires the R reporting path.

Relevant original files:

- `R/mod_tabpanel_report.R`
- `R/run_report.R`
- `inst/rmd/help_tab.Rmd`

## Next technical priorities

1. Restart local web and worker servers, then retest PT/EN and tab navigation in the in-app browser.
2. Finish PT/EN coverage for all visible UI copy, including chart legends, validation messages, report text and background page.
3. Generate R golden outputs for:
   - EARS;
   - CUSUM with stratification;
   - FarringtonFlexible;
   - GLM variants.
4. Add Python/R parity tests that compare:
   - ISO year/week sequence;
   - case counts;
   - alarm flags;
   - expected values;
   - upper bounds;
   - strata labels and missing-value behaviour.
5. Decide algorithm runtime architecture:
   - keep R worker for FarringtonFlexible/GLM, or
   - introduce a Python statistical stack only after parity fixtures exist.
6. Improve report parity:
   - call R `run_report()` for operational HTML/DOCX output;
   - keep the current Next HTML/JSON export clearly labelled as prototype output.
7. Add governance hardening before any real data:
   - no direct identifiers;
   - private storage;
   - role-based access;
   - audit logging;
   - retention rules;
   - documented legal basis and DPIA/security review.
8. Prepare deployment only when explicitly requested:
   - do not deploy to Vercel until user asks;
   - keep app public/no-login only for synthetic demonstration data;
   - never expose real health data in a public deployment.

## Next-day startup checklist

From `C:\Users\hugof\agentplayground\episignalPT`:

```powershell
cd apps\web
npm run dev
```

From `C:\Users\hugof\agentplayground\episignalPT\migration\python-worker`:

```powershell
.\.venv\Scripts\python.exe -m uvicorn signal_detection_tool_py.api:app --host 127.0.0.1 --port 8088 --reload
```

Verification commands:

```powershell
cd C:\Users\hugof\agentplayground\episignalPT\apps\web
npm run build

cd C:\Users\hugof\agentplayground\episignalPT\migration\python-worker
$env:PYTEST_DISABLE_PLUGIN_AUTOLOAD='1'
.\.venv\Scripts\python.exe -m pytest -q tests\test_worker.py tests\test_cusum_r_formula.py
```

Browser checks:

- `http://127.0.0.1:8090/?lang=pt&section=signals`
- `http://127.0.0.1:8090/?lang=en&section=data`
- `http://127.0.0.1:8090/?lang=en&section=input`
- `http://127.0.0.1:8090/?lang=en&section=report`

## Known limitations

- Not full Shiny parity yet.
- PT/EN implementation is started, not complete across every string.
- EARS is still a Python prototype and not exact `surveillance::earsC` parity.
- FarringtonFlexible and GLM should remain R-worker methods until golden fixtures prove a port.
- The local dev server should be restarted before trusting the latest browser behaviour.
- `apps/`, `migration/`, `methodology.md` and this `plan.md` are currently untracked in git.
