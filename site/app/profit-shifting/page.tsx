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
  corporateTaxGapBn: number
  largeBusinessYieldBn: number
}

interface ProfitShiftingData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ProfitShiftingPage() {
  const [data, setData] = useState<ProfitShiftingData | null>(null)

  useEffect(() => {
    fetch('/data/profit-shifting/profit_shifting.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const taxGapSeries: Series[] = data
    ? [
        {
          id: 'tax-gap',
          label: 'Corporate tax gap (£bn)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.corporateTaxGapBn,
          })),
        },
        {
          id: 'yield',
          label: 'Large business yield (£bn)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.largeBusinessYieldBn,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Profit Shifting" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Profit Shifting"
          question="Are Large Companies Paying Their Fair Share of Tax?"
          finding="HMRC estimates £6.5 billion in corporate tax goes unpaid each year, with multinational profit-shifting accounting for the largest share."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK corporate tax gap &mdash; the difference between what businesses should pay and what HMRC actually collects &mdash; stood at &pound;6.5 billion in 2023, up from &pound;4.8 billion in 2016. Profit shifting by multinationals &mdash; booking profits in low-tax jurisdictions while economic activity occurs in the UK &mdash; is consistently identified as the largest single contributor. A multinational may hold intellectual property in Ireland, Luxembourg, or the Netherlands, with the UK subsidiary paying royalties that reduce its UK taxable profit. HMRC has significantly expanded large business compliance activity since 2016, growing the yield from enquiries from &pound;8.9 billion to &pound;13.4 billion, and the UK was an early adopter of country-by-country reporting. The OECD&rsquo;s Pillar Two global minimum tax, implemented by the UK from 2024, establishes a 15% minimum effective rate for large multinationals.</p>
            <p>When profitable multinationals pay effective tax rates far below the headline corporate rate, the burden falls more heavily on domestic businesses that cannot shift profits internationally &mdash; small and medium-sized enterprises that pay the full rate because all their activity is in the UK. This creates a structural competitive disadvantage for domestic firms and erodes confidence that the tax system is fair. An estimated &pound;24 billion in profits are shifted offshore annually, representing a significant ongoing subsidy to corporate structures that would not exist without British markets, workers, and public infrastructure.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Tax Gap vs Yield' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Corporate tax gap"
              value="£6.5bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up 35% since 2016 &middot; profit shifting largest element"
              sparklineData={[4.8, 5.0, 5.2, 5.6, 5.1, 5.8, 6.2, 6.5]}
              href="#sec-chart"source="HMRC &middot; Measuring Tax Gaps 2023"
            />
            <MetricCard
              label="Large business yield"
              value="£13.4bn"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="HMRC enforcement up &middot; but gap growing faster"
              sparklineData={[8.9, 9.4, 10.1, 11.2, 9.8, 11.6, 12.8, 13.4]}
              href="#sec-chart"source="HMRC &middot; 2023"
            />
            <MetricCard
              label="Estimated profit shifted"
              value="£24bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="estimated offshore annually &middot; Action Plan in place"
              sparklineData={[18, 19, 20, 21, 20, 22, 23, 24]}
              href="#sec-chart"source="HMRC / OECD estimates &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Corporate tax gap vs large business yield, 2016&ndash;2023"
              subtitle="Tax gap: estimated unpaid corporate tax. Yield: additional tax collected through HMRC compliance activity. Both in £ billions."
              series={taxGapSeries}
              yLabel="£ billions"
              source={{
                name: 'HMRC',
                dataset: 'Measuring Tax Gaps / Large Business Compliance',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HMRC &mdash; Measuring Tax Gaps. Published annually. gov.uk/government/statistics/measuring-tax-gaps</p>
            <p>HMRC &mdash; Large Business Compliance Activity and Yield Statistics. gov.uk/hmrc-internal-manuals/large-business-manual</p>
            <p>OECD &mdash; BEPS Action Plan and Pillar Two Global Minimum Tax. oecd.org/tax/beps</p>
            <p>The tax gap represents HMRC&rsquo;s central estimate of the theoretical tax liability that is not collected. It does not represent tax that is definitively owed, as some arrangements may be legal. Large business yield reflects additional tax secured through enquiries, risk reviews, and litigation, not including tax paid voluntarily or at filing. Profit-shifting estimates are modelled and subject to methodological uncertainty.</p>
          </div>
        </section>
      </main>
    </>
  )
}
