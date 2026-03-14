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
  { num: 1, name: 'NHS Digital', dataset: 'Perinatal Mental Health Services Data', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics', date: '2024' },
  { num: 2, name: 'RCOG', dataset: 'Perinatal Mental Health: Experiences of Women and Health Professionals', url: 'https://www.rcog.org.uk/guidance/guideline-directory/perinatal-mental-health/', date: '2023' },
  { num: 3, name: 'NHS England', dataset: 'Specialist Perinatal Mental Health Services Transformation', url: 'https://www.england.nhs.uk/mental-health/perinatal/', date: '2024' },
];

interface DataPoint {
  year: number;
  pndPrevalence: number;
  mbuBeds: number;
  perinatalmhReferrals: number;
  treatmentGap: number;
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

export default function PostNatalDepressionSupportPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/post-natal-depression-support/post_natal_depression_support.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'perinatalmhReferrals', label: 'Referrals to specialist perinatal MH services (thousands/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.perinatalmhReferrals })) },
        { id: 'treatmentGap', label: 'Treatment gap: unmet perinatal MH need (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.treatmentGap })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'mbuBeds', label: 'Mother and Baby Unit beds (count)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mbuBeds })) },
        { id: 'pndPrevalence', label: 'Post-natal depression prevalence (% new mothers)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pndPrevalence })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'NHS Long Term Plan: perinatal MH investment' },
    { date: new Date(2020, 5, 1), label: 'Covid-19: services disrupted' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are New Mothers Getting Mental Health Support?"
          finding={<>Around one in five new mothers experiences a perinatal mental health condition including post-natal depression, anxiety or psychosis, yet access to specialist support remains inadequate — an estimated 40% of those who need specialist care are not receiving it.<Cite nums={1} /> Investment since 2019 has improved provision but significant gaps remain, particularly in community and Mother and Baby Unit capacity.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Perinatal mental health conditions — those arising during pregnancy or in the year after birth — affect around 20% of new mothers and can have serious consequences for both the mother and the child's early development if untreated. Post-natal depression is the most common, affecting approximately 10–15% of new mothers, but severe conditions including post-partum psychosis affect around 1 in 1,000 women and require urgent specialist care.<Cite nums={2} /> The Royal College of Obstetricians and Gynaecologists has documented that perinatal mental illness is a leading cause of maternal death in the year after childbirth.</p>
            <p>NHS England's Long Term Plan committed £120m to expand specialist perinatal mental health services, and referrals to these services have risen substantially since 2019.<Cite nums={3} /> However, Mother and Baby Unit bed capacity — which allows mothers with severe illness to receive inpatient treatment without being separated from their baby — remains insufficient, with women sometimes being admitted to adult psychiatric wards far from home. Routine screening using the Edinburgh Postnatal Depression Scale is now near-universal in primary care, but pathways from screening to treatment remain variable, and community perinatal mental health team capacity has not kept pace with referral growth.<Cite nums={1} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-services', label: 'Services & referrals' },
          { id: 'sec-capacity', label: 'MBU capacity' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="New mothers with perinatal MH condition" value="20" unit="%" direction="flat" polarity="up-is-bad" changeText={<>Consistent estimate; 140k women/yr in England<Cite nums={2} /></>} sparklineData={[20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]} href="#sec-services" />
          <MetricCard label="Specialist perinatal MH referrals" value="65" unit="thousand/yr" direction="up" polarity="up-is-good" changeText={<>Up from 20k in 2019<Cite nums={1} /></>} sparklineData={[20, 22, 30, 40, 48, 55, 58, 60, 62, 64, 65]} href="#sec-services" />
          <MetricCard label="Estimated treatment gap" value="40" unit="%" direction="down" polarity="down-is-good" changeText={<>Down from ~60% in 2019 but still significant<Cite nums={3} /></>} sparklineData={[60, 58, 55, 52, 50, 48, 46, 44, 42, 41, 40]} href="#sec-capacity" />
        </div>

        <ScrollReveal>
          <section id="sec-services" className="mb-12">
            <LineChart title="Perinatal mental health services, 2015–2024" subtitle="Specialist perinatal MH referrals (thousands/yr) and estimated treatment gap (%), England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-capacity" className="mb-12">
            <LineChart title="Mother and Baby Unit beds and PND prevalence, 2015–2024" subtitle="NHS Mother and Baby Unit bed count and post-natal depression prevalence (%), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="NHS Long Term Plan investment" value="£120m" unit="committed" description={<>The NHS Long Term Plan committed £120m by 2023–24 to ensure 30,000 more women per year could access specialist perinatal mental health care — a programme that has substantially increased referral capacity, though demand continues to outpace supply.<Cite nums={3} /></>} source="Source: NHS England, Perinatal Mental Health Programme, 2024." />
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
