'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface FraudProsecutionGapData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    fraudShareOfCrimePct: number
    policeResourcesPct: number
    chargeRatePct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FraudProsecutionGapPage() {
  const [data, setData] = useState<FraudProsecutionGapData | null>(null)

  useEffect(() => {
    fetch('/data/fraud-prosecution-gap/fraud_prosecution_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const chargeRateSeries: Series[] = data
    ? [
        {
          id: 'chargeRate',
          label: 'Fraud charge rate (%)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.chargeRatePct,
          })),
        },
        {
          id: 'fraudShare',
          label: 'Fraud as share of all crime (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fraudShareOfCrimePct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Fraud Prosecution Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fraud Prosecution Gap"
          question="Why is almost no fraud being prosecuted?"
          finding="Fraud accounts for 40% of crime by volume in England and Wales, but receives just 1% of police resources."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Fraud is now the most common crime in England and Wales by volume, yet it receives a vanishingly small share of police resources. The Crime Survey for England and Wales estimates around 4.5 million fraud offences a year, accounting for roughly 40% of all crime experienced by adults. The number of fraud officers in territorial police forces, however, has not grown proportionately. A 2023 HMICFRS inspection found that just 1% of police resources were dedicated to fraud investigation, a mismatch that makes meaningful prosecution rates structurally impossible.</p>
            <p>The architecture of fraud reporting compounds the problem. Action Fraud, the national reporting centre, receives around 800,000 reports annually. These pass to the National Fraud Intelligence Bureau, which triages them and refers a fraction to forces for investigation. Most reports are closed without any investigative action, not because they are not serious, but because the volume overwhelms the system and most individual frauds fall below the threshold for which forces can justify allocating detective time. This creates a rational but perverse outcome: fraud becomes effectively decriminalised in practice if not in law.</p>
            <p>The charge rate for fraud — the proportion of reported cases that result in a charge — was approximately 3% in 2023. For comparison, the charge rate for all crimes combined is around 6%, and for violence against the person it is around 10%. Fraud is unique in that the typical victim is not present in the same location as the offender, the evidence trail is digital and complex, and the offender is frequently overseas. Each of these factors adds investigative cost and reduces the probability of a charge. When the case does reach the Crown Prosecution Service, conviction rates are reasonable — but the attrition in getting cases to that stage is severe.</p>
            <p>Economic harm from fraud dwarfs the resources deployed against it. The National Crime Agency estimates that money laundering facilitated by fraud costs the UK economy at least £12 billion a year, and some estimates place total fraud-related losses significantly higher when including cyber-enabled fraud and romance fraud. The human costs are equally significant: fraud victims frequently report psychological harm, financial devastation, and a loss of trust in institutions. Older people, who are disproportionately targeted by telephone and postal fraud, are particularly affected.</p>
            <p>Proposed reforms include a dedicated national fraud agency with dedicated investigative capacity, mandatory bank reimbursement for authorised push payment fraud (which was introduced in 2023), and closer collaboration with technology platforms to disrupt fraud at source. The Fraud Strategy published in 2023 committed to a 10% reduction in fraud by 2025, but the structural gap between the volume of offending and the investigative capacity to respond to it remains very wide.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Charge Rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Share of all crime"
              value="40%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 32% in 2015"
              sparklineData={[32, 34, 35, 36, 37, 38, 39, 40, 41]}
              onExpand={() => {}}
              source="ONS &middot; Crime Survey for England and Wales"
            />
            <MetricCard
              label="Police resources allocated"
              value="1%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Of total officer headcount dedicated to fraud"
              sparklineData={[1.2, 1.1, 1.1, 1.0, 1.0, 0.9, 0.9, 1.0, 1.0]}
              onExpand={() => {}}
              source="HMICFRS &middot; State of Policing reports"
            />
            <MetricCard
              label="Fraud cases charged"
              value="3%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Of reported fraud cases resulting in charge"
              sparklineData={[5.1, 4.8, 4.5, 4.2, 3.9, 3.6, 3.4, 3.2, 3.0]}
              onExpand={() => {}}
              source="Home Office &middot; Crime outcomes in England and Wales"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Fraud charges as share of reported cases, 2015&ndash;2024"
              subtitle="Charge rate for fraud offences compared with fraud as a share of total crime, England and Wales."
              series={chargeRateSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'Home Office / ONS',
                dataset: 'Crime outcomes in England and Wales; Crime Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Crime Survey for England and Wales. Published annually. ons.gov.uk/peoplepopulationandcommunity/crimeandjustice</p>
            <p>Home Office &mdash; Crime outcomes in England and Wales. Charge rate is charges as a proportion of fraud offences referred to the Crown Prosecution Service. Published annually. gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics</p>
            <p>Action Fraud &mdash; Fraud and cybercrime statistics. actionfraud.police.uk</p>
            <p>National Fraud Intelligence Bureau &mdash; NFIB fraud referral data. cityoflondon.police.uk</p>
            <p>Fraud is significantly under-reported. The 40% share of crime figure is based on Crime Survey estimates and reflects a much larger true volume than police recorded figures suggest.</p>
          </div>
        </section>
      </main>
    </>
  )
}
