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
  { num: 1, name: 'Ministry of Justice', dataset: 'Tribunal statistics quarterly', url: 'https://www.gov.uk/government/collections/tribunal-statistics', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'Immigration statistics — asylum decisions', url: 'https://www.gov.uk/government/collections/immigration-statistics-data-tables', date: '2024' },
  { num: 3, name: 'Refugee Council', dataset: 'Asylum backlog briefing', url: 'https://www.refugeecouncil.org.uk/latest/news/asylum-backlog/', date: '2024' },
];

interface DataPoint {
  year: number;
  pendingAppeals: number;
  avgWaitWeeks: number;
  allowanceRatePct: number;
  refusedInitialDecisionPct: number;
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

export default function ImmigrationTribunalBacklogPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/immigration-tribunal-backlog/immigration_tribunal_backlog.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'pendingAppeals', label: 'Pending immigration tribunal appeals', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pendingAppeals })) },
        { id: 'avgWaitWeeks', label: 'Average wait for hearing (weeks)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgWaitWeeks })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'allowanceRatePct', label: 'Appeals allowed (overturning Home Office decision) (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.allowanceRatePct })) },
        { id: 'refusedInitialDecisionPct', label: 'Asylum claims refused at initial decision (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.refusedInitialDecisionPct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — hearings suspended' },
    { date: new Date(2022, 5, 1), label: 'Asylum backlog peaks at 100k+' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Long Is the Immigration Tribunal Backlog?"
          finding={<>The First-tier Tribunal (Immigration and Asylum Chamber) had over 350,000 pending appeals by 2024, with average waits of over 18 months for a hearing — a backlog driven by rising asylum claims, an overwhelmed Home Office and chronic tribunal underfunding.<Cite nums={1} /> Around 45% of Home Office asylum decisions that are appealed are overturned by the tribunal.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Immigration and Asylum Chamber handles appeals against Home Office decisions on immigration and asylum. MoJ tribunal statistics show the pending caseload reached around 350,000 in 2024 — the highest ever recorded — after years of rising applications met with a Home Office unable to process them fast enough and a tribunal system without the judges or courtrooms to cope. Appellants typically wait 18 months or more for a hearing, during which time they have no legal status resolution and limited rights to work or access services.<Cite nums={1} /></p>
            <p>The high appeal success rate — around 45% of Home Office refusals are overturned — reflects systematic problems with Home Office initial decision-making quality, rather than weak appellants. The Refugee Council's analysis shows that for some nationalities (Eritrean, Afghan, Iranian) over 70% of refused asylum claims are subsequently overturned on appeal, suggesting initial refusals are often legally flawed. This creates a system where the government refuses, appellants wait years, and taxpayers fund an expensive appeals process that could largely be avoided by better initial decision-making.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-backlog', label: 'Backlog & waits' },
          { id: 'sec-quality', label: 'Decision quality' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Pending tribunal appeals (2024)" value="350,000" unit="" direction="up" polarity="up-is-bad" changeText={<>Record high<Cite nums={1} /></>} sparklineData={[80, 100, 110, 120, 140, 150, 170, 220, 280, 320, 350]} href="#sec-backlog" />
          <MetricCard label="Average wait for hearing" value="18+ months" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 9 months in 2018<Cite nums={1} /></>} sparklineData={[20, 22, 25, 28, 30, 32, 36, 40, 50, 65, 78]} href="#sec-backlog" />
          <MetricCard label="Appeals overturning Home Office" value="45%" unit="" direction="up" polarity="up-is-bad" changeText={<>Reflects poor initial decision quality<Cite nums={2} /></>} sparklineData={[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]} href="#sec-quality" />
        </div>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart title="Immigration tribunal pending appeals and average wait, 2010–2024" subtitle="Pending appeals in the First-tier Immigration and Asylum Chamber; average weeks to hearing." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-quality" className="mb-12">
            <LineChart title="Appeal allowance rate and initial refusal rate, 2010–2023" subtitle="% of appeals allowed (Home Office decision overturned); % of initial asylum claims refused." series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Country guidance cases" value="80+" unit="active guides" description={<>The Upper Tribunal (Immigration) publishes Country Guidance cases — binding precedents on conditions in asylum source countries — which improve consistency and reduce the number of cases needing individual assessment. Over 80 guidance cases are currently active.<Cite nums={1} /></>} source="Source: Upper Tribunal (IAC) country guidance." />
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
