'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  mbuBeds: number
  mbuUnits: number
  patientsSeenPct: number
}

interface PerinatalMentalHealthData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PerinatalMentalHealthPage() {
  const [data, setData] = useState<PerinatalMentalHealthData | null>(null)

  useEffect(() => {
    fetch('/data/perinatal-mental-health/perinatal_mental_health.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const mbuBedsSeries: Series[] = data
    ? [
        {
          id: 'mbubeds',
          label: 'Mother and Baby Unit beds',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.mbuBeds })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Perinatal Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Perinatal Mental Health"
          question="Are New Mothers Getting Mental Health Support?"
          finding="One in ten mothers experiences postnatal depression, yet specialist Mother and Baby Units are available in fewer than half of NHS regions."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Perinatal mental health conditions &mdash; those arising during pregnancy or in the year following birth &mdash; affect approximately one in five women in the UK. Postnatal depression alone affects around one in ten new mothers; anxiety disorders, post-traumatic stress disorder related to birth trauma, and the rarer but more serious condition of postpartum psychosis also affect significant numbers. These conditions are treatable, and early intervention substantially improves outcomes for both mothers and children. Yet until relatively recently, specialist services were patchy, under-resourced, and geographically inequitable.</p>
            <p>Mother and Baby Units provide specialist inpatient care for women who need admission during the perinatal period, allowing them to be treated alongside their baby rather than separated from it. Separation is known to harm the mother-infant bond and increase the risk of long-term difficulties for the child. In 2016, there were just 135 MBU beds in England across 13 units &mdash; a provision recognised as woefully inadequate. By 2023, this had grown to 260 beds across 22 units, representing a near-doubling of capacity funded through NHS England&apos;s dedicated perinatal mental health programme.</p>
            <p>Progress in community services has been equally significant. The proportion of women with perinatal mental health needs receiving specialist community care has grown from 14% in 2016 to 40% in 2023. Specialist perinatal mental health teams now operate across all NHS regions, and pathways have been established from maternity services into mental health provision. Health visitors and midwives are better trained to identify women at risk and make appropriate referrals than they were a decade ago.</p>
            <p>But 40% means that 60% of women who need specialist perinatal care are not receiving it. Coverage gaps remain pronounced in rural areas, where community teams may cover large geographies with small caseloads, and in areas of high deprivation, where need is greatest but pathways to care are least well-established. Black and minority ethnic women are known to have higher rates of perinatal mental illness but lower rates of referral and treatment, a disparity that remains insufficiently addressed despite the evidence base.</p>
            <p>The £365 million NHS England investment in perinatal mental health services represents a genuine and substantial commitment. The trajectory is positive. The question now is whether the expansion can be sustained and whether it can reach the women who remain without adequate support. Perinatal mental illness has long-term consequences not just for mothers but for their children, for whom maternal mental health in early life is a significant determinant of developmental outcomes. Investing in this period is investing in the next generation.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'MBU Beds' },
          { id: 'sec-callout', label: 'Progress' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Mother and Baby Unit beds"
              value="260"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="From 135 in 2016 &middot; near-doubled but still short"
              sparklineData={[135, 152, 180, 204, 218, 236, 248, 260]}
              onExpand={() => {}}
              source="NHS England &middot; Perinatal Mental Health 2024"
            />
            <MetricCard
              label="MBU units in England"
              value="22"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Coverage gaps remain in rural areas"
              sparklineData={[13, 14, 16, 18, 19, 20, 21, 22]}
              onExpand={() => {}}
              source="NHS England &middot; Perinatal Mental Health 2024"
            />
            <MetricCard
              label="Women receiving specialist care"
              value="40%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Still 60% without access &middot; deprivation gap"
              sparklineData={[14, 18, 23, 28, 30, 34, 37, 40]}
              onExpand={() => {}}
              source="NHS England &middot; Perinatal Mental Health 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Mother and Baby Unit beds in England, 2016&ndash;2023"
              subtitle="Total specialist inpatient beds for perinatal mental health, allowing mother and baby to remain together during treatment."
              series={mbuBedsSeries}
              yLabel="MBU beds"
              source={{
                name: 'NHS England',
                dataset: 'Perinatal Mental Health Programme',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Major Expansion in Perinatal Services"
              value="260"
              unit="MBU beds"
              description="Mother and Baby Unit beds have nearly doubled since 2016. NHS England's perinatal mental health programme has invested £365 million, meaning more mothers than ever can access specialist inpatient care."
              source="NHS England, Perinatal Mental Health Programme, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Perinatal Mental Health Programme. england.nhs.uk/mental-health/adults/perinatal-mental-health/</p>
            <p>Mental Health Services Data Set (MHSDS) &mdash; Perinatal mental health dashboard. digital.nhs.uk</p>
            <p>MBU bed counts include all commissioned specialist Mother and Baby Unit beds in England. &apos;Women receiving specialist care&apos; includes both inpatient MBU placements and community perinatal mental health team contacts. Prevalence estimate of 1 in 5 covers all perinatal mental health conditions including postnatal depression, anxiety and PTSD.</p>
          </div>
        </section>
      </main>
    </>
  )
}
