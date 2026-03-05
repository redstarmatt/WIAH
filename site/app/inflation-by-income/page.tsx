'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface InflationByIncomeData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    poorestQuintileInflation: number
    richestQuintileInflation: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function InflationByIncomePage() {
  const [data, setData] = useState<InflationByIncomeData | null>(null)

  useEffect(() => {
    fetch('/data/inflation-by-income/inflation_by_income.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'poorest',
          label: 'Poorest 20%',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.poorestQuintileInflation })),
        },
        {
          id: 'richest',
          label: 'Richest 20%',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.richestQuintileInflation })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Inflation by Income" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Inflation by Income"
          question="Did Inflation Hit Everyone Equally?"
          finding="At peak inflation in late 2022, households in the poorest income quintile faced 12.8% inflation — 2.4 percentage points higher than the wealthiest, as food and energy hit harder on low incomes."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The inflation surge of 2021-2023 was not experienced equally. Standard measures of inflation, such as CPI, measure price changes across a representative basket of goods and services — but different income groups have fundamentally different consumption patterns. Poorer households spend a higher proportion of their income on food and energy, and a lower proportion on services such as restaurants, holidays, and financial products. When food and energy prices spike — as they did dramatically in 2021 following supply chain disruption and Russia&apos;s invasion of Ukraine — households at the bottom of the income distribution face significantly higher effective inflation rates than those at the top.</p>
            <p>The Resolution Foundation and ONS analysis of the 2022 inflation peak found that households in the bottom income quintile faced peak inflation of 12.8% in October 2022 — compared to 10.4% for those in the top quintile. A 2.4 percentage point gap may seem modest in absolute terms, but its distributional effect was severe: households already spending a higher share of income on necessities faced both higher prices and proportionally less discretionary income to absorb them. The poorest tenth of households in the UK spend roughly 8% of their budget on domestic energy and 17% on food and non-alcoholic drinks — combined, over 25% on categories that saw the sharpest price rises. The equivalent figure for the wealthiest tenth is approximately 12%.</p>
            <p>The energy price crisis was the single largest driver of the distributional inflation gap. The energy price guarantee — introduced by the Conservative government in October 2022 — capped average annual household energy bills at £2,500, providing a universal cushion. But the design of the guarantee as a unit price cap rather than a bill cap meant that households with smaller homes and lower energy consumption received less support in absolute terms than larger households. The follow-on Cost of Living Payments — flat-rate cash payments to Universal Credit recipients, pensioners, and disability benefit claimants — were better targeted but not calibrated to actual energy expenditure.</p>
            <p>Food inflation followed a similar distributional pattern. The UK&apos;s food price inflation peaked at 19.2% in March 2023 — the highest in 45 years — with staple items (bread, butter, pasta, cooking oil) seeing even higher increases. Budget grocery retailers saw record demand as households traded down. Shrinkflation — the reduction of product quantity without a corresponding price reduction — was identified by ONS across hundreds of product categories, effectively representing inflation that was not captured in headline figures. Food bank usage reached record levels throughout the period, with the Trussell Trust reporting 3.1 million food bank parcels in 2022-23.</p>
            <p>By 2025, headline inflation had returned close to the 2% target, and the distributional gap had narrowed substantially. But the cumulative price level effect — the sustained higher prices relative to 2020 baselines — persists and is not reversed by the return to low inflation. A household that saw its food bill rise 25% between 2020 and 2024 does not see that cost fall when inflation returns to 2%; prices simply rise more slowly from their new, higher level. The distributional legacy of the inflation surge is therefore a permanent reduction in the real living standards of those who faced the highest effective inflation rates and had the least financial resilience to absorb it — which, by definition, were those on the lowest incomes.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Inflation Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Peak inflation, poorest 20%"
              value="12.8%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Peak Oct 2022 · now returning to target"
              sparklineData={[2.1, 2.3, 1.8, 1.5, 1.8, 5.2, 10.1, 12.8, 3.2]}
              onExpand={() => {}}
              source="Resolution Foundation / ONS · Inflation Analysis 2023"
            />
            <MetricCard
              label="Peak inflation, richest 20%"
              value="10.4%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Peak Oct 2022 · lower energy/food share"
              sparklineData={[2.0, 2.1, 1.7, 1.4, 1.7, 4.8, 8.9, 10.4, 2.9]}
              onExpand={() => {}}
              source="Resolution Foundation / ONS · Inflation Analysis 2023"
            />
            <MetricCard
              label="Gap at peak"
              value="2.4pp"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="2.4pp inflation gap · persistent 2022-23"
              sparklineData={[0.1, 0.2, 0.1, 0.1, 0.1, 0.4, 1.2, 2.4, 0.3]}
              onExpand={() => {}}
              source="Resolution Foundation / ONS · Inflation Analysis 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Inflation rate by income group, 2016–2024"
              subtitle="Effective inflation rate experienced by lowest and highest income quintiles."
              series={series}
              yLabel="Inflation rate (%)"
              source={{
                name: 'Resolution Foundation',
                dataset: 'Inflation Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Resolution Foundation — Inflation Nation: Putting the Squeeze on Living Standards (2023). resolutionfoundation.org</p>
            <p>ONS — Consumer Price Inflation, UK; Living Costs and Food Survey. ons.gov.uk/economy/inflationandpriceindices</p>
            <p>Income quintile inflation rates are estimated by re-weighting the CPI basket to match the expenditure patterns of each income quintile as measured by the ONS Living Costs and Food Survey. Food and energy expenditure shares are taken from the LCF; prices applied are national CPI component indices. Annual figures are calendar year averages. Peak figures refer to October 2022, the highest point for both series.</p>
          </div>
        </section>
      </main>
    </>
  )
}
