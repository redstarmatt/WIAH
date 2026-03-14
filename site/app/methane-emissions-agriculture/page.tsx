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
  { num: 1, name: 'DESNZ', dataset: 'UK greenhouse gas emissions by sector — agriculture', url: 'https://www.gov.uk/government/statistics/uk-greenhouse-gas-emissions-final-figures', date: '2024' },
  { num: 2, name: 'Climate Change Committee', dataset: 'Land use: Policies for a Net Zero UK', url: 'https://www.theccc.org.uk/publication/land-use-policies-for-a-net-zero-uk/', date: '2020' },
  { num: 3, name: 'DEFRA', dataset: 'Agriculture in the UK — Greenhouse gas emissions', url: 'https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom', date: '2024' },
];

interface DataPoint {
  year: number;
  agricultureMethaneKtCH4: number;
  livestockMethaneMtCO2e: number;
  agricultureTotalMtCO2e: number;
  cattleNumbers: number;
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

export default function MethaneEmissionsAgriculturePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/methane-emissions-agriculture/methane_emissions_agriculture.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'livestockMethaneMtCO2e', label: 'Livestock methane (MtCO₂e)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.livestockMethaneMtCO2e })) },
        { id: 'agricultureTotalMtCO2e', label: 'Agriculture total GHG (MtCO₂e)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.agricultureTotalMtCO2e })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'agricultureMethaneKtCH4', label: 'Agricultural methane (ktCH₄)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.agricultureMethaneKtCH4 })) },
        { id: 'cattleNumbers', label: 'UK cattle numbers (millions)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cattleNumbers })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Net zero target set' },
    { date: new Date(2021, 5, 1), label: 'CAP replaced by ELMS' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Much Methane Is UK Agriculture Emitting?"
          finding={<>Agriculture accounts for around 10% of UK greenhouse gas emissions, with methane from livestock — primarily cattle — the dominant contributor at around 23 MtCO₂e per year.<Cite nums={1} /> Unlike electricity, where emissions have fallen dramatically, agricultural emissions have barely moved since 1990, making it the sector furthest from its climate targets.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK agriculture emits around 46 MtCO₂e annually — around 10% of total territorial emissions — with methane from enteric fermentation (cow burps and belches) and manure management as the largest components. Methane is a potent short-lived greenhouse gas: over a 20-year timeframe it is 80 times more warming than CO₂ per tonne. The UK has around 9 million cattle, and each emits roughly 100 kg of methane per year, accounting for the majority of agricultural methane emissions.<Cite nums={[1, 3]} /></p>
            <p>The Climate Change Committee has consistently identified agriculture as the hardest sector to decarbonise, requiring dietary change, herd size reduction, land use change towards trees and peatland, and adoption of technologies like feed additives that reduce enteric methane. Progress has been almost negligible: agricultural emissions in 2022 were only 16% below their 1990 level, compared to 48% for the economy as a whole. The government's Environmental Land Management schemes, intended to incentivise low-carbon farming, have faced repeated delays and redesigns.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-livestock', label: 'Livestock emissions' },
          { id: 'sec-methane', label: 'Methane trends' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Agriculture GHG (2022)" value="46 MtCO₂e" unit="" direction="down" polarity="up-is-bad" changeText={<>Only 16% below 1990 level<Cite nums={1} /></>} sparklineData={[55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 46]} href="#sec-livestock" />
          <MetricCard label="Livestock methane share" value="50%" unit="of agri GHG" direction="flat" polarity="up-is-bad" changeText={<>Dominated by cattle<Cite nums={3} /></>} sparklineData={[52, 52, 51, 51, 51, 50, 50, 50, 50, 50, 50]} href="#sec-methane" />
          <MetricCard label="Reduction since 1990" value="-16%" unit="" direction="down" polarity="up-is-good" changeText={<>Economy-wide: -48%<Cite nums={1} /></>} sparklineData={[0, -2, -4, -6, -7, -8, -10, -12, -13, -14, -16]} href="#sec-livestock" />
        </div>

        <ScrollReveal>
          <section id="sec-livestock" className="mb-12">
            <LineChart title="Livestock methane and total agricultural emissions, UK, 1990–2022" subtitle="Livestock methane and agriculture total in MtCO₂e." series={chart1Series} annotations={annotations} yLabel="MtCO₂e" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-methane" className="mb-12">
            <LineChart title="Agricultural methane emissions and UK cattle numbers, 1990–2022" subtitle="Agricultural methane in ktCH₄; cattle numbers in millions." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Feed additive potential" value="-30%" unit="methane reduction" description={<>Methane-suppressing feed additives such as 3-NOP can reduce enteric methane from cattle by up to 30%, according to DEFRA-funded trials. Widespread adoption could cut agricultural methane by up to 15% nationally.<Cite nums={2} /></>} source="Source: CCC / DEFRA agricultural emissions review." />
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
