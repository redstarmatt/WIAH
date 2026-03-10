'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

interface SocialHousingWaitingListsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    waitingListK: number
    socialHomesBuiltK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function SocialHousingWaitingListsPage() {
  const [data, setData] = useState<SocialHousingWaitingListsData | null>(null)

  useEffect(() => {
    fetch('/data/social-housing-waiting-lists/social_housing_waiting_lists.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'waitingList',
          label: 'Waiting list (thousands)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.waitingListK,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Social Housing Waiting Lists" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Housing Waiting Lists"
          question="How Long Is the Wait for Social Housing?"
          finding="1.29 million households are on social housing waiting lists in England, with the typical wait in London now over 10 years."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Social housing waiting lists in England have grown by nearly a third since 2016, reaching 1.29 million households in 2024. The structural roots run four decades deep: at the 1970s peak, local authorities built over 100,000 social homes per year; by 2023, only 29,000 were completed across all affordable tenures. Right to Buy, introduced in 1980, has sold approximately 2 million council properties at discounted rates, with replacement running at roughly 1 new social home for every 11 sold. The result is extreme variation in waiting times — over 10 years for a two-bedroom property in London, according to the London Assembly, and up to 15 years in some rural areas with limited stock, compared with 2–3 years in higher-turnover northern cities. The 1.29 million figure understates true need: Shelter estimates a further 200,000 households in temporary accommodation, and many councils apply restrictive eligibility criteria that exclude households not yet meeting priority thresholds.</p>
            <p>The consequences for those at the bottom are severe. Some 117,000 households were placed in temporary accommodation by local authorities in 2024 — hotels, bed and breakfasts, and leased private properties — at an estimated cost to councils of £1.8 billion per year, with documented impacts on children's education, health, and development when families remain for months or years. Labour's 2024 planning reforms — mandatory housing targets, revised national planning policy, and stronger affordable housing developer contributions — aim to increase the pipeline. Critics note the fundamental barrier is viability: building social rent homes requires either direct grant subsidy or cross-subsidy from market sales, and the economics of both have worsened as construction costs and interest rates have risen.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Waiting List' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Households on waiting list"
              value="1.29m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+31% since 2016 · 10yr+ wait in London"
              sparklineData={[980, 1010, 1030, 1050, 1090, 1100, 1140, 1200, 1290]}
              href="#sec-chart"source="DLUHC · Local Authority Housing Statistics 2024"
            />
            <MetricCard
              label="Social homes built per year"
              value="29,000"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="29,000 in 2023 · vs 100,000/yr in 1970s peak"
              sparklineData={[42000, 38000, 35000, 34000, 33000, 28000, 31000, 30000, 29000]}
              href="#sec-chart"source="DLUHC · Housebuilding Statistics 2024"
            />
            <MetricCard
              label="Average London wait (2-bed)"
              value="10.2 years"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+2.3 years since 2015 · national avg: 5.2 yrs"
              sparklineData={[7.0, 7.4, 7.8, 8.2, 8.5, 8.8, 9.2, 9.7, 10.2]}
              href="#sec-chart"source="London Assembly Housing Committee 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Social housing waiting list, England, 2016–2024"
              subtitle="Households on local authority social housing registers."
              series={series}
              yLabel="Households (thousands)"
              source={{
                name: 'DLUHC',
                dataset: 'Local Authority Housing Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DLUHC — Local Authority Housing Statistics. Published annually. gov.uk/government/collections/local-authority-housing-data</p>
            <p>DLUHC — Housebuilding Statistics. Published quarterly. gov.uk/government/collections/house-building-statistics</p>
            <p>London Assembly Housing Committee — Social Housing Waiting Times analysis 2024. Shelter — Housing Need estimates, 2024.</p>
            <p>Waiting list figures represent households accepted onto social housing registers. Many councils apply eligibility criteria — the number in housing need but not on a register is substantially higher. Social homes built figures include all social rent and affordable rent completions.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
