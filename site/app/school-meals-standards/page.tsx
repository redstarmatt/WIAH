'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  meetingFoodStandardsPct: number
  fsmUptakePct: number
  uifsm5to7UptakePct?: number
}

interface SchoolMealsStandardsData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SchoolMealsStandardsPage() {
  const [data, setData] = useState<SchoolMealsStandardsData | null>(null)

  useEffect(() => {
    fetch('/data/school-meals-standards/school_meals_standards.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const mealsSeries: Series[] = data
    ? [
        {
          id: 'standards',
          label: 'Schools meeting food standards (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.meetingFoodStandardsPct,
          })),
        },
        {
          id: 'fsm-uptake',
          label: 'FSM uptake by eligible children (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fsmUptakePct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are School Meals Actually Nutritious?"
          finding="Schools broadly meet nutritional standards &mdash; but free school meal uptake falls well below eligibility, and primary school universality ends at Year 2."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>School food standards introduced in 2014 prescribe minimum nutritional requirements for school meals, and in 2023 89&percnt; of schools met them &mdash; up from 87&percnt; in 2015. Approximately 2.1 million pupils (24&percnt; of state school pupils) were eligible for free school meals in 2024, of whom 88&percnt; were actually claiming &mdash; leaving around 250,000 eligible children not receiving a meal. Universal Infant Free School Meals (UIFSM) provides a free meal to every Reception&ndash;Year 2 child regardless of income and has achieved 88&percnt; uptake, with strong evidence it improves attainment and reduces FSM stigma &mdash; but universality ends abruptly at Year 3. Food price inflation has pushed primary school meals to &pound;2.80&ndash;&pound;3.10, making the weekly cost roughly &pound;14&ndash;16 per child for non-eligible families and pushing some toward packed lunches of significantly worse nutritional quality.</p>
            <p>The 12&percnt; non-take-up gap &mdash; around 250,000 children &mdash; reflects stigma, administrative barriers, and low awareness, and is concentrated in the most deprived communities. Extending UIFSM to all primary years would cost approximately &pound;600 million annually; secondary extension would cost over &pound;1 billion. The previous government rejected both on cost grounds. For families with multiple school-age children, school meals represent a meaningful financial pressure that in aggregate determines whether children arrive at school ready to learn, and the children most affected by non-uptake and unaffordability are those whose nutrition matters most.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Meal Standards' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Schools meeting food standards"
              value="89%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="steady improvement &middot; primary &gt; secondary"
              sparklineData={[87, 88, 89, 88, 89, 89]}
              onExpand={() => {}}
              source="DfE &middot; School Food Standards Report 2024"
            />
            <MetricCard
              label="FSM uptake by eligible children"
              value="88%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="of eligible children claiming &middot; up from 84%"
              sparklineData={[84, 85, 85, 86, 87, 88]}
              onExpand={() => {}}
              source="DfE &middot; Free School Meals Statistics 2024"
            />
            <MetricCard
              label="Universal eligibility"
              value="Year 3+"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="UIFSM ends at Year 2 &middot; children 7+ lose free meal"
              sparklineData={[88, 88, 87, 88, 88, 88]}
              onExpand={() => {}}
              source="DfE &middot; UIFSM Programme Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="School food standards compliance and FSM uptake, 2015&ndash;2023"
              subtitle="Schools meeting nutritional food standards (green) and uptake by FSM-eligible children (dark). Percentages. England."
              series={mealsSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'DfE',
                dataset: 'School Food Standards / FSM Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Universal Free Meals for Under-7s"
            value="88%"
            unit="of eligible children taking FSM"
            description="Universal Infant Free School Meals (UIFSM) ensures every child in Reception to Year 2 gets a free school meal. 88% uptake is one of the highest rates for any school programme, reducing food insecurity and improving nutrition."
            source="Source: DfE, School Food Standards, 2024"
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DfE &mdash; School Food Standards. Compliance monitoring data. gov.uk/government/publications/school-food-standards-resources-for-schools</p>
            <p>DfE &mdash; Free School Meals: Eligibility and Uptake. Annual statistics. gov.uk/government/collections/statistics-pupils-characteristics</p>
            <p>Children&apos;s Food Trust &mdash; School Food Plan Impact Assessment. childrensfoodtrust.org.uk</p>
            <p>School food standards apply to all maintained schools in England. Academies were brought under the standards in 2014. Compliance assessed through Ofsted inspections and local authority monitoring. FSM uptake calculated as percentage of children registered for FSM among those eligible under DWP Universal Credit / qualifying benefit criteria.</p>
          </div>
        </section>
      </main>
    </>
  )
}
