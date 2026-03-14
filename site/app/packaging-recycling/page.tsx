'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DEFRA / Environment Agency', dataset: 'Packaging Recycling Statistics', url: 'https://www.gov.uk/government/statistical-data-sets/env23-uk-waste-data-and-management', date: '2024' },
  { num: 2, name: 'WRAP', dataset: 'UK Plastics Pact Annual Report', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  plasticPct: number;
  glassRecyclingPct: number;
  plasticConsumed: number;
  plasticRecycled: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/packaging-recycling/packaging_recycling.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'plasticPct',
          label: 'Plastic packaging recycling (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.plasticPct,
          })),
        },
        {
          id: 'glassRecyclingPct',
          label: 'Glass recycling (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.glassRecyclingPct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'plasticConsumed',
          label: 'Plastic packaging consumed (000 tonnes)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.plasticConsumed,
          })),
        },
        {
          id: 'plasticRecycled',
          label: 'Plastic packaging recycled (000 tonnes)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.plasticRecycled,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Single-use plastics ban for some items' },
    { date: new Date(2023, 5, 1), label: '2023: EPR packaging levy consultation' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: WRAP targets tightened under Plastic Pact' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Packaging Recycling" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Which Materials Is Britain Actually Recycling?"
          finding={<>Paper and glass recycling exceed 80%, but plastic packaging recycling is just 51% — well below targets.<Cite nums={1} /> Nearly 1 million tonnes of plastic packaging are consumed annually.<Cite nums={1} /></>}
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Plastic packaging recycling rate"
            value="51%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText={<>Up from 40% in 2015 · target 70% by 2030<Cite nums={1} /></>}
            sparklineData={[40, 42, 44, 45, 46, 46, 47, 49, 50, 51, 51]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Paper/card recycling rate"
            value="82%"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText={<>Stable near target · high material quality<Cite nums={1} /></>}
            sparklineData={[75, 76, 77, 78, 79, 80, 81, 82, 82, 82, 82]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Plastic packaging consumption"
            value="950,000 tonnes"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>Barely changed since 2015 · single-use reductions offset<Cite nums={1} /></>}
            sparklineData={[990, 985, 980, 975, 970, 960, 955, 950, 950, 950, 950]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK packaging recycling rates by material, 2015-2025"
              subtitle="Recycling rates for major packaging materials as percentage of total placed on market."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Plastic packaging placed on market vs recycled, 2015-2025"
              subtitle="Total plastic packaging placed on UK market (000 tonnes) and amount recycled."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="UK Plastics Pact making progress"
            value="66%"
            unit="of plastic packaging now reusable or recyclable"
            description={<>The UK Plastics Pact, signed by over 150 businesses, has increased the proportion of plastic packaging that is reusable, recyclable or compostable from 59% in 2018 to 66% in 2024.<Cite nums={2} /> Single-use plastic straws, cutlery and plates were banned in 2023, removing 1.5 billion items annually.<Cite nums={1} /></>}
            source="Source: WRAP — UK Plastics Pact annual report, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
