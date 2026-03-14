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
  { num: 1, name: 'DLUHC', dataset: 'Local authority financial resilience indicators', url: 'https://www.gov.uk/government/collections/local-authority-financial-data', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'Financial distress in local authorities', url: 'https://www.nao.org.uk/reports/financial-distress-in-local-authorities/', date: '2024' },
  { num: 3, name: 'Local Government Association', dataset: 'Funding and financial outlook', url: 'https://www.local.gov.uk/topics/finance/funding-and-finance', date: '2024' },
];

interface DataPoint {
  year: number;
  section114Notices: number;
  reservesDrawdown: number;
  fundingGapBn: number;
  councilsAtRisk: number;
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

export default function LocalAuthorityInsolvencyPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/local-authority-insolvency/local_authority_insolvency.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'section114Notices', label: 'Section 114 notices issued', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.section114Notices })) },
        { id: 'councilsAtRisk', label: 'Councils at financial risk', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.councilsAtRisk })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'fundingGapBn', label: 'Cumulative funding gap (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fundingGapBn })) },
        { id: 'reservesDrawdown', label: 'Reserves drawdown (£bn)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.reservesDrawdown })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'Northamptonshire S114 notice' },
    { date: new Date(2023, 5, 1), label: 'Birmingham S114 notice' },
  ];

  return (
    <>
      <TopicNav topic="Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services"
          question="How Many Councils Are on the Brink of Bankruptcy?"
          finding={<>At least 20 local authorities have issued Section 114 notices since 2018, indicating they cannot balance their budgets — including Northamptonshire, Croydon, and Birmingham.<Cite nums={1} /> The Local Government Association estimates a £6 billion funding gap for 2025–26, with adult social care costs the primary driver.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>A Section 114 notice is the closest thing English local government has to a declaration of bankruptcy. It is issued by a council&apos;s Section 151 officer when they conclude the authority will be unable to set a balanced budget, and it triggers a government intervention process. The frequency of these notices has risen sharply since 2018, with councils from across the political spectrum affected. Birmingham City Council&apos;s notice in September 2023 was the largest local government financial failure in UK history, arising from a combination of equal pay liabilities and financial mismanagement.<Cite nums={1} /></p>
            <p>Behind the high-profile cases, many more councils are drawing down reserves, making one-off capital receipts, and cutting discretionary services to balance their books. The structural driver is adult social care: an ageing population, rising complexity of need, and inflation in care costs have pushed up demand faster than the funding available. The National Audit Office has described the overall financial position of local government as &quot;fragile&quot;, with a significant number of authorities relying on exceptional government support to remain solvent.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'S114 notices' },
          { id: 'sec-chart2', label: 'Funding gap' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="S114 notices (since 2018)" value="20+" unit="" direction="up" polarity="up-is-bad" changeText={<>Unprecedented in modern local government<Cite nums={1} /></>} sparklineData={[0, 0, 1, 3, 4, 6, 9, 13, 17, 19, 20]} href="#sec-chart1" />
          <MetricCard label="Funding gap (2025–26)" value="£6bn" unit="" direction="up" polarity="up-is-bad" changeText={<>Driven by adult social care costs<Cite nums={3} /></>} sparklineData={[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]} href="#sec-chart2" />
          <MetricCard label="Councils drawing on reserves" value="68" unit="%" direction="up" polarity="up-is-bad" changeText={<>Up from 40% in 2019<Cite nums={2} /></>} sparklineData={[40, 42, 45, 48, 52, 55, 58, 62, 65, 67, 68]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Section 114 notices and councils at financial risk, 2015–2024" subtitle="Cumulative S114 notices issued and number of councils identified as at financial risk" series={chart1Series} annotations={annotations} yLabel="Count" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Cumulative funding gap and reserves drawdown, 2015–2024" subtitle="Local government funding gap (£bn) and annual reserves drawdown (£bn), England" series={chart2Series} annotations={[]} yLabel="£bn" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Exceptional support" value="£4.5bn" unit="since 2020" description={<>The government has provided over £4.5 billion in exceptional financial support to struggling councils since 2020, but critics argue this treats symptoms rather than addressing the structural funding gap.<Cite nums={2} /></>} source="Source: DLUHC, Exceptional Financial Support statistics." />
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
