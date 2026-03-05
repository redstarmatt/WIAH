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
            <p>Airport capacity has been a contested topic in UK transport and economic policy for three decades. The core issue is straightforward: Heathrow &mdash; the UK&apos;s primary international hub airport and one of the busiest in the world &mdash; is operating at or near its maximum throughput capacity. With two runways and the legal and physical constraints they impose on total aircraft movements, Heathrow cannot grow to serve additional routes or absorb additional demand without significant capital investment in new runway capacity. In 2024, it handled approximately 81 million passengers &mdash; 97% of its operational capacity &mdash; and demand modelling suggests that without new capacity, the UK will lose potential aviation connectivity.</p>
            <p>The aviation sector contends that airport capacity is not merely a transport question but an economic one. Direct air connectivity links UK businesses to export markets, facilitates foreign direct investment, and enables the UK to compete as a hub for connecting passengers who could equally route through Amsterdam, Paris, Frankfurt, or Dubai. The Airports Commission, chaired by Sir Howard Davies, concluded in 2015 that a third runway at Heathrow was the right answer to the UK&apos;s airport capacity needs. The government accepted this recommendation in principle in 2018 but the project has since been delayed by legal challenges, the pandemic, and debates about its compatibility with net zero commitments. Planning application preparation is ongoing but a development consent order has not yet been granted.</p>
            <p>Gatwick &mdash; London&apos;s second airport &mdash; has a Development Consent Order application in progress for a second runway using its existing emergency runway, which would add approximately 15 million additional passenger capacity. Manchester is constrained by its existing two-runway configuration and faces similar capacity pressures in the medium term. Edinburgh, Bristol, and Birmingham are all growing but face no immediate physical capacity constraint. The geographic distribution of airport capacity affects regional connectivity: flights between UK regional airports and international destinations outside the main European hubs are often thin, infrequent, and expensive, and the absence of a strong second hub outside London-Heathrow limits the depth of connectivity available to businesses and individuals in northern and western England.</p>
            <p>Aviation&apos;s climate obligations complicate the capacity question. Aviation accounted for approximately 7% of UK greenhouse gas emissions in 2023, and the Climate Change Committee has been clear that sustainable aviation fuel, improved aircraft efficiency, and demand management will all be needed to reach net zero. The CCC&apos;s analysis assumes that aviation demand growth is constrained, with some scenarios showing absolute demand reduction by mid-century. In this context, expanding airport capacity &mdash; which implicitly enables demand growth &mdash; is in tension with climate commitments. The government&apos;s position is that the UK can accommodate both capacity expansion (subject to planning) and net zero, with SAF mandates and carbon pricing compensating for the emissions from additional flights. Environmental groups dispute this.</p>
            <p>For passengers and businesses in 2024, the capacity constraint manifests as high fares on popular routes (where demand exceeds supply), limited slot availability for new routes, and the absence of direct services to some secondary international destinations that would be viable if capacity were available. Heathrow&apos;s slot system &mdash; where most slots are historically allocated to incumbent airlines and must be returned if unused &mdash; creates a significant barrier to entry for new routes. The Williams Review of Aviation Connectivity and the CAA&apos;s slot reform consultation are examining whether current slot allocation rules provide the right incentives for maximising the connectivity value of the existing slot pool. These are incremental adjustments; they do not resolve the structural question of whether the UK&apos;s hub airport will ever get its third runway.</p>
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
