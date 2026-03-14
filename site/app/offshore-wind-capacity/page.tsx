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
  { num: 1, name: 'DESNZ', dataset: 'Renewable electricity capacity and generation statistics', url: 'https://www.gov.uk/government/statistics/renewable-electricity-capacity-and-generation', date: '2024' },
  { num: 2, name: 'WindEurope / RenewableUK', dataset: 'UK wind energy statistics', url: 'https://www.renewableuk.com/page/UKWEDhome', date: '2024' },
  { num: 3, name: 'Crown Estate', dataset: 'Offshore wind leasing rounds', url: 'https://www.thecrownestate.co.uk/energy-minerals-and-infrastructure/offshore-wind/', date: '2024' },
];

interface DataPoint {
  year: number;
  installedCapacityGW: number;
  generationTWh: number;
  offshoreSharePct: number;
  costPoundsPerMWh: number;
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

export default function OffshoreWindCapacityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/offshore-wind-capacity/offshore_wind_capacity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'installedCapacityGW', label: 'Installed offshore wind capacity (GW)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.installedCapacityGW })) },
        { id: 'generationTWh', label: 'Annual offshore wind generation (TWh)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.generationTWh })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'offshoreSharePct', label: 'Offshore wind share of UK electricity (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.offshoreSharePct })) },
        { id: 'costPoundsPerMWh', label: 'Strike price (£/MWh, 2012 prices)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.costPoundsPerMWh })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'CfD Allocation Round 4' },
    { date: new Date(2023, 5, 1), label: 'Round 5 — no wind bids' },
  ];

  return (
    <>
      <TopicNav topic="Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="How Fast Is UK Offshore Wind Growing?"
          finding={<>The UK has more offshore wind capacity than any other country — around 14.7 GW installed by end of 2023 — and offshore wind now provides around 14% of all UK electricity.<Cite nums={1} /> However the 2023 CfD Allocation Round 5 failed to attract any offshore wind bids due to cost cap problems, revealing a potential slowdown in the pipeline needed to hit the 50 GW by 2030 target.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's offshore wind story is one of the most remarkable industrial transformations in modern British history. In 2010, the UK had around 1.3 GW of offshore wind. By the end of 2023 it had 14.7 GW — the largest offshore wind fleet in the world — providing enough electricity for around 16 million homes. The cost of offshore wind has fallen from around £155/MWh in early CfD contracts to an expected floor below £50/MWh in recent rounds, making it among the cheapest sources of new electricity generation in the UK.<Cite nums={[1, 2]} /></p>
            <p>But the government's target of 50 GW by 2030 requires adding around 35 GW in seven years — an installation rate that has never been achieved anywhere in the world. Allocation Round 5 (AR5) in 2023 attracted no offshore wind bids because the government's strike price cap was set too low to cover the costs of steel, cables and installation vessels which had all risen sharply with post-pandemic inflation. The government raised the cap for AR6 and received bids, but supply chain constraints and grid connection delays mean the 2030 target looks highly ambitious.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-capacity', label: 'Capacity growth' },
          { id: 'sec-share', label: 'Share & cost' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Offshore wind capacity (2023)" value="14.7 GW" unit="" direction="up" polarity="up-is-good" changeText={<>Largest fleet in the world<Cite nums={1} /></>} sparklineData={[1.3, 2.0, 3.5, 5.0, 7.0, 8.5, 10.0, 11.5, 13.0, 14.0, 14.7]} href="#sec-capacity" />
          <MetricCard label="Offshore wind share of electricity" value="14%" unit="" direction="up" polarity="up-is-good" changeText={<>Up from under 1% in 2010<Cite nums={1} /></>} sparklineData={[0.5, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14]} href="#sec-share" />
          <MetricCard label="Cost per MWh (2023 CfD)" value="~£60" unit="/MWh" direction="down" polarity="up-is-bad" changeText={<>Down from £155 in 2014<Cite nums={2} /></>} sparklineData={[155, 140, 120, 100, 80, 65, 58, 52, 48, 55, 60]} href="#sec-share" />
        </div>

        <ScrollReveal>
          <section id="sec-capacity" className="mb-12">
            <LineChart title="UK offshore wind installed capacity and annual generation, 2010–2023" subtitle="Installed capacity in GW; annual generation in TWh." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-share" className="mb-12">
            <LineChart title="Offshore wind share of electricity and CfD strike price, 2010–2023" subtitle="Offshore wind as % of UK electricity; CfD strike price in £/MWh (2012 prices)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Dogger Bank" value="3.6 GW" unit="when complete" description={<>Dogger Bank, located off the Yorkshire coast, will be the world's largest offshore wind farm at 3.6 GW — enough for around 6 million homes. Its first turbines began generating in 2023.<Cite nums={3} /></>} source="Source: Crown Estate / RenewableUK." />
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
