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
            <p>Fraud is the most common crime in England and Wales by volume, yet it receives a vanishingly small share of police resources. The Crime Survey estimates around 4.5 million fraud offences a year &mdash; roughly 40% of all crime &mdash; while a 2023 HMICFRS inspection found just 1% of police resources dedicated to fraud investigation. Action Fraud receives around 800,000 reports annually; most are closed without investigative action because the volume overwhelms the system and individual frauds fall below the threshold for which forces can justify allocating detective time. The charge rate for fraud was approximately 3% in 2023, against 6% for all crimes combined. The National Crime Agency estimates money laundering facilitated by fraud costs the UK economy at least &pound;12 billion a year. The Fraud Strategy published in 2023 committed to a 10% reduction by 2025, and mandatory bank reimbursement for authorised push payment fraud was introduced in 2023.</p>
            <p>The burden falls disproportionately on older people, who are targeted by telephone and postal fraud at significantly higher rates and lose an average of &pound;3,800 per incident. Fraud victims frequently report psychological harm and loss of trust in institutions comparable to that experienced by victims of violent crime. The structural gap between offending volume and investigative capacity means fraud has become effectively decriminalised in practice, with most victims receiving no meaningful resolution.</p>
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
