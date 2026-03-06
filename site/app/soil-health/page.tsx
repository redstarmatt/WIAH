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
            <p>The UK has approximately 10.9 million hectares of agricultural land, accounting for 72% of the country&apos;s total land area. The Environment Agency estimated in 2019 that 2.9 billion tonnes of soil are eroded each year, with intensive arable farming &mdash; concentrated in East Anglia, the East Midlands, and Yorkshire &mdash; driving the worst losses. DEFRA&apos;s Soil Health Monitoring Scheme, launched in 2023, aims to provide the first comprehensive baseline assessment. Early results suggest that 45% of arable soils have low organic carbon content, a key indicator of long-term fertility. The Parliamentary Office of Science and Technology estimated that degraded soil costs the UK economy &pound;1.4 billion annually through lost productivity, increased flooding, and water treatment costs.</p>
            <p>Soil organic matter in England has declined measurably over the past two decades. The Countryside Survey, which ran from 1978 to 2007, documented a significant drop in carbon content across arable and improved grassland soils. Intensive tillage, monoculture cropping, and heavy fertiliser use accelerate the breakdown of organic matter, while compaction from heavy machinery reduces water infiltration. Peat soils, which store an estimated 3.2 billion tonnes of carbon across the UK, are particularly vulnerable &mdash; the International Union for Conservation of Nature found that 80% of UK peatlands are in a damaged or degraded state, releasing an estimated 23 million tonnes of CO2 equivalent per year. The trend is towards further degradation without large-scale intervention.</p>
            <p>The government&apos;s Environmental Improvement Plan, published in January 2023, set a target to have all soils managed sustainably by 2030, though it did not define what &ldquo;sustainably managed&rdquo; means in measurable terms. The Sustainable Farming Incentive (SFI) now pays farmers &pound;22 per hectare for a soil assessment and &pound;5.80 per hectare to manage soil health through cover cropping and reduced tillage. Uptake has been modest: by March 2025, around 25,000 SFI agreements had been signed, covering less than 15% of eligible farmland. The transition from EU Common Agricultural Policy payments to domestic Environmental Land Management schemes (ELMS) remains the single largest lever for changing farming practice at scale.</p>
            <p>Soil degradation is not evenly distributed. The most intensive arable regions &mdash; Cambridgeshire, Lincolnshire, Norfolk, and parts of Yorkshire &mdash; suffer the worst erosion, while upland areas in Wales, Scotland, and northern England face peat degradation and overgrazing. The Fens of East Anglia, which sit on deep peat soils drained for agriculture, are losing an estimated 2 centimetres of depth per year; at current rates, some Fenland soils may be functionally exhausted within 30 to 50 years. Scotland has its own Soil Framework, but monitoring remains patchy. Wales has implemented sustainable land management requirements under the Glastir scheme and its successor. Northern Ireland has the least comprehensive soil monitoring of any UK nation.</p>
            <p>Soil health measurement is fundamentally challenging. There is no single agreed metric for soil quality &mdash; organic carbon content, microbial diversity, bulk density, and water infiltration rates all matter but are measured inconsistently. DEFRA&apos;s Soil Health Monitoring Scheme is the first attempt at a national baseline, but results will not be fully available until at least 2027. Historical data from the Countryside Survey provides trend context but used different sampling methods. The &ldquo;2.9 billion tonnes&rdquo; erosion estimate is derived from modelling rather than direct measurement and carries significant uncertainty. International comparisons are difficult because countries define soil degradation differently. The 2030 sustainable management target lacks a quantified metric, making progress assessment effectively impossible until one is agreed.</p>
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
