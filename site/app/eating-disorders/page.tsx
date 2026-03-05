'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface EatingDisordersData {
  hospitalAdmissions: { year: number; admissions: number }[]
  waitingTimes: { year: number; avgWeeks: number }[]
  byDiagnosis: { diagnosis: string; pctAdmissions: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EatingDisordersPage() {
  const [data, setData] = useState<EatingDisordersData | null>(null)

  useEffect(() => {
    fetch('/data/eating-disorders/eating_disorders.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  // Hospital admissions series
  const admissionsSeries: Series[] = data
    ? [{
        id: 'admissions',
        label: 'Hospital admissions',
        colour: '#264653',
        data: data.hospitalAdmissions.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
      }]
    : []

  const admissionsAnnotations: Annotation[] = [
    { date: new Date(2020, 6, 1), label: 'COVID-19: pandemic-linked surge' },
  ]

  // Waiting times series
  const waitingTimesSeries: Series[] = data
    ? [{
        id: 'waitingTimes',
        label: 'Average wait time',
        colour: '#E63946',
        data: data.waitingTimes.map(d => ({
          date: yearToDate(d.year),
          value: d.avgWeeks,
        })),
      }]
    : []

  // Latest values
  const latestAdmissions = data?.hospitalAdmissions.at(-1)
  const latestWaitTime = data?.waitingTimes.at(-1)

  return (
    <>
      <TopicNav topic="Eating Disorders" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Eating Disorders"
          question="How Serious is the Eating Disorder Crisis?"
          finding="Hospital admissions for eating disorders have doubled since 2011 and NHS waiting times for treatment &mdash; sometimes exceeding two years &mdash; regularly cause irreversible physical harm."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Hospital admissions for eating disorders in England doubled between 2011 and 2022, rising from around 14,000 to 28,000 a year &mdash; 89% of inpatients are female. The pandemic accelerated a trend already worsening: social isolation and the proliferation of body-image content on algorithmic platforms drove a sharp surge from 2020 onwards, and hospital admissions data captures only the most acute presentations. Eating disorders carry the highest mortality rate of any mental health condition: anorexia nervosa kills approximately 5&ndash;10% of patients per decade of illness. The NHS target requires urgent cases to be seen within one week and routine cases within four weeks; in practice, adult waiting times average 22 weeks nationally and in some areas exceed two years. Around 70% of inpatient eating disorder beds are now provided by the independent sector under NHS contract, reflecting chronic underinvestment in dedicated NHS capacity; bed costs regularly exceed &pound;1,000 per night. The FREED pathway &mdash; same-week assessment for young adults &mdash; demonstrates that early intervention can cut untreated illness duration by more than half, but adoption across NHS trusts remains patchy.</p>
            <p>The consequences of delay are physical as well as psychological: prolonged malnutrition causes irreversible cardiac, skeletal, and hormonal damage, meaning each month of waiting has costs that later treatment cannot fully reverse. Children and young people face the worst delays, with some deteriorating to medical emergency before reaching specialist care. The Online Safety Act 2023 introduced a duty on platforms to protect users from pro-eating-disorder content, but critics argue enforcement against platforms whose revenue depends on engagement will require binding algorithmic transparency and independent audit that the Act does not currently guarantee. The &pound;1.4bn CAMHS investment under the NHS Long Term Plan has not kept pace with the post-pandemic surge, and specialist workforce pipelines &mdash; eating disorder psychiatrists, dietitians, clinical psychologists &mdash; take years to rebuild.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-admissions', label: 'Hospital Admissions' },
          { id: 'sec-waiting', label: 'Waiting Times' },
          { id: 'sec-diagnosis', label: 'By Diagnosis' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="NHS eating disorder hospital admissions"
            value={(latestAdmissions?.admissions || 28000).toLocaleString()}
            unit="/yr"
            direction="up"
            polarity="up-is-bad"
            changeText={`Doubled since 2011; 89% female`}
            sparklineData={data ? data.hospitalAdmissions.map(d => d.admissions) : []}
            source="NHS Digital · Hospital Episode Statistics"
            href="#sec-admissions"/>
          <MetricCard
            label="Average wait for eating disorder treatment (adults)"
            value={String(latestWaitTime?.avgWeeks || 22)}
            unit="weeks"
            direction="up"
            polarity="up-is-bad"
            changeText="Some areas 2+ years; target 4 weeks"
            sparklineData={data ? data.waitingTimes.map(d => d.avgWeeks) : []}
            source="NHS England · Adult Eating Disorder Services"
            href="#sec-waiting"/>
          <MetricCard
            label="Eating disorder mortality rate"
            value="Highest"
            unit="of all MH conditions"
            direction="up"
            polarity="up-is-bad"
            changeText="1 in 5 deaths directly eating-disorder related"
            sparklineData={[1, 1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]}
            source="RANZCP · Mortality in Eating Disorders"
            href="#sec-diagnosis"/>
        </div>
        </ScrollReveal>

        {/* Hospital admissions chart */}
        <ScrollReveal>
        <section id="sec-admissions" className="mb-12">
          <LineChart
            title="Eating disorder hospital admissions, England"
            subtitle="Annual hospital admissions with a primary diagnosis of eating disorder. NHS Digital."
            series={admissionsSeries}
            annotations={admissionsAnnotations}
            yLabel="Admissions per year"
          />
        </section>
        </ScrollReveal>

        {/* Waiting times chart */}
        <ScrollReveal>
        <section id="sec-waiting" className="mb-12">
          <LineChart
            title="Average waiting time for eating disorder treatment (adults), England"
            subtitle="Weeks. NHS England. The four-week target is rarely met outside of urgent cases."
            series={waitingTimesSeries}
            targetLine={{ value: 4, label: 'NHS urgent target: 4 weeks' }}
            yLabel="Weeks"
          />
        </section>
        </ScrollReveal>

        {/* Diagnosis breakdown */}
        <ScrollReveal>
        <section id="sec-diagnosis" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-6">Hospital admissions by eating disorder diagnosis</h3>
          <div className="space-y-3">
            {data?.byDiagnosis.map(item => (
              <div key={item.diagnosis} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-40 text-sm text-wiah-black">
                  {item.diagnosis}
                </div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 bg-[#264653] rounded"
                    style={{ width: `${(item.pctAdmissions / 50) * 100}%` }}
                  />
                </div>
                <div className="flex-shrink-0 w-12 text-right font-mono text-sm text-wiah-black">
                  {item.pctAdmissions}%
                </div>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="Early intervention dramatically improves outcomes"
          value="75&ndash;80"
          unit="%"
          description="Research consistently shows that early intervention for eating disorders &mdash; within the first three years of illness onset &mdash; achieves full recovery in 75&ndash;80% of cases. Long delays mean the illness becomes entrenched. The First Episode Rapid Early Intervention for Eating Disorders (FREED) pathway, adopted by some NHS trusts, has reduced waits to under 4 weeks with significantly better outcomes."
          source="Eating Disorders Association · FREED Programme Evaluation"
        />
        </ScrollReveal>
      </main>
    </>
  )
}
