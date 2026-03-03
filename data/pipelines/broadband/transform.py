"""
Broadband & Digital — transform.py

Outputs data/output/broadband/broadband.json.

Sources (hardcoded from official publications):
  1. Ofcom Connected Nations — broadband coverage and speeds
     https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations
  2. ONS Internet access — households and adults online
     https://www.ons.gov.uk/businessindustryandtrade/itandinternetindustry/bulletins/internetusers
  3. Ofcom Home Broadband Performance — median speeds
     https://www.ofcom.org.uk/research-and-data/telecoms-research/broadband-research/broadband-speeds
"""

import json
import logging
from datetime import datetime
from pathlib import Path

ROOT       = Path(__file__).resolve().parents[3]
OUTPUT_DIR = ROOT / "data" / "output" / "broadband"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ── Hardcoded data ────────────────────────────────────────────────────────────

# Median UK home broadband download speeds (Mbps)
# Source: Ofcom Home Broadband Performance tracker (measured via SamKnows panel)
MEDIAN_SPEEDS = [
    {"year": 2013, "medianMbps": 15.0},
    {"year": 2014, "medianMbps": 18.5},
    {"year": 2015, "medianMbps": 22.8},
    {"year": 2016, "medianMbps": 29.0},
    {"year": 2017, "medianMbps": 36.2},
    {"year": 2018, "medianMbps": 46.2},
    {"year": 2019, "medianMbps": 64.0},
    {"year": 2020, "medianMbps": 80.2},
    {"year": 2021, "medianMbps": 88.0},
    {"year": 2022, "medianMbps": 94.0},
    {"year": 2023, "medianMbps": 108.0},
    {"year": 2024, "medianMbps": 126.0},
]

# Gigabit-capable broadband coverage (% of UK premises)
# Source: Ofcom Connected Nations annual reports
GIGABIT_COVERAGE = [
    {"year": 2019, "pct": 8.0},
    {"year": 2020, "pct": 14.0},
    {"year": 2021, "pct": 30.0},
    {"year": 2022, "pct": 51.0},
    {"year": 2023, "pct": 70.0},
    {"year": 2024, "pct": 81.0},
]

# Full fibre (FTTP) coverage (% of UK premises)
# Source: Ofcom Connected Nations
FULL_FIBRE = [
    {"year": 2017, "pct": 2.0},
    {"year": 2018, "pct": 4.0},
    {"year": 2019, "pct": 8.0},
    {"year": 2020, "pct": 14.0},
    {"year": 2021, "pct": 27.0},
    {"year": 2022, "pct": 42.0},
    {"year": 2023, "pct": 57.0},
    {"year": 2024, "pct": 68.0},
]

# Urban vs rural: % premises unable to receive 30Mbps ("decent broadband")
# Source: Ofcom Connected Nations
RURAL_URBAN_GAP = [
    {"year": 2019, "urbanNot30MbpsPct": 4.0, "ruralNot30MbpsPct": 29.0},
    {"year": 2020, "urbanNot30MbpsPct": 3.0, "ruralNot30MbpsPct": 24.0},
    {"year": 2021, "urbanNot30MbpsPct": 2.0, "ruralNot30MbpsPct": 18.0},
    {"year": 2022, "urbanNot30MbpsPct": 1.5, "ruralNot30MbpsPct": 12.0},
    {"year": 2023, "urbanNot30MbpsPct": 1.2, "ruralNot30MbpsPct": 9.0},
    {"year": 2024, "urbanNot30MbpsPct": 1.0, "ruralNot30MbpsPct": 6.5},
]

# 5G geographic coverage (% of UK landmass with signal)
# Source: Ofcom Connected Nations
FIVE_G_COVERAGE = [
    {"year": 2019, "premisesPct": 10.0, "landmassPct": 2.0},
    {"year": 2020, "premisesPct": 37.0, "landmassPct": 5.0},
    {"year": 2021, "premisesPct": 52.0, "landmassPct": 9.0},
    {"year": 2022, "premisesPct": 70.0, "landmassPct": 15.0},
    {"year": 2023, "premisesPct": 84.0, "landmassPct": 22.0},
    {"year": 2024, "premisesPct": 91.0, "landmassPct": 30.0},
]

