'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface FinancialInclusionData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    branchClosuresTotal: number
    unbankedM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function FinancialInclusionPage() {
  const [data, setData] = useState<FinancialInclusionData | null>(null)

  useEffect(() => {
    fetch('/data/financial-inclusion/financial_inclusion.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'branches',
          label: 'Branch closures (cumulative)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.branchClosuresTotal })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Financial Inclusion" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Financial Inclusion"
          question="Who Is Being Left Out of the Financial System?"
          finding="1.2 million UK adults remain unbanked while bank branch closures have removed 6,200 access points since 2015, concentrated in deprived areas."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Financial inclusion — the ability of every person to access affordable financial products and services — is a foundational condition for economic participation. In the UK, 1.2 million adults are estimated to lack a basic bank account, preventing them from receiving wages electronically, paying utility bills by direct debit (which typically costs more than prepayment), or building any credit history. While this figure has fallen from 1.5 million in 2017 — largely through the rollout of fee-free basic bank accounts under FCA rules — the pace of improvement has slowed, and the remaining unbanked population is disproportionately concentrated among people who are homeless, recently arrived migrants, older people with no digital capability, and those with serious mental illness.</p>
            <p>Bank branch closures have fundamentally changed the landscape of face-to-face financial access. Between 2015 and 2024, over 6,200 bank and building society branches closed in the UK — 61% of the total branch network that existed in 2015. The distribution of closures is not uniform: rural communities and deprived urban areas have seen proportionally higher losses. The shift to digital-first banking has served younger, tech-comfortable customers well but has excluded significant populations, including an estimated 8.4 million adults who lack the confidence or capability to conduct basic financial transactions online.</p>
            <p>The costs of financial exclusion compound over time. Those without bank accounts pay an estimated £490 more per year for essential services — paying by cash or prepayment meter rather than direct debit, being unable to access loyalty or cash-back products, and paying higher insurance premiums due to lack of credit history. These costs fall hardest on the people with least money, acting as a persistent poverty premium. The Credit Union movement and Community Development Finance Institutions provide alternatives to high-cost credit for excluded communities, but their combined lending is a fraction of what mainstream lenders provide.</p>
            <p>Predatory financial products remain a significant risk for excluded consumers. Following the FCA&apos;s 2015 interest rate cap, the payday loan market collapsed — but the vacuum was partially filled by buy-now-pay-later (BNPL) products, which remained largely unregulated until 2025, and by illegal lending, estimated to affect 1.1 million people. Debt distress affects 12.9% of UK adults — 6.8 million people — according to the FCA&apos;s 2024 Financial Lives Survey, up 3.1 percentage points since the onset of the cost-of-living crisis.</p>
            <p>The UK&apos;s approach to financial inclusion has historically been patchwork: voluntary commitments from banks, Basic Bank Account obligations, and Post Office financial services. The 2023 Financial Services and Markets Act introduced new duties on banks to assess the impact of branch closures and provide alternatives, and the Bank Hubs programme — shared banking facilities in towns that lose all their bank branches — had established 20 locations by 2024 with 100 more planned. Whether these measures are sufficient to reverse the geographic retreat of financial services infrastructure is contested, with consumer groups arguing that the hub model cannot replicate the accessibility and relationship-based support of a full branch network.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Branch Closures' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Unbanked adults"
              value="1.2m"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 1.5m in 2017 · still 2.4% of adults"
              sparklineData={[1.5, 1.48, 1.45, 1.42, 1.38, 1.32, 1.25, 1.22, 1.2]}
              onExpand={() => {}}
              source="FCA · Financial Lives Survey 2024"
            />
            <MetricCard
              label="Bank branches closed since 2015"
              value="6,200+"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="61% of 2015 branch network gone"
              sparklineData={[200, 450, 800, 1200, 1800, 2600, 3500, 4600, 6200]}
              onExpand={() => {}}
              source="Which? · Branch Tracker 2024"
            />
            <MetricCard
              label="Adults in debt distress"
              value="12.9%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+3.1pp since 2019 · 6.8m adults"
              sparklineData={[8.1, 8.4, 8.9, 9.2, 9.8, 11.4, 12.1, 12.6, 12.9]}
              onExpand={() => {}}
              source="FCA · Financial Lives Survey 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Bank branch closures, 2016–2024"
              subtitle="Cumulative bank and building society branch closures since 2015."
              series={series}
              yLabel="Branches closed (cumulative)"
              source={{
                name: 'Which?',
                dataset: 'Branch Tracker',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>FCA — Financial Lives Survey 2024. Published biennially. fca.org.uk/data/financial-lives</p>
            <p>Which? — Branch Tracker 2024. Tracks all UK bank and building society branch openings and closures. which.co.uk/news/article/bank-branch-closures</p>
            <p>Branch closure figures are cumulative from January 2015. Unbanked adult estimates are derived from FCA survey data. Debt distress is defined as missing a bill or credit repayment in 3 or more of the previous 6 months or finding keeping up with bills a heavy burden.</p>
          </div>
        </section>
      </main>
    </>
  )
}
