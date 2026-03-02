"""
GP Access — transform.py

Reads raw NHS Digital GP Appointments regional CSVs and outputs clean JSON
conforming to the WIAH schema.

The regional CSVs (one per ICB) contain TIME_BETWEEN_BOOK_AND_APPT counts.
We aggregate them to produce:
  - National monthly weighted average wait (days)
  - ICB-level average wait for the most recent month

Output → data/output/health/gp_appointments.json
"""

import json
import logging
import re
from datetime import datetime
from pathlib import Path

import pandas as pd

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "gp-access"
OUTPUT_DIR = ROOT / "data" / "output" / "health"
STATE_FILE = RAW_DIR / "_state.json"

LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ── Wait-bucket midpoints ────────────────────────────────────────────────────────
# Actual values from the data (note double spaces in some labels):
#   'Same Day', '1 Day', '2 to 7 Days', '8  to 14 Days',
#   '15  to 21 Days', '22  to 28 Days', 'More than 28 Days',
#   'Unknown / Data Quality'

def bucket_midpoint(label: str) -> object:
    s = re.sub(r"\s+", " ", str(label).strip().lower())
    if s == "same day":          return 0.0
    if s == "1 day":             return 1.0
    if s == "2 to 7 days":       return 4.5
    if s == "8 to 14 days":      return 11.0
    if s == "15 to 21 days":     return 18.0
    if s == "22 to 28 days":     return 25.0
    if "more than 28" in s:      return 35.0
    if "unknown" in s:           return None
    return None


def month_str_to_iso(val: str) -> object:
    """Convert 'DEC2025' -> '2025-12'."""
    MONTHS = {
        "JAN":"01","FEB":"02","MAR":"03","APR":"04","MAY":"05","JUN":"06",
        "JUL":"07","AUG":"08","SEP":"09","OCT":"10","NOV":"11","DEC":"12"
    }
    v = str(val).strip().upper()
    if len(v) == 7:
        m, y = v[:3], v[3:]
        if m in MONTHS:
            return f"{y}-{MONTHS[m]}"
    return None


# ── Helpers ─────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def find_latest_release_dir() -> Path:
    MONTH_ORDER = [
        "january","february","march","april","may","june",
        "july","august","september","october","november","december"
    ]
    dirs = [d for d in RAW_DIR.iterdir() if d.is_dir() and not d.name.startswith("_")]
    if not dirs:
        raise FileNotFoundError(f"No release directories in {RAW_DIR}. Run fetch.py first.")
    def sort_key(d):
        parts = d.name.split("-")
        if len(parts) != 2:
            return (0, 0)
        month, year = parts
        try:
            return (int(year), MONTH_ORDER.index(month.lower()) + 1)
        except (ValueError, IndexError):
            return (0, 0)
    return max(dirs, key=sort_key)


# ── Core processing ──────────────────────────────────────────────────────────────

def load_all_regional_csvs(release_dir: Path) -> pd.DataFrame:
    """
    Load all Regional_CSV_*.csv files from the regional_zip subdirectory
    and concatenate into one DataFrame.
    """
    regional_dir = release_dir / "regional_zip"
    if not regional_dir.exists():
        raise FileNotFoundError(f"No regional_zip directory at {regional_dir}. Run fetch.py.")

    csvs = sorted(regional_dir.glob("Regional_CSV_*.csv"))
    if not csvs:
        raise FileNotFoundError(f"No Regional_CSV_*.csv files found in {regional_dir}.")

    log.info(f"Loading {len(csvs)} regional CSV files ...")
    frames = []
    for p in csvs:
        df = pd.read_csv(p, encoding="utf-8-sig", low_memory=False)
        frames.append(df)

    combined = pd.concat(frames, ignore_index=True)
    log.info(f"  Combined rows: {len(combined):,}")
    return combined


def compute_national_series(df: pd.DataFrame) -> list:
    """
    Aggregate all ICBs to national level by month.
    Return monthly list of { date, avgWaitDays, totalAppointments, pctSameOrNextDay }.
    """
    # Attended appointments only
    df = df[df["APPT_STATUS"].str.strip().str.lower() == "attended"].copy()

    df["month_iso"] = df["APPOINTMENT_MONTH"].apply(month_str_to_iso)
    df = df.dropna(subset=["month_iso"])
    df["COUNT_OF_APPOINTMENTS"] = pd.to_numeric(df["COUNT_OF_APPOINTMENTS"], errors="coerce").fillna(0).astype(int)

    results = []
    for month, group in df.groupby("month_iso"):
        total = int(group["COUNT_OF_APPOINTMENTS"].sum())
        if total == 0:
            continue

        weighted_days = 0.0
        counted = 0
        same_or_next = 0

        for _, row in group.iterrows():
            mid = bucket_midpoint(row["TIME_BETWEEN_BOOK_AND_APPT"])
            count = int(row["COUNT_OF_APPOINTMENTS"])
            if mid is None:
                continue
            weighted_days += mid * count
            counted += count
            if mid <= 1:
                same_or_next += count

        if counted == 0:
            continue

        avg_wait = round(weighted_days / counted, 1)
        pct_same_next = round(same_or_next / counted * 100, 1)

        results.append({
            "date":              month,
            "avgWaitDays":       avg_wait,
            "totalAppointments": total,
            "pctSameOrNextDay":  pct_same_next,
        })

    results.sort(key=lambda x: x["date"])
    log.info(f"  National series: {len(results)} monthly data points")
    if results:
        r = results[-1]
        log.info(
            f"  Latest ({r['date']}): avg {r['avgWaitDays']} days wait, "
            f"{r['pctSameOrNextDay']}% same/next day, "
            f"{r['totalAppointments']:,} appointments"
        )
    return results


