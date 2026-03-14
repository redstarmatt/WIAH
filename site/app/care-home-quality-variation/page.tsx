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
  { num: 1, name: 'Care Quality Commission', dataset: 'State of Care — adult social care', url: 'https://www.cqc.org.uk/publications/major-report/state-of-care', date: '2024' },
  { num: 2, name: 'CQC', dataset: 'Care home inspection ratings', url: 'https://www.cqc.org.uk/care-services/care-homes', date: '2024' },
  { num: 3, name: 'Skills for Care', dataset: 'State of the adult social care sector', url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx', date: '2024' },
];

interface DataPoint {
  year: number;
  outstandingAndGood: number;
  requiresImprovement: number;
  inadequate: number;
  staffVacancyRate: number;
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

export default function CareHomeQualityVariationPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/care-home-quality-variation/care_home_quality_variation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'outstandingAndGood', label: 'Outstanding or Good (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.outstandingAndGood })) },
        { id: 'requiresImprovement', label: 'Requires improvement (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.requiresImprovement })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'inadequate', label: 'Inadequate (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.inadequate })) },
        { id: 'staffVacancyRate', label: 'Staff vacancy rate (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.staffVacancyRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — 40,000 excess care home deaths' },
    { date: new Date(2022, 5, 1), label: 'Market stability concerns raised' },
  ];

  return (
    <>
      <TopicNav topic="Health & Social Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health & Social Care"
          question="How Varied Is Care Home Quality Across the UK?"
          finding={<>Around 80% of care homes in England are rated Good or Outstanding by the CQC — but 9% require improvement and 1% are rated Inadequate, with significant regional variation and a persistent staff vacancy rate of around 9%.<Cite nums={1} /> Quality has improved since 2017 but the pandemic set back progress in some areas.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Care Quality Commission inspects and rates all registered care homes in England on a four-point scale: Outstanding, Good, Requires Improvement, and Inadequate. The ratings system has driven genuine improvement in the sector since its introduction in 2014: the proportion of services rated Good or Outstanding has risen from around 50% to over 80%. But quality is unevenly distributed: rural areas, seaside towns, and some urban areas with older stock have higher concentrations of lower-rated homes.<Cite nums={1} /></p>
            <p>The fundamental challenge facing the care home sector is workforce: around 165,000 posts were vacant in adult social care in 2023 — a vacancy rate of approximately 9%. Turnover is high, wages are low (many care workers are paid close to the National Living Wage), and the role is physically and emotionally demanding. Workforce instability directly affects quality: homes that struggle to maintain staffing levels see quality slide.<Cite nums={[2, 3]} /> The market is fragile: a significant number of homes operate on thin margins and closures — leaving residents suddenly needing to move — are a persistent risk.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Quality ratings' },
          { id: 'sec-chart2', label: 'Inadequate and staffing' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Good or Outstanding" value="80" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 51% in 2016<Cite nums={1} /></>} sparklineData={[51, 57, 63, 68, 73, 76, 78, 79, 80, 80, 80]} href="#sec-chart1" />
          <MetricCard label="Inadequate rating" value="1.2" unit="%" direction="down" polarity="up-is-bad" changeText={<>Down from 3% in 2016<Cite nums={2} /></>} sparklineData={[3.0, 2.5, 2.0, 1.8, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.2]} href="#sec-chart2" />
          <MetricCard label="Staff vacancy rate" value="9.0" unit="%" direction="down" polarity="up-is-bad" changeText={<>Peaked at 11% in 2022<Cite nums={3} /></>} sparklineData={[7, 7.2, 7.5, 7.8, 8.0, 10.5, 11.0, 10.5, 10.0, 9.5, 9.0]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Care home quality ratings, 2016–2024" subtitle="Percentage of registered care homes rated Good or Outstanding and Requires Improvement, England" series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Inadequate ratings and staff vacancies, 2016–2024" subtitle="Percentage of homes rated Inadequate and staff vacancy rate (%)" series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="International recruitment" value="70k" unit="visas granted" description={<>Around 70,000 care worker visas were granted in 2023 — helping fill workforce gaps but raising questions about the sustainability and ethics of a sector reliant on international recruitment.<Cite nums={3} /></>} source="Source: Skills for Care, international recruitment data." />
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
