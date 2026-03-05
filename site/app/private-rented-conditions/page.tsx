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
          finding="21% of private rented homes fail the Decent Homes Standard &mdash; and 1.8 million renters live with damp or mould that landlords are failing to fix."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Decent Homes Standard sets a minimum quality threshold for rented housing: a property must be free from serious hazards under the Housing Health and Safety Rating System (HHSRS), in a reasonable state of repair, with reasonably modern facilities, and with adequate heating and insulation. The standard was introduced for the social housing sector in 2000 and has since been used to measure the private rented sector, though it does not legally apply there. In 2023, 21% of private rented homes &mdash; approximately 1.1 million properties &mdash; failed to meet it.</p>
            <p>The slow improvement in the non-decent rate &mdash; from 24.2% in 2015 to 21% in 2023 &mdash; masks the absolute scale of the problem. As the private rented sector has grown to house 4.5 million households, the number of people living in non-decent homes has not fallen proportionately, even as the percentage has declined. Damp and mould in particular have attracted renewed attention following the death of two-year-old Awaab Ishak in 2020 from a respiratory condition caused by chronic mould exposure in a social housing property. &ldquo;Awaab&rsquo;s Law&rdquo; &mdash; legislation requiring social landlords to fix damp and mould within set timeframes &mdash; was passed in 2023, but does not yet apply to private landlords.</p>
            <p>The category 1 hazard rate under HHSRS is particularly striking: approximately 14% of private rented homes contain at least one hazard assessed as serious enough to carry a significant risk of injury or illness. These include excess cold (heating failures in inadequately insulated properties), damp and mould, falls on stairs, and electrical hazards. Local councils have the power to issue improvement notices and, in serious cases, carry out works and charge landlords, but enforcement is chronically under-resourced. Research consistently finds that the number of inspections carried out by councils represents a fraction of the known hazardous stock.</p>
            <p>The power imbalance between tenant and landlord shapes the enforcement gap. Tenants in insecure short-hold tenancies &mdash; the standard contract form in the private rented sector &mdash; have historically faced retaliatory eviction if they complain formally about conditions. While legislation has ostensibly protected against this, the practical remedy for a tenant who receives a notice to quit after complaining is to contest an eviction in court &mdash; a process that requires time, legal knowledge, and resources that most tenants in poor-quality accommodation do not have. The abolition of no-fault Section 21 evictions, promised in the Renters (Reform) Bill and carried through into the Renters&rsquo; Rights Act, should improve this balance, but implementation will take time to affect tenant behaviour.</p>
            <p>The economics of enforcement also reflect a systemic problem. Local housing authorities receive complaints, assess properties, and issue notices &mdash; but the cost of enforcement falls on the public purse, while the failure to maintain properties saves landlords money. Civil penalty revenues, where authorities issue fines to non-compliant landlords, rarely cover enforcement costs. The result is a system that is nominally protective but practically toothless for the tenants who need it most. A renter with damp walls, a broken boiler, or a dangerous staircase is often told by an overstretched council that their case is in a queue, while their health and safety deteriorate in real time.</p>
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
              changeText="Slow improvement &middot; 1.1m non-decent homes remain"
              sparklineData={[24.2, 23.8, 23.1, 22.4, 21.9, 21.7, 21.6, 21.4, 21.0]}
              onExpand={() => {}}
              source="DLUHC &middot; English Housing Survey 2022&ndash;23"
            />
            <MetricCard
              label="Damp/mould households"
              value="1.8m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Rising despite improvement trend &middot; Awaab&rsquo;s Law response"
              sparklineData={[1600000, 1620000, 1650000, 1680000, 1700000, 1720000, 1750000, 1800000, 1800000]}
              onExpand={() => {}}
              source="DLUHC &middot; English Housing Survey 2022&ndash;23"
            />
            <MetricCard
              label="HHSRS category 1 hazard rate"
              value="14%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Category 1 hazards in 700k private rentals"
              sparklineData={[16, 16, 15, 15, 14, 14, 14, 14, 14]}
              onExpand={() => {}}
              source="DLUHC &middot; English Housing Survey 2022&ndash;23"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Private rented homes failing Decent Homes Standard, 2015&ndash;2023"
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
            <p>DLUHC &mdash; English Housing Survey. Annual sample survey of housing conditions. gov.uk/government/collections/english-housing-survey</p>
            <p>Housing Health and Safety Rating System (HHSRS) &mdash; Statutory framework for assessing housing hazards. gov.uk/government/publications/housing-health-and-safety-rating-system-guidance-for-landlords-and-property-related-professionals</p>
            <p>DLUHC &mdash; Awaab&rsquo;s Law: damp and mould consultation and impact assessment. gov.uk</p>
            <p>Decent Homes Standard assessments in the private rented sector are based on English Housing Survey field inspections by trained assessors, not self-reporting by landlords or tenants. The Decent Homes Standard is formally applicable to social housing; private rented sector figures are calculated on the same criteria for comparability. Category 1 HHSRS hazard rates are from the same survey. Damp and mould figures include self-reported and surveyor-assessed incidences in the private rented sector only.</p>
          </div>
        </section>
      </main>
    </>
  )
}
