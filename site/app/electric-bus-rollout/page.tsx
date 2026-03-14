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
  { num: 1, name: 'DfT', dataset: 'Zero emission bus regional areas (ZEBRA) statistics', url: 'https://www.gov.uk/government/collections/bus-statistics', date: '2024' },
  { num: 2, name: 'Zemo Partnership', dataset: 'Electric bus market and technology report', url: 'https://www.zemo.org.uk/work-groups/bus-and-coach.htm', date: '2024' },
  { num: 3, name: 'House of Commons Library', dataset: 'Zero emission buses briefing', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-9477/', date: '2024' },
];

interface DataPoint {
  year: number;
  zeroemissionBusesFleet: number;
  zeroemissionSharePct: number;
  zebraFundingSpentBn: number;
  ordersOnOrder: number;
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

export default function ElectricBusRolloutPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/electric-bus-rollout/electric_bus_rollout.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'zeroemissionBusesFleet', label: 'Zero emission buses in UK fleet', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.zeroemissionBusesFleet })) },
        { id: 'zeroemissionSharePct', label: 'Zero emission share of bus fleet (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.zeroemissionSharePct })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'zebraFundingSpentBn', label: 'ZEBRA scheme funding spent (£m)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.zebraFundingSpentBn })) },
        { id: 'ordersOnOrder', label: 'Zero emission buses on order', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ordersOnOrder })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'ZEBRA scheme launched' },
    { date: new Date(2025, 5, 1), label: '4,000 target deadline' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="How Far Has Electric Bus Adoption Got?"
          finding={<>The UK had around 2,100 zero-emission buses in service by early 2024 — less than 6% of the total fleet — and the government's target of 4,000 by 2025 looks undeliverable as ZEBRA funding has been cut and depots lack charging infrastructure.<Cite nums={[1, 2]} /> China, by comparison, has over 450,000 electric buses in service.<Cite nums={3} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Electric buses produce zero exhaust emissions and are quieter than diesel, offering significant benefits for urban air quality and road noise. The UK government's Zero Emission Bus Regional Areas (ZEBRA) scheme, launched in 2021, provided matched funding for operators to buy electric buses and build charging infrastructure. By early 2024, around 2,100 zero-emission buses were in service — a fleet that has grown rapidly from almost none in 2019, but which still represents under 6% of England's 37,000-vehicle bus fleet.<Cite nums={1} /></p>
            <p>Progress has been hampered by the upfront cost premium of electric buses (around £300,000 vs £200,000 for diesel), the cost of depot charging infrastructure, grid connection delays, and uncertainty about government support. The ZEBRA2 scheme was awarded to fewer regions than expected, and some successful bidders have been slow to place orders. Manufacturers face supply chain constraints on battery packs. Zemo Partnership analysis shows that the total cost of ownership of an electric bus is broadly competitive with diesel over its lifetime, but operators cannot absorb the capital cost without subsidy in a deregulated market where network revenues are uncertain.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-fleet', label: 'Fleet growth' },
          { id: 'sec-funding', label: 'Funding & pipeline' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Zero emission buses in service" value="2,100" unit="" direction="up" polarity="up-is-good" changeText={<>Under 6% of total fleet<Cite nums={1} /></>} sparklineData={[50, 100, 200, 400, 600, 900, 1200, 1500, 1800, 1950, 2100]} href="#sec-fleet" />
          <MetricCard label="Government 2025 target" value="4,000" unit="buses" direction="flat" polarity="up-is-good" changeText={<>Target likely to be missed<Cite nums={1} /></>} sparklineData={[500, 800, 1000, 1500, 2000, 2500, 3000, 3500, 3800, 3900, 4000]} href="#sec-fleet" />
          <MetricCard label="Electric bus share of fleet" value="5.7%" unit="" direction="up" polarity="up-is-good" changeText={<>London leads, rural areas lag<Cite nums={2} /></>} sparklineData={[0.1, 0.3, 0.5, 1.0, 1.6, 2.4, 3.2, 4.0, 4.8, 5.3, 5.7]} href="#sec-funding" />
        </div>

        <ScrollReveal>
          <section id="sec-fleet" className="mb-12">
            <LineChart title="Zero emission buses in UK fleet, 2018–2024" subtitle="Total zero emission buses in service; ZE share of total fleet (%)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            <LineChart title="ZEBRA funding spent and zero emission bus orders, 2021–2024" subtitle="Cumulative ZEBRA scheme funding spent (£m); buses on order through funded schemes." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="London's electric fleet" value="700+" unit="electric buses" description={<>Transport for London has over 700 electric buses in its fleet, making it one of the largest electric bus fleets in Europe. TfL's regulated contract model makes it far easier to mandate fleet standards than in England's deregulated market.<Cite nums={2} /></>} source="Source: Transport for London / Zemo Partnership." />
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
