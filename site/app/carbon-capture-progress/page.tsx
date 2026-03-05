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
            <p>Carbon Capture, Usage and Storage (CCUS) technology captures CO2 from industrial sources or directly from the atmosphere and stores it permanently underground or uses it in industrial processes. The UK government&apos;s net zero strategy relies substantially on CCUS to reduce emissions from sectors where direct decarbonisation is difficult or extremely costly: steel, cement, chemicals, and potentially hydrogen production. The target of capturing 20&ndash;30 million tonnes of CO2 per year by 2030 &mdash; a ten-fold increase on current global CCS capacity in the UK &mdash; would make CCUS one of the most significant contributors to Britain&apos;s carbon reduction commitments in the second half of the decade.</p>
            <p>The ambition significantly outpaces current reality. As of 2026, no commercial CCUS plant is operational in the United Kingdom. The government&apos;s Track-1 industrial clusters &mdash; HyNet in the North West (based around the Port of Stanlow refinery and chemical plants) and the East Coast Cluster (centred on Teesside and Humberside industrial facilities) &mdash; were selected in 2021 as the priority development sites. Both clusters have been delayed by commercial negotiations between government, infrastructure developers (including National Grid), and industrial emitters over risk allocation, pricing structures, and support mechanisms. Track-1 operations are now not expected before 2028&ndash;29, raising serious questions about whether the 2030 target is achievable.</p>
            <p>The &pound;22 billion government commitment &mdash; announced in the 2023 Autumn Statement and repeated in various forms since &mdash; is intended to provide the combination of capital grants, revenue support, and regulated asset-base income streams that the private sector requires to invest at the required scale. Analogies with offshore wind &mdash; where government contract-for-difference support unlocked enormous private investment at falling cost &mdash; are regularly invoked. However, CCUS project finance is more complex than wind farm finance: the physical infrastructure (geological storage sites, transport pipelines, capture equipment at multiple industrial sites) involves multiple parties across a value chain, and the risk profile is less well understood by capital markets than renewable energy assets.</p>
            <p>Direct Air Capture (DAC) &mdash; technology that removes CO2 directly from the atmosphere rather than at point of emission &mdash; is at an earlier stage of development but attracting significant investment. Unlike point-source CCS, DAC can in principle operate anywhere and can remove historical emissions rather than only current ones. The UK&apos;s first commercial-scale DAC plant, planned for the Strathclyde area of Scotland, has received development funding but is not expected to be operational before 2030. The current energy cost of DAC &mdash; approximately &pound;200&ndash;400 per tonne of CO2 removed &mdash; is far above the price needed for economic viability at scale, and cost reduction curves are uncertain.</p>
            <p>The credibility of the UK&apos;s net zero pathway depends to a significant degree on CCUS delivering against targets that are currently not on track. The Climate Change Committee&apos;s 2024 Progress Report noted that CCUS deployment is one of the areas of greatest concern in the near-term carbon budget trajectory, alongside heat pump installation rates and EV charging infrastructure. If CCUS targets are missed, the residual emissions that CCUS was supposed to address will need to be offset through other means &mdash; additional renewable generation, demand reduction, or international credits &mdash; all of which are costly and complex. The delay risk is not simply a technology risk but a policy and commercial risk that requires urgent resolution.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="2030 CCS capture target"
              value="20-30 Mt"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Target 20-30 MtCO2/yr by 2030 · off track"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 0, 0]}
              source="DESNZ · Net Zero Strategy 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Public investment committed"
              value="£22bn"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="£22bn committed · Track-1 delayed to 2028-29"
              sparklineData={[0, 0, 1, 2, 4, 6, 10, 15, 22]}
              source="DESNZ · CCUS Programme Update 2024"
              onExpand={() => {}}
            />
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