def compute_icb_breakdown(df: pd.DataFrame):
    """
    Compute per-ICB average wait for the most recent month.
    Returns (list_of_icb_dicts, latest_month_str).
    """
    df = df[df["APPT_STATUS"].str.strip().str.lower() == "attended"].copy()
    df["month_iso"] = df["APPOINTMENT_MONTH"].apply(month_str_to_iso)
    df = df.dropna(subset=["month_iso"])
    df["COUNT_OF_APPOINTMENTS"] = pd.to_numeric(df["COUNT_OF_APPOINTMENTS"], errors="coerce").fillna(0).astype(int)

    latest_month = df["month_iso"].max()
    df_latest = df[df["month_iso"] == latest_month]

    results = []
    for icb_name, group in df_latest.groupby("ICB_NAME"):
        icb_code = group["ICB_ONS_CODE"].iloc[0] if "ICB_ONS_CODE" in group.columns else ""

        weighted_days = 0.0
        counted = 0
        for _, row in group.iterrows():
            mid = bucket_midpoint(row["TIME_BETWEEN_BOOK_AND_APPT"])
            count = int(row["COUNT_OF_APPOINTMENTS"])
            if mid is None:
                continue
            weighted_days += mid * count
            counted += count

        if counted == 0:
            continue

        # Shorten display name
        display_name = re.sub(r"^NHS\s+", "", str(icb_name))
        display_name = re.sub(r"\s+Integrated Care Board$", "", display_name).strip()

        results.append({
            "code":        str(icb_code),
            "name":        display_name,
            "fullName":    str(icb_name),
            "avgWaitDays": round(weighted_days / counted, 1),
        })

    results.sort(key=lambda x: x["avgWaitDays"], reverse=True)
    log.info(f"  ICB breakdown: {len(results)} ICBs for {latest_month}")
    if results:
        log.info(
            f"  Worst: {results[0]['name']} ({results[0]['avgWaitDays']}d) | "
            f"Best: {results[-1]['name']} ({results[-1]['avgWaitDays']}d)"
        )
    return results, latest_month


# ── Main ────────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    release_dir = find_latest_release_dir()
    release_slug = release_dir.name
    log.info(f"Transforming: {release_slug}")

    df = load_all_regional_csvs(release_dir)

    national = compute_national_series(df)
    regional, latest_month = compute_icb_breakdown(df)

    if not national:
        log.error("No national series produced — check the data.")
        raise SystemExit(1)

    retrieved = state.get("gp_access", {}).get("last_checked", datetime.utcnow().isoformat())

    output = {
        "topic":       "health",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "coverage": {
            "from": national[0]["date"],
            "to":   national[-1]["date"],
        },
        "national": {
            "timeSeries": national,
            "latestMonth": national[-1],
        },
        "regional": {
            "latestMonth": latest_month,
            "byICB": regional,
        },
        "metadata": {
            "sources": [
                {
                    "name":      "NHS England",
                    "dataset":   "Appointments in General Practice",
                    "url":       "https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice",
                    "retrieved": retrieved[:10],
                    "frequency": "monthly",
                }
            ],
            "methodology": (
                "Weighted average wait days calculated from NHS England time-between-booking-and-appointment "
                "buckets. Bucket midpoints: Same Day=0, 1 Day=1, 2-7 Days=4.5, 8-14=11, 15-21=18, "
                "22-28=25, >28=35. Attended appointments only, all GP practices in England. "
                "Aggregated from 42 ICB-level regional CSVs."
            ),
            "knownIssues": [
                "Data coverage begins July 2023 (regional CSV format). Pre-2023 available via older national publication.",
                "Regional CSVs use double spaces in some bucket labels (normalised in processing).",
            ],
            "releaseSlug": release_slug,
        },
    }

    out_path = OUTPUT_DIR / "gp_appointments.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"Written: {out_path}")
    log.info(f"  Coverage: {national[0]['date']} to {national[-1]['date']}")


if __name__ == "__main__":
    main()
