"""
ASHE Pipeline — fetch.py
Downloads ASHE Table 1 ZIP from ONS and extracts to data/raw/ashe/table1/
"""

import os
import sys
import hashlib
import zipfile
import urllib.request
from datetime import datetime

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..', '..', '..'))
RAW_DIR = os.path.join(PROJECT_ROOT, 'data', 'raw', 'ashe')
EXTRACT_DIR = os.path.join(RAW_DIR, 'table1')
ZIP_PATH = os.path.join(RAW_DIR, 'ashetable1.zip')

URL = (
    'https://www.ons.gov.uk/file?uri=/employmentandlabourmarket/peopleinwork'
    '/earningsandworkinghours/datasets/allemployeesashetable1/2025provisional'
    '/ashetable12025provisional.zip'
)

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (compatible; WIAH-pipeline/1.0; '
        '+https://whatisactuallyhappening.uk)'
    )
}


def md5(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):
            h.update(chunk)
    return h.hexdigest()


def download():
    os.makedirs(RAW_DIR, exist_ok=True)
    os.makedirs(EXTRACT_DIR, exist_ok=True)

    existing_md5 = md5(ZIP_PATH) if os.path.exists(ZIP_PATH) else None

    print(f'[{datetime.now().isoformat()}] Downloading ASHE Table 1 ZIP…')
    print(f'  URL: {URL}')

    try:
        req = urllib.request.Request(URL, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
    except Exception as exc:
        print(f'  ERROR: download failed — {exc}', file=sys.stderr)
        sys.exit(1)

    new_md5 = hashlib.md5(data).hexdigest()
    if existing_md5 and existing_md5 == new_md5:
        print('  Unchanged since last run — skipping extraction.')
        list_extracted()
        return

    with open(ZIP_PATH, 'wb') as f:
        f.write(data)
    print(f'  Saved {len(data):,} bytes → {ZIP_PATH}')
    print(f'  MD5: {new_md5}')

    extract()


def extract():
    print(f'[{datetime.now().isoformat()}] Extracting ZIP to {EXTRACT_DIR}…')
    try:
        with zipfile.ZipFile(ZIP_PATH, 'r') as zf:
            zf.extractall(EXTRACT_DIR)
    except Exception as exc:
        print(f'  ERROR: extraction failed — {exc}', file=sys.stderr)
        sys.exit(1)
    print('  Extraction complete.')
    list_extracted()


def list_extracted():
    print(f'\nExtracted files in {EXTRACT_DIR}:')
    for root, dirs, files in os.walk(EXTRACT_DIR):
        dirs.sort()
        for fname in sorted(files):
            full = os.path.join(root, fname)
            rel = os.path.relpath(full, EXTRACT_DIR)
            size = os.path.getsize(full)
            print(f'  {size:>10,}  {rel}')


if __name__ == '__main__':
    download()
    print('\nfetch.py complete.')
