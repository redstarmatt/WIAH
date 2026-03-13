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

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  contaminationPct: number;
  rejectedTonnes: number;
  costMillions: number;
  reprocessorLosses: number;
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

const editorialRefs: Reference[] = [
  { num: 1, name: 'WRAP', dataset: 'Recycling Contamination Research', url: 'https://wrap.org.uk/resources/report/recycling-contamination', date: '2024' },
  { num: 2, name: 'Defra', dataset: 'Simpler Recycling Implementation Plan', date: '2024' },
  { num: 3, name: 'LARAC', dataset: 'Local Authority Recycling Advisory Committee Survey', date: '2024' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/recycling-contamination/recycling_contamination.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'contaminationPct',
          label: 'Households contaminating (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.contaminationPct,
          })),
        },
        {
          id: 'rejectedTonnes',
          label: 'Tonnes rejected (000s)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.rejectedTonnes,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'costMillions',
          label: 'Cost to councils (£m)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.costMillions,
          })),
        },
        {
          id: 'reprocessorLosses',
          label: 'Reprocessor losses (£m)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.reprocessorLosses,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: `2019: WRAP 'Do Your Bit' campaign` },
    { date: new Date(2022, 5, 1), label: '2022: Confusion increases with new food waste collections' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Food waste contamination becomes primary issue' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Recycling Contamination" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is Britain's Recycling Being Rejected?"
          finding="82% of UK residents put non-recyclable materials in recycling bins. Contamination causes 525,000 tonnes of recycling to be rejected annually and sent to landfill or incineration."
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
            label="Residents contaminating recycling"
            value="82%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Broadly unchanged for 5 years · confusion about rules"
            sparklineData={[82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Tonnes rejected as contaminated"
            value="525,000"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="2.5% of all materials collected for recycling"
            sparklineData={[480, 490, 500, 510, 515, 520, 520, 522, 523, 525, 525]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Cost of contamination"
            value="£52m/year"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Paid by councils · rising as collection volumes grow"
            sparklineData={[35, 37, 39, 41, 43, 45, 47, 49, 50, 51, 52]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Recycling contamination rates, UK, 2015-2025"
              subtitle="Percentage of households contaminating recycling, and tonnes rejected as a result."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cost of recycling contamination, UK, 2015-2025"
              subtitle="Annual cost to councils and reprocessors of contaminated recycling (£m)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Consistent collections will clarify rules from 2026"
            value="2026"
            unit="Simpler Recycling roll-out England"
            description="The Simpler Recycling reforms, requiring all English councils to collect the same set of dry recyclates and food waste from 2026, are expected to reduce contamination rates by 10-15 percentage points. Consistent national labelling on packaging, under the On-Pack Recycling Label scheme, now covers 80% of packaging products."
            source="Source: Defra — Simpler Recycling Implementation Plan, 2024."
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
