"""
GP Access — fetch.py

Discovers and downloads the latest NHS Digital "Appointments in General Practice"
data. Runs on a schedule via GitHub Actions. Only downloads if data is newer than
what's already cached.

Sources:
  - National overview CSV (national monthly totals by time-to-appointment)
  - Regional/ICB CSV (same breakdown by ICB)
"""

import os
import re
import sys
import json
import logging
import hashlib
import zipfile
import io
from datetime import datetime
from pathlib import Path

import requests

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT          = Path(__file__).resolve().parents[3]
RAW_DIR       = ROOT / "data" / "raw" / "gp-access"
STATE_FILE    = RAW_DIR / "_state.json"
LOG_FORMAT    = "%(asctime)s  %(levelname)s  %(message)s"
INDEX_URL     = "https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice"
SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

RAW_DIR.mkdir(parents=True, exist_ok=True)


# ── Helpers ─────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def save_state(state: dict):
    STATE_FILE.write_text(json.dumps(state, indent=2))


def file_md5(path: Path) -> str:
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def get(url: str, **kwargs) -> requests.Response:
    r = requests.get(url, headers=SESSION_HEADERS, timeout=60, **kwargs)
    r.raise_for_status()
    return r


# ── Discovery ───────────────────────────────────────────────────────────────────

MONTH_ORDER = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
]


def month_sort_key(slug: str) -> tuple:
    """Turn 'january-2025' → (2025, 1) for sorting."""
    parts = slug.rstrip("/").split("/")[-1].split("-")
    if len(parts) != 2:
        return (0, 0)
    month_name, year_str = parts
    try:
        year = int(year_str)
        month = MONTH_ORDER.index(month_name.lower()) + 1
        return (year, month)
    except (ValueError, IndexError):
        return (0, 0)


def discover_latest_release_url() -> str:
    """
    Scrape the index page, sort releases newest-first, and return the URL of the
    most recent release that has actual published files (skipping 'in development' stubs).
    Uses a quick static check first; only falls back to Playwright if needed.
    """
    log.info(f"Discovering latest published release from {INDEX_URL}")
    resp = get(INDEX_URL)
    html = resp.text

    pattern = r'href="(/data-and-information/publications/statistical/appointments-in-general-practice/[a-z]+-\d{4})"'
    matches = re.findall(pattern, html)

    if not matches:
        raise RuntimeError("Could not find any release links on the NHS Digital index page.")

    unique = list(dict.fromkeys(matches))
    # Sort newest-first
    sorted_slugs = sorted(unique, key=month_sort_key, reverse=True)

    # Walk releases until we find one with published files
    # Quick check: if the rendered page has files.digital.nhs.uk links it's published
    for slug in sorted_slugs[:6]:  # check at most 6 months back
        full_url = f"https://digital.nhs.uk{slug}"
        log.info(f"Checking release: {full_url}")
        rendered = _render_with_playwright(full_url)
        if "files.digital.nhs.uk" in rendered:
            log.info(f"  → Published ✓  ({slug})")
            return full_url
        else:
            log.info(f"  → Not yet published, trying earlier release …")

    raise RuntimeError("Could not find any published release in the last 6 months.")


