'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface HousingDisrepairClaimsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    claimsK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function HousingDisrepairClaimsPage() {
  const [data, setData] = useState<HousingDisrepairClaimsData | null>(null)

  useEffect(() => {
    fetch('/data/housing-disrepair-claims/housing_disrepair_claims.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'claims',
          label: 'Claims (thousands)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.claimsK,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Housing Disrepair Claims" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing Disrepair Claims"
          question="How Many Renters Are Living in Disrepair?"
          finding="Housing disrepair legal claims have surged 180% since 2019 as social tenants pursue landlords over damp, mould and structural defects."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Housing disrepair claims filed at county courts reached approximately 92,000 in 2024 — a 180% increase from 33,000 in 2019. The Homes (Fitness for Human Habitation) Act 2018 gave tenants a direct right of action against landlords, and a commercial claims sector — conditional fee solicitors and claims management companies — accelerated uptake during and after the pandemic, as households spending more time at home became more aware of damp, mould, and structural defects. The Awaab Ishak case — a two-year-old who died from black mould exposure in a Rochdale social housing flat in 2020 — crystallised public awareness. Awaab's Law, enshrined in the Social Housing (Regulation) Act 2023, now requires social landlords to investigate reports of damp and mould within 14 days and repair emergency hazards within 24 hours. The English Housing Survey 2023 found 4.2 million homes — 16% of the housing stock — below the Decent Homes Standard, including 1.1 million with category 1 hazards.</p>
            <p>The claims concentrate in the social housing sector, where landlords have clearly defined repair obligations. Private renters face higher barriers — including the risk of retaliatory eviction. The burden falls disproportionately on older tenants, disabled people, and families in overcrowded accommodation, who are least able to pursue legal action and most exposed to health harms from damp and cold. Housing associations and local authorities with poorly maintained legacy stock generate the highest claim rates, in some cases diverting maintenance budgets into legal costs — the reverse of the intended effect.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Claims' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Disrepair claims filed annually"
              value="92,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+180% since 2019 · surge post-pandemic"
              sparklineData={[28000, 30000, 33000, 35000, 38000, 48000, 65000, 80000, 92000]}
              href="#sec-chart"source="Ministry of Justice · Civil Justice Statistics 2024"
            />
            <MetricCard
              label="Homes with category 1 hazards"
              value="1.1m"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="1.1m homes with most serious risks"
              sparklineData={[1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1]}
              href="#sec-chart"source="DLUHC · English Housing Survey 2023"
            />
            <MetricCard
              label="Average compensation awarded"
              value="£4,200"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£1,100 since 2020 · rising awards"
              sparklineData={[2100, 2300, 2600, 2800, 3100, 3400, 3700, 4000, 4200]}
              href="#sec-chart"source="Ministry of Justice · Civil Justice Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Housing disrepair claims, 2016–2024"
              subtitle="Annual housing disrepair claims filed at county courts in England and Wales."
              series={series}
              yLabel="Claims (thousands)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Civil Justice Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice — Civil Justice Statistics Quarterly. Published quarterly. gov.uk/government/collections/civil-justice-statistics-quarterly</p>
            <p>DLUHC — English Housing Survey 2023. Published annually. gov.uk/government/collections/english-housing-survey</p>
            <p>Claims figures are county court housing disrepair claims under the Landlord and Tenant Act 1985 and Homes (Fitness for Human Habitation) Act 2018. Category 1 hazard data from English Housing Survey. Compensation figures are mean awards in settled and judged cases.</p>
          </div>
        </section>
      </main>
    </>
  )
}
