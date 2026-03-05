'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface SoilHealthData {
  national: {
    degradation: Array<{ year: number; pctDegraded: number }>
    organicCarbon: Array<{ year: number; pctLow: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function SoilHealthPage() {
  const [data, setData] = useState<SoilHealthData | null>(null)

  useEffect(() => {
    fetch('/data/soil-health/soil_health.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const degradationSeries: Series[] = data
    ? [{
        id: 'degradation',
        label: 'Agricultural soils classified as degraded',
        colour: '#2A9D8F',
        data: data.national.degradation.map(d => ({ date: yearToDate(d.year), value: d.pctDegraded })),
      }]
    : []

  const carbonSeries: Series[] = data
    ? [{
        id: 'carbon',
        label: 'Soils with low organic carbon',
        colour: '#E63946',
        data: data.national.organicCarbon.map(d => ({ date: yearToDate(d.year), value: d.pctLow })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Soil Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Soil Health"
          question="Is Britain&apos;s Soil Actually Dying?"
          finding="An estimated 2.9 billion tonnes of topsoil are lost to erosion across the UK each year, costing the economy &pound;1.4 billion annually. Around 17% of agricultural soils are now classified as degraded, up from 12% in 2010."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has approximately 10.9 million hectares of agricultural land covering 72% of its total area. The Environment Agency estimated in 2019 that 2.9 billion tonnes of soil are eroded each year, with intensive arable farming in East Anglia, the East Midlands, and Yorkshire driving the worst losses. DEFRA&apos;s Soil Health Monitoring Scheme, launched in 2023, found early evidence that 45% of arable soils have low organic carbon content &mdash; a key fertility indicator &mdash; while 17% of agricultural soils are now classified as degraded, up from 12% in 2010. The Parliamentary Office of Science and Technology estimates degraded soil costs the UK economy &pound;1.4 billion annually through lost productivity, flooding, and water treatment. The 80% of UK peatlands in a damaged or degraded state release an estimated 23 million tonnes of CO2 equivalent per year. The Sustainable Farming Incentive pays farmers for soil assessments and cover cropping, but by March 2025 only 25,000 agreements had been signed, covering less than 15% of eligible farmland.</p>
            <p>Degradation is not evenly distributed. The Fens of East Anglia, sitting on deep peat soils drained for agriculture, are losing an estimated 2 centimetres of depth per year; at current rates, some Fenland soils may be functionally exhausted within 30&ndash;50 years. Upland areas in Wales, Scotland, and northern England face peat degradation from overgrazing. The government&apos;s Environmental Improvement Plan set a target of all soils sustainably managed by 2030 but defined no measurable standard for what that means, leaving progress effectively unassessable. The transition from EU Common Agricultural Policy payments to domestic Environmental Land Management schemes remains the single largest lever for changing farming practice at scale, but uptake has so far been modest.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-degradation', label: 'Degradation' },
          { id: 'sec-carbon', label: 'Carbon Loss' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Degraded agricultural soils"
              value="17"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 12% in 2010"
              sparklineData={[12, 12.8, 13.5, 14.3, 15.1, 15.9, 16.4, 17]}
              source="DEFRA Soil Health Monitoring Scheme"
              onExpand={() => {}}
            />
            <MetricCard
              label="Topsoil lost per year"
              value="2.9bn"
              unit="tonnes"
              direction="up"
              polarity="up-is-bad"
              changeText="Costs the UK economy an estimated &pound;1.4bn annually"
              sparklineData={[2.5, 2.6, 2.7, 2.8, 2.9]}
              source="Environment Agency"
              onExpand={() => {}}
            />
            <MetricCard
              label="Arable soils with low organic carbon"
              value="45"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Based on early DEFRA monitoring data"
              sparklineData={[38, 39, 41, 42, 43, 45]}
              source="DEFRA Soil Health Monitoring Scheme"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-degradation" className="mb-12">
            <LineChart
              title="UK agricultural soils classified as degraded, 2010&ndash;2024"
              subtitle="Percentage of surveyed agricultural soils showing signs of compaction, erosion, or loss of structure. DEFRA estimates."
              series={degradationSeries}
              yLabel="% degraded"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-carbon" className="mb-12">
            <LineChart
              title="Arable soils with low organic carbon content, 2007&ndash;2022"
              subtitle="Percentage of arable soil samples below the threshold for healthy carbon content. Countryside Survey &amp; DEFRA monitoring."
              series={carbonSeries}
              yLabel="% low carbon"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
