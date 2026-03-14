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
  { num: 1, name: 'NHS England', dataset: 'RTT Waiting Times — Sleep Medicine', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/', date: '2024' },
  { num: 2, name: 'British Sleep Society', dataset: 'UK Sleep Disorder Services Survey', url: 'https://www.sleepsociety.org.uk/resources/', date: '2023' },
  { num: 3, name: 'NICE', dataset: 'Sleep Disorders Guideline Development', url: 'https://www.nice.org.uk/guidance/conditions-and-diseases/mental-health-and-behavioural-conditions/sleep-conditions', date: '2023' },
];

interface DataPoint {
  year: number;
  sleepClinicWaitWeeks: number;
  waitingListSize: number;
  osasPrevalence: number;
  cpapPrescriptions: number;
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

export default function SleepDisorderServicesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/sleep-disorder-services/sleep_disorder_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'sleepClinicWaitWeeks', label: 'Average sleep clinic wait (weeks)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.sleepClinicWaitWeeks })) },
        { id: 'waitingListSize', label: 'Sleep medicine waiting list (thousands)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.waitingListSize })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'osasPrevalence', label: 'Estimated OSAS prevalence (% adults)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.osasPrevalence })) },
        { id: 'cpapPrescriptions', label: 'CPAP prescriptions issued (thousands/yr)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cpapPrescriptions })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: sleep labs closed' },
    { date: new Date(2021, 5, 1), label: 'NICE Hypersomnia guideline published' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Long Do People Wait for Sleep Disorder Treatment?"
          finding={<>Waits for NHS sleep disorder assessment have reached over two years in some areas, with the waiting list growing sharply since the Covid-19 pandemic closed sleep laboratories.<Cite nums={1} /> Obstructive sleep apnoea — the most common serious sleep disorder — is significantly under-diagnosed, with an estimated 85% of sufferers undiagnosed.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Sleep disorders represent a significant and often overlooked burden on health and productivity. Obstructive sleep apnoea syndrome (OSAS), in which the airway collapses repeatedly during sleep causing oxygen desaturation and fragmented sleep, affects an estimated 4–8% of the adult population but is thought to be 85% under-diagnosed.<Cite nums={2} /> Untreated OSAS significantly increases the risk of cardiovascular disease, type 2 diabetes, road accidents and occupational accidents. Insomnia disorder affects around 10–15% of adults and is a major driver of GP consultations and prescription medication use.</p>
            <p>NHS sleep medicine services are a small and under-resourced specialty. Waiting times for a first assessment at a sleep clinic have risen sharply since the pandemic closed diagnostic sleep laboratories, and the British Sleep Society survey found average waits of over 40 weeks nationally, with some centres exceeding two years.<Cite nums={1} /> NICE has published guidelines on narcolepsy and hypersomnia but there are no comprehensive guidelines for the full range of sleep disorders, and commissioning of sleep services is inconsistent across ICBs.<Cite nums={3} /> Home sleep diagnostic devices have expanded the capacity for OSAS diagnosis, but therapy initiation and follow-up pathways remain stretched.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waits', label: 'Waiting times' },
          { id: 'sec-prevalence', label: 'Prevalence & treatment' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Average sleep clinic wait" value="40+" unit="weeks" direction="up" polarity="up-is-bad" changeText={<>Up from ~20 weeks pre-pandemic<Cite nums={1} /></>} sparklineData={[20, 21, 22, 23, 24, 50, 55, 50, 46, 43, 40]} href="#sec-waits" />
          <MetricCard label="OSAS under-diagnosis rate" value="85" unit="%" direction="flat" polarity="up-is-bad" changeText={<>85% of OSAS sufferers undiagnosed<Cite nums={2} /></>} sparklineData={[88, 87, 87, 86, 86, 86, 86, 85, 85, 85, 85]} href="#sec-prevalence" />
          <MetricCard label="CPAP prescriptions/yr" value="180" unit="thousand" direction="up" polarity="up-is-good" changeText={<>Up from 110k in 2015<Cite nums={1} /></>} sparklineData={[110, 120, 130, 138, 145, 130, 140, 155, 165, 172, 180]} href="#sec-prevalence" />
        </div>

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart title="Sleep clinic waiting times and waiting list, 2015–2024" subtitle="Average wait for sleep clinic assessment (weeks) and waiting list size (thousands), England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart title="OSAS prevalence and CPAP treatment, 2015–2024" subtitle="Estimated OSAS prevalence in adults (%) and annual CPAP prescriptions (thousands), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Home sleep testing" value="60%" unit="of OSAS diagnoses" description={<>Around 60% of obstructive sleep apnoea diagnoses are now made using home sleep testing devices rather than full in-laboratory polysomnography, expanding diagnostic capacity significantly without requiring additional inpatient beds.<Cite nums={3} /></>} source="Source: British Sleep Society, Service Survey 2023." />
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
