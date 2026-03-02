"""
Economy — transform.py

Processes ONS timeseries CSVs into data/output/economy/economy.json.

Sources:
  1. D7G7  — CPI annual inflation rate
  2. KAB9  — Average weekly earnings, nominal level
  3. A3WX  — Average weekly earnings, real terms level
  4. LF24  — Employment rate (16–64)
  5. MGSX  — Unemployment rate (16+)
  6. LF2S  — Economic inactivity rate (16–64)
  7. LZVB  — Output per hour worked, index
  8. CRXX  — Real household disposable income per head
  + Hardcoded Gini coefficient time series (from ONS annual publication)
"""

import csv
import json
import logging
import re
from pathlib import Path

import pandas as pd

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "economy"
OUTPUT_DIR = ROOT / "data" / "output" / "economy"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

MONTH_MAP = {
    "JAN": "01", "FEB": "02", "MAR": "03", "APR": "04",
    "MAY": "05", "JUN": "06", "JUL": "07", "AUG": "08",
    "SEP": "09", "OCT": "10", "NOV": "11", "DEC": "12",
}


def latest_raw(pattern: str) -> Path:
    files = sorted(RAW_DIR.glob(pattern))
    if not files:
        raise FileNotFoundError(f"No files matching {pattern} in {RAW_DIR}")
    return files[-1]


# ── Generic ONS CSV parser ────────────────────────────────────────────────────

def parse_ons_csv(path: Path, frequency: str = "monthly", min_year: int = 2000):
    """
    Parse an ONS timeseries CSV. Returns list of (date_str, value) tuples.

    frequency: "monthly" → prefer monthly rows ("2024 JAN" → "2024-01")
               "quarterly" → prefer quarterly rows ("2024 Q1" → "2024-Q1")
               "annual" → annual rows only ("2024" → "2024")
    """
    rows = []
    with open(path, "r", encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) < 2:
                continue
            period = row[0].strip().strip('"')
            value = row[1].strip().strip('"')

            # Skip metadata rows
            if not period or not value:
                continue

            try:
                val = float(value)
            except ValueError:
                continue

            # Parse period format
            if frequency == "monthly":
                # Match "2024 JAN" format
                m = re.match(r"^(\d{4})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$", period)
                if m:
                    year = int(m.group(1))
                    if year >= min_year:
                        date_str = f"{m.group(1)}-{MONTH_MAP[m.group(2)]}"
                        rows.append((date_str, val))
            elif frequency == "quarterly":
                # Match "2024 Q1" format
                m = re.match(r"^(\d{4})\s+Q(\d)$", period)
                if m:
                    year = int(m.group(1))
                    if year >= min_year:
                        date_str = f"{m.group(1)}-Q{m.group(2)}"
                        rows.append((date_str, val))
            elif frequency == "annual":
                m = re.match(r"^(\d{4})$", period)
                if m:
                    year = int(m.group(1))
                    if year >= min_year:
                        rows.append((period, val))

    return sorted(rows, key=lambda x: x[0])


# ── 1. INFLATION ────────────────────────────────────────────────────────────

def extract_inflation(path: Path) -> list:
    log.info("Extracting CPI inflation…")
    rows = parse_ons_csv(path, "monthly", min_year=2010)
    series = [{"date": d, "cpiPct": v} for d, v in rows]
    log.info(f"  → {len(series)} monthly points ({series[0]['date']} to {series[-1]['date']})")
    log.info(f"  Latest: {series[-1]['cpiPct']}%")
    return series


# ── 2. WAGES ─────────────────────────────────────────────────────────────────

def extract_wages_nominal(path: Path) -> list:
    log.info("Extracting nominal wages (AWE)…")
    rows = parse_ons_csv(path, "monthly", min_year=2000)
    series = [{"date": d, "weeklyGBP": v} for d, v in rows]
    log.info(f"  → {len(series)} monthly points")
    log.info(f"  Latest: £{series[-1]['weeklyGBP']}/week")
    return series


