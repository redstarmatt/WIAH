'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface ConcealedHomelessnessData {
  timeSeries: Array<{
    year: number
    roughSleepers: number
    hiddenHomelessEst: number
    tempAccommodation: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ConcealedHomelessnessPage() {
  const [data, setData] = useState<ConcealedHomelessnessData | null>(null)

  useEffect(() => {
    fetch('/data/concealed-homelessness/concealed_homelessness.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const sleepingSeriesData: Series[] = data
    ? [{
        id: 'roughSleepers',
        label: 'Rough sleepers',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.roughSleepers,
        })),
      }, {
        id: 'tempAccommodation',
        label: 'Temp accommodation (households)',
        colour: '#F4A261',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.tempAccommodation,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Concealed Homelessness" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Concealed Homelessness"
          question="How Many People Are Secretly Homeless?"
          finding="Rough sleeping counts capture only the most visible homeless &mdash; an estimated 400,000 people are sofa-surfing or hidden from official statistics."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The official rough sleeping count &mdash; conducted on a single night in autumn each year &mdash; counted 3,898 people sleeping rough in England in 2023. That figure has attracted significant political attention and, during the pandemic years, appeared to fall dramatically as emergency measures housed people in hotels and temporary accommodation. By 2022 and 2023, the numbers had rebounded to near pre-pandemic levels. But the rough sleeping count measures only the most visible, publicly exposed form of homelessness, and it does so imprecisely: the one-night snapshot method is known to undercount by a substantial margin.</p>
            <p>The hidden homeless &mdash; variously called concealed, sofa-surfing, or &ldquo;secondary&rdquo; homelessness &mdash; represents a far larger population. Organisations working with homeless people estimate that for every person sleeping rough, there are approximately 100 who have no secure home but are staying temporarily with friends, family, or acquaintances, or in overcrowded and unsuitable arrangements. Using this ratio, the hidden homeless population is estimated at around 400,000 people. This population is largely invisible to official statistics because they have not presented to a local authority as homeless, they are not in the formal temporary accommodation system, and they are not on the street.</p>
            <p>Temporary accommodation figures tell a more precise but still disturbing story. 112,000 households &mdash; including over 150,000 children &mdash; were living in temporary accommodation placed by local authorities as of 2023. This is a record high, and it represents a sustained long-term trend: the figure has grown from around 72,000 households in 2015. The composition of this population has also shifted. An increasing proportion are families with children, placed in bed-and-breakfast accommodation that is legally meant to house families for no more than six weeks but routinely does so for months or years because social housing supply has collapsed.</p>
            <p>The causes are structural and well-documented. The social housing stock has declined by hundreds of thousands of units since the Right to Buy programme began in the 1980s, and replacement construction has not come close to making up the losses. Private renting has absorbed much of the demand, but security of tenure is weak and rents have risen faster than incomes. The Local Housing Allowance &mdash; the benefit that covers private rent for low-income tenants &mdash; has been repeatedly frozen in nominal terms while rents have risen, creating ever-larger gaps between what benefit recipients can pay and what landlords charge.</p>
            <p>Ending rough sleeping, however desirable as a humanitarian goal, addresses only the most visible fraction of the problem. A person who was sleeping rough and is now in a hostel or bed-and-breakfast is no longer counted in the rough sleeping statistics, but they remain effectively homeless in any meaningful sense. The homelessness system in England is increasingly strained: local authority housing waiting lists now exceed one million households, and the average wait for social housing in high-demand areas is measured in years or decades. Without a substantial expansion of social housing supply, the flow of people into homelessness and temporary accommodation will continue regardless of what happens to the rough sleeping count.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Homelessness Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Hidden homeless estimate"
              value="400k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="10x rough sleeper count &middot; sofa-surfers + overcrowded"
              sparklineData={[320000, 340000, 360000, 370000, 380000, 350000, 360000, 390000, 400000]}
              onExpand={() => {}}
              source="Crisis / St Mungo&rsquo;s &middot; Hidden Homelessness 2023"
            />
            <MetricCard
              label="Temp accommodation"
              value="112,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high &middot; families in B&Bs, hostels"
              sparklineData={[72310, 76440, 79000, 82500, 88000, 97000, 97100, 104000, 112000]}
              onExpand={() => {}}
              source="MHCLG &middot; Homelessness Statistics 2023"
            />
            <MetricCard
              label="Rough sleepers"
              value="3,898"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="35% rise since 2020 low"
              sparklineData={[3569, 4134, 4751, 4677, 4266, 2688, 2597, 3069, 3898]}
              onExpand={() => {}}
              source="MHCLG &middot; Rough Sleeping Snapshot 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Rough sleepers and households in temporary accommodation, 2015&ndash;2023"
              subtitle="Annual rough sleeping snapshot (single autumn night, England) and households in local authority temporary accommodation."
              series={sleepingSeriesData}
              yLabel="Count"
              source={{
                name: 'MHCLG',
                dataset: 'Rough Sleeping Snapshot / Homelessness Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>MHCLG &mdash; Rough Sleeping Snapshot in England. Annual autumn count. gov.uk/government/collections/homelessness-statistics</p>
            <p>MHCLG &mdash; Statutory Homelessness Statistics. Quarterly data on households accepted as homeless and in temporary accommodation. gov.uk/government/collections/homelessness-statistics</p>
            <p>Crisis &mdash; Homelessness Monitor: England. Annual research report. crisis.org.uk</p>
            <p>Rough sleeping counts are based on a single-night snapshot using a methodology agreed between local authorities and Defra. The method is known to undercount; estimates of actual rough sleeping populations are typically 1.5&ndash;3x the snapshot count. Hidden homeless estimates are modelled from household surveys and homelessness charity assessments; they carry significant uncertainty. Temporary accommodation figures are from statutory returns by local authorities and exclude households managed by housing associations or the private sector.</p>
          </div>
        </section>
      </main>
    </>
  )
}
