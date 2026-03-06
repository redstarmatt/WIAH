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

interface YouthDiversionOutcomesData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    firstTimeEntrants: number
    inCustody: number
    reoffendingPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function YouthDiversionOutcomesPage() {
  const [data, setData] = useState<YouthDiversionOutcomesData | null>(null)

  useEffect(() => {
    fetch('/data/youth-diversion-outcomes/youth_diversion_outcomes.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const youthSeries: Series[] = data
    ? [
        {
          id: 'firstTimeEntrants',
          label: 'First-time entrants to CJS',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.firstTimeEntrants,
          })),
        },
        {
          id: 'inCustody',
          label: 'Young people in custody',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.inCustody,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Youth Diversion Outcomes" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Youth Diversion Outcomes"
          question="Is youth diversion actually working?"
          finding="Youth reoffending has fallen 50% since 2010, driven by a shift towards community-based diversion over custody."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The transformation of youth justice in England and Wales over the past fifteen years is one of the most significant success stories in UK criminal justice. In 2010, 80,400 young people entered the criminal justice system for the first time; by 2024 that figure had fallen to around 7,800 — a 90% reduction. The number of children in custody fell from nearly 3,000 to around 430 over the same period, and reoffending rates dropped from 38% to around 25%. These changes reflect a deliberate policy shift toward diversion, driven by growing evidence that formal criminal justice contact — court appearances, records, cautions — increases rather than reduces future offending through the 'labelling effect'. Out-of-court disposals and youth triage arrangements, often run through Violence Reduction Units in cities with high youth violence rates, have become the primary response to first-time offending.</p>
            <p>The remaining custody population of 430 is concentrated in serious violence, sexual offences, and weapons cases, and is disproportionately made up of Black and minority ethnic young people and those with care experience — around 50% of children in custody have been in local authority care. Violence Reduction Unit funding, which underpins much of the most effective diversion work, is short-term and grant-dependent. The knife crime crisis of the late 2010s and mid-2020s has created political pressure for more punitive responses that cuts against the diversion model, and sustaining the political consensus and community infrastructure that produced this decade of progress is the central challenge for the years ahead.</p>
          </div>
        </section>

        <ScrollReveal>
          <PositiveCallout
            title="Youth reoffending halved"
            value="50%"
            description="The number of young people entering the criminal justice system has fallen dramatically since 2010, with diversion programmes proving highly effective at preventing first-time offences from leading to further crime."
            source="Source: Ministry of Justice — Youth Justice Statistics; Youth Justice Board annual statistics."
          />
        </ScrollReveal>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Youth Justice' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Fall in youth reoffending since 2010"
              value="50%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="From 38% reoffending rate in 2010 to 25% in 2024"
              sparklineData={[38, 37, 36, 35, 34, 33, 32, 30, 29]}
              href="#sec-chart"source="Ministry of Justice · Youth Justice Statistics"
            />
            <MetricCard
              label="Young people in custody"
              value="430"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 2,970 in 2010"
              sparklineData={[2970, 2592, 2187, 1782, 1296, 1053, 864, 720, 621]}
              href="#sec-chart"source="Youth Justice Board · Youth custody report"
            />
            <MetricCard
              label="First-time entrants to CJS"
              value="7,800"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 80,400 in 2010"
              sparklineData={[80400, 69200, 57800, 47300, 36900, 29200, 22800, 18600, 15200]}
              href="#sec-chart"source="Ministry of Justice · Youth Justice Statistics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Youth justice outcomes, 2010–2024"
              subtitle="First-time entrants to the criminal justice system and young people in custody, England and Wales."
              series={youthSeries}
              yLabel="Count"
              source={{
                name: 'Ministry of Justice / Youth Justice Board',
                dataset: 'Youth Justice Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice — Youth Justice Statistics. Published annually. gov.uk/government/statistics/youth-justice-statistics</p>
            <p>Youth Justice Board — Youth custody report. Published monthly and annually. gov.uk/government/organisations/youth-justice-board-for-england-and-wales</p>
            <p>NACRO — Youth crime briefings. nacro.org.uk</p>
            <p>Standing Committee for Youth Justice — Annual reporting. scyj.org.uk</p>
            <p>First-time entrants are young people aged 10–17 receiving their first reprimand, warning, caution, or conviction. Custody figures are average daily population in all youth custody settings. Reoffending rate is one-year proven reoffending rate. COVID-19 affected court throughput and first-time entrant figures in 2020–2021.</p>
          </div>
        </section>
      </main>
    </>
  )
}
