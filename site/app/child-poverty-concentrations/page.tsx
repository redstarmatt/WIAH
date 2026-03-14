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
  { num: 1, name: 'DWP', dataset: 'Households Below Average Income', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', date: '2024' },
  { num: 2, name: 'End Child Poverty Coalition', dataset: 'Child poverty rates by constituency', url: 'https://www.endchildpoverty.org.uk/', date: '2024' },
  { num: 3, name: 'Joseph Rowntree Foundation', dataset: 'UK Poverty report', url: 'https://www.jrf.org.uk/report/uk-poverty-2024', date: '2024' },
];

interface DataPoint {
  year: number;
  relativePovertyRate: number;
  absolutePovertyRate: number;
  workingFamiliesInPoverty: number;
  destitutionChildren: number;
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

export default function ChildPovertyConcentrationsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/child-poverty-concentrations/child_poverty_concentrations.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'relativePovertyRate', label: 'Relative poverty rate (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.relativePovertyRate })) },
        { id: 'absolutePovertyRate', label: 'Absolute poverty rate (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.absolutePovertyRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'workingFamiliesInPoverty', label: 'Children in working families in poverty (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.workingFamiliesInPoverty })) },
        { id: 'destitutionChildren', label: 'Children in destitution (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.destitutionChildren })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2013, 5, 1), label: 'Two-child benefit limit announced' },
    { date: new Date(2021, 5, 1), label: '£20 UC uplift removed' },
  ];

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="Where in the UK Is Child Poverty Worst?"
          finding={<>Around 4.3 million children — 30% of all children — live in relative poverty after housing costs in 2022–23.<Cite nums={1} /> The concentration is highest in inner London, parts of the Midlands and North, and areas with large ethnic minority populations — with some constituencies showing rates above 50%.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Child poverty in the UK is measured on both a relative basis (below 60% of median income) and an absolute basis (below a fixed 2010–11 threshold). After declining significantly in the 2000s under Labour&apos;s targeted anti-poverty strategy, the rate has risen since 2012 as benefit changes took effect. The two-child limit — which restricts child benefit and tax credit support to the first two children — has been particularly associated with increases in larger-family poverty, and the Joseph Rowntree Foundation estimates it pushes around 500,000 children into poverty.<Cite nums={1} /></p>
            <p>Perhaps the most striking feature of modern child poverty is that it is increasingly a feature of working households. Around 72% of children in poverty live in a family where at least one adult works — driven by low wages, insecure hours, and high housing and childcare costs. Geographic concentration is sharp: the End Child Poverty Coalition&apos;s annual analysis shows constituencies where more than half of children live in poverty, predominantly in inner cities. The cost of living crisis pushed destitution figures to record levels in 2022–23.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Poverty rates' },
          { id: 'sec-chart2', label: 'Working poverty and destitution' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Children in relative poverty" value="4.3m" unit="" direction="up" polarity="up-is-bad" changeText={<>30% of all children; up from 27% in 2012<Cite nums={1} /></>} sparklineData={[3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.2, 4.3, 4.3]} href="#sec-chart1" />
          <MetricCard label="In working family poverty" value="72" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up from 57% in 2000<Cite nums={3} /></>} sparklineData={[57, 59, 61, 63, 65, 67, 68, 69, 70, 71, 72]} href="#sec-chart2" />
          <MetricCard label="Destitution (children)" value="1.0m" unit="" direction="up" polarity="up-is-bad" changeText={<>Record high; unable to meet basic needs<Cite nums={3} /></>} sparklineData={[0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.7, 0.85, 0.95, 1.0]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Child poverty rates, 2000–2023 (after housing costs)" subtitle="Relative poverty (below 60% median income) and absolute poverty rates, UK children" series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Working family poverty and destitution, 2000–2023" subtitle="Children in poverty in working families (%) and children in destitution (thousands)" series={chart2Series} annotations={[]} yLabel="% / thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Free school meals" value="2.1m" unit="eligible children" description={<>Around 2.1 million children receive free school meals — providing a guaranteed nutritious meal for those most at risk, though take-up rates and eligibility thresholds vary across school types.<Cite nums={2} /></>} source="Source: DfE, School census free school meals data." />
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
