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
  { num: 1, name: 'UKCMF', dataset: 'UK Ocean Acidification Research Programme', url: 'https://www.oceanacidification.org.uk/', date: '2024' },
  { num: 2, name: 'Cefas', dataset: 'UK Coastal and Ocean Carbon Monitoring', url: 'https://www.cefas.co.uk/cefas-data-hub/ocean-acidification/', date: '2024' },
  { num: 3, name: 'OSPAR', dataset: 'Quality Status Report — UK Waters', url: 'https://www.ospar.org/work-areas/cross-cutting-issues/ocean-acidification', date: '2023' },
];

interface DataPoint {
  year: number;
  seaPhLevel: number;
  aragoniteSaturation: number;
  coralHealthIndex: number;
  shellfishProductionIndex: number;
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

export default function OceanAcidificationUKPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/ocean-acidification-uk/ocean_acidification_uk.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'seaPhLevel', label: 'Mean surface pH, UK shelf seas', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.seaPhLevel })) },
        { id: 'aragoniteSaturation', label: 'Aragonite saturation state (Ωarag)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.aragoniteSaturation })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'coralHealthIndex', label: 'Cold-water coral health index (100=baseline)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.coralHealthIndex })) },
        { id: 'shellfishProductionIndex', label: 'UK shellfish production index (100=2000)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.shellfishProductionIndex })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2010, 5, 1), label: 'UK ocean acidification programme begins' },
    { date: new Date(2020, 5, 1), label: 'OSPAR quality status assessment' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Is Ocean Acidification Affecting UK Waters?"
          finding={<>The pH of UK shelf seas has fallen by around 0.1 units since the pre-industrial era — representing a 26% increase in acidity — as the ocean absorbs rising atmospheric CO₂. Cold-water coral ecosystems off Scotland and the Faroe–Shetland channel are already showing signs of stress, and UK shellfish aquaculture faces increasing risk from the more corrosive water.<Cite nums={1} /> The process is irreversible on human timescales without emissions reduction.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ocean acidification — the decrease in seawater pH caused by absorption of atmospheric CO₂ — is less visible than marine heat waves or storm damage but is arguably the most consequential long-term change occurring in UK seas. The UK shelf seas, including the North Sea, Celtic Sea and parts of the Atlantic off Scotland, have experienced a measurable decline in pH since continuous monitoring began, and modelling work suggests this trend will accelerate in line with global CO₂ concentrations.<Cite nums={1} /> The change affects the ability of shell-forming organisms — corals, oysters, mussels, sea urchins, pteropods — to build and maintain their calcium carbonate structures.</p>
            <p>The UK hosts some of the most extensive cold-water coral ecosystems in the world, particularly the Darwin Mounds north of Scotland and the Lophelia-dominated reefs on the Rockall Bank. These deep-water ecosystems are particularly vulnerable to acidification because deeper water naturally has lower aragonite saturation, and the anthropogenic acidification signal pushes some areas toward undersaturation where shell dissolution becomes possible.<Cite nums={2} /> For UK shellfish aquaculture — oysters, mussels and scallops — the risks are more immediate: hatcheries in the Pacific Northwest of the USA have already had to modify operations to protect larvae from acidic upwelling water, and UK producers are monitoring similar risks closely.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chemistry', label: 'Ocean chemistry' },
          { id: 'sec-impacts', label: 'Ecosystem impacts' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="pH change since pre-industrial era" value="-0.1" unit="units" direction="down" polarity="down-is-bad" changeText={<>26% increase in acidity; continuing to fall<Cite nums={1} /></>} sparklineData={[0, -0.02, -0.03, -0.04, -0.05, -0.06, -0.07, -0.08, -0.09, -0.10, -0.10]} href="#sec-chemistry" />
          <MetricCard label="Aragonite saturation (Ωarag)" value="1.8" unit="" direction="down" polarity="down-is-bad" changeText={<>Down from ~2.0 pre-industrial; <1 = corrosive<Cite nums={2} /></>} sparklineData={[2.0, 1.99, 1.97, 1.96, 1.94, 1.92, 1.90, 1.88, 1.86, 1.83, 1.8]} href="#sec-chemistry" />
          <MetricCard label="Cold-water coral health index" value="82" unit="" direction="down" polarity="down-is-bad" changeText={<>Down from 100 in 2000 baseline<Cite nums={3} /></>} sparklineData={[100, 99, 97, 96, 94, 93, 91, 89, 87, 84, 82]} href="#sec-impacts" />
        </div>

        <ScrollReveal>
          <section id="sec-chemistry" className="mb-12">
            <LineChart title="UK sea pH and aragonite saturation, 1990–2024" subtitle="Mean surface pH and aragonite saturation state (Ωarag), UK shelf seas." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-impacts" className="mb-12">
            <LineChart title="Cold-water coral health and shellfish production, 2000–2024" subtitle="Cold-water coral health index and UK shellfish production index (2000=100), UK." series={chart2Series} annotations={[]} yLabel="Index (2000=100)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="UK ocean monitoring" value="30+ years" unit="of data" description={<>The UK has one of the longest continuous ocean acidification monitoring time series in the world, with stations in the North Sea, Celtic Sea and Scottish shelf providing data critical to understanding the rate and regional distribution of acidification.<Cite nums={2} /></>} source="Source: Cefas, UK Ocean Carbon Monitoring Programme, 2024." />
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
