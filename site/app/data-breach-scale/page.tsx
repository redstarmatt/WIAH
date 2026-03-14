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
  { num: 1, name: 'Information Commissioner\'s Office', dataset: 'Data security incident trends', url: 'https://ico.org.uk/action-weve-taken/data-security-incident-trends/', date: '2024' },
  { num: 2, name: 'NCSC', dataset: 'Annual Cyber Review', url: 'https://www.ncsc.gov.uk/section/about-ncsc/annual-review', date: '2024' },
  { num: 3, name: 'IBM Security', dataset: 'Cost of a Data Breach Report — UK', url: 'https://www.ibm.com/uk-en/security/data-breach', date: '2024' },
];

interface DataPoint {
  year: number;
  breachesReportedToIco: number;
  cyberIncidents: number;
  avgBreachCostGbp: number;
  recordsExposed: number;
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

export default function DataBreachScalePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/data-breach-scale/data_breach_scale.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'breachesReportedToIco', label: 'Breaches reported to ICO', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.breachesReportedToIco })) },
        { id: 'cyberIncidents', label: 'Cyber-related breaches', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cyberIncidents })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'avgBreachCostGbp', label: 'Avg breach cost (£m)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgBreachCostGbp })) },
        { id: 'recordsExposed', label: 'Records exposed (millions)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.recordsExposed })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'GDPR — mandatory breach reporting begins' },
    { date: new Date(2023, 5, 1), label: 'MOVEit attack hits UK NHS and others' },
  ];

  return (
    <>
      <TopicNav topic="Digital" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital"
          question="How Many UK Data Breaches Happen Each Year?"
          finding={<>The ICO received over 3,000 personal data breach reports in Q4 2023 alone — the highest quarterly total since GDPR mandatory reporting began in 2018.<Cite nums={1} /> The average cost of a UK data breach reached £3.4 million in 2023, and cyber attacks now account for the majority of significant incidents.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>GDPR, which came into force in the UK in May 2018, introduced a mandatory requirement to report personal data breaches to the ICO within 72 hours. This created a much clearer picture of the scale of data security failures than had previously existed. Reported breaches rose sharply in the first years of the regime — partly reflecting new incidents, partly reflecting better awareness and compliance with the reporting obligation — and have continued to rise, with the health sector, finance, and public administration consistently among the most affected.<Cite nums={1} /></p>
            <p>The nature of incidents has also shifted: while human error (sending data to the wrong recipient, losing unencrypted devices) remains common, cyber attacks — ransomware, phishing, and supply chain compromises — now account for around 30% of reported breaches and a disproportionate share of the harm. The 2023 MOVEit vulnerability affected multiple major UK organisations including NHS trusts and payroll providers.<Cite nums={[2, 3]} /> UK GDPR post-Brexit maintains equivalent protections to EU GDPR, with the ICO as the supervisory authority, though fines imposed to date have been well below the maximum permitted.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Breach volumes' },
          { id: 'sec-chart2', label: 'Costs and scale' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Breaches reported to ICO (2023)" value="11,500" unit="" direction="up" polarity="up-is-bad" changeText={<>Rising since mandatory reporting in 2018<Cite nums={1} /></>} sparklineData={[3000, 5500, 7000, 8000, 9000, 10000, 10500, 11000, 11200, 11400, 11500]} href="#sec-chart1" />
          <MetricCard label="Cyber-related breaches" value="3,400" unit="" direction="up" polarity="up-is-bad" changeText={<>30% of total; rising share<Cite nums={2} /></>} sparklineData={[500, 900, 1300, 1800, 2200, 2600, 2900, 3100, 3200, 3300, 3400]} href="#sec-chart1" />
          <MetricCard label="Avg breach cost" value="£3.4m" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from £2.5m in 2019<Cite nums={3} /></>} sparklineData={[2.5, 2.6, 2.7, 2.9, 3.0, 3.1, 3.2, 3.3, 3.35, 3.38, 3.4]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Data breaches reported to ICO, 2018–2024" subtitle="Total personal data breach reports and cyber-related incidents, UK" series={chart1Series} annotations={annotations} yLabel="Breaches" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Average breach cost and records exposed, 2018–2024" subtitle="Average data breach cost (£m) and records exposed per year (millions), UK" series={chart2Series} annotations={[]} yLabel="£m / millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="ICO enforcement" value="£7.5m" unit="fines (2023)" description={<>The ICO issued £7.5 million in data protection fines in 2023 — substantially below the GDPR maximum of 4% of global turnover, reflecting the ICO&apos;s preference for regulatory guidance over punitive enforcement in most cases.<Cite nums={1} /></>} source="Source: ICO, Regulatory action statistics 2023." />
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
