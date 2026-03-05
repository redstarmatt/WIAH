'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface FsmEntry {
  year: number
  eligibleFSM: number
  receivingFSM: number
  inPovertyNotEligible?: number
}

interface FsmData {
  timeSeries: FsmEntry[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FreeSchoolMealsGapPage() {
  const [data, setData] = useState<FsmData | null>(null)

  useEffect(() => {
    fetch('/data/free-school-meals-gap/free_school_meals_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'eligibleFSM',
          label: 'Children eligible for FSM',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.eligibleFSM,
          })),
        },
        {
          id: 'receivingFSM',
          label: 'Children receiving FSM',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.receivingFSM,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Free School Meals Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Free School Meals Gap"
          question="Are All Hungry Children Getting Free School Meals?"
          finding="870,000 children live in poverty but aren&rsquo;t eligible for free school meals because their family&rsquo;s income is just above the threshold."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The free school meals (FSM) system in England has a significant structural problem: eligibility is determined by a binary threshold set in 2018 when universal credit was introduced. A family with earned income below &pound;7,400 per year (after tax, excluding benefits) is eligible; above that, they are not. The threshold has not been uprated with inflation, excluding more families in real terms each year. The number of children eligible has risen from 1.54 million in 2020 to 2.2 million in 2023 &mdash; driven partly by threshold adjustments and partly by rising poverty rates &mdash; and uptake among eligible children is high at 95%. But an estimated 870,000 children live in poverty by standard measures yet do not qualify, leaving them in classrooms where other children receive free meals they cannot access.</p>
            <p>The threshold is also a poverty trap: because eligibility is lost when earned income exceeds &pound;7,400, some parents face a disincentive to increase their working hours, losing FSM entitlement worth around &pound;500 per child per year before their additional earnings compensate. Teachers increasingly report buying food for children who arrive hungry but are not on the FSM register &mdash; an informal safety net that depends on individual goodwill rather than policy design. The Greater London Authority introduced universal free school meals for all primary pupils in 2023; at national level the barrier to universalisation is cost, and the political will to fund reform of the threshold has been absent.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Eligible vs Receiving' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children eligible FSM"
              value="2.2m"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+59% since 2015 &middot; threshold adjusted"
              sparklineData={[1380000, 1390000, 1540000, 1790000, 1970000, 2080000, 2200000]}
              href="#sec-chart"source="DfE &middot; Schools, Pupils and their Characteristics 2023"
            />
            <MetricCard
              label="Uptake of eligible"
              value="95%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="almost all eligible children now claiming"
              sparklineData={[93, 94, 94, 94, 95, 95, 95]}
              href="#sec-chart"source="DfE &middot; Schools, Pupils and their Characteristics 2023"
            />
            <MetricCard
              label="Poverty gap children"
              value="870k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="in poverty but above UC threshold &middot; policy gap"
              sparklineData={[720000, 740000, 800000, 820000, 840000, 860000, 870000]}
              href="#sec-chart"source="CPAG / IFS analysis &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Children eligible for and receiving free school meals, England, 2015&ndash;2023"
              subtitle="Children eligible for free school meals (dark blue) and those actually receiving them (green). Gap between lines represents non-take-up. The larger gap is children in poverty who do not qualify."
              series={series}
              yLabel="Number of children"
              source={{
                name: 'Department for Education',
                dataset: 'Schools, Pupils and their Characteristics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Education &mdash; Schools, Pupils and their Characteristics. Annual statistical release. explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics</p>
            <p>Child Poverty Action Group &mdash; Free School Meals eligibility and poverty analysis. cpag.org.uk/policy-and-campaigns/briefings/free-school-meals</p>
            <p>Institute for Fiscal Studies &mdash; Free school meals: eligibility and coverage analysis. ifs.org.uk</p>
            <p>FSM eligibility is determined by whether a child&rsquo;s family receives qualifying benefits or has earned income below &pound;7,400 per year (net, excluding benefits) under universal credit. Poverty gap estimate uses DWP poverty statistics combined with FSM eligibility data to identify children below 60% median income who do not meet FSM criteria. Receiving figures exclude universal infant free school meals (all reception to Year 2 pupils).</p>
          </div>
        </section>
      </main>
    </>
  )
}
