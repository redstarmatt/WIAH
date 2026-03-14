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
  { num: 1, name: 'Living Streets', dataset: 'School streets map and statistics', url: 'https://www.livingstreets.org.uk/our-work/projects/school-streets/', date: '2024' },
  { num: 2, name: 'Active Travel England', dataset: 'School streets implementation data', url: 'https://www.gov.uk/government/organisations/active-travel-england', date: '2024' },
  { num: 3, name: 'Imperial College London', dataset: 'School streets air quality study', url: 'https://www.imperial.ac.uk/school-of-public-health/research/environment-pollution/', date: '2022' },
];

interface DataPoint {
  year: number;
  schoolStreetSchemes: number;
  schoolsParticipating: number;
  airQualityImprovementPct: number;
  activeSchoolTravelPct: number;
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

export default function SchoolStreetSchemesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/school-street-schemes/school_street_schemes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'schoolStreetSchemes', label: 'School street schemes in operation', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.schoolStreetSchemes })) },
        { id: 'schoolsParticipating', label: 'Schools participating (000s)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.schoolsParticipating })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'airQualityImprovementPct', label: 'NO₂ reduction at school gates (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.airQualityImprovementPct })) },
        { id: 'activeSchoolTravelPct', label: 'Children walking/cycling to school (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.activeSchoolTravelPct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid pop-up schemes surge' },
    { date: new Date(2022, 5, 1), label: 'ATE school streets fund' },
  ];

  return (
    <>
      <TopicNav topic="Transport & Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Education"
          question="How Many Schools Have Car-Free Streets?"
          finding={<>Around 1,000 school street schemes now operate across England, restricting car access around school gates during drop-off and pick-up times — reducing pollution and improving safety.<Cite nums={1} /> Research by Imperial College found NO₂ levels at school gates with schemes fell by up to 24% during restricted hours, but coverage remains patchy and mostly confined to London and larger cities.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>School streets — temporary or permanent traffic restrictions that close the road outside a school during drop-off and pick-up — address two well-documented problems simultaneously: dangerous traffic and poor air quality around schools, and declining rates of walking and cycling among children. Around one in five schools in England is in an area where roadside nitrogen dioxide levels exceed WHO safe limits. The proximity of running engines to children during morning drop-off creates a concentrated pollution exposure event that repeats daily for years.<Cite nums={3} /></p>
            <p>Living Streets, the walking charity that maintains the national school streets map, estimates there are now around 1,000 schemes in England, up from fewer than 100 in 2019. London accounts for the largest concentration, with several hundred schemes run by the Mayor's office and London boroughs. Outside London, implementation has been patchy and dependent on local authority capacity and political will. Active Travel England has funded a school streets programme but coverage of England's 16,000 primary schools remains far short of universal.<Cite nums={[1, 2]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-growth', label: 'Scheme growth' },
          { id: 'sec-impact', label: 'Air quality & travel' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="School street schemes in England" value="~1,000" unit="" direction="up" polarity="up-is-good" changeText={<>Up from under 100 in 2019<Cite nums={1} /></>} sparklineData={[50, 80, 120, 180, 300, 450, 600, 750, 850, 950, 1000]} href="#sec-growth" />
          <MetricCard label="NO₂ reduction during restrictions" value="-24%" unit="" direction="down" polarity="up-is-good" changeText={<>Imperial College London research<Cite nums={3} /></>} sparklineData={[0, 0, 0, 5, 10, 15, 18, 20, 22, 23, 24]} href="#sec-impact" />
          <MetricCard label="Children walking/cycling to school" value="47%" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 70% in 1970<Cite nums={2} /></>} sparklineData={[70, 65, 60, 55, 52, 50, 49, 48, 47, 47, 47]} href="#sec-impact" />
        </div>

        <ScrollReveal>
          <section id="sec-growth" className="mb-12">
            <LineChart title="School street schemes and participating schools, England, 2016–2024" subtitle="Number of active school street schemes; schools participating (000s)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-impact" className="mb-12">
            <LineChart title="Air quality improvement and active school travel rates, 2016–2024" subtitle="NO₂ reduction during restricted hours (%); children walking or cycling to school (%)." series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Scotland ahead of England" value="1 in 3" unit="Scottish primary schools" description={<>Scotland has implemented school streets around roughly 1 in 3 primary schools — a far higher proportion than England — through a national programme that provides local authorities with standardised design guidance and funding.<Cite nums={1} /></>} source="Source: Living Streets / Sustrans Scotland." />
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
