'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface TrainPunctualityData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    onTimePct: number
    cancellationPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function TrainPunctualityPage() {
  const [data, setData] = useState<TrainPunctualityData | null>(null)

  useEffect(() => {
    fetch('/data/train-punctuality/train_punctuality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'onTime',
          label: 'On-time arrival (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.onTimePct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Train Punctuality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Train Punctuality"
          question="Are British Trains Actually Running on Time?"
          finding="Only 63.3% of UK trains arrived on time in 2024, down from 89% pre-privatisation, making British punctuality among the worst in Western Europe."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Only 63.3% of UK trains arrived on time in 2024 by the Public Performance Measure, down from 79.4% in 2019 and among the worst punctuality rates in Western Europe &mdash; Switzerland achieves 92&ndash;95%, Germany and France 75&ndash;85%. Cancellations reached 3.9% of all scheduled services in 2024, up from 1.8% in 2019. The causes are structural: a network largely built in the Victorian era, analogue signalling technology that creates cascading delay vulnerability, a &pound;7 billion infrastructure maintenance backlog, and the fragmentation of accountability between Network Rail (infrastructure) and train operating companies (operations) that defined the privatisation model from 1994. Delay Repay claims reached 4.1 million in 2023 &mdash; up 40% from 2019.</p>
            <p>The Passenger Railway Services (Public Ownership) Act 2024 enables direct operation of franchises as they expire, aiming to reintegrate infrastructure and operations under Great British Railways. Whether this translates into measurable punctuality improvement will be the test of the reform. The practical consequences of poor performance fall most heavily on commuters with no viable alternative to rail &mdash; particularly those on corridors without adequate bus or road options &mdash; and on the environment, where passengers switching from rail to car for journey reliability reasons undermine the sector&apos;s sustainability argument.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Punctuality' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="On-time arrival rate 2024"
              value="63.3%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="-16.1pp vs 2019 &middot; worst in Western Europe"
              sparklineData={[83.5, 85.1, 80.2, 79.4, 73.8, 65.9, 72.3, 69.8, 63.3]}
              onExpand={() => {}}
              source="Office of Rail and Road &middot; National Rail Trends 2024"
            />
            <MetricCard
              label="Train cancellation rate"
              value="3.9%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+2.1pp since 2019 &middot; compounding delays"
              sparklineData={[1.5, 1.6, 1.8, 1.8, 2.1, 2.9, 2.6, 3.1, 3.9]}
              onExpand={() => {}}
              source="Office of Rail and Road &middot; National Rail Trends 2024"
            />
            <MetricCard
              label="Delay Repay compensation claims"
              value="4.1m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+40% since 2019 &middot; rising awareness and delays"
              sparklineData={[1.8, 2.0, 2.2, 2.9, 2.5, 2.8, 3.1, 3.6, 4.1]}
              onExpand={() => {}}
              source="Office of Rail and Road &middot; National Rail Trends 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Train punctuality rate, 2016&ndash;2024"
              subtitle="Percentage of trains arriving within 5 minutes of scheduled time (PPM measure)."
              series={series}
              yLabel="On-time arrival (%)"
              source={{
                name: 'Office of Rail and Road',
                dataset: 'National Rail Trends',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Office of Rail and Road &mdash; National Rail Trends. Published quarterly. dataportal.orr.gov.uk/statistics/performance/train-punctuality/</p>
            <p>On-time arrival measured by Public Performance Measure (PPM): within 5 minutes of scheduled arrival for regional and commuter services, within 10 minutes for long-distance services. Cancellation rate is percentage of planned services that did not run. Delay Repay claims are compensation applications made by passengers for qualifying delays.</p>
          </div>
        </section>
      </main>
    </>
  )
}
