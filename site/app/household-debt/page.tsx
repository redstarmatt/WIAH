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
const totalDebtValues = [1.22, 1.25, 1.28, 1.30, 1.33, 1.38, 1.42, 1.48, 1.52, 1.57, 1.60, 1.63, 1.68, 1.74, 1.85];

// Credit card debt outstanding (£bn), 2010–2024
const creditCardValues = [54.2, 55.1, 55.8, 56.5, 58.0, 59.6, 62.1, 64.3, 66.0, 68.2, 62.5, 64.8, 67.5, 70.2, 73.0];

// Household savings ratio (%), 2010–2024
const savingsRatioValues = [9.2, 8.5, 7.8, 6.9, 6.5, 5.8, 5.2, 5.0, 5.5, 5.8, 16.2, 11.5, 8.2, 6.4, 5.6];

// Unsecured debt per adult (£), 2010–2024
const unsecuredDebtValues = [2800, 2850, 2900, 2950, 3050, 3180, 3310, 3420, 3500, 3580, 3350, 3480, 3650, 3820, 4000];

const series1: Series[] = [
  {
    id: 'total-debt',
    label: 'Total household debt (£tn)',
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
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — forced saving, then rebound' },
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis accelerates borrowing' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Bank of England', dataset: 'Money and Credit Statistics', url: 'https://www.bankofengland.co.uk/statistics/money-and-credit', date: '2024' },
  { num: 2, name: 'FCA', dataset: 'Financial Lives Survey', url: 'https://www.fca.org.uk/publications/research/financial-lives', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Wealth and Assets Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/totalwealthingreatbritain/latest', date: '2023' },
];

export default function HouseholdDebtPage() {
  return (
    <>
      <TopicNav topic="Household Debt" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Household Debt"
          question="How much do British households actually owe?"
          finding="UK household debt has reached £1.85 trillion. The average household owes £65,000 including mortgages, unsecured debt per adult has hit £4,000, and credit card balances stand at a record £73 billion — while buy-now-pay-later remains largely unregulated."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Total UK household debt reached £1.85 trillion by the end of 2024, according to Bank of England money and credit statistics — a 52% increase since 2010 in nominal terms.<Cite nums={1} /> While mortgages account for the vast majority, it is unsecured borrowing that reveals the most acute pressures. Credit card debt hit a record £73 billion in late 2024, and unsecured debt per adult has climbed to approximately £4,000.<Cite nums={1} /> The FCA's Financial Lives Survey found that 12.9 million adults have low financial resilience, meaning they could not withstand a modest income shock without falling into serious difficulty.<Cite nums={2} /> The most rapidly growing category — buy-now-pay-later — remains largely outside FCA regulation despite being used by an estimated 17 million UK adults.</p>
            <p>The savings picture tells its own story. The household savings ratio briefly spiked to 16.2% during COVID lockdowns as spending opportunities vanished, but has since fallen back to 5.6% — below its pre-pandemic level.<Cite nums={1} /> The ONS Wealth and Assets Survey shows that the bottom 30% of households by income hold virtually no liquid savings, making them entirely dependent on credit to absorb unexpected costs.<Cite nums={3} /> Rising interest rates since 2022 have increased the servicing cost of variable-rate debt, creating a tightening cycle: households borrow more because prices rise, then pay more to service existing borrowing. The structural question is whether UK household finances have become permanently more fragile, or whether this is a cyclical peak that falling rates will ease.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Total debt' },
          { id: 'sec-chart2', label: 'Credit vs savings' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total household debt (UK)"
              value="£1.85tn"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £1.22tn in 2010 · 52% increase in nominal terms"
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
              changeText="up from £2,800 in 2010 · excludes mortgages"
              sparklineData={unsecuredDebtValues.slice(-8)}
              source="Bank of England — Money and Credit Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="BNPL users (UK adults)"
              value="17m"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="largely unregulated · FCA regulation delayed until 2025"
              sparklineData={[5, 7, 9, 11, 13, 15, 16, 17]}
              source="FCA — Financial Lives Survey 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Total UK household debt, 2010–2024"
              subtitle="Including mortgages, credit cards, personal loans, and overdrafts. Nominal terms, not adjusted for inflation."
              series={series1}
              annotations={annotations}
              yLabel="Total debt (£ trillions)"
              source={{ name: 'Bank of England', dataset: 'Money and Credit Statistics', url: 'https://www.bankofengland.co.uk/statistics/money-and-credit', frequency: 'monthly', date: 'Jan 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Credit card debt vs household savings ratio, 2010–2024"
              subtitle="Credit card debt (red, £bn) has climbed to record levels while the savings ratio (green, %) has fallen back below pre-pandemic levels."
              series={series2}
              annotations={annotations}
              yLabel="Value"
              source={{ name: 'Bank of England / ONS', dataset: 'Money and Credit / National Accounts', url: 'https://www.bankofengland.co.uk/statistics/money-and-credit', frequency: 'quarterly', date: 'Jan 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space scheme: structured debt relief"
            value="70,000+"
            unit="people helped in 2023"
            description="The Breathing Space scheme, introduced in May 2021, gives people in problem debt legal protections from creditor action for 60 days while they seek advice. In 2023, over 70,000 people accessed the scheme. While it does not cancel debts, it prevents the spiral of enforcement charges, court action and mental health crisis that compounds financial difficulty. The scheme demonstrates that regulatory intervention can meaningfully protect the most vulnerable borrowers."
            source="Source: Insolvency Service — Breathing Space Statistics 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.bankofengland.co.uk/statistics/money-and-credit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Money and Credit Statistics</a> — primary source for aggregate lending, credit card debt, and unsecured borrowing. Monthly release.</p>
            <p><a href="https://www.fca.org.uk/publications/research/financial-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCA — Financial Lives Survey</a> — survey of 19,000 UK adults covering financial resilience, product holdings, and BNPL usage.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Wealth and Assets Survey</a> — household-level data on savings, assets, and debt distribution by income decile.</p>
            <p>All figures are for the UK unless otherwise stated. Total household debt includes secured (mortgage) and unsecured borrowing. BNPL user estimates are based on FCA survey data and may undercount occasional users.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
