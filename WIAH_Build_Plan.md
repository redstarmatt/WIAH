# What Is Actually Happening — Build Plan

## Overview

This is the technical build plan for WIAH (What Is Actually Happening), a national data dashboard that tracks the underlying health of the UK across key domains. This plan is designed to be executed incrementally using Claude Code, building from a working prototype of a single topic through to a multi-domain platform.

The principle throughout: get something real and live as fast as possible, then iterate. No architecture astronautics. No building infrastructure for scale you don't have yet.

---

## Architecture Decision: Static-First

WIAH is a read-heavy, infrequently-updated data site. It does not need a backend application server at launch. The entire first version can be built as a **static site with pre-rendered data**, deployed to Vercel or Netlify for free.

**Stack:**
- **Framework:** Next.js (App Router, static export)
- **Styling:** Tailwind CSS
- **Charts:** D3.js for custom visualisations, with Recharts as a simpler fallback
- **Maps:** Mapbox GL JS (free tier covers early traffic) or Leaflet with ONS boundary data
- **Data pipeline:** Python scripts that fetch, clean, and output JSON
- **Content:** MDX files for editorial/contextual commentary
- **Hosting:** Vercel (free tier, auto-deploys from GitHub)
- **Domain:** whatisactuallyhappening.uk

**Why static?** No server costs. Instant page loads. Easy to cache. Scales for free. The data updates weekly/monthly/quarterly, not in real-time — a static rebuild on a schedule is all you need. When you need interactivity (postcode lookup, filtering), client-side JS against pre-built JSON files handles it.

---

## Phase 1: First Topic Live — "Can You Actually See a Doctor?"

**Goal:** One complete, polished, shareable topic page live on the web within 2-3 weeks. This is the proof of concept. Everything else follows from whether this gets traction.

### 1.1 Data Pipeline

Build Python scripts in `/data/pipelines/gp-access/` that fetch and process:

```
data/
  pipelines/
    gp-access/
      fetch.py          # Downloads raw data from sources
      transform.py      # Cleans, normalises, outputs JSON
      README.md         # Documents sources, methodology, update frequency
  output/
    gp-access/
      national.json     # National time series
      regional.json     # ICB/region level
      practice.json     # Practice level (for postcode lookup)
      metadata.json     # Source attribution, last updated, methodology notes
```

**Data sources to fetch:**

| Dataset | Source | Format | Update frequency |
|---------|--------|--------|-----------------|
| GP Patient Survey — access results | NHS England | CSV/Excel | Annual (July) |
| Appointments in General Practice | NHS Digital | CSV | Monthly |
| GP workforce data | NHS Digital | CSV | Monthly |
| Practice-level registered patients | NHS Digital | CSV | Quarterly |
| Practice closures/mergers | NHS England | Various | As published |
| GP earnings and expenses | NHS Digital | CSV | Annual |

**`fetch.py` requirements:**
- Download from direct URLs (NHS Digital has stable download endpoints)
- Cache raw downloads in `data/raw/` with datestamp
- Handle Excel, CSV, and ODS formats
- Log what was downloaded and when
- Exit with clear error if a source has moved or changed format

**`transform.py` requirements:**
- Read raw files, clean column names, handle encoding issues
- Normalise time periods (some sources use financial year, some calendar year, some month)
- Calculate derived metrics: appointments per registered patient, patients per GP FTE, trend direction
- Output clean JSON files sized for web consumption (split national/regional/practice)
- Generate `metadata.json` with source URLs, retrieval dates, methodology notes
- Flag any data quality issues (gaps, methodology changes) in the metadata

**Claude Code prompt to start this:**
```
Read the NHS Digital API documentation and GP Patient Survey methodology.
Build a Python pipeline that downloads GP appointment data, workforce data,
and patient survey results. Clean and normalise into JSON files with national
trends, ICB-level breakdowns, and practice-level data. Include metadata
tracking sources and methodology. Use pandas. Cache raw downloads.
```

### 1.2 Site Scaffold

