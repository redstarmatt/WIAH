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
  { num: 1, name: 'HMPPS', dataset: 'Education and Employment in Prisons', url: 'https://www.gov.uk/government/statistics/hmpps-annual-digest', date: '2024' },
  { num: 2, name: 'Ofsted', dataset: 'Education and Training in Prisons', url: 'https://www.gov.uk/government/publications/education-in-prisons', date: '2024' },
  { num: 3, name: 'Ministry of Justice', dataset: 'Proven Reoffending Statistics', url: 'https://www.gov.uk/government/collections/proven-reoffending-statistics', date: '2024' },
];

interface DataPoint {
  year: number;
  prisonersInEducation: number;
  literacyQualificationsAchieved: number;
  employmentOnRelease: number;
  reoffendingRate: number;
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

export default function PrisonLiteracyProgrammesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/prison-literacy-programmes/prison_literacy_programmes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'prisonersInEducation', label: 'Prisoners in education (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.prisonersInEducation })) },
        { id: 'literacyQualificationsAchieved', label: 'Literacy qualifications achieved', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.literacyQualificationsAchieved })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'employmentOnRelease', label: 'Employment on release (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.employmentOnRelease })) },
        { id: 'reoffendingRate', label: 'Proven reoffending rate (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.reoffendingRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — in-cell education only' },
    { date: new Date(2021, 5, 1), label: 'New Education and Employment Strategy' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Are Prison Education Programmes Working?"
          finding={<>Around 40% of prisoners have the literacy level of an 11-year-old, yet fewer than a third engage in formal education during their sentence.<Cite nums={1} /> Ofsted inspections consistently rate prison education as weaker than community provision, and the proven reoffending rate has stagnated at around 25%.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The case for prison education rests on straightforward logic: people who leave prison able to read, write, and find employment are less likely to reoffend. Roughly 50% of people in prison have no qualifications at all, and the links between low literacy, unemployment, and reoffending are well established. The government&apos;s Education and Employment Strategy, updated in 2021, set out ambitions to increase the number of prisoners achieving English and maths qualifications and securing employment on release — but the data shows progress has been slow.<Cite nums={1} /></p>
            <p>Prison education contracts are held by large providers and overseen by Ofsted. Inspection reports have repeatedly found that the quality of teaching is too variable, that regime pressures — lockdowns, staff shortages, overcrowding — disrupt timetables, and that transitions between prisons disrupt individual learning plans. The pandemic reset provision almost entirely for 18 months, with in-cell packs replacing classroom learning.<Cite nums={[2, 3]} /> Getting back to pre-2020 participation levels has taken until 2023.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Education participation' },
          { id: 'sec-chart2', label: 'Outcomes' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Prisoners in education" value="31" unit="%" direction="up" polarity="up-is-good" changeText={<>Recovering from 18% during Covid<Cite nums={1} /></>} sparklineData={[35, 34, 33, 18, 22, 26, 28, 30, 31, 31, 31]} href="#sec-chart1" />
          <MetricCard label="Literacy qualifications achieved" value="41k" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 35k in 2021<Cite nums={2} /></>} sparklineData={[48000, 47000, 30000, 32000, 35000, 38000, 40000, 41000, 41000, 41000, 41000]} href="#sec-chart1" />
          <MetricCard label="Proven reoffending rate" value="25" unit="%" direction="flat" polarity="up-is-bad" changeText={<>Barely changed in a decade<Cite nums={3} /></>} sparklineData={[25.6, 25.3, 25.0, 25.2, 25.1, 25.0, 25.1, 25.1, 25.0, 25.0, 25.0]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Prison education participation and qualifications, 2015–2023" subtitle="Percentage of prisoners in education and literacy qualifications achieved annually" series={chart1Series} annotations={annotations} yLabel="% / qualifications" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Employment on release and reoffending, 2015–2023" subtitle="% in employment 6 months after release and proven reoffending rate" series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="New Futures Network" value="3,000" unit="employers" description={<>The New Futures Network has engaged over 3,000 employers to offer work experience and jobs to people leaving prison, with early evidence that those in employment are significantly less likely to reoffend.<Cite nums={1} /></>} source="Source: HMPPS, New Futures Network annual report." />
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
