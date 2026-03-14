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
  { num: 1, name: 'People\'s Trust for Endangered Species', dataset: 'State of Britain\'s Hedgehogs', url: 'https://www.ptes.org/hedgehogs/state-of-britains-hedgehogs/', date: '2023' },
  { num: 2, name: 'British Hedgehog Preservation Society', dataset: 'Hedgehog Street survey data', url: 'https://www.hedgehogstreet.org/', date: '2024' },
  { num: 3, name: 'Natural England', dataset: 'State of Nature report', url: 'https://stateofnature.org.uk/', date: '2023' },
];

interface DataPoint {
  year: number;
  estimatedPopulation: number;
  ruralDeclineIndex: number;
  urbanDeclineIndex: number;
  roadDeathsIndex: number;
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

export default function HedgehogPopulationPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/hedgehog-population/hedgehog_population.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'estimatedPopulation', label: 'Estimated hedgehog population (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.estimatedPopulation })) },
        { id: 'ruralDeclineIndex', label: 'Rural population index (1995=100)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ruralDeclineIndex })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'urbanDeclineIndex', label: 'Urban population index (1995=100)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.urbanDeclineIndex })) },
        { id: 'roadDeathsIndex', label: 'Hedgehog road deaths index (1995=100)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.roadDeathsIndex })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2007, 5, 1), label: 'Population below 1 million' },
    { date: new Date(2020, 5, 1), label: 'State of Nature alert' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Fast Is the UK Hedgehog Population Declining?"
          finding={<>Britain's hedgehog population has fallen from an estimated 30 million in the 1950s to fewer than 900,000 today — a decline of over 97%.<Cite nums={1} /> Rural populations have crashed fastest, losing over 50% since 1995, driven by agricultural intensification, loss of hedgerows and pesticide use that has decimated invertebrate food supplies.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The People's Trust for Endangered Species State of Britain's Hedgehogs report tracks population trends using data from volunteer surveys, road casualty monitoring and systematic countryside surveys. The 2023 edition found that rural hedgehog populations have declined by around 50–75% since the mid-1990s, while urban populations — though also declining — have fared somewhat better. Hedgehogs are a priority species under the UK Post-2010 Biodiversity Framework, and their decline is treated as an indicator of the wider health of agricultural and suburban ecosystems.<Cite nums={1} /></p>
            <p>Agricultural intensification is the primary driver. The intensification of grassland management, widespread use of slug pellets (now partially restricted), loss of permanent pasture and the removal of hedgerows have all reduced habitat quality and insect food availability. In urban areas, the main threats are garden fencing that prevents movement, road traffic — with an estimated 100,000 hedgehogs killed on roads annually — and the increasing paving of front gardens. The Hedgehog Street campaign has created over 100,000 garden 'hedgehog highways' (holes cut in fences), which research shows can significantly improve urban survival rates.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-population', label: 'Population trend' },
          { id: 'sec-urban', label: 'Urban vs rural' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Estimated population (2023)" value="<900,000" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 30m in the 1950s<Cite nums={1} /></>} sparklineData={[2.0, 1.8, 1.6, 1.4, 1.3, 1.2, 1.1, 1.05, 1.0, 0.95, 0.9]} href="#sec-population" />
          <MetricCard label="Rural population decline since 1995" value="-50%" unit="" direction="down" polarity="up-is-good" changeText={<>Worst in intensively farmed areas<Cite nums={1} /></>} sparklineData={[100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50]} href="#sec-population" />
          <MetricCard label="Road deaths per year (estimate)" value="100,000" unit="" direction="flat" polarity="up-is-bad" changeText={<>Road deaths remain a major pressure<Cite nums={2} /></>} sparklineData={[130, 125, 120, 115, 112, 110, 108, 105, 103, 101, 100]} href="#sec-urban" />
        </div>

        <ScrollReveal>
          <section id="sec-population" className="mb-12">
            <LineChart title="Estimated UK hedgehog population and rural decline index, 1995–2023" subtitle="Estimated national population in millions; rural population indexed to 1995=100." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-urban" className="mb-12">
            <LineChart title="Urban hedgehog index and road casualty index, 1995–2023" subtitle="Urban population indexed to 1995=100; road casualty index (1995=100)." series={chart2Series} annotations={[]} yLabel="Index (1995=100)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Hedgehog Street highways" value="100,000+" unit="garden holes" description={<>Over 100,000 households have registered hedgehog-friendly garden modifications including connectivity holes, log piles and water access points, helping to create an urban corridor network for hedgehog movement.<Cite nums={2} /></>} source="Source: British Hedgehog Preservation Society / Hedgehog Street." />
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
