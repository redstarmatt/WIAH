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
            <p>Between 2009 and 2021, the Bank of England base rate sat at or near historic lows &mdash; for much of that period at 0.1%. Mortgage rates followed, with the most competitive fixed-rate deals available at below 1.5%. This environment allowed house prices to rise rapidly while keeping mortgage payments manageable as a share of income. Many buyers in this period stretched further on purchase price than they otherwise might, calculating that their monthly payments were affordable in the prevailing rate environment.</p>
            <p>The reversal has been sharp. Beginning in December 2021, the Bank of England raised rates fourteen consecutive times in response to inflation, reaching 5.25% by August 2023. The average new mortgage rate rose from around 1.5% to above 5.5% &mdash; a near-fourfold increase in the cost of borrowing. For a new buyer taking a &pound;250,000 mortgage, this translated to monthly payment increases of &pound;600&ndash;&pound;700 compared to the low-rate era. Mortgage payments for new buyers now consume 41% of average take-home pay, up from 28% in 2015 &mdash; approaching the levels last seen in the early 1990s immediately before the housing market crash.</p>
            <p>The impact on existing owners has been deferred rather than avoided. Around five million UK mortgages are on fixed rates, providing temporary insulation from rate rises. But approximately 800,000 households came off fixed-rate deals in 2023&ndash;2024, many of them transitioning from sub-2% rates to rates above 5%. The average payment shock for these households &mdash; the increase in their monthly mortgage cost &mdash; has been estimated at around &pound;300 per month. For households already stretched by energy and food cost increases, this additional burden has pushed many to the financial edge.</p>
            <p>Mortgage arrears and possessions have risen from very low base levels, though they remain well below the peaks of the early 1990s or the post-2008 period. This partly reflects tighter affordability assessments introduced after the 2008 financial crisis, which require lenders to stress-test borrowers against rate rises, and partly reflects forbearance from lenders encouraged by the FCA and the government&rsquo;s Mortgage Charter. But arrears data is a lagging indicator: households exhaust savings and informal support before formally entering arrears, and the full effect of 2023&ndash;2024 remortgaging will take time to appear in the statistics.</p>
            <p>The long-term structural dynamic is that house prices have not fallen proportionately in response to higher rates &mdash; they have adjusted partially in some markets, but the underlying supply shortage continues to put a floor under prices. This means new buyers face a doubly difficult environment: prices remain elevated relative to incomes, and the cost of borrowing to buy them has also risen substantially. First-time buyer affordability ratios &mdash; house price to income for first-time buyers &mdash; remain near record highs despite modest price corrections, while the income required to qualify for an adequate mortgage has risen faster than wages in most parts of the country outside London and the South East.</p>
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
