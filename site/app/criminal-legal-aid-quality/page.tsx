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
  { num: 1, name: 'Legal Aid Agency', dataset: 'Legal aid statistics quarterly', url: 'https://www.gov.uk/government/collections/legal-aid-statistics', date: '2024' },
  { num: 2, name: 'Law Society', dataset: 'Legal aid and access to justice — crisis report', url: 'https://www.lawsociety.org.uk/topics/legal-aid/', date: '2024' },
  { num: 3, name: 'Criminal Bar Association', dataset: 'State of the criminal bar', url: 'https://www.criminalbar.com/resources/news/', date: '2024' },
];

interface DataPoint {
  year: number;
  criminalLegalAidSpendBn: number;
  crownCourtDefenceProviders: number;
  avgBriefFeeGbp: number;
  unrepresentedDefendantsPct: number;
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

export default function CriminalLegalAidQualityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/criminal-legal-aid-quality/criminal_legal_aid_quality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'criminalLegalAidSpendBn', label: 'Criminal legal aid spend (£bn, real terms)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.criminalLegalAidSpendBn })) },
        { id: 'crownCourtDefenceProviders', label: 'Crown Court defence providers', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.crownCourtDefenceProviders })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgBriefFeeGbp', label: 'Average brief fee for Crown Court defence (£)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgBriefFeeGbp })) },
        { id: 'unrepresentedDefendantsPct', label: 'Magistrates\' court defendants unrepresented (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.unrepresentedDefendantsPct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2013, 5, 1), label: 'Legal Aid, Sentencing and Punishment of Offenders Act' },
    { date: new Date(2022, 5, 1), label: 'Criminal bar strike' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Is the Criminal Legal Aid System Collapsing?"
          finding={<>Criminal legal aid spending has been cut by around 40% in real terms since 2010, the number of duty solicitor and barristers' chambers willing to take legal aid work has declined sharply, and the proportion of magistrates' court defendants appearing unrepresented has risen to around 30%.<Cite nums={[1, 2]} /> A 2022 criminal bar strike forced a 15% fee uplift, but the Law Society says fees remain unsustainably low.<Cite nums={3} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The right to legal representation — funded by the state for those who cannot afford it — is a cornerstone of the rule of law. England and Wales once had a world-renowned legal aid system. Since 2010, it has been systematically defunded. Legal Aid Agency statistics show criminal legal aid spend fell from around £1.2 billion in 2010/11 to around £730 million in 2022/23 in real terms — a 40% real-terms cut. The number of duty solicitor firms willing to take police station legal aid work has fallen by over 40%, meaning in some areas there are too few solicitors to cover custody suites around the clock.<Cite nums={[1, 2]} /></p>
            <p>At the Crown Court, the Criminal Bar Association documented average brief fees that had declined in real terms by over 28% since 2006. Junior barristers were earning below minimum wage on hourly calculations for many legal aid cases. In 2022, the criminal bar went on strike for four months — the longest strike in its history — eventually securing a 15% fee uplift. But the Law Society's modelling shows that even with the uplift, many criminal defence practitioners cannot maintain viable practices on legal aid alone, and the number of criminal barristers under 35 fell by 25% between 2019 and 2023.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-spend', label: 'Legal aid spend' },
          { id: 'sec-access', label: 'Representation & fees' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Criminal legal aid (real terms, 2022/23)" value="£730m" unit="" direction="down" polarity="up-is-good" changeText={<>Down 40% since 2010<Cite nums={1} /></>} sparklineData={[1200, 1150, 1080, 1020, 960, 900, 850, 810, 780, 750, 730]} href="#sec-spend" />
          <MetricCard label="Unrepresented in magistrates' courts" value="~30%" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from under 10% in 2010<Cite nums={2} /></>} sparklineData={[8, 10, 12, 15, 17, 20, 22, 24, 27, 29, 30]} href="#sec-access" />
          <MetricCard label="Criminal barristers under 35 (2023)" value="-25%" unit="since 2019" direction="down" polarity="up-is-good" changeText={<>Profession not replacing itself<Cite nums={3} /></>} sparklineData={[100, 100, 100, 100, 98, 95, 90, 85, 80, 77, 75]} href="#sec-access" />
        </div>

        <ScrollReveal>
          <section id="sec-spend" className="mb-12">
            <LineChart title="Criminal legal aid spending and defence providers, England & Wales, 2010–2023" subtitle="Real-terms criminal legal aid spend (£bn); Crown Court defence providers." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-access" className="mb-12">
            <LineChart title="Average Crown Court brief fees and unrepresented defendants, 2010–2023" subtitle="Average brief fee for Crown Court defence (£); % of magistrates' court defendants unrepresented." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Independent Review of Criminal Legal Aid" value="2021" unit="report" description={<>The Bellamy Review (2021) found the criminal legal aid system was at the point of crisis and recommended 15% fee uplifts as a minimum immediate measure. The government accepted the recommendation after the 2022 bar strike.<Cite nums={3} /></>} source="Source: Bellamy Review / Criminal Bar Association." />
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
