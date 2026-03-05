'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="Just 64% of people with dementia receive a formal diagnosis &mdash; and 40% get no structured post-diagnostic support, despite the Prime Minister&rsquo;s Dementia Challenge."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>There are an estimated 944,000 people living with dementia in the UK. Of these, around 64% have a formal diagnosis &mdash; a figure that has barely moved in a decade, despite the government&rsquo;s stated target of 67% and the attention of successive Prime Ministers&rsquo; Dementia Challenges. Without a diagnosis, people with dementia cannot access specialist support, their carers cannot access carer support, and the risk of avoidable crisis episodes &mdash; hospital admissions, safeguarding incidents &mdash; is substantially higher. Diagnosis rates fell sharply during COVID-19 as GP access decreased, and have not fully recovered.</p>
            <p>The barriers to diagnosis are multiple. Many people with early dementia symptoms do not seek help, either because they do not recognise the symptoms as medical, because they fear the implications of a diagnosis, or because stigma around cognitive decline remains powerful. GPs may not initiate diagnostic pathways with older patients, either because of time pressures or because of an assumption that cognitive decline is a normal part of ageing. Memory clinics &mdash; the specialist pathway for diagnosis &mdash; face long waiting times in many areas, reducing the incentive for referral when the system downstream is congested.</p>
            <p>Post-diagnostic support is equally patchy. A diagnosis of dementia triggers access to a care pathway that, in principle, includes a named care coordinator, a personalised care plan, and regular review. In practice, 40% of people with dementia report receiving no structured post-diagnostic support. This reflects both resource constraints in NHS memory services and a lack of commissioning prioritisation in many integrated care systems. The economic case for post-diagnostic support is clear: people with dementia who receive structured support have lower rates of crisis admission, later entry into residential care, and better quality of life &mdash; all of which reduce costs as well as improving outcomes.</p>
            <p>Carers of people with dementia are disproportionately affected by support gaps. Around 700,000 people in the UK are caring for someone with dementia, providing an estimated 1.34 billion hours of unpaid care annually. Carer support services &mdash; including respite, Admiral Nurses, and carer support groups &mdash; are inconsistently available and significantly underfunded. The Alzheimer&rsquo;s Society estimates that unpaid dementia carers provide more care per person than carers in any other condition group, and that their own health and economic outcomes suffer significantly as a result.</p>
            <p>The dementia challenge intersects with the broader social care crisis. As dementia progresses, most people move into residential or nursing care, typically funded through means-testing that depletes accumulated wealth before state support kicks in. The care home quality picture (separately documented) is directly relevant here: people with dementia are overrepresented among care home residents, and the quality of care for people with dementia in residential settings is a specific concern, with CQC inspections repeatedly identifying inadequate dementia training and inappropriate use of antipsychotic medication as recurring issues.</p>
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
              changeText="below 67% NHS target &middot; COVID setback not recovered"
              sparklineData={[61.4, 66.1, 67.6, 67.8, 67.4, 62.3, 62.7, 63.3, 64.1]}
              onExpand={() => {}}
              source="NHS England &middot; Dementia Assessment 2023"
            />
            <MetricCard
              label="Receiving post-diagnostic support"
              value="60%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="improving &middot; 40% still not receiving structured support"
              sparklineData={[55, 56, 57, 58, 58, 56, 57, 59, 60]}
              onExpand={() => {}}
              source="Alzheimer&rsquo;s Society &middot; Dementia APPG 2023"
            />
            <MetricCard
              label="Cost of delayed diagnosis"
              value="&pound;12,500"
              unit="/person/yr"
              direction="flat"
              polarity="up-is-bad"
              changeText="per year in avoidable acute care"
              sparklineData={[12500, 12500, 12500, 12500, 12500, 12500]}
              onExpand={() => {}}
              source="London School of Economics &middot; Dementia UK Cost Study"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Dementia diagnosis rate, 2015&ndash;2023"
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
            <p>NHS England &mdash; Dementia Assessment and Referral Dashboard. Published monthly. england.nhs.uk/mental-health/dementia/dementia-assessment</p>
            <p>Alzheimer&rsquo;s Society &mdash; Dementia UK report (2021). alzheimers.org.uk/about-us/policy-and-influencing/dementia-uk-report</p>
            <p>All-Party Parliamentary Group on Dementia &mdash; Annual reports. alzheimers.org.uk/get-involved/our-campaigns/all-party-parliamentary-group-dementia</p>
            <p>London School of Economics &mdash; Dementia UK Cost Study. lse.ac.uk</p>
            <p>Diagnosis rate calculated as number of people with a recorded dementia diagnosis on GP registers divided by estimated total dementia prevalence (from CPRD/Alzheimer&rsquo;s Society modelling). Post-diagnostic support figure from APPG survey of CCGs/ICBs. Cost of delayed diagnosis from LSE modelling of avoidable acute admissions and earlier care home entry attributable to late diagnosis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
