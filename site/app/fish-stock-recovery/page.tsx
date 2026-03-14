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
  { num: 1, name: 'ICES', dataset: 'Advice on fishing opportunities — UK stocks', url: 'https://www.ices.dk/advice/', date: '2024' },
  { num: 2, name: 'Marine Management Organisation', dataset: 'UK Sea Fisheries Statistics', url: 'https://www.gov.uk/government/statistics/uk-sea-fisheries-statistics', date: '2024' },
  { num: 3, name: 'Marine Conservation Society', dataset: 'Good Fish Guide', url: 'https://www.mcsuk.org/goodfishguide/', date: '2024' },
];

interface DataPoint {
  year: number;
  stocksSustainableLevel: number;
  northSeaCodBiomass: number;
  ukLandingsKt: number;
  mscCertifiedSpecies: number;
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

export default function FishStockRecoveryPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/fish-stock-recovery/fish_stock_recovery.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'stocksSustainableLevel', label: 'UK-adjacent stocks at sustainable level (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.stocksSustainableLevel })) },
        { id: 'northSeaCodBiomass', label: 'North Sea cod spawning biomass (000 tonnes)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.northSeaCodBiomass })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'ukLandingsKt', label: 'UK fish landings (000 tonnes)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ukLandingsKt })) },
        { id: 'mscCertifiedSpecies', label: 'MSC-certified UK species', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mscCertifiedSpecies })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Brexit — UK leaves CFP' },
    { date: new Date(2021, 5, 1), label: 'TCA quota deal' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="Are UK Fish Stocks Recovering Post-Brexit?"
          finding={<>Three years after leaving the EU's Common Fisheries Policy, the data shows mixed results: some stocks including North Sea herring and mackerel are healthy, but North Sea cod remains critically depleted and overall the proportion of stocks fished at sustainable levels has not improved significantly since 2019.<Cite nums={1} /> The post-Brexit quota-setting process has not delivered the rapid stock recovery that Leave campaigners promised.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Brexit was sold in part as an opportunity to "take back control" of British waters and rebuild fish stocks by reducing EU catches. The Trade and Cooperation Agreement's fisheries provisions gave the UK an increased share of quota — phased in over five years to 2026 — but did not fundamentally reform how total allowable catches are set. ICES (International Council for the Exploration of the Sea) continues to provide scientific advice, and both UK and EU governments remain reluctant to impose the deep cuts that science recommends for depleted stocks like North Sea cod and whiting.<Cite nums={1} /></p>
            <p>North Sea cod spawning stock biomass stood at around 45,000 tonnes in 2023 — still well below the precautionary reference point of 107,000 tonnes. ICES has recommended near-zero catches for cod in recent years. The MMO's UK sea fisheries statistics show total UK landings have declined to around 550,000 tonnes annually, reflecting declining stock availability rather than deliberate management. The Marine Conservation Society's Good Fish Guide still rates several key UK commercial species as fish to avoid.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-stocks', label: 'Stock status' },
          { id: 'sec-landings', label: 'UK landings' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Stocks at sustainable level" value="58%" unit="" direction="flat" polarity="up-is-good" changeText={<>Broadly unchanged since 2019<Cite nums={1} /></>} sparklineData={[42, 44, 46, 50, 52, 54, 56, 57, 58, 58, 58]} href="#sec-stocks" />
          <MetricCard label="North Sea cod biomass" value="45,000t" unit="" direction="down" polarity="up-is-good" changeText={<>42% of precautionary level<Cite nums={1} /></>} sparklineData={[80, 75, 70, 65, 60, 55, 52, 50, 48, 46, 45]} href="#sec-stocks" />
          <MetricCard label="UK fish landings (2023)" value="550,000t" unit="" direction="down" polarity="up-is-good" changeText={<>Declining over past decade<Cite nums={2} /></>} sparklineData={[720, 700, 680, 650, 630, 610, 590, 580, 565, 555, 550]} href="#sec-landings" />
        </div>

        <ScrollReveal>
          <section id="sec-stocks" className="mb-12">
            <LineChart title="UK fish stock sustainability and North Sea cod biomass, 2000–2023" subtitle="% of assessed stocks at sustainable level; North Sea cod spawning stock biomass in 000 tonnes." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-landings" className="mb-12">
            <LineChart title="UK total fish landings and MSC-certified species, 2000–2023" subtitle="Total UK landings in 000 tonnes; number of UK species with MSC sustainability certification." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Mackerel stock" value="Healthy" unit="" description={<>Northeast Atlantic mackerel — the UK's most valuable fish stock — is assessed as healthy by ICES, with a spawning biomass well above precautionary levels, providing a stable basis for a valuable UK fishery.<Cite nums={1} /></>} source="Source: ICES stock assessment 2024." />
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
