'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function SchoolMentalHealthSupportPage() {
  // Chart 1: CAMHS referrals vs seen within 18 weeks 2015-2024
  const referralsData = [280, 310, 340, 380, 420, 370, 520, 580, 610, 630];
  const seenData = [240, 260, 270, 290, 300, 260, 340, 360, 370, 375];
  const camhsSeries: Series[] = [
    {
      id: 'referrals',
      label: 'CAMHS referrals (thousands)',
      colour: '#E63946',
      data: referralsData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'seen',
      label: 'Seen within 18 weeks (thousands)',
      colour: '#2A9D8F',
      data: seenData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];
  const camhsAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: NHS Transformation Plan for CAMHS' },
    { date: new Date(2020, 0, 1), label: '2020: COVID spike in referrals' },
  ];

  // Chart 2: School-based mental health support rollout 2020-2024 (% schools covered)
  const mhstData = [4, 10, 18, 26, 35];
  const mhLeadData = [15, 20, 26, 30, 33];
  const rolloutSeries: Series[] = [
    {
      id: 'mhst',
      label: '% schools covered by Mental Health Support Teams',
      colour: '#2A9D8F',
      data: mhstData.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
    },
    {
      id: 'mh-lead',
      label: '% schools with trained mental health lead',
      colour: '#264653',
      data: mhLeadData.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
    },
  ];
  const rolloutTarget = { value: 100, label: '100% schools target' };

  return (
    <>
      <TopicNav topic="School Mental Health Support" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Mental Health Support"
          question="Are Schools Equipped to Support Pupils' Mental Health?"
          finding="Only 1 in 3 schools has a trained mental health lead — CAMHS waiting lists exceed 18 months in some areas — and 50% of mental health problems emerge before age 14."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-camhs', label: 'CAMHS referrals' },
          { id: 'sec-rollout', label: 'School support rollout' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Schools with trained MH lead"
              value="33%"
              direction="up"
              polarity="up-is-good"
              changeText="one in three schools · target is 100% by 2025"
              sparklineData={[15, 20, 26, 30, 33]}
              source="NHS England / DfE — Mental Health in Schools, 2024"
            />
            <MetricCard
              label="CAMHS average wait"
              value="18 weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="national average · 18+ months in worst areas"
              sparklineData={[12, 13, 14, 15, 16, 18, 20, 19, 18, 18]}
              source="NHS England — CYPMHS Statistics, 2024"
            />
            <MetricCard
              label="Pupils referred but not seen"
              value="255,000"
              direction="up"
              polarity="up-is-bad"
              changeText="waiting for CAMHS · rising faster than capacity"
              sparklineData={[140, 160, 180, 200, 220, 280, 270, 260, 258, 255]}
              source="NHS England — CYPMHS Waiting Times, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-camhs" className="mb-12">
            <LineChart
              title="CAMHS referrals vs seen within 18 weeks, England, 2015–2024 (thousands)"
              subtitle="Children and Adolescent Mental Health Services referrals and number seen within 18 weeks annually. The gap between referrals and those seen has widened significantly post-pandemic."
              series={camhsSeries}
              annotations={camhsAnnotations}
              yLabel="Children (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Mental Health Services Dataset — CYPMHS',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/mental-health/cyp/',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rollout" className="mb-12">
            <LineChart
              title="School-based mental health support rollout, 2020–2024 (% schools covered)"
              subtitle="Percentage of schools covered by Mental Health Support Teams and percentage with a trained Senior Mental Health Lead. Both metrics well below the 100% target."
              series={rolloutSeries}
              targetLine={rolloutTarget}
              yLabel="% schools covered"
              source={{
                name: 'NHS England / Department for Education',
                dataset: 'Mental Health Support Teams and Senior Mental Health Leads Programme',
                frequency: 'annual',
                url: 'https://www.gov.uk/guidance/senior-mental-health-leads-in-schools-and-colleges',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout>
            Mental Health Support Teams (MHSTs) — jointly staffed by NHS and school-based workers — deliver early intervention for mild to moderate mental health issues without requiring a CAMHS referral. Where they operate, they reduce the number of pupils reaching crisis point. The government committed to covering all schools by 2025, though that target is unlikely to be met on current rollout pace.
          </PositiveCallout>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on school mental health support</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>One in five children and young people has a probable mental health disorder — a figure that has risen substantially since 2017, when the NHS first began large-scale prevalence tracking. Half of all lifelong mental health problems emerge before the age of 14. Schools are therefore the most logical place to identify, support and intervene early, yet only a third of schools have a trained Senior Mental Health Lead, and only 35% are covered by a Mental Health Support Team. Most children who need support must wait for CAMHS — a service so overwhelmed that the average wait nationally is 18 weeks and some areas report waits of 18 months or more.</p>
              <p>CAMHS referrals reached 630,000 in 2024 — more than double the 2015 figure — driven by rising prevalence of anxiety, depression, eating disorders and self-harm, particularly among girls. Around 255,000 children are waiting for CAMHS at any given time. The impact is not merely on those children: teachers report spending growing proportions of their time managing mental health crises, and persistent absence — itself strongly correlated with mental health difficulties — has reached levels unseen since comparable records began.</p>
              <p>The systemic gap is between the language of early intervention and the funding reality that delivers it. Early intervention requires investment in school-based support, educational psychologists, and community teams working below the CAMHS threshold. These services have been cut substantially since 2010. Children wait until they are in crisis, enter CAMHS at a more acute and harder-to-treat stage, and emerge from a system that cannot adequately hold them without school-based support to land safely back into. The cycle is expensive and avoidable.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/mental-health/cyp/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — Mental Health Services Dataset (MHSDS), Children and Young People Mental Health Services statistics. Published monthly.</p>
            <p><a href="https://www.gov.uk/guidance/senior-mental-health-leads-in-schools-and-colleges" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Education</a> — Senior Mental Health Leads programme data. Published annually.</p>
            <p>CAMHS waiting time figures are based on NHS England published waiting time distributions. The 18-month figure in some areas is from NHS Benchmarking Network data and CQC reports. Prevalence figures (1 in 5 children) from NHS Digital Mental Health of Children and Young People in England surveys.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
