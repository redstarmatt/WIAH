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
  ccjCount: number;
  ccjAvgDebt: number;
  highCostCreditM: number;
  councilTaxEnforcementM: number;
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
    fetch('/data/debt-enforcement/debt_enforcement.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'ccjCount',
          label: 'CCJs issued (000s)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ccjCount,
          })),
        },
        {
          id: 'ccjAvgDebt',
          label: 'Average CCJ debt (£)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ccjAvgDebt,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'highCostCreditM',
          label: 'High-cost credit users (millions)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.highCostCreditM,
          })),
        },
        {
          id: 'councilTaxEnforcementM',
          label: 'Council tax enforcement (millions)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.councilTaxEnforcementM,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Covid payment holidays pause CCJs' },
    { date: new Date(2021, 5, 1), label: '2021: Moratoriums lifted, surge follows' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Cost of living crisis drives arrears' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Debt Enforcement" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="What Happens When You Can't Pay Your Debts?"
          finding="706,000 County Court Judgments were issued in England and Wales in 2024. High-cost credit affects 3.1 million adults lacking access to affordable borrowing alternatives."
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
            label="County Court Judgments"
            value="706,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up 18% since 2021 · average debt £1,442"
            sparklineData={[520, 540, 555, 570, 581, 532, 570, 598, 642, 680, 706]}
            href="#sec-coverage"
          />
          <MetricCard
            label="High-cost credit borrowers"
            value="3.1m"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Using payday loans, rent-to-own, doorstep lending"
            sparklineData={[3.5, 3.4, 3.3, 3.2, 3.1, 2.9, 2.9, 2.9, 3.0, 3.1, 3.1]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Council tax enforcement actions"
            value="2.8m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up 12% since 2019 · bailiff instructions growing"
            sparklineData={[2.2, 2.3, 2.3, 2.4, 2.5, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="County Court Judgments, England and Wales, 2015-2025"
              subtitle="Annual CCJs issued. CCJs affect credit ratings and can lead to bailiff action. Numbers fell during pandemic payment holidays but have risen sharply since 2021."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="High-cost credit users and council tax enforcement, 2015-2025"
              subtitle="People using high-cost credit (millions) and council tax enforcement actions (millions)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space scheme protects most-indebted"
            value="117,000"
            unit="using Breathing Space 2024"
            description="The Breathing Space scheme (launched 2021) gives people in problem debt 60 days protected from creditor action and enforcement. 117,000 people used it in 2024. StepChange and National Debtline received 820,000 client enquiries in 2024, providing free debt advice."
            source="Source: Insolvency Service — Breathing Space statistics, 2025."
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