```
site/
  app/
    page.tsx                    # Homepage — summary dashboard
    topics/
      gp-access/
        page.tsx                # Main topic page
        postcode/
          page.tsx              # Postcode lookup experience
    about/
      page.tsx                  # What is WIAH, methodology, team
    components/
      TrendChart.tsx            # Reusable time series chart
      RegionalMap.tsx           # Choropleth map component
      DirectionIndicator.tsx    # ↑ ↓ → improving/stable/declining
      PostcodeLookup.tsx        # Input + results display
      SourceAttribution.tsx     # "Source: NHS Digital, updated March 2026"
      MetricCard.tsx            # Single headline number with trend
      TopicHeader.tsx           # Topic title, summary, key finding
    layout.tsx                  # Global layout, nav, footer
  public/
    data/                       # Pre-built JSON files copied from pipeline output
    geo/                        # GeoJSON boundary files for maps
  content/
    gp-access/
      context.mdx               # Editorial: what's driving this, what it means
      methodology.mdx           # How we calculate, what we include/exclude
```

**Claude Code prompt:**
```
Scaffold a Next.js 14 app with Tailwind CSS. Create a topic page layout
with: a header showing topic title and one-sentence summary, a row of
3-4 MetricCard components showing headline numbers with trend arrows,
a TrendChart component using Recharts for national time series, a
RegionalMap component (placeholder for now), and a contextual commentary
section rendered from MDX. Use a clean, minimal design — think weather
app aesthetics. White background, plenty of whitespace, system fonts.
```

### 1.3 Core Components

**MetricCard** — the most important component. Shows a single number (e.g. "21.3 days"), a label ("Average wait for GP appointment"), a direction arrow with colour (red up = bad, green down = good — note that direction-of-good varies by metric), and a small sparkline showing recent trend. Must handle the nuance that "up" isn't always bad and "down" isn't always good — patients per GP going up is bad, appointments per day going up is good. This needs a `polarity` prop.

**TrendChart** — time series line chart. Must support: multiple series on one chart, annotation markers for methodology changes or policy events ("2018: GP contract changed"), hover tooltips with exact values and dates, responsive sizing, and a "compared to" baseline option (e.g. show 2015 as index 100). Use D3 for this rather than Recharts — the customisation requirements will outgrow Recharts quickly.

**RegionalMap** — choropleth of England (and Wales/Scotland where data exists) at ICB level for health data. Use ONS boundary GeoJSON files (freely available). Colour scale from green to red based on metric value. Click a region to see its detail. This is where the "what's happening near you" hook lives.

**PostcodeLookup** — text input, client-side lookup against a pre-built postcode-to-practice mapping (NHS Digital publishes this). Returns: your practice, your area's headline metrics compared to national average, and a simple verdict ("GP access in your area is significantly below the national average"). This is the shareability engine — people screenshot their result and post it.

**Claude Code prompt:**
```
Build a TrendChart component using D3.js in React. It should accept an
array of time series data, support multiple lines, show hover tooltips,
and allow annotation markers at specific dates with labels. Make it
responsive. Use a clean minimal style — thin lines, subtle grid,
no chartjunk. The y-axis should auto-scale with 10% padding.
```

### 1.4 The Postcode Experience

This is the single most important feature for audience growth. When someone arrives on the GP access page, the primary call to action should be a postcode input: **"Enter your postcode to see GP access in your area."**

The result shows: their nearest practices, the average appointment wait in their area vs national average, the trend (getting better or worse), the number of GPs per patient locally, and how their area ranks nationally. All of this data is derivable from practice-level NHS data that's already public.

Technical approach: pre-build a lookup file mapping postcode prefixes (not full postcodes — too large) to ICB areas, then serve the ICB-level data. For practice-level detail, use the NHS Digital practice lookup data pre-processed into a static JSON keyed by postcode prefix. Total file size should be manageable — a few MB of gzipped JSON, loaded on demand.

### 1.5 Editorial Content

Each topic needs three MDX files:

**`headline.mdx`** — 2-3 sentences that appear at the top of the page. The single most important finding, stated plainly. "In 2015, 85% of patients could see a GP within a week. Today it's 54%. In some parts of England it's below 40%."

**`context.mdx`** — 500-800 words explaining what's driving the trends. Not opinion — causal factors that are documented and evidenced. Workforce pipeline, contract structure, funding in real terms, demand growth, population ageing. Written for a non-specialist.

**`methodology.mdx`** — full transparency on what data is used, how it's processed, what's excluded, known limitations. This is what gives WIAH credibility with professionals and journalists.

### 1.6 Design Principles

Establish these in Phase 1 and they carry through everything:

