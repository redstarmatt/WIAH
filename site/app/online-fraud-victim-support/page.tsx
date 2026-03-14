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
  { num: 1, name: 'UK Finance', dataset: 'Fraud: The Facts — authorised push payment fraud', url: 'https://www.ukfinance.org.uk/policy-and-guidance/reports-publications/fraud-facts-2024', date: '2024' },
  { num: 2, name: 'Action Fraud', dataset: 'Annual fraud and cybercrime report', url: 'https://www.actionfraud.police.uk/annual-fraud-cybercrime-report', date: '2024' },
  { num: 3, name: 'Victim Support', dataset: 'Fraud victim experience research', url: 'https://www.victimsupport.org.uk/resources/reports/', date: '2024' },
];

interface DataPoint {
  year: number;
  onlineFraudLosses: number;
  reimbursementRate: number;
  victimSupportReferrals: number;
  appFraudCases: number;
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

export default function OnlineFraudVictimSupportPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/online-fraud-victim-support/online_fraud_victim_support.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'onlineFraudLosses', label: 'Online fraud losses (£m)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.onlineFraudLosses })) },
        { id: 'appFraudCases', label: 'APP fraud cases (thousands)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.appFraudCases })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'reimbursementRate', label: 'Reimbursement rate (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.reimbursementRate })) },
        { id: 'victimSupportReferrals', label: 'Fraud victim support referrals (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.victimSupportReferrals })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: 'Voluntary reimbursement code introduced' },
    { date: new Date(2024, 5, 1), label: 'Mandatory APP reimbursement up to £85k' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Justice"
          question="What Support Do Online Fraud Victims Get?"
          finding={<>UK consumers lost over £1.2 billion to authorised push payment (APP) fraud in 2023, yet only around 62% of losses were reimbursed by banks.<Cite nums={1} /> Victim support for fraud remains underfunded and fragmented — most victims receive no specialist psychological support despite significant psychological harm.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Online fraud is now the most common crime in England and Wales by volume, with authorised push payment fraud — where victims are deceived into authorising bank transfers to fraudsters — the dominant and most damaging type. Victims lose not just money but often their sense of security and self-trust: research consistently shows that fraud victims experience shame, anxiety, and depression at rates comparable to victims of violent crime. Yet the support infrastructure — police, victim services, mental health provision — is poorly adapted to fraud's particular characteristics.<Cite nums={1} /></p>
            <p>Bank reimbursement has been the primary mechanism for financial recovery. A voluntary reimbursement code was introduced in 2019, but only around half of banks signed up and compliance was inconsistent. The PSR introduced mandatory APP reimbursement rules from October 2024, requiring banks to reimburse victims of APP fraud up to £85,000 unless the victim was grossly negligent. This is a significant improvement, but excludes the highest-value frauds and does nothing to address the psychological harm or investigate the criminal networks behind the fraud.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Losses and cases' },
          { id: 'sec-chart2', label: 'Support and recovery' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="APP fraud losses" value="£1.2bn" unit="" direction="down" polarity="up-is-bad" changeText={<>Down from £1.5bn in 2021 peak<Cite nums={1} /></>} sparklineData={[450, 600, 750, 900, 1200, 1500, 1400, 1300, 1250, 1220, 1200]} href="#sec-chart1" />
          <MetricCard label="Reimbursement rate" value="62" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 46% in 2019<Cite nums={1} /></>} sparklineData={[30, 35, 40, 46, 52, 55, 58, 60, 61, 62, 62]} href="#sec-chart2" />
          <MetricCard label="Fraud victims with support" value="12" unit="%" direction="up" polarity="up-is-good" changeText={<>Still very low; most receive nothing<Cite nums={3} /></>} sparklineData={[5, 6, 7, 8, 9, 10, 10.5, 11, 11.5, 12, 12]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="APP fraud losses and case volumes, 2015–2024" subtitle="Authorised push payment fraud losses (£m) and fraud cases (thousands), UK" series={chart1Series} annotations={annotations} yLabel="£m / thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Reimbursement rates and victim support referrals, 2015–2024" subtitle="Percentage of APP losses reimbursed and victim support referrals for fraud (thousands)" series={chart2Series} annotations={[]} yLabel="% / thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="159 scam-reporting line" value="50k" unit="calls/year" description={<>The 159 service — a dedicated phone line allowing bank customers to confirm whether they are being scammed before transferring money — now handles around 50,000 calls per year and is estimated to have prevented millions of pounds in fraud losses.<Cite nums={2} /></>} source="Source: Stop Scams UK, 159 service statistics." />
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
