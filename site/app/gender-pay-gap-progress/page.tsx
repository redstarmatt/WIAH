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
  { num: 1, name: 'ONS', dataset: 'Annual Survey of Hours and Earnings — Gender Pay Gap', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024', date: '2024' },
  { num: 2, name: 'Government Equalities Office', dataset: 'Gender Pay Gap Reporting Statistics', url: 'https://gender-pay-gap.service.gov.uk/viewing/download', date: '2024' },
  { num: 3, name: 'EHRC', dataset: 'Is Britain Fairer? Gender Equality Report', url: 'https://www.equalityhumanrights.com/en/publication-download/is-britain-fairer', date: '2022' },
];

interface DataPoint {
  year: number;
  medianGpgFullTime: number;
  medianGpgAllEmployees: number;
  employersReporting: number;
  cSuiteGap: number;
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

export default function GenderPayGapProgressPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/gender-pay-gap-progress/gender_pay_gap_progress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'medianGpgFullTime', label: 'Gender pay gap, full-time workers (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.medianGpgFullTime })) },
        { id: 'medianGpgAllEmployees', label: 'Gender pay gap, all employees (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.medianGpgAllEmployees })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'employersReporting', label: 'Employers reporting gender pay gap (thousands)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.employersReporting })) },
        { id: 'cSuiteGap', label: 'C-suite gender pay gap (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cSuiteGap })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Mandatory gender pay gap reporting begins' },
    { date: new Date(2020, 5, 1), label: 'Covid-19: reporting suspended' },
  ];

  return (
    <>
      <TopicNav topic="Society & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Economy"
          question="How Quickly Is the Gender Pay Gap Closing?"
          finding={<>The UK gender pay gap for full-time workers has fallen from 17.4% in 1997 to 7.7% in 2024, but progress has slowed significantly since 2012, and at the current rate it would take over 30 years to close entirely.<Cite nums={1} /> For all employees (including part-time), the gap remains at 13.1%, driven largely by women's greater likelihood of part-time work.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The gender pay gap — the difference between men's and women's median hourly earnings — has narrowed substantially since the 1970s, but progress has slowed markedly.<Cite nums={1} /> For full-time workers, the median gap was 7.7% in 2024, down from 17.4% in 1997. This narrowing reflects increased women's educational attainment, reduced overt discrimination, and women entering a wider range of occupations. However, the remaining gap is persistent and deeply structural: it widens sharply in the years after childbirth (the 'child penalty'), it varies dramatically by sector and seniority, and it reflects a labour market still substantially segregated by gender into higher-paid male-dominated and lower-paid female-dominated occupations.</p>
            <p>Mandatory gender pay gap reporting, introduced in 2017 for employers with 250+ employees, has created transparency and reputational pressure on organisations with large gaps.<Cite nums={2} /> However, analysis of employer reports shows that a majority of large employers have gaps favouring men, and only a minority have reduced their gap since reporting began. The Equality and Human Rights Commission's Is Britain Fairer? report finds persistent gaps at senior levels: women account for 34% of FTSE 100 board members but hold significantly fewer executive roles, and the C-suite pay gap is considerably larger than the overall employer median gap.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trend', label: 'Long-term trend' },
          { id: 'sec-reporting', label: 'Pay gap reporting' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Gender pay gap, full-time workers" value="7.7" unit="%" direction="down" polarity="down-is-good" changeText={<>Down from 17.4% in 1997; but progress slowing<Cite nums={1} /></>} sparklineData={[17.4, 15.8, 14.2, 13.0, 11.8, 10.8, 10.0, 9.2, 8.7, 8.2, 7.7]} href="#sec-trend" />
          <MetricCard label="Gender pay gap, all employees" value="13.1" unit="%" direction="down" polarity="down-is-good" changeText={<>Includes part-time workers; higher due to sector mix<Cite nums={1} /></>} sparklineData={[25, 22, 20, 18, 17, 16, 15.5, 15, 14.5, 13.8, 13.1]} href="#sec-trend" />
          <MetricCard label="Years to close gap at current pace" value="30+" unit="years" direction="flat" polarity="up-is-bad" changeText={<>Progress rate has slowed since 2012<Cite nums={2} /></>} sparklineData={[25, 27, 28, 29, 30, 31, 32, 33, 32, 31, 30]} href="#sec-trend" />
        </div>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart title="UK gender pay gap trend, 1997–2024" subtitle="Median gender pay gap for full-time and all employees (%), UK." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-reporting" className="mb-12">
            <LineChart title="Gender pay gap reporting and C-suite disparity, 2017–2024" subtitle="Employers submitting gender pay gap reports (thousands) and C-suite pay gap (%), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Child penalty" value="33%" unit="earnings penalty" description={<>Women in the UK experience an average 33% reduction in hourly earnings relative to men in the years after having a child — the 'child penalty' — driven by reduced hours, occupational downgrading and career breaks, representing the largest single driver of the gender pay gap.<Cite nums={3} /></>} source="Source: IFS, The Gender Earnings Gap in the UK, 2023." />
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
