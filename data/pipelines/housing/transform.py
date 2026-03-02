"""
Housing data pipeline — transform.py

Reads raw downloads and outputs housing.json with:
  - Affordability ratios (national + regional, 1997–present)
  - House price to earnings (national + regional)
  - UK HPI average prices (monthly, 1995–present, national + regional)
  - Rental affordability (rent as % of income)
  - Average monthly rents (monthly, 2005–present)
"""

import json
import logging
from pathlib import Path

import pandas as pd

LOG_FORMAT = "%(asctime)s  %(levelname)-5s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

RAW = Path(__file__).resolve().parent.parent.parent / "raw" / "housing"
OUT = Path(__file__).resolve().parent.parent.parent / "output" / "housing"
OUT.mkdir(parents=True, exist_ok=True)


def latest_raw(pattern):
    """Return the most recent file matching a glob pattern."""
    matches = sorted(RAW.glob(pattern))
    if not matches:
        log.warning(f"No files matching {pattern}")
        return None
    return matches[-1]


# ── 1. Affordability ratios ──────────────────────────────────────────────────

def extract_affordability():
    """Extract median affordability ratio (house price / earnings) by region."""
    path = latest_raw("*affordability_ratio*.xlsx")
    if not path:
        return None, None, None

    # Sheet 1c = median affordability ratios
    df = pd.read_excel(path, sheet_name="1c", header=None)
    header = df.iloc[1].values
    data_rows = df.iloc[2:]

    # Build year list (skip last col which is "5-year average")
    years = []
    for h in header[2:]:
        try:
            y = int(float(h))
            years.append(y)
        except (ValueError, TypeError):
            break  # stop at non-numeric column

    # Regions we care about (rows 2-13 are E&W, England, Wales, 9 English regions)
    region_names = {
        "England and Wales": "E&W",
        "England": "ENG",
        "Wales": "WAL",
        "North East": "NE",
        "North West": "NW",
        "Yorkshire and The Humber": "YH",
        "East Midlands": "EM",
        "West Midlands": "WM",
        "East of England": "E",
        "London": "LON",
        "South East": "SE",
        "South West": "SW",
    }

    national_ts = []
    regional = {}

    for _, row in data_rows.iterrows():
        name = str(row.iloc[1]).strip()
        if name not in region_names:
            continue

        code = region_names[name]
        values = []
        for i, year in enumerate(years):
            try:
                val = float(row.iloc[2 + i])
                values.append({"year": year, "ratio": round(val, 2)})
            except (ValueError, TypeError):
                pass

        if code == "ENG":
            national_ts = values
        if code != "E&W":
            regional[name] = values

    # Also get house prices and earnings from sheets 1a and 1b
    df_prices = pd.read_excel(path, sheet_name="1a", header=None)
    df_earnings = pd.read_excel(path, sheet_name="1b", header=None)

    prices_ts = []
    earnings_ts = []
    for i, year in enumerate(years):
        try:
            price = float(df_prices.iloc[3].iloc[2 + i])  # England row
            prices_ts.append({"year": year, "medianPrice": int(price)})
        except (ValueError, TypeError):
            pass
        try:
            earn = float(df_earnings.iloc[3].iloc[2 + i])  # England row
            earnings_ts.append({"year": year, "medianEarnings": int(earn)})
        except (ValueError, TypeError):
            pass

    log.info(f"Affordability: {len(national_ts)} annual points (1997–{years[-1]})")
    log.info(f"  Latest England ratio: {national_ts[-1]['ratio']}")
    log.info(f"  {len(regional)} regions extracted")

    return national_ts, regional, prices_ts, earnings_ts


# ── 2. UK HPI (house prices monthly) ────────────────────────────────────────

