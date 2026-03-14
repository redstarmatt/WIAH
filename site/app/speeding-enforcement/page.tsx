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
  { num: 1, name: 'DfT', dataset: 'Vehicle speed compliance statistics', url: 'https://www.gov.uk/government/statistical-data-sets/spe01-free-flow-vehicle-speeds', date: '2024' },
  { num: 2, name: 'Ministry of Justice', dataset: 'Criminal Justice Statistics — speeding offences', url: 'https://www.gov.uk/government/collections/criminal-justice-statistics-quarterly', date: '2024' },
  { num: 3, name: 'RAC Foundation', dataset: 'Speed camera effectiveness review', url: 'https://www.racfoundation.org/', date: '2023' },
];

interface DataPoint {
  year: number;
  pctExceeding30mph: number;
  pctExceeding70mph: number;
  speedingPenaltiesMillions: number;
  speedCamerasFixed: number;
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

export default function SpeedingEnforcementPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/speeding-enforcement/speeding_enforcement.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'pctExceeding30mph', label: 'Vehicles exceeding 30mph limit (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pctExceeding30mph })) },
        { id: 'pctExceeding70mph', label: 'Vehicles exceeding 70mph limit (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pctExceeding70mph })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'speedingPenaltiesMillions', label: 'Speeding penalties issued (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.speedingPenaltiesMillions })) },
        { id: 'speedCamerasFixed', label: 'Fixed speed cameras (England & Wales)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.speedCamerasFixed })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — less traffic, less enforcement' },
    { date: new Date(2022, 5, 1), label: 'Record speeding penalties' },
  ];

  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="How Much Speeding Goes Unpunished?"
          finding={<>DfT free-flow speed surveys show that around 53% of cars exceed the 30mph speed limit on 30mph roads — despite speed being a contributory factor in around 30% of fatal collisions.<Cite nums={1} /> Over 3 million speeding penalties were issued in 2022/23, but enforcement remains patchy and fixed camera numbers have fallen in many areas.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>DfT's free-flow speed survey — which measures vehicle speeds on roads without traffic — consistently finds that a majority of drivers exceed 30mph limits in free-flowing conditions. In 2022, 53% of cars exceeded the 30mph limit on 30mph roads. On motorways, 52% exceeded the 70mph limit. These are free-flow speeds measured without active enforcement, but they indicate the scale of routine non-compliance. Speed limits only reduce casualties when drivers comply with them or when enforcement is credible enough to modify behaviour.<Cite nums={1} /></p>
            <p>Fixed speed cameras — the most cost-effective enforcement tool — declined in number in many police areas after central government funding was cut in 2010, with some forces switching off cameras entirely. They have since recovered in some areas, but the national total remains lower than the 2009 peak. Speed awareness courses, introduced as an alternative to fixed penalties for minor speeding, are now completed by over 1 million drivers a year — reducing reoffending by around 25% compared to penalty points alone, according to the RAC Foundation.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-compliance', label: 'Speed compliance' },
          { id: 'sec-enforcement', label: 'Enforcement' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Cars exceeding 30mph (free-flow)" value="53%" unit="" direction="flat" polarity="up-is-bad" changeText={<>Majority of drivers breaking the limit<Cite nums={1} /></>} sparklineData={[58, 57, 56, 56, 55, 55, 54, 54, 53, 53, 53]} href="#sec-compliance" />
          <MetricCard label="Speeding penalties issued (2022/23)" value="3.2m" unit="" direction="up" polarity="up-is-bad" changeText={<>Record high for speeding<Cite nums={2} /></>} sparklineData={[1.8, 2.0, 2.1, 2.2, 2.3, 2.4, 2.0, 1.8, 2.4, 3.0, 3.2]} href="#sec-enforcement" />
          <MetricCard label="Speed awareness courses per year" value="1.1m" unit="" direction="up" polarity="up-is-good" changeText={<>25% less reoffending vs points<Cite nums={3} /></>} sparklineData={[0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.9, 1.0, 1.1]} href="#sec-enforcement" />
        </div>

        <ScrollReveal>
          <section id="sec-compliance" className="mb-12">
            <LineChart title="Speed limit compliance on GB roads, 2010–2022" subtitle="% of cars exceeding 30mph and 70mph speed limits in free-flow conditions." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-enforcement" className="mb-12">
            <LineChart title="Speeding penalties and fixed speed cameras, 2010–2023" subtitle="Annual speeding penalties issued (millions); fixed speed cameras in service." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Average speed cameras" value="-36%" unit="collisions" description={<>Average speed cameras — which enforce limits over a distance rather than at a point — are associated with a 36% reduction in injury collisions in the zones where they operate, and a 49% fall in fatal collisions, according to Highways England analysis.<Cite nums={3} /></>} source="Source: RAC Foundation / National Highways." />
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
