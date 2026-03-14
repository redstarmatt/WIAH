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

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  ucOnTimePct: number;
  newClaimsOnTime: number;
  overpaymentBn: number;
  underpaymentBn: number;
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

// ── References ───────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Fraud and error in the benefit system', url: 'https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system', date: '2024-25' },
  { num: 2, name: 'DWP', dataset: 'Universal Credit statistics', url: 'https://www.gov.uk/government/collections/universal-credit-statistics', date: '2024' },
  { num: 3, name: 'DWP', dataset: 'Annual report and accounts 2024-25', url: 'https://www.gov.uk/government/publications/dwp-annual-report-and-accounts-2024-to-2025', date: '2025' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/benefit-delays/benefit_delays.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'ucOnTimePct',
          label: 'UC paid on time (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ucOnTimePct,
          })),
        },
        {
          id: 'newClaimsOnTime',
          label: 'New claims on time (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.newClaimsOnTime,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'overpaymentBn',
          label: 'Overpayments (£bn)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.overpaymentBn,
          })),
        },
        {
          id: 'underpaymentBn',
          label: 'Underpayments (£bn)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.underpaymentBn,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Covid surge in UC claims' },
    { date: new Date(2023, 5, 1), label: '2023: UC caseload peaks at 7.5 million' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: DWP estimates £8.3bn in Covid-related overpayments' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Benefit Delays" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="Are Benefits Being Paid On Time?"
          finding={<>DWP paid only 82% of UC claims on time in 2023-24.<Cite nums={2} /> Error rates cost £9.7 billion in overpayments and £2.6 billion in underpayments per year.<Cite nums={1} /></>}
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="UC paid on time"
            value="82%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText={<>Down from 88% in 2019 · capacity under strain<Cite nums={2} /></>}
            sparklineData={[90, 89, 88, 87, 87, 84, 83, 82, 82, 82, 82]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Overpayment cost"
            value="£9.7bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>3.6% of welfare spending · reclaimed from vulnerable claimants<Cite nums={1} /></>}
            sparklineData={[5.2, 5.5, 5.8, 6.1, 6.4, 6.8, 7.5, 8.5, 9.1, 9.4, 9.7]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Underpayment cost"
            value="£2.6bn"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>Poorest miss out · state pension biggest component<Cite nums={1} /></>}
            sparklineData={[1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.6, 2.6]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Universal Credit paid on time, 2015-2025"
              subtitle="Percentage of UC claims paid in full and on time at end of assessment period."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="DWP benefit error and fraud costs (£bn), 2015-2025"
              subtitle="Annual cost of overpayments (fraud + error) and underpayments as percentage of total welfare spending."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Single payment system reduces complexity"
            value="94%"
            unit="claimants on UC vs legacy benefits"
            description={<>Universal Credit now covers 94% of claimants that were previously on legacy benefits, streamlining payments.<Cite nums={2} /> The DWP&apos;s AI-powered fraud detection system identified £2.1bn in potential fraud in 2024.<Cite nums={3} /> Automation of change of circumstances has reduced processing errors for 2.3 million claimants.<Cite nums={3} /></>}
            source="Source: DWP — Annual report and accounts, 2024-25."
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
        <References items={editorialRefs} />
      </main>
    </>
  );
}
