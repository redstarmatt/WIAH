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
  sicknessInactive: number;
  mentalHealthShare: number;
  inactivityRate: number;
  sicknessRate: number;
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
    fetch('/data/economic-inactivity-sickness/economic_inactivity_sickness.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'sicknessInactive',
          label: 'Inactive due to sickness (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.sicknessInactive,
          })),
        },
        {
          id: 'mentalHealthShare',
          label: 'Mental health share (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mentalHealthShare,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'inactivityRate',
          label: 'Overall inactivity rate (%)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.inactivityRate,
          })),
        },
        {
          id: 'sicknessRate',
          label: 'Sickness inactivity rate (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.sicknessRate,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic onset' },
    { date: new Date(2022, 5, 1), label: '2022: Mental health overtakes MSK as top cause' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: OBR forecasts 3.5m by 2027' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Inactivity Due to Sickness" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Why Have 2.8 Million People Left Work Due to Ill-Health?"
          finding="Long-term sickness is now the leading reason for economic inactivity — 2.8 million people, more than double the 2000 level, with mental health conditions the fastest-growing cause."
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
            label="Economically inactive due to sickness"
            value="2.8m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Record high · up 700k since 2019"
            sparklineData={[2.1, 2.1, 2.1, 2.1, 2.1, 2.2, 2.5, 2.7, 2.8, 2.8, 2.8]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Mental health inactivity share"
            value="38%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 28% in 2019 · overtook musculoskeletal"
            sparklineData={[26, 27, 27, 28, 28, 30, 34, 36, 37, 38, 38]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Working-age inactivity rate"
            value="22%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 20.7% in 2019 · highest in G7"
            sparklineData={[20.8, 20.7, 20.5, 20.5, 20.7, 21.0, 21.8, 22.1, 22.0, 22.1, 22.0]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="People economically inactive due to long-term sickness, 2015-2025"
              subtitle="Number of working-age people (16-64) inactive due to long-term sickness (millions). The rise since 2020 is unprecedented in modern UK records."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Working-age economic inactivity rate, UK, 2015-2025"
              subtitle="Percentage of working-age population (16-64) economically inactive, by reason."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="WorkWell programme launched"
            value="15"
            unit="WorkWell pilot areas 2024"
            description="The government launched WorkWell pilots in 15 areas in 2024, combining employment support with health services. Early evidence from NHS Talking Therapies shows 50% of completers with anxiety/depression return to work. The DWP Work and Health Programme supports 100,000 people per year."
            source="Source: DWP Work and Health Programme statistics, 2025."
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
