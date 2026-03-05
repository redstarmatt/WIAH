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
          finding="Just 3.2% of reported rapes result in a charge &mdash; and the average time from offence to court has stretched to almost two years."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The gap between rape reported and rape charged is the starkest illustration of the justice system&apos;s failure to respond to sexual violence. In 2015, 10.4% of recorded rapes resulted in a charge &mdash; already a rate that criminologists and advocates described as a crisis. By 2023, that rate had fallen to 3.2%, even as reports had nearly doubled to 74,000 per year. The absolute number of charges &mdash; around 2,960 in 2023, rising slightly to 3,100 in 2024 &mdash; has remained roughly flat while the volume of cases demanding investigation has grown enormously. The system has not scaled; it has contracted in effective terms.</p>
            <p>The time from offence to charge has lengthened dramatically. In 2015, the average was 274 days from offence to charging decision. By 2023, it had reached 574 days &mdash; nearly 19 months. This is not merely an inconvenience for complainants: it is itself a driver of case attrition. The longer a rape case remains under investigation without resolution, the more likely it is that the complainant will withdraw, that evidence will degrade, and that the investigator will mark the case as no further action. Digital investigations &mdash; the extraction and analysis of mobile phone data &mdash; have become a standard part of rape investigations and a significant source of delay, as forces lack the forensic capacity to process phones rapidly and complainants are required to hand over devices that contain their entire personal and social history.</p>
            <p>Operation Soteria, launched in 2021, was designed to transform police investigation of rape by shifting focus from the victim&apos;s credibility to the suspect&apos;s behaviour. Early evaluation findings were cautiously positive: forces implementing Soteria protocols showed some improvement in charge rates and complainant experience. But implementation has been inconsistent across forces, and Soteria does not address the court backlog that means charged cases take over a year to reach trial. A complainant in a rape case in England in 2024 can expect to wait, in total, three years or more from reporting to verdict.</p>
            <p>The conviction rate once cases reach court &mdash; around 68-70% &mdash; is often cited as evidence that the problem is not in court but in the pipeline leading to court. This is substantially correct: juries convict in the majority of contested rape cases that reach them. The systemic failure is that most cases never reach that point. The Crime Survey consistently finds that only around 15-20% of rape victims report to police, meaning the 74,000 annual reported cases represent a fraction of the true prevalence. Estimated total annual rapes exceed 400,000, of which fewer than 3,100 result in a charge.</p>
            <p>The 2021 End-to-End Rape Review acknowledged these failures and set targets for doubling charge rates. Progress has been limited. The Victims and Prisoners Act 2024 introduced new rights for complainants, including the right to pre-recorded cross-examination and stronger protections around personal data. These are meaningful reforms, but they do not address the fundamental capacity problem: too few specialist rape investigators, overwhelmed digital forensics units, and a Crown Court so backlogged that charged cases wait over twelve months for trial. Without sustained investment in the pipeline, the charge rate will not improve at scale.</p>
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
              changeText="slight recovery from record low 3.2% &middot; but 10.4% in 2015"
              sparklineData={[10.4, 7.5, 4.9, 4.2, 3.9, 3.5, 3.2, 3.3]}
              onExpand={() => {}}
              source="CPS &middot; VAWG Report 2024"
            />
            <MetricCard
              label="Reports rising"
              value="72k/yr"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="reports doubled since 2015 &middot; charges flat"
              sparklineData={[39322, 58657, 73542, 63136, 67125, 71000, 74000, 72000]}
              onExpand={() => {}}
              source="ONS &middot; Crime Survey 2024"
            />
            <MetricCard
              label="Days to charge"
              value="550 days"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slight improvement &middot; still nearly 18 months"
              sparklineData={[274, 274, 410, 450, 490, 547, 574, 550]}
              onExpand={() => {}}
              source="Home Office &middot; Rape Review Progress 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Rape reports and charges, 2015&ndash;2024"
              subtitle="Police-recorded rape reports vs CPS charges. England and Wales. The widening gap represents the system&apos;s failure to scale."
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
            <p>ONS &mdash; Crime Survey for England and Wales / Police Recorded Crime. Annual statistical bulletins. ons.gov.uk/peoplepopulationandcommunity/crimeandjustice</p>
            <p>Crown Prosecution Service &mdash; Violence Against Women and Girls Report. Annual data on charging, prosecution and conviction for rape and sexual offences. cps.gov.uk/statistics</p>
            <p>Home Office &mdash; Rape Review Action Plan Progress Updates. gov.uk/government/publications/rape-review-action-plan</p>
            <p>Charge rate is calculated as CPS rape charges as a proportion of police-recorded rape offences in the same reporting year. Days to charge is the mean elapsed time from date of offence to date of first charge decision for rape cases, as reported in Home Office Rape Review monitoring data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
