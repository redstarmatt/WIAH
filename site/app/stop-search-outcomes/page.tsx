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
  { num: 1, name: 'Home Office', dataset: 'Police powers and procedures: Stop and search', url: 'https://www.gov.uk/government/collections/police-powers-and-procedures-england-and-wales', date: '2024' },
  { num: 2, name: 'Stopwatch', dataset: 'Stop and search statistics analysis', url: 'https://www.stop-watch.org/', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Ethnicity and the criminal justice system', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/ethnicityandthecriminaljusticesystemenglandandwales/2023', date: '2024' },
];

interface DataPoint {
  year: number;
  totalSearches: number;
  arrestRate: number;
  blackStopRate: number;
  whiteStopRate: number;
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

export default function StopSearchOutcomesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/stop-search-outcomes/stop_search_outcomes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'totalSearches', label: 'Total stop and searches', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.totalSearches })) },
        { id: 'arrestRate', label: 'Arrest rate (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.arrestRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'blackStopRate', label: 'Black people searched per 1,000', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.blackStopRate })) },
        { id: 'whiteStopRate', label: 'White people searched per 1,000', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.whiteStopRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2014, 5, 1), label: 'Best Use of Stop and Search scheme' },
    { date: new Date(2019, 5, 1), label: 'Section 60 use expanded' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="What Is Stop and Search Actually Finding?"
          finding={<>Police in England and Wales conducted over 800,000 stop and searches in 2022–23, but fewer than 1 in 5 led to an arrest.<Cite nums={1} /> Black people are searched at seven times the rate of white people — a disparity that has widened, not narrowed, in recent years.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Stop and search is one of the most contested powers in British policing. Proponents argue it removes weapons from the streets and deters would-be offenders; critics point out that the majority of searches find nothing, and that the racially disproportionate use of the power erodes trust in areas that most need effective policing. Under Section 1 of PACE, an officer must have &quot;reasonable grounds to suspect&quot; a person is carrying stolen items or weapons before searching them.<Cite nums={1} /> The harder-to-challenge Section 60 power — which requires no individual suspicion — has been expanded in high-violence areas.</p>
            <p>The Home Office&apos;s own data consistently shows that the &quot;useful outcome&quot; rate — arrests, summons, penalty notices — runs at around 17–20%, meaning four-fifths of those searched are found to have done nothing wrong. The ethnic disparity figures are stark: in 2022–23, there were roughly 52 searches per 1,000 Black people, against 7 per 1,000 white people.<Cite nums={[2, 3]} /> Research has so far failed to establish a clear causal link between high rates of stop and search and reduced violence.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Volume and outcomes' },
          { id: 'sec-chart2', label: 'Ethnic disparity' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Stop and searches (2022–23)" value="812k" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 380k in 2016<Cite nums={1} /></>} sparklineData={[580, 390, 380, 420, 500, 600, 680, 750, 800, 812, 812]} href="#sec-chart1" />
          <MetricCard label="Useful outcome rate" value="18" unit="%" direction="flat" polarity="up-is-good" changeText={<>Barely changed over a decade<Cite nums={1} /></>} sparklineData={[17, 18, 18, 18, 17, 18, 19, 18, 18, 18, 18]} href="#sec-chart1" />
          <MetricCard label="Black:white search ratio" value="7×" unit="" direction="up" polarity="up-is-bad" changeText={<>Was 5× in 2015<Cite nums={3} /></>} sparklineData={[5, 5.2, 5.5, 5.8, 6.0, 6.2, 6.5, 6.8, 7.0, 7.0, 7.0]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Stop and search volume and arrest rate, 2012–2023" subtitle="Total searches and percentage resulting in arrest, England and Wales" series={chart1Series} annotations={annotations} yLabel="Searches / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Searches per 1,000 population by ethnicity, 2012–2023" subtitle="Rate of stop and search per 1,000 for Black and white people, England and Wales" series={chart2Series} annotations={[]} yLabel="Per 1,000" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Body-worn video" value="96%" unit="of forces" description={<>96% of police forces now use body-worn video during stop and search encounters, which research suggests modestly increases both officer compliance with procedures and public willingness to accept being searched.<Cite nums={1} /></>} source="Source: Home Office, Police powers and procedures." />
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
