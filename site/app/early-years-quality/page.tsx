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
          finding="96% of nurseries and childminders are rated Good or Outstanding by Ofsted &mdash; but 1.3 million children live in areas with too few childcare places."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The quality of early years provision in England has improved dramatically over the past decade. In 2015, 82% of nurseries and childminders were rated Good or Outstanding by Ofsted; by 2023, that figure had risen to 96%. This is a genuine transformation, driven by sustained investment in the Early Years Foundation Stage framework, improved workforce qualifications, and rigorous inspection. For the millions of young children who attend early years settings each year, the quality of care and education they receive is now significantly better than it was a decade ago.</p>
            <p>The proportion of settings rated Inadequate has fallen from around 1% in 2015 to just 0.3% in 2023. Requires Improvement ratings have also declined. Ofsted&rsquo;s inspection regime &mdash; which applies to all registered childcare providers &mdash; has created consistent accountability across the sector. When a setting is judged Inadequate, it faces reinspection within six months and risks deregistration if it does not improve. This enforcement mechanism has raised the floor of provision substantially.</p>
            <p>However, quality and access are different problems. While almost all settings that exist are now Good or Outstanding, too few settings exist in many parts of England. An estimated 1.3 million children under 5 live in &lsquo;childcare deserts&rsquo; &mdash; areas where there are fewer than a third of the childcare places needed to meet demand. Deserts are concentrated in rural areas, coastal communities, and deprived urban neighbourhoods. The market logic that drives childcare supply &mdash; providers open where they can be financially viable &mdash; systematically underserves areas where parents cannot afford fees and state funding is insufficient to cover costs.</p>
            <p>The expansion of funded hours entitlements &mdash; 15 hours for all 3 and 4 year olds, extended to 30 hours for eligible working parents, and now extending down to 9-month-olds under 2024 reforms &mdash; has increased the number of children accessing early years provision. But providers consistently report that the government&rsquo;s hourly funding rates do not cover the actual cost of delivery. The gap between funded rates and delivery costs must be cross-subsidised by fee-paying parents, creating a system where affordable provision for disadvantaged families depends on expensive provision for better-off families in the same setting. In areas without enough fee-paying parents, this model fails.</p>
            <p>The early years sector workforce remains a persistent concern. Childcare workers are among the lowest-paid workers in England: average wages are around &pound;11-12 per hour, and turnover is high. The sector has struggled to attract and retain qualified staff, particularly as wages in competing sectors like retail and hospitality have risen. Improving quality requires improving workforce conditions, which requires higher funding rates. The political commitment to improving early years provision &mdash; now enshrined in major funding commitments &mdash; will only translate into sustained quality improvement if the workforce that delivers it is properly valued and compensated.</p>
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
              changeText="near-universal quality &middot; major improvement from 82% in 2015"
              sparklineData={[82, 86, 89, 92, 94, 94, 95, 96, 96]}
              onExpand={() => {}}
              source="Ofsted &middot; Early Years Inspection Data 2023"
            />
            <MetricCard
              label="Inadequate settings"
              value="0.3%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="very few inadequate providers &middot; down from 1% in 2015"
              sparklineData={[1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.3]}
              onExpand={() => {}}
              source="Ofsted &middot; Early Years Inspection Data 2023"
            />
            <MetricCard
              label="Childcare deserts"
              value="1.3m children"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="improving but significant geography gaps remain"
              sparklineData={[1.6, 1.55, 1.5, 1.45, 1.4, 1.38, 1.36, 1.32, 1.3]}
              onExpand={() => {}}
              source="Coram Family and Childcare &middot; Childcare Survey 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Early years settings rated Good or Outstanding by Ofsted, England, 2015&ndash;2023"
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
              description="Early years quality has improved dramatically over the past decade. The proportion of nurseries and childminders rated Good or Outstanding by Ofsted has risen from 82% to 96% &mdash; transforming the quality of care for millions of young children."
              source="Ofsted, Early Years Inspection Data, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ofsted &mdash; Early Years Annual Report. Annual statistical release covering inspection outcomes for all registered early years providers. gov.uk/government/collections/ofsted-annual-report</p>
            <p>Ofsted &mdash; Management Information: early years providers. Monthly statistical release of registered provider and inspection outcome data. gov.uk/government/statistical-data-sets/</p>
            <p>Coram Family and Childcare &mdash; Childcare Survey. Annual survey of childcare availability and affordability by local authority. familyandchildcaretrust.org</p>
            <p>Quality ratings apply to all Ofsted-registered early years providers at their most recent inspection, including day nurseries, pre-schools, childminders, and school-based provision. Childcare desert definition follows the Coram methodology: areas where the number of childcare places is less than one-third of the child population aged 0&ndash;4.</p>
          </div>
        </section>
      </main>
    </>
  )
}