def extract_hpi():
    """Extract monthly average house prices from Land Registry HPI CSV."""
    path = latest_raw("*uk_hpi*.csv")
    if not path:
        return None, None

    df = pd.read_csv(path, low_memory=False)

    # Parse dates — format is DD/MM/YYYY
    df["DateParsed"] = pd.to_datetime(df["Date"], format="%d/%m/%Y", errors="coerce")
    df = df.dropna(subset=["DateParsed"])
    df = df.sort_values("DateParsed")

    # National time series (England only for consistency)
    england = df[df["RegionName"] == "England"].copy()
    england = england[england["DateParsed"] >= "1995-01-01"]

    national_ts = []
    for _, row in england.iterrows():
        try:
            avg = float(row["AveragePrice"])
            date_str = row["DateParsed"].strftime("%Y-%m")
            national_ts.append({"date": date_str, "averagePrice": int(round(avg))})
        except (ValueError, TypeError):
            pass

    # Regional latest values
    regions = [
        "North East", "North West", "Yorkshire and The Humber",
        "East Midlands", "West Midlands", "East of England",
        "London", "South East", "South West", "Wales",
    ]
    regional = {}
    for reg in regions:
        reg_df = df[df["RegionName"] == reg]
        if len(reg_df) == 0:
            continue
        latest = reg_df.iloc[-1]
        try:
            regional[reg] = {
                "date": latest["DateParsed"].strftime("%Y-%m"),
                "averagePrice": int(round(float(latest["AveragePrice"]))),
                "annualChange": round(float(latest["12m%Change"]), 1)
                    if pd.notna(latest.get("12m%Change")) else None,
            }
        except (ValueError, TypeError):
            pass

    # First-time buyer vs former owner-occupier (for FTB affordability)
    ftb_ts = []
    for _, row in england.iterrows():
        try:
            ftb = float(row["FTBPrice"]) if pd.notna(row.get("FTBPrice")) else None
            foo = float(row["FOOPrice"]) if pd.notna(row.get("FOOPrice")) else None
            if ftb and foo:
                date_str = row["DateParsed"].strftime("%Y-%m")
                ftb_ts.append({
                    "date": date_str,
                    "ftbPrice": int(round(ftb)),
                    "fooPrice": int(round(foo)),
                })
        except (ValueError, TypeError):
            pass

    log.info(f"HPI: {len(national_ts)} monthly points")
    log.info(f"  Latest England avg: £{national_ts[-1]['averagePrice']:,}")
    log.info(f"  {len(regional)} regions")
    log.info(f"  FTB series: {len(ftb_ts)} points")

    return national_ts, regional, ftb_ts


# ── 3. Rental affordability ──────────────────────────────────────────────────

def extract_rental_affordability():
    """Extract rent as proportion of income from ONS private rental affordability."""
    path = latest_raw("*rental_affordability*.xlsx")
    if not path:
        return None

    # Table 3: ratio of private rent to income
    df = pd.read_excel(path, sheet_name="Table 3", header=None)
    header = df.iloc[2].values  # Financial year headers
    data_rows = df.iloc[3:]

    years = []
    for h in header[2:]:
        s = str(h).strip()
        if "/" in s:
            years.append(s)

    results = {}
    region_map = {
        "England": "ENG",
        "Wales": "WAL",
        "Northern Ireland": "NI",
        "North East": "NE",
        "North West": "NW",
        "Yorkshire and The Humber": "YH",
        "East Midlands": "EM",
        "West Midlands": "WM",
        "East of England": "E",
        "London": "LON",
        "South East": "SE",
        "South West": "SW",
    }

    for _, row in data_rows.iterrows():
        name = str(row.iloc[1]).strip()
        if name not in region_map:
            continue

        ts = []
        for i, fy in enumerate(years):
            try:
                val = float(row.iloc[2 + i])
                ts.append({"year": fy, "rentToIncomePct": round(val * 100, 1)})
            except (ValueError, TypeError):
                pass

        results[name] = ts

    national = results.get("England", [])
    log.info(f"Rental affordability: {len(national)} annual points")
    if national:
        log.info(f"  Latest England: {national[-1]['rentToIncomePct']}%")

    return results


# ── 4. Average monthly rents ─────────────────────────────────────────────────

