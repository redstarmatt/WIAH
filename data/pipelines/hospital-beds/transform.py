"""
transform.py — Parse NHS England KH03 bed availability/occupancy data.

Input:  data/raw/hospital-beds/beds_timeseries.xlsx
Output: data/output/health/hospital_beds.json

Sheet structure (Open Overnight):
  Row 12: group headers — "Available" | "Occupied" | "% Occupied"
  Row 13: column headers — Year, Period, Org Name, Total, G&A, LD, Maternity, Mental Illness ...
  Row 14+: data rows, we filter where Org Name = "England"
  Col 1: Year (e.g. "2010/11")
  Col 2: Period (Q1–Q4)
  Col 3: Org Name
  Col 4: Available Total
  Col 5: Available General & Acute
  Col 10: Occupied Total
  Col 11: Occupied General & Acute
  Col 16: % Occupied Total
  Col 17: % Occupied General & Acute
"""

import json
import logging
import pandas as pd
from pathlib import Path
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)-8s  %(message)s")
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = ROOT / "data" / "raw" / "hospital-beds"
OUTPUT_DIR = ROOT / "data" / "output" / "health"

# Quarter → month mapping (start of NHS financial quarter)
Q_TO_MONTH = {"Q1": "04", "Q2": "07", "Q3": "10", "Q4": "01"}


def safe_float(v, dp=1):
    try:
        f = float(v)
        return round(f, dp) if not pd.isna(f) else None
    except (ValueError, TypeError):
        return None


def safe_int(v):
    try:
        return int(round(float(v))) if not pd.isna(v) else None
    except (ValueError, TypeError):
        return None


def quarter_to_date(year_str, period):
    """Convert '2010/11', 'Q1' → '2010-04'."""
    start_year = int(str(year_str).split("/")[0])
    month = Q_TO_MONTH.get(period)
    if month is None:
        return None
    # Q4 (Jan) falls in the next calendar year
    if period == "Q4":
        start_year += 1
    return f"{start_year}-{month}"


def main():
    xlsx = RAW_DIR / "beds_timeseries.xlsx"
    if not xlsx.exists():
        log.error(f"File not found: {xlsx}")
        raise SystemExit(1)

    df = pd.read_excel(xlsx, sheet_name="Open Overnight", header=None)
    log.info(f"Read {df.shape[0]} rows × {df.shape[1]} cols from 'Open Overnight'")

    time_series = []

    for i in range(14, df.shape[0]):
        row = df.iloc[i]
        year = str(row.iloc[1]).strip() if pd.notna(row.iloc[1]) else ""
        period = str(row.iloc[2]).strip() if pd.notna(row.iloc[2]) else ""
        org = str(row.iloc[3]).strip() if pd.notna(row.iloc[3]) else ""

        if org != "England" or not period.startswith("Q"):
            continue

        date_str = quarter_to_date(year, period)
        if date_str is None:
            continue

        available_total = safe_int(row.iloc[4])
        available_ga = safe_int(row.iloc[5])
        occupied_total = safe_int(row.iloc[10])
        occupied_ga = safe_int(row.iloc[11])
        # Values are fractions (0.893 = 89.3%) — multiply by 100
        raw_pct = safe_float(row.iloc[16], 4)
        pct_total = round(raw_pct * 100, 1) if raw_pct is not None else None
        raw_pct_ga = safe_float(row.iloc[17], 4)
        pct_ga = round(raw_pct_ga * 100, 1) if raw_pct_ga is not None else None

        # Compute % if not provided
        if pct_total is None and available_total and occupied_total:
            pct_total = round(occupied_total / available_total * 100, 1)
        if pct_ga is None and available_ga and occupied_ga:
            pct_ga = round(occupied_ga / available_ga * 100, 1)

        point = {
            "quarter": f"{period} {year}",
            "date": date_str,
            "availableBeds": available_total,
            "availableGA": available_ga,
            "occupiedBeds": occupied_total,
            "occupiedGA": occupied_ga,
            "occupancyPct": pct_total,
            "occupancyGaPct": pct_ga,
        }
        time_series.append(point)

    log.info(f"Extracted {len(time_series)} quarterly data points")
    if time_series:
        latest = time_series[-1]
        first = time_series[0]
        log.info(f"  Range: {first['quarter']} to {latest['quarter']}")
        log.info(f"  Latest: {latest['availableBeds']:,} available, {latest['occupancyPct']}% occupancy")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = {
        "timeSeries": time_series,
        "metadata": {
            "sources": [{
                "name": "NHS England",
                "dataset": "KH03 Bed Availability and Occupancy",
                "url": "https://www.england.nhs.uk/statistics/statistical-work-areas/bed-availability-and-occupancy/bed-availability-and-occupancy-kh03/",
                "frequency": "quarterly",
                "retrieved": datetime.now().isoformat(),
            }],
            "methodology": "Average daily number of available and occupied overnight beds. Occupancy = occupied/available × 100. General & Acute beds are the primary measure.",
        },
    }
    out_path = OUTPUT_DIR / "hospital_beds.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"Wrote {out_path} ({out_path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
