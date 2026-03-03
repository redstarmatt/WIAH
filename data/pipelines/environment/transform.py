"""
Environment — transform.py

Outputs data/output/environment/environment.json.

Sources (all hardcoded from official publications — URLs are unstable):
  1. DESNZ UK Greenhouse Gas Inventory (provisional) — annual territorial emissions
     https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics
  2. DEFRA Air Quality in the UK annual statistics — PM2.5 mean concentrations
     https://uk-air.defra.gov.uk/data/
  3. DEFRA Biodiversity Indicators for the UK — B2 species abundance index
     https://www.gov.uk/government/statistics/biodiversity-indicators-for-the-uk
  4. ONS Woodland creation — annual new woodland planting (England)
     https://www.forestresearch.gov.uk/tools-and-resources/statistics/statistics-by-topic/woodland-statistics/
  5. Environment Agency — properties at significant flood risk (England)
     https://www.gov.uk/government/collections/flood-risk-assessment
"""

import json
import logging
from datetime import datetime
from pathlib import Path

ROOT       = Path(__file__).resolve().parents[3]
OUTPUT_DIR = ROOT / "data" / "output" / "environment"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ── Hardcoded data ────────────────────────────────────────────────────────────

# UK territorial greenhouse gas emissions (MtCO2e)
# Source: DESNZ UK GHG Inventory + provisional 2023 estimates
GHG_EMISSIONS = [
    {"year": 1990, "mtCO2e": 791.8},
    {"year": 1991, "mtCO2e": 779.3},
    {"year": 1992, "mtCO2e": 753.8},
    {"year": 1993, "mtCO2e": 733.2},
    {"year": 1994, "mtCO2e": 726.0},
    {"year": 1995, "mtCO2e": 720.9},
    {"year": 1996, "mtCO2e": 743.5},
    {"year": 1997, "mtCO2e": 707.3},
    {"year": 1998, "mtCO2e": 694.4},
    {"year": 1999, "mtCO2e": 670.6},
    {"year": 2000, "mtCO2e": 675.8},
    {"year": 2001, "mtCO2e": 672.9},
    {"year": 2002, "mtCO2e": 651.8},
    {"year": 2003, "mtCO2e": 658.6},
    {"year": 2004, "mtCO2e": 657.6},
    {"year": 2005, "mtCO2e": 655.6},
    {"year": 2006, "mtCO2e": 647.9},
    {"year": 2007, "mtCO2e": 633.9},
    {"year": 2008, "mtCO2e": 624.8},
    {"year": 2009, "mtCO2e": 572.5},
    {"year": 2010, "mtCO2e": 588.0},
    {"year": 2011, "mtCO2e": 554.5},
    {"year": 2012, "mtCO2e": 572.5},
    {"year": 2013, "mtCO2e": 555.9},
    {"year": 2014, "mtCO2e": 523.6},
    {"year": 2015, "mtCO2e": 503.6},
    {"year": 2016, "mtCO2e": 490.7},
    {"year": 2017, "mtCO2e": 473.9},
    {"year": 2018, "mtCO2e": 468.2},
    {"year": 2019, "mtCO2e": 452.4},
    {"year": 2020, "mtCO2e": 405.5},
    {"year": 2021, "mtCO2e": 433.4},
    {"year": 2022, "mtCO2e": 417.3},
    {"year": 2023, "mtCO2e": 394.9},
]

# GHG emissions by broad sector (MtCO2e), latest year 2023 (approximate)
GHG_BY_SECTOR = [
    {"sector": "Transport", "mtCO2e": 107.0},
    {"sector": "Energy supply", "mtCO2e": 75.0},
    {"sector": "Business", "mtCO2e": 68.0},
    {"sector": "Residential", "mtCO2e": 62.0},
    {"sector": "Agriculture", "mtCO2e": 47.0},
    {"sector": "Waste", "mtCO2e": 16.0},
    {"sector": "Industrial processes", "mtCO2e": 12.0},
    {"sector": "Other", "mtCO2e": 7.9},
]

