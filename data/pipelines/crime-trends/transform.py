"""
Crime Trends — transform.py

Parses ONS crime appendix tables:
  - Table A5a:  Police recorded crime by offence type (2002/03–present)
  - Table A2a:  CSEW rates per 1,000 adults by offence type (1981–present)
  - Table A3a:  CSEW headline total incidents in millions (1981–present)

Outputs time series for key offence categories, including CSEW vs recorded crime comparison.

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


# ── CSEW helpers ──────────────────────────────────────────────────────────────

CSEW_RATE_TARGETS = {
    # key: (row_index_in_A2a, label)
    "violence":       (8,  "Violence"),
    "robbery":        (13, "Robbery"),
    "theft_person":   (15, "Theft from the person"),
    "burglary":       (21, "Domestic burglary"),
    "criminal_damage":(53, "Criminal damage"),
}

# Row 57 in A3a = "ALL CSEW HEADLINE CRIME EXCLUDING FRAUD AND COMPUTER MISUSE"
CSEW_TOTAL_ROW = 57


def parse_csew_year_cols(header_row):
    """
    Return {col_index: year_label} from the CSEW tables (A2a / A3a).
    Handles both calendar years ('Jan 1995 to Dec 1995' → '1995') and
    financial years ('Apr 2002 to Mar 2003' → '2001/02').
    Skips rolling Oct-Sep columns.
    """
    cols = {}
    for i, h in enumerate(header_row):
        s = str(h).replace("\n", " ").strip()
        # Financial year: Apr YYYY to Mar YYYY
        m = re.search(r"Apr\s+(\d{4})\s+to\s+Mar\s+(\d{4})", s)
        if m:
            cols[i] = f"{m.group(1)}/{m.group(2)[-2:]}"
            continue
        # Calendar year: Jan YYYY to Dec YYYY
        m = re.search(r"Jan\s+(\d{4})\s+to\s+Dec\s+(\d{4})", s)
        if m:
            cols[i] = m.group(1)
            continue
        # Skip Oct-Sep rolling columns intentionally
    return cols


def safe_float_csew(v):
    """Parse a CSEW cell value, returning None for suppressed values."""
    if pd.isna(v):
        return None
    s = str(v).strip()
    if s.startswith("[") or s in ("", "-", "nan"):
        return None
    try:
        return float(s)
    except (ValueError, TypeError):
        return None


def extract_csew_data(raw_path):
    """
    Extract CSEW data from the ONS crime appendix workbook.

    Returns a dict:
      {
        'total': [{'period': '1995', 'incidentsMn': 39.5}, ...],
        'rates': {
          'violence':       [{'period': '1995', 'ratePer1000': 109.7}, ...],
          'robbery':        [...],
          ...
        }
      }
    Returns None if parsing fails.
    """
    try:
        # ── A3a: CSEW total incidents (millions) ──────────────────────────
        df3 = pd.read_excel(raw_path, sheet_name="Table_A3a", header=None, engine="openpyxl")
        year_cols_3 = parse_csew_year_cols(df3.iloc[7].tolist())

        total_row = df3.iloc[CSEW_TOTAL_ROW]
        total_series = []
        for col, period in sorted(year_cols_3.items()):
            v = safe_float_csew(total_row.iloc[col])
            if v is not None:
                total_series.append({"period": period, "incidentsMn": round(v, 1)})

        log.info("  CSEW total: %d points, latest=%s", len(total_series),
                 total_series[-1] if total_series else None)

        # ── A2a: CSEW rates per 1,000 adults by offence ───────────────────
        df2 = pd.read_excel(raw_path, sheet_name="Table_A2a", header=None, engine="openpyxl")
        year_cols_2 = parse_csew_year_cols(df2.iloc[7].tolist())

        rates = {}
        for key, (row_idx, label) in CSEW_RATE_TARGETS.items():
            row = df2.iloc[row_idx]
            series = []
            for col, period in sorted(year_cols_2.items()):
                v = safe_float_csew(row.iloc[col])
                if v is not None:
                    series.append({"period": period, "ratePer1000": round(v, 1)})
            rates[key] = {"label": label, "timeSeries": series}
            log.info("  CSEW %s: %d points", key, len(series))

        return {"total": total_series, "rates": rates}

    except Exception as exc:
        log.warning("  CSEW extraction failed: %s", exc)
        import traceback
        traceback.print_exc()
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

    # ── CSEW extraction ───────────────────────────────────────────────────
    log.info("Extracting CSEW data…")
    csew_data = extract_csew_data(raw_path)
    if csew_data:
        log.info("  CSEW extraction succeeded")
    else:
        log.warning("  CSEW extraction failed — omitting from output")

    # ── Population normalisation ─────────────────────────────────────────────
    # Load England population from demographics pipeline output
    demo_path = ROOT / "site" / "public" / "data" / "demographics" / "demographics.json"
    pop_lookup: dict[int, int] = {}
    if demo_path.exists():
        demo = json.loads(demo_path.read_text())
        for entry in demo.get("population", {}).get("england", []):
            pop_lookup[entry["year"]] = entry["population"]
        log.info("Loaded population data: %d years", len(pop_lookup))
    else:
        log.warning("Demographics JSON not found — skipping ratePer100k")

    if pop_lookup:
        for key, series_obj in crime_data.items():
            for point in series_obj["timeSeries"]:
                # '2002/03' → 2002; 'YE Sep 2003' is already skipped above
                period = point["period"]
                start_year = int(period.split("/")[0])
                pop = pop_lookup.get(start_year) or pop_lookup.get(start_year - 1)
                if pop:
                    point["ratePer100k"] = round(point["count"] / (pop / 100_000), 0)
        log.info("Added ratePer100k to %d crime categories", len(crime_data))

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
                },
                {
                    "name": "ONS — Crime Survey for England and Wales (CSEW)",
                    "dataset": "Crime in England and Wales, Appendix Tables (Tables A2a, A3a)",
                    "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables",
                    "frequency": "quarterly",
                },
            ],
            "methodology": (
                "Police recorded crime by offence category, annual financial years (April to March). "
                "Crime recording practices have changed significantly over this period — particularly "
                "in 2014 when the National Crime Recording Standard was tightened, leading to apparent "
                "increases in violence and sexual offences. Figures are not directly comparable across "
                "the full time period. "
                "CSEW data shows estimated incidents experienced by adults aged 16+ in England and Wales, "
                "regardless of whether they were reported to police. Rates are per 1,000 adults."
            ),
            "knownIssues": [
                "Recording practice changes in 2014 inflated violence and sexual offence figures",
                "Fraud reporting changed with Action Fraud in 2013-14",
                "COVID-19 affected crime patterns in 2020/21",
                "Burglary definition changed in April 2017 (domestic → residential)",
                "CSEW was suspended in 2020/21 and 2021/22 due to COVID — data gap in those years",
                "CSEW early years (1981–1999) used calendar year surveys; later moved to financial year",
            ],
        },
    }

    if csew_data:
        output["csewSurvey"] = csew_data

    out_path = OUTPUT_DIR / "crime_trends.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info("Written %s (%d bytes)", out_path, out_path.stat().st_size)


if __name__ == "__main__":
    main()
