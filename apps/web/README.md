# episignal-pt web

Next.js front-end for the private `episignal-pt` local proposal.

This app is an independent Portuguese-facing prototype inspired by the United4Surveillance Signal Detection Tool. It is not an official ECDC, United4Surveillance, DGS, INSA, SNS, or public-authority tool.

## Local run

```powershell
cd C:\Users\hugof\agentplayground\episignalPT\apps\web
npm install
npm run dev
```

Open `http://127.0.0.1:8090/?lang=pt&section=signals`.

## Supabase support

Copy `.env.example` to `.env.local` and set:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_WORKER_API_URL=http://127.0.0.1:8088
```

The demo runs without Supabase credentials. When configured, the app can be extended to upload raw files to private Supabase Storage buckets and persist job metadata using the schema in `migration/supabase/schema.sql`.

The bundled PT sample is synthetic. It does not contain real cases, real patients, identifiable health data, or official surveillance records.

## Expected input structure

Minimum line-list fields:

- `case_id`
- `date_report`
- `country`
- `country_id`
- `pathogen`
- either `age` or `age_group`

Useful optional fields:

- `sex`
- `state/state_id`
- `county/county_id`
- `community/community_id`
- `outbreak_status`
- other dates such as `date_onset`, `date_hospitalization`, `date_death`

The web demo and Python worker aggregate by ISO year/week from `date_report`. The web demo only shows crude rates per 100k when an explicit denominator is available; uploads without a population table remain counts-only. The Python worker still counts cases.

## Data model

Supabase tables are defined in `migration/supabase/schema.sql`:

- `projects`
- `datasets`
- `analysis_jobs`
- `signal_results`
- `report_artifacts`

Storage buckets:

- `signal-uploads`
- `signal-reports`
- `signal-exports`

All buckets are private and RLS is enabled for the tables. Object paths should be scoped by user id.

## Vercel

This app is deployable from the `apps/web` root directory. In Vercel, set the same environment variables and keep the Python/R worker outside Vercel for production computation.

Current deployment:

- Production: https://web-gamma-six-32.vercel.app
- Project: `h-monteiro-s-projects/web`

Supabase Marketplace connection is blocked until the Vercel account accepts the Supabase integration terms in the browser.
