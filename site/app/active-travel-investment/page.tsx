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
            <p>The case for active travel &mdash; walking and cycling &mdash; as a component of national transport policy has strengthened significantly over the past decade. The public health benefits of regular walking and cycling are well-established: a physically active commute reduces risk of cardiovascular disease, type 2 diabetes, and mental health problems. The carbon benefits are additive: every cycling trip that replaces a car trip removes approximately 250g of CO2 per kilometre. The economic benefits include reduced congestion, lower NHS costs, and higher footfall in retail areas along active travel routes. The question is whether investment in infrastructure is sufficient to shift a meaningfully large proportion of trips from car to active modes.</p>
            <p>Active Travel England, established in 2022, represents the government&apos;s recognition that active travel requires a dedicated delivery body with ringfenced funding and national standards. Its budget of &pound;1.1 billion in 2023 &mdash; allocated across walking, cycling, and wheeling infrastructure &mdash; is approximately four times the level of active travel investment in 2019. But absolute investment levels must be contextualised: the UK spends approximately &pound;2.50 per person per year on cycling infrastructure, compared to the Netherlands&apos; &pound;35 per person and Denmark&apos;s &pound;25. The gap in per-capita investment explains much of the gap in cycling mode share: the Netherlands achieves 27% of all trips by bicycle, Denmark 17%, Germany 10%, and the UK 2.4%.</p>
            <p>Infrastructure quality is as important as quantity. Protected cycle lanes &mdash; physically separated from motor traffic &mdash; generate significantly higher uptake than painted cycle lanes on busy roads. The Cycling and Walking Investment Strategy (CWIS) target of 55% of trips in towns being made on foot or by bike by 2025 has not been achieved, partly because much of the historic investment was in sub-optimal infrastructure that does not change behaviour for all but the most committed cyclists. The evidence from completed schemes with high-quality segregated infrastructure &mdash; including the East-West Cycle Superhighway in London, Torrington Place in Bloomsbury, and sections of the Trans Pennine Trail &mdash; shows that high-quality protected routes do attract new cyclists.</p>
            <p>E-bikes are transforming the geography and demography of cycling. Battery-assisted cycling extends the range and effort threshold that makes cycling viable for a wider population &mdash; older people, those with moderate fitness limitations, people cycling with cargo or children, people commuting over hilly terrain. E-bike sales in the UK tripled between 2019 and 2024, and their share of new bike sales reached 34% in 2023. The modal share data does not yet fully reflect e-bike growth, but travel surveys are beginning to show increased cycling distances and frequency among age groups that historically had very low cycling rates &mdash; a structural shift rather than a temporary behavioural aberration.</p>
            <p>The barriers to active travel growth beyond the enthusiast minority remain real. Road danger &mdash; actual and perceived &mdash; is the primary deterrent, particularly for women, older people, and parents cycling with children. 64% of people who do not currently cycle cite &apos;roads too dangerous&apos; as their reason in the National Travel Attitudes Survey. Junction design, HGV safety, and 20mph speed limits in urban areas are all components of the road danger reduction agenda that underpins active travel growth. School streets &mdash; restricting car access around schools at drop-off and pick-up &mdash; have proved one of the most effective local interventions, with evidence of sustained increases in walking and cycling to school. The current government&apos;s planning reforms require large new developments to meet active travel standards, embedding safer infrastructure from the design stage rather than retrofitting it.</p>
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
