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
  { num: 1, name: 'Planning Inspectorate', dataset: 'Planning appeal statistics', url: 'https://www.gov.uk/government/collections/planning-inspectorate-statistical-release', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Live tables on planning application statistics', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-planning-application-statistics', date: '2024' },
  { num: 3, name: 'House of Commons Library', dataset: 'Planning and housing supply briefing', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-7671/', date: '2024' },
];

interface DataPoint {
  year: number;
  appealSuccessRate: number;
  totalAppeals: number;
  costAwardsAgainstCouncils: number;
  medianDecisionWeeks: number;
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

export default function PlanningAppealSuccessRatesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/planning-appeal-success-rates/planning_appeal_success_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'appealSuccessRate', label: 'Developer appeal success rate (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.appealSuccessRate })) },
        { id: 'totalAppeals', label: 'Total appeals lodged (00s)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.totalAppeals })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'costAwardsAgainstCouncils', label: 'Cost awards against councils', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.costAwardsAgainstCouncils })) },
        { id: 'medianDecisionWeeks', label: 'Median appeal decision time (weeks)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.medianDecisionWeeks })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid backlogs begin' },
    { date: new Date(2023, 5, 1), label: 'NPPF revised' },
  ];

  return (
    <>
      <TopicNav topic="Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Are Developers Winning Planning Appeals?"
          finding={<>Developers win around 44% of all planning appeals in England — and when they do win, councils often face cost awards that drain local planning budgets.<Cite nums={1} /> The Planning Inspectorate's backlog has pushed median decision times above 40 weeks, delaying both consented and refused schemes.<Cite nums={[2, 3]} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When a local authority refuses planning permission, developers have a right to appeal to the Planning Inspectorate — an independent government body. Historically, roughly 30–35% of appeals succeeded. That figure has crept up, reaching over 44% in some recent years, raising concerns that the planning system is systematically tilted toward development interests over community objections. When councils refuse in ways inspectors find unreasonable, they can be ordered to pay the developer's legal costs — a further financial deterrent to refusal.<Cite nums={1} /></p>
            <p>The backlog at the Planning Inspectorate has worsened sharply since the pandemic. By 2024, median appeal decision times had risen to over 45 weeks for written representation cases — the most common type. Householder appeals, involving extensions and smaller works, faced waits of over 30 weeks. This delay costs developers money and discourages smaller housebuilders from challenging unfair refusals, creating an uneven system in which well-resourced large developers are best placed to wait.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-success', label: 'Appeal outcomes' },
          { id: 'sec-costs', label: 'Cost awards & delays' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Developer appeal success rate" value="44%" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from ~30% a decade ago<Cite nums={1} /></>} sparklineData={[30, 31, 32, 33, 34, 36, 38, 40, 42, 43, 44]} href="#sec-success" />
          <MetricCard label="Median appeal decision time" value="45 weeks" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 28 weeks in 2019<Cite nums={1} /></>} sparklineData={[28, 29, 30, 31, 33, 36, 40, 42, 44, 45, 45]} href="#sec-costs" />
          <MetricCard label="Cost awards against councils (2023)" value="620" unit="" direction="up" polarity="up-is-bad" changeText={<>Financial deterrent to refusal<Cite nums={1} /></>} sparklineData={[380, 390, 410, 430, 460, 480, 500, 530, 570, 600, 620]} href="#sec-costs" />
        </div>

        <ScrollReveal>
          <section id="sec-success" className="mb-12">
            <LineChart title="Planning appeal success rates and volumes, England, 2012–2024" subtitle="Developer appeal success rate (%); total major appeals lodged (00s)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-costs" className="mb-12">
            <LineChart title="Cost awards against councils and appeal decision times, 2012–2024" subtitle="Annual cost awards against local planning authorities; median decision time in weeks." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Planning and Infrastructure Bill" value="2025" unit="" description={<>The Planning and Infrastructure Bill, introduced in 2025, proposes to streamline the appeals process and reduce the scope for repeated challenge by large developers, though campaigners argue it focuses more on boosting housing numbers than community voice.<Cite nums={3} /></>} source="Source: House of Commons Library, Planning briefings." />
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
