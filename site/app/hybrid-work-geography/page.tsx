'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface HybridRow {
  year: number
  homeworkingPct: number
  londonHybridPct: number
}

interface OccupationRow {
  occupation: string
  pct: number
}

interface HybridWorkData {
  topic: string
  lastUpdated: string
  timeSeries: HybridRow[]
  byOccupation: OccupationRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function HybridWorkGeographyPage() {
  const [data, setData] = useState<HybridWorkData | null>(null)

  useEffect(() => {
    fetch('/data/hybrid-work-geography/hybrid_work_geography.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const hybridSeries: Series[] = data
    ? [
        {
          id: 'national',
          label: 'Home working (national %)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.homeworkingPct,
          })),
        },
        {
          id: 'london',
          label: 'London hybrid (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.londonHybridPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Hybrid Work Geography" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hybrid Work Geography"
          question="Who Gets to Work From Home?"
          finding="28% of UK workers work from home at least partly &mdash; but this drops to 4% in manual occupations, creating a two-tier labour market by geography and class."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The pandemic reshaped where British workers do their jobs, but the new landscape is profoundly unequal. In early 2020, fewer than 6% of workers regularly worked from home. By April 2020, that figure had jumped to 43% as lockdown forced a mass experiment in remote work. Four years on, the equilibrium has settled at around 28% &mdash; workers who work from home all or part of the time. This is a genuine and lasting shift in the structure of the British labour market, but its distribution is as unequal as any other workplace advantage.</p>
            <p>London is far more hybrid than anywhere else in the country. Around 44% of London workers work from home at least part of the time &mdash; more than twice the national average. This reflects the capital&apos;s concentration of professional, financial, creative and tech sector employment, where remote work is most feasible. It also reflects London&apos;s commuting geography: where a commute may take 90 minutes each way, the value of eliminating it is very high, and both employers and employees have strong incentives to enable remote work.</p>
            <p>By occupation, the gap is stark. Among professional workers, 56% work from home at least partly. Among managers, 51%. Among manual workers, just 4%. This is partly inherent to the work itself &mdash; a bricklayer cannot lay bricks remotely &mdash; but it creates a structural divide in the working experience of the British population. Professional workers enjoy not only higher wages and greater job security, but also the freedom from daily commuting costs and the ability to structure their working day around family and personal life. Manual workers, who are typically lower-paid, also typically face longer commutes as a proportion of their income and have no option to avoid them.</p>
            <p>The economic geography of hybrid work matters for towns and cities. City centres whose economies depended on the lunch trade, coffee shops, dry cleaners and other services used by commuters have faced permanent structural change. Major British cities outside London &mdash; Manchester, Leeds, Birmingham, Bristol &mdash; have seen significant reductions in weekday footfall that have not fully recovered. The debate about mandating a minimum number of office days reflects competing interests: employers wanting cultural cohesion and junior worker development, versus workers who have built their lives around reduced commuting.</p>
            <p>For younger workers, the hybrid question has a particular dimension. Remote working benefits experienced workers who can manage their own time, build relationships asynchronously, and derive value from networking that they have already established. Younger workers learning a profession, building networks and developing tacit knowledge through osmosis and observation arguably benefit more from in-person environments. The risk is that hybrid work norms that were shaped by the preferences of established workers may impose costs on new entrants who are least equipped to push back.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Homeworking Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Home workers 2024"
              value="28%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Stable but bifurcated &mdash; professional vs manual"
              sparklineData={[5.7, 43.1, 36.2, 30.6, 28.2, 28.0]}
              onExpand={() => {}}
              source="ONS LFS &middot; 2024"
            />
            <MetricCard
              label="London hybrid rate"
              value="44%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2.4&times; national average &middot; geography matters"
              sparklineData={[8, 61, 55, 47, 44, 44]}
              onExpand={() => {}}
              source="ONS LFS &middot; 2024"
            />
            <MetricCard
              label="Manual worker home rate"
              value="4%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Structural inequality baked in &middot; commuting costs persist"
              sparklineData={[4, 4, 4, 4, 4, 4]}
              onExpand={() => {}}
              source="ONS LFS &middot; 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Workers working from home, 2019&ndash;2024"
              subtitle="Share of employed workers who work from home all or part of the time. National average and London shown separately."
              series={hybridSeries}
              yLabel="Percentage of workers (%)"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey (LFS)',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Labour Force Survey. Quarterly. ons.gov.uk/surveys/informationforhouseholdsandindividuals/householdandindividualsurveys/labourforcesurvey</p>
            <p>ONS &mdash; Homeworking in the UK. ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/homeworkingintheuk</p>
            <p>Homeworking figures cover employed workers who report working from home as their main or one of their work locations in the reference week. London figure covers workers in London region. Occupation breakdown uses ONS SOC major groups. Pre-pandemic baseline is 2019 annual average.</p>
          </div>
        </section>
      </main>
    </>
  )
}
