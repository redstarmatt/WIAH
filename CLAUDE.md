# What is *actually* happening

## Project Overview

A curated national data platform that makes the real state of the UK visible, understandable, and shareable. Each topic answers the question "What is actually happening in [domain]?" with 2–3 carefully chosen, data-driven visual stories.

**Domain:** whatisactuallyhappening.uk

---

## Architecture

### Stack
- **Framework:** Next.js 14 (App Router, static export)
- **Styling:** Tailwind CSS
- **Charts:** D3.js — no wrapper libraries. Full control over every axis tick, annotation, hover behaviour.
- **Maps:** Mapbox GL JS (free tier) or Leaflet with ONS boundary GeoJSON
- **Data pipeline:** Python scripts that fetch, clean, and output JSON
- **Content:** MDX files for editorial/contextual commentary
- **Hosting:** Vercel (free tier, auto-deploys from GitHub)
- **Analytics:** Plausible (privacy-respecting, no cookies)

### Why static?
Data updates weekly/monthly/quarterly, not real-time. A static rebuild on a schedule is all you need. No server costs, instant page loads, scales for free. Client-side JS against pre-built JSON handles interactivity.

---

## Directory Structure

```
/
├── CLAUDE.md                        # This file
├── site/
│   ├── app/
│   │   ├── page.tsx                 # Homepage — category grid
│   │   ├── layout.tsx               # Global layout, nav, footer
│   │   ├── health/
│   │   │   └── page.tsx             # "What is actually happening in Health"
│   │   ├── housing/
│   │   │   └── page.tsx
│   │   ├── water/
│   │   │   └── page.tsx
│   │   ├── justice/
│   │   │   └── page.tsx
│   │   ├── education/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── components/
│   │   ├── charts/
│   │   │   ├── LineChart.tsx         # D3 time series — the core component
│   │   │   ├── RegionalMap.tsx       # Choropleth using ONS boundaries
│   │   │   ├── FunnelChart.tsx       # For crime outcomes attrition
│   │   │   └── Sparkline.tsx         # Inline mini trend
│   │   ├── MetricCard.tsx            # Headline number + trend + source
│   │   ├── DirectionArrow.tsx        # ↑ ↓ with polarity-aware colouring
│   │   ├── PostcodeLookup.tsx        # Input + results
│   │   ├── SourceAttribution.tsx     # Monospace source line under every chart
│   │   ├── TopicHeader.tsx           # "What is actually happening in [X]"
│   │   ├── CategoryCard.tsx          # Homepage grid card
│   │   └── SiteName.tsx              # Editorial serif name component
│   ├── lib/
│   │   ├── data.ts                   # Helpers for loading JSON
│   │   └── format.ts                 # Number formatting, date formatting
│   └── public/
│       ├── data/                     # Pre-built JSON from pipeline
│       └── geo/                      # ONS GeoJSON boundary files
├── data/
│   ├── pipelines/
│   │   ├── gp-access/
│   │   │   ├── fetch.py
│   │   │   ├── transform.py
│   │   │   └── README.md
│   │   ├── ambulance/
│   │   ├── housing/
│   │   ├── water/
│   │   ├── crime/
│   │   └── education/
│   ├── raw/                          # Cached raw downloads (gitignored)
│   ├── output/                       # Processed JSON
│   └── run_all.py                    # Runs all pipelines
└── content/
    ├── health/
    │   ├── headline.mdx
    │   ├── context.mdx
    │   └── methodology.mdx
    └── [topic]/
```

---

## Brand Identity

### Name Treatment
The name is rendered in an editorial serif (Georgia or equivalent). The word "actually" is always bold italic. This is the signature visual element.

```
What is **_actually_** happening
```

In code:
```tsx
<span style={{ fontFamily: "Georgia, serif" }}>
  What is <strong><em>actually</em></strong> happening
</span>
```

On topic pages, it extends to: `What is actually happening in Health`

In the nav bar, the name is smaller (15px) but the same style. It's a clickable link back to the homepage.

### Colour Palette