# PM2.5 mean annual concentration (µg/m³) — UK average from AURN monitoring
# Source: DEFRA Air Quality Annual Statistics
AIR_QUALITY_PM25 = [
    {"year": 2009, "pm25UgM3": 12.2},
    {"year": 2010, "pm25UgM3": 12.5},
    {"year": 2011, "pm25UgM3": 12.1},
    {"year": 2012, "pm25UgM3": 11.8},
    {"year": 2013, "pm25UgM3": 11.3},
    {"year": 2014, "pm25UgM3": 10.8},
    {"year": 2015, "pm25UgM3": 10.4},
    {"year": 2016, "pm25UgM3": 10.3},
    {"year": 2017, "pm25UgM3": 9.8},
    {"year": 2018, "pm25UgM3": 9.5},
    {"year": 2019, "pm25UgM3": 9.1},
    {"year": 2020, "pm25UgM3": 8.3},
    {"year": 2021, "pm25UgM3": 8.9},
    {"year": 2022, "pm25UgM3": 8.6},
    {"year": 2023, "pm25UgM3": 8.4},
]

# UK species abundance index (relative to 1970=100)
# Source: DEFRA Biodiversity Indicators B2 — "abundance of wildlife"
# Covers ~1,000 indicator species (butterflies, birds, plants, mammals)
BIODIVERSITY_INDEX = [
    {"year": 1970, "index": 100.0},
    {"year": 1975, "index": 97.0},
    {"year": 1980, "index": 94.0},
    {"year": 1985, "index": 90.0},
    {"year": 1990, "index": 86.0},
    {"year": 1995, "index": 81.0},
    {"year": 2000, "index": 76.0},
    {"year": 2005, "index": 74.0},
    {"year": 2010, "index": 72.0},
    {"year": 2015, "index": 71.0},
    {"year": 2016, "index": 70.0},
    {"year": 2017, "index": 71.0},
    {"year": 2018, "index": 70.0},
    {"year": 2019, "index": 69.0},
    {"year": 2020, "index": 70.0},
    {"year": 2021, "index": 69.0},
    {"year": 2022, "index": 68.0},
    {"year": 2023, "index": 68.0},
]

# New woodland creation (thousand hectares/year, England)
# Source: Forestry Commission / Forest Research woodland statistics
WOODLAND_CREATION = [
    {"year": 2010, "kHectares": 5.8},
    {"year": 2011, "kHectares": 7.2},
    {"year": 2012, "kHectares": 7.5},
    {"year": 2013, "kHectares": 7.0},
    {"year": 2014, "kHectares": 8.1},
    {"year": 2015, "kHectares": 10.0},
    {"year": 2016, "kHectares": 10.5},
    {"year": 2017, "kHectares": 10.2},
    {"year": 2018, "kHectares": 11.0},
    {"year": 2019, "kHectares": 13.4},
    {"year": 2020, "kHectares": 14.0},
    {"year": 2021, "kHectares": 13.0},
    {"year": 2022, "kHectares": 26.0},
    {"year": 2023, "kHectares": 24.2},
]

# Properties at significant flood risk in England (millions)
# Source: Environment Agency flood risk assessments
FLOOD_RISK = [
    {"year": 2008, "propertiesM": 2.4},
    {"year": 2012, "propertiesM": 2.7},
    {"year": 2016, "propertiesM": 3.0},
    {"year": 2019, "propertiesM": 3.1},
    {"year": 2021, "propertiesM": 3.4},
    {"year": 2023, "propertiesM": 3.7},
]

# UK 2050 net zero pathway milestones (from Climate Change Committee)
NET_ZERO_MILESTONES = [
    {"year": 1990, "targetMtCO2e": 791.8},
    {"year": 2030, "targetMtCO2e": 290.0},
    {"year": 2035, "targetMtCO2e": 200.0},
    {"year": 2050, "targetMtCO2e": 0.0},
]


