'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PlasticData {
  national: {
    plasticWaste: Array<{ year: number; millionTonnes: number }>
    recyclingRate: Array<{ year: number; pct: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function PlasticPollutionPage() {
  const [data, setData] = useState<PlasticData | null>(null)

  useEffect(() => {
    fetch('/data/plastic-pollution/plastic_pollution.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const wasteSeries: Series[] = data
    ? [{
        id: 'plastic-waste',
        label: 'Total plastic waste generated',
        colour: '#264653',
        data: data.national.plasticWaste.map(d => ({ date: yearToDate(d.year), value: d.millionTonnes })),
      }]
    : []

  const recyclingSeries: Series[] = data
    ? [{
        id: 'recycling',
        label: 'Plastic recycling rate',
        colour: '#2A9D8F',
        data: data.national.recyclingRate.map(d => ({ date: yearToDate(d.year), value: d.pct })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Plastic Pollution" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Plastic Pollution"
          question="Is Britain Actually Dealing With Its Plastic Problem?"
          finding="The UK generates 5.6 million tonnes of plastic waste per year &mdash; the second highest per capita in the world after the United States. The domestic recycling rate has stalled at 44&percnt; for a decade, and almost half of &ldquo;recycled&rdquo; plastic is exported."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK produces approximately 5.6 million tonnes of plastic waste per year, equivalent to roughly 84 kilograms per person &mdash; the second highest per capita rate in the world, behind only the United States. Of this, around 2.5 million tonnes is packaging. DEFRA&apos;s 2024 statistics show that 44&percnt; of plastic packaging waste is collected for recycling, a figure that has barely changed since 2014. The total municipal recycling rate for England &mdash; all materials, not just plastics &mdash; was 44.1&percnt; in 2022/23, well below the government&apos;s 65&percnt; target for 2035 and the EU average of 48&percnt;. The UK incinerates 12 million tonnes of waste annually, and landfilling, while declining, still receives millions of tonnes. Plastic waste that is not recycled, incinerated, or landfilled enters the environment &mdash; an estimated 500,000 tonnes per year, according to a 2023 Eunomia report commissioned by WWF.</p>
            <p>The recycling system itself is deeply flawed. Around 46&percnt; of plastic collected for recycling in 2023 was exported, primarily to Turkey, Malaysia, and Indonesia, where environmental oversight is variable and contamination rates are high. Greenpeace investigations have documented UK plastic bales dumped at roadside sites in Turkey. Domestic reprocessing capacity remains limited: the UK has only 26 plastics reprocessing plants capable of handling post-consumer waste. The Plastic Packaging Tax, introduced in April 2022 at &pound;210.82 per tonne, applies to packaging containing less than 30&percnt; recycled content but has not yet demonstrably shifted production patterns. Extended Producer Responsibility (EPR), which was due in 2024 but delayed to 2025, will require producers to cover the full net cost of collecting, sorting, and recycling packaging &mdash; a significant policy shift expected to generate &pound;1.4 billion per year for local authorities.</p>
            <p>The government banned a range of single-use plastic items in October 2023, including plates, cutlery, polystyrene containers, and balloon sticks. The 5p carrier bag charge, introduced in 2015 and raised to 10p in 2021, reduced single-use bag consumption by 97&percnt; from major retailers. A Deposit Return Scheme (DRS) for drinks containers has been repeatedly delayed; Scotland planned to launch in 2023 but postponed to align with England and Wales, now targeting 2027 at the earliest. Consistent collections &mdash; requiring all local authorities to collect the same materials from the kerbside &mdash; is also scheduled for implementation from 2026. The Resources and Waste Strategy (2018) set out a vision for eliminating all avoidable plastic waste by 2042, but interim targets and delivery mechanisms remain largely unquantified.</p>
            <p>Plastic pollution impacts are distributed unevenly. Coastal communities face the highest visible burden: the Marine Conservation Society&apos;s 2023 beach clean found an average of 385 items of litter per 100 metres of UK coastline. Deprived urban areas are more likely to have overflowing public bins and fly-tipping. Areas with high fast-food outlet density &mdash; which correlates with deprivation &mdash; generate more single-use plastic litter. Rural areas often have less frequent waste collection services. Wales has the highest household recycling rate in the UK (65&percnt;) and the third highest in the world, driven by statutory targets and council investment. England lags at 44&percnt;. Northern Ireland (50&percnt;) and Scotland (42&percnt;) fall between the two. The disparity reflects political will and funding as much as infrastructure.</p>
            <p>Plastic waste data is notoriously unreliable. The &ldquo;recycling rate&rdquo; counts material collected and sent for recycling, not material actually reprocessed into new products &mdash; contamination and rejection rates at sorting facilities mean the real recycling rate is substantially lower. Export data relies on Packaging Recovery Notes (PRNs), a system the National Audit Office criticised in 2018 as open to fraud, with limited verification that exported material is actually recycled. The 5.6 million tonnes headline figure includes commercial, industrial, and household waste but excludes microplastics, which are not systematically measured. Per capita comparisons depend on national reporting methodologies that differ significantly, making the &ldquo;second highest in the world&rdquo; ranking illustrative rather than precise. The 500,000 tonnes entering the environment figure is modelled, not measured. Microplastic monitoring in rivers, soils, and air is still at an early stage, with standardised UK-wide protocols not yet established.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-waste', label: 'Plastic Waste' },
          { id: 'sec-recycling', label: 'Recycling Rate' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Plastic waste generated per year"
              value="5.6m"
              unit="tonnes"
              direction="up"
              polarity="up-is-bad"
              changeText="84kg per person &mdash; 2nd highest globally after the US"
              sparklineData={[4.7, 4.9, 5.1, 5.3, 5.5, 5.6]}
              source="DEFRA UK Statistics on Waste"
              onExpand={() => {}}
            />
            <MetricCard
              label="Plastic recycling rate"
              value="44"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Stalled for a decade; 46% of &ldquo;recycled&rdquo; plastic is exported"
              sparklineData={[44, 44, 46, 43, 44, 44]}
              source="DEFRA packaging statistics"
              onExpand={() => {}}
            />
            <MetricCard
              label="Single-use bag consumption reduction"
              value="97"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Since 5p charge in 2015; from 7.6bn to 200m bags/yr at major retailers"
              sparklineData={[100, 85, 40, 20, 8, 3]}
              source="DEFRA carrier bag usage"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waste" className="mb-12">
            <LineChart
              title="UK plastic waste generated, 2014&ndash;2024"
              subtitle="Million tonnes of plastic waste per year across household, commercial, and industrial sources. DEFRA."
              series={wasteSeries}
              yLabel="Million tonnes"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-recycling" className="mb-12">
            <LineChart
              title="Plastic packaging recycling rate, UK, 2014&ndash;2024"
              subtitle="Percentage of plastic packaging waste collected for recycling. Counts material sent, not verified as reprocessed."
              series={recyclingSeries}
              yLabel="% recycled"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
