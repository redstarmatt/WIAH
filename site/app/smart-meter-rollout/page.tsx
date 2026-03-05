'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface SmartMeterRolloutData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    installedM: number
    dumbModeM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function SmartMeterRolloutPage() {
  const [data, setData] = useState<SmartMeterRolloutData | null>(null)

  useEffect(() => {
    fetch('/data/smart-meter-rollout/smart_meter_rollout.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'installed',
          label: 'Total installed',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.installedM,
          })),
        },
        {
          id: 'dumbMode',
          label: "In 'dumb mode'",
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.dumbModeM,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Smart Meter Rollout" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Smart Meter Rollout"
          question="How Many Homes Actually Have a Working Smart Meter?"
          finding="57% of UK homes have a smart meter, but 25% of installed meters are operating in &lsquo;dumb mode&rsquo; &mdash; not communicating with suppliers &mdash; undermining the programme&apos;s purpose."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK smart meter rollout &mdash; the largest energy infrastructure programme since the National Grid &mdash; began in 2012 with a target of universal installation by 2020, revised first to 2024, then 2025. By March 2024, approximately 35.7 million smart meters had been installed, covering 57&percnt; of eligible meters. The first-generation SMETS1 meters, installed between 2014 and 2018, used proprietary communications tied to the original supplier: when a customer switched, the meter lost its smart capability and reverted to a standard &ldquo;dumb&rdquo; meter. An estimated 8.9 million SMETS1 meters remain in dumb mode as of 2024 &mdash; 25&percnt; of all installed devices &mdash; despite an ongoing remote enrolment programme into the national DCC network. DESNZ targets 80&percnt; installation coverage by 2025 and 90&percnt; by 2030, but achieving this requires resolving the SMETS1 backlog, overcoming consumer opt-outs (5&ndash;10&percnt; of contacted households), and reaching hard-to-serve properties in rural and multiple-occupancy buildings.</p>
            <p>The economic case for smart meters rests on system-level benefits that only materialise at scale. A working smart meter with an in-home display saves the average household an estimated &pound;87 per year through behaviour change and accurate billing. But the larger prize is demand-side flexibility: shifting electricity consumption to periods of high renewable generation and low grid stress, which becomes critical as intermittent renewables approach 50&ndash;70&percnt; of the generation mix. Every meter stuck in dumb mode is infrastructure that cannot participate in that transition, undermining the &pound;13 billion programme&apos;s purpose and delaying the grid balancing the net zero transition depends on.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Rollout Progress' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Smart meters installed"
              value="35.7m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="35.7m &middot; 57% of all meters in Britain"
              sparklineData={[5.1, 8.2, 12.0, 16.3, 21.0, 24.5, 27.8, 31.0, 35.7]}
              href="#sec-chart"source="DESNZ &middot; Smart Meters Statistical Release 2024"
            />
            <MetricCard
              label="Meters in &lsquo;dumb mode&rsquo;"
              value="8.9m"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="25% of installed not communicating"
              sparklineData={[2.0, 4.1, 7.8, 10.2, 11.5, 12.0, 11.0, 10.0, 8.9]}
              href="#sec-chart"source="DESNZ &middot; Smart Meters Statistical Release 2024"
            />
            <MetricCard
              label="Estimated annual saving (working)"
              value="&pound;87"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="&pound;87/yr avg when meter working properly"
              sparklineData={[45, 50, 55, 60, 65, 70, 75, 80, 87]}
              href="#sec-chart"source="DESNZ &middot; Smart Meter Impact Assessment 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Smart meter installations vs dumb mode meters, 2016&ndash;2024"
              subtitle="Cumulative smart meters installed and number operating without communication capability."
              series={series}
              yLabel="Meters (millions)"
              source={{
                name: 'DESNZ',
                dataset: 'Smart Meters Statistical Release',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ &mdash; Smart Meters Statistical Release. Published quarterly. gov.uk/government/collections/smart-meters-statistics</p>
            <p>DESNZ &mdash; Smart Meter Impact Assessment 2024. gov.uk/government/publications/smart-metering-implementation-programme-cost-benefit-analysis</p>
            <p>Installed meters are cumulative smart and advanced meters in operation. Dumb mode meters are SMETS1 installations not communicating via DCC network &mdash; ongoing remote enrolment means this figure changes quarterly. Annual saving estimate is mean household saving from DESNZ randomised control trial and econometric analysis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
