'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface OTCMedicineData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    otcPriceIndexVs2021: number
    prescriptionCharge: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function OverTheCounterMedicineCostsPage() {
  const [data, setData] = useState<OTCMedicineData | null>(null)

  useEffect(() => {
    fetch('/data/over-the-counter-medicine-costs/over_the_counter_medicine_costs.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'otcPriceIndexVs2021',
          label: 'OTC price change vs 2021 (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.otcPriceIndexVs2021 })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Medicine Costs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Medicines Access"
          question="Can People Afford Basic Medicines?"
          finding="Common over-the-counter medicines have risen 40-70% in price since 2021, with ibuprofen now costing more than an NHS prescription charge for many — pushing low-income households to go untreated."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Common over-the-counter medicines rose 40&ndash;70% in price between January 2021 and January 2024, with paracetamol and ibuprofen &mdash; the most widely used analgesics &mdash; up 60&ndash;80% in some retail channels. The NHS encourages OTC self-management for minor conditions, and the 2019 prescribing guidance was intended to shift costs away from the system. But that strategy is undermined when people cannot afford OTC treatment: 4.2 million people are estimated to be going without medicines they need. The NHS prescription charge in England is &pound;9.90 per item, but 90% of prescriptions are dispensed free &mdash; meaning that for exempt patients, the GP route is now cheaper than buying OTC. The Pharmacy First scheme launched in January 2024, allowing pharmacists to treat seven minor conditions without a GP referral, but does not address the underlying affordability gap.</p>
            <p>The burden falls hardest on those with least. People in the bottom income quintile &mdash; already spending over 90% of income on necessities &mdash; are most likely to go untreated when OTC prices rise. Research by Healthwatch and the Health Foundation consistently finds that lower-income households are less likely to self-medicate and more likely to leave conditions untreated, with downstream consequences for both individual health and NHS demand. Many eligible for prescription charge exemptions through the Low Income Scheme do not claim them, leaving a gap that higher OTC prices have widened.</p>
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
              label="OTC medicine price rise since 2021"
              value="+55%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+55% avg across common OTC products"
              sparklineData={[0, 2, 4, 5, 8, 30, 45, 50, 55]}
              source="PAGB / ONS · Consumer Price Index 2024"
              href="#sec-chart"/>
            <MetricCard
              label="NHS prescription charge 2024"
              value="£9.90"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="£9.90 per item · 90% exempt via exemptions"
              sparklineData={[8.60, 8.80, 8.80, 9.15, 9.35, 9.35, 9.35, 9.65, 9.90]}
              source="NHS Business Services Authority 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Patients avoiding OTC treatment"
              value="4.2m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="4.2m unable to afford OTC treatment"
              sparklineData={[2.0, 2.1, 2.2, 2.3, 2.5, 3.2, 3.8, 4.0, 4.2]}
              source="Healthwatch England / PAGB 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Over-the-counter medicine price inflation, 2016–2024"
              subtitle="Average price increase of common OTC medicines relative to January 2021 baseline (%)."
              series={series}
              yLabel="Price change vs 2021 (%)"
              source={{ name: 'PAGB', dataset: 'OTC Medicine Price Tracker', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>OTC medicine price data from PAGB (Proprietary Association of Great Britain) price monitoring and ONS Consumer Price Index health sub-components. NHS prescription charge history from NHS Business Services Authority. Patients forgoing treatment estimated from Healthwatch England survey data and Health Foundation analysis of medicines access inequality. Pharmacy First scheme data from NHS England primary care statistics.</p>
          </div>
        </section>
      </main>
    </>
  )
}
