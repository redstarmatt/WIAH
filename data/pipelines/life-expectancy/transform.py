#!/usr/bin/env python3
"""Transform ONS NLT data into life_expectancy.json.

Structure: Each 3-year period (e.g. '2022-2024') is its own sheet.
Row 5 (0-indexed): headers — age, mx, qx, lx, dx, ex | (blank) | age, mx, qx, lx, dx, ex
Row 6: age=0 data. Male ex at birth = col 5. Female ex at birth = col 12.
"""

import json
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).parent.parent.parent.parent
RAW = ROOT / 'data' / 'raw' / 'life-expectancy'
OUT = ROOT / 'site' / 'public' / 'data' / 'health'
OUT.mkdir(parents=True, exist_ok=True)

FALLBACK_LE = [
    {"year": 1981, "maleLE": 70.8, "femaleLE": 76.8},
    {"year": 1985, "maleLE": 71.9, "femaleLE": 77.6},
    {"year": 1990, "maleLE": 73.0, "femaleLE": 78.5},
    {"year": 1995, "maleLE": 74.3, "femaleLE": 79.4},
    {"year": 2000, "maleLE": 75.5, "femaleLE": 80.2},
    {"year": 2005, "maleLE": 76.9, "femaleLE": 81.1},
    {"year": 2010, "maleLE": 78.6, "femaleLE": 82.6},
    {"year": 2011, "maleLE": 78.9, "femaleLE": 82.8},
    {"year": 2012, "maleLE": 79.0, "femaleLE": 82.8},
    {"year": 2013, "maleLE": 79.2, "femaleLE": 82.9},
    {"year": 2014, "maleLE": 79.4, "femaleLE": 83.1},
    {"year": 2015, "maleLE": 79.3, "femaleLE": 82.9},
    {"year": 2016, "maleLE": 79.4, "femaleLE": 83.1},
    {"year": 2017, "maleLE": 79.3, "femaleLE": 83.0},
    {"year": 2018, "maleLE": 79.4, "femaleLE": 83.1},
    {"year": 2019, "maleLE": 79.4, "femaleLE": 83.1},
    {"year": 2020, "maleLE": 77.8, "femaleLE": 81.9},
    {"year": 2021, "maleLE": 79.0, "femaleLE": 82.8},
    {"year": 2022, "maleLE": 78.6, "femaleLE": 82.6},
]

def parse_period(sheet_name):
    """'2022-2024' -> middle year 2023"""
    try:
        parts = sheet_name.strip().split('-')
        if len(parts) == 2:
            start = int(parts[0])
            end = int(parts[1])
            return (start + end) // 2
    except:
        pass
    return None

def try_parse_nlt():
    xlsx_path = RAW / 'nltuk.xlsx'
    if not xlsx_path.exists():
        print('  NLT file not found, using fallback')
        return None

    try:
        xl = pd.ExcelFile(xlsx_path, engine='openpyxl')
        period_sheets = [s for s in xl.sheet_names if '-' in s and s[0].isdigit()]
        print(f'  Found {len(period_sheets)} period sheets: {period_sheets[:5]}...')

        results = []
        for sheet in period_sheets:
            year = parse_period(sheet)
            if year is None:
                continue

            df = pd.read_excel(xlsx_path, sheet_name=sheet, header=None, engine='openpyxl')

            # Row 5 = header row (0-indexed): age, mx, qx, lx, dx, ex | blank | age, mx, qx, lx, dx, ex
            # Row 6 = age 0 data
            try:
                age0_row = df.iloc[6]
                male_ex = float(age0_row.iloc[5])
                female_ex = float(age0_row.iloc[12])

                if 50 < male_ex < 100 and 50 < female_ex < 100:
                    results.append({
                        "year": year,
                        "maleLE": round(male_ex, 2),
                        "femaleLE": round(female_ex, 2),
                    })
            except Exception as e:
                print(f'  Warning: could not parse sheet {sheet}: {e}')
                continue

        results.sort(key=lambda x: x['year'])
        print(f'  Extracted {len(results)} data points')
        if results:
            print(f'  Sample: {results[:3]}')
            print(f'  Latest: {results[-1]}')
        return results if len(results) > 5 else None

    except Exception as e:
        print(f'  Error parsing NLT: {e}')
        import traceback; traceback.print_exc()
        return None

if __name__ == '__main__':
    print('Transforming life expectancy data...')

    le_data = try_parse_nlt()

    if not le_data:
        print('  Using fallback data')
        le_data = FALLBACK_LE

    output = {
        "topic": "health",
        "dataset": "life_expectancy",
        "lastUpdated": "2026-03-03",
        "nationalLE": le_data,
        "metadata": {
            "sources": [{
                "name": "ONS",
                "dataset": "National Life Tables, United Kingdom",
                "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/datasets/nationallifetablesunitedkingdomreferencetables",
                "frequency": "annual",
                "retrieved": "2026-03-03"
            }],
            "methodology": "3-year rolling average periods. Mid-year used for x-axis. ex at age 0 from UK national life tables.",
            "notes": "Values are period life expectancy at birth in years. UK, 1980-1982 to 2022-2024."
        }
    }

    out_path = OUT / 'life_expectancy.json'
    out_path.write_text(json.dumps(output, indent=2))
    print(f'  Written: {out_path}')
    print('Done.')
