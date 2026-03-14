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
  { num: 1, name: 'Environment Agency', dataset: 'Agriculture and Water Quality Annual Report', url: 'https://www.gov.uk/government/statistics/farming-statistics', date: '2024' },
  { num: 2, name: 'Defra', dataset: 'Agriculture and Greenhouse Gas Emissions Statistics', url: 'https://www.gov.uk/government/statistics/agricultural-statistics-and-climate-change', date: '2024' },
  { num: 3, name: 'JNCC', dataset: 'UK Biodiversity Indicators — Nutrient Pollution', url: 'https://jncc.gov.uk/our-work/ukbi-c5-nutrient-pollution/', date: '2024' },
];

interface DataPoint {
  year: number;
  nitrogenRunoff: number;
  nitratesGoodStatus: number;
  ammoniaNH3: number;
  nitrousOxideN2O: number;
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

export default function NitrogenPollutionFarmingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/nitrogen-pollution-farming/nitrogen_pollution_farming.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'nitratesGoodStatus', label: 'Water bodies with good nitrate status (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nitratesGoodStatus })) },
        { id: 'nitrogenRunoff', label: 'Estimated nitrogen runoff from agriculture (kt N/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nitrogenRunoff })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'ammoniaNH3', label: 'Agricultural ammonia emissions (kt NH₃/yr)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ammoniaNH3 })) },
        { id: 'nitrousOxideN2O', label: 'Agricultural nitrous oxide emissions (MtCO₂e/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nitrousOxideN2O })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Nitrates Vulnerable Zones expanded' },
    { date: new Date(2021, 5, 1), label: 'New nutrient neutrality policy for planning' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Much Nitrogen Pollution Is UK Farming Causing?"
          finding={<>Agriculture is responsible for about 70% of UK nitrate water pollution and over 80% of ammonia emissions, both of which have significant environmental and health impacts — yet progress in reducing agricultural nitrogen pollution has stalled since the early 2000s.<Cite nums={1} /> Nitrogen is both a pollutant and a constraint on development near protected rivers.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Reactive nitrogen — in forms including nitrates, nitrites and ammonia — is released at scale by UK agriculture through synthetic fertiliser application, livestock manure, and soil disturbance. Around 70% of nitrate pollution in UK rivers and groundwater comes from agricultural sources, contributing to eutrophication — the overfertilisation of water bodies that drives algal blooms, depletes oxygen and kills fish and invertebrates.<Cite nums={1} /> Nitrate Vulnerable Zones, areas of particular pollution concern, now cover around 55% of England. Pollution from livestock farming — particularly intensively managed dairy and pig units — contributes disproportionately.</p>
            <p>Agricultural ammonia emissions are a separate but related problem: ammonia from livestock waste and urea fertilisers reacts in the atmosphere to form fine particulate matter (PM2.5), contributing to air pollution and associated health harms, and deposits excess nitrogen on sensitive ecosystems.<Cite nums={2} /> Agriculture accounts for around 87% of UK ammonia emissions. Despite improvements in the 1990s and early 2000s — largely due to reduced livestock numbers and changed practices — ammonia emissions have plateaued and are not on track to meet the UK's national emissions reduction commitments. The government's introduction of nutrient neutrality requirements for housing development in catchments with protected rivers created significant political controversy in 2022–23, as it effectively blocked around 100,000 new homes from being built.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-water', label: 'Water pollution' },
          { id: 'sec-air', label: 'Air & climate' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Water bodies with good nitrate status" value="47" unit="%" direction="flat" polarity="up-is-good" changeText={<>Little progress since 2016 assessment<Cite nums={1} /></>} sparklineData={[50, 49, 49, 48, 48, 48, 47, 47, 47, 47, 47]} href="#sec-water" />
          <MetricCard label="Agricultural ammonia emissions" value="238" unit="kt NH₃/yr" direction="flat" polarity="up-is-bad" changeText={<>Barely changed since 2009; 87% of UK total<Cite nums={2} /></>} sparklineData={[255, 252, 248, 245, 242, 240, 239, 239, 238, 238, 238]} href="#sec-air" />
          <MetricCard label="Share of nitrate pollution from agriculture" value="70" unit="%" direction="flat" polarity="up-is-bad" changeText={<>Dominant source of river nitrate pollution<Cite nums={1} /></>} sparklineData={[70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]} href="#sec-water" />
        </div>

        <ScrollReveal>
          <section id="sec-water" className="mb-12">
            <LineChart title="Nitrate water pollution and water body status, 2010–2024" subtitle="Water bodies achieving good nitrate status (%) and estimated nitrogen runoff (kt N/yr), England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-air" className="mb-12">
            <LineChart title="Agricultural ammonia and nitrous oxide emissions, 2000–2024" subtitle="Agricultural ammonia emissions (kt NH₃/yr) and nitrous oxide emissions (MtCO₂e/yr), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Sustainable Farming Incentive" value="2022" unit="launched" description={<>The Sustainable Farming Incentive, launched in 2022, pays farmers to adopt practices that reduce pollution including precision fertiliser application, cover crops and buffer strips along watercourses — potentially the most significant policy lever for reducing agricultural nitrogen pollution in a generation.<Cite nums={2} /></>} source="Source: Defra, Sustainable Farming Incentive programme, 2024." />
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
