"""
Fetch DLUHC social housing ODS files (Tables 104 and 213).
Downloads to data/raw/social-housing/ with MD5 dedup.
"""

import os
import hashlib
import urllib.request
import datetime

RAW_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "raw", "social-housing")

SOURCES = [
    {
        "name": "LiveTable104",
        "url": "https://assets.publishing.service.gov.uk/media/682deb17baff3dab9977518d/LiveTable104.ods",
        "filename": "LiveTable104.ods",
    },
    {
        "name": "LiveTable213",
        "url": "https://assets.publishing.service.gov.uk/media/6967a85a3d6914d0c58d0dc6/LiveTable213.ods",
        "filename": "LiveTable213.ods",
    },
]

HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; research)"
}


def md5(path):
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def fetch_file(source):
    os.makedirs(RAW_DIR, exist_ok=True)
    dest = os.path.join(RAW_DIR, source["filename"])

    old_hash = md5(dest) if os.path.exists(dest) else None

    # Download to temp file first
    tmp = dest + ".tmp"
    req = urllib.request.Request(source["url"], headers=HEADERS)
    print(f"Downloading {source['name']} from {source['url']} ...")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            with open(tmp, "wb") as f:
                while True:
                    chunk = resp.read(8192)
                    if not chunk:
                        break
                    f.write(chunk)
    except Exception as e:
        if os.path.exists(tmp):
            os.remove(tmp)
        raise RuntimeError(f"Failed to download {source['name']}: {e}")

    new_hash = md5(tmp)

    if old_hash == new_hash:
        os.remove(tmp)
        print(f"  {source['name']}: unchanged (MD5 {new_hash[:12]}...)")
    else:
        os.replace(tmp, dest)
        print(f"  {source['name']}: saved ({os.path.getsize(dest):,} bytes, MD5 {new_hash[:12]}...)")

    return dest


def main():
    print(f"[{datetime.datetime.now().isoformat()}] Fetching DLUHC social housing tables")
    for source in SOURCES:
        fetch_file(source)
    print("Done.\n")


if __name__ == "__main__":
    main()
