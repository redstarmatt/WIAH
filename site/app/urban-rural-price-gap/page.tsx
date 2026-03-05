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
            <p>For most of the twentieth century, the housing affordability problem was synonymous with cities. Rural areas, where wages were lower but so were house prices, presented a different and less acute affordability challenge. The pandemic changed this calculus abruptly and dramatically. When remote working became widespread from 2020 onwards, a large cohort of higher-earning urban professionals discovered they could live anywhere. They chose the countryside &mdash; and they could outbid the people who already lived there.</p>
            <p>Between 2019 and 2021, rural house prices rose by approximately 19% in real terms &mdash; compared to 11% in urban areas. The rural affordability ratio, which measures median house prices against median earnings, peaked at 11.1 in 2021 before easing somewhat as interest rates rose and remote working patterns partially normalised. But the easing has been incomplete: the rural affordability ratio stood at 9.9 in 2024, still nearly 10 times local median earnings and still above the urban equivalent of 8.6. The gap between rural and urban affordability, which was just 0.3 in 2015, had grown to over 1.3 by 2024.</p>
            <p>The double squeeze on rural communities is particularly severe. Not only have house prices risen faster than in cities, but rural wages remain significantly lower. Workers in rural areas earn approximately 14% less than their urban counterparts on average, a gap that reflects both the industrial mix of rural economies and the lower concentration of high-productivity knowledge economy jobs. The result is that rural households face higher price-to-earnings ratios on lower absolute incomes, making the affordability challenge proportionally more acute even where headline prices are below those in major cities.</p>
            <p>The consequences are reshaping rural communities. Young people who grew up in the countryside are being priced out of their home areas. Village schools are closing as family households are displaced. Local businesses &mdash; shops, pubs, tradespeople &mdash; face labour shortages as workers cannot afford to live nearby. In coastal and rural communities, the proportion of second homes and Airbnb properties has risen sharply, removing stock from the primary market and reducing the permanent population available to sustain local services. The social fabric of rural England is under strain in ways that the aggregate affordability statistics do not fully capture.</p>
            <p>The planning system compounds the problem. Many of the most desirable rural areas have protected landscape designations &mdash; National Parks, Areas of Outstanding Natural Beauty, Green Belts &mdash; that severely restrict new housing development. Where affordable rural housing does get built, it is often restricted to local needs, but the definition of &apos;local&apos; is contested and enforcement is patchy. Some rural councils have introduced additional council tax on second homes, and the previous government introduced reforms to allow councils to charge premiums on properties left empty. These are marginal interventions relative to the scale of the problem. Without a sustained programme of genuinely affordable rural housing development, the character of Britain&apos;s countryside will continue to change as economic displacement accelerates.</p>
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
