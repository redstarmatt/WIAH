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
  { num: 1, name: 'Cabinet Office', dataset: 'Counter Fraud Function Annual Report', url: 'https://www.gov.uk/government/organisations/government-counter-fraud-function', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'Tackling fraud and corruption against government', url: 'https://www.nao.org.uk/reports/tackling-fraud-and-corruption-against-government/', date: '2024' },
  { num: 3, name: 'HMRC', dataset: 'Measuring tax gap — error and fraud', url: 'https://www.gov.uk/government/statistics/measuring-tax-gaps', date: '2024' },
];

interface DataPoint {
  year: number;
  detectedFraudBn: number;
  estimatedTotalFraudBn: number;
  benefitFraudBn: number;
  covidSupportFraudBn: number;
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

export default function PublicSectorFraudPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/public-sector-fraud/public_sector_fraud.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'estimatedTotalFraudBn', label: 'Estimated total fraud (£bn)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.estimatedTotalFraudBn })) },
        { id: 'detectedFraudBn', label: 'Detected fraud (£bn)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.detectedFraudBn })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'benefitFraudBn', label: 'Benefit fraud (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.benefitFraudBn })) },
        { id: 'covidSupportFraudBn', label: 'Covid support fraud (£bn)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.covidSupportFraudBn })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid emergency spending — fraud surged' },
    { date: new Date(2022, 5, 1), label: 'Public Sector Fraud Authority created' },
  ];

  return (
    <>
      <TopicNav topic="Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services"
          question="How Much Fraud Is There in Public Spending?"
          finding={<>The government estimates it lost at least £21 billion to fraud and error in 2022–23 — a figure that rose dramatically during the pandemic, when over £7 billion in Covid support payments are estimated to have been fraudulent or paid in error.<Cite nums={1} /> Detection rates remain a fraction of estimated losses.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Fraud against the public sector encompasses a wide range of activities: fraudulent benefit claims, tax evasion, procurement fraud, grant fraud, and — most dramatically — abuse of emergency support schemes. The government created the Public Sector Fraud Authority in 2022 to coordinate the counter-fraud response, with a remit to detect and recover more of the estimated losses. The scale of the problem is genuinely uncertain: the figures published represent a blend of detected fraud, error, and modelled estimates of undetected activity.<Cite nums={1} /></p>
            <p>The pandemic created conditions in which fraud flourished: the Bounce Back Loan Scheme, CJRS furlough scheme, and Eat Out to Help Out were all exploited. HMRC has estimated that £4.5 billion of furlough payments alone were fraudulent or paid in error — a significant sum, though small as a proportion of the total scheme spend. Recovery efforts continue, but a substantial portion of the losses are considered unrecoverable.<Cite nums={[2, 3]} /> Benefit fraud — particularly around Universal Credit — is the largest ongoing component at around £6–7 billion annually.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Fraud scale' },
          { id: 'sec-chart2', label: 'Components' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Estimated total fraud" value="£21bn" unit="" direction="down" polarity="up-is-bad" changeText={<>Was £29bn at 2021 pandemic peak<Cite nums={1} /></>} sparklineData={[12, 13, 14, 15, 29, 27, 25, 23, 22, 21, 21]} href="#sec-chart1" />
          <MetricCard label="Detected fraud" value="£1.1bn" unit="" direction="up" polarity="up-is-good" changeText={<>Growing but tiny vs estimated losses<Cite nums={2} /></>} sparklineData={[0.5, 0.6, 0.7, 0.8, 0.9, 0.9, 1.0, 1.0, 1.1, 1.1, 1.1]} href="#sec-chart1" />
          <MetricCard label="Benefit fraud" value="£6.4bn" unit="" direction="flat" polarity="up-is-bad" changeText={<>Largest single fraud category<Cite nums={3} /></>} sparklineData={[3, 3.5, 4, 5.5, 8, 7, 7, 6.8, 6.5, 6.4, 6.4]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Estimated vs detected public sector fraud, 2015–2024" subtitle="Government estimate of total fraud and error loss (£bn) and detected fraud (£bn)" series={chart1Series} annotations={annotations} yLabel="£bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Benefit fraud and Covid support fraud, 2015–2024" subtitle="Annual benefit fraud estimate (£bn) and Covid support fraud losses (£bn)" series={chart2Series} annotations={[]} yLabel="£bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="PSFA recovery" value="£311m" unit="recovered" description={<>The Public Sector Fraud Authority recovered £311 million in fraudulent payments in its first full year of operation — a record for central government fraud recovery.<Cite nums={2} /></>} source="Source: Cabinet Office, PSFA Annual Report 2023." />
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
