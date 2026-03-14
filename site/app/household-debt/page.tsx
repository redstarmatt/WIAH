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

// Total UK household debt (£ trillions), 2010–2024 — Bank of England
const totalDebtValues = [1.24, 1.27, 1.30, 1.33, 1.36, 1.40, 1.44, 1.49, 1.53, 1.57, 1.62, 1.66, 1.72, 1.78, 1.85];

// Credit card debt outstanding (£ billions), 2010–2024 — Bank of England
const creditCardValues = [56.2, 55.8, 56.4, 57.1, 58.3, 60.5, 62.1, 64.0, 65.8, 68.2, 62.5, 65.0, 68.3, 71.0, 73.4];

// Household savings ratio (%), 2010–2024 — ONS
const savingsRatioValues = [10.1, 8.5, 7.8, 6.9, 6.3, 5.8, 5.5, 5.2, 5.9, 6.1, 23.9, 12.4, 9.8, 8.2, 7.5];

const series1: Series[] = [
  {
    id: 'total-debt',
    label: 'Total household debt (£ trillions)',
    colour: '#E63946',
    data: totalDebtValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'credit-card',
    label: 'Credit card debt (£bn)',
    colour: '#E63946',
    data: creditCardValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'savings-ratio',
    label: 'Savings ratio (%)',
    colour: '#2A9D8F',
    data: savingsRatioValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — forced savings spike' },
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis begins' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Bank of England', dataset: 'Money and Credit Statistics', url: 'https://www.bankofengland.co.uk/statistics/money-and-credit', date: '2024' },
  { num: 2, name: 'FCA', dataset: 'Financial Lives Survey', url: 'https://www.fca.org.uk/publications/research/financial-lives', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Wealth and Assets Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/wealthingreatbritainwave7/2018to2020', date: '2023' },
];

export default function HouseholdDebtPage() {
  return (
    <>
      <TopicNav topic="Household Debt" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Household Debt"
          question="How Much Do British Households Actually Owe?"
          finding="UK households collectively owe £1.85 trillion. The average household carries £65,000 in total debt including mortgages, unsecured debt per adult has reached £4,000, and credit card balances have hit a record £73 billion."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Total UK household debt has climbed relentlessly to £1.85 trillion, driven by mortgage growth and a sharp acceleration in unsecured borrowing since 2021.<Cite nums={1} /> The average household now owes approximately £65,000 when mortgage debt is included, and unsecured debt per adult — credit cards, personal loans, overdrafts and car finance — has risen to £4,000.<Cite nums={3} /> Credit card balances alone reached a record £73.4 billion in late 2024, surpassing the pre-pandemic peak for the first time.<Cite nums={1} /> The FCA estimates that 7.4 million adults are in serious financial difficulty, with a further 3.6 million showing signs of financial vulnerability.<Cite nums={2} /></p>
            <p>The buy-now-pay-later sector has added a largely invisible layer to the debt picture. An estimated 17 million UK adults have used BNPL products, yet these obligations are not routinely reported to credit reference agencies and remain outside the FCA regulatory perimeter despite repeated consultations.<Cite nums={2} /> The Woolard Review of 2021 recommended bringing BNPL into regulation, but legislation has been repeatedly delayed. Meanwhile, the savings ratio — which spiked to 23.9% during COVID-19 lockdowns when spending was restricted — has fallen back to 7.5%, below the pre-pandemic average. For lower-income households, the cost-of-living crisis has eroded savings entirely: the poorest tenth of households now spend £1.20 for every £1 earned, plugging the gap with credit.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Total debt trend' },
          { id: 'sec-chart2', label: 'Credit vs savings' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total UK household debt"
              value="£1.85tn"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £1.24tn in 2010 · includes mortgages"
              sparklineData={totalDebtValues.slice(-8)}
              source="Bank of England — Money and Credit Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Unsecured debt per adult"
              value="£4,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="credit cards, loans, overdrafts · excludes BNPL"
              sparklineData={[3100, 3250, 3400, 3500, 3200, 3500, 3700, 4000]}
              source="ONS — Wealth and Assets Survey 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="BNPL users in the UK"
              value="17m"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="largely unregulated · not reported to credit agencies"
              sparklineData={[2, 5, 8, 10, 12, 14, 16, 17]}
              source="FCA — Financial Lives Survey 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Total UK household debt, 2010–2024"
              subtitle="Includes mortgage and unsecured consumer debt. Steady upward trend with acceleration post-2021 driven by mortgage growth and rising unsecured borrowing."
              series={series1}
              annotations={annotations}
              yLabel="Debt (£ trillions)"
              source={{ name: 'Bank of England', dataset: 'Money and Credit Statistics', url: 'https://www.bankofengland.co.uk/statistics/money-and-credit', frequency: 'monthly', date: 'Jan 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Credit card debt vs household savings ratio, 2010–2024"
              subtitle="Credit card balances (red, £bn) have reached record levels while the savings ratio (green, %) has fallen back below pre-pandemic norms."
              series={series2}
              annotations={annotations}
              yLabel="Value"
              source={{ name: 'Bank of England / ONS', dataset: 'Money and Credit / National Accounts', url: 'https://www.bankofengland.co.uk/statistics/money-and-credit', frequency: 'quarterly', date: 'Jan 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space scheme: a genuine lifeline"
            value="77,000"
            unit="people helped in 2023"
            description="The Breathing Space scheme, introduced in May 2021, gives people in problem debt a 60-day period during which creditors must freeze interest, charges and enforcement action. In 2023, over 77,000 people entered Breathing Space, giving them time to access debt advice and find a sustainable solution. Evidence from the Insolvency Service shows that the majority of participants go on to enter a formal debt solution rather than returning to unmanaged debt. The scheme demonstrates that well-designed regulatory interventions can provide meaningful relief."
            source="Source: Insolvency Service — Breathing Space statistics 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.bankofengland.co.uk/statistics/money-and-credit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Money and Credit Statistics</a> — primary source for aggregate household debt, credit card balances, and lending flows. Monthly release.</p>
            <p><a href="https://www.fca.org.uk/publications/research/financial-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCA — Financial Lives Survey</a> — survey of 19,000 UK adults covering financial resilience, product holdings, and vulnerability indicators. Published biennially.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Wealth and Assets Survey</a> — longitudinal survey measuring household wealth, debt, and savings across Great Britain.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
