'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface PoliceOfficerRow {
  year: number
  officersFTE?: number
}

interface PoliceOfficerNumbersData {
  topic: string
  lastUpdated: string
  timeSeries: PoliceOfficerRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PoliceOfficerNumbersPage() {
  const [data, setData] = useState<PoliceOfficerNumbersData | null>(null)

  useEffect(() => {
    fetch('/data/police-officer-numbers/police_officer_numbers.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const officersSeries: Series[] = data
    ? [
        {
          id: 'officersFTE',
          label: 'Officers (FTE)',
          colour: '#6B7280',
          data: data.timeSeries
            .filter(d => d.officersFTE !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.officersFTE!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Police Officer Numbers" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Police Officer Numbers"
          question="Are There Enough Police Officers?"
          finding="England and Wales reached 147,000 officers in 2024 &mdash; but this still leaves a 4,000 shortfall versus 2010 levels, with less experience and more complex demand."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Police officer numbers in England and Wales tell a story of cuts, recovery, and persistent challenge. From a peak of around 143,000 in 2010, officer numbers fell through a decade of austerity to a low of 122,400 in 2018 &mdash; a reduction of over 20,000 posts. The Police Uplift Programme, announced in 2019 with a target of 20,000 additional officers, met its headline target in 2023 and brought total officer numbers to around 147,000. On paper, this represents near-restoration of 2010 levels. In practice, the comparison is more complicated.</p>
            <p>The officers recruited under the Uplift Programme are overwhelmingly new to the role. A force that lost experienced detectives, specialist investigators, and neighbourhood officers over a decade cannot simply replace them with equivalent capability by recruiting probationers. The average experience level of the officer workforce in 2024 is significantly lower than in 2010. Complex investigations &mdash; serious sexual offences, fraud, organised crime, major incidents &mdash; require experienced officers that take years to develop. Forces that were already depleted before the Uplift have found that new recruits require extensive supervision, increasing the burden on remaining experienced officers rather than relieving it.</p>
            <p>Demand has also changed materially since 2010. The growth in digital crime means that investigating almost any serious offence now involves phone and device extraction, online account data, and digital forensics that did not exist at scale fifteen years ago. Mental health-related calls to police have grown substantially as community mental health services have contracted. Child sexual abuse investigation &mdash; expanded significantly through Operation Hydrant and related national programmes &mdash; has created large new demand on detective resource. Emergency response times are rising: the average time to respond to a 999 call requiring urgent response has grown from around 7 minutes in 2010 to 9.4 minutes in 2024.</p>
            <p>Retention is an emerging problem. Officers recruited since 2019 are leaving at higher rates than historical cohorts, particularly in the first two to five years of service. Contributory factors include shift patterns, public hostility following the Sarah Everard case and subsequent public trust crisis, pay restraint in real terms, and the experience gap that leaves new officers without adequate mentoring. The Uplift Programme is close to a treadmill: significant ongoing recruitment is required simply to maintain current numbers, let alone to build the deep experience the workforce needs.</p>
            <p>The 999 response time figure illustrates the gap between headline officer numbers and experienced operational capacity. More officers are available than at any point in the post-austerity period, but emergency response performance continues to deteriorate. This is not simply a numbers problem: it reflects the allocation of officers to non-emergency functions, sickness absence running at historically elevated levels, and the supervision and administration burden that falls on experienced officers managing large cohorts of probationers. A 147,000-officer force in 2024 is not the same as a 143,000-officer force in 2010, and treating the headline numbers as equivalent misrepresents the operational reality facing police leadership and communities.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-callout', label: 'Uplift' },
          { id: 'sec-chart', label: 'Officer Numbers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Officers 2024"
              value="147,000"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="stable at near 2010 levels"
              sparklineData={[143734, 134000, 127909, 123142, 122404, 130396, 138858, 142526, 147232, 147000]}
              onExpand={() => {}}
              source="Home Office &middot; Police Workforce Statistics 2024"
            />
            <MetricCard
              label="Still below 2010"
              value="-4,000"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="vs 151k peak &middot; and demand much higher now"
              sparklineData={[-7000, -16000, -20000, -21000, -21500, -13500, -5000, -1500, 0, -500]}
              onExpand={() => {}}
              source="Home Office &middot; Police Workforce 2024"
            />
            <MetricCard
              label="999 response time"
              value="9.4 min avg"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="emergency response time rising &middot; capacity stretched"
              sparklineData={[7.0, 7.4, 7.8, 8.1, 8.3, 8.5, 8.8, 9.0, 9.2, 9.4]}
              onExpand={() => {}}
              source="HMICFRS &middot; State of Policing 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Uplift Programme Delivered 20,000 Officers"
              value="20,000"
              unit="new officers since 2019"
              description="The Police Uplift Programme recruited 20,000 additional officers between 2019 and 2023, restoring force strength to near-2010 levels. The programme met its target ahead of schedule in 2023."
              source="Home Office, Police Workforce Statistics, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Police officer numbers, England and Wales, 2010&ndash;2024"
              subtitle="Full-time equivalent officers. Excludes police staff, PCSOs, and specials. Data from Home Office annual workforce statistics."
              series={officersSeries}
              yLabel="Officers (FTE)"
              source={{
                name: 'Home Office',
                dataset: 'Police Workforce Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Police Workforce, England and Wales. Annual statistics on officer numbers by force, rank, and function. Published July each year. gov.uk/government/collections/police-workforce-england-and-wales</p>
            <p>HMICFRS &mdash; State of Policing / PEEL Assessments. Annual report on police effectiveness, efficiency, and legitimacy. justiceinspectorates.gov.uk/hmicfrs/publications/state-of-policing</p>
            <p>Officer count is full-time equivalent designated police officers. Excludes designated police staff, police community support officers, special constables, and contracted staff. Response time data is sourced from HMICFRS force-level PEEL inspection data and varies in methodology across forces; the figure cited is an approximate national mean for Grade 1 (emergency) responses.</p>
          </div>
        </section>
      </main>
    </>
  )
}
