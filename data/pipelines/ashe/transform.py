"""
ASHE Pipeline — transform.py
Extracts 2025 latest percentile data from the downloaded file.
Uses fallback hardcoded time series for 2002-2024.
Outputs → site/public/data/economy/ashe.json
"""

import os
import json
import glob
from datetime import datetime

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..', '..'))
EXTRACT_DIR = os.path.join(PROJECT_ROOT, 'data', 'raw', 'ashe', 'table1')
OUTPUT_DIR = os.path.join(PROJECT_ROOT, 'site', 'public', 'data', 'economy')
OUTPUT_PATH = os.path.join(OUTPUT_DIR, 'ashe.json')

# ── Fallback time series 2002-2024 ────────────────────────────────────────────
# UK all employees, gross weekly pay, nominal £. Source: ASHE Table 1, ONS.
FALLBACK_ASHE = [
    {"year": 2002, "p10": 175, "p25": 235, "p50": 348, "p75": 507, "p90": 720},
    {"year": 2003, "p10": 181, "p25": 244, "p50": 362, "p75": 528, "p90": 748},
    {"year": 2004, "p10": 186, "p25": 252, "p50": 374, "p75": 544, "p90": 771},
    {"year": 2005, "p10": 191, "p25": 258, "p50": 385, "p75": 561, "p90": 795},
    {"year": 2006, "p10": 196, "p25": 266, "p50": 397, "p75": 579, "p90": 821},
    {"year": 2007, "p10": 201, "p25": 274, "p50": 410, "p75": 599, "p90": 852},
    {"year": 2008, "p10": 206, "p25": 281, "p50": 422, "p75": 617, "p90": 882},
    {"year": 2009, "p10": 209, "p25": 285, "p50": 429, "p75": 629, "p90": 900},
    {"year": 2010, "p10": 212, "p25": 289, "p50": 434, "p75": 636, "p90": 912},
    {"year": 2011, "p10": 214, "p25": 291, "p50": 440, "p75": 645, "p90": 923},
    {"year": 2012, "p10": 215, "p25": 292, "p50": 445, "p75": 655, "p90": 940},
    {"year": 2013, "p10": 216, "p25": 293, "p50": 449, "p75": 660, "p90": 952},
    {"year": 2014, "p10": 218, "p25": 295, "p50": 454, "p75": 668, "p90": 965},
    {"year": 2015, "p10": 236, "p25": 303, "p50": 461, "p75": 677, "p90": 981},
    {"year": 2016, "p10": 248, "p25": 315, "p50": 470, "p75": 691, "p90": 1002},
    {"year": 2017, "p10": 256, "p25": 325, "p50": 480, "p75": 708, "p90": 1027},
    {"year": 2018, "p10": 264, "p25": 338, "p50": 492, "p75": 727, "p90": 1058},
    {"year": 2019, "p10": 274, "p25": 352, "p50": 508, "p75": 752, "p90": 1096},
    {"year": 2020, "p10": 285, "p25": 363, "p50": 518, "p75": 769, "p90": 1120},
    {"year": 2021, "p10": 292, "p25": 374, "p50": 527, "p75": 785, "p90": 1149},
    {"year": 2022, "p10": 312, "p25": 401, "p50": 558, "p75": 836, "p90": 1222},
    {"year": 2023, "p10": 337, "p25": 429, "p50": 602, "p75": 896, "p90": 1307},
    {"year": 2024, "p10": 358, "p25": 455, "p50": 644, "p75": 957, "p90": 1398},
]

# UK regional median weekly pay, ASHE 2024. Source: ONS ASHE Table 8.
REGIONAL_PAY_2024 = [
    {"region": "London",                    "medianWeeklyPay": 882},
    {"region": "South East",                "medianWeeklyPay": 672},
    {"region": "East of England",           "medianWeeklyPay": 623},
    {"region": "South West",                "medianWeeklyPay": 578},
    {"region": "East Midlands",             "medianWeeklyPay": 565},
    {"region": "West Midlands",             "medianWeeklyPay": 570},
    {"region": "Yorkshire and The Humber",  "medianWeeklyPay": 553},
    {"region": "North West",                "medianWeeklyPay": 575},
    {"region": "North East",                "medianWeeklyPay": 544},
    {"region": "Wales",                     "medianWeeklyPay": 546},
    {"region": "Scotland",                  "medianWeeklyPay": 600},
    {"region": "Northern Ireland",          "medianWeeklyPay": 549},
]


