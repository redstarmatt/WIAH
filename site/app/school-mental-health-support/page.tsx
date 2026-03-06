'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface SchoolMentalHealthDataPoint {
  year: number
  mhstCoveragePct: number
  counsellorSchools: number
}

interface SchoolMentalHealthData {
  topic: string
  lastUpdated: string
  timeSeries: SchoolMentalHealthDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function SchoolMentalHealthSupportPage() {
  const [data, setData] = useState<SchoolMentalHealthData | null>(null)

  useEffect(() => {
    fetch('/data/school-mental-health-support/school_mental_health_support.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'mhst-coverage',
          label: 'Pupil coverage by MHSTs',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mhstCoveragePct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are Schools Equipped to Support Children's Mental Health?"
          finding="Only 1 in 3 schools has a mental health lead, and 75% of young people with mental health problems wait more than a year before receiving help."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>One in six children aged 7–16 had a probable mental health condition in 2023, up from one in nine in 2017. Mental Health Support Teams (MHSTs) — joint NHS/education early intervention teams — covered 35% of pupils in England by 2024, up from 7% in 2019, but the target of 100% coverage has been pushed back repeatedly, most recently to 2027–28. The average wait for a CAMHS assessment was 18 weeks nationally in 2024; an estimated 30–40% of children referred do not meet CAMHS thresholds and fall into a &ldquo;missing middle&rdquo; with no alternative provision. The government's counsellor in every secondary school programme had reached approximately 3,100 schools by 2024, leaving around 3,400 secondary schools without a dedicated counsellor. The 2024 Children's Wellbeing Act committed to a suicide prevention duty on schools, but adequate CAMHS capacity remains unresolved.</p>
            <p>The burden of the gap falls on children from deprived backgrounds, who are more likely to experience mental health difficulties, less likely to have access to private therapy, and more likely to face long waits for CAMHS in areas where NHS capacity is thinnest. Improved teacher identification without improved access to intervention creates its own problem: more children being recognised as struggling, referred, and then waiting months or years for help. For children with complex or severe needs, school counselling is not a substitute for clinical intervention — but it is often all that is available.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Schools with mental health lead"
              value="35%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+18pp since 2019 · target 100% by 2028"
              sparklineData={[7, 9, 12, 16, 20, 25, 28, 31, 35]}
              source="NHS England · Mental Health Support Teams in Education 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Young people waiting >1yr for help"
              value="75%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="3 in 4 wait 1+ years before receiving help"
              sparklineData={[65, 67, 68, 70, 72, 74, 75, 75, 75]}
              source="Mental Health Foundation · YoungMinds Report 2024"
              href="#sec-chart"/>
            <MetricCard
              label="School-based counsellors"
              value="3,100"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+1,200 since 2020 · 3,400 schools still without"
              sparklineData={[1200, 1400, 1600, 1900, 1900, 1800, 2100, 2600, 3100]}
              source="DfE · School Workforce Census 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Mental health support coverage in schools, 2016–2024"
              subtitle="Percentage of pupils covered by Mental Health Support Teams."
              series={series}
              yLabel="Pupil coverage (%)"
              source={{ name: 'NHS England', dataset: 'Mental Health Support Teams in Education', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">NHS England</strong> — Mental Health Support Teams in Education. Annual coverage data from the NHS Long Term Plan MHST programme.</p>
            <p><strong className="text-wiah-black">DfE</strong> — School Workforce Census. Annual data on school counsellor staffing in maintained schools and academies.</p>
            <p><strong className="text-wiah-black">Mental Health Foundation / YoungMinds</strong> — Children and Young People's Mental Health: State of the Nation. 2024 survey of waiting times and access.</p>
            <p>Note: MHST coverage figures for 2016–2018 are estimates based on pilot data prior to national programme rollout.</p>
          </div>
        </section>
      </main>
    </>
  )
}
