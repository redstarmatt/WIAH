'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface YoungPeopleCareData {
  childrenInCare: Array<{ year: number; children: number }>
  careLeaverOutcomes: Array<{ outcome: string; percent: number }>
  placementTypes2023: Array<{ type: string; percent: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function YoungPeopleCarePage() {
  const [data, setData] = useState<YoungPeopleCareData | null>(null)

  useEffect(() => {
    fetch('/data/young-people-care/young_people_care.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const childrenInCareSeries: Series[] = data
    ? [{
        id: 'children-in-care',
        label: 'Children in local authority care',
        colour: '#E63946',
        data: data.childrenInCare.map(d => ({
          date: yearToDate(d.year),
          value: d.children,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Children in Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children in Care"
          question="What happens to children who grow up in the care system?"
          finding="83,840 children were in local authority care in England in 2023 — up 38% since 2009. Only 6% of care leavers go to university, versus 43% of all young people. One in three care leavers is not in education, employment or training at age 19–21."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>83,840 children were in local authority care in England at March 2023 — a record, and 38% higher than the 60,900 in care in 2009. The overwhelming drivers are poverty and domestic abuse, not deliberate harm: the Child Welfare Inequalities Project found that children in the most deprived 10% of areas are 10 times more likely to be in care than those in the least deprived 10%. Outcomes for those who have been in care are dramatically worse than for the general population across almost every measure: only 6% enter university at 19 (vs 43% of all young people), 34% are NEET at age 19–21 (vs 11%), 25% become known to the criminal justice system before age 21, and an estimated 20% are homeless within two years of leaving care. The MacAlister review in 2022 found a market of profit-making residential care providers charging over £300,000 per child per year for placements associated with the poorest outcomes.</p>
            <p>The transition out of care — typically between 16 and 18 — is often the most dangerous moment, exposing young people to independent living far earlier than peers from stable families. The Staying Put programme allows care leavers to remain with foster carers until 21, but it does not cover those in residential care, and its uptake is uneven across local authorities. University participation has risen from 3% to 6% since 2012, but 6% remains a fraction of 43%. The 2023 Children's Social Care National Framework adopted some MacAlister recommendations but left others unfunded, and the fundamental challenge — how to support care leavers into a world of insecure work and unaffordable housing — remains incompletely answered.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-children', label: 'Children in Care Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children in care (March 2023)"
              value="83,840"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 38% since 2009 · poverty, domestic abuse, neglect driving rise"
              sparklineData={[60900, 67050, 69540, 75420, 80080, 82170, 83840]}
              source="DfE Children Looked After Statistics · 2023"
              href="#sec-children"/>
            <MetricCard
              label="Care leavers not in EET (age 19–21)"
              value="34"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="vs 11% for all young people · education gap starts in care"
              sparklineData={[35, 35, 34, 34, 34]}
              source="DfE Care Leaver Statistics · 2023"
              href="#sec-children"/>
            <MetricCard
              label="Care leavers going to university (age 19)"
              value="6"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 3% in 2012 · but still vs 43% of all young people"
              sparklineData={[3, 3, 4, 4, 5, 6]}
              source="DfE UCAS Care Leavers Statistics · 2023"
              href="#sec-children"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-children" className="mb-12">
            <LineChart
              title="Children in local authority care, England, 2009–2023"
              subtitle="Total children looked after at 31 March each year. England only."
              series={childrenInCareSeries}
              yLabel="Children in care"
              source={{
                name: 'DfE',
                dataset: 'Children looked after in England including adoptions',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DfE — Children looked after in England including adoptions. Annual statistical release. Available at explore-education-statistics.service.gov.uk.</p>
            <p>DfE — Care leavers aged 17 to 21 in England. Annual statistical release covering EET status, accommodation, and personal adviser contact. Available at explore-education-statistics.service.gov.uk.</p>
            <p>Become Charity — The Unchecked Ambition Report. Analysis of care leaver outcomes and systemic barriers. Available at becomecharity.org.uk.</p>
            <p>Children in care figures represent a point-in-time count at 31 March. They include children accommodated under Section 20 (voluntary arrangements) and those subject to care orders. EET status covers education, employment, and training including part-time study and apprenticeships. University participation draws on UCAS matched data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
