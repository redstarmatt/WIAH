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
  { num: 1, name: 'DEFRA', dataset: 'Land Use in the United Kingdom', url: 'https://www.gov.uk/government/statistics/land-use-in-the-united-kingdom', date: '2023' },
  { num: 2, name: 'ONS', dataset: 'UK Natural Capital accounts', url: 'https://www.ons.gov.uk/economy/environmentalaccounts/bulletins/uknaturalcapitalaccounts/2023', date: '2023' },
  { num: 3, name: 'Land Use Policy Group', dataset: 'Land Use Policy Group evidence paper', url: 'https://www.lupg.org.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  agriculturalLandMha: number;
  urbanLandMha: number;
  woodlandMha: number;
  semiNaturalHabitatMha: number;
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

export default function LandUseChangePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/land-use-change/land_use_change.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'agriculturalLandMha', label: 'Agricultural land (million ha)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.agriculturalLandMha })) },
        { id: 'urbanLandMha', label: 'Urban and suburban land (million ha)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.urbanLandMha })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'woodlandMha', label: 'Woodland (million ha)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.woodlandMha })) },
        { id: 'semiNaturalHabitatMha', label: 'Semi-natural habitat (million ha)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.semiNaturalHabitatMha })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '25-Year Environment Plan' },
    { date: new Date(2021, 5, 1), label: 'Environment Act' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Is Britain's Land Use Changing?"
          finding={<>Agriculture covers around 70% of the UK's land area, but its footprint has slowly contracted as urban expansion and woodland planting absorb former farmland.<Cite nums={1} /> Semi-natural habitats — the most biodiverse land type — have declined to under 5% of England's land area, down from 30% in 1950, as agricultural improvement, development and drainage have reduced their extent.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain is one of the most nature-depleted countries in Europe, and land use is the primary driver. DEFRA's Land Use statistics show that agriculture covers around 17.6 million hectares — 72% of the UK's total area — though the proportion used for intensive arable production has shifted as farming subsidies changed. Urban and suburban land covers around 1.7 million hectares, or roughly 7% of the total, but its expansion onto greenfield sites is concentrated in accessible lowland areas where biodiversity value is often highest.<Cite nums={1} /></p>
            <p>Woodland now covers around 3.2 million hectares in the UK — 13% of the total — but the government's target of 30,000 ha of new planting annually has been missed every year. Semi-natural habitats including lowland heath, chalk grassland and lowland fen have declined dramatically since 1950 as agricultural drainage and improvement has converted these biodiverse lands to improved grassland and arable. The ONS Natural Capital accounts estimate that the value of UK natural capital per hectare has declined in real terms since 2010, as habitat quality has deteriorated faster than quantity.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-main', label: 'Major land uses' },
          { id: 'sec-natural', label: 'Woodland & habitat' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Agricultural land (UK)" value="17.6m ha" unit="" direction="down" polarity="up-is-good" changeText={<>Slowly declining<Cite nums={1} /></>} sparklineData={[18.2, 18.1, 18.0, 17.9, 17.9, 17.8, 17.8, 17.7, 17.7, 17.6, 17.6]} href="#sec-main" />
          <MetricCard label="Woodland cover (UK)" value="3.2m ha" unit="" direction="up" polarity="up-is-good" changeText={<>13% of UK land area<Cite nums={2} /></>} sparklineData={[2.9, 2.95, 2.98, 3.0, 3.02, 3.05, 3.08, 3.1, 3.14, 3.17, 3.2]} href="#sec-natural" />
          <MetricCard label="Semi-natural habitat (England)" value="<5%" unit="of land" direction="down" polarity="up-is-good" changeText={<>Down from 30% in 1950<Cite nums={3} /></>} sparklineData={[8, 7.5, 7, 6.5, 6, 5.8, 5.5, 5.3, 5.1, 5.0, 4.9]} href="#sec-natural" />
        </div>

        <ScrollReveal>
          <section id="sec-main" className="mb-12">
            <LineChart title="UK agricultural and urban land area, 1990–2023" subtitle="Agricultural land and urban/suburban land in million hectares." series={chart1Series} annotations={annotations} yLabel="Million ha" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-natural" className="mb-12">
            <LineChart title="UK woodland and semi-natural habitat extent, 1990–2023" subtitle="Woodland and semi-natural habitat in million hectares." series={chart2Series} annotations={[]} yLabel="Million ha" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Sustainable Farming Incentive" value="2023" unit="launched" description={<>The Sustainable Farming Incentive, launched in 2023 to replace EU farm subsidies, pays farmers for environmental actions including creating wildflower margins, managing hedgerows and reducing pesticide use — the first major reform of agricultural land use policy in a generation.<Cite nums={3} /></>} source="Source: DEFRA / Farming in Protected Landscapes programme." />
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
