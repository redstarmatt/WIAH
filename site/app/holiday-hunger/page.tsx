'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface HolidayHungerData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    childrenAtRiskM: number
    hafReachK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function HolidayHungerPage() {
  const [data, setData] = useState<HolidayHungerData | null>(null)

  useEffect(() => {
    fetch('/data/holiday-hunger/holiday_hunger.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'childrenAtRiskM',
          label: 'Children at risk (millions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childrenAtRiskM })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Holiday Hunger" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Poverty"
          question="Are Children Going Hungry in School Holidays?"
          finding="2.5 million children are at risk of holiday hunger when free school meal provision ends at half-terms and holidays."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>During term time, approximately 1.9 million children in England receive free school meals. When schools close for summer, half-term, Christmas, and Easter, that provision stops &mdash; and for households in severe food insecurity, the loss of a guaranteed meal causes genuine nutritional deprivation. An estimated 2.5 million children are at risk, up 300,000 since 2019. Food bank data provides the clearest evidence: the Trussell Trust records a systematic 40&percnt; spike in parcel distribution during school holidays, with summer generating the highest single monthly totals of the year and families with children as the fastest-growing demographic. The Holiday Activities and Food (HAF) programme, expanded nationally from 2021, reached approximately 650,000 children in 2023&ndash;24 &mdash; around 34&percnt; of the eligible population &mdash; with wide variation in reach and quality between local authorities.</p>
            <p>The free school meal eligibility threshold &mdash; household income below &pound;7,400 after benefits &mdash; excludes many working poor families and has not been uprated for inflation. Marcus Rashford&rsquo;s 2020 campaign successfully extended voucher provision during COVID holidays, demonstrating that targeted universal provision was administratively achievable; the subsequent return to means-tested provision left the policy essentially unchanged. The Child Poverty Strategy published in 2024 included commitments to review FSM thresholds, but the gap between 1.9 million children on free school meals and 2.5 million estimated at risk of holiday hunger during closures illustrates the scale of what remains unaddressed. The burden of that gap falls overwhelmingly on families in the most deprived areas, where food bank reliance is already highest and HAF programme reach is most variable.</p>
          </div>
        </section>

        <SectionNav
          sections={[
            { id: 'sec-metrics', label: 'Metrics' },
            { id: 'sec-chart', label: 'Chart' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children at risk of holiday hunger"
              value="2.5m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+300k since 2019 · FSM eligibility threshold"
              sparklineData={[1.8, 1.9, 2.0, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5]}
              source="Food Foundation / Trussell Trust 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="HAF programme reach"
              value="650,000"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="650k reached · 34% of eligible children"
              sparklineData={[0, 0, 0, 0, 50000, 200000, 400000, 550000, 650000]}
              source="DfE · Holiday Activities and Food Programme 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Food bank use increase in holidays"
              value="+40%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+40% food bank use during summer holidays"
              sparklineData={[20, 22, 24, 25, 27, 30, 33, 37, 40]}
              source="Trussell Trust · End of Year Statistics 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Children at risk of holiday hunger, 2016–2024"
              subtitle="Estimated children in England at risk of food insecurity during school holidays (millions)."
              series={series}
              yLabel="Children (millions)"
              source={{ name: 'Food Foundation', dataset: 'Child Food Insecurity Tracker', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Children at risk figures from Food Foundation Child Food Insecurity Tracker, cross-referenced with DfE free school meal eligibility statistics. HAF programme reach from DfE programme monitoring returns. Food bank data from Trussell Trust End of Year Statistics. Holiday period food bank uplift from Trussell Trust monthly distribution analysis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
