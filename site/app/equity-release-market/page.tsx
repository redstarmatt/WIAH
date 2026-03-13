'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Equity release lending (£bn), 2015–2023 — Equity Release Council
const lendingValues = [1.6, 2.2, 3.1, 3.9, 4.0, 3.9, 3.6, 4.8, 2.6];

// New plans taken out (thousands), 2015–2023 — Equity Release Council
const newPlansValues = [21, 28, 38, 46, 48, 44, 41, 49, 27];

// Average interest rate on equity release (%), 2015–2023 — Equity Release Council
const interestRateValues = [5.8, 5.5, 5.2, 5.0, 4.9, 4.9, 4.9, 5.8, 6.9];

const lendingSeries: Series[] = [
  {
    id: 'lending',
    label: 'Equity release lending (£bn)',
    colour: '#F4A261',
    data: lendingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const plansSeries: Series[] = [
  {
    id: 'new-plans',
    label: 'New equity release plans (thousands)',
    colour: '#264653',
    data: newPlansValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'interest-rate',
    label: 'Average interest rate (%)',
    colour: '#E63946',
    data: interestRateValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const lendingAnnotations: Annotation[] = [
  { date: new Date(2022, 8, 1), label: 'Sep 2022: Mini-budget — rates spike' },
];

export default function EquityReleaseMarketPage() {
  return (
    <>
      <TopicNav topic="Equity Release" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Equity Release"
          question="Are Older Homeowners Cashing In — or Being Trapped?"
          finding="Equity release lending peaked at £4.8 billion in 2022, as older homeowners turned to their property to fund retirement. After the 2022 mini-budget sent interest rates to 6.9%, new plans fell sharply in 2023. Compound interest means many borrowers will never fully repay what they owe."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Equity release — the range of financial products that allow homeowners aged 55 and over to access the value tied up in their property without selling — grew rapidly from 2015 to 2022, driven by rising house prices, low interest rates, and inadequate pension savings for many of those approaching retirement. The market grew from £1.6 billion in 2015 to a peak of £4.8 billion in 2022. The most common product is a lifetime mortgage, where compound interest rolls up over the life of the loan. With average rates of around 5–6% and typical loan durations of 15–20 years, an initial borrowing of £80,000 can grow to £250,000 or more before repayment.</p>
            <p>The September 2022 mini-budget triggered a sharp repricing: equity release rates jumped from around 4.9% to 6.9% in months, and new plan numbers fell from 49,000 in 2022 to 27,000 in 2023 — a 45% drop. Consumer groups and the FCA have raised concerns about the complexity and long-term costs of equity release products, particularly for borrowers who later need care home funding or wish to leave property to children. The Equity Release Council introduced the no-negative-equity guarantee and the right to make partial repayments without penalty, reducing the worst outcomes. But the fundamental structural driver — insufficient private pension saving across the boomer generation — means demand will persist.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Lending volumes' },
          { id: 'sec-chart2', label: 'Plans and rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Equity release lending"
              value="£2.6bn"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Down from £4.8bn peak in 2022 · rates deterring new borrowers"
              sparklineData={[1.6, 2.2, 3.1, 3.9, 4.0, 3.9, 3.6, 4.8, 2.6]}
              source="Equity Release Council · Market data 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="New equity release plans"
              value="27,000"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Down 45% from 2022 peak · rate spike deterring take-up"
              sparklineData={[21, 28, 38, 46, 48, 44, 41, 49, 27]}
              source="Equity Release Council · Market data 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Average equity release rate"
              value="6.9%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 4.9% in 2021 · compound interest risk increasing"
              sparklineData={[5.8, 5.5, 5.2, 5.0, 4.9, 4.9, 4.9, 5.8, 6.9]}
              source="Equity Release Council · Rate data 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Equity release lending, UK, 2015–2023"
              subtitle="Total value of lifetime mortgages and home reversion plans taken out annually. Peaked at £4.8 billion in 2022."
              series={lendingSeries}
              annotations={lendingAnnotations}
              yLabel="Lending (£bn)"
              source={{ name: 'Equity Release Council', dataset: 'Market data and statistics', url: 'https://www.equityreleasecouncil.com/market-data/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="New equity release plans and average interest rate, UK, 2015–2023"
              subtitle="Number of new equity release plans agreed (thousands) and average lifetime mortgage interest rate (%). Rate spike in 2022 caused sharp drop in new plans."
              series={plansSeries}
              annotations={[{ date: new Date(2022, 8, 1), label: 'Sep 2022: Mini-budget' }]}
              yLabel="Value"
              source={{ name: 'Equity Release Council', dataset: 'Market data and statistics', url: 'https://www.equityreleasecouncil.com/market-data/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="No-negative-equity guarantee protects all borrowers since 2022"
            value="100%"
            description="Since 2022, all Equity Release Council members — covering the vast majority of the market — must offer the no-negative-equity guarantee, meaning borrowers or their estates can never owe more than the value of their home. The right to make penalty-free partial repayments, introduced as a standard across the sector, allows borrowers to reduce the compound interest burden. FCA authorisation requirements mean independent financial advice is mandatory before taking out equity release. These protections address the worst historical outcomes, though the long-term cost of compound interest in a high-rate environment remains significant."
            source="Source: Equity Release Council — Standards and product features 2023. FCA — Equity release regulation guidance."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.equityreleasecouncil.com/market-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Equity Release Council — Market data and statistics</a> — quarterly and annual data on equity release lending volumes, plans, and rates.</p>
            <p><a href="https://www.fca.org.uk/consumers/equity-release" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCA — Equity release consumer information</a> — regulatory framework, advice requirements, and consumer protections.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
