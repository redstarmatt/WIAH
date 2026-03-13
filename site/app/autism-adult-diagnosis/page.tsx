'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Adults on autism assessment waiting lists (thousands), 2016–2024 — NHS Digital
const waitingListValues = [21, 28, 36, 48, 63, 72, 88, 105, 116];

// Annual referrals for adult autism assessment (thousands), 2016–2024 — NHS MHSDS
const referralValues = [12.8, 16.4, 21.2, 28.6, 37.4, 38.1, 52.8, 60.2, 65.4];

// Average national wait years, 2016–2024 — NHS Digital
const nationalWaitValues = [1.2, 1.5, 1.9, 2.3, 2.8, 3.0, 3.2, 3.5, 3.6];

// North East vs national average wait (years), 2018–2024
const neWaitValues = [2.8, 3.4, 4.0, 4.6, 5.0, 5.2, 5.4];
const nationalWaitFrom2018 = [1.9, 2.3, 2.8, 3.0, 3.2, 3.5, 3.6];

const series1: Series[] = [
  {
    id: 'waiting-list',
    label: 'Adults on autism assessment waiting list (thousands)',
    colour: '#E63946',
    data: waitingListValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v * 1000 })),
  },
  {
    id: 'referrals',
    label: 'Annual referrals (thousands)',
    colour: '#264653',
    data: referralValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v * 1000 })),
  },
];

const series2: Series[] = [
  {
    id: 'north-east-wait',
    label: 'North East average wait (years)',
    colour: '#E63946',
    data: neWaitValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'national-wait',
    label: 'National average wait (years)',
    colour: '#264653',
    data: nationalWaitFrom2018.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID disrupts referrals' },
  { date: new Date(2023, 0, 1), label: '2023: Oliver McGowan mandatory autism training begins' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Digital', dataset: 'Autism Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/autism-statistics', date: '2024' },
  { num: 2, name: 'NHS Digital', dataset: 'Mental Health Services Dataset (MHSDS)', url: 'https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set', date: '2024' },
  { num: 3, name: 'NICE', dataset: 'Autism spectrum disorder in adults: diagnosis and management (CG142)', url: 'https://www.nice.org.uk/guidance/cg142', date: '2021' },
  { num: 4, name: 'NAO', dataset: 'Support for autistic people', url: 'https://www.nao.org.uk/reports/support-for-autistic-people/', date: '2023' },
  { num: 5, name: 'ONS', dataset: 'Labour Force Survey — Disability and Employment', date: '2023' },
];

export default function AutismAdultDiagnosisPage() {
  return (
    <>
      <TopicNav topic="Care & Support" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care & Support"
          question="How long do adults actually wait for an autism diagnosis?"
          finding="The average adult waits 3.6 years for an NHS autism diagnosis. Over 116,000 people are on waiting lists across England — a fivefold increase since 2016. Referral volumes have risen 411% in eight years as recognition grows, but services remain static. No region meets the NICE 13-week standard."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The story is not simply that waiting lists are long — though they are, catastrophically so — but that a generation of adults is discovering they are autistic after decades of living without understanding why the world felt so consistently difficult. Referrals for adult autism assessment have risen from around 12,800 in 2016 to over 65,000 in 2024.<Cite nums={2} /> This is not an epidemic. It is recognition: diagnostic criteria that were written around white boys in the 1990s are finally being applied to the full population. Women and people assigned female at birth are systematically underdiagnosed — autistic women are diagnosed on average four to five years later than men, often after decades of having their distress attributed to anxiety, depression, or personality disorders.<Cite nums={1} /> The concept of masking — suppressing autistic behaviours to fit social expectations — means many adults present as coping while experiencing chronic burnout and mental health crises that clinicians fail to connect to underlying neurodevelopmental difference.</p>
            <p>The consequences of late or absent diagnosis are severe. Autistic adults without diagnosis are significantly more likely to experience depression, anxiety, and suicidal ideation. Just 22% of autistic adults are in any form of employment — the lowest rate of any disability group.<Cite nums={5} /> The Autism Act 2009 placed duties on local authorities and NHS bodies to provide diagnostic services and support, but a National Audit Office review found that most areas have no post-diagnostic support at all.<Cite nums={4} /> The average wait has grown from 1.2 years in 2016 to 3.6 years in 2024.<Cite nums={1} /> In some areas, waits exceed five years.<Cite nums={1} /> NICE guidelines recommend no more than 13 weeks from referral to first appointment.<Cite nums={3} /> Virtually no service in England meets this standard. The only alternative to an NHS wait is private assessment, costing £1,500–£3,000 — making diagnosis a privilege of the financially secure, deepening existing inequalities in who gets recognised.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Waiting list & referrals' },
          { id: 'sec-chart2', label: 'Regional waits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average wait for adult autism diagnosis"
              value="3.6 years"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1.2 years in 2016 · NICE target: 13 weeks"
              sparklineData={nationalWaitValues}
              source="NHS Digital — Autism Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Adults on autism assessment waiting list"
              value="116K"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+442% since 2016 · up from 21,000"
              sparklineData={waitingListValues}
              source="NHS Digital — Autism Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual referrals for assessment"
              value="65,400"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+411% since 2016 · demand massively outstripping capacity"
              sparklineData={referralValues}
              source="NHS Digital — Mental Health Services Dataset 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adults on autism waiting lists and annual referrals, England, 2016–2024"
              subtitle="Waiting list (red) and annual referrals (blue) both in thousands. Referrals have risen over 400% — the gap between demand and capacity is widening every year."
              series={series1}
              annotations={annotations}
              yLabel="People"
              source={{ name: 'NHS Digital', dataset: 'Autism Statistics; Mental Health Services Dataset', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/autism-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average wait for adult autism diagnosis: North East vs national, 2018–2024"
              subtitle="Average years from referral to diagnostic assessment. North East (red) consistently the worst-performing region. No region meets the NICE 13-week standard."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID worsens backlog across all regions' }]}
              yLabel="Years"
              source={{ name: 'NHS Digital', dataset: 'Autism Statistics — Regional Breakdowns', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/autism-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Oliver McGowan mandatory training — autism understanding in every care setting"
            value="2023"
            unit="mandatory autism training begins for all health and social care staff"
            description="The Oliver McGowan Mandatory Training on Learning Disability and Autism became a legal requirement for all health and social care staff in England from 2023, ensuring that professionals understand autistic people's needs and can make reasonable adjustments. The Autism Act 2009 remains the only disability-specific legislation in England. The government's Autistic People and Other Neurodivergent Conditions Strategy 2021–2026 commits to reducing waiting times, improving employment support, and expanding post-diagnostic services. While enforcement remains weak and waits continue to grow, the legal framework establishing autistic adults' rights to diagnosis and support is stronger than it has ever been. The challenge is translating this into funded, staffed diagnostic capacity."
            source="Source: Health and Care Act 2022 (Oliver McGowan training). DHSC — National Strategy for Autistic Children, Young People and Adults 2021–2026. National Autistic Society — Employment Gap report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/autism-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Autism Statistics</a> — annual publication. Waiting list size and wait times for adult autism diagnostic assessment. Data from the Mental Health Services Dataset (MHSDS).</p>
            <p>Average wait is measured from date of referral to date of first autism diagnostic assessment appointment. The NICE guideline (2012, updated 2021) recommends that first appointment should be within 13 weeks of referral. Regional data is for NHS England regions. Private assessments are not captured. The employment figure (22% of autistic adults in employment) is from the ONS Labour Force Survey 2023.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
