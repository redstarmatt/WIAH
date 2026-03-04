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
            <p>Hospital admissions for eating disorders in England doubled between 2011 and 2022, rising from around 14,000 to 28,000 a year, with 89% of inpatients female. The pandemic accelerated a trend that was already worsening: social isolation, disrupted daily routines, and the proliferation of body-image content on algorithmic platforms drove a sharp surge from 2020 onwards. Eating disorders carry the highest mortality rate of any mental health condition. Anorexia nervosa kills approximately 5&ndash;10% of patients per decade of illness &mdash; roughly one in five deaths are directly caused by the disorder itself, with the remainder from suicide and medical complications including heart failure and organ damage.</p>
            <p>The NHS target is for urgent eating disorder cases to be seen within one week and routine cases within four weeks. In practice, adult waiting times average 22 weeks nationally &mdash; and in some parts of England, adults are waiting more than two years for specialist treatment. The consequences of delay are not merely psychological. Prolonged malnutrition causes irreversible physical damage: cardiac arrhythmia, osteoporosis, and infertility. Children and young people face the worst delays. CAMHS eating disorder waiting times are among the longest in the mental health system; some young people deteriorate to the point of medical emergency and reach specialist care via A&amp;E rather than planned referral. Early intervention changes the trajectory dramatically: treatment within the first three years of illness onset achieves full recovery in 75&ndash;80% of cases.</p>
            <p>There is growing evidence that algorithmic social media platforms amplify body-image concerns at population scale. Internal Facebook research leaked by a whistleblower in 2021 found that Instagram made body image worse for 32% of teenage girls &mdash; a finding the company had suppressed. The Online Safety Act 2023 introduced provisions requiring platforms to protect users from content that promotes self-harm, including pro-eating-disorder material, though implementation and enforcement remain works in progress. Critics argue that without binding algorithmic transparency requirements and independent audit, the statutory duty of care will be difficult to enforce against platforms whose revenue model depends on maximising engagement with the very content causing harm.</p>
            <p>The funding gap between CAMHS demand and provision sits at the heart of the access crisis. NHS England&apos;s community eating disorder teams now cover all areas, but staffing shortfalls mean theoretical coverage rarely translates into timely treatment&mdash;consultant psychiatrists with eating disorder specialism are among the scarcest in the mental health workforce. Around 70% of inpatient eating disorder beds in England are now provided by the independent sector under NHS contract, reflecting chronic underinvestment in dedicated NHS provision; bed costs regularly exceed &pound;1,000 per night. The FREED pathway (First Episode Rapid Early Intervention for Eating Disorders), developed at South London and Maudsley NHS Trust, demonstrates that same-week assessment and treatment for young adults aged 16&ndash;25 can cut the duration of untreated illness by more than half&mdash;yet adoption across trusts remains patchy. Regional variation is substantial: some areas report median waits under 10 weeks for community treatment; others exceed 18 months. CAMHS services face structural pressure from rising referral volumes across all mental health conditions, meaning eating disorder cases compete for capacity with anxiety, depression, and neurodevelopmental assessments. The &pound;1.4bn CAMHS investment announced under the NHS Long Term Plan has not kept pace with the post-pandemic surge in referrals, and workforce pipelines for specialist dietitians and eating disorder nurses take years to build.</p>
            <p>Hospital admissions data, while the most reliable indicator available, captures only the most acute presentations&mdash;the fraction of cases severe enough to require inpatient or day-patient care. The vast majority of people with eating disorders are managed, or mismanaged, in the community, and no national prevalence register exists to count them. ICD-10 coding practices vary significantly between NHS trusts: the same clinical presentation may be coded as anorexia nervosa (F50.0), atypical anorexia (F50.1), or a broader eating disorder not otherwise specified, making trend comparisons across organisations unreliable. CAMHS waiting time data is collected inconsistently&mdash;some trusts measure from referral to first appointment, others from referral to commencement of treatment&mdash;so published averages are not directly comparable. NHS Digital&apos;s Mental Health Services Dataset captures some community contacts but undercounts eating disorder episodes where the primary presenting condition is coded differently. Population surveys such as the Adult Psychiatric Morbidity Survey are conducted infrequently (2014 is the most recent published wave) and rely on self-reporting, systematically undercounting eating disorders in men, older adults, and people from ethnic minority backgrounds where stigma and clinical recognition are lower. The true scale of undiagnosed illness&mdash;particularly atypical presentations of anorexia in people with higher body weights&mdash;remains largely invisible to official statistics.</p>
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
            onExpand={() => {}}
          />
          <MetricCard
            label="Average wait for eating disorder treatment (adults)"
            value={String(latestWaitTime?.avgWeeks || 22)}
            unit="weeks"
            direction="up"
            polarity="up-is-bad"
            changeText="Some areas 2+ years; target 4 weeks"
            sparklineData={data ? data.waitingTimes.map(d => d.avgWeeks) : []}
            source="NHS England · Adult Eating Disorder Services"
            onExpand={() => {}}
          />
          <MetricCard
            label="Eating disorder mortality rate"
            value="Highest"
            unit="of all MH conditions"
            direction="up"
            polarity="up-is-bad"
            changeText="1 in 5 deaths directly eating-disorder related"
            sparklineData={[1, 1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]}
            source="RANZCP · Mortality in Eating Disorders"
            onExpand={() => {}}
          />
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
