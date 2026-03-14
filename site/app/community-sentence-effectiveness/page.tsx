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
  { num: 1, name: 'Ministry of Justice', dataset: 'Proven reoffending statistics', url: 'https://www.gov.uk/government/collections/proven-reoffending-statistics', date: '2024' },
  { num: 2, name: 'Ministry of Justice', dataset: 'Criminal justice statistics — sentencing', url: 'https://www.gov.uk/government/collections/criminal-justice-statistics-quarterly', date: '2024' },
  { num: 3, name: 'Nacro', dataset: 'Community sentences and reoffending evidence review', url: 'https://www.nacro.org.uk/news/nacro-news/community-sentences/', date: '2024' },
];

interface DataPoint {
  year: number;
  reoffendingRateCommunityPct: number;
  reoffendingRateCustodyPct: number;
  communityOrdersThousands: number;
  completionRatePct: number;
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

export default function CommunitySentenceEffectivenessPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/community-sentence-effectiveness/community_sentence_effectiveness.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'reoffendingRateCommunityPct', label: 'Reoffending rate — community sentences (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.reoffendingRateCommunityPct })) },
        { id: 'reoffendingRateCustodyPct', label: 'Reoffending rate — short custodial sentences (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.reoffendingRateCustodyPct })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'communityOrdersThousands', label: 'Community orders given (000s)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.communityOrdersThousands })) },
        { id: 'completionRatePct', label: 'Community order completion rate (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.completionRatePct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'Probation service reunification' },
    { date: new Date(2019, 5, 1), label: 'Transforming Rehabilitation ends' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Do Community Sentences Reduce Reoffending?"
          finding={<>MoJ proven reoffending data consistently shows that community sentences have lower reoffending rates than short custodial sentences — 24% vs 60% for sentences under 12 months — yet courts still imprison hundreds of thousands for short periods each year.<Cite nums={1} /> The completion rate for community orders has declined to around 65%, reflecting probation service capacity pressures.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Ministry of Justice's proven reoffending statistics track what proportion of offenders commit a further offence within a year of completing their sentence. The data is unambiguous: community sentences — which include unpaid work, curfews, rehabilitation programmes and supervision — have reoffending rates of around 24%, compared to around 60% for short custodial sentences of under 12 months. Short prison sentences disrupt employment, housing and family relationships without providing sufficient time for rehabilitation, effectively manufacturing future reoffending.<Cite nums={1} /></p>
            <p>Despite this evidence, courts in England and Wales imposed around 250,000 immediate custodial sentences in 2022, the majority for under 12 months. The use of community orders has fallen from a peak of around 180,000 per year in the late 2000s to around 110,000 in 2022 — driven in part by cuts to probation supervision capacity and magistrates' concerns about enforcement. The botched Transforming Rehabilitation privatisation (2014–2019) fragmented the probation service and is widely blamed for reducing the quality and capacity of community supervision.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-reoffending', label: 'Reoffending rates' },
          { id: 'sec-orders', label: 'Community orders' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Reoffending — community sentences" value="24%" unit="" direction="flat" polarity="up-is-bad" changeText={<>vs 60% for short custody<Cite nums={1} /></>} sparklineData={[26, 26, 25, 25, 25, 25, 24, 24, 24, 24, 24]} href="#sec-reoffending" />
          <MetricCard label="Reoffending — short custody" value="60%" unit="" direction="flat" polarity="up-is-bad" changeText={<>Unchanged for a decade<Cite nums={1} /></>} sparklineData={[62, 61, 61, 60, 60, 60, 60, 60, 60, 60, 60]} href="#sec-reoffending" />
          <MetricCard label="Community order completion rate" value="65%" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 75% pre-privatisation<Cite nums={2} /></>} sparklineData={[75, 74, 73, 72, 71, 69, 68, 67, 66, 65, 65]} href="#sec-orders" />
        </div>

        <ScrollReveal>
          <section id="sec-reoffending" className="mb-12">
            <LineChart title="Proven reoffending rates — community vs custody, England and Wales, 2010–2022" subtitle="% reoffending within 1 year for community sentences and short custodial sentences." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-orders" className="mb-12">
            <LineChart title="Community orders given and completion rates, 2010–2022" subtitle="Annual community orders (000s); order completion rate (%)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Problem-solving courts" value="-30%" unit="reoffending" description={<>Specialist problem-solving courts — for drug, alcohol and domestic abuse offending — combine judicial oversight with intensive support and are associated with 25–30% reductions in reoffending compared to standard court processes, according to MoJ evaluations.<Cite nums={3} /></>} source="Source: MoJ problem-solving courts evaluation." />
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
