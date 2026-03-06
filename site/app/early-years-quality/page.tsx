'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface EarlyYearsEntry {
  year: number
  goodOutstandingPct: number
  childcareDesertChildrenM?: number
}

interface EarlyYearsData {
  timeSeries: EarlyYearsEntry[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function EarlyYearsQualityPage() {
  const [data, setData] = useState<EarlyYearsData | null>(null)

  useEffect(() => {
    fetch('/data/early-years-quality/early_years_quality.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'goodOutstandingPct',
        label: 'Good or Outstanding (%)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.goodOutstandingPct,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Early Years Quality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Early Years Quality"
          question="Is Early Years Care Actually Good Quality?"
          finding="96% of nurseries and childminders are rated Good or Outstanding by Ofsted — but 1.3 million children live in areas with too few childcare places."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The quality of early years provision in England has improved substantially over the past decade. In 2015, 82% of nurseries and childminders were rated Good or Outstanding by Ofsted; by 2023, that figure had risen to 96%, driven by the Early Years Foundation Stage framework, improved workforce qualifications, and rigorous inspection. The proportion rated Inadequate has fallen from around 1% to just 0.3%, with Ofsted&rsquo;s reinspection regime raising the floor of provision. But quality and access are different problems: an estimated 1.3 million children under 5 live in childcare deserts — areas with fewer than a third of the places needed — concentrated in rural, coastal, and deprived urban communities where providers cannot sustain operations on government funding rates. More than 40% of nurseries reported operating at a loss on funded places in 2023, and over 4,000 childcare providers closed between 2021 and 2023.</p>
            <p>The consequences of poor access fall heaviest on the least advantaged children. The cross-subsidy model — whereby funded hours are subsidised by fees from paying parents — fails in areas without enough fee-paying families, leaving disadvantaged children with the fewest places in the areas of greatest need. The early years workforce compounds this: childcare workers earn around £11–12 per hour on average, turnover is high, and the sector has an estimated 40,000 vacancies. Without adequate funding rates and improved workforce conditions, sustained quality improvement cannot reach the children who stand to benefit most from it.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Quality Trend' },
          { id: 'sec-callout', label: 'Positive Signal' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Good/Outstanding nurseries"
              value="96%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="near-universal quality · major improvement from 82% in 2015"
              sparklineData={[82, 86, 89, 92, 94, 94, 95, 96, 96]}
              href="#sec-chart"source="Ofsted · Early Years Inspection Data 2023"
            />
            <MetricCard
              label="Inadequate settings"
              value="0.3%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="very few inadequate providers · down from 1% in 2015"
              sparklineData={[1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.3]}
              href="#sec-callout"source="Ofsted · Early Years Inspection Data 2023"
            />
            <MetricCard
              label="Childcare deserts"
              value="1.3m children"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="improving but significant geography gaps remain"
              sparklineData={[1.6, 1.55, 1.5, 1.45, 1.4, 1.38, 1.36, 1.32, 1.3]}
              href="#sec-callout"source="Coram Family and Childcare · Childcare Survey 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Early years settings rated Good or Outstanding by Ofsted, England, 2015–2023"
              subtitle="Percentage of registered nurseries, pre-schools and childminders rated Good or Outstanding at their most recent Ofsted inspection. Rise from 82% to 96% reflects sustained quality improvement across the sector."
              series={series}
              yLabel="Good or Outstanding (%)"
              source={{
                name: 'Ofsted',
                dataset: 'Early Years Annual Report / Management Information',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="96% of Nurseries Rated Good or Outstanding"
              value="96%"
              unit="good or outstanding Ofsted ratings"
              description="Early years quality has improved dramatically over the past decade. The proportion of nurseries and childminders rated Good or Outstanding by Ofsted has risen from 82% to 96% — transforming the quality of care for millions of young children."
              source="Ofsted, Early Years Inspection Data, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ofsted — Early Years Annual Report. Annual statistical release covering inspection outcomes for all registered early years providers. gov.uk/government/collections/ofsted-annual-report</p>
            <p>Ofsted — Management Information: early years providers. Monthly statistical release of registered provider and inspection outcome data. gov.uk/government/statistical-data-sets/</p>
            <p>Coram Family and Childcare — Childcare Survey. Annual survey of childcare availability and affordability by local authority. familyandchildcaretrust.org</p>
            <p>Quality ratings apply to all Ofsted-registered early years providers at their most recent inspection, including day nurseries, pre-schools, childminders, and school-based provision. Childcare desert definition follows the Coram methodology: areas where the number of childcare places is less than one-third of the child population aged 0–4.</p>
          </div>
        </section>
      </main>
    </>
  )
}
