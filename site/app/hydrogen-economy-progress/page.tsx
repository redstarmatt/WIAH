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
  { num: 1, name: 'DESNZ', dataset: 'UK Hydrogen Strategy and Progress Reports', url: 'https://www.gov.uk/government/publications/uk-hydrogen-strategy', date: '2024' },
  { num: 2, name: 'CCC', dataset: 'Hydrogen in a Low Carbon Economy', url: 'https://www.theccc.org.uk/publication/hydrogen-in-a-low-carbon-economy/', date: '2024' },
  { num: 3, name: 'HyNet', dataset: 'HyNet North West Project Progress', url: 'https://hynet.co.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  hydrogenCapacityGW: number;
  greenHydrogenShare: number;
  hydrogenInvestment: number;
  projectsInDevelopment: number;
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

export default function HydrogenEconomyProgressPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/hydrogen-economy-progress/hydrogen_economy_progress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'hydrogenCapacityGW', label: 'Low-carbon hydrogen capacity (GW)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.hydrogenCapacityGW })) },
        { id: 'greenHydrogenShare', label: 'Green (electrolytic) hydrogen share (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.greenHydrogenShare })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'hydrogenInvestment', label: 'Private hydrogen investment committed (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.hydrogenInvestment })) },
        { id: 'projectsInDevelopment', label: 'Hydrogen projects in development (count)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.projectsInDevelopment })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'UK Hydrogen Strategy published' },
    { date: new Date(2023, 5, 1), label: 'Hydrogen Business Models allocation round 1' },
  ];

  return (
    <>
      <TopicNav topic="Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="Is the UK's Hydrogen Strategy on Track?"
          finding={<>The UK has targeted 10 GW of low-carbon hydrogen production capacity by 2030, but only a fraction of a GW is currently operational and the first allocation rounds have produced slower-than-expected results.<Cite nums={1} /> The Climate Change Committee warned in 2024 that hydrogen deployment is significantly behind the pace required for net zero.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Hydrogen is expected to play a significant role in decarbonising parts of the UK economy that cannot easily be electrified, including heavy industry, shipping, long-haul freight and potentially heating in dense urban areas.<Cite nums={1} /> The UK government published its Hydrogen Strategy in 2021 and set a target of 10 GW of low-carbon hydrogen production capacity by 2030 — split between green hydrogen (produced by electrolysis powered by renewable electricity) and blue hydrogen (produced from natural gas with carbon capture). Despite significant policy ambition, actual deployed capacity remains minimal: the UK had less than 0.1 GW of operational low-carbon hydrogen production at the end of 2023.</p>
            <p>The government's Hydrogen Business Model — a contract-for-difference-like support mechanism — ran its first allocation round in 2023, awarding contracts to 11 projects totalling around 0.5 GW of electrolytic capacity. This was welcomed as progress but falls well short of the trajectory needed.<Cite nums={2} /> The HyNet project in the North West, which combines blue hydrogen production with CCS, is the most advanced large-scale project, but faces delays. The CCC's 2024 progress report classified hydrogen deployment as one of the key areas falling behind pace, noting that most feasible applications for hydrogen may not materialise until the mid-2030s.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-capacity', label: 'Capacity build-out' },
          { id: 'sec-investment', label: 'Investment & pipeline' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Low-carbon hydrogen capacity (operational)" value="0.1" unit="GW" direction="up" polarity="up-is-good" changeText={<>Target is 10 GW by 2030 — far behind<Cite nums={1} /></>} sparklineData={[0, 0, 0, 0.01, 0.02, 0.04, 0.06, 0.08, 0.09, 0.09, 0.1]} href="#sec-capacity" />
          <MetricCard label="Allocation round 1 contracts awarded" value="0.5" unit="GW" direction="up" polarity="up-is-good" changeText={<>11 projects, electrolytic hydrogen<Cite nums={1} /></>} sparklineData={[0, 0, 0, 0, 0, 0, 0, 0, 0.1, 0.3, 0.5]} href="#sec-capacity" />
          <MetricCard label="Private investment committed" value="4" unit="£bn" direction="up" polarity="up-is-good" changeText={<>Across 100+ projects in development<Cite nums={2} /></>} sparklineData={[0.1, 0.2, 0.4, 0.6, 0.9, 1.3, 1.8, 2.4, 3.0, 3.5, 4.0]} href="#sec-investment" />
        </div>

        <ScrollReveal>
          <section id="sec-capacity" className="mb-12">
            <LineChart title="UK low-carbon hydrogen capacity, 2020–2030 (actual and projected)" subtitle="Operational hydrogen capacity (GW) and green hydrogen share (%), UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-investment" className="mb-12">
            <LineChart title="UK hydrogen investment and project pipeline, 2020–2030" subtitle="Committed private investment (£bn) and projects in development (count), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="HyNet North West" value="2028" unit="expected operational" description={<>HyNet North West, a major industrial hydrogen and CCS cluster in Cheshire and Merseyside, is expected to produce around 1 GW of low-carbon hydrogen and store up to 10 MtCO₂/yr once fully operational, making it one of the largest CCUS and hydrogen projects in Europe.<Cite nums={3} /></>} source="Source: HyNet, Project Progress Update, 2024." />
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
