'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface SocialCareWaitingData {
  waitingForCare: Array<{ year: number; thousands: number }>
  waitingOver6Months: Array<{ year: number; percent: number }>
  unmetNeed: Array<{ year: number; millions: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function SocialCareWaitingPage() {
  const [data, setData] = useState<SocialCareWaitingData | null>(null)

  useEffect(() => {
    fetch('/data/social-care-waiting/social_care_waiting.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const waitingSeries: Series[] = data
    ? [{
        id: 'waiting',
        label: 'People waiting for social care (thousands)',
        colour: '#E63946',
        data: data.waitingForCare.map(d => ({
          date: yearToDate(d.year),
          value: d.thousands,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Social Care Waiting Times" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care Waiting Times"
          question="How long do people wait for social care?"
          finding="415,000 people in England are waiting for a social care assessment or service. One in three waits more than 6 months. An estimated 1.5 million people have unmet social care needs — care they require but are not receiving."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>An estimated 415,000 people in England are currently waiting for either a social care needs assessment or for a service to begin following a completed assessment — up from 298,000 in 2019. One in three has been waiting more than six months: six months without personal care means family members leaving paid work to care informally, older people unable to wash or leave home, and conditions deteriorating until far more expensive residential care becomes unavoidable. Around 13,000 people occupy NHS hospital beds on any given day who are medically fit for discharge but cannot leave because no safe care package exists — &lsquo;delayed discharge&rsquo; that costs the NHS an estimated 120,000 bed-days per month and drives A&amp;E waiting times, ambulance handover delays, and cancelled operations. Addressing the assessment backlog alone would require an estimated £7 billion in additional annual funding, according to ADASS, the King's Fund, and the Health Foundation.</p>
            <p>The 415,000 waiting substantially understates the true scale of need. An estimated 1.4–1.6 million people need care but are not receiving it and are not in any assessment queue — people who have not applied, who were assessed as ineligible under the Care Act 2014's &lsquo;substantial' threshold, or who self-funded until their assets ran out. The assessment backlog is driven by workforce shortages: local authority assessment teams have been cut as council budgets contracted under a decade of real-terms funding reductions, and multiple reform commitments — including the 2021 Health and Social Care Levy funds, initially intended partly for social care — have been diverted to NHS recovery rather than community services.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-waiting', label: 'Waiting Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People waiting for social care"
              value="415k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 298,000 in 2019 · NHS discharge delays compound problem"
              sparklineData={[298, 340, 380, 410, 415]}
              source="ADASS Autumn Survey · 2023"
              href="#sec-waiting"/>
            <MetricCard
              label="Waiting more than 6 months"
              value="33"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 25% in 2020 · assessment teams chronically understaffed"
              sparklineData={[25, 28, 31, 33]}
              source="ADASS · 2023"
              href="#sec-waiting"/>
            <MetricCard
              label="Estimated unmet social care need"
              value="1.5m"
              unit="people"
              direction="up"
              polarity="up-is-bad"
              changeText="People not receiving care they need · &lsquo;hidden&rsquo; care crisis"
              sparklineData={[1.1, 1.2, 1.3, 1.4, 1.5]}
              source="NHS Confederation / Age UK estimates · 2023"
              href="#sec-waiting"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waiting" className="mb-12">
            <LineChart
              title="People waiting for social care assessment or service, 2019–2023"
              subtitle="Total number of adults in England waiting for a needs assessment or for an agreed service to start."
              series={waitingSeries}
              yLabel="Thousands of people"
              source={{
                name: 'ADASS',
                dataset: 'Autumn Survey of Adult Social Care Directors',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ADASS — Autumn Survey of Adult Social Care Directors. Annual survey of all 153 English local authorities with adult social care responsibilities. Available at adass.org.uk.</p>
            <p>NHS England — Discharge delays and delayed transfer of care statistics. Monthly data on patients medically fit for discharge awaiting social care. Available at england.nhs.uk/statistics.</p>
            <p>Age UK — Later Life in the United Kingdom. Annual factsheet covering social care waiting and unmet need estimates. Available at ageuk.org.uk.</p>
            <p>Waiting figures represent a point-in-time count at the time of ADASS survey, typically October. Unmet need estimates are modelled from population survey data and care receipt records; they are indicative rather than exact counts. ADASS response rates are above 90% but full participation is not guaranteed in all years.</p>
          </div>
        </section>
      </main>
    </>
  )
}
