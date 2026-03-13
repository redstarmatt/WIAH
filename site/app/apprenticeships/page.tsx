'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Apprenticeship starts (thousands), 2013–2024 — DfE
const startsValues = [442, 499, 509, 507, 375, 393, 393, 322, 322, 349, 337, 337];

// Under-19 starts (thousands), 2013–2024 — DfE
const under19Values = [220, 252, 264, 248, 148, 145, 143, 115, 118, 125, 125, 125];

// Level 6/7 (degree) starts as % of total, 2013–2024 — DfE
const degreeShareValues = [4, 5, 6, 8, 10, 14, 18, 22, 25, 27, 28, 28];

const series1: Series[] = [
  {
    id: 'starts',
    label: 'Total apprenticeship starts (thousands)',
    colour: '#264653',
    data: startsValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v * 1000 })),
  },
  {
    id: 'under19',
    label: 'Under-19 starts (thousands)',
    colour: '#E63946',
    data: under19Values.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v * 1000 })),
  },
];

const series2: Series[] = [
  {
    id: 'degree-share',
    label: 'Level 6/7 (degree) as % of total starts',
    colour: '#F4A261',
    data: degreeShareValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Apprenticeship Levy introduced' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 disrupts delivery' },
];

export default function ApprenticeshipsPage() {
  return (
    <>
      <TopicNav topic="Apprenticeships" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Are apprenticeships actually working?"
          finding="Apprenticeship starts have fallen 34% since the Levy was introduced in 2017 — from 509,000 to 337,000. Under-19 starts have halved. The Levy has been captured by large employers using it to fund MBA-level training for existing managers, while the entry-level programmes that serve young people without qualifications have been cut."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Apprenticeship Levy, introduced in April 2017, requires employers with a payroll above £3 million to contribute 0.5% of their wage bill into a digital training account. It was designed to generate 3 million new starts by 2020; instead total annual starts fell from 509,000 in 2015/16 to 375,000 in 2017/18 and have not recovered. An estimated £1.3 billion in unspent levy funds was returned to the Treasury in 2021/22. Smaller employers, who historically provided the majority of craft and technical apprenticeships, were deterred by increased bureaucracy. Large levy-paying employers used accumulated funds to subsidise existing senior employees: Level 6 and 7 degree apprenticeships grew from 10% of starts in 2017/18 to 28% in 2023/24, with many programmes effectively funding MBA-level training for mid-career managers. The Public Accounts Committee concluded the Levy had "not delivered value for taxpayers."</p>
            <p>The impact on young people is the most acute dimension. Under-19 starts fell from 264,000 in 2015/16 to 125,000 in 2023/24 — a 53% reduction. Remaining young apprenticeships concentrate in social care, hospitality, and retail — industries with wages clustered around the apprenticeship minimum wage and limited progression prospects. The social mobility function the programme was designed to perform — bringing young people without professional family networks into skilled employment — has been progressively displaced by its function as a large-employer training subsidy. Completion rates stand at 52%, meaning nearly half of starters do not finish. The Labour government's 2024 Skills England agenda proposed replacing the Levy with a broader Growth and Skills Levy allowing employers to spend up to 50% on non-apprenticeship training — a reform with complex trade-offs for young people versus established workers.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Starts trend' },
          { id: 'sec-chart2', label: 'Degree shift' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Apprenticeship starts"
              value="337K"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="-34% since pre-Levy peak · £1.3bn unspent levy returned to Treasury in 2022"
              sparklineData={startsValues}
              source="DfE — Apprenticeships and Traineeships 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Under-19 apprenticeship starts"
              value="125K"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="-53% since 2015/16 · entry-level most affected"
              sparklineData={under19Values}
              source="DfE — Apprenticeships and Traineeships 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Degree (Level 6/7) share of starts"
              value="28%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Was 10% in 2017 · levy captured by large employers for manager training"
              sparklineData={degreeShareValues}
              source="DfE — Apprenticeships and Traineeships 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Apprenticeship starts, England, 2013–2024"
              subtitle="Total starts (blue) and under-19 starts (red). Both fell sharply after the 2017 Levy introduction. Under-19 starts have halved — the group the programme was originally designed to serve."
              series={series1}
              annotations={annotations}
              yLabel="Starts"
              source={{ name: 'Department for Education', dataset: 'Apprenticeships and Traineeships', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Level 6/7 (degree) apprenticeships as share of total starts, 2013–2024"
              subtitle="Degree apprenticeships have grown from 4% to 28% of all starts. Large employers are using Levy funds for existing staff development rather than entry-level training for young people."
              series={series2}
              annotations={[{ date: new Date(2017, 0, 1), label: '2017: Levy incentivises higher-level programmes' }]}
              yLabel="% of total starts"
              source={{ name: 'Department for Education', dataset: 'Apprenticeships and Traineeships', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Growth and Skills Levy reform — flexible training for employers"
            value="50%"
            unit="of levy fund usable for non-apprenticeship training under proposed reform"
            description="The Labour government's 2024 Skills England initiative proposed replacing the Apprenticeship Levy with a broader Growth and Skills Levy, allowing employers to spend up to 50% of their contribution on shorter skills programmes and non-apprenticeship training. Supporters argue this would unlock retraining and upskilling for the existing workforce. Critics warn it could further reduce traditional apprenticeship numbers for young people if large employers shift spending away from programmes that serve them. The reform is expected to be phased in from 2025/26. Separately, the government has committed to increasing the apprenticeship minimum wage for under-19s, which has historically been a significant barrier to young people taking up apprenticeship places in sectors that compete with retail and hospitality earnings."
            source="Source: DfE — Skills England: driving growth and widening opportunities 2024. HM Treasury — Autumn Budget 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Apprenticeships and Traineeships</a> — annual publication. Starts, completions, and achievement rates by level, age, sector subject area, and region. Data from the Individualised Learner Record (ILR).</p>
            <p>Data runs on an academic year (August–July) basis. Level 2 is equivalent to GCSE; Level 3 to A-level; Level 6/7 to degree and postgraduate level. The Levy was introduced in April 2017. Pre-Levy figures use the old framework system; post-Levy figures predominantly reflect the standards-based system. Completion rate is calculated on leavers, not active starts.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
