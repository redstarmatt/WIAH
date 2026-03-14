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
  { num: 1, name: 'ONS', dataset: 'UK labour market overview — older workers', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/latest', date: '2024' },
  { num: 2, name: 'Resolution Foundation', dataset: 'The Age of Ageing — labour market implications', url: 'https://www.resolutionfoundation.org/research/', date: '2024' },
  { num: 3, name: 'Centre for Ageing Better', dataset: 'State of Ageing report', url: 'https://ageing-better.org.uk/state-of-ageing', date: '2024' },
];

interface DataPoint {
  year: number;
  over50sEmploymentRate: number;
  averageRetirementAge: number;
  productivityGapOlderWorkers: number;
  healthConditionInactivity: number;
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

export default function AgeingWorkforceImpactsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/ageing-workforce-impacts/ageing_workforce_impacts.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'over50sEmploymentRate', label: 'Over-50s employment rate (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.over50sEmploymentRate })) },
        { id: 'averageRetirementAge', label: 'Average retirement age', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.averageRetirementAge })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'healthConditionInactivity', label: 'Inactive due to ill health (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.healthConditionInactivity })) },
        { id: 'productivityGapOlderWorkers', label: 'Earnings gap 50+ vs 35–49 (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.productivityGapOlderWorkers })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — older workers most likely to exit' },
    { date: new Date(2022, 5, 1), label: '500k missing workers over-50 post-Covid' },
  ];

  return (
    <>
      <TopicNav topic="Society & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Economy"
          question="How Is an Ageing Workforce Changing the UK Economy?"
          finding={<>Over-50s now make up a third of the UK workforce, and their employment rate has risen substantially over two decades — but the pandemic saw 500,000 older workers leave the labour market permanently, contributing to a persistent labour shortage.<Cite nums={1} /> Economic inactivity due to ill health is concentrated in the 50–65 age group.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s ageing population has significant implications for the labour market, public finances, and economic growth. Over-50s have seen the largest increase in employment rates of any age group since 2000, partly reflecting higher state pension ages and the end of mandatory retirement. But this trend reversed sharply during Covid-19: a combination of early retirement decisions, health concerns, and caring responsibilities led to a substantial exit of older workers that has only partially reversed.<Cite nums={1} /></p>
            <p>Economic inactivity due to long-term health conditions — including musculoskeletal problems, mental health conditions, and cardiovascular disease — is heavily concentrated among those aged 50–64. Around 2.8 million people in this age group are economically inactive due to ill health. For the economy, this represents lost output and higher benefit spending; for individuals, earlier exit from the labour market is associated with worse health outcomes and reduced retirement income.<Cite nums={[2, 3]} /> Employer practices — flexible working, age-inclusive hiring, occupational health — vary dramatically.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Employment and retirement' },
          { id: 'sec-chart2', label: 'Inactivity and pay' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Over-50s employment rate" value="66" unit="%" direction="flat" polarity="up-is-good" changeText={<>Still below 69% pre-pandemic peak<Cite nums={1} /></>} sparklineData={[55, 58, 61, 64, 67, 69, 63, 64, 65, 66, 66]} href="#sec-chart1" />
          <MetricCard label="Average retirement age" value="64.8" unit="yrs" direction="up" polarity="up-is-good" changeText={<>Up from 63.1 in 2000<Cite nums={1} /></>} sparklineData={[63.1, 63.3, 63.5, 63.8, 64.0, 64.2, 64.4, 64.5, 64.6, 64.7, 64.8]} href="#sec-chart1" />
          <MetricCard label="Inactive due to ill health (50–64)" value="2.8m" unit="" direction="up" polarity="up-is-bad" changeText={<>Up 500k since 2019<Cite nums={3} /></>} sparklineData={[2.3, 2.3, 2.4, 2.4, 2.8, 2.9, 2.9, 2.85, 2.82, 2.8, 2.8]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Over-50s employment and average retirement age, 2000–2024" subtitle="Employment rate for those aged 50+ (%) and mean retirement age, UK" series={chart1Series} annotations={annotations} yLabel="% / years" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Health-related inactivity and earnings gap, 2000–2024" subtitle="Economically inactive due to ill health (thousands, 50–64) and earnings gap (%)" series={chart2Series} annotations={[]} yLabel="Thousands / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Age-positive workplaces" value="40%" unit="employers" description={<>40% of UK employers now have explicit age-inclusive recruitment practices — up from 25% in 2018 — though only 20% have an active programme to support the health of older workers in post.<Cite nums={3} /></>} source="Source: Centre for Ageing Better, employer survey." />
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