| Name | Hex | Usage |
|------|-----|-------|
| Dark | `#0D1117` | Backgrounds (hero, OG cards), primary text |
| Black | `#1A1A1A` | Headings |
| Mid Grey | `#6B7280` | Secondary text, captions |
| Light Grey | `#F5F5F5` | Section backgrounds |
| White | `#FFFFFF` | Page background |
| Border | `#E5E7EB` | Dividers, card borders, chart grid |
| Signal Red | `#E63946` | Getting worse (polarity-aware) |
| Signal Amber | `#F4A261` | Stable / uncertain |
| Signal Green | `#2A9D8F` | Getting better (polarity-aware) |
| Blue | `#264653` | Links, interactive elements, accent |

**Critical rule:** Signal colours carry meaning. Red = worse, amber = stable, green = better. They are NEVER decorative. Always paired with text labels or arrows for accessibility.

### Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Site name | Georgia, serif | 42px hero / 15px nav | 400, "actually" bold italic |
| Topic category label | Georgia, serif | 13–16px | 400, "actually" bold italic |
| Page title (question) | System sans-serif | 36px | 800 |
| Body text | System sans-serif | 16px | 400, line-height 1.7 |
| Headline metric value | SF Mono / Fira Code / Consolas | 32px card / 48–64px hero | 700 |
| Chart labels, axes | SF Mono / monospace | 10–12px | 400 |
| Source attribution | SF Mono / monospace | 11–12px | 400, Mid Grey |
| Category card headline | System sans-serif | 18px | 700 |

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        wiah: {
          dark: '#0D1117',
          black: '#1A1A1A',
          mid: '#6B7280',
          light: '#F5F5F5',
          border: '#E5E7EB',
          red: '#E63946',
          amber: '#F4A261',
          green: '#2A9D8F',
          blue: '#264653',
        }
      },
      fontFamily: {
        editorial: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      }
    }
  }
}
```

---

## Design Principles

1. **White space is the primary design element.** Complex data, calm presentation. Never crowd.
2. **No decorative elements.** Every pixel shows data or aids comprehension. No gradients, no stock photos, no shadows (except functional card shadows).
3. **Mobile first.** Everything works at 375px. Most sharing happens on phones.
4. **Every number has a source.** Visible, linked, dated. Rendered in monospace below every chart. Non-negotiable.
5. **Slow, confident animation.** Charts draw in on scroll. 600–800ms eased transitions. Nothing bounces.
6. **Colour means something.** Signal colours only for directional indicators. Everything else is greyscale.

---

## Chart Specifications

Charts are the core product. Build all charts in D3.js directly — no Recharts, no wrapper libraries. We need total control.

**Reference standard:** The Economist's data visualisation team. Same rigour and density, but warmer entry points for a general audience.

### Chart Anatomy
- **Title:** System sans-serif, bold, 18–20px. Plain statement: "GP appointment wait times, 2015–2026."
- **Subtitle:** System sans-serif, regular, 14px, Mid Grey. Context: "Average days from booking to appointment, England."
- **Lines:** 2px stroke. Dark for single series. Signal colours for directional meaning. Max 4 series per chart.
- **Grid:** Horizontal only. 1px, `#E5E7EB`. No vertical grid lines.
- **Axes:** Monospace, 11px, Mid Grey. Y-axis auto-scaled with 10% padding. X-axis labels at sensible intervals.
- **Annotations:** Vertical dashed lines at notable dates. Monospace labels. "2018: GP contract reformed."
- **Target lines:** Dashed, Signal Green, with "Target" label.
- **Tooltips:** On hover — exact value, date, comparison. Dark card with subtle radius. Data in monospace.
- **Source line:** Monospace, 11–12px, Mid Grey. Below every chart. "Source: NHS Digital, [dataset], [date]. Updated [frequency]." Linked to source URL.

### Data Granularity
This is critical. We want **rich, granular, multi-layered charts** — not simple single-line trends. For each topic:

