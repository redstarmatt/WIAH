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
  totalReturns: number;
  enforcedRemovals: number;
  failedRemovalPct: number;
  voluntaryDeparturePct: number;
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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Immigration Statistics — Returns', url: 'https://www.gov.uk/government/statistical-data-sets/returns-and-detention-datasets', date: '2025' },
];

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/deportation-rates/deportation_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'totalReturns',
          label: 'Total returns',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalReturns,
          })),
        },
        {
          id: 'enforcedRemovals',
          label: 'Enforced removals',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.enforcedRemovals,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'failedRemovalPct',
          label: 'Failed attempts (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.failedRemovalPct,
          })),
        },
        {
          id: 'voluntaryDeparturePct',
          label: 'Voluntary departures (% of total)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.voluntaryDeparturePct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Covid grounds many removal flights' },
    { date: new Date(2023, 5, 1), label: '2023: Rwanda plan generates legal delays' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Rwanda scheme litigation begins' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Deportation Rates" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How Many People Are Actually Being Removed?"
          finding={<>19,212 people were returned from the UK in 2024 — down from a peak of 65,000 in 2005 and far below government targets.<Cite nums={1} /> Returns represent just 2% of illegal entries.<Cite nums={1} /></>}
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Returns/removals 2024"
            value="19,212"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText={<>Up from 14,259 in 2022 · still 70% below 2005 peak<Cite nums={1} /></>}
            sparklineData={[32885, 28644, 27094, 24580, 20261, 14313, 17274, 14259, 16479, 19212, 21000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Failed removals"
            value="41%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText={<>Down from 48% in 2020 · legal challenges main cause<Cite nums={1} /></>}
            sparklineData={[32, 33, 34, 36, 38, 48, 46, 44, 43, 42, 41]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Returns vs estimated illegal entries"
            value="2%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>Estimated 40,000+ channel crossings not removed<Cite nums={1} /></>}
            sparklineData={[8, 7, 7, 6, 5, 4, 3, 2, 2, 2, 2]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK enforcement returns and removals, 2015-2025"
              subtitle="Total returns (voluntary and enforced) from the UK per year."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Failed removal attempts, UK, 2015-2025"
              subtitle="Percentage of removal attempts that are unsuccessful, due to legal challenges, medical issues or logistical failure."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Returns rising from 2022 low"
            value="+35%"
            unit="increase in returns 2022-2024"
            description={<>Total returns increased 35% from the 2022 low of 14,259 to 19,212 in 2024.<Cite nums={1} /> Voluntary returns supported by Assisted Voluntary Return schemes cost 20x less than enforced removals and have fewer legal barriers. The 2024 Illegal Migration Act created new powers to speed removals.<Cite nums={1} /></>}
            source="Source: Home Office Immigration statistics — returns, 2025."
          />
        </ScrollReveal>

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
        <References items={editorialRefs} />
      </main>
    </>
  );
}
