'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface FosterPlacementEntry {
  year: number
  fosterCarers: number
  shortfall: number
  emergencyPlacements?: number
}

interface FosterPlacementData {
  timeSeries: FosterPlacementEntry[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FosterPlacementShortagePage() {
  const [data, setData] = useState<FosterPlacementData | null>(null)

  useEffect(() => {
    fetch('/data/foster-placement-shortage/foster_placement_shortage.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'fosterCarers',
          label: 'Approved foster carers',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fosterCarers,
          })),
        },
        {
          id: 'shortfall',
          label: 'Carer shortfall',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.shortfall,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Foster Placement Shortage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Foster Placement Shortage"
          question="Are There Enough Foster Carers?"
          finding="England needs 8,700 more foster carers &mdash; meaning one in three children who needs fostering cannot be placed locally, often entering costly residential care instead."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has a structural and worsening shortage of foster carers. The number of approved foster carers has declined from around 55,000 in 2015 to 53,500 in 2023 &mdash; while the number of children needing placement has risen sharply. The Fostering Network estimates a shortfall of 8,700 carers nationwide, meaning one in three children who needs a foster placement cannot be matched with a local carer. Recruitment campaigns repeatedly fail to close the gap because low allowances, poor professional recognition, and inadequate support make fostering unattractive for working-age adults. Emergency placements &mdash; where a child is placed at short notice without proper matching &mdash; have risen to 11,400 annually.</p>
            <p>Children who cannot be matched locally are placed far from their schools, communities, and families, or into residential care costing over &pound;6,000 per week. The shortfall drives a negative spiral: more children in care means more pressure on placements, and the shortage of placements diverts resources into costly residential provision that crowds out prevention. Teenagers with complex needs and unaccompanied asylum-seeking children are hardest to place, and placement instability &mdash; one of the strongest predictors of poor outcomes &mdash; is becoming structurally harder to avoid.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Carers vs Shortfall' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Foster carer shortfall"
              value="8,700"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="doubled since 2015 &middot; recruitment and retention crisis"
              sparklineData={[4200, 4600, 5100, 5600, 6100, 6600, 7100, 7800, 8700]}
              href="#sec-chart"source="The Fostering Network &middot; 2023"
            />
            <MetricCard
              label="Foster carers in England"
              value="53,500"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="declining despite rising demand"
              sparklineData={[55000, 54800, 54600, 54400, 54200, 54000, 53800, 53600, 53500]}
              href="#sec-chart"source="Ofsted &middot; Fostering in England 2023"
            />
            <MetricCard
              label="Emergency placements"
              value="11,400"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="children placed in emergency &middot; placement instability harms outcomes"
              sparklineData={[8200, 8600, 9000, 9800, 10200, 10600, 11000, 11400]}
              href="#sec-chart"source="DfE &middot; Children Looked After Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Foster carers and shortfall, England, 2015&ndash;2023"
              subtitle="Approved foster carers (left axis, blue) and estimated shortfall of carers needed (right axis, red). Shortfall has doubled while carer numbers have declined."
              series={series}
              yLabel="Number"
              source={{
                name: 'The Fostering Network / Ofsted',
                dataset: 'Fostering in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ofsted &mdash; Fostering in England. Annual statistical release covering approved foster carers, households, and placements. gov.uk/government/statistics/fostering-in-england-1-april-2022-to-31-march-2023</p>
            <p>The Fostering Network &mdash; Annual State of the Nation report on foster carer supply. thefosteringnetwork.org.uk</p>
            <p>Department for Education &mdash; Children Looked After in England. explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions</p>
            <p>Shortfall figures are The Fostering Network estimates based on number of children requiring fostering minus available approved carer households. Emergency placement data from DfE placement type breakdowns.</p>
          </div>
        </section>
      </main>
    </>
  )
}
