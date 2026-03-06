'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface CarbonCaptureData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{ year: number; ccsCapacityMt: number; publicInvestmentBn: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function CarbonCaptureProgressPage() {
  const [data, setData] = useState<CarbonCaptureData | null>(null)

  useEffect(() => {
    fetch('/data/carbon-capture-progress/carbon_capture_progress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'publicInvestmentBn',
        label: 'Public investment committed (£ billions)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.publicInvestmentBn })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Carbon Capture Progress" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Carbon Capture Progress"
          question="Is Britain's Carbon Capture Technology Working?"
          finding="The UK has committed to capturing 20–30 MtCO2 per year by 2030, but no commercial carbon capture plant is yet operational — Track-1 projects are delayed until at least 2028."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK government's net zero strategy relies substantially on Carbon Capture, Usage and Storage (CCUS) to reduce emissions from hard-to-decarbonise sectors — steel, cement, chemicals, hydrogen production — with a target of capturing 20–30 million tonnes of CO2 per year by 2030. As of 2026, no commercial CCUS plant is operational in the UK. The government's Track-1 industrial clusters — HyNet in the North West and the East Coast Cluster around Teesside and Humberside — were selected in 2021 as priority development sites but have been delayed by commercial negotiations over risk allocation and pricing; Track-1 operations are now not expected before 2028–29. The government has committed £22 billion in public investment, but disbursement lags the stated timeline. The Climate Change Committee's 2024 Progress Report identified CCUS deployment as one of the areas of greatest concern in the near-term carbon budget, alongside heat pump installation and EV charging infrastructure.</p>
            <p>The gap between ambition and delivery is significant and creates knock-on risks for the overall net zero pathway. If CCUS targets are missed, the residual emissions it was supposed to address will need to be offset through additional renewable generation, demand reduction, or international credits — all costlier than capture at source. Direct Air Capture, which removes CO2 from the atmosphere rather than at point of emission, is at an earlier development stage and currently costs £200–400 per tonne — far above economic viability at scale. The delay risk is primarily a policy and commercial risk rather than a technological one: the technology exists, but the commercial frameworks for deploying it have proven difficult to agree.</p>
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
              label="CCS capacity operational (UK)"
              value="0 Mt"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Zero commercial CCS operational in UK"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 0, 0]}
              source="DESNZ · Carbon Capture Utilisation and Storage 2024"
              href="#sec-chart"/>
            <MetricCard
              label="2030 CCS capture target"
              value="20-30 Mt"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Target 20-30 MtCO2/yr by 2030 · off track"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 0, 0]}
              source="DESNZ · Net Zero Strategy 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Public investment committed"
              value="£22bn"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="£22bn committed · Track-1 delayed to 2028-29"
              sparklineData={[0, 0, 1, 2, 4, 6, 10, 15, 22]}
              source="DESNZ · CCUS Programme Update 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK public CCUS investment commitments, 2016–2024"
              subtitle="Cumulative government investment committed to carbon capture, utilisation and storage (£ billions)."
              series={series}
              yLabel="Investment committed (£ billions)"
              source={{ name: 'DESNZ', dataset: 'CCUS Programme Update', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ. CCUS Programme Update. <a href="https://www.gov.uk/government/publications/carbon-capture-usage-and-storage-ccus-programme" className="underline" target="_blank" rel="noopener noreferrer">gov.uk</a>. Investment figures represent committed government support, not expenditure. No commercial CCS operational in UK as of 2026.</p>
            <p>Climate Change Committee. 2024 Progress Report to Parliament. Track-1 cluster timeline from DESNZ HyNet and East Coast Cluster project documentation. CCS capture target from Net Zero Strategy 2021 and Powering Up Britain 2023.</p>
          </div>
        </section>
      </main>
    </>
  )
}
