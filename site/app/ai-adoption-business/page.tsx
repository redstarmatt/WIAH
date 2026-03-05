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
            <p>AI adoption in UK businesses has accelerated since 2020 but reveals a stark two-tier pattern. Large enterprises &mdash; particularly in financial services, professional services, and technology &mdash; have embedded AI into core workflows rapidly: 46% of businesses with 250 or more employees now use at least one AI application. SMEs, which account for 99.9% of all UK businesses and 60% of private sector employment, have been far slower, at just 15% adoption in 2024. Skills are the primary barrier: 78% of firms in the 2024 DSIT survey cited lack of AI-related skills &mdash; up from 51% in 2021. UK AI investment per worker stood at &pound;890 in 2023, well below the US (&pound;2,100) and Germany (&pound;1,400), and while the UK is the third-largest AI investment destination globally, that capital concentrates in a small number of high-growth AI companies rather than flowing into broad adoption spending across the economy.</p>
            <p>The productivity consequences are significant and may be compounding. OECD analysis shows firms adopting AI achieve 15&ndash;40% productivity gains in affected tasks, but diffusion to the broader economy takes 5&ndash;10 years without active policy support. The current adoption pattern &mdash; concentrated in sectors already productive &mdash; risks widening rather than closing the UK&apos;s existing productivity gap. The AI Opportunities Action Plan (2025) committed to sector-specific adoption programmes, and the Made Smarter manufacturing AI programme showed strong results in pilot regions &mdash; but neither has yet shifted the adoption curve for the 5.5 million SMEs that currently have no AI strategy, and the pipeline of AI-competent workers remains heavily concentrated in London and the South East.</p>
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
              href="#sec-chart"source="DSIT · AI Activity in UK Businesses Survey 2024"
            />
            <MetricCard
              label="AI investment per worker"
              value="£890"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£420 since 2021 · UK below US/Germany"
              sparklineData={[310, 380, 450, 520, 600, 680, 760, 840, 890]}
              href="#sec-chart"source="OECD · AI Investment and Productivity"
            />
            <MetricCard
              label="Firms citing AI skills gap"
              value="78%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 51% in 2021 · biggest barrier"
              sparklineData={[35, 38, 42, 46, 51, 58, 65, 71, 78]}
              href="#sec-chart"source="DSIT · AI Activity in UK Businesses Survey 2024"
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
