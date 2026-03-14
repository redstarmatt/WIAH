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
  { num: 1, name: 'Environment Agency', dataset: 'National Coastal Erosion Risk Mapping (NCERM)', url: 'https://www.gov.uk/government/publications/coastal-flood-boundary-conditions-for-uk-mainland-and-islands', date: '2024' },
  { num: 2, name: 'UKCEH', dataset: 'Shoreline Management Plans data', url: 'https://environment.data.gov.uk/shoreline-planning/', date: '2023' },
  { num: 3, name: 'Climate Change Committee', dataset: 'Independent Assessment of UK Climate Risk — Coastal', url: 'https://www.theccc.org.uk/publication/independent-assessment-of-uk-climate-risk/', date: '2024' },
];

interface DataPoint {
  year: number;
  propertiesAtRisk: number;
  coastlineLostMetresPerYear: number;
  seaLevelRiseMm: number;
  stormsAffectingCoast: number;
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

export default function CoastalErosionRatesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/coastal-erosion-rates/coastal_erosion_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'propertiesAtRisk', label: 'Properties at erosion risk by 2100', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.propertiesAtRisk })) },
        { id: 'coastlineLostMetresPerYear', label: 'Average coastline loss (m/yr)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.coastlineLostMetresPerYear })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'seaLevelRiseMm', label: 'Relative sea level rise since 1900 (mm)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.seaLevelRiseMm })) },
        { id: 'stormsAffectingCoast', label: 'Significant coastal storm events per decade', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.stormsAffectingCoast })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2014, 5, 1), label: 'Severe winter storms' },
    { date: new Date(2020, 5, 1), label: 'Record sea levels recorded' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Fast Is Britain's Coastline Disappearing?"
          finding={<>The Environment Agency estimates that around 100,000 properties in England are at risk of coastal erosion by 2100, with parts of East Anglia and Yorkshire losing more than a metre of coastline per year.<Cite nums={1} /> Sea level rise is accelerating, and Shoreline Management Plans already plan for the managed retreat of some communities rather than continued defence.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has over 17,000 kilometres of coastline, and a significant proportion is actively eroding. The soft clay and chalk cliffs of the Holderness coast in Yorkshire are retreating at an average of 1.7 metres per year — among the fastest erosion rates in Europe — and the cumulative loss since Roman times exceeds 30 villages. Happisburgh in Norfolk has lost over 35 houses to the sea since the 1990s, and residents have received no compensation because their properties are outside the area deemed worth defending by national cost-benefit rules.<Cite nums={[1, 2]} /></p>
            <p>The Climate Change Committee's 2024 assessment found that sea level rise around England is running at 3–4mm per year, faster than the global average due to post-glacial land subsidence in southern England. Under high-emissions scenarios, sea levels around the south coast could rise by 70cm or more by 2100, dramatically extending the zone at risk. Shoreline Management Plans — the strategic documents governing which coastlines will be defended, managed or abandoned — were last comprehensively updated in 2010 and do not fully reflect current projections.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-erosion', label: 'Erosion risk' },
          { id: 'sec-sealevel', label: 'Sea level rise' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Properties at erosion risk by 2100" value="100,000" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 65,000 in 2010 estimates<Cite nums={1} /></>} sparklineData={[65, 68, 70, 72, 74, 76, 80, 85, 90, 95, 100]} href="#sec-erosion" />
          <MetricCard label="Sea level rise (England, since 1900)" value="~180mm" unit="" direction="up" polarity="up-is-bad" changeText={<>3–4mm per year currently<Cite nums={3} /></>} sparklineData={[0, 20, 40, 60, 80, 100, 120, 140, 155, 170, 180]} href="#sec-sealevel" />
          <MetricCard label="Holderness erosion rate" value="1.7m/yr" unit="" direction="up" polarity="up-is-bad" changeText={<>Fastest in Europe<Cite nums={2} /></>} sparklineData={[1.2, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5, 1.6, 1.6, 1.7, 1.7]} href="#sec-erosion" />
        </div>

        <ScrollReveal>
          <section id="sec-erosion" className="mb-12">
            <LineChart title="Properties at coastal erosion risk and average erosion rates, 2000–2024" subtitle="Properties at risk by 2100 (000s); average coastline retreat in m/year." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sealevel" className="mb-12">
            <LineChart title="Relative sea level rise and coastal storm frequency, 1990–2024" subtitle="Relative sea level rise in mm since 1900; significant coastal storm events per decade." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Managed realignment success" value="8,000 ha" unit="of new habitat" description={<>Managed coastal realignment schemes in England have created over 8,000 hectares of new intertidal habitat since 2000, providing natural flood buffers while allowing inevitable coastal retreat in the most vulnerable areas.<Cite nums={2} /></>} source="Source: Environment Agency / RSPB." />
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
