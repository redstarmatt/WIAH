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
  { num: 1, name: 'HMRC', dataset: 'National Minimum Wage enforcement — domestic workers', url: 'https://www.gov.uk/government/collections/national-minimum-wage-enforcement', date: '2024' },
  { num: 2, name: 'Kalayaan', dataset: 'Domestic workers in the UK', url: 'https://www.kalayaan.org.uk/', date: '2024' },
  { num: 3, name: 'Migration Advisory Committee', dataset: 'Domestic workers visa review', url: 'https://www.gov.uk/government/organisations/migration-advisory-committee', date: '2024' },
];

interface DataPoint {
  year: number;
  domesticWorkerVisas: number;
  minimumWageViolations: number;
  modernSlaveryCases: number;
  employmentTribunalClaims: number;
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

export default function DomesticWorkersRightsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/domestic-workers-rights/domestic_workers_rights.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'domesticWorkerVisas', label: 'Domestic worker visas granted', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.domesticWorkerVisas })) },
        { id: 'minimumWageViolations', label: 'NMW violations (domestic workers)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.minimumWageViolations })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'modernSlaveryCases', label: 'Modern slavery referrals (domestic work)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.modernSlaveryCases })) },
        { id: 'employmentTribunalClaims', label: 'Employment tribunal claims', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.employmentTribunalClaims })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2012, 5, 1), label: 'Tied visa regime introduced' },
    { date: new Date(2016, 5, 1), label: 'Partial visa reform' },
  ];

  return (
    <>
      <TopicNav topic="Society & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Economy"
          question="Are Domestic Workers Getting Legal Protection?"
          finding={<>Domestic workers — nannies, cleaners, carers, and housekeepers — remain among the most legally vulnerable in the UK workforce, with high rates of wage theft, limited tribunal rights, and an overseas domestic worker visa that critics argue ties workers to exploitative employers.<Cite nums={1} /> Modern slavery referrals from this sector have risen year-on-year.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>An estimated 1.5–2 million people work in domestic settings in the UK — in private homes as cleaners, au pairs, nannies, personal carers, and housekeepers. Many are employed informally, without written contracts, employment rights awareness, or recourse when things go wrong. HMRC&apos;s minimum wage enforcement consistently identifies domestic workers as among the most common victims of wage theft, partly because the private household setting makes enforcement harder.<Cite nums={1} /></p>
            <p>Overseas domestic workers who come to the UK on the tied domestic worker visa are in a particularly precarious position. The 2012 visa reform removed the right to change employers, making workers dependent on remaining with the employer who brought them into the country. Kalayaan, a charity supporting migrant domestic workers, has documented cases of confiscated passports, withheld wages, and physical abuse. The Modern Slavery Act 2015 was supposed to improve protections, but referrals from domestic settings to the National Referral Mechanism have continued to rise.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Visa and enforcement' },
          { id: 'sec-chart2', label: 'Exploitation and claims' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Overseas domestic worker visas" value="19k" unit="" direction="up" polarity="flat" changeText={<>Rising as demand for care grows<Cite nums={3} /></>} sparklineData={[12000, 13000, 14000, 14000, 15000, 16000, 17000, 18000, 18500, 19000, 19000]} href="#sec-chart1" />
          <MetricCard label="NMW violations detected" value="820" unit="" direction="up" polarity="up-is-bad" changeText={<>Under-enforcement in domestic settings<Cite nums={1} /></>} sparklineData={[200, 280, 350, 420, 500, 580, 650, 720, 780, 810, 820]} href="#sec-chart1" />
          <MetricCard label="Modern slavery referrals" value="1,100" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 480 in 2017<Cite nums={2} /></>} sparklineData={[480, 560, 650, 750, 850, 920, 980, 1020, 1060, 1080, 1100]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Domestic worker visas and minimum wage violations, 2012–2024" subtitle="Overseas domestic worker visas granted and NMW violations in domestic settings" series={chart1Series} annotations={annotations} yLabel="Count" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Modern slavery referrals and tribunal claims, 2012–2024" subtitle="National Referral Mechanism referrals from domestic work and employment tribunal claims" series={chart2Series} annotations={[]} yLabel="Count" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Right to change employers" value="2016" unit="partial reform" description={<>A 2016 reform granted overseas domestic workers the right to change employers within their visa period — a partial improvement on the fully tied 2012 regime, though workers must still leave the country to renew their visa if they change employer.<Cite nums={3} /></>} source="Source: Home Office, domestic worker visa review." />
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
