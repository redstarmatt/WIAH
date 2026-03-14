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
  { num: 1, name: 'Crown Prosecution Service', dataset: 'CPS fraud prosecutions data', url: 'https://www.cps.gov.uk/fraud-and-economic-crime-data', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Crime Survey — fraud module', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables', date: '2024' },
  { num: 3, name: 'UK Finance', dataset: 'Annual fraud losses report', url: 'https://www.ukfinance.org.uk/fraud/annual-fraud-report', date: '2024' },
];

interface DataPoint {
  year: number;
  fraudLossBn: number;
  fraudProsecutionsThousands: number;
  fraudChargeRatePct: number;
  bankingFraudRefundedPct: number;
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

export default function FraudProsecutionRatesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/fraud-prosecution-rates/fraud_prosecution_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'fraudLossBn', label: 'Total fraud losses (£bn)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fraudLossBn })) },
        { id: 'fraudProsecutionsThousands', label: 'Fraud prosecutions (000s)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fraudProsecutionsThousands })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'fraudChargeRatePct', label: 'Fraud reports leading to charge (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fraudChargeRatePct })) },
        { id: 'bankingFraudRefundedPct', label: 'Authorised push payment fraud refunded (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.bankingFraudRefundedPct })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — online fraud surges' },
    { date: new Date(2023, 5, 1), label: 'Mandatory APP refund scheme' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Often Does Fraud Lead to Prosecution?"
          finding={<>Fraud now accounts for over 40% of all crime in England and Wales, costing victims over £7 billion per year — yet only around 1 in 1,000 fraud incidents leads to a prosecution.<Cite nums={[1, 2]} /> UK Finance data shows less than half of authorised push payment fraud losses are refunded, leaving millions of victims bearing the cost of crime that is rarely investigated.<Cite nums={3} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Fraud is Britain's most common crime and one of its least prosecuted. The Crime Survey for England and Wales estimates around 3.5 million fraud offences per year, making it larger than all theft, violence and burglary combined. Yet CPS data shows only around 7,000 fraud prosecutions are completed annually — a prosecution rate of around 0.2%. This near-total impunity reflects the international nature of most fraud, the difficulty of attribution, and a policing system that has historically treated fraud as a lower priority than acquisitive crime.<Cite nums={[1, 2]} /></p>
            <p>UK Finance's annual fraud report estimated total fraud losses of over £7 billion in 2022, with authorised push payment (APP) fraud — where victims are tricked into authorising payments — the fastest growing category. From October 2024, mandatory reimbursement rules require banks to refund APP fraud victims in most cases, up to £85,000 — a significant improvement from a voluntary scheme under which only around 45% of losses were refunded. The National Fraud Intelligence Bureau, run by the City of London Police, processes Action Fraud reports and decides which cases to refer for investigation, but its capacity is far below what is needed.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-scale', label: 'Fraud scale' },
          { id: 'sec-prosecution', label: 'Prosecution & refunds' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Total fraud losses (2022)" value="£7.1bn" unit="" direction="up" polarity="up-is-bad" changeText={<>Over 3.5m incidents per year<Cite nums={2} /></>} sparklineData={[3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.2, 7.1, 7.1]} href="#sec-scale" />
          <MetricCard label="Fraud prosecution rate" value="0.2%" unit="" direction="flat" polarity="up-is-good" changeText={<>Near-total impunity for fraudsters<Cite nums={1} /></>} sparklineData={[0.5, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2]} href="#sec-prosecution" />
          <MetricCard label="APP fraud refunded (pre-2024)" value="45%" unit="" direction="up" polarity="up-is-good" changeText={<>Mandatory scheme from Oct 2024<Cite nums={3} /></>} sparklineData={[20, 22, 25, 28, 30, 35, 38, 40, 42, 43, 45]} href="#sec-prosecution" />
        </div>

        <ScrollReveal>
          <section id="sec-scale" className="mb-12">
            <LineChart title="Fraud losses and prosecutions in England and Wales, 2010–2023" subtitle="Total fraud losses (£bn); fraud prosecutions completed (000s)." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prosecution" className="mb-12">
            <LineChart title="Fraud charge rate and APP fraud refund rate, 2010–2023" subtitle="% of fraud reports leading to charge; % of APP fraud losses refunded." series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Mandatory APP reimbursement" value="£85,000" unit="max refund" description={<>From October 2024, the Payment Systems Regulator requires banks to reimburse APP fraud victims up to £85,000 in most cases within 5 days — a major improvement from the voluntary scheme that left over half of victims without compensation.<Cite nums={3} /></>} source="Source: UK Finance / Payment Systems Regulator." />
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
