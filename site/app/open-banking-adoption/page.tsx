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
  { num: 1, name: 'Open Banking Implementation Entity', dataset: 'Open Banking Impact Report', url: 'https://www.openbanking.org.uk/insights/open-banking-impact-report/', date: '2024' },
  { num: 2, name: 'FCA', dataset: 'Financial Lives Survey — digital banking', url: 'https://www.fca.org.uk/financial-lives', date: '2022' },
  { num: 3, name: 'PSR', dataset: 'Open Banking and Payment Systems Review', url: 'https://www.psr.org.uk/our-work/open-banking/', date: '2023' },
];

interface DataPoint {
  year: number;
  activeUsers: number;
  apiCalls: number;
  tppCount: number;
  paymentInitiations: number;
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

export default function OpenBankingAdoptionPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/open-banking-adoption/open_banking_adoption.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'activeUsers', label: 'Active open banking users (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.activeUsers })) },
        { id: 'tppCount', label: 'Regulated third-party providers (count)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.tppCount })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'apiCalls', label: 'Monthly API calls (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.apiCalls })) },
        { id: 'paymentInitiations', label: 'Monthly payment initiations (millions)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.paymentInitiations })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'Open banking mandated (CMA9)' },
    { date: new Date(2023, 5, 1), label: 'JROC future vision published' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Economy"
          question="How Widely Is Open Banking Being Used?"
          finding={<>Open banking has grown from a regulatory experiment to 7 million active users in the UK, with over 1 billion API calls processed monthly — making the UK a global leader in adoption.<Cite nums={1} /> But uptake remains concentrated in fintech users, with most banking customers unaware of what open banking enables.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK was among the first countries to mandate open banking, requiring the nine largest banks to open their APIs to authorised third parties from 2018. By early 2024, the ecosystem had grown to over 7 million active users, more than 700 regulated third-party providers, and over 1 billion API calls per month — figures that put the UK well ahead of most comparable economies.<Cite nums={1} /> Use cases have expanded from simple account aggregation to variable recurring payments, income verification for mortgage applications, and real-time affordability checks for lenders.</p>
            <p>Despite strong headline numbers, the FCA's Financial Lives survey finds that awareness of open banking remains low among mainstream bank customers: fewer than 30% have heard of it, and fewer than 15% have knowingly used an open banking service.<Cite nums={2} /> The Payment Systems Regulator's review of open banking's future found that the framework needed structural reform to become truly competitive — the existing OBIE governance model was designed for a specific CMA9 remedy and is ill-suited for a long-term competitive ecosystem.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-users', label: 'Users & providers' },
          { id: 'sec-volume', label: 'Transaction volume' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Active open banking users" value="7" unit="million" direction="up" polarity="up-is-good" changeText={<>Up from near zero in 2018<Cite nums={1} /></>} sparklineData={[0.1, 0.5, 1.0, 2.0, 3.5, 4.5, 5.2, 5.8, 6.3, 6.7, 7.0]} href="#sec-users" />
          <MetricCard label="Monthly API calls" value="1,000" unit="million" direction="up" polarity="up-is-good" changeText={<>Up from 66m in 2019<Cite nums={1} /></>} sparklineData={[66, 120, 200, 320, 480, 600, 710, 810, 890, 960, 1000]} href="#sec-volume" />
          <MetricCard label="Regulated third-party providers" value="700+" unit="" direction="up" polarity="up-is-good" changeText={<>From handful in 2018<Cite nums={3} /></>} sparklineData={[10, 50, 120, 200, 310, 420, 500, 580, 630, 670, 700]} href="#sec-users" />
        </div>

        <ScrollReveal>
          <section id="sec-users" className="mb-12">
            <LineChart title="UK open banking users and providers, 2018–2024" subtitle="Active open banking users (millions) and regulated TPP count, UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-volume" className="mb-12">
            <LineChart title="Open banking API calls and payment initiations, 2019–2024" subtitle="Monthly API calls and payment initiations (millions), UK." series={chart2Series} annotations={[]} yLabel="Millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Global leadership" value="#1" unit="in open banking adoption" description={<>The UK is ranked first globally in open banking adoption by most international benchmarks, with the Open Banking Implementation Entity cited as the model framework that other countries are now emulating.<Cite nums={1} /></>} source="Source: Open Banking Implementation Entity, Impact Report 2024." />
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
