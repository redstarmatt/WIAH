'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface ChildrenInCareEntry {
  year: number
  lacCount: number
  laCostBn?: number
}

interface ChildrenInCareData {
  timeSeries: ChildrenInCareEntry[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ChildrenInCarePage() {
  const [data, setData] = useState<ChildrenInCareData | null>(null)

  useEffect(() => {
    fetch('/data/children-in-care/children_in_care.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const lacCountSeries: Series[] = data
    ? [{
        id: 'lacCount',
        label: 'Children in local authority care',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.lacCount,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Children in Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children in Care"
          question="How Many Children Are in Care?"
          finding="83,840 children were in local authority care in England in 2023 &mdash; a 24% rise since 2010, driven by rising poverty and insufficient family support."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>83,840 children were in local authority care in England in 2023 &mdash; a record high and a 24% increase since 2010. Local authorities spent &pound;12.1 billion on children&rsquo;s social care in 2023, up from &pound;7.2 billion in 2010, with residential care averaging over &pound;6,000 per week per child. There are now 6,400 children in residential settings &mdash; up 42% since 2016 &mdash; as foster placement shortages push councils toward private equity-backed providers. Poverty is the strongest predictor of care entry; domestic abuse, parental mental illness, and substance misuse drive the majority of referrals, all worsened by the cost-of-living crisis. The Independent Review of Children&rsquo;s Social Care (2022) called for more family support, kinship care, and foster care investment, but implementation has been slow.</p>
            <p>Regional variation is stark and cannot be explained by need alone: North East authorities have some of England&rsquo;s highest rates of children in care per 10,000, while parts of London and the South East have far lower rates despite comparable deprivation. Escalating residential costs are crowding out the prevention spending that might intercept families before crisis. For the 13,000 young people leaving care each year at 18, outcomes are poor: 25% experience homelessness within two years, and around half are not in education, employment, or training.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Children in Care' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children in care"
              value="83,840"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+30% since 2010 &middot; record high"
              sparklineData={[64400, 67050, 68840, 70440, 75420, 80080, 83840]}
              href="#sec-chart"source="DfE &middot; Children Looked After Statistics 2023"
            />
            <MetricCard
              label="LA placement cost"
              value="&pound;12.1bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="residential care avg &pound;6,000+/week"
              sparklineData={[7.2, 8.0, 9.8, 10.5, 11.2, 12.0, 12.1]}
              href="#sec-chart"source="DfE &middot; Section 251 Outturn 2023"
            />
            <MetricCard
              label="Children in residential care"
              value="6,400"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up 42% since 2016 &middot; most expensive, least family-like"
              sparklineData={[4200, 4600, 5100, 5600, 5900, 6200, 6400]}
              href="#sec-chart"source="DfE &middot; Children Looked After Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Children in local authority care, England, 2010&ndash;2023"
              subtitle="Total children looked after at 31 March each year. Includes foster care, residential care, placed with parents and other placements."
              series={lacCountSeries}
              yLabel="Children in care"
              source={{
                name: 'Department for Education',
                dataset: 'Children Looked After in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Education &mdash; Children Looked After in England including Adoptions. Published annually. explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions</p>
            <p>Department for Education &mdash; Section 251 Outturn Data. Annual local authority children&rsquo;s services expenditure. Published by DfE.</p>
            <p>Children looked after (CLA) are defined as children under the care of a local authority, including those on care orders, accommodated under section 20 of the Children Act 1989, and those on remand. Figures are a snapshot at 31 March each year. Residential care figures include children&rsquo;s homes and other residential settings.</p>
          </div>
        </section>
      </main>
    </>
  )
}
