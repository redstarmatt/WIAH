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
          finding="Rough sleeping counts capture only the most visible homeless — an estimated 400,000 people are sofa-surfing or hidden from official statistics."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The official rough sleeping count — a single autumn night snapshot — recorded 3,898 people sleeping rough in England in 2023, a 35% rise since the pandemic low of 2020. But rough sleeping measures only the most visible fraction of homelessness. Organisations working with homeless people estimate that for every rough sleeper there are around 100 people in hidden homelessness — sofa-surfing, staying in overcrowded or unsuitable accommodation — producing an estimate of around 400,000 people. The formal figure that tracks more precisely is temporary accommodation: 112,000 households, including over 150,000 children, were in local authority temporary accommodation in 2023, a record high and a 55% rise since 2015. Families with children are increasingly placed in bed-and-breakfast accommodation that is legally meant to house them for no more than six weeks but routinely does so for months or years.</p>
            <p>The structural causes are well-documented. Social housing stock has declined by hundreds of thousands of units since Right to Buy began, and replacement construction has not come close to making up the losses. The Local Housing Allowance, which covers private rent for low-income tenants, has been repeatedly frozen in nominal terms while rents rose, creating an ever-widening gap between what recipients can pay and what landlords charge. Housing waiting lists exceed one million households. Ending rough sleeping — however important as a humanitarian goal — addresses only the most visible fraction of a homelessness system under sustained pressure that will continue without substantial expansion of social housing supply.</p>
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
              changeText="10x rough sleeper count · sofa-surfers + overcrowded"
              sparklineData={[320000, 340000, 360000, 370000, 380000, 350000, 360000, 390000, 400000]}
              href="#sec-chart"source="Crisis / St Mungo&rsquo;s · Hidden Homelessness 2023"
            />
            <MetricCard
              label="Temp accommodation"
              value="112,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · families in B&Bs, hostels"
              sparklineData={[72310, 76440, 79000, 82500, 88000, 97000, 97100, 104000, 112000]}
              href="#sec-chart"source="MHCLG · Homelessness Statistics 2023"
            />
            <MetricCard
              label="Rough sleepers"
              value="3,898"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="35% rise since 2020 low"
              sparklineData={[3569, 4134, 4751, 4677, 4266, 2688, 2597, 3069, 3898]}
              href="#sec-chart"source="MHCLG · Rough Sleeping Snapshot 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Rough sleepers and households in temporary accommodation, 2015–2023"
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
            <p>MHCLG — Rough Sleeping Snapshot in England. Annual autumn count. gov.uk/government/collections/homelessness-statistics</p>
            <p>MHCLG — Statutory Homelessness Statistics. Quarterly data on households accepted as homeless and in temporary accommodation. gov.uk/government/collections/homelessness-statistics</p>
            <p>Crisis — Homelessness Monitor: England. Annual research report. crisis.org.uk</p>
            <p>Rough sleeping counts are based on a single-night snapshot using a methodology agreed between local authorities and Defra. The method is known to undercount; estimates of actual rough sleeping populations are typically 1.5–3x the snapshot count. Hidden homeless estimates are modelled from household surveys and homelessness charity assessments; they carry significant uncertainty. Temporary accommodation figures are from statutory returns by local authorities and exclude households managed by housing associations or the private sector.</p>
          </div>
        </section>
      </main>
    </>
  )
}
