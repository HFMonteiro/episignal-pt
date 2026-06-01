# episignal-pt

`episignal-pt` is a local-first prototype for epidemiological signal detection workflows in Portugal.

It is inspired by the open-source [United4Surveillance Signal Detection Tool](https://github.com/United4Surveillance/signal-detection-tool) and by the ECDC EpiSignalDetection methodological context, but it is an independent proposal. It is not an official ECDC, United4Surveillance, DGS, INSA, SNS, or public-authority tool.

The repository may be published publicly for transparency and review, provided this attribution, license notice, synthetic-data warning, and non-endorsement notice remain visible.

## Purpose

- Explore a browser-first surveillance workflow for infectious-disease signal detection.
- Replicate relevant concepts from the original Shiny/R workflow in a modern local web app.
- Use fully synthetic Portuguese demo data for interaction, visualisation, and algorithm-parity work.
- Prepare a Python/R worker path for validated execution of FarringtonFlexible, GLM, EARS, and CUSUM methods.
- Document governance, privacy, and methodological limits before any real data is considered.
- Explore future district-to-municipality drill-down views for local public-health analysis.

## Current status

This repository is a technical prototype.

- The web app is under `apps/web`.
- The Python/R migration work is under `migration/`.
- The bundled sample is synthetic and contains no real cases, no real patients, no identifiable health data, and no official surveillance records.
- FarringtonFlexible and GLM are intended to run through the local R bridge where available.
- EARS and CUSUM remain native prototype paths pending further operational hardening and parity review.

Do not interpret demo counts, alarms, or maps as epidemiological evidence.

## Local run

```powershell
cd apps\web
npm install
npm run build
npm run start
```

Open:

```text
http://localhost:8090/?lang=pt&section=signals
```

For development:

```powershell
cd apps\web
npm run dev
```

## Worker and R bridge

The local web prototype can be used without a configured worker, but validated model execution depends on the migration worker and R dependencies.

Expected direction:

- Python worker: `migration/python-worker`
- R parity/export helpers: `migration/r-worker`
- R-backed methods: FarringtonFlexible and GLM
- Native prototype methods: EARS and CUSUM

If `Rscript` or required R packages are unavailable, R-backed methods should fail cleanly with actionable instructions rather than silently falling back to a different algorithm.

## Relationship to the upstream project

This project is inspired by and partially derived from the MIT-licensed United4Surveillance Signal Detection Tool. Upstream code, documentation, and methodological concepts remain attributed to their original authors.

The local proposal differs from the upstream project by focusing on:

- Portuguese-facing browser workflow;
- synthetic Portuguese sample data;
- Next.js frontend;
- Python/R worker migration path;
- explicit governance and data-protection framing;
- local packaging and future containerised deployment.
- planned district-to-municipality map drill-down for Portuguese geography.

If changes are intended for the upstream project, they should be contributed through the upstream process: fork, branch from the appropriate upstream development branch, add tests, update release notes when required, and open a pull request for review.

## Governance and privacy

Real healthcare or administrative data must not be used in this prototype without a defined legal basis, DPIA or equivalent risk assessment, data minimisation, access controls, audit logging, retention policy, and operational security review.

Any real line-list should be pseudonymised before processing. Production use would require private storage, role-based access, auditable jobs, and validated model outputs.

## Attribution and licensing

The upstream Signal Detection Tool is licensed under MIT. See `LICENSE.md` and `NOTICE.md`.

This repository keeps upstream attribution and adds local proposal documentation. This README is not legal advice; institutional or public release should receive legal and governance review.
