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
  { num: 1, name: 'National Highways', dataset: 'Smart motorway safety data', url: 'https://nationalhighways.co.uk/road-safety/smart-motorways/', date: '2023' },
  { num: 2, name: 'House of Commons Transport Committee', dataset: 'Smart motorways inquiry', url: 'https://committees.parliament.uk/work/367/smart-motorways/', date: '2022' },
  { num: 3, name: 'DfT', dataset: 'Smart motorway safety evidence stocktake', url: 'https://www.gov.uk/government/publications/smart-motorway-safety-evidence-stocktake-and-action-plan', date: '2023' },
];

interface DataPoint {
  year: number;
  alwaysRunSmKm: number;
  stoppedVehicleDetectionRatePct: number;
  rearEndCollisionsPerBnMiles: number;
  refugeAreasPerKm: number;
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

export default function MotorwaySmartSafetyPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/motorway-smart-safety/motorway_smart_safety.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'alwaysRunSmKm', label: 'All-lane running smart motorway (km)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.alwaysRunSmKm })) },
        { id: 'stoppedVehicleDetectionRatePct', label: 'Stopped vehicle detection rate (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.stoppedVehicleDetectionRatePct })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'rearEndCollisionsPerBnMiles', label: 'Near-side lane collisions per bn miles', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rearEndCollisionsPerBnMiles })) },
        { id: 'refugeAreasPerKm', label: 'Emergency refuge areas per km', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.refugeAreasPerKm })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'Commons inquiry — safety concern' },
    { date: new Date(2023, 5, 1), label: 'New ALR paused' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Are Smart Motorways Actually Dangerous?"
          finding={<>The parliamentary Transport Committee found in 2022 that all-lane running (ALR) smart motorways — which permanently remove the hard shoulder — have a significantly higher rate of near-side collisions than conventional motorways, and that stopped vehicle detection technology was not deployed or reliable enough to mitigate the risk.<Cite nums={1} /> No new ALR schemes are being built, but 400 km already exist.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Smart motorways were introduced on the grounds that using the hard shoulder as a running lane would increase capacity without costly widening. Three types exist: static hard shoulder running (HSR), dynamic HSR (where the hard shoulder is opened at peak times only), and all-lane running (ALR), where there is no hard shoulder at all — just emergency refuge areas every 1.5–2.5 km. It is the ALR type that has been most controversial. When a vehicle breaks down on an ALR motorway, it is in a live lane until it can be detected and the lane closed — a process that National Highways data shows can take several minutes.<Cite nums={1} /></p>
            <p>The House of Commons Transport Committee's 2022 inquiry found that the stopped vehicle detection technology on many ALR schemes was not working reliably, that CCTV coverage was incomplete, and that the 20-minute intervention standard was being breached regularly. National Highways accepted that stopped vehicles were not always detected quickly enough. In March 2023, the government announced no new ALR schemes would be built and launched a review of existing schemes. But converting 400 km of existing ALR back to conventional motorway — a suggestion backed by several MPs — would cost an estimated £1 billion and has been ruled out.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-network', label: 'ALR network' },
          { id: 'sec-collisions', label: 'Collision data' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="All-lane running motorway (km)" value="400 km" unit="" direction="flat" polarity="up-is-bad" changeText={<>No new ALR being built<Cite nums={3} /></>} sparklineData={[50, 100, 150, 200, 250, 300, 340, 370, 390, 400, 400]} href="#sec-network" />
          <MetricCard label="Stopped vehicle detection rate" value="~85%" unit="" direction="up" polarity="up-is-good" changeText={<>Target: 99% — still not met<Cite nums={1} /></>} sparklineData={[55, 60, 65, 70, 72, 74, 76, 79, 82, 84, 85]} href="#sec-network" />
          <MetricCard label="Near-side lane collisions vs conventional" value="+23%" unit="" direction="up" polarity="up-is-bad" changeText={<>Per billion vehicle miles travelled<Cite nums={2} /></>} sparklineData={[0, 5, 8, 10, 12, 15, 18, 20, 21, 22, 23]} href="#sec-collisions" />
        </div>

        <ScrollReveal>
          <section id="sec-network" className="mb-12">
            <LineChart title="All-lane running motorway extent and stopped vehicle detection, 2012–2023" subtitle="ALR network length (km); percentage of stopped vehicles detected within target time." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-collisions" className="mb-12">
            <LineChart title="Near-side lane collisions and refuge area density, 2012–2023" subtitle="Near-side collisions per billion miles; emergency refuge areas per km." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Radar detection upgrade" value="100%" unit="of ALR by 2025" description={<>National Highways has committed to installing radar-based stopped vehicle detection on 100% of all-lane running motorway by 2025, which independently estimates suggest could detect stopped vehicles within 2 minutes rather than 20.<Cite nums={1} /></>} source="Source: National Highways smart motorway action plan." />
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
