'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface HandoverHoursPoint {
  year: number
  hoursLostMillions: number
}

interface HandoverDelayPoint {
  year: number
  over30minPct: number
  over60minPct: number
}

interface HandoverData {
  national: {
    handoverHours: { timeSeries: HandoverHoursPoint[] }
    handoverDelays: { timeSeries: HandoverDelayPoint[] }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function AmbulanceHandoversPage() {
  const [data, setData] = useState<HandoverData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/ambulance-handovers/ambulance_handovers.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load ambulance handover data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const handoverHoursSeries: Series[] = [
    {
      id: 'hours-lost',
      label: 'Handover delay hours (millions)',
      colour: '#E63946',
      data: data.national.handoverHours.timeSeries.map(d => ({
        date: yearToDate(d.year),
        value: d.hoursLostMillions,
      })),
    },
  ]

  const delaySeries: Series[] = [
    {
      id: 'over-30min',
      label: 'Handovers taking 30+ minutes',
      colour: '#F4A261',
      data: data.national.handoverDelays.timeSeries.map(d => ({
        date: yearToDate(d.year),
        value: d.over30minPct,
      })),
    },
    {
      id: 'over-60min',
      label: 'Handovers taking 60+ minutes',
      colour: '#E63946',
      data: data.national.handoverDelays.timeSeries.map(d => ({
        date: yearToDate(d.year),
        value: d.over60minPct,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Ambulance Handovers" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ambulance Handovers"
          question="Why Are Paramedics Waiting Hours Outside Hospitals?"
          finding="In 2023/24, ambulances spent 1.8 million hours queuing outside hospitals waiting to hand over patients &mdash; time when crews could have been responding to new 999 calls, leaving communities without emergency cover."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When an ambulance arrives at a hospital, the crew should hand over their patient within 15 minutes and return to the road. In 2023/24, this handover process consumed an estimated 1.8 million hours across England &mdash; more than quadruple the 420,000 hours lost in 2017/18. Every minute an ambulance spends queuing is a minute it cannot respond to the next 999 call. The Association of Ambulance Chief Executives estimates handover delays directly contribute to between 300 and 500 avoidable deaths per year. The root cause is not with ambulance services but with hospital and social care capacity: when wards are full and patients cannot be discharged to social care placements, the system backs up to the front door. During winter 2022/23, some hospitals reported queues of 20 or more ambulances; Category 2 average response times reached 93 minutes against an 18-minute target. By 2023, average general and acute bed occupancy reached 94&percnt;, with many trusts routinely at 98&ndash;100&percnt;, meaning any surge in demand instantly translates into ambulance stacking.</p>
            <p>The problem is not evenly distributed geographically. Trusts in the Midlands and North of England report the longest delays, some averaging over 45 minutes per handover. Rural ambulance services face a compounding effect: a crew trapped at a distant hospital for hours can leave hundreds of square miles without emergency cover. The problem is now year-round &mdash; even in August 2023, 22&percnt; of handovers took longer than 30 minutes. The human cost falls most heavily on elderly patients and those with multiple long-term conditions, who are both most likely to call 999 and most likely to suffer harm from delayed response. In winter 2022/23, 18.4&percnt; of all handovers took more than 60 minutes against the 15-minute standard.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-hours-lost', label: 'Hours Lost' },
          { id: 'sec-delay-pct', label: 'Delay Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Hours lost to handover delays"
              value="1.8M"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023/24 &middot; Up from 420K in 2017/18"
              sparklineData={[0.42, 0.51, 0.63, 1.12, 1.58, 1.82, 1.64]}
              href="#sec-hours-lost"/>
            <MetricCard
              label="Handovers taking 60+ min"
              value="18.4"
              unit="%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023/24 &middot; Up from 2.1% in 2017/18"
              sparklineData={[2.1, 3.4, 5.8, 11.2, 15.9, 18.4, 14.7]}
              href="#sec-delay-pct"/>
            <MetricCard
              label="Cat 2 response time"
              value="40.7"
              unit="min"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023/24 &middot; Target: 18 minutes"
              sparklineData={[22, 24, 28, 39, 52, 41, 37]}
              href="#sec-delay-pct"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-hours-lost" className="mb-12">
            <LineChart
              title="Total ambulance handover delay hours, England, 2018&ndash;2024"
              subtitle="Estimated hours lost to ambulance crews waiting outside hospitals to hand over patients. Millions."
              series={handoverHoursSeries}
              yLabel="Hours (millions)"
              source={{
                name: 'NHS England',
                dataset: 'Ambulance Quality Indicators',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-delay-pct" className="mb-12">
            <LineChart
              title="Ambulance handover delays by duration, England, 2018&ndash;2024"
              subtitle="Percentage of hospital handovers exceeding 30 and 60 minutes."
              series={delaySeries}
              yLabel="Handovers (%)"
              source={{
                name: 'NHS England',
                dataset: 'Ambulance Quality Indicators',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="NHS ambulance recovery plan showing results"
            value="20%"
            description="NHS England&apos;s 10-point ambulance recovery plan, launched in January 2023, combined hospital discharge acceleration, cohorting areas at hospital front doors, and additional call-handling capacity. By late 2023, several regions reported handover delays falling by around 20&percnt; compared to the previous winter, with Category 2 response times improving from a peak of 93 minutes to under 40 minutes nationally."
            source="Source: NHS England &mdash; Urgent and Emergency Care Recovery Plan, 2023 progress report."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Ambulance Quality Indicators (AQI). Monthly publication covering all ambulance trusts in England. Includes response times by category and handover delay data.</p>
            <p>NHS England &mdash; A&amp;E Attendances and Emergency Admissions. Weekly and monthly data on emergency department performance, including four-hour target compliance.</p>
            <p>Association of Ambulance Chief Executives (AACE) &mdash; Annual benchmarking reports on handover delays and fleet utilisation.</p>
            <p>Handover delay hours are estimated from ambulance trust returns measuring time from arrival at hospital to clinical handover. Definitions of handover completion vary between trusts. Category 2 response time is the mean time from 999 call to arrival of an emergency response. Data covers England only.</p>
          </div>
        </section>
      </main>
    </>
  )
}
