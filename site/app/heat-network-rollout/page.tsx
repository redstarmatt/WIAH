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
            <p>Heat networks &mdash; systems that distribute heat from a central source to multiple buildings through a network of insulated pipes &mdash; are identified in government analysis as a critical component of the UK&apos;s net zero pathway. The Climate Change Committee&apos;s Sixth Carbon Budget assessment includes ambitious heat network expansion: from the current 2.8% of heat demand to approximately 20% by 2050. This expansion is particularly important in urban areas where building density makes individual heat pumps less suitable and where economies of scale make central heating plant viable. Dense city areas, new housing developments, and large commercial districts are all identified as priority network expansion opportunities.</p>
            <p>The current heat network sector in the UK is diverse and inconsistent in quality. Approximately 16,000 heat networks exist across Great Britain, serving around 480,000 homes and providing heat for many commercial and public buildings. But the quality, efficiency, and carbon intensity of these networks varies enormously. Some networks &mdash; particularly those connecting to low-carbon heat sources such as waste heat from data centres, industrial processes, or large heat pumps &mdash; deliver genuinely low-carbon heat. Others, connected to gas Combined Heat and Power (CHP) plant, deliver heat at emissions intensities that are currently higher than modern individual condensing gas boilers. A 2021 survey found that approximately 35% of heat networks had a higher carbon intensity than individual gas boilers.</p>
            <p>Regulation is the primary policy lever for improving network quality. The Heat Network (Regulation) Act 2023 established a new regulatory regime for heat networks, to be overseen by Ofgem, coming into force progressively from 2024&ndash;25. All heat networks will be required to register, comply with consumer protection standards, and achieve minimum performance standards. This is a significant step: previously, heat network customers had fewer consumer protections than customers of gas or electricity suppliers and no guaranteed right of redress for poor service or overcharging. The regulation will also require network operators to set out transition plans to low-carbon heat sources where their current networks are fossil-fuel based.</p>
            <p>The economics of heat network expansion are challenging. Building new heat networks requires significant upfront capital investment in distribution infrastructure &mdash; insulated pipe networks can cost &pound;1&ndash;3 million per kilometre to install in urban settings &mdash; before any revenue is generated. The Heat Network Investment Project (HNIP) and its successor Heat Network Efficiency Scheme have provided public capital co-investment, but at a relatively modest scale compared to the investment needed for the 2050 target. Private finance is available for networks with strong anchor loads and reliable revenue streams, but the merchant risk of building ahead of connections is a significant barrier.</p>
            <p>Local authorities have a critical enabling role in heat network expansion. Strategic energy planning &mdash; identifying optimal network locations, securing planning permissions, managing public land and highway access for pipe installation, and providing anchor loads from council buildings and social housing &mdash; is largely a local authority function. Some councils, particularly in Labour-controlled urban areas, have become active heat network developers and managers. Others lack the capacity, skills, or risk appetite for this role. The government&apos;s Heat Network Zoning consultation &mdash; which would designate areas where heat networks are the preferred heating solution, creating market certainty for investors &mdash; was advanced in 2024&ndash;25 and represents the most significant demand-side policy intervention to date.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Networks delivering higher emissions"
              value="35%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="35% of networks dirtier than gas boilers"
              sparklineData={[42, 41, 40, 39, 38, 37, 36, 35, 35]}
              source="DESNZ · Heat Network Efficiency Review 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Homes on heat networks"
              value="480,000"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+130k since 2019 · regulated from 2025"
              sparklineData={[200000, 220000, 250000, 280000, 310000, 340000, 380000, 430000, 480000]}
              source="DESNZ · Heat Networks in GB 2024"
              onExpand={() => {}}
            />
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
