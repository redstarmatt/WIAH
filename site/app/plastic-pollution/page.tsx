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
          finding="The UK generates 5.6 million tonnes of plastic waste per year &mdash; the second highest per capita in the world after the United States. The domestic recycling rate has stalled at 44% for a decade, and almost half of &ldquo;recycled&rdquo; plastic is exported."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK produces approximately 5.6 million tonnes of plastic waste per year &mdash; 84 kilograms per person and the second highest per capita rate in the world after the United States. The plastic packaging recycling rate has stalled at 44% since 2014, well below the government&apos;s 65% target for 2035 and the EU average of 48%. Around 46% of plastic collected for recycling in 2023 was exported to Turkey, Malaysia, and Indonesia, where environmental oversight is variable. Greenpeace documented UK plastic bales dumped at Turkish roadsides. The Plastic Packaging Tax (introduced April 2022 at &pound;210.82 per tonne) and Extended Producer Responsibility (effective from 2025, expected to generate &pound;1.4 billion per year for local authority collections) represent meaningful policy steps. A Deposit Return Scheme, delayed to 2027 at the earliest, aims to capture beverage containers outside the household system. The government banned single-use plastic plates, cutlery, and polystyrene containers in October 2023.</p>
            <p>The burden of plastic pollution falls unevenly across communities and nations. Coastal areas bear the highest visible impact: the Marine Conservation Society&apos;s 2023 beach clean found 385 litter items per 100 metres of UK coastline. Deprived urban areas see higher rates of fly-tipping and overflowing public bins. Wales recycles 65% of household waste &mdash; one of the highest rates in the world &mdash; driven by statutory targets and council investment, while England lags at 44%, reflecting political will and funding differences as much as infrastructure. An estimated 500,000 tonnes of plastic enters the UK environment annually, concentrated in waterways and coastal areas serving the most populated and economically active regions.</p>
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
