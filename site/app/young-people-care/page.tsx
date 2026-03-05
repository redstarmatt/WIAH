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
          finding="83,840 children were in local authority care in England in 2023 &mdash; up 38% since 2009. Only 6% of care leavers go to university, versus 43% of all young people. One in three care leavers is not in education, employment or training at age 19&ndash;21."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>83,840 children were in local authority care in England at March 2023 &mdash; a record, and 38% higher than the 60,900 in care in 2009. The rise is not explained by increases in child abuse alone. The overwhelming drivers are poverty and domestic abuse: the majority of children entering care do so because their family circumstances have made adequate parenting impossible, not because of deliberate harm. Research by the Child Welfare Inequalities Project found that children in the most deprived 10% of areas are 10 times more likely to be looked after than those in the least deprived 10%. The care system is, in substantial part, a poverty intervention that operates by removing children rather than supporting families.</p>
            <p>The outcomes for children who have been in care are dramatically worse than for the general population across almost every measure. Only 6% of care leavers enter university at age 19, compared with 43% of all young people. 34% are not in education, employment or training (EET) at age 19&ndash;21, against approximately 11% of all young people in that age group. 25% of care leavers become known to the criminal justice system before the age of 21. An estimated 20% become homeless within two years of leaving care. 44% are known to the Department for Work and Pensions as benefit claimants. These outcomes reflect a failure not of the children but of the systems that are supposed to support them.</p>
            <p>The placement system shapes these outcomes significantly. In 2023, 46% of children in care were in foster care with non-relative carers, 18% were in kinship arrangements (with relatives or family friends), 11% were in residential care homes, and 7% were placed back with their parents under supervision. Residential care is the highest-cost placement and is associated with the poorest outcomes, yet its use has remained stubbornly persistent. An independent review by Josh MacAlister in 2022 found that a market of profit-making residential care providers had grown substantially, with some providers charging over &pound;300,000 per child per year for placements that produced poor outcomes.</p>
            <p>The transition from care to independence &mdash; &apos;leaving care&apos; &mdash; is often the most dangerous moment. Most young people leave the care system between 16 and 18, far younger than young people from stable families typically become independent. The Staying Put programme, introduced in England in 2014, allows care leavers to remain with their foster carers up to age 21. Its uptake is valuable but uneven, and it does not help those in residential care. Personal advisers are allocated to care leavers until age 25 under the Children and Social Work Act 2017, but their effectiveness depends heavily on caseload and resource availability, which varies dramatically between local authorities.</p>
            <p>University participation among care leavers has improved: the DfE&apos;s partnership with UCAS has produced a steady rise from approximately 3% in 2012 to 6% in 2023. Virtual school heads &mdash; local authority staff responsible for championing the educational progress of children in care &mdash; have contributed to narrowing some gaps in attainment. But 6% remains a fraction of 43%. The MacAlister review recommended a &apos;care experience&apos; protected characteristic to prevent discrimination, a national investment fund for care leavers, and mandatory reporting of care leaver outcomes by local authorities. The 2023 Children&apos;s Social Care National Framework adopted some recommendations but left others unfunded. The fundamental challenge &mdash; how to adequately support young people who are leaving care into a world of insecure work and unaffordable housing &mdash; remains incompletely answered.</p>
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
              changeText="Up 38% since 2009 &middot; poverty, domestic abuse, neglect driving rise"
              sparklineData={[60900, 67050, 69540, 75420, 80080, 82170, 83840]}
              source="DfE Children Looked After Statistics &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Care leavers not in EET (age 19&ndash;21)"
              value="34"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="vs 11% for all young people &middot; education gap starts in care"
              sparklineData={[35, 35, 34, 34, 34]}
              source="DfE Care Leaver Statistics &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Care leavers going to university (age 19)"
              value="6"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 3% in 2012 &middot; but still vs 43% of all young people"
              sparklineData={[3, 3, 4, 4, 5, 6]}
              source="DfE UCAS Care Leavers Statistics &middot; 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-children" className="mb-12">
            <LineChart
              title="Children in local authority care, England, 2009&ndash;2023"
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
            <p>DfE &mdash; Children looked after in England including adoptions. Annual statistical release. Available at explore-education-statistics.service.gov.uk.</p>
            <p>DfE &mdash; Care leavers aged 17 to 21 in England. Annual statistical release covering EET status, accommodation, and personal adviser contact. Available at explore-education-statistics.service.gov.uk.</p>
            <p>Become Charity &mdash; The Unchecked Ambition Report. Analysis of care leaver outcomes and systemic barriers. Available at becomecharity.org.uk.</p>
            <p>Children in care figures represent a point-in-time count at 31 March. They include children accommodated under Section 20 (voluntary arrangements) and those subject to care orders. EET status covers education, employment, and training including part-time study and apprenticeships. University participation draws on UCAS matched data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
