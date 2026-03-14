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
  { num: 1, name: 'Natural England / BSBI', dataset: 'State of Nature report', url: 'https://stateofnature.org.uk/', date: '2023' },
  { num: 2, name: 'UKBMS / CEH', dataset: 'UK Butterfly Monitoring Scheme and Pollinator Monitoring', url: 'https://ukbms.org/', date: '2024' },
  { num: 3, name: 'DEFRA', dataset: 'Wild bee and hoverfly indicators', url: 'https://www.gov.uk/government/statistics/wild-bee-and-hoverfly-indicators', date: '2024' },
];

interface DataPoint {
  year: number;
  wildBeeSpeciesIndex: number;
  honeybeeColonies: number;
  pollinatorAbundanceIndex: number;
  pesticideApplications: number;
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

export default function BeePopulationTrendsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/bee-population-trends/bee_population_trends.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'wildBeeSpeciesIndex', label: 'Wild bee species abundance index (2000=100)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.wildBeeSpeciesIndex })) },
        { id: 'pollinatorAbundanceIndex', label: 'Overall pollinator abundance index (2000=100)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pollinatorAbundanceIndex })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'honeybeeColonies', label: 'Managed honeybee colonies (000s)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.honeybeeColonies })) },
        { id: 'pesticideApplications', label: 'Pesticide applications index (2000=100)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pesticideApplications })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2013, 5, 1), label: 'EU neonicotinoid restrictions' },
    { date: new Date(2021, 5, 1), label: 'UK allows emergency neonic use' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="Are UK Bee Populations in Decline?"
          finding={<>The State of Nature 2023 report found that 17 species of bee have been lost from Britain since 1900, and wild bee abundance has fallen by around 35% since 1980.<Cite nums={1} /> Habitat loss, pesticide use and disease are the primary drivers, and the government's own pollinator monitoring index shows no meaningful recovery despite multiple action plans.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has around 270 bee species, from the familiar honeybee to dozens of solitary species that most people never see. DEFRA's wild bee and hoverfly indicators, which track abundance data from over 1,000 monitoring sites, show that the overall wild bee index stood at roughly 67% of its 2000 baseline by 2022 — a decline driven predominantly by the loss of wildflower-rich habitats, particularly in lowland England where intensive agriculture dominates.<Cite nums={3} /> Bumblebee populations show even steeper falls, with short-haired and shrill carder bumblebees now restricted to tiny ranges.</p>
            <p>The UK's 2021 decision to grant an emergency authorisation for the neonicotinoid pesticide thiamethoxam on sugar beet — banned across the EU since 2018 — drew sharp criticism from ecologists. The Rothamsted Research centre estimates that neonicotinoids persist in soils and water long after application, affecting non-target pollinators. Despite this, emergency authorisations have been granted repeatedly.<Cite nums={[1, 2]} /> The government's National Pollinator Strategy, renewed in 2021, sets no quantified recovery targets.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-abundance', label: 'Population trends' },
          { id: 'sec-pressures', label: 'Managed bees & pesticides' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Wild bee abundance (2022 vs 2000)" value="-33%" unit="" direction="down" polarity="up-is-good" changeText={<>17 species lost since 1900<Cite nums={1} /></>} sparklineData={[100, 98, 95, 92, 90, 87, 85, 82, 80, 77, 67]} href="#sec-abundance" />
          <MetricCard label="Managed honeybee colonies" value="274,000" unit="" direction="flat" polarity="up-is-good" changeText={<>Stable but far fewer than 1950s<Cite nums={2} /></>} sparklineData={[250, 255, 260, 265, 268, 270, 272, 270, 271, 273, 274]} href="#sec-pressures" />
          <MetricCard label="UK species extinct since 1900" value="17" unit="bee species" direction="flat" polarity="up-is-bad" changeText={<>Localised extinctions continuing<Cite nums={1} /></>} sparklineData={[10, 11, 12, 13, 14, 14, 15, 15, 16, 16, 17]} href="#sec-abundance" />
        </div>

        <ScrollReveal>
          <section id="sec-abundance" className="mb-12">
            <LineChart title="Wild bee and pollinator abundance indices, UK, 2000–2022" subtitle="Indexed to 2000=100. Sources: CEH Pollinator Monitoring Scheme, DEFRA." series={chart1Series} annotations={annotations} yLabel="Index (2000=100)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pressures" className="mb-12">
            <LineChart title="Managed honeybee colonies and pesticide application index, 2000–2022" subtitle="Honeybee colonies in 000s; pesticide applications index (2000=100)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Wildflower verge network" value="75,000 km" unit="of verges" description={<>England has over 75,000 km of road verges, and a growing number of councils are adopting reduced-cut regimes that allow wildflowers to establish — creating pollinator corridors between fragmented habitats.<Cite nums={2} /></>} source="Source: Plantlife / CEH pollinator monitoring." />
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
