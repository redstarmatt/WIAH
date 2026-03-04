'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

interface ChildMentalHealthData {
  national: {
    camhsWaiting: Array<{ year: number; thousands: number }>
    selfHarmAdmissions: Array<{ year: number; per100k: number }>
    byCondition: Array<{ condition: string; pct: number }>
  }
}

export default function ChildMentalHealthPage() {
  const [data, setData] = useState<ChildMentalHealthData | null>(null)

  useEffect(() => {
    fetch('/data/child-mental-health/child_mental_health.json')
      .then(res => res.json())
      .then(setData)
  }, [])

  const camhsWaitingSeries: Series[] = data
    ? [
        {
          id: 'waiting',
          label: 'Children on waiting list',
          colour: '#E63946',
          data: data.national.camhsWaiting.map(d => ({
            date: yearToDate(d.year),
            value: d.thousands,
          })),
        },
      ]
    : []

  const selfHarmSeries: Series[] = data
    ? [
        {
          id: 'admissions',
          label: 'Hospital admissions per 100k',
          colour: '#E63946',
          data: data.national.selfHarmAdmissions.map(d => ({
            date: yearToDate(d.year),
            value: d.per100k,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Child mental health" />
      <main className="bg-white">
        <TopicHeader
          topic="child-mental-health"
          colour="#E63946"
          question="Are Children Getting the Mental Health Help They Need?"
          finding="Over 1.8 million under-18s are in contact with NHS mental health services &mdash; a record high &mdash; but half of those referred wait more than 18 weeks. Hospital admissions for self-harm among teenagers have risen 52% in a decade. Child and Adolescent Mental Health Services (CAMHS) in England have 127,000 on waiting lists, with some children waiting over two years."
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mx-auto px-4 sm:px-6 mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>One in five children aged 8&ndash;16 in England now has a probable mental health condition, according to NHS Digital&apos;s 2023 survey &mdash; up from one in nine in 2017. That shift is not simply better diagnosis. Hospital admissions for self-harm among under-18s have risen 52% over the decade, and eating disorder referrals to CAMHS increased 91% during the pandemic years, with girls aged 13&ndash;17 the most affected group. The system designed to catch these children was already under strain before demand accelerated.</p>
            <p>CAMHS waiting lists stood at 127,000 in 2023 &mdash; three times the 42,000 recorded in 2016. Half of those referred wait more than 18 weeks; some wait over two years. The Children&apos;s Commissioner estimates 70% of children with mental health problems do not receive the right treatment at the right time. The average age of onset for anxiety disorders is 11. The average wait for treatment in England is three years. Those two numbers, sitting next to each other, describe the structural problem more precisely than any policy document.</p>
            <p>The 2014 <em>Future in Mind</em> report set out a blueprint for improving CAMHS and was followed by the 2017 Green Paper committing to Mental Health Support Teams in every school. By 2024, those teams covered only 35% of England&apos;s schools &mdash; behind the original target. Only 35% of child mental health spending goes to community and early intervention; the majority flows to crisis and inpatient services, which are far more expensive and far less effective as a response to anxiety and depression in teenagers. Funding has followed demand upward rather than reshaping where demand arrives.</p>
            <p>There is genuine regional variation. Waiting times in some NHS trusts are substantially longer than others, and access to eating disorder services in particular is uneven &mdash; 30% of trusts are breaching the four-week routine waiting time standard. The &pound;79m of additional CAMHS investment announced by the government in 2023 does appear to have stabilised the waiting list rather than grown it further, which is a meaningful if modest shift. Right Care, Right Person &mdash; the programme redirecting mental health crisis calls away from police &mdash; is showing early promise in pilot areas, though the evidence base is still thin.</p>
            <p>What the data cannot tell us is how many children never make it onto a waiting list at all &mdash; those whose families did not seek help, whose schools did not refer, or who were triaged out at the point of contact. Survey prevalence estimates suggest the gap between need and referral is large. The data also cannot resolve whether rising prevalence reflects a genuine deterioration in children&apos;s mental health or, in part, a broadening of diagnostic thresholds and greater willingness to seek help. Both things may be true simultaneously, which makes the appropriate policy response harder to calibrate than the headline numbers suggest.</p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionNav
            sections={[
              { id: 'sec-overview', label: 'Overview' },
              { id: 'sec-context', label: 'Context' },
              { id: 'sec-charts', label: 'Charts' },
              { id: 'sec-sources', label: 'Sources' },
            ]}
          />
        </div>

        <section id="sec-overview" className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold text-wiah-black mb-8">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal>
              <MetricCard
                label="CAMHS waiting list"
                value="127"
                unit="thousand"
                direction="up"
                polarity="up-is-bad"
                sparklineData={data?.national.camhsWaiting.map(d => d.thousands) || []}
                changeText="2023 · Up from 42K in 2016 · 50% wait >18 weeks"
                source="NHS Digital, CAMHS activity data"
                onExpand={() => {}}
              />
            </ScrollReveal>

            <ScrollReveal>
              <MetricCard
                label="Hospital admissions for self-harm"
                value="284"
                unit="per 100k under-18s"
                direction="up"
                polarity="up-is-bad"
                sparklineData={data?.national.selfHarmAdmissions.map(d => d.per100k) || []}
                changeText="2022 · Up 52% since 2013 · Girls 3&times; more likely"
                source="NHS Digital, Hospital Episode Statistics"
                onExpand={() => {}}
              />
            </ScrollReveal>

            <ScrollReveal>
              <MetricCard
                label="Children in contact with NHS mental health services"
                value="1.8"
                unit="million"
                direction="up"
                polarity="up-is-bad"
                changeText="2023 · Record high · Up from 1.1M in 2019"
                source="NHS England, mental health activity"
                onExpand={() => {}}
              />
            </ScrollReveal>
          </div>
        </section>

        <section id="sec-charts" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
          <ScrollReveal>
            <LineChart
              title="CAMHS waiting list size"
              subtitle="Children on waiting lists in England, 2016&ndash;2023"
              series={camhsWaitingSeries}
              yLabel="Thousands"
              source={{
                name: 'NHS Digital',
                dataset: 'Child and Adolescent Mental Health Services activity data',
                frequency: 'quarterly',
              }}
            />
          </ScrollReveal>

          <ScrollReveal>
            <LineChart
              title="Hospital admissions for self-harm"
              subtitle="Under-18s admitted to hospital, per 100,000 population, 2013&ndash;2022"
              series={selfHarmSeries}
              yLabel="Rate per 100k"
              source={{
                name: 'NHS Digital',
                dataset: 'Hospital Episode Statistics',
                frequency: 'quarterly',
              }}
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-wiah-light p-8 rounded-lg">
              <h3 className="text-lg font-bold text-wiah-black mb-6">CAMHS referrals by primary presenting condition</h3>
              <div className="space-y-3">
                {data?.national.byCondition.map(d => (
                  <div key={d.condition}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-wiah-black">{d.condition}</span>
                      <span className="font-mono text-wiah-mid">{d.pct}%</span>
                    </div>
                    <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${d.pct}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="sec-sources" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          <div className="max-w-2xl space-y-3 font-mono text-sm text-wiah-mid">
            <p>NHS Digital &mdash; Child and Adolescent Mental Health Services (CAMHS) activity and outcomes data. Published quarterly. Retrieved March 2026.</p>
            <p>NHS Digital &mdash; Hospital Episode Statistics (HES). Admissions for intentional self-harm (ICD-10 codes X60&ndash;X84) among under-18s. Published quarterly. Retrieved March 2026.</p>
            <p>NHS England &mdash; Mental Health Services Monthly Activity Data. Total children aged under 18 in contact with specialist mental health services. Published monthly. Retrieved March 2026.</p>
            <p>All data relates to England only. CAMHS includes community-based assessment, brief intervention, and specialist treatment services. Waiting list figures reflect point-in-time snapshots at end of reporting period. Self-harm admission rates per 100,000 population standardised to 2013 mid-year estimates.</p>
          </div>
        </section>
      </main>
    </>
  )
}
