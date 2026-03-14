'use client';

import { useEffect, useState } from 'react';
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
  { num: 1, name: 'Money and Pensions Service', dataset: 'UK Adult Financial Wellbeing Survey', url: 'https://www.moneyandpensionsservice.org.uk/2024/01/uk-adult-financial-wellbeing-survey/', date: '2024' },
  { num: 2, name: 'StepChange', dataset: 'Debt Statistics Annual Report', url: 'https://www.stepchange.org/policy-and-research/statistics.aspx', date: '2024' },
  { num: 3, name: 'Citizens Advice', dataset: 'Debt and Money Advice Demand Statistics', url: 'https://www.citizensadvice.org.uk/about-us/our-work/our-causes-and-campaigns/debt/', date: '2024' },
];

interface DataPoint {
  year: number;
  debtAdviceClients: number;
  problemDebtEstimate: number;
  waitTimeDebtAdvice: number;
  averageUnsecuredDebt: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function ConsumerDebtAdvicePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/consumer-debt-advice/consumer_debt_advice.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'debtAdviceClients', label: 'Free debt advice clients (thousands/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.debtAdviceClients })) },
        { id: 'problemDebtEstimate', label: 'Estimated adults in problem debt (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.problemDebtEstimate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'waitTimeDebtAdvice', label: 'Average wait for debt advice appointment (days)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.waitTimeDebtAdvice })) },
        { id: 'averageUnsecuredDebt', label: 'Average unsecured debt per StepChange client (£thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.averageUnsecuredDebt })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Debt repayment moratoria introduced' },
    { date: new Date(2022, 5, 1), label: 'Cost-of-living crisis: demand surges' },
  ];

  return (
    <>
      <TopicNav topic="Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Many People Need Debt Advice?"
          finding={<>Around 9 million UK adults are in problem debt or financially vulnerable, but free debt advice services reach only around 2.5 million people annually — leaving the majority without the support they need.<Cite nums={1} /> The cost-of-living crisis from 2022 sharply increased demand for advice while squeezing the real incomes of debt advice charities.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Problem debt — defined as debt that is causing stress, affecting people's daily life, or where repayments are regularly missed — affects an estimated 9 million UK adults according to the Money and Pensions Service.<Cite nums={1} /> A further 13 million are considered financially vulnerable, with little or no savings and limited ability to absorb financial shocks. The debt advice sector — comprising charities including StepChange, Citizens Advice, National Debtline and local money advice services — provides free, impartial help with debt management, but collectively reaches around 2–2.5 million people annually, leaving the majority of those in problem debt without specialist support.</p>
            <p>StepChange Debt Charity's annual statistics show that the people seeking help carry an average of around £14,000 in unsecured debt, including credit cards, personal loans, overdrafts and buy-now-pay-later products.<Cite nums={2} /> The cost-of-living crisis from 2022 increased both the number of people falling into debt and the complexity of cases: household budget shortfalls caused by energy and food costs meant many clients sought advice not about unmanageable borrowing but about fundamental inability to afford basic living costs. Citizens Advice reported record demand for debt and money advice in 2022–23.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-demand', label: 'Demand for advice' },
          { id: 'sec-debt-levels', label: 'Debt levels' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Adults in problem debt" value="9" unit="million" direction="up" polarity="up-is-bad" changeText={<>Up from 6.3m before pandemic<Cite nums={1} /></>} sparklineData={[6.3, 6.5, 6.8, 7.0, 7.2, 8.0, 8.5, 8.8, 9.0, 9.0, 9.0]} href="#sec-demand" />
          <MetricCard label="Free debt advice clients/yr" value="2.5" unit="million" direction="up" polarity="up-is-good" changeText={<>Up from 1.8m in 2015 but still majority unserved<Cite nums={2} /></>} sparklineData={[1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.4, 2.45, 2.48, 2.5]} href="#sec-demand" />
          <MetricCard label="Average unsecured debt per client" value="14" unit="£thousand" direction="up" polarity="up-is-bad" changeText={<>Up from £11k in 2015<Cite nums={2} /></>} sparklineData={[11, 11.5, 12, 12.3, 12.8, 13.2, 13.5, 13.7, 13.8, 14, 14]} href="#sec-debt-levels" />
        </div>

        <ScrollReveal>
          <section id="sec-demand" className="mb-12">
            <LineChart title="Debt advice demand and problem debt, 2015–2024" subtitle="Free debt advice clients (thousands/yr) and estimated adults in problem debt (millions), UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-debt-levels" className="mb-12">
            <LineChart title="Wait times and average debt levels, 2015–2024" subtitle="Average wait for debt advice appointment (days) and average unsecured debt per StepChange client (£thousands), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Breathing Space scheme" value="2021" unit="launched" description={<>The Debt Respite Scheme (Breathing Space), launched in 2021, gives people with problem debt a 60-day period of legal protection from creditor enforcement while they access debt advice — a significant improvement to the environment in which debt advisers operate.<Cite nums={1} /></>} source="Source: Insolvency Service, Breathing Space Statistics, 2024." />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a>
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
              {data?.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
        <References items={editorialRefs} />
      </main>
    </>
  );
}
