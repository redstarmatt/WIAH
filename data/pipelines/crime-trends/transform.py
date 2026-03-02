"""
Crime Trends — transform.py

Parses ONS crime appendix tables to extract recorded crime by type, 2002/03–present.
Outputs time series for key offence categories.

Output: data/output/crime-trends/crime_trends.json → copy to site/public/data/justice/
"""

import re
import json
import logging
from datetime import datetime
from pathlib import Path

import pandas as pd

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "crime-trends"
OUTPUT_DIR = ROOT / "data" / "output" / "crime-trends"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Key offence categories to extract (match on substring of column B)
TARGETS = {
    "total": "TOTAL RECORDED CRIME - ALL OFFENCES EXCLUDING FRAUD",
    "totalIncFraud": "TOTAL RECORDED CRIME .* ALL OFFENCES INCLUDING FRAUD",
    "violence": "TOTAL VIOLENCE AGAINST THE PERSON",
    "sexual": "TOTAL SEXUAL OFFENCES",
    "robbery": "TOTAL ROBBERY",
    "burglary": "^Burglary$",
    "vehicleOffences": "^Vehicle offences$",
    "shoplifting": "^Shoplifting$",
    "theft": "TOTAL THEFT OFFENCES",
    "criminalDamage": "TOTAL CRIMINAL DAMAGE AND ARSON",
    "drugOffences": "TOTAL DRUG OFFENCES",
    "publicOrder": "TOTAL PUBLIC ORDER OFFENCES",
    "fraudAndCyber": "TOTAL FRAUD.*AND COMPUTER MISUSE",
}


# ── Helpers ────────────────────────────────────────────────────────────────────

def safe_int(v):
    """Convert cell value to int, returning None for [x], empty, etc."""
    if pd.isna(v):
        return None
    s = str(v).strip()
    if s.startswith("[") or s == "" or s == "-":
        return None
    try:
        return int(float(s))
    except (ValueError, TypeError):
        return None


def parse_period_header(header):
    """Extract the financial year end from headers like 'Apr 2002 to \\n Mar 2003'.
    Returns '2002/03' style string, or None."""
    s = str(header).replace("\n", " ").strip()
    # Match "Apr YYYY to Mar YYYY"
    m = re.search(r"Apr\s+(\d{4})\s+to\s+Mar\s+(\d{4})", s)
    if m:
        return f"{m.group(1)}/{m.group(2)[-2:]}"
    # Match "Oct YYYY to Sep YYYY"
    m = re.search(r"Oct\s+(\d{4})\s+to\s+Sep\s+(\d{4})", s)
    if m:
        return f"YE Sep {m.group(2)}"
    return None


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    raw_path = RAW_DIR / "crime_appendix.xlsx"
    if not raw_path.exists():
        log.error("Crime appendix file not found: %s", raw_path)
        return

    log.info("Reading %s", raw_path)
    df = pd.read_excel(raw_path, sheet_name="Table_A5a", header=None)

    # Row 8 (0-indexed) contains the period headers
    header_row = df.iloc[8]

    # Parse period headers from columns 2+ (skip col 0=code, col 1=category)
    periods = {}
    for col_idx in range(2, len(header_row)):
        val = header_row.iloc[col_idx]
        if pd.notna(val):
            period = parse_period_header(val)
            if period:
                periods[col_idx] = period

    log.info("Found %d period columns", len(periods))

    # Find target rows and extract data
    crime_data = {}
    for row_idx in range(9, min(len(df), 235)):
        category = str(df.iloc[row_idx, 1]).strip() if pd.notna(df.iloc[row_idx, 1]) else ""
        # Strip note references
        category_clean = re.sub(r"\s*\[note.*?\]", "", category).strip()

        for key, pattern in TARGETS.items():
            if key in crime_data:
                continue  # Already found this one
            if re.search(pattern, category_clean, re.IGNORECASE):
                series = []
                for col_idx, period in sorted(periods.items()):
                    if period.startswith("YE"):
                        continue  # Skip rolling year columns, use FY only
                    val = safe_int(df.iloc[row_idx, col_idx])
                    if val is not None:
                        series.append({"period": period, "count": val})
                crime_data[key] = {
                    "label": category_clean,
                    "timeSeries": series,
                }
                log.info("  %s: '%s' → %d points", key, category_clean, len(series))
                break

    log.info("Extracted %d offence categories", len(crime_data))

    # Build output
    output = {
        "topic": "crime-trends",
        "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
        "crimeTrends": crime_data,
        "metadata": {
            "sources": [
                {
                    "name": "ONS / Home Office",
                    "dataset": "Crime in England and Wales, Appendix Tables (Table A5a)",
                    "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables",
                    "frequency": "quarterly",
                }
            ],
            "methodology": (
                "Police recorded crime by offence category, annual financial years (April to March). "
                "Crime recording practices have changed significantly over this period — particularly "
                "in 2014 when the National Crime Recording Standard was tightened, leading to apparent "
                "increases in violence and sexual offences. Figures are not directly comparable across "
                "the full time period."
            ),
            "knownIssues": [
                "Recording practice changes in 2014 inflated violence and sexual offence figures",
                "Fraud reporting changed with Action Fraud in 2013-14",
                "COVID-19 affected crime patterns in 2020/21",
                "Burglary definition changed in April 2017 (domestic → residential)",
            ],
        },
    }

    out_path = OUTPUT_DIR / "crime_trends.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info("Written %s (%d bytes)", out_path, out_path.stat().st_size)


if __name__ == "__main__":
    main()
