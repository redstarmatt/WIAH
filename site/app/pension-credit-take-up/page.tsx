'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PensionCreditData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    nonClaimingK: number
    takeUpPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function PensionCreditTakeUpPage() {
  const [data, setData] = useState<PensionCreditData | null>(null)

  useEffect(() => {
    fetch('/data/pension-credit-take-up/pension_credit_take_up.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'takeUpPct',
          label: 'Take-up rate (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.takeUpPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Pension Credit" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pensioner Poverty"
          question="Who Is Missing Out on Pension Credit?"
          finding="Around 800,000 eligible pensioners do not claim Pension Credit — worth up to £3,900 per year — leaving £1.5 billion unclaimed annually."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Pension Credit provides a minimum weekly income of &pound;218.15 for single pensioners and &pound;332.95 for couples in 2024/25, and acts as a gateway benefit for Housing Benefit, Council Tax Reduction, free NHS dental treatment, and &mdash; from winter 2024/25 &mdash; the Winter Fuel Payment. Yet around 800,000 eligible households &mdash; 37% of those entitled &mdash; do not claim it, leaving an estimated &pound;1.5&ndash;2 billion unclaimed annually. The 63% take-up rate is one of the lowest for any major means-tested benefit and has barely moved despite repeated government campaigns. The July 2024 decision to restrict Winter Fuel Payment to Pension Credit recipients raised the stakes sharply: non-claimants now lose up to &pound;300 per year in heating support, in addition to the core credit itself.</p>
            <p>Non-take-up concentrates among the hardest-to-reach groups: the very old, those without internet access, and those who did not grow up claiming benefits and carry strong stigma against means-testing. Single female pensioners &mdash; who face a 24% poverty rate versus 16% for all pensioners &mdash; are most exposed, combining income vulnerability with the least likelihood of having a partner or family member to assist with a complex application. Rural and coastal areas with high concentrations of older people and poor digital infrastructure show the weakest claim rates. Age UK estimates that the Trussell Trust recorded a 94% rise in pensioner emergency food parcel distribution between 2019 and 2024, a direct consequence of the gap between entitlement and receipt.</p>
          </div>
        </section>

        <SectionNav
          sections={[
            { id: 'sec-metrics', label: 'Metrics' },
            { id: 'sec-chart', label: 'Chart' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Eligible pensioners not claiming"
              value="800,000"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="800k missing out · £1.5bn unclaimed annually"
              sparklineData={[900, 900, 870, 860, 860, 850, 840, 820, 800]}
              source="DWP · Pension Credit Take-Up Statistics 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Pension Credit take-up rate"
              value="63%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="63% take-up · barely moved in 10 years"
              sparklineData={[61, 61, 62, 62, 63, 63, 63, 63, 63]}
              source="DWP · Pension Credit Take-Up Statistics 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Average Pension Credit value"
              value="£3,900/yr"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£400 since 2022 · includes Winter Fuel gateway"
              sparklineData={[2800, 2900, 3000, 3100, 3200, 3400, 3600, 3800, 3900]}
              source="DWP · Pension Credit Statistics 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Pension Credit take-up rate, 2016–2024"
              subtitle="Percentage of eligible pensioner households receiving Pension Credit."
              series={series}
              yLabel="Take-up rate (%)"
              source={{ name: 'DWP', dataset: 'Pension Credit Take-Up Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Take-up rates from DWP Pension Credit Take-Up Statistics (annual publication). Non-claiming estimates based on DWP Pensioners' Incomes Series modelling of eligible population versus actual claimants. Pension Credit benefit value from DWP Pension Credit Statistics quarterly bulletin. Winter Fuel Payment policy impact from DWP Housing Benefit and Council Tax Benefit analysis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
