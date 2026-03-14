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
  { num: 1, name: 'BEIS', dataset: 'Trade Union Statistics 2024', url: 'https://www.gov.uk/government/statistics/trade-union-statistics-2024', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Labour Disputes — Working days lost', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/workplacedisputesandworkingconditions', date: '2024', note: '2.7 million days lost in 2023 — highest since 1989' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  overallRate: number;
  publicSectorRate: number;
  strikesDays: number;
  privateSectorRate: number;
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
    fetch('/data/trade-union-membership/trade_union_membership.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'overallRate',
          label: 'Overall membership rate (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.overallRate,
          })),
        },
        {
          id: 'publicSectorRate',
          label: 'Public sector rate (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.publicSectorRate,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'strikesDays',
          label: 'Days lost (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.strikesDays,
          })),
        },
        {
          id: 'privateSectorRate',
          label: 'Private sector membership (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.privateSectorRate,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Wave of strike action begins' },
    { date: new Date(2023, 5, 1), label: '2023: Record days lost since 1989' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: NHS and rail strikes peak' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Trade Union Membership" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Are Trade Unions Coming Back?"
          finding="Union membership fell from 53% of workers in 1979 to 22.3% in 2024, but has stabilised. Private sector membership stands at just 12.8% while public sector remains at 50%."
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
            label="Overall union membership"
            value="22.3%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Stabilised after decades of decline from 53% in 1979"
            sparklineData={[25.0, 24.7, 24.0, 23.4, 23.5, 23.7, 23.3, 23.0, 22.7, 22.3, 22.3]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Private sector membership"
            value="12.8%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Barely changed in 10 years · gig economy unmeasured"
            sparklineData={[13.9, 13.7, 13.4, 13.2, 13.0, 12.9, 12.8, 12.7, 12.7, 12.8, 12.8]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Working days lost to strikes 2023"
            value="2.7m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Highest since 1989 · rail, NHS and civil service"
            sparklineData={[0.2, 0.1, 0.2, 0.3, 0.2, 0.2, 0.2, 2.5, 2.7, 1.5, 0.8]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Trade union membership rate, UK, 2015-2025"
              subtitle="Percentage of employees who are trade union members, overall and by sector."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Working days lost to industrial action, UK, 2015-2025"
              subtitle="Annual working days lost to strike action (millions). The 2022-23 wave of strikes was the largest in three decades."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Membership among young workers growing"
            value="+3pp"
            unit="18-24 union membership since 2019"
            description="Trade union membership among 18-24 year olds has grown 3 percentage points since 2019, bucking the long-term trend. Young workers in warehousing, retail and fast food have been at the forefront of organising campaigns. The 2024 Employment Rights Bill strengthens rights to organise and removes some barriers to industrial action."
            source="Source: BEIS — Trade union statistics, 2025."
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
