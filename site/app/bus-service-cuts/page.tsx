'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface BusServiceCutsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    busMilesIndexVs2010: number
    passengerJourneysBn: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function BusServiceCutsPage() {
  const [data, setData] = useState<BusServiceCutsData | null>(null)

  useEffect(() => {
    fetch('/data/bus-service-cuts/bus_service_cuts.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'busMiles',
          label: 'Bus miles index (2010=100)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.busMilesIndexVs2010,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Bus Service Cuts" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bus Service Cuts"
          question="How Many Bus Routes Have Been Cut?"
          finding="England has lost 40% of its local bus miles since 2010, with 3,000 villages now having no bus service &mdash; a public transport collapse outside cities."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Local bus services outside major cities have experienced a prolonged and continuing decline since 2010. Bus miles operated by local authorities in England fell from approximately 1.8 billion in 2010 to approximately 1.1 billion in 2023 &mdash; a reduction of 40% in operational capacity. This has not been a uniform decline: London&apos;s bus network, which is tendered and managed by Transport for London, has been more stable. Outside London, deregulated commercial bus services &mdash; which operate on profitable routes without subsidy &mdash; have been maintained or grown, but subsidised socially necessary services on less profitable routes have been progressively cut as local authority budgets contracted. The result is a two-tier system: frequent, reliable bus services in urban and suburban corridors with commercial viability; thin or non-existent coverage in rural and peripheral areas.</p>
            <p>The scale of route withdrawals has been substantial. Campaign for Better Transport estimates that approximately 3,780 bus routes were cut, reduced or withdrawn between 2010 and 2024. The number of villages with no bus service at all &mdash; defined as having no regular scheduled bus service within a reasonable walking distance &mdash; has grown to approximately 3,000, leaving communities dependent entirely on private cars or community transport. This has particular consequences for older and disabled people without access to a car, young people without driving licences, and low-income households for whom car ownership is not affordable.</p>
            <p>The funding structure of bus services outside London is directly responsible for the decline. When central government funding for local authority transport declined significantly from 2010 onwards &mdash; local authority transport budgets fell approximately 45% in real terms between 2010 and 2022 &mdash; councils reduced subsidised routes to balance budgets. Bus operators, operating commercially on unsubsidised routes, responded to declining passenger numbers (themselves partly driven by reduced service quality and frequency) by reducing further. This feedback loop &mdash; fewer passengers, lower frequency, fewer passengers &mdash; is well established in public transport economics. Bus Passenger Statistics recorded 3.2 billion bus journeys in 2023, down from a peak of over 5 billion in the early 2000s.</p>
            <p>The Bus Back Better national strategy, published in 2021, was the most ambitious bus reform agenda in England outside London in decades. It committed to improved bus services across England through Bus Service Improvement Plans, new enhanced partnership structures between councils and operators, and investment from the Bus Recovery Grant and Zero Emission Bus Regional Areas (ZEBRA) fund. Early evidence from Bus Service Improvement Plans was mixed: some areas delivered measurable frequency improvements and fare caps (including Greater Manchester&apos;s &apos;Bee Network&apos; bus transition from commercial to franchised operation), while others found that the available funding was insufficient to deliver meaningful improvements given the scale of previous cuts. The Labour government&apos;s Bus Services Act 2024 gave all combined authorities outside London franchising powers, with a pathway to the Bus Back Better model at scale.</p>
            <p>The social and economic costs of bus service reductions are difficult to quantify fully but are significant. Transport poverty &mdash; the inability to access work, education, healthcare and social activities due to inadequate or unaffordable transport &mdash; is a documented barrier to employment, particularly for low-income rural households. Car ownership costs have risen significantly &mdash; insurance, fuel, and the shift to EVs &mdash; making the absence of bus alternatives more costly. The environmental dimension adds a further layer: each bus passenger removed from public transport represents the potential addition of a car journey. The government&apos;s net zero pathway depends on modal shift from private cars to public transport, and bus is the modal option for the vast majority of people who do not live near a train station.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Bus Miles' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Local bus miles lost since 2010"
              value="40%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="-40% since 2010 &middot; 3,000 villages with no service"
              sparklineData={[100, 97, 94, 91, 88, 85, 80, 76, 72]}
              onExpand={() => {}}
              source="DfT &middot; Bus Statistics Annual Report 2024"
            />
            <MetricCard
              label="Bus routes cut 2010&ndash;2024"
              value="3,780"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Cumulative cuts over 14 years"
              sparklineData={[200, 500, 900, 1300, 1700, 2100, 2600, 3200, 3780]}
              onExpand={() => {}}
              source="Campaign for Better Transport &middot; Bus Report 2024"
            />
            <MetricCard
              label="Annual bus passenger journeys"
              value="3.2bn"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 5bn peak &middot; 30-year low"
              sparklineData={[4.2, 4.1, 3.9, 3.8, 3.7, 1.8, 2.9, 3.1, 3.2]}
              onExpand={() => {}}
              source="DfT &middot; Bus Statistics Annual Report 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Local bus miles operated in England (index, 2010=100), 2016&ndash;2024"
              subtitle="Local bus vehicle miles operated, excluding London, indexed to 2010 levels."
              series={series}
              yLabel="Index (2010=100)"
              source={{
                name: 'Department for Transport',
                dataset: 'Bus Statistics Annual Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Transport &mdash; Bus Statistics Annual Report. Published annually. gov.uk/government/collections/bus-statistics</p>
            <p>Campaign for Better Transport &mdash; Bus Report 2024. bettertransport.org.uk</p>
            <p>Bus miles index uses 2010 as baseline of 100, excluding London. Passenger journeys in billions from DfT Bus Statistics Table BUS0101. Route cut figures are cumulative estimates from Campaign for Better Transport monitoring of service registrations. 2021 data reflects pandemic disruption in passenger journeys.</p>
          </div>
        </section>
      </main>
    </>
  )
}
