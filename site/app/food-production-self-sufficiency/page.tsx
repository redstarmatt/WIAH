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
  { num: 1, name: 'Defra', dataset: 'Food Statistics Pocketbook — UK self-sufficiency', url: 'https://www.gov.uk/government/statistical-data-sets/food-statistics-pocketbook', date: '2024' },
  { num: 2, name: 'NFU', dataset: 'British Food and Farming at a Glance', url: 'https://www.nfuonline.com/media/fy5njsw3/nfu-farming-at-a-glance.pdf', date: '2024' },
  { num: 3, name: 'AHDB', dataset: 'Agriculture in the UK', url: 'https://ahdb.org.uk/dairy/agriculture-in-the-uk', date: '2024' },
];

interface DataPoint {
  year: number;
  selfSufficiencyAll: number;
  selfSufficiencyIndigénous: number;
  agriculturalLandMha: number;
  foodTradeDeficit: number;
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

export default function FoodProductionSelfSufficiencyPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/food-production-self-sufficiency/food_production_self_sufficiency.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'selfSufficiencyAll', label: 'Food self-sufficiency (all food, %)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.selfSufficiencyAll })) },
        { id: 'selfSufficiencyIndigénous', label: 'Self-sufficiency (indigenous food types, %)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.selfSufficiencyIndigénous })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'agriculturalLandMha', label: 'UK agricultural land (million hectares)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.agriculturalLandMha })) },
        { id: 'foodTradeDeficit', label: 'UK food trade deficit (£bn/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.foodTradeDeficit })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid: supply chain vulnerability exposed' },
    { date: new Date(2022, 5, 1), label: 'Ukraine war: grain price shock' },
  ];

  return (
    <>
      <TopicNav topic="Environment & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Economy"
          question="How Self-Sufficient Is the UK in Food Production?"
          finding={<>The UK produces about 60% of the food it consumes overall, and around 74% of what could be grown in our climate, but food security concerns intensified after Covid supply chain disruptions and Russia's invasion of Ukraine exposed how dependent the UK is on global commodity markets.<Cite nums={1} /> Agricultural land area is declining while the food trade deficit widens.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's food self-sufficiency — the proportion of food consumed that is domestically produced — has hovered around 60% for the past two decades, with indigenous food type self-sufficiency (adjusting for foods that cannot be grown in the UK climate) around 74%.<Cite nums={1} /> This compares to a self-sufficiency rate of around 78% in the late 1980s. The decline reflects structural changes in UK agriculture, including land use shifts, the consolidation of farm holdings, and growing imports of processed foods. The UK is broadly self-sufficient in cereals, meat, dairy and eggs, but significantly dependent on imports for fruit, vegetables and some horticultural products.</p>
            <p>The food security debate intensified significantly between 2020 and 2022. The Covid-19 pandemic briefly caused supply chain disruptions and empty supermarket shelves; Russia's invasion of Ukraine in 2022 sent global grain and fertiliser prices to record highs, sharply increasing food inflation and highlighting the UK's exposure to global commodity markets.<Cite nums={2} /> Agricultural land area in the UK has been declining slowly but consistently — partly due to development pressure and partly due to environmental land management schemes that pay farmers to take land out of food production for environmental purposes. The NFU has called for a statutory food security target.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-self-sufficiency', label: 'Self-sufficiency' },
          { id: 'sec-land', label: 'Land & trade' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Overall food self-sufficiency" value="60" unit="%" direction="down" polarity="down-is-bad" changeText={<>Down from ~78% in 1984<Cite nums={1} /></>} sparklineData={[65, 64, 63, 62, 61, 61, 60, 60, 60, 60, 60]} href="#sec-self-sufficiency" />
          <MetricCard label="Indigenous food self-sufficiency" value="74" unit="%" direction="flat" polarity="up-is-good" changeText={<>Broadly stable for two decades<Cite nums={1} /></>} sparklineData={[76, 75, 75, 74, 74, 74, 74, 74, 74, 74, 74]} href="#sec-self-sufficiency" />
          <MetricCard label="UK food trade deficit" value="29" unit="£bn/yr" direction="up" polarity="up-is-bad" changeText={<>Up from £17bn in 2015<Cite nums={2} /></>} sparklineData={[17, 18, 19, 20, 21, 22, 23, 25, 27, 28, 29]} href="#sec-land" />
        </div>

        <ScrollReveal>
          <section id="sec-self-sufficiency" className="mb-12">
            <LineChart title="UK food self-sufficiency, 2000–2024" subtitle="All-food self-sufficiency (%) and indigenous-type self-sufficiency (%), UK." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-land" className="mb-12">
            <LineChart title="UK agricultural land and food trade deficit, 2000–2024" subtitle="Total agricultural land (million hectares) and annual food trade deficit (£bn), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="UK farming productivity" value="2nd" unit="in Europe" description={<>UK cereal yields per hectare rank second highest in Europe, and UK dairy productivity is among the highest in the world — demonstrating that high efficiency production is achievable even as overall self-sufficiency declines due to shifts in what is grown.<Cite nums={3} /></>} source="Source: AHDB, Agriculture in the UK, 2024." />
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
