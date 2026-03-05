'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface WaterAffordabilityRow {
  year: number
  avgBillAnnual: number
  waterPovertyPct?: number
}

interface WaterAffordabilityData {
  topic: string
  lastUpdated: string
  timeSeries: WaterAffordabilityRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function WaterAffordabilityPage() {
  const [data, setData] = useState<WaterAffordabilityData | null>(null)

  useEffect(() => {
    fetch('/data/water-affordability/water_affordability.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const waterSeries: Series[] = data
    ? [
        {
          id: 'avgBillAnnual',
          label: 'Average annual bill (£)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgBillAnnual,
          })),
        },
        {
          id: 'waterPovertyPct',
          label: 'In water poverty (%)',
          colour: '#6B7280',
          data: data.timeSeries
            .filter(d => d.waterPovertyPct !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.waterPovertyPct as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Water Affordability" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water Affordability"
          question="Can Everyone Afford Their Water Bills?"
          finding="Average water bills have risen to £448 a year, and 22% of households are in 'water poverty' — spending more than 3% of their income on water."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Water bills in England and Wales have risen substantially since privatisation in 1989, and the pace of increase has accelerated since 2022. The average annual bill reached £448 in 2023 and £528 in 2024 &mdash; a 37% increase since 2015 in nominal terms, representing a significant real-terms increase above inflation for most of the period. Ofwat&rsquo;s 2024 price review allowed water companies to increase bills by an average of 26% over the 2025&ndash;2030 period, partly to fund infrastructure investment, partly to service the large debt loads that companies accumulated during the years of dividend extraction.</p>
            <p>Water poverty &mdash; defined as spending more than 3% of household income on water bills &mdash; affects an estimated 22% of households as of 2023, rising to 25% in 2024 following the latest bill increases. This definition mirrors the approach used for fuel poverty and captures the regressive nature of water bills: a flat annual charge consumes a far higher proportion of a low-income household&rsquo;s budget than a high-income one. Unlike energy bills, which attracted a multi-billion-pound government subsidy during the 2022&ndash;23 cost-of-living crisis, water bills received no equivalent support.</p>
            <p>Social tariffs &mdash; reduced bills for households on low incomes or benefits &mdash; exist but are strikingly underused. Only around 8% of eligible households are on a social tariff, despite the scheme existing for over a decade. The barriers are multiple: awareness is low, application processes vary by water company and can be complex, and some companies actively promote their schemes while others do not. The result is that a protective mechanism exists on paper but fails in practice to reach most of the households it is designed to help.</p>
            <p>The affordability crisis is compounded by metering. Unmetered households pay a rateable value-based charge that is increasingly disconnected from actual consumption, but metered households &mdash; a growing proportion &mdash; face higher bills if they have larger families or higher consumption needs. Families with young children, people with medical conditions requiring frequent washing or equipment, and households with gardens in dry summers all face bills that do not reflect their ability to pay. Water company debt collection practices have also come under scrutiny, with evidence of aggressive pursuit of low-income customers while enforcement against non-paying commercial customers has been less rigorous.</p>
            <p>The structural solution &mdash; a properly functioning social tariff available to all low-income households without complex application processes &mdash; has been advocated by water regulators, consumer groups, and poverty charities for years. Ofwat has the power to require companies to offer social tariffs but not to mandate uptake at sufficient scale. The funding of social tariffs through cross-subsidy from other customers creates a political reluctance among companies to expand them aggressively. Meanwhile, bill increases approved to fund infrastructure investment in failing networks and rising sewage discharges are falling disproportionately on those least able to pay.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Bill Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Avg water bill 2024"
              value="£528"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+37% since 2015 &middot; Ofwat approved rises"
              sparklineData={[386, 392, 397, 405, 410, 415, 419, 436, 448, 528]}
              onExpand={() => {}}
              source="Ofwat &middot; Water Company Performance 2024"
            />
            <MetricCard
              label="In water poverty"
              value="25%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 households &middot; social tariff uptake low"
              sparklineData={[18, 18, 21, 22, 25]}
              onExpand={() => {}}
              source="Consumer Council for Water &middot; 2024"
            />
            <MetricCard
              label="Social tariff coverage"
              value="8%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="only 8% of struggling customers on reduced rates"
              sparklineData={[6, 7, 7, 8, 8]}
              onExpand={() => {}}
              source="Ofwat &middot; Social Tariff Review 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Water bills and water poverty, 2015&ndash;2024"
              subtitle="Average annual household water bill in pounds and percentage of households in water poverty (spending more than 3% of income on water)."
              series={waterSeries}
              yLabel="Value"
              source={{
                name: 'Ofwat / Consumer Council for Water',
                dataset: 'Water Company Performance / Affordability Research',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ofwat &mdash; Water Company Performance Reports. Annual data on bills, investment, and service levels. ofwat.gov.uk/regulated-companies/company-obligations/annual-performance-reports</p>
            <p>Consumer Council for Water &mdash; Affordability and Debt Research. ccwater.org.uk/research</p>
            <p>Ofwat &mdash; Social Tariff Monitoring. ofwat.gov.uk/households/customer-and-affordability-information/social-tariffs</p>
            <p>Average annual bill is Ofwat published average for combined water and sewerage services. Water poverty definition: household spending more than 3% of disposable income on water bills. Social tariff coverage: percentage of households receiving a discounted tariff from their water company. Figures for 2024 reflect April 2024 price increases.</p>
          </div>
        </section>
      </main>
    </>
  )
}
