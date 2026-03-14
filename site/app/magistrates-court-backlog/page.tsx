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
  { num: 1, name: 'Ministry of Justice', dataset: 'Criminal Court Statistics Quarterly', url: 'https://www.gov.uk/government/collections/criminal-court-statistics', date: '2024' },
  { num: 2, name: 'Ministry of Justice', dataset: 'Court Statistics Quarterly', url: 'https://www.gov.uk/government/collections/court-statistics-quarterly', date: '2024' },
  { num: 3, name: 'National Audit Office', dataset: 'Reducing the Backlog in Crown and Magistrates Courts', url: 'https://www.nao.org.uk/reports/reducing-the-backlog-in-crown-and-magistrates-courts/', date: '2023' },
];

interface DataPoint {
  year: number;
  outstandingCases: number;
  avgWaitWeeks: number;
  casesReceived: number;
  casesDisposed: number;
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

export default function MagistratesCourtBacklogPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/magistrates-court-backlog/magistrates_court_backlog.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'outstandingCases', label: 'Outstanding cases', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.outstandingCases })) },
        { id: 'casesReceived', label: 'Cases received', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.casesReceived })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgWaitWeeks', label: 'Average wait (weeks)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgWaitWeeks })) },
        { id: 'casesDisposed', label: 'Cases disposed', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.casesDisposed })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19 closures' },
    { date: new Date(2022, 5, 1), label: 'Backlog reduction drive begins' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Big Is the Magistrates' Court Backlog?"
          finding={<>There were over 370,000 outstanding cases in magistrates&apos; courts in England and Wales at the end of 2024.<Cite nums={1} /> The average wait from charge to completion has grown to nearly 36 weeks — the longest on record.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Magistrates&apos; courts handle around 95% of all criminal cases in England and Wales, from minor motoring offences to assault and fraud. The pandemic closed or reduced capacity in many courts from March 2020, and despite a concerted effort to increase sitting days since 2021, the outstanding caseload has never returned to pre-pandemic levels.<Cite nums={1} /> Each case sitting in the backlog represents a real person — victim, defendant or witness — whose life is on hold.<Cite nums={2} /></p>
            <p>The government launched a recovery programme in 2022 including Nightingale courts and extended sitting hours, but the disposal rate has struggled to keep pace with new demand. Cases involving domestic abuse and sexual offences are disproportionately affected, with wait times in some areas exceeding 60 weeks.<Cite nums={3} /> Legal aid funding constraints mean fewer solicitors are taking on legally-aided work, adding pressure to already strained court lists.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Caseload' },
          { id: 'sec-chart2', label: 'Wait times' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Outstanding cases" value="373k" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 308k pre-pandemic<Cite nums={1} /></>} sparklineData={[308, 315, 290, 340, 380, 410, 420, 400, 385, 375, 373]} href="#sec-chart1" />
          <MetricCard label="Average wait (weeks)" value="36" unit="wks" direction="up" polarity="up-is-bad" changeText={<>Was 22 weeks in 2019<Cite nums={2} /></>} sparklineData={[22, 23, 25, 35, 38, 40, 38, 37, 36, 36, 36]} href="#sec-chart2" />
          <MetricCard label="Cases received annually" value="1.5m" unit="" direction="flat" polarity="up-is-bad" changeText={<>Broadly stable year-on-year<Cite nums={3} /></>} sparklineData={[1.6, 1.5, 1.3, 1.2, 1.4, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5]} href="#sec-chart1" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Magistrates' court caseload, 2015–2024" subtitle="Outstanding cases and cases received annually, England and Wales" series={chart1Series} annotations={annotations} yLabel="Cases" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Average wait from charge to completion, 2015–2024" subtitle="Weeks, magistrates' courts, England and Wales" series={chart2Series} annotations={[]} yLabel="Weeks" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Nightingale courts" value="45k" unit="extra cases" description={<>Temporary Nightingale courts heard an estimated 45,000 additional cases between 2020 and 2023, helping prevent the backlog from growing even further.<Cite nums={3} /></>} source="Source: Ministry of Justice, Court Statistics." />
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
