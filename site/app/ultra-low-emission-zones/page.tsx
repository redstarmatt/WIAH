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
  { num: 1, name: 'Transport for London / ULEZ', dataset: 'ULEZ air quality impacts and monitoring', url: 'https://tfl.gov.uk/travel-information/improvements-and-projects/ultra-low-emission-zone', date: '2024' },
  { num: 2, name: 'DEFRA', dataset: 'Clean Air Zone Framework', url: 'https://www.gov.uk/guidance/driving-in-a-clean-air-zone', date: '2024' },
  { num: 3, name: 'Imperial College London', dataset: 'ULEZ health impact assessment', url: 'https://www.imperial.ac.uk/school-of-public-health/', date: '2024' },
];

interface DataPoint {
  year: number;
  no2ReductionUlezPct: number;
  nonCompliantVehiclesDaily: number;
  cazCitiesActive: number;
  noxEmissionsTransportMtCO2e: number;
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

export default function UltraLowEmissionZonesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/ultra-low-emission-zones/ultra_low_emission_zones.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'no2ReductionUlezPct', label: 'NO₂ reduction in London ULEZ area (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.no2ReductionUlezPct })) },
        { id: 'nonCompliantVehiclesDaily', label: 'Non-compliant vehicles/day in London (000s)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nonCompliantVehiclesDaily })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'cazCitiesActive', label: 'CAZ-class cities active in England', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cazCitiesActive })) },
        { id: 'noxEmissionsTransportMtCO2e', label: 'Road transport NOₓ emissions (kt)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.noxEmissionsTransportMtCO2e })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Central London ULEZ launched' },
    { date: new Date(2023, 5, 1), label: 'London ULEZ expanded to all boroughs' },
  ];

  return (
    <>
      <TopicNav topic="Transport & Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Environment"
          question="Are Clean Air Zones Improving Air Quality?"
          finding={<>TfL monitoring shows London's ULEZ has reduced NO₂ levels by up to 46% in central zones since 2019, and the expanded all-London ULEZ launched in 2023 has already seen non-compliant vehicle numbers drop significantly.<Cite nums={1} /> Clean Air Zones are now active in several English cities but coverage remains patchy and rural areas remain unaddressed.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>London's Ultra Low Emission Zone (ULEZ), introduced in April 2019 for central London and expanded to the North and South Circular roads in 2021 and all 33 London boroughs in August 2023, charges owners of non-compliant vehicles £12.50 per day to drive in the zone. TfL's air quality monitoring found that NO₂ levels in the original central zone fell by 46% in the first three years — significantly faster than the trend outside the zone. By the time of the full London expansion, non-compliant vehicle numbers in outer London had already begun falling in anticipation of the charge.<Cite nums={1} /></p>
            <p>Outside London, the government required the most polluted cities to implement Clean Air Zones after losing multiple court battles over illegal NO₂ levels. Bath, Birmingham, Bradford, Bristol, Portsmouth and Sheffield have active Class D CAZs (charging all non-compliant vehicles including private cars) or Class B and C zones. Imperial College London's health impact modelling estimates that full national implementation of CAZs meeting WHO air quality limits would prevent around 17,000 premature deaths annually.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-london', label: 'London ULEZ impact' },
          { id: 'sec-national', label: 'National CAZ rollout' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="NO₂ reduction in central ULEZ" value="-46%" unit="" direction="down" polarity="up-is-good" changeText={<>Since 2019 launch<Cite nums={1} /></>} sparklineData={[0, 8, 15, 20, 25, 30, 35, 38, 41, 44, 46]} href="#sec-london" />
          <MetricCard label="Non-compliant vehicles/day (2023)" value="~30,000" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 100,000+ in 2019<Cite nums={1} /></>} sparklineData={[100, 95, 85, 75, 65, 60, 55, 50, 45, 35, 30]} href="#sec-london" />
          <MetricCard label="CAZ-active English cities" value="6" unit="" direction="up" polarity="up-is-good" changeText={<>Bath, Birmingham, Bradford etc<Cite nums={2} /></>} sparklineData={[0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 6]} href="#sec-national" />
        </div>

        <ScrollReveal>
          <section id="sec-london" className="mb-12">
            <LineChart title="London ULEZ NO₂ reduction and non-compliant vehicles, 2019–2024" subtitle="Cumulative NO₂ reduction (%); non-compliant vehicles per day in London (000s)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-national" className="mb-12">
            <LineChart title="Clean Air Zones active in England and road transport NOₓ emissions, 2018–2024" subtitle="Number of CAZ-class cities active; road transport NOₓ emissions (kt)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Scrappage scheme" value="50,000" unit="vehicles scrapped" description={<>The London ULEZ scrappage scheme, funded from charge revenues, helped around 50,000 lower-income and disabled Londoners replace non-compliant vehicles with compliant alternatives or free bus passes, reducing the regressive impact of the charge.<Cite nums={1} /></>} source="Source: TfL ULEZ evaluation report." />
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
