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
          finding="3.6 million cohabiting couples have few automatic legal protections, yet 51% mistakenly believe in &lsquo;common law marriage&rsquo; rights that don&apos;t exist."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cohabiting couples &mdash; those who live together in a relationship without being married or in a civil partnership &mdash; are the fastest-growing family type in England and Wales. Their number has increased from 2.6 million in 2002 to 3.6 million in 2022, a rise of 38%. Yet despite representing over 20% of all couple relationships, cohabiting couples have almost none of the automatic legal protections afforded to married couples or civil partners. There is no equivalent of divorce law for cohabiting couples: on separation, there is no right to share property, no right to a share of pension wealth, and no maintenance obligation beyond child support arrangements for any children.</p>
            <p>The &apos;common law marriage&apos; myth &mdash; the widespread but incorrect belief that couples who live together for a significant period acquire quasi-marital legal rights &mdash; is one of the most persistent legal misconceptions in England and Wales. Despite common law marriage having no legal basis in England and Wales (it exists in some other jurisdictions), polls consistently show that around 51% of the population believe it does. This figure has remained stable for over a decade despite public information campaigns by organisations including Citizens Advice. The consequences of this misconception can be severe: couples who believe they are protected are less likely to take independent legal steps &mdash; cohabitation agreements, joint property ownership, updated wills &mdash; to protect their interests.</p>
            <p>The practical consequences of separation for cohabiting couples are governed by a patchwork of overlapping legal frameworks. Property rights are determined by trust law &mdash; a complex and expensive area of civil law requiring evidence of shared intention regarding property ownership. Financial claims for contributions to property improvements or mortgage payments can be made but require litigation in the county courts. Children&apos;s financial arrangements are covered by the Child Support Act, but this applies only to child maintenance, not to housing provision for the parent with care. The result is that a cohabiting partner who has contributed to a mortgage, cared for children, and foregone career advancement &mdash; patterns strongly correlated with female partners &mdash; can emerge from a long relationship with minimal financial security.</p>
            <p>Reform has been repeatedly recommended but not implemented. The Law Commission recommended reform of cohabitation law in 2007, proposing an opt-out scheme giving cohabiting couples who meet certain criteria (duration, children, or financial interdependence) similar financial remedies to those available on divorce. Scotland has had such a scheme since the Family Law (Scotland) Act 2006. Research suggests that the Scottish scheme has provided effective and proportionate remedies for separated cohabitants without creating significant complexity or unintended consequences. Yet successive UK governments have declined to legislate for England and Wales, citing parliamentary time and concerns about undermining marriage.</p>
            <p>The Law Commission reopened the cohabitation question in a 2022 scoping review and recommended a full review, which commenced in 2023. Campaigners and family lawyers argue that the evidence for reform is overwhelming: the number of cohabiting couples continues to grow, the common law marriage myth shows no sign of declining, and the current legal framework produces arbitrary and often unjust outcomes that fall disproportionately on women and children. Awareness campaigns &mdash; including the government&apos;s 2023 Cohabitation Rights campaign &mdash; have improved knowledge in some age groups, but changing legal rights rather than just legal awareness remains the only sustainable solution.</p>
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
              changeText="+38% since 2002 &middot; fastest-growing family type"
              sparklineData={[2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.4, 3.6]}
              onExpand={() => {}}
              source="ONS &middot; Families and Households 2022"
            />
            <MetricCard
              label="Believing in common law marriage"
              value="51%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Persistent myth despite campaigns"
              sparklineData={[55, 54, 53, 53, 52, 52, 51, 51, 51]}
              onExpand={() => {}}
              source="Resolution Foundation / Citizens Advice Survey 2023"
            />
            <MetricCard
              label="Separations without legal framework"
              value="250,000/yr"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="250k/yr with no equivalent to divorce law"
              sparklineData={[180, 190, 200, 210, 215, 220, 230, 240, 250]}
              onExpand={() => {}}
              source="ONS / Law Commission estimate 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Cohabiting couples in England and Wales, 2016&ndash;2024"
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
            <p>ONS &mdash; Families and Households. Published annually. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/families/datasets/familiesandhouseholds</p>
            <p>Resolution Foundation / Citizens Advice &mdash; Cohabitation Survey 2023. resolutionfoundation.org</p>
            <p>Law Commission &mdash; Cohabitation: The Financial Consequences of Relationship Breakdown (2007). lawcom.gov.uk</p>
            <p>Cohabiting couple figures from ONS Labour Force Survey. Common law marriage belief from periodic public attitude surveys. Separation figures are ONS estimates modelled from survey data on cohabitation duration and relationship dissolution rates.</p>
          </div>
        </section>
      </main>
    </>
  )
}
