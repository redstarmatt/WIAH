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
  { num: 1, name: 'Food Foundation', dataset: 'Food Insecurity Tracking', url: 'https://foodfoundation.org.uk/initiatives/food-insecurity-tracking', date: '2024' },
  { num: 2, name: 'IFAN', dataset: 'Food bank usage statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Family Food survey — children\'s nutrition', url: 'https://www.gov.uk/government/collections/family-food-statistics', date: '2024' },
];

interface DataPoint {
  year: number;
  childrenFoodInsecure: number;
  foodBankChildParcels: number;
  freeMealEligibility: number;
  holidayHungerEstimate: number;
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

export default function FoodInsecurityChildrenPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/food-insecurity-children/food_insecurity_children.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'childrenFoodInsecure', label: 'Children food insecure (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childrenFoodInsecure })) },
        { id: 'foodBankChildParcels', label: 'Food bank child parcels (thousands)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.foodBankChildParcels })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'freeMealEligibility', label: 'FSM-eligible children (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.freeMealEligibility })) },
        { id: 'holidayHungerEstimate', label: 'Holiday hunger estimate (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.holidayHungerEstimate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Marcus Rashford campaign — holiday vouchers' },
    { date: new Date(2022, 5, 1), label: 'Cost of living crisis peaks' },
  ];

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="How Many Children Are Going Hungry?"
          finding={<>Around 3 million children in the UK lived in food-insecure households in 2023 — nearly one in five — with the figure peaking during the 2022 cost of living crisis.<Cite nums={1} /> Trussell Trust food banks distributed food parcels to nearly 1.3 million children in 2023–24, a record.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Food insecurity — not having reliable access to enough affordable, nutritious food — is now affecting a substantial minority of UK families with children. The Food Foundation&apos;s tracking surveys show the rate rose sharply in 2021–22 as inflation hit food prices particularly hard, and while it has moderated slightly as inflation has fallen, it remains well above 2019 levels. Children in food-insecure households are more likely to have poor health outcomes, lower educational attainment, and difficulty concentrating in school.<Cite nums={1} /></p>
            <p>The free school meals system provides a safety net for some, but eligibility thresholds mean many children in working poor households do not qualify. During school holidays — when the daily meal disappears — the concept of &quot;holiday hunger&quot; has become part of the public discourse, prompted significantly by footballer Marcus Rashford&apos;s successful 2020 campaign for government-funded holiday food vouchers. The Trussell Trust&apos;s annual data on food bank use captures the most severe end of the food insecurity spectrum — households that cannot afford to buy enough food at all.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Food insecurity' },
          { id: 'sec-chart2', label: 'Free meals and holiday hunger' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Children food insecure" value="3.0m" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 2.0m in 2019<Cite nums={1} /></>} sparklineData={[2.0, 2.1, 2.2, 3.0, 3.5, 3.2, 3.0, 2.9, 2.9, 2.95, 3.0]} href="#sec-chart1" />
          <MetricCard label="Food bank child parcels" value="1.26m" unit="" direction="up" polarity="up-is-bad" changeText={<>Record; up from 540k in 2018–19<Cite nums={2} /></>} sparklineData={[540, 630, 750, 1000, 1100, 1150, 1200, 1220, 1240, 1255, 1260]} href="#sec-chart1" />
          <MetricCard label="FSM-eligible children" value="2.1m" unit="" direction="up" polarity="up-is-good" changeText={<>Up as poverty and eligibility rules shift<Cite nums={3} /></>} sparklineData={[1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.05, 2.08, 2.1, 2.1]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Children in food-insecure households and food bank parcels, 2015–2024" subtitle="Children in food-insecure households (millions) and food bank parcels to children (thousands)" series={chart1Series} annotations={annotations} yLabel="Millions / thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Free school meal eligibility and holiday hunger, 2015–2024" subtitle="Children eligible for FSM (thousands) and estimated children experiencing holiday hunger" series={chart2Series} annotations={[]} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Universal infant FSM" value="100%" unit="infants in state schools" description={<>Universal free school meals for all infants in state schools (Reception to Year 2), introduced in 2014, provide a nutritious midday meal for all 5–7 year olds regardless of family income — benefiting an estimated 1.5 million children.<Cite nums={3} /></>} source="Source: DfE, universal infant free school meals statistics." />
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
