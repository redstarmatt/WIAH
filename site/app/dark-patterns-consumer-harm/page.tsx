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
  { num: 1, name: 'Which?', dataset: 'Dark patterns in online shopping', url: 'https://www.which.co.uk/consumer-rights/regulation/dark-patterns', date: '2024' },
  { num: 2, name: 'Competition and Markets Authority', dataset: 'Online choice architecture review', url: 'https://www.gov.uk/cma-cases/online-choice-architecture-market-study', date: '2024' },
  { num: 3, name: 'ICO', dataset: 'Dark patterns in cookie consent', url: 'https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2023/01/ico-cracks-down-on-uk-websites-using-dark-patterns-to-obtain-cookie-consent/', date: '2024' },
];

interface DataPoint {
  year: number;
  consumerHarmEstimate: number;
  complaintsToOfgem: number;
  websitesWithDarkPatterns: number;
  enforcementActions: number;
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

export default function DarkPatternsConsumerHarmPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/dark-patterns-consumer-harm/dark_patterns_consumer_harm.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'consumerHarmEstimate', label: 'Consumer harm estimate (£m)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.consumerHarmEstimate })) },
        { id: 'websitesWithDarkPatterns', label: 'Major sites with dark patterns (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.websitesWithDarkPatterns })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'complaintsToOfgem', label: 'Consumer complaints about online practices', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.complaintsToOfgem })) },
        { id: 'enforcementActions', label: 'Regulatory enforcement actions', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.enforcementActions })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'CMA online choice architecture review' },
    { date: new Date(2024, 5, 1), label: 'Digital Markets, Competition and Consumers Act' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Economy"
          question="How Widespread Are Dark Patterns in UK Apps?"
          finding={<>The CMA&apos;s review of online choice architecture found that dark patterns — deceptive design features that manipulate consumer decisions — are present on the majority of major UK e-commerce and subscription websites.<Cite nums={1} /> Estimated consumer harm runs to hundreds of millions of pounds annually from subscriptions alone.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Dark patterns are user interface design choices that nudge consumers toward decisions that serve the business rather than the user: pre-ticked boxes for add-on purchases, countdown timers that create false urgency, complex cancellation flows that make it hard to leave a service, and &quot;drip pricing&quot; where the full cost is revealed only at the point of purchase. The Competition and Markets Authority&apos;s 2022 review of online choice architecture documented these practices across the UK&apos;s most-used e-commerce platforms and found them to be widespread and, in some cases, in breach of consumer protection law.<Cite nums={1} /></p>
            <p>The ICO has separately found that the majority of major UK websites use dark patterns in their cookie consent processes — making it easier to accept all cookies than to manage preferences — in breach of UK GDPR. Enforcement has been limited, partly because existing powers were considered inadequate. The Digital Markets, Competition and Consumers Act 2024 gives the CMA new powers to act against subscription traps and other misleading practices, with significant financial penalties for non-compliance.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Prevalence and harm' },
          { id: 'sec-chart2', label: 'Complaints and enforcement' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Sites with dark patterns" value="60" unit="%" direction="flat" polarity="up-is-bad" changeText={<>Of top 100 UK e-commerce sites<Cite nums={2} /></>} sparklineData={[55, 56, 57, 58, 59, 60, 60, 60, 60, 60, 60]} href="#sec-chart1" />
          <MetricCard label="Consumer harm (subscriptions)" value="£400m" unit="" direction="up" polarity="up-is-bad" changeText={<>From unwanted or hard-to-cancel subscriptions<Cite nums={1} /></>} sparklineData={[200, 230, 260, 290, 320, 350, 370, 380, 390, 395, 400]} href="#sec-chart1" />
          <MetricCard label="CMA enforcement actions" value="12" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 2 in 2019<Cite nums={2} /></>} sparklineData={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Dark patterns prevalence and consumer harm, 2017–2024" subtitle="Major sites with dark patterns (%) and estimated consumer harm (£m)" series={chart1Series} annotations={annotations} yLabel="% / £m" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Consumer complaints and enforcement actions, 2017–2024" subtitle="Consumer complaints about online design practices and regulatory enforcement actions" series={chart2Series} annotations={[]} yLabel="Count" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Subscription trap ban" value="2024" unit="legislation" description={<>The Digital Markets, Competition and Consumers Act 2024 introduces a &quot;subscription trap&quot; ban requiring businesses to make cancellation as easy as sign-up — the most significant consumer protection reform for digital services in a decade.<Cite nums={2} /></>} source="Source: DMCC Act 2024, CMA guidance." />
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
