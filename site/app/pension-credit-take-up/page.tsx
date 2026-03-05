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
            <p>Pension Credit is the primary means-tested benefit for pensioners in the UK, providing a minimum income guarantee for those with limited retirement income. In 2024, the full Pension Credit top-up brought weekly income to £218.15 for a single person or £332.95 for couples. Crucially, Pension Credit is also a passport to a range of other benefits: Housing Benefit, Council Tax Reduction, free NHS dental treatment, free TV licence for over-75s, and — until 2024 — Winter Fuel Payment for all eligible pensioners. The Winter Fuel Payment policy change announced in July 2024, which restricted the payment to only Pension Credit recipients, significantly raised the stakes of Pension Credit non-take-up.</p>
            <p>The take-up rate for Pension Credit — the proportion of eligible households actually claiming — is approximately 63%, meaning around 37% of eligible pensioners do not claim. In absolute terms, the DWP estimates approximately 880,000 eligible households not receiving Pension Credit, though other estimates put the figure closer to 1 million when accounting for definitional variation in eligibility assessment. The aggregate unclaimed value is approximately £1.5-2 billion per year. Non-take-up of Pension Credit is one of the highest rates of any major means-tested benefit, and the gap has persisted despite multiple government take-up campaigns.</p>
            <p>The reasons for non-take-up are varied and well-researched. The most commonly cited reasons are stigma (benefits perceived as charity or as means-tested welfare that pensioners prefer not to claim), complexity (the application process requires detailed financial information including savings, property values, and all income sources), and lack of awareness (particularly among older pensioners who have not needed to claim benefits previously and who may have limited engagement with digital communication channels). The application process — which improved with the introduction of an online claim route in 2023 but still involves significant form-filling — is a real barrier for some, particularly those with cognitive decline or visual impairments.</p>
            <p>The Winter Fuel Payment policy change dramatically increased the salience of Pension Credit take-up. Previously, all pensioners over state pension age received the Winter Fuel Payment (£200-300 per year). From winter 2024-25, only Pension Credit recipients received it, creating a direct financial incentive — of £300 per year — for non-claiming pensioners to apply. Age UK, Citizens Advice, and local authorities launched major take-up campaigns in response. The government committed additional DWP staffing resource to Pension Credit claims processing in anticipation of increased demand.</p>
            <p>The broader pensioner poverty picture contextualises the Pension Credit take-up failure. Approximately 13% of pensioners in the UK live in poverty (below 60% of median income after housing costs), a rate lower than working-age poverty but still significant in absolute terms. Food bank usage among pensioners has grown: the Trussell Trust recorded a 94% increase in pensioner emergency food parcel distribution between 2019 and 2024. The combination of non-take-up of Pension Credit, high heating costs, and rising food prices has concentrated financial hardship among pensioners who lack additional income from occupational pensions, significant savings, or family support. The policy evidence is clear that increasing Pension Credit take-up is one of the most cost-effective means of reducing pensioner poverty.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Pension Credit take-up rate"
              value="63%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="63% take-up · barely moved in 10 years"
              sparklineData={[61, 61, 62, 62, 63, 63, 63, 63, 63]}
              source="DWP · Pension Credit Take-Up Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average Pension Credit value"
              value="£3,900/yr"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£400 since 2022 · includes Winter Fuel gateway"
              sparklineData={[2800, 2900, 3000, 3100, 3200, 3400, 3600, 3800, 3900]}
              source="DWP · Pension Credit Statistics 2024"
              onExpand={() => {}}
            />
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
