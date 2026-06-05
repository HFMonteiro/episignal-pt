# Episomer preview and integration contract

This project does not vendor or execute the ECDC Episomer package yet. The current page is a preview and browser-side contract for aggregated digital epidemic intelligence signals.

It is not a live dashboard. It does not collect posts, current news, raw social media content, personal data, or open-source intelligence feeds.

## Authoritative upstream

- ECDC public page: <https://www.ecdc.europa.eu/en/publications-data/episomer>
- GitHub repository: <https://github.com/EU-ECDC/episomer>
- Licence: EUPL-1.2 for Episomer upstream code.

## Boundary

Episomer signals are social media epidemic intelligence signals. They must not be treated as notified cases, incidence numerators, denominators, or outbreak confirmation.

Current news and EIOS-style event feeds are adjacent epidemic intelligence sources, but they are not the same integration. If added later, they should use a separate connector, source label, review workflow and governance record.

The `episignal-pt` case-based signal workflow remains separate:

- formal case line-list: `case_id`, `date_report`, `pathogen`, geography, age/sex and optional denominator;
- digital aggregate: topic, place, period, post volume, expected volume, threshold, alert and review status.

## Aggregate contract

The frontend expects aggregated rows, not raw posts:

| Field | Meaning |
|---|---|
| `topic` | Disease, syndrome, hazard or monitored keyword group |
| `location` | Review geography; not a case residence field |
| `date` | Daily or weekly aggregation date |
| `posts_observed` | Post count after collection, filtering and deduplication |
| `posts_expected` | Expected digital baseline |
| `threshold` | Upper digital signal threshold |
| `alert` | Whether observed volume exceeds threshold |
| `review_status` | `new`, `watch`, `escalated` or `dismissed` |
| `source` | Social source or demo source |
| `geolocation_quality` | Confidence tier for location assignment |
| `signal_score` | Sorting score for review workload; not clinical risk |

## Future R worker

A real worker should call Episomer through R and return only aggregated records matching this contract. It should not expose API tokens, raw social posts, direct identifiers or the local Episomer database to the browser.

Minimum worker endpoints:

- `GET /episomer/status`: R/Episomer availability, configured sources and last run metadata.
- `POST /episomer/search`: topic, keyword set, geography, period, source and threshold configuration for a live collection/refresh request.
- `POST /episomer/aggregate`: topic/location/date aggregates for a selected period.
- `POST /episomer/export`: reviewed aggregates for audit/reporting.

Minimum live metadata:

- worker status: `offline`, `ready`, `running`, `error`;
- source: `Bluesky`, other social API, or `Demo`;
- collection period and timestamp of the last successful run;
- topic and keyword version used;
- geolocation confidence tier;
- processing warnings and data-protection status.

Before operational use, confirm licence compatibility, data protection basis, retention, audit logging, deletion workflow and human review governance.