- **White space is the primary design element.** The data is complex; the presentation must be calm.
- **No decorative elements.** Every pixel either shows data or aids comprehension.
- **Mobile-first.** Most sharing happens on phones. Charts must work at 375px wide.
- **Accessible.** Colour is never the only indicator (always paired with icons/labels). All charts have screen-reader-friendly data tables as alternatives. WCAG AA minimum.
- **Every number has a source.** Visible, linked, dated. This is non-negotiable.
- **Slow, confident animation.** Charts draw in when they scroll into view. Not flashy — deliberate. Signals care and craftsmanship.

### 1.7 Go Live Checklist

- [ ] Data pipeline runs cleanly and outputs valid JSON
- [ ] National trend charts render correctly with 10+ years of data
- [ ] Regional map shows meaningful variation
- [ ] Postcode lookup returns results for any English postcode
- [ ] Context and methodology pages are written and reviewed
- [ ] Mobile responsive down to 375px
- [ ] Open Graph tags set for social sharing (title, description, preview image)
- [ ] Social sharing generates a compelling card (auto-generate preview images showing key stat)
- [ ] Analytics installed (Plausible — privacy-respecting, no cookies)
- [ ] Domain pointing, SSL active
- [ ] README documents how to run pipeline and rebuild site

---

## Phase 2: Four More Topics (Weeks 4-10)

Each new topic follows the same pattern: pipeline → data → components → editorial → ship. The site scaffold, design system, and reusable components from Phase 1 make each subsequent topic faster.

### 2.1 "Where Does Your Money Actually Go?" (Housing/Earnings)

**Data sources:** ONS House Price Index, ONS Annual Survey of Hours and Earnings, English Housing Survey, DLUHC live tables on social housing, Land Registry Price Paid data.

**Key pipeline work:** The power is in the ratio — house prices to earnings over time, by area. ONS publishes affordability ratios directly but the historical series and age-group breakdowns need assembly. Land Registry data is huge but well-structured.

**Unique component:** A "then vs now" calculator — pick an area and a year, see what a home cost then vs now, and what the equivalent salary was vs is. Interactive, personal, shareable.

**Claude Code prompt:**
```
Build a data pipeline that downloads ONS affordability ratio data and
ASHE earnings data, combines them with Land Registry median house prices,
and outputs JSON files with national and local authority level time series
going back to 1997. Include a derived metric showing hours of work needed
to afford an average home by area.
```

### 2.2 "Is Your Water Actually Clean?"

**Data sources:** Environment Agency Event Duration Monitoring data (sewage discharges), EA water quality sampling, Ofwat financial data, water company annual returns.

**Key pipeline work:** EA publishes discharge data at outfall level — tens of thousands of locations. Aggregate to river/catchment/water company level. Calculate total discharge hours by area and trend over time.

**Unique component:** River/beach lookup — "enter a river or beach name" and see discharge events, monitoring results, and the responsible water company's investment and profit figures side by side. Map-based — show discharge points along rivers.

**Known challenge:** EA data formats have changed repeatedly. The pipeline needs to handle multiple historical formats. The raw dataset is large (millions of rows). Pre-aggregate aggressively.

### 2.3 "What Happens When You Call 999?"

**Data sources:** NHS England Ambulance Quality Indicators (monthly), Ambulance System Indicators, NHS England A&E performance data.

**Key pipeline work:** Response time data is published by ambulance trust and category. Build time series by trust area, map to regions. Calculate gap between target and actual, and the trend in that gap.

**Unique component:** Postcode-based lookup showing your ambulance trust's performance. The emotional hook is a simple statement: "In your area, the average wait for a Category 2 ambulance is X minutes. The target is 18 minutes. Five years ago it was Y minutes."

### 2.4 "Are Things Actually Getting More Dangerous?"

**Data sources:** ONS Crime Survey for England and Wales, Home Office police recorded crime, Home Office crime outcomes data, HMICFRS PEEL inspection results.

**Key pipeline work:** The important thing is separating different crime types — overall crime has trended down but specific categories (fraud, stalking, sexual offences reporting) have risen dramatically. Charge rates have collapsed across almost all categories. The pipeline needs to produce crime-type-specific time series alongside the outcomes data (what proportion of reported crimes result in a charge).

**Unique component:** A "what actually happens" funnel chart — for a given crime type, show: estimated actual offences → reported to police → recorded → investigated → charged → convicted. The attrition at each stage is the story.

