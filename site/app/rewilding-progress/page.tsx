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
  { num: 1, name: 'Rewilding Britain', dataset: 'UK Rewilding Network — Land and Sea Areas', url: 'https://www.rewildingbritain.org.uk/rewilding-network', date: '2024' },
  { num: 2, name: 'Natural England', dataset: 'Landscape Recovery Scheme Data', url: 'https://www.gov.uk/guidance/landscape-recovery', date: '2024' },
  { num: 3, name: 'JNCC', dataset: 'Species Reintroduction and Recovery Data', url: 'https://jncc.gov.uk/our-work/species-in-the-uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  rewildedHectares: number;
  reintroductionSpecies: number;
  landscapeRecoveryHa: number;
  beaverPopulation: number;
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

export default function RewildingProgressPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/rewilding-progress/rewilding_progress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'rewildedHectares', label: 'Land under rewilding principles (thousand ha)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rewildedHectares })) },
        { id: 'landscapeRecoveryHa', label: 'Landscape Recovery scheme land (thousand ha)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.landscapeRecoveryHa })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'reintroductionSpecies', label: 'Species with active reintroduction programmes', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.reintroductionSpecies })) },
        { id: 'beaverPopulation', label: 'Beaver population (England)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.beaverPopulation })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Beavers reintroduced to England' },
    { date: new Date(2022, 5, 1), label: 'Landscape Recovery scheme launched' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Much Land Is Being Rewilded in the UK?"
          finding={<>Around 200,000 hectares of UK land is now under some form of rewilding management — less than 1% of total land area — but the movement is accelerating rapidly, supported by government Landscape Recovery funding and growing voluntary and corporate investment in natural capital.<Cite nums={1} /> Beaver reintroductions have reached over 1,000 animals in England, with measurable ecosystem effects already visible.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Rewilding — the process of allowing ecosystems to restore their natural structure and function, often with the reintroduction of lost species as ecological processes — has moved from a fringe idea to a mainstream conservation approach in the UK over the past decade.<Cite nums={1} /> The Knepp Estate in West Sussex, where Sussex scrub habitats have been restored since 2001 with dramatic results for farmland birds and butterflies, became an internationally recognised model. Rewilding Britain's network now covers around 200,000 hectares of land and 200,000 hectares of sea managed under rewilding principles — still less than 1% of UK territory but growing rapidly.</p>
            <p>The government's Landscape Recovery scheme, launched in 2022 as part of the post-Brexit agricultural transition, provides long-term (15–30 year) funding for large-scale habitat restoration and species recovery projects.<Cite nums={2} /> The first two rounds attracted hundreds of applications and approved projects totalling tens of thousands of hectares. Beaver reintroductions — in England through licensed schemes in the River Otter in Devon and River Wye in Herefordshire, and more widely in Scotland — have demonstrated that reintroduced apex ecosystem engineers can rapidly improve water quality, reduce flooding and increase biodiversity. The England beaver population has grown to over 1,000 animals.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-land', label: 'Land area' },
          { id: 'sec-species', label: 'Species recovery' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Land under rewilding management" value="200" unit="thousand ha" direction="up" polarity="up-is-good" changeText={<>Up from near zero in 2010; <1% of UK land<Cite nums={1} /></>} sparklineData={[5, 15, 30, 50, 75, 100, 130, 155, 175, 190, 200]} href="#sec-land" />
          <MetricCard label="England beaver population" value="1,000+" unit="" direction="up" polarity="up-is-good" changeText={<>Up from reintroduction in 2019<Cite nums={3} /></>} sparklineData={[0, 50, 150, 280, 420, 560, 700, 820, 900, 970, 1000]} href="#sec-species" />
          <MetricCard label="Species with active reintroduction schemes" value="12" unit="" direction="up" polarity="up-is-good" changeText={<>Including beavers, white-tailed eagles, pine martens<Cite nums={3} /></>} sparklineData={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12]} href="#sec-species" />
        </div>

        <ScrollReveal>
          <section id="sec-land" className="mb-12">
            <LineChart title="UK rewilding land area, 2010–2024" subtitle="Land under rewilding management (thousand ha) and Landscape Recovery scheme area (thousand ha), UK." series={chart1Series} annotations={annotations} yLabel="Thousand ha" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-species" className="mb-12">
            <LineChart title="Species reintroduction programmes and beaver population, 2010–2024" subtitle="Active reintroduction programmes and England beaver population, UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="30x30 commitment" value="30%" unit="land & sea protected by 2030" description={<>The UK's commitment to protect 30% of land and sea by 2030 ('30x30'), signed at the Global Biodiversity Framework in 2022, is the most significant rewilding and conservation policy commitment in a generation — though current progress is well behind the trajectory required to meet the target.<Cite nums={2} /></>} source="Source: Defra, 30x30 Progress Report, 2024." />
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
