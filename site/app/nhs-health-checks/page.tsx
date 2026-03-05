'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface HealthCheckDataPoint {
  year: number
  invited: number
  completed: number
  uptakePct: number
}

interface NhsHealthChecksData {
  topic: string
  lastUpdated: string
  timeSeries: HealthCheckDataPoint[]
  deprivationGap: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function NhsHealthChecksPage() {
  const [data, setData] = useState<NhsHealthChecksData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-health-checks/nhs_health_checks.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const uptakeSeries: Series[] = data
    ? [{
        id: 'uptake',
        label: 'NHS Health Check uptake (%)',
        colour: '#F4A261',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.uptakePct })),
      }]
    : []

  return (
    <>
      <TopicNav topic="NHS Health Checks" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Health Checks"
          question="Are You Getting an NHS Health Check?"
          finding="Only 48% of eligible people offered an NHS Health Check actually complete one, with large gaps by deprivation."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The NHS Health Check is a free check-up for adults aged 40&ndash;74 who do not already have a diagnosed cardiovascular condition or diabetes. It assesses risk of heart disease, stroke, diabetes and kidney disease, and is offered once every five years. The programme was launched in 2009 with the explicit aim of identifying people at risk before they become ill &mdash; a preventive intervention with strong evidence of cost-effectiveness. Yet in 2023, only 48% of people offered a check actually completed one &mdash; down from 58% in 2015.</p>
            <p>The COVID-19 pandemic is part of the explanation. In 2020, GP surgeries suspended routine health checks and the programme almost entirely ceased: only 310,000 checks were completed, compared to 980,000 the previous year. Recovery has been slow. By 2023, the number completing a check had reached 624,000 &mdash; still 36% below pre-pandemic levels. Some of this shortfall represents people who have now aged out of the eligible cohort without being checked; others represent deferred risk detection that will translate into later-stage diagnoses.</p>
            <p>The deprivation gap is the most concerning feature of the data. Uptake in the wealthiest quintile is around 57%, while in the most deprived quintile it falls to 39% &mdash; an 18 percentage point gap. This inverse relationship is exactly the wrong way round: people in deprived areas have higher cardiovascular risk, higher smoking rates, higher obesity prevalence, and less access to healthcare generally. They stand to gain most from early identification of risk factors, yet are least likely to receive it. This pattern, known as the inverse care law, recurs throughout NHS preventive services.</p>
            <p>The barriers to uptake in deprived communities are well understood: appointment times that conflict with working patterns, language barriers, digital access requirements for online booking, distrust of healthcare institutions, and practical logistics including childcare and transport. GP practices in deprived areas are also more pressured: with larger list sizes, higher consultation demand, and fewer resources for proactive care, health checks compete with acute demand for staff time. Some ICBs have experimented with community venue delivery, extended hours, and outreach workers with measurable effect &mdash; but these have not been adopted nationally.</p>
            <p>The Health Check programme is estimated to detect 1,600 cases of Type 2 diabetes per year, 22,000 people at high risk of diabetes, and 20,500 people at high risk of cardiovascular disease. NHS England modelling suggests that achieving 66% uptake would prevent over 4,000 heart attacks and strokes annually. The gap between current and target performance is therefore not an abstraction &mdash; it translates into thousands of preventable deaths and hospital admissions each year. Investment in making the programme work equitably is investment in reducing demand on acute services.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Uptake Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS Health Check uptake"
              value="48.0%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="down from 58% in 2015 &middot; COVID dip not recovered"
              sparklineData={[58.3, 58.0, 57.6, 57.9, 55.4, 43.7, 52.5, 48.0]}
              onExpand={() => {}}
              source="NHS England &middot; NHS Health Check Data 2023"
            />
            <MetricCard
              label="Deprivation gap"
              value="18pp"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="wealthiest 57% vs most deprived 39%"
              sparklineData={[10, 11, 12, 13, 15, 14, 16, 18]}
              onExpand={() => {}}
              source="NHS England &middot; Health Check Inequalities Analysis 2023"
            />
            <MetricCard
              label="Checks completed"
              value="624k"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="vs 980k in 2015 &middot; 360k fewer per year"
              sparklineData={[980000, 940000, 910000, 880000, 820000, 310000, 530000, 624000]}
              onExpand={() => {}}
              source="NHS England &middot; NHS Health Check Data 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS Health Check uptake, England, 2015&ndash;2023"
              subtitle="Percentage of those offered an NHS Health Check who completed one. Target: 66% uptake."
              series={uptakeSeries}
              yLabel="Uptake (%)"
              source={{
                name: 'NHS England',
                dataset: 'NHS Health Check Data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; NHS Health Check programme data. Published annually. england.nhs.uk/ourwork/prevention/heartdisease/nhs-health-check/</p>
            <p>Public Health England &mdash; NHS Health Check: Best practice guidance. 2019. gov.uk/government/publications/nhs-health-check-best-practice-guidance</p>
            <p>Uptake is defined as the number completing a valid NHS Health Check divided by the number eligible and invited within the financial year. Eligible population is adults aged 40&ndash;74 not currently under treatment for cardiovascular disease, diabetes, chronic kidney disease, hypertension, atrial fibrillation, or familial hypercholesterolaemia. Deprivation gap figures are from PHE analysis using Index of Multiple Deprivation quintiles.</p>
          </div>
        </section>
      </main>
    </>
  )
}
