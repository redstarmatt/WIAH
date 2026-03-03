"""
Transform DLUHC social housing ODS files into JSON for the WIAH site.

Table 104: Dwelling stock by tenure (thousands) — from 1991 onward
Table 213: New build completions by tenure — from 2000 onward

Output: data/output/housing/social_housing.json
"""

import os
import json
import re
import pandas as pd
import datetime

RAW_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "raw", "social-housing")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "output", "housing")


def clean_val(v):
    """Convert a cell value to int or None. Strips provisional markers, commas, etc."""
    if v is None or (isinstance(v, float) and pd.isna(v)):
        return None
    s = str(v).strip()
    # Remove markers like [x], [p], [r], [note X]
    s = re.sub(r'\[.*?\]', '', s).strip()
    if s == '' or s == '..' or s == '-':
        return None
    # Remove commas
    s = s.replace(',', '')
    try:
        return int(float(s))
    except (ValueError, TypeError):
        return None


def parse_table_104():
    """Parse dwelling stock by tenure from Table 104."""
    path = os.path.join(RAW_DIR, "LiveTable104.ods")
    df = pd.read_excel(path, sheet_name="LT_104", header=None, engine="odf")

    # Header is at row 4, data starts at row 5
    records = []
    for i in range(5, len(df)):
        row = df.iloc[i]
        year = clean_val(row.iloc[1])
        if year is None or year < 1991:
            continue

        owner_occupied = clean_val(row.iloc[2])
        private_rented = clean_val(row.iloc[3])
        prp = clean_val(row.iloc[4])  # Private registered providers (housing assoc)
        la = clean_val(row.iloc[5])   # Local authority
        other_public = clean_val(row.iloc[6])
        all_dwellings = clean_val(row.iloc[7])

        # Social rented = PRP + LA + other public
        social = None
        if prp is not None and la is not None:
            social = prp + la + (other_public or 0)

        records.append({
            "year": year,
            "ownerOccupied": owner_occupied,
            "privateRented": private_rented,
            "housingAssociation": prp,
            "localAuthority": la,
            "otherPublic": other_public,
            "socialRented": social,
            "allDwellings": all_dwellings,
        })

    print(f"  Table 104: {len(records)} years from {records[0]['year']} to {records[-1]['year']}")
    return records


def parse_table_213():
    """Parse new build completions by tenure from Table 213."""
    path = os.path.join(RAW_DIR, "LiveTable213.ods")
    df = pd.read_excel(path, sheet_name="LT_213_financial_year", header=None, engine="odf")

    records = []
    for i in range(5, len(df)):
        row = df.iloc[i]
        fy_raw = str(row.iloc[0]).strip()

        # Parse financial year like "2000-01" -> 2000
        match = re.match(r'(\d{4})-\d{2}', fy_raw)
        if not match:
            continue
        start_year = int(match.group(1))
        if start_year < 2000:
            continue

        private_completions = clean_val(row.iloc[5])
        ha_completions = clean_val(row.iloc[6])
        la_completions = clean_val(row.iloc[7])
        all_completions = clean_val(row.iloc[8])

        social_completions = None
        if ha_completions is not None and la_completions is not None:
            social_completions = ha_completions + la_completions

        records.append({
            "financialYear": fy_raw,
            "startYear": start_year,
            "privateCompletions": private_completions,
            "housingAssocCompletions": ha_completions,
            "localAuthorityCompletions": la_completions,
            "socialCompletions": social_completions,
            "allCompletions": all_completions,
        })

    print(f"  Table 213: {len(records)} years from {records[0]['financialYear']} to {records[-1]['financialYear']}")
    return records


def main():
    print("Transforming DLUHC social housing data...")

    stock = parse_table_104()
    completions = parse_table_213()

    # Compute summary stats
    latest_stock = stock[-1]
    social_share = None
    if latest_stock["socialRented"] and latest_stock["allDwellings"]:
        social_share = round(latest_stock["socialRented"] / latest_stock["allDwellings"] * 100, 1)

    # Find peak social stock
    peak = max(stock, key=lambda r: r["socialRented"] or 0)

    # Latest completions
    latest_comp = completions[-1]

    output = {
        "topic": "housing",
        "subtopic": "social-housing",
        "lastUpdated": datetime.date.today().isoformat(),
        "summary": {
            "latestYear": latest_stock["year"],
            "socialRentedStock": latest_stock["socialRented"],
            "socialSharePct": social_share,
            "allDwellings": latest_stock["allDwellings"],
            "peakSocialYear": peak["year"],
            "peakSocialStock": peak["socialRented"],
            "latestCompletionYear": latest_comp["financialYear"],
            "socialCompletions": latest_comp["socialCompletions"],
            "allCompletions": latest_comp["allCompletions"],
        },
        "dwellingStock": stock,
        "newBuildCompletions": completions,
        "metadata": {
            "sources": [
                {
                    "name": "DLUHC",
                    "dataset": "Live Table 104: Dwelling stock by tenure, England",
                    "url": "https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants",
                    "retrieved": datetime.date.today().isoformat(),
                    "frequency": "annual",
                },
                {
                    "name": "DLUHC",
                    "dataset": "Live Table 213: House building completions by tenure, England",
                    "url": "https://www.gov.uk/government/statistical-data-sets/live-tables-on-house-building",
                    "retrieved": datetime.date.today().isoformat(),
                    "frequency": "quarterly",
                },
            ],
            "methodology": (
                "Dwelling stock figures are from DLUHC Live Table 104, measured at 31 March each year. "
                "Social rented is the sum of local authority, private registered provider (housing association), "
                "and other public sector dwellings. New build completions are from Live Table 213, by financial year. "
                "Recent years may be provisional [p] or revised [r]."
            ),
            "knownIssues": [
                "Pre-1991 tenure breakdowns are incomplete — series starts at 1991.",
                "Latest year (2024) stock figures are provisional.",
                "2024-25 completions figures are provisional and cover only part of the year.",
            ],
        },
    }

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_DIR, "social_housing.json")
    with open(out_path, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nOutput written to {out_path}")
    print(f"  Stock: {len(stock)} years, Completions: {len(completions)} years")
    print(f"  Social rented share in {latest_stock['year']}: {social_share}%")
    print(f"  Peak social stock: {peak['socialRented']:,} in {peak['year']}")
    print(f"  Latest completions ({latest_comp['financialYear']}): {latest_comp['socialCompletions']:,} social, {latest_comp['allCompletions']:,} total")


if __name__ == "__main__":
    main()
