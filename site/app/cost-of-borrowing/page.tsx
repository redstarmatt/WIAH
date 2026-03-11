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
  twoYearFixed: number;
  fiveYearFixed: number;
  avgMonthlyPayment: number;
  affordabilityRatio: number;
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
    fetch('/data/cost-of-borrowing/cost_of_borrowing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'twoYearFixed',
          label: '2-year fixed rate (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.twoYearFixed,
          })),
        },
        {
          id: 'fiveYearFixed',
          label: '5-year fixed rate (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fiveYearFixed,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'avgMonthlyPayment',
          label: 'Avg monthly payment (£)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgMonthlyPayment,
          })),
        },
        {
          id: 'affordabilityRatio',
          label: 'Payment as % of income',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.affordabilityRatio,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: BoE begins rate rises' },
    { date: new Date(2023, 5, 1), label: '2023: Rates spike to 6.8%' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Ultra-low rate era ends' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Cost of Borrowing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="What Have High Interest Rates Done to Households?"
          finding="Average mortgage payments rose 61% between 2021 and 2024 as 1.8 million households remortgaged onto rates above 5%, adding £580 per month to typical housing costs."
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
            label="Average 2yr fixed rate"
            value="4.8%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Was 2.3% in 2021 · peaked at 6.8% in 2023"
            sparklineData={[2.8, 2.5, 2.3, 2.1, 2.3, 4.2, 5.8, 6.8, 5.5, 4.9, 4.8]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Households remortgaged at higher rates"
            value="1.8m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023-24 · average rate increase 2.9pp"
            sparklineData={[0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8, 1.5, 1.8, 1.7, 1.6]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Avg monthly mortgage payment rise"
            value="+£580"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+61% vs 2021 · £1,527 average in 2024"
            sparklineData={[40, 30, 20, 10, 0, 80, 200, 380, 500, 560, 580]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average UK mortgage rates, 2015-2025"
              subtitle="Average 2-year and 5-year fixed-rate mortgage rates. Rates rose sharply from historic lows after the Bank of England began raising base rate in late 2021."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average monthly mortgage payment (£), 2015-2025"
              subtitle="Average monthly mortgage repayment for new borrowers."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Rate cuts under way"
            value="5.25% to 4.5%"
            unit="Bank Rate cut 2024-25"
            description="The Bank of England cut its base rate from 5.25% to 4.5% between August 2024 and February 2025. Mortgage product rates have begun to fall, with 2-year fixes approaching 4.5% for borrowers with 25%+ equity."
            source="Source: Bank of England Mortgage Lenders and Administrators Statistics, 2025."
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
