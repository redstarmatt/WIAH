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
  { num: 1, name: 'Ministry of Justice', dataset: 'Offender management statistics — custody and remand', url: 'https://www.gov.uk/government/collections/offender-management-statistics-quarterly', date: '2024' },
  { num: 2, name: 'Prison Reform Trust', dataset: 'Bromley Briefings Prison Factfile', url: 'https://prisonreformtrust.org.uk/resource/bromley-briefings/', date: '2024' },
  { num: 3, name: 'Transform Justice', dataset: 'Remand and bail in England and Wales', url: 'https://www.transformjustice.org.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  remandPopulation: number;
  remandAsPctOfPrisonPop: number;
  avgRemandDaysAwaitingTrial: number;
  remandedLaterAcquitted: number;
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

export default function BailConditionsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/bail-conditions/bail_conditions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'remandPopulation', label: 'Remand (pre-trial custody) population', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.remandPopulation })) },
        { id: 'remandAsPctOfPrisonPop', label: 'Remand as % of total prison population', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.remandAsPctOfPrisonPop })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgRemandDaysAwaitingTrial', label: 'Average days on remand awaiting trial', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgRemandDaysAwaitingTrial })) },
        { id: 'remandedLaterAcquitted', label: 'Remanded defendants later acquitted (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.remandedLaterAcquitted })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — court backlog begins' },
    { date: new Date(2022, 5, 1), label: 'Court backlog peaks' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Many Defendants Are Being Held on Remand?"
          finding={<>The remand (pre-trial custody) population reached over 16,000 in 2023 — a record high and nearly a quarter of all prisoners — as the Crown Court backlog forces defendants to wait an average of over a year before trial.<Cite nums={1} /> Around 10% of those remanded in custody are ultimately acquitted — meaning thousands are imprisoned for extended periods despite never being found guilty.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Remand — the detention of a defendant before their trial — is intended to be exceptional, used only where bail is refused because the defendant poses a flight risk, risk of reoffending, or risk of interfering with witnesses. In practice, the explosion in the Crown Court backlog since Covid has turned remand into an increasingly common experience of indefinite imprisonment without conviction. MoJ statistics show the remand population rose from around 11,000 in 2019 to over 16,000 in 2023 — a 45% increase — as defendants waited over 500 days on average from charge to trial conclusion.<Cite nums={1} /></p>
            <p>The consequences of extended remand are severe. Defendants lose their jobs, housing and family relationships during imprisonment. The Prison Reform Trust estimates that around 10% of those held on remand are ultimately acquitted — a figure that has grown as the backlog has lengthened and the courts process proportionally more not-guilty cases. A defendant acquitted after 18 months on remand has, in effect, served a substantial sentence for a crime they were not convicted of. Transform Justice has called for a statutory time limit on remand periods, comparable to systems in Germany and the Netherlands.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-remand', label: 'Remand population' },
          { id: 'sec-waits', label: 'Waiting times & outcomes' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Remand population (2023)" value="16,000" unit="" direction="up" polarity="up-is-bad" changeText={<>Record high — 24% of prison pop<Cite nums={1} /></>} sparklineData={[10000, 10500, 11000, 11500, 12000, 11000, 12000, 13500, 15000, 15800, 16000]} href="#sec-remand" />
          <MetricCard label="Avg days awaiting trial (Crown)" value="500+" unit="days" direction="up" polarity="up-is-bad" changeText={<>Up from 180 days pre-Covid<Cite nums={1} /></>} sparklineData={[180, 190, 200, 210, 220, 280, 350, 420, 470, 500, 510]} href="#sec-waits" />
          <MetricCard label="Remanded and later acquitted" value="~10%" unit="" direction="up" polarity="up-is-bad" changeText={<>Imprisoned without conviction<Cite nums={2} /></>} sparklineData={[7, 7, 7.5, 8, 8, 8.5, 9, 9, 9.5, 10, 10]} href="#sec-waits" />
        </div>

        <ScrollReveal>
          <section id="sec-remand" className="mb-12">
            <LineChart title="Remand population in England and Wales, 2010–2023" subtitle="Pre-trial custody population; remand as % of total prison population." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart title="Average remand waiting time and acquittal rate, 2010–2023" subtitle="Average days awaiting Crown Court trial; % of remanded defendants subsequently acquitted." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Bail Information Service" value="30%" unit="reduction in remand" description={<>Bail Information Services — which provide courts with information about a defendant's circumstances to support bail decisions — are associated with a 30% reduction in remand rates where they operate, according to Nacro evaluations.<Cite nums={3} /></>} source="Source: Transform Justice / Nacro bail information research." />
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
