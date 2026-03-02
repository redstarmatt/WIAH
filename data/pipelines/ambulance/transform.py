"""
Ambulance — transform.py

Reads raw NHS England Ambulance Quality Indicators AmbSYS timeseries XLSX and outputs:
  - data/output/health/ambulance.json

Source file structure (AmbSYS-Time-Series-*.xlsx):
  Sheet: 'Raw' — header on row index 4, data starts row 5
  Key columns (confirmed by inspection):
    Area      — 'ENG' for England national, Y-codes for regions, trust codes for trusts
    Trust     — trust name (blank for England/region rows)
    Year      — NHS financial year e.g. '2017-18'
    Month     — month name e.g. 'AUGUST'
    A25       — Cat 1 mean response time (seconds)
    A26       — Cat 1 90th percentile response time (seconds)
    A31       — Cat 2 mean response time (seconds)  [target: 18 min]
    A32       — Cat 2 90th percentile response time (seconds)
    A8        — Cat 1 incident count

National coverage: August 2017 → present (monthly)
Trust breakdown: 11 ambulance trusts for latest month only.
"""

import json
import logging
from datetime import datetime
from pathlib import Path

import pandas as pd

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "ambulance"
OUTPUT_DIR = ROOT / "data" / "output" / "health"
STATE_FILE = RAW_DIR / "_state.json"

LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# NHS financial year month order — April starts each year
MONTH_TO_NUM = {
    "APRIL": 4, "MAY": 5, "JUNE": 6, "JULY": 7,
    "AUGUST": 8, "SEPTEMBER": 9, "OCTOBER": 10, "NOVEMBER": 11, "DECEMBER": 12,
    "JANUARY": 1, "FEBRUARY": 2, "MARCH": 3,
}
# Months Jan-Mar belong to the second calendar year of the financial year
SECOND_HALF = {"JANUARY", "FEBRUARY", "MARCH"}


# ── Helpers ─────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def find_latest_raw_file(pattern: str) -> object:
    files = sorted(RAW_DIR.glob(pattern))
    return files[-1] if files else None


def fy_month_to_iso(fy_str: str, month_str: str) -> object:
    """
    Convert NHS financial year + month name to YYYY-MM.
    e.g. '2017-18' + 'AUGUST'  → '2017-08'
         '2025-26' + 'JANUARY' → '2026-01'
    """
    month_name = str(month_str).strip().upper()
    month_num = MONTH_TO_NUM.get(month_name)
    if not month_num:
        return None
    try:
        # Financial year '2017-18' → first calendar year = 2017
        first_year = int(str(fy_str).strip()[:4])
    except (ValueError, TypeError):
        return None
    cal_year = first_year + 1 if month_name in SECOND_HALF else first_year
    return f"{cal_year}-{month_num:02d}"


def seconds_to_minutes(val) -> object:
    try:
        s = float(val)
        return round(s / 60, 1) if s > 0 else None
    except (TypeError, ValueError):
        return None


# ── Processing ───────────────────────────────────────────────────────────────────

