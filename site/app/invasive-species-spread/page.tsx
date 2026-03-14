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
  { num: 1, name: 'GBNNSS', dataset: 'Great Britain Non-Native Species Secretariat — Horizon Scanning', url: 'https://www.nonnativespecies.org/', date: '2024' },
  { num: 2, name: 'CEH', dataset: 'UK Non-Native Species Alerts and Monitoring', url: 'https://www.ceh.ac.uk/our-science/research-areas/invasive-non-native-species', date: '2024' },
  { num: 3, name: 'Defra', dataset: 'GB Invasive Non-Native Species Framework', url: 'https://www.gov.uk/government/publications/invasive-non-native-species-framework', date: '2023' },
];

interface DataPoint {
  year: number;
  establishedInvasiveSpecies: number;
  newSpeciesRecorded: number;
  economicDamageEst: number;
  eradicationSuccesses: number;
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

export default function InvasiveSpeciesSpreadPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/invasive-species-spread/invasive_species_spread.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'establishedInvasiveSpecies', label: 'Established non-native invasive species (count)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.establishedInvasiveSpecies })) },
        { id: 'newSpeciesRecorded', label: 'New invasive species recorded per year', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.newSpeciesRecorded })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'economicDamageEst', label: 'Annual economic damage estimate (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.economicDamageEst })) },
        { id: 'eradicationSuccesses', label: 'Successful eradications (cumulative)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.eradicationSuccesses })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'GB Biosecurity Strategy renewed' },
    { date: new Date(2022, 5, 1), label: 'Asian hornet range expansion confirmed' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Fast Are Invasive Species Spreading in the UK?"
          finding={<>Over 3,000 non-native species are established in Great Britain, with around 10–12 new invasive species becoming established each year, causing an estimated £1.8bn in annual economic damage to agriculture, infrastructure and ecosystems.<Cite nums={1} /> Climate change is expanding the range of species that can survive in UK conditions.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Invasive non-native species represent one of the most significant threats to biodiversity in the UK and carry substantial economic costs. The Great Britain Non-Native Species Secretariat's database records over 3,000 non-native species established in the wild, of which around 200 are considered to have significant negative impacts on native ecosystems, agriculture or infrastructure.<Cite nums={1} /> Japanese knotweed alone costs an estimated £170m per year in management and property damage. American signal crayfish have decimated native white-clawed crayfish populations. Rhododendron ponticum shades out native woodland plants and harbours Phytophthora disease. Grey squirrels have driven red squirrels to the brink of extinction in most of England.</p>
            <p>The arrival rate of new species capable of establishing in the UK is increasing, partly driven by globalised trade and travel, and increasingly by climate change — warmer summers and milder winters are allowing species previously unable to survive UK winters to establish.<Cite nums={2} /> The Asian hornet, a voracious predator of honeybees, made its first confirmed UK nesting in 2023 despite years of containment efforts, and the monitoring network now receives thousands of potential sightings annually. The GB Non-Native Species Framework identifies biosecurity at borders, rapid response to new arrivals, and long-term management of established species as the three key pillars of response.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-spread', label: 'Species trends' },
          { id: 'sec-impact', label: 'Economic impact' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Established invasive non-native species" value="3,000+" unit="" direction="up" polarity="up-is-bad" changeText={<>~200 with significant negative impact<Cite nums={1} /></>} sparklineData={[2700, 2750, 2780, 2810, 2840, 2870, 2900, 2930, 2960, 2980, 3000]} href="#sec-spread" />
          <MetricCard label="New invasive species per year" value="11" unit="" direction="flat" polarity="up-is-bad" changeText={<>Consistent arrival rate for two decades<Cite nums={2} /></>} sparklineData={[10, 11, 10, 12, 11, 10, 11, 12, 11, 11, 11]} href="#sec-spread" />
          <MetricCard label="Annual economic damage" value="1.8" unit="£bn" direction="up" polarity="up-is-bad" changeText={<>Up from £1.3bn estimate in 2010<Cite nums={1} /></>} sparklineData={[1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8]} href="#sec-impact" />
        </div>

        <ScrollReveal>
          <section id="sec-spread" className="mb-12">
            <LineChart title="Invasive species establishment in Great Britain, 2005–2024" subtitle="Established non-native invasive species (count) and new species per year, Great Britain." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-impact" className="mb-12">
            <LineChart title="Economic damage and eradication progress, 2005–2024" subtitle="Annual economic damage estimate (£bn) and cumulative successful eradications, Great Britain." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Red squirrel recovery" value="15,000" unit="individuals" description={<>Despite grey squirrel pressure, coordinated conservation efforts have maintained a red squirrel population of around 15,000 in England and over 120,000 in Scotland, with protected strongholds established in Northumberland, the Lake District and several islands.<Cite nums={3} /></>} source="Source: Red Squirrel Survival Trust, Population Estimates, 2024." />
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
