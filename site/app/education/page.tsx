'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Attainment gap (FSM vs non-FSM Attainment 8 score), 2016–2024 — DfE
const fsm = [35.2, 35.8, 36.1, 35.9, 35.7, null, 35.9, 36.2, 36.5];
const nonFsm = [53.8, 54.1, 54.5, 54.7, 54.9, null, 55.0, 55.3, 55.7];
const gapValues = [18.6, 18.3, 18.4, 18.8, 19.2, null, 19.1, 19.1, 19.2];

// Teacher vacancy rate (%), 2016–2024 — DfE SWC
const vacancyValues = [0.5, 0.7, 0.8, 1.0, 1.2, 1.7, 1.8, 1.6, 1.4];

// Persistent absence rate (%), 2016–2024 — DfE
const persistentAbsenceValues = [10.7, 11.0, 10.9, 10.8, 10.9, null, 22.5, 21.2, 19.4];

const attainmentSeries: Series[] = [
  {
    id: 'non-fsm',
    label: 'Non-FSM Attainment 8 score',
    colour: '#2A9D8F',
    data: nonFsm
      .filter((v): v is number => v !== null)
      .map((v, i) => ({ date: new Date(2016 + i + (i >= 5 ? 1 : 0), 0, 1), value: v })),
  },
  {
    id: 'fsm',
    label: 'FSM Attainment 8 score',
    colour: '#E63946',
    data: fsm
      .filter((v): v is number => v !== null)
      .map((v, i) => ({ date: new Date(2016 + i + (i >= 5 ? 1 : 0), 0, 1), value: v })),
  },
];

const vacancySeries: Series[] = [
  {
    id: 'vacancy-rate',
    label: 'Teacher vacancy rate (%)',
    colour: '#F4A261',
    data: vacancyValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const absenceSeries: Series[] = [
  {
    id: 'persistent-absence',
    label: 'Persistent absence rate (%)',
    colour: '#E63946',
    data: persistentAbsenceValues
      .filter((v): v is number => v !== null)
      .map((v, i) => ({ date: new Date(2016 + i + (i >= 5 ? 1 : 0), 0, 1), value: v })),
  },
];

const attainmentAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: No exams (COVID)' },
];

const vacancyAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020–21: COVID closures' },
];

export default function EducationPage() {
  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="What's Actually Happening in Schools?"
          finding="The attainment gap between disadvantaged pupils and their peers has barely moved in a decade: FSM pupils score 19 points below non-FSM pupils at GCSE. Teacher vacancies have tripled since 2016. Persistent absence reached 22.5% in 2022 — twice the pre-pandemic rate."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The GCSE attainment gap between pupils eligible for Free School Meals (FSM) and their better-off peers has remained stubbornly wide throughout the past decade, closing only marginally despite sustained investment through the Pupil Premium. In 2024, FSM pupils averaged an Attainment 8 score of 36.5 against 55.7 for their non-FSM peers — a gap of 19.2 points. The COVID pandemic erased much of the modest progress made between 2016 and 2019, and catch-up funding distributed from 2021 through the National Tutoring Programme delivered mixed results: only a third of allocated tutoring hours were taken up in the first year. The Education Endowment Foundation estimates that, at current rates, it would take over 500 years for the attainment gap to close entirely.</p>
            <p>Teacher shortages have intensified throughout the decade. The vacancy rate tripled from 0.5% in 2016 to 1.8% in 2022, concentrated in STEM subjects, modern languages, and schools in deprived areas. Secondary schools in the most deprived fifth of areas are twice as likely to be taught by an out-of-subject teacher as those in the least deprived fifth. Persistent absence — defined as missing 10% or more of possible sessions — reached 22.5% in 2022/23, more than double the pre-pandemic rate of 10.9%, affecting over 1.6 million pupils. Children in the highest absence decile accumulate on average a 12-month learning deficit versus their peers over the course of their schooling.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Attainment gap' },
          { id: 'sec-chart2', label: 'Teacher vacancies' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Attainment gap (FSM vs non-FSM)"
              value="19.2"
              unit="points"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · GCSE Attainment 8 · gap barely closed since 2016"
              sparklineData={[18.6, 18.3, 18.4, 18.8, 19.2, 19.1, 19.1, 19.2]}
              source="DfE · GCSE and equivalent results 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Teacher vacancy rate"
              value="1.4%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Tripled since 2016 · STEM worst affected"
              sparklineData={[0.5, 0.7, 0.8, 1.0, 1.2, 1.7, 1.8, 1.4]}
              source="DfE · School Workforce Census 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Persistent absence rate"
              value="19.4%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Was 10.9% pre-pandemic · over 1.6 million pupils"
              sparklineData={[10.7, 11.0, 10.9, 10.9, 10.9, 22.5, 21.2, 19.4]}
              source="DfE · Pupil absence in schools 2023/24"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="GCSE Attainment 8 scores: FSM vs non-FSM pupils, England, 2016–2024"
              subtitle="Average Attainment 8 score (0–90 scale) for pupils eligible and not eligible for Free School Meals. Gap of ~19 points has barely narrowed."
              series={attainmentSeries}
              annotations={attainmentAnnotations}
              yLabel="Attainment 8 score"
              source={{ name: 'DfE', dataset: 'GCSE and equivalent results, Explore Education Statistics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Teacher vacancy rate, England, 2016–2024"
              subtitle="Percentage of teacher posts that are vacant. Tripled since 2016. Worst in STEM subjects and schools in deprived areas."
              series={vacancySeries}
              annotations={vacancyAnnotations}
              yLabel="Vacancy rate (%)"
              source={{ name: 'DfE', dataset: 'School Workforce Census', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Pupil Premium improving outcomes for disadvantaged pupils"
            value="£2,930"
            description="The Pupil Premium allocates £2,930 per looked-after child and £1,480 per FSM pupil annually to schools, totalling over £2.9 billion in 2024/25. Education Endowment Foundation evidence reviews show sustained investment in effective approaches — high-quality tutoring, structured literacy programmes, and evidence-based professional development — can close the attainment gap by up to six months per year. Schools showing the largest gap reductions typically spend Pupil Premium on sustained tutoring and targeted early intervention rather than general resourcing."
            source="Source: DfE — Pupil Premium 2024/25 allocations. Education Endowment Foundation — Teaching and Learning Toolkit."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Key Stage 4 performance (Explore Education Statistics)</a> — GCSE Attainment 8 by FSM status. No exams in 2020/21 due to COVID.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — School Workforce Census</a> — annual census of teachers, support staff, vacancies, and absences.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Pupil absence in schools in England</a> — overall and persistent absence rates by school type and pupil characteristics.</p>
            <p>Attainment 8 measures performance across eight GCSE subjects. FSM pupils are those eligible for free school meals as a proxy for disadvantage. 2020/21 data not available due to COVID exam cancellations.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
