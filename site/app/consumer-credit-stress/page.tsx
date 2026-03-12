'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface HighDebtPoint {
  year: number;
  pct: number;
}

interface CreditCardPoint {
  year: number;
  billions: number;
}

interface InsolvencyPoint {
  year: number;
  total: number;
}

interface ConsumerCreditData {
  highDebtHouseholds: HighDebtPoint[];
  creditCardBalances: CreditCardPoint[];
  insolvencies: InsolvencyPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ConsumerCreditStressPage() {
  const [data, setData] = useState<ConsumerCreditData | null>(null);

  useEffect(() => {
    fetch('/data/consumer-credit-stress/consumer_credit_stress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const highDebtSeries: Series[] = data
    ? [{
        id: 'high-debt',
        label: 'Households with unsecured debt >40% of income',
        colour: '#E63946',
        data: data.highDebtHouseholds.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const creditCardSeries: Series[] = data
    ? [{
        id: 'credit-cards',
        label: 'Outstanding credit card balances (£ billions)',
        colour: '#F4A261',
        data: data.creditCardBalances.map(d => ({
          date: yearToDate(d.year),
          value: d.billions,
        })),
      }]
    : [];

  const insolvencySeries: Series[] = data
    ? [{
        id: 'insolvencies',
        label: 'Individual insolvencies (England & Wales)',
        colour: '#6B7280',
        data: data.insolvencies.map(d => ({
          date: yearToDate(d.year),
          value: d.total,
        })),
      }]
    : [];

  // ── Annotations ─────────────────────────────────────────────────────────

  const debtAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
    { date: new Date(2022, 3, 1), label: '2022: Cost-of-living crisis' },
  ];

  const creditCardAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID lockdowns — spending drops' },
    { date: new Date(2022, 10, 1), label: '2022: Base rate rises above 3%' },
  ];

  const insolvencyAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: IVA marketing surge' },
    { date: new Date(2020, 2, 1), label: '2020: COVID moratorium' },
  ];

  // ── Latest values ───────────────────────────────────────────────────────

  const latestDebt = data?.highDebtHouseholds[data.highDebtHouseholds.length - 1];
  const baselineDebt = data?.highDebtHouseholds.find(d => d.year === 2019);
  const latestCards = data?.creditCardBalances[data.creditCardBalances.length - 1];
  const troughCards = data?.creditCardBalances.reduce((a, b) => a.billions < b.billions ? a : b);
  const latestInsolvencies = data?.insolvencies[data.insolvencies.length - 1];
  const prevInsolvencies = data?.insolvencies[data.insolvencies.length - 2];

  const insolvencyChange = latestInsolvencies && prevInsolvencies
    ? Math.round(((latestInsolvencies.total - prevInsolvencies.total) / prevInsolvencies.total) * 100)
    : 4;

  return (
    <>
      <TopicNav topic="Consumer Credit Stress" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Consumer Credit Stress"
          question="How Many Households Are Drowning in Debt?"
          finding="8.9% of households now carry unsecured debt worth more than 40% of their income — up from 6.1% in 2019. Credit card balances hit £72 billion in 2024 as high interest rates compounded cost-of-living pressures. Individual insolvencies reached a 14-year high in 2025."
          colour="#F4A261"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The cost-of-living crisis did not create household debt stress in the United Kingdom — it accelerated a trend that had been building for years. Between 2015 and 2019, the share of households carrying unsecured debt above 40% of their income crept steadily upward, driven by stagnating real wages, the expansion of buy-now-pay-later products, and a credit market that made borrowing frictionless. Then came the pandemic. Government support schemes — furlough, the eviction ban, payment holidays — temporarily masked the underlying fragility. When those protections ended and energy prices surged in 2022, millions of households discovered that their financial cushion had been a mirage. The Bank of England now estimates that nearly one in eleven households is in serious debt stress, a level not seen since the aftermath of the 2008 financial crisis.
            </p>
            <p>
              Credit card balances tell a parallel story. They fell sharply during lockdown — people simply could not spend — but rebounded faster than incomes recovered. By 2023, outstanding balances had surpassed their pre-pandemic peak, and the Bank of England&apos;s aggressive rate-hiking cycle meant that the cost of carrying that debt had roughly doubled. A household with £5,000 of credit card debt at the average 2021 rate of 18.9% faced annual interest of £945; by late 2024, at an average rate of 24.7%, the same balance cost £1,235 a year to service. That £290 difference, multiplied across millions of households, represents a quiet but enormous transfer from the financially stretched to the financially secure.
            </p>
            <p>
              Individual insolvencies — bankruptcies, Individual Voluntary Arrangements, and Debt Relief Orders — have risen for four consecutive years and now stand at their highest level since 2011. This is not solely a story of recklessness. Debt charities report that the fastest-growing group seeking help is working households on median incomes who have been caught between rising mortgage costs, persistent food-price inflation, and childcare fees that consume an ever-larger share of take-home pay. The Breathing Space scheme, introduced in 2021, has provided temporary relief to over 150,000 people by pausing interest and enforcement action for 60 days — one of the few structural interventions that has made a measurable difference. But the scheme treats symptoms. Until real wages consistently outpace the cost of essentials, household debt stress will continue to rise.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-debt-ratio', label: 'Debt stress' },
          { id: 'sec-credit-cards', label: 'Credit cards' },
          { id: 'sec-insolvencies', label: 'Insolvencies' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Households with unsecured debt >40% of income"
            value={latestDebt ? `${latestDebt.pct}%` : '8.9%'}
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestDebt && baselineDebt
                ? `up from ${baselineDebt.pct}% in 2019 · highest since 2008 crisis`
                : 'up from 6.1% in 2019 · highest since 2008 crisis'
            }
            sparklineData={
              data ? sparkFrom(data.highDebtHouseholds.map(d => d.pct)) : [6.1, 6.3, 6.5, 7, 7.8, 8.4, 8.9]
            }
            source="Bank of England — Financial Stability Report, Dec 2025"
            href="#sec-debt-ratio"
          />
          <MetricCard
            label="Credit card balances (UK, £ billions)"
            value={latestCards ? `£${latestCards.billions}B` : '£72B'}
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestCards && troughCards
                ? `up from £${troughCards.billions}B in ${troughCards.year} · real cost rising with high rates`
                : 'up from £58B in 2021 · real cost rising with high rates'
            }
            sparklineData={
              data ? sparkFrom(data.creditCardBalances.map(d => d.billions)) : [65, 62, 58, 60, 65, 69, 72]
            }
            source="Bank of England — Money and Credit Statistics, Feb 2026"
            href="#sec-credit-cards"
          />
          <MetricCard
            label="Individual insolvencies (England & Wales)"
            value={latestInsolvencies ? latestInsolvencies.total.toLocaleString() : '141,802'}
            direction="up"
            polarity="up-is-bad"
            changeText={`+${insolvencyChange}% year-on-year · 14-year high · 4th consecutive annual rise`}
            sparklineData={
              data ? sparkFrom(data.insolvencies.map(d => d.total)) : [99196, 113541, 122181, 94165, 114556, 123178, 128645, 136317, 141802]
            }
            source="Insolvency Service — Quarterly Statistics, Q4 2025"
            href="#sec-insolvencies"
          />
        </div>

        {/* Chart 1: High-debt households */}
        <ScrollReveal>
          <div id="sec-debt-ratio" className="mb-12">
            <LineChart
              series={highDebtSeries}
              title="Households with unsecured debt over 40% of income, UK, 2012–2025"
              subtitle="Share of households in serious debt stress. Accelerated sharply after the 2022 cost-of-living crisis."
              yLabel="% of households"
              annotations={debtAnnotations}
              source={{
                name: 'Bank of England',
                dataset: 'Financial Stability Report — Household Debt',
                frequency: 'biannual',
                url: 'https://www.bankofengland.co.uk/financial-stability-report',
                date: 'Dec 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Credit card balances */}
        <ScrollReveal>
          <div id="sec-credit-cards" className="mb-12">
            <LineChart
              series={creditCardSeries}
              title="Outstanding credit card balances, UK, 2012–2025"
              subtitle="Nominal outstanding balances reported by UK monetary financial institutions. Fell during COVID, rebounded past pre-pandemic peak."
              yLabel="£ billions"
              annotations={creditCardAnnotations}
              source={{
                name: 'Bank of England',
                dataset: 'Money and Credit Statistics (Table A5.2)',
                frequency: 'monthly',
                url: 'https://www.bankofengland.co.uk/statistics/money-and-credit/2025/february',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Individual insolvencies */}
        <ScrollReveal>
          <div id="sec-insolvencies" className="mb-12">
            <LineChart
              series={insolvencySeries}
              title="Individual insolvencies, England & Wales, 2012–2025"
              subtitle="Bankruptcies, IVAs, and Debt Relief Orders. Now at highest level since 2011."
              yLabel="Insolvencies"
              annotations={insolvencyAnnotations}
              source={{
                name: 'Insolvency Service',
                dataset: 'Individual Insolvency Statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistics/individual-insolvency-statistics',
                date: 'Q4 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space scheme providing measurable relief"
            value="150,000+"
            unit="people helped"
            description="The Breathing Space scheme, introduced in May 2021, gives people in problem debt a 60-day pause from interest, fees, and enforcement action. Over 150,000 people have entered the scheme since launch — with 78% of participants reporting reduced anxiety and 62% going on to access formal debt advice. Mental health crisis breathing space, available for those receiving mental health crisis treatment, provides even stronger protections. Early evidence suggests the scheme is reaching people who were previously invisible to formal debt support — particularly renters under 35 with multiple unsecured creditors."
            source="Source: Insolvency Service — Breathing Space Statistics, Q3 2025. Money and Mental Health Policy Institute evaluation, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.bankofengland.co.uk/financial-stability-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Financial Stability Report</a> — household debt stress ratio. Biannual. Retrieved Dec 2025.
            </p>
            <p>
              <a href="https://www.bankofengland.co.uk/statistics/money-and-credit/2025/february" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Money and Credit Statistics (Table A5.2)</a> — credit card balances. Monthly. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.gov.uk/government/statistics/individual-insolvency-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Insolvency Service — Individual Insolvency Statistics</a> — bankruptcies, IVAs, and DROs. Quarterly. Retrieved Q4 2025.
            </p>
            <p className="mt-4">
              High-debt households defined as those with unsecured debt exceeding 40% of gross annual household income, per Bank of England methodology. Credit card balance figures are nominal and do not adjust for inflation. Individual insolvency figures cover England and Wales only. 2020 data reflects temporary suppression of collections activity and government income support during COVID-19. IVA volumes rose sharply from 2017 due to aggressive marketing by debt management firms — this inflates the insolvency total relative to underlying financial distress.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
