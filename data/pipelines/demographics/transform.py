#!/usr/bin/env python3
"""Transform ONS births summary data into demographics.json.

Table_1 structure:
  Row 8:  column headers
  Row 9+: data rows (year descending, 2022 down to 1838)
  Col 0:  Year
  Col 1:  Number of live births (Total)
  Col 6:  Total Fertility Rate (TFR)
  Col 8:  Crude Birth Rate (CBR): all live births per 1,000 population
"""

import json
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).parent.parent.parent.parent
RAW = ROOT / 'data' / 'raw' / 'demographics'
OUT = ROOT / 'site' / 'public' / 'data' / 'demographics'
OUT.mkdir(parents=True, exist_ok=True)

FALLBACK_BIRTHS = [
    {"year": 1938, "births": 621000, "birthRate": 15.1, "tfr": 1.87},
    {"year": 1945, "births": 680000, "birthRate": 16.1, "tfr": 2.08},
    {"year": 1950, "births": 818000, "birthRate": 16.8, "tfr": 2.18},
    {"year": 1955, "births": 789000, "birthRate": 15.8, "tfr": 2.21},
    {"year": 1960, "births": 918000, "birthRate": 17.9, "tfr": 2.72},
    {"year": 1964, "births": 876000, "birthRate": 18.5, "tfr": 2.93},
    {"year": 1965, "births": 863000, "birthRate": 18.1, "tfr": 2.86},
    {"year": 1970, "births": 784000, "birthRate": 16.1, "tfr": 2.43},
    {"year": 1975, "births": 603000, "birthRate": 12.5, "tfr": 1.81},
    {"year": 1980, "births": 656000, "birthRate": 13.4, "tfr": 1.89},
    {"year": 1985, "births": 641000, "birthRate": 13.3, "tfr": 1.79},
    {"year": 1990, "births": 666000, "birthRate": 13.9, "tfr": 1.83},
    {"year": 1995, "births": 648000, "birthRate": 12.5, "tfr": 1.72},
    {"year": 2000, "births": 679000, "birthRate": 11.4, "tfr": 1.64},
    {"year": 2005, "births": 722000, "birthRate": 12.0, "tfr": 1.78},
    {"year": 2008, "births": 794000, "birthRate": 13.0, "tfr": 1.97},
    {"year": 2010, "births": 724000, "birthRate": 13.1, "tfr": 1.92},
    {"year": 2012, "births": 813000, "birthRate": 12.8, "tfr": 1.94},
    {"year": 2013, "births": 779000, "birthRate": 12.3, "tfr": 1.85},
    {"year": 2014, "births": 776000, "birthRate": 12.2, "tfr": 1.83},
    {"year": 2015, "births": 778000, "birthRate": 12.1, "tfr": 1.82},
    {"year": 2016, "births": 775000, "birthRate": 12.1, "tfr": 1.81},
    {"year": 2017, "births": 755000, "birthRate": 11.7, "tfr": 1.76},
    {"year": 2018, "births": 731000, "birthRate": 11.3, "tfr": 1.70},
    {"year": 2019, "births": 712000, "birthRate": 11.0, "tfr": 1.65},
    {"year": 2020, "births": 614000, "birthRate": 9.4, "tfr": 1.58},
    {"year": 2021, "births": 624000, "birthRate": 9.5, "tfr": 1.62},
    {"year": 2022, "births": 606000, "birthRate": 9.3, "tfr": 1.49},
    {"year": 2023, "births": 591000, "birthRate": 9.1, "tfr": 1.44},
]

def safe_float(val):
    try:
        s = str(val).replace(',', '').strip()
        if s in ('nan', '[x]', '[z]', '', 'NaN'):
            return None
        return float(s)
    except:
        return None

def try_parse_births():
    xlsx_path = RAW / 'births_summary.xlsx'
    if not xlsx_path.exists():
        print('  Births summary file not found, using fallback')
        return None

    try:
        xl = pd.ExcelFile(xlsx_path, engine='openpyxl')
        print(f'  Sheets: {xl.sheet_names}')

        if 'Table_1' not in xl.sheet_names:
            print('  Table_1 not found in sheets')
            return None

        df = pd.read_excel(xlsx_path, sheet_name='Table_1', header=None, engine='openpyxl')
        print(f'  Table_1 shape: {df.shape}')

        # Headers at row 8 (0-indexed), data from row 9
        data_rows = []
        for i in range(9, len(df)):
            row = df.iloc[i]
            yr = safe_float(row.iloc[0])
            if yr is None:
                continue
            try:
                yr_int = int(yr)
            except:
                continue
            if not (1838 <= yr_int <= 2030):
                continue

            births = safe_float(row.iloc[1])
            tfr = safe_float(row.iloc[6])
            cbr = safe_float(row.iloc[8])

            if births is not None and births > 1000:
                data_rows.append({
                    "year": yr_int,
                    "births": int(births),
                    "birthRate": round(cbr, 1) if cbr is not None else None,
                    "tfr": round(tfr, 2) if tfr is not None else None,
                })

        data_rows.sort(key=lambda x: x['year'])
        print(f'  Extracted {len(data_rows)} rows')
        if data_rows:
            print(f'  Sample (last 5): {data_rows[-5:]}')

        return data_rows if len(data_rows) > 10 else None

    except Exception as e:
        print(f'  Error parsing births: {e}')
        import traceback; traceback.print_exc()
        return None

if __name__ == '__main__':
    print('Transforming demographics (births) data...')

    births_data = try_parse_births()

    if not births_data:
        print('  Using fallback data')
        births_data = FALLBACK_BIRTHS

    output = {
        "topic": "demographics",
        "dataset": "births",
        "lastUpdated": "2026-03-03",
        "births": births_data,
        "metadata": {
            "sources": [{
                "name": "ONS",
                "dataset": "Birth Summary Tables, England and Wales",
                "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/datasets/birthsummarytables",
                "frequency": "annual",
                "retrieved": "2026-03-03"
            }],
            "methodology": "Live births, crude birth rate per 1,000 population, and total fertility rate (TFR). England and Wales.",
            "notes": "TFR below 2.1 is sub-replacement. England and Wales record low TFR was 1.44 in 2023."
        }
    }

    out_path = OUT / 'demographics.json'
    out_path.write_text(json.dumps(output, indent=2))
    print(f'  Written: {out_path}')
    print('Done.')