def process_timeseries(file_path: Path) -> tuple:
    """
    Parse the AmbSYS Raw sheet.
    Returns (national_series, trust_series).
    """
    log.info(f"Processing: {file_path.name}")

    df = pd.read_excel(file_path, sheet_name="Raw", header=4)
    log.info(f"  Loaded {len(df)} rows, {len(df.columns)} columns")

    # Build ISO date column
    df["_date"] = df.apply(
        lambda r: fy_month_to_iso(r.get("Year"), r.get("Month")), axis=1
    )
    df = df.dropna(subset=["_date"])

    # ── National time series (England level) ─────────────────────────────────
    eng = df[df["Area"].astype(str).str.strip() == "ENG"].copy()
    log.info(f"  England rows: {len(eng)}")

    national_series = []
    for _, row in eng.iterrows():
        entry: dict = {"date": row["_date"]}

        cat1_mean = seconds_to_minutes(row.get("A25"))
        cat1_p90  = seconds_to_minutes(row.get("A26"))
        cat2_mean = seconds_to_minutes(row.get("A31"))
        cat2_p90  = seconds_to_minutes(row.get("A32"))

        if cat1_mean: entry["cat1MeanMins"] = cat1_mean
        if cat1_p90:  entry["cat1P90Mins"]  = cat1_p90
        if cat2_mean: entry["cat2MeanMins"] = cat2_mean
        if cat2_p90:  entry["cat2P90Mins"]  = cat2_p90

        try:
            incidents = int(row.get("A8", 0))
            if incidents > 0:
                entry["cat1Incidents"] = incidents
        except (TypeError, ValueError):
            pass

        if len(entry) > 1:
            national_series.append(entry)

    national_series.sort(key=lambda x: x["date"])

    # ── Trust breakdown (latest month only) ──────────────────────────────────
    # Trust rows have a non-blank Trust name and a 3-char org code in Area
    trust_df = df[
        df["Trust"].notna() &
        (df["Trust"].astype(str).str.strip() != "") &
        (df["Trust"].astype(str).str.lower() != "nan")
    ].copy()

    trust_series = []
    if not trust_df.empty:
        latest_month = trust_df["_date"].max()
        trust_latest = trust_df[trust_df["_date"] == latest_month]

        for _, row in trust_latest.iterrows():
            # Title-case but preserve small words (of, and, the)
            raw = str(row["Trust"]).strip()
            words = raw.title().split()
            SMALL = {"Of", "And", "The", "In", "For", "At", "A"}
            name = " ".join(
                w if i == 0 or w not in SMALL else w.lower()
                for i, w in enumerate(words)
            )
            # Normalise NHS suffixes
            name = name.replace(" Nhs Trust", " NHS Trust")
            name = name.replace(" Nhs Foundation Trust", " NHS FT")
            name = name.replace("University Nhs Ft", "University NHS FT")
            name = name.replace(" Service ", " ")

            entry: dict = {
                "code": str(row["Area"]).strip(),
                "name": name,
            }
            cat1_mean = seconds_to_minutes(row.get("A25"))
            cat2_mean = seconds_to_minutes(row.get("A31"))
            if cat1_mean: entry["cat1MeanMins"] = cat1_mean
            if cat2_mean: entry["cat2MeanMins"] = cat2_mean

            if len(entry) > 2:
                trust_series.append(entry)

        trust_series.sort(key=lambda x: x.get("cat2MeanMins", 0), reverse=True)

    log.info(f"  → {len(national_series)} monthly national points, {len(trust_series)} trusts")
    return national_series, trust_series


# ── Main ────────────────────────────────────────────────────────────────────────

def main():
    state = load_state()

    raw_file = (find_latest_raw_file("*.xlsx")
             or find_latest_raw_file("*.xls")
             or find_latest_raw_file("*.csv"))

    if not raw_file:
        log.error(f"No raw files found in {RAW_DIR}. Run fetch.py first.")
        raise SystemExit(1)

    national, trusts = process_timeseries(raw_file)

    if not national:
        log.error("No national series produced.")
        raise SystemExit(1)

    retrieved = state.get("ambulance", {}).get("last_checked", datetime.utcnow().isoformat())

    output = {
        "topic":       "health",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "coverage": {
            "from": national[0]["date"] if national else None,
            "to":   national[-1]["date"] if national else None,
        },
        "national": {
            "timeSeries": national,
        },
        "regional": {
            "byTrust": trusts,
        },
        "targets": {
            "cat1MeanMins": 7,
            "cat2MeanMins": 18,
        },
        "metadata": {
            "sources": [
                {
                    "name":      "NHS England",
                    "dataset":   "Ambulance Quality Indicators — AmbSYS Timeseries",
                    "url":       "https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/",
                    "retrieved": retrieved[:10],
                    "frequency": "monthly",
                }
            ],
            "methodology": (
                "Mean and 90th percentile response times in minutes, converted from seconds "
                "in the NHS England AmbSYS Raw sheet. "
                "Category 1: immediately life-threatening calls (target 7 min mean). "
                "Category 2: emergency calls (target 18 min mean, 40 min 90th percentile). "
                "England-level figures from 'ENG' rows; 11 ambulance trusts shown for latest month."
            ),
            "knownIssues": [
                "New category system introduced April 2018 — pre-April 2018 data uses legacy categories.",
                "COVID-19 caused a significant spike in Cat 2 mean from March 2020.",
                "Data for Aug 2017–Mar 2018 uses initial roll-out period figures.",
            ],
        },
    }

    out_path = OUTPUT_DIR / "ambulance.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"✓ Written: {out_path}")

    if national:
        latest = national[-1]
        log.info(
            f"Latest: {latest['date']} — "
            f"Cat1={latest.get('cat1MeanMins','?')}min, "
            f"Cat2={latest.get('cat2MeanMins','?')}min (target: 18)"
        )


if __name__ == "__main__":
    main()
