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
  { num: 1, name: 'Natural England / JNCC', dataset: 'State of Nature UK report', url: 'https://stateofnature.org.uk/', date: '2023' },
  { num: 2, name: 'Rothamsted Research', dataset: 'Rothamsted Insect Survey', url: 'https://www.rothamsted.ac.uk/rothamsted-insect-survey', date: '2024' },
  { num: 3, name: 'CEH', dataset: 'UK Butterfly Monitoring Scheme', url: 'https://ukbms.org/official-statistics', date: '2024' },
];

interface DataPoint {
  year: number;
  flyingInsectBiomassIndex: number;
  butterflyAbundanceIndex: number;
  mothAbundanceIndex: number;
  farmlandBirdIndex: number;
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

export default function InsectBiomassDe­clinePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/insect-biomass-decline/insect_biomass_decline.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'flyingInsectBiomassIndex', label: 'Flying insect biomass index (1970=100)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.flyingInsectBiomassIndex })) },
        { id: 'butterflyAbundanceIndex', label: 'Butterfly abundance index (1976=100)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.butterflyAbundanceIndex })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'mothAbundanceIndex', label: 'Larger moth abundance index (1968=100)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mothAbundanceIndex })) },
        { id: 'farmlandBirdIndex', label: 'Farmland bird index (1970=100)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.farmlandBirdIndex })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2000, 5, 1), label: 'Wildfire farming evidence grows' },
    { date: new Date(2018, 5, 1), label: 'Neonicotinoid EU ban' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Much Has UK Insect Biomass Fallen?"
          finding={<>UK flying insect biomass has fallen by an estimated 60% since 1970, according to Rothamsted Insect Survey data — one of the longest-running insect monitoring programmes in the world.<Cite nums={[1, 2]} /> Butterfly abundance is down 50% since 1976 for species associated with the wider countryside, and larger moth species have declined by around 33% since 1968.<Cite nums={3} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Rothamsted Research has been running suction traps to monitor flying insect abundance since 1964, making its dataset among the most valuable long-term ecological records in Britain. Analysis published in 2019 found that total flying insect biomass at UK monitoring sites had fallen by around 60% since the 1970s — broadly consistent with international studies showing what has been called an "insect apocalypse". Agricultural intensification, pesticide use, light pollution, habitat loss and climate change are all contributing factors, often acting together in landscapes where insects have few refuges.<Cite nums={2} /></p>
            <p>Butterflies and moths are the best-monitored insect groups. The UK Butterfly Monitoring Scheme shows that species of the wider countryside — those that depend on farmland and rough grassland rather than specialist habitats — have fallen by around 50% since 1976. Farmland birds, which depend heavily on invertebrate food in summer, have declined by 56% since 1970, providing an indirect signal of insect collapse that is consistent with direct monitoring. The State of Nature 2023 report ranked invertebrate loss as one of the most serious biodiversity crises facing Britain.<Cite nums={[1, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-biomass', label: 'Biomass & butterflies' },
          { id: 'sec-moths', label: 'Moths & farmland birds' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Flying insect biomass since 1970" value="-60%" unit="" direction="down" polarity="up-is-good" changeText={<>Rothamsted suction trap data<Cite nums={2} /></>} sparklineData={[100, 95, 90, 85, 80, 75, 70, 65, 58, 52, 40]} href="#sec-biomass" />
          <MetricCard label="Wider countryside butterflies since 1976" value="-50%" unit="" direction="down" polarity="up-is-good" changeText={<>UK Butterfly Monitoring Scheme<Cite nums={3} /></>} sparklineData={[100, 96, 90, 85, 80, 75, 72, 68, 62, 57, 50]} href="#sec-biomass" />
          <MetricCard label="Larger moths since 1968" value="-33%" unit="" direction="down" polarity="up-is-good" changeText={<>Particularly in southern England<Cite nums={1} /></>} sparklineData={[100, 97, 93, 90, 86, 83, 80, 77, 74, 71, 67]} href="#sec-moths" />
        </div>

        <ScrollReveal>
          <section id="sec-biomass" className="mb-12">
            <LineChart title="Flying insect biomass and butterfly abundance indices, UK, 1970–2022" subtitle="Indices normalised to earliest year of monitoring = 100." series={chart1Series} annotations={annotations} yLabel="Index" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-moths" className="mb-12">
            <LineChart title="Larger moth abundance and farmland bird indices, UK, 1970–2022" subtitle="Moth and bird indices are correlated indicators of invertebrate availability in farmed landscapes." series={chart2Series} annotations={[]} yLabel="Index" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Agri-environment uptake" value="72%" unit="of farmland" description={<>Around 72% of England's farmland is now covered by some form of agri-environment scheme, providing payments for hedgerow management, wildflower margins and reduced pesticide use — though ecologists say the quality and ambition of schemes varies widely.<Cite nums={1} /></>} source="Source: DEFRA / Natural England agri-environment statistics." />
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
