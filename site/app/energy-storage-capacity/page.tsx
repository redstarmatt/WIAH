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
  { num: 1, name: 'NESO', dataset: 'National Energy System Operator — Capacity Market and Storage', url: 'https://www.nationalgrideso.com/data-portal/capacity-market', date: '2024' },
  { num: 2, name: 'DESNZ', dataset: 'UK Energy Storage Strategy', url: 'https://www.gov.uk/government/publications/uk-energy-storage-strategy', date: '2023' },
  { num: 3, name: 'CCC', dataset: 'Sixth Carbon Budget — Flexibility and Storage', url: 'https://www.theccc.org.uk/publication/sixth-carbon-budget/', date: '2024' },
];

interface DataPoint {
  year: number;
  batteryStorageGW: number;
  pumpedHydroGW: number;
  gridCurtailment: number;
  storageMarketValue: number;
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

export default function EnergyStorageCapacityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/energy-storage-capacity/energy_storage_capacity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'batteryStorageGW', label: 'Battery storage capacity (GW)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.batteryStorageGW })) },
        { id: 'pumpedHydroGW', label: 'Pumped hydro capacity (GW)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pumpedHydroGW })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'gridCurtailment', label: 'Renewable energy curtailment (TWh/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.gridCurtailment })) },
        { id: 'storageMarketValue', label: 'Energy storage market value (£bn/yr)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.storageMarketValue })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'Battery storage pipeline expands rapidly' },
    { date: new Date(2023, 5, 1), label: 'Long-duration storage consultation' },
  ];

  return (
    <>
      <TopicNav topic="Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="Does the UK Have Enough Energy Storage?"
          finding={<>The UK has around 4.5 GW of battery storage capacity — the largest in Europe — but the Climate Change Committee warns storage must scale to over 100 GW by 2035 to manage a grid powered largely by wind and solar.<Cite nums={1} /> Wind curtailment — paying generators to switch off — cost consumers over £400m in 2023 alone due to inadequate storage and grid capacity.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Energy storage is the critical enabling technology for a renewables-dominated electricity system. Without the ability to store surplus wind and solar generation during periods of high production and low demand, the UK faces a fundamental mismatch between when electricity is generated and when it is consumed.<Cite nums={3} /> The UK has made significant progress in battery storage: grid-scale battery capacity has grown from near zero in 2017 to over 4.5 GW in 2024, and a pipeline of projects totalling 100+ GW has planning permission — though how many will be built depends heavily on the regulatory and revenue environment.</p>
            <p>However, battery storage is primarily suited to short-duration balancing — typically two to four hours. The UK's grid increasingly needs long-duration storage capable of shifting surplus summer solar generation to winter evenings or managing multi-day weather-driven generation gaps.<Cite nums={2} /> Pumped hydro remains the dominant long-duration technology, but the UK's only projects — at Dinorwig and Cruachan in Wales and Scotland — were built in the 1970s and 80s. New pumped hydro developments face long planning horizons, and alternative long-duration technologies including compressed air, iron-air batteries and power-to-hydrogen are at early commercial stages. Renewable curtailment costs — money paid to wind farms to turn off — exceeded £400m in 2023, a direct consequence of insufficient storage and grid capacity to absorb excess generation.<Cite nums={1} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-capacity', label: 'Storage capacity' },
          { id: 'sec-curtailment', label: 'Curtailment costs' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Battery storage capacity" value="4.5" unit="GW" direction="up" polarity="up-is-good" changeText={<>Up from ~0.1 GW in 2017; largest in Europe<Cite nums={1} /></>} sparklineData={[0.1, 0.3, 0.5, 0.8, 1.2, 1.8, 2.4, 3.0, 3.6, 4.0, 4.5]} href="#sec-capacity" />
          <MetricCard label="Renewable curtailment cost (2023)" value="400" unit="£m" direction="up" polarity="up-is-bad" changeText={<>Record high; up from £140m in 2019<Cite nums={1} /></>} sparklineData={[80, 100, 120, 140, 160, 200, 260, 310, 360, 390, 400]} href="#sec-curtailment" />
          <MetricCard label="Required storage by 2035 (CCC)" value="100+" unit="GW" direction="flat" polarity="up-is-good" changeText={<>Currently 4.5 GW — massive gap to fill<Cite nums={3} /></>} sparklineData={[4, 10, 15, 20, 30, 40, 55, 70, 80, 90, 100]} href="#sec-capacity" />
        </div>

        <ScrollReveal>
          <section id="sec-capacity" className="mb-12">
            <LineChart title="UK energy storage capacity, 2017–2024" subtitle="Battery storage and pumped hydro capacity (GW), UK." series={chart1Series} annotations={annotations} yLabel="GW" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-curtailment" className="mb-12">
            <LineChart title="Renewable curtailment costs and storage market, 2017–2024" subtitle="Annual wind curtailment cost (TWh) and energy storage market value (£bn/yr), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Europe's largest battery" value="Largest" unit="in Europe" description={<>The UK operates Europe's largest portfolio of grid-scale battery storage, with the Minety battery in Wiltshire (99 MW) and multiple similar-scale projects, giving the UK genuine international leadership in short-duration storage deployment.<Cite nums={2} /></>} source="Source: NESO, Capacity Market Annual Report, 2024." />
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
