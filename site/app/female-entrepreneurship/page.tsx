'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

interface FemaleEntrepreneurshipData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    femaleFoundedPct: number
    vcFemaleSharePence: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function FemaleEntrepreneurshipPage() {
  const [data, setData] = useState<FemaleEntrepreneurshipData | null>(null)

  useEffect(() => {
    fetch('/data/female-entrepreneurship/female_entrepreneurship.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'female',
          label: 'Female-founded businesses (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.femaleFoundedPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Female Entrepreneurship" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Female Entrepreneurship"
          question="Are Women Starting Businesses in Britain?"
          finding="Female-founded businesses have risen steadily, but women still start only 1 in 4 businesses and receive just 2p of every £1 in venture capital."
          colour="#2A9D8F"
        />

        <PositiveCallout
          title="Female business ownership up 45% since 2014"
          value="45%"
          description="Female business ownership has grown 45% since 2014, faster than male entrepreneurship growth over the same period. The number of self-employed women in the UK reached 1.55 million in 2024, and female-founded businesses now contribute over £105 billion to annual GDP. Government-backed Invest in Women funding and the British Business Bank's Invested in Women report have brought systematic data to a previously unmeasured gap — the first step in addressing it."
          source="British Business Bank · Invested in Women Report 2024"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Female entrepreneurship in the UK has grown significantly over the past decade: the proportion of new business registrations with female founders has climbed from 17% to 24% since 2014, rising faster than male entrepreneurship growth. Yet this coexists with a persistent funding gap. In 2023, female-founded companies received just 2p of every £1 of venture capital investment — improved from 1p in 2019 but still a dramatic underrepresentation given women start 24% of businesses. All-female founding teams receive 2% of VC deal value while all-male teams receive 89%. The Rose Review (2019) identified this gap, and the Investing in Women code has since been signed by over 150 financial institutions; the British Business Bank's Invested in Women initiative has allocated £50 million to address it. Progress is measurable — VC funding to female founders has quadrupled since 2018 — but on the current trajectory, closing the gap entirely would take over 25 years without structural change.</p>
            <p>The funding gap reflects compounding structural factors. An estimated 83% of UK venture capital partners are men, and research shows investors evaluate pitches through a lens shaped by their own experience, systematically undervaluing markets primarily serving women. Female founders are more likely to be asked about risk mitigation ('prevention framing') while male founders are asked about growth potential ('promotion framing') — a documented pattern producing lower valuations for identical propositions. Female-founded businesses are less likely to take on investment, more likely to remain small, and consequently less visible in high-growth company lists — shaping public perception of what a successful entrepreneur looks like in a feedback loop that is self-reinforcing without active disruption.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Female Founders' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Female-founded businesses"
              value="24%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+7pp since 2014 · target: 33% by 2030"
              sparklineData={[17, 18, 18, 19, 20, 21, 22, 23, 24]}
              href="#sec-chart"source="British Business Bank · Invested in Women Report 2024"
            />
            <MetricCard
              label="VC to female founders"
              value="2p per £1"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+1p since 2019 · still far below parity"
              sparklineData={[1, 1, 1, 1, 1, 1.2, 1.5, 1.8, 2]}
              href="#sec-chart"source="Dealroom / British Business Bank 2024"
            />
            <MetricCard
              label="Female-founded SME turnover"
              value="£105bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£32bn since 2017 · growing 2× faster"
              sparklineData={[73, 78, 82, 87, 91, 93, 96, 100, 105]}
              href="#sec-chart"source="Rose Review / HMRC Business Survey 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Female-founded businesses as share of all new registrations, 2016–2024"
              subtitle="Percentage of new business registrations with at least one female founder."
              series={series}
              yLabel="%"
              source={{
                name: 'British Business Bank',
                dataset: 'Invested in Women Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>British Business Bank — Invested in Women Report 2024. Published annually. british-business-bank.co.uk/research/invested-in-women</p>
            <p>Dealroom — UK Venture Capital Report 2024. dealroom.co</p>
            <p>Female-founded percentage is share of new Companies House registrations with at least one female director as primary founder. VC share is proportion of total UK venture capital deal value going to all-female or majority-female founding teams. Turnover figures from ONS Business Register and Employment Survey combined with HMRC data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
