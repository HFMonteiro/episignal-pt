# CAOP municipality map integration

## Decision

Use DGT/CAOP as the canonical source for municipality boundaries.

The application must not embed municipality SVGs copied from Wikimedia Commons or data/code derived from GPL sources unless the project deliberately accepts those licence obligations. This repository is positioned as MIT-compatible, so the safest path is an explicit CAOP import pipeline with source attribution and a generated lightweight asset.

## Source

- Canonical source: Direcao-Geral do Territorio, Carta Administrativa Oficial de Portugal (CAOP).
- Current target: CAOP2025, or a later version selected explicitly before release.
- Download unit: official GeoPackage or Shapefile, preferably GeoPackage.
- Geography level: municipality/concelho.
- Join key: official municipality code, stored in the app as `municipality_id`.

## Output target

The web app consumes a simplified static asset:

- `apps/web/src/lib/ptMunicipalityMap.ts`

The generated file includes only the minimum public attributes needed for rendering and joining:

- `municipality_id`
- `municipality`
- `district_id`
- `district`
- simplified SVG `path`

Do not include personal data, health data, surveillance counts, or operational identifiers in map assets.

## Processing rules

- Keep the raw CAOP download out of Git unless its redistribution terms are explicitly checked.
- Commit only the generated, simplified, attributed derivative if the selected CAOP terms permit it.
- Preserve source version, download date, processing command, and simplification tolerance in a manifest.
- Use `municipality_id` for joins. Names are display labels only and must not be treated as stable identifiers.
- Simplify geometry for web use; do not use survey-grade geometry in the browser.
- Keep mainland, Azores, and Madeira handling explicit. Do not silently drop autonomous regions.

## Local pipeline

The helper script is:

```powershell
python scripts\prepare_caop_municipality_map.py --source C:\path\to\Continente_CAOP2025.gpkg --output apps\web\src\lib\ptMunicipalityMap.ts
```

The script uses `geopandas`/`shapely`, already available in the local Codex Python environment used for this project. It intentionally does not download CAOP itself; the operator must fetch the official source and check attribution/licence terms for the chosen release.

## Why not Wikimedia SVG as the primary source?

Wikimedia municipality SVGs are useful visual references, but common files are under CC BY-SA. Embedding or adapting them can trigger attribution and share-alike obligations that are not aligned with a simple MIT repository unless handled deliberately.

## Why not GEO API PT as an embedded source?

GEO API PT is useful for lookup and operational APIs, but its documentation identifies GPL v3.0 licensing. Embedding derived code/data in this MIT-positioned repository should be avoided unless the licence implications are intentionally accepted.

## Status

Current app state:

- District SVG map exists.
- Municipality drilldown uses DGT CAOP2025 Mainland Portugal municipality geometry simplified to SVG paths.
- Case counts remain synthetic demonstration data.
- Azores and Madeira geometry are not yet bundled.

Next implementation step:

- Extend the same pipeline to Azores and Madeira if the application scope moves beyond mainland districts.
