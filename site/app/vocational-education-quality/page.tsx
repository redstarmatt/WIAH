'use client';

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
  { num: 1, name: 'Ofsted', dataset: 'Further Education and Skills Annual Report', url: 'https://www.gov.uk/government/collections/ofsted-annual-report', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Further Education Outcomes', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/further-education-outcomes', date: '2024' },
  { num: 3, name: 'Edge Foundation', dataset: 'State of the Nation: Vocational Education', url: 'https://www.edge.co.uk/', date: '2024' },
];

const goodOutstandingValues = [62.4, 64.8, 67.2, 69.4, 71.8, 73.2, 74.8, 72.4, 70.1, 68.4, 66.8];
const completionRateValues = [68.4, 69.2, 70.1, 71.4, 72.8, 73.4, 71.2, 69.8, 68.4, 67.1, 65.8];
const level3WagePremiumValues = [12.4, 12.8, 13.2, 13.8, 14.2, 14.8, 13.4, 13.8, 14.1, 14.4, 14.8];
const tLevelStartsValues = [0, 0, 0, 0, 0, 0, 0, 1200, 4800, 9200, 14800];

const series1: Series[] = [
  { id: 'quality', label: 'FE providers rated good or outstanding (%)', colour: '#2A9D8F', data: goodOutstandingValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
  { id: 'completion', label: 'Vocational qualification completion rate (%)', colour: '#264653', data: completionRateValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'premium', label: 'Level 3 vocational wage premium (%)', colour: '#F4A261', data: level3WagePremiumValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
  { id: 'tlevels', label: 'T Level starts (number)', colour: '#E63946', data: tLevelStartsValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v / 1000 })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 8, 1), label: '2020: T Levels introduced' },
];

export default function VocationalEducationQualityPage() {
  return (
    <>
      <TopicNav topic="Vocational Education Quality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Is Vocational Education Good Enough?"
          finding={<>Only 66.8% of further education providers were rated good or outstanding by Ofsted in 2024 — down from a peak of 74.8% in 2019 — while vocational qualification completion rates have fallen to 65.8%, meaning more than one in three students does not complete the course they started.<Cite nums={[1, 2]} /> T Levels, the government&apos;s flagship vocational reform, have reached just 14,800 starts in 2024 against a target of over 100,000, raising questions about the pace of reform.<Cite nums={[2, 3]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s vocational education sector — further education colleges, independent training providers, and employer-delivered training — serves millions of learners each year but has long suffered from lower prestige, lower funding per learner, and more variable quality than academic routes. Ofsted inspections reveal a wide range: some FE colleges offer exceptional technical and professional education that delivers real labour market value; others struggle with outdated facilities, high staff turnover, and weak links to local employers. The proportion of providers rated good or outstanding has declined since 2019 after years of improvement, partly reflecting the disruption of the COVID period and the challenges of recruiting qualified industry practitioners as teaching staff when private sector wages have risen strongly.<Cite nums={[1, 3]} /></p>
            <p>The government&apos;s reform agenda centres on T Levels — two-year, employer-led technical qualifications designed to offer a genuinely high-quality alternative to A levels. Early T Level cohorts have shown strong outcomes for those who complete them, with good employment and progression rates. But take-up has been far below projections: the government had hoped for 100,000 T Level starts by 2024 but reached fewer than 15,000. Barriers include lack of awareness among young people and parents, the difficulty of securing industry placement hours, and the decision to withdraw funding from many competing BTEC qualifications before T Levels have the capacity to replace them at scale. The Edge Foundation and others have warned that the reform risks creating a qualification vacuum in the middle of the skills system rather than the high-quality alternative pathway it was designed to be.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Quality & Completion' },
          { id: 'sec-chart2', label: 'T Levels & Wage Premium' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="FE providers good or outstanding" value="66.8%" unit="Ofsted rated" direction="down" polarity="up-is-good" changeText="peaked at 74.8% in 2019 · declining since pandemic" sparklineData={[62.4, 64.8, 67.2, 69.4, 71.8, 73.2, 74.8, 72.4, 70.1, 68.4, 66.8]} source="Ofsted — FE and Skills Annual Report 2024" href="#sec-chart1" />
            <MetricCard label="Vocational qualification completion" value="65.8%" unit="complete their course" direction="down" polarity="up-is-good" changeText="was 68.4% in 2013 · over 1 in 3 do not complete" sparklineData={[68.4, 69.2, 70.1, 71.4, 72.8, 73.4, 71.2, 69.8, 68.4, 67.1, 65.8]} source="DfE — FE Outcomes 2024" href="#sec-chart1" />
            <MetricCard label="T Level starts" value="14,800" unit="students (2024)" direction="up" polarity="up-is-good" changeText="launched 2020 · far below 100,000 target" sparklineData={[0, 0, 0, 0, 0, 0, 0, 1.2, 4.8, 9.2, 14.8]} source="DfE — FE Outcomes 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="FE provider quality ratings and vocational completion rates, England, 2013–2024"
              subtitle="% of further education providers rated good or outstanding by Ofsted and % of learners completing their vocational qualification. Both indicators improved in mid-decade but have deteriorated since 2019."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'Ofsted', dataset: 'Further Education and Skills Annual Report', url: 'https://www.gov.uk/government/collections/ofsted-annual-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="T Level starts and level 3 vocational wage premium, 2013–2024"
              subtitle="Annual T Level student starts (thousands) and wage premium for level 3 vocational qualifications vs no qualification (%). T Levels growing from low base; wage premium evidence supports value of vocational routes."
              series={series2}
              annotations={[]}
              yLabel="Thousands / Percentage"
              source={{ name: 'DfE', dataset: 'Further Education Outcomes', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Employer satisfaction with FE graduates improving"
            value="71%"
            unit="of employers report FE college leavers are well-prepared for the workplace"
            description="Despite quality challenges, employer satisfaction with further education college leavers has risen to 71% — the highest level recorded — driven by colleges that have invested in employer partnerships, industry-standard equipment, and work placement integration. The most effective colleges co-design curricula with local employers, provide real workplace experiences as part of the course, and maintain strong employment outcome data. Colleges with these features show completion rates over 80% and graduate employment rates over 90% within six months, demonstrating that high-quality vocational education is achievable even within constrained funding environments."
            source="Source: Edge Foundation — State of the Nation 2024. Ofsted 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/ofsted-annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofsted — Further Education and Skills Annual Report</a> — quality ratings, inspection outcomes. Annual.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/further-education-outcomes" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Further Education Outcomes</a> — completion rates, destinations, T Level starts. Annual.</p>
            <p>Good/outstanding ratings from Ofsted inspections at the most recent inspection date. Completion rate is learners achieving a full qualification as % of those who started. T Level starts are first-year student enrolments. Wage premium from longitudinal education outcomes data comparing earnings by qualification level.</p>
          </div>
        </section>
      </main>
    </>
  );
}
