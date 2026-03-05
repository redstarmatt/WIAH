'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import MetricDetailModal from '@/components/MetricDetailModal'
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

// Sparkline years (academic years, 2020 skipped due to COVID closures)
const SPARKLINE_YEARS = [2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024]

// -- Page -------------------------------------------------------------------

export default function SchoolAbsenceTrendsPage() {
  const [data, setData] = useState<SchoolAbsenceTrendsData | null>(null)
  const [openModal, setOpenModal] = useState<'persistent' | 'severe' | 'illness' | null>(null)

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

  const severeAbsentSeries: Series[] = [
    {
      id: 'severeAbsent',
      label: 'Severely absent pupils',
      colour: '#E63946',
      data: [35000, 40000, 40000, 40000, 50000, 96000, 136000, 124000].map((v, i) => ({
        date: yearToDate(SPARKLINE_YEARS[i]),
        value: v,
      })),
    },
  ]

  const illnessSeries: Series[] = [
    {
      id: 'illnessRate',
      label: 'Authorised illness rate (%)',
      colour: '#E63946',
      data: [4.9, 5.0, 5.1, 5.1, 5.9, 7.2, 7.7, 7.5].map((v, i) => ({
        date: yearToDate(SPARKLINE_YEARS[i]),
        value: v,
      })),
    },
  ]

  const covidAnnotation = [
    { date: new Date(2020, 0, 1), label: 'COVID-19 school closures' },
  ]

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
            <p>Before the pandemic, persistent absence &mdash; missing 10% or more of school sessions &mdash; affected around one in ten pupils. By 2022/23, it affected more than one in five. The 22.5% peak recorded in that year represents a doubling in the space of three years, and while rates have since edged back to 19.8%, they remain at more than double pre-COVID levels. The number of children classified as severely absent, missing at least 50% of school, has tripled from around 40,000 before the pandemic to 124,000 in 2024.</p>
            <p>The causes are layered. Post-COVID anxiety and school avoidance have emerged as significant factors, particularly among secondary school pupils. Mental health referrals from schools have risen sharply, and CAMHS waiting lists mean children can wait months or years for treatment while their attendance deteriorates. Long-COVID accounts for a meaningful but contested share of authorised illness absences &mdash; the proportion authorised as illness has risen from 4.9% to 7.7% of all sessions, suggesting a genuine increase in health-related non-attendance rather than simply behavioural or parental discretion.</p>
            <p>The data reveals stark inequalities. Pupils with special educational needs who do not have an Education, Health and Care Plan have the highest absence rates of any group. Children in receipt of free school meals are absent at rates roughly twice those of their non-FSM peers. Children in care have the highest severe absence rates. Absence, in other words, is not a random phenomenon distributed across the school population &mdash; it concentrates overwhelmingly among children who face the greatest disadvantages and who have the most to gain from consistent education.</p>
            <p>Government responses have included new attendance guidance, the rollout of attendance hubs, and increased powers for schools to refer families to local authority support. Fixed penalty notices for unauthorised absence have been reformed and fines increased. These supply-side interventions address the visible symptom, but critics argue they do not address the underlying causes: inadequate mental health provision, inadequate SEND support, poverty and food insecurity that makes school harder to attend, and housing instability. For severely absent children, the evidence suggests that prosecution and fines are largely ineffective, particularly when absence is driven by anxiety or parental mental illness.</p>
            <p>The consequences of chronic absence are well documented. Each additional week of school missed reduces GCSE attainment by around 0.3 grade points. Children who are persistently absent are significantly more likely to become NEET &mdash; not in education, employment, or training &mdash; at 16 to 18. Severe absence in particular is strongly associated with entry into the youth justice system. The attendance crisis is not simply an education crisis: it is a welfare crisis with long-term economic consequences, and it requires sustained cross-departmental investment in the services &mdash; mental health, social care, housing, SEND &mdash; that determine whether children can access education at all.</p>
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
              onExpand={() => setOpenModal('persistent')}
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
              onExpand={() => setOpenModal('severe')}
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
              onExpand={() => setOpenModal('illness')}
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

      {openModal === 'persistent' && (
        <MetricDetailModal
          title="Persistent school absence rate, 2016–2024"
          subtitle="Percentage of pupils missing 10% or more of sessions. England, all state-funded schools."
          series={persistentAbsentSeries}
          annotations={covidAnnotation}
          yLabel="Persistent absence (%)"
          source={{
            name: 'Department for Education',
            dataset: 'Pupil Absence in Schools in England',
            frequency: 'annual',
          }}
          onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === 'severe' && (
        <MetricDetailModal
          title="Severely absent pupils, 2016–2024"
          subtitle="Children missing 50% or more of school sessions. England, all state-funded schools."
          series={severeAbsentSeries}
          annotations={covidAnnotation}
          yLabel="Pupils (thousands)"
          source={{
            name: 'Department for Education',
            dataset: 'Attendance in Schools',
            frequency: 'annual',
          }}
          onClose={() => setOpenModal(null)}
        />
      )}

      {openModal === 'illness' && (
        <MetricDetailModal
          title="Authorised illness absence rate, 2016–2024"
          subtitle="Sessions authorised as illness as a percentage of all possible sessions. England."
          series={illnessSeries}
          annotations={covidAnnotation}
          yLabel="Illness absence (%)"
          source={{
            name: 'Department for Education',
            dataset: 'Pupil Absence in Schools in England',
            frequency: 'annual',
          }}
          onClose={() => setOpenModal(null)}
        />
      )}
    </>
  )
}
