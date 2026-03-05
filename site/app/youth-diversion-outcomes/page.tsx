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
            <p>The transformation of youth justice in England and Wales over the past fifteen years is one of the most significant and underreported success stories in UK criminal justice. In 2010, 80,400 young people entered the criminal justice system for the first time. By 2024 that figure had fallen to around 7,800 — a reduction of 90%. The number of children in custody fell from nearly 3,000 to around 430 over the same period. Reoffending rates for young people have fallen from 38% to around 25%. These are very large changes that occurred without a significant increase in crime by young people; they reflect a deliberate policy shift towards diversion and away from formal criminal justice processing.</p>
            <p>The driving force behind this change was a growing consensus, supported by evidence from the United States and elsewhere, that bringing young people into formal contact with the criminal justice system — court appearances, community orders, cautions on record — increases rather than decreases future offending. The &apos;labelling effect&apos; of a criminal record, even at a young age, damages employment prospects, housing, and social identity in ways that make future crime more likely. The Youth Justice Board, established under the Crime and Disorder Act 1998, gradually shifted its emphasis from managing offenders through the system to preventing entry into it.</p>
            <p>Out-of-court disposals — community resolutions, youth cautions, and referral to diversion panels — have become the primary response to first-time offending. Many youth offending teams have developed triage arrangements with police that divert young people away from any formal record at the first point of contact. Area-based diversion programmes, often funded through Violence Reduction Units in cities with high rates of youth violence, focus on the individual circumstances that have brought a young person into contact with crime — school exclusion, family breakdown, involvement with older offenders — and address them through mentoring, education support, and therapeutic intervention.</p>
            <p>The remaining youth custody population is concentrated in the most serious offences — violence, sexual offences, weapons — and is disproportionately made up of young people from Black and minority ethnic backgrounds and those who have been in local authority care. The persistent overrepresentation of care-experienced young people in the youth justice system — around 50% of children in custody have been in care — reflects a failure of the child protection system to provide sufficiently stable and supportive care to prevent trajectories into offending. The Youth Justice Board has prioritised work with local authorities on this interface.</p>
            <p>The model faces pressure as it matures. Violence Reduction Unit funding, which has underpinned much of the most innovative diversion work in London, the West Midlands, and Greater Manchester, is grant-funded and subject to spending review decisions. The knife crime crisis of the late 2010s and mid-2020s created political pressure for more punitive responses to youth violence that partially cuts against the diversion model. Maintaining the political consensus around diversion as the primary response to youth offending, and sustaining the community-based infrastructure that makes it work, are the primary challenges for the next decade.</p>
          </div>
        </section>

        <ScrollReveal>
          <PositiveCallout
            title="Youth reoffending halved"
            value="50%"
            description="The number of young people entering the criminal justice system has fallen dramatically since 2010, with diversion programmes proving highly effective at preventing first-time offences from leading to further crime."
            source="Source: Ministry of Justice &mdash; Youth Justice Statistics; Youth Justice Board annual statistics."
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
              onExpand={() => {}}
              source="Ministry of Justice &middot; Youth Justice Statistics"
            />
            <MetricCard
              label="Young people in custody"
              value="430"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 2,970 in 2010"
              sparklineData={[2970, 2592, 2187, 1782, 1296, 1053, 864, 720, 621]}
              onExpand={() => {}}
              source="Youth Justice Board &middot; Youth custody report"
            />
            <MetricCard
              label="First-time entrants to CJS"
              value="7,800"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 80,400 in 2010"
              sparklineData={[80400, 69200, 57800, 47300, 36900, 29200, 22800, 18600, 15200]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; Youth Justice Statistics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Youth justice outcomes, 2010&ndash;2024"
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
            <p>Ministry of Justice &mdash; Youth Justice Statistics. Published annually. gov.uk/government/statistics/youth-justice-statistics</p>
            <p>Youth Justice Board &mdash; Youth custody report. Published monthly and annually. gov.uk/government/organisations/youth-justice-board-for-england-and-wales</p>
            <p>NACRO &mdash; Youth crime briefings. nacro.org.uk</p>
            <p>Standing Committee for Youth Justice &mdash; Annual reporting. scyj.org.uk</p>
            <p>First-time entrants are young people aged 10&ndash;17 receiving their first reprimand, warning, caution, or conviction. Custody figures are average daily population in all youth custody settings. Reoffending rate is one-year proven reoffending rate. COVID-19 affected court throughput and first-time entrant figures in 2020&ndash;2021.</p>
          </div>
        </section>
      </main>
    </>
  )
}
