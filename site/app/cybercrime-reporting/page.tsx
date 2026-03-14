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
  { num: 1, name: 'ONS', dataset: 'Crime Survey for England and Wales — computer misuse', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables', date: '2024' },
  { num: 2, name: 'National Cyber Security Centre', dataset: 'Annual Review', url: 'https://www.ncsc.gov.uk/annual-review', date: '2024' },
  { num: 3, name: 'Action Fraud', dataset: 'Fraud and cybercrime statistics', url: 'https://www.actionfraud.police.uk/data-and-resources', date: '2024' },
];

interface DataPoint {
  year: number;
  csewCybervictimsMillions: number;
  actionFraudReportsThousands: number;
  prosecutionRatePct: number;
  unreportedEstimatedPct: number;
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

export default function CybercrimeReportingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/cybercrime-reporting/cybercrime_reporting.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'csewCybervictimsMillions', label: 'CSEW computer misuse victims (millions)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.csewCybervictimsMillions })) },
        { id: 'actionFraudReportsThousands', label: 'Action Fraud reports (000s)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.actionFraudReportsThousands })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'prosecutionRatePct', label: 'Cybercrime referrals leading to prosecution (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.prosecutionRatePct })) },
        { id: 'unreportedEstimatedPct', label: 'Estimated % of cyber victimisation unreported', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.unreportedEstimatedPct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — online crime surges' },
    { date: new Date(2022, 5, 1), label: 'NCSC: highest state cyber threat' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Much Cybercrime Goes Unreported?"
          finding={<>The Crime Survey for England and Wales estimates around 3.8 million computer misuse offences per year — but only around 900,000 are reported to Action Fraud, and fewer than 2% lead to a suspect being charged.<Cite nums={[1, 3]} /> Most cybercrime victims have little confidence that reporting will lead to any action, creating a vast dark figure of unrecorded harm.<Cite nums={2} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Computer misuse and fraud — together sometimes called "online crime" — now account for over half of all crime experienced by adults in England and Wales, yet they remain among the least likely to be reported and the least likely to result in prosecution. The Crime Survey for England and Wales estimates 3.8 million computer misuse incidents (hacking, malware, unauthorised access) annually, alongside some 3.5 million fraud offences. The survey-based estimates are far larger than recorded crime figures because most victims don't report — either because they don't know how, don't expect any outcome, or don't realise they've been a victim.<Cite nums={1} /></p>
            <p>Action Fraud, the national reporting centre for fraud and cybercrime, received around 900,000 reports in 2022/23. The NCSC's 2024 Annual Review highlighted the rising threat from state-sponsored actors — particularly Russia, China and North Korea — alongside criminal ransomware gangs that have disrupted NHS trusts, local councils and major businesses. But the prosecution rate for cybercrime referrals to the CPS remains below 2%, reflecting the difficulty of attribution, the international nature of most offenders, and limited specialist police capacity.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-scale', label: 'Scale of cybercrime' },
          { id: 'sec-response', label: 'Prosecution & response' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Computer misuse victims/yr (CSEW)" value="3.8m" unit="" direction="up" polarity="up-is-bad" changeText={<>Most incidents unreported<Cite nums={1} /></>} sparklineData={[2.0, 2.2, 2.5, 2.8, 3.0, 3.2, 3.5, 3.6, 3.7, 3.75, 3.8]} href="#sec-scale" />
          <MetricCard label="Action Fraud reports (2022/23)" value="900,000" unit="" direction="up" polarity="up-is-bad" changeText={<>Under 25% of estimated incidents<Cite nums={3} /></>} sparklineData={[500, 550, 600, 650, 700, 750, 800, 850, 880, 890, 900]} href="#sec-scale" />
          <MetricCard label="Cybercrime prosecution rate" value="<2%" unit="" direction="flat" polarity="up-is-good" changeText={<>Effectively no chance of justice<Cite nums={3} /></>} sparklineData={[3, 2.8, 2.6, 2.5, 2.3, 2.2, 2.1, 2.0, 1.9, 1.9, 1.8]} href="#sec-response" />
        </div>

        <ScrollReveal>
          <section id="sec-scale" className="mb-12">
            <LineChart title="Cybercrime victims (CSEW) and Action Fraud reports, England & Wales, 2016–2023" subtitle="CSEW computer misuse estimates (millions); Action Fraud reports received (000s)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-response" className="mb-12">
            <LineChart title="Cybercrime prosecution rate and estimated unreported %, 2016–2023" subtitle="% of cybercrime referrals leading to prosecution; estimated % of incidents unreported." series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Cyber Aware helpline" value="£1.4bn" unit="fraud prevented" description={<>The NCSC's Suspicious Email Reporting Service has received over 16 million reports since 2020 and contributed to the removal of over 235,000 malicious sites — preventing an estimated £1.4 billion in fraud losses.<Cite nums={2} /></>} source="Source: NCSC Annual Review 2024." />
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
