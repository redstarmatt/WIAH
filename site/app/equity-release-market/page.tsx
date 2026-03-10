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

interface LendingPoint {
  year: number;
  lendingBillions: number;
}

interface InterestRatePoint {
  year: number;
  avgRatePct: number;
}

interface PlansInForcePoint {
  year: number;
  plansThousands: number;
}

interface EquityReleaseData {
  national: {
    totalLending: {
      timeSeries: LendingPoint[];
      latestYear: number;
      latestBillions: number;
      note: string;
    };
    interestRate: {
      timeSeries: InterestRatePoint[];
      latestYear: number;
      latestRatePct: number;
      note: string;
    };
    plansInForce: {
      timeSeries: PlansInForcePoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
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

export default function EquityReleaseMarketPage() {
  const [data, setData] = useState<EquityReleaseData | null>(null);

  useEffect(() => {
    fetch('/data/equity-release-market/equity_release.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const lendingSeries: Series[] = data
    ? [{
        id: 'lending',
        label: 'Total equity release lending (£bn)',
        colour: '#F4A261',
        data: data.national.totalLending.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.lendingBillions,
        })),
      }]
    : [];

  const rateAndPlansSeries: Series[] = data
    ? [
        {
          id: 'rate',
          label: 'Average interest rate (%)',
          colour: '#E63946',
          data: data.national.interestRate.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgRatePct,
          })),
        },
      ]
    : [];

  const lendingAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: House prices boom \u2014 market surges' },
    { date: new Date(2022, 5, 1), label: '2022: £6.2bn peak \u2014 then Bank Rate rises' },
    { date: new Date(2023, 5, 1), label: '2023: FCA Consumer Duty tightens suitability rules' },
  ];

  const rateAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Bank Rate rises accelerate' },
    { date: new Date(2023, 5, 1), label: '2023: Average rate peaks at 7.2%' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Equity Release" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Equity Release"
          question="Are Older Homeowners Eating Their Houses?"
          finding="£2.6 billion was released from homes through equity release plans in 2024. The typical interest rate compounds to double the debt in 12 years. Critics warn vulnerable older homeowners are being sold unsuitable products."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Equity release — predominantly through lifetime mortgages that allow homeowners over 55 to borrow against their property without making monthly repayments — has grown from a fringe financial product to a £2.6 billion annual market. For older homeowners who are &lsquo;asset rich, cash poor&rsquo;: who own their home outright but cannot meet care costs, home adaptations, or living expenses from pension income alone, it can be a legitimate solution. The 415,000 active plans as of 2024 represent a significant cohort of older people who have chosen to unlock housing wealth.
            </p>
            <p>
              The compound interest risk is the defining concern. At an average rate of 6.8%, a £100,000 equity release loan doubles to £200,000 in approximately 12 years without any additional drawdown. For a homeowner who takes a plan at 65 and lives to 85, the initial loan may have quadrupled. No-negative-equity guarantees (required by Equity Release Council members) mean borrowers cannot owe more than the property is worth, but in a housing market that does not consistently outperform the compound interest rate, heirs may inherit nothing. The FCA's Consumer Duty has tightened suitability obligations, and evidence from redress schemes suggests a meaningful minority of past sales were inappropriate for the customer.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-lending', label: 'Lending Volumes' },
          { id: 'sec-rates', label: 'Interest Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total equity release lending (2024)"
              value="£2.6bn"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from £6.2bn peak in 2022 · Rate rise knocked market"
              sparklineData={[1.8, 2.1, 2.6, 3.4, 3.9, 3.1, 4.8, 6.2, 3.8, 2.6]}
              href="#sec-lending"
            />
            <MetricCard
              label="Average lifetime mortgage rate"
              value="6.8%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Debt doubles in ~12 years · Compound interest main risk"
              sparklineData={[5.1, 5.2, 5.4, 5.6, 6.8, 7.2, 6.8]}
              href="#sec-lending"
            />
            <MetricCard
              label="Equity release plans in force"
              value="415,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 280,000 in 2018 · Mostly used for debt repayment"
              sparklineData={[280, 310, 340, 360, 390, 400, 415]}
              href="#sec-lending"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-lending" className="mb-12">
            <LineChart
              title="Total equity release lending, UK, 2015–2024"
              subtitle="Annual value of new equity release plans (£ billions). Rose sharply to £6.2bn in 2022 as house prices peaked, then fell sharply as interest rates rose, making compound borrowing more costly."
              series={lendingSeries}
              annotations={lendingAnnotations}
              yLabel="£ billions"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rates" className="mb-12">
            <LineChart
              title="Average lifetime mortgage interest rate, UK, 2018–2024"
              subtitle="Average fixed rate on new lifetime mortgage plans. At 6.8%, a £100,000 loan doubles in approximately 12 years without additional drawdown. The no-negative-equity guarantee protects against owing more than the property value."
              series={rateAndPlansSeries}
              annotations={rateAnnotations}
              yLabel="Interest rate (%)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="FCA Consumer Duty 2023"
            unit=""
            description="The FCA's Consumer Duty rules (2023) require equity release advisers to prove suitability in detail and document their reasoning. Equity Release Council members adhere to a product code including no-negative-equity guarantees, independent legal advice requirements, and the right to make voluntary payments. Inheritance protection options allow customers to ringfence a proportion of the property's value for their estate. The market has consolidated around higher-quality providers since the 2022 market correction."
            source="Source: Equity Release Council — Market statistics Q4 2024; FCA — Retirement income market data 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
