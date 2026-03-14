'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Overall compliance (%), 2015–2025
const overallCompliance = [73, 71, 68, 65, 62, 55, 50, 45, 42, 39, 37];
// Cabinet Office compliance (%), 2015–2025
const cabinetOfficeCompliance = [55, 52, 48, 44, 40, 35, 30, 27, 23, 20, 18];
// Refusal rate (%), 2015–2025
const refusalRate = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
// Requests received (thousands), 2015–2025
const requestsReceived = [52, 54, 57, 60, 63, 58, 65, 68, 72, 74, 76];

const chart1Series: Series[] = [
  {
    id: 'overallCompliance',
    label: 'Overall compliance (%)',
    colour: '#264653',
    data: overallCompliance.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'cabinetOfficeCompliance',
    label: 'Cabinet Office compliance (%)',
    colour: '#E63946',
    data: cabinetOfficeCompliance.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const chart2Series: Series[] = [
  {
    id: 'refusalRate',
    label: 'Refusal rate (%)',
    colour: '#E63946',
    data: refusalRate.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'requestsReceived',
    label: 'Requests received (thousands)',
    colour: '#6B7280',
    data: requestsReceived.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const chart1Annotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic reduces capacity' },
  { date: new Date(2021, 5, 1), label: '2021: ICO issues recommendations to Cabinet Office' },
];

const chart2Annotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Record FOI requests received' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Cabinet Office', dataset: 'Freedom of Information statistics', url: 'https://www.gov.uk/government/collections/government-foi-statistics', date: '2025' },
  { num: 2, name: 'ICO', dataset: 'Annual report and accounts', url: 'https://ico.org.uk', date: '2025' },
];

export default function TopicPage() {
  return (
    <>
      <TopicNav topic="FOI Response Times" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Is Government Transparency Actually Working?"
          finding="Central government responded to only 37% of FOI requests within the statutory 20-working-day deadline in 2024, down from 73% in 2015. The Cabinet Office had the worst compliance at 18%."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Freedom of Information Act 2000 gives the public the right to request information from public authorities, which are required to respond within 20 working days. In 2015, central government complied with this deadline 73% of the time. By 2024 that figure had fallen to 37%<Cite nums={1} /> — meaning nearly two-thirds of requests now miss the legal deadline. The Cabinet Office, which handles politically sensitive requests about the operation of government itself, had compliance of just 18% in 2024<Cite nums={1} />. The Information Commissioner's Office has issued repeated practice recommendations and enforcement notices, but compliance has continued to fall.</p>
            <p>Alongside rising non-compliance, the rate at which requests are refused has climbed from 28% to 38% over the same period<Cite nums={1} />. Public interest exemptions — intended for genuinely sensitive material — have been increasingly applied to routine operational information. The volume of requests has also grown, rising from around 52,000 in 2015 to 76,000 in 2024<Cite nums={1} />, driven partly by investigative journalists and civil society organisations using FOI as a tool for accountability. The combination of more requests and less capacity to respond has created a widening gap between the law as written and the law as practised.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Compliance' },
          { id: 'sec-chart2', label: 'Refusals' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="FOI responses within 20-day deadline"
              value="37%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 73% in 2015 · biggest government failure is resourcing"
              sparklineData={overallCompliance.slice(-8)}
              source="Cabinet Office · FOI statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cabinet Office compliance"
              value="18%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Worst of any central department · 82% miss deadline"
              sparklineData={cabinetOfficeCompliance.slice(-8)}
              source="Cabinet Office · FOI statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Requests refused"
              value="38%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 28% in 2015 · public interest exemption overused"
              sparklineData={refusalRate.slice(-8)}
              source="Cabinet Office · FOI statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="FOI request compliance rates, central government, 2015–2025"
              subtitle="Percentage of FOI requests responded to within the statutory 20-working-day deadline. Overall compliance and Cabinet Office compliance shown separately."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Compliance (%)"
              source={{ name: 'Cabinet Office', dataset: 'Freedom of Information statistics', url: 'https://www.gov.uk/government/collections/government-foi-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="FOI refusal rates and request volumes, 2015–2025"
              subtitle="Percentage of requests fully or partially refused alongside total requests received. Refusal rates have risen despite ICO guidance."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Rate (%) / Volume (000s)"
              source={{ name: 'Cabinet Office', dataset: 'Freedom of Information statistics', url: 'https://www.gov.uk/government/collections/government-foi-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="ICO enforcement powers being used more actively"
            value="£1.75m"
            unit="ICO fines and enforcement 2024"
            description="The Information Commissioner's Office issued £1.75 million in fines and 34 enforcement notices to public authorities in 2024, the highest ever total. The ICO's new transparency audit programme reviews major departments against compliance benchmarks. Scotland's FOI system, with a 5% failure rate, demonstrates what best practice looks like when it is properly resourced."
            source="Source: ICO — Annual report and accounts, 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/government-foi-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cabinet Office — Freedom of Information statistics</a> — Quarterly and annual compliance data for central government. Retrieved 2025.</p>
            <p><a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Information Commissioner's Office — Annual report</a> — Enforcement actions, fines, and practice recommendations. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
