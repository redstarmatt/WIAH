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
            <p>Multigenerational households in England and Wales rose from 1.35 million in 2001 to 1.8 million by 2023 &mdash; a 33% increase. The dominant driver is economic: average rents now consume 36% of median earnings in England and over 50% in London, while first-time buyer deposits require three to five years of post-tax savings for a median earner. 3.7 million people aged 25&ndash;34 &mdash; one in four &mdash; now live in the parental home, a record, up from 2.4 million in 2001. 72% of multigenerational families cite housing costs as the primary reason. Around 18% are driven by care needs &mdash; ageing parents requiring support, or grandparents providing childcare &mdash; a growing invisible care economy that has expanded as adult social care funding has been repeatedly cut in real terms.</p>
            <p>The 1.8 million multigenerational households mask suppressed demand, not reduced need. Young adults locked into co-residency represent households that would separate if affordable options existed; when housing supply eventually increases or inheritance creates capital, that latent demand will release rapidly. The burden of enforced co-residency falls hardest on those with no parental home to return to &mdash; care leavers, those whose parents are in private rented accommodation themselves, and those from communities with smaller or no family housing wealth &mdash; who have no safety net when the housing market locks them out.</p>
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
