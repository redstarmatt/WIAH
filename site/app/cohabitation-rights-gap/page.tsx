'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface CohabitationRightsGapData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    cohabitingCouplesM: number
    believeCommonLawPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function CohabitationRightsGapPage() {
  const [data, setData] = useState<CohabitationRightsGapData | null>(null)

  useEffect(() => {
    fetch('/data/cohabitation-rights-gap/cohabitation_rights_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'cohabitingCouples',
          label: 'Cohabiting couples (millions)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cohabitingCouplesM,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Cohabitation Rights Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cohabitation Rights Gap"
          question="Are Cohabiting Couples Actually Protected by Law?"
          finding="3.6 million cohabiting couples have few automatic legal protections, yet 51% mistakenly believe in &lsquo;common law marriage&rsquo; rights that don't exist."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cohabiting couples are the fastest-growing family type in England and Wales, rising from 2.6 million in 2002 to 3.6 million in 2022, yet they have almost none of the automatic legal protections afforded to married couples or civil partners. On separation, there is no right to share property, no right to pension wealth, and no maintenance obligation beyond child support. Around 51% of the population believe in &ldquo;common law marriage&rdquo; — a myth: no such legal status exists in England and Wales. This persistent misconception means that couples who believe they are protected are less likely to take independent steps — cohabitation agreements, joint ownership, updated wills — that would actually protect them. Approximately 250,000 cohabiting couple separations occur each year with no equivalent of divorce law to govern them.</p>
            <p>The Law Commission recommended reform in 2007, proposing an opt-out scheme giving qualifying couples similar financial remedies to those available on divorce. Scotland implemented such a scheme in 2006 with positive results. Successive UK governments have declined to legislate for England and Wales. The burden falls disproportionately on women who have contributed to mortgages, cared for children, and foregone career advancement, but emerge from long relationships with minimal financial security. A Law Commission review commenced in 2023; until reform is enacted, awareness campaigns cannot substitute for the legal rights that 3.6 million households currently lack.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Cohabiting Couples' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Cohabiting couples in England &amp; Wales"
              value="3.6m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+38% since 2002 · fastest-growing family type"
              sparklineData={[2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.4, 3.6]}
              href="#sec-chart"source="ONS · Families and Households 2022"
            />
            <MetricCard
              label="Believing in common law marriage"
              value="51%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Persistent myth despite campaigns"
              sparklineData={[55, 54, 53, 53, 52, 52, 51, 51, 51]}
              href="#sec-chart"source="Resolution Foundation / Citizens Advice Survey 2023"
            />
            <MetricCard
              label="Separations without legal framework"
              value="250,000/yr"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="250k/yr with no equivalent to divorce law"
              sparklineData={[180, 190, 200, 210, 215, 220, 230, 240, 250]}
              href="#sec-chart"source="ONS / Law Commission estimate 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Cohabiting couples in England and Wales, 2016–2024"
              subtitle="Number of opposite-sex and same-sex cohabiting couples (millions)."
              series={series}
              yLabel="Couples (millions)"
              source={{
                name: 'ONS',
                dataset: 'Families and Households',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Families and Households. Published annually. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/families/datasets/familiesandhouseholds</p>
            <p>Resolution Foundation / Citizens Advice — Cohabitation Survey 2023. resolutionfoundation.org</p>
            <p>Law Commission — Cohabitation: The Financial Consequences of Relationship Breakdown (2007). lawcom.gov.uk</p>
            <p>Cohabiting couple figures from ONS Labour Force Survey. Common law marriage belief from periodic public attitude surveys. Separation figures are ONS estimates modelled from survey data on cohabitation duration and relationship dissolution rates.</p>
          </div>
        </section>
      </main>
    </>
  )
}
