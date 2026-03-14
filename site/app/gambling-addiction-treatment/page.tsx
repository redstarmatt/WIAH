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
  { num: 1, name: 'NHS England', dataset: 'NHS Northern Gambling Service and Treatment Clinics', url: 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/addictions/gambling-addiction/', date: '2024' },
  { num: 2, name: 'Gambling Commission', dataset: 'Gambling Survey for Great Britain', url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/gambling-survey-for-great-britain', date: '2024' },
  { num: 3, name: 'GamCare', dataset: 'Annual Statistics — National Problem Gambling Helpline', url: 'https://www.gamcare.org.uk/about-us/annual-reviews-and-reports/', date: '2024' },
];

interface DataPoint {
  year: number;
  problemGamblers: number;
  nhsTreatmentCapacity: number;
  gamblingHelplineContacts: number;
  onlineGamblingRevenue: number;
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

export default function GamblingAddictionTreatmentPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/gambling-addiction-treatment/gambling_addiction_treatment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'problemGamblers', label: 'Estimated problem gamblers (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.problemGamblers })) },
        { id: 'nhsTreatmentCapacity', label: 'NHS gambling treatment capacity (places/yr)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nhsTreatmentCapacity })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'gamblingHelplineContacts', label: 'GamCare helpline contacts (thousands/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.gamblingHelplineContacts })) },
        { id: 'onlineGamblingRevenue', label: 'Online gambling gross yield (£bn/yr)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.onlineGamblingRevenue })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'NHS Northern Gambling Service opens' },
    { date: new Date(2023, 5, 1), label: 'Gambling Act reform: affordability checks' },
  ];

  return (
    <>
      <TopicNav topic="Health & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health & Society"
          question="Is Gambling Treatment Keeping Up with Harm?"
          finding={<>An estimated 300,000–400,000 people in Britain have problem gambling, yet NHS specialist gambling treatment can serve only around 3,000 people per year — a treatment gap of over 99%.<Cite nums={1} /> Online gambling gross yield has more than doubled since 2010, with mobile gambling now the dominant mode of play.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Problem gambling — defined as gambling that disrupts personal, family and professional life — affects an estimated 300,000–400,000 people in Britain according to the Gambling Commission's annual survey.<Cite nums={2} /> A further 1–2 million are classified as 'at risk'. The harms associated with problem gambling include financial ruin, relationship breakdown, mental illness and suicide: rates of suicidal ideation are substantially higher among problem gamblers than the general population. The liberalisation of online gambling in the 2005 Gambling Act, followed by the explosion in smartphone use, has dramatically changed the accessibility and availability of gambling products.</p>
            <p>NHS gambling treatment services are chronically under-resourced relative to the scale of the problem. The NHS Northern Gambling Service, the first NHS specialist gambling service, opened in 2019 and was followed by a national network of NHS clinics — but total NHS specialist gambling treatment capacity reached only around 3,000 places per year by 2024.<Cite nums={1} /> This represents a treatment gap of over 99% against the estimated problem gambling population. GamCare's national helpline receives over 50,000 contacts annually, providing initial support and referral, but wait times for treatment can be long and availability outside major cities is poor. The 2023 Gambling Act reforms introduced requirements for affordability checks on heavy gamblers, but implementation has been contested by the industry.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-harm', label: 'Scale of harm' },
          { id: 'sec-treatment', label: 'Treatment capacity' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Problem gamblers" value="350" unit="thousand" direction="flat" polarity="up-is-bad" changeText={<>Consistent estimate; 1–2m more 'at risk'<Cite nums={2} /></>} sparklineData={[350, 360, 360, 365, 370, 355, 345, 348, 350, 350, 350]} href="#sec-harm" />
          <MetricCard label="NHS gambling treatment capacity" value="3,000" unit="places/yr" direction="up" polarity="up-is-good" changeText={<>Up from near zero in 2018 — still 99% gap<Cite nums={1} /></>} sparklineData={[0, 0, 200, 600, 1000, 1500, 2000, 2500, 2800, 2900, 3000]} href="#sec-treatment" />
          <MetricCard label="Online gambling gross yield" value="6.0" unit="£bn/yr" direction="up" polarity="up-is-bad" changeText={<>Up from 2.4bn in 2015<Cite nums={2} /></>} sparklineData={[2.4, 2.8, 3.2, 3.6, 4.0, 4.5, 5.0, 5.3, 5.6, 5.8, 6.0]} href="#sec-harm" />
        </div>

        <ScrollReveal>
          <section id="sec-harm" className="mb-12">
            <LineChart title="Problem gambling prevalence and NHS treatment capacity, 2015–2024" subtitle="Estimated problem gamblers (thousands) and NHS specialist treatment places (per year), UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-treatment" className="mb-12">
            <LineChart title="Gambling helpline contacts and online gambling growth, 2015–2024" subtitle="GamCare helpline contacts (thousands/yr) and online gambling gross yield (£bn/yr), Great Britain." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Statutory levy" value="2025" unit="gambling levy enacted" description={<>Following years of voluntary contributions from gambling operators, a statutory levy on the industry was announced in 2024 to fund gambling harm treatment, education and research — redirecting a proportion of gambling revenues to services for those experiencing harm.<Cite nums={1} /></>} source="Source: DCMS, Gambling Act Reform, Statutory Levy Announcement, 2024." />
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
