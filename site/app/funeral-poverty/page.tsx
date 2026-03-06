'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface FuneralPovertyData {
  national: {
    averageCost: Array<{ year: number; pounds: number }>
    funeralPayment: Array<{ year: number; averageAward: number }>
    byCost: Array<{ component: string; pct: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function FuneralPovertyPage() {
  const COLOUR = '#6B7280'
  const [data, setData] = useState<FuneralPovertyData | null>(null)

  useEffect(() => {
    fetch('/data/funeral-poverty/funeral_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const costSeries: Series[] = data
    ? [
        {
          id: 'cost',
          label: 'Average funeral cost',
          colour: COLOUR,
          data: data.national.averageCost.map(d => ({
            date: yearToDate(d.year),
            value: d.pounds,
          })),
        },
      ]
    : []

  const paymentSeries: Series[] = data
    ? [
        {
          id: 'payment',
          label: 'Funeral Expenses Payment (average award)',
          colour: '#2A9D8F',
          data: data.national.funeralPayment.map(d => ({
            date: yearToDate(d.year),
            value: d.averageAward,
          })),
        },
      ]
    : []

  return (
    <div className="min-h-screen bg-white">
      <TopicNav topic="Funeral Poverty" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopicHeader
          topic="Funeral Poverty"
          colour={COLOUR}
          question="Can Families Afford to Bury Their Dead?"
          finding="The average cost of a funeral in the UK is now &pound;4,141 &mdash; up 130% since 2004. Around 110,000 families each year cannot afford the cost of burying a loved one without financial help. Funeral poverty disproportionately affects low-income households, and the government&apos;s Funeral Expenses Payment covers only a fraction of average costs."
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The average cost of a funeral in the UK reached &pound;4,141 in 2023, more than double the &pound;1,835 it cost in 2004 &mdash; a 126% rise that substantially outpaced both inflation and wage growth. Around 110,000 families per year are in funeral poverty: unable to pay without significant financial distress or debt. The government&apos;s Funeral Expenses Payment covers less than 40% of average costs, with an average award of &pound;1,593 and a maximum burial contribution of only &pound;700. Until 2023, funeral directors were not required to publish their prices; the CMA&apos;s 2021 review found bereaved families structurally vulnerable to poor value and hidden charges. Public health funerals &mdash; arranged by councils when families cannot pay &mdash; have risen roughly 10% annually since 2010. The Child Funeral Charges Act 2019 abolished fees for children&apos;s funerals in England and Wales.</p>
            <p>Geographic and cultural variation sharpens the inequality. A burial in London can cost over &pound;8,000 &mdash; more than twice the national average &mdash; reflecting land costs where burial space is acutely scarce. Muslim, Jewish, and Sikh families face the full cost of burial with no lower-cost alternative as cremation is not permissible. Direct cremation &mdash; no service, ashes returned, cost around &pound;1,500 &mdash; has grown from around 1% to over 20% of funerals in a decade, providing a genuine cheaper option that many families adopt under financial pressure rather than choice.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average UK funeral cost"
              value="&pound;4,141"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up 130% since 2004 &middot; UK average &middot; Sun Life Cost of Dying Report 2023"
              sparklineData={[1835, 2050, 2400, 2900, 3284, 3590, 3693, 3916, 4184, 4056, 4141]}
              href="#sec-overview"/>
            <MetricCard
              label="Funeral Expenses Payment (average award)"
              value="&pound;1,593"
              direction="flat"
              polarity="up-is-good"
              changeText="2023 &middot; Government benefit for low-income households &middot; Covers &lt;40% of average funeral cost &middot; Max &pound;700 for burial costs"
              sparklineData={[1268, 1316, 1404, 1498, 1568, 1593]}
              href="#sec-charts"/>
            <MetricCard
              label="Families in funeral poverty"
              value="110,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Per year &middot; Cannot afford funeral without financial help &middot; SunLife estimate &middot; Burial costs rising fastest"
              sparklineData={[75000, 82000, 88000, 93000, 98000, 105000, 110000]}
              href="#sec-charts"/>
          </div>
        </ScrollReveal>

        <div id="sec-charts" className="space-y-12 mb-12">
          <ScrollReveal>
            <LineChart
              title="Average funeral cost, UK, 2004&ndash;2023"
              subtitle="Includes funeral director fees, disbursements, burial or cremation. All figures in nominal &pound;. Sun Life Cost of Dying Report."
              series={costSeries}
              yLabel="Average cost (&pound;)"
              source={{ name: 'Sun Life', dataset: 'Cost of Dying Report 2023', frequency: 'annual', url: 'https://www.sunlife.co.uk/life-insurance/over-50s-life-insurance/cost-of-dying/' }}
            />
          </ScrollReveal>

          <ScrollReveal>
            <LineChart
              title="Funeral Expenses Payment &mdash; average award, 2014&ndash;2023"
              subtitle="Average DWP payment to low-income households towards funeral costs. The gap between this line and the average cost line is the shortfall families must find themselves."
              series={paymentSeries}
              yLabel="Average award (&pound;)"
              source={{ name: 'DWP', dataset: 'Funeral Expenses Payment statistics', frequency: 'annual', url: 'https://www.gov.uk/government/collections/funeral-expenses-payment-statistics' }}
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="border border-wiah-border rounded p-6">
              <h3 className="text-base font-bold text-wiah-black mb-1">Funeral cost breakdown</h3>
              <p className="text-sm text-wiah-mid mb-6">Share of average funeral cost by component</p>
              <div className="space-y-3">
                {data?.national.byCost.map(d => (
                  <div key={d.component}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-wiah-black">{d.component}</span>
                      <span className="font-mono text-wiah-mid">{d.pct}%</span>
                    </div>
                    <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${d.pct}%`, backgroundColor: COLOUR }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <section id="sec-sources" className="max-w-2xl border-t border-wiah-border mt-16 pt-12 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          <div className="space-y-3 font-mono text-sm text-wiah-mid">
            <p>Sun Life Cost of Dying Report &mdash; annual survey of funeral costs across the UK. Covers direct funeral director costs plus disbursements (doctor&apos;s fees, coffin, cremation or burial). Published annually. Most recent: 2023.</p>
            <p>DWP Funeral Expenses Payment statistics &mdash; published quarterly by the Department for Work and Pensions. Covers claims made, awards given, and average award values. Available from 2014.</p>
            <p>Competition and Markets Authority &mdash; Funerals Market Investigation, 2021. Provides detailed analysis of market structure, price transparency, and consumer vulnerability.</p>
            <p>Funeral poverty estimate (110,000 families) is derived from SunLife survey data and DWP claims volumes. There is no official government measure of funeral poverty. Figures should be treated as indicative rather than precise. Cost data is nominal; real-terms increases are higher in real terms.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
