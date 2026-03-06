'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PrisonMentalHealthData {
  selfHarmIncidents: Array<{ year: number; incidents: number }>
  deathsInCustody: Array<{ year: number; apparentSelfInflicted: number }>
  mentalHealthPrevalence: Array<{ condition: string; percent: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function PrisonMentalHealthPage() {
  const [data, setData] = useState<PrisonMentalHealthData | null>(null)

  useEffect(() => {
    fetch('/data/prison-mental-health/prison_mental_health.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const selfHarmSeries: Series[] = data
    ? [{
        id: 'self-harm',
        label: 'Self-harm incidents per year',
        colour: '#E63946',
        data: data.selfHarmIncidents.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Prison Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Mental Health"
          question="What is the state of mental health in British prisons?"
          finding="70% of prisoners have at least two mental health diagnoses. Self-harm incidents have risen 208% since 2012, to over 74,000 per year. There were 86 apparent self-inflicted deaths in custody in 2022/23."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 70% of prisoners have at least two diagnosable mental health conditions at the time of entry, according to NHS England estimates. Self-harm incidents recorded in prisons in England and Wales have risen from approximately 24,000 in 2012 to 74,590 in 2022 &mdash; a 208% increase over a decade &mdash; equivalent to more than 203 incidents every single day. Apparent self-inflicted deaths numbered 86 in 2022/23, unchanged in scale from the 89 deaths in 2015 that prompted multiple official reviews. The Prisons and Probation Ombudsman and successive HMIP inspections have identified systemic failures: inadequate mental health screening on reception, poor follow-through of care plans, understaffed night-time provision, and the use of segregation for people in acute mental health crisis.</p>
            <p>The high prevalence of mental illness in prison reflects upstream failures rather than prison conditions alone. Street homelessness, substance dependency, poverty, and trauma are risk factors for both offending and mental illness; prison concentrates the consequences of inadequate community mental health, housing, and drug treatment provision. The burden falls hardest on those who arrived already failed by multiple systems, and prison healthcare &mdash; chronically underfunded relative to community equivalents &mdash; is being asked to deliver care in an environment that is by its nature antitherapeutic.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-self-harm', label: 'Self-Harm Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Self-harm incidents in prison per year"
              value="74,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 208% since 2012 &middot; record high &middot; equivalent to 203 per day"
              sparklineData={[24000, 30000, 40161, 57968, 60584, 61461, 74590]}
              source="HMPPS Safety in Custody Statistics &middot; 2023"
              href="#sec-self-harm"/>
            <MetricCard
              label="Prisoners with 2+ mental health diagnoses"
              value="70"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Personality disorder 47%, depression 42%, anxiety 38%"
              sparklineData={[65, 67, 68, 70, 70, 70]}
              source="National Prison Survey / NHS England"
              href="#sec-self-harm"/>
            <MetricCard
              label="Apparent self-inflicted deaths (2022/23)"
              value="86"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="52 in 2013, 86 in 2023 &middot; rising despite multiple inquiries"
              sparklineData={[52, 89, 70, 62, 67, 83, 86]}
              source="HMPPS Safety in Custody Statistics &middot; 2023"
              href="#sec-self-harm"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-self-harm" className="mb-12">
            <LineChart
              title="Self-harm incidents in prisons, England &amp; Wales, 2012&ndash;2023"
              subtitle="Total recorded self-harm incidents per year across the prison estate."
              series={selfHarmSeries}
              yLabel="Incidents per year"
              source={{
                name: 'HMPPS',
                dataset: 'Safety in Custody Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HMPPS &mdash; Safety in Custody Statistics. Annual publication covering deaths in prison custody, self-harm incidents, and assaults. Published by His Majesty&apos;s Prison and Probation Service.</p>
            <p>NHS England &mdash; Prison Healthcare Data. Mental health prevalence estimates drawn from the National Prison Survey and NHS screening data.</p>
            <p>Prison Reform Trust &mdash; Bromley Briefings Prison Factfile. Quarterly factfile summarising key prison statistics with analysis.</p>
            <p>Self-harm incident counts include all incidents requiring a formal record. They do not equate to individual prisoners &mdash; one person may self-harm multiple times. Deaths in custody are categorised as &apos;apparent self-inflicted&apos; pending coroner determination.</p>
          </div>
        </section>
      </main>
    </>
  )
}
