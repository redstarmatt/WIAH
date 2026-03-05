'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface MortgageAffordabilityShockData {
  timeSeries: Array<{
    year: number
    mortgageAsTakehomePct: number
    avgMonthlyPayment: number
    newBuyerAffordabilityRatio?: number
  }>
  remortgagingHouseholds: number
  avgPaymentShock: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function MortgageAffordabilityShockPage() {
  const [data, setData] = useState<MortgageAffordabilityShockData | null>(null)

  useEffect(() => {
    fetch('/data/mortgage-affordability-shock/mortgage_affordability_shock.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const affordabilitySeries: Series[] = data
    ? [{
        id: 'mortgagePct',
        label: 'Mortgage as % of take-home pay',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.mortgageAsTakehomePct,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Mortgage Affordability Shock" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mortgage Affordability Shock"
          question="Can People Afford Their Mortgages?"
          finding="Mortgage payments for new buyers now consume 41% of take-home pay &mdash; and 800,000 households face payment shocks averaging &pound;300 more per month."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Between 2009 and 2021, the Bank of England base rate sat at or near 0.1%, with the best fixed-rate mortgage deals available below 1.5%. Beginning in December 2021, the Bank raised rates fourteen consecutive times to 5.25% by August 2023; average new mortgage rates crossed 5.5%, a near-fourfold increase. Mortgage payments for new buyers now consume 41% of average take-home pay &mdash; up from 28% in 2015 and approaching early 1990s levels &mdash; translating to monthly payment increases of &pound;600&ndash;&pound;700 on a &pound;250,000 mortgage compared to the low-rate era. Approximately 800,000 households came off fixed-rate deals in 2023&ndash;24, transitioning from sub-2% to rates above 5%, with an average payment shock estimated at around &pound;300 per month. Mortgage arrears and possessions have risen from a low base, though lender forbearance under the FCA&apos;s Mortgage Charter has delayed some of the distress appearing in formal statistics.</p>
            <p>The structural problem is that house prices have not fallen proportionately. An underlying supply shortage continues to put a floor under prices, so new buyers face a doubly constrained environment: prices remain elevated relative to incomes and the cost of borrowing to buy them has also surged. First-time buyer affordability ratios remain near record highs despite modest price corrections. The payment shock falls hardest on households in their 30s and 40s who bought at peak prices on low fixed rates &mdash; particularly those in London and the South East where absolute mortgage sizes are largest &mdash; and on those already squeezed by energy and food inflation who have no financial cushion to absorb the remortgaging cliff.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Affordability Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Mortgage % of take-home"
              value="41%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 28% in 2015 &middot; 10-year high"
              sparklineData={[28, 29, 30, 30, 33, 39, 41]}
              onExpand={() => {}}
              source="Nationwide &middot; Housing Affordability Report 2024"
            />
            <MetricCard
              label="Monthly payment 2024"
              value="&pound;1,140"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Average new mortgage &middot; +68% since 2015"
              sparklineData={[680, 710, 740, 760, 870, 1080, 1140]}
              onExpand={() => {}}
              source="Bank of England &middot; Mortgage Lenders &amp; Administrators 2024"
            />
            <MetricCard
              label="Remortgaging shock"
              value="&pound;300/month"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Avg extra cost for 800k households remortgaging in 2023&ndash;24"
              sparklineData={[20, 25, 30, 40, 80, 200, 300]}
              onExpand={() => {}}
              source="FCA &middot; Consumer Duty Mortgage Review 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Mortgage payments as % of take-home pay, new buyers, 2015&ndash;2024"
              subtitle="Average mortgage payment as a percentage of average take-home pay for new mortgage borrowers in England. Based on median income and mortgage approval data."
              series={affordabilitySeries}
              yLabel="Mortgage as % of take-home pay"
              source={{
                name: 'Nationwide / Bank of England',
                dataset: 'Housing Affordability Report / Mortgage Lenders Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Nationwide Building Society &mdash; UK House Price Index and Housing Affordability Reports. nationwide.co.uk/about/house-price-index</p>
            <p>Bank of England &mdash; Mortgage Lenders and Administrators Return (MLAR). bankofengland.co.uk/statistics/mortgage-lenders-and-administrators</p>
            <p>FCA &mdash; Mortgage Market Study and Consumer Duty reviews. fca.org.uk/data</p>
            <p>ONS &mdash; Annual Survey of Hours and Earnings (ASHE). ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours</p>
            <p>Mortgage as % of take-home pay is calculated using average new mortgage approvals, the prevailing average mortgage rate for the period, a 25-year repayment term, and median full-time worker take-home pay after tax and NI. Payment shock figures are median estimates from industry analysis and FCA survey data; individual experiences vary substantially. Remortgaging household counts are Bank of England estimates of fixed-rate deals expiring in 2023&ndash;24.</p>
          </div>
        </section>
      </main>
    </>
  )
}
