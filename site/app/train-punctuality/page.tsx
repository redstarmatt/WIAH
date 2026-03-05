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
            <p>Train punctuality in Britain is measured through the Public Performance Measure (PPM), which records the percentage of trains arriving within 5 minutes of their scheduled time for regional and commuter services, or within 10 minutes for long-distance services. The measure has been subject to methodological change over time &mdash; the introduction of Right Time railway metrics in recent years tracks arrival within 1 minute, producing a lower published figure &mdash; but however measured, punctuality has deteriorated significantly over the past decade. In 2019, just before the pandemic, 79.4% of trains arrived on time by PPM. By 2024, the figure had fallen to 63.3%, reflecting infrastructure failures, staff shortages, rolling stock issues, and the growing impact of climate-related disruption including floods and heat-related rail buckling.</p>
            <p>The comparison with European peers is unfavourable. Switzerland typically achieves 92&ndash;95% punctuality on its national rail network. Japan&apos;s Shinkansen recorded an average delay in 2023 of under 1 minute. Germany, France, and the Netherlands all achieve punctuality rates in the 75&ndash;85% range. The UK is distinctive not only for its lower punctuality but for the high proportion of cancellations &mdash; 3.9% of all scheduled services were cancelled in 2024, compared to 1.8% in 2019. Cancellation is more disruptive than delay because it leaves passengers with no direct journey option rather than a late one, often requiring alternative routing that significantly extends journey times.</p>
            <p>The causes of UK rail performance failures are structural as well as operational. The rail network was largely built in the Victorian era and, outside a small number of recently modernised corridors, is ageing. Signalling systems are a particular constraint: much of the national network uses analogue block signalling technology that limits train frequency and creates capacity constraints that make the network vulnerable to cascading delays when a single incident occurs. The digital signalling programme &mdash; European Train Control System (ETCS) deployment &mdash; is intended to increase capacity and improve punctuality, but its rollout is behind schedule. Network Rail&apos;s infrastructure maintenance backlog runs at approximately &pound;7 billion, and prolonged underinvestment creates compounding reliability problems.</p>
            <p>The franchise model of rail privatisation &mdash; introduced in 1994 and in operation in various forms until the pandemic forced emergency operating contracts &mdash; created structural incentives misaligned with long-term performance. Train operating companies held short-term franchises (typically 7&ndash;10 years) with limited capital commitment and complex track access charging arrangements. The fragmentation of responsibility between Network Rail (infrastructure) and TOCs (operations) created accountability gaps: when trains ran late, it was often unclear whether the cause was infrastructure failure or operational decision, and the incentive structures within contracts did not always align NR and TOC interests. The move to Great British Railways &mdash; integrating infrastructure and operations under national management &mdash; was announced in 2021 but legislative implementation has been slow.</p>
            <p>For passengers, the practical experience of poor punctuality translates into compensation claims, lost productivity, reduced confidence in rail as a commuting option, and in some cases decisions to switch to car for journeys where rail is theoretically more sustainable. Delay Repay claims reached 4.1 million in 2023 &mdash; up 40% from 2019 &mdash; reflecting both worse performance and greater passenger awareness of their entitlements. The government&apos;s rail reform agenda, including the Passenger Railway Services (Public Ownership) Act 2024 which enables direct operation of franchises as they expire, is intended to create clearer accountability and more coherent operational management. Whether it translates into measurable punctuality improvement will be the test of the reform in the years ahead.</p>
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
