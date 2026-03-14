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
  { num: 1, name: 'Ofqual', dataset: 'A Level and GCSE Results Statistics', url: 'https://www.gov.uk/government/organisations/ofqual/about/statistics', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'A Level and Other 16 to 18 Results', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/a-level-and-other-16-to-18-results', date: '2024' },
  { num: 3, name: 'Ucas', dataset: 'Annual Admissions Statistics', url: 'https://www.ucas.com/data-and-analysis/ucas-undergraduate-releases', date: '2024' },
];

const aStarAValues = [52.1, 53.4, 54.2, 55.1, 56.3, 57.4, 79.1, 75.2, 65.1, 61.8, 59.4];
const aStarValues = [12.4, 13.1, 13.8, 14.2, 14.8, 15.3, 22.4, 19.8, 16.1, 15.4, 15.0];
const passingRateValues = [97.8, 97.9, 98.0, 98.1, 98.2, 98.3, 99.5, 99.1, 98.8, 98.7, 98.6];
const universityPlacesValues = [467, 481, 487, 494, 505, 516, 559, 531, 542, 551, 558];

const series1: Series[] = [
  { id: 'starA', label: 'A* or A grades (%)', colour: '#2A9D8F', data: aStarAValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
  { id: 'star', label: 'A* grades only (%)', colour: '#264653', data: aStarValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'pass', label: 'Overall pass rate (A–E, %)', colour: '#6B7280', data: passingRateValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
  { id: 'ucas', label: 'UK students accepted by UCAS (thousands)', colour: '#F4A261', data: universityPlacesValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 7, 1), label: '2020: CAGs replace exams — grades soar' },
  { date: new Date(2021, 7, 1), label: '2021: Second pandemic year' },
  { date: new Date(2022, 7, 1), label: '2022: Return to exams — grades fall' },
];

export default function ALevelGradeInflationPage() {
  return (
    <>
      <TopicNav topic="A-Level Grade Inflation" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Did Grade Inflation Make A-Levels Meaningless?"
          finding={<>The proportion of A-level entries awarded A* or A rose from 52% pre-pandemic to 79% in 2021 — then fell back to 59% in 2024 as Ofqual tightened grading.<Cite nums={1} /> Two cohorts of students received inflated grades that complicated university admissions, employer hiring, and international comparisons, while the signal value of A* was temporarily destroyed.<Cite nums={[1, 2]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>A-level grade inflation reached its most visible peak during the pandemic, when Centre Assessment Grades (CAGs) — teacher-estimated grades used in 2020 — and teacher-assessed grades in 2021 produced dramatically higher results than the preceding years of external exams. In 2021, 79.1% of A-level entries received A* or A — nearly three in four students. This created immediate problems: universities had unconditionally accepted thousands of students based on lower predicted grades, and were swamped with better-than-expected results that they could not accommodate, leading to chaotic clearing rounds and thousands of students effectively shut out of their preferred courses.<Cite nums={3} /> The pandemic years were extreme, but the long-term trend of slow grade inflation predated them: A*-A grades rose from 52% in 2013 to 57% in 2019 through a sustained period of teacher coaching, specification optimisation, and resit culture.</p>
            <p>Ofqual began a normalisation process from 2022, setting grading standards midway between 2019 and 2021 — a deliberate decision to avoid a sudden cliff-edge that would have dramatically worsened results for the first post-pandemic cohort. By 2024, A*-A grades had returned to 59.4% — still above the pre-pandemic 57%, with full return to 2019 standards planned by 2025.<Cite nums={1} /> The episode raised fundamental questions about what A-levels are for. If they are primarily about ranking students for selective university entry, the temporary expansion of top grades is damaging. If they are about measuring attainment against absolute standards, the pandemic grades may have been closer to truth for the reduced curriculum that students actually studied. The tension between norm-referencing and criterion-referencing has never been satisfactorily resolved in the English A-level system.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Grade Distribution' },
          { id: 'sec-chart2', label: 'Pass Rate & UCAS' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="A* or A grades" value="59.4%" unit="of A-level entries (2024)" direction="down" polarity="flat" changeText="was 52.1% in 2013 · peaked at 79.1% in 2021" sparklineData={[52.1, 53.4, 54.2, 55.1, 56.3, 57.4, 79.1, 75.2, 65.1, 61.8, 59.4]} source="Ofqual — A Level Results Statistics 2024" href="#sec-chart1" />
            <MetricCard label="A* grades (top grade)" value="15.0%" unit="of A-level entries (2024)" direction="down" polarity="flat" changeText="was 12.4% in 2013 · peaked at 22.4% in 2020" sparklineData={[12.4, 13.1, 13.8, 14.2, 14.8, 15.3, 22.4, 19.8, 16.1, 15.4, 15.0]} source="Ofqual — A Level Results Statistics 2024" href="#sec-chart1" />
            <MetricCard label="UCAS acceptances" value="558K" unit="students per year" direction="up" polarity="up-is-good" changeText="up from 467K in 2013 · expanded university sector" sparklineData={[467, 481, 487, 494, 505, 516, 559, 531, 542, 551, 558]} source="UCAS — Annual Admissions Statistics 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="A-level A* and A grade shares, 2013–2024"
              subtitle="Proportion of A-level entries awarded A* or A (%) and A* only (%). The pandemic CAG/TAGs years produced historic highs; Ofqual normalisation is returning grades to pre-pandemic trajectory."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'Ofqual', dataset: 'A Level and GCSE Results Statistics', url: 'https://www.gov.uk/government/organisations/ofqual/about/statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="A-level overall pass rate and UCAS acceptances, 2013–2024"
              subtitle="A-level overall pass rate (A–E, %) and UK students accepted through UCAS (thousands). Both show the pandemic spike and subsequent normalisation, though UCAS numbers have recovered and are rising."
              series={series2}
              annotations={[]}
              yLabel="% / Thousands"
              source={{ name: 'UCAS', dataset: 'Annual Admissions Statistics', url: 'https://www.ucas.com/data-and-analysis/ucas-undergraduate-releases', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="T-levels expanding vocational alternatives to A-levels"
            value="16,000"
            unit="students enrolled in T-levels in 2023/24 — growing rapidly"
            description="T-levels — two-year technical qualifications equivalent to three A-levels, combining classroom theory with a 45-day industry placement — enrolled around 16,000 students in 2023/24, up from 1,000 in their first full year. The government plans T-level enrolment to reach 100,000 by 2030. T-levels are designed to provide a genuine high-quality alternative to A-levels for students pursuing technical careers, and early employment outcomes for completers have been strong. Expanding this pathway alongside reformed A-levels could help reduce over-reliance on the academic route as the only mark of post-16 achievement."
            source="Source: DfE — T-level Enrolment Statistics 2024. Ofqual 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/organisations/ofqual/about/statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofqual — A Level and GCSE Results Statistics</a> — grade distributions, subject entries, centre data. Annual.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/a-level-and-other-16-to-18-results" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — A Level and Other 16 to 18 Results</a> — entries, grades, gender and deprivation breakdowns. Annual.</p>
            <p>Grade data covers all A-level entries in England (not Wales or Northern Ireland which have separate systems). 2020 and 2021 used teacher-assessed grades; 2022 onwards returned to external exams with transitional arrangements.</p>
          </div>
        </section>
      </main>
    </>
  );
}
