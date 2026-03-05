'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface GridBatteryStorageData {
  timeSeries: Array<{
    year: number
    capacityGW: number
    curtailedTWh: number
  }>
  target2035GW: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function GridBatteryStoragePage() {
  const [data, setData] = useState<GridBatteryStorageData | null>(null)

  useEffect(() => {
    fetch('/data/grid-battery-storage/grid_battery_storage.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const capacitySeries: Series[] = data
    ? [{
        id: 'capacity',
        label: 'Battery capacity (GW)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.capacityGW,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Grid Battery Storage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Grid Battery Storage"
          question="Can the Grid Store Renewable Energy?"
          finding="UK grid battery capacity has grown from near-zero to 4.2 GW &mdash; but needs to reach 50 GW by 2035 to manage renewable intermittency."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&rsquo;s grid-scale battery fleet grew from less than 1 GW in 2017 to 5.1 GW by end-2024 &mdash; more than a sevenfold increase driven by falling lithium-ion costs, frequency response revenues, and relatively fast planning consents. But National Energy System Operator modelling for a net zero grid by 2035 requires approximately 50 GW of storage capacity, roughly ten times current levels. On the current growth trajectory, the UK reaches 12&ndash;15 GW by 2035 &mdash; a substantial shortfall at exactly the moment the grid will be most dependent on intermittent wind and solar. In 2023, 2.1 TWh of renewable energy was curtailed &mdash; switched off and wasted, enough to power 600,000 homes &mdash; with the cost of constraint payments falling on bill payers rather than on the platforms that failed to build enough storage.</p>
            <p>The economics of battery storage are evolving in ways that complicate the build-out. Frequency response revenues &mdash; the primary income stream for current 1&ndash;2 hour batteries &mdash; are falling as more assets compete for the same market. Longer-duration storage (8&ndash;24 hours) is needed to unlock arbitrage value as renewable intermittency increases, but the technology choices between flow batteries, compressed air, gravity, and hydrogen are not yet settled, and the government&rsquo;s cap-and-floor support mechanism for long-duration projects has been slow to reach commercial scale. A 30+ GW pipeline exists in planning, but converting consented capacity to construction requires revenue certainty the current policy framework has not yet provided.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Capacity Growth' },
          { id: 'sec-callout', label: 'Progress' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Battery capacity 2024"
              value="5.1 GW"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="7x growth since 2017 &middot; but 10x needed"
              sparklineData={[0.6, 0.9, 1.1, 1.5, 2.0, 2.9, 4.2, 5.1]}
              onExpand={() => {}}
              source="NESO &middot; Grid Battery Register 2024"
            />
            <MetricCard
              label="2035 target"
              value="50 GW"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Current trajectory reaches 12&ndash;15 GW &middot; gap real"
              sparklineData={[0.6, 1.1, 1.5, 2.0, 2.9, 4.2, 5.1, 6.5]}
              onExpand={() => {}}
              source="NESO &middot; Clean Power 2030 Analysis"
            />
            <MetricCard
              label="Curtailed renewable"
              value="1.8 TWh/yr"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Slightly improving as storage grows"
              sparklineData={[0.8, 1.0, 1.2, 1.4, 1.6, 1.9, 2.1, 1.8]}
              onExpand={() => {}}
              source="NESO &middot; Electricity Market Report 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK grid battery storage capacity, 2017&ndash;2024"
              subtitle="Total connected grid-scale battery storage capacity in gigawatts (GW). Excludes behind-the-meter and residential batteries."
              series={capacitySeries}
              yLabel="Capacity (GW)"
              source={{
                name: 'NESO / DESNZ',
                dataset: 'Renewable Energy Planning Database',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="World-Leading Battery Deployment"
              value="5.1 GW"
              unit="grid battery capacity"
              description="The UK deploys grid-scale batteries faster than almost any country in the world. GB's battery fleet is one of the largest in Europe and is growing at 40% a year, with pipeline projects totalling 30+ GW."
              source="NESO / DESNZ, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>National Energy System Operator (NESO) &mdash; Electricity Ten Year Statement and Clean Power 2030 analysis. nationalgrideso.com</p>
            <p>DESNZ &mdash; Renewable Energy Planning Database. Operational battery storage projects. gov.uk/government/collections/renewable-energy-planning-data</p>
            <p>NESO &mdash; Electricity Market Report. Curtailment and constraint data. nationalgrideso.com/data-portal</p>
            <p>Capacity figures represent total connected operational grid-scale battery storage (BESS) in Great Britain, excluding Northern Ireland. Curtailment figures include wind constraint payments and solar curtailment; not all curtailment is directly substitutable by storage. 2035 target is from NESO&rsquo;s Clean Power 2030 pathway; the actual requirement will depend on the future generation mix. Pipeline projections are based on pre-application and consented capacity in the REPD as of late 2024.</p>
          </div>
        </section>
      </main>
    </>
  )
}
