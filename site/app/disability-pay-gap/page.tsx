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
            <p>The disability pay gap &mdash; the difference in median hourly pay between disabled and non-disabled workers &mdash; stands at 17.2%, a figure that has remained essentially unchanged since 2015. This stability is not evidence that the problem has been solved; it is evidence that the structural factors that create pay disparity for disabled workers are deeply rooted and have proved resistant to the range of interventions introduced over the past decade. The gap reflects a combination of occupational segregation (disabled workers are concentrated in lower-paid roles), part-time working (disabled workers are more likely to work part-time, partly due to health management and partly due to the nature of available flexible work), and direct discrimination in hiring and progression decisions.</p>
            <p>The employment gap is the more acute manifestation of disability disadvantage in the labour market. Approximately 52% of working-age disabled people are in employment, compared to approximately 81% of non-disabled people &mdash; a gap of approximately 28 percentage points. This gap has improved modestly from 33.2 percentage points in 2015, but the pace of improvement is slow relative to the scale of the challenge. The government set a target in 2017 of getting one million more disabled people into work over ten years; that target was met ahead of schedule, but the employment rate gap has not closed proportionally because overall employment levels also rose.</p>
            <p>The heterogeneity of disability means that employment and pay outcomes vary considerably by condition. People with physical mobility impairments in appropriate workplace accommodations may experience relatively modest labour market disadvantage. People with progressive neurological conditions, severe mental health conditions, or complex multiple conditions face far greater barriers. The benefit system creates additional complexity: disability benefits such as Personal Independence Payment are not means-tested against earnings, but the interactions between benefits, employment support, and tax credits can create marginal rates that reduce the financial incentive to increase hours or take on more senior roles for some disabled people.</p>
            <p>Reasonable adjustments &mdash; the legal requirement under the Equality Act 2010 for employers to modify working arrangements or provide equipment to enable disabled workers to do their jobs &mdash; are inconsistently applied in practice. Research by the Business Disability Forum consistently finds that many disabled employees are reluctant to disclose their condition to employers for fear of stigma or disadvantage, and that many employers lack the knowledge or capacity to implement adjustments effectively. The Access to Work scheme provides funding for adaptations and support workers, but awareness of the scheme is low among both employers and employees, and the application process is administratively burdensome.</p>
            <p>The post-pandemic landscape has created both opportunities and risks for disabled workers. Remote and hybrid working, which became widespread for knowledge workers between 2020 and 2022, removed many of the physical and logistical barriers that had prevented some disabled people from accessing professional employment: the daily commute, the inaccessible office environment, the need to be physically present at fixed times. Surveys suggest that remote working has enabled some disabled people to enter or remain in higher-paid employment who would previously have been excluded. But the return-to-office pressure from many large employers risks reversing these gains, and the disabled workers who benefited most from remote work are least well placed to resist employer pressure to return to the office full-time.</p>
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
              onExpand={() => {}}
              source="ONS &middot; ASHE Disability Analysis 2023"
            />
            <MetricCard
              label="Disability employment gap"
              value="28.4pp"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slowly closing from 33.2pp peak"
              sparklineData={[33.2, 32.8, 32.4, 31.8, 30.6, 29.1, 28.8, 28.5, 28.4]}
              onExpand={() => {}}
              source="DWP &middot; Labour Force Survey 2023"
            />
            <MetricCard
              label="Severe disability pay gap"
              value="26.1%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="progressive conditions face largest pay penalty"
              sparklineData={[25.0, 25.2, 25.4, 25.6, 25.7, 25.8, 25.9, 26.0, 26.1]}
              onExpand={() => {}}
              source="ONS / Scope &middot; 2023"
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
