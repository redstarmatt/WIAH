'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  totalInheritedWealthBn?: number
  medianInheritance?: number
}

interface InheritanceInequalityData {
  timeSeries: TimeSeries[]
  top10PctShare: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function InheritanceInequalityPage() {
  const [data, setData] = useState<InheritanceInequalityData | null>(null)

  useEffect(() => {
    fetch('/data/inheritance-inequality/inheritance_inequality.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const wealthSeries: Series[] = data
    ? [{
        id: 'total-inherited-wealth',
        label: 'Total inherited wealth (£bn/yr)',
        colour: '#E63946',
        data: data.timeSeries
          .filter(d => d.totalInheritedWealthBn !== undefined)
          .map(d => ({ date: yearToDate(d.year), value: d.totalInheritedWealthBn as number })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Inheritance Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Inheritance &amp; Inequality"
          question="Are the Rich Getting Richer Through Inheritance?"
          finding="Total inherited wealth in Britain has trebled since 1995 &mdash; and the top 10% of estates account for 50% of all inherited value."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain is in the middle of the largest intergenerational wealth transfer in its history. As the baby boom generation ages, the assets they accumulated &mdash; primarily through property ownership &mdash; are passing down to their children. The total value of inherited wealth has grown from approximately &pound;55 billion per year in the mid-1990s to around &pound;170 billion in 2023, a threefold increase in real terms. By the mid-2030s, annual inheritance flows are projected to exceed &pound;250 billion.</p>
            <p>The distribution of this wealth is deeply unequal. The top 10% of estates by value account for approximately half of all inherited wealth transferred. At the other end of the spectrum, roughly half of all adults receive no meaningful inheritance at all &mdash; either because their parents have no significant assets, or because care costs have depleted them before death. The result is a bimodal distribution: a relatively small group receiving substantial transfers that materially change their financial trajectory, and a much larger group for whom inheritance plays no role in lifetime wealth accumulation.</p>
            <p>Property is the primary mechanism. House price inflation since the 1980s has created substantial paper wealth for owner-occupiers in England, particularly in London and the South East. This wealth was largely unearned &mdash; it accrued through the rise in land values that homeowners happened to be sitting on, rather than through productive investment or labour. When it passes to the next generation, it does so in a way that advantages those born to homeowning parents over those born to renters, regardless of individual ability or effort.</p>
            <p>Inheritance tax (IHT) is the mechanism intended to moderate these transfers, but its effectiveness is limited. The threshold has been fixed at &pound;325,000 since 2009, and with various reliefs &mdash; including the residence nil-rate band for property left to children &mdash; effective rates are much lower than the headline 40% suggests. The Institute for Fiscal Studies estimates that the effective inheritance tax rate on estates subject to IHT is around 20%, and that only around 4% of estates pay any inheritance tax at all. Business property relief and agricultural property relief provide near-total exemptions for certain asset classes, creating further distortions.</p>
            <p>The research evidence suggests that large inheritances have measurable effects on recipients&rsquo; behaviour. Studies consistently find that people who receive significant inheritances are more likely to move into owner-occupation, more likely to start a business, and less likely to remain in paid employment. These outcomes are individually rational but collectively concerning: in a society where life outcomes should reflect effort and talent, the accident of parentage is becoming an increasingly dominant determinant of wealth. Resolution Foundation research projects that by the 2040s, inheritance will account for a larger share of lifetime wealth inequality than it does today.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Inherited Wealth' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total inherited wealth per year"
              value="&pound;170bn"
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="trebled since 2000 &middot; biggest wealth transfer in history"
              sparklineData={[50, 75, 95, 115, 135, 145, 165, 170]}
              onExpand={() => {}}
              source="HMRC Inheritance Tax Statistics &middot; Resolution Foundation 2023"
            />
            <MetricCard
              label="Top 10% estate share"
              value="50%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="half of all inherited value to 10% of estates"
              sparklineData={[48, 49, 49, 50, 50, 50]}
              onExpand={() => {}}
              source="ONS Wealth and Assets Survey &middot; 2022"
            />
            <MetricCard
              label="Median inheritance received"
              value="&pound;11,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="half receive nothing &middot; bimodal distribution"
              sparklineData={[7000, 7000, 9000, 9000, 11000, 11000]}
              onExpand={() => {}}
              source="ONS Wealth and Assets Survey &middot; 2022"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Total inherited wealth in Britain, 2000&ndash;2023"
              subtitle="Estimated annual value of inherited assets (&pound; billions). Includes property, financial assets, and business assets transferred at death."
              series={wealthSeries}
              yLabel="&pound; billions per year"
              source={{
                name: 'HMRC / Resolution Foundation',
                dataset: 'Inheritance Tax Statistics &amp; Intergenerational Audit',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HMRC &mdash; Inheritance Tax Statistics. Published annually. gov.uk/government/collections/inheritance-tax-statistics</p>
            <p>ONS &mdash; Wealth and Assets Survey. Published every two years. ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave</p>
            <p>Resolution Foundation &mdash; Intergenerational Audit. resolutionfoundation.org/research/intergenerational-audit</p>
            <p>Institute for Fiscal Studies &mdash; Inheritance and inequality over the life cycle. ifs.org.uk</p>
            <p>Total inherited wealth estimates combine HMRC administrative data on estates passing through probate with ONS Wealth and Assets Survey estimates of total household wealth transfers. Top decile share derived from ONS WAS wave 7 (2018&ndash;2020). Median inheritance figures reflect conditional median among those receiving any inheritance.</p>
          </div>
        </section>
      </main>
    </>
  )
}
