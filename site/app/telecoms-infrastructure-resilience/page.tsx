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
  { num: 1, name: 'Ofcom', dataset: 'Connected Nations Report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', date: '2023' },
  { num: 2, name: 'DSIT', dataset: 'UK Gigabit Broadband Rollout Statistics', url: 'https://www.gov.uk/government/collections/broadband-connectivity-statistics', date: '2024' },
  { num: 3, name: 'Ofcom', dataset: 'Mobile and Broadband Checker Coverage Data', url: 'https://checker.ofcom.org.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  gigabitCoverage: number;
  outdoorMobileCoverage: number;
  networkOutages: number;
  fullFibrePremises: number;
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

export default function TelecomsInfrastructureResiliencePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/telecoms-infrastructure-resilience/telecoms_infrastructure_resilience.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'gigabitCoverage', label: 'Gigabit-capable coverage (% premises)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.gigabitCoverage })) },
        { id: 'fullFibrePremises', label: 'Full fibre (FTTP) coverage (% premises)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fullFibrePremises })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'outdoorMobileCoverage', label: '4G outdoor coverage (% geographic area)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.outdoorMobileCoverage })) },
        { id: 'networkOutages', label: 'Major network outages (count)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.networkOutages })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Project Gigabit launched' },
    { date: new Date(2022, 5, 1), label: 'Shared Rural Network milestone' },
  ];

  return (
    <>
      <TopicNav topic="Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital"
          question="How Resilient Is UK Telecoms Infrastructure?"
          finding={<>Gigabit-capable broadband now reaches 76% of UK premises, up from just 9% in 2019, but 1.5 million homes remain unable to access decent broadband speeds.<Cite nums={1} /> Rural areas and network resilience during outages remain significant concerns.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has made rapid progress in rolling out gigabit-capable broadband infrastructure, with coverage rising from 9% of premises in 2019 to 76% by the end of 2023, driven by commercial investment from BT Openreach and a growing number of alternative network providers (altnets).<Cite nums={1} /> The government's Project Gigabit programme targets 85% coverage by 2025, with £5bn allocated to subsidise rollout in hard-to-reach areas. Full-fibre to the premises (FTTP), the most resilient technology, now reaches 57% of UK homes.</p>
            <p>Despite headline progress, 1.5 million premises — concentrated in rural and remote areas — still cannot access the government's 'decent broadband' threshold of 10 Mbps download speed.<Cite nums={2} /> Mobile connectivity gaps persist: while 4G outdoor coverage reaches 92% of the UK's geographic area, indoor 4G coverage reaches only 77%, and 'not spots' affect around 3% of premises for all four major operators combined.<Cite nums={3} /> High-profile network outages, including the O2 outage affecting 32 million customers in 2018, have raised questions about the resilience of shared infrastructure.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-broadband', label: 'Broadband rollout' },
          { id: 'sec-mobile', label: 'Mobile coverage' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Gigabit broadband coverage" value="76" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 9% in 2019<Cite nums={1} /></>} sparklineData={[9, 15, 22, 34, 48, 57, 63, 68, 72, 74, 76]} href="#sec-broadband" />
          <MetricCard label="Premises without decent broadband" value="1.5" unit="million" direction="down" polarity="up-is-bad" changeText={<>Down from 2.4m in 2019<Cite nums={2} /></>} sparklineData={[2.4, 2.2, 2.0, 1.9, 1.8, 1.7, 1.7, 1.6, 1.6, 1.5, 1.5]} href="#sec-broadband" />
          <MetricCard label="4G outdoor geographic coverage" value="92" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 85% in 2019<Cite nums={3} /></>} sparklineData={[85, 86, 87, 88, 89, 89, 90, 90, 91, 91, 92]} href="#sec-mobile" />
        </div>

        <ScrollReveal>
          <section id="sec-broadband" className="mb-12">
            <LineChart title="UK gigabit and full-fibre broadband coverage, 2019–2024" subtitle="Percentage of premises with gigabit-capable and FTTP connections, UK." series={chart1Series} annotations={annotations} yLabel="% premises" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-mobile" className="mb-12">
            <LineChart title="Mobile coverage and network reliability, 2019–2024" subtitle="4G outdoor geographic coverage (%) and major network outage events, UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Project Gigabit target" value="85" unit="% by 2025" description={<>The government's Project Gigabit programme has committed £5bn to subsidise gigabit broadband rollout in rural and hard-to-reach areas, with a target of 85% national coverage by 2025.<Cite nums={2} /></>} source="Source: DSIT, Project Gigabit programme, 2024." />
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