### 2.5 Shared Infrastructure Built During Phase 2

As you build topics 2-5, extract and refine:

- **Pipeline framework:** A shared Python base class for fetch/transform/output so new topics follow a consistent pattern
- **Component library:** Documented Storybook of all chart types, cards, maps, and interactive elements
- **Data schema:** Standard JSON structure for all topic data so the frontend doesn't need topic-specific code
- **Update automation:** GitHub Actions workflow that runs all pipelines on a schedule, rebuilds the site, and deploys. No manual intervention for routine updates

---

## Phase 3: Platform Features (Weeks 11-16)

### 3.1 Homepage Dashboard

Now you have five topics, the homepage becomes meaningful. Show a grid of MetricCards — one or two headline numbers per domain, each with direction-of-travel indicators. The goal is a single screen that answers "what is actually happening in this country right now" at a glance.

Design reference: the aesthetics of a premium weather app, applied to the state of the nation. Clean, scannable, calm.

### 3.2 "What's Getting Worse That Nobody's Talking About"

An editorially curated feed — the 3-5 trends that are deteriorating significantly but haven't reached mainstream news coverage. Updated monthly. This is where WIAH builds its reputation for being ahead of the news cycle. Implementation: a simple MDX-driven blog-style page with embedded charts from the existing data.

### 3.3 "When The News Breaks" Reactive Content

A lightweight system for quickly publishing context when a major story hits. Pre-build template pages for predictable events (winter NHS crisis, exam results, crime statistics release) so that when the moment comes, you can publish a contextual page within hours. Implementation: MDX pages that pull from existing data JSON with minimal custom work per piece.

### 3.4 Newsletter

Weekly email — the 3-5 most notable data movements across all domains, with one "deep dive" chart and a link to the full topic page. Use Buttondown or Resend for delivery. The newsletter is the primary audience retention and growth tool. Build the subscriber base from day one — add an email capture to every topic page and the postcode lookup results.

### 3.5 Social Sharing Infrastructure

Auto-generate Open Graph images for every topic and metric — when someone shares a WIAH link, the preview card should show the key chart or headline number. Use `@vercel/og` or a Puppeteer-based image generation pipeline. This is critical for social growth — a compelling preview image dramatically increases click-through on shared links.

Build a "share this finding" button on postcode lookup results that generates a pre-formatted social post: "GP access in [my area] is X% below the national average. See the full picture at whatisactuallyhappening.uk"

---

## Phase 4: Professional Tier Foundations (Weeks 17-24)

### 4.1 API

Expose the data via a simple REST API. At this stage it's just serving the same pre-built JSON files through a documented endpoint structure, but with API keys for tracking usage and rate limiting.

```
GET /api/v1/topics
GET /api/v1/topics/gp-access/national
GET /api/v1/topics/gp-access/regional?area=NHS+North+East
GET /api/v1/topics/gp-access/practice?postcode=NE1
GET /api/v1/topics/gp-access/metadata
```

Implementation: Next.js API routes with a simple key-based auth middleware. Store keys in a database (Supabase free tier or similar). This doesn't need to be sophisticated — it needs to exist so you can start offering it.

### 4.2 Embeddable Charts

Allow journalists and researchers to embed WIAH charts on their own sites. Generate iframe embed codes for any chart. This is both a distribution mechanism (your charts appear on news sites, driving traffic back) and a credibility builder.

### 4.3 Alert Subscriptions

Email alerts when specific indicators cross thresholds or change significantly. "Tell me when GP access in my area drops below X" or "Alert me when ambulance response times in my region change by more than 10%." Implementation: a simple subscription table, checked against new data on each pipeline run, with email notifications via Resend.

### 4.4 Data Download

Let professional users download clean CSV/Excel files of any dataset, with methodology documentation included. Free for individual metrics, require (free) registration for bulk downloads. Registration gives you a user base to communicate with and eventually convert to paid.

---

## Phase 5: Expansion and Sustainability (Months 6-12)

### 5.1 More Topics

Add 3-5 more domains based on audience feedback and data availability. Likely candidates: education (attainment gaps, SEND, teacher workforce), environment (air quality by area), mental health access, and the trust/accountability domain.

### 5.2 Paid Professional Tier

