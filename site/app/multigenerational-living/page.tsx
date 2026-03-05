'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  multiGenHouseholdsM: number
}

interface Driver {
  driver: string
  pct: number
}

interface MultigenerationalLivingData {
  timeSeries: TimeSeriesPoint[]
  drivers: Driver[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function MultigenerationalLivingPage() {
  const [data, setData] = useState<MultigenerationalLivingData | null>(null)

  useEffect(() => {
    fetch('/data/multigenerational-living/multigenerational_living.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const householdSeries: Series[] = data
    ? [{
        id: 'multi-gen',
        label: 'Multigenerational households (millions)',
        colour: '#F4A261',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.multiGenHouseholdsM,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Are More Families Living Together?"
          finding="Multigenerational households have grown by 33% since 2001 &mdash; driven primarily by housing costs forcing adult children to stay at home."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain&apos;s housing crisis is reshaping the fundamental structure of the family. In 2001, approximately 1.35 million households in England and Wales contained multiple generations of adults living under one roof. By 2023, that figure had grown to 1.8 million &mdash; a rise of 33% over two decades. While some of this growth reflects genuine cultural preferences and changing demographics, the dominant driver is economic: housing has become so expensive that young adults simply cannot afford to leave.</p>
            <p>The most visible manifestation is the sharp rise in adult children living with their parents. 3.7 million people aged 25&ndash;34 &mdash; one in four of that age cohort &mdash; now live in the parental home, a record high. In 2001, the figure was closer to 2.4 million. The change is not primarily explained by unemployment or relationship breakdown, though both play a role. The dominant factor, identified in survey after survey, is the inability to afford either a mortgage or private rental accommodation without exceptional levels of income or family support.</p>
            <p>The trend is partly driven by changes in the private rental market. Average rents in England now consume 36% of median earnings; in London, the figure exceeds 50%. First-time buyer deposits require savings equivalent to three to five years of post-tax income for a median earner. These are structural barriers that lock a growing proportion of young adults into extended co-residency with parents regardless of personal preference. The 72% of multigenerational families who cite housing costs as the primary reason for living arrangements is a measure of market failure, not lifestyle choice.</p>
            <p>There are, however, genuine cultural dimensions to the growth in multigenerational living. Around 18% of multigenerational households are driven by care needs &mdash; typically adult children moving back to support ageing parents, or grandparents moving in to provide childcare. This care economy is largely invisible in official statistics but represents a significant and growing social function. As adult social care funding has been repeatedly cut in real terms, family care arrangements have become the de facto substitute for state provision for hundreds of thousands of older people.</p>
            <p>The housing implications of multigenerational living are complex. On one hand, families sharing accommodation reduces demand for separate dwellings in the short term. On the other, it masks latent demand: these are households that would separate if affordable options existed. When housing supply does eventually increase, or when inheritance events create capital for younger family members, suppressed household formation will release as a surge in demand. The 1.8 million multigenerational households are not a sign that Britain needs fewer homes &mdash; they are evidence of just how many homes are missing.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Multigenerational households"
              value="1.8m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+33% since 2001 &middot; 6% of all households"
              sparklineData={[1.35, 1.5, 1.62, 1.74, 1.8, 1.82, 1.8]}
              onExpand={() => {}}
              source="ONS &middot; Census 2021 / Family Resources Survey"
            />
            <MetricCard
              label="Housing cost driver"
              value="72%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="of families cite housing unaffordability as reason"
              sparklineData={[65, 67, 68, 70, 71, 72, 72]}
              onExpand={() => {}}
              source="ONS &middot; Family Resources Survey 2024"
            />
            <MetricCard
              label="Adult children at home (25&ndash;34)"
              value="3.7m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="25&ndash;34 living with parents &middot; record high"
              sparklineData={[2.4, 2.6, 2.9, 3.1, 3.3, 3.5, 3.7]}
              onExpand={() => {}}
              source="ONS &middot; Labour Force Survey 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Multigenerational households in England and Wales, 2001&ndash;2023"
              subtitle="Households containing two or more adult generations. Millions. Census and Family Resources Survey estimates."
              series={householdSeries}
              yLabel="Households (millions)"
              source={{
                name: 'ONS',
                dataset: 'Census 2021 / Family Resources Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Census 2021, Household and Family Characteristics. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/families</p>
            <p>ONS &mdash; Family Resources Survey. Longitudinal survey of household composition and income, published annually by DWP. gov.uk/government/collections/family-resources-survey--2</p>
            <p>ONS &mdash; Labour Force Survey, Young Adults Living with Parents. Annual estimates of 20&ndash;34 year olds in parental home. ons.gov.uk</p>
            <p>Multigenerational household defined as two or more adult generations (18+) sharing a dwelling as primary residence. Care arrangements and student living situations included. Figures are England and Wales unless otherwise stated.</p>
          </div>
        </section>
      </main>
    </>
  )
}
