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
  { num: 1, name: 'ONS', dataset: 'Low Carbon and Renewable Energy Economy Survey', url: 'https://www.ons.gov.uk/economy/environmentalaccounts/bulletins/finalestimates', date: '2024' },
  { num: 2, name: 'CBI', dataset: 'Green Economy Tracker — Jobs and Investment', url: 'https://www.cbi.org.uk/articles/green-economy-tracker/', date: '2024' },
  { num: 3, name: 'DESNZ', dataset: 'Green Jobs Taskforce Report', url: 'https://www.gov.uk/government/publications/green-jobs-taskforce-report', date: '2023' },
];

interface DataPoint {
  year: number;
  greenJobs: number;
  greenJobsGrowthRate: number;
  avgGreenSalary: number;
  greenSkillsGap: number;
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

export default function GreenJobsGrowthPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/green-jobs-growth/green_jobs_growth.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'greenJobs', label: 'Green economy jobs (thousands)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.greenJobs })) },
        { id: 'greenJobsGrowthRate', label: 'Annual green jobs growth rate (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.greenJobsGrowthRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgGreenSalary', label: 'Average green economy salary (£thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgGreenSalary })) },
        { id: 'greenSkillsGap', label: 'Vacancies unfilled due to green skills gap (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.greenSkillsGap })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Net zero target legislated' },
    { date: new Date(2022, 5, 1), label: 'British Energy Security Strategy' },
  ];

  return (
    <>
      <TopicNav topic="Economy & Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Environment"
          question="How Fast Are Green Jobs Growing in the UK?"
          finding={<>The UK's low-carbon and renewable energy sector employs around 280,000 people directly and supports over 700,000 jobs across supply chains — but the Green Jobs Taskforce warned that reaching net zero requires up to 2 million green jobs by 2030, meaning growth must accelerate dramatically.<Cite nums={1} /> A green skills gap is already constraining deployment of wind, heat pumps and EV infrastructure.<Cite nums={[2, 3]} /></>}
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's green economy is growing, but the pace of job creation needs to accelerate significantly to match the scale of the net zero transition.<Cite nums={1} /> ONS data on the low-carbon and renewable energy economy show strong growth in offshore wind, solar installation and electric vehicle infrastructure, with direct employment in these sectors rising to around 280,000. The sector is increasingly attractive to young workers and career changers, with average salaries above the national median and strong regional concentrations in areas like Humberside, Scotland and the South West — regions that previously relied on fossil fuel industries.</p>
            <p>However, the Green Jobs Taskforce, reporting to government in 2023, found that the skills pipeline is not keeping pace with deployment targets.<Cite nums={3} /> Heat pump installers, offshore wind technicians, grid engineers and retrofit specialists are all in short supply. Apprenticeship and training capacity is insufficient, and the curriculum in further education has been slow to incorporate green skills. The CBI estimates that unfilled vacancies due to green skills shortages already cost the economy over £2bn annually, and project this figure to rise sharply as deployment accelerates.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-jobs', label: 'Job creation' },
          { id: 'sec-skills', label: 'Skills gap' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Low-carbon economy direct jobs" value="280" unit="thousand" direction="up" polarity="up-is-good" changeText={<>Up from 170k in 2015<Cite nums={1} /></>} sparklineData={[170, 182, 195, 208, 220, 230, 240, 252, 263, 272, 280]} href="#sec-jobs" />
          <MetricCard label="Green jobs needed by 2030 (government target)" value="2,000" unit="thousand" direction="flat" polarity="up-is-good" changeText={<>Current progress well below trajectory<Cite nums={3} /></>} sparklineData={[170, 240, 320, 420, 540, 680, 840, 1050, 1350, 1680, 2000]} href="#sec-jobs" />
          <MetricCard label="Green skills vacancy gap" value="60" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Growing rapidly as deployment accelerates<Cite nums={2} /></>} sparklineData={[10, 15, 20, 25, 30, 35, 40, 48, 54, 58, 60]} href="#sec-skills" />
        </div>

        <ScrollReveal>
          <section id="sec-jobs" className="mb-12">
            <LineChart title="UK green economy employment, 2015–2024" subtitle="Direct green economy jobs (thousands) and annual growth rate (%), UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-skills" className="mb-12">
            <LineChart title="Green economy wages and skills gaps, 2015–2024" subtitle="Average green economy salary (£thousands) and unfilled vacancies due to green skills gap (thousands), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Offshore wind employment" value="32,000" unit="jobs" description={<>The offshore wind sector alone employs over 32,000 people in the UK, with the largest concentrations in Hull, Grimsby, Aberdeen and Edinburgh — providing high-quality employment in coastal communities that previously depended on fishing or fossil fuel industries.<Cite nums={1} /></>} source="Source: ONS, Low Carbon and Renewable Energy Economy Survey, 2024." />
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
