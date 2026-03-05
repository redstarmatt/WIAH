'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PaydayLoanData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    paydayLoansM: number
    bnplArrearsM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function PaydayLoanDeclinePage() {
  const [data, setData] = useState<PaydayLoanData | null>(null)

  useEffect(() => {
    fetch('/data/payday-loan-decline/payday_loan_decline.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'paydayLoansM',
          label: 'Payday loans (m)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.paydayLoansM })),
        },
        {
          id: 'bnplArrearsM',
          label: 'BNPL in arrears (m)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.bnplArrearsM })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Payday Loans" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Consumer Credit"
          question="What Replaced Payday Loans After the FCA Clampdown?"
          finding="The payday loan market collapsed 95% after FCA price caps in 2015, but buy-now-pay-later has created new unregulated debt traps affecting 1.2 million people."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The payday loan market — short-term, high-cost consumer credit with annualised interest rates typically above 1,000% APR — was transformed by the Financial Conduct Authority's introduction of a price cap in January 2015. The cap limited the total cost of credit to 0.8% per day, capped default fees at £15, and prevented total charges from exceeding 100% of the original loan amount. The immediate effect was dramatic: lenders that had built business models around repeated rollovers and uncapped interest charges found the economics unworkable. The total number of payday loans issued fell from approximately 10.3 million in 2013 to 1.8 million in 2023 — a 95% collapse.</p>
            <p>The FCA cap achieved its primary objective: it ended the worst excesses of the payday loan market and provided real protection to borrowers who had previously been trapped in spiralling debt cycles. However, it also removed a source of credit that — however imperfect — met a genuine need for short-term liquidity in households with irregular incomes or no access to mainstream credit. The question of what replaced payday loans for this population has three answers: formal alternatives (credit unions, Community Development Finance Institutions), informal alternatives (borrowing from family or friends), and a new market of less regulated high-cost credit products including buy-now-pay-later, rent-to-own, and illegal lending.</p>
            <p>Buy-now-pay-later (BNPL) — services offered by companies such as Klarna, Clearpay, and Laybuy that allow consumers to spread the cost of purchases over weeks or months without upfront credit checks or interest charges — grew explosively during and after the pandemic. Total BNPL lending in the UK reached approximately £19 billion in 2023, used by approximately 17 million people. The sector operated largely outside FCA regulation until 2024, meaning users had fewer protections than for equivalent regulated credit products. The FCA's 2024 consultation on BNPL regulation proposed bringing the sector into the Consumer Credit Act framework — a significant change that providers argued would reduce product innovation and access.</p>
            <p>Illegal lending — money lent outside the regulatory framework, typically by individuals or criminal enterprises at very high rates and with enforcement through intimidation rather than legal process — is estimated to affect approximately 1.1 million people in the UK. The Illegal Money Lending Teams (IMLTs) in England, Scotland, and Wales investigate and prosecute illegal lenders but the scale of the market is large relative to enforcement capacity. People who use illegal lenders are typically those who cannot access legal credit — due to poor credit scores, benefit income, or previous debt — and who lack the time or capability to navigate credit union application processes. The collapse of the payday loan market created a credit gap that illegal lending has partially filled.</p>
            <p>Credit unions — cooperative financial institutions owned by members, regulated by the FCA and PRA — are the policy alternative to high-cost credit. Credit unions provide savings accounts and affordable loans at rates capped at 3% per month (42.6% APR), far below payday loan rates. The UK's credit union sector has grown: membership reached approximately 2 million in 2024, a 30% increase since 2015. But the sector remains small relative to the population of people excluded from mainstream credit, and geographic distribution is uneven — credit unions are strongest in Northern Ireland, Scotland, and some urban English communities but sparse in many rural and suburban areas.</p>
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
              label="Payday loans issued annually"
              value="1.8m"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down 95% from 10.3m in 2013 · FCA cap effective"
              sparklineData={[8, 6, 4, 3, 2.5, 2, 2, 2, 1.8]}
              source="FCA · Consumer Credit Market Study 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="BNPL users in arrears"
              value="1.2m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1.2m in BNPL arrears · unregulated until 2024"
              sparklineData={[0, 0, 0.1, 0.2, 0.4, 0.7, 1.0, 1.1, 1.2]}
              source="FCA · Financial Lives Survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Illegal lending victims (estimate)"
              value="1.1m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1.1m using illegal lenders · post-payday gap"
              sparklineData={[0.6, 0.7, 0.7, 0.8, 0.9, 1.0, 1.0, 1.1, 1.1]}
              source="Illegal Money Lending Teams / Centre for Responsible Credit 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Payday loans issued vs BNPL arrears, 2016–2024"
              subtitle="Annual payday loan volumes (millions) and buy-now-pay-later users in arrears (millions)."
              series={series}
              yLabel="Millions"
              source={{ name: 'FCA', dataset: 'Consumer Credit Market Study', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Payday loan volumes from FCA Consumer Credit Market Study and regulatory returns data. BNPL arrears from FCA Financial Lives Survey 2024 and provider data. Illegal lending estimates from Illegal Money Lending Teams annual reports and Centre for Responsible Credit research. Credit union membership from Bank of England regulatory data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
