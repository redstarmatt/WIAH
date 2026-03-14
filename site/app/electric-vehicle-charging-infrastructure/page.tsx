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
  { num: 1, name: 'OZEV / DfT', dataset: 'Electric vehicle charging device statistics', url: 'https://www.gov.uk/government/statistics/electric-vehicle-charging-device-statistics-january-2024', date: '2024' },
  { num: 2, name: 'Zap-Map', dataset: 'UK EV charging network data', url: 'https://www.zap-map.com/statistics/', date: '2024' },
  { num: 3, name: 'Climate Change Committee', dataset: 'EV infrastructure assessment', url: 'https://www.theccc.org.uk/publication/2024-progress-report-to-parliament/', date: '2024' },
];

interface DataPoint {
  year: number;
  publicChargepoints: number;
  rapidChargepoints: number;
  evsPerChargepoint: number;
  chargepointReliabilityPct: number;
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

export default function ElectricVehicleChargingInfrastructurePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/electric-vehicle-charging-infrastructure/electric_vehicle_charging_infrastructure.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'publicChargepoints', label: 'Public chargepoints (000s)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.publicChargepoints })) },
        { id: 'rapidChargepoints', label: 'Rapid/ultra-rapid chargepoints (000s)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rapidChargepoints })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'evsPerChargepoint', label: 'EVs per public chargepoint', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.evsPerChargepoint })) },
        { id: 'chargepointReliabilityPct', label: 'Rapid chargepoint reliability (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.chargepointReliabilityPct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'Public Charge Point Regs' },
    { date: new Date(2030, 5, 1), label: 'ICE car sale ban target' },
  ];

  return (
    <>
      <TopicNav topic="Transport & Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Environment"
          question="Is There Enough EV Charging Infrastructure?"
          finding={<>England had around 64,000 public EV chargepoints by early 2024, but the ratio of electric vehicles to public chargepoints has worsened as car sales outpace installation, and reliability of rapid chargers remains a concern at around 73%.<Cite nums={1} /> The Climate Change Committee says the UK needs 10 times more public chargepoints by 2030 to support EV transition.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK had around 64,000 public charging devices in January 2024, of which roughly 13,000 were rapid or ultra-rapid (50kW+). This sounds substantial until compared to the 1.1 million fully electric cars on UK roads — a ratio of roughly 17 EVs per public chargepoint, up from around 10 in 2020. The OZEV target of one public chargepoint for every ten EVs is already being breached in several regions.<Cite nums={1} /> Geographic distribution is highly uneven: London has a far higher density than rural areas and the north of England.</p>
            <p>Reliability is a persistent concern. A Which? investigation in 2023 found that 1 in 5 rapid charging attempts failed. Official government data on chargepoint uptime shows rapid chargers are available around 73–78% of the time — well below the 99% reliability of a petrol pump. The Public Charge Point Regulations 2023 require 99% reliability for new high-powered public devices from 2024, but legacy networks remain exempt. The CCC's 2024 progress report stated that current installation rates are insufficient to support projected EV uptake, and that the UK risks creating a two-tier system in which only those with home charging can rely on EVs.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-growth', label: 'Chargepoint growth' },
          { id: 'sec-reliability', label: 'Reliability & coverage' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Public chargepoints (Jan 2024)" value="64,000" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 25,000 in 2020<Cite nums={1} /></>} sparklineData={[25, 28, 32, 36, 42, 48, 52, 56, 60, 62, 64]} href="#sec-growth" />
          <MetricCard label="EVs per public chargepoint" value="17" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 10 in 2020 — target is 10<Cite nums={1} /></>} sparklineData={[10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17]} href="#sec-reliability" />
          <MetricCard label="Rapid chargepoint reliability" value="73%" unit="" direction="flat" polarity="up-is-good" changeText={<>Target: 99% under new regs<Cite nums={3} /></>} sparklineData={[75, 74, 73, 72, 71, 72, 73, 73, 73, 73, 73]} href="#sec-reliability" />
        </div>

        <ScrollReveal>
          <section id="sec-growth" className="mb-12">
            <LineChart title="Public EV chargepoints in England, 2018–2024" subtitle="Total public devices and rapid/ultra-rapid devices (50kW+), thousands." series={chart1Series} annotations={annotations} yLabel="Chargepoints (000s)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-reliability" className="mb-12">
            <LineChart title="EVs per chargepoint and rapid charger reliability, 2018–2024" subtitle="Ratio of electric cars to public chargepoints; rapid charger operational uptime (%)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Rapid charging network growth" value="3x" unit="since 2020" description={<>The number of rapid and ultra-rapid chargepoints has tripled since 2020, driven by private investment from networks like Osprey, Gridserve and Pod Point, following the government's 950-site motorway service area commitment.<Cite nums={2} /></>} source="Source: Zap-Map / OZEV statistics." />
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