def extract_rent_levels():
    """Extract average monthly rent from PIPR historical series."""
    path = latest_raw("*rent_index*.xlsx")
    if not path:
        return None

    # Table 3 = average monthly rents in £
    df = pd.read_excel(path, sheet_name="Table 3", header=None)
    # Row 2 = region headers, row 3 = region codes, rows 4+ = data
    data_rows = df.iloc[4:]

    # Column 3 = England (check header confirms)
    header_row = df.iloc[2].values

    national_ts = []
    for _, row in data_rows.iterrows():
        try:
            date_val = row.iloc[0]
            if pd.isna(date_val):
                continue
            date_str = pd.Timestamp(date_val).strftime("%Y-%m")
            eng_val = row.iloc[3]  # England column
            if eng_val == "[x]" or pd.isna(eng_val):
                continue
            rent = float(eng_val)
            national_ts.append({"date": date_str, "avgMonthlyRent": int(rent)})
        except (ValueError, TypeError):
            pass

    # Also get UK, London values for latest
    uk_ts = []
    london_col = None
    for i, h in enumerate(header_row):
        if str(h).strip() == "London":
            london_col = i
            break

    london_ts = []
    if london_col:
        for _, row in data_rows.iterrows():
            try:
                date_val = row.iloc[0]
                if pd.isna(date_val):
                    continue
                date_str = pd.Timestamp(date_val).strftime("%Y-%m")
                lon_val = row.iloc[london_col]
                if lon_val == "[x]" or pd.isna(lon_val):
                    continue
                london_ts.append({"date": date_str, "avgMonthlyRent": int(float(lon_val))})
            except (ValueError, TypeError):
                pass

    log.info(f"Rent levels: {len(national_ts)} monthly points")
    if national_ts:
        log.info(f"  Latest England: £{national_ts[-1]['avgMonthlyRent']}/month")
    if london_ts:
        log.info(f"  Latest London: £{london_ts[-1]['avgMonthlyRent']}/month")

    return national_ts, london_ts


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    log.info("=== Housing transform.py ===")

    aff_national, aff_regional, prices_ts, earnings_ts = extract_affordability()
    hpi_national, hpi_regional, ftb_ts = extract_hpi()
    rent_aff = extract_rental_affordability()
    rent_nat, rent_london = extract_rent_levels()

    output = {
        "topic": "housing",
        "lastUpdated": pd.Timestamp.now().strftime("%Y-%m-%d"),
        "national": {
            "affordability": {
                "timeSeries": aff_national or [],
                "priceTimeSeries": prices_ts or [],
                "earningsTimeSeries": earnings_ts or [],
            },
            "housePrices": {
                "timeSeries": hpi_national or [],
                "ftbTimeSeries": ftb_ts or [],
            },
            "rents": {
                "affordability": rent_aff.get("England", []) if rent_aff else [],
                "levelTimeSeries": rent_nat or [],
                "londonTimeSeries": rent_london or [],
            },
        },
        "regional": {
            "affordability": aff_regional or {},
            "housePrices": hpi_regional or {},
            "rentAffordability": {k: v for k, v in (rent_aff or {}).items() if k != "England"},
        },
        "metadata": {
            "sources": [
                {
                    "name": "ONS",
                    "dataset": "Housing affordability in England and Wales, 2024",
                    "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/ratioofhousepricetoworkplacebasedearningslowerquartileandmedian",
                    "frequency": "annual",
                },
                {
                    "name": "HM Land Registry",
                    "dataset": "UK House Price Index",
                    "url": "https://www.gov.uk/government/collections/uk-house-price-index-reports",
                    "frequency": "monthly",
                },
                {
                    "name": "ONS",
                    "dataset": "Private rental affordability, England, 2024",
                    "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/privaterentalaffordabilityengland",
                    "frequency": "annual",
                },
                {
                    "name": "ONS",
                    "dataset": "Price Index of Private Rents (PIPR), historical series",
                    "url": "https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/priceindexofprivaterentsukhistoricalseries",
                    "frequency": "monthly",
                },
            ],
            "methodology": (
                "Affordability ratios divide median house prices (Land Registry price paid, "
                "year ending September) by median gross annual workplace-based earnings (ASHE). "
                "House prices from Land Registry UK HPI, mix-adjusted. Private rents from ONS "
                "PIPR series, chain-linked historical data. Rent affordability from ONS using "
                "Family Resources Survey data."
            ),
            "knownIssues": [
                "Affordability ratio methodology changed slightly in 2013 (ASHE reweighting).",
                "Private rent data only covers England from 2005; UK-wide from 2015.",
                "Rental affordability FRS sample: regional estimates have wider confidence intervals.",
                "HPI uses mix-adjustment to account for changing composition of sales.",
            ],
        },
    }

    dest = OUT / "housing.json"
    dest.write_text(json.dumps(output, indent=2))
    size_kb = dest.stat().st_size / 1024
    log.info(f"\n✓ Written to {dest} ({size_kb:.0f} KB)")


if __name__ == "__main__":
    main()
