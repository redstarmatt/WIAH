'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface FlexWorkingRow {
  year: number
  requestsApprovedPct: number
  flexJobsAdvertisedPct: number
  lowIncomeFlexAccessPct?: number
}

interface FlexibleWorkingData {
  topic: string
  lastUpdated: string
  timeSeries: FlexWorkingRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FlexibleWorkingAccessPage() {
  const [data, setData] = useState<FlexibleWorkingData | null>(null)

  useEffect(() => {
    fetch('/data/flexible-working-access/flexible_working_access.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const flexSeries: Series[] = data
    ? [
        {
          id: 'approved',
          label: 'Requests approved (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.requestsApprovedPct,
          })),
        },
        {
          id: 'advertised',
          label: 'Flex jobs advertised (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.flexJobsAdvertisedPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Flexible Working Access" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Flexible Working Access"
          question="Can Workers Actually Get Flexible Hours?"
          finding="78% of flexible working requests are approved — but low-paid workers are half as likely to be offered flexible options in the first place."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The headline statistic on flexible working sounds positive: 78% of formal requests made to employers are approved. But that figure obscures a deeper inequality. The proportion of jobs advertised as flexible has doubled since 2018, from 16% to 31% by 2023, driven by post-pandemic normalisation of hybrid and remote arrangements and a tightening labour market. Yet the vast majority of this growth is concentrated in professional, managerial, and administrative roles. Among jobs paying below the median wage, flexible working is offered in fewer than 20% of advertised vacancies. ONS data shows that 68% of workers in the highest income quartile have some form of flexible working, compared to only 39% in the lowest quartile. From April 2024, the Employment Relations (Flexible Working) Act gave all employees the right to request flexible working from their first day, removing the previous 26-week qualifying period — but the right to request is not the right to receive.</p>
            <p>The inequality of access matters beyond convenience: flexible working is strongly correlated with workforce participation among parents (particularly mothers), disabled workers, and those with caring responsibilities. When flexibility is concentrated among high earners, it reinforces rather than reduces existing labour market inequalities. For the third of the workforce in roles where physical presence is non-negotiable — the nurse, the delivery driver, the checkout worker — flexibility means something different: predictable rotas, stable hours, and the ability to refuse short-notice shifts without fear of losing earnings or employment. Legislation alone cannot address this; it requires a separate policy response focused on scheduling rights and income security.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Trends' },
          { id: 'sec-callout', label: 'Reform' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Requests approved"
              value="78%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 74% in 2018 · Day 1 right from April 2024"
              sparklineData={[74, 75, 73, 77, 78, 78]}
              href="#sec-chart"source="BEIS / Flex Appeal · 2023"
            />
            <MetricCard
              label="Flex jobs advertised"
              value="31%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Doubled since 2018 · up from 16%"
              sparklineData={[16, 19, 24, 27, 29, 31]}
              href="#sec-callout"source="Timewise / Flex Appeal · 2023"
            />
            <MetricCard
              label="Low-income flex access"
              value="39%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 68% for high earners · structural inequality"
              sparklineData={[28, 28, 30, 33, 36, 39]}
              href="#sec-callout"source="ONS LFS / Timewise · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Flexible working requests approved and jobs advertised as flexible, 2018–2023"
              subtitle="Requests approved: employer survey data. Flex jobs: share of advertised vacancies explicitly offering flexible working arrangements."
              series={flexSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'BEIS / Timewise / Flex Appeal',
                dataset: 'Flexible Working Survey and Jobs Index',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Right to Request Flexible Working From Day One"
              value="78%"
              unit="requests approved"
              description="From April 2024, all employees have the right to request flexible working from their first day at work. Previously a 26-week qualifying period applied. Employers must now consider and respond within 2 months."
              source="BEIS / Flex Appeal, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>BEIS (Department for Business, Energy &amp; Industrial Strategy) — Flexible Working Employer Survey. gov.uk/government/publications/flexible-working-research</p>
            <p>Timewise — Flexible Jobs Index. timewise.co.uk/article/flexible-jobs-index</p>
            <p>Flex Appeal — Annual flexible working survey. flexappeal.co.uk</p>
            <p>ONS — Labour Force Survey. ons.gov.uk/surveys/informationforhouseholdsandindividuals/householdandindividualsurveys/labourforcesurvey</p>
            <p>Request approval rates derived from employer surveys. Flex jobs advertised percentage based on analysis of advertised vacancies containing explicit flexible working offers. Low-income access data from LFS cross-tabulation by earnings quartile.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
