# Episomer preview and integration contract

This project exposes only a local preview of digital signal monitoring.
The `/episomer` page currently uses:

- synthetic aggregated samples for quick UI checks and schema training, and
- a short public RSS live collector behind `/api/episomer/live` (`seconds` up to 10).

It does **not** collect raw article payloads, article content, identifiers, or personal data in the browser.

The page is for method demonstration and operational rehearsal only.

## Authoritative upstream

- ECDC page: https://www.ecdc.europa.eu/en/publications-data/episomer
- GitHub: https://github.com/EU-ECDC/episomer
- Licence: EUPL-1.2

## Boundary (implemented now)

- `apps/web` implements an interface prototype and transport contracts for aggregated signals.
- `GET /api/episomer/live` performs read-only public RSS lookup and returns only aggregates + article links.
- `GET /api/episomer/status` reports what is available on the current server.
- This is not a notifier or diagnostic system for case confirmation.
- RSS signals are not equivalent to a full epidemiological confirmation pipeline; they are complementary contextual signals.

## Current live endpoint

`GET /api/episomer/live?topic=<query>&seconds=10`

Current behavior:

- query public RSS feeds (Google News RSS endpoint);
- deduplicate article entries;
- aggregate counts by source domain;
- return:
  - synthetic-like aggregates (`posts_observed`, `posts_expected`, `threshold`, `alert`),
  - a short list of article metadata (`title`, `source_domain`, `language`, `url`, `seen_at`),
  - a warning line documenting that this is RSS preview data.

No data persists by default.

## Aggregate contract expected by frontend

The frontend works with aggregated rows, not raw article payloads:

| Field | Meaning |
|---|---|
| `topic` | Disease/symptom/keyword group |
| `location` | Geographic aggregation used for review |
| `date` | Daily/weekly aggregation date |
| `posts_observed` | Number of collected RSS items after filtering |
| `posts_expected` | Baseline expectation |
| `threshold` | Alert threshold |
| `alert` | Observed >= threshold |
| `review_status` | `new`, `watch`, `escalated`, `dismissed` |
| `source` | `Demo` or `OpenNews` |
| `geolocation_quality` | Confidence tier |
| `signal_score` | Sort score for review workload |

## Setup for RSS-only mode

This mode is intentionally lightweight:

- no Bluesky credentials;
- no social media API secrets;
- no external R runtime required for the preview.

Minimum server variables:

```text
EPISOMER_TOPIC_CONFIG_PATH=../../config/episomer/topics.yml
```

Optional governance flags:

```text
EPISOMER_GOV_DATA_PROTECTION_BASIS=false
EPISOMER_GOV_RETENTION_POLICY=false
EPISOMER_GOV_HUMAN_REVIEW=false
EPISOMER_GOV_AUDIT_LOG=false
```

Optional future worker (if you later add a full Episomer backend):

- set `EPISOMER_R_WORKER_URL` and expose the worker URL when you later add a full backend;
- keep credentials in secure server storage only;
- keep strict retention and deletion controls.

## Status endpoint

`GET /api/episomer/status`

Returns:

- `worker_status`: `ready`, `partial`, `offline` (based on checks);
- `source_mode`: now `open_news_only` for this repository configuration;
- checks for RSS source, optional worker, topic config and governance;
- `r_worker_url` when configured;
- `updated_at`, `secrets_redacted: true` and required env list.

## Governance note

Use this page only with explicit project approval for public health production.

Recommended checklist:

- define the evidence value threshold for escalation;
- define who validates and escalates signals in the operational pipeline;
- define retention and deletion policy even for article URLs/metadata;
- keep the page clearly separate from case notification/classification systems.
