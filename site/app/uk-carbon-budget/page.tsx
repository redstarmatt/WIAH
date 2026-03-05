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

interface EmissionsRow {
  year: number
  emissionsMtCO2e: number
}

interface CarbonBudgetEntry {
  period: string
  limitMtCO2e?: number
  year?: number
}

interface UkCarbonBudgetData {
  topic: string
  lastUpdated: string
  timeSeries: EmissionsRow[]
  carbonBudgets: CarbonBudgetEntry[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function UkCarbonBudgetPage() {
  const [data, setData] = useState<UkCarbonBudgetData | null>(null)

  useEffect(() => {
    fetch('/data/uk-carbon-budget/uk_carbon_budget.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const emissionsSeries: Series[] = data
    ? [
        {
          id: 'emissions',
          label: 'UK greenhouse gas emissions (MtCO2e)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.emissionsMtCO2e,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="UK Carbon Budget" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="UK Carbon Budget"
          question="Is Britain Actually Cutting Emissions?"
          finding="UK emissions fell 4.7% in 2023 to 415 MtCO2e &mdash; broadly on track for the Fourth Carbon Budget, but needing to accelerate to reach net zero by 2050."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has cut its greenhouse gas emissions faster than any other G7 nation since 1990. Total territorial emissions have fallen from approximately 800 MtCO2e in 1990 to 415 MtCO2e in 2023 &mdash; a reduction of around 53%. The primary driver has been the near-elimination of coal from electricity generation: coal accounted for 80% of electricity generation in 1990 and less than 1% by 2023. Wind, solar and nuclear now provide over 50% of UK electricity, with the UK having one of the world&apos;s highest shares of offshore wind capacity.</p>
            <p>The Fourth Carbon Budget, covering 2023&ndash;2027, sets a limit of 965 MtCO2e across the five-year period. Current trajectories suggest the UK is broadly on track to meet this budget, though the Climate Change Committee (CCC) has warned that progress in some sectors is insufficient and that meeting CB4 comfortably requires accelerated action in buildings, transport and agriculture. The Fifth Carbon Budget (2028&ndash;2032) is significantly more demanding, at 725 MtCO2e, requiring average annual reductions of around 8% from today&apos;s levels.</p>
            <p>The easy wins &mdash; replacing coal with gas and renewables in electricity generation &mdash; are largely behind the UK. The remaining emissions are concentrated in sectors where decarbonisation is structurally harder. Heating is the largest remaining challenge: the UK has 29 million homes, the majority heated by natural gas boilers. Heat pump deployment has been slower than government targets, with around 60,000 installed in 2023 against a target trajectory requiring hundreds of thousands per year. Upfront costs, installation complexity and grid constraints all slow the transition.</p>
            <p>Transport is the largest emitting sector in 2023, accounting for around 28% of domestic greenhouse gas emissions. Road transport dominates. The transition to electric vehicles is accelerating &mdash; nearly 17% of new car sales in 2023 were electric or plug-in hybrid &mdash; but the existing fleet turns over slowly, and rural areas face particular challenges around charging infrastructure. Aviation emissions, though excluded from domestic inventories as international travel, are a significant additional burden and lack a credible near-term decarbonisation pathway.</p>
            <p>Agriculture contributes approximately 11% of UK emissions, primarily through methane from livestock and nitrous oxide from fertiliser. Unlike energy sector emissions, agricultural emissions have proved stubbornly resistant to reduction and require difficult trade-offs between land use, food production, biodiversity and climate. The UK&apos;s post-Brexit agricultural subsidies &mdash; transitioning from area-based payments under the Common Agricultural Policy to the Environmental Land Management scheme &mdash; represent an opportunity to incentivise lower-emission farming practices, but uptake of the new schemes has been slower than anticipated.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Emissions' },
          { id: 'sec-callout', label: 'Progress' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="2023 emissions"
              value="415 MtCO2e"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="4.7% fall &middot; lowest since 1960s industrialisation"
              sparklineData={[590, 542, 503, 474, 455, 414, 441, 436, 415]}
              onExpand={() => {}}
              source="DESNZ &middot; UK GHG Inventory 2024"
            />
            <MetricCard
              label="vs 1990 baseline"
              value="&minus;53%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="On track for CB4 compliance &middot; G7 fastest"
              sparklineData={[0, -10, -20, -28, -35, -42, -48, -51, -53]}
              onExpand={() => {}}
              source="DESNZ &middot; 2024"
            />
            <MetricCard
              label="Annual reduction needed"
              value="8% p/a"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="To reach net zero by 2050 from current level"
              sparklineData={[3, 4, 5, 5, 6, 7, 7, 8, 8]}
              onExpand={() => {}}
              source="CCC &middot; Net Zero Pathway 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK greenhouse gas emissions, 2012&ndash;2023"
              subtitle="Total territorial greenhouse gas emissions in million tonnes of CO2 equivalent (MtCO2e). Excludes international aviation and shipping."
              series={emissionsSeries}
              yLabel="MtCO2e"
              source={{
                name: 'DESNZ',
                dataset: 'UK Greenhouse Gas Inventory',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Fastest Decarbonisation in the G7"
              value="-53%"
              unit="vs 1990 baseline"
              description="The UK has cut emissions faster than any other G7 nation, driven by the near-elimination of coal from electricity generation and rapid growth in renewables. Electricity emissions are down 85% since 1990."
              source="DESNZ, UK Greenhouse Gas Inventory, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ (Department for Energy Security and Net Zero) &mdash; UK Greenhouse Gas Inventory. Published annually. gov.uk/government/collections/uk-greenhouse-gas-inventory</p>
            <p>Climate Change Committee &mdash; Progress in reducing UK emissions. Published annually. theccc.org.uk/publication/progress-in-reducing-uk-emissions</p>
            <p>Carbon Brief &mdash; UK emissions analysis. carbonbrief.org</p>
            <p>Emissions figures are territorial greenhouse gas emissions in CO2-equivalent (using GWP100 conversion factors). The 1990 baseline reflects the internationally agreed reference year for UK commitments. Carbon Budget limits are five-year totals set by the Committee on Climate Change and approved by Parliament.</p>
          </div>
        </section>
      </main>
    </>
  )
}
