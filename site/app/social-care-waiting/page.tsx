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
          finding="415,000 people in England are waiting for a social care assessment or service. One in three waits more than 6 months. An estimated 1.5 million people have unmet social care needs &mdash; care they require but are not receiving."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Social care encompasses a wide range of support: personal care at home (washing, dressing, eating), meals and medication management, day centre attendance, residential and nursing care, and equipment to support independent living. An estimated 415,000 people in England are currently waiting for either a care needs assessment or for a service to begin following a completed assessment. This figure has grown from 298,000 in 2019, driven by a combination of rising demand from an ageing population and a contracting assessment workforce. ADASS &mdash; the Association of Directors of Adult Social Services &mdash; publishes these waiting figures through its annual autumn survey, which draws on returns from local authority adult social care departments.</p>
            <p>One in three of those waiting has been waiting more than six months. Six months without personal care is not an abstract hardship: it means family members reducing or leaving paid work to provide care informally, older people going without support that enables them to wash or leave the house, and conditions deteriorating to the point where residential care &mdash; far more expensive &mdash; becomes unavoidable. The assessment backlog is driven primarily by workforce shortages: local authority adult social care assessment teams have been cut as council budgets have contracted under a decade of real-terms funding reductions.</p>
            <p>The connection between social care waiting and NHS pressures is direct. Around 13,000 people are in NHS hospital beds on any given day who are medically fit for discharge but cannot leave because they have no safe care package to go to. This &lsquo;delayed discharge&rsquo; costs the NHS an estimated 120,000 bed-days per month and represents a significant driver of A&amp;E waiting times, ambulance handover delays, and cancelled operations. The same assessment teams that are failing to process new care referrals are also failing to arrange hospital discharge packages at the speed the NHS requires.</p>
            <p>Beyond the 415,000 waiting, estimates of unmet social care need &mdash; people who need care but are not receiving it and are not in any assessment queue &mdash; range from 1.4 to 1.6 million. This population is largely invisible to official statistics. They are people who have not applied for support, or who have applied and been assessed as ineligible because their needs do not reach the &apos;substantial&apos; threshold required under the Care Act 2014, or who have self-funded and run out of money without accessing public support. Age UK has described this as a &apos;hidden crisis&apos; that official waiting figures substantially understate.</p>
            <p>Addressing the social care backlog would require an estimated &pound;7 billion in additional annual funding &mdash; the figure most consistently cited by ADASS, the King&apos;s Fund, and the Health Foundation in their joint analysis. This would cover both the assessment backlog and the staffing gap that drives it, as well as providing sustainable fee rates for providers. Multiple governments since the 2010 Dilnot Commission have acknowledged the underfunding while delaying reform. The 2021 Health and Social Care Levy, which added 1.25 percentage points to National Insurance, was initially intended partly for social care but was diverted to NHS recovery following COVID-19. The money available for social care reform remained a fraction of what evidence-based analysis suggested was required.</p>
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
              changeText="Up from 298,000 in 2019 &middot; NHS discharge delays compound problem"
              sparklineData={[298, 340, 380, 410, 415]}
              source="ADASS Autumn Survey &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Waiting more than 6 months"
              value="33"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 25% in 2020 &middot; assessment teams chronically understaffed"
              sparklineData={[25, 28, 31, 33]}
              source="ADASS &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Estimated unmet social care need"
              value="1.5m"
              unit="people"
              direction="up"
              polarity="up-is-bad"
              changeText="People not receiving care they need &middot; &lsquo;hidden&rsquo; care crisis"
              sparklineData={[1.1, 1.2, 1.3, 1.4, 1.5]}
              source="NHS Confederation / Age UK estimates &middot; 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waiting" className="mb-12">
            <LineChart
              title="People waiting for social care assessment or service, 2019&ndash;2023"
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
            <p>ADASS &mdash; Autumn Survey of Adult Social Care Directors. Annual survey of all 153 English local authorities with adult social care responsibilities. Available at adass.org.uk.</p>
            <p>NHS England &mdash; Discharge delays and delayed transfer of care statistics. Monthly data on patients medically fit for discharge awaiting social care. Available at england.nhs.uk/statistics.</p>
            <p>Age UK &mdash; Later Life in the United Kingdom. Annual factsheet covering social care waiting and unmet need estimates. Available at ageuk.org.uk.</p>
            <p>Waiting figures represent a point-in-time count at the time of ADASS survey, typically October. Unmet need estimates are modelled from population survey data and care receipt records; they are indicative rather than exact counts. ADASS response rates are above 90% but full participation is not guaranteed in all years.</p>
          </div>
        </section>
      </main>
    </>
  )
}
