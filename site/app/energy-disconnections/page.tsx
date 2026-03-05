'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface EnergyDisconnectionsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    selfDisconnectionsM: number
    forcedPPMK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function EnergyDisconnectionsPage() {
  const [data, setData] = useState<EnergyDisconnectionsData | null>(null)

  useEffect(() => {
    fetch('/data/energy-disconnections/energy_disconnections.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'selfDisconnectionsM',
          label: 'Self-disconnections (millions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.selfDisconnectionsM })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Energy Disconnections" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="How Many Households Are Being Disconnected From Energy?"
          finding="Self-disconnections — where prepayment customers run out of credit — reached 3.2 million in 2023, even as forced disconnections fell under regulatory pressure."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Energy disconnection in the UK takes two forms: forced disconnection, where a supplier physically cuts off supply for debt, and self-disconnection, where a prepayment meter customer runs out of credit and cannot top up. Forced disconnection from gas and electricity supplies is governed by Ofgem's supply licence conditions, which require suppliers to make extensive contact and offer debt repayment plans before disconnection and prohibit disconnection of vulnerable customers during winter months. Since 2019, Ofgem has tightened these rules significantly in response to evidence of inappropriate disconnections, and the total number of forced disconnections fell from approximately 75,000 in 2016 to approximately 10,500 in 2023.</p>
            <p>Self-disconnection is a less visible but far more pervasive problem. Prepayment meters — where customers pay upfront for energy in credit units — are used by approximately 7 million households in the UK, disproportionately concentrated in lower-income groups, those with previous energy debt, and those in rented accommodation. When a prepayment customer's credit runs out and they cannot afford to top up immediately, they are effectively disconnected — cold, without light, unable to cook — until they can get to a shop with a top-up facility. The estimated number of households self-disconnecting at least once per year peaked at approximately 4.8 million in 2022 at the height of the energy crisis and fell to approximately 3.2 million in 2023 following the Energy Price Guarantee and subsequent government support.</p>
            <p>The forced installation of prepayment meters — where suppliers installed prepayment meters in homes of customers in debt without their consent, using the mechanism of a warrant of entry — became a major regulatory issue in 2023. ITV and Citizens Advice investigation found that suppliers were installing prepayment meters in homes of vulnerable customers including those with serious health conditions, in cases where the customer had not been informed of their rights and alternatives. Ofgem imposed emergency rules requiring explicit welfare checks before forced prepayment meter installations in February 2023, and subsequently announced a ban on new forced installations in homes with vulnerable customers.</p>
            <p>Fuel debt — the amount owed to energy suppliers by households in arrears — reached approximately £2.6 billion in 2023, declining from a peak of over £3 billion in 2022. Approximately 6.2 million households are estimated to be in fuel debt, though definitions and the methodology of measurement vary between Ofgem and independent estimates. Debt management on energy accounts involves a complex interplay of supplier debt collection processes, Priority Services Register provisions for vulnerable customers, Ofgem debt rules, and the availability of emergency credit and warm home discount provisions.</p>
            <p>The energy crisis of 2021-23 exposed the structural inadequacy of the UK's energy affordability architecture. The legacy of privatisation — with energy supply in the hands of commercial companies with shareholder obligations — creates a fundamental tension between supplier commercial survival and social obligation to supply. The universal service obligation in gas and electricity requires suppliers to offer a supply contract to any customer, but it does not resolve the question of what happens when households cannot pay market rates. The Warm Homes Discount, Cold Weather Payment, and Winter Fuel Payment are the primary government interventions, but their aggregate value — approximately £2.5 billion per year — is far below what would be needed to bring all households out of fuel poverty at market energy prices.</p>
          </div>
        </section>

        <SectionNav
          sections={[
            { id: 'sec-metrics', label: 'Metrics' },
            { id: 'sec-chart', label: 'Chart' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Self-disconnections (prepayment)"
              value="3.2m"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 4.8m in 2022 · still very high"
              sparklineData={[2.0, 2.1, 2.2, 2.3, 2.4, 3.8, 4.8, 4.2, 3.2]}
              source="Ofgem · Consumer Vulnerability Report 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Forced PPM installations"
              value="49,000"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down after Ofgem ban · 49k in 2023"
              sparklineData={[55000, 58000, 60000, 62000, 65000, 80000, 94000, 70000, 49000]}
              source="Ofgem · Prepayment Meter Installation Data 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Households in fuel debt"
              value="6.2m"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="6.2m in fuel debt · easing from 2022 peak"
              sparklineData={[3.5, 3.6, 3.7, 3.8, 4.0, 5.5, 6.8, 6.5, 6.2]}
              source="Citizens Advice / Ofgem 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Energy self-disconnections, 2016–2024"
              subtitle="Estimated households self-disconnecting from energy supply (prepayment meter customers running out of credit, millions)."
              series={series}
              yLabel="Households (millions)"
              source={{ name: 'Ofgem', dataset: 'Consumer Vulnerability Report', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Self-disconnection estimates from Ofgem Consumer Vulnerability Report, supplemented by Citizens Advice case data. Forced PPM installation figures from Ofgem supplier licence compliance reporting. Fuel debt data from Ofgem Supplier Financial Resilience reporting and Citizens Advice quarterly energy statistics. Energy Price Guarantee impact from BEIS energy security analysis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
