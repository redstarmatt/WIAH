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
            <p>Self-disconnection &mdash; where prepayment meter customers run out of credit and cannot top up &mdash; peaked at 4.8 million households in 2022 and fell to 3.2 million in 2023 following the Energy Price Guarantee. Around 7 million households use prepayment meters, disproportionately lower-income, previous energy debtors, and private renters. Forced disconnections fell from 75,000 in 2016 to 10,500 in 2023 as Ofgem tightened rules, but a 2023 ITV and Citizens Advice investigation found suppliers were forcing prepayment meter installations on vulnerable customers without proper welfare checks &mdash; prompting Ofgem to require explicit welfare checks and subsequently ban forced installations in vulnerable households. Fuel debt reached approximately &pound;2.6 billion in 2023, with around 6.2 million households in arrears.</p>
            <p>The disconnection crisis reflects structural inadequacy in energy affordability policy. The Warm Homes Discount, Cold Weather Payment, and Winter Fuel Payment together total approximately &pound;2.5 billion per year &mdash; far below what would be needed to bring all fuel-poor households to affordable energy at market rates. The universal service obligation requires suppliers to offer a supply contract to any customer, but does not resolve the tension between commercial survival and social obligation when households cannot pay. The Energy Price Guarantee showed government can intervene at scale but at enormous fiscal cost; the underlying vulnerability &mdash; 19 million homes on gas with poor insulation &mdash; means the exposure will recur with the next price shock.</p>
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
