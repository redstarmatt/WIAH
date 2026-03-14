'use client';

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
  { num: 1, name: 'Bank of England', dataset: 'Consumer Credit Statistics', url: 'https://www.bankofengland.co.uk/statistics/consumer-credit', date: '2024' },
  { num: 2, name: 'StepChange', dataset: 'Statistics Yearbook', url: 'https://www.stepchange.org/policy-and-research/statistics-yearbook.aspx', date: '2024' },
  { num: 3, name: 'FCA', dataset: 'Financial Lives Survey', url: 'https://www.fca.org.uk/publications/research/financial-lives', date: '2024' },
];

const totalCreditCardDebtValues = [56.2, 57.8, 60.1, 63.4, 66.8, 59.2, 61.1, 64.2, 68.5, 72.1, 74.8];
const averageInterestRateValues = [18.4, 18.6, 18.8, 19.2, 19.4, 19.6, 21.4, 23.8, 24.2, 24.6, 24.9];
const debtinDistressValues = [1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 1.9, 2.1, 2.4, 2.7, 2.9];
const minimumPayersValues = [22.4, 22.8, 23.1, 23.4, 23.8, 24.2, 24.8, 25.4, 26.1, 26.8, 27.2];

const series1: Series[] = [
  { id: 'debt', label: 'Total credit card debt outstanding (£ billion)', colour: '#E63946', data: totalCreditCardDebtValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'interest', label: 'Average credit card interest rate (%)', colour: '#F4A261', data: averageInterestRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'distress', label: 'People in problem credit card debt (millions)', colour: '#6B7280', data: debtinDistressValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'minpay', label: 'Cardholders only making minimum payment (%)', colour: '#E63946', data: minimumPayersValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — debt fell as spending collapsed' },
  { date: new Date(2022, 5, 1), label: '2022: Cost of living — debt rising again' },
];

export default function CreditCardDebtPage() {
  return (
    <>
      <TopicNav topic="Credit Card Debt" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Much Debt Are UK Households Carrying?"
          finding={<>Total credit card debt outstanding in the UK has reached £74.8 billion — higher than before the pandemic — while average credit card interest rates have risen to nearly 25%, their highest in decades, increasing the cost of carrying balances for the 2.9 million people in problem debt.<Cite nums={[1, 2]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK households collectively owe nearly £75 billion on credit cards — a figure that briefly fell during the pandemic as spending collapsed and many people paid down balances with furlough income, before rising sharply again from 2022 as the cost of living crisis forced millions to borrow to cover essentials. The Bank of England's data shows annual credit card growth running at around 10% — roughly in line with the rate of inflation, but with the distinction that credit card interest rates have risen from around 18% to nearly 25%, meaning the real cost of carrying a balance has increased substantially.<Cite nums={1} /></p>
            <p>The FCA's Financial Lives survey reveals that around 27% of cardholders are only making the minimum payment on their credit card — a pattern that can turn a manageable debt into a very expensive long-term liability. A £3,000 balance at 24.9% making only minimum payments would take over 27 years to clear and cost more than £7,000 in interest. StepChange estimates that 2.9 million people are in problem credit card debt — defined as struggling to meet minimum payments or having missed payments — up from 1.2 million in 2013.<Cite nums={2} /> The increase in base rates since 2022 has not been passed on as savings rate improvements for most current accounts, but has been fully transmitted into variable credit card rates, worsening the position of borrowers relative to savers.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Debt & Rates' },
          { id: 'sec-chart2', label: 'Problem Debt' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Total credit card debt" value="£74.8bn" unit="outstanding" direction="up" polarity="up-is-bad" changeText="up from £56.2bn in 2013 · rising sharply since 2022" sparklineData={[56.2, 57.8, 60.1, 63.4, 66.8, 59.2, 61.1, 64.2, 68.5, 72.1, 74.8]} source="Bank of England — Consumer Credit Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Average credit card rate" value="24.9%" unit="APR" direction="up" polarity="up-is-bad" changeText="up from 18.4% in 2013 · highest in decades" sparklineData={[18.4, 18.6, 18.8, 19.2, 19.4, 19.6, 21.4, 23.8, 24.2, 24.6, 24.9]} source="Bank of England — Consumer Credit Statistics 2024" href="#sec-chart1" />
            <MetricCard label="People in problem credit card debt" value="2.9M" unit="adults" direction="up" polarity="up-is-bad" changeText="up from 1.2M in 2013 · missing or struggling with payments" sparklineData={[1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 1.9, 2.1, 2.4, 2.7, 2.9]} source="StepChange — Statistics Yearbook 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK credit card debt outstanding and average interest rate, 2013–2024"
              subtitle="Total credit card debt (£ billion) and average APR charged on credit card balances. Both rising — the combination means the total interest cost to households is rising faster than either metric alone."
              series={series1}
              annotations={annotations1}
              yLabel="£ billion / Percentage"
              source={{ name: 'Bank of England', dataset: 'Consumer Credit Statistics', url: 'https://www.bankofengland.co.uk/statistics/consumer-credit', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Problem credit card debt and minimum payment behaviour, 2013–2024"
              subtitle="People in problem credit card debt (millions) and % of cardholders only making minimum payment each month. Minimum payments trap borrowers in long-term expensive debt."
              series={series2}
              annotations={[]}
              yLabel="Millions / Percentage"
              source={{ name: 'StepChange', dataset: 'Statistics Yearbook', url: 'https://www.stepchange.org/policy-and-research/statistics-yearbook.aspx', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space scheme protecting people in crisis"
            value="80,000"
            unit="people have used the Breathing Space debt respite scheme since 2021"
            description="The Breathing Space (Debt Respite Scheme), introduced in England in May 2021, gives people in problem debt a 60-day period during which creditors cannot add interest or take enforcement action. This allows time to access debt advice and agree a repayment plan without the pressure of escalating charges. Over 80,000 people have used the scheme since its launch. Mental Health Crisis Breathing Space — for people receiving mental health crisis treatment — provides protection for the duration of treatment. StepChange data shows 40% of people using Breathing Space subsequently avoid insolvency through managed debt repayment plans."
            source="Source: Insolvency Service — Breathing Space Statistics 2024. StepChange 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.bankofengland.co.uk/statistics/consumer-credit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Consumer Credit Statistics</a> — outstanding balances, effective interest rates. Monthly.</p>
            <p><a href="https://www.stepchange.org/policy-and-research/statistics-yearbook.aspx" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">StepChange — Statistics Yearbook</a> — problem debt volumes, client demographics. Annual.</p>
            <p><a href="https://www.fca.org.uk/publications/research/financial-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCA — Financial Lives Survey</a> — payment behaviour, financial resilience. Biennial.</p>
            <p>Problem debt is defined as missing or struggling to make minimum credit card payments. Total debt outstanding is Bank of England M4 monetary financial institutions lending data.</p>
          </div>
        </section>
      </main>
    </>
  );
}
