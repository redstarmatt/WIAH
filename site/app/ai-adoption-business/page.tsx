'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface AiAdoptionBusinessData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    largeBusinessPct: number
    smePct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function AiAdoptionBusinessPage() {
  const [data, setData] = useState<AiAdoptionBusinessData | null>(null)

  useEffect(() => {
    fetch('/data/ai-adoption-business/ai_adoption_business.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'large',
          label: 'Large businesses (250+ employees)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.largeBusinessPct })),
        },
        {
          id: 'sme',
          label: 'SMEs (fewer than 250 employees)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.smePct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="AI Adoption in Business" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="AI Adoption in Business"
          question="Is British Business Actually Using AI?"
          finding="Less than half of large UK businesses use AI and only 1 in 7 small firms have adopted it, leaving Britain trailing peers in productivity gains."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Artificial intelligence adoption in UK businesses has accelerated dramatically since 2020, but the headline figures mask a stark two-tier pattern. Large enterprises — particularly in financial services, professional services, and technology — have embedded AI into core workflows at rapid pace. Small and medium-sized enterprises, which account for 99.9% of all UK businesses and 60% of private sector employment, have been far slower to adopt, with only 15% using any AI application in 2024 compared to 46% of businesses with 250 or more employees.</p>
            <p>The productivity implications are significant. OECD analysis consistently shows that firms adopting AI see productivity gains of 15–40% in affected tasks, but that diffusion from frontier adopters to the broad base of the economy takes 5–10 years without active policy support. The UK&apos;s productivity puzzle — real output per hour has grown at roughly 0.3% per year since 2008, compared to 1.2% in the decade before — makes AI adoption a strategic priority. But the current adoption pattern, concentrated in sectors that were already productive, risks widening the gap rather than narrowing it.</p>
            <p>Skills are the primary barrier. 78% of firms in the 2024 DSIT AI activity survey cited lack of AI-related skills as a significant obstacle — up from 51% in 2021. This manifests at every level: board-level understanding of AI capabilities, middle management ability to identify use cases, and worker-level competency to use AI tools effectively. The government&apos;s AI Skills Plan and the expansion of apprenticeships in data and AI have begun to address the supply side, but the pipeline of AI-competent workers remains heavily weighted towards London and the South East.</p>
            <p>Investment is the second constraint. UK AI investment per worker stood at £890 in 2023, significantly below the US (£2,100) and Germany (£1,400). Private equity and venture capital flows into AI have been strong — the UK is the third-largest AI investment destination globally — but this capital is concentrated in a small number of high-growth AI companies rather than distributed across the economy as adoption spending. The gap between being a country that produces AI companies and being a country that uses AI widely in its businesses is the core challenge.</p>
            <p>Government intervention is focused on the National AI Strategy and the AI Growth Zones programme, but adoption support for SMEs remains limited. The Made Smarter programme — which provided hands-on manufacturing AI adoption support — showed strong results in its pilot regions but has not been scaled nationally. The 2025 AI Opportunities Action Plan committed to expanding this model, with sector-specific AI adoption programmes for priority industries including healthcare, financial services, and advanced manufacturing. Whether this shifts the adoption curve for the 5.5 million SMEs that currently have no AI strategy will be the defining question for UK productivity in the next decade.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'AI Adoption' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Large businesses using AI"
              value="46%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+38pp since 2020 · SMEs: 15%"
              sparklineData={[8, 12, 18, 24, 31, 38, 42, 44, 46]}
              onExpand={() => {}}
              source="DSIT · AI Activity in UK Businesses Survey 2024"
            />
            <MetricCard
              label="AI investment per worker"
              value="£890"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£420 since 2021 · UK below US/Germany"
              sparklineData={[310, 380, 450, 520, 600, 680, 760, 840, 890]}
              onExpand={() => {}}
              source="OECD · AI Investment and Productivity"
            />
            <MetricCard
              label="Firms citing AI skills gap"
              value="78%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 51% in 2021 · biggest barrier"
              sparklineData={[35, 38, 42, 46, 51, 58, 65, 71, 78]}
              onExpand={() => {}}
              source="DSIT · AI Activity in UK Businesses Survey 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="AI adoption by business size, 2016–2024"
              subtitle="Percentage of businesses using AI, by employee size band."
              series={series}
              yLabel="%"
              source={{
                name: 'DSIT',
                dataset: 'AI Activity in UK Businesses Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DSIT — AI Activity in UK Businesses Survey 2024. Published annually. gov.uk/government/statistics/ai-activity-in-uk-businesses</p>
            <p>OECD — AI Investment and Productivity Analysis. oecd.org/going-digital/ai</p>
            <p>Large business adoption figures are for businesses with 250 or more employees. SME figures cover businesses with fewer than 250 employees. AI adoption is defined as using at least one AI application in core business operations. Investment per worker figures are purchasing-power-parity adjusted.</p>
          </div>
        </section>
      </main>
    </>
  )
}
