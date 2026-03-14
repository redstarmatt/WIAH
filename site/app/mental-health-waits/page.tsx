'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Talking Therapies (formerly IAPT) monthly statistics', url: 'https://www.england.nhs.uk/mental-health/resources/talking-therapies/', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Mental health services monthly statistics', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/mental-health-monthly-statistics/', date: '2024' },
  { num: 3, name: 'Mental Health Foundation', dataset: 'Untreated mental health need estimates', date: '2024', url: 'https://www.mentalhealth.org.uk/our-work/research/' },
];

export default function MentalHealthWaitsPage() {
  // Average wait for IAPT/talking therapy (weeks) 2016–2024
  const avgWaitWeeks = [6.0, 6.5, 7.2, 8.1, 9.0, 10.2, 12.5, 15.3, 18.1];
  // % waiting >18 weeks for talking therapy 2016–2024
  const waitOver18wks = [8, 9, 10, 12, 14, 16, 22, 28, 35];
  // Referrals to NHS talking therapies (millions) 2018–2024
  const referrals = [1.2, 1.3, 1.4, 0.9, 1.4, 1.6, 1.8];
  // Seen within 18 weeks (millions) 2018–2024
  const seenWithin18 = [1.1, 1.2, 1.3, 0.8, 1.2, 1.3, 1.45];
  // Waiting list (millions) — sparkline
  const waitingList = [0.8, 1.0, 1.2, 1.4, 1.5, 1.7, 1.8, 1.9, 1.9];

  const chart1Series: Series[] = [
    {
      id: 'avgwait',
      label: 'Average wait for talking therapy (weeks)',
      colour: '#E63946',
      data: avgWaitWeeks.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
  ];

  const chart1TargetLine = { value: 6, label: 'NICE guideline: 6 weeks' };

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID disruption' },
    { date: new Date(2022, 0, 1), label: '2022: NHS Long Term Plan expansion' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'referrals',
      label: 'Referrals (millions)',
      colour: '#6B7280',
      data: referrals.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'seen',
      label: 'Seen within 18 weeks (millions)',
      colour: '#E63946',
      data: seenWithin18.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Mental Health Waits" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health Waits"
          question="How Long Do People Wait for Mental Health Treatment?"
          finding="1.9 million people are on NHS mental health waiting lists — average waits for talking therapy exceed 18 weeks in some trusts — and 8 million people with mental health needs receive no treatment."
          colour="#E63946"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Mental health waiting list (millions)"
              value="1.9"
              direction="up"
              polarity="up-is-bad"
              changeText="+137% since 2016 · record demand post-pandemic"
              sparklineData={waitingList}
              source="NHS England — Mental health services monthly statistics, 2024"
            />
            <MetricCard
              label="Waiting >18 weeks for talking therapy (%)"
              value="35"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 8% in 2016 · NICE guideline is 6 weeks"
              sparklineData={waitOver18wks}
              source="NHS England — IAPT/Talking Therapies statistics, 2024"
            />
            <MetricCard
              label="People with MH need receiving no treatment (millions)"
              value="8"
              direction="up"
              polarity="up-is-bad"
              changeText="estimated 75% of those with MH conditions untreated"
              sparklineData={[6.5, 6.8, 7.0, 7.2, 7.5, 7.7, 8.0, 8.0, 8.0]}
              source="Mental Health Foundation, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="NHS talking therapy average wait, 2016–2024"
              subtitle="Weeks from referral to first treatment appointment. England."
              series={chart1Series}
              targetLine={chart1TargetLine}
              annotations={chart1Annotations}
              yLabel="Average wait (weeks)"
              source={{
                name: 'NHS England',
                dataset: 'Talking Therapies (formerly IAPT) monthly statistics',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/mental-health/resources/talking-therapies/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Mental health referrals vs seen within 18 weeks, 2018–2024"
              subtitle="Millions. Gap between referrals and those seen within 18 weeks indicates unmet need."
              series={chart2Series}
              yLabel="Millions"
              source={{
                name: 'NHS England',
                dataset: 'Mental health services monthly statistics',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/mental-health-monthly-statistics/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">A system at capacity</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Around 1 in 4 adults experiences a mental health problem in any given year, and demand for NHS talking therapies has grown sharply since the COVID-19 pandemic.<Cite nums={1} /> The NHS Long Term Plan committed to expanding access, and referral volumes have risen — but the workforce has not expanded fast enough to match demand, and average waiting times have lengthened significantly.</p>
              <p>NICE guidelines recommend that people with common mental health conditions — anxiety, depression, OCD — receive their first treatment appointment within six weeks. The national average now exceeds 18 weeks in many trusts.<Cite nums={[1,2]} /> For more severe conditions requiring specialist secondary care, waits are longer still and data less complete.</p>
              <p>The Mental Health Foundation estimates that around 8 million people with mental health needs receive no treatment at all<Cite nums={3} /> — often because they never reach the referral threshold, cannot navigate the system, or have given up after previous unsuccessful attempts to access care. Children and young people face some of the longest waits, with CAMHS referral-to-treatment times averaging over 18 weeks in most areas.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/mental-health/resources/talking-therapies/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Talking Therapies (formerly IAPT) monthly statistics</a>. Monthly. Retrieved 2024.</p>
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/mental-health-monthly-statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Mental health services monthly statistics</a>. Monthly. Retrieved 2024.</p>
            <p>Waiting time figures are for England. Average wait calculated from referral to first treatment appointment for IAPT/Talking Therapies. Untreated need estimate from Mental Health Foundation analysis.</p>
          </div>
        </section>
      </main>
    </>
  );
}
