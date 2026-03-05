'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>Council tax is the primary form of local taxation in England, Wales, and Scotland, charged annually based on property bands assessed in 1991. Unlike most other taxes, it is collected by local authorities and is critical to their revenue base. When households do not pay council tax, the consequences for both the council (reduced income to fund services) and the household (aggressive enforcement leading to bailiff action, attachment of earnings, and even imprisonment for contempt in extreme cases) can be severe. The outstanding council tax debt owed to councils in England alone reached £5.7 billion in 2024, a 45% increase since 2019, driven primarily by the cost of living crisis and the pandemic-related payment difficulties that were never fully cleared.</p>
            <p>Council tax enforcement in England is governed by the Council Tax (Administration and Enforcement) Regulations 1992, which give councils wide-ranging powers to collect unpaid tax including summons to magistrates court, liability orders, enforcement by certificated enforcement agents (bailiffs), attachment of earnings orders, charging orders on property, commitment to prison for willful refusal or culpable neglect, and deduction from benefits. The use of bailiff enforcement — sending certified enforcement agents to households to collect debt or seize goods — is widespread: approximately 3.2 million bailiff visits for council tax were made in 2023, making it by far the largest use of bailiff enforcement in any debt category.</p>
            <p>The social consequences of aggressive council tax enforcement are well-documented. Citizens Advice, StepChange, and the Money Advice Trust have all published evidence showing that bailiff action for council tax — which adds significant fees to the underlying debt — is a major driver of financial crisis for low-income households. The standard bailiff fee structure adds approximately £235 to any debt where an enforcement notice is served, whether or not the goods inspection visit occurs, creating a situation where the cost of enforcement can exceed the original debt for small arrears. Debt charities have long campaigned for a statutory debt respite period to be applied to council tax — a change not yet implemented.</p>
            <p>Council tax support — the means-tested benefit administered by local authorities to reduce council tax liability for lower-income households — is a critical but inconsistently designed element of the system. Following the abolition of Council Tax Benefit in 2013, each council was required to design its own local council tax support (LCTS) scheme within a reduced budget, with the requirement that pensioners receive the same protection as under the old national scheme. Working-age claimants have been subject to local schemes that vary enormously, with some councils requiring claimants to pay 20-30% of their council tax bill regardless of income. This design means that the lowest-income working-age households face council tax bills they cannot afford, creating the debt from which the enforcement cascade follows.</p>
            <p>Reform of council tax more broadly is rarely undertaken because the political economy is extremely challenging. Council tax bands are based on 1991 property valuations, meaning that properties in areas of high house price growth pay the same band as in 1991 despite enormous value increases — effectively a subsidy to high-value areas. Revaluation would redistribute the burden upward for expensive properties and downward for cheaper ones, which is politically controversial. The IFS has recommended replacing council tax with a proportional property tax — levied as a percentage of current value — that would be both more economically rational and more progressive than the current system. No government has attempted comprehensive reform since the poll tax debacle of the early 1990s.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Bailiff visits for council tax"
              value="3.2m"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="3.2m visits annually · largest bailiff use sector"
              sparklineData={[2.8, 2.9, 3.0, 3.0, 3.1, 2.8, 3.0, 3.1, 3.2]}
              source="CDER Network / Citizens Advice 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Households with council tax debt"
              value="1.4m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1.4m households in council tax arrears"
              sparklineData={[0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2, 1.3, 1.4]}
              source="DLUHC / StepChange 2024"
              onExpand={() => {}}
            />
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
      </main>
    </>
  )
}
