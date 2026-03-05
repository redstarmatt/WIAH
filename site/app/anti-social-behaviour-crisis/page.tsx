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
            <p>Anti-social behaviour remains one of the most reported problems in communities across England and Wales, yet it receives the least systematic public attention of any major crime category. Over 1.6 million ASB incidents were recorded by police in 2023. The true volume is far higher: not all victims contact police, many repeat callers stop reporting after repeated non-response, and housing providers, local councils, and transport operators record substantial additional volumes that never appear in police statistics. Survey data consistently suggests recorded ASB represents a minority of experienced incidents.</p>
            <p>The police response to ASB has deteriorated sharply as resources have tightened. In 2015, 41% of ASB incidents received a police response within one hour. By 2023, that figure had fallen to 28%. This is partly a direct result of the reduction in officer numbers during the austerity period and the shift in triage priorities towards more serious offences. ASB incidents &mdash; which often involve noise complaints, antisocial parking, youth disorder, or neighbourhood harassment &mdash; are categorised as Grade 2 or Grade 3 responses, meaning they are routinely delayed or not attended at all when higher-priority demand is high.</p>
            <p>The enforcement toolkit available outside police is being systematically underused. Community Protection Notices, Civil Injunctions, and Criminal Behaviour Orders were introduced under the Anti-Social Behaviour, Crime and Policing Act 2014 to give councils, housing associations, and police a wider range of proportionate tools. But the number of Community Protection Notices and related orders being issued has fallen sharply since 2015 &mdash; from 3,240 to 1,850 in 2023 &mdash; as local authority capacity to manage ASB casework has been reduced. Housing associations report that pursuing ASB through the civil injunction route requires legal resource and sustained evidence gathering that many are no longer funded to provide.</p>
            <p>The consequences of unaddressed ASB are significant and well-evidenced. Persistent low-level disorder is associated with reduced neighbourhood cohesion, commercial disinvestment from high streets, declining property values, increased fear of crime among older residents, and escalation to more serious offending. The relationship between ASB and more serious crime is not purely correlational: areas where ASB is tolerated over time tend to experience higher rates of acquisitive crime and serious violence. Broken windows theory remains contested, but the basic insight &mdash; that visible disorder signals a community where order is not enforced &mdash; has consistent empirical support in the British context.</p>
            <p>Government response has included a series of announcements focused on visible enforcement &mdash; the Anti-Social Behaviour Action Plan published in 2023 included commitments to fast-track ASB injunctions and expand the use of dispersal orders. Critics argue these measures address the most visible manifestations of ASB without tackling the underlying drivers: poverty, housing instability, substance misuse, inadequate youth provision, and the withdrawal of community services that previously managed early-stage disorder. For residents in affected communities, the experience of unreturned calls, repeated incidents, and no visible consequence for perpetrators is a persistent and corrosive erosion of confidence in public institutions.</p>
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
