'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface ChildcareCostData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    annualCostUnder2: number
    parentsReducingWorkPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function ChildcareCostBarrierPage() {
  const [data, setData] = useState<ChildcareCostData | null>(null)

  useEffect(() => {
    fetch('/data/childcare-cost-barrier/childcare_cost_barrier.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'annualCostUnder2',
          label: 'Annual childcare cost (£)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.annualCostUnder2 })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Childcare Cost" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Childcare"
          question="Is Childcare Stopping Parents From Working?"
          finding="UK full-time childcare for a child under two now costs £14,000 per year — more than a mortgage — and 1 in 3 parents has reduced work hours or left employment because of costs."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The cost of childcare in the UK is among the highest in the OECD, consuming a greater share of family income than in almost any comparable country. Full-time childcare for a child under two years old now costs an average of £14,000 per year — a figure that in many areas exceeds the annual cost of a typical mortgage repayment and that has risen 39% since 2019. This cost falls primarily on families with children aged under three, the age at which government-funded hours typically begin. For dual-income families with two young children, childcare costs can exceed the net earnings of the lower-paid partner, creating a situation where working generates negligible or negative net income, particularly in London and the South East where both costs and wages are higher.</p>
            <p>The economic consequences of childcare unaffordability are significant and gender-skewed. The 2023 Pregnant Then Screwed survey found that 33% of parents had reduced working hours specifically because of childcare costs, with mothers more than twice as likely as fathers to have done so. This pattern is documented in the ONS Time Use Survey and in labour force statistics showing lower female employment rates for mothers of young children than for fathers or for women without children. The reduction in female labour force participation during the early childhood years creates lifetime wage and pension gaps — the 'motherhood penalty' — that compound over careers and into retirement.</p>
            <p>Government policy has attempted to address childcare costs through expanded funded hours. The flagship expansion announced in the 2023 Budget — extended 30 hours of funded childcare per week to children from 9 months rather than from 3 years — represents a significant and expensive intervention, with full implementation expected to cost approximately £4.1 billion per year. Rollout began in September 2024 for 2-year-olds and April 2024 for 3-4 year olds. Early evidence from rollout suggested significant provider capacity constraints: the supply of childcare places did not expand as quickly as the funded entitlement, and many areas experienced shortages of places for the expanded cohort, particularly for babies and toddlers who require higher staff ratios.</p>
            <p>Provider sustainability is the underlying structural challenge. The majority of childcare places in England are provided by private and voluntary sector nurseries operating on thin margins. The hourly rate paid by government for funded hours has historically been below providers' operating costs, meaning the funded hours model requires cross-subsidy from paying parents — a form of internal market distortion that has contributed to nursery closures, particularly in deprived areas where the proportion of paying parents is lower. Between 2019 and 2023, approximately 4,500 nurseries and childminding businesses closed in England, reducing the total number of registered childcare places.</p>
            <p>International comparisons are instructive. Countries with the most affordable childcare typically achieve this through publicly owned or heavily subsidised provision combined with below-market staff wages — a model with clear quality and equity trade-offs. The Nordic model of universal, heavily state-subsidised early childhood education and care is frequently cited but requires total public investment of 2-3% of GDP in childcare — substantially above the UK's current commitment. The UK's historically market-based approach has produced high costs, geographic inequality in provision quality, and a structural dependency on workforce pay suppression (childcare workers earning an average of £11.40 per hour in 2024) that makes the sector simultaneously too expensive for parents and financially precarious for providers.</p>
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
              label="Average annual cost (under-2)"
              value="£14,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+£3,200 since 2019 · exceeds average mortgage"
              sparklineData={[8500, 9000, 9500, 10000, 10500, 11000, 11800, 13000, 14000]}
              source="Coram Family and Childcare · Childcare Survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Parents reducing work for childcare"
              value="33%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="33% reduced hours or left work · 2× rate for mothers"
              sparklineData={[21, 22, 23, 24, 25, 28, 29, 31, 33]}
              source="Pregnant Then Screwed · Cost of Childcare Survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Government funded hours expansion"
              value="30 hours"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Expanded from 3yrs to 9 months from 2024"
              sparklineData={[15, 15, 15, 15, 15, 15, 15, 20, 30]}
              source="DfE · Childcare Policy Updates 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Average annual childcare cost for a child under 2, 2016–2024"
              subtitle="Full-time nursery cost for a child aged under 2 years (England, £ per year)."
              series={series}
              yLabel="Annual cost (£)"
              source={{ name: 'Coram Family and Childcare', dataset: 'Childcare Survey', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Average childcare costs from Coram Family and Childcare Childcare Survey (annual). Parental employment impact data from Pregnant Then Screwed Cost of Childcare Survey (2023, 2024). Government policy data from Department for Education childcare entitlement publications. Provider closure data from Ofsted childcare provider statistics.</p>
          </div>
        </section>
      </main>
    </>
  )
}
