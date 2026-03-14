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
  { num: 1, name: 'Home Office', dataset: 'Knife and Offensive Weapons Statistics', url: 'https://www.gov.uk/government/statistics/knife-and-offensive-weapons-statistics', date: '2024' },
  { num: 2, name: 'Youth Justice Board', dataset: 'Youth Justice Statistics', url: 'https://www.gov.uk/government/statistics/youth-justice-statistics', date: '2024' },
  { num: 3, name: 'VRU Evidence Review', dataset: 'Violence Reduction Units: Evidence on Effectiveness', url: 'https://www.violencereduction.gov.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  knifeOffences: number;
  knifeFatalities: number;
  youthKnifeOffences: number;
  violenceReductionUnits: number;
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

export default function KnifeCrimePreventionPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/knife-crime-prevention/knife_crime_prevention.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'knifeOffences', label: 'Knife and offensive weapon offences (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.knifeOffences })) },
        { id: 'knifeFatalities', label: 'Fatal stabbings (England and Wales)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.knifeFatalities })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'youthKnifeOffences', label: 'Under-25 knife offences (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.youthKnifeOffences })) },
        { id: 'violenceReductionUnits', label: 'Violence Reduction Units active (count)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.violenceReductionUnits })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Violence Reduction Units launched' },
    { date: new Date(2022, 5, 1), label: 'Serious Violence Duty enacted' },
  ];

  return (
    <>
      <TopicNav topic="Justice & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice & Society"
          question="What Knife Crime Prevention Actually Works?"
          finding={<>Knife and offensive weapon offences in England and Wales have risen to record levels at over 50,000 a year, with fatal stabbings reaching their highest level since records began in 2023.<Cite nums={1} /> Violence Reduction Units — modelled on the Glasgow violence reduction approach — show promise, but evidence on what works at scale remains contested.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Knife crime in England and Wales has been rising consistently since the mid-2010s. Police-recorded knife and offensive weapon offences exceeded 50,000 in the year to March 2024 — the highest since records began — with fatal stabbings reaching 282 in 2022–23.<Cite nums={1} /> The rise has been attributed to a range of factors including reductions in community policing, cuts to youth services and early intervention programmes, the growth of street-level drug markets, and the increasing normalisation of knife carrying in some communities. Young men aged 15–25 are disproportionately represented both as victims and perpetrators.</p>
            <p>The policy response has been contested. Enforcement-focused approaches including stop and search, mandatory sentencing and targeted policing operations have been criticised by public health researchers who argue they address symptoms rather than causes, and disproportionately affect Black and minority ethnic young people.<Cite nums={2} /> Violence Reduction Units, established in 18 areas of England since 2019 and modelled on the Glasgow Violence Reduction Unit which dramatically reduced knife crime in Scotland, take a public health approach — focusing on early intervention, diversion and addressing the root causes of violence.<Cite nums={3} /> Early evaluations of England's VRUs are cautiously positive, but a definitive evidence base on what achieves sustained reductions is not yet available.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trends', label: 'Offence trends' },
          { id: 'sec-prevention', label: 'Prevention approach' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Knife offences (England & Wales)" value="50+" unit="thousand/yr" direction="up" polarity="up-is-bad" changeText={<>Record high; up 70% since 2014<Cite nums={1} /></>} sparklineData={[29, 32, 35, 38, 40, 42, 44, 46, 48, 50, 52]} href="#sec-trends" />
          <MetricCard label="Fatal stabbings" value="282" unit="" direction="up" polarity="up-is-bad" changeText={<>Highest since records began<Cite nums={1} /></>} sparklineData={[210, 214, 215, 224, 235, 230, 242, 255, 265, 275, 282]} href="#sec-trends" />
          <MetricCard label="Violence Reduction Units active" value="18" unit="" direction="up" polarity="up-is-good" changeText={<>Covering highest-prevalence areas<Cite nums={3} /></>} sparklineData={[0, 0, 0, 0, 10, 14, 16, 18, 18, 18, 18]} href="#sec-prevention" />
        </div>

        <ScrollReveal>
          <section id="sec-trends" className="mb-12">
            <LineChart title="Knife crime in England and Wales, 2010–2024" subtitle="Knife and offensive weapon offences (thousands) and fatal stabbings, England and Wales." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevention" className="mb-12">
            <LineChart title="Youth knife offences and VRU expansion, 2015–2024" subtitle="Under-25 knife offences (thousands) and Violence Reduction Units active (count), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Glasgow model" value="-50%" unit="homicides reduced" description={<>The Glasgow Violence Reduction Unit achieved a 50% reduction in homicides in Glasgow between 2004 and 2015 by treating violence as a public health issue — addressing trauma, providing pathways out of gangs, and delivering intensive support to at-risk young people. The approach is now being emulated across England.<Cite nums={3} /></>} source="Source: Scottish Violence Reduction Unit, 20-Year Impact Report, 2024." />
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
