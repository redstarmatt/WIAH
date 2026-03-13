'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Households with unsecured debt >40% of income %, 2012–2025 (Bank of England)
const highDebtValues = [5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.5, 7.0, 7.8, 6.9, 7.2, 7.8, 8.4, 8.9];

// Credit card balances £ billions, 2012–2025 (Bank of England)
const creditCardValues = [60, 61, 63, 65, 66, 67, 68, 69, 71, 65, 58, 60, 65, 69];

// Individual insolvencies England & Wales, 2012–2025 (Insolvency Service)
const insolvencyValues = [107000, 101000, 99196, 95000, 99000, 104000, 113541, 122181, 94165, 114556, 123178, 128645, 136317, 141802];

const series1: Series[] = [
  {
    id: 'high-debt',
    label: 'Households with unsecured debt >40% of income (%)',
    colour: '#E63946',
    data: highDebtValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'credit-cards',
    label: 'Credit card balances (£ billions)',
    colour: '#F4A261',
    data: creditCardValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
  {
    id: 'insolvencies',
    label: 'Individual insolvencies (thousands)',
    colour: '#6B7280',
    data: insolvencyValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v / 1000 })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
  { date: new Date(2022, 3, 1), label: '2022: Cost-of-living crisis' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID lockdowns — spending drops' },
  { date: new Date(2022, 10, 1), label: '2022: Base rate rises above 3%' },
];

export default function ConsumerCreditStressPage() {
  return (
    <>
      <TopicNav topic="Consumer Credit Stress" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Many Households Are Drowning in Debt?"
          finding="8.9% of households now carry unsecured debt worth more than 40% of their income — up from 6.1% in 2019. Individual insolvencies reached a 14-year high of 141,802 in 2025."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The cost-of-living crisis did not create household debt stress in the United Kingdom — it accelerated a trend that had been building for years. Between 2015 and 2019, the share of households carrying unsecured debt above 40% of their income crept steadily upward, driven by stagnating real wages, the expansion of buy-now-pay-later products, and a credit market that made borrowing frictionless. Then came the pandemic. Government support schemes temporarily masked the underlying fragility. When those protections ended and energy prices surged in 2022, millions of households discovered their financial cushion had been a mirage. The Bank of England now estimates that nearly one in eleven households is in serious debt stress, a level not seen since the aftermath of the 2008 financial crisis.</p>
            <p>Individual insolvencies — bankruptcies, Individual Voluntary Arrangements, and Debt Relief Orders — have risen for four consecutive years and now stand at their highest level since 2011. Debt charities report that the fastest-growing group seeking help is working households on median incomes caught between rising mortgage costs, persistent food-price inflation, and childcare fees. The Breathing Space scheme, introduced in 2021, has provided temporary relief to over 150,000 people by pausing interest and enforcement action for 60 days — one of the few structural interventions that has made a measurable difference. But until real wages consistently outpace the cost of essentials, household debt stress will continue to rise.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Debt Stress' },
          { id: 'sec-chart2', label: 'Credit Cards & Insolvencies' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Households with unsecured debt >40% of income"
              value="8.9%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from 6.1% in 2019 · highest since 2008 crisis"
              sparklineData={[6.1, 6.3, 6.5, 7.0, 7.8, 6.9, 7.2, 7.8, 8.4, 8.9]}
              source="Bank of England — Financial Stability Report Dec 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Credit card balances (UK)"
              value="£69B"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from £58B in 2021 · real cost rising with high rates"
              sparklineData={[65, 66, 67, 68, 69, 71, 65, 58, 60, 65, 69]}
              source="Bank of England — Money and Credit Statistics Feb 2026"
              href="#sec-chart2"
            />
            <MetricCard
              label="Individual insolvencies (England & Wales)"
              value="141,802"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+4% year-on-year · 14-year high · 4th consecutive annual rise"
              sparklineData={[94165, 114556, 123178, 128645, 136317, 141802]}
              source="Insolvency Service — Quarterly Statistics Q4 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Households with unsecured debt over 40% of income, UK, 2012–2025"
              subtitle="Share of households in serious debt stress. Accelerated sharply after the 2022 cost-of-living crisis. The Bank of England defines this as a key financial vulnerability indicator."
              series={series1}
              annotations={annotations1}
              yLabel="% of households"
              source={{ name: 'Bank of England', dataset: 'Financial Stability Report — Household Debt', url: 'https://www.bankofengland.co.uk/financial-stability-report', frequency: 'biannual', date: 'Dec 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Credit card balances and individual insolvencies, UK, 2012–2025"
              subtitle="Outstanding credit card balances (£ billions) and individual insolvencies in thousands. Both fell during COVID government support, then rebounded to record levels."
              series={series2}
              annotations={annotations2}
              yLabel="£bn / thousands"
              source={{ name: 'Bank of England / Insolvency Service', dataset: 'Money and Credit Statistics / Individual Insolvency Statistics', url: 'https://www.gov.uk/government/statistics/individual-insolvency-statistics', frequency: 'quarterly', date: 'Q4 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space scheme providing measurable relief"
            value="150,000+"
            unit="people helped since 2021"
            description="The Breathing Space scheme, introduced in May 2021, gives people in problem debt a 60-day pause from interest, fees, and enforcement action. Over 150,000 people have entered the scheme since launch — with 78% reporting reduced anxiety and 62% going on to access formal debt advice. Mental health crisis breathing space provides even stronger protections for those in mental health crisis treatment. Early evidence suggests the scheme is reaching people previously invisible to formal debt support."
            source="Source: Insolvency Service — Breathing Space Statistics Q3 2025. Money and Mental Health Policy Institute evaluation, 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.bankofengland.co.uk/financial-stability-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Financial Stability Report</a> — household debt stress ratio. Biannual. Retrieved Dec 2025.</p>
            <p><a href="https://www.bankofengland.co.uk/statistics/money-and-credit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Money and Credit Statistics (Table A5.2)</a> — credit card balances. Monthly. Retrieved Feb 2026.</p>
            <p><a href="https://www.gov.uk/government/statistics/individual-insolvency-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Insolvency Service — Individual Insolvency Statistics</a> — bankruptcies, IVAs, and DROs. Quarterly. Retrieved Q4 2025.</p>
            <p>High-debt households defined as those with unsecured debt exceeding 40% of gross annual household income. Credit card balance figures are nominal and do not adjust for inflation. Individual insolvency figures cover England and Wales only. IVA volumes rose from 2017 due to aggressive marketing by debt management firms.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
