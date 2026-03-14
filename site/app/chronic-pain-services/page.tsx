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
  { num: 1, name: 'NHS England', dataset: 'Chronic Pain Referral and Treatment Data', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/', date: '2024' },
  { num: 2, name: 'British Pain Society', dataset: 'National Pain Audit', url: 'https://www.britishpainsociety.org/static/uploads/resources/files/np_audit.pdf', date: '2023' },
  { num: 3, name: 'NHS Digital', dataset: 'Hospital Episode Statistics — Pain Management', url: 'https://digital.nhs.uk/data-and-information/data-tools-and-services/data-services/hospital-episode-statistics', date: '2024' },
];

interface DataPoint {
  year: number;
  waitingListSize: number;
  avgWaitWeeks: number;
  chronicPainPrevalence: number;
  referralRate: number;
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

export default function ChronicPainServicesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/chronic-pain-services/chronic_pain_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'waitingListSize', label: 'Pain management waiting list (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.waitingListSize })) },
        { id: 'avgWaitWeeks', label: 'Average wait for pain clinic (weeks)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgWaitWeeks })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'chronicPainPrevalence', label: 'Adults with chronic pain (% population)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.chronicPainPrevalence })) },
        { id: 'referralRate', label: 'GP referrals to pain services (per 100k)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.referralRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: elective care paused' },
    { date: new Date(2021, 5, 1), label: 'NICE chronic pain guidelines updated' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are Chronic Pain Services Meeting Demand?"
          finding={<>Around 28 million adults in England live with chronic pain — 43% of the population — yet pain management services have waiting lists exceeding 18 months in many areas, and have never fully recovered from Covid-19 disruption.<Cite nums={1} /> NICE guidelines updated in 2021 shifted emphasis away from opioids but services to implement them remain patchy.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Chronic pain — defined as pain lasting more than three months — affects approximately 43% of the English adult population, according to estimates from the British Pain Society, making it one of the most prevalent health conditions in the country.<Cite nums={2} /> Yet pain medicine is a relatively small specialty: the UK has around 350 consultant pain specialists, roughly one per 170,000 people living with significant chronic pain. Pain clinics were among the services most disrupted by Covid-19 and referral-to-treatment waiting lists for pain management more than doubled between 2019 and 2022.</p>
            <p>The 2021 NICE guidelines for chronic primary pain represented a significant shift, recommending against long-term opioid prescribing and in favour of physiotherapy, psychological therapies and supervised exercise programmes.<Cite nums={3} /> However, implementation has been inconsistent: many patients are still initiated on opioids, and the non-pharmacological alternatives recommended by NICE are not uniformly available. The British Pain Society has called for pain to be designated a long-term condition in NHS planning frameworks, which would trigger dedicated commissioning and outcome measurement.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waits', label: 'Waiting times' },
          { id: 'sec-prevalence', label: 'Prevalence & demand' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Adults with chronic pain" value="28" unit="million" direction="up" polarity="up-is-bad" changeText={<>43% of English adult population<Cite nums={2} /></>} sparklineData={[24, 24.5, 25, 25.5, 26, 26.5, 27, 27.2, 27.5, 27.8, 28]} href="#sec-prevalence" />
          <MetricCard label="Average pain clinic wait" value="52" unit="weeks" direction="up" polarity="up-is-bad" changeText={<>Up from 22 weeks in 2019<Cite nums={1} /></>} sparklineData={[22, 24, 26, 28, 55, 65, 62, 58, 56, 54, 52]} href="#sec-waits" />
          <MetricCard label="Pain management waiting list" value="145" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Up from 78k in 2019<Cite nums={1} /></>} sparklineData={[78, 82, 86, 90, 170, 180, 175, 165, 158, 150, 145]} href="#sec-waits" />
        </div>

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart title="Chronic pain service waiting lists, 2015–2024" subtitle="Pain management waiting list size (thousands) and average wait (weeks), England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart title="Chronic pain prevalence and referral rates, 2015–2024" subtitle="Adults with chronic pain (% of population) and GP referrals to pain services (per 100k), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="NICE guideline update" value="2021" unit="new approach" description={<>NICE's 2021 chronic pain guidelines recommended exercise, psychological therapies and acupuncture ahead of opioids for chronic primary pain — a significant evidence-based shift that, if fully implemented, could reduce long-term opioid dependency for millions of patients.<Cite nums={3} /></>} source="Source: NICE, Chronic Pain Guideline NG193, 2021." />
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
