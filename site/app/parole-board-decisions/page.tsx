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
  { num: 1, name: 'Parole Board', dataset: 'Annual Report and Accounts', url: 'https://www.gov.uk/government/organisations/parole-board/about', date: '2024' },
  { num: 2, name: 'Ministry of Justice', dataset: 'Parole Board Rules and Transparency', url: 'https://www.gov.uk/government/publications/parole-board-rules-2019', date: '2024' },
  { num: 3, name: 'Prison Reform Trust', dataset: 'Bromley Briefings Prison Factfile', url: 'https://prisonreformtrust.org.uk/publication/bromley-briefings-prison-factfile/', date: '2024' },
];

interface DataPoint {
  year: number;
  casesHeard: number;
  releaseRate: number;
  avgWaitMonths: number;
  challengeSuccessRate: number;
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

export default function ParoleBoardDecisionsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/parole-board-decisions/parole_board_decisions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'casesHeard', label: 'Cases heard', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.casesHeard })) },
        { id: 'releaseRate', label: 'Release rate (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.releaseRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgWaitMonths', label: 'Average wait (months)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgWaitMonths })) },
        { id: 'challengeSuccessRate', label: 'Challenge success rate (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.challengeSuccessRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'Worboys case triggers transparency debate' },
    { date: new Date(2022, 5, 1), label: 'New Parole Board rules on transparency' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Transparent Are Parole Board Decisions?"
          finding={<>The Parole Board heard over 25,000 cases in 2023–24 but victims and the public still have limited visibility into how decisions are reached.<Cite nums={1} /> Transparency reforms since 2018 have improved access to decision summaries, but challenge mechanisms remain little used.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Parole Board decides whether prisoners serving indeterminate or lengthy sentences are safe to release. Its decisions are high-stakes: wrong calls in either direction mean either a person is kept in jail unnecessarily or a dangerous offender returns to the community. The 2018 controversy over John Worboys — a serial sex offender whose release was blocked only after a legal challenge — triggered a significant public debate about how the board operates and who has the right to scrutinise it.<Cite nums={1} /></p>
            <p>Since 2019, new rules allow victims to request the written reasons for a parole decision, and a reconsideration mechanism was introduced to allow challenges to decisions that appear irrational or procedurally flawed. In 2023–24, around 1,200 reconsideration applications were made, with roughly 16% resulting in a decision being overturned.<Cite nums={[2, 3]} /> Critics argue the process remains opaque and that legal aid barriers prevent many prisoners from being adequately represented at hearings.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Decisions' },
          { id: 'sec-chart2', label: 'Transparency' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Cases heard (2023–24)" value="25,400" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 18,500 in 2019<Cite nums={1} /></>} sparklineData={[18500, 19000, 16000, 20000, 22000, 24000, 25000, 25200, 25300, 25400, 25400]} href="#sec-chart1" />
          <MetricCard label="Release rate" value="28" unit="%" direction="flat" polarity="up-is-good" changeText={<>Broadly stable over five years<Cite nums={1} /></>} sparklineData={[26, 27, 26, 27, 28, 29, 28, 28, 28, 28, 28]} href="#sec-chart1" />
          <MetricCard label="Avg wait for hearing" value="10" unit="months" direction="up" polarity="up-is-bad" changeText={<>Was 8 months in 2019<Cite nums={2} /></>} sparklineData={[8, 8, 9, 12, 13, 11, 10, 10, 10, 10, 10]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Parole Board cases heard and release rate, 2015–2024" subtitle="Total cases heard and percentage resulting in release, England and Wales" series={chart1Series} annotations={annotations} yLabel="Cases / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Wait times and reconsideration outcomes, 2015–2024" subtitle="Average months to hearing and challenge success rate (%)" series={chart2Series} annotations={[]} yLabel="Months / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Victim contact scheme" value="60%" unit="take-up" description={<>Around 60% of eligible victims now opt into the Victim Contact Scheme, which gives them the right to make representations to the Parole Board before release decisions.<Cite nums={2} /></>} source="Source: Ministry of Justice, Victim Contact Scheme statistics." />
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
