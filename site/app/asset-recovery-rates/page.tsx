'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface AssetRecoveryRatesData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    recoveredMillions: number
    estimatedLaunderedBillions: number
    recoveryRatePct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function AssetRecoveryRatesPage() {
  const [data, setData] = useState<AssetRecoveryRatesData | null>(null)

  useEffect(() => {
    fetch('/data/asset-recovery-rates/asset_recovery_rates.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const recoverySeries: Series[] = data
    ? [
        {
          id: 'recovered',
          label: 'Assets recovered (£m)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.recoveredMillions,
          })),
        },
        {
          id: 'recoveryRate',
          label: 'Recovery rate (%)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.recoveryRatePct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Asset Recovery Rates" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Asset Recovery Rates"
          question="How much of criminal proceeds is actually recovered?"
          finding="The UK recovers around £378 million annually from criminal proceeds, against an estimated £12 billion laundered each year."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK recovers approximately &pound;378 million in criminal assets each year against an estimated &pound;12 billion laundered through the financial system &mdash; a recovery rate of around 3%, up from 1.4% in 2015. The Proceeds of Crime Act 2002 established one of the world&apos;s most comprehensive legislative frameworks for confiscation, civil recovery, and cash seizure; the Criminal Finances Act 2017 added account freezing orders that have driven some of the improvement. Yet around &pound;2 billion in active confiscation orders remains unenforced at any time &mdash; defendants hide assets offshore or die before collection &mdash; and Unexplained Wealth Orders, introduced in 2018 and widely publicised, had been issued fewer than ten times by 2024, hampered by the resource cost of legal challenges. Around 900,000 Suspicious Activity Reports were filed by professionals in 2023, a volume far exceeding law enforcement&apos;s capacity to analyse them.</p>
            <p>The gap between the UK&apos;s legislative framework and practical outcomes falls hardest on the public interest in disrupting organised crime. Incentive structures are misaligned: confiscation proceeds flow to the Consolidated Fund rather than back to enforcement agencies, reducing the financial motivation to pursue complex recovery cases over new investigations. FCA fines against banks for money laundering failings have increased in frequency but remain a fraction of the flows they are meant to deter. The UK&apos;s position as a major international financial centre &mdash; a significant source of its economic strength &mdash; simultaneously makes it an attractive destination for illicit funds that domestic enforcement resources cannot adequately intercept.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Asset Recovery' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Criminal proceeds laundered annually"
              value="£12bn"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="NCA estimate; true figure likely higher"
              sparklineData={[10, 10, 11, 11, 12, 12, 12, 12, 12]}
              href="#sec-chart"source="NCA &middot; UK Financial Intelligence Unit annual report"
            />
            <MetricCard
              label="Assets recovered annually"
              value="£378m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Up from £142m in 2015"
              sparklineData={[142, 168, 199, 226, 264, 298, 312, 341, 378]}
              href="#sec-chart"source="Home Office &middot; Asset recovery statistical bulletin"
            />
            <MetricCard
              label="Recovery rate"
              value="3%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Of estimated laundered funds recovered"
              sparklineData={[1.4, 1.7, 1.8, 2.1, 2.2, 2.5, 2.6, 2.8, 3.1]}
              href="#sec-chart"source="Home Office &middot; Asset recovery statistical bulletin"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Criminal asset recovery, 2015&ndash;2024 (&pound; millions)"
              subtitle="Total assets recovered through confiscation, civil recovery, and cash seizure mechanisms."
              series={recoverySeries}
              yLabel="£ millions / %"
              source={{
                name: 'Home Office / NCA',
                dataset: 'Asset recovery statistical bulletin; UKFIU annual report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Asset recovery statistical bulletin. Published annually. gov.uk/government/statistics/asset-recovery-statistical-bulletin</p>
            <p>National Crime Agency &mdash; UK Financial Intelligence Unit annual report. nationalcrimeagency.gov.uk</p>
            <p>HMCTS &mdash; Confiscation order enforcement data. gov.uk/government/organisations/hm-courts-and-tribunals-service</p>
            <p>UK Financial Intelligence Unit &mdash; Suspicious Activity Reports annual report. nationalcrimeagency.gov.uk/who-we-are/publications/suspicious-activity-reports-sars-annual-report</p>
            <p>Recovered assets figure includes confiscation orders, civil recovery orders, cash seizures under POCA 2002, and account freezing orders under Criminal Finances Act 2017. Estimated laundered figure is the HM Treasury / NCA midpoint estimate and is inherently uncertain.</p>
          </div>
        </section>
      </main>
    </>
  )
}
