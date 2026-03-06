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
          question="Is Britain's Soil Actually Dying?"
          finding="An estimated 2.9 billion tonnes of topsoil are lost to erosion across the UK each year, costing the economy £1.4 billion annually. Around 17% of agricultural soils are now classified as degraded, up from 12% in 2010."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has approximately 10.9 million hectares of agricultural land, accounting for 72% of the country's total land area. The Environment Agency estimated in 2019 that 2.9 billion tonnes of soil are eroded each year, with intensive arable farming — concentrated in East Anglia, the East Midlands, and Yorkshire — driving the worst losses. DEFRA's Soil Health Monitoring Scheme, launched in 2023, aims to provide the first comprehensive baseline assessment. Early results suggest that 45% of arable soils have low organic carbon content, a key indicator of long-term fertility. The Parliamentary Office of Science and Technology estimated that degraded soil costs the UK economy £1.4 billion annually through lost productivity, increased flooding, and water treatment costs.</p>
            <p>Soil organic matter in England has declined measurably over the past two decades. The Countryside Survey, which ran from 1978 to 2007, documented a significant drop in carbon content across arable and improved grassland soils. Intensive tillage, monoculture cropping, and heavy fertiliser use accelerate the breakdown of organic matter, while compaction from heavy machinery reduces water infiltration. Peat soils, which store an estimated 3.2 billion tonnes of carbon across the UK, are particularly vulnerable — the International Union for Conservation of Nature found that 80% of UK peatlands are in a damaged or degraded state, releasing an estimated 23 million tonnes of CO2 equivalent per year. The trend is towards further degradation without large-scale intervention.</p>
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
              changeText="Costs the UK economy an estimated £1.4bn annually"
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
              title="UK agricultural soils classified as degraded, 2010–2024"
              subtitle="Percentage of surveyed agricultural soils showing signs of compaction, erosion, or loss of structure. DEFRA estimates."
              series={degradationSeries}
              yLabel="% degraded"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-carbon" className="mb-12">
            <LineChart
              title="Arable soils with low organic carbon content, 2007–2022"
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
