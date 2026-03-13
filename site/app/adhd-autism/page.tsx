'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Autism assessment waiting list (thousands), 2016–2024 — NHS Digital MHSDS
const autismWaitingValues = [54, 62, 75, 91, 105, 128, 155, 172, 187];

// ADHD referrals per year (thousands), 2018–2024 — NHS Digital MHSDS
const adhdReferralValues = [80, 82, 75, 110, 145, 175, 200];

// Average wait for assessment (months) national vs North East, 2018–2024
const nationalWaitValues = [16, 18, 22, 28, 33, 36, 37];
const northEastWaitValues = [20, 23, 28, 36, 40, 43, 45];

const series1: Series[] = [
  {
    id: 'autism-waiting',
    label: 'People waiting for autism assessment (thousands)',
    colour: '#E63946',
    data: autismWaitingValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'national-wait',
    label: 'National average wait (months)',
    colour: '#264653',
    data: nationalWaitValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'ne-wait',
    label: 'North East average wait (months)',
    colour: '#E63946',
    data: northEastWaitValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 disruption' },
  { date: new Date(2023, 0, 1), label: '2023: NICE ADHD guidelines updated' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Digital', dataset: 'Mental Health Services Dataset (MHSDS)', url: 'https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set', date: '2024' },
  { num: 2, name: 'NICE', dataset: 'Autism spectrum disorder in adults: diagnosis and management (NG142)', url: 'https://www.nice.org.uk/guidance/ng142', date: '2021' },
  { num: 3, name: 'NICE', dataset: 'Attention deficit hyperactivity disorder: diagnosis and management (NG87)', url: 'https://www.nice.org.uk/guidance/ng87', date: '2023' },
];

export default function AdhdAutismPage() {
  return (
    <>
      <TopicNav topic="Mental Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="Why is it so hard to get an ADHD or autism diagnosis?"
          finding="The autism assessment waiting list has tripled since 2016 to 187,000 people. ADHD referrals have surged 150% in six years, overwhelming services that were never resourced for this level of demand. Average waits now exceed three years in some regions."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England is in the middle of a diagnostic waiting crisis for ADHD and autism that shows no sign of resolving. As of 2024, approximately 187,000 people are waiting for an autism assessment through the NHS — a figure that has more than tripled since 2016 — while ADHD referral volumes have risen from around 80,000 per year in 2018 to over 200,000 in 2024.<Cite nums={1} /> NICE guidelines state that autism assessments should begin within three months of referral.<Cite nums={2} /> In practice, the national average wait is now 37 months, and in some areas of the North East it exceeds three and a half years.<Cite nums={1} /> Several forces are driving this surge simultaneously: greater public awareness accelerated by social media, the Right to Choose policy opening new pathways, and systematic underdiagnosis of women and girls whose presentations differ from the male-calibrated screening tools.</p>
            <p>The consequences are not abstract. Adults waiting years for an ADHD assessment report deteriorating mental health, job loss, and relationship breakdown. Children waiting for autism diagnosis miss the window for early intervention that evidence shows is most effective. Schools are legally required to support children with special educational needs regardless of diagnosis, but in practice many refuse to make adjustments without a formal assessment — creating a circular trap. NICE guidelines on ADHD management, updated in 2023 for the first time since 2008, recommend a whole-life-course approach, yet most adult services were commissioned for a fraction of current demand.<Cite nums={3} /> Without dedicated investment in diagnostic capacity, the waiting list will continue to grow.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Autism waiting list' },
          { id: 'sec-chart2', label: 'Regional waits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Waiting for autism assessment"
              value="187,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+246% since 2016 · tripled in eight years"
              sparklineData={autismWaitingValues}
              source="NHS Digital · Mental Health Services Dataset 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="ADHD referrals per year"
              value="200,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+150% since 2018 · demand far exceeds capacity"
              sparklineData={adhdReferralValues}
              source="NHS Digital · Mental Health Services Dataset 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average wait for assessment"
              value="37"
              unit="months (2024)"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 16 months in 2018 · NICE target: 3 months"
              sparklineData={nationalWaitValues}
              source="NHS Digital · MHSDS referral-to-treatment 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="People waiting for autism assessment, England, 2016–2024"
              subtitle="Total number on NHS autism diagnostic pathway waiting list. Tripled since 2016. NICE guideline target is assessment within 3 months."
              series={series1}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID-19' }]}
              yLabel="People waiting (thousands)"
              source={{ name: 'NHS Digital', dataset: 'Mental Health Services Dataset (MHSDS)', url: 'https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average wait for neurodevelopmental assessment, 2018–2024"
              subtitle="Median months from referral to first diagnostic appointment: national average (blue) vs North East (red). NICE target is 3 months."
              series={series2}
              annotations={annotations}
              yLabel="Months"
              source={{ name: 'NHS Digital', dataset: 'MHSDS referral-to-treatment waiting times', url: 'https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Right to Choose and Oliver McGowan Training"
            value="1.4M staff trained"
            unit="in autism and learning disability awareness"
            description="Two structural changes offer genuine progress. The Right to Choose policy allows patients to request referral to any qualified provider — including private services funded by the NHS — bypassing local waiting lists. Separately, the Oliver McGowan Mandatory Training on Learning Disability and Autism is now the required standard for all health and social care staff in England. Named after Oliver McGowan, whose death in 2016 was caused by failures in understanding his autism, the programme is co-delivered by autistic people. By early 2026, over 1.4 million staff had completed the training — the largest autism-specific workforce programme in NHS history."
            source="Source: NHS England — Right to Choose guidance 2023. Health Education England — Oliver McGowan Mandatory Training 2026."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Mental Health Services Dataset (MHSDS)</a> — monthly data on referrals, waiting lists, and treatment outcomes.</p>
            <p>Waiting list figures are point-in-time snapshots. NICE guidelines (NG142 for autism, NG87 for ADHD) specify assessment should begin within 3 months of referral. Data covers England only.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
