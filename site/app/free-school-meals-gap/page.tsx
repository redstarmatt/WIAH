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
            <p>The free school meals (FSM) system in England is designed to ensure that children in low-income families receive at least one nutritious meal a day. But the system has a significant structural problem: eligibility is determined by a binary threshold that creates a cliff edge. A family in which the parent earns &pound;7,400 per year (after tax, excluding benefits) from employment is eligible; a family earning &pound;7,401 is not. This threshold, set in 2018 when universal credit was introduced, has not been uprated with inflation &mdash; meaning it excludes more families each year in real terms.</p>
            <p>The consequence is that an estimated 870,000 children live in poverty by standard measures but do not qualify for free school meals under current rules. These children are in families that earn just above the threshold or receive benefits that disqualify them from eligibility. They sit in classrooms where other children receive free meals that they cannot access. Teachers increasingly report buying food for children who arrive hungry but are not on the FSM register &mdash; an informal safety net that depends on individual teacher goodwill rather than policy design.</p>
            <p>The number of children eligible for FSM has risen substantially since 2020, from 1.54 million to 2.2 million in 2023 &mdash; an increase driven partly by threshold adjustments and partly by rising poverty rates associated with the cost-of-living crisis. Uptake of FSM among eligible children is high at around 95%, which is a genuine policy success: automatic registration systems, reduced stigma, and effective school-based administration have minimised non-take-up. But high uptake of an inadequately targeted scheme still leaves hundreds of thousands of hungry children without support.</p>
            <p>Universal free school meals for all primary school children &mdash; currently available to all reception to Year 2 pupils (Infants&rsquo; Free School Meals) &mdash; represent a different model. Where it has been applied to all primary pupils, as in London under the Universal Free School Meals scheme introduced by the Greater London Authority in 2023, it eliminates the eligibility problem entirely and has been associated with improved attendance and concentration. The national case for universalisation is strong on both welfare and educational grounds; the barrier is cost.</p>
            <p>The FSM threshold is also a poverty trap. Because eligibility is lost when earned income exceeds &pound;7,400, some parents are effectively penalised for increasing their working hours: they lose FSM eligibility (worth around &pound;500 per child per year) before their additional earnings compensate. This is a disincentive embedded in the welfare system that works against the stated policy goal of encouraging paid employment. Reform of the threshold &mdash; raising it, tapering it, or moving to a continuous income-based calculation &mdash; is technically straightforward. The political will to fund it has been absent.</p>
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
              onExpand={() => {}}
              source="DfE &middot; Schools, Pupils and their Characteristics 2023"
            />
            <MetricCard
              label="Uptake of eligible"
              value="95%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="almost all eligible children now claiming"
              sparklineData={[93, 94, 94, 94, 95, 95, 95]}
              onExpand={() => {}}
              source="DfE &middot; Schools, Pupils and their Characteristics 2023"
            />
            <MetricCard
              label="Poverty gap children"
              value="870k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="in poverty but above UC threshold &middot; policy gap"
              sparklineData={[720000, 740000, 800000, 820000, 840000, 860000, 870000]}
              onExpand={() => {}}
              source="CPAG / IFS analysis &middot; 2023"
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