- **National time series:** 10+ years, monthly where available
- **Regional breakdowns:** ICB regions (health), local authorities (housing, education), water companies, police force areas
- **Comparisons:** Best vs worst region, or user's area vs national average
- **Multiple series:** Show related metrics together (e.g. GP wait times AND patient satisfaction on the same time axis)
- **Annotation layers:** Policy changes, methodology breaks, significant events

### MetricCard Component
The signature WIAH component. Anatomy:
1. Label (sans-serif, 13px, Mid Grey)
2. Value (monospace, 32px, bold, Dark) + unit + direction arrow
3. Change context (monospace, 12px, Mid Grey): "+4.2 days since 2019 · Target: 14 days"
4. Sparkline (80×20px, signal-coloured)
5. Source line (monospace, 10px, border colour)

**Polarity:** Each metric has a `polarity` field: `"up-is-bad"` or `"up-is-good"`. The arrow colour and sparkline colour are determined by polarity × direction. GP wait times going up = red. Satisfaction going up = green.

---

## Navigation & Information Architecture

### URL Structure
```
whatisactuallyhappening.uk/                    → Homepage (category grid)
whatisactuallyhappening.uk/health              → "What is actually happening in Health"
whatisactuallyhappening.uk/housing             → "What is actually happening in Housing"
whatisactuallyhappening.uk/water               → "What is actually happening in Water"
whatisactuallyhappening.uk/justice             → "What is actually happening in Justice"
whatisactuallyhappening.uk/education           → "What is actually happening in Education"
whatisactuallyhappening.uk/about               → About, methodology, team
```

### Homepage
Dark hero section with the editorial serif name. Below: a grid of CategoryCards, each labelled "What is *actually* happening in [X]", showing 1–2 headline metrics with sparklines and direction arrows. Click a card → topic page. Design reference: premium weather app applied to the state of the nation.

### Topic Page Structure (consistent across all topics)
1. **Category label:** "What is *actually* happening in Health" (Georgia, signal colour)
2. **Hero question:** "Can You Actually See a Doctor?" (sans-serif, 36px, bold)
3. **One-sentence finding:** The most important thing, stated plainly.
4. **MetricCards row:** 2–3 headline numbers with trends.
5. **Postcode lookup** (where applicable): "Enter your postcode to see your area."
6. **Visual stories:** 2–3 rich, granular D3 charts with annotations and target lines.
7. **Context:** 500–800 words on what's driving the trends. MDX.
8. **Sources & Methodology:** Full transparency. Every dataset listed and linked.

### Sticky Nav Bar
On topic pages: `What is actually happening | Health` on the left, `← All topics` on the right. Sticky at top on scroll.

---

## Tier 1 Topics — Specifications

### 1. Health

