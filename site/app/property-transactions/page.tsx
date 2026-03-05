'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>UK residential property transactions reached a decade low of 1.02 million in 2023, down from a pandemic-era peak of 1.49 million in 2021. The cause was rapid. The Bank of England raised its base rate from 0.1% to 5.25% between December 2021 and August 2023 &mdash; the fastest tightening cycle in four decades &mdash; causing average two-year fixed mortgage rates to rise from approximately 2% to over 6%. For a household with a £300,000 mortgage, this represented an increase in monthly payments of over £900. Many potential movers concluded that the transaction costs of moving &mdash; stamp duty, legal fees, survey costs &mdash; were not worth bearing when the new mortgage rate would be substantially higher than the one they were leaving.</p>
            <p>The freeze was not evenly distributed. Cash buyers, who represent approximately a third of residential transactions, were largely insulated from rate changes. Older homeowners trading down from larger properties often had sufficient equity to absorb higher costs or buy outright. The cohort most affected was the mid-market: households moving home with existing mortgages, who needed to remortgage at higher rates to fund a purchase. This group effectively sat out the market, waiting for rates to fall. The consequence was a sharp drop in the mobility of the existing housing stock &mdash; fewer homes listed, fewer transactions completed, and a market that felt frozen even when prices remained relatively resilient.</p>
            <p>First-time buyers faced a compounded challenge. Higher mortgage rates reduced borrowing capacity, which in some cases was offset by modest house price falls &mdash; but the combination of higher rates and maintained prices in most areas meant that the deposit-to-price hurdle remained as high as ever. The number of first-time buyer completions fell approximately 18% over two years. Government schemes including Help to Buy had been wound down, and their successors &mdash; the mortgage guarantee scheme and various shared ownership products &mdash; offered partial mitigation but not the scale of support the previous scheme had provided.</p>
            <p>The partial recovery in 2024 &mdash; transactions reached 1.10 million &mdash; reflected the beginning of Bank of England rate cuts and a degree of market adjustment. Lenders competed aggressively on mortgage pricing as the peak of the rate cycle passed, and some of the pent-up demand from households that had deferred moves in 2023 returned to the market. Mortgage approvals recovered to approximately 660,000, still 10% below pre-pandemic levels, suggesting that the market was healing but had not returned to normalcy. Estate agents consistently reported that instructions &mdash; homes listed for sale &mdash; remained below normal levels, as potential sellers continued to be reluctant to trade into the market.</p>
            <p>The longer-term consequences of a frozen transaction market extend beyond the housing sector. Labour market mobility depends partly on people being able to move for work. When transactions collapse, people become locked into locations even when employment opportunities elsewhere might improve their prospects. Rental markets tighten further as people who would otherwise buy stay in rented accommodation. The build-to-rent sector benefits, but private landlords facing higher mortgage rates have been exiting the market, reducing supply precisely when demand is rising. The interaction between interest rates, transaction volumes, rental supply, and labour mobility is a systemic problem that headline mortgage rates alone do not fully capture.</p>
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
              changeText="recovering from 2023 decade-low &middot; still below 2015"
              sparklineData={[1.23, 1.19, 1.22, 1.19, 1.18, 1.04, 1.49, 1.26, 1.02, 1.10]}
              onExpand={() => {}}
              source="HMRC &middot; UK Property Transactions 2024"
            />
            <MetricCard
              label="Mortgage approvals"
              value="660k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="improving &middot; but -10% vs pre-pandemic"
              sparklineData={[730000, 695000, 740000, 720000, 699000, 618000, 922000, 764000, 612000, 660000]}
              onExpand={() => {}}
              source="Bank of England &middot; 2024"
            />
            <MetricCard
              label="First-time buyer market"
              value="-18%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="first-time buyers down 18% in 2 years"
              sparklineData={[100, 102, 105, 103, 101, 88, 108, 97, 85, 82]}
              onExpand={() => {}}
              source="UK Finance &middot; 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK residential transactions and mortgage approvals, 2015&ndash;2024"
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
            <p>HMRC &mdash; UK Property Transaction Statistics. Published monthly. gov.uk/government/statistics/uk-property-transactions-statistics</p>
            <p>Bank of England &mdash; Mortgage Lending Statistics. bankofengland.co.uk/statistics/mortgage-lenders-and-administrators</p>
            <p>UK Finance &mdash; First-Time Buyer Data. ukfinance.org.uk/data-and-research/data</p>
            <p>Transaction data covers residential property transactions (including new build) completing with stamp duty land tax. Scotland, Wales, and Northern Ireland use separate land transaction taxes; UK total combines all four nations. Mortgage approvals are Bank of England seasonally-adjusted data covering all lenders.</p>
          </div>
        </section>
      </main>
    </>
  )
}
