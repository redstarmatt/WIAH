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
  { num: 1, name: 'UK Finance', dataset: 'UK Payment Markets Report', url: 'https://www.ukfinance.org.uk/data-and-research/data/payments', date: '2024' },
  { num: 2, name: 'FCA', dataset: 'Cash and Digital Payments in the UK', url: 'https://www.fca.org.uk/consumers/cash-and-digital-payments', date: '2024' },
  { num: 3, name: 'Access to Cash Review', dataset: 'Final Report on UK Cash Access', url: 'https://www.accesstocash.org.uk/', date: '2023' },
];

interface DataPoint {
  year: number;
  cashTransactionsShare: number;
  cardTransactions: number;
  cashDependentAdults: number;
  atmWithdrawals: number;
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

export default function CashUseDeclinePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/cash-use-decline/cash_use_decline.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'cashTransactionsShare', label: 'Cash share of all transactions (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cashTransactionsShare })) },
        { id: 'cardTransactions', label: 'Card payments share (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cardTransactions })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'cashDependentAdults', label: 'Adults who mainly use cash (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cashDependentAdults })) },
        { id: 'atmWithdrawals', label: 'Annual ATM withdrawals (billions)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.atmWithdrawals })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: contactless payments surge' },
    { date: new Date(2023, 5, 1), label: 'FCA cash access duty enacted' },
  ];

  return (
    <>
      <TopicNav topic="Economy & Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Digital"
          question="Is the UK Becoming Cashless Too Fast?"
          finding={<>Cash now accounts for just 14% of UK payments, down from 62% in 2006, but around 3 million adults still rely on cash for nearly all their spending — and the rapid pace of decline risks leaving vulnerable people unable to participate in commerce.<Cite nums={1} /> The FCA's cash access duty came into force in 2023 to slow the decline of cash infrastructure.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's shift away from cash has been dramatic and accelerating. UK Finance data shows cash's share of all payments fell from 62% in 2006 to 14% in 2023, with the Covid-19 pandemic sharply accelerating the transition to contactless and digital payments.<Cite nums={1} /> Contactless payments now account for the majority of all card transactions, and services from transport to car parking to some retail venues no longer accept cash at all. The UK is one of the fastest-moving major economies toward cashlessness, ranking alongside Sweden and Norway internationally.</p>
            <p>Despite this overall trend, the Access to Cash Review and subsequent FCA analysis consistently find a significant minority of UK adults who remain heavily dependent on cash — around 3 million people who would face real hardship in a cashless environment.<Cite nums={2} /> This group is disproportionately older, disabled, or on low incomes, and often uses cash as a budgeting tool: physically separating money into envelopes or categories provides a tangible financial control mechanism that digital alternatives do not easily replicate. The simultaneous closure of branches and ATMs risks creating 'cash deserts' — areas where obtaining cash requires significant travel.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-payments', label: 'Payment trends' },
          { id: 'sec-access', label: 'Cash dependence' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Cash share of all payments" value="14" unit="%" direction="down" polarity="down-is-bad" changeText={<>Down from 62% in 2006<Cite nums={1} /></>} sparklineData={[55, 48, 40, 34, 28, 23, 19, 17, 15, 14, 14]} href="#sec-payments" />
          <MetricCard label="Adults mainly using cash" value="3" unit="million" direction="down" polarity="flat" changeText={<>Declining but still 5% of adults<Cite nums={2} /></>} sparklineData={[8, 7, 6, 5.5, 5, 4.5, 4, 3.8, 3.5, 3.2, 3.0]} href="#sec-access" />
          <MetricCard label="Annual ATM cash withdrawals" value="6.5" unit="billion" direction="down" polarity="flat" changeText={<>Down from 10.5bn in 2015<Cite nums={1} /></>} sparklineData={[10.5, 10.0, 9.5, 9.0, 8.5, 7.0, 7.2, 7.0, 6.9, 6.7, 6.5]} href="#sec-payments" />
        </div>

        <ScrollReveal>
          <section id="sec-payments" className="mb-12">
            <LineChart title="UK payment method trends, 2006–2024" subtitle="Cash and card shares of total consumer payment transactions (%), UK." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-access" className="mb-12">
            <LineChart title="Cash-dependent adults and ATM use, 2015–2024" subtitle="Adults who mainly use cash (millions) and annual ATM cash withdrawals (billions), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Cash still vital" value="3 million" unit="adults rely on it" description={<>Despite the rapid move to digital payments, around 3 million UK adults still rely mainly on cash for their daily spending — a population that includes many of the most financially and digitally vulnerable people in the country, for whom a cashless economy represents a genuine exclusion risk.<Cite nums={3} /></>} source="Source: Access to Cash Review, Final Report, updated 2023." />
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
