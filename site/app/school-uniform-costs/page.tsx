'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface UniformCostEntry {
  year: number
  avgAnnualCost: number
  lowestIncomePct?: number
}

interface UniformCostData {
  timeSeries: UniformCostEntry[]
  schoolsWithGrantsPct: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SchoolUniformCostsPage() {
  const [data, setData] = useState<UniformCostData | null>(null)

  useEffect(() => {
    fetch('/data/school-uniform-costs/school_uniform_costs.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'avgAnnualCost',
        label: 'Average annual uniform cost (£)',
        colour: '#F4A261',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgAnnualCost,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="School Uniform Costs" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Uniform Costs"
          question="How Much Is School Uniform Costing Families?"
          finding="A school uniform costs an average of £422 per child per year — consuming nearly 3% of the annual income of families in the poorest fifth."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The average cost of a school uniform in England reached £435 per child in 2024 — a 38% increase since 2015, outpacing general inflation. The rise reflects the mandatory use of branded school-specific items that cannot be bought from supermarkets, the growing number of academies setting their own requirements without the constraints applied to maintained schools, and post-pandemic clothing cost inflation. The School Uniforms Act 2021 required schools to have regard to cost and consult parents before introducing new items, but compliance has been inconsistent and enforcement mechanisms are weak. Only around 30% of schools offer uniform grants, second-hand sales, or exchange schemes — and those that do typically operate them on a discretionary basis with limited advertising.</p>
            <p>For families in the lowest income quintile, £435 represents approximately 2.8% of annual income — the equivalent of two weeks&rsquo; food spending — and the cost falls in a concentrated burst at the start of each academic year alongside stationery, PE kit, and bags. Families with multiple school-age children can face a total bill exceeding £1,000. Research consistently finds that children who cannot afford the correct uniform experience bullying, social exclusion, and reduced attendance; teachers report children being sent home for wearing incorrect items their families cannot replace. Uniform costs are not a minor issue — they are one of multiple financial pressures that determine whether children arrive at school ready to learn.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Cost Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual cost 2024"
              value="£435"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+38% since 2015 · outpacing general inflation"
              sparklineData={[316, 340, 372, 390, 410, 422, 435]}
              href="#sec-chart"source="Which? · School Uniform Survey 2024"
            />
            <MetricCard
              label="As % of lowest incomes"
              value="2.8%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="approaching 3% of poorest family incomes"
              sparklineData={[2.1, 2.2, 2.4, 2.5, 2.6, 2.8]}
              href="#sec-chart"source="Which? / DWP analysis · 2023"
            />
            <MetricCard
              label="Schools offering grants"
              value="30%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="only 3 in 10 schools offer uniform grants or exchanges"
              sparklineData={[28, 28, 29, 29, 30, 30]}
              href="#sec-chart"source="School Uniform Exchange Network · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Average annual school uniform cost per child, England, 2015–2024"
              subtitle="Average cost including all required items (blazer, trousers/skirt, shirts, PE kit, shoes). Cost has risen 38% since 2015, significantly outpacing general inflation."
              series={series}
              yLabel="Cost (£)"
              source={{
                name: 'Which? / The Children&rsquo;s Society',
                dataset: 'School Uniform Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Which? — Annual School Uniform Survey. Survey of parents on uniform costs. which.co.uk/news/article/school-uniform-costs/</p>
            <p>The Children&rsquo;s Society — School Uniform Report. Annual analysis of cost burden on low-income families. childrenssociety.org.uk/information/professionals/resources/school-uniform-report</p>
            <p>Department for Education — School Uniforms statutory guidance 2021. gov.uk/government/publications/school-uniforms</p>
            <p>Cost data reflects average spend on required uniform items for a secondary school child, based on survey of parents. Estimates for branded items assume school-specified suppliers. Income proportion calculated using DWP Households Below Average Income data. Schools with grant schemes figure from Children&rsquo;s Society survey of maintained schools and academies.</p>
          </div>
        </section>
      </main>
    </>
  )
}
