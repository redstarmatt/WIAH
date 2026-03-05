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
            <p>Financial inclusion &mdash; access to affordable financial products and services &mdash; is a foundational condition for economic participation. In the UK, 1.2 million adults still lack a basic bank account, down from 1.5 million in 2017 but with the pace of improvement stalling. The remaining unbanked are disproportionately homeless people, recently arrived migrants, older people without digital capability, and those with serious mental illness. Between 2015 and 2024, over 6,200 bank and building society branches closed &mdash; 61% of the 2015 network &mdash; with rural communities and deprived urban areas absorbing proportionally higher losses. Those excluded from mainstream banking pay an estimated &pound;490 more per year for essential services through cash payments, prepayment meters, and higher insurance premiums. Debt distress now affects 12.9% of UK adults &mdash; 6.8 million people &mdash; up 3.1 percentage points since the onset of the cost-of-living crisis.</p>
            <p>The costs of financial exclusion compound over time and fall hardest on those with least money. An estimated 8.4 million adults cannot conduct basic financial transactions online, leaving them increasingly locked out of digital-first banking and unable to access the cheapest tariffs and products. Predatory lending has partially filled the gap left by the collapsed payday loan market: illegal lending is estimated to affect 1.1 million people, while buy-now-pay-later products remained largely unregulated until 2025. The 2023 Financial Services and Markets Act introduced new duties on banks to assess the impact of branch closures and provide alternatives, and the Bank Hubs programme had established 20 shared facilities by 2024 &mdash; though consumer groups argue hubs cannot replicate the accessibility of a full branch network.</p>
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
