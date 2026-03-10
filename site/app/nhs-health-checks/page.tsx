'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

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
            <p>The NHS Health Check programme offers free cardiovascular risk assessments to adults aged 40–74 every five years. Launched in 2009, it is estimated to detect 1,600 cases of Type 2 diabetes and 20,500 people at high cardiovascular risk each year, with NHS England modelling suggesting that reaching the 66% uptake target would prevent over 4,000 heart attacks and strokes annually. Yet only 48% of those offered a check completed one in 2023 — down from 58% in 2015. COVID-19 collapsed the programme in 2020 to just 310,000 checks, and recovery to 624,000 by 2023 still leaves it 36% below pre-pandemic levels, with a cohort of people who have aged through the eligible window without being assessed.</p>
            <p>The deprivation gap is the most consequential feature of the data: uptake is 57% in the wealthiest quintile but only 39% in the most deprived — an 18 percentage point gap that runs exactly the wrong way, since deprived communities carry higher cardiovascular risk, higher smoking rates, and higher obesity prevalence. GP practices in deprived areas, with larger list sizes and higher acute demand, struggle to resource proactive outreach; appointment times conflict with working patterns; digital booking creates a barrier for many. Some ICBs have achieved gains through community venue delivery and outreach workers, but without national adoption the inverse care law persists.</p>
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
              changeText="down from 58% in 2015 · COVID dip not recovered"
              sparklineData={[58.3, 58.0, 57.6, 57.9, 55.4, 43.7, 52.5, 48.0]}
              href="#sec-chart"source="NHS England · NHS Health Check Data 2023"
            />
            <MetricCard
              label="Deprivation gap"
              value="18pp"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="wealthiest 57% vs most deprived 39%"
              sparklineData={[10, 11, 12, 13, 15, 14, 16, 18]}
              href="#sec-chart"source="NHS England · Health Check Inequalities Analysis 2023"
            />
            <MetricCard
              label="Checks completed"
              value="624k"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="vs 980k in 2015 · 360k fewer per year"
              sparklineData={[980000, 940000, 910000, 880000, 820000, 310000, 530000, 624000]}
              href="#sec-chart"source="NHS England · NHS Health Check Data 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS Health Check uptake, England, 2015–2023"
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
            <p>NHS England — NHS Health Check programme data. Published annually. england.nhs.uk/ourwork/prevention/heartdisease/nhs-health-check/</p>
            <p>Public Health England — NHS Health Check: Best practice guidance. 2019. gov.uk/government/publications/nhs-health-check-best-practice-guidance</p>
            <p>Uptake is defined as the number completing a valid NHS Health Check divided by the number eligible and invited within the financial year. Eligible population is adults aged 40–74 not currently under treatment for cardiovascular disease, diabetes, chronic kidney disease, hypertension, atrial fibrillation, or familial hypercholesterolaemia. Deprivation gap figures are from PHE analysis using Index of Multiple Deprivation quintiles.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
