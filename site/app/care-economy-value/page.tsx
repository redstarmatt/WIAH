'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

interface CareEconomyValueData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    unpaidCareValueBn: number
    carersAllowanceK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function CareEconomyValuePage() {
  const [data, setData] = useState<CareEconomyValueData | null>(null)

  useEffect(() => {
    fetch('/data/care-economy-value/care_economy_value.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'care',
          label: 'Unpaid care value (£ billions)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.unpaidCareValueBn })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Care Economy Value" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Economy Value"
          question="What Is Unpaid Care Actually Worth?"
          finding="Britain's 10.6 million unpaid carers provide £93 billion of care annually — more than the NHS England budget — while average Carer's Allowance is just £81.90 per week."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Carers UK estimates 10.6 million people provide unpaid care in the UK — looking after a family member, partner, or friend who is ill, elderly, disabled, or has a mental health condition. If that care were provided commercially at professional carer rates, it would cost £93 billion per year, comparable to the entire NHS England budget and representing around 4% of GDP. Carer's Allowance — the main financial support for carers providing 35 or more hours per week — is £81.90 per week, the lowest of all means-tested benefits. The earnings threshold of £151 per week (raised to £195 in the 2024 Autumn Budget) has trapped carers attempting to combine part-time work with caring, often losing the allowance entirely if they earn just above the limit. Only 900,000 carers claim Carer's Allowance from an eligible population of 10.6 million. An estimated 600 carers leave paid employment every day, at an ONS-estimated annual cost of £1.3 billion in lost output.</p>
            <p>Women bear a disproportionate share of the burden: they are significantly more likely to reduce employment when caring responsibilities arise, contributing to gender pay gaps and pension gaps that compound across decades. Population ageing will intensify pressure on unpaid carers as the workforce gap in paid social care — already 150,000 vacancies — grows. The Carer's Leave Act 2022 gave carers the right to 5 days of unpaid leave from employment, and the NHS Long Term Plan committed to identifying carers registered with GP practices, but these are incremental steps against a structural gap between the economic value of unpaid care and the support provided to those who provide it.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Unpaid Care Value' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Unpaid care value annually"
              value="£93bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£21bn since 2019 · equals NHS England budget"
              sparklineData={[57, 60, 64, 68, 72, 74, 80, 87, 93]}
              href="#sec-chart"source="Carers UK · State of Caring Report 2024"
            />
            <MetricCard
              label="Carers receiving Allowance"
              value="900,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Only 900k of 10.6m eligible · £81.90/week"
              sparklineData={[760, 780, 800, 820, 840, 850, 870, 880, 900]}
              href="#sec-chart"source="DWP · Carer's Allowance Statistics 2024"
            />
            <MetricCard
              label="Carers leaving work per day"
              value="600"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="600/day · £1.3bn GDP impact annually"
              sparklineData={[600, 600, 590, 610, 620, 600, 610, 600, 600]}
              href="#sec-chart"source="Carers UK · State of Caring Report 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Estimated value of unpaid care, 2016–2024"
              subtitle="Annual economic value of unpaid care at professional carer rates (£ billions)."
              series={series}
              yLabel="£ billions"
              source={{
                name: 'Carers UK',
                dataset: 'State of Caring Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Carers UK — State of Caring Report 2024. Published annually. carersuk.org/media-centre/press-releases/state-of-caring-report</p>
            <p>DWP — Carer's Allowance Statistics 2024. Published quarterly. gov.uk/government/collections/carers-allowance-statistics</p>
            <p>Unpaid care value is calculated by applying the median hourly rate for professional care workers to estimated hours of informal care provided, using ONS Time Use Survey data. Carer's Allowance claimant figures are actual DWP administrative data. Employment exit estimates are from Carers UK surveys combined with ONS Labour Force Survey analysis.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
