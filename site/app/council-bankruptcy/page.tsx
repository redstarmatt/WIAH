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
  s114Count: number;
  bailoutLoansBn: number;
  atRisk: number;
  fundingGap: number;
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
    fetch('/data/council-bankruptcy/council_bankruptcy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 's114Count',
          label: 'Cumulative s114 notices',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.s114Count,
          })),
        },
        {
          id: 'bailoutLoansBn',
          label: 'Government bailout loans (£bn)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bailoutLoansBn,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'atRisk',
          label: 'Councils at serious financial risk',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.atRisk,
          })),
        },
        {
          id: 'fundingGap',
          label: 'Sector funding gap (£bn)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fundingGap,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Northamptonshire CC — first s114 since 1988' },
    { date: new Date(2023, 5, 1), label: '2023: Birmingham issues record s114' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Adult social care and SEND demand spikes' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Council Bankruptcy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Which Councils Are Going Bankrupt?"
          finding="14 local authorities issued Section 114 notices between 2018 and 2025. £3.6 billion in government bailout loans have been issued with strict conditions attached."
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
            label="S114 notices issued"
            value="14"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2018-2025 · none in preceding decade"
            sparklineData={[0, 0, 0, 1, 2, 3, 5, 8, 10, 12, 14]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Government bailout loans"
            value="£3.6bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Exceptional finance mechanism · repayment over decades"
            sparklineData={[0, 0, 0, 0.1, 0.3, 0.6, 1.2, 2.0, 2.8, 3.2, 3.6]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Councils at financial risk (est.)"
            value="30+"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="LGA estimate 2024 · further s114 notices expected"
            sparklineData={[5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cumulative Section 114 notices, UK, 2018-2025"
              subtitle="Cumulative Section 114 bankruptcy notices by local authorities, and total government bailout loans issued (£bn)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Local authorities at financial risk, 2015-2025"
              subtitle="Estimated number of councils at serious financial risk (LGA surveys of section 151 officers)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Government action plan for financially stressed councils"
            value="2024"
            unit="Local Authority Financial Recovery Framework"
            description="DLUHC introduced a Financial Recovery Framework in 2024 providing earlier intervention when councils show signs of financial distress. Multi-year settlements give councils planning certainty. The Improvement and Recovery Board model used in Birmingham provides expert governance during restructuring."
            source="Source: DLUHC — Local government finance settlement, 2025."
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
