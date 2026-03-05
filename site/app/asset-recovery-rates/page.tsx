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
            <p>Criminal asset recovery is one of the most powerful tools available to law enforcement — the principle that crime should not pay is both a deterrent and a means of disrupting the financial infrastructure of organised crime. The Proceeds of Crime Act 2002 gave UK authorities broad powers to confiscate, restrain, and civilly recover the proceeds of crime, making the UK framework one of the most comprehensive in the world in legislative terms. The practical story is considerably more modest.</p>
            <p>The National Crime Agency estimates that at least £12 billion is laundered through the UK financial system each year, with some estimates significantly higher once international flows are included. Against this, Home Office statistics show that total asset recovery across all mechanisms — criminal confiscation orders, civil recovery orders, cash seizures, and account freezing orders — amounted to approximately £378 million in 2023. The implied recovery rate of around 3% has improved from roughly 1.4% in 2015, reflecting investment in specialist financial investigation capacity and expanded use of account freezing orders introduced under the Criminal Finances Act 2017.</p>
            <p>The gap between confiscation orders made by courts and money actually collected remains significant. HMCTS data consistently shows that around £2 billion in active confiscation orders remains unenforced at any given time — defendants have hidden assets, moved money offshore, or died. The incentive structure for enforcement is imperfect: the Consolidated Fund receives the proceeds of confiscation, creating limited financial motivation for individual agencies to prioritise enforcement over new investigations. Reforms to create direct funding incentives for enforcement agencies from recovered assets have been debated repeatedly but not fully implemented.</p>
            <p>Unexplained Wealth Orders, introduced in 2018, attracted significant publicity as a tool for targeting politically exposed persons and high-value suspicious assets. In practice, their use has been limited: fewer than ten had been issued by 2024, and legal challenges by respondents have been resource-intensive for the National Crime Agency. The threshold for UWO issuance requires a significant evidential investment before any assets are frozen, and the complexity of international asset tracing means cases take years to resolve. High-profile cases have had mixed outcomes.</p>
            <p>The UK&apos;s status as a major international financial centre creates a particular challenge. Professionals — lawyers, accountants, company formation agents — are required to file Suspicious Activity Reports when they identify potential money laundering, but the volume of SARs (around 900,000 in 2023) far exceeds the capacity of law enforcement to analyse and act on them. The UK Financial Intelligence Unit, hosted by the NCA, processes these but conversion from SAR to investigation to recovery is low. Regulatory action by the Financial Conduct Authority against banks failing to prevent money laundering has increased in frequency but fines remain a small fraction of the flows they are designed to deter.</p>
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
              onExpand={() => {}}
              source="NCA &middot; UK Financial Intelligence Unit annual report"
            />
            <MetricCard
              label="Assets recovered annually"
              value="£378m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Up from £142m in 2015"
              sparklineData={[142, 168, 199, 226, 264, 298, 312, 341, 378]}
              onExpand={() => {}}
              source="Home Office &middot; Asset recovery statistical bulletin"
            />
            <MetricCard
              label="Recovery rate"
              value="3%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Of estimated laundered funds recovered"
              sparklineData={[1.4, 1.7, 1.8, 2.1, 2.2, 2.5, 2.6, 2.8, 3.1]}
              onExpand={() => {}}
              source="Home Office &middot; Asset recovery statistical bulletin"
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
