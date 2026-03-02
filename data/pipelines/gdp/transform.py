"""
GDP + Public Debt — transform.py

Parses ONS time series CSVs and outputs clean JSON:
  - GDP quarterly growth (QoQ), 2000–present
  - Public sector net debt as % of GDP, monthly, 1993–present

Output: data/output/gdp/gdp.json → append to site/public/data/economy/
"""

import re
import json
import logging
from datetime import datetime
from pathlib import Path

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "gdp"
OUTPUT_DIR = ROOT / "data" / "output" / "gdp"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Month abbreviation → number
MONTHS = {
    "JAN": "01", "FEB": "02", "MAR": "03", "APR": "04",
    "MAY": "05", "JUN": "06", "JUL": "07", "AUG": "08",
    "SEP": "09", "OCT": "10", "NOV": "11", "DEC": "12",
}

# Quarter → month
QUARTER_MONTHS = {"Q1": "01", "Q2": "04", "Q3": "07", "Q4": "10"}


# ── Helpers ────────────────────────────────────────────────────────────────────

def parse_ons_csv(filepath):
    """Parse an ONS time series CSV, skipping the metadata preamble.
    Returns a list of (period_string, value_string) tuples."""
    rows = []
    with open(filepath, "r", encoding="utf-8-sig") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            # Split CSV (simple — no embedded commas in these files)
            parts = line.split(",")
            if len(parts) < 2:
                continue
            period = parts[0].strip().strip('"')
            value = parts[1].strip().strip('"')
            # Skip metadata rows — detect data rows by period pattern
            # Data periods: "1955 Q2", "1993 MAR", "2025", etc.
            if re.match(r"^\d{4}(\s+(Q[1-4]|[A-Z]{3}))?$", period):
                rows.append((period, value))
    return rows


def parse_quarterly_date(period):
    """'2024 Q3' → '2024-07'"""
    match = re.match(r"^(\d{4})\s+(Q[1-4])$", period)
    if match:
        year, q = match.groups()
        return f"{year}-{QUARTER_MONTHS[q]}"
    return None


def parse_monthly_date(period):
    """'2025 JAN' → '2025-01'"""
    match = re.match(r"^(\d{4})\s+([A-Z]{3})$", period)
    if match:
        year, mon = match.groups()
        if mon in MONTHS:
            return f"{year}-{MONTHS[mon]}"
    return None


def safe_float(v):
    if not v or v == "" or v == "-":
        return None
    try:
        return float(v)
    except ValueError:
        return None


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    # 1. Parse GDP quarterly growth
    gdp_path = RAW_DIR / "gdp_qoq.csv"
    if not gdp_path.exists():
        log.error("GDP CSV not found: %s", gdp_path)
        return

    gdp_rows = parse_ons_csv(gdp_path)
    gdp_series = []
    for period, value in gdp_rows:
        date = parse_quarterly_date(period)
        if date is None:
            continue
        val = safe_float(value)
        if val is None:
            continue
        # Only include from 2000 onwards for chart clarity
        if date >= "2000-01":
            gdp_series.append({"date": date, "growthPct": val})

    log.info("GDP: %d quarterly points (%s to %s)",
             len(gdp_series), gdp_series[0]["date"] if gdp_series else "?",
             gdp_series[-1]["date"] if gdp_series else "?")

    # 2. Parse debt % of GDP — use monthly data only
    debt_path = RAW_DIR / "debt_pct.csv"
    if not debt_path.exists():
        log.error("Debt CSV not found: %s", debt_path)
        return

    debt_rows = parse_ons_csv(debt_path)
    debt_series = []
    for period, value in debt_rows:
        date = parse_monthly_date(period)
        if date is None:
            continue
        val = safe_float(value)
        if val is None:
            continue
        debt_series.append({"date": date, "debtPctGdp": val})

    log.info("Debt: %d monthly points (%s to %s)",
             len(debt_series), debt_series[0]["date"] if debt_series else "?",
             debt_series[-1]["date"] if debt_series else "?")

    # Headlines
    latest_gdp = gdp_series[-1] if gdp_series else None
    latest_debt = debt_series[-1] if debt_series else None

    output = {
        "topic": "gdp",
        "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
        "gdpGrowth": {
            "timeSeries": gdp_series,
            "latest": latest_gdp,
        },
        "publicDebt": {
            "timeSeries": debt_series,
            "latest": latest_debt,
        },
        "metadata": {
            "sources": [
                {
                    "name": "ONS",
                    "dataset": "Gross Domestic Product: Quarter on Quarter growth (IHYQ)",
                    "url": "https://www.ons.gov.uk/economy/grossdomesticproductgdp/timeseries/ihyq/pn2",
                    "frequency": "quarterly",
                },
                {
                    "name": "ONS",
                    "dataset": "Public Sector Net Debt (exc banks) as % of GDP (HF6X)",
                    "url": "https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/hf6x/pusf",
                    "frequency": "monthly",
                },
            ],
            "methodology": (
                "GDP growth is the quarter-on-quarter percentage change in chained volume measure, "
                "seasonally adjusted. Public sector net debt excludes public sector banks and is expressed "
                "as a percentage of GDP, not seasonally adjusted."
            ),
            "knownIssues": [
                "GDP Q2 2020 shows -19.9% — COVID lockdown outlier",
                "Debt methodology revised in Sep 2024 — caused upward revision to historical series",
            ],
        },
    }

    out_path = OUTPUT_DIR / "gdp.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info("Written %s (%d bytes)", out_path, out_path.stat().st_size)

    log.info("Headlines: GDP latest=%s%% (%s), Debt latest=%s%% (%s)",
             latest_gdp["growthPct"] if latest_gdp else "?",
             latest_gdp["date"] if latest_gdp else "?",
             latest_debt["debtPctGdp"] if latest_debt else "?",
             latest_debt["date"] if latest_debt else "?")


if __name__ == "__main__":
    main()
