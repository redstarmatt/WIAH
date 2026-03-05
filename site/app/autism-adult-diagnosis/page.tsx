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
            <p>The autism assessment waiting list in England has grown from around 22,000 in 2018 &mdash; the first year NHS England collected systematic data &mdash; to over 116,000 in 2024. The average wait from GP referral to first assessment appointment has risen from 1.8 years to 3.6 years over the same period. For many adults this means a significant portion of their working life, parenting years, or formative adult experiences passing without the understanding or support that diagnosis can unlock.</p>
            <p>The surge in demand reflects both increased awareness of autism and broader recognition of how the condition presents across a range of people, including those who were previously missed because their presentation did not fit the historical clinical picture. Women and girls, people from ethnic minority backgrounds, and people with co-occurring conditions such as ADHD or anxiety were historically underdiagnosed. As awareness has grown, referrals have risen sharply &mdash; but diagnostic service capacity has not scaled proportionately. NHS England introduced waiting time standards for autism assessments, but there is no equivalent statutory waiting time target as exists for cancer or elective surgery.</p>
            <p>The consequences of long waits are significant. Adults awaiting assessment frequently report deteriorating mental health during the wait, partly because of the uncertainty and partly because they cannot access the adjustments or support that diagnosis would enable. Employers and universities are under a duty to make reasonable adjustments for disabled employees and students, but in practice many adjustments are easier to secure with a formal diagnosis. The Equality Act protection applies regardless of diagnosis, but the administrative reality is that diagnostic letters open doors that need otherwise remain shut.</p>
            <p>Diagnostic services are primarily provided by the NHS in community mental health teams and specialist neurodevelopmental clinics, supplemented in some areas by voluntary sector and private providers. Workforce is the binding constraint: diagnostic assessments must be conducted by qualified clinicians, including clinical psychologists and specialist nurses, whose supply cannot be rapidly expanded. NHS England has funded additional training and piloted streamlined pathways, but with limited impact on headline waiting list figures.</p>
            <p>Post-diagnostic support is a separate and largely unaddressed gap. Receiving a diagnosis after years of waiting does not automatically result in support, therapy, or intervention. Many adults report being assessed and then discharged with a letter and limited follow-up. The prescription of autism &mdash; understanding what it means for daily life, relationships, and work &mdash; is not routinely provided, and peer support networks are primarily volunteer-run rather than NHS-funded.</p>
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
