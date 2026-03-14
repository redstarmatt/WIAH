'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Personal Independence Payment Statistics', url: 'https://www.gov.uk/government/collections/personal-independence-payment-statistics', date: '2024' },
  { num: 2, name: 'HMCTS', dataset: 'Tribunal Statistics Quarterly', url: 'https://www.gov.uk/government/collections/tribunals-statistics', date: '2024' },
  { num: 3, name: 'National Audit Office', dataset: 'Personal Independence Payment', url: 'https://www.nao.org.uk', date: '2023' },
  { num: 4, name: 'Citizens Advice', dataset: 'PIP Assessment Quality Monitoring', url: 'https://www.citizensadvice.org.uk', date: '2024' },
];

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  avgWaitWeeks?: number
  appealOverturnPct?: number
}

interface PipAssessmentData {
  timeSeries: TimeSeries[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PipAssessmentBacklogPage() {
  const [data, setData] = useState<PipAssessmentData | null>(null)

  useEffect(() => {
    fetch('/data/pip-assessment-backlog/pip_assessment_backlog.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const waitSeries: Series[] = data
    ? [
        {
          id: 'avg-wait',
          label: 'Average wait (weeks)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.avgWaitWeeks !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.avgWaitWeeks as number })),
        },
        {
          id: 'appeal-overturn',
          label: 'Appeal overturn rate (%)',
          colour: '#F4A261',
          data: data.timeSeries
            .filter(d => d.appealOverturnPct !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.appealOverturnPct as number })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="PIP Assessment Backlog" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="PIP Assessment Backlog"
          question="How Long Must Disabled People Wait for Benefits?"
          finding="New PIP claimants wait an average of 24 weeks for a decision — and when they appeal, 71% of tribunal decisions overturn the DWP&rsquo;s original ruling."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Personal Independence Payment is the main working-age disability benefit in the UK, replacing Disability Living Allowance from 2013. Average waiting times for a PIP decision rose from 14 weeks in 2015 to a peak of 26 weeks in 2023, before falling slightly to 24 weeks in 2024 — still effectively a six-month wait for people managing health conditions, often without income, while rent, utilities, and care costs continue.<Cite nums={1} /> The appeal overturn rate is the most damning single figure in the system: 71% of independent tribunal decisions in 2024 found in the claimant&rsquo;s favour, overturning the DWP&rsquo;s original ruling.<Cite nums={2} /> A backlog of 216,000 undecided cases sits alongside a proposed 2024 reform to restrict access to the daily living component, paused following parliamentary concern but signalling sustained pressure on eligibility.<Cite nums={1} /></p>
            <p>The burden of a malfunctioning assessment system falls entirely on claimants. Those refused PIP or awarded a lower rate face a mandatory reconsideration process before they can appeal to a tribunal — adding months to an already lengthy process, during which they receive no benefit.<Cite nums={[1, 4]} /> Disabled people in the most deprived areas are least able to afford advice services, travel to assessments, or manage the administrative burden of appeals. The assessment contractors (Capita and Maximus) have faced consistent criticism for assessors with no specialist knowledge of the conditions they are assessing, and criteria that judge what claimants can do on their best day rather than their typical day — a design flaw acknowledged by the Green Paper of 2023 but not yet structurally reformed.<Cite nums={[3, 4]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Wait Times &amp; Appeals' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average PIP wait (2024)"
              value="24 weeks"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slight improvement from 26-week peak · still 6 months"
              sparklineData={[14, 15, 16, 16, 17, 19, 21, 23, 26, 24]}
              href="#sec-chart"source="DWP · PIP Statistics 2024"
            />
            <MetricCard
              label="Appeal overturn rate"
              value="71%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="7 in 10 appeals succeed · original decisions poor quality"
              sparklineData={[58, 58, 62, 62, 62, 62, 62, 68, 72, 71]}
              href="#sec-chart"source="HMCTS · Tribunal Statistics 2024"
            />
            <MetricCard
              label="Cases in backlog"
              value="216k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="uncleared decisions at any one time"
              sparklineData={[80, 90, 100, 110, 130, 160, 190, 210, 220, 216]}
              href="#sec-chart"source="DWP · PIP Statistics Q3 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="PIP average wait times and appeal overturn rates, 2015–2024"
              subtitle="Average weeks from claim to decision (left) and percentage of tribunal appeals decided in claimant&rsquo;s favour (right shown on same scale)."
              series={waitSeries}
              yLabel="Weeks / Percentage"
              source={{
                name: 'DWP / HMCTS',
                dataset: 'PIP Statistics &amp; Tribunal Statistics',
                frequency: 'quarterly (annual shown)',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DWP — Personal Independence Payment Statistics. Published quarterly. gov.uk/government/collections/personal-independence-payment-statistics</p>
            <p>HMCTS — Tribunal Statistics Quarterly. Published quarterly. gov.uk/government/collections/tribunals-statistics</p>
            <p>National Audit Office — Personal Independence Payment (2014, 2016, 2023). nao.org.uk</p>
            <p>Citizens Advice — PIP assessment quality monitoring. citizensadvice.org.uk</p>
            <p>Average wait weeks calculated from DWP administrative data as median time from claim registration to clearance decision. Appeal overturn rate from HMCTS Social Security and Child Support tribunal outcomes, measuring proportion of PIP appeals decided in appellant&rsquo;s favour. Backlog figure represents total PIP claims awaiting clearance at quarter end.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
