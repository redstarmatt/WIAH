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
  { num: 1, name: 'HS2 Ltd', dataset: 'HS2 progress and cost update', url: 'https://www.hs2.org.uk/building-hs2/progress/', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'High Speed 2 — Progress update', url: 'https://www.nao.org.uk/reports/high-speed-two-progress-update/', date: '2023' },
  { num: 3, name: 'House of Commons Library', dataset: 'HS2 Phase 2b cancellation briefing', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-9735/', date: '2024' },
];

interface DataPoint {
  year: number;
  costEstimateBn: number;
  tunnelKmDrilled: number;
  constructionWorkers: number;
  expectedOpeningYear: number;
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

export default function HighSpeedRailProgressPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/high-speed-rail-progress/high_speed_rail_progress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'costEstimateBn', label: 'HS2 cost estimate (£bn, 2019 prices)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.costEstimateBn })) },
        { id: 'tunnelKmDrilled', label: 'Tunnel bored (km)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.tunnelKmDrilled })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'constructionWorkers', label: 'Construction workers employed (000s)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.constructionWorkers })) },
        { id: 'expectedOpeningYear', label: 'Expected opening year (Phase 1)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.expectedOpeningYear })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Full speed ahead confirmed' },
    { date: new Date(2023, 5, 1), label: 'Phase 2b cancelled' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="What Has Actually Been Built of HS2?"
          finding={<>By early 2024, HS2 Phase 1 (London to Birmingham) is under active construction, with over 100 km of tunnel bored and over 30,000 workers employed — but costs have risen from £37bn to over £67bn, Phase 2b to Manchester has been cancelled, and the opening date has slipped to the mid-2030s at the earliest.<Cite nums={[1, 2]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>HS2 — High Speed Two — is the largest infrastructure project in British history, designed to provide a new railway between London and the Midlands and, originally, the North. Phase 1 (London Euston to Birmingham Curzon Street) was approved in 2017 with a budget of £37 billion (in 2019 prices). By 2024, the Phase 1 cost estimate had risen to £67 billion, reflecting inflation, scope changes and construction challenges. The NAO's 2023 progress report found that HS2 Ltd struggled to manage costs and that programme governance had been inadequate for a project of this complexity.<Cite nums={[1, 2]} /></p>
            <p>In October 2023, Prime Minister Rishi Sunak cancelled Phase 2b — the section from Birmingham to Manchester — citing cost overruns and diverting the savings to a "Network North" package of smaller regional rail improvements. Critics argued the cancellations fundamentally undermined the business case for the project and denied the North the connectivity benefits that had been central to the original justification. Phase 1 (London to Birmingham) and Phase 2a (Birmingham to Crewe) remain under construction. The expected opening date for Phase 1 has slipped from 2026 to the mid-2030s.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-costs', label: 'Cost escalation' },
          { id: 'sec-progress', label: 'Construction progress' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Phase 1 cost estimate (2024)" value="£67bn" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from £37bn in 2019<Cite nums={1} /></>} sparklineData={[37, 40, 44, 48, 52, 56, 60, 63, 65, 66, 67]} href="#sec-costs" />
          <MetricCard label="Tunnel bored (early 2024)" value="103 km" unit="" direction="up" polarity="up-is-good" changeText={<>10 tunnel boring machines operating<Cite nums={1} /></>} sparklineData={[0, 0, 5, 15, 30, 45, 60, 75, 88, 97, 103]} href="#sec-progress" />
          <MetricCard label="Expected Phase 1 opening" value="mid-2030s" unit="" direction="up" polarity="up-is-bad" changeText={<>Slipped from original 2026<Cite nums={2} /></>} sparklineData={[2026, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2033, 2035]} href="#sec-costs" />
        </div>

        <ScrollReveal>
          <section id="sec-costs" className="mb-12">
            <LineChart title="HS2 cost estimate and tunnel progress, 2015–2024" subtitle="Phase 1 cost estimate in £bn (2019 prices); cumulative tunnel bored (km)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-progress" className="mb-12">
            <LineChart title="HS2 construction workforce and projected opening year, 2020–2024" subtitle="Construction workers employed (000s); expected Phase 1 opening year." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Jobs and supply chain" value="30,000+" unit="workers" description={<>HS2 Phase 1 employs over 30,000 workers directly and indirectly, and HS2 Ltd reports that 97% of contract value has been awarded to UK businesses, supporting an estimated £6 billion in economic activity in the supply chain.<Cite nums={1} /></>} source="Source: HS2 Ltd progress report." />
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
