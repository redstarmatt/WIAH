'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface WaterStressRow {
  year: number
  highStressAreas: number
  supplyDemandGap2050Bn?: number
}

interface WaterStressData {
  topic: string
  lastUpdated: string
  timeSeries: WaterStressRow[]
  hosepipeBans2022: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function WaterStressRegionsPage() {
  const [data, setData] = useState<WaterStressData | null>(null)

  useEffect(() => {
    fetch('/data/water-stress-regions/water_stress_regions.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const stressSeries: Series[] = data
    ? [
        {
          id: 'stressAreas',
          label: 'High water stress regions',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.highStressAreas,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Water Stress Regions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water Stress Regions"
          question="Is Britain Running Out of Water?"
          finding="South East England faces a supply-demand deficit of 5 billion litres per day by 2050 — yet no major new reservoir has been built since 1991."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's water stress is concentrated in the South East, which holds roughly 30% of the UK population but receives less rainfall than Paris, drawing on chalk aquifers and river systems already under significant pressure. The Environment Agency has classified ten water resource zones as currently in high stress, up from six in 2015, and projects a supply-demand deficit of around 5 billion litres per day by 2050 — driven by population growth, reduced summer rainfall from climate change, and aging infrastructure losing approximately 3 billion litres per day to leakage. No major new reservoir has been built since Carsington in Derbyshire was completed in 1991; the Abingdon reservoir in Oxfordshire has been in planning for over 20 years. Nine water companies imposed hosepipe bans in summer 2022 following an exceptionally dry spring, illustrating how quickly England's water systems can move from comfortable to constrained.</p>
            <p>Without investment in new supply infrastructure, leakage reduction, and mandatory water efficiency standards in new buildings, hosepipe bans and supply restrictions are likely to become a regular summer occurrence in the South East. The structural mismatch between where people live and where rainfall falls cannot be resolved through conservation alone; yet the regulatory framework — which requires water companies to exhaust demand management before new supply is approved — has in practice delayed action for decades. Leakage has fallen 35% since the mid-1990s, but progress has slowed in older, more complex pipe networks, and the 2023 Plan for Water's target of halving leakage by 2050 will not be met at current rates.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Stress Areas' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="High water stress areas"
              value="10 regions"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 6 in 2015 · SE worst affected"
              sparklineData={[6, 7, 7, 8, 9, 9, 10]}
              href="#sec-chart"source="Environment Agency · 2024"
            />
            <MetricCard
              label="Supply deficit by 2050"
              value="5.1bn litres/day"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="No major reservoir built since 1991"
              sparklineData={[3.1, 4.0, 4.8, 5.0, 5.1]}
              href="#sec-chart"source="Environment Agency · WRMP 2024"
            />
            <MetricCard
              label="Hosepipe bans 2022"
              value="9 companies"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Most widespread since 1976 · drought emergency"
              sparklineData={[0, 0, 0, 0, 0, 0, 9]}
              href="#sec-chart"source="Ofwat · 2022"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="High water stress regions in England, 2015–2024"
              subtitle="Environment Agency classifications of water resource zones with high or serious water stress, where abstraction significantly affects or threatens river flows and groundwater levels."
              series={stressSeries}
              yLabel="Regions classified as high stress"
              source={{
                name: 'Environment Agency',
                dataset: 'Water stressed areas classification',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Environment Agency — Water stressed areas: final classification. gov.uk/government/publications/water-stressed-areas-2021-classification</p>
            <p>Environment Agency — Water Resources Long Term Planning Framework. gov.uk/government/publications/water-resources-planning-and-regulation</p>
            <p>Ofwat — Water company Water Resources Management Plans (WRMPs). ofwat.gov.uk/regulated-companies/company-obligations/water-resources</p>
            <p>Water stress classifications use Environment Agency methodology assessing current and projected supply-demand balance in each water resource zone, accounting for population growth, climate change and environmental flow requirements. Supply-demand gap projections are from central scenarios in Water Resources Management Plans submitted by water companies to the Secretary of State.</p>
          </div>
        </section>
      </main>
    </>
  )
}
