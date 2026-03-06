'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface MarriageCohabitationRow {
  year: number
  marriagesK: number
  cohabitingCouplesM: number
}

interface MarriageCohabitationData {
  topic: string
  lastUpdated: string
  timeSeries: MarriageCohabitationRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function MarriageCohabitationTrendsPage() {
  const [data, setData] = useState<MarriageCohabitationData | null>(null)

  useEffect(() => {
    fetch('/data/marriage-cohabitation-trends/marriage_cohabitation_trends.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const marriageSeries: Series[] = data
    ? [
        {
          id: 'marriagesK',
          label: 'Marriages (thousands)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.marriagesK,
          })),
        },
        {
          id: 'cohabitingCouplesM',
          label: 'Cohabiting couples (millions)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cohabitingCouplesM,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Marriage & Cohabitation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Marriage & Cohabitation"
          question="Is Marriage Dying?"
          finding="Marriages fell to 236,000 in 2022 — the lowest since 1972 — while cohabiting couples have grown to 4.2 million, now the fastest-growing family type."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Marriages in England and Wales have fallen from 480,000 a year in the early 1970s to 236,000 in 2022 &mdash; a 50-year low, with a crude marriage rate of 7.7 per 1,000 population against 14.5 in 1972. The counterpart is the rise of cohabitation: approximately 4.2 million cohabiting couples now live together, more than double the figure two decades ago, making cohabitation the fastest-growing family type. Around 40% of cohabiting couples have dependent children, and average relationship duration has lengthened, challenging the assumption that cohabitation is merely a precursor to marriage. Civil ceremonies now dominate as Church of England weddings have fallen to under 10% of all weddings. Marriage rates remain significantly higher among graduates and homeowners than among those in rented accommodation or precarious employment, meaning marriage has become increasingly associated with affluence as its overall prevalence has fallen.</p>
            <p>The most significant gap is legal. Unlike Scotland and most of Europe, cohabiting couples in England and Wales have no automatic rights to inherit, claim pension benefits, or access financial remedies on separation, regardless of how long they have lived together. The &ldquo;common law marriage&rdquo; myth &mdash; the widely held but entirely false belief that cohabitation confers legal protections &mdash; leaves millions of people, disproportionately women with caring responsibilities and lower individual incomes, financially exposed on relationship breakdown or bereavement. The Law Commission recommended reform in 2007. No legislation has followed in nearly two decades.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Marriage Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Marriages 2022"
              value="236k"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="50-year low &middot; back to 2019 level after COVID"
              sparklineData={[244, 243, 247, 249, 245, 236, 169, 218, 236]}
              href="#sec-chart"source="ONS &middot; Marriages in England and Wales 2022"
            />
            <MetricCard
              label="Cohabiting couples"
              value="4.2m"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="fastest-growing family type &middot; but fewer legal protections"
              sparklineData={[2.1, 2.9, 3.2, 3.4, 3.6, 3.8, 3.9, 4.0, 4.2]}
              href="#sec-chart"source="ONS &middot; Families and Households 2022"
            />
            <MetricCard
              label="Marriages per 1,000"
              value="7.7"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="vs 14.5 in 1972 &middot; long secular decline"
              sparklineData={[10.2, 9.8, 9.4, 9.0, 8.5, 7.7]}
              href="#sec-chart"source="ONS &middot; 2022"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Marriages and cohabiting couples, 2005&ndash;2022"
              subtitle="Annual marriages in thousands and total cohabiting couple families in millions, England and Wales."
              series={marriageSeries}
              yLabel="Value"
              source={{
                name: 'ONS',
                dataset: 'Marriages in England and Wales / Families and Households',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Marriages in England and Wales. Annual publication based on marriage registrations. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships</p>
            <p>ONS &mdash; Families and Households. Annual estimates from the Labour Force Survey. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/families</p>
            <p>Marriage count is total opposite-sex and same-sex marriages registered in England and Wales. Cohabiting couples figure is from LFS household estimates. The 2020 figure is affected by COVID-19 closure of registry offices; 2021 figures include backlog registrations.</p>
          </div>
        </section>
      </main>
    </>
  )
}
