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
  { num: 1, name: 'Environment Agency', dataset: 'National Flood Risk Assessment 2 (NaFRA2)', url: 'https://www.gov.uk/government/collections/national-flood-risk-assessment', date: '2024' },
  { num: 2, name: 'Climate Change Committee', dataset: 'Independent Assessment of UK Climate Risk', url: 'https://www.theccc.org.uk/publication/independent-assessment-of-uk-climate-risk/', date: '2024' },
  { num: 3, name: 'DLUHC', dataset: 'Planning and flood risk statistics', url: 'https://www.gov.uk/government/collections/planning-practice-guidance', date: '2023' },
];

interface DataPoint {
  year: number;
  homesAtHighRisk: number;
  homesAtMediumRisk: number;
  newBuildsFloodZone: number;
  averageFloodDamage: number;
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

export default function FloodRiskHousingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/flood-risk-housing/flood_risk_housing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'homesAtHighRisk', label: 'Homes at high flood risk', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.homesAtHighRisk })) },
        { id: 'homesAtMediumRisk', label: 'Homes at medium flood risk', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.homesAtMediumRisk })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'newBuildsFloodZone', label: 'New builds in flood zone 3', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.newBuildsFloodZone })) },
        { id: 'averageFloodDamage', label: 'Avg flood damage per property (£000s)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.averageFloodDamage })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Winters 2019–20 flooding' },
    { date: new Date(2022, 5, 1), label: 'NaFRA2 published' },
  ];

  return (
    <>
      <TopicNav topic="Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="How Many Homes Are at Risk of Flooding?"
          finding={<>Around 6.3 million properties in England are at risk of flooding — one in six homes — according to the Environment Agency's NaFRA2 assessment.<Cite nums={1} /> Climate change is expected to double flood risk by 2050, yet thousands of new homes continue to be built in high-risk flood zones each year.<Cite nums={[2, 3]} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Environment Agency's revised National Flood Risk Assessment 2 (NaFRA2) significantly raised estimates of flood-exposed properties compared to its 2013 predecessor. The new modelling counts 6.3 million properties at some level of risk, with 1.85 million in the highest-risk category — facing odds of flooding greater than 1 in 30 in any given year.<Cite nums={1} /> Coastal erosion and sea level rise add a further layer of risk that previous assessments underweighted.</p>
            <p>Despite flood-zone planning restrictions, analysis of planning consents shows that between 2016 and 2023 over 62,000 new homes were built in Flood Zone 3, the highest-risk designation in England.<Cite nums={3} /> The Climate Change Committee has warned that without rapid investment in flood defences and a moratorium on building in high-risk areas, economic flood losses could reach £11 billion per year by the 2050s.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-risk', label: 'Homes at risk' },
          { id: 'sec-building', label: 'Building in flood zones' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Homes at high flood risk" value="1.85m" unit="" direction="up" polarity="up-is-bad" changeText={<>1 in 6 properties at some risk<Cite nums={1} /></>} sparklineData={[1.4, 1.45, 1.5, 1.55, 1.6, 1.62, 1.65, 1.7, 1.75, 1.8, 1.85]} href="#sec-risk" />
          <MetricCard label="New homes in Flood Zone 3 (2023)" value="8,200" unit="homes" direction="up" polarity="up-is-bad" changeText={<>Despite planning restrictions<Cite nums={3} /></>} sparklineData={[6200, 6500, 6800, 7000, 7100, 7300, 7500, 7700, 7900, 8100, 8200]} href="#sec-building" />
          <MetricCard label="Projected annual flood losses by 2050" value="£11bn" unit="" direction="up" polarity="up-is-bad" changeText={<>Without major investment<Cite nums={2} /></>} sparklineData={[3, 4, 5, 6, 7, 7.5, 8, 9, 9.5, 10, 11]} href="#sec-risk" />
        </div>

        <ScrollReveal>
          <section id="sec-risk" className="mb-12">
            <LineChart title="Properties at flood risk in England, 2010–2024" subtitle="High and medium risk categories, millions of properties." series={chart1Series} annotations={annotations} yLabel="Properties (millions)" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-building" className="mb-12">
            <LineChart title="New homes built in Flood Zone 3 and average flood damage, 2010–2024" subtitle="New builds in highest-risk flood zones; average flood damage cost per property in £000s." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Flood Re scheme" value="350,000" unit="homes" description={<>Around 350,000 high-risk properties benefit from the Flood Re reinsurance scheme, helping keep insurance affordable for households that would otherwise be uninsurable.<Cite nums={1} /></>} source="Source: Flood Re / Environment Agency." />
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
