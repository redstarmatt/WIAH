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
          finding="Water companies lose 2,780 megalitres per day to leakage &mdash; roughly 20% of total supply, enough to serve 20 million people. An estimated 25% of England&apos;s water pipes are over 100 years old, and the annual infrastructure investment gap has widened to &pound;7.8 billion."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England and Wales&apos;s water and sewerage network comprises approximately 345,000 kilometres of water mains and 360,000 kilometres of sewers, serving 56 million customers through 11 privatised water and sewerage companies and 6 water-only companies. Ofwat, the economic regulator, reported that the industry lost 2,780 megalitres per day to leakage in 2023/24 &mdash; equivalent to roughly 20% of the total water put into supply and enough to fill 1,100 Olympic swimming pools every day. The leakage rate has fallen 17% since 2010, but progress has stalled in recent years: the 2024 figure is barely below the 2020 level. The government&apos;s 2023 Plan for Water set a target of halving leakage by 2050, but the Environment Agency noted that at current rates of improvement, this target will not be met.</p>
            <p>The age and condition of the pipe network is a core driver of the problem. The Water Industry Commission for Scotland estimated that 25% of pipes in England are over 100 years old, with some Victorian-era infrastructure still in daily use. Burst rates &mdash; the frequency of pipe failures per kilometre &mdash; have increased in 7 of the 11 water and sewerage companies since 2019/20. Thames Water, the largest company serving 15 million customers in London and the Thames Valley, reported 23% leakage and is currently under financial restructuring with &pound;16 billion of debt. Lead pipes remain in an estimated 5&ndash;7 million UK properties, predominantly in homes built before 1970. Lead contamination at the tap is not routinely monitored, and there is no UK-wide replacement programme; the Drinking Water Inspectorate relies on individual property owners to replace their portion of the supply pipe.</p>
            <p>Ofwat sets five-year price review periods that determine how much companies can invest and charge customers. The PR24 determination, covering 2025&ndash;2030, allowed &pound;88 billion of total expenditure across the industry, including &pound;21.4 billion specifically for environmental improvements. However, Infrastructure UK and the National Infrastructure Commission have estimated an annual investment gap of &pound;7.8 billion between what is being spent and what is needed to bring the network to a sustainable condition. Water companies have been criticised for paying &pound;72 billion in dividends to shareholders since privatisation in 1989 while accumulating &pound;64 billion in debt, much of it used to fund those same dividends through financial engineering. The Water (Special Measures) Act 2024 introduced new powers for Ofwat to restrict dividends and impose personal liability on water company executives for environmental failures.</p>
            <p>Infrastructure quality varies significantly between water company areas. Southern Water, serving 4.7 million customers across Kent, Sussex, Hampshire, and the Isle of Wight, had the highest pollution incident rate in 2023 and was fined &pound;126 million in 2021 for deliberately dumping sewage. Thames Water&apos;s network is the oldest and most congested, with London&apos;s population growth placing extreme demand on Victorian-era mains. Severn Trent in the Midlands and United Utilities in the North West have performed better on leakage reduction. Scotland&apos;s publicly owned Scottish Water has delivered faster leakage reduction than most English companies, reaching 465 megalitres per day across a network serving 5.4 million people. Welsh Water (Dwr Cymru), a not-for-profit company, reinvests all surplus into infrastructure. Northern Ireland Water, also publicly owned, faces its own challenges with aging infrastructure and has been subject to repeated regulatory criticism.</p>
            <p>Leakage data is self-reported by water companies to Ofwat and relies on a &ldquo;minimum night flow&rdquo; calculation methodology that estimates leakage based on the difference between supply and measured consumption during low-usage hours. This methodology has significant margins of error and was changed in 2020, creating a break in the time series that makes pre- and post-2020 comparisons approximate rather than precise. The &ldquo;25% of pipes over 100 years old&rdquo; figure is an industry estimate; water companies do not have complete, verified records of every pipe&apos;s installation date. The investment gap figure depends on assumptions about required service levels and asset life that are contested between companies, regulators, and independent analysts. Lead pipe counts are estimated from property age data, not direct surveys. Water quality monitoring at the tap covers only a sample of properties, and the Drinking Water Inspectorate&apos;s annual report acknowledges that localised contamination from lead or other sources may not be captured in routine testing.</p>
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
