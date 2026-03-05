'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface SchoolAbsenceRow {
  year: number
  persistentAbsentPct?: number
  severeAbsent?: number
  authorisedIllnessPct?: number
}

interface SchoolAbsenceTrendsData {
  topic: string
  lastUpdated: string
  timeSeries: SchoolAbsenceRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SchoolAbsenceTrendsPage() {
  const [data, setData] = useState<SchoolAbsenceTrendsData | null>(null)

  useEffect(() => {
    fetch('/data/school-absence-trends/school_absence_trends.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const persistentAbsentSeries: Series[] = data
    ? [
        {
          id: 'persistentAbsent',
          label: 'Persistent absentees (%)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.persistentAbsentPct !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.persistentAbsentPct!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="School Absence Trends" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Absence Trends"
          question="Why Are Children Not Going to School?"
          finding="One in five children missed more than 10% of school in 2022/23 &mdash; a persistent absence rate that has more than doubled since before the pandemic."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Before the pandemic, persistent absence &mdash; missing 10&percnt; or more of school sessions &mdash; affected around one in ten pupils. By 2022/23 it affected more than one in five, peaking at 22.5&percnt; before edging back to 19.8&percnt; in 2024 &mdash; still more than double pre-COVID levels. The number of children classified as severely absent (missing at least 50&percnt; of school) has tripled from around 40,000 before the pandemic to 124,000 in 2024. Post-COVID anxiety and school avoidance are significant factors, CAMHS waiting lists mean children wait months for treatment while attendance deteriorates, and the proportion of sessions authorised as illness rose from 4.9&percnt; to 7.7&percnt;, suggesting a genuine increase in health-related non-attendance. Government responses &mdash; attendance guidance, attendance hubs, increased fines for unauthorised absence &mdash; address the visible symptom but not the underlying causes: inadequate mental health provision, SEND delays, poverty, and housing instability.</p>
            <p>Absence is not evenly distributed. Pupils with SEND without an EHC Plan have the highest absence rates of any group; FSM children are absent at roughly twice the rate of non-FSM peers; children in care have the highest severe absence rates. Each additional week of school missed reduces GCSE attainment by around 0.3 grade points, persistent absence is strongly associated with becoming NEET at 16&ndash;18, and severe absence correlates with entry into the youth justice system &mdash; making the attendance crisis as much a welfare crisis as an education one.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Absence Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Persistent absentees"
              value="19.8%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="improving from 22.5% peak &middot; still double pre-COVID"
              sparklineData={[10.3, 10.8, 10.9, 10.9, 13.6, 22.5, 21.2, 19.8]}
              onExpand={() => {}}
              source="DfE &middot; Pupil Absence in Schools 2024"
            />
            <MetricCard
              label="Severe absentees (50%+ missed)"
              value="124,000"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="falling but 3x pre-pandemic level"
              sparklineData={[35000, 40000, 40000, 40000, 50000, 96000, 136000, 124000]}
              onExpand={() => {}}
              source="DfE &middot; Attendance Data 2024"
            />
            <MetricCard
              label="Authorised illness rate"
              value="7.7%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="illness as reason doubled &middot; long-COVID, anxiety, post-viral"
              sparklineData={[4.9, 5.0, 5.1, 5.1, 5.9, 7.2, 7.7, 7.5]}
              onExpand={() => {}}
              source="DfE &middot; Pupil Absence Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Persistent school absence rate, 2016&ndash;2024"
              subtitle="Percentage of pupils missing 10% or more of school sessions. England, all state-funded schools."
              series={persistentAbsentSeries}
              yLabel="Persistent absence (%)"
              source={{
                name: 'Department for Education',
                dataset: 'Pupil Absence in Schools in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Education &mdash; Pupil Absence in Schools in England. Published termly and annually. explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england</p>
            <p>DfE &mdash; Attendance in Schools. Weekly experimental statistics published in-year. explore-education-statistics.service.gov.uk</p>
            <p>Persistent absence is defined as missing 10% or more of possible sessions. Each school day comprises two sessions (morning and afternoon). Severe absence is defined as missing 50% or more. Data covers all state-funded schools in England. The 2020/21 academic year is excluded due to COVID-19 school closures making comparison invalid.</p>
          </div>
        </section>
      </main>
    </>
  )
}
