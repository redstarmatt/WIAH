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
  { num: 1, name: 'ONS', dataset: 'Which occupations are at highest risk of automation?', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/whichoccupationsareatriskofautomation/2019-03-25', date: '2024' },
  { num: 2, name: 'Institute for Public Policy Research', dataset: 'Technology and the future of work', url: 'https://www.ippr.org/research/publications/technology-and-the-future-of-work', date: '2024' },
  { num: 3, name: 'McKinsey Global Institute', dataset: 'UK AI adoption and labour market impacts', url: 'https://www.mckinsey.com/featured-insights/future-of-work', date: '2024' },
];

interface DataPoint {
  year: number;
  highAutomationRiskJobs: number;
  aiAffectedJobsEstimate: number;
  aiJobCreationEstimate: number;
  wagebillAtRisk: number;
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

export default function AiJobDisplacementPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/ai-job-displacement/ai_job_displacement.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'highAutomationRiskJobs', label: 'Jobs at high automation risk (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.highAutomationRiskJobs })) },
        { id: 'aiAffectedJobsEstimate', label: 'Jobs significantly affected by AI (millions)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.aiAffectedJobsEstimate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'aiJobCreationEstimate', label: 'New AI-enabled jobs (millions)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.aiJobCreationEstimate })) },
        { id: 'wagebillAtRisk', label: 'Wage bill at risk (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.wagebillAtRisk })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'ChatGPT launches — AI exposure debate accelerates' },
    { date: new Date(2023, 5, 1), label: 'IPPR generative AI report' },
  ];

  return (
    <>
      <TopicNav topic="Economy & Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Digital"
          question="Which Jobs Is AI Most Likely to Displace?"
          finding={<>IPPR estimates that around 11 million UK jobs — 30% of the workforce — are exposed to significant disruption from generative AI, with clerical, administrative, and customer service roles most at risk.<Cite nums={1} /> The transition is likely to augment rather than eliminate most jobs, but will require substantial reskilling investment.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The arrival of large language models and generative AI has significantly changed the terms of the automation debate. Earlier analyses — like the ONS 2019 study based on Frey and Osborne&apos;s methods — focused on routine manual and cognitive tasks. Generative AI now puts non-routine cognitive work in scope: legal research, financial analysis, customer service, programming, and content creation are all affected. The IPPR&apos;s 2023 analysis found that 11 million UK jobs are exposed to some substitution risk, with 7.9 million at risk of partial automation and 1.5 million potentially facing full substitution.<Cite nums={1} /></p>
            <p>The crucial distinction is between displacement (jobs lost entirely) and augmentation (tasks changed, making workers more productive). Historical experience with automation suggests that the latter dominates in aggregate, but the transition is never costless: workers in displaced roles frequently experience wage cuts, unemployment spells, and geographic relocation. The distribution of impacts is also sharply unequal: routine cognitive workers — disproportionately women and those in lower-paid sectors — face greater disruption than high-income professionals.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Jobs at risk' },
          { id: 'sec-chart2', label: 'Creation and wage impact' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Jobs significantly AI-exposed" value="11m" unit="" direction="up" polarity="up-is-bad" changeText={<>30% of UK workforce by 2023 estimates<Cite nums={2} /></>} sparklineData={[6, 7, 7.5, 8, 9, 10, 11, 11, 11, 11, 11]} href="#sec-chart1" />
          <MetricCard label="Jobs at full substitution risk" value="1.5m" unit="" direction="up" polarity="up-is-bad" changeText={<>Clerical and data entry most affected<Cite nums={2} /></>} sparklineData={[0.5, 0.7, 0.9, 1.0, 1.1, 1.2, 1.4, 1.5, 1.5, 1.5, 1.5]} href="#sec-chart1" />
          <MetricCard label="Wage bill at risk (£bn)" value="£140bn" unit="" direction="up" polarity="up-is-bad" changeText={<>Represents around 10% of total wage bill<Cite nums={3} /></>} sparklineData={[80, 90, 100, 110, 120, 130, 135, 138, 140, 140, 140]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="UK jobs exposed to AI automation risk, 2018–2024" subtitle="Jobs at high automation risk and jobs significantly affected by generative AI (millions)" series={chart1Series} annotations={annotations} yLabel="Millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="AI job creation estimates and wage bill at risk, 2018–2024" subtitle="Estimated new AI-enabled jobs (millions) and total wage bill at substitution risk (£bn)" series={chart2Series} annotations={[]} yLabel="Millions / £bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="AI upskilling" value="1.4m" unit="workers (government target)" description={<>The government&apos;s AI Skills for Business scheme aims to reach 1.4 million workers with AI literacy training by 2030, though critics argue this falls well short of the scale of reskilling required.<Cite nums={2} /></>} source="Source: DSIT, AI skills strategy." />
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
