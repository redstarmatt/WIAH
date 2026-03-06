'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  cleanEnergyBn: number
  fossilFuelBn: number
  cleanPct: number
}

interface CleanEnergyInvestmentData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CleanEnergyInvestmentPage() {
  const [data, setData] = useState<CleanEnergyInvestmentData | null>(null)

  useEffect(() => {
    fetch('/data/clean-energy-investment/clean_energy_investment.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const investmentSeries: Series[] = data
    ? [
        {
          id: 'clean',
          label: 'Clean energy investment (£bn)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cleanEnergyBn })),
        },
        {
          id: 'fossil',
          label: 'Fossil fuel investment (£bn)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fossilFuelBn })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Clean Energy Investment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Clean Energy Investment"
          question="Is Britain Actually Going Green?"
          finding="UK clean energy investment reached £50 billion in 2023 — but it still trails the US Inflation Reduction Act stimulus by a factor of three."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK clean energy investment reached a record £50.3 billion in 2023 — up 162% from £19.2 billion in 2015 — and now accounts for 88% of all UK energy investment. The Contract for Difference auction mechanism drove offshore wind costs to levels unimaginable a decade ago, making the UK host to the world's largest offshore wind capacity, with new North Sea and Scottish projects continuing to come online. Battery storage deployment has accelerated sharply. Fossil fuel investment fell from £11.3 billion in 2015 to £6.9 billion in 2023. The Great British Energy policy, announced in 2024, aims to reach clean power by 2030 through a new state-owned energy company, a target independent analysis considers physically achievable but requiring sustained acceleration of planning approvals, grid connections, and supply chain development.</p>
            <p>The international comparison is sobering. The US Inflation Reduction Act commits approximately $150 billion per year to clean energy and climate programmes — against which UK investment of £50 billion looks modest, and UK projects face competition for equipment, components, and investors from a market offering more generous subsidy terms. Grid connection queues, planning delays for onshore wind, and supply chain constraints are the practical bottlenecks now limiting UK deployment. The government's continued North Sea oil and gas licensing has been contested by environmental groups as inconsistent with the UK's legally binding net zero commitments.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Investment' },
          { id: 'sec-callout', label: 'Record Investment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Clean energy investment 2023"
              value="£50.3bn"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Record high · 88% of total energy investment"
              sparklineData={[19.2, 22.4, 25.1, 27.8, 31.2, 28.4, 36.1, 43.8, 50.3]}
              href="#sec-chart"source="BNEF / DESNZ · 2024"
            />
            <MetricCard
              label="Behind US IRA"
              value="3&times;"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="US deploying $150bn/yr vs UK £50bn"
              sparklineData={[1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.5, 3.0]}
              href="#sec-callout"source="BNEF · Global Clean Energy Investment 2024"
            />
            <MetricCard
              label="vs 2015"
              value="+162%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="2.6x investment in clean energy since 2015"
              sparklineData={[100, 117, 131, 145, 162, 148, 188, 228, 262]}
              href="#sec-callout"source="BNEF / DESNZ · 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK energy investment: clean vs fossil fuel, 2015–2023"
              subtitle="Annual UK investment in clean energy (wind, solar, batteries, hydrogen) and fossil fuels (oil, gas). £ billions, current prices."
              series={investmentSeries}
              yLabel="£ billions"
              annotations={[
                { date: new Date(2020, 0, 1), label: '2020: COVID-19' },
                { date: new Date(2022, 0, 1), label: '2022: US IRA signed' },
              ]}
              source={{
                name: 'BloombergNEF / DESNZ',
                dataset: 'UK Clean Energy Investment Tracking',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Record Clean Energy Investment"
              value="£50.3bn"
              unit="invested in 2023"
              description="UK clean energy investment hit a record £50 billion in 2023, with renewables making up 88% of all energy investment. Wind, solar and battery storage are attracting capital from around the world."
              source="BNEF / DESNZ, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>BloombergNEF — Energy Transition Investment Trends. bnef.com/insights/33755</p>
            <p>DESNZ — Energy Trends. gov.uk/government/collections/energy-trends</p>
            <p>Clean energy investment includes capital expenditure on renewable electricity generation (wind, solar, marine), energy storage (batteries, pumped hydro), hydrogen production, and transmission and distribution upgrades attributable to clean energy. Fossil fuel investment includes upstream oil and gas exploration and production, refining, and fossil-fuelled power generation. Figures are current-price £bn and include both domestic and internationally-sourced capital deployed in UK projects.</p>
          </div>
        </section>
      </main>
    </>
  )
}
