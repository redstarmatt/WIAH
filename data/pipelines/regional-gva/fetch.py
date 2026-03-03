"""
Regional GVA Pipeline — fetch.py
Attempts to download ONS Regional GVA (Income Approach) dataset.
Falls back gracefully — transform.py will use hardcoded data if no file is present.
"""

import os
import sys
import hashlib
import urllib.request
from datetime import datetime

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..', '..'))
RAW_DIR = os.path.join(PROJECT_ROOT, 'data', 'raw', 'regional-gva')

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (compatible; WIAH-pipeline/1.0; '
        '+https://whatisactuallyhappening.uk)'
    )
}

# Primary URL — GVA income approach reference tables (.xls)
URLS = [
    {
        'url': (
            'https://www.ons.gov.uk/file?uri=/economy/grossvalueaddedgva'
            '/datasets/regionalgrossvalueaddedincomeapproach/current'
            '/gvaireferencetables.xls'
        ),
        'filename': 'gvai_reference_tables.xls',
        'description': 'Regional GVA (income approach) reference tables',
    },
    {
        'url': (
            'https://www.ons.gov.uk/file?uri=/economy/grossdomesticproductgdp'
            '/datasets/regionalgrossdomesticproductgdpallnutslevelregions'
            '/current/nuts1gdp.xls'
        ),
        'filename': 'nuts1_gdp.xls',
        'description': 'Regional GDP NUTS1',
    },
]


def md5(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return h.hexdigest()


def try_download(entry):
    url = entry['url']
    filename = entry['filename']
    dest = os.path.join(RAW_DIR, filename)
    existing_md5 = md5(dest) if os.path.exists(dest) else None

    print(f'  Trying: {entry["description"]}')
    print(f'    URL: {url}')

    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
    except Exception as exc:
        print(f'    FAILED: {exc}')
        return False

    # Validate it looks like a real file (not an HTML error page)
    if data[:4] in (b'\xd0\xcf\x11\xe0', b'PK\x03\x04'):
        # OLE compound document or ZIP (xlsx)
        pass
    elif data[:3] in (b'\xef\xbb\xbf', b'sep') or data[:5] == b'<?xml':
        # Could be CSV/XML — accept
        pass
    elif b'<html' in data[:200].lower() or b'<!doctype' in data[:200].lower():
        print(f'    Got HTML response — URL has moved or returned an error page.')
        return False

    new_md5 = hashlib.md5(data).hexdigest()
    if existing_md5 and existing_md5 == new_md5:
        print(f'    Unchanged since last run.')
        return True

    with open(dest, 'wb') as f:
        f.write(data)
    print(f'    Saved {len(data):,} bytes → {dest}')
    print(f'    MD5: {new_md5}')
    return True


def fetch():
    os.makedirs(RAW_DIR, exist_ok=True)
    print(f'[{datetime.now().isoformat()}] Regional GVA fetch.py starting…')

    success = False
    for entry in URLS:
        if try_download(entry):
            success = True
            break  # Use the first successful download

    if not success:
        print('\n  WARNING: All download attempts failed.')
        print('  transform.py will use hardcoded fallback data.')
        print('  This is expected if the ONS URL has changed.')
        # Exit 0 so the pipeline doesn't block the build
        return

    # List what we have
    print(f'\nFiles in {RAW_DIR}:')
    for fname in sorted(os.listdir(RAW_DIR)):
        full = os.path.join(RAW_DIR, fname)
        print(f'  {os.path.getsize(full):>10,}  {fname}')


if __name__ == '__main__':
    fetch()
    print('\nfetch.py complete.')
