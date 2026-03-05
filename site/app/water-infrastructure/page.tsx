'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface WaterInfraData {
  national: {
    leakage: Array<{ year: number; megalitresPerDay: number }>
    investmentGap: Array<{ year: number; billionGBP: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function WaterInfrastructurePage() {
  const [data, setData] = useState<WaterInfraData | null>(null)

  useEffect(() => {
    fetch('/data/water-infrastructure/water_infrastructure.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const leakageSeries: Series[] = data
    ? [{
        id: 'leakage',
        label: 'Daily water leakage',
        colour: '#264653',
        data: data.national.leakage.map(d => ({ date: yearToDate(d.year), value: d.megalitresPerDay })),
      }]
    : []

  const investmentSeries: Series[] = data
    ? [{
        id: 'investment-gap',
        label: 'Estimated annual investment gap',
        colour: '#E63946',
        data: data.national.investmentGap.map(d => ({ date: yearToDate(d.year), value: d.billionGBP })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Water Infrastructure" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water Infrastructure"
          question="Is Britain&apos;s Water System Actually Falling Apart?"
          finding="Water companies lose 2,780 megalitres per day to leakage &mdash; roughly 20&percnt; of total supply, enough to serve 20 million people. An estimated 25&percnt; of England&apos;s water pipes are over 100 years old, and the annual infrastructure investment gap has widened to &pound;7.8 billion."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England and Wales&apos;s water and sewerage network loses 2,780 megalitres per day to leakage &mdash; roughly 20&percnt; of total supply and enough to fill 1,100 Olympic swimming pools every day. The rate has fallen 17&percnt; since 2010, but progress has stalled and the 2023 Plan for Water&apos;s target of halving leakage by 2050 will not be met at current rates. An estimated 25&percnt; of pipes in England are over 100 years old, burst rates have increased in 7 of the 11 water and sewerage companies since 2019/20, and lead pipes remain in 5&ndash;7 million properties with no national replacement programme. The National Infrastructure Commission estimates an annual investment gap of &pound;7.8 billion between current spending and what is needed to bring the network to a sustainable condition. Water companies paid &pound;72 billion in dividends to shareholders since privatisation while accumulating &pound;64 billion in debt, much of it used to fund those dividends; Thames Water, serving 15 million customers, is under financial restructuring with &pound;16 billion of debt.</p>
            <p>Infrastructure quality and financial resilience vary sharply between companies. Thames Water and Southern Water have the worst leakage rates and environmental records; Southern was fined &pound;126 million in 2021 for deliberately dumping sewage. By contrast, Scotland&apos;s publicly owned Scottish Water and Wales&apos;s not-for-profit Dwr Cymru both reinvest surpluses into infrastructure and have delivered better outcomes. The Water (Special Measures) Act 2024 introduced new powers for Ofwat to restrict dividends and impose personal liability on executives &mdash; a belated regulatory tightening after decades in which financial engineering took precedence over network investment.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-leakage', label: 'Leakage' },
          { id: 'sec-investment', label: 'Investment Gap' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Water lost to leakage per day"
              value="2,780"
              unit="ML/day"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 17% since 2010 but progress has stalled; 20% of total supply"
              sparklineData={[3360, 3240, 3110, 3070, 3020, 2923, 2830, 2780]}
              source="Ofwat water company performance"
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual infrastructure investment gap"
              value="&pound;7.8bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Growing gap between actual spending and estimated need"
              sparklineData={[4.2, 4.8, 5.6, 6.3, 7.1, 7.8]}
              source="National Infrastructure Commission"
              onExpand={() => {}}
            />
            <MetricCard
              label="Properties with lead pipes"
              value="5&ndash;7m"
              direction="flat"
              polarity="up-is-bad"
              changeText="Predominantly pre-1970 housing; no national replacement programme"
              sparklineData={[7, 6.8, 6.5, 6.2, 6, 5.8]}
              source="Drinking Water Inspectorate"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-leakage" className="mb-12">
            <LineChart
              title="Daily water leakage, England &amp; Wales, 2010&ndash;2024"
              subtitle="Megalitres per day lost to leakage across all water companies. Ofwat annual performance data."
              series={leakageSeries}
              yLabel="ML/day"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-investment" className="mb-12">
            <LineChart
              title="Estimated annual water infrastructure investment gap, 2015&ndash;2025"
              subtitle="Difference between current capital investment and estimated requirement (&pound;bn). National Infrastructure Commission."
              series={investmentSeries}
              yLabel="&pound; billion"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
