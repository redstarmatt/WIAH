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
  { num: 1, name: 'DfE', dataset: 'School admissions statistics', url: 'https://www.gov.uk/government/collections/statistics-school-admissions', date: '2024' },
  { num: 2, name: 'Fair Admissions Campaign', dataset: 'Faith school segregation analysis', url: 'https://www.fairadmissions.org.uk/', date: '2024' },
  { num: 3, name: 'Sutton Trust', dataset: 'Faith schools and social selection', url: 'https://www.suttontrust.com/research-paper/faith-schools/', date: '2024' },
];

interface DataPoint {
  year: number;
  faithSchoolShare: number;
  fsmFaithVsNonFaith: number;
  religiousOversubscriptionRate: number;
  catchmentDistanceKm: number;
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

export default function FaithSchoolAdmissionsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/faith-school-admissions/faith_school_admissions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'fsmFaithVsNonFaith', label: 'FSM gap: faith vs non-faith (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fsmFaithVsNonFaith })) },
        { id: 'religiousOversubscriptionRate', label: 'Faith schools oversubscribed (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.religiousOversubscriptionRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'faithSchoolShare', label: 'Faith schools as % of all state schools', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.faithSchoolShare })) },
        { id: 'catchmentDistanceKm', label: 'Effective catchment area (km)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.catchmentDistanceKm })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '50% cap on faith admissions lifted (proposed but not enacted)' },
  ];

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are Faith Schools Admitting Fairly?"
          finding={<>Faith schools educate around a third of all state school pupils in England, but enrol significantly fewer pupils eligible for free school meals than non-faith schools in the same areas.<Cite nums={1} /> The socio-economic gap between faith and non-faith schools has remained stubbornly wide, with the most oversubscribed faith schools having effective catchments determined more by house price than religion.<Cite nums={[2, 3]} /></>}
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has over 6,800 state-funded faith schools — primarily Church of England and Roman Catholic, with smaller numbers of Jewish, Muslim, Hindu, and Sikh schools. They were historically given the right to select up to 100% of their intake on religious grounds, meaning families without the relevant faith can be excluded. The policy debate has focused less on religious character and more on socio-economic selection: oversubscribed faith schools in desirable areas effectively select by house price (proximity to the school gates being the critical criterion), reproducing and intensifying existing inequalities.<Cite nums={1} /></p>
            <p>The Sutton Trust has found that Church of England secondary schools enrol an average of 6 percentage points fewer FSM pupils than the schools around them. The gap is larger for Catholic secondary schools. The Fair Admissions Campaign argues that a simple rule — requiring faith schools to admit a representative proportion of children from the local area regardless of faith — would address this without undermining the schools&apos; religious character. The proposal to limit religious selection to 50% of places was introduced in 2016 but then withdrawn before becoming law.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Selection effects' },
          { id: 'sec-chart2', label: 'School landscape' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Faith schools (state, England)" value="6,820" unit="" direction="flat" polarity="flat" changeText={<>Around 33% of all state schools<Cite nums={1} /></>} sparklineData={[6500, 6550, 6600, 6650, 6700, 6720, 6740, 6760, 6780, 6800, 6820]} href="#sec-chart2" />
          <MetricCard label="FSM gap (faith vs area)" value="–6" unit="pp" direction="flat" polarity="up-is-bad" changeText={<>Persistent gap; little improvement since 2010<Cite nums={3} /></>} sparklineData={[-7, -7, -6.5, -6.5, -6, -6, -6, -6, -6, -6, -6]} href="#sec-chart1" />
          <MetricCard label="Oversubscribed faith schools" value="58" unit="%" direction="flat" polarity="flat" changeText={<>Higher than average for state schools<Cite nums={2} /></>} sparklineData={[55, 56, 57, 57, 58, 58, 58, 58, 58, 58, 58]} href="#sec-chart1" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Faith school FSM gap and oversubscription, 2010–2024" subtitle="Percentage point FSM gap (faith vs local area) and % of faith schools oversubscribed" series={chart1Series} annotations={annotations} yLabel="Pp / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Faith schools as share of state sector, 2010–2024" subtitle="Number of faith schools as % of all state schools and effective catchment area (km)" series={chart2Series} annotations={[]} yLabel="% / km" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Performance" value="Broadly similar" unit="to non-faith" description={<>After adjusting for intake, the academic performance of faith schools is broadly similar to non-faith schools — suggesting the apparent advantage in raw results reflects intake selection rather than school effectiveness per se.<Cite nums={3} /></>} source="Source: Sutton Trust, faith schools and social selection analysis." />
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
