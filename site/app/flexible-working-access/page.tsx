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
          finding="78% of flexible working requests are approved &mdash; but low-paid workers are half as likely to be offered flexible options in the first place."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The headline statistic on flexible working sounds positive: 78% of formal requests made to employers are approved. But that figure obscures a deeper inequality. Formal requests can only be made by people who feel secure enough in their employment to make one &mdash; and who are in jobs where flexible working is culturally and practically conceivable. For millions of workers in retail, hospitality, care, logistics and construction, flexible working is not a request that is realistically available to make.</p>
            <p>The proportion of jobs advertised as flexible has doubled since 2018, rising from 16% to 31% by 2023. This is partly a post-pandemic normalisation of hybrid and remote arrangements, and partly a tightening labour market that has forced employers to compete on working conditions as well as pay. But the vast majority of this growth is concentrated in professional, managerial and administrative roles. Among jobs paying below the median wage, flexible working is offered in fewer than 20% of advertised vacancies.</p>
            <p>The inequality of access is stark. ONS data suggest that 68% of workers in the highest income quartile have access to some form of flexible working, compared to around 39% in the lowest income quartile. This gap matters for reasons that go beyond convenience: flexible working is strongly correlated with workforce participation among parents (particularly mothers), disabled workers, and those with caring responsibilities. When flexibility is concentrated among high earners, it reinforces rather than reduces existing labour market inequalities.</p>
            <p>From April 2024, the Employment Relations (Flexible Working) Act gives all employees the right to request flexible working from their first day of employment, removing the previous 26-week qualifying period. Employers must now respond within two months rather than three. These are meaningful improvements, but they do not change the fundamental dynamic: the right to request is not the same as the right to receive. Employers can still refuse on grounds including burden of additional costs or inability to reorganise work, and enforcement remains weak.</p>
            <p>The most effective lever for widening access to flexible working may not be legislation at all, but the broader cultural shift in white-collar sectors post-pandemic. When senior leaders in organisations visibly model flexible and hybrid working, uptake across the workforce tends to follow. But for the third of the workforce in roles where physical presence is non-negotiable &mdash; the nurse, the delivery driver, the checkout worker &mdash; flexibility means something different: predictable rotas, stable hours, and the ability to refuse short-notice shifts without fear of losing earnings or employment.</p>
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
              changeText="Up from 74% in 2018 &middot; Day 1 right from April 2024"
              sparklineData={[74, 75, 73, 77, 78, 78]}
              onExpand={() => {}}
              source="BEIS / Flex Appeal &middot; 2023"
            />
            <MetricCard
              label="Flex jobs advertised"
              value="31%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Doubled since 2018 &middot; up from 16%"
              sparklineData={[16, 19, 24, 27, 29, 31]}
              onExpand={() => {}}
              source="Timewise / Flex Appeal &middot; 2023"
            />
            <MetricCard
              label="Low-income flex access"
              value="39%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 68% for high earners &middot; structural inequality"
              sparklineData={[28, 28, 30, 33, 36, 39]}
              onExpand={() => {}}
              source="ONS LFS / Timewise &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Flexible working requests approved and jobs advertised as flexible, 2018&ndash;2023"
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
            <p>BEIS (Department for Business, Energy &amp; Industrial Strategy) &mdash; Flexible Working Employer Survey. gov.uk/government/publications/flexible-working-research</p>
            <p>Timewise &mdash; Flexible Jobs Index. timewise.co.uk/article/flexible-jobs-index</p>
            <p>Flex Appeal &mdash; Annual flexible working survey. flexappeal.co.uk</p>
            <p>ONS &mdash; Labour Force Survey. ons.gov.uk/surveys/informationforhouseholdsandindividuals/householdandindividualsurveys/labourforcesurvey</p>
            <p>Request approval rates derived from employer surveys. Flex jobs advertised percentage based on analysis of advertised vacancies containing explicit flexible working offers. Low-income access data from LFS cross-tabulation by earnings quartile.</p>
          </div>
        </section>
      </main>
    </>
  )
}
