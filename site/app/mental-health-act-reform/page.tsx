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
  { num: 1, name: 'NHS Digital', dataset: 'Mental Health Act Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-act-statistics-annual-figures', date: '2024' },
  { num: 2, name: 'DHSC', dataset: 'Independent Review of the Mental Health Act', url: 'https://www.gov.uk/government/publications/modernising-the-mental-health-act-final-report-from-the-independent-review', date: '2018' },
  { num: 3, name: 'Mind', dataset: 'Mental Health Act Reform: Campaign and Data', url: 'https://www.mind.org.uk/news-campaigns/campaigns/mental-health-act-reform/', date: '2024' },
];

interface DataPoint {
  year: number;
  detentionsTotal: number;
  detentionsBlackPatients: number;
  communityTreatmentOrders: number;
  bedDays: number;
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

export default function MentalHealthActReformPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/mental-health-act-reform/mental_health_act_reform.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'detentionsTotal', label: 'Total MHA detentions (thousands/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.detentionsTotal })) },
        { id: 'detentionsBlackPatients', label: 'Detention rate, Black patients (per 100k)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.detentionsBlackPatients })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'communityTreatmentOrders', label: 'Community Treatment Orders (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.communityTreatmentOrders })) },
        { id: 'bedDays', label: 'Inpatient bed days under MHA (millions)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.bedDays })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'Independent review published' },
    { date: new Date(2022, 5, 1), label: 'Mental Health Bill introduced' },
  ];

  return (
    <>
      <TopicNav topic="Health & Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health & Justice"
          question="Is Mental Health Legislation Fit for Purpose?"
          finding={<>Detentions under the Mental Health Act 1983 have risen 40% in a decade, with Black people four times more likely to be detained than white people — a racial disparity that has persisted despite decades of policy attention.<Cite nums={1} /> A reform bill has been in progress since 2018 but is yet to become law.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Mental Health Act 1983 provides the legal framework for detaining and treating people in England and Wales against their will when they are deemed to be a risk to themselves or others. Annual detentions under the Act have risen from around 45,000 in 2013 to over 53,000 in 2023 — a 40% increase that reflects both growing mental health need and insufficient community services to prevent crises reaching the point where compulsion is required.<Cite nums={1} /> The Act has been repeatedly criticised for its outdated approach, its concentration of power in clinicians with limited patient voice, and its dramatic racial disparities: Black patients are four times more likely to be detained than white patients.</p>
            <p>An independent review commissioned by the government, published in 2018, made 154 recommendations for reform, including abolishing detention for autistic people and people with learning disabilities who are not experiencing mental illness, strengthening patient advocacy rights, and reducing racial inequality.<Cite nums={2} /> A Mental Health Bill to implement these reforms was introduced but progressed slowly. Mind and other mental health charities have consistently highlighted the urgent need for reform and expressed concern at the pace of legislative change given the scale of harm documented in the existing system.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-detentions', label: 'Detention trends' },
          { id: 'sec-ctos', label: 'Community orders' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Annual MHA detentions" value="53" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Up from 45k in 2013<Cite nums={1} /></>} sparklineData={[45, 46, 47, 48, 49, 50, 50, 51, 52, 53, 53]} href="#sec-detentions" />
          <MetricCard label="Black patient detention rate (relative)" value="4x" unit="white rate" direction="flat" polarity="up-is-bad" changeText={<>Persistent disparity unchanged for decades<Cite nums={1} /></>} sparklineData={[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]} href="#sec-detentions" />
          <MetricCard label="Years since independent review" value="6+" unit="years" direction="up" polarity="up-is-bad" changeText={<>Review published 2018, reform still pending<Cite nums={2} /></>} sparklineData={[0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6]} href="#sec-ctos" />
        </div>

        <ScrollReveal>
          <section id="sec-detentions" className="mb-12">
            <LineChart title="Mental Health Act detentions and racial disparity, 2013–2024" subtitle="Total annual MHA detentions (thousands) and Black patient detention rate (per 100k), England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ctos" className="mb-12">
            <LineChart title="Community Treatment Orders and inpatient bed days, 2013–2024" subtitle="Community Treatment Orders (thousands) and MHA inpatient bed days (millions), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Independent review recommendations" value="154" unit="recommendations" description={<>The 2018 Independent Review of the Mental Health Act made 154 recommendations to modernise the legislation, including abolishing the use of the Act to detain autistic people and people with learning disabilities who do not have a co-occurring mental illness.<Cite nums={2} /></>} source="Source: DHSC, Independent Review of the Mental Health Act, December 2018." />
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
