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
          finding="A school uniform costs an average of &pound;422 per child per year &mdash; consuming nearly 3% of the annual income of families in the poorest fifth."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The average cost of a school uniform in England reached &pound;422 per child in 2023 and is projected to reach &pound;435 in 2024 &mdash; a 38% increase since 2015. This compares unfavourably with general consumer price inflation over the same period. The rise reflects several factors: the mandatory use of branded, school-specific items that cannot be purchased from supermarkets or discount retailers; the growing number of academies setting their own uniform requirements without the constraints that applied to maintained schools; and the general inflationary pressure on clothing costs post-pandemic.</p>
            <p>For families in the lowest income quintile, a &pound;435 uniform cost represents approximately 2.8% of annual income &mdash; a proportion that has been rising and is approaching 3%. This is not a trivial expense: it is the equivalent of two weeks&rsquo; food spending for a typical low-income family. The cost falls at the start of each academic year, creating a concentrated financial shock that coincides with other back-to-school expenses including stationery, PE kit, and bags. For families with multiple school-age children, the total uniform bill can easily exceed &pound;1,000.</p>
            <p>The School Uniforms Act 2021 required schools to have regard to cost in setting their uniform policies and to consult parents before introducing new items. Statutory guidance issued in 2021 set out expectations around limiting the number of branded items and ensuring affordability. However, compliance has been inconsistent and enforcement mechanisms are weak. Schools that ignore the guidance face little consequence, and parents have limited effective routes for challenge. The guidance has had some effect, but it has not resolved the underlying problem.</p>
            <p>Only around 30% of schools offer uniform grants, second-hand sales, or exchange schemes that might reduce the cost for families who struggle. Many schools that do offer grants operate them on a discretionary basis with limited advertising, meaning that families who most need support may not know it is available or may face stigma in requesting it. The patchwork of local provision &mdash; some charities, some school funds, some local authority top-up payments &mdash; is no substitute for a systematic entitlement.</p>
            <p>The consequences of uniform costs are not merely financial. Research consistently finds that children who cannot afford the correct uniform are more likely to experience bullying, social exclusion, and reduced school attendance. Teachers report incidents where children are sent home for wearing incorrect uniform items that their families cannot afford to replace. In the context of a cost-of-living crisis, uniform costs are one of multiple financial pressures on families with children that, in aggregate, determine whether children arrive at school in a state to learn. They are not a minor policy issue &mdash; they are a children&rsquo;s welfare issue.</p>
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
              value="&pound;435"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+38% since 2015 &middot; outpacing general inflation"
              sparklineData={[316, 340, 372, 390, 410, 422, 435]}
              onExpand={() => {}}
              source="Which? &middot; School Uniform Survey 2024"
            />
            <MetricCard
              label="As % of lowest incomes"
              value="2.8%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="approaching 3% of poorest family incomes"
              sparklineData={[2.1, 2.2, 2.4, 2.5, 2.6, 2.8]}
              onExpand={() => {}}
              source="Which? / DWP analysis &middot; 2023"
            />
            <MetricCard
              label="Schools offering grants"
              value="30%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="only 3 in 10 schools offer uniform grants or exchanges"
              sparklineData={[28, 28, 29, 29, 30, 30]}
              onExpand={() => {}}
              source="School Uniform Exchange Network &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Average annual school uniform cost per child, England, 2015&ndash;2024"
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
            <p>Which? &mdash; Annual School Uniform Survey. Survey of parents on uniform costs. which.co.uk/news/article/school-uniform-costs/</p>
            <p>The Children&rsquo;s Society &mdash; School Uniform Report. Annual analysis of cost burden on low-income families. childrenssociety.org.uk/information/professionals/resources/school-uniform-report</p>
            <p>Department for Education &mdash; School Uniforms statutory guidance 2021. gov.uk/government/publications/school-uniforms</p>
            <p>Cost data reflects average spend on required uniform items for a secondary school child, based on survey of parents. Estimates for branded items assume school-specified suppliers. Income proportion calculated using DWP Households Below Average Income data. Schools with grant schemes figure from Children&rsquo;s Society survey of maintained schools and academies.</p>
          </div>
        </section>
      </main>
    </>
  )
}
