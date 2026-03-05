"""
Waste & Recycling data transformation.

Embeds static data (from DEFRA sources) and outputs clean JSON
for the waste topic page.
"""
import json
from pathlib import Path

def main():
    output_path = Path(__file__).parent.parent.parent / 'output' / 'waste' / 'waste.json'
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Recycling rate time series (%)
    recycling_rate = [
        {"year": 2000, "recyclePct": 9.1},
        {"year": 2001, "recyclePct": 11.2},
        {"year": 2002, "recyclePct": 13.5},
        {"year": 2003, "recyclePct": 17.1},
        {"year": 2004, "recyclePct": 21.5},
        {"year": 2005, "recyclePct": 26.7},
        {"year": 2006, "recyclePct": 29.5},
        {"year": 2007, "recyclePct": 31.9},
        {"year": 2008, "recyclePct": 34.5},
        {"year": 2009, "recyclePct": 37.6},
        {"year": 2010, "recyclePct": 39.7},
        {"year": 2011, "recyclePct": 43.0},
        {"year": 2012, "recyclePct": 43.3},
        {"year": 2013, "recyclePct": 44.1},
        {"year": 2014, "recyclePct": 44.8},
        {"year": 2015, "recyclePct": 44.3},
        {"year": 2016, "recyclePct": 45.1},
        {"year": 2017, "recyclePct": 45.5},
        {"year": 2018, "recyclePct": 44.7},
        {"year": 2019, "recyclePct": 45.5},
        {"year": 2020, "recyclePct": 44.1},
        {"year": 2021, "recyclePct": 44.6},
        {"year": 2022, "recyclePct": 44.0},
        {"year": 2023, "recyclePct": 43.8}
    ]

    # Treatment mix (recycled, landfill, incineration, other)
    treatment_mix = [
        {"year": 2000, "recycledPct": 9.1, "landfillPct": 81.2, "incinerationPct": 9.7, "otherPct": 0.0},
        {"year": 2005, "recycledPct": 26.7, "landfillPct": 61.8, "incinerationPct": 11.5, "otherPct": 0.0},
        {"year": 2010, "recycledPct": 39.7, "landfillPct": 48.6, "incinerationPct": 11.7, "otherPct": 0.0},
        {"year": 2015, "recycledPct": 44.3, "landfillPct": 24.9, "incinerationPct": 28.1, "otherPct": 2.7},
        {"year": 2018, "recycledPct": 44.7, "landfillPct": 12.3, "incinerationPct": 39.6, "otherPct": 3.4},
        {"year": 2019, "recycledPct": 45.5, "landfillPct": 10.5, "incinerationPct": 40.8, "otherPct": 3.2},
        {"year": 2020, "recycledPct": 44.1, "landfillPct": 9.1, "incinerationPct": 43.4, "otherPct": 3.4},
        {"year": 2021, "recycledPct": 44.6, "landfillPct": 7.8, "incinerationPct": 44.2, "otherPct": 3.4},
        {"year": 2022, "recycledPct": 44.0, "landfillPct": 6.9, "incinerationPct": 45.7, "otherPct": 3.4},
        {"year": 2023, "recycledPct": 43.8, "landfillPct": 5.5, "incinerationPct": 47.3, "otherPct": 3.4}
    ]

    # Fly-tipping incidents (per year, financial years)
    fly_tipping = [
        {"year": "2007/08", "incidents": 723000},
        {"year": "2008/09", "incidents": 782000},
        {"year": "2009/10", "incidents": 838000},
        {"year": "2010/11", "incidents": 883000},
        {"year": "2011/12", "incidents": 800000},
        {"year": "2012/13", "incidents": 803000},
        {"year": "2013/14", "incidents": 852000},
        {"year": "2014/15", "incidents": 900000},
        {"year": "2015/16", "incidents": 936000},
        {"year": "2016/17", "incidents": 998000},
        {"year": "2017/18", "incidents": 1010000},
        {"year": "2018/19", "incidents": 1072000},
        {"year": "2019/20", "incidents": 1026000},
        {"year": "2020/21", "incidents": 1137000},
        {"year": "2021/22", "incidents": 1079000},
        {"year": "2022/23", "incidents": 1010000},
        {"year": "2023/24", "incidents": 964000}
    ]

    # Packaging recycling by material type
    packaging_recycling = [
        {"material": "Paper & card", "recyclePct": 86.4, "colour": "#264653"},
        {"material": "Glass", "recyclePct": 80.4, "colour": "#2A9D8F"},
        {"material": "Metal", "recyclePct": 80.0, "colour": "#2A9D8F"},
        {"material": "Wood", "recyclePct": 72.5, "colour": "#F4A261"},
        {"material": "Plastic", "recyclePct": 51.2, "colour": "#E63946"},
        {"material": "Overall", "recyclePct": 72.5, "colour": "#264653"}
    ]

    data = {
        "topic": "waste",
        "lastUpdated": "2026-03-03",
        "national": {
            "recyclingRate": {
                "timeSeries": recycling_rate,
                "latest": {"year": 2023, "recyclePct": 43.8},
                "target2035": 65.0
            },
            "treatmentMix": {
                "timeSeries": treatment_mix
            },
            "flyTipping": {
                "timeSeries": fly_tipping,
                "latest": {"year": "2023/24", "incidents": 964000}
            },
            "packagingRecycling": packaging_recycling
        },
        "metadata": {
            "sources": [
                {
                    "name": "DEFRA",
                    "dataset": "Local authority collected waste management statistics (WasteDataFlow)",
                    "url": "https://www.gov.uk/government/statistics/local-authority-collected-waste-management-annual-results",
                    "frequency": "annual"
                },
                {
                    "name": "DEFRA",
                    "dataset": "Fly-tipping statistics for England",
                    "url": "https://www.gov.uk/government/statistics/fly-tipping-statistics-for-england",
                    "frequency": "annual"
                },
                {
                    "name": "DEFRA / EA",
                    "dataset": "UK statistics on waste — packaging recycling rates",
                    "url": "https://www.gov.uk/government/statistics/uk-waste-data",
                    "frequency": "annual"
                }
            ],
            "methodology": "Recycling rates are for local authority collected waste in England. Treatment mix shows approximate percentage breakdown of household waste by disposal route. Fly-tipping data is from local authorities in England. Packaging recycling rates are from the National Packaging Waste Database.",
            "knownIssues": [
                "Recycling rate has stalled at ~44% since 2011 — far short of the 65% target for 2035.",
                "Incineration (Energy from Waste) has replaced landfill as the main non-recycled route."
            ]
        }
    }

    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)

    print(f"Written waste data to {output_path}")

if __name__ == '__main__':
    main()
