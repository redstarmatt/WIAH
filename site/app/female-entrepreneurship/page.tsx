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
            <p>Female entrepreneurship in the UK has grown significantly over the past decade, representing one of the more positive trends in the business landscape. The number of women starting businesses has risen faster than the rate for men since 2014, and the proportion of new business registrations with female founders has climbed from 17% to 24%. Yet this progress coexists with a persistent and well-documented funding gap that limits the scale and ambition of female-founded businesses relative to their potential.</p>
            <p>The venture capital funding gap is the starkest manifestation of structural inequality in business finance. In 2023, female-founded companies received just 2p of every £1 of VC investment in the UK — a figure that has improved from 1p in 2019 but remains a dramatic underrepresentation given that women start 24% of businesses. All-female founding teams receive 2% of deal value while all-male teams receive 89%, with mixed teams accounting for the remainder. The Rose Review of Female Entrepreneurship (2019) identified this gap and recommended a series of interventions including an Investing in Women code, which has since been signed by over 150 financial institutions.</p>
            <p>The funding gap reflects multiple compounding factors. The investor community remains predominantly male: an estimated 83% of UK venture capital partners are men. Research consistently shows that investors evaluate pitches through a lens shaped by their own experience of business, leading to systematic undervaluation of markets primarily serving women and overconfidence in pitches from male founders. Female founders are also more likely to be asked about risk mitigation in investor conversations (&apos;prevention framing&apos;) while male founders are asked about growth potential (&apos;promotion framing&apos;) — a documented pattern that produces lower valuations for identical business propositions.</p>
            <p>Access to networks and role models is a secondary but real constraint. Entrepreneurship knowledge and confidence tend to transmit through personal networks, and women in many industries remain underrepresented in the senior layers where entrepreneurial connections concentrate. The scale-up challenge is particularly acute: female-founded businesses are less likely to take on investment, more likely to remain small, and consequently less visible in high-growth company lists — which in turn shapes public perception of what a successful entrepreneur looks like. This feedback loop is self-reinforcing unless actively disrupted.</p>
            <p>Government and industry programmes have multiplied since 2019. The Investing in Women code, the NatWest Accelerator for female entrepreneurs, Barclays Eagle Labs, and Scale Up UK have all targeted female founders. The British Business Bank&apos;s Invested in Women initiative has allocated £50 million of investment specifically to address the funding gap, and the 2024 Autumn Budget included additional commitments to enterprise support for underrepresented founders. Progress is measurable: the value of VC funding to female founders has quadrupled since 2018. But the gap, while narrowing, remains so wide that closing it entirely on the current trajectory would take over 25 years without structural change to investor composition.</p>
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
              onExpand={() => {}}
              source="British Business Bank · Invested in Women Report 2024"
            />
            <MetricCard
              label="VC to female founders"
              value="2p per £1"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+1p since 2019 · still far below parity"
              sparklineData={[1, 1, 1, 1, 1, 1.2, 1.5, 1.8, 2]}
              onExpand={() => {}}
              source="Dealroom / British Business Bank 2024"
            />
            <MetricCard
              label="Female-founded SME turnover"
              value="£105bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£32bn since 2017 · growing 2× faster"
              sparklineData={[73, 78, 82, 87, 91, 93, 96, 100, 105]}
              onExpand={() => {}}
              source="Rose Review / HMRC Business Survey 2024"
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
