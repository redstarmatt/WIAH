'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface DomesticAbuseRow {
  year: number
  callsM?: number
  prosecutions?: number
  convictions?: number
  prosecutionRatePct?: number
}

interface DomesticAbuseOutcomesData {
  topic: string
  lastUpdated: string
  timeSeries: DomesticAbuseRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DomesticAbuseOutcomesPage() {
  const [data, setData] = useState<DomesticAbuseOutcomesData | null>(null)

  useEffect(() => {
    fetch('/data/domestic-abuse-outcomes/domestic_abuse_outcomes.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const callsSeries: Series[] = data
    ? [
        {
          id: 'calls',
          label: 'DA calls to police (millions)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.callsM !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.callsM!,
            })),
        },
      ]
    : []

  const prosecutionsSeries: Series[] = data
    ? [
        {
          id: 'prosecutions',
          label: 'Prosecutions',
          colour: '#264653',
          data: data.timeSeries
            .filter(d => d.prosecutions !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.prosecutions!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Domestic Abuse Outcomes" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Domestic Abuse Outcomes"
          question="What Happens When You Report Domestic Abuse?"
          finding="Police receive 1.5 million domestic abuse calls a year &mdash; but only 1 in 10 results in a prosecution."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Domestic abuse is the single largest category of calls to police in England and Wales, accounting for roughly one in five of all incidents attended. Over 1.5 million calls per year, every 30 seconds, someone contacts the police about domestic abuse. Yet the criminal justice system responds to only a fraction of those calls with prosecution. In 2023, 91,000 domestic abuse prosecutions were initiated &mdash; a prosecution rate of around 9.8% of all calls. The vast majority of incidents are recorded by police but proceed no further through the criminal justice system.</p>
            <p>The attrition between incident and prosecution happens at multiple stages. Many victims do not support prosecution, often because of fear of retaliation, economic dependence on the perpetrator, concerns about children, or distrust of the criminal justice system based on prior experience. Evidence-led prosecution &mdash; pursuing cases without victim cooperation using police body-worn camera footage, medical evidence, and 999 call recordings &mdash; has been developed to address this, but requires specialist resource that not all forces deploy consistently. The Crown Prosecution Service&apos;s domestic abuse charging decisions are subject to inspection, and outcomes vary significantly by CPS area.</p>
            <p>The conviction rate once cases reach court is relatively high at around 77%. This suggests that cases that are prosecuted are generally well-evidenced. The problem is not primarily what happens in court &mdash; it is the vast gap between incident and charge. A perpetrator who abuses a partner repeatedly across years may accumulate dozens of police call-outs without ever being charged, because each individual incident is assessed in isolation rather than as part of a pattern. The Domestic Abuse Act 2021 created the new offence of controlling and coercive behaviour and introduced domestic abuse protection orders, but take-up of the new tools has been slow.</p>
            <p>The pandemic temporarily disrupted the pattern. Calls fell in 2020 as lockdown restricted victims&apos; ability to contact police, even as severity increased. Prosecutions fell sharply as courts were disrupted. Since then, call volumes have returned to trend and slowly recovering prosecution numbers reflect partial restoration of capacity. But the court backlog &mdash; which exceeds 65,000 cases in Crown Court &mdash; means that domestic abuse cases where the perpetrator is charged may take well over a year to reach trial, during which time victims remain at risk and frequently withdraw support for prosecution.</p>
            <p>Specialist domestic abuse courts, independent domestic violence advisors, and multi-agency risk assessment conferences have all been shown to improve outcomes for victims and increase successful prosecutions. The evidence base for what works is strong. The constraint is funding: IDVAs, specialist courts, and multi-agency coordination all require sustained resource from local authorities and police and crime commissioners who are themselves facing budget pressure. The result is a system that absorbs enormous police resource at the incident end &mdash; 1.5 million calls &mdash; while investing far less in the specialist capacity that would convert more of those calls into protection and accountability.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Calls &amp; Prosecutions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="DA calls to police"
              value="1.5m/yr"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="every 30 seconds &middot; biggest demand on police"
              sparklineData={[1.1, 1.2, 1.3, 1.4, 1.3, 1.5, 1.5, 1.5, 1.5]}
              onExpand={() => {}}
              source="ONS &middot; Domestic Abuse in England and Wales 2024"
            />
            <MetricCard
              label="Prosecution rate"
              value="9.8%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="of calls resulting in prosecution &middot; slowly rising"
              sparklineData={[8.6, 8.3, 7.8, 7.4, 6.4, 5.6, 5.8, 6.1, 6.3]}
              onExpand={() => {}}
              source="CPS &middot; Domestic Abuse Statistics 2023"
            />
            <MetricCard
              label="Conviction rate"
              value="77%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="of prosecuted cases result in conviction"
              sparklineData={[78, 78, 78, 79, 77, 77, 78, 78, 78]}
              onExpand={() => {}}
              source="CPS &middot; Violence Against Women and Girls Report 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Domestic abuse: police calls and prosecutions, 2016&ndash;2024"
              subtitle="Left: calls to police (millions). Right: prosecutions initiated. England and Wales."
              series={[...callsSeries, ...prosecutionsSeries]}
              yLabel="Volume"
              source={{
                name: 'ONS / CPS',
                dataset: 'Domestic Abuse in England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Domestic Abuse in England and Wales. Annual bulletin drawing on police recorded crime data and Crime Survey. ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwales</p>
            <p>Crown Prosecution Service &mdash; Violence Against Women and Girls Report. Annual statistics on charging, prosecution, and conviction for domestic abuse offences. cps.gov.uk/statistics</p>
            <p>Home Office &mdash; Domestic Abuse Statutory Guidance. gov.uk/government/publications/domestic-abuse-act-2021</p>
            <p>Call volumes are estimated from police recorded domestic abuse incidents. Prosecution rate is calculated as CPS domestic abuse prosecutions as a proportion of police recorded domestic abuse incidents in the same period. Some calls do not result in a recorded crime, meaning the prosecution rate is a conservative estimate of cases reaching court.</p>
          </div>
        </section>
      </main>
    </>
  )
}
