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
  gigWorkers: number;
  platformOnly: number;
  withoutSickPay: number;
  withoutPension: number;
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
    fetch('/data/gig-worker-rights/gig_worker_rights.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'gigWorkers',
          label: 'Gig economy workers (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.gigWorkers,
          })),
        },
        {
          id: 'platformOnly',
          label: 'Platform-only income (millions)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.platformOnly,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'withoutSickPay',
          label: 'Without sick pay (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.withoutSickPay,
          })),
        },
        {
          id: 'withoutPension',
          label: 'Without pension AE (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.withoutPension,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Supreme Court Uber ruling — workers not self-employed' },
    { date: new Date(2022, 5, 1), label: '2022: Deliveroo IPO; riders remain self-employed' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Taylor Review recommendations still unimplemented' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Gig Worker Rights" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="What Protections Do Gig Workers Actually Have?"
          finding="An estimated 4.4 million people work in the gig economy. Fewer than 30% receive sick pay, pension auto-enrolment or holiday pay, leaving most without basic employment protections."
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
            label="Gig economy workers"
            value="4.4m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+60% since 2016 · platform work dominant"
            sparklineData={[2.8, 3.0, 3.2, 3.5, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Without sick pay"
            value="72%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Most classify as self-employed or worker not employee"
            sparklineData={[75, 75, 74, 73, 73, 72, 72, 72, 72, 72, 72]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Without pension auto-enrolment"
            value="68%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Workers excluded from 2012 AE reforms · low saving rates"
            sparklineData={[72, 72, 71, 70, 70, 69, 68, 68, 68, 68, 68]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gig economy workforce size, UK, 2015-2025"
              subtitle="Estimated number of adults who use gig platforms as their main or secondary income source (millions)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gig workers without key employment rights, 2015-2025"
              subtitle="Percentage of gig workers lacking sick pay, pensions and holiday pay protections."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Worker status rights upheld"
            value="2021"
            unit="Uber Supreme Court ruling"
            description="The Supreme Court ruled in 2021 that Uber drivers are workers, not self-employed, entitling them to minimum wage, holiday pay and pension auto-enrolment. The 2024 Employment Rights Bill extends worker status protections and introduces a single employment status to reduce classification disputes."
            source="Source: BEIS — Good Work Plan implementation, 2025."
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
