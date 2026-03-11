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
  totalProjects: number;
  transparencyEntries: number;
  trustPct: number;
  concernPct: number;
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
    fetch('/data/ai-in-public-services/ai_in_public_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'totalProjects',
          label: 'Identified AI projects',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalProjects,
          })),
        },
        {
          id: 'transparencyEntries',
          label: 'Published on transparency register',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.transparencyEntries,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'trustPct',
          label: 'Trust in govt AI use (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.trustPct,
          })),
        },
        {
          id: 'concernPct',
          label: 'Concerned about AI in public services (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.concernPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Algorithmic transparency framework' },
    { date: new Date(2023, 5, 1), label: '2023: AI Safety Summit' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Exam algorithm controversy' },
    { date: new Date(2023, 5, 1), label: '2023: AI regulation White Paper' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="AI in Public Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="Is AI Making Public Services Better or Just Cheaper?"
          finding="Government AI projects are proliferating — over 200 identified across Whitehall — but scrutiny is limited and public trust is low. Algorithmic decision-making in benefits, policing and health faces growing legal challenge."
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
            label="Government AI projects identified"
            value="215"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 63 in 2019 · Transparency still limited"
            sparklineData={[63, 80, 100, 130, 155, 175, 188, 196, 204, 210, 215]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Public trust in govt AI use"
            value="31%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 42% in 2020 · Post-algorithm scandal"
            sparklineData={[38, 40, 42, 40, 38, 36, 34, 33, 32, 31, 31]}
            href="#sec-coverage"
          />
          <MetricCard
            label="AI transparency register entries"
            value="67"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Only 31% of known projects published · Register voluntary"
            sparklineData={[0, 0, 0, 12, 24, 35, 44, 52, 58, 63, 67]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Government AI projects, UK, 2015–2025"
              subtitle="Number of AI and algorithmic tools identified in use across UK government departments. Data from parliamentary questions, FOI requests and the algorithmic transparency register."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Public trust in government AI use, UK, 2015–2025"
              subtitle="Percentage of adults who trust the government to use AI fairly and responsibly in public services. Annual survey data."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="AISI"
            unit="AI Safety Institute established"
            description="The UK's AI Safety Institute, established in 2023, leads global AI safety research and evaluation. The government's algorithmic transparency recording standard requires departments to publish information about AI tools affecting individuals. The Central Digital and Data Office is developing AI assurance frameworks across public services."
            source="Source: Centre for Data Ethics and Innovation — Public attitudes to data and AI, 2025. CDDO — AI transparency register, 2025."
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