Based on what free API and download users are actually requesting, design a paid tier. Likely features: higher rate limits, custom data exports, priority alerts, historical data access, and dedicated support. Price based on what you've learned about who's using it — journalists may need a different offering from law firms.

### 5.3 Funding Applications

With 6 months of live data, traffic numbers, media citations, and user testimonials, you have what you need to write compelling funding applications to Nuffield Foundation, Health Foundation, Joseph Rowntree Foundation, and similar. The application writes itself: "Here's what we built. Here's the traction. Here's what we'd do with funding."

### 5.4 Composite Indices

Develop headline indices (NHS Pressure Index, Justice System Strain Index) that combine multiple indicators into a single trackable number. These become licensable media assets — "the WIAH Health Index fell for the third consecutive quarter."

---

## CLAUDE.md — Project Instructions for Claude Code

Place this file in the project root so Claude Code understands the project context on every session.

```markdown
# WIAH — What Is Actually Happening

## Project Overview
National data dashboard tracking structural trends in UK public services.
Static Next.js site with Python data pipelines.

## Architecture
- Site: Next.js 14 (App Router, static export), Tailwind CSS, D3.js
- Data: Python pipelines outputting JSON to /public/data/
- Hosting: Vercel (static)
- Content: MDX for editorial commentary

## Directory Structure
- /site — Next.js application
- /data/pipelines/{topic}/ — Python fetch/transform scripts per topic
- /data/raw/ — cached raw downloads (gitignored)
- /data/output/ — processed JSON (copied to /site/public/data/ on build)
- /content/{topic}/ — MDX editorial files

## Key Conventions
- Every data point must trace to a named, dated, linked source
- JSON output schema: see /data/schema/topic.json
- Charts: D3.js preferred, Recharts acceptable for simple cases
- All components must work at 375px width
- Use Plausible for analytics, never Google Analytics
- Colour for direction: green = improving, amber = stable, red = declining
- Each metric has a `polarity` field: "up-is-good" or "up-is-bad"

## Pipeline Pattern
Each topic pipeline has:
- fetch.py — downloads raw data, caches in /data/raw/{topic}/
- transform.py — cleans, normalises, outputs to /data/output/{topic}/
- README.md — documents sources, methodology, known issues
- Pipeline must be idempotent and handle source unavailability gracefully

## Current Topics
1. gp-access — GP appointments, workforce, patient survey
2. housing-affordability — house prices vs earnings
3. water-quality — sewage discharges, river quality
4. ambulance-response — 999 response times
5. crime-reality — crime types, charge rates, outcomes

## Build & Deploy
- `cd data && python run_all.py` — runs all pipelines
- `cd site && npm run build` — builds static site
- Push to main triggers Vercel deploy
- GitHub Actions runs pipelines weekly on schedule
```

---

## Budget Estimate (Phase 1-3)

| Item | Cost | Notes |
|------|------|-------|
| Domain | £10/year | .uk domain |
| Hosting (Vercel) | £0 | Free tier handles substantial traffic |
| Mapbox | £0 | Free tier: 50k map loads/month |
| Plausible Analytics | £9/month | Privacy-respecting analytics |
| Newsletter (Buttondown) | £0-£9/month | Free up to 100 subscribers |
| Design assets | £0-500 | Depending on whether you commission a logo |
| **Total Phase 1-3** | **~£200-700** | Excluding your time |

The expensive thing is time, not infrastructure. A static-first architecture means you can build and run this for essentially nothing until you have meaningful traffic.

---

## What To Build First, Tomorrow

Open Claude Code in a new project directory and say:

```
Set up a new Next.js 14 project with Tailwind CSS and TypeScript.
Create the directory structure for a data dashboard site called
"What Is Actually Happening." Include a /data directory for Python
pipelines and a /site directory for the Next.js app. Create a
CLAUDE.md with the project conventions. Build a homepage with a
clean, minimal design showing a title, one-line description, and
placeholder cards for 5 topic areas. Make it look premium — lots
of whitespace, system fonts, subtle animations.
```

Then:

```
Build a Python data pipeline that downloads NHS GP appointment data
from NHS Digital. Start with the monthly appointments in general
practice dataset. Fetch the most recent 5 years, clean the data,
and output a JSON file with monthly national totals and a breakdown
by ICB region. Document the source URL and methodology in a README.
```

Then you're building.
