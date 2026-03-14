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
  { num: 1, name: 'Independent Office for Police Conduct', dataset: 'Police complaints statistics', url: 'https://www.policeconduct.gov.uk/research-and-learning/statistics', date: '2024' },
  { num: 2, name: 'IOPC', dataset: 'Annual Report', url: 'https://www.policeconduct.gov.uk/publications/annual-report', date: '2024' },
  { num: 3, name: 'Home Office', dataset: 'Police Workforce, England and Wales', url: 'https://www.gov.uk/government/collections/police-workforce-england-and-wales', date: '2024' },
];

interface DataPoint {
  year: number;
  complaintsReceived: number;
  upheldRate: number;
  avgResolutionDays: number;
  disciplinaryRate: number;
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

export default function PoliceComplaintsOutcomesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/police-complaints-outcomes/police_complaints_outcomes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'complaintsReceived', label: 'Complaints received', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.complaintsReceived })) },
        { id: 'upheldRate', label: 'Upheld rate (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.upheldRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgResolutionDays', label: 'Avg resolution (days)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgResolutionDays })) },
        { id: 'disciplinaryRate', label: 'Disciplinary action rate (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.disciplinaryRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'IOPC reform powers expanded' },
    { date: new Date(2022, 5, 1), label: 'Post-Wayne Couzens review' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="What Happens When You Complain About the Police?"
          finding={<>Over 75,000 complaints were made about police conduct in England and Wales in 2023–24, but fewer than 10% were formally upheld.<Cite nums={1} /> The average time to resolve a complaint is over 180 days — and most complaints result in no disciplinary action.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The police complaints system in England and Wales is managed by the Independent Office for Police Conduct (IOPC), which investigates the most serious cases and oversees how forces handle less serious ones. Complaints can relate to anything from rudeness to excessive force, and the system is meant to give the public a meaningful mechanism for redress. In practice, most complaints are handled locally by the force complained about — a process critics argue lacks independence and frequently results in the complaint being filed without action.<Cite nums={1} /></p>
            <p>The volume of complaints has risen steadily since 2016, partly reflecting greater public awareness following high-profile misconduct cases. The murder of Sarah Everard by serving Metropolitan Police officer Wayne Couzens in 2021 prompted a government review that found systemic failures in how the Met handled prior allegations. Reforms have followed, but data shows that the proportion of complaints leading to disciplinary proceedings has remained stubbornly low — around 3–4%.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Complaint volumes' },
          { id: 'sec-chart2', label: 'Outcomes' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Complaints received" value="75k" unit="" direction="up" polarity="up-is-bad" changeText={<>Up 18% since 2019<Cite nums={1} /></>} sparklineData={[63, 65, 68, 60, 65, 70, 72, 73, 74, 75, 75]} href="#sec-chart1" />
          <MetricCard label="Formally upheld" value="9.4" unit="%" direction="flat" polarity="up-is-good" changeText={<>Has barely shifted in a decade<Cite nums={2} /></>} sparklineData={[9, 9.1, 9.2, 9.0, 9.1, 9.3, 9.4, 9.3, 9.4, 9.4, 9.4]} href="#sec-chart1" />
          <MetricCard label="Avg resolution time" value="182" unit="days" direction="up" polarity="up-is-bad" changeText={<>Was 120 days in 2016<Cite nums={2} /></>} sparklineData={[120, 130, 140, 155, 165, 175, 185, 188, 185, 183, 182]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Police complaints received and upheld rate, 2015–2024" subtitle="Total complaints and percentage formally upheld, England and Wales" series={chart1Series} annotations={annotations} yLabel="Complaints / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Resolution time and disciplinary outcomes, 2015–2024" subtitle="Average days to resolution and disciplinary action rate (%)" series={chart2Series} annotations={[]} yLabel="Days / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Super-complaints" value="9" unit="submitted" description={<>Nine super-complaints — systemic issues raised by designated bodies — have been submitted since 2018, leading to concrete policing changes including guidance on strip searches of children.<Cite nums={2} /></>} source="Source: IOPC, Super-complaints register." />
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