def _render_with_playwright(url: str) -> str:
    """
    Use a headless Chromium browser to render a JS-heavy page and return the full HTML.
    NHS Digital uses client-side rendering for download links — static scraping won't work.
    Saves a debug copy to RAW_DIR/_rendered_page.html.
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        raise RuntimeError(
            "playwright is required. Install with: "
            "pip install playwright && python -m playwright install chromium"
        )

    log.info(f"  Launching headless Chromium …")
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        page = browser.new_page(
            user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                       "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page.goto(url, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(3000)  # allow JS components to finish rendering
        html = page.content()
        browser.close()

    debug_path = RAW_DIR / "_rendered_page.html"
    debug_path.write_text(html, encoding="utf-8")
    log.info(f"  Rendered HTML: {len(html):,} chars, saved to {debug_path.name}")
    return html


def discover_file_urls(release_url: str) -> dict:
    """
    Render the release page with Playwright (download links are JS-rendered on
    digital.nhs.uk) and extract the files we need:
      - national_csv:    National_Overview.csv — lightweight national aggregate
      - categories_zip:  National categories ZIP — has time-between-booking counts
      - regional_zip:    ICB-level ZIP — for regional breakdown
    """
    html = _render_with_playwright(release_url)

    urls = {}

    # National overview CSV
    nat_match = re.search(
        r'href="(https://files\.digital\.nhs\.uk[^"]*National[_\-]?Overview[^"]*\.csv)"',
        html, re.IGNORECASE
    )
    if nat_match:
        urls["national_csv"] = nat_match.group(1)
        log.info(f"  national_csv → {urls['national_csv']}")

    # National categories ZIP (has time-between-booking breakdown)
    cat_match = re.search(
        r'href="(https://files\.digital\.nhs\.uk[^"]*[Cc]ategori[^"]*\.zip)"',
        html, re.IGNORECASE
    )
    if cat_match:
        urls["categories_zip"] = cat_match.group(1)
        log.info(f"  categories_zip → {urls['categories_zip']}")

    # Regional/ICB ZIP
    reg_match = re.search(
        r'href="(https://files\.digital\.nhs\.uk[^"]*[Rr]egional[^"]*\.zip)"',
        html, re.IGNORECASE
    )
    if reg_match:
        urls["regional_zip"] = reg_match.group(1)
        log.info(f"  regional_zip → {urls['regional_zip']}")

    if not urls:
        raise RuntimeError(
            f"Could not find any data file links on {release_url}. "
            "Check data/raw/gp-access/_rendered_page.html to see what was rendered."
        )

    log.info(f"  Found {len(urls)} file(s): {list(urls.keys())}")
    return urls


# ── Download ────────────────────────────────────────────────────────────────────

def download_file(url: str, dest_path: Path, label: str) -> bool:
    """
    Download url to dest_path. Returns True if the file was new/updated,
    False if we already had an identical copy (by MD5).
    """
    log.info(f"Downloading {label} …")
    resp = get(url, stream=True)
    content = resp.content

    if dest_path.exists():
        existing_md5 = file_md5(dest_path)
        new_md5 = hashlib.md5(content).hexdigest()
        if existing_md5 == new_md5:
            log.info(f"  {label}: unchanged (MD5 match), skipping.")
            return False

    dest_path.write_bytes(content)
    log.info(f"  {label}: saved to {dest_path} ({len(content) // 1024} KB)")
    return True


def extract_zip(zip_path: Path, dest_dir: Path):
    """Extract a ZIP file, flattening directory structure."""
    dest_dir.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as zf:
        for member in zf.namelist():
            filename = Path(member).name
            if not filename or filename.startswith("."):
                continue
            dest = dest_dir / filename
            dest.write_bytes(zf.read(member))
            log.info(f"  extracted: {filename}")


# ── Main ────────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    any_new = False

    try:
        release_url = discover_latest_release_url()
        release_slug = release_url.rstrip("/").split("/")[-1]  # e.g. "january-2025"

        file_urls = discover_file_urls(release_url)

        # Date-stamped subdirectory for this release
        release_dir = RAW_DIR / release_slug
        release_dir.mkdir(parents=True, exist_ok=True)

        # Download each file
        for key, url in file_urls.items():
            filename = url.split("/")[-1].split("?")[0]
            dest = release_dir / filename
            updated = download_file(url, dest, label=f"{key} ({filename})")
            if updated:
                any_new = True
                # Extract ZIPs immediately
                if filename.lower().endswith(".zip"):
                    extract_dir = release_dir / key
                    log.info(f"  Extracting {filename} → {extract_dir}")
                    extract_zip(dest, extract_dir)

        # Update state
        state["gp_access"] = {
            "last_checked": datetime.utcnow().isoformat(),
            "latest_release": release_slug,
            "release_url": release_url,
            "files": {k: v for k, v in file_urls.items()},
            "any_new_data": any_new,
        }
        save_state(state)

        if any_new:
            log.info("✓ New data downloaded. Run transform.py to update JSON.")
        else:
            log.info("✓ No new data. Already up to date.")

    except Exception as e:
        log.error(f"FETCH FAILED: {e}")
        state.setdefault("gp_access", {})["last_error"] = {
            "time": datetime.utcnow().isoformat(),
            "message": str(e),
        }
        save_state(state)
        sys.exit(1)


if __name__ == "__main__":
    main()
