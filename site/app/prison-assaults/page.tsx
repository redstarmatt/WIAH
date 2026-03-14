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
  { num: 1, name: 'Ministry of Justice', dataset: 'Safety in Custody Statistics', url: 'https://www.gov.uk/government/collections/safety-in-custody-statistics', date: '2024' },
  { num: 2, name: 'HMPPS', dataset: 'Annual Digest — Prison Assaults', url: 'https://www.gov.uk/government/statistics/hmpps-annual-digest', date: '2024' },
  { num: 3, name: 'Prison Reform Trust', dataset: 'Prison the Facts', url: 'https://prisonreformtrust.org.uk/publication/prison-the-facts/', date: '2024' },
];

interface DataPoint {
  year: number;
  assaultsOnStaff: number;
  assaultsOnPrisoners: number;
  seriousAssaults: number;
  selfHarmIncidents: number;
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

export default function PrisonAssaultsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/prison-assaults/prison_assaults.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'assaultsOnStaff', label: 'Assaults on staff', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.assaultsOnStaff })) },
        { id: 'assaultsOnPrisoners', label: 'Assaults on prisoners', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.assaultsOnPrisoners })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'seriousAssaults', label: 'Serious assaults', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.seriousAssaults })) },
        { id: 'selfHarmIncidents', label: 'Self-harm incidents', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.selfHarmIncidents })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: 'Violence surge linked to synthetic drugs' },
    { date: new Date(2020, 5, 1), label: 'Covid lockdowns; reduced assaults' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Violent Have UK Prisons Become?"
          finding={<>There were over 34,000 assault incidents in prisons in England and Wales in 2023 — including nearly 11,000 on staff.<Cite nums={1} /> Violence levels are significantly higher than a decade ago, driven by overcrowding, synthetic drug prevalence, and staff shortages.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Prison violence in England and Wales reached crisis levels in the mid-2010s, driven largely by the proliferation of synthetic cannabinoids like Spice. These drugs are difficult to detect and cause extreme and unpredictable behaviour. Coupled with a significant reduction in prison officer numbers after the 2010 spending review — which saw around 7,000 frontline posts cut — the result was prisons that felt increasingly unsafe for both staff and those held in them.<Cite nums={1} /></p>
            <p>A Violence Reduction in Prisons programme was launched in 2016 and officer numbers have been partially restored, but assaults remain at historically high levels. Self-harm incidents — a related indicator of prisoner distress — have also risen steeply, reaching a record 62,000 incidents in 2022. Overcrowding compounds every problem: a prison operating above capacity has fewer options to manage difficult prisoners and fewer spaces for rehabilitative activity.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Assaults' },
          { id: 'sec-chart2', label: 'Serious incidents' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Assaults on staff" value="10,900" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 4,000 in 2012<Cite nums={1} /></>} sparklineData={[4000, 5000, 7000, 9500, 9800, 7000, 9000, 10000, 10500, 10800, 10900]} href="#sec-chart1" />
          <MetricCard label="Assaults on prisoners" value="23,500" unit="" direction="up" polarity="up-is-bad" changeText={<>More than doubled since 2012<Cite nums={2} /></>} sparklineData={[11000, 13000, 17000, 21000, 22000, 16000, 20000, 22000, 23000, 23400, 23500]} href="#sec-chart1" />
          <MetricCard label="Self-harm incidents" value="59,000" unit="" direction="up" polarity="up-is-bad" changeText={<>Record highs in recent years<Cite nums={3} /></>} sparklineData={[23000, 30000, 40000, 52000, 62000, 48000, 55000, 60000, 62000, 60000, 59000]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Prison assault incidents, 2012–2023" subtitle="Assaults on staff and on prisoners, England and Wales prisons" series={chart1Series} annotations={annotations} yLabel="Incidents" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Serious assaults and self-harm, 2012–2023" subtitle="Serious assault incidents and self-harm incidents, England and Wales" series={chart2Series} annotations={[]} yLabel="Incidents" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Key worker scheme" value="95%" unit="coverage" description={<>95% of prisons now operate the key worker scheme, giving each prisoner a named officer responsible for their wellbeing — a programme linked to modest reductions in self-harm in pilot sites.<Cite nums={2} /></>} source="Source: HMPPS, Annual Digest." />
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
