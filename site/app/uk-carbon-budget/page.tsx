'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'UK Greenhouse Gas Inventory — annual emissions', url: 'https://www.gov.uk/government/collections/uk-greenhouse-gas-inventory', date: '2024' },
  { num: 2, name: 'Climate Change Committee', dataset: 'Progress in reducing UK emissions — Carbon Budget assessment', url: 'https://www.theccc.org.uk/publication/progress-in-reducing-uk-emissions', date: '2024' },
  { num: 3, name: 'Carbon Brief', dataset: 'UK electricity generation and coal phase-out analysis', url: 'https://www.carbonbrief.org', date: '2024' },
];

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
          finding="UK emissions fell 4.7% in 2023 to 415 MtCO2e — broadly on track for the Fourth Carbon Budget, but needing to accelerate to reach net zero by 2050."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK emissions have fallen from approximately 800 MtCO2e in 1990 to 415 MtCO2e in 2023 — a 53% reduction, faster than any other G7 nation. The primary driver has been the near-elimination of coal from electricity generation: coal accounted for 80% of electricity in 1990 and under 1% by 2023, with wind, solar and nuclear now providing over 50%.<Cite nums={[1,3]} /> The Fourth Carbon Budget (2023–2027) sets a limit of 965 MtCO2e and current trajectories are broadly on track, but the Fifth Carbon Budget (2028–2032) requires average annual reductions of around 8% from today's level — significantly more demanding. The Climate Change Committee has warned progress in buildings, transport and agriculture is insufficient to meet CB5 comfortably.<Cite nums={2} /></p>
            <p>The remaining emissions are concentrated in structurally harder sectors. Transport is now the largest emitting sector at around 28% of domestic emissions: EV sales reached 17% of new cars in 2023 but the existing fleet turns over slowly and rural charging infrastructure lags. Heating is the largest remaining challenge — 29 million homes, mostly gas boilers, with heat pump deployment around 60,000 per year against a target trajectory requiring hundreds of thousands. Agriculture contributes approximately 11% through livestock methane and fertiliser nitrous oxide, and has proved stubbornly resistant to reduction. The burden of transition falls most heavily on rural households dependent on oil heating and older vehicles — the least connected to the policy levers driving decarbonisation.<Cite nums={1} /></p>
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
              changeText="4.7% fall · lowest since 1960s industrialisation"
              sparklineData={[590, 542, 503, 474, 455, 414, 441, 436, 415]}
              href="#sec-chart"source="DESNZ · UK GHG Inventory 2024"
            />
            <MetricCard
              label="vs 1990 baseline"
              value="&minus;53%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="On track for CB4 compliance · G7 fastest"
              sparklineData={[0, -10, -20, -28, -35, -42, -48, -51, -53]}
              href="#sec-callout"source="DESNZ · 2024"
            />
            <MetricCard
              label="Annual reduction needed"
              value="8% p/a"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="To reach net zero by 2050 from current level"
              sparklineData={[3, 4, 5, 5, 6, 7, 7, 8, 8]}
              href="#sec-callout"source="CCC · Net Zero Pathway 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK greenhouse gas emissions, 2012–2023"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ (Department for Energy Security and Net Zero) — UK Greenhouse Gas Inventory. Published annually. gov.uk/government/collections/uk-greenhouse-gas-inventory</p>
            <p>Climate Change Committee — Progress in reducing UK emissions. Published annually. theccc.org.uk/publication/progress-in-reducing-uk-emissions</p>
            <p>Carbon Brief — UK emissions analysis. carbonbrief.org</p>
            <p>Emissions figures are territorial greenhouse gas emissions in CO2-equivalent (using GWP100 conversion factors). The 1990 baseline reflects the internationally agreed reference year for UK commitments. Carbon Budget limits are five-year totals set by the Committee on Climate Change and approved by Parliament.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
