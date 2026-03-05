'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>The care economy in Britain encompasses both paid formal care — the workforce of approximately 1.6 million people employed in social care — and the far larger informal sector of unpaid carers: people who look after a family member, partner, or friend who is ill, elderly, disabled, or has a mental health condition. Carers UK estimates there are 10.6 million unpaid carers in the UK. If their care were provided commercially at the rate paid to professional carers, it would cost £93 billion per year — a figure comparable to the entire NHS England budget and representing 4% of GDP. This care is, in effect, a subsidy the state receives from individuals who are not compensated at market rates.</p>
            <p>The inadequacy of financial support for unpaid carers is long-standing and well-documented. Carer&apos;s Allowance — the main benefit available to carers who provide 35 or more hours of care per week — is £81.90 per week as of 2024. This is the lowest of all means-tested benefits, and is not payable to anyone who earns more than £151 per week after expenses. The low earnings threshold has remained a persistent grievance: carers who attempt to combine part-time work with caring are often trapped either below the threshold (limiting income) or just above it (losing the allowance entirely). The 2024 Autumn Budget increased the earnings limit to £195 per week, a change welcomed by carer organisations but criticised as insufficient.</p>
            <p>Only 900,000 carers claim Carer&apos;s Allowance from an eligible population of approximately 10.6 million — a take-up rate of around 8.5%. Many carers are not aware of the benefit, do not meet the eligibility threshold (which requires 35+ hours of care and earnings below the limit), or are caring for someone whose needs do not meet the qualifying condition. The low take-up means billions in claimed but unclaimed support each year. Pension Credit and Carer Premium provide additional support to retired or lower-income carers, but the overall picture is of a benefit system that compensates unpaid care at a fraction of its economic value.</p>
            <p>An estimated 600 carers leave paid employment every day in the UK to take on caring responsibilities, according to Carers UK research. This represents a significant economic cost beyond the benefit system: workers leaving employment take their skills and earning capacity with them, reducing GDP and tax receipts, while also increasing their own long-term financial vulnerability through reduced pension contributions and career advancement. Women are significantly more likely to reduce their employment than men when caring responsibilities arise, contributing to gender pay gaps and pension gaps. The ONS estimates that the economic cost of employment exit due to caring is approximately £1.3 billion per year in lost output.</p>
            <p>The long-term fiscal trajectory for unpaid care is challenging. Population ageing will increase the number of people needing care, and the workforce gap in paid social care — already running at 150,000 vacancies — will intensify pressure on informal carers to fill the gap. International evidence suggests that well-supported, recognised unpaid carers who are helped to remain in employment and maintain their own health are more likely to sustain their caring role long-term. The UK&apos;s 2022 Carer&apos;s Leave Act, which gave carers the right to 5 days of unpaid leave from employment, and the NHS Long Term Plan&apos;s commitment to identifying and supporting carers registered with GP practices, represent incremental steps toward treating unpaid carers as a recognised part of the health and care system rather than an invisible subsidy.</p>
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
              onExpand={() => {}}
              source="Carers UK · State of Caring Report 2024"
            />
            <MetricCard
              label="Carers receiving Allowance"
              value="900,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Only 900k of 10.6m eligible · £81.90/week"
              sparklineData={[760, 780, 800, 820, 840, 850, 870, 880, 900]}
              onExpand={() => {}}
              source="DWP · Carer's Allowance Statistics 2024"
            />
            <MetricCard
              label="Carers leaving work per day"
              value="600"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="600/day · £1.3bn GDP impact annually"
              sparklineData={[600, 600, 590, 610, 620, 600, 610, 600, 600]}
              onExpand={() => {}}
              source="Carers UK · State of Caring Report 2024"
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
            <p>DWP — Carer&apos;s Allowance Statistics 2024. Published quarterly. gov.uk/government/collections/carers-allowance-statistics</p>
            <p>Unpaid care value is calculated by applying the median hourly rate for professional care workers to estimated hours of informal care provided, using ONS Time Use Survey data. Carer&apos;s Allowance claimant figures are actual DWP administrative data. Employment exit estimates are from Carers UK surveys combined with ONS Labour Force Survey analysis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
