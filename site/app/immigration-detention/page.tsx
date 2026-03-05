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
            <p>The United Kingdom is one of the few countries in Europe with no statutory time limit on immigration detention. A person can be held in an immigration removal centre indefinitely if the Home Office considers that removal is imminent, even if that removal is repeatedly delayed by legal challenge, foreign government non-cooperation, or documentary issues. In practice, most detainees are held for weeks to months, but some cases extend to years. On any given day in 2024, approximately 2,900 people were held in detention — a figure recovering towards pre-pandemic levels after the COVID-19 reduction in detention operations.</p>
            <p>The legal basis for immigration detention is the administrative convenience of the executive rather than judicial authorisation. Detention is authorised by immigration officers and Home Office caseworkers, with judicial oversight available only through bail applications to immigration tribunals or judicial review proceedings. The Shaw Reviews of 2016 and 2018, commissioned by the government, found that the detention estate was harming the mental health of detainees and that reforms were needed, including greater use of alternatives to detention and faster decision-making. Implementation of those recommendations has been partial.</p>
            <p>Around 45% of people in detention in 2024 had been held for more than 28 days — a threshold frequently cited in reform proposals as the appropriate maximum for detention without judicial authorisation. The Detained Duty Advice scheme, which provides initial legal advice to detainees, has faced significant legal aid funding pressures that have limited access to representation in the early stages of detention when key decisions about bail and legal challenge are made. Without legal advice, detainees are less able to challenge the legality of their detention or to navigate the bail process.</p>
            <p>Approximately 60% of people who leave immigration detention are released without being removed from the UK — they are granted bail, their removal directions are cancelled, or they are granted leave to remain. This figure is important because it demonstrates that a majority of those detained are not ultimately removed, raising questions about whether detention is achieving its stated purpose of facilitating removal or serving as a holding measure during a long and uncertain decision-making process. The Home Office has argued that detention is necessary even where removal does not ultimately occur because it prevents absconding during the resolution of complex cases.</p>
            <p>Conditions in immigration removal centres have been subject to sustained criticism in independent inspections by HMIP, the Independent Monitoring Boards, and in legal proceedings. Concerns have included the detention of people with serious mental illness, people who are victims of torture, and people with significant physical health needs in facilities that are not equipped to meet those needs. The government has introduced various safeguards — the Adults at Risk policy, Rule 35 medical reporting — but inspectors have found that these have not always been effectively implemented, particularly for people whose vulnerabilities were not identified at the point of initial detention.</p>
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
