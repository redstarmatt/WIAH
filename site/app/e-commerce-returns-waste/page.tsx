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
  { num: 1, name: 'Barclays', dataset: 'Returns Economy report', url: 'https://home.barclays/news/press-releases/2023/01/new-barclays-research-reveals-the-size-of-britain-s-7-billion-re/', date: '2024' },
  { num: 2, name: 'Which?', dataset: 'Online returns research', url: 'https://www.which.co.uk/reviews/returned-items', date: '2024' },
  { num: 3, name: 'WRAP', dataset: 'Textiles market situation report', url: 'https://www.wrap.ngo/taking-action/textiles/topics/textiles-market-situation-report', date: '2024' },
];

interface DataPoint {
  year: number;
  ecommerceReturnRate: number;
  itemsDestroyedEstimate: number;
  returnsCarbonFootprint: number;
  returnsCostToRetailers: number;
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

export default function ECommerceReturnsWastePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/e-commerce-returns-waste/e_commerce_returns_waste.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'ecommerceReturnRate', label: 'E-commerce return rate (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ecommerceReturnRate })) },
        { id: 'returnsCostToRetailers', label: 'Returns cost to retailers (£bn)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.returnsCostToRetailers })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'itemsDestroyedEstimate', label: 'Returned items destroyed (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.itemsDestroyedEstimate })) },
        { id: 'returnsCarbonFootprint', label: 'Returns carbon footprint (million tCO2e)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.returnsCarbonFootprint })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — e-commerce surged' },
    { date: new Date(2023, 5, 1), label: 'Paid returns policies spread' },
  ];

  return (
    <>
      <TopicNav topic="Environment & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Economy"
          question="How Much Waste Do E-Commerce Returns Generate?"
          finding={<>UK online shoppers return around 30% of e-commerce purchases — generating an estimated £7 billion in costs to retailers and destroying millions of items that cannot economically be resold.<Cite nums={1} /> Fashion returns alone generate an estimated 750,000 tonnes of CO2e annually.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The economics of online retail returns have been transformed by &quot;free returns&quot; policies — which, by removing friction from the returns process, encouraged a buying-and-returning culture, particularly in fashion. At its peak, some ultra-fast fashion retailers were experiencing return rates of 40–50%. The environmental cost is significant: returned items travel by van or lorry, are processed in warehouse facilities, and a portion — particularly clothing — is destroyed rather than restocked, because processing costs exceed resale value.<Cite nums={1} /></p>
            <p>Retailers have begun pushing back. Zara, ASOS, and other major players introduced paid returns charges from 2022 onwards, which reduced return volumes measurably. But the broader structural issue — that UK consumers have become accustomed to treating online shopping as a no-cost trial experience — persists. WRAP&apos;s textiles research suggests that more than 140 million items of clothing are sent to landfill annually in the UK, with returns a contributing factor. Extending producer responsibility to cover the true cost of returns processing and disposal is under discussion but not yet policy.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Return volumes and costs' },
          { id: 'sec-chart2', label: 'Waste and emissions' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="E-commerce return rate" value="30" unit="%" direction="down" polarity="up-is-bad" changeText={<>Down from 35% at 2021 peak<Cite nums={1} /></>} sparklineData={[20, 22, 25, 30, 35, 34, 33, 32, 31, 30, 30]} href="#sec-chart1" />
          <MetricCard label="Returns cost to retailers" value="£7bn" unit="" direction="down" polarity="up-is-bad" changeText={<>Down from £8bn at peak<Cite nums={1} /></>} sparklineData={[4, 5, 6, 7.5, 8, 8, 7.8, 7.5, 7.2, 7.0, 7.0]} href="#sec-chart1" />
          <MetricCard label="Items destroyed annually" value="80m" unit="" direction="flat" polarity="up-is-bad" changeText={<>Returns that cannot be economically resold<Cite nums={3} /></>} sparklineData={[50, 55, 65, 80, 90, 85, 82, 80, 80, 80, 80]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="E-commerce return rates and costs, 2015–2024" subtitle="Online retail return rate (%) and total cost to UK retailers (£bn)" series={chart1Series} annotations={annotations} yLabel="% / £bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Returned items destroyed and returns carbon footprint, 2015–2024" subtitle="Estimated items destroyed (millions) and carbon footprint of returns (million tCO2e)" series={chart2Series} annotations={[]} yLabel="Millions / MtCO2e" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Recommerce market" value="£5.5bn" unit="UK resale market" description={<>The UK second-hand and recommerce market — where returned and pre-owned goods are resold — has grown to an estimated £5.5 billion, with platforms like Vinted, Depop, and eBay providing outlets that reduce the waste from unwanted items.<Cite nums={2} /></>} source="Source: eBay UK, recommerce economy report." />
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
