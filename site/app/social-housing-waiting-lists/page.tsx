'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>Social housing waiting lists in England have grown by nearly a third since 2016, reaching 1.29 million households in 2024. This figure, published annually by the DLUHC, represents households that have applied to local authorities for social housing and been accepted onto the register &mdash; but the actual number experiencing housing need is substantially higher, as many councils operate restrictive eligibility criteria that exclude households that do not meet priority thresholds. Shelter estimates that a further 200,000 households in temporary accommodation and concealed households living involuntarily with others should be added to any honest count of unmet social housing need.</p>
            <p>The shortage of social housing has structural roots going back four decades. At the peak of council house building in the 1970s, local authorities were constructing over 100,000 social homes per year. The Right to Buy programme, introduced in 1980, sold approximately 2 million council properties at discounted rates over the following decades, with replacement rates consistently below sales rates. By 2023, only 29,000 social homes were built, including all new affordable housing tenures. The replacement rate for Right to Buy sales &mdash; currently running at approximately 1 new home for every 11 sold &mdash; means the social housing stock is in structural decline despite new build programmes.</p>
            <p>The consequence is extreme heterogeneity in waiting times. In some rural local authorities with limited social stock and low turnover, waiting times for a family home can exceed 15 years. In London, the average wait for a two-bedroom property has been estimated by the London Assembly at over 10 years. In higher-turnover areas with more social stock and lower demand &mdash; typically northern cities &mdash; waiting times may be 2&ndash;3 years for standard properties, though demand for larger or accessible properties is higher everywhere. The geography of social housing shortage directly mirrors the geography of housing affordability pressure more broadly.</p>
            <p>Temporary accommodation is one of the most visible consequences of the waiting list crisis. The number of households in temporary accommodation &mdash; hotels, bed and breakfasts, leased private properties &mdash; reached record levels in 2024, with 117,000 households placed in temporary accommodation by local authorities, at an estimated cost to councils of &pound;1.8 billion per year. The concentration of families, including children, in bed-and-breakfast accommodation for extended periods &mdash; in some cases over a year &mdash; represents a significant welfare failure with well-documented impacts on children&apos;s education, health, and development.</p>
            <p>Government policy under the Labour administration elected in 2024 includes an ambitious programme of social and affordable housing delivery: a target of 1.5 million homes over five years, with a specific commitment to building the most social housing in a generation. The planning reforms introduced in 2024 &mdash; including mandatory housing targets, revised national planning policy, and changes to affordable housing contributions from developers &mdash; are intended to significantly increase the pipeline. Critics note that the fundamental barrier is not planning permission but viability: building social housing at rents that households can afford requires either grant subsidy from government or cross-subsidy from market sales, and the economics of both routes have become more challenging as construction costs and interest rates have risen.</p>
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
              onExpand={() => {}}
              source="DLUHC &middot; Local Authority Housing Statistics 2024"
            />
            <MetricCard
              label="Social homes built per year"
              value="29,000"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="29,000 in 2023 · vs 100,000/yr in 1970s peak"
              sparklineData={[42000, 38000, 35000, 34000, 33000, 28000, 31000, 30000, 29000]}
              onExpand={() => {}}
              source="DLUHC &middot; Housebuilding Statistics 2024"
            />
            <MetricCard
              label="Average London wait (2-bed)"
              value="10.2 years"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+2.3 years since 2015 · national avg: 5.2 yrs"
              sparklineData={[7.0, 7.4, 7.8, 8.2, 8.5, 8.8, 9.2, 9.7, 10.2]}
              onExpand={() => {}}
              source="London Assembly Housing Committee 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Social housing waiting list, England, 2016&ndash;2024"
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
            <p>DLUHC &mdash; Local Authority Housing Statistics. Published annually. gov.uk/government/collections/local-authority-housing-data</p>
            <p>DLUHC &mdash; Housebuilding Statistics. Published quarterly. gov.uk/government/collections/house-building-statistics</p>
            <p>London Assembly Housing Committee &mdash; Social Housing Waiting Times analysis 2024. Shelter &mdash; Housing Need estimates, 2024.</p>
            <p>Waiting list figures represent households accepted onto social housing registers. Many councils apply eligibility criteria &mdash; the number in housing need but not on a register is substantially higher. Social homes built figures include all social rent and affordable rent completions.</p>
          </div>
        </section>
      </main>
    </>
  )
}
