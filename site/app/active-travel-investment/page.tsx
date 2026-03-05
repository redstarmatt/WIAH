'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

interface ActiveTravelInvestmentData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    investmentBn: number
    cyclingTripsBn: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function ActiveTravelInvestmentPage() {
  const [data, setData] = useState<ActiveTravelInvestmentData | null>(null)

  useEffect(() => {
    fetch('/data/active-travel-investment/active_travel_investment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'investment',
          label: 'Investment (\u00a3bn)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.investmentBn,
          })),
        },
        {
          id: 'cyclingTrips',
          label: 'Cycling trips (bn)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cyclingTripsBn,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Active Travel Investment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Active Travel Investment"
          question="Is Britain Building a Walking and Cycling Nation?"
          finding="Active Travel England investment reached &pound;1.1 billion in 2023, but cycling represents just 2.4% of trips &mdash; well below comparable European countries."
          colour="#2A9D8F"
        />

        <PositiveCallout
          title="Cycling trips up 45% since 2019"
          value="45%"
          description="Cycling trips in England grew 45% between 2019 and 2024, with e-bikes driving significant growth in utility cycling and commuting. Active Travel England, established in 2022 as the dedicated delivery body, has overseen investment in 22 new major cycling corridors and over 1,000km of new protected infrastructure. Walking trips are also recovering and growing in urban areas following pandemic-driven behaviour change."
          source="Source: Active Travel England &mdash; Investment Report 2024; DfT &mdash; National Travel Survey 2024."
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Active Travel England, established in 2022, received &pound;1.1 billion in 2023 &mdash; roughly four times the level of active travel investment in 2019. Cycling trips in England grew 45% between 2019 and 2024, driven largely by e-bike adoption, with e-bike sales tripling and their share of new bike sales reaching 34% in 2023. Yet cycling remains just 2.4% of all trips, well below the Netherlands (27%), Denmark (17%), and Germany (10%). The UK&apos;s per-capita cycling infrastructure spend of &pound;2.50 compares with &pound;35 in the Netherlands. The Cycling and Walking Investment Strategy target of 55% of town trips by active modes by 2025 has not been achieved, and much of the historic investment went into sub-standard painted lanes rather than protected infrastructure that changes behaviour.</p>
            <p>Road danger &mdash; actual and perceived &mdash; remains the primary barrier, cited by 64% of non-cyclists in the National Travel Attitudes Survey. Women, older people, and parents with children are disproportionately deterred, creating a cycle use profile skewed heavily toward younger men. Geographic inequality is marked: London&apos;s dense network of protected lanes drives cycling rates far above those in regional cities and rural areas where infrastructure investment remains minimal. Planning reforms now require new developments to meet active travel standards, but retrofitting existing streets remains slow and contested.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Investment & Trips' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Active travel investment 2023"
              value="&pound;1.1bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+&pound;650m since 2020 &middot; dedicated agency created"
              sparklineData={[0.20, 0.25, 0.35, 0.45, 0.48, 0.50, 0.70, 0.90, 1.1]}
              onExpand={() => {}}
              source="Active Travel England &middot; Investment Report 2024"
            />
            <MetricCard
              label="Cycling share of all trips"
              value="2.4%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+0.6pp since 2019 &middot; well below EU peers"
              sparklineData={[1.6, 1.7, 1.8, 1.8, 1.8, 2.0, 2.1, 2.2, 2.4]}
              onExpand={() => {}}
              source="DfT &middot; National Travel Survey 2024"
            />
            <MetricCard
              label="Cycling trips per year"
              value="3.4bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+45% since 2019 &middot; e-bikes driving growth"
              sparklineData={[1.9, 2.0, 2.1, 2.3, 2.3, 2.5, 2.8, 3.1, 3.4]}
              onExpand={() => {}}
              source="DfT &middot; Cycling and Walking Investment Strategy Metrics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Active travel investment and cycling trips, 2016&ndash;2024"
              subtitle="Annual active travel infrastructure investment (&pound; billions) and cycling trips in England (billions)."
              series={series}
              yLabel="&pound; billions / trips (billions)"
              source={{
                name: 'Active Travel England',
                dataset: 'Investment Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Active Travel England &mdash; Investment Report 2024. gov.uk/government/organisations/active-travel-england</p>
            <p>Department for Transport &mdash; National Travel Survey 2024. gov.uk/government/collections/national-travel-survey-statistics</p>
            <p>Department for Transport &mdash; Cycling and Walking Investment Strategy Metrics 2024. gov.uk/government/publications/cycling-and-walking-investment-strategy</p>
            <p>Investment figures cover walking, cycling and wheeling infrastructure combined. Cycling trips from National Travel Survey diary data. Mode share percentage is cycling as proportion of all trips by all modes. E-bike sales data from Bicycle Association.</p>
          </div>
        </section>
      </main>
    </>
  )
}
