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
  { num: 1, name: 'DESNZ', dataset: 'Energy Trends — renewable capacity and generation', url: 'https://www.gov.uk/government/statistics/energy-trends-section-6-renewables', date: '2024' },
  { num: 2, name: 'RenewableUK', dataset: 'Wind energy statistics and planning data', url: 'https://www.renewableuk.com/page/UKWEDhome', date: '2024' },
  { num: 3, name: 'House of Commons Library', dataset: 'Onshore wind policy in England', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-9366/', date: '2024' },
];

interface DataPoint {
  year: number;
  englandOnshoreCapacityGW: number;
  planningApprovedMW: number;
  planningRefusedMW: number;
  scotlandCapacityGW: number;
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

export default function OnshoreWindBlockedPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/onshore-wind-blocked/onshore_wind_blocked.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'englandOnshoreCapacityGW', label: 'England onshore wind capacity (GW)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.englandOnshoreCapacityGW })) },
        { id: 'scotlandCapacityGW', label: 'Scotland onshore wind capacity (GW)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.scotlandCapacityGW })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'planningApprovedMW', label: 'England onshore wind consented (MW/yr)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.planningApprovedMW })) },
        { id: 'planningRefusedMW', label: 'England onshore wind refused (MW/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.planningRefusedMW })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: 'England de facto ban' },
    { date: new Date(2023, 5, 1), label: 'Planning rules relaxed' },
  ];

  return (
    <>
      <TopicNav topic="Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="How Much Wind Energy Has England Blocked?"
          finding={<>England had a de facto ban on new onshore wind from 2015 to 2023 — the only part of the UK to block the cheapest form of new electricity generation, while Scotland continued to build freely.<Cite nums={1} /> The planning rule change in 2023 has seen applications resume, but the pipeline remains small compared to what Scotland has built over the same period.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2015, the Conservative government — responding to backbench pressure from MPs representing rural English constituencies — changed planning policy to give local residents an effective veto over onshore wind. The policy required sites to have community support and removed onshore wind from the contracts for difference (CfD) subsidy scheme. The result was almost no new onshore wind built in England from 2016 to 2023, while Scotland — which uses its own planning system — added over 5 GW in the same period. England's onshore wind capacity remains stuck at around 2.5 GW.<Cite nums={[1, 2]} /></p>
            <p>The Conservatives reversed the policy in late 2023 under Rishi Sunak, and Labour has further liberalised planning for onshore wind. Applications have begun to increase, but the grid connection queue is now extremely long — projects approved today may not connect until 2030. Onshore wind at scale in England remains a distant prospect. The House of Commons Library estimates that the effective ban cost England around 10 GW of potential capacity — equivalent to taking around 2 million homes off fossil fuels for heating and transport.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-divergence', label: 'England vs Scotland' },
          { id: 'sec-planning', label: 'Planning decisions' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="England onshore wind capacity (2023)" value="2.5 GW" unit="" direction="flat" polarity="up-is-good" changeText={<>Virtually unchanged since 2016<Cite nums={1} /></>} sparklineData={[1.8, 2.0, 2.2, 2.3, 2.4, 2.45, 2.47, 2.48, 2.49, 2.5, 2.5]} href="#sec-divergence" />
          <MetricCard label="Scotland onshore wind capacity (2023)" value="8.5 GW" unit="" direction="up" polarity="up-is-good" changeText={<>Added 5 GW while England was blocked<Cite nums={1} /></>} sparklineData={[3.2, 3.8, 4.5, 5.2, 5.8, 6.4, 7.0, 7.5, 8.0, 8.3, 8.5]} href="#sec-divergence" />
          <MetricCard label="Estimated lost capacity" value="10 GW" unit="" direction="flat" polarity="up-is-bad" changeText={<>Cost of 8-year de facto ban<Cite nums={3} /></>} sparklineData={[0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8.5, 10]} href="#sec-planning" />
        </div>

        <ScrollReveal>
          <section id="sec-divergence" className="mb-12">
            <LineChart title="Onshore wind capacity: England vs Scotland, 2010–2023" subtitle="Installed onshore wind capacity in GW, showing divergence after England's 2015 policy change." series={chart1Series} annotations={annotations} yLabel="GW" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-planning" className="mb-12">
            <LineChart title="Onshore wind planning consents and refusals in England, 2010–2023" subtitle="Capacity consented and refused per year (MW). Near-zero consents 2016–2022 reflect the de facto ban." series={chart2Series} annotations={[]} yLabel="MW" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Cost of onshore wind" value="£50/MWh" unit="or below" description={<>New onshore wind is now the cheapest form of electricity generation in the UK at around £50/MWh or below — cheaper than gas, nuclear and offshore wind. The 8-year English block cost consumers billions in higher energy bills.<Cite nums={2} /></>} source="Source: DESNZ / RenewableUK." />
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
