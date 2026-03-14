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
  { num: 1, name: 'ONS', dataset: 'Long-term international migration', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration', date: '2025' },
  { num: 2, name: 'Home Office', dataset: 'Immigration Statistics', url: 'https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2024', date: '2025' },
  { num: 3, name: 'Universities UK', dataset: 'International student income analysis', url: 'https://www.universitiesuk.ac.uk/', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  studentVisaNet: number;
  workVisaNet: number;
  ukNationalEmigration: number;
  foreignNationalEmigration: number;
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
    fetch('/data/net-migration-composition/net_migration_composition.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'studentVisaNet',
          label: 'Student route net (000s)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.studentVisaNet,
          })),
        },
        {
          id: 'workVisaNet',
          label: 'Work route net (000s)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.workVisaNet,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'ukNationalEmigration',
          label: 'UK nationals emigrating (000s)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ukNationalEmigration,
          })),
        },
        {
          id: 'foreignNationalEmigration',
          label: 'Foreign nationals emigrating (000s)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.foreignNationalEmigration,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: EU free movement ends' },
    { date: new Date(2022, 5, 1), label: '2022: International students surge post-pandemic' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: EU nationals return home post-Brexit' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Net Migration Composition" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="Who Is Actually Migrating to the UK?"
          finding="Net migration peaked at 906,000 in June 2023; students account for 40% of arrivals and work visas 37%. Emigration is concentrated among UK nationals leaving permanently."
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
            label="Peak net migration (2023)"
            value="906,000"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 906k peak · estimated 728k in 2024"
            sparklineData={[330, 320, 280, 270, 240, 185, 490, 745, 906, 728, 600]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Student visa arrivals"
            value="446,000"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Including dependants · down from peak of 682k"
            sparklineData={[168, 185, 201, 218, 220, 162, 380, 596, 682, 446, 380]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Non-EU work visa arrivals"
            value="268,000"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 309k peak · health and care dominant"
            sparklineData={[80, 85, 90, 95, 95, 65, 145, 240, 309, 268, 230]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK net migration by visa type, 2015-2025"
              subtitle="Net international migration to the UK (000s) by reason for migration."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK emigration by nationality, 2015-2025"
              subtitle="People leaving the UK permanently (000s), by nationality."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Graduate visas support international students"
            value="133,000"
            unit="Graduate visas granted 2024"
            description="The Graduate visa route allows international students to remain in the UK for 2 years after completing their degree. 133,000 were granted in 2024, supporting UK higher education income of £26bn per year from international students."
            source="Source: Home Office Immigration statistics, 2025. Universities UK, 2025."
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
