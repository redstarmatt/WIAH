'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  diagnosisRatePct?: number
  postDiagnosticSupportPct?: number
}

interface DementiaSupportData {
  timeSeries: TimeSeries[]
  target: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DementiaSupportGapsPage() {
  const [data, setData] = useState<DementiaSupportData | null>(null)

  useEffect(() => {
    fetch('/data/dementia-support-gaps/dementia_support_gaps.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const diagnosisSeries: Series[] = data
    ? [{
        id: 'diagnosis-rate',
        label: 'Dementia diagnosis rate (%)',
        colour: '#E63946',
        data: data.timeSeries
          .filter(d => d.diagnosisRatePct !== undefined)
          .map(d => ({ date: yearToDate(d.year), value: d.diagnosisRatePct as number })),
      }]
    : []

  const targetAnnotation = data
    ? { value: data.target, label: 'NHS Target 67%' }
    : undefined

  return (
    <>
      <TopicNav topic="Dementia Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dementia Support Gaps"
          question="Are People with Dementia Getting the Care They Need?"
          finding="Just 64% of people with dementia receive a formal diagnosis — and 40% get no structured post-diagnostic support, despite the Prime Minister&rsquo;s Dementia Challenge."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>An estimated 944,000 people live with dementia in the UK, yet only around 64% have a formal diagnosis — below the NHS target of 67% and a figure that has barely moved in a decade despite successive Prime Ministers&rsquo; Dementia Challenges. COVID-19 caused diagnosis rates to fall sharply as GP access contracted, and they have not fully recovered. Without a diagnosis, people with dementia cannot access specialist support, carers cannot access carer services, and the risk of avoidable hospital admissions and safeguarding incidents rises substantially. Post-diagnostic support is equally patchy: in principle a diagnosis triggers a named care coordinator, personalised care plan, and regular review; in practice 40% of people with dementia report receiving no structured support after diagnosis, reflecting both NHS memory service resource constraints and inconsistent ICS commissioning.</p>
            <p>Carers bear the invisible cost of these gaps. Around 700,000 people in the UK care for someone with dementia, providing an estimated 1.34 billion hours of unpaid care annually — more hours per person than carers of any other condition group. Carer support services — respite, Admiral Nurses, support groups — are inconsistently available and significantly underfunded. As dementia progresses, most people move into residential or nursing care funded through means-testing that depletes accumulated wealth before state support begins, while CQC inspections consistently identify inadequate dementia training and inappropriate antipsychotic use in care home settings.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Diagnosis Rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Dementia diagnosis rate"
              value="64.1%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="below 67% NHS target · COVID setback not recovered"
              sparklineData={[61.4, 66.1, 67.6, 67.8, 67.4, 62.3, 62.7, 63.3, 64.1]}
              href="#sec-chart"source="NHS England · Dementia Assessment 2023"
            />
            <MetricCard
              label="Receiving post-diagnostic support"
              value="60%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="improving · 40% still not receiving structured support"
              sparklineData={[55, 56, 57, 58, 58, 56, 57, 59, 60]}
              href="#sec-chart"source="Alzheimer&rsquo;s Society · Dementia APPG 2023"
            />
            <MetricCard
              label="Cost of delayed diagnosis"
              value="£12,500"
              unit="/person/yr"
              direction="flat"
              polarity="up-is-bad"
              changeText="per year in avoidable acute care"
              sparklineData={[12500, 12500, 12500, 12500, 12500, 12500]}
              href="#sec-chart"source="London School of Economics · Dementia UK Cost Study"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Dementia diagnosis rate, 2015–2023"
              subtitle="Estimated percentage of people with dementia who have a formal clinical diagnosis. NHS target: 67%."
              series={diagnosisSeries}
              targetLine={targetAnnotation}
              yLabel="Diagnosis rate (%)"
              source={{
                name: 'NHS England',
                dataset: 'Dementia Assessment and Referral Dashboard',
                frequency: 'monthly (annual shown)',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England — Dementia Assessment and Referral Dashboard. Published monthly. england.nhs.uk/mental-health/dementia/dementia-assessment</p>
            <p>Alzheimer&rsquo;s Society — Dementia UK report (2021). alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report</p>
            <p>All-Party Parliamentary Group on Dementia — Annual reports. alzheimers.org.uk/get-involved/our-campaigns/all-party-parliamentary-group-dementia</p>
            <p>London School of Economics — Dementia UK Cost Study. lse.ac.uk</p>
            <p>Diagnosis rate calculated as number of people with a recorded dementia diagnosis on GP registers divided by estimated total dementia prevalence (from CPRD/Alzheimer&rsquo;s Society modelling). Post-diagnostic support figure from APPG survey of CCGs/ICBs. Cost of delayed diagnosis from LSE modelling of avoidable acute admissions and earlier care home entry attributable to late diagnosis.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
