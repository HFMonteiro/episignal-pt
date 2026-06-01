"""Prepare a lightweight municipality SVG-path asset from a local CAOP file.

The script intentionally does not download CAOP. Operators must obtain the
official DGT/CAOP source file and confirm the attribution/licence terms for the
selected release before committing generated geometry.
"""

from __future__ import annotations

import argparse
import json
import unicodedata
from pathlib import Path

import geopandas as gpd
from shapely.geometry import MultiPolygon, Polygon


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert a local CAOP GeoPackage to a web TypeScript SVG-path asset.")
    parser.add_argument("--source", required=True, help="Path to local CAOP GeoPackage.")
    parser.add_argument("--output", default="apps/web/src/lib/ptMunicipalityMap.ts", help="Output TypeScript asset path.")
    parser.add_argument("--layer", default="cont_municipios", help="Source municipality layer name.")
    parser.add_argument("--simplify", type=float, default=1800.0, help="Simplification tolerance in source CRS units/metres.")
    return parser.parse_args()


def ascii_name(value: object) -> str:
    return "".join(ch for ch in unicodedata.normalize("NFKD", str(value)) if not unicodedata.combining(ch))


def make_point_transform(bounds: tuple[float, float, float, float], width: float, height: float):
    minx, miny, maxx, maxy = bounds
    scale = min(width / (maxx - minx), height / (maxy - miny))
    render_w = (maxx - minx) * scale
    render_h = (maxy - miny) * scale
    pad_x = (width - render_w) / 2
    pad_y = (height - render_h) / 2

    def point(x: float, y: float) -> tuple[float, float]:
        sx = pad_x + (x - minx) * scale
        sy = pad_y + (maxy - y) * scale
        return round(sx, 2), round(sy, 2)

    return point


def ring_to_path(coords, point) -> str:
    points = [point(x, y) for x, y, *_ in coords]
    if len(points) < 3:
        return ""
    parts = [f"M{points[0][0]} {points[0][1]}"]
    last = points[0]
    for current in points[1:]:
        if current != last:
            parts.append(f"L{current[0]} {current[1]}")
            last = current
    parts.append("Z")
    return " ".join(parts)


def geometry_to_path(geometry, point) -> str:
    if geometry is None or geometry.is_empty:
        return ""
    polygons = list(geometry.geoms) if isinstance(geometry, MultiPolygon) else [geometry]
    paths: list[str] = []
    for polygon in polygons:
        if not isinstance(polygon, Polygon):
            continue
        paths.append(ring_to_path(polygon.exterior.coords, point))
        paths.extend(ring_to_path(interior.coords, point) for interior in polygon.interiors)
    return " ".join(path for path in paths if path)


def main() -> None:
    args = parse_args()
    source = Path(args.source)
    output = Path(args.output)

    if not source.exists():
        raise SystemExit(f"Source file does not exist: {source}")

    gdf = gpd.read_file(source, layer=args.layer)
    gdf["geometry"] = gdf.geometry.simplify(args.simplify, preserve_topology=True)

    width = 379.499
    height = 547.489
    point = make_point_transform(tuple(gdf.total_bounds), width, height)

    rows = []
    for row in gdf.sort_values(["distrito_ilha", "municipio"]).itertuples():
        municipality_id = str(row.dtmn)
        rows.append(
            {
                "municipality_id": municipality_id,
                "municipality": row.municipio,
                "district": ascii_name(row.distrito_ilha),
                "districtDisplay": row.distrito_ilha,
                "district_id": municipality_id[:2],
                "path": geometry_to_path(row.geometry, point),
            }
        )

    content = (
        "export type MunicipalityMapShape = {\\n"
        "  municipality_id: string;\\n"
        "  municipality: string;\\n"
        "  district: string;\\n"
        "  districtDisplay: string;\\n"
        "  district_id: string;\\n"
        "  path: string;\\n"
        "};\\n\\n"
        "export const portugalMunicipalityMapMeta = {\\n"
        '  source: "DGT CAOP2025 Continente",\\n'
        '  sourceUrl: "https://www.dgterritorio.gov.pt/atividades/cartografia/cartografia-tematica/caop?language=pt",\\n'
        '  downloadUrl: "https://geo2.dgterritorio.gov.pt/caop/CAOP_Continente_2025-gpkg.zip",\\n'
        f'  layer: "{args.layer}",\\n'
        f"  simplificationMeters: {int(args.simplify)},\\n"
        f'  viewBox: "0 0 {width} {height}"\\n'
        "};\\n\\n"
        "export const portugalMunicipalityShapes: MunicipalityMapShape[] = "
        + json.dumps(rows, ensure_ascii=False, indent=2)
        + ";\\n\\n"
        "export const portugalMunicipalityShapesByDistrict = portugalMunicipalityShapes.reduce<Record<string, MunicipalityMapShape[]>>(\\n"
        "  (current, shape) => {\\n"
        "    current[shape.district] = [...(current[shape.district] ?? []), shape];\\n"
        "    return current;\\n"
        "  },\\n"
        "  {}\\n"
        ");\\n"
    )

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(content, encoding="utf-8")
    print(json.dumps({"rows": len(rows), "output": str(output), "bytes": output.stat().st_size}, indent=2))


if __name__ == "__main__":
    main()
