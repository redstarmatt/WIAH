'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Defra', dataset: 'UK Statistics on Waste', url: 'https://www.gov.uk/government/statistics/uk-waste-data', date: '2024' },
  { num: 2, name: 'Defra', dataset: 'Packaging Waste Statistics', url: 'https://www.gov.uk/government/statistics/packaging-waste-statistics', date: '2023' },
  { num: 3, name: 'Eunomia / WWF', dataset: 'Plastic Waste Flows — UK Assessment', date: '2023' },
  { num: 4, name: 'Greenpeace', dataset: 'UK Plastic Waste Exports Investigation', date: '2023' },
  { num: 5, name: 'Defra', dataset: 'Extended Producer Responsibility for Packaging', url: 'https://www.gov.uk/government/consultations/packaging-and-packaging-waste-introducing-extended-producer-responsibility', date: '2024' },
];

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
          finding="The UK generates 5.6 million tonnes of plastic waste per year — the second highest per capita in the world after the United States. The domestic recycling rate has stalled at 44% for a decade, and almost half of &ldquo;recycled&rdquo; plastic is exported."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK produces approximately 5.6 million tonnes of plastic waste per year, equivalent to roughly 84 kilograms per person — the second highest per capita rate in the world, behind only the United States.<Cite nums={1} /> Of this, around 2.5 million tonnes is packaging. DEFRA's 2024 statistics show that 44% of plastic packaging waste is collected for recycling, a figure that has barely changed since 2014.<Cite nums={2} /> The total municipal recycling rate for England — all materials, not just plastics — was 44.1% in 2022/23, well below the government's 65% target for 2035 and the EU average of 48%.<Cite nums={1} /> The UK incinerates 12 million tonnes of waste annually, and landfilling, while declining, still receives millions of tonnes. Plastic waste that is not recycled, incinerated, or landfilled enters the environment — an estimated 500,000 tonnes per year, according to a 2023 Eunomia report commissioned by WWF.<Cite nums={3} /></p>
            <p>The recycling system itself is deeply flawed. Around 46% of plastic collected for recycling in 2023 was exported, primarily to Turkey, Malaysia, and Indonesia, where environmental oversight is variable and contamination rates are high.<Cite nums={2} /> Greenpeace investigations have documented UK plastic bales dumped at roadside sites in Turkey.<Cite nums={4} /> Domestic reprocessing capacity remains limited: the UK has only 26 plastics reprocessing plants capable of handling post-consumer waste. The Plastic Packaging Tax, introduced in April 2022 at £210.82 per tonne, applies to packaging containing less than 30% recycled content but has not yet demonstrably shifted production patterns. Extended Producer Responsibility (EPR), which was due in 2024 but delayed to 2025, will require producers to cover the full net cost of collecting, sorting, and recycling packaging — a significant policy shift expected to generate £1.4 billion per year for local authorities.<Cite nums={5} /></p>
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
              changeText="84kg per person — 2nd highest globally after the US"
              sparklineData={[4.7, 4.9, 5.1, 5.3, 5.5, 5.6]}
              source="DEFRA UK Statistics on Waste"
              href="#sec-waste"
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
              href="#sec-waste"
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
              href="#sec-waste"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waste" className="mb-12">
            <LineChart
              title="UK plastic waste generated, 2014–2024"
              subtitle="Million tonnes of plastic waste per year across household, commercial, and industrial sources. DEFRA."
              series={wasteSeries}
              yLabel="Million tonnes"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-recycling" className="mb-12">
            <LineChart
              title="Plastic packaging recycling rate, UK, 2014–2024"
              subtitle="Percentage of plastic packaging waste collected for recycling. Counts material sent, not verified as reprocessed."
              series={recyclingSeries}
              yLabel="% recycled"
            />
          </section>
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
              <RelatedTopics />
      </main>
    </>
  )
}
