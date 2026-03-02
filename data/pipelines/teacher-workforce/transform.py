"""
Teacher Workforce — transform.py

Parses DfE teacher vacancy and pupil-teacher ratio CSVs.
Outputs national time series for the Education page.

Output: data/output/teacher-workforce/teacher_workforce.json
"""

import json
import logging
from datetime import datetime
from pathlib import Path

import pandas as pd

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "teacher-workforce"
OUTPUT_DIR = ROOT / "data" / "output" / "teacher-workforce"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ── Helpers ────────────────────────────────────────────────────────────────────

def period_to_fy(tp):
    """Convert '201011' → '2010/11'."""
    s = str(tp)
    return f"{s[:4]}/{s[4:]}"


def safe_float(v):
    if pd.isna(v):
        return None
    s = str(v).replace(",", "").strip()
    if s in ("", "x", "z", "c", "low", "supp"):
        return None
    try:
        return float(s)
    except ValueError:
        return None


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    # 1. Teacher vacancies
    vac_path = RAW_DIR / "teacher_vacancies.csv"
    if not vac_path.exists():
        log.error("Vacancies CSV not found")
        return

    log.info("Reading %s", vac_path)
    vac = pd.read_csv(vac_path, low_memory=False)
    vac_nat = vac[
        (vac["geographic_level"] == "National") &
        (vac["school_type"] == "Total state-funded schools") &
        (vac["post_grade"] == "Total")
    ].sort_values("time_period")

    vacancy_series = []
    for _, row in vac_nat.iterrows():
        fy = period_to_fy(row["time_period"])
        rate = safe_float(row["rate"])
        count = safe_float(row["vacancy"])
        if rate is not None:
            vacancy_series.append({
                "period": fy,
                "vacancyRate": rate,
                "vacancies": int(count) if count else None,
            })

    log.info("Vacancies: %d points", len(vacancy_series))

    # 2. Pupil-teacher ratios
    ptr_path = RAW_DIR / "pupil_teacher_ratios.csv"
    if not ptr_path.exists():
        log.error("PTR CSV not found")
        return

    log.info("Reading %s", ptr_path)
    ptr = pd.read_csv(ptr_path, low_memory=False)
    ptr_nat = ptr[
        (ptr["geographic_level"] == "National") &
        (ptr["school_type"] == "Total state-funded schools")
    ].sort_values("time_period")

    ptr_series = []
    for _, row in ptr_nat.iterrows():
        fy = period_to_fy(row["time_period"])
        ratio = safe_float(row["pupil_to_qual_unqual_teacher_ratio"])
        pupils = safe_float(row["pupils_fte"])
        teachers = safe_float(row["teachers_fte"])
        if ratio is not None:
            ptr_series.append({
                "period": fy,
                "pupilTeacherRatio": ratio,
                "pupilsFte": int(pupils) if pupils else None,
                "teachersFte": int(teachers) if teachers else None,
            })

    log.info("PTR: %d points", len(ptr_series))

    # Build output
    output = {
        "topic": "teacher-workforce",
        "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
        "vacancies": {
            "timeSeries": vacancy_series,
            "latest": vacancy_series[-1] if vacancy_series else None,
        },
        "pupilTeacherRatio": {
            "timeSeries": ptr_series,
            "latest": ptr_series[-1] if ptr_series else None,
        },
        "metadata": {
            "sources": [
                {
                    "name": "DfE",
                    "dataset": "School Workforce in England — Teacher Vacancies",
                    "url": "https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england",
                    "frequency": "annual",
                },
                {
                    "name": "DfE",
                    "dataset": "School Workforce in England — Pupil-Teacher Ratios",
                    "url": "https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england",
                    "frequency": "annual",
                },
            ],
            "methodology": (
                "Teacher vacancies are measured as the number of advertised vacancies on census day "
                "(November). Rate is vacancies as a proportion of teachers in post. "
                "Pupil-teacher ratio uses FTE pupils divided by FTE qualified + unqualified teachers. "
                "All state-funded schools in England."
            ),
            "knownIssues": [
                "Vacancy data is a snapshot (census day) not a flow measure",
                "COVID-19 temporarily reduced vacancies in 2020/21",
            ],
        },
    }

    out_path = OUTPUT_DIR / "teacher_workforce.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info("Written %s (%d bytes)", out_path, out_path.stat().st_size)


if __name__ == "__main__":
    main()