# Internet usage — % of adults who used internet in the last 3 months
# Source: ONS Internet users bulletin (annual)
INTERNET_USAGE = [
    {"year": 2011, "usedInternetPct": 77.0, "neverUsedPct": 16.3},
    {"year": 2012, "usedInternetPct": 80.0, "neverUsedPct": 14.7},
    {"year": 2013, "usedInternetPct": 83.6, "neverUsedPct": 12.1},
    {"year": 2014, "usedInternetPct": 84.1, "neverUsedPct": 10.3},
    {"year": 2015, "usedInternetPct": 85.9, "neverUsedPct": 9.0},
    {"year": 2016, "usedInternetPct": 88.5, "neverUsedPct": 7.7},
    {"year": 2017, "usedInternetPct": 89.0, "neverUsedPct": 6.7},
    {"year": 2018, "usedInternetPct": 90.0, "neverUsedPct": 6.7},
    {"year": 2019, "usedInternetPct": 92.0, "neverUsedPct": 5.9},
    {"year": 2020, "usedInternetPct": 95.4, "neverUsedPct": 5.4},
    {"year": 2021, "usedInternetPct": 96.0, "neverUsedPct": 4.7},
    {"year": 2022, "usedInternetPct": 96.2, "neverUsedPct": 4.5},
    {"year": 2023, "usedInternetPct": 96.5, "neverUsedPct": 4.3},
    {"year": 2024, "usedInternetPct": 97.0, "neverUsedPct": 3.8},
]

# Broadband coverage by technology (% UK premises, 2024)
COVERAGE_BY_TECH = [
    {"technology": "Superfast (30Mbps+)", "pct": 98.0},
    {"technology": "Ultrafast (100Mbps+)", "pct": 87.0},
    {"technology": "Gigabit-capable", "pct": 81.0},
    {"technology": "Full fibre (FTTP)", "pct": 68.0},
    {"technology": "5G outdoor (any operator)", "pct": 91.0},
]


def main():
    latest_speed = MEDIAN_SPEEDS[-1]
    latest_fibre = FULL_FIBRE[-1]
    latest_gigabit = GIGABIT_COVERAGE[-1]
    latest_usage = INTERNET_USAGE[-1]
    latest_rural = RURAL_URBAN_GAP[-1]

    # Adults never online (millions) — approx 4.3M if ~3.8% of 64M adults
    never_online_millions = round(latest_usage["neverUsedPct"] / 100 * 52.0, 1)

    out = {
        "topic": "broadband",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "national": {
            "speeds": {
                "medianTimeSeries": MEDIAN_SPEEDS,
                "latest": latest_speed,
                "note": "Median download speed, UK residential broadband (Ofcom SamKnows panel)",
            },
            "coverage": {
                "fullFibreTimeSeries": FULL_FIBRE,
                "gigabitTimeSeries": GIGABIT_COVERAGE,
                "byTechnology": COVERAGE_BY_TECH,
                "latestFullFibre": latest_fibre,
                "latestGigabit": latest_gigabit,
                "governmentTarget": "All premises: gigabit-capable by 2030",
            },
            "ruralUrbanGap": {
                "timeSeries": RURAL_URBAN_GAP,
                "latest": latest_rural,
                "note": "% premises unable to receive 30Mbps (Ofcom decent broadband standard)",
            },
            "fiveG": {
                "timeSeries": FIVE_G_COVERAGE,
                "latest": FIVE_G_COVERAGE[-1],
            },
            "digitalInclusion": {
                "internetUsageTimeSeries": INTERNET_USAGE,
                "latest": latest_usage,
                "neverOnlineMillions": never_online_millions,
                "note": "Approx 2M adults have never used the internet (ONS 2024)",
            },
        },
        "metadata": {
            "sources": [
                {
                    "name": "Ofcom",
                    "dataset": "Connected Nations — UK broadband coverage and speeds",
                    "url": "https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations",
                    "frequency": "annual",
                },
                {
                    "name": "Ofcom",
                    "dataset": "Home Broadband Performance — median speeds (SamKnows panel)",
                    "url": "https://www.ofcom.org.uk/research-and-data/telecoms-research/broadband-research/broadband-speeds",
                    "frequency": "annual",
                },
                {
                    "name": "ONS",
                    "dataset": "Internet users, Great Britain",
                    "url": "https://www.ons.gov.uk/businessindustryandtrade/itandinternetindustry/bulletins/internetusers",
                    "frequency": "annual",
                },
            ],
            "methodology": (
                "Median download speeds are from Ofcom's SamKnows broadband performance testing panel "
                "(residential fixed-line). Coverage figures are from Ofcom Connected Nations annual "
                "reports — 'premises' means residential and business addresses. Internet usage data "
                "is from the ONS annual survey of individuals."
            ),
            "knownIssues": [
                "SamKnows panel may oversample engaged users — actual median speeds may be slightly lower.",
                "5G coverage measured as outdoor signal; indoor coverage is lower.",
                "Rural definition varies between Ofcom and ONS publications.",
            ],
        },
    }

    out_path = OUTPUT_DIR / "broadband.json"
    out_path.write_text(json.dumps(out, indent=2))
    log.info(f"✓ Written {out_path} ({out_path.stat().st_size // 1024} KB)")
    log.info(f"  Median speed: {latest_speed['medianMbps']} Mbps")
    log.info(f"  Full fibre: {latest_fibre['pct']}% of premises")
    log.info(f"  Gigabit: {latest_gigabit['pct']}% of premises")
    log.info(f"  Never online: ~{never_online_millions}M adults")


if __name__ == "__main__":
    main()
