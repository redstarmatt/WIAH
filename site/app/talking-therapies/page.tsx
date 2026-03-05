'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TherapyPoint {
  date: string
  referrals: number
  starts: number
  completions: number
  recoveryRate: number
}

interface TalkingTherapiesData {
  national: {
    timeSeries: TherapyPoint[]
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function TalkingTherapiesPage() {
  const [data, setData] = useState<TalkingTherapiesData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/talking-therapies/talking_therapies.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load talking therapies data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const throughputSeries: Series[] = [
    {
      id: 'referrals',
      label: 'Referrals',
      colour: '#6B7280',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: Math.round(d.referrals / 1000),
      })),
    },
    {
      id: 'starts',
      label: 'Starts',
      colour: '#264653',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: Math.round(d.starts / 1000),
      })),
    },
    {
      id: 'completions',
      label: 'Completions',
      colour: '#2A9D8F',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: Math.round(d.completions / 1000),
      })),
    },
  ]

  const recoverySeries: Series[] = [
    {
      id: 'recovery-rate',
      label: 'National recovery rate (%)',
      colour: '#2A9D8F',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.recoveryRate,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="NHS Talking Therapies" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Talking Therapies"
          question="Can You Actually Access NHS Therapy?"
          finding="NHS Talking Therapies treats 1.2 million people annually &mdash; but 1 in 3 people referred never start treatment, and recovery rates vary from 40&percnt; to 75&percnt; between providers, making postcode a significant predictor of outcome."
          colour="#2A9D8F"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS Talking Therapies &mdash; established in 2008 as the world&apos;s first large-scale, population-level psychological therapy programme &mdash; now treats over 1.2 million people per year through approximately 60 commissioned services in England. The national recovery rate reached 52.3&percnt; in 2023, above the 50&percnt; target, up from around 45&percnt; in 2016. But access barriers remain the programme&apos;s most persistent problem: of 1.6 million referrals received in 2023, around 450,000 people who were referred did not start therapy. Average waiting times have grown from three weeks in 2016 to approximately six weeks in 2023 as demand has outpaced capacity, and self-referral rates have grown from 30&percnt; to over 40&percnt; of all referrals.</p>
            <p>The programme&apos;s benefits are not evenly distributed. Recovery rates across 60 commissioned services ranged from below 40&percnt; to above 75&percnt; in 2023, making postcode a significant predictor of outcome. South Asian communities are referred at roughly half the rate of white British people relative to their prevalence of depression and anxiety. Older adults over 65 are referred at the lowest rate of any age group. People with severe mental illness, personality disorders, or significant trauma histories are largely excluded from the programme&apos;s scope. The shift to remote delivery &mdash; over 60&percnt; of sessions by video or telephone in 2023 &mdash; has expanded reach while raising unresolved questions about clinical equivalence.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-throughput', label: 'Referrals &amp; Completions' },
          { id: 'sec-recovery', label: 'Recovery Rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People completing NHS Talking Therapies"
              value="1.2M"
              unit="/yr"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Stable at record levels"
              sparklineData={[0.9, 1.0, 1.1, 1.1, 0.7, 1.0, 1.1, 1.2]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Recovery rate"
              value="52.3"
              unit="%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Target: 50% &middot; Meets target"
              sparklineData={[45, 47, 49, 50, 48, 50, 52, 52]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Waiting time to first appointment"
              value="5.8"
              unit="wks"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Up from 3 weeks in 2016"
              sparklineData={[3, 3.5, 4, 4.5, 5, 5.5, 5.7, 5.8]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-throughput" className="mb-12">
            <LineChart
              title="NHS Talking Therapies: referrals, starts and completions, 2016&ndash;2023"
              subtitle="Annual totals in thousands. Gap between referrals and starts represents people who did not begin treatment."
              series={throughputSeries}
              yLabel="People (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'NHS Talking Therapies Monthly Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-recovery" className="mb-12">
            <LineChart
              title="NHS Talking Therapies national recovery rate, 2016&ndash;2023"
              subtitle="Proportion of completers moving below clinical caseness threshold on anxiety or depression measure."
              series={recoverySeries}
              yLabel="Recovery rate (%)"
              targetLine={{ value: 50, label: 'NHS target (50%)' }}
              source={{
                name: 'NHS England',
                dataset: 'NHS Talking Therapies Monthly Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Internationally recognised as the world&apos;s largest evidence-based therapy programme"
            value="1.2M"
            description="NHS Talking Therapies is internationally recognised as the world&apos;s largest evidence-based psychological therapy programme &mdash; a genuine NHS success story at scale. With a national recovery rate exceeding its 50&percnt; target and over 1.2 million people treated annually, it demonstrates that structured psychological therapies can be delivered at population scale within a publicly funded health system. Multiple countries &mdash; including Australia, Canada, and Sweden &mdash; have developed national programmes explicitly modelled on the NHS IAPT approach."
            source="Source: NHS England &mdash; NHS Talking Therapies Five Year Forward View, 2023 progress report."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; NHS Talking Therapies Monthly Statistics (formerly IAPT). Monthly patient-level returns from all commissioned talking therapy services in England. Covers referrals, starts, completions, waiting times, and recovery rates by provider.</p>
            <p>Recovery rate: proportion of people completing treatment (attending two or more sessions) who moved from at or above the clinical caseness threshold on the PHQ-9 (depression) or GAD-7 (anxiety) to below that threshold at discharge. Calculated at national and provider level.</p>
            <p>Waiting times measure calendar days from referral date to first treatment session date. Provider-level recovery rates from NHS England published data tables. Self-referral rates from programme annual reports. Data covers England only; Wales, Scotland, and Northern Ireland operate separate programmes.</p>
          </div>
        </section>
      </main>
    </>
  )
}
