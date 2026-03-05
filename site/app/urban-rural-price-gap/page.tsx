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
  urbanAffordabilityRatio: number
  ruralAffordabilityRatio: number
  ruralUrbanGap?: number
}

interface UrbanRuralPriceGapData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function UrbanRuralPriceGapPage() {
  const [data, setData] = useState<UrbanRuralPriceGapData | null>(null)

  useEffect(() => {
    fetch('/data/urban-rural-price-gap/urban_rural_price_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const ratioSeries: Series[] = data
    ? [
        {
          id: 'rural',
          label: 'Rural affordability ratio',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ruralAffordabilityRatio,
          })),
        },
        {
          id: 'urban',
          label: 'Urban affordability ratio',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.urbanAffordabilityRatio,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Are Rural Areas Becoming Unaffordable?"
          finding="Remote working has driven rural house prices up 8% above pre-pandemic trend &mdash; and 38% of rural areas now have price-to-earnings ratios above 10."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Between 2019 and 2021, pandemic-driven remote working pushed rural house prices up approximately 19% in real terms &mdash; against 11% in urban areas. The rural affordability ratio peaked at 11.1 in 2021 before partially easing; it stood at 9.9 in 2024, still above the urban equivalent of 8.6, and 38% of rural local authorities now have price-to-earnings ratios above 10. The urban&ndash;rural affordability gap, just 0.3 in 2015, had grown to over 1.3 by 2024. The squeeze is compounded by lower rural wages: workers in rural areas earn approximately 14% less than their urban counterparts, meaning rural households face higher price-to-earnings ratios on lower absolute incomes.</p>
            <p>The consequences are reshaping rural communities. Village schools are closing as family households are displaced; local businesses face labour shortages because workers cannot afford to live nearby. In coastal and rural communities, second homes and Airbnb properties have removed stock from the primary market. Planning constraints &mdash; National Parks, Areas of Outstanding Natural Beauty, Green Belts &mdash; restrict new development in the most affected areas, while council tax premiums on second homes and empty-property surcharges are marginal interventions relative to the scale of displacement.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Affordability Ratios' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rural affordability ratio"
              value="9.9&times;"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="easing from peak &middot; still worse than cities"
              sparklineData={[8.2, 8.9, 9.4, 9.8, 11.1, 10.8, 10.2, 9.9]}
              onExpand={() => {}}
              source="ONS &middot; Housing Affordability in England and Wales 2024"
            />
            <MetricCard
              label="Rural areas above 10&times; earnings"
              value="38%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="of rural LAs now unaffordable &middot; WFH premium"
              sparklineData={[12, 15, 18, 22, 45, 42, 40, 38]}
              onExpand={() => {}}
              source="ONS &middot; Local Authority Affordability Ratios 2024"
            />
            <MetricCard
              label="Rural wage vs urban"
              value="-14%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="workers paid less in rural areas &middot; double squeeze"
              sparklineData={[-12, -12, -13, -13, -14, -14, -14, -14]}
              onExpand={() => {}}
              source="ONS &middot; ASHE Regional Earnings 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="House price to earnings ratios: rural vs urban, 2015&ndash;2024"
              subtitle="Rural (amber) and urban (dark) median house price divided by median earnings. Rural affordability worsened sharply after 2020."
              series={ratioSeries}
              yLabel="Price-to-earnings ratio"
              source={{
                name: 'ONS',
                dataset: 'Housing Affordability in England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Housing Affordability in England and Wales. Annual release. ons.gov.uk/peoplepopulationandcommunity/housing/bulletins/housingaffordabilityinenglandandwales/latest</p>
            <p>ONS &mdash; ASHE Regional Earnings. Annual Survey of Hours and Earnings. ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/ashe</p>
            <p>DEFRA &mdash; Rural-Urban Classification. Methodology for classifying local authorities as rural or urban. gov.uk/government/collections/rural-urban-classification</p>
            <p>Affordability ratio defined as median house price divided by median gross annual earnings for full-time workers in the same local authority. Rural/urban split uses DEFRA Rural-Urban Classification of Local Authority Districts.</p>
          </div>
        </section>
      </main>
    </>
  )
}
