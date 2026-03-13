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
  { num: 1, name: 'DfT', dataset: 'National Travel Survey', url: 'https://www.gov.uk/government/collections/national-travel-survey-statistics', date: '2025' },
  { num: 2, name: 'Active Travel England', dataset: 'Annual Report', url: 'https://www.gov.uk/government/organisations/active-travel-england', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  carShare: number;
  ptShare: number;
  cyclingShare: number;
  walkingShare: number;
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
    fetch('/data/national-travel-survey/national_travel_survey.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'carShare',
          label: 'Car trips (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.carShare,
          })),
        },
        {
          id: 'ptShare',
          label: 'Public transport (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ptShare,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'cyclingShare',
          label: 'Cycling trips (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cyclingShare,
          })),
        },
        {
          id: 'walkingShare',
          label: 'Walking trips (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.walkingShare,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic collapses public transport' },
    { date: new Date(2022, 5, 1), label: '2022: Hybrid work reduces commuting' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Active Travel England established' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="National Travel Survey" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="How Does Britain Actually Get Around?"
          finding="Car dominance has increased — 63% of trips are by car, cycling accounts for just 1.5% of trips, and public transport fell then partially recovered post-pandemic."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Car share of trips"
            value="63%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Broadly unchanged since 2000 · slight post-pandemic rise"
            sparklineData={[62, 62, 62, 62, 62, 62, 55, 62, 63, 63, 63]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Cycling share of trips"
            value="1.5%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 1.0% in 2015 · still tiny vs Netherlands 27%"
            sparklineData={[1.0, 1.1, 1.1, 1.2, 1.2, 1.3, 2.0, 1.8, 1.5, 1.5, 1.5]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Public transport share"
            value="7%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 10% pre-pandemic · partially recovered"
            sparklineData={[10, 10, 10, 10, 10, 8, 3, 6, 7, 7, 7]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Mode share of trips, England, 2015-2025"
              subtitle="Percentage of trips made by each transport mode. Car use remains dominant; cycling has slightly increased but from a very low base."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cycling and walking trip shares, England, 2015-2025"
              subtitle="Percentage of trips made on foot and by bicycle. Both increased during the pandemic but cycling has partially reverted."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Active Travel England investing £1bn by 2025"
            value="£1bn"
            unit="active travel investment 2021-25"
            description="Active Travel England was established in 2022 to fund and mandate cycling and walking infrastructure. £1bn was committed to Cycling and Walking Investment Strategy 2 for 2021-25. Cycle superhighways in London increased cycling trips 35% on those corridors. E-bike subsidies are being trialled in low-income areas."
            source="Source: DfT — National Travel Survey, 2025. Active Travel England, 2025."
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
