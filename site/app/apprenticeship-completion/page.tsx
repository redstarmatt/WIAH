'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Overall and Level 2 completion rates (%), 2015–2024 — DfE
const overallCompletionValues = [58, 57, 54, 52, 51, 50, 53, 52, 52, 52];
const level2CompletionValues = [53, 52, 49, 47, 46, 45, 47, 47, 47, 47];

// Apprenticeship starts (thousands), 2015–2024 — DfE
const startsValues = [498, 509, 491, 375, 390, 393, 322, 349, 349, 337];

// Apprenticeship completions (thousands), 2015–2024 — DfE
const completionsValues = [283, 290, 261, 192, 194, 197, 167, 179, 180, 175];

const series1: Series[] = [
  {
    id: 'overall-completion',
    label: 'Overall completion rate (%)',
    colour: '#264653',
    data: overallCompletionValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'level2-completion',
    label: 'Level 2 completion rate (%)',
    colour: '#E63946',
    data: level2CompletionValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'starts',
    label: 'Apprenticeship starts (thousands)',
    colour: '#2A9D8F',
    data: startsValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v * 1000 })),
  },
  {
    id: 'completions',
    label: 'Completions (thousands)',
    colour: '#264653',
    data: completionsValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v * 1000 })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Apprenticeship Levy introduced — starts fall sharply' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 disrupts delivery' },
];

export default function ApprenticeshipCompletionPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Do apprenticeships actually get finished?"
          finding="Only 52% of apprenticeships started in England are completed — a rate that has barely changed in a decade and is below the 58% recorded in 2015. Level 2 apprenticeships, which serve the youngest and least qualified learners, have a completion rate of just 47%. The Levy introduced in 2017 cut starts by nearly a third without improving outcomes."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The completion rate for apprenticeships in England has remained stubbornly around 52% for the past decade — meaning roughly half of all apprenticeships begun are never finished. This is not a new problem: rates were similar in the early 2010s, and despite numerous policy interventions, no sustained improvement has been achieved. The Apprenticeship Levy, introduced in May 2017, was designed to increase employer investment and apprenticeship quality. Instead, it caused an immediate 26% fall in starts as employers, confused by the new funding system, withdrew from the market or shifted training budgets away from apprenticeships. The fall was particularly sharp at Level 2 — the entry-level qualification most relevant to young people without prior qualifications — where starts dropped by over 40% and have never recovered to pre-Levy levels.</p>
            <p>The reasons for non-completion are well-documented. A significant proportion of leavers cite the quality of training as inadequate — particularly where employers use the Levy to fund existing employees' professional development rather than genuine apprenticeship programmes. Ofsted inspections of apprenticeship providers have consistently found issues with off-the-job training requirements not being met, with some employers delivering as little as 10% of the required 20% off-the-job training. Degree apprenticeships — Level 6 and 7 — have grown rapidly and show completion rates above 70%, attracting significant employer interest in financial services, healthcare, and law. But these higher-level programmes, funded overwhelmingly by large employers drawing on Levy accounts, have come at the cost of entry-level provision that serves those who need vocational routes most.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Completion rates' },
          { id: 'sec-chart2', label: 'Starts vs completions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Overall completion rate"
              value="52%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="Broadly flat since 2015 · down from 58% before the Levy"
              sparklineData={overallCompletionValues}
              source="DfE — Apprenticeships and Traineeships 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Level 2 completion rate"
              value="47%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="Lowest of all levels · serves youngest and least qualified learners"
              sparklineData={level2CompletionValues}
              source="DfE — Apprenticeships and Traineeships 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Apprenticeship starts"
              value="337K"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 509K before 2017 Levy · Level 2 starts hardest hit"
              sparklineData={startsValues}
              source="DfE — Apprenticeships and Traineeships 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Apprenticeship completion rates by level, England, 2015–2024"
              subtitle="Overall completion rate (blue) and Level 2 completion rate (red). Both fell after the 2017 Levy introduction and have failed to recover. Level 2 — serving the least qualified learners — is the worst performing."
              series={series1}
              annotations={annotations}
              yLabel="Completion rate (%)"
              source={{ name: 'Department for Education', dataset: 'Apprenticeships and Traineeships', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Apprenticeship starts and completions, England, 2015–2024"
              subtitle="Annual starts (green) vs completions (blue). The gap between the two lines represents dropouts and ongoing learners. Both fell sharply after the 2017 Levy."
              series={series2}
              annotations={[{ date: new Date(2017, 0, 1), label: '2017: Levy cuts starts by 26%' }]}
              yLabel="Apprentices"
              source={{ name: 'Department for Education', dataset: 'Apprenticeships and Traineeships', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Degree apprenticeships growing fast with high completion rates"
            value="27,000"
            unit="degree apprenticeship completions in 2024"
            description="Degree apprenticeships — Level 6 and 7 — have grown from 3,000 completions in 2019 to 27,000 in 2024, with completion rates above 70%. They are increasingly used by NHS, financial services, and legal firms as an alternative to traditional graduate recruitment. The government's Skills England reform agenda, announced in 2024, proposes a Growth and Skills Levy to replace the existing Apprenticeship Levy, allowing employers to use up to 50% of their levy contributions for non-apprenticeship training. This is intended to increase employer flexibility, expand participation in shorter skills programmes, and reduce the concentration of levy spending on management-level programmes at the expense of entry-level provision."
            source="Source: DfE — Apprenticeships and Traineeships 2024. DfE — Skills England: driving growth and widening opportunities 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Apprenticeships and Traineeships</a> — annual publication. Starts, completions, and achievement rates by level, sector, age, and region. Data from the Individualised Learner Record (ILR).</p>
            <p>Completion rate is defined as the proportion of learners who achieve their framework or standard, including both the qualification and functional skills requirements where applicable. The rate is calculated on the basis of leavers in each academic year, not active starts. Level 2 corresponds to GCSE-equivalent qualifications; Level 6/7 to degree-level. Pre-2017 data reflects the old framework system; post-2017 data is for standards-based apprenticeships where possible.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
