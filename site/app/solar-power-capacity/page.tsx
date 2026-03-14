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
  { num: 1, name: 'DESNZ', dataset: 'Solar Photovoltaics Deployment Statistics', url: 'https://www.gov.uk/government/statistics/solar-photovoltaics-deployment', date: '2024' },
  { num: 2, name: 'Solar Energy UK', dataset: 'State of the Solar Industry Report', url: 'https://solarenergyuk.org/resource/state-of-the-solar-industry/', date: '2024' },
  { num: 3, name: 'NESO', dataset: 'Electricity Generation by Source', url: 'https://www.nationalgrideso.com/data-portal/electricity-generation-by-source', date: '2024' },
];

interface DataPoint {
  year: number;
  totalCapacityGW: number;
  annualGenerationTWh: number;
  rooftopInstallations: number;
  largeScaleCapacityGW: number;
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

export default function SolarPowerCapacityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/solar-power-capacity/solar_power_capacity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'totalCapacityGW', label: 'Total solar PV capacity (GW)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.totalCapacityGW })) },
        { id: 'annualGenerationTWh', label: 'Annual solar generation (TWh)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.annualGenerationTWh })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'rooftopInstallations', label: 'Cumulative rooftop solar installations (thousands)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rooftopInstallations })) },
        { id: 'largeScaleCapacityGW', label: 'Utility-scale solar capacity (GW)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.largeScaleCapacityGW })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Smart Export Guarantee launched' },
    { date: new Date(2023, 5, 1), label: 'Large-scale solar pipeline surges' },
  ];

  return (
    <>
      <TopicNav topic="Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="How Fast Is UK Solar Power Growing?"
          finding={<>The UK's total solar PV capacity reached 17 GW in 2024 — generating around 4% of annual electricity — up from virtually nothing in 2010, but the Climate Change Committee says solar must grow to 90 GW by 2035 to meet net zero, requiring a massive acceleration in both rooftop and utility-scale deployment.<Cite nums={1} /> Planning constraints remain a bottleneck for large solar farms.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK solar photovoltaic capacity has grown from under 100 MW in 2010 to over 17 GW in 2024 — an extraordinary expansion driven first by Feed-in Tariffs for domestic and small commercial installations, then by large-scale ground-mounted solar farms attracting commercial finance as costs fell.<Cite nums={1} /> In summer months, solar can occasionally meet 25–30% of UK electricity demand during peak midday hours. The pipeline of consented and proposed utility-scale solar is substantial, with several projects in the 500 MW to 1 GW range representing a scale that would have seemed implausible a decade ago.</p>
            <p>However, the deployment rate needs to increase significantly. The CCC's net zero scenarios require solar to reach around 90 GW by 2035 — more than five times current capacity in just eleven years.<Cite nums={3} /> The main constraint for utility-scale solar is not economics (solar is among the cheapest forms of new electricity generation) but planning and grid connection. The Nationally Significant Infrastructure Projects process for large solar was complex and slow, and grid connection queues at some points stretched to 10–15 years. Solar Energy UK has been pressing for streamlined planning routes and faster grid connections.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-capacity', label: 'Capacity growth' },
          { id: 'sec-deployment', label: 'Deployment mix' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Total solar PV capacity" value="17" unit="GW" direction="up" polarity="up-is-good" changeText={<>Up from virtually 0 in 2010; target 90 GW by 2035<Cite nums={1} /></>} sparklineData={[0.1, 1.0, 3.5, 5.5, 8.0, 10.0, 11.5, 12.5, 14.0, 15.5, 17.0]} href="#sec-capacity" />
          <MetricCard label="Annual solar generation" value="14" unit="TWh" direction="up" polarity="up-is-good" changeText={<>Around 4% of annual UK electricity<Cite nums={3} /></>} sparklineData={[0.1, 0.8, 3.3, 5.3, 8.0, 10.0, 11.5, 12.2, 12.8, 13.5, 14.0]} href="#sec-capacity" />
          <MetricCard label="Rooftop solar installations (cumulative)" value="1.2" unit="million" direction="up" polarity="up-is-good" changeText={<>Over 1.2m homes and businesses<Cite nums={1} /></>} sparklineData={[0.05, 0.3, 0.55, 0.7, 0.78, 0.85, 0.91, 0.97, 1.04, 1.12, 1.2]} href="#sec-deployment" />
        </div>

        <ScrollReveal>
          <section id="sec-capacity" className="mb-12">
            <LineChart title="UK solar PV capacity and generation, 2010–2024" subtitle="Total installed solar capacity (GW) and annual generation (TWh), UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deployment" className="mb-12">
            <LineChart title="Rooftop and utility-scale solar deployment, 2010–2024" subtitle="Cumulative rooftop installations (thousands) and utility-scale capacity (GW), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Cost of solar" value="-90%" unit="since 2010" description={<>The cost of utility-scale solar power has fallen by over 90% since 2010, making it the cheapest source of new electricity generation in the UK and most of the world — a transformation that has made the 90 GW 2035 target economically viable, if planning and grid challenges can be resolved.<Cite nums={2} /></>} source="Source: Solar Energy UK, State of the Solar Industry, 2024." />
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
