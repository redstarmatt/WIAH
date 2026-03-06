'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface VawRow {
  year: number
  rapeReported?: number
  rapeCharged?: number
  chargeRatePct?: number
  daysToCharge?: number
}

interface ViolenceAgainstWomenData {
  topic: string
  lastUpdated: string
  timeSeries: VawRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ViolenceAgainstWomenPage() {
  const [data, setData] = useState<ViolenceAgainstWomenData | null>(null)

  useEffect(() => {
    fetch('/data/violence-against-women/violence_against_women.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const reportedSeries: Series[] = data
    ? [
        {
          id: 'rapeReported',
          label: 'Rapes reported',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.rapeReported !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.rapeReported!,
            })),
        },
      ]
    : []

  const chargedSeries: Series[] = data
    ? [
        {
          id: 'rapeCharged',
          label: 'Rapes charged',
          colour: '#264653',
          data: data.timeSeries
            .filter(d => d.rapeCharged !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.rapeCharged!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Violence Against Women" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Violence Against Women"
          question="What Happens When You Report Sexual Violence?"
          finding="Just 3.2% of reported rapes result in a charge — and the average time from offence to court has stretched to almost two years."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The rape charge rate — 10.4% in 2015 — had fallen to just 3.2% by 2023, even as reports nearly doubled to 74,000 per year. The absolute number of charges, around 3,100 in 2024, has remained roughly flat while the volume of cases has grown enormously. The average time from offence to charging decision extended from 274 days in 2015 to 574 days in 2023: length itself drives attrition, as complainants withdraw, evidence degrades, and investigators close cases with no further action. Digital forensics — now a standard part of rape investigations — are a major source of delay, as forces lack capacity to process phones rapidly while complainants are required to surrender devices containing their entire personal history. A complainant reporting rape in England in 2024 can expect to wait three years or more from reporting to verdict.</p>
            <p>The conviction rate once cases reach court is around 68–70%, confirming the problem lies not in court but in the pipeline. The Crime Survey consistently finds only 15–20% of rape victims report to police, meaning the 74,000 annual reports represent a fraction of true prevalence; estimated total annual rapes exceed 400,000, of which fewer than 3,100 result in a charge. The 2021 End-to-End Rape Review set targets for doubling charge rates; the Victims and Prisoners Act 2024 introduced new complainant rights. But without sustained investment in specialist investigators, digital forensics, and Crown Court capacity, the charge rate will not improve at scale.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Reports vs Charges' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rape charge rate"
              value="3.3%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="slight recovery from record low 3.2% · but 10.4% in 2015"
              sparklineData={[10.4, 7.5, 4.9, 4.2, 3.9, 3.5, 3.2, 3.3]}
              href="#sec-chart"source="CPS · VAWG Report 2024"
            />
            <MetricCard
              label="Reports rising"
              value="72k/yr"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="reports doubled since 2015 · charges flat"
              sparklineData={[39322, 58657, 73542, 63136, 67125, 71000, 74000, 72000]}
              href="#sec-chart"source="ONS · Crime Survey 2024"
            />
            <MetricCard
              label="Days to charge"
              value="550 days"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slight improvement · still nearly 18 months"
              sparklineData={[274, 274, 410, 450, 490, 547, 574, 550]}
              href="#sec-chart"source="Home Office · Rape Review Progress 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Rape reports and charges, 2015–2024"
              subtitle="Police-recorded rape reports vs CPS charges. England and Wales. The widening gap represents the system's failure to scale."
              series={[...reportedSeries, ...chargedSeries]}
              yLabel="Number of cases"
              source={{
                name: 'ONS / CPS',
                dataset: 'Crime Survey / VAWG Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Crime Survey for England and Wales / Police Recorded Crime. Annual statistical bulletins. ons.gov.uk/peoplepopulationandcommunity/crimeandjustice</p>
            <p>Crown Prosecution Service — Violence Against Women and Girls Report. Annual data on charging, prosecution and conviction for rape and sexual offences. cps.gov.uk/statistics</p>
            <p>Home Office — Rape Review Action Plan Progress Updates. gov.uk/government/publications/rape-review-action-plan</p>
            <p>Charge rate is calculated as CPS rape charges as a proportion of police-recorded rape offences in the same reporting year. Days to charge is the mean elapsed time from date of offence to date of first charge decision for rape cases, as reported in Home Office Rape Review monitoring data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
