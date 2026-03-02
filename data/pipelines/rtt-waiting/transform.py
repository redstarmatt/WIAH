"""
RTT Waiting Lists — transform.py

Parses the NHS England RTT Overview Timeseries Excel file and outputs
a clean JSON file with:
  - Monthly waiting list size (total incomplete pathways), 2012–present
  - Waits by duration band (>18wk, >52wk, >65wk, >78wk, >104wk)
  - % within 18 weeks and target comparison
  - Median and 92nd percentile wait times

Output: data/output/rtt-waiting/rtt_waiting.json → copy to site/public/data/health/
"""

import json
import logging
import math
from datetime import datetime
from pathlib import Path

import pandas as pd

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "rtt-waiting"
OUTPUT_DIR = ROOT / "data" / "output" / "rtt-waiting"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ── Helpers ────────────────────────────────────────────────────────────────────

def safe_int(v):
    """Convert to int, returning None for NaN/missing."""
    if pd.isna(v) or v == "-":
        return None
    try:
        return int(float(v))
    except (ValueError, TypeError):
        return None


def safe_float(v, dp=1):
    """Convert to float with dp decimal places, returning None for NaN/missing."""
    if pd.isna(v) or v == "-":
        return None
    try:
        val = float(v)
        if math.isnan(val):
            return None
        return round(val, dp)
    except (ValueError, TypeError):
        return None


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    # Find the raw file
    xlsx_path = RAW_DIR / "rtt_overview_timeseries.xlsx"
    xls_path = RAW_DIR / "rtt_overview_timeseries.xls"

    if xlsx_path.exists():
        raw_path = xlsx_path
    elif xls_path.exists():
        raw_path = xls_path
    else:
        log.error("No RTT timeseries file found in %s", RAW_DIR)
        return

    log.info("Reading %s", raw_path)

    # Read the Excel file without headers — we'll parse manually
    df = pd.read_excel(raw_path, sheet_name="Full Time Series", header=None)

    # The data structure:
    # Row 10 (0-indexed): Group headers
    # Row 11: Column sub-headers for the "Incomplete RTT pathways" section
    # Row 12+: Data rows (until "Notes:" row)
    #
    # Key columns (0-indexed) for "Incomplete RTT pathways":
    #   1: Year (financial year, e.g. "2007/08")
    #   2: Month (datetime)
    #   3: Median wait (weeks)
    #   4: 92nd percentile (weeks)
    #   5: No. within 18 weeks
    #   6: No. within 18 weeks (with estimates)
    #   7: % within 18 weeks
    #   8: % within 18 weeks (with estimates)
    #   9: No. > 18 weeks
    #  10: No. > 18 weeks (with estimates)
    #  11: No. > 52 weeks
    #  12: No. > 52 weeks (with estimates)
    #  15: No. > 65 weeks
    #  16: No. > 65 weeks (with estimates)
    #  17: No. > 78 weeks
    #  18: No. > 78 weeks (with estimates)
    #  19: No. > 104 weeks
    #  20: No. > 104 weeks (with estimates)
    #  21: Total waiting list size (incomplete pathways)

    time_series = []

    for idx in range(12, len(df)):
        row = df.iloc[idx]

        # Stop at notes section
        if pd.notna(row.iloc[1]) and str(row.iloc[1]).strip().startswith("Notes"):
            break

        month_val = row.iloc[2]

        # Skip rows without a valid date in column 2
        if pd.isna(month_val):
            continue

        # Parse date
        if isinstance(month_val, datetime):
            dt = month_val
        else:
            try:
                dt = pd.to_datetime(str(month_val))
            except Exception:
                continue

        date_str = dt.strftime("%Y-%m")

        # Skip pre-2012 data where waiting list size isn't available
        total = safe_int(row.iloc[21])
        if total is None:
            # Try using the estimates column
            total = safe_int(row.iloc[6])
            if total is None:
                continue

        # Actually, column 21 is the total waiting list.
        # But let's also compute from within + over 18 weeks
        total_list = safe_int(row.iloc[21])
        if total_list is None:
            # Fallback: sum within 18wk + over 18wk
            w18 = safe_int(row.iloc[5])
            o18 = safe_int(row.iloc[9])
            if w18 is not None and o18 is not None:
                total_list = w18 + o18

        if total_list is None:
            continue

        point = {
            "date": date_str,
            "totalList": total_list,
            "within18wk": safe_int(row.iloc[6]),   # with estimates
            "pctWithin18wk": safe_float(row.iloc[8], 4),  # with estimates, as decimal — convert below
            "over18wk": safe_int(row.iloc[10]),     # with estimates
            "over52wk": safe_int(row.iloc[12]),     # with estimates
            "over65wk": safe_int(row.iloc[16]),     # with estimates
            "over78wk": safe_int(row.iloc[18]),     # with estimates
            "over104wk": safe_int(row.iloc[20]),    # with estimates
            "medianWaitWks": safe_float(row.iloc[3], 1),
            "p92WaitWks": safe_float(row.iloc[4], 1),
        }

        # Convert pctWithin18wk from decimal (0.xx) to percentage (xx.x)
        if point["pctWithin18wk"] is not None:
            if point["pctWithin18wk"] < 1:
                point["pctWithin18wk"] = round(point["pctWithin18wk"] * 100, 1)
            else:
                point["pctWithin18wk"] = round(point["pctWithin18wk"], 1)

        time_series.append(point)

    log.info("Parsed %d monthly data points", len(time_series))

    if not time_series:
        log.error("No data points extracted!")
        return

    # Compute headlines
    latest = time_series[-1]
    # Find point from 5 years ago
    target_date = datetime.now().year - 5
    five_yr_ago = None
    for p in time_series:
        if p["date"].startswith(str(target_date)):
            five_yr_ago = p
            break

    # Find pre-pandemic point (Feb 2020)
    pre_pandemic = None
    for p in time_series:
        if p["date"] == "2020-02":
            pre_pandemic = p
            break

    headlines = {
        "totalList": latest["totalList"],
        "over52wk": latest.get("over52wk"),
        "over65wk": latest.get("over65wk"),
        "pctWithin18wk": latest.get("pctWithin18wk"),
        "medianWaitWks": latest.get("medianWaitWks"),
        "latestDate": latest["date"],
        "prePandemicList": pre_pandemic["totalList"] if pre_pandemic else None,
        "prePandemicDate": "2020-02",
    }

    log.info("Headlines: totalList=%s, over52wk=%s, pctWithin18wk=%s%%",
             headlines["totalList"], headlines["over52wk"], headlines["pctWithin18wk"])

    output = {
        "topic": "rtt-waiting",
        "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
        "national": {
            "timeSeries": time_series,
        },
        "headlines": headlines,
        "metadata": {
            "sources": [
                {
                    "name": "NHS England",
                    "dataset": "Consultant-led Referral to Treatment Waiting Times",
                    "url": "https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/",
                    "frequency": "monthly",
                }
            ],
            "methodology": (
                "RTT measures the time from referral to start of treatment for "
                "consultant-led services. The waiting list is the total number of "
                "incomplete pathways at month end. Figures include estimates for "
                "trusts that did not submit data. The 92% constitutional standard "
                "requires 92% of patients to start treatment within 18 weeks."
            ),
            "knownIssues": [
                "Data prior to April 2012 may have limited coverage",
                "From Feb 2024, community service pathways excluded — causes a step change in the series",
                "COVID-19 caused a significant disruption to elective care from March 2020",
            ],
        },
    }

    out_path = OUTPUT_DIR / "rtt_waiting.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info("Written %s (%d bytes)", out_path, out_path.stat().st_size)


if __name__ == "__main__":
    main()
