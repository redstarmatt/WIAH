'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  transactionsM: number
  mortgageApprovals: number
  ftbShare?: number
}

interface PropertyTransactionsData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PropertyTransactionsPage() {
  const [data, setData] = useState<PropertyTransactionsData | null>(null)

  useEffect(() => {
    fetch('/data/property-transactions/property_transactions.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const transactionsSeries: Series[] = data
    ? [
        {
          id: 'transactions',
          label: 'Residential transactions (millions)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.transactionsM,
          })),
        },
        {
          id: 'mortgages',
          label: 'Mortgage approvals (100k)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mortgageApprovals / 100000,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Property Transactions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Property Transactions"
          question="Has the Housing Market Seized Up?"
          finding="Residential property transactions fell to a decade low in 2023 as mortgage rates doubled, freezing the market for movers and buyers alike."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK residential property transactions reached a decade low of 1.02 million in 2023, down from a pandemic-era peak of 1.49 million in 2021. The Bank of England raised its base rate from 0.1% to 5.25% between December 2021 and August 2023 — the fastest tightening cycle in four decades — causing average two-year fixed mortgage rates to rise from approximately 2% to over 6%. For a household with a £300,000 mortgage, monthly payments rose by over £900. First-time buyer completions fell approximately 18% over two years; government schemes including Help to Buy had been wound down, and their successors offered partial mitigation at a fraction of the previous scale. A partial recovery in 2024 reached 1.10 million transactions as Bank of England rate cuts unlocked pent-up demand.</p>
            <p>The freeze was not evenly distributed. Cash buyers, representing approximately a third of transactions, were largely insulated. The cohort most affected was the mid-market: households needing to remortgage at higher rates to fund a move, who effectively sat out the market. The longer-term consequences extend beyond housing: labour market mobility depends partly on people being able to move for work, and a frozen transaction market locks people into locations. Rental markets tighten further as potential first-time buyers remain renting for longer, while private landlords facing higher mortgage costs have been exiting the market, reducing supply precisely when demand rises.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Transactions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Residential transactions 2024"
              value="1.10m"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="recovering from 2023 decade-low · still below 2015"
              sparklineData={[1.23, 1.19, 1.22, 1.19, 1.18, 1.04, 1.49, 1.26, 1.02, 1.10]}
              href="#sec-chart"source="HMRC · UK Property Transactions 2024"
            />
            <MetricCard
              label="Mortgage approvals"
              value="660k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="improving · but -10% vs pre-pandemic"
              sparklineData={[730000, 695000, 740000, 720000, 699000, 618000, 922000, 764000, 612000, 660000]}
              href="#sec-chart"source="Bank of England · 2024"
            />
            <MetricCard
              label="First-time buyer market"
              value="-18%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="first-time buyers down 18% in 2 years"
              sparklineData={[100, 102, 105, 103, 101, 88, 108, 97, 85, 82]}
              href="#sec-chart"source="UK Finance · 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK residential transactions and mortgage approvals, 2015–2024"
              subtitle="Annual residential property transactions (millions, left) and mortgage approvals scaled to same axis. Pandemic boom and rate-rise freeze both clearly visible."
              series={transactionsSeries}
              yLabel="Millions / 100k"
              source={{
                name: 'HMRC / Bank of England',
                dataset: 'UK Property Transactions Statistics / Mortgage Lending Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HMRC — UK Property Transaction Statistics. Published monthly. gov.uk/government/statistics/uk-property-transactions-statistics</p>
            <p>Bank of England — Mortgage Lending Statistics. bankofengland.co.uk/statistics/mortgage-lenders-and-administrators</p>
            <p>UK Finance — First-Time Buyer Data. ukfinance.org.uk/data-and-research/data</p>
            <p>Transaction data covers residential property transactions (including new build) completing with stamp duty land tax. Scotland, Wales, and Northern Ireland use separate land transaction taxes; UK total combines all four nations. Mortgage approvals are Bank of England seasonally-adjusted data covering all lenders.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
