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
  { num: 1, name: 'DEFRA', dataset: 'UK statistics on waste — packaging', url: 'https://www.gov.uk/government/statistics/uk-waste-data', date: '2024' },
  { num: 2, name: 'WRAP', dataset: 'Plastics market situation report', url: 'https://www.wrap.org.uk/resources/report/plastics-market-situation-report', date: '2024' },
  { num: 3, name: 'Environment Agency', dataset: 'Extended Producer Responsibility for packaging', url: 'https://www.gov.uk/guidance/extended-producer-responsibility-for-packaging', date: '2024' },
];

interface DataPoint {
  year: number;
  plasticPackagingTonnes: number;
  recyclingRatePct: number;
  singleUsePlasticItems: number;
  plasticBottleReturnRate: number;
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

export default function PlasticPackagingReductionPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/plastic-packaging-reduction/plastic_packaging_reduction.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'plasticPackagingTonnes', label: 'Plastic packaging placed on market (000 tonnes)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.plasticPackagingTonnes })) },
        { id: 'recyclingRatePct', label: 'Plastic packaging recycling rate (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.recyclingRatePct })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'singleUsePlasticItems', label: 'Single-use plastic items (billions)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.singleUsePlasticItems })) },
        { id: 'plasticBottleReturnRate', label: 'Plastic bottle return rate (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.plasticBottleReturnRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'Plastic bag charge doubles to 10p' },
    { date: new Date(2023, 5, 1), label: 'Plastic levy on packaging' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="Is the UK Actually Using Less Plastic?"
          finding={<>The UK places around 2.2 million tonnes of plastic packaging on the market annually, and while the recycling rate has risen from 25% to around 46%, total plastic use has not fallen significantly despite multiple pledges and policy interventions.<Cite nums={[1, 2]} /> Deposit return schemes and extended producer responsibility, designed to drive real reductions, have faced repeated delays.<Cite nums={3} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK generates more plastic packaging waste per person than almost any other European country. DEFRA statistics show that around 2.2 million tonnes of plastic packaging is placed on the UK market each year, a figure that has been largely flat since 2015 despite government pledges to reduce single-use plastics. The plastic packaging tax — introduced in April 2022 at £200/tonne on packaging with less than 30% recycled content — has incentivised some substitution of virgin for recycled plastic, but has not reduced total volumes.<Cite nums={1} /></p>
            <p>The recycling rate for plastic packaging has improved from around 25% in 2010 to around 46% in 2022, but this still means the majority of plastic packaging is incinerated or landfilled. WRAP's market analysis shows that flexible plastic packaging — pouches, wrappers, films — remains almost entirely unrecycled because kerbside collections cannot handle it. Extended producer responsibility for packaging, designed to make producers fund recycling infrastructure, was delayed to 2025 after industry lobbying. The deposit return scheme for plastic bottles, originally planned for 2023, has also faced repeated postponements.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-packaging', label: 'Packaging volumes' },
          { id: 'sec-singleuse', label: 'Single-use & returns' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Plastic packaging on market" value="2.2m tonnes" unit="/yr" direction="flat" polarity="up-is-bad" changeText={<>Broadly unchanged since 2015<Cite nums={1} /></>} sparklineData={[2.1, 2.15, 2.2, 2.25, 2.2, 2.18, 2.2, 2.2, 2.21, 2.2, 2.2]} href="#sec-packaging" />
          <MetricCard label="Plastic packaging recycling rate" value="46%" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 25% in 2010<Cite nums={2} /></>} sparklineData={[25, 27, 30, 32, 35, 38, 40, 42, 43, 45, 46]} href="#sec-packaging" />
          <MetricCard label="Flexible plastic recycling rate" value="~6%" unit="" direction="up" polarity="up-is-good" changeText={<>Most kerbsides can't collect it<Cite nums={2} /></>} sparklineData={[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6]} href="#sec-singleuse" />
        </div>

        <ScrollReveal>
          <section id="sec-packaging" className="mb-12">
            <LineChart title="Plastic packaging volumes and recycling rates, UK, 2010–2023" subtitle="Total plastic packaging on market (000 tonnes); packaging recycling rate (%)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-singleuse" className="mb-12">
            <LineChart title="Single-use plastic items and deposit return rates, 2010–2023" subtitle="Single-use plastic items sold (billions); plastic bottle return rate where DRS operates (%)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Single-use carrier bags" value="-97%" unit="reduction" description={<>The 5p carrier bag charge, introduced in England in 2015 and increased to 10p in 2021, reduced single-use plastic bag use by 97% from the pre-charge peak of 7.6 billion bags per year — one of the most effective single-use plastic policies globally.<Cite nums={1} /></>} source="Source: DEFRA single-use plastic bag charge statistics." />
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
