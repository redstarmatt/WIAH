'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface HeatNetworkData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{ year: number; marketSharePct: number; homesConnectedK: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function HeatNetworkRolloutPage() {
  const [data, setData] = useState<HeatNetworkData | null>(null)

  useEffect(() => {
    fetch('/data/heat-network-rollout/heat_network_rollout.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'homesConnectedK',
        label: 'Homes connected (thousands)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.homesConnectedK })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Heat Network Rollout" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Heat Network Rollout"
          question="Are Heat Networks Delivering Low-Carbon Heating?"
          finding="Heat networks supply less than 3% of UK heat demand — far below the 20% target for 2050 — and many existing networks still emit more than individual boilers."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Heat networks &mdash; systems that distribute heat from a central source through insulated pipes to multiple buildings &mdash; currently supply 2.8% of UK heat demand across approximately 16,000 networks serving 480,000 homes. The Climate Change Committee&rsquo;s Sixth Carbon Budget requires that share to grow to around 20% by 2050, prioritising dense urban areas where building density makes individual heat pumps less economic. The quality of the existing estate is highly variable: a 2021 survey found 35% of heat networks had a higher carbon intensity than modern condensing gas boilers, connected to gas CHP plant rather than low-carbon sources. The Heat Network (Regulation) Act 2023 established a new Ofgem-overseen regime from 2024&ndash;25, requiring all networks to register and achieve minimum performance standards &mdash; a significant step given that network customers previously had fewer consumer protections than gas or electricity customers.</p>
            <p>The economics of expansion are challenging. Distribution infrastructure in urban settings costs &pound;1&ndash;3 million per kilometre before any revenue is generated, and the merchant risk of building ahead of connections deters private finance. Local authorities are the critical enabling actors &mdash; securing planning permissions, providing anchor loads from council buildings and social housing, and managing highway access &mdash; but many lack the capacity or risk appetite for the role. The government&rsquo;s Heat Network Zoning framework, advanced in 2024&ndash;25, would designate areas where heat networks are the preferred heating solution, creating market certainty for investors, and represents the most significant demand-side intervention to date to close the gap between the 480,000 homes currently connected and the several million needed by 2050.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Heat network market share"
              value="2.8%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+1.1pp since 2015 · target 20% by 2050"
              sparklineData={[1.7, 1.8, 2.0, 2.1, 2.2, 2.3, 2.4, 2.6, 2.8]}
              source="DESNZ · Heat Networks in GB 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Networks delivering higher emissions"
              value="35%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="35% of networks dirtier than gas boilers"
              sparklineData={[42, 41, 40, 39, 38, 37, 36, 35, 35]}
              source="DESNZ · Heat Network Efficiency Review 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Homes on heat networks"
              value="480,000"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+130k since 2019 · regulated from 2025"
              sparklineData={[200000, 220000, 250000, 280000, 310000, 340000, 380000, 430000, 480000]}
              source="DESNZ · Heat Networks in GB 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Homes connected to heat networks, 2016–2024"
              subtitle="Cumulative number of homes receiving heat from heat networks in Great Britain (thousands)."
              series={series}
              yLabel="Homes (thousands)"
              source={{ name: 'DESNZ', dataset: 'Heat Networks in Great Britain', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ. Heat Networks in Great Britain. Annual statistics on heat network connections and market share. <a href="https://www.gov.uk/government/statistics/heat-networks-in-great-britain" className="underline" target="_blank" rel="noopener noreferrer">gov.uk</a>. Data collected via industry survey; smaller networks may be under-represented.</p>
            <p>Heat Network Regulation Act 2023. Ofgem regulatory framework coming into force 2024&ndash;25. Market share calculated as percentage of total final energy consumption for heating and hot water.</p>
          </div>
        </section>
      </main>
    </>
  )
}
