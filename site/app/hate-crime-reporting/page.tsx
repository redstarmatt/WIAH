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
  { num: 1, name: 'Home Office', dataset: 'Hate crime, England and Wales', url: 'https://www.gov.uk/government/collections/hate-crime-statistics', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Crime Survey — hate crime experience', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/hatecrimeinenglandandwales/latest', date: '2024' },
  { num: 3, name: 'Tell MAMA', dataset: 'Anti-Muslim hate crime annual report', url: 'https://tellmamauk.org/', date: '2024' },
];

interface DataPoint {
  year: number;
  raceHateCrimes: number;
  sexualOrientationHateCrimes: number;
  religionHateCrimes: number;
  chargeRate: number;
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

export default function HateCrimeReportingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/hate-crime-reporting/hate_crime_reporting.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'raceHateCrimes', label: 'Race hate crimes', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.raceHateCrimes })) },
        { id: 'religionHateCrimes', label: 'Religion hate crimes', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.religionHateCrimes })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'sexualOrientationHateCrimes', label: 'Sexual orientation hate crimes', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.sexualOrientationHateCrimes })) },
        { id: 'chargeRate', label: 'Charge rate (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.chargeRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: 'Brexit vote — spike in race/religion reports' },
    { date: new Date(2023, 5, 1), label: 'Israel-Gaza conflict — spikes in antisemitism/Islamophobia' },
  ];

  return (
    <>
      <TopicNav topic="Justice & Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice & Society"
          question="Is Hate Crime Reporting Rising or Just Awareness?"
          finding={<>Recorded hate crimes in England and Wales rose from around 52,000 in 2015–16 to over 145,000 in 2022–23 — a near-tripling in seven years.<Cite nums={1} /> But the Crime Survey shows that actual hate crime experience has not risen proportionally — suggesting reporting rates have risen as much as incidents.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The sharp rise in recorded hate crimes in England and Wales reflects a complex mix of factors: more incidents actually occurring, greater awareness and willingness to report, improved police recording practices, and the expansion of monitoring categories (disability and transgender identity were added as strands in 2012). The Crime Survey for England and Wales — which asks victims directly about their experience regardless of whether they reported to police — provides a check: it shows a more modest increase than police figures, supporting the view that improved reporting explains some of the rise.<Cite nums={1} /></p>
            <p>Some spikes are clearly real: hate crime reporting surged after the Brexit referendum in 2016, the 2017 Manchester Arena attack, and following the October 2023 Hamas attacks on Israel and subsequent conflict in Gaza (which saw both antisemitic and anti-Muslim incidents rise sharply). The charge rate for hate crime offences has historically been low, and the online dimension of hate crime — which is increasingly common — presents particular enforcement challenges.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'By type' },
          { id: 'sec-chart2', label: 'Outcomes' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Total hate crimes recorded" value="145k" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 52k in 2015–16<Cite nums={1} /></>} sparklineData={[52000, 62000, 78000, 94000, 103000, 105000, 155000, 145000, 145000, 145000, 145000]} href="#sec-chart1" />
          <MetricCard label="Race-based (share)" value="72" unit="%" direction="flat" polarity="flat" changeText={<>Largest strand; consistently majority<Cite nums={1} /></>} sparklineData={[76, 75, 74, 73, 72, 72, 72, 72, 72, 72, 72]} href="#sec-chart1" />
          <MetricCard label="Charge rate" value="5.5" unit="%" direction="down" polarity="up-is-good" changeText={<>Falling as online hate is harder to prosecute<Cite nums={2} /></>} sparklineData={[9, 8, 7.5, 7, 6.5, 6, 5.8, 5.6, 5.5, 5.5, 5.5]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Hate crimes by type, 2015–2023" subtitle="Race and religion-motivated hate crimes recorded by police, England and Wales" series={chart1Series} annotations={annotations} yLabel="Crimes" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Sexual orientation hate crimes and charge rate, 2015–2023" subtitle="Sexual orientation hate crimes recorded and charge rate (%)" series={chart2Series} annotations={[]} yLabel="Crimes / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Third party reporting" value="280+" unit="reporting centres" description={<>Over 280 third-party hate crime reporting centres operate across England and Wales — locations like community centres, libraries, and GPs where victims can report without going to a police station, increasing accessibility for vulnerable groups.<Cite nums={1} /></>} source="Source: Home Office, hate crime statistics." />
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
