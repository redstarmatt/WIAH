'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface AsbRow {
  year: number
  asbRecordedM?: number
  policeResponseWithin1hrPct?: number
  cbnOrdersIssued?: number
}

interface AsbCrisisData {
  topic: string
  lastUpdated: string
  timeSeries: AsbRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function AntiSocialBehaviourCrisisPage() {
  const [data, setData] = useState<AsbCrisisData | null>(null)

  useEffect(() => {
    fetch('/data/anti-social-behaviour-crisis/anti_social_behaviour_crisis.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const asbSeries: Series[] = data
    ? [
        {
          id: 'asbRecorded',
          label: 'ASB incidents recorded (millions)',
          colour: '#6B7280',
          data: data.timeSeries
            .filter(d => d.asbRecordedM !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.asbRecordedM!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Anti-Social Behaviour" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Anti-Social Behaviour"
          question="Is Anti-Social Behaviour Out of Control?"
          finding="1.6 million anti-social behaviour incidents were recorded in 2023 &mdash; and fewer than 1 in 3 receive a police response within an hour."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Over 1.6 million anti-social behaviour incidents were recorded by police in 2023 &mdash; and survey data consistently suggests recorded ASB represents a minority of experienced incidents, with housing providers, local councils, and transport operators recording substantial additional volumes. The police response rate has deteriorated sharply: in 2015, 41&percnt; of ASB incidents received a response within one hour; by 2023, that figure had fallen to 28&percnt;, a direct result of officer reductions during the austerity period and triage decisions prioritising more serious offences. Enforcement orders created by the Anti-Social Behaviour, Crime and Policing Act 2014 &mdash; Community Protection Notices, Civil Injunctions, Criminal Behaviour Orders &mdash; are systematically underused: orders issued fell 43&percnt; from 3,240 in 2015 to 1,850 in 2023, as local authority capacity to build and pursue ASB casework has been cut.</p>
            <p>Persistent unaddressed ASB carries documented consequences: reduced neighbourhood cohesion, commercial disinvestment from high streets, declining property values, elevated fear of crime among elderly residents, and escalation to more serious offending. The 2023 Anti-Social Behaviour Action Plan focused on visible enforcement &mdash; fast-tracked injunctions, expanded dispersal orders &mdash; but critics argue these address symptoms rather than drivers: poverty, housing instability, substance misuse, inadequate youth provision, and the withdrawal of community services that once managed early-stage disorder. For residents subjected to repeated incidents and unreturned calls, the lived experience is a corrosive erosion of confidence in institutions and neighbourhood safety.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'ASB Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="ASB incidents 2023"
              value="1.60m"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slight improvement &middot; but severity worsening"
              sparklineData={[1.72, 1.65, 1.59, 1.57, 1.53, 1.75, 1.74, 1.68, 1.60]}
              onExpand={() => {}}
              source="Home Office &middot; Police Recorded ASB 2023"
            />
            <MetricCard
              label="Response within 1 hour"
              value="28%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="was 41% in 2015 &middot; resources stretched"
              sparklineData={[41, 40, 39, 38, 38, 35, 32, 30, 28]}
              onExpand={() => {}}
              source="HMICFRS &middot; State of Policing 2023"
            />
            <MetricCard
              label="CBOs/CPNs issued"
              value="1,850"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-43% vs 2015 &middot; enforcement powers underused"
              sparklineData={[3240, 3100, 2900, 2700, 2190, 2000, 1950, 1900, 1850]}
              onExpand={() => {}}
              source="Home Office &middot; ASB Powers Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Anti-social behaviour incidents recorded, 2015&ndash;2023"
              subtitle="Police-recorded ASB incidents, England and Wales. Millions. Does not include housing or local authority-reported ASB."
              series={asbSeries}
              yLabel="Incidents (millions)"
              source={{
                name: 'Home Office',
                dataset: 'Police Recorded Anti-Social Behaviour',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Police Recorded Crime and ASB. ASB incidents recorded as a sub-category of police records. Annual data tables. gov.uk/government/collections/police-recorded-crime-statistics</p>
            <p>HMICFRS &mdash; State of Policing / PEEL Assessments. Include data on response times and ASB handling. justiceinspectorates.gov.uk/hmicfrs</p>
            <p>Home Office &mdash; Anti-Social Behaviour Powers Statistics. Annual data on CBO, CPN and dispersal order usage. gov.uk</p>
            <p>ASB incidents are recorded where police log an incident as primarily involving anti-social behaviour. This includes personal, nuisance, and environmental ASB sub-categories. Recording practices vary between forces, limiting direct cross-force comparison.</p>
          </div>
        </section>
      </main>
    </>
  )
}