def extract_wages_real(path: Path) -> list:
    log.info("Extracting real wages (AWE, CPI-adjusted)…")
    # Try monthly first, fall back to quarterly
    rows = parse_ons_csv(path, "monthly", min_year=2000)
    if len(rows) < 10:
        log.info("  Monthly data sparse, using quarterly…")
        rows = parse_ons_csv(path, "quarterly", min_year=2000)
    series = [{"date": d, "weeklyGBP": v} for d, v in rows]
    log.info(f"  → {len(series)} points")
    if series:
        log.info(f"  Latest: £{series[-1]['weeklyGBP']}/week (real)")
    return series


# ── 3. LABOUR MARKET ──────────────────────────────────────────────────────────

def extract_labour_market(emp_path: Path, unemp_path: Path, inact_path: Path) -> list:
    log.info("Extracting labour market data…")
    emp = {d: v for d, v in parse_ons_csv(emp_path, "monthly", min_year=2000)}
    unemp = {d: v for d, v in parse_ons_csv(unemp_path, "monthly", min_year=2000)}
    inact = {d: v for d, v in parse_ons_csv(inact_path, "monthly", min_year=2000)}

    # Combine on shared dates
    all_dates = sorted(set(emp.keys()) & set(unemp.keys()) & set(inact.keys()))
    series = []
    for d in all_dates:
        series.append({
            "date": d,
            "employmentPct": emp[d],
            "unemploymentPct": unemp[d],
            "inactivityPct": inact[d],
        })

    log.info(f"  → {len(series)} monthly points ({series[0]['date']} to {series[-1]['date']})")
    log.info(f"  Latest: emp {series[-1]['employmentPct']}%, unemp {series[-1]['unemploymentPct']}%, inact {series[-1]['inactivityPct']}%")
    return series


# ── 4. PRODUCTIVITY ──────────────────────────────────────────────────────────

def extract_productivity(path: Path) -> list:
    log.info("Extracting productivity (output per hour)…")
    rows = parse_ons_csv(path, "quarterly", min_year=2000)
    series = [{"date": d, "index": v} for d, v in rows]
    log.info(f"  → {len(series)} quarterly points")
    if series:
        log.info(f"  Latest: {series[-1]['index']} ({series[-1]['date']})")
    return series


# ── 5. LIVING STANDARDS ───────────────────────────────────────────────────────

def extract_rhdi(path: Path) -> list:
    log.info("Extracting real household disposable income per head…")
    rows = parse_ons_csv(path, "quarterly", min_year=2000)
    series = [{"date": d, "gbpPerHead": v} for d, v in rows]
    log.info(f"  → {len(series)} quarterly points")
    if series:
        log.info(f"  Latest: £{series[-1]['gbpPerHead']}/head ({series[-1]['date']})")
    return series


# ── 6. INEQUALITY (hardcoded from ONS publication) ────────────────────────────

def build_gini_series() -> list:
    """
    Gini coefficient for disposable income from ONS
    'Effects of Taxes and Benefits on Household Income' / 'Household Income Inequality'.
    Source: ONS, FYE = Financial Year Ending.
    """
    log.info("Building Gini coefficient series from published ONS data…")

    gini = [
        {"year": 2010, "gini": 34.0},
        {"year": 2011, "gini": 33.7},
        {"year": 2012, "gini": 32.3},
        {"year": 2013, "gini": 33.2},
        {"year": 2014, "gini": 34.0},
        {"year": 2015, "gini": 34.7},
        {"year": 2016, "gini": 33.6},
        {"year": 2017, "gini": 34.2},
        {"year": 2018, "gini": 34.2},
        {"year": 2019, "gini": 34.6},
        {"year": 2020, "gini": 35.4},
        {"year": 2021, "gini": 35.0},
        {"year": 2022, "gini": 34.4},
        {"year": 2023, "gini": 33.1},
        {"year": 2024, "gini": 32.9},
    ]
    log.info(f"  → {len(gini)} annual points ({gini[0]['year']}–{gini[-1]['year']})")
    log.info(f"  Latest Gini: {gini[-1]['gini']}% (FYE {gini[-1]['year']})")
    return gini


# ── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    log.info("=== Economy transform.py ===")

    cpi_path = latest_raw("*cpi_annual_rate*")
    nom_path = latest_raw("*awe_nominal_level*")
    real_path = latest_raw("*awe_real_level*")
    emp_path = latest_raw("*_employment_rate*")
    unemp_path = latest_raw("*unemployment_rate*")
    inact_path = latest_raw("*inactivity_rate*")
    prod_path = latest_raw("*productivity_index*")
    rhdi_path = latest_raw("*rhdi_per_head*")

    inflation = extract_inflation(cpi_path)
    wages_nominal = extract_wages_nominal(nom_path)
    wages_real = extract_wages_real(real_path)
    labour_market = extract_labour_market(emp_path, unemp_path, inact_path)
    productivity = extract_productivity(prod_path)
    rhdi = extract_rhdi(rhdi_path)
    gini = build_gini_series()

    output = {
        "topic": "economy",
        "lastUpdated": pd.Timestamp.now().strftime("%Y-%m-%d"),
        "national": {
            "inflation": {"timeSeries": inflation},
            "wages": {
                "nominalTimeSeries": wages_nominal,
                "realTimeSeries": wages_real,
            },
            "labourMarket": {"timeSeries": labour_market},
            "productivity": {"timeSeries": productivity},
            "livingStandards": {
                "rhdiTimeSeries": rhdi,
                "giniTimeSeries": gini,
            },
        },
        "regional": {},
        "metadata": {
            "sources": [
                {
                    "name": "ONS",
                    "dataset": "Consumer Price Inflation (MM23), D7G7",
                    "url": "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7g7/mm23",
                    "frequency": "monthly",
                },
                {
                    "name": "ONS",
                    "dataset": "Average Weekly Earnings (EARN01), KAB9 / A3WX",
                    "url": "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/kab9/lms",
                    "frequency": "monthly",
                },
                {
                    "name": "ONS",
                    "dataset": "Labour Market Statistics (LMS), LF24 / MGSX / LF2S",
                    "url": "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/timeseries/lf24/lms",
                    "frequency": "monthly",
                },
                {
                    "name": "ONS",
                    "dataset": "Labour Productivity (PRDY), LZVB",
                    "url": "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/timeseries/lzvb/prdy",
                    "frequency": "quarterly",
                },
                {
                    "name": "ONS",
                    "dataset": "UK Economic Accounts (UKEA), CRXX",
                    "url": "https://www.ons.gov.uk/economy/grossdomesticproductgdp/timeseries/crxx/ukea",
                    "frequency": "quarterly",
                },
                {
                    "name": "ONS",
                    "dataset": "Household Income Inequality, FYE 2024",
                    "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/householdincomeinequalityfinancial/financialyearending2024",
                    "frequency": "annual",
                },
            ],
            "methodology": (
                "CPI is the Consumer Prices Index annual rate (all items). "
                "Average Weekly Earnings (AWE) covers the whole economy, seasonally adjusted; "
                "real terms adjusted using CPI. Labour market data from the Labour Force Survey "
                "(3-month rolling averages) — ONS notes reduced quality due to falling LFS response rates. "
                "Productivity is output per hour worked (whole economy, chained volume measure). "
                "RHDI is real household disposable income per head (chained volume, seasonally adjusted). "
                "Gini coefficient for equivalised disposable income from ONS annual publication."
            ),
            "knownIssues": [
                "Labour Force Survey response rates have declined — labour market figures are now 'official statistics in development'.",
                "Real wages series A3WX uses CPI adjustment; CPIH-adjusted figures would be slightly different.",
                "Gini coefficient for FYE 2020 affected by pandemic — ONS notes measurement challenges.",
                "Productivity index rebased to 2023 = 100.",
            ],
        },
    }

    out_path = OUTPUT_DIR / "economy.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"\n✓ Written to {out_path} ({out_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
