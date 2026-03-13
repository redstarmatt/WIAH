'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Average 2-year and 5-year fixed mortgage rates %, 2015–2025 (Bank of England)
const twoYearFixed = [2.8, 2.5, 2.3, 2.3, 2.1, 2.3, 2.2, 4.2, 5.8, 6.8, 5.5];
const fiveYearFixed = [3.2, 2.9, 2.7, 2.6, 2.4, 2.7, 2.5, 4.0, 5.3, 5.9, 5.1];

// Average monthly mortgage payment £ for new borrowers, 2015–2025
const monthlyPayments = [740, 760, 780, 800, 820, 840, 860, 950, 1200, 1480, 1527];

// Mortgage payments as % of income, 2015–2025
const affordabilityRatio = [18, 19, 19, 20, 20, 20, 20, 22, 29, 34, 33];

const series1: Series[] = [
  {
    id: 'twoYearFixed',
    label: '2-year fixed rate (%)',
    colour: '#E63946',
    data: twoYearFixed.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'fiveYearFixed',
    label: '5-year fixed rate (%)',
    colour: '#264653',
    data: fiveYearFixed.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'monthlyPayment',
    label: 'Avg monthly mortgage payment (£)',
    colour: '#6B7280',
    data: monthlyPayments.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'affordabilityRatio',
    label: 'Payment as % of gross income',
    colour: '#F4A261',
    data: affordabilityRatio.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: BoE begins rate rises' },
  { date: new Date(2023, 5, 1), label: '2023: Rates peak at 6.8%' },
];

const annotations2: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Ultra-low rate era ends' },
  { date: new Date(2023, 5, 1), label: '2023: Payments +61% vs 2021' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Bank of England', dataset: 'Mortgage Lenders and Administrators Statistics', url: 'https://www.bankofengland.co.uk/statistics/mortgage-lenders-and-administrators', date: '2025' },
  { num: 2, name: 'UK Finance', dataset: 'Mortgage Market Tracker', url: 'https://www.ukfinance.org.uk/data-and-research/data/mortgages', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Annual Survey of Hours and Earnings (ASHE)', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/2024', date: '2024' },
];

export default function CostOfBorrowingPage() {
  return (
    <>
      <TopicNav topic="Cost of Borrowing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="What Have High Interest Rates Done to Households?"
          finding="Average mortgage payments rose 61% between 2021 and 2024 as 1.8 million households remortgaged onto rates above 5%, adding £580 per month to typical housing costs."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Bank of England raised its base rate 14 consecutive times between December 2021 and August 2023, taking it from a record low of 0.1% to a 15-year high of 5.25%.<Cite nums={1} /> Around 1.8 million households remortgaged in 2023–24, moving from average rates of around 2.3% to rates above 5%, adding an average of £580 per month to their mortgage payments.<Cite nums={2} /> Average mortgage payments for new borrowers rose from £947 per month in 2021 to £1,527 in 2024 — a 61% increase in three years.<Cite nums={1} /></p>
            <p>Not everyone was affected equally. Households that locked into 5-year fixes before 2022 were insulated through to 2027. Owner-occupiers with significant equity paid lower rates than those with small deposits.<Cite nums={1} /> Renters faced a different but parallel squeeze: landlords passing on higher mortgage costs pushed average rents up 8–10% per year in 2022–24.<Cite nums={3} /> The Bank of England began cutting rates in August 2024, reducing the base rate to 4.5% by February 2025.<Cite nums={1} /> Mortgage rates have begun to fall, but remain well above pre-pandemic levels, and millions of households still face their first remortgage at materially higher rates in 2025–26.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Mortgage Rates' },
          { id: 'sec-chart2', label: 'Payment Affordability' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average 2-year fixed mortgage rate"
              value="4.8%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="was 2.3% in 2021 · peaked at 6.8% in 2023"
              sparklineData={[2.3, 2.1, 2.3, 2.2, 4.2, 5.8, 6.8, 5.5, 4.9, 4.8]}
              source="Bank of England — Mortgage Lenders Statistics 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Households remortgaged at higher rates"
              value="1.8M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023–24 · average rate increase of 2.9 percentage points"
              sparklineData={[100, 100, 100, 100, 200, 800, 1500, 1800, 1700, 1600]}
              source="UK Finance — Mortgage Market Tracker 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Avg monthly mortgage payment rise"
              value="+£580"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+61% vs 2021 · £1,527 average monthly in 2024"
              sparklineData={[0, 0, 0, 0, 80, 200, 380, 500, 560, 580]}
              source="Bank of England — Mortgage Lenders Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average UK mortgage rates, 2015–2025"
              subtitle="Average 2-year and 5-year fixed-rate mortgage rates for new borrowers. Rates rose sharply from historic lows after the Bank of England began raising base rate in late 2021, reaching a 15-year high in 2023."
              series={series1}
              annotations={annotations1}
              yLabel="Interest rate (%)"
              source={{ name: 'Bank of England', dataset: 'Mortgage Lenders and Administrators Statistics', url: 'https://www.bankofengland.co.uk/statistics/mortgage-lenders-and-administrators', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Monthly mortgage payments and affordability ratio, 2015–2025"
              subtitle="Average monthly mortgage repayment for new borrowers (£) and as a percentage of gross income. The affordability ratio hit 34% in 2023 — the highest since the 1990s housing crash."
              series={series2}
              annotations={annotations2}
              yLabel="£ / % of income"
              source={{ name: 'Bank of England / ONS', dataset: 'Mortgage Lenders Statistics and Annual Survey of Hours and Earnings', url: 'https://www.bankofengland.co.uk/statistics/mortgage-lenders-and-administrators', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Rate cuts under way: base rate fell to 4.5% by February 2025"
            value="5.25% to 4.5%"
            unit="Bank Rate cut August 2024 – February 2025"
            description="The Bank of England cut its base rate from 5.25% to 4.5% between August 2024 and February 2025, with further cuts expected through 2025. Mortgage product rates have begun to fall, with 2-year fixes approaching 4.5% for borrowers with 25%+ equity. The Mortgage Charter, agreed between major lenders and the government in 2023, allowed struggling borrowers to temporarily switch to interest-only payments without affecting their credit score."
            source="Source: Bank of England — Monetary Policy Summary, February 2025. FCA — Mortgage Charter implementation update, 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.bankofengland.co.uk/statistics/mortgage-lenders-and-administrators" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Mortgage Lenders and Administrators Statistics</a> — average mortgage rates by product type. Quarterly. Retrieved 2025.</p>
            <p><a href="https://www.ukfinance.org.uk/data-and-research/data/mortgages" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UK Finance — Mortgage Market Tracker</a> — remortgaging volumes and rate change data. Quarterly. Retrieved 2024.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Annual Survey of Hours and Earnings (ASHE)</a> — median earnings data for affordability ratio calculation. Annual.</p>
            <p>Mortgage rate figures are for new business (not stock). Affordability ratio uses gross household income for the relevant year. Monthly payment estimates use the prevailing average rate applied to the average first-time buyer loan size. Pre-2021 data may not fully capture buy-to-let rate spreads.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