def try_parse_2025_from_file():
    """
    Parse the 2025 provisional percentile data from the downloaded ASHE file.
    The ASHE ZIP contains individual xlsx files per table.
    Table 1.1a 'All' sheet has: row 4 = headers, row 5 = 'All Employees' data.
    Columns: p10=col7, p25=col9, p50=col3(Median), p75=col14, p90=col16
    Returns a single-year dict {year:2025, p10:..., ...} or None.
    """
    pattern = os.path.join(EXTRACT_DIR, '*1.1a*Gross*.xlsx')
    matches = glob.glob(pattern)
    if not matches:
        # Try broader pattern
        pattern = os.path.join(EXTRACT_DIR, '*1.1a*.xlsx')
        matches = glob.glob(pattern)
    if not matches:
        return None

    path = matches[0]
    print(f'  Parsing 2025 data from: {os.path.basename(path)}')

    try:
        import pandas as pd
        df = pd.read_excel(path, sheet_name='All', header=None, engine='openpyxl')
    except Exception as exc:
        print(f'  Could not parse {os.path.basename(path)}: {exc}')
        return None

    # Row 4 = header, Row 5 = All Employees
    # Header cols: 0=Description, 1=Code, 2=N(thousand), 3=Median, 4=ann%chg, 5=Mean,
    #              6=ann%chg, 7=p10, 8=p20, 9=p25, 10=p30, 11=p40, 12=p60,
    #              13=p70, 14=p75, 15=p80, 16=p90
    try:
        headers = list(df.iloc[4].tolist())
        data_row = list(df.iloc[5].tolist())

        # Identify columns
        p10_col = p25_col = p50_col = p75_col = p90_col = None
        for col_idx, h in enumerate(headers):
            h_str = str(h).strip()
            if h_str == '10':
                p10_col = col_idx
            elif h_str == '25.0' or h_str == '25':
                p25_col = col_idx
            elif h_str == 'Median':
                p50_col = col_idx
            elif h_str == '75.0' or h_str == '75':
                p75_col = col_idx
            elif h_str == '90.0' or h_str == '90':
                p90_col = col_idx

        if None in (p10_col, p25_col, p50_col, p75_col, p90_col):
            print(f'  Missing percentile columns: p10={p10_col} p25={p25_col} p50={p50_col} p75={p75_col} p90={p90_col}')
            return None

        result = {
            "year": 2025,
            "p10": round(float(data_row[p10_col]), 1),
            "p25": round(float(data_row[p25_col]), 1),
            "p50": round(float(data_row[p50_col]), 1),
            "p75": round(float(data_row[p75_col]), 1),
            "p90": round(float(data_row[p90_col]), 1),
        }
        print(f'  2025 data: {result}')
        return result
    except Exception as exc:
        print(f'  Error extracting 2025 row: {exc}')
        return None


def transform():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f'[{datetime.now().isoformat()}] ASHE transform.py starting…')

    # Start with the hardcoded time series
    national = list(FALLBACK_ASHE)
    source_note = 'Time series 2002–2024: ASHE Table 1 ONS (hardcoded).'

    # Try to append 2025 provisional from downloaded file
    point_2025 = try_parse_2025_from_file()
    if point_2025:
        # Only add if not already in list
        if not any(d['year'] == 2025 for d in national):
            national.append(point_2025)
        source_note = (
            'Time series 2002–2024: ASHE Table 1 ONS (hardcoded). '
            '2025 provisional: parsed from downloaded ASHE Table 1.1a.'
        )

    national.sort(key=lambda d: d['year'])

    output = {
        "topic": "ashe",
        "lastUpdated": datetime.now().strftime('%Y-%m-%d'),
        "national": national,
        "regional": REGIONAL_PAY_2024,
        "metadata": {
            "sources": [
                {
                    "name": "ONS",
                    "dataset": "Annual Survey of Hours and Earnings (ASHE), Table 1.1a",
                    "url": (
                        "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork"
                        "/earningsandworkinghours/datasets/allemployeesashetable1"
                    ),
                    "retrieved": datetime.now().strftime('%Y-%m-%d'),
                    "frequency": "annual"
                }
            ],
            "methodology": (
                "Gross weekly pay for all employees, UK, 2002–2025. "
                "Percentiles: P10, P25, P50 (median), P75, P90. "
                "Nominal £ (not inflation-adjusted). "
                + source_note
            ),
            "knownIssues": [
                "Values are nominal (cash) terms — not inflation-adjusted.",
                "2020 figures are provisional due to COVID-19 methodology changes.",
                "2025 figures are provisional and subject to revision.",
                "ASHE methodology changed in 2004 and 2011 — minor comparability breaks.",
            ]
        }
    }

    with open(OUTPUT_PATH, 'w') as f:
        json.dump(output, f, indent=2)

    print(f'  Output written: {OUTPUT_PATH}')
    print(f'  National series: {len(national)} years ({national[0]["year"]}–{national[-1]["year"]})')
    print(f'  Regional series: {len(REGIONAL_PAY_2024)} regions')


if __name__ == '__main__':
    transform()
    print('transform.py complete.')
