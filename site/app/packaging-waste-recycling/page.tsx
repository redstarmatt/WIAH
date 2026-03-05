'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PackagingWasteData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{ year: number; overallRecyclingPct: number; plasticRecyclingPct: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function PackagingWasteRecyclingPage() {
  const [data, setData] = useState<PackagingWasteData | null>(null)

  useEffect(() => {
    fetch('/data/packaging-waste-recycling/packaging_waste_recycling.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'overallRecyclingPct',
          label: 'All packaging',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.overallRecyclingPct })),
        },
        {
          id: 'plasticRecyclingPct',
          label: 'Plastic only',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.plasticRecyclingPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Packaging Waste Recycling" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Packaging Waste Recycling"
          question="How Much Packaging Is Actually Being Recycled?"
          finding="The UK recycles 68% of packaging waste overall, but plastic recycling sits at 51% — well below the 2030 targets — and contamination undermines collection streams."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Packaging waste recycling in the UK is governed by a Producer Responsibility framework: companies that put packaging onto the market are required to pay for a proportion of its recycling through the Packaging Recovery Note (PRN) system. This system has driven significant improvements in recycling rates since its introduction in 1997, when overall packaging recycling stood at approximately 27%. By 2023, the overall packaging recycling rate had reached 68%, meeting and slightly exceeding the EU-derived target of 65%. However, this headline figure masks important differences between materials, and the UK&apos;s 2030 ambitions &mdash; particularly for plastics &mdash; are substantially higher than current rates.</p>
            <p>Plastic packaging recycling is the most challenging component of the system. Plastics are heterogeneous &mdash; there are hundreds of different polymer types with different recycling chemistry &mdash; and contamination of plastic waste streams is a persistent problem. The UK&apos;s plastic packaging recycling rate was 51% in 2023, up from approximately 43% in 2019, but below the government&apos;s target of 77% by 2030. The gap reflects both infrastructure limitations (not enough sorting and reprocessing capacity for harder-to-recycle plastics) and behaviour limitations (wishcycling &mdash; the practice of placing non-recyclable items in recycling bins in the hope they will be recycled &mdash; contaminates collection streams and increases the proportion of collected material that cannot be processed).</p>
            <p>Extended Producer Responsibility (EPR) for packaging &mdash; which increases companies&apos; financial obligation for the full net cost of packaging waste management, rather than just recycling costs &mdash; came into effect in October 2025. This represents a significant funding increase for local authority collection, creating a new incentive for improved household recycling services and sorting infrastructure. The accompanying Deposit Return Scheme for drinks containers (bottles and cans), launching in 2027 in England, Wales and Northern Ireland (Scotland launched in 2023), is designed to capture a high proportion of beverage container waste outside the household recycling system.</p>
            <p>Contamination remains the most significant operational challenge. Analysis of household recycling material from local authority collection consistently finds contamination rates of 10&ndash;20% in mixed dry recycling streams. Contamination arises from incorrect sorting by householders, co-mingling of materials that degrade each other&apos;s quality (food-soiled paper, glass mixed with fibres), and the inclusion of items that are technically recyclable but that cannot be processed by available infrastructure. Improving householder knowledge and simplifying the sorting rules &mdash; the inconsistency of what different councils accept is a documented barrier &mdash; are both policy priorities within the EPR reform framework.</p>
            <p>The circular economy opportunity beyond recycling rates involves reduction in packaging use at source. A growing number of businesses are redesigning products to use less packaging, switch to reusable packaging systems, or eliminate packaging entirely for certain product lines. Refill and reuse schemes in supermarkets and specialist retailers have grown, supported by WRAP&apos;s Courtauld Commitment and the government&apos;s strategy Maximising Resources, Minimising Waste. However, scale-up of reuse systems requires infrastructure investment and behaviour change that take time to deliver at population scale. For most packaging categories, improving recycling rates and quality in the short to medium term remains the primary lever for environmental improvement.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Overall packaging recycled"
              value="68%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+5pp since 2019 · meets EU 65% benchmark"
              sparklineData={[63, 63, 64, 64, 65, 65, 66, 67, 68]}
              source="DEFRA / EA · Packaging Recycling Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Plastic packaging recycled"
              value="51%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+8pp since 2019 · target 77% by 2030"
              sparklineData={[43, 44, 45, 46, 47, 48, 48, 50, 51]}
              source="DEFRA / EA · Packaging Recycling Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Contamination rate in collections"
              value="16%"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="16% of collected material contaminated"
              sparklineData={[21, 20, 19, 19, 18, 18, 17, 17, 16]}
              source="WRAP · Local Authority Recycling Survey 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK packaging recycling rates, 2016–2024"
              subtitle="Percentage of packaging waste recovered through recycling by material category."
              series={series}
              yLabel="Recycling rate (%)"
              source={{ name: 'DEFRA', dataset: 'Packaging Recycling Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DEFRA / Environment Agency. Packaging Recycling Statistics. Annual. <a href="https://www.gov.uk/government/statistical-data-sets/env23-uk-waste-data-and-management" className="underline" target="_blank" rel="noopener noreferrer">gov.uk</a>. Recycling rates measured via PRN compliance data. Contamination rates from WRAP Local Authority Recycling Survey.</p>
            <p>Extended Producer Responsibility regulations came into effect October 2025. Deposit Return Scheme launching 2027 (England, Wales, Northern Ireland). Scotland DRS operational from 2023.</p>
          </div>
        </section>
      </main>
    </>
  )
}
