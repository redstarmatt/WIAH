"""
Geo pipeline — fetch.py

Downloads ONS Local Authority District boundaries from the Open Geography Portal.
Filters to England and Wales, strips to code/name only, saves to site/public/geo/.

Source: ONS Open Geography Portal
  Local Authority Districts (December 2023) Boundaries UK BUC
  https://geoportal.statistics.gov.uk/
  Dataset ID: 79a4e87783be4b6bbb96ddad6dda52a3_0

Run: python data/pipelines/geo/fetch.py
"""

import json
import logging
from pathlib import Path

import requests

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT    = Path(__file__).resolve().parents[3]
GEO_DIR = ROOT / "site" / "public" / "geo"
GEO_DIR.mkdir(parents=True, exist_ok=True)

LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

# ONS Open Geography Portal — LAD December 2023 BUC (ultra-generalised)
# Discovered via: https://opendata.arcgis.com/api/v3/datasets?q=Local+Authority+Districts+December+2023+BUC+UK
DATASET_ID = "79a4e87783be4b6bbb96ddad6dda52a3_0"
DOWNLOAD_URL = (
    f"https://opendata.arcgis.com/api/v3/datasets/{DATASET_ID}/downloads/data"
)


# ── Fetch ──────────────────────────────────────────────────────────────────────

def fetch_lad_geojson() -> int:
    """
    Download LAD December 2023 BUC GeoJSON, filter to England and Wales,
    strip to code/name properties, write to site/public/geo/local-authorities.geojson.
    """
    log.info("Downloading LAD December 2023 boundaries from ONS Open Geography Portal…")
    resp = requests.get(
        DOWNLOAD_URL,
        params={"format": "geojson", "spatialRefId": "4326", "where": "1=1"},
        headers=HEADERS,
        timeout=120,
    )
    resp.raise_for_status()

    raw = resp.json()
    all_features = raw.get("features", [])
    log.info("  Total UK features: %d", len(all_features))

    # Filter to England (E) and Wales (W) — exclude Scotland (S) and NI (9)
    # Strip all properties except code and name to minimise file size
    ew_features = []
    for f in all_features:
        props = f.get("properties", {})
        code = props.get("LAD23CD", "")
        if not code.startswith(("E", "W")):
            continue
        ew_features.append({
            "type": "Feature",
            "properties": {
                "LAD23CD": code,
                "LAD23NM": props.get("LAD23NM", ""),
            },
            "geometry": f["geometry"],
        })

    log.info("  England & Wales features: %d", len(ew_features))

    geojson = {"type": "FeatureCollection", "features": ew_features}
    out_path = GEO_DIR / "local-authorities.geojson"
    out_path.write_text(json.dumps(geojson, separators=(",", ":")))
    size_kb = out_path.stat().st_size // 1024
    log.info("  Saved → %s  (%d KB)", out_path.name, size_kb)

    return len(ew_features)


# ── Main ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    count = fetch_lad_geojson()
    log.info("Done. %d local authorities written to local-authorities.geojson", count)
