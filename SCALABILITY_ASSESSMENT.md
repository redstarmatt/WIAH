# WIAH Scalability Assessment

_Date: 2026-03-10_

## Current State

| Dimension | Count |
|-----------|-------|
| Topic page routes (`site/app/*/page.tsx`) | 533 |
| Data pipelines (`data/pipelines/`) | 31 |
| JSON data files served | 561 |
| Total data payload | 5.5 MB |
| Total page code | 112,385 lines |

The site has two distinct tiers:

- **Tier 1 (7 topics):** Health, Housing, Water, Justice, Education, Economy, Transport — 770–1,831 lines each, real data pipelines, rich D3 charts, annotations, regional breakdowns.
- **Tier 2 (~500 topics):** 100–300 lines each, fetching JSON that in most cases doesn't have a pipeline behind it. Structurally complete pages but many rely on data that's either hardcoded or generated once without a repeatable pipeline.

## Realistic Maximum Scale

### Topics: 30–50 is the practical ceiling for quality

Not because of technical limits — Next.js static export handles thousands of pages. The constraint is editorial:

- Each real topic needs a pipeline pair (fetch + transform), a data source that doesn't break, ongoing methodology notes, and domain understanding. 31 pipelines for 533 pages (17:1 ratio) is the tell.
- UK public data comes from ~15 bodies (ONS, NHS Digital, DfE, EA, Home Office, MOJ, Ofwat, DLUHC, etc.). Each has its own formats, update cadences, and tendency to reorganise URLs.
- At 30–50 well-maintained topics with ~60–120 pipelines, that's a plausible workload. Beyond that, you're maintaining a data warehouse.

### Data streams: 80–150 pipelines is the realistic ceiling

- Government endpoints move, change schema, or go offline. At 150 pipelines, several will always be broken.
- Total data payload scales linearly. At ~20KB avg per topic, 150 topics ≈ 15MB static JSON — trivial for Vercel.
- Pipeline runtime matters for CI. `run_all.py` runs sequentially; at 100+ pipelines a full run could take 30–60 minutes.

## Implications for Design and Delivery

### 1. Depth over width

500+ thin topics and 7 deep ones. The thin ones aren't differentiated from a Google search. The deep ones are the product. Return on investment is in making 20–30 topics as good as the health page, not in 500 shallow pages.

**Action:** Freeze the long tail. Pick 20–30 topics with real data sources and committed pipeline support. Archive or merge the rest.

### 2. Data-driven topic page renderer

Every page.tsx is standalone (200–1,800 lines) with its own types, data fetching, chart config, and layout. No shared template. At 50 topics:

- Changing MetricCard layout = editing 50 files
- Adding a shared section = editing 50 files
- A chart API change = hunting through 50 files

**Action:** Build a generic topic page component driven by a config/JSON file specifying metrics, charts, annotations, and data sources. Turn "add a topic" from "write 300 lines of TSX" into "write a config file and a pipeline."

### 3. Pipeline parallelism and failure isolation

`run_all.py` runs sequentially with no failure isolation. At 30+ pipelines:

- Run pipelines in parallel (they're independent)
- Track last-successful-run per pipeline; flag stale data rather than silently serving it
- Add data freshness tracking (dashboard or metadata the site reads)

### 4. Data validation

No pipeline validates output against a schema. A broken transform silently producing malformed JSON breaks a page with no signal. Add JSON schema validation to pipeline output.

### 5. Static JSON approach is correct for this scale

5.5 MB now, 20 MB at 3× topics with regional data — well within static hosting limits. Don't add a database or API layer. Do split large regional time series into separate lazy-loaded files (already done in some places).

### 6. Build time is not a concern

Static export of 500+ pages works fine. The bottleneck is pipeline runtime, not Next.js build time.

## Scale Summary

| Scale | Topics | Pipelines | Data | Architecture needed |
|-------|--------|-----------|------|-------------------|
| Current | 533 pages, 7 deep | 31 | 5.5 MB | Works for the 7 deep topics |
| Sweet spot | 25–35 deep | 60–100 | 10–20 MB | Data-driven page template, parallel pipelines, schema validation |
| Hard ceiling | 50 deep | 120–150 | 30–50 MB | Pipeline monitoring, data freshness tracking, per-topic lazy loading |
| Beyond reasonable | 100+ | 200+ | — | Different architecture entirely (data platform, not website) |

## Bottom Line

Realistic maximum: **30–50 deeply executed topics with 80–150 data streams**. That covers every major domain of UK public life. Invest now in a generic topic page renderer and pipeline infrastructure rather than more bespoke pages. Width is easy; depth is the product.
