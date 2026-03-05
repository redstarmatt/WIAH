'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface ImmigrationDetentionData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    dailyPopulation: number
    heldOver28DaysPct: number
    releasedWithoutRemovalPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ImmigrationDetentionPage() {
  const [data, setData] = useState<ImmigrationDetentionData | null>(null)

  useEffect(() => {
    fetch('/data/immigration-detention/immigration_detention.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const detentionSeries: Series[] = data
    ? [
        {
          id: 'dailyPopulation',
          label: 'Daily detention population',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.dailyPopulation,
          })),
        },
        {
          id: 'releasedWithoutRemoval',
          label: 'Released without removal (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.releasedWithoutRemovalPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Immigration Detention" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration Detention"
          question="How long are people held in immigration detention?"
          finding="On any given day, around 2,900 people are held in immigration detention in the UK, with no legal time limit on how long they can be held."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom is one of the few countries in Europe with no statutory time limit on immigration detention. On any given day in 2024, approximately 2,900 people were held in immigration removal centres &mdash; a figure recovering towards pre-pandemic levels. Detention is authorised by immigration officers and Home Office caseworkers rather than by a court, with judicial oversight available only through bail applications or judicial review. Around 45% of detainees in 2024 had been held for more than 28 days, the threshold frequently cited in reform proposals as the appropriate maximum. The Shaw Reviews of 2016 and 2018 found the detention estate was harming detainees&apos; mental health and recommended greater use of alternatives; implementation has been partial.</p>
            <p>Approximately 60% of people who leave detention are released without being removed from the UK &mdash; granted bail, left to remain, or having removal directions cancelled &mdash; raising questions about whether detention achieves its stated purpose. Independent inspections by HMIP have documented the detention of people with serious mental illness, torture victims, and those with significant health needs in facilities not equipped to meet them. The Adults at Risk policy and Rule 35 medical reporting exist as safeguards but have not been consistently applied. Legal aid pressures have reduced access to early representation, leaving detainees less able to challenge detention or navigate the bail process.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Detention Population' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="In immigration detention daily"
              value="2,900"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Recovering towards pre-pandemic levels"
              sparklineData={[3235, 3167, 3095, 2997, 2872, 1533, 1642, 2184, 2743]}
              onExpand={() => {}}
              source="Home Office &middot; Immigration statistics: detention tables"
            />
            <MetricCard
              label="Held for over 28 days"
              value="45%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Held beyond proposed time limit"
              sparklineData={[38, 39, 40, 41, 42, 36, 38, 42, 44]}
              onExpand={() => {}}
              source="Home Office &middot; Immigration statistics: detention tables"
            />
            <MetricCard
              label="Released without removal"
              value="60%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Of detainees released, not removed from UK"
              sparklineData={[54, 55, 56, 57, 58, 72, 68, 63, 61]}
              onExpand={() => {}}
              source="Home Office &middot; Immigration statistics: detention tables"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Immigration detention population, 2015&ndash;2024"
              subtitle="Average daily population in immigration removal centres and short-term holding facilities."
              series={detentionSeries}
              yLabel="Count / %"
              source={{
                name: 'Home Office',
                dataset: 'Immigration statistics: detention tables',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Immigration statistics: detention tables. Published quarterly. gov.uk/government/collections/immigration-statistics-quarterly-release</p>
            <p>Refugee Council &mdash; Immigration detention briefings. refugeecouncil.org.uk</p>
            <p>UNHCR &mdash; UK detention monitoring reports. unhcr.org/uk</p>
            <p>Immigration Removal Centre independent monitoring board reports. gov.uk/government/organisations/independent-monitoring-boards</p>
            <p>Daily population is the average number of people held in immigration removal centres and short-term holding facilities. The 28-day threshold is used as a reform benchmark. Released without removal includes bail grants, leave grants, and removal direction cancellations. 2020 figures reflect COVID-19 operational restrictions.</p>
          </div>
        </section>
      </main>
    </>
  )
}
