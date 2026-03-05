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
          finding="South East England faces a supply-demand deficit of 5 billion litres per day by 2050 &mdash; yet no major new reservoir has been built since 1991."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>It seems counterintuitive to describe Britain as water-stressed. The country is famously damp, with annual rainfall well above European averages in its northern and western regions. But rainfall is not uniformly distributed, and where the people are is not where the water is. The South East of England &mdash; which is home to roughly 30% of the UK population and contributes a disproportionate share of economic output &mdash; receives less rainfall than Paris, and draws on chalk aquifers and river systems that are already under significant pressure. The Environment Agency has classified ten water resource zones across England as currently in high stress, up from six in 2015.</p>
            <p>The structural mismatch between supply and demand will worsen under climate change. The Environment Agency projects a supply-demand deficit of around 5 billion litres per day by 2050 under central scenarios &mdash; the equivalent of approximately 11 billion standard bottles of water per day falling short of projected need. This gap reflects three converging pressures: population growth increasing demand, climate change reducing average rainfall and increasing evaporation in summer, and aging infrastructure that loses approximately 3 billion litres per day to leakage before it reaches customers.</p>
            <p>The most striking fact about England&apos;s water infrastructure is that no major new reservoir has been built since Carsington Reservoir in Derbyshire was completed in 1991. Several proposals for new reservoirs have been approved, refused or delayed over the past three decades: the Abingdon reservoir in Oxfordshire has been in planning for over 20 years. The regulatory framework requires water companies to demonstrate need and exhaust demand management options before new supply infrastructure is approved &mdash; a sensible principle that has in practice become a reason for extended inaction.</p>
            <p>Leakage represents both a problem and an opportunity. The water industry loses approximately 3 billion litres per day through leakage &mdash; around 20% of all water put into supply. Ofwat has set progressively more demanding leakage targets for water companies, and total leakage has fallen by around 35% since the mid-1990s. But progress has slowed, and the remaining leakage is in older, more complex pipe networks where repair is expensive and disruptive. The industry argues that eliminating all leakage would cost more than the water saved; critics argue that the regulatory framework does not adequately incentivise ambition.</p>
            <p>The hosepipe bans of summer 2022 &mdash; imposed by nine separate water companies following an exceptionally dry spring and summer &mdash; brought water stress into public consciousness in a way that Environment Agency reports rarely do. The 2022 drought was not unprecedented in severity, but it illustrated how quickly England&apos;s water systems can move from comfortable to constrained. Without significant investment in new supply infrastructure, better leakage management, and smarter demand management tools including mandatory water efficiency standards in new buildings, similar or worse restrictions are likely to become a regular summer occurrence in the South East.</p>
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
              changeText="Up from 6 in 2015 &middot; SE worst affected"
              sparklineData={[6, 7, 7, 8, 9, 9, 10]}
              onExpand={() => {}}
              source="Environment Agency &middot; 2024"
            />
            <MetricCard
              label="Supply deficit by 2050"
              value="5.1bn litres/day"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="No major reservoir built since 1991"
              sparklineData={[3.1, 4.0, 4.8, 5.0, 5.1]}
              onExpand={() => {}}
              source="Environment Agency &middot; WRMP 2024"
            />
            <MetricCard
              label="Hosepipe bans 2022"
              value="9 companies"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Most widespread since 1976 &middot; drought emergency"
              sparklineData={[0, 0, 0, 0, 0, 0, 9]}
              onExpand={() => {}}
              source="Ofwat &middot; 2022"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="High water stress regions in England, 2015&ndash;2024"
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
            <p>Environment Agency &mdash; Water stressed areas: final classification. gov.uk/government/publications/water-stressed-areas-2021-classification</p>
            <p>Environment Agency &mdash; Water Resources Long Term Planning Framework. gov.uk/government/publications/water-resources-planning-and-regulation</p>
            <p>Ofwat &mdash; Water company Water Resources Management Plans (WRMPs). ofwat.gov.uk/regulated-companies/company-obligations/water-resources</p>
            <p>Water stress classifications use Environment Agency methodology assessing current and projected supply-demand balance in each water resource zone, accounting for population growth, climate change and environmental flow requirements. Supply-demand gap projections are from central scenarios in Water Resources Management Plans submitted by water companies to the Secretary of State.</p>
          </div>
        </section>
      </main>
    </>
  )
}
