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
  { num: 1, name: 'DWP', dataset: 'Pension Credit Take-Up Estimate', url: 'https://www.gov.uk/government/statistics/pension-credit-take-up', date: '2025', note: '£2.2bn unclaimed annually by 880,000 eligible pensioners' },
  { num: 2, name: 'DWP', dataset: 'Pension Credit Statistics', url: 'https://www.gov.uk/government/collections/pension-credit-statistics', date: '2024', note: 'Take-up rate stuck at 63% for a decade' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  takeUpRate: number;
  unclaimedBn: number;
  eligibleNonClaimants: number;
  awareOfEntitlement: number;
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
    fetch('/data/pension-credit-uptake/pension_credit_uptake.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'takeUpRate',
          label: 'Take-up rate (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.takeUpRate,
          })),
        },
        {
          id: 'unclaimedBn',
          label: 'Unclaimed amount (£bn)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.unclaimedBn,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'eligibleNonClaimants',
          label: 'Non-claimants (000s)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.eligibleNonClaimants,
          })),
        },
        {
          id: 'awareOfEntitlement',
          label: 'Aware they are eligible (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.awareOfEntitlement,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Campaign launched after 65+ winter fuel link' },
    { date: new Date(2024, 5, 1), label: '2024: Winter Fuel Payment cut prompts awareness drive' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: 76% of non-claimants unaware of eligibility' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Pension Credit Uptake" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="Why Are Pensioners Not Claiming What They're Owed?"
          finding="£2.2 billion of Pension Credit goes unclaimed each year by 880,000 eligible pensioners, equivalent to £4 per day each being denied their entitlement."
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
            label="Unclaimed Pension Credit per year"
            value="£2.2bn"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Roughly constant for a decade · DWP estimation method unchanged"
            sparklineData={[1.8, 1.9, 2.0, 2.1, 2.1, 2.1, 2.2, 2.2, 2.2, 2.2, 2.2]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Eligible non-claimants"
            value="880,000"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Disproportionately older, private renter, single person"
            sparklineData={[850, 860, 870, 875, 880, 875, 875, 880, 880, 880, 880]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Pension Credit take-up rate"
            value="63%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Unchanged for decade despite campaigns · stigma barrier"
            sparklineData={[63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Pension Credit take-up and unclaimed amount, 2015-2025"
              subtitle="Take-up rate (%) and total amount unclaimed (£bn) for Pension Credit."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Eligible non-claimants by reason, 2015-2025"
              subtitle="Estimated 880,000 eligible pensioners not claiming Pension Credit, by primary barrier."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Awareness campaign reaches 1 million pensioners"
            value="£1.7bn"
            unit="unclaimed Pension Credit identified 2024 campaign"
            description="The 2024 Pension Credit awareness campaign, triggered by winter fuel payment cuts, reached over 1 million eligible pensioners. New claims rose 20% in Q4 2024. The government announced plans to auto-enrol eligible Housing Benefit recipients into Pension Credit, which could reach an additional 120,000 people."
            source="Source: DWP — Pension Credit statistics and take-up estimate, 2025."
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
