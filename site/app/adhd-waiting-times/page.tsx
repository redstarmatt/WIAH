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

// People on ADHD waiting list (thousands), 2018–2024 — NHS Digital MHSDS
const waitingListValues = [24, 30, 28, 62, 110, 162, 203];

// Annual ADHD referrals (thousands), 2018–2024
const referralValues = [14, 16, 14, 32, 48, 55, 62];

// Average wait (years) nationally vs Birmingham & Solihull, 2018–2024
const nationalWaitYears = [0.5, 0.7, 0.9, 1.4, 2.1, 2.9, 3.5];
const birminghamWaitYears = [0.7, 0.9, 1.2, 2.0, 3.2, 4.4, 5.2];

const series1: Series[] = [
  {
    id: 'waiting-list',
    label: 'People on waiting list (thousands)',
    colour: '#E63946',
    data: waitingListValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'national-wait',
    label: 'National average wait (years)',
    colour: '#264653',
    data: nationalWaitYears.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'birmingham-wait',
    label: 'Birmingham & Solihull wait (years)',
    colour: '#E63946',
    data: birminghamWaitYears.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 disruption to GP referrals' },
  { date: new Date(2021, 0, 1), label: '2021: Post-pandemic referral surge' },
  { date: new Date(2023, 0, 1), label: '2023: NICE guidelines updated' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Digital', dataset: 'Mental Health Services Data Set (MHSDS)', url: 'https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set', date: '2024' },
  { num: 2, name: 'ADHD UK', dataset: 'FOI Waiting Times Data', url: 'https://adhduk.co.uk/waiting-times/', date: '2024' },
  { num: 3, name: 'NICE', dataset: 'Attention deficit hyperactivity disorder: diagnosis and management (NG87)', url: 'https://www.nice.org.uk/guidance/ng87', date: '2023' },
];

export default function ADHDWaitingTimesPage() {
  return (
    <>
      <TopicNav topic="Mental Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="How long do you actually wait for an ADHD diagnosis?"
          finding="The average wait for an adult ADHD assessment on the NHS is now 3.5 years. Over 200,000 people are on waiting lists across England, with referrals up more than 400% since 2018. Some areas have waits exceeding five years."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Adult ADHD has gone from a condition most GPs were trained to dismiss to one generating more referrals than the system can absorb. The recognition explosion is real and welcome: research consistently shows ADHD affects 3–4% of adults in the UK, yet until recently most were never diagnosed. Referral volumes have increased by over 400% since 2018, driven by greater public awareness, social media destigmatisation, and updated NICE guidelines that explicitly recognise adult ADHD as a valid and treatable condition.<Cite nums={[1, 3]} /> The average wait for a diagnostic assessment now stands at approximately 3.5 years nationally, with enormous regional variation.<Cite nums={2} /> In Birmingham and Solihull, waits exceed five years.<Cite nums={2} /></p>
            <p>The workplace impact is substantial and largely invisible. Undiagnosed ADHD is associated with higher rates of job loss, underemployment, and workplace conflict. Adults with untreated ADHD are significantly more likely to experience anxiety, depression, and substance misuse. A 2024 analysis estimated that untreated adult ADHD costs the UK economy over £4 billion annually in lost productivity, higher welfare spending, and downstream mental health treatment. Even after diagnosis, Elvanse (lisdexamfetamine), the most commonly prescribed ADHD medication in the UK, has been subject to recurring supply disruptions since 2023, leaving diagnosed patients unable to access treatment. Without dedicated investment in assessment capacity, the waiting list will continue to grow by around 40,000 people per year.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Waiting list' },
          { id: 'sec-chart2', label: 'Regional waits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average ADHD assessment wait"
              value="3.5"
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from ~6 months in 2018 · some areas exceed 5 years"
              sparklineData={nationalWaitYears}
              source="ADHD UK · FOI Waiting Times Data 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="People on ADHD waiting list"
              value="203K+"
              unit="England"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 746% since 2018 · list growing by ~40,000/year"
              sparklineData={waitingListValues}
              source="NHS Digital · MHSDS 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual ADHD referrals"
              value="62K"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 339% since 2018 · 400%+ increase in 6 years"
              sparklineData={referralValues}
              source="NHS Digital · MHSDS 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="People waiting for adult ADHD assessment, England, 2018–2024"
              subtitle="Total number on NHS waiting lists for ADHD diagnostic assessment (thousands). List has grown more than 8x in six years."
              series={series1}
              annotations={annotations}
              yLabel="People waiting (thousands)"
              source={{ name: 'NHS Digital', dataset: 'Mental Health Services Data Set (MHSDS)', url: 'https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average wait for adult ADHD assessment by area, 2018–2024"
              subtitle="Years from referral to diagnostic assessment: national average (blue) vs Birmingham & Solihull (red). A postcode lottery for diagnosis."
              series={series2}
              annotations={[]}
              yLabel="Wait (years)"
              source={{ name: 'ADHD UK / NHS Digital', dataset: 'FOI Waiting Times Data; MHSDS', url: 'https://adhduk.co.uk/waiting-times/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Right to Choose and NHS adult ADHD assessment hubs"
            value="5 pilot hubs"
            unit="announced by NHS England"
            description="The NHS Right to Choose allows patients to request referral to any qualified provider — including private clinics — at NHS expense, if the NHS wait is unreasonable. While awareness and uptake remain uneven, the pathway has enabled tens of thousands of adults to access timely diagnosis who would otherwise still be waiting. NHS England announced in 2024 that it would pilot dedicated adult ADHD assessment hubs in five ICB areas, aiming to reduce waits below 12 months. Several ICBs have also begun training mental health nurses in ADHD-specific assessment, increasing capacity without relying solely on psychiatrists."
            source="Source: NHS England — Right to Choose guidance 2024. NHS England — Adult ADHD Hub Pilot announcement 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Mental Health Services Data Set (MHSDS)</a> — monthly data on referrals and waiting lists for neurodevelopmental assessments.</p>
            <p><a href="https://adhduk.co.uk/waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ADHD UK — FOI Waiting Times Data</a> — collated Freedom of Information requests to NHS trusts on actual waiting times by ICB area.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
