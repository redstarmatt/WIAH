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
  { num: 1, name: 'Information Commissioner\'s Office', dataset: 'FOI statistics for central government', url: 'https://www.gov.uk/government/collections/government-foi-statistics', date: '2024' },
  { num: 2, name: 'Cabinet Office', dataset: 'Freedom of Information statistics', url: 'https://www.gov.uk/government/collections/government-foi-statistics', date: '2024' },
  { num: 3, name: 'Campaign for Freedom of Information', dataset: 'FOI compliance research', url: 'https://www.cfoi.org.uk/', date: '2024' },
];

interface DataPoint {
  year: number;
  requestsReceived: number;
  respondedOnTime: number;
  refusalRate: number;
  appealsUphelRate: number;
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

export default function FreedomOfInformationCompliancePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/freedom-of-information-compliance/freedom_of_information_compliance.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'requestsReceived', label: 'Requests received (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.requestsReceived })) },
        { id: 'respondedOnTime', label: 'Responded on time (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.respondedOnTime })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'refusalRate', label: 'Refusal rate (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.refusalRate })) },
        { id: 'appealsUphelRate', label: 'Appeals upheld by ICO (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.appealsUphelRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — compliance fell' },
    { date: new Date(2023, 5, 1), label: 'ICO enforcement notices issued' },
  ];

  return (
    <>
      <TopicNav topic="Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services"
          question="Are Public Bodies Complying With FOI?"
          finding={<>Central government departments received over 60,000 FOI requests in 2023, but responded on time to only 83% — below the statutory 20-day requirement.<Cite nums={1} /> Refusal rates have risen over the decade, and the ICO upholds a significant proportion of internal review decisions that it investigates.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Freedom of Information Act 2000 gives people in the UK the right to request information held by public authorities. The law requires public bodies to respond within 20 working days and to provide information unless a specific exemption applies. Two decades on, the system processes hundreds of thousands of requests annually, spanning government departments, local councils, the NHS, police forces, and universities. Demand has risen consistently, placing increasing pressure on FOI teams.<Cite nums={1} /></p>
            <p>Compliance quality is uneven. The most commonly used exemptions — relating to policy formulation, legal privilege, and commercial interests — are broadly accepted, but the Campaign for Freedom of Information and others have documented cases of unjustified refusals and excessive delays. The Information Commissioner&apos;s Office can investigate complaints and issue enforcement notices, but its own caseload has grown faster than its capacity to process it. Some departments use the cost limit — which allows refusal if compliance would cost more than £600 — in ways that critics argue are overly broad.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Volume and timeliness' },
          { id: 'sec-chart2', label: 'Refusals and appeals' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="FOI requests (central govt)" value="63k" unit="" direction="up" polarity="up-is-good" changeText={<>Up from 44k in 2012<Cite nums={1} /></>} sparklineData={[44, 46, 48, 50, 52, 54, 55, 58, 60, 62, 63]} href="#sec-chart1" />
          <MetricCard label="Responded on time" value="83" unit="%" direction="down" polarity="up-is-good" changeText={<>Was 90% before 2019<Cite nums={2} /></>} sparklineData={[90, 90, 89, 88, 87, 84, 82, 82, 83, 83, 83]} href="#sec-chart1" />
          <MetricCard label="Refusal rate" value="37" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up from 32% in 2015<Cite nums={3} /></>} sparklineData={[32, 33, 34, 34, 35, 35, 36, 36, 37, 37, 37]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="FOI requests received and on-time response rate, 2012–2023" subtitle="Requests to central government departments and on-time response (%)" series={chart1Series} annotations={annotations} yLabel="Thousands / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Refusal rate and ICO appeal outcomes, 2012–2023" subtitle="Percentage of requests refused and ICO appeals upheld (%)" series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Publication schemes" value="100%" unit="coverage" description={<>All public bodies subject to FOI are legally required to maintain a publication scheme proactively publishing key information — avoiding the need for individual requests for the most commonly sought data.<Cite nums={1} /></>} source="Source: Information Commissioner's Office, guidance." />
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
