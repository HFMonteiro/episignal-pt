from __future__ import annotations

import os
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Sequence

import pandas as pd


class RWorkerBridgeError(RuntimeError):
    """Raised when the local R bridge cannot execute a signal detection method."""


def _resolve_rscript_executable() -> str:
    explicit = os.environ.get("SIGNAL_DETECTION_RSCRIPT")
    if explicit:
        return explicit

    for candidate in ("Rscript", "Rscript.exe"):
        resolved = shutil.which(candidate)
        if resolved:
            return resolved

    if os.name == "nt":
        program_files = os.environ.get("ProgramFiles")
        if program_files:
            r_root = Path(program_files) / "R"
            if r_root.exists():
                candidates = sorted(r_root.glob("R-*/bin/Rscript.exe"), reverse=True)
                if candidates:
                    return str(candidates[0])

    raise RWorkerBridgeError(
        "Rscript executable not found. Set SIGNAL_DETECTION_RSCRIPT or install Rscript on PATH."
    )


def _normalize_requested_method(method: str) -> str:
    normalized = method.strip().lower()
    if normalized == "glm":
        return "glm mean"
    return normalized


def _coerce_optional_bool(value: object) -> object:
    if pd.isna(value):
        return None
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        normalized = value.strip().upper()
        if normalized == "TRUE":
            return True
        if normalized == "FALSE":
            return False
    if hasattr(value, "item"):
        extracted = value.item()
        if isinstance(extracted, bool):
            return extracted
    return bool(value)


def _normalize_output_frame(frame: pd.DataFrame) -> pd.DataFrame:
    result = frame.copy()

    for column in ("alarms", "alarm"):
        if column in result.columns:
            result[column] = result[column].map(_coerce_optional_bool)

    return result


def run_r_signal_detection(
    raw_data: pd.DataFrame,
    method: str,
    number_of_weeks: int,
    alpha_upper: float = 0.05,
    stratification: Sequence[str] | None = None,
) -> pd.DataFrame:
    normalized_method = _normalize_requested_method(method)
    export_script = Path(__file__).resolve().parents[3] / "r-worker" / "export_golden_outputs.R"
    if not export_script.exists():
        raise RWorkerBridgeError(f"R bridge script not found: {export_script}")

    if number_of_weeks < 1:
        raise ValueError("number_of_weeks must be a positive integer")
    if not 0.001 <= float(alpha_upper) <= 0.2:
        raise ValueError("alpha_upper must be between 0.001 and 0.2")

    with tempfile.TemporaryDirectory(prefix="signal-detection-r-") as tmpdir:
        tmpdir_path = Path(tmpdir)
        input_csv = tmpdir_path / "input.csv"
        output_csv = tmpdir_path / "output.csv"

        raw_data.to_csv(input_csv, index=False)

        command = [
            _resolve_rscript_executable(),
            str(export_script),
            str(input_csv),
            str(output_csv),
            normalized_method,
            str(int(number_of_weeks)),
        ]

        if stratification:
            command.append(",".join(str(value) for value in stratification))

        command.append(str(float(alpha_upper)))

        completed = subprocess.run(command, capture_output=True, text=True, check=False)
        if completed.returncode != 0:
            detail = completed.stderr.strip() or completed.stdout.strip() or "R bridge failed without diagnostics"
            raise RWorkerBridgeError(f"R bridge failed for method '{method}': {detail}")

        if not output_csv.exists() or output_csv.stat().st_size == 0:
            return pd.DataFrame()

        try:
            frame = pd.read_csv(output_csv)
        except pd.errors.EmptyDataError:
            return pd.DataFrame()

        return _normalize_output_frame(frame)
