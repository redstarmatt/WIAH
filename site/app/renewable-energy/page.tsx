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
  renewablesPct: number;
  gasPct: number;
  offshoreWindPct: number;
  onshoreWindPct: number;
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
    fetch('/data/renewable-energy/renewable_energy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'renewablesPct',
          label: 'Renewables (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.renewablesPct,
          })),
        },
        {
          id: 'gasPct',
          label: 'Gas (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.gasPct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'offshoreWindPct',
          label: 'Offshore wind (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.offshoreWindPct,
          })),
        },
        {
          id: 'onshoreWindPct',
          label: 'Onshore wind (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.onshoreWindPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Energy crisis accelerates wind investment' },
    { date: new Date(2024, 5, 1), label: '2024: Last coal plant closes permanently' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: Dogger Bank A begins operation — world's largest' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Renewable Energy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Much of Britain's Power Is Now Renewable?"
          finding="Renewables generated 45.5% of UK electricity in 2024 — a record high. Wind power alone provided 30% and coal generation ended permanently in September 2024."
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
            label="Renewable electricity share"
            value="45.5%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Record high · up from 7% in 2010"
            sparklineData={[24.6, 29.3, 33.1, 37.1, 43.1, 40.2, 41.5, 47.0, 45.5, 45.5, 45.5]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Wind power share"
            value="30%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Offshore and onshore combined · record 32% in 2023"
            sparklineData={[11, 14, 17, 20, 25, 25, 25, 29, 30, 30, 30]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Coal generation share"
            value="0%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Eliminated Sept 2024 · first G7 country to end coal"
            sparklineData={[22, 9, 7, 5, 3, 2, 1.5, 1, 0.5, 0.1, 0]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK electricity generation by source, 2015-2025"
              subtitle="Percentage of UK electricity generated from renewables, gas and coal."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Wind power generation, UK, 2015-2025"
              subtitle="Offshore and onshore wind generation as percentage of UK electricity consumption."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="UK offshore wind is world leader"
            value="14.5GW"
            unit="installed offshore wind capacity"
            description="The UK has 14.5GW of installed offshore wind capacity — the largest in Europe and second globally. The Crown Estate has awarded contracts for a further 20GW. Clean power target of 95% renewables by 2030 is legally binding under the Clean Energy Act 2024. Wind and solar together are now the cheapest source of new electricity generation."
            source="Source: DESNZ — Energy trends, 2025."
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
