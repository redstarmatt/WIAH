'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface PrivateRentedConditionsData {
  timeSeries: Array<{
    year: number
    nonDecentPct: number
    dampMouldHouseholds?: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PrivateRentedConditionsPage() {
  const [data, setData] = useState<PrivateRentedConditionsData | null>(null)

  useEffect(() => {
    fetch('/data/private-rented-conditions/private_rented_conditions.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const nonDecentSeries: Series[] = data
    ? [{
        id: 'nonDecent',
        label: 'Non-decent private rentals (%)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.nonDecentPct,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Private Rented Conditions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Private Rented Conditions"
          question="Is Your Rented Home Safe?"
          finding="21% of private rented homes fail the Decent Homes Standard — and 1.8 million renters live with damp or mould that landlords are failing to fix."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2023, 21% of private rented homes — approximately 1.1 million properties — failed to meet the Decent Homes Standard, a reduction from 24.2% in 2015, though the absolute number of people in non-decent accommodation has not fallen proportionately as the sector has grown to 4.5 million households. Around 14% of private rented homes contain at least one HHSRS category 1 hazard — serious risks including excess cold, damp and mould, and electrical hazards. Damp and mould attracted particular attention after the 2020 death of two-year-old Awaab Ishak from a respiratory condition caused by chronic mould exposure; &ldquo;Awaab&rsquo;s Law&rdquo; passed in 2023 applies to social landlords, but not yet to private landlords.</p>
            <p>The power imbalance between tenant and landlord shapes the enforcement gap. Tenants in insecure short-hold tenancies have historically faced retaliatory eviction if they complain formally about conditions, and the practical remedy — contesting eviction in court — requires time, legal knowledge, and resources most tenants in poor-quality accommodation do not have. Local housing authorities carry out inspections on a fraction of the known hazardous stock, and civil penalty revenues rarely cover enforcement costs. The Renters&rsquo; Rights Act's abolition of no-fault Section 21 evictions should improve the balance, but implementation will take time to change tenant behaviour.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Conditions Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Non-decent private rentals"
              value="21.0%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Slow improvement · 1.1m non-decent homes remain"
              sparklineData={[24.2, 23.8, 23.1, 22.4, 21.9, 21.7, 21.6, 21.4, 21.0]}
              href="#sec-chart"source="DLUHC · English Housing Survey 2022–23"
            />
            <MetricCard
              label="Damp/mould households"
              value="1.8m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Rising despite improvement trend · Awaab&rsquo;s Law response"
              sparklineData={[1600000, 1620000, 1650000, 1680000, 1700000, 1720000, 1750000, 1800000, 1800000]}
              href="#sec-chart"source="DLUHC · English Housing Survey 2022–23"
            />
            <MetricCard
              label="HHSRS category 1 hazard rate"
              value="14%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Category 1 hazards in 700k private rentals"
              sparklineData={[16, 16, 15, 15, 14, 14, 14, 14, 14]}
              href="#sec-chart"source="DLUHC · English Housing Survey 2022–23"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Private rented homes failing Decent Homes Standard, 2015–2023"
              subtitle="Percentage of privately rented dwellings in England that do not meet the Decent Homes Standard. Based on English Housing Survey modelling."
              series={nonDecentSeries}
              yLabel="Non-decent (%)"
              source={{
                name: 'DLUHC',
                dataset: 'English Housing Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DLUHC — English Housing Survey. Annual sample survey of housing conditions. gov.uk/government/collections/english-housing-survey</p>
            <p>Housing Health and Safety Rating System (HHSRS) — Statutory framework for assessing housing hazards. gov.uk/government/publications/housing-health-and-safety-rating-system-guidance-for-landlords-and-property-related-professionals</p>
            <p>DLUHC — Awaab&rsquo;s Law: damp and mould consultation and impact assessment. gov.uk</p>
            <p>Decent Homes Standard assessments in the private rented sector are based on English Housing Survey field inspections by trained assessors, not self-reporting by landlords or tenants. The Decent Homes Standard is formally applicable to social housing; private rented sector figures are calculated on the same criteria for comparability. Category 1 HHSRS hazard rates are from the same survey. Damp and mould figures include self-reported and surveyor-assessed incidences in the private rented sector only.</p>
          </div>
        </section>
      </main>
    </>
  )
}
