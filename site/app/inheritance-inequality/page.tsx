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
          finding="Total inherited wealth in Britain has trebled since 1995 — and the top 10% of estates account for 50% of all inherited value."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain is in the middle of the largest intergenerational wealth transfer in its history. Total inherited wealth has grown from approximately £55 billion per year in the mid-1990s to around £170 billion in 2023 — a threefold increase in real terms — with annual flows projected to exceed £250 billion by the mid-2030s. The top 10% of estates account for approximately half of all inherited wealth transferred, while roughly half of all adults receive no meaningful inheritance. Property is the primary mechanism: house price inflation since the 1980s created substantial unearned wealth for owner-occupiers, particularly in London and the South East, which now passes to the next generation and advantages those born to homeowning parents over those born to renters. Inheritance tax (IHT) is intended to moderate these transfers but only around 4% of estates pay any IHT at all, as the £325,000 threshold (frozen since 2009) and various reliefs reduce effective rates sharply.</p>
            <p>The distributional consequences are compounding. Resolution Foundation research projects that by the 2040s, inheritance will account for a larger share of lifetime wealth inequality than it does today. Recipients of large inheritances are significantly more likely to move into owner-occupation, start a business, and exit paid employment — compressing opportunity for those who must build wealth from wages alone. Around £5.5 trillion in housing equity sits with over-65s; as it transfers, it reinforces advantages that are geographic (concentrated in London and the South East), generational (baby boomers benefiting from decades of house price growth), and socioeconomic (those already in the top half of the wealth distribution are overwhelmingly the primary beneficiaries).</p>
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
              value="£170bn"
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="trebled since 2000 · biggest wealth transfer in history"
              sparklineData={[50, 75, 95, 115, 135, 145, 165, 170]}
              href="#sec-chart"source="HMRC Inheritance Tax Statistics · Resolution Foundation 2023"
            />
            <MetricCard
              label="Top 10% estate share"
              value="50%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="half of all inherited value to 10% of estates"
              sparklineData={[48, 49, 49, 50, 50, 50]}
              href="#sec-chart"source="ONS Wealth and Assets Survey · 2022"
            />
            <MetricCard
              label="Median inheritance received"
              value="£11,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="half receive nothing · bimodal distribution"
              sparklineData={[7000, 7000, 9000, 9000, 11000, 11000]}
              href="#sec-chart"source="ONS Wealth and Assets Survey · 2022"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Total inherited wealth in Britain, 2000–2023"
              subtitle="Estimated annual value of inherited assets (£ billions). Includes property, financial assets, and business assets transferred at death."
              series={wealthSeries}
              yLabel="£ billions per year"
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
            <p>HMRC — Inheritance Tax Statistics. Published annually. gov.uk/government/collections/inheritance-tax-statistics</p>
            <p>ONS — Wealth and Assets Survey. Published every two years. ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave</p>
            <p>Resolution Foundation — Intergenerational Audit. resolutionfoundation.org/research/intergenerational-audit</p>
            <p>Institute for Fiscal Studies — Inheritance and inequality over the life cycle. ifs.org.uk</p>
            <p>Total inherited wealth estimates combine HMRC administrative data on estates passing through probate with ONS Wealth and Assets Survey estimates of total household wealth transfers. Top decile share derived from ONS WAS wave 7 (2018–2020). Median inheritance figures reflect conditional median among those receiving any inheritance.</p>
          </div>
        </section>
      </main>
    </>
  )
}
