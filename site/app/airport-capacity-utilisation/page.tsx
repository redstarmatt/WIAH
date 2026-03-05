'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface AirportCapacityUtilisationData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    heathrowUtilPct: number
    ukPassengersM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function AirportCapacityUtilisationPage() {
  const [data, setData] = useState<AirportCapacityUtilisationData | null>(null)

  useEffect(() => {
    fetch('/data/airport-capacity-utilisation/airport_capacity_utilisation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'ukPassengers',
          label: 'UK passengers (m)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ukPassengersM,
          })),
        },
        {
          id: 'heathrowUtil',
          label: 'Heathrow utilisation (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.heathrowUtilPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Airport Capacity Utilisation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Airport Capacity Utilisation"
          question="Are British Airports Running Out of Capacity?"
          finding="Heathrow operated at 97% of capacity in 2024, the highest utilisation of any major European hub, with no new runway decision taken."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Heathrow &mdash; the UK&apos;s primary international hub &mdash; handled approximately 81 million passengers in 2024 at 97&percnt; of operational capacity, the highest utilisation of any major European hub. The Airports Commission concluded in 2015 that a third runway was the right answer to the UK&apos;s capacity needs; the government accepted this in 2018, but legal challenges, the pandemic, and net zero debates have delayed a development consent order indefinitely. Gatwick has a DCO application in progress for a second runway adding approximately 15 million passengers. The geographic constraint is acute: the absence of a strong second hub outside London-Heathrow limits connectivity for businesses and individuals in northern and western England, where international routes are often thin, infrequent, and expensive. Aviation&apos;s climate obligations complicate the picture further &mdash; the sector accounted for approximately 7&percnt; of UK greenhouse gas emissions in 2023, and the Climate Change Committee has been clear that demand growth must be constrained to reach net zero.</p>
            <p>For passengers and businesses today, the capacity constraint translates into higher fares on popular routes where demand exceeds supply, limited slot availability for new services, and the absence of direct connections to secondary international destinations that would be commercially viable with more capacity. Heathrow&apos;s slot allocation system, where most slots are historically held by incumbent airlines, creates a significant barrier for new route entry. The Airports Commission estimated the trade cost of no Heathrow expansion at &pound;14 billion annually by 2030 &mdash; connectivity foregone through routes that cannot be established and investment that goes to competing hubs in Amsterdam, Paris, Frankfurt, and Dubai instead.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Capacity & Passengers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Heathrow capacity utilisation"
              value="97%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="97% in 2024 &middot; constrained vs Schiphol 72%"
              sparklineData={[91, 92, 93, 95, 97, 40, 75, 88, 97]}
              onExpand={() => {}}
              source="CAA &middot; Airport Statistics 2024"
            />
            <MetricCard
              label="UK airport passengers 2024"
              value="266m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+12% since 2019 &middot; recovered to pre-pandemic"
              sparklineData={[225, 232, 238, 244, 252, 74, 166, 210, 266]}
              onExpand={() => {}}
              source="CAA &middot; Airport Statistics 2024"
            />
            <MetricCard
              label="Trade cost of no expansion (est)"
              value="&pound;14bn"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Estimated trade loss without Heathrow expansion"
              sparklineData={[8, 9, 9, 10, 11, 11, 12, 13, 14]}
              onExpand={() => {}}
              source="Airports Commission &middot; Economic Analysis 2015, updated 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK airport passengers and Heathrow capacity utilisation, 2016&ndash;2024"
              subtitle="Total UK airport passenger numbers (millions) and Heathrow percentage capacity utilisation."
              series={series}
              yLabel="Passengers (millions) / Utilisation (%)"
              source={{
                name: 'Civil Aviation Authority',
                dataset: 'Airport Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Civil Aviation Authority &mdash; Airport Statistics. Published annually. caa.co.uk/data-and-analysis/uk-aviation-market/airports/</p>
            <p>Airports Commission &mdash; Final Report 2015, Economic Analysis. gov.uk/government/publications/airports-commission-final-report</p>
            <p>Heathrow capacity utilisation is passengers as a percentage of declared operational capacity. UK airport passengers is total passengers handled at all UK airports. 2020&ndash;21 data reflects pandemic disruption. Trade cost estimate is from Airports Commission economic modelling updated to 2024 prices.</p>
          </div>
        </section>
      </main>
    </>
  )
}
