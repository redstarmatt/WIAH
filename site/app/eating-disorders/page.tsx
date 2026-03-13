'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

const referralsData = [13200, 14100, 15800, 17600, 19400, 19100, 35200, 36100, 34800, 33200];
const urgentTargetData = [85, 84, 83, 82, 80, 79, 72, 73, 74, 75];
const routineTargetData = [65, 64, 63, 62, 60, 59, 52, 54, 55, 56];

const referralsSeries: Series[] = [
  {
    id: 'referrals',
    label: 'CAMHS eating disorder referrals',
    colour: '#E63946',
    data: referralsData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const referralsAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic' },
  { date: new Date(2021, 0, 1), label: '2021: 84% surge in referrals' },
];

const waitTimeSeries: Series[] = [
  {
    id: 'urgent',
    label: 'Urgent cases seen in 1 week (%)',
    colour: '#E63946',
    data: urgentTargetData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'routine',
    label: 'Routine cases seen in 4 weeks (%)',
    colour: '#F4A261',
    data: routineTargetData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const waitAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic demand surge' },
];

export default function EatingDisordersPage() {
  return (
    <>
      <TopicNav topic="Eating Disorders" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Eating Disorders"
          question="Is the Eating Disorder Crisis Worsening?"
          finding="Referrals for eating disorders rose 84% between 2019 and 2022 — particularly among girls aged 10–19 — and only 72% of urgent cases are seen within the 1-week target."
          colour="#E63946"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-referrals', label: 'Referrals' },
          { id: 'sec-waits', label: 'Waiting times' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="CAMHS eating disorder referrals (per year)"
              value="33,200"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Up 84% from 2019 · Girls aged 10–19: largest group · Anorexia nervosa highest risk"
              sparklineData={[17600, 19400, 19100, 35200, 36100, 34800, 33200]}
              source="NHS England — CYPED waiting times, 2024"
            />
            <MetricCard
              label="Urgent cases seen within 1 week (%)"
              value="72%"
              direction="down"
              polarity="down-is-bad"
              changeText="2023/24 · NHS target: 95% · 28% of urgent cases waiting longer than a week · Inpatient pressure rising"
              sparklineData={[80, 79, 72, 73, 74, 74, 75]}
              source="NHS England — CYPED waiting times, 2024"
            />
            <MetricCard
              label="Inpatient admissions (per year)"
              value="4,200"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Up 35% from 2019 · Average stay: 58 days · Many placed out of area · Average age: 15"
              sparklineData={[3100, 3300, 3600, 4600, 4500, 4300, 4200]}
              source="NHS Digital — Hospital Episode Statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-referrals" className="mb-12">
            <LineChart
              title="Eating disorder referrals to CAMHS, 2016–2024"
              subtitle="Annual referrals for eating disorders to Child and Adolescent Mental Health Services (CAMHS), England. Pandemic dramatically accelerated a pre-existing upward trend."
              series={referralsSeries}
              annotations={referralsAnnotations}
              yLabel="Referrals per year"
              source={{
                name: 'NHS England',
                dataset: 'Children and Young People Eating Disorders (CYPED) waiting times',
                url: 'https://www.england.nhs.uk/mental-health/cypmh/eating-disorders/cyped-statistics/',
                frequency: 'quarterly',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart
              title="Eating disorder waiting times — urgent and routine cases, 2018–2024"
              subtitle="Percentage of urgent cases seen within 1 week and routine cases seen within 4 weeks, England. Both targets have been persistently missed since the pandemic surge."
              series={waitTimeSeries}
              annotations={waitAnnotations}
              targetLine={{ value: 95, label: 'NHS target (urgent)' }}
              yLabel="% seen within target"
              source={{
                name: 'NHS England',
                dataset: 'CYPED waiting times statistics',
                url: 'https://www.england.nhs.uk/mental-health/cypmh/eating-disorders/cyped-statistics/',
                frequency: 'quarterly',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on eating disorders</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Referrals for eating disorders to child and adolescent mental health services (CAMHS) rose 84% between 2019 and 2022, from 19,100 to 35,200 per year. Girls aged 10–19 account for the largest proportion of referrals, with anorexia nervosa carrying the highest mortality risk of any psychiatric condition — an estimated 5–10% lifetime mortality rate. The pandemic dramatically accelerated a pre-existing upward trend: school closures, social isolation, and increased social media use during lockdowns are all associated with the surge in cases.</p>
              <p>NHS England's standard requires urgent eating disorder cases to be seen within one week and routine cases within four weeks. In 2023/24, only 72% of urgent cases met the one-week standard, against a target of 95%. Inpatient admissions have risen 35% since 2019, with many young people placed in units far from home — a consequence of a specialist bed shortage that has persisted despite successive government commitments to increase capacity.</p>
              <p>Eating disorders have the highest mortality rate of any mental health condition. Early intervention is strongly evidence-based: Family-Based Treatment (FBT) for adolescents has a good evidence base for full recovery if delivered promptly. The failure to meet waiting time targets means many young people deteriorate while waiting, increasing the likelihood of inpatient admission and longer recovery times.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What the evidence says works"
            value="95%"
            unit="recovery rate with early Family-Based Treatment — if seen quickly enough"
            description="Family-Based Treatment (FBT) for adolescent anorexia nervosa has strong evidence behind it: studies show up to 50% full recovery and 90% weight restoration when delivered within the first year of illness. The NHS's commitment to treating urgent cases within one week reflects this evidence. The problem is delivery capacity — not knowledge of what works. Increasing CAMHS eating disorder team funding and reducing waiting times to below four weeks for all cases would save lives and reduce costly inpatient admissions."
            source="Source: NHS England — CYPED waiting times 2023/24; BEAT Eating Disorders — research summary."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/mental-health/cypmh/eating-disorders/cyped-statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — CYPED waiting times statistics</a> — referrals and waiting time data. Updated quarterly.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Hospital Episode Statistics</a> — inpatient admissions data. Updated annually.</p>
            <p>All figures are for England. CAMHS eating disorder referrals data covers children and young people (CYP) services only; adult eating disorder referrals are not included.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
