'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface DisabilityHateCrimeData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    recordedCrimes: number
    estimatedIncidents: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DisabilityHateCrimePage() {
  const [data, setData] = useState<DisabilityHateCrimeData | null>(null)

  useEffect(() => {
    fetch('/data/disability-hate-crime/disability_hate_crime.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'recordedCrimes',
          label: 'Recorded offences',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.recordedCrimes,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Disability Hate Crime" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disability Hate Crime"
          question="How Common Is Disability Hate Crime?"
          finding="Disability hate crime reports have risen 80% since 2015 to 12,300 recorded offences — but fewer than 1 in 10 cases results in a charge."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Disability hate crime recorded by police has risen 80% since 2015 to 12,300 offences in 2022&ndash;23, reflecting improved recording practices alongside a likely genuine increase in underlying offending. The Crime Survey for England and Wales estimates actual incidents at approximately 70,000 per year &mdash; suggesting only around 17% are reported. The nature of disability hate crime is varied: verbal abuse, physical assault, online harassment, and &lsquo;mate crime&rsquo; &mdash; where perpetrators cynically befriend people with learning disabilities or autism to exploit them financially or physically &mdash; is particularly insidious because victims may not recognise it as crime. Justice outcomes are strikingly poor: the charge rate for disability hate crime stands at approximately 9%, against 14% for race hate crime and 13% for sexual orientation hate crime. The sentencing aggravation uplift for disability motivation is applied far less frequently than for race, reflecting a persistent perception within the criminal justice system that disability hate crimes are less serious than other forms.</p>
            <p>Online disability hate crime has grown significantly, with social media platforms hosting content that demeans, mocks, or threatens disabled people; the Online Safety Act 2023 places new duties on platforms but its effect on disability hate crime specifically is yet to be empirically assessed. The 2023 Disability Action Plan committed to a consultation on creating a specific offence of disability aggravation, paralleling the race aggravation offence that tends to generate better recording than a discretionary sentencing uplift. Disabled People&rsquo;s Organisations have argued for a standalone disability hate crime offence &mdash; noting that the current framework systematically underweights hostility toward disabled people compared with other protected characteristics.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Disability hate crimes recorded"
              value="12,300"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+80% since 2015 · online abuse surge"
              sparklineData={[6800, 7400, 8100, 8700, 9300, 9800, 10500, 11500, 12300]}
              href="#sec-chart"source="Home Office · Hate Crime Statistics 2024"
            />
            <MetricCard
              label="Charge rate"
              value="9%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="9% charged · vs 14% race hate crime"
              sparklineData={[9, 9, 9, 9, 9, 9, 9, 9, 9]}
              href="#sec-chart"source="Home Office · Hate Crime Outcomes 2024"
            />
            <MetricCard
              label="Estimated actual incidents"
              value="70,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="70k estimated · only 17% reported"
              sparklineData={[52000, 55000, 58000, 61000, 63000, 65000, 67000, 68000, 70000]}
              href="#sec-chart"source="Crime Survey for England and Wales 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Disability hate crimes recorded by police, 2016–2024"
              subtitle="Disability-motivated hate crimes recorded by police forces in England and Wales."
              series={series}
              yLabel="Recorded offences"
              source={{
                name: 'Home Office',
                dataset: 'Hate Crime in England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Hate Crime in England and Wales. Published annually. gov.uk/government/statistics/hate-crime-england-and-wales</p>
            <p>ONS &mdash; Crime Survey for England and Wales. Estimated incidents are self-reported hate crime from CSEW interviews and represent a substantially higher figure than police-recorded data. Charge rate calculated from Home Office crime outcomes data as charges/summons as a proportion of all recorded disability hate crime offences.</p>
          </div>
        </section>
      </main>
    </>
  )
}
