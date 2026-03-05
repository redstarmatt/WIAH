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
            <p>The UK&apos;s overall packaging recycling rate reached 68% in 2023, meeting the EU-derived 65% target and up from 27% when the Producer Responsibility framework was introduced in 1997. Plastic packaging recycling has improved from 43% in 2019 to 51%, but remains well below the government&apos;s 2030 target of 77%. Extended Producer Responsibility for packaging came into effect in October 2025, significantly increasing industry&apos;s financial obligation for the full net cost of waste management and providing new funding for local authority collection infrastructure. A Deposit Return Scheme for drinks containers launches in 2027 in England, Wales and Northern Ireland.</p>
            <p>Contamination is the dominant operational constraint: household mixed dry recycling streams consistently show contamination rates of 10&ndash;20%, caused by incorrect sorting, co-mingling of incompatible materials, and wishcycling. The burden of inadequate recycling infrastructure falls unevenly &mdash; councils in more deprived areas typically run simpler, co-mingled collection systems with higher contamination rates, while wealthier areas run source-separated streams that achieve better material quality. Plastic recycling infrastructure gaps also reflect geographic concentration of reprocessing capacity in particular regions, creating a two-speed system where collection and reprocessing capability are poorly matched.</p>
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
