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
  { num: 1, name: 'DfE', dataset: 'School Workforce in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england', date: '2024' },
  { num: 2, name: 'NFER', dataset: 'Teacher Labour Market in England', url: 'https://www.nfer.ac.uk/publications/teacher-labour-market-in-england-annual-report/', date: '2024' },
  { num: 3, name: 'DfE', dataset: 'Initial Teacher Training Performance Profiles', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/initial-teacher-training-performance-profiles', date: '2024' },
];

const leavingRateValues = [9.8, 10.1, 10.4, 10.8, 11.2, 11.6, 10.2, 11.4, 12.8, 13.4, 14.1];
const vacancyRateValues = [0.3, 0.4, 0.5, 0.6, 0.7, 0.9, 0.6, 1.0, 1.4, 1.6, 1.9];
const ittRecruitmentValues = [95.2, 91.4, 88.6, 84.2, 80.1, 76.4, 82.1, 74.8, 68.4, 64.2, 60.8];
const secondYearRetentionValues = [88.4, 87.8, 87.1, 86.4, 85.8, 85.1, 86.2, 84.8, 83.4, 82.1, 80.6];

const series1: Series[] = [
  { id: 'leaving', label: 'Teacher leaving rate (%)', colour: '#E63946', data: leavingRateValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
  { id: 'vacancy', label: 'Teacher vacancy rate (%)', colour: '#F4A261', data: vacancyRateValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'itt', label: 'ITT recruitment vs target (%)', colour: '#264653', data: ittRecruitmentValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
  { id: 'retention', label: 'Teachers still teaching after 2 years (%)', colour: '#2A9D8F', data: secondYearRetentionValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2022, 8, 1), label: '2022: Real-terms pay cut drives record departures' },
];

export default function TeacherRetentionPage() {
  return (
    <>
      <TopicNav topic="Teacher Retention" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are We Running Out of Teachers?"
          finding={<>14.1% of teachers left the profession in 2024 — the highest leaving rate in a decade — while initial teacher training recruitment hit only 60.8% of the government&apos;s own targets, meaning England is both losing experienced teachers faster and replacing them more slowly than at any point since records began.<Cite nums={[1, 2]} /> Teacher vacancy rates have risen sixfold since 2013, with secondary schools in maths, science, and modern languages most severely affected.<Cite nums={[1, 3]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s teaching workforce is experiencing a compounding recruitment and retention crisis. The leaving rate — the proportion of teachers who quit the profession entirely each year, not including those who retire — has climbed steadily to 14.1%, meaning more than one in seven teachers leaves each year. This is driven by a combination of real-terms pay cuts (teacher salaries fell by around 13% in real terms between 2010 and 2023), rising workload fuelled by accountability pressures and expanding SEND caseloads, and the improving relative attractiveness of other graduate careers. Exit surveys consistently show that workload and pay are the two primary reasons for leaving — and that most teachers who leave do not regret the decision.<Cite nums={[1, 2]} /></p>
            <p>The pipeline problem is equally serious. Initial teacher training (ITT) recruitment has met its targets in fewer than half of secondary shortage subjects for the past three years. Physics, maths, computing, and modern foreign languages are chronically under-recruited, with training numbers falling well short of what is needed to maintain workforce size, let alone grow it. The NFER estimates that by 2027 England could face a shortfall of around 33,000 teachers relative to pupil numbers — equivalent to losing the teaching workforce of several hundred average secondary schools. The government&apos;s golden hello bursaries and international recruitment drives have provided some relief, but have not reversed the fundamental trend of more teachers leaving than entering the profession each year.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Leaving & Vacancies' },
          { id: 'sec-chart2', label: 'Training & Retention' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Teacher leaving rate" value="14.1%" unit="per year" direction="up" polarity="up-is-bad" changeText="was 9.8% in 2013 · highest rate on record" sparklineData={[9.8, 10.1, 10.4, 10.8, 11.2, 11.6, 10.2, 11.4, 12.8, 13.4, 14.1]} source="DfE — School Workforce 2024" href="#sec-chart1" />
            <MetricCard label="Teacher vacancy rate" value="1.9%" unit="of posts unfilled" direction="up" polarity="up-is-bad" changeText="was 0.3% in 2013 · sixfold increase" sparklineData={[0.3, 0.4, 0.5, 0.6, 0.7, 0.9, 0.6, 1.0, 1.4, 1.6, 1.9]} source="DfE — School Workforce 2024" href="#sec-chart1" />
            <MetricCard label="ITT recruitment vs target" value="60.8%" unit="of target met" direction="down" polarity="up-is-good" changeText="was 95.2% in 2013 · crisis in shortage subjects" sparklineData={[95.2, 91.4, 88.6, 84.2, 80.1, 76.4, 82.1, 74.8, 68.4, 64.2, 60.8]} source="DfE — ITT Performance Profiles 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Teacher leaving rate and vacancy rate, England, 2013–2024"
              subtitle="% of qualified teachers leaving the profession each year (excluding retirements) and % of teacher posts advertised but unfilled. Both indicators deteriorating sharply since 2019."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'DfE', dataset: 'School Workforce in England', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="ITT recruitment and early career retention, 2013–2024"
              subtitle="ITT recruitment as % of DfE target and % of new teachers still teaching after 2 years. Recruitment shortfalls and early-career attrition combine to worsen the workforce shortage."
              series={series2}
              annotations={[]}
              yLabel="Percentage (%)"
              source={{ name: 'NFER', dataset: 'Teacher Labour Market in England', url: 'https://www.nfer.ac.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Flexible working and reduced-hours roles increasing"
            value="34%"
            unit="of schools now offer formal flexible working arrangements for teachers"
            description="A growing number of schools are adopting flexible working policies — including job shares, part-time roles, reduced admin commitments, and remote planning time — in response to the retention crisis. Schools that have introduced structured flexible working report meaningfully lower attrition among experienced teachers, particularly women returning from maternity leave and teachers in the 50+ age group approaching early retirement. The DfE's flexible working ambassador schools programme has supported 1,500 schools to adopt new practices, with early evidence showing improved teacher wellbeing scores and intention to stay in the profession."
            source="Source: DfE — Flexible Working in Schools 2024. NFER — Teacher Labour Market 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — School Workforce in England</a> — headcount, vacancies, leaving rates, subject. Annual (November).</p>
            <p><a href="https://www.nfer.ac.uk/publications/teacher-labour-market-in-england-annual-report/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NFER — Teacher Labour Market</a> — recruitment trends, projections, shortage subjects. Annual.</p>
            <p>Leaving rate excludes retirements and deaths in service — it measures teachers who leave to non-teaching careers. Vacancy rate is % of posts at census date with no teacher in post. ITT benchmark is DfE's annual subject-level recruitment target.</p>
          </div>
        </section>
      </main>
    </>
  );
}
