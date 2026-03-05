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
            <p>School food standards in England &mdash; introduced in 2014 following the School Food Plan review &mdash; prescribe minimum nutritional requirements for school meals: the proportion of fruit and vegetables, limits on salt and saturated fat, requirements for protein and carbohydrate, and restrictions on unhealthy foods like confectionery and fizzy drinks. In 2023, 89% of schools were meeting these standards, up from 87% in 2015. This is genuine progress. But meeting the standards does not guarantee that all children who need a nutritious meal are receiving one.</p>
            <p>Free school meal (FSM) eligibility covers children from households receiving certain means-tested benefits, including Universal Credit below an income threshold of &pound;7,400. In 2024, approximately 24% of pupils in state schools were eligible for free school meals &mdash; around 2.1 million children. Of those, 88% were actually claiming and receiving a free school meal, up from 84% in 2015. The 12% gap &mdash; around 250,000 eligible children who are not claiming &mdash; reflects a combination of stigma, administrative barriers, lack of awareness, and in some cases practical difficulties with the registration process.</p>
            <p>The Universal Infant Free School Meals (UIFSM) policy, which provides a free school meal to every child in Reception through Year 2 regardless of family income, has been one of the more successful universal policies in English education. Uptake of 88% in 2023 is among the highest for any school programme. Evidence suggests that UIFSM improves educational attainment, reduces the stigma of FSM among younger children, and improves nutrition for children from low-income families who might not have qualified for means-tested FSM. However, universality ends abruptly at the start of Year 3, when children aged 7 or 8 either qualify for means-tested FSM or their parents pay the full meal cost.</p>
            <p>The cost of school meals has risen significantly with food price inflation. In 2023&ndash;24, the average primary school meal cost &pound;2.80&ndash;&pound;3.10, with secondary school meals averaging slightly higher. For families not entitled to FSM, the weekly cost of school meals &mdash; around &pound;14&ndash;16 per child &mdash; represents a meaningful household expenditure. The inflation in meal costs has led some families who previously used school meals to switch to packed lunches, with evidence suggesting that the nutritional quality of packed lunches is significantly worse on average than school meals that meet food standards.</p>
            <p>The case for expanding universal free school meals is made regularly by education charities, health organisations, and food policy advocates. The evidence from UIFSM demonstrates both feasibility and benefit. The argument against is primarily financial: extending UIFSM to all primary years would cost approximately &pound;600 million annually; extending it to secondary would cost over &pound;1 billion. The previous government rejected these extensions on cost grounds. Whether the current government&apos;s commitment to child poverty reduction will translate into expanded FSM provision remains to be seen, but the evidence base for expansion is strong and growing.</p>
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
