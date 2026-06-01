"""Prepare a lightweight municipality GeoJSON asset from a local CAOP file.

This script intentionally does not download CAOP. Operators must obtain the
official DGT/CAOP source file and confirm the attribution/licence terms for the
selected release before committing generated geometry.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert a local CAOP source file to web GeoJSON.")
    parser.add_argument("--source", required=True, help="Path to local CAOP GeoPackage/Shapefile.")
    parser.add_argument("--output", required=True, help="Output GeoJSON path for the web app.")
    parser.add_argument("--layer", default=None, help="Optional source layer name. Use ogrinfo to inspect layers.")
    parser.add_argument("--where", default=None, help="Optional OGR SQL/where filter for municipality features.")
    parser.add_argument("--simplify", default="0.001", help="OGR simplification tolerance. Default: 0.001.")
    return parser.parse_args()


def require_tool(name: str) -> str:
    path = shutil.which(name)
    if not path:
        raise SystemExit(
            f"Missing required tool: {name}. Install GDAL and ensure {name} is available on PATH."
        )
    return path


def main() -> None:
    args = parse_args()
    source = Path(args.source)
    output = Path(args.output)

    if not source.exists():
        raise SystemExit(f"Source file does not exist: {source}")

    ogr2ogr = require_tool("ogr2ogr")
    output.parent.mkdir(parents=True, exist_ok=True)

    command = [
        ogr2ogr,
        "-f",
        "GeoJSON",
        "-t_srs",
        "EPSG:4326",
        "-simplify",
        args.simplify,
        str(output),
        str(source),
    ]

    if args.where:
        command.extend(["-where", args.where])
    if args.layer:
        command.append(args.layer)

    subprocess.run(command, check=True)

    manifest = {
        "source": str(source),
        "output": str(output),
        "layer": args.layer,
        "where": args.where,
        "simplify": args.simplify,
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "tool": "ogr2ogr",
        "licence_note": "Confirm DGT/CAOP release terms before committing generated geometry.",
    }
    manifest_path = output.with_suffix(output.suffix + ".manifest.json")
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
