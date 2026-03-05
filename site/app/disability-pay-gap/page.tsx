'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  payGapPct: number
  employmentGapPp: number
}

interface DisabilityPayGapData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DisabilityPayGapPage() {
  const [data, setData] = useState<DisabilityPayGapData | null>(null)

  useEffect(() => {
    fetch('/data/disability-pay-gap/disability_pay_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const disabilityGapSeries: Series[] = data
    ? [
        {
          id: 'pay-gap',
          label: 'Disability pay gap (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.payGapPct,
          })),
        },
        {
          id: 'employment-gap',
          label: 'Employment gap (pp)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.employmentGapPp,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Disability Pay Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disability Pay Gap"
          question="Are Disabled Workers Paid Less?"
          finding="Disabled workers earn 17% less than non-disabled workers — and face a 28-percentage-point employment gap that has barely improved since 2010."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The disability pay gap &mdash; the difference in median hourly pay between disabled and non-disabled workers &mdash; stands at 17.2%, a figure essentially unchanged since 2015. The gap reflects occupational segregation (disabled workers concentrated in lower-paid roles), higher rates of part-time working, and discrimination in hiring and progression. The employment gap, at 28.4 percentage points (52% vs 81%), has improved modestly from 33.2 points in 2015 but at a pace slow relative to the scale of the challenge; the government&apos;s 2017 target to get one million more disabled people into work was met, but the employment rate gap has not closed proportionally because overall employment levels also rose. Reasonable adjustments under the Equality Act are inconsistently applied: many disabled employees are reluctant to disclose their condition for fear of stigma, and many employers lack the knowledge or capacity to implement adjustments effectively.</p>
            <p>People with progressive neurological conditions and severe mental health conditions face the largest labour market penalties, with employment rates for those with learning disabilities or autism running at 26&ndash;32% against a national average for disabled people of 52%. Remote and hybrid working, widespread from 2020, removed physical and logistical barriers that had excluded some disabled people from professional employment &mdash; but return-to-office pressure from large employers risks reversing these gains, and the disabled workers who benefited most from remote work are least well placed to resist that pressure. Disability is concentrated in lower-income and social tenancy populations, compounding the pay and employment gaps with housing disadvantage that employment and social policy address in silos rather than together.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Pay & Employment Gaps' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Disability pay gap"
              value="17.2%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="largely unchanged since 2015"
              sparklineData={[17.8, 17.5, 17.4, 17.3, 17.2, 17.4, 17.3, 17.2, 17.2]}
              href="#sec-chart"source="ONS &middot; ASHE Disability Analysis 2023"
            />
            <MetricCard
              label="Disability employment gap"
              value="28.4pp"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slowly closing from 33.2pp peak"
              sparklineData={[33.2, 32.8, 32.4, 31.8, 30.6, 29.1, 28.8, 28.5, 28.4]}
              href="#sec-chart"source="DWP &middot; Labour Force Survey 2023"
            />
            <MetricCard
              label="Severe disability pay gap"
              value="26.1%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="progressive conditions face largest pay penalty"
              sparklineData={[25.0, 25.2, 25.4, 25.6, 25.7, 25.8, 25.9, 26.0, 26.1]}
              href="#sec-chart"source="ONS / Scope &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Disability pay gap and employment gap, 2015&ndash;2023"
              subtitle="Pay gap: % difference in median hourly pay. Employment gap: percentage point difference in employment rates between disabled and non-disabled adults."
              series={disabilityGapSeries}
              yLabel="Gap (%)"
              source={{
                name: 'ONS / DWP',
                dataset: 'ASHE Disability Analysis / Labour Force Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Disability Pay Gaps in the UK. ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/disabilitypaygapsintheuk</p>
            <p>DWP &mdash; Employment of Disabled People. gov.uk/government/statistics/the-employment-of-disabled-people-2023</p>
            <p>Scope &mdash; Disability and the Poverty Premium. scope.org.uk/research/disability-poverty</p>
            <p>Disability is defined using the Equality Act 2010 definition: a physical or mental impairment that has a substantial and long-term adverse effect on the ability to carry out normal day-to-day activities. Pay gap is the difference in median hourly earnings (excluding overtime) between disabled and non-disabled employees in ASHE. Employment gap is calculated from the Labour Force Survey quarterly data. Severe disability is a sub-analysis of those reporting that their condition substantially limits day-to-day activities a lot.</p>
          </div>
        </section>
      </main>
    </>
  )
}