def main():
    latest_ghg = GHG_EMISSIONS[-1]
    baseline_ghg = GHG_EMISSIONS[0]  # 1990 baseline
    reduction_pct = round((1 - latest_ghg["mtCO2e"] / baseline_ghg["mtCO2e"]) * 100, 1)

    latest_pm25 = AIR_QUALITY_PM25[-1]
    baseline_pm25 = AIR_QUALITY_PM25[0]
    pm25_reduction_pct = round((1 - latest_pm25["pm25UgM3"] / baseline_pm25["pm25UgM3"]) * 100, 1)

    latest_biodiversity = BIODIVERSITY_INDEX[-1]

    out = {
        "topic": "environment",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "national": {
            "ghgEmissions": {
                "timeSeries": GHG_EMISSIONS,
                "bySector": GHG_BY_SECTOR,
                "netZeroMilestones": NET_ZERO_MILESTONES,
                "latest": latest_ghg,
                "baseline1990": baseline_ghg,
                "reductionSince1990Pct": reduction_pct,
            },
            "airQuality": {
                "pm25TimeSeries": AIR_QUALITY_PM25,
                "latest": latest_pm25,
                "baselineYear": baseline_pm25,
                "reductionSince2009Pct": pm25_reduction_pct,
                "whoGuideline": 5.0,
                "ukLegalLimit": 20.0,
            },
            "biodiversity": {
                "speciesAbundanceIndex": BIODIVERSITY_INDEX,
                "latest": latest_biodiversity,
                "declineSince1970Pct": round(100 - latest_biodiversity["index"], 1),
            },
            "woodland": {
                "creationTimeSeries": WOODLAND_CREATION,
                "latest": WOODLAND_CREATION[-1],
                "target30By30": "30% land for nature by 2030",
            },
            "flooding": {
                "propertiesAtRisk": FLOOD_RISK,
                "latest": FLOOD_RISK[-1],
            },
        },
        "metadata": {
            "sources": [
                {
                    "name": "DESNZ",
                    "dataset": "UK Provisional Greenhouse Gas Emissions National Statistics",
                    "url": "https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics",
                    "frequency": "annual",
                },
                {
                    "name": "DEFRA",
                    "dataset": "Air Quality in the UK — AURN Annual Statistics",
                    "url": "https://uk-air.defra.gov.uk/data/",
                    "frequency": "annual",
                },
                {
                    "name": "DEFRA",
                    "dataset": "Biodiversity Indicators for the UK — B2 Species Abundance",
                    "url": "https://www.gov.uk/government/statistics/biodiversity-indicators-for-the-uk",
                    "frequency": "annual",
                },
                {
                    "name": "Forestry Commission",
                    "dataset": "Woodland Creation Statistics, England",
                    "url": "https://www.forestresearch.gov.uk/tools-and-resources/statistics/statistics-by-topic/woodland-statistics/",
                    "frequency": "annual",
                },
                {
                    "name": "Environment Agency",
                    "dataset": "Flood Risk Assessment — Properties at Significant Flood Risk",
                    "url": "https://www.gov.uk/government/collections/flood-risk-assessment",
                    "frequency": "annual",
                },
            ],
            "methodology": (
                "GHG emissions are UK territorial emissions in CO2 equivalent (MtCO2e), from the "
                "DESNZ provisional estimates. Biodiversity index is the geometric mean species abundance "
                "of ~1,000 UK indicator species relative to 1970 baseline (DEFRA B2 indicator). "
                "PM2.5 is the population-weighted mean annual concentration from AURN monitoring network. "
                "Woodland creation covers certified new planting in England."
            ),
            "knownIssues": [
                "2020 GHG dip partly reflects COVID-19 economic slowdown, not structural change.",
                "Biodiversity index methodology updated in 2023 — minor discontinuity.",
                "PM2.5 concentrations are population-weighted urban averages — rural and indoor exposure differs.",
            ],
        },
    }

    out_path = OUTPUT_DIR / "environment.json"
    out_path.write_text(json.dumps(out, indent=2))
    log.info(f"✓ Written {out_path} ({out_path.stat().st_size // 1024} KB)")
    log.info(f"  GHG emissions: {latest_ghg['mtCO2e']} MtCO2e ({reduction_pct}% below 1990)")
    log.info(f"  Biodiversity: {latest_biodiversity['index']}% of 1970 levels")
    log.info(f"  PM2.5: {latest_pm25['pm25UgM3']} µg/m³ ({pm25_reduction_pct}% below 2009)")


if __name__ == "__main__":
    main()
