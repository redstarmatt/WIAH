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
  { num: 1, name: 'Environment Agency', dataset: 'Water Framework Directive — Waterbody Classifications', url: 'https://environment.data.gov.uk/catchment-planning/', date: '2024' },
  { num: 2, name: 'EA', dataset: 'Chemical Monitoring of Rivers: Annual Statistics', url: 'https://www.gov.uk/government/collections/river-quality-data', date: '2024' },
  { num: 3, name: 'CHEM Trust', dataset: 'Chemicals in UK Rivers: State of Knowledge', url: 'https://chemtrust.org/river-chemical-pollution/', date: '2023' },
];

interface DataPoint {
  year: number;
  goodChemicalStatus: number;
  pesticideExceedances: number;
  pharmaceuticalLoad: number;
  pfasDetections: number;
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

export default function ChemicalPollutionRiversPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/chemical-pollution-rivers/chemical_pollution_rivers.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'goodChemicalStatus', label: 'Rivers achieving good chemical status (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.goodChemicalStatus })) },
        { id: 'pesticideExceedances', label: 'Pesticide standard exceedances (count/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pesticideExceedances })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'pharmaceuticalLoad', label: 'Pharmaceutical detections above threshold (% sites)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pharmaceuticalLoad })) },
        { id: 'pfasDetections', label: 'PFAS detections above threshold (% sites)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pfasDetections })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: 'WFD 2027 deadline assessment' },
    { date: new Date(2021, 5, 1), label: 'Post-Brexit chemical standards review' },
  ];

  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="How Much Chemical Pollution Is in UK Rivers?"
          finding={<>Only 14% of rivers in England achieve good chemical status under the Water Framework Directive, with the UK missing its 2021 interim targets and on track to miss the 2027 final deadline by a wide margin.<Cite nums={1} /> PFAS 'forever chemicals', pharmaceuticals and pesticides are detected widely in river monitoring data.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The chemical state of England's rivers is poor and largely unchanged over the past decade. The Environment Agency's 2022 assessment found that only 14% of water bodies achieved good chemical status — the measure that determines whether concentrations of hazardous substances are safe for aquatic life and human health.<Cite nums={1} /> This is not primarily a sewage story: while sewage discharge pollution is significant and high-profile, chemical pollution of rivers has multiple diffuse sources including agricultural runoff, urban surface water, industrial discharges and leaching from contaminated land. Many of the chemicals of greatest concern — persistent organic pollutants, PFAS compounds, and certain pesticides — are effectively ubiquitous in river systems.</p>
            <p>CHEM Trust analysis of Environment Agency monitoring data highlights that pharmaceutical compounds including antidepressants, hormones and antifungal agents are now routinely detected above environmental quality standards in rivers throughout England, particularly below wastewater treatment works.<Cite nums={3} /> PFAS ('forever chemicals') have been detected at concerning concentrations near industrial sites and in rivers receiving firefighting foam runoff from airports and military bases. The UK's ability to regulate emerging chemical pollutants post-Brexit is a subject of ongoing concern, as the domestic REACH chemical regulation framework lags behind EU standards.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-status', label: 'Chemical status' },
          { id: 'sec-contaminants', label: 'Contaminant types' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Rivers at good chemical status" value="14" unit="%" direction="flat" polarity="up-is-good" changeText={<>Barely changed since 2016<Cite nums={1} /></>} sparklineData={[16, 15, 15, 14, 14, 14, 14, 14, 14, 14, 14]} href="#sec-status" />
          <MetricCard label="Pesticide standard exceedances/yr" value="~3,200" unit="" direction="flat" polarity="up-is-bad" changeText={<>Consistently high across monitoring network<Cite nums={2} /></>} sparklineData={[3100, 3150, 3200, 3250, 3180, 3200, 3210, 3190, 3210, 3200, 3200]} href="#sec-contaminants" />
          <MetricCard label="Sites with PFAS above threshold" value="35" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up as monitoring expanded<Cite nums={3} /></>} sparklineData={[10, 12, 15, 18, 22, 25, 28, 30, 32, 34, 35]} href="#sec-contaminants" />
        </div>

        <ScrollReveal>
          <section id="sec-status" className="mb-12">
            <LineChart title="River chemical status and pesticide exceedances, 2013–2024" subtitle="Rivers at good chemical status (%) and annual pesticide standard exceedances, England." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-contaminants" className="mb-12">
            <LineChart title="Pharmaceutical and PFAS detections in rivers, 2013–2024" subtitle="Monitoring sites exceeding thresholds for pharmaceuticals and PFAS compounds (%), England." series={chart2Series} annotations={[]} yLabel="% of monitoring sites" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Chemicals Strategy" value="2025" unit="target" description={<>The UK government has committed to publishing a comprehensive chemicals strategy by 2025, which would establish a framework for prioritising chemical risks and co-ordinating action across regulatory bodies — a first step toward addressing diffuse chemical pollution.<Cite nums={2} /></>} source="Source: DESNZ/Defra, Chemicals Strategy Consultation, 2024." />
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
