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
  { num: 1, name: 'IUCN UK Peatland Programme', dataset: 'State of UK Peatlands', url: 'https://www.iucn-uk-peatlandprogramme.org/resources/state-uk-peatlands', date: '2023' },
  { num: 2, name: 'Natural England', dataset: 'England Peat Action Plan', url: 'https://www.gov.uk/government/publications/england-peat-action-plan', date: '2021' },
  { num: 3, name: 'DEFRA', dataset: 'Peatland restoration statistics', url: 'https://www.gov.uk/government/statistics/england-peat-action-plan-progress', date: '2024' },
];

interface DataPoint {
  year: number;
  restoredHectares: number;
  degradedPeatEmissionsMtCO2e: number;
  drainageBlockedKm: number;
  peatlandFundingBn: number;
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

export default function PeatRestorationPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/peat-restoration/peat_restoration.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'restoredHectares', label: 'Peatland restored (cumulative, 000 ha)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.restoredHectares })) },
        { id: 'drainageBlockedKm', label: 'Drainage ditches blocked (000 km)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.drainageBlockedKm })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'degradedPeatEmissionsMtCO2e', label: 'Degraded peatland emissions (MtCO₂e)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.degradedPeatEmissionsMtCO2e })) },
        { id: 'peatlandFundingBn', label: 'Peatland restoration public funding (£m)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.peatlandFundingBn })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'England Peat Action Plan' },
    { date: new Date(2022, 5, 1), label: 'Peat Restoration Fund launched' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Much Degraded Peatland Has Been Restored?"
          finding={<>The UK has around 3 million hectares of peatland — the largest carbon store in Britain — but 80% of it is damaged or degraded, emitting around 23 MtCO₂e per year rather than absorbing carbon.<Cite nums={1} /> Only around 40,000 hectares has been restored to date, against a target of 280,000 hectares by 2050.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>British peatlands — blanket bogs, raised bogs and fens — formed over thousands of years and store around 3 billion tonnes of carbon, equivalent to 20 years of UK greenhouse gas emissions. When peat is drained for agriculture or cut for horticultural use, it dries out, oxidises and releases that stored carbon. The IUCN UK Peatland Programme estimates that degraded UK peatlands emit around 23 MtCO₂e annually — about 5% of total UK territorial emissions — making damaged peatland restoration one of the most cost-effective climate actions available.<Cite nums={1} /></p>
            <p>The England Peat Action Plan, published in 2021, set targets for restoration and committed to ending the sale of horticultural peat by 2024. Progress has been slow. DEFRA data shows that by 2023, around 40,000 hectares of peatland had been restored in England — compared to a target of 35,000 ha by 2025 (on track) but with a longer-term ambition of 280,000 ha by 2050 that requires a significant acceleration. Restoration involves blocking drainage ditches, rewetting, and often reintroducing sphagnum moss. It takes decades for restored peat to begin absorbing carbon rather than releasing it.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-restoration', label: 'Restoration progress' },
          { id: 'sec-emissions', label: 'Emissions & funding' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Peatland restored (England, cumulative)" value="40,000 ha" unit="" direction="up" polarity="up-is-good" changeText={<>Target: 35,000 ha by 2025, 280,000 by 2050<Cite nums={3} /></>} sparklineData={[2, 4, 6, 8, 10, 14, 18, 24, 30, 36, 40]} href="#sec-restoration" />
          <MetricCard label="Degraded peatland emissions" value="23 MtCO₂e" unit="/yr" direction="down" polarity="up-is-bad" changeText={<>5% of UK territorial emissions<Cite nums={1} /></>} sparklineData={[26, 26, 25, 25, 25, 24, 24, 24, 23, 23, 23]} href="#sec-emissions" />
          <MetricCard label="Degraded peatland (UK)" value="80%" unit="of total" direction="down" polarity="up-is-bad" changeText={<>Drained, burned or cut<Cite nums={1} /></>} sparklineData={[85, 85, 84, 84, 83, 83, 83, 82, 82, 81, 80]} href="#sec-restoration" />
        </div>

        <ScrollReveal>
          <section id="sec-restoration" className="mb-12">
            <LineChart title="Peatland restored and drainage blocked, England, 2010–2024" subtitle="Cumulative peatland restored (000 ha); drainage ditches blocked (000 km)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-emissions" className="mb-12">
            <LineChart title="Degraded peatland emissions and public funding, 2010–2024" subtitle="Annual emissions from degraded peat (MtCO₂e); annual peatland restoration funding (£m)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Horticultural peat ban" value="2026" unit="target" description={<>The government committed to ending the sale of peat-based growing media in England by 2024 (later extended to 2026). This would remove around 3.5 million cubic metres of peat extraction from UK bogs annually.<Cite nums={2} /></>} source="Source: DEFRA England Peat Action Plan." />
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
