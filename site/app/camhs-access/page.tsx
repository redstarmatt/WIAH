'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// CAMHS total referrals (thousands), 2016–2024
const referralsData = [280, 306, 332, 356, 334, 412, 438, 460, 481];

// CAMHS rejected referrals (thousands), 2016–2024
const rejectedData = [68, 74, 82, 87, 91, 106, 114, 122, 128];

// % waiting over 18 weeks, 2016–2024
const waitData = [38, 40, 42, 44, 48, 50, 51, 52, 49];

const referralSeries: Series[] = [
  {
    id: 'referrals',
    label: 'Total referrals (thousands)',
    colour: '#E63946',
    data: referralsData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'rejected',
    label: 'Rejected referrals (thousands)',
    colour: '#F4A261',
    data: rejectedData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const waitSeries: Series[] = [
  {
    id: 'wait-18-weeks',
    label: 'Waiting over 18 weeks (%)',
    colour: '#E63946',
    data: waitData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const referralAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic surge in referrals' },
  { date: new Date(2022, 0, 1), label: '2022: Thresholds raised, rejection rate peaks' },
];

const waitAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Backlog accumulates' },
];

export default function CamhsAccessPage() {
  return (
    <>
      <TopicNav topic="CAMHS Access" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children's Mental Health"
          question="Can Children Get Mental Health Help?"
          finding="CAMHS received 481,000 referrals in 2024 — up 72% since 2016 — but 128,000 of them were rejected before assessment. Of those who gain access, 49% wait more than 18 weeks for treatment. Early intervention prevents far more costly crises in adulthood, yet the system is rationing access by raising thresholds rather than expanding capacity."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Child and Adolescent Mental Health Services received 481,000 referrals in 2024 — a 72% increase on the 280,000 referred in 2016, reflecting a well-documented deterioration in children's mental health driven by the pandemic, social media, and family economic stress. Of those referrals, approximately 128,000 — 27% — were rejected before assessment, not because clinicians believed these children did not need help, but because capacity is insufficient and thresholds have been raised accordingly. For those who do gain access, 49% wait more than 18 weeks from referral to treatment; for adolescents with eating disorders, where early intervention significantly improves outcomes, such delays carry clinical risk. NHS England's Long Term Plan target of seeing an additional 345,000 children and young people per year has been partially met, but the number needing help has grown faster than service expansion.</p>
            <p>Access is deeply unequal by geography and income. Children in rural and coastal communities face longer waits and higher rejection rates because specialist services are concentrated in cities and sub-threshold community provision is thinner in deprived areas. Children from lower-income families are more likely to be referred but less likely to have parents who can navigate a rejected referral or fund private alternatives. CAMHS accounts for a smaller share of the mental health budget than adult mental health, despite established evidence that early childhood intervention prevents far more costly crises in adulthood. A young person who fails to receive timely CAMHS support at age 14 is significantly more likely to need crisis services at 18.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Referrals' },
          { id: 'sec-chart2', label: 'Waiting Times' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="CAMHS referrals"
              value="481,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 72% since 2016 · post-pandemic surge"
              sparklineData={[280, 306, 332, 356, 334, 412, 438, 460, 481]}
              source="NHS England · CAMHS Referrals 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Referrals rejected"
              value="128,000"
              unit="27% of total"
              direction="up"
              polarity="up-is-bad"
              changeText="Thresholds raised as demand outpaces capacity"
              sparklineData={[68, 74, 82, 87, 91, 106, 114, 122, 128]}
              source="NHS England · CAMHS Referrals 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Waiting over 18 weeks"
              value="49%"
              unit="of those accepted"
              direction="up"
              polarity="up-is-bad"
              changeText="Nearly half wait 4+ months for treatment to begin"
              sparklineData={[38, 40, 42, 44, 48, 50, 51, 52, 49]}
              source="NHS England · CAMHS Waiting Times 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="CAMHS referrals and rejections, England, 2016–2024"
              subtitle="Total referrals to Child and Adolescent Mental Health Services (red) and referrals rejected before assessment (amber). Gap between need and accepted capacity is growing."
              series={referralSeries}
              annotations={referralAnnotations}
              yLabel="Referrals (thousands)"
              source={{ name: 'NHS England', dataset: 'Mental Health Services Monthly Statistics — CAMHS', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/mental-health-statistics/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="CAMHS waiting times: % waiting over 18 weeks, England, 2016–2024"
              subtitle="Percentage of accepted referrals waiting more than 18 weeks from referral to start of treatment. Peaked at 52% in 2023, slightly improved to 49% in 2024 — still deeply inadequate."
              series={waitSeries}
              annotations={waitAnnotations}
              yLabel="% waiting 18+ weeks"
              source={{ name: 'NHS England', dataset: 'CAMHS Waiting Times Statistics', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/mental-health-statistics/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Mental Health Support Teams now in 50% of schools"
            value="50%"
            unit="of schools have in-school support"
            description="NHS England's Mental Health Support Teams programme, which embeds mental health practitioners in schools and colleges, reached 50% of schools in England by 2024 — ahead of the original target schedule. In areas where the programme has operated, referrals to CAMHS have stabilised rather than continued to rise, suggesting early in-school support is preventing some children from reaching crisis point. The government has committed to expanding to 100% coverage by 2027, which would represent the largest expansion of school-based mental health support in NHS history."
            source="Source: NHS England — Mental Health Support Teams in Schools and Colleges progress report 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/mental-health-statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Mental Health Services Monthly Statistics</a> — CAMHS referral, rejection, and waiting time data. Retrieved March 2026.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Children and Young People's Mental Health Services</a> — detailed breakdowns by region and care type. Retrieved March 2026.</p>
            <p className="mt-2">Referral counts include first contact referrals to CAMHS Tier 2 and Tier 3 services. Rejected referrals are those closed before first appointment or assessment. Wait times measure weeks from referral receipt to start of treatment. Data covers England only. Figures are annual aggregates of monthly data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
