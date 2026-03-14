'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'FCA', dataset: 'Consumer Credit Market Study', date: '2024', note: 'Payday loan volumes fell 95% after 2015 price cap' },
  { num: 2, name: 'FCA', dataset: 'Financial Lives Survey', date: '2024', note: 'BNPL lending reached £19bn, used by 17 million people' },
  { num: 3, name: 'Illegal Money Lending Teams / Centre for Responsible Credit', dataset: 'Annual Report', date: '2024', note: 'Estimated 1.1 million people using illegal lenders' },
];

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
            <p>The payday loan market collapsed 95% after the FCA introduced a price cap in January 2015 — total loans issued fell from 10.3 million in 2013 to 1.8 million in 2023.<Cite nums={1} /> The cap limited costs to 0.8% per day, capped default fees at £15, and prevented total charges exceeding 100% of the original loan. The regulation ended the worst debt-spiral abuses, but it also removed short-term credit that met genuine liquidity needs for households with irregular incomes or no mainstream access. Buy-now-pay-later grew explosively to fill part of the gap — total BNPL lending reached £19 billion in 2023, used by 17 million people — operating largely outside FCA regulation until 2024.<Cite nums={2} /> Illegal lending is estimated to affect 1.1 million people, the Illegal Money Lending Teams prosecuting lenders who use intimidation rather than legal process.<Cite nums={3} /></p>
            <p>The credit gap from payday regulation falls hardest on the financially excluded: those with poor credit scores, benefit income, or multiple debt obligations who cannot access credit unions and lack the time to navigate their application processes.<Cite nums={[1, 2]} /> Credit union membership has grown 30% since 2015 to 2 million, but the sector remains geographically concentrated — strong in Northern Ireland, Scotland, and some urban English communities, sparse in rural and suburban areas. The consequence is that the lowest-income households face a choice between unregulated BNPL products, illegal lenders, or going without — a constraint concentrated in deprived areas already experiencing the highest rates of problem debt.<Cite nums={3} /></p>
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
              href="#sec-chart"/>
            <MetricCard
              label="BNPL users in arrears"
              value="1.2m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1.2m in BNPL arrears · unregulated until 2024"
              sparklineData={[0, 0, 0.1, 0.2, 0.4, 0.7, 1.0, 1.1, 1.2]}
              source="FCA · Financial Lives Survey 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Illegal lending victims (estimate)"
              value="1.1m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1.1m using illegal lenders · post-payday gap"
              sparklineData={[0.6, 0.7, 0.7, 0.8, 0.9, 1.0, 1.0, 1.1, 1.1]}
              source="Illegal Money Lending Teams / Centre for Responsible Credit 2024"
              href="#sec-chart"/>
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Payday loan volumes from FCA Consumer Credit Market Study and regulatory returns data. BNPL arrears from FCA Financial Lives Survey 2024 and provider data. Illegal lending estimates from Illegal Money Lending Teams annual reports and Centre for Responsible Credit research. Credit union membership from Bank of England regulatory data.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
