'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface Nhs111PressuresData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    callsM: number
    abandonedPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function Nhs111PressuresPage() {
  const [data, setData] = useState<Nhs111PressuresData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-111-pressures/nhs_111_pressures.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const callsSeries: Series[] = data
    ? [
        {
          id: 'calls',
          label: 'Total calls (millions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.callsM,
          })),
        },
        {
          id: 'abandoned',
          label: 'Abandoned calls (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.abandonedPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="NHS 111 Pressures" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS 111 Pressures"
          question="Is NHS 111 Actually Working?"
          finding="26 million calls a year, 1 in 7 abandoned &mdash; NHS 111 is overwhelmed as it absorbs demand from A&amp;E and GP services."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS 111 launched in 2013 as a single triage point for non-emergency medical advice; call volumes grew from 12.1 million in 2015 to 26.3 million in 2023 &mdash; a 117% rise. The surge reflects not popularity but a structural shift: as GP appointment availability has tightened and A&amp;E waiting time targets were abandoned in 2020, 111 has become the default first port of call for a growing range of conditions previously handled in primary care. The strain is visible in the abandonment rate: 8.2% of callers hung up before being answered in 2015; by 2023 that had risen to 15.2% &mdash; one in seven. Around 8% of all 111 calls result in a recommendation to attend A&amp;E, translating to over 2 million additional emergency department referrals annually layered on top of self-referred demand. The Clinical Advisor model, routing higher-risk callers to nurses and paramedics, improves safety but increases call handling time, reducing throughput and lengthening the queue that drives abandonment further.</p>
            <p>Callers who abandon the line do not reliably seek care elsewhere. A significant proportion make no subsequent contact with the health system that day; some subsequently present at A&amp;E in a more acute state. The integrated urgent care model &mdash; embedding 111 call handlers alongside out-of-hours GP services and urgent treatment centres to enable direct booking &mdash; has shown promise where fully implemented but rollout remains uneven, with substantial regional variation. Call handler retention is poor given the emotional labour of handling medical anxiety and crisis calls; the NHS Long Term Plan&apos;s ambition for 111 to evolve into a direct GP and urgent treatment booking platform has proceeded more slowly than planned due to incomplete GP system integration.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Call Volume' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Calls 2023"
              value="26.3m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+117% since 2015"
              sparklineData={[12.1, 13.4, 14.8, 16.2, 17.9, 22.4, 21.8, 24.1, 26.3]}
              href="#sec-chart"source="NHS England &middot; NHS 111 Statistical Release"
            />
            <MetricCard
              label="Abandoned calls"
              value="15.2%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1 in 7 hang up before answered"
              sparklineData={[8.2, 7.9, 8.5, 9.1, 9.8, 14.2, 12.6, 13.8, 15.2]}
              href="#sec-chart"source="NHS England &middot; NHS 111 Statistical Release"
            />
            <MetricCard
              label="Referred to ED"
              value="8%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="111 calls escalating to A&amp;E attendance"
              sparklineData={[6, 6, 7, 7, 7, 8, 8, 8, 8]}
              href="#sec-chart"source="NHS England &middot; NHS 111 Statistical Release"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS 111 call volume and abandonment rate, 2015&ndash;2023"
              subtitle="Total calls received (millions) and percentage of calls abandoned before being answered."
              series={callsSeries}
              yLabel="Value"
              source={{
                name: 'NHS England',
                dataset: 'NHS 111 Statistical Release',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; NHS 111 Statistical Release. Published monthly. england.nhs.uk/statistics/statistical-work-areas/urgent-and-emergency-care/nhs-111-minimum-data-set/</p>
            <p>Call volume figures are total calls offered to the service. Abandoned calls are those where the caller disconnected before speaking to a call handler or clinical advisor. ED referral rate is calls resulting in an &apos;Attend A&amp;E&apos; disposition as a proportion of total calls completed. Data for 2015&ndash;2019 sourced from published NHS 111 MDS annual summaries; 2020 onwards from monthly data releases aggregated to annual totals.</p>
          </div>
        </section>
      </main>
    </>
  )
}
