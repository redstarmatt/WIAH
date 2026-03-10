'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

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
            <p>UK full-time childcare for a child under two now costs an average of £14,000 per year — up 39% since 2019 and more than a typical mortgage in many areas. For dual-income families with two young children, costs can exceed the net earnings of the lower-paid partner, making work financially irrational. The flagship 2023 Budget expansion extends 30 funded hours per week to children from 9 months, at an estimated £4.1 billion per year, but early rollout exposed severe provider capacity constraints: approximately 4,500 nurseries and childminding businesses closed between 2019 and 2023, and the hourly government rate for funded hours has historically fallen below providers&rsquo; operating costs.</p>
            <p>The economic consequences of unaffordability are sharply gendered. The Pregnant Then Screwed 2023 survey found that 33% of parents had reduced working hours or left employment because of childcare costs, with mothers more than twice as likely as fathers to have done so. This reduction in female labour force participation during the early childhood years creates lifetime wage and pension gaps — the &ldquo;motherhood penalty&rdquo; — that compound over careers. Childcare workers earned an average of £11.40 per hour in 2024, making the sector simultaneously too expensive for families and financially precarious for providers, with access and quality worst in the most deprived areas.</p>
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
              href="#sec-chart"/>
            <MetricCard
              label="Parents reducing work for childcare"
              value="33%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="33% reduced hours or left work · 2× rate for mothers"
              sparklineData={[21, 22, 23, 24, 25, 28, 29, 31, 33]}
              source="Pregnant Then Screwed · Cost of Childcare Survey 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Government funded hours expansion"
              value="30 hours"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Expanded from 3yrs to 9 months from 2024"
              sparklineData={[15, 15, 15, 15, 15, 15, 15, 20, 30]}
              source="DfE · Childcare Policy Updates 2024"
              href="#sec-chart"/>
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
              <RelatedTopics />
      </main>
    </>
  )
}
