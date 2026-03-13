'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Cefas', dataset: 'UK Clean Seas Environment Monitoring Programme', url: 'https://www.cefas.co.uk/', date: '2025' },
  { num: 2, name: 'Copernicus Marine Service', dataset: 'North-West European Shelf Seas pH & Carbonate', url: 'https://marine.copernicus.eu/', date: '2025' },
  { num: 3, name: 'IPCC', dataset: 'AR6 Working Group I — Ocean chemistry', url: 'https://www.ipcc.ch/report/ar6/wg1/', date: '2021' },
  { num: 4, name: 'GOA-ON', dataset: 'Global Ocean Acidification Observing Network', url: 'https://www.goa-on.org/', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface PHPoint {
  year: number;
  ph: number;
}

interface AragonitePoint {
  year: number;
  omega: number;
}

interface CO2Point {
  year: number;
  ppm: number;
}

interface ShellfishPoint {
  year: number;
  indexScore: number;
}

interface RegionData {
  region: string;
  ph: number;
  changePerDecade: number;
}

interface OceanAcidificationData {
  surfacePH: PHPoint[];
  aragoniteSaturation: AragonitePoint[];
  dissolvedCO2: CO2Point[];
  shellfishImpact: ShellfishPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OceanAcidificationPage() {
  const [data, setData] = useState<OceanAcidificationData | null>(null);

  useEffect(() => {
    fetch('/data/ocean-acidification/ocean_acidification.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const phSeries: Series[] = data
    ? [{
        id: 'surface-ph',
        label: 'Surface ocean pH',
        colour: '#264653',
        data: data.surfacePH.map(d => ({
          date: yearToDate(d.year),
          value: d.ph,
        })),
      }]
    : [];

  const aragoniteSeries: Series[] = data
    ? [{
        id: 'aragonite',
        label: 'Aragonite saturation state (\u03A9)',
        colour: '#E63946',
        data: data.aragoniteSaturation.map(d => ({
          date: yearToDate(d.year),
          value: d.omega,
        })),
      }]
    : [];

  const shellfishSeries: Series[] = data
    ? [{
        id: 'shellfish',
        label: 'Shellfish viability index',
        colour: '#F4A261',
        data: data.shellfishImpact.map(d => ({
          date: yearToDate(d.year),
          value: d.indexScore,
        })),
      }]
    : [];

  const latestPH = data?.surfacePH[data.surfacePH.length - 1];
  const earliestPH = data?.surfacePH[0];
  const latestAragonite = data?.aragoniteSaturation[data.aragoniteSaturation.length - 1];
  const earliestAragonite = data?.aragoniteSaturation[0];
  const latestShellfish = data?.shellfishImpact[data.shellfishImpact.length - 1];

  const phDrop = latestPH && earliestPH
    ? (earliestPH.ph - latestPH.ph).toFixed(3)
    : '0.057';

  const aragoniteDrop = latestAragonite && earliestAragonite
    ? Math.round(((earliestAragonite.omega - latestAragonite.omega) / earliestAragonite.omega) * 100)
    : 20;

  return (
    <>
      <TopicNav topic="Ocean Acidification" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ocean Acidification"
          question="How Acidic Are Britain's Seas?"
          finding="UK coastal waters have become approximately 30% more acidic since pre-industrial times, with pH declining by 0.02 units per decade. Shellfish populations and marine ecosystems face growing pressure as the chemistry of the sea shifts beneath them."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The ocean absorbs roughly a quarter of all carbon dioxide emitted by human activity.<Cite nums={3} /> That absorption has buffered the atmosphere from even more severe warming, but it comes at a cost: when CO2 dissolves in seawater it forms carbonic acid, lowering the pH. UK shelf seas have tracked this global trend closely. Continuous monitoring stations in the North Sea and Celtic Sea show a pH decline of approximately 0.02 units per decade since the early 1990s.<Cite nums={1} /> That sounds small, but because the pH scale is logarithmic, it represents a roughly 30% increase in hydrogen ion concentration since pre-industrial times.</p>
            <p>The practical consequences are already measurable. Aragonite saturation state -- the key indicator of whether shell-forming organisms can build and maintain their calcium carbonate structures -- has fallen by 20% in UK waters since 1990.<Cite nums={2} /> Native oyster restoration projects in the Solent and Essex estuaries report thinner juvenile shells. Scottish mussel farms have documented slower growth rates in years with lower pH readings. Cold-water coral reefs along the UK continental shelf edge, already fragile, face dissolution risk as saturation drops toward critical thresholds.</p>
            <p>There is no quick fix. Even if global emissions fell to zero tomorrow, ocean pH would continue declining for decades as the deep ocean equilibrates with atmospheric CO2 already present.<Cite nums={3} /> The Cefas monitoring programme, expanded in 2019, now provides the most comprehensive UK-specific dataset.<Cite nums={[1, 4]} /> What it shows is a relentless, linear trend with no sign of stabilisation.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ph', label: 'pH trend' },
          { id: 'sec-aragonite', label: 'Aragonite' },
          { id: 'sec-shellfish', label: 'Shellfish impact' },
          { id: 'sec-regional', label: 'Regional' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Surface ocean pH"
            value={latestPH ? latestPH.ph.toFixed(3) : '8.053'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={`-${phDrop} since 1990 · declining 0.02/decade`}
            sparklineData={
              data ? sparkFrom(data.surfacePH.map(d => d.ph)) : []
            }
            source="Cefas · UK Clean Seas Monitoring Programme, 2025"
            href="#sec-ph"
          />
          <MetricCard
            label="Aragonite saturation (\u03A9)"
            value={latestAragonite ? latestAragonite.omega.toFixed(2) : '2.35'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${aragoniteDrop}% since 1990 · shell formation impaired below 1.5`}
            sparklineData={
              data ? sparkFrom(data.aragoniteSaturation.map(d => d.omega)) : []
            }
            source="Copernicus Marine Service · NW European Shelf, 2025"
            href="#sec-aragonite"
          />
          <MetricCard
            label="Shellfish viability index"
            value={latestShellfish ? latestShellfish.indexScore.toString() : '70'}
            unit="index (2005 = 100)"
            direction="down"
            polarity="up-is-bad"
            changeText="Down 30% since 2005 · native oyster & mussel populations affected"
            sparklineData={
              data ? data.shellfishImpact.map(d => d.indexScore) : []
            }
            source="Cefas · Shellfish Waters Assessment, 2025"
            href="#sec-shellfish"
          />
        </div>

        {/* Chart 1: Surface pH trend */}
        <ScrollReveal>
          <div id="sec-ph" className="mb-12">
            <LineChart
              series={phSeries}
              title="UK shelf sea surface pH, 1990–2025"
              subtitle="Mean annual pH from North Sea and Celtic Sea monitoring stations. Lower values indicate higher acidity."
              yLabel="pH"
              source={{
                name: 'Cefas',
                dataset: 'UK Clean Seas Environment Monitoring Programme',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Aragonite saturation */}
        <ScrollReveal>
          <div id="sec-aragonite" className="mb-12">
            <LineChart
              series={aragoniteSeries}
              title="Aragonite saturation state (\u03A9) in UK waters, 1990–2025"
              subtitle="Below 1.5, shell-forming organisms cannot maintain calcium carbonate structures. UK waters are trending toward this threshold."
              yLabel="Saturation state (\u03A9)"
              source={{
                name: 'Copernicus Marine Service',
                dataset: 'North-West European Shelf Seas pH & Carbonate',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Shellfish impact */}
        <ScrollReveal>
          <div id="sec-shellfish" className="mb-12">
            <LineChart
              series={shellfishSeries}
              title="UK shellfish viability index, 2005–2025"
              subtitle="Composite index tracking native oyster, mussel, and cockle population health. Indexed to 100 in 2005."
              yLabel="Index (2005 = 100)"
              source={{
                name: 'Cefas',
                dataset: 'Shellfish Waters Assessment',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Current pH and rate of change by UK sea region
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Scottish Atlantic waters show the fastest acidification rate, driven by colder temperatures increasing CO2 solubility.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const minPH = 8.040;
                  const maxPH = 8.065;
                  const pct = ((r.ph - minPH) / (maxPH - minPH)) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm text-wiah-black">
                          <span className="font-bold">{r.ph.toFixed(3)}</span>
                          <span className="text-wiah-mid ml-2">({r.changePerDecade}/decade)</span>
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${Math.max(10, pct)}%`, backgroundColor: '#264653' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Copernicus Marine Service & ICES — North Sea carbon chemistry observations, 2025</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="UK ocean monitoring network now among Europe's most comprehensive"
            value="47 stations"
            description="The Cefas Clean Seas monitoring programme was expanded in 2019 and now operates 47 continuous pH monitoring stations across UK shelf seas — up from 12 in 2015. This makes it one of the densest national ocean acidification monitoring networks in Europe. The UK is also a founding member of the Global Ocean Acidification Observing Network (GOA-ON), contributing real-time data that feeds into IPCC assessments. While the data shows an unrelenting trend, the infrastructure to track it — and to detect any future stabilisation — is now firmly in place."
            source="Source: Cefas — UK Ocean Acidification Monitoring Programme, 2025. GOA-ON membership registry."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong>Cefas</strong> — UK Clean Seas Environment Monitoring Programme. Continuous pH, dissolved CO2 and carbonate chemistry from 47 stations across UK shelf seas. Annual summary data used for national trend. Retrieved February 2026.</p>
            <p><strong>Copernicus Marine Service</strong> — North-West European Shelf Seas pH reanalysis product. Gridded pH and aragonite saturation fields at 7km resolution. Used for regional breakdown and aragonite saturation time series. Retrieved February 2026.</p>
            <p><strong>ICES</strong> — International Council for the Exploration of the Sea. North Sea carbon chemistry observations database. Provides independent validation of Cefas measurements. Retrieved February 2026.</p>
            <p><strong>NOAA / GOA-ON</strong> — Global Ocean Acidification Observing Network. Used for global context and cross-validation of UK-specific measurements against open-ocean trends. Retrieved February 2026.</p>
            <p className="pt-2 text-xs">pH is measured on the total hydrogen ion scale. Pre-industrial baseline pH estimated at approximately 8.18 for UK shelf seas. The 30% increase in acidity refers to hydrogen ion concentration, not pH units. Aragonite saturation critical threshold of 1.5 is based on laboratory studies of temperate mollusc species. Shellfish viability index is a composite of native oyster, mussel, and cockle population surveys weighted by commercial and ecological significance.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
