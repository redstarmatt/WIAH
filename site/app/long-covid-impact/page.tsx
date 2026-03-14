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
  { num: 1, name: 'ONS', dataset: 'Prevalence of Ongoing Symptoms Following Coronavirus (COVID-19) Infection in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/prevalenceofongoingsymptomsfollowingcoronaviruscovid19infectionintheuk', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Long COVID Assessment and Treatment Services', url: 'https://www.england.nhs.uk/coronavirus/long-covid/', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Long COVID and its Impact on Daily Activities', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/articles/longcovid/latestinsights', date: '2024' },
];

interface DataPoint {
  year: number;
  longCovidPrevalence: number;
  dailyActivityLimited: number;
  longCovidClinicReferrals: number;
  workAbsence: number;
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

export default function LongCovidImpactPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/long-covid-impact/long_covid_impact.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'longCovidPrevalence', label: 'People with long COVID (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.longCovidPrevalence })) },
        { id: 'dailyActivityLimited', label: 'Long COVID limiting daily activity (millions)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.dailyActivityLimited })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'longCovidClinicReferrals', label: 'Long COVID clinic referrals (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.longCovidClinicReferrals })) },
        { id: 'workAbsence', label: 'Long COVID-related work absences (thousands/month)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.workAbsence })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'Long COVID clinics opened' },
    { date: new Date(2022, 5, 1), label: 'Omicron wave peak' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Many People Are Living With Long Covid?"
          finding={<>Around 1.9 million people in the UK reported living with long COVID as of early 2024 — persistent symptoms lasting more than four weeks after initial infection — with around 800,000 saying it limits their daily activities.<Cite nums={1} /> Long COVID has become one of the most significant new causes of long-term sickness absence from work.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The ONS's long COVID prevalence survey, one of the most comprehensive in the world, tracked self-reported ongoing COVID symptoms from 2021. At its peak in 2022 over 2.1 million people in the UK reported long COVID, falling to around 1.9 million by early 2024 as the distance from major infection waves grew and some people recovered.<Cite nums={1} /> Common symptoms include fatigue, brain fog, breathlessness and post-exertional malaise. The condition has no approved treatments, and research into mechanisms and interventions remains at an early stage. The burden falls disproportionately on women, those aged 35–69, people living in deprived areas, and those with pre-existing health conditions.</p>
            <p>NHS England established a network of specialist long COVID assessment services from 2021, which had received over 100,000 referrals by 2024.<Cite nums={2} /> However, access is uneven and many patients report difficulty getting their GP to refer them, or describe returning to work before recovery and suffering relapses. ONS data on the labour market impact shows that hundreds of thousands of people are economically inactive or in reduced work as a direct consequence of long COVID — making it one of the most significant drivers of the post-pandemic rise in long-term sickness.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-services', label: 'Services & work impact' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="People with long COVID" value="1.9" unit="million" direction="down" polarity="up-is-bad" changeText={<>Peak 2.1m in mid-2022<Cite nums={1} /></>} sparklineData={[0, 0.4, 1.1, 1.7, 2.1, 2.0, 1.9, 1.9, 1.9, 1.9, 1.9]} href="#sec-prevalence" />
          <MetricCard label="Long COVID limiting daily activity" value="0.8" unit="million" direction="flat" polarity="up-is-bad" changeText={<>Around 40% of all long COVID sufferers<Cite nums={1} /></>} sparklineData={[0, 0.2, 0.5, 0.7, 0.9, 0.85, 0.82, 0.8, 0.8, 0.8, 0.8]} href="#sec-prevalence" />
          <MetricCard label="Long COVID clinic referrals (cumulative)" value="100" unit="thousand+" direction="up" polarity="up-is-bad" changeText={<>Since clinics opened in 2021<Cite nums={2} /></>} sparklineData={[0, 0, 5, 20, 40, 60, 75, 85, 93, 98, 102]} href="#sec-services" />
        </div>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart title="Long COVID prevalence in the UK, 2021–2024" subtitle="Self-reported long COVID and activity-limiting cases (millions), UK." series={chart1Series} annotations={annotations} yLabel="Millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-services" className="mb-12">
            <LineChart title="Long COVID clinic demand and work absence, 2021–2024" subtitle="Clinic referrals (thousands) and long COVID-related work absences (thousands/month), UK." series={chart2Series} annotations={[]} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Long COVID research" value="£50m" unit="invested" description={<>UK Research and Innovation committed £50m to long COVID research across multiple programmes, funding clinical trials into potential treatments including antiviral drugs and rehabilitation approaches.<Cite nums={2} /></>} source="Source: UKRI, Long COVID Research Programme, 2024." />
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
