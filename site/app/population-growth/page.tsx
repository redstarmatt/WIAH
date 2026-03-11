'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  netMigration: number;
  naturalChange: number;
  totalPopulation: number;
  workingAgePop: number;
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
    fetch('/data/population-growth/population_growth.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'netMigration',
          label: 'Net migration (000s)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.netMigration,
          })),
        },
        {
          id: 'naturalChange',
          label: 'Natural change (000s)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.naturalChange,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'totalPopulation',
          label: 'Total population (millions)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalPopulation,
          })),
        },
        {
          id: 'workingAgePop',
          label: 'Working-age population (millions)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.workingAgePop,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic reduces migration temporarily' },
    { date: new Date(2022, 5, 1), label: '2022: Record net migration begins' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: Population reaches 67.9 million' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Population Growth" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="What Is Driving Britain's Population Growth?"
          finding="The UK population grew by 906,000 in 2023, almost entirely through net migration. Natural population change — births minus deaths — is near zero for the first time."
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
            label="Annual population growth 2023"
            value="906,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Largest ever recorded · 98% from net migration"
            sparklineData={[400, 430, 460, 480, 500, 220, 500, 700, 850, 906, 780]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Net migration contribution to growth"
            value="98%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Was 80% in 2019 · natural change near zero"
            sparklineData={[78, 80, 81, 80, 80, 85, 88, 92, 95, 98, 95]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Natural population change"
            value="+18,000"
            unit="/yr"
            direction="down"
            polarity="up-is-bad"
            changeText="Near zero for first time · UK fertility rate 1.41"
            sparklineData={[180, 160, 140, 120, 100, 75, 50, 25, 18, 18, 18]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK population change components, 2015-2025"
              subtitle="Annual population growth decomposed into natural change (births minus deaths) and net migration (000s). Net migration now dominates."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK total population (millions), 2015-2025"
              subtitle="UK population by year. Population growth has accelerated since 2021 driven by record net migration."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Working-age population growing"
            value="43.7m"
            unit="working-age population 2025"
            description="Net migration has increased the working-age population, supporting economic output and tax receipts. OBR forecasts show migration keeping the dependency ratio lower than it would otherwise be. NHS international recruitment brought in 100,000 nurses and doctors between 2021 and 2024."
            source="Source: ONS Population estimates, 2025. OBR Fiscal Sustainability Report, 2024."
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
      </main>
    </>
  );
}
