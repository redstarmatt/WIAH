'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface AutismAdultDiagnosisData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    waitingListK: number
    avgWaitYears: number
    newDiagnosesK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function AutismAdultDiagnosisPage() {
  const [data, setData] = useState<AutismAdultDiagnosisData | null>(null)

  useEffect(() => {
    fetch('/data/autism-adult-diagnosis/autism_adult_diagnosis.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const waitingSeries: Series[] = data
    ? [
        {
          id: 'waitingList',
          label: 'Waiting list (thousands)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.waitingListK,
          })),
        },
        {
          id: 'avgWait',
          label: 'Average wait (years)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgWaitYears,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Autism Adult Diagnosis" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Autism Adult Diagnosis"
          question="How long does it take to get an autism diagnosis as an adult?"
          finding="The average wait for an adult autism assessment in England is now 3.6 years, with over 116,000 people on the waiting list."
          colour="#264653"
        />

        <ScrollReveal>
          <PositiveCallout
            title="Diagnosis rates rising"
            value="350k"
            unit="adults diagnosed in past five years"
            description="An estimated 350,000 adults received an autism diagnosis in the past five years as awareness and referral pathways improved. For those who reach the front of the queue, a diagnosis provides access to adjustments at work and in education, peer support communities, and a framework for understanding lifelong experiences."
            source="Source: NHS England &mdash; Autism Statistics; Autistica &mdash; prevalence research."
          />
        </ScrollReveal>

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The adult autism assessment waiting list in England grew from 22,000 in 2018 &mdash; the first year NHS England collected systematic data &mdash; to over 116,000 by 2024. The average wait from GP referral to first assessment has risen from 1.8 years to 3.6 years over the same period. Demand has surged as awareness of how autism presents across diverse populations has grown &mdash; women and girls, people from ethnic minority backgrounds, and those with co-occurring conditions were historically underdiagnosed &mdash; but diagnostic service capacity has not scaled proportionately. NHS England introduced waiting time standards but there is no statutory target equivalent to cancer or elective surgery waits. Workforce is the binding constraint: assessments require qualified clinical psychologists and specialist nurses whose supply cannot be rapidly expanded. Around 350,000 adults have received a diagnosis in the past five years, but many more remain undiagnosed or waiting.</p>
            <p>The consequences of long waits fall hardest on those already most disadvantaged. Adults awaiting assessment report deteriorating mental health during the wait; employers and universities are legally required to make reasonable adjustments regardless of diagnosis, but in practice a diagnostic letter opens doors that otherwise remain shut. Post-diagnostic support is a further gap: many adults report being assessed and discharged with a letter and minimal follow-up, with peer support networks primarily volunteer-run rather than NHS-funded. Women receive diagnoses an average of four to five years later than men, compounding years of unmet need; autistic adults in the prison population &mdash; estimated at several times the general population rate &mdash; rarely receive formal assessment at all.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Waiting List' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average wait for adult diagnosis"
              value="3.6 yrs"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 1.8 years in 2018"
              sparklineData={[1.8, 2.1, 2.4, 2.7, 3.1, 3.4, 3.6, 3.6, 3.6]}
              onExpand={() => {}}
              source="NHS England &middot; Autism Waiting Times"
            />
            <MetricCard
              label="On waiting list"
              value="116k"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 22k in 2018"
              sparklineData={[22, 34, 48, 64, 84, 105, 116, 116, 116]}
              onExpand={() => {}}
              source="NHS England &middot; Autism Waiting Times"
            />
            <MetricCard
              label="New diagnoses in past 5 years"
              value="350k"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Rising awareness and referrals"
              sparklineData={[45, 52, 41, 58, 68, 74, 78, 78, 78]}
              onExpand={() => {}}
              source="NHS England &middot; Autistica"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Adult autism waiting list, 2018&ndash;2024"
              subtitle="People awaiting first autism assessment appointment (thousands) and average wait in years, England."
              series={waitingSeries}
              yLabel="Value"
              source={{
                name: 'NHS England',
                dataset: 'Autism Waiting Times Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Autism Waiting Times Statistics. Quarterly data from autism assessment services. england.nhs.uk/statistics/statistical-work-areas/autism-statistics/</p>
            <p>NHSBSA &mdash; Prescription Cost Analysis. Used to estimate diagnosis rates via prescription patterns. nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis-england</p>
            <p>Autistica &mdash; Autism research and evidence. autistica.org.uk/research/research-strategy</p>
            <p>ONS &mdash; Disability and health data for England and Wales. ons.gov.uk</p>
            <p>Waiting list figures are those awaiting first appointment with an autism assessment service. Average wait is calculated from referral date to first assessment. Data collection began systematically in 2018; earlier figures are not available on a comparable basis. New diagnoses figure is an estimate based on clinical and prescribing data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
