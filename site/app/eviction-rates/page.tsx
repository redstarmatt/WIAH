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
  { num: 1, name: 'Ministry of Justice', dataset: 'Mortgage and landlord possession statistics', url: 'https://www.gov.uk/government/collections/mortgage-and-landlord-possession-statistics', date: '2024' },
  { num: 2, name: 'Shelter', dataset: 'Annual homelessness statistics', url: 'https://england.shelter.org.uk/professional_resources/policy_and_research/policy_library/annual_homelessness_statistics', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Private rental market summary statistics', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/privaterentalmarketsummarystatisticsinengland', date: '2024' },
];

interface DataPoint {
  year: number;
  section21Notices: number;
  section8Notices: number;
  possessionOrders: number;
  evictionsExecuted: number;
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

export default function EvictionRatesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/eviction-rates/eviction_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'section21Notices', label: 'Section 21 (no-fault) notices', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.section21Notices })) },
        { id: 'section8Notices', label: 'Section 8 (fault-based) notices', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.section8Notices })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'possessionOrders', label: 'Possession orders granted', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.possessionOrders })) },
        { id: 'evictionsExecuted', label: 'Evictions executed by bailiffs', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.evictionsExecuted })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid eviction ban' },
    { date: new Date(2022, 5, 1), label: 'Ban lifted' },
  ];

  return (
    <>
      <TopicNav topic="Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="How Many Tenants Are Being Evicted?"
          finding={<>Landlord possession claims in England and Wales reached over 100,000 in 2023, with Section 21 no-fault evictions driving a rising share.<Cite nums={1} /> Despite government pledges to abolish Section 21, the Renters Reform Bill stalled repeatedly, leaving millions of tenants exposed.<Cite nums={[2, 3]} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has one of the most insecure private rental markets in Europe. Landlords can issue a Section 21 notice — requiring no reason — giving tenants just two months to leave. In 2023, more than 26,000 Section 21 notices were served in a single quarter.<Cite nums={1} /> The backlog in courts means the full eviction process can take six to twelve months, but the threat alone causes many tenants to leave voluntarily, often pushed into temporary accommodation or homelessness.</p>
            <p>The pandemic briefly suppressed evictions through a court moratorium, but since the ban lifted in 2021 possession claims have surged well above pre-pandemic levels. Shelter estimates that someone is made homeless through eviction every nine minutes in England.<Cite nums={2} /> Rising rents — up over 9% nationally in 2023 — are pushing more tenants into arrears, feeding section 8 (fault-based) notices alongside the continued use of no-fault evictions.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-notices', label: 'Eviction notices' },
          { id: 'sec-orders', label: 'Court orders' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Section 21 notices (2023)" value="98,000" unit="notices" direction="up" polarity="up-is-bad" changeText={<>Up 35% since 2019<Cite nums={1} /></>} sparklineData={[52, 58, 61, 67, 72, 34, 28, 65, 78, 89, 98]} href="#sec-notices" />
          <MetricCard label="Possession orders granted" value="71,000" unit="orders" direction="up" polarity="up-is-bad" changeText={<>Highest since 2015<Cite nums={1} /></>} sparklineData={[55, 58, 62, 66, 70, 22, 18, 52, 61, 68, 71]} href="#sec-orders" />
          <MetricCard label="Bailiff evictions executed" value="24,000" unit="evictions" direction="up" polarity="up-is-bad" changeText={<>Rising each quarter<Cite nums={1} /></>} sparklineData={[18, 19, 20, 21, 22, 8, 7, 16, 20, 22, 24]} href="#sec-orders" />
        </div>

        <ScrollReveal>
          <section id="sec-notices" className="mb-12">
            <LineChart title="Landlord eviction notices served, England and Wales, 2015–2024" subtitle="Annual notices issued by type, thousands." series={chart1Series} annotations={annotations} yLabel="Notices (000s)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-orders" className="mb-12">
            <LineChart title="Court possession orders and bailiff evictions, 2015–2024" subtitle="Orders granted by courts and evictions physically executed by bailiffs, thousands." series={chart2Series} annotations={[]} yLabel="Cases (000s)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Renters Reform Bill" value="2024" unit="Act" description={<>The Renters (Reform) Act 2024 finally abolished Section 21 no-fault evictions, though implementation timelines remain subject to court reforms.<Cite nums={1} /></>} source="Source: Ministry of Justice, Landlord possession statistics." />
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
