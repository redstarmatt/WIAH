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
  { num: 1, name: 'Fostering Network', dataset: 'Foster Care in England: A Review', url: 'https://www.thefosteringnetwork.org.uk/policy-practice/stats-and-facts', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Children Looked After in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2024' },
  { num: 3, name: 'Nuffield Family Justice Observatory', dataset: 'Fostering Research and Data', url: 'https://www.nuffieldfjo.org.uk/', date: '2023' },
];

interface DataPoint {
  year: number;
  fosterCarerShortfall: number;
  childrenLookedAfter: number;
  newFosterCarers: number;
  commercialFosteringShare: number;
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

export default function FosterCarerShortagePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/foster-carer-shortage/foster_carer_shortage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'childrenLookedAfter', label: 'Children in care in England (thousands)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childrenLookedAfter })) },
        { id: 'fosterCarerShortfall', label: 'Estimated foster carer shortfall', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fosterCarerShortfall })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'newFosterCarers', label: 'New foster carers approved per year (thousands)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.newFosterCarers })) },
        { id: 'commercialFosteringShare', label: 'Children with independent fostering agencies (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.commercialFosteringShare })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: recruitment difficult' },
    { date: new Date(2022, 5, 1), label: 'Fostering sufficiency review published' },
  ];

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="How Severe Is the Foster Carer Shortage?"
          finding={<>England faces a shortage of around 9,000 foster families, with 83,000 children in care — the highest number since records began — but insufficient local authority capacity to place them all in suitable family settings.<Cite nums={1} /> Independent fostering agencies now care for over 40% of children looked after, raising questions about cost and quality.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The number of children in care in England has risen to over 83,000 — the highest since records began — driven by a range of factors including increased identification of children at risk, the legacy of the Covid-19 pandemic on family stress and domestic violence, and cuts to early help and family support services that might have prevented some children entering care.<Cite nums={2} /> Against this rising demand, the foster carer workforce is under severe pressure: the Fostering Network estimates a shortfall of around 9,000 foster families, meaning many children are placed in residential care — which is significantly more expensive and generally associated with worse outcomes — or placed at distance from their home communities, disrupting school and family contact.</p>
            <p>Recruitment of new foster carers has been consistently below the level needed to replace those leaving fostering and meet growing demand. Independent Fostering Agencies (IFAs) — private and voluntary sector organisations — now place around 40–45% of all children in foster care, with councils paying IFAs significantly more per placement than the cost of in-house foster carers.<Cite nums={1} /> The government's Independent Review of Children's Social Care (MacAlister Review) published in 2022 called for a fundamental reform of the system, including significant investment in family support to prevent children entering care, and better pay and support for local authority foster carers to reduce reliance on IFAs.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-demand', label: 'Children in care' },
          { id: 'sec-recruitment', label: 'Carer recruitment' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Children in care in England" value="83" unit="thousand" direction="up" polarity="up-is-bad" changeText={<>Record high; up from 64k in 2010<Cite nums={2} /></>} sparklineData={[64, 67, 69, 70, 72, 74, 76, 78, 80, 82, 83]} href="#sec-demand" />
          <MetricCard label="Foster carer shortfall" value="9,000" unit="" direction="up" polarity="up-is-bad" changeText={<>Gap between supply and demand<Cite nums={1} /></>} sparklineData={[4000, 5000, 6000, 6500, 7000, 7500, 8000, 8200, 8500, 8800, 9000]} href="#sec-recruitment" />
          <MetricCard label="Children with IFA foster carers" value="42" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up from 28% in 2010; costs significantly more<Cite nums={1} /></>} sparklineData={[28, 30, 31, 33, 35, 37, 38, 40, 40, 41, 42]} href="#sec-recruitment" />
        </div>

        <ScrollReveal>
          <section id="sec-demand" className="mb-12">
            <LineChart title="Children in care and foster carer shortfall, 2010–2024" subtitle="Children in care in England (thousands) and estimated foster carer shortfall, England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-recruitment" className="mb-12">
            <LineChart title="Foster carer recruitment and IFA use, 2010–2024" subtitle="New foster carers approved annually (thousands) and IFA placement share (%), England." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Mockingbird Family Model" value="50+" unit="constellations in UK" description={<>The Mockingbird Family Model, which groups foster families around a central 'hub' carer providing support and respite, has expanded to over 50 constellations in the UK, with evidence showing improved placement stability and reduced breakdowns compared to traditional models.<Cite nums={3} /></>} source="Source: Fostering Network, Mockingbird Programme Evaluation, 2024." />
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
