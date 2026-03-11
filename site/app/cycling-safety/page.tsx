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
  fatalities: number;
  seriousInjuries: number;
  fatalRate: number;
  seriousRate: number;
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
    fetch('/data/cycling-safety/cycling_safety.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'fatalities',
          label: 'Fatalities',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fatalities,
          })),
        },
        {
          id: 'seriousInjuries',
          label: 'Serious injuries',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.seriousInjuries,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'fatalRate',
          label: 'Fatal rate per bn km',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fatalRate,
          })),
        },
        {
          id: 'seriousRate',
          label: 'Serious injury rate per bn km',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.seriousRate,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic reduces casualties but increases cycling' },
    { date: new Date(2022, 5, 1), label: '2022: HGV blind spot awareness campaign' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Active Travel England established' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Cycling Safety" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="Is Britain Safe to Cycle In?"
          finding="97 cyclists were killed on Britain's roads in 2024. Serious injuries reached 4,286 — the highest since 2012. Protected cycle infrastructure covers less than 5% of main roads."
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
            label="Cyclist fatalities"
            value="97"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Broadly unchanged for decade · per-mile risk falling slowly"
            sparklineData={[107, 104, 101, 99, 100, 95, 93, 91, 95, 97, 97]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Serious cyclist injuries"
            value="4,286"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Highest since 2012 · cycling growth outpacing safety"
            sparklineData={[3652, 3598, 3615, 3645, 3710, 3480, 3600, 3800, 4100, 4200, 4286]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Protected cycle lane coverage"
            value="< 5%"
            unit="of main roads"
            direction="flat"
            polarity="up-is-bad"
            changeText="Netherlands 35% · significant infrastructure deficit"
            sparklineData={[2, 2, 2.5, 2.5, 3, 3.5, 4, 4, 4.5, 4.8, 4.9]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cyclist casualties on British roads, 2015-2025"
              subtitle="Annual cyclist fatalities and serious injuries. Serious injuries rose sharply in 2023-24 as cycling levels recovered post-pandemic."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cyclist injury rate per billion km cycled, 2015-2025"
              subtitle="Cyclist casualty rate per billion vehicle kilometres. While improving slowly, the UK remains more dangerous per km than comparable cycling nations."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Protected lane network expanding in cities"
            value="700km"
            unit="of protected lanes in London by 2025"
            description="London has built 700km of protected cycle lanes, with evidence showing 40% higher cycling levels on protected routes. Twenty Speed Zones now cover 30% of urban areas, reducing cyclist injury rates by 20-30% in covered zones. The Cycling and Walking Investment Strategy 2 funds £1bn of infrastructure by 2025."
            source="Source: DfT — Reported road casualties statistics, 2025. TfL Cycling data, 2025."
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
