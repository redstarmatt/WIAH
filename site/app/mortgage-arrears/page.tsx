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
  { num: 1, name: 'UK Finance', dataset: 'Mortgage arrears and possessions statistics', url: 'https://www.ukfinance.org.uk/data-and-research/data/mortgages', date: '2024' },
  { num: 2, name: 'Bank of England', dataset: 'Financial Stability Report', url: 'https://www.bankofengland.co.uk/financial-stability-report', date: '2024' },
  { num: 3, name: 'FCA', dataset: 'Mortgage lending statistics', url: 'https://www.fca.org.uk/data/mortgage-lending-statistics', date: '2024' },
];

interface DataPoint {
  year: number;
  householdsInArrears: number;
  possessionsClaims: number;
  avgMortgageRate: number;
  mortgageCostIncome: number;
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

export default function MortgageArrearsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/mortgage-arrears/mortgage_arrears.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'householdsInArrears', label: 'Households in mortgage arrears (000s)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.householdsInArrears })) },
        { id: 'possessionsClaims', label: 'Mortgage possession claims', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.possessionsClaims })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgMortgageRate', label: 'Average 2-year fixed mortgage rate (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgMortgageRate })) },
        { id: 'mortgageCostIncome', label: 'Mortgage cost as % of take-home pay', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mortgageCostIncome })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'Rate rises begin' },
    { date: new Date(2023, 5, 1), label: 'Fixed-rate rollovers peak' },
  ];

  return (
    <>
      <TopicNav topic="Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="How Many Households Are Behind on Their Mortgage?"
          finding={<>Mortgage arrears rose sharply from 2022 as households on fixed deals rolled onto rates that had more than tripled, with over 100,000 homeowners in arrears by mid-2024.<Cite nums={1} /> The Bank of England estimated that over 1.5 million fixed-rate mortgages matured in 2023 alone, exposing borrowers to the sharpest rate shock in 30 years.<Cite nums={[2, 3]} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's mortgage market is dominated by short-term fixed-rate deals of two or five years. When the Bank of England raised rates from 0.1% to 5.25% between 2021 and 2023, borrowers nearing the end of cheap fixed deals faced a brutal adjustment. UK Finance data shows that by Q2 2024 there were around 101,000 mortgages in arrears of 2.5% or more of the outstanding balance — roughly double the level in 2021, though still well below the financial-crisis peak of 208,000 in 2009.<Cite nums={1} /></p>
            <p>The FCA's mortgage data shows that by late 2023 new 2-year fixed rates averaged around 5.7%, up from 1.2% in 2021 — adding over £400 per month to a typical mortgage. Lenders have been required since 2023 to offer forbearance options including payment holidays and term extensions. But the Bank of England warned in its Financial Stability Reports that sustained high rates could push mortgage cost-to-income ratios to levels that would stress household finances even for borrowers who remained current on payments.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-arrears', label: 'Arrears trend' },
          { id: 'sec-rates', label: 'Rate impact' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Mortgages in arrears (mid-2024)" value="101,000" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 55,000 in 2021<Cite nums={1} /></>} sparklineData={[55, 56, 57, 58, 60, 62, 68, 75, 85, 95, 101]} href="#sec-arrears" />
          <MetricCard label="Avg 2-year fixed rate (2024)" value="5.4%" unit="" direction="down" polarity="up-is-bad" changeText={<>Down from 5.9% peak in 2023<Cite nums={3} /></>} sparklineData={[1.2, 1.3, 1.4, 1.5, 2.0, 3.5, 5.0, 5.9, 5.7, 5.5, 5.4]} href="#sec-rates" />
          <MetricCard label="Mortgage possessions (2023)" value="5,100" unit="" direction="up" polarity="up-is-bad" changeText={<>Rising but below 2009 peak<Cite nums={1} /></>} sparklineData={[3.5, 3.4, 3.3, 3.2, 3.1, 2.8, 2.6, 3.2, 4.0, 4.8, 5.1]} href="#sec-arrears" />
        </div>

        <ScrollReveal>
          <section id="sec-arrears" className="mb-12">
            <LineChart title="Mortgage arrears and possession claims, England and Wales, 2014–2024" subtitle="Households with arrears ≥2.5% of outstanding balance; possession claims filed, 000s." series={chart1Series} annotations={annotations} yLabel="Cases (000s)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rates" className="mb-12">
            <LineChart title="Average 2-year fixed mortgage rate and affordability, 2014–2024" subtitle="Average 2-year fixed rate (%); mortgage cost as % of average take-home pay." series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Mortgage Charter" value="2023" unit="agreement" description={<>The FCA's Mortgage Charter, signed by major lenders in 2023, committed banks to offer payment holidays and forbearance options to struggling borrowers without automatic credit file damage, protecting around 1.5 million households.<Cite nums={3} /></>} source="Source: FCA Mortgage Charter, July 2023." />
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
