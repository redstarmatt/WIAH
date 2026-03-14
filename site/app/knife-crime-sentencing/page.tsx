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
  { num: 1, name: 'Office for National Statistics', dataset: 'Knife and sharp instrument offences, England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimerecordingmajorchangesinnatureofreportedcrime', date: '2024' },
  { num: 2, name: 'Ministry of Justice', dataset: 'Knife and offensive weapons sentencing', url: 'https://www.gov.uk/government/statistics/knife-and-offensive-weapons-sentencing-statistics', date: '2024' },
  { num: 3, name: 'Violence Reduction Units', dataset: 'VRU evaluation — reducing serious violence', url: 'https://www.gov.uk/government/publications/violence-reduction-units-a-process-evaluation', date: '2024' },
];

interface DataPoint {
  year: number;
  knifeCrimeOffences: number;
  knifeHomicides: number;
  avgSentenceLengthMonths: number;
  cautionRatePct: number;
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

export default function KnifeCrimeSentencingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/knife-crime-sentencing/knife_crime_sentencing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'knifeCrimeOffences', label: 'Knife and sharp instrument offences', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.knifeCrimeOffences })) },
        { id: 'knifeHomicides', label: 'Knife homicides per year', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.knifeHomicides })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgSentenceLengthMonths', label: 'Average custodial sentence for knife possession (months)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgSentenceLengthMonths })) },
        { id: 'cautionRatePct', label: 'Knife offenders receiving caution (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cautionRatePct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: 'Minimum sentences legislated' },
    { date: new Date(2019, 5, 1), label: 'Violence Reduction Units launched' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Are Knife Crime Sentences Getting Tougher?"
          finding={<>Knife crime offences reached a record 50,000+ in 2022/23, with knife homicides rising to 244 — the highest since comparable records began.<Cite nums={1} /> Sentencing for knife possession has become harsher — average custodial sentences have risen and caution rates fallen — but there is little evidence that tougher sentencing alone is reducing offending, while evidence-based Violence Reduction Units show more promise.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Recorded knife and sharp instrument offences in England and Wales have risen from around 26,000 in 2013/14 to over 50,000 in 2022/23. Knife homicides — the most serious indicator — reached 244 in 2022/23, the highest since the ONS began collecting comparable data. The increase reflects both genuine rises in violence and improved recording. Young people, particularly Black teenagers in urban areas, are disproportionately represented among both victims and offenders, and structural factors including poverty, school exclusion and county lines drug networks are consistently identified as drivers.<Cite nums={1} /></p>
            <p>Legislation has repeatedly toughened sentences for knife possession. The Offensive Weapons Act 2019 extended mandatory minimum sentences and introduced new offences. MoJ sentencing data shows the proportion of knife offenders receiving immediate custody has risen, and the average custodial length increased. Caution rates — where first-time or low-risk offenders receive a formal caution rather than prosecution — have fallen sharply. But meta-analyses of deterrence research consistently find that sentence length has little deterrent effect on impulsive violence in contexts where young people feel unsafe. Violence Reduction Units, modelled on Glasgow's public health approach, have shown more promising results in areas where they operate.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-offences', label: 'Offence trend' },
          { id: 'sec-sentencing', label: 'Sentencing' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Knife offences (2022/23)" value="50,000+" unit="" direction="up" polarity="up-is-bad" changeText={<>Record high — up 90% since 2013<Cite nums={1} /></>} sparklineData={[26, 28, 32, 35, 38, 40, 44, 47, 48, 50, 51]} href="#sec-offences" />
          <MetricCard label="Knife homicides (2022/23)" value="244" unit="" direction="up" polarity="up-is-bad" changeText={<>Highest in comparable records<Cite nums={1} /></>} sparklineData={[186, 188, 195, 200, 205, 215, 220, 224, 232, 238, 244]} href="#sec-offences" />
          <MetricCard label="Avg custody for knife possession" value="7.2 months" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 5.1 months in 2015<Cite nums={2} /></>} sparklineData={[5.1, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9, 7.2]} href="#sec-sentencing" />
        </div>

        <ScrollReveal>
          <section id="sec-offences" className="mb-12">
            <LineChart title="Knife crime offences and homicides, England and Wales, 2013–2023" subtitle="Total knife and sharp instrument offences; knife homicides per year." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sentencing" className="mb-12">
            <LineChart title="Sentencing severity and caution rates for knife offences, 2013–2023" subtitle="Average custodial sentence (months); % of knife offenders receiving a caution." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Glasgow model" value="-65%" unit="serious violence" description={<>Glasgow's Violence Reduction Unit, established in 2005, reduced serious assault rates by 65% over 15 years through a public health approach — treating violence as a preventable disease and combining outreach, employment and diversion with enforcement.<Cite nums={3} /></>} source="Source: Violence Reduction Units evaluation / Scottish Violence Reduction Unit." />
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
