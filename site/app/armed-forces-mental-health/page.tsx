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
  { num: 1, name: 'NHS England', dataset: 'Veterans mental health and wellbeing services', url: 'https://www.england.nhs.uk/mental-health/adults/veterans/', date: '2024' },
  { num: 2, name: 'Ministry of Defence', dataset: 'UK Armed Forces mental health annual summary', url: 'https://www.gov.uk/government/collections/uk-armed-forces-mental-health-statistical-series', date: '2024' },
  { num: 3, name: 'Combat Stress', dataset: 'Annual Review', url: 'https://combatstress.org.uk/about-us/our-impact', date: '2024' },
];

interface DataPoint {
  year: number;
  referralsToVets: number;
  avgWaitWeeks: number;
  ptsdDiagnoses: number;
  treatmentCompletionRate: number;
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

export default function ArmedForcesMentalHealthPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/armed-forces-mental-health/armed_forces_mental_health.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'referralsToVets', label: 'Referrals to veteran services', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.referralsToVets })) },
        { id: 'ptsdDiagnoses', label: 'PTSD diagnoses (serving)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ptsdDiagnoses })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgWaitWeeks', label: 'Avg wait for veteran MH service (weeks)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgWaitWeeks })) },
        { id: 'treatmentCompletionRate', label: 'Treatment completion rate (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.treatmentCompletionRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Op COURAGE mental health pathways launched' },
    { date: new Date(2021, 5, 1), label: 'Veterans&apos; Commissioner report' },
  ];

  return (
    <>
      <TopicNav topic="Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services"
          question="Are Veterans Getting the Mental Health Support They Need?"
          finding={<>The NHS received over 18,000 referrals to veteran mental health services in 2023–24, but average waits of up to 12 weeks and a treatment completion rate of around 55% suggest the system is struggling to meet demand.<Cite nums={1} /> Rates of PTSD among serving personnel remain higher than the general population.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has around 2.5 million veterans, and evidence consistently shows they experience higher rates of certain mental health conditions — particularly PTSD, alcohol dependence, and depression — than the general population. The NHS launched Operation COURAGE in 2020, a set of specialist pathways designed to ensure veterans can access appropriate care without having to start from scratch with a GP who may be unfamiliar with military culture and the nature of service-related trauma.<Cite nums={1} /></p>
            <p>Access to care has improved, but gaps remain. Charity sector provision from organisations like Combat Stress and Help for Heroes is picking up demand that the statutory sector cannot handle. There is also a question of timing: many veterans do not seek help until years or decades after leaving service, making long-term follow-up studies difficult and masking the true scale of unmet need. Among serving personnel, stigma around mental health disclosure remains a significant barrier to treatment-seeking.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Demand' },
          { id: 'sec-chart2', label: 'Access' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Veteran MH referrals" value="18,200" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 9,000 in 2019 pre-Op COURAGE<Cite nums={1} /></>} sparklineData={[9000, 10000, 11000, 13000, 15000, 16000, 17000, 18000, 18200, 18200, 18200]} href="#sec-chart1" />
          <MetricCard label="Avg wait for treatment" value="10" unit="weeks" direction="down" polarity="up-is-bad" changeText={<>Improved from 14 weeks in 2021<Cite nums={2} /></>} sparklineData={[8, 9, 10, 14, 13, 12, 11, 10, 10, 10, 10]} href="#sec-chart2" />
          <MetricCard label="Treatment completion" value="55" unit="%" direction="flat" polarity="up-is-good" changeText={<>Below NHS talking therapies benchmark<Cite nums={3} /></>} sparklineData={[58, 57, 56, 52, 53, 54, 55, 55, 55, 55, 55]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Veteran mental health referrals and PTSD diagnoses, 2015–2024" subtitle="Annual referrals to veteran specialist services and PTSD diagnoses among serving personnel" series={chart1Series} annotations={annotations} yLabel="Count" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Wait times and treatment completion, 2015–2024" subtitle="Average weeks to first appointment and treatment completion rate (%)" series={chart2Series} annotations={[]} yLabel="Weeks / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Op COURAGE reach" value="50k" unit="veterans" description={<>Operation COURAGE pathways have now supported over 50,000 veterans since launch, with satisfaction rates among those who complete treatment running at over 80%.<Cite nums={1} /></>} source="Source: NHS England, Op COURAGE annual data." />
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
