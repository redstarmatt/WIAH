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
  { num: 1, name: 'DfT', dataset: 'Annual bus statistics: England', url: 'https://www.gov.uk/government/collections/bus-statistics', date: '2024' },
  { num: 2, name: 'Transport Focus', dataset: 'Bus passenger survey', url: 'https://www.transportfocus.org.uk/insight/bus-passenger-survey/', date: '2024' },
  { num: 3, name: 'Campaign for Better Transport', dataset: 'Buses in Crisis report', url: 'https://bettertransport.org.uk/buses-in-crisis/', date: '2024' },
];

interface DataPoint {
  year: number;
  busRoutesRegistered: number;
  busPassengerJourneys: number;
  localAuthBusSubsidyBn: number;
  vehiclesMiles: number;
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

export default function BusRouteCoveragePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/bus-route-coverage/bus_route_coverage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'busRoutesRegistered', label: 'Bus routes registered (England, outside London)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.busRoutesRegistered })) },
        { id: 'busPassengerJourneys', label: 'Bus passenger journeys outside London (bn)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.busPassengerJourneys })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'localAuthBusSubsidyBn', label: 'Local authority bus subsidy (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.localAuthBusSubsidyBn })) },
        { id: 'vehiclesMiles', label: 'Bus vehicle miles (billions)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.vehiclesMiles })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — bus network protected' },
    { date: new Date(2022, 5, 1), label: 'Bus Back Better funding cuts' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="How Many Bus Routes Have Been Cut?"
          finding={<>Bus mileage outside London fell by 14% between 2009/10 and 2022/23, and the number of supported (council-funded) bus routes fell by over a third as local authority funding was squeezed.<Cite nums={1} /> Passenger journeys outside London remain 25% below pre-pandemic levels, and rural areas have seen the worst cuts.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's bus network outside London is largely deregulated — private operators run routes they consider commercially viable, with local councils subsidising the rest. Since 2010, real-terms cuts to local authority budgets have forced councils to reduce or eliminate subsidised routes. The Campaign for Better Transport estimates that since 2010, over 3,000 bus routes in England have been reduced or cut entirely. For rural communities without cars, bus loss can mean loss of access to healthcare, employment and education.<Cite nums={3} /></p>
            <p>Bus passenger journeys outside London fell from around 4.1 billion in 2010/11 to 3.0 billion in 2022/23 — a decline that predates Covid and reflects falling service levels rather than changed preferences. The government's Bus Back Better strategy, published in 2021, promised a major network expansion and local transport authority powers similar to London's. But by 2023/24 the strategy's funding had been significantly cut, and Bus Service Improvement Plans — intended to be transformative — were being delivered on shoestring budgets.<Cite nums={[1, 2]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-routes', label: 'Routes & journeys' },
          { id: 'sec-funding', label: 'Funding & mileage' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Bus mileage decline since 2009" value="-14%" unit="" direction="down" polarity="up-is-good" changeText={<>Outside London<Cite nums={1} /></>} sparklineData={[100, 98, 96, 94, 93, 92, 90, 89, 87, 86, 86]} href="#sec-routes" />
          <MetricCard label="Supported routes cut since 2010" value="3,000+" unit="" direction="up" polarity="up-is-bad" changeText={<>Rural areas worst affected<Cite nums={3} /></>} sparklineData={[200, 400, 600, 800, 1200, 1500, 1800, 2200, 2600, 2900, 3000]} href="#sec-routes" />
          <MetricCard label="Journeys outside London (2022/23)" value="3.0bn" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 4.1bn in 2010/11<Cite nums={1} /></>} sparklineData={[4.1, 4.0, 3.9, 3.8, 3.7, 3.6, 3.5, 3.3, 2.8, 2.9, 3.0]} href="#sec-funding" />
        </div>

        <ScrollReveal>
          <section id="sec-routes" className="mb-12">
            <LineChart title="Bus routes and passenger journeys, England outside London, 2010–2023" subtitle="Registered bus routes (000s); annual passenger journeys (billions)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            <LineChart title="Local authority bus subsidy and vehicle miles, 2010–2023" subtitle="Real-terms council bus subsidy (£bn); total bus vehicle miles (billions)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Greater Manchester bus franchising" value="2024" unit="launched" description={<>Greater Manchester became the first city outside London to franchise its bus network in 2024, bringing operators under a single public contract. Early evidence shows improved reliability and a more coherent network for passengers.<Cite nums={2} /></>} source="Source: Transport for Greater Manchester / DfT." />
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
