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
  { num: 1, name: 'Office of Rail and Road', dataset: 'Rail freight statistics', url: 'https://www.orr.gov.uk/monitoring-regulation/rail/freight', date: '2024' },
  { num: 2, name: 'Network Rail', dataset: 'Freight Network Study', url: 'https://www.networkrail.co.uk/running-the-railway/freight/', date: '2023' },
  { num: 3, name: 'Rail Freight Group', dataset: 'Manifesto for Rail Freight', url: 'https://www.rfg.org.uk/resources/', date: '2024' },
];

interface DataPoint {
  year: number;
  freightTonnesKmBn: number;
  freightTrainsMThousands: number;
  roadSharePct: number;
  railSharePct: number;
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

export default function FreightRailCapacityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/freight-rail-capacity/freight_rail_capacity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'freightTonnesKmBn', label: 'Rail freight (billion tonne-km)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.freightTonnesKmBn })) },
        { id: 'freightTrainsMThousands', label: 'Freight trains run (000s)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.freightTrainsMThousands })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'roadSharePct', label: 'Road share of freight (% tonne-km)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.roadSharePct })) },
        { id: 'railSharePct', label: 'Rail share of freight (% tonne-km)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.railSharePct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: 'Coal decline accelerates' },
    { date: new Date(2020, 5, 1), label: 'Covid supply chain disruption' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Is Britain's Freight Rail Keeping Up with Demand?"
          finding={<>UK rail freight volumes fell sharply after coal traffic ended in the mid-2010s and has only partially recovered through growth in container and intermodal traffic.<Cite nums={1} /> Rail handles around 9% of UK freight tonne-kilometres, well below the EU average of 18%, and capacity on key routes is constrained by the priority given to passenger trains.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Rail freight peaked in Britain in the early 2000s when coal traffic to power stations generated over 50 million tonnes per year. The closure of the last British coal-fired power station in 2024 removed that traffic entirely. Rail freight now depends on containers (goods arriving at ports, heading to inland terminals), construction materials, petroleum and automotive traffic. The Office of Rail and Road data shows around 17–18 billion tonne-kilometres of freight moved by rail in 2022/23, recovering from a Covid dip but still below the 22 billion peak of 2007/08.<Cite nums={1} /></p>
            <p>Network Rail's Freight Network Study identified significant constraints on key routes — particularly the West Coast Main Line and lines serving Felixstowe and Southampton ports. Freight trains take a lower priority than passenger services, making it difficult to guarantee reliable transit times, which undermines the commercial case for rail vs road. The Rail Freight Group argues that a doubling of rail freight's modal share — from 9% to 18% of tonne-kilometres — would remove around 1.7 million HGV journeys per year and reduce freight transport CO₂ by around 16 million tonnes annually.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-volumes', label: 'Freight volumes' },
          { id: 'sec-modal', label: 'Modal share' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Rail freight (2022/23)" value="18bn tonne-km" unit="" direction="up" polarity="up-is-good" changeText={<>Recovering post-Covid and coal loss<Cite nums={1} /></>} sparklineData={[22, 21, 20, 19, 18, 17, 15, 14, 15, 17, 18]} href="#sec-volumes" />
          <MetricCard label="Rail modal share of freight" value="9%" unit="" direction="flat" polarity="up-is-good" changeText={<>EU average is 18%<Cite nums={2} /></>} sparklineData={[11, 11, 10, 10, 9, 9, 8, 8, 8, 9, 9]} href="#sec-modal" />
          <MetricCard label="HGV journeys saveable by 2x rail" value="1.7m" unit="/yr" direction="flat" polarity="up-is-good" changeText={<>If rail hits 18% modal share<Cite nums={3} /></>} sparklineData={[0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.1, 1.2, 1.4, 1.6, 1.7]} href="#sec-modal" />
        </div>

        <ScrollReveal>
          <section id="sec-volumes" className="mb-12">
            <LineChart title="UK rail freight volumes and train services, 2005–2023" subtitle="Rail freight in billion tonne-km; freight train services run (000s)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-modal" className="mb-12">
            <LineChart title="Road vs rail modal share of UK freight, 2005–2023" subtitle="Road and rail as % of total freight tonne-kilometres." series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Intermodal growth" value="+40%" unit="since 2015" description={<>Container and intermodal (road-to-rail) freight has grown by around 40% since 2015, driven by rising HGV costs and port growth at Felixstowe and Southampton — the bright spot in an otherwise flat rail freight picture.<Cite nums={1} /></>} source="Source: ORR rail freight statistics." />
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
