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
  { num: 1, name: 'DESNZ', dataset: 'Digest of UK Energy Statistics (DUKES)', url: 'https://www.gov.uk/government/collections/digest-of-uk-energy-statistics-dukes', date: '2024' },
  { num: 2, name: 'Nuclear Decommissioning Authority', dataset: 'NDA Annual Report', url: 'https://www.gov.uk/government/organisations/nuclear-decommissioning-authority', date: '2024' },
  { num: 3, name: 'House of Commons Library', dataset: 'Nuclear energy briefing', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-8705/', date: '2024' },
];

interface DataPoint {
  year: number;
  nuclearSharePct: number;
  nuclearOutputTWh: number;
  reactorsOperational: number;
  loadFactorPct: number;
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

export default function NuclearPowerOutputPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/nuclear-power-output/nuclear_power_output.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'nuclearSharePct', label: 'Nuclear share of UK electricity (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nuclearSharePct })) },
        { id: 'nuclearOutputTWh', label: 'Nuclear output (TWh)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nuclearOutputTWh })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'reactorsOperational', label: 'Operational reactors', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.reactorsOperational })) },
        { id: 'loadFactorPct', label: 'Fleet load factor (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.loadFactorPct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: 'Hinkley Point B closes' },
    { date: new Date(2035, 5, 1), label: 'Hinkley C target commissioning' },
  ];

  return (
    <>
      <TopicNav topic="Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="What Share of UK Electricity Comes From Nuclear?"
          finding={<>Nuclear power provided around 15% of UK electricity in 2023 — down from a peak of 28% in 1997 — as ageing reactors are retired faster than new capacity is built.<Cite nums={1} /> The closure programme means the UK could have almost no nuclear capacity by the late 2020s unless Hinkley Point C and proposed new sites are delivered on schedule — a prospect that seems unlikely.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK once led the world in civil nuclear power — Calder Hall in Cumbria was the world's first commercial nuclear power station when it opened in 1956. At its peak in the 1990s, the UK had 15 operational reactors providing over a quarter of the country's electricity. Since then, the fleet has aged without significant replacement. By the end of 2023, only 5 reactors remained operational across 3 sites, with the Advanced Gas-cooled Reactors at Hinkley Point B and Hunterston B having closed.<Cite nums={[1, 2]} /></p>
            <p>Hinkley Point C — the first new nuclear power station to be built in Britain since Sizewell B opened in 1995 — was given the go-ahead in 2016. EDF's latest estimates put its first unit commissioning date at 2031 at the earliest, at a cost of over £33 billion. By the time it opens, the UK could have minimal nuclear capacity, creating a significant gap in low-carbon, despatchable baseload generation. The government has also backed small modular reactors (SMRs), with Rolls-Royce aiming to have a first unit operational by the early 2030s.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-output', label: 'Output & share' },
          { id: 'sec-fleet', label: 'Fleet status' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Nuclear share of electricity (2023)" value="15%" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 28% in 1997<Cite nums={1} /></>} sparklineData={[25, 23, 20, 19, 18, 17, 18, 17, 16, 15, 15]} href="#sec-output" />
          <MetricCard label="Operational reactors (2024)" value="5" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 15 in the 1990s<Cite nums={2} /></>} sparklineData={[14, 13, 12, 11, 10, 9, 8, 7, 6, 6, 5]} href="#sec-fleet" />
          <MetricCard label="Hinkley C projected cost" value="£33bn+" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from £18bn 2016 estimate<Cite nums={3} /></>} sparklineData={[18, 20, 22, 24, 26, 27, 28, 29, 30, 31, 33]} href="#sec-fleet" />
        </div>

        <ScrollReveal>
          <section id="sec-output" className="mb-12">
            <LineChart title="Nuclear share of UK electricity generation and output, 1990–2023" subtitle="Nuclear as % of total electricity generation; output in TWh." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-fleet" className="mb-12">
            <LineChart title="UK operational reactors and fleet load factor, 1990–2023" subtitle="Number of operational reactors; fleet-wide load factor (%)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Sizewell C" value="3.2 GW" unit="proposed capacity" description={<>Sizewell C in Suffolk, if approved and built, would generate around 3.2 GW — enough for around 6 million homes. The government took a 50% stake in the project in 2024 to help secure financing.<Cite nums={3} /></>} source="Source: House of Commons Library nuclear briefing." />
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
