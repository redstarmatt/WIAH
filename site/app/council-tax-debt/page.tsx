'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

interface CouncilTaxDebtData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    outstandingDebtBn: number
    householdsInDebtM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function CouncilTaxDebtPage() {
  const [data, setData] = useState<CouncilTaxDebtData | null>(null)

  useEffect(() => {
    fetch('/data/council-tax-debt/council_tax_debt.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'outstandingDebtBn',
          label: 'Arrears (£ billions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.outstandingDebtBn })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Council Tax Debt" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Local Taxation"
          question="How Much Council Tax Debt Is Building Up?"
          finding="UK councils are owed £5.7 billion in unpaid council tax — a 45% increase since 2019 — and aggressive enforcement using bailiffs is driving some households into crisis."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Outstanding council tax debt in England reached £5.7 billion in 2024 — a 45% increase since 2019, driven primarily by the cost-of-living crisis and pandemic-related payment difficulties never fully cleared. Approximately 3.2 million bailiff visits were made for council tax in 2023, making it by far the largest use of enforcement in any debt category. The standard bailiff fee structure adds approximately £235 per debt where an enforcement notice is served, creating situations where enforcement costs exceed the original arrears for small debts. The abolition of Council Tax Benefit in 2013 and its replacement with inconsistent local council tax support schemes left many councils requiring working-age claimants to pay 20–30% of their bill regardless of income — generating the arrears from which the enforcement cascade follows.</p>
            <p>Council tax bands are based on 1991 property valuations, meaning that properties in areas of high house price growth pay the same band as in 1991 despite enormous value increases. The IFS has recommended replacing council tax with a proportional property tax levied as a percentage of current value, which would be both more economically rational and more progressive. No government has attempted comprehensive reform since the poll tax in the early 1990s. Citizens Advice, StepChange, and the Money Advice Trust document that bailiff action for council tax is a major driver of financial crisis for low-income households, and debt charities have long campaigned for a statutory debt respite period to apply to council tax — a change not yet implemented.</p>
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
              label="Outstanding council tax debt"
              value="£5.7bn"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+£1.8bn since 2019 · 45% increase"
              sparklineData={[3.2, 3.4, 3.6, 3.9, 4.2, 4.5, 5.0, 5.4, 5.7]}
              source="DLUHC · Local Authority Revenue Outturn 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Bailiff visits for council tax"
              value="3.2m"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="3.2m visits annually · largest bailiff use sector"
              sparklineData={[2.8, 2.9, 3.0, 3.0, 3.1, 2.8, 3.0, 3.1, 3.2]}
              source="CDER Network / Citizens Advice 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Households with council tax debt"
              value="1.4m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1.4m households in council tax arrears"
              sparklineData={[0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.3, 1.4]}
              source="DLUHC / StepChange 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Outstanding council tax debt, England, 2016–2024"
              subtitle="Total council tax arrears owed to local authorities in England (£ billions)."
              series={series}
              yLabel="Arrears (£ billions)"
              source={{ name: 'DLUHC', dataset: 'Local Authority Revenue Outturn Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Outstanding council tax debt from DLUHC Local Authority Revenue Outturn (RA) returns (England only). Bailiff visit data from Civil Enforcement Association and CDER Network annual statistics. Household in debt estimates from StepChange Statistics Yearbook and Citizens Advice energy and debt case data. Council tax support statistics from DLUHC Council Tax Statistical Release.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