**URL:** `/health`
**Category colour:** Signal Red (#E63946)
**Questions:**
- Can you actually see a doctor? (GP access)
- What happens when you call 999? (Ambulance response)

**Data sources:**

| Dataset | Source | Format | Frequency | URL |
|---------|--------|--------|-----------|-----|
| Appointments in General Practice | NHS Digital | CSV | Monthly | digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice |
| GP Patient Survey | NHS England | CSV/Excel | Annual (July) | gp-patient.co.uk |
| GP workforce data | NHS Digital | CSV | Monthly | digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services |
| Ambulance Quality Indicators | NHS England | CSV | Monthly | england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/ |
| Practice-level registered patients | NHS Digital | CSV | Quarterly | digital.nhs.uk |

**Charts to build:**
1. GP wait times, 2015–present (monthly national, with ICB regional bands)
2. Patient satisfaction with GP access, 2015–present (annual)
3. Patients per GP FTE, 2015–present (monthly, national + regional)
4. Ambulance Cat 1 + Cat 2 response times, 2017–present (monthly, with 18-min target line)
5. Regional variation map — average GP wait by ICB area (choropleth)

**MetricCards:**
- Average GP wait: days, up-is-bad
- Patients per GP: count, up-is-bad
- Cat 2 ambulance wait: minutes, up-is-bad

**Postcode lookup:** Map postcode prefix → ICB → show local GP wait vs national average, local ambulance trust performance.

---

### 2. Housing

**URL:** `/housing`
**Category colour:** Signal Amber (#F4A261)
**Questions:**
- Can you afford to live where you live?

**Data sources:**

| Dataset | Source | Format | Frequency |
|---------|--------|--------|-----------|
| House price to earnings ratio | ONS | CSV | Annual |
| Annual Survey of Hours and Earnings (ASHE) | ONS | CSV | Annual |
| House Price Index | ONS / Land Registry | CSV | Monthly |
| Price Paid Data | Land Registry | CSV | Monthly |
| English Housing Survey | DLUHC | Excel | Annual |
| Social housing stock | DLUHC live tables | Excel | Annual |

**Charts to build:**
1. House price to earnings ratio, 1997–present (national + regional)
2. Median house price vs median earnings, 1997–present (dual axis or indexed to 100)
3. First-time buyer affordability by region (small multiples or choropleth)
4. Rent as % of income over time
5. "Then vs now" interactive calculator — pick area + year, see comparison

**MetricCards:**
- House price to earnings ratio: x, up-is-bad
- First-time buyer average age: years, up-is-bad
- Median rent as % of median income: %, up-is-bad

---

### 3. Water

**URL:** `/water`
**Category colour:** Blue (#264653)
**Questions:**
- Is your water actually clean?

**Data sources:**

| Dataset | Source | Format | Frequency |
|---------|--------|--------|-----------|
| Event Duration Monitoring (sewage) | Environment Agency | CSV | Annual |
| Water quality sampling | Environment Agency | CSV | Various |
| Bathing water classifications | Environment Agency | CSV | Annual |
| Water company financial data | Ofwat | Excel | Annual |

**Charts to build:**
1. Total sewage discharge hours, 2016–present (national, by water company)
2. Number of discharge events by water company
3. Rivers in good ecological status, 2009–present
4. Water company profits vs infrastructure investment
5. Map: discharge points along rivers (if feasible) or by water company area

**MetricCards:**
- Total sewage discharge hours: hours, up-is-bad
- Rivers in good health: %, down-is-bad
- Bathing waters at "excellent": %, down-is-bad

**Lookup:** Enter river or beach name → see discharge events, water quality, responsible company.

---

### 4. Justice

**URL:** `/justice`
**Category colour:** Mid Grey (#6B7280)
**Questions:**
- What actually happens when you report a crime?

**Data sources:**

| Dataset | Source | Format | Frequency |
|---------|--------|--------|-----------|
| Crime Survey for England and Wales | ONS | CSV | Quarterly |
| Police recorded crime | Home Office | CSV | Quarterly |
| Crime outcomes data | Home Office | CSV | Quarterly |
| Court statistics | MOJ | CSV | Quarterly |

**Charts to build:**
1. Crime outcomes funnel — estimated offences → reported → recorded → investigated → charged → convicted (by crime type)
2. Charge rate by crime type, 2015–present
3. Overall crime trend vs specific categories (fraud, sexual offences, stalking)
4. Crown court backlog, 2015–present
5. Regional variation in charge rates (police force area choropleth)

**MetricCards:**
- Crimes leading to charge: %, down-is-bad
- Crown court backlog: cases, up-is-bad
- Average time from offence to completion: months, up-is-bad

---

### 5. Education

**URL:** `/education`
**Category colour:** Signal Green (#2A9D8F)
**Questions:**
- What's actually happening in schools?

**Data sources:**

| Dataset | Source | Format | Frequency |
|---------|--------|--------|-----------|
| Key Stage 4 attainment | DfE Explore Education Statistics | CSV | Annual |
| School workforce census | DfE | CSV | Annual |
| SEND statistics | DfE | CSV | Annual |
| School-level performance | DfE | CSV | Annual |

**Charts to build:**
1. Attainment gap (FSM vs non-FSM) at GCSE, 2010–present
2. Teacher vacancy rate by subject, 2015–present
3. SEND — children waiting for EHC plan assessment, 2015–present
4. Persistent absence rates, 2015–present
5. Regional attainment variation (local authority choropleth)

**MetricCards:**
- Attainment gap: percentage points, up-is-bad
- Teacher vacancy rate: %, up-is-bad
- Children awaiting EHCP: count, up-is-bad

---

## Tone of Voice

- **Direct, not blunt.** State findings plainly without sensationalising.
- **Specific, not vague.** Numbers, dates, places. Not "significantly worse."
- **Contextual, not campaigning.** Explain drivers without prescribing solutions.
- **Human, not bureaucratic.** "Your area" not "the respondent's ICB."
- **Honest about uncertainty.** If the methodology changed, say so.

---

## Pipeline Pattern

Each topic pipeline follows the same pattern:

```
data/pipelines/{topic}/
├── fetch.py          # Downloads raw data, caches in data/raw/{topic}/
├── transform.py      # Cleans, normalises, outputs to data/output/{topic}/
└── README.md         # Documents sources, methodology, known issues
```

**fetch.py requirements:**
- Download from direct URLs (NHS Digital, ONS, EA all have stable endpoints)
- Cache raw downloads in `data/raw/` with datestamp
- Handle Excel, CSV, and ODS formats
- Log what was downloaded and when
- Exit with clear error if a source has moved

**transform.py requirements:**
- Clean column names, handle encoding
- Normalise time periods (financial year / calendar year / month)
- Calculate derived metrics (appointments per patient, patients per GP FTE, trend direction)
- Output clean JSON sized for web (split national/regional/granular)
- Generate `metadata.json` with source URLs, retrieval dates, methodology notes
- Flag data quality issues in metadata

**Output JSON schema (per topic):**
```json
{
  "topic": "health",
  "lastUpdated": "2026-03-01",
  "national": {
    "timeSeries": [
      { "date": "2025-01", "gpWaitDays": 21.3, "patientsPerGP": 2273 }
    ]
  },
  "regional": {
    "byICB": [
      { "code": "QE1", "name": "NHS North East", "gpWaitDays": 23.1 }
    ]
  },
  "metadata": {
    "sources": [
      { "name": "NHS Digital", "dataset": "Appointments in General Practice", "url": "...", "retrieved": "2026-03-01", "frequency": "monthly" }
    ],
    "methodology": "...",
    "knownIssues": ["Methodology changed in 2018 — pre/post not directly comparable"]
  }
}
```

---

## Build & Deploy

```bash
# Run all data pipelines
cd data && python run_all.py

# Copy output to site
cp -r data/output/* site/public/data/

# Build static site
cd site && npm run build

# Deploy (auto on push to main via Vercel)
git push origin main
```

GitHub Actions runs pipelines weekly on schedule and rebuilds.

---

## Build Order

Start here:

1. **Scaffold Next.js project** with Tailwind, TypeScript, directory structure above
2. **Build SiteName component** — the Georgia serif with italic bold "actually"
3. **Build MetricCard component** — the signature element
4. **Build LineChart component in D3** — the core chart. Must support: multiple series, annotations, target lines, hover tooltips, responsive sizing
5. **Build homepage** — dark hero with SiteName, category grid with CategoryCards
6. **Build Health topic page** — full page with all components
7. **Build GP access data pipeline** — fetch.py + transform.py for NHS Digital data
8. **Connect real data** to Health page
9. **Repeat for remaining 4 topics**

---

## Social Sharing

Auto-generate OG images for every page. Dark background (#0D1117), editorial serif name top-left, headline metric in centre, URL bottom-right. 1200×630px standard, 1200×1200px square. Use `@vercel/og` or Satori.

Postcode results generate shareable cards: "GP access in [area] is X% below the national average. See the full picture at whatisactuallyhappening.uk"

---

## What Success Looks Like

A regular person opens the site on their phone, sees "What is *actually* happening in...", taps Health, and within 10 seconds understands that GP wait times have doubled in a decade. They type their postcode, see their area is worse than average, screenshot it, and share it. A journalist sees the same page and trusts it because every number has a dated, linked source and the methodology is transparent. That's the product.
