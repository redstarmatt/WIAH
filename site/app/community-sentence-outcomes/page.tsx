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

interface CommunitySentenceOutcomesData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    communityReoffendingPct: number
    shortCustodialReoffendingPct: number
    completionRatePct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CommunitySentenceOutcomesPage() {
  const [data, setData] = useState<CommunitySentenceOutcomesData | null>(null)

  useEffect(() => {
    fetch('/data/community-sentence-outcomes/community_sentence_outcomes.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const reoffendingSeries: Series[] = data
    ? [
        {
          id: 'community',
          label: 'Community sentence reoffending (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.communityReoffendingPct,
          })),
        },
        {
          id: 'custodial',
          label: 'Short prison sentence reoffending (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.shortCustodialReoffendingPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Community Sentence Outcomes" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Sentence Outcomes"
          question="Do community sentences actually reduce reoffending?"
          finding="People given community sentences reoffend at a rate of 32%, compared to 45% for those given short custodial sentences."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ministry of Justice proven reoffending data shows consistently that one-year reoffending rates for community orders average around 32%, compared with approximately 45% for sentences under 12 months in custody — a 13 percentage-point gap that has been stable since 2015. Short prison sentences are too brief to deliver rehabilitation but long enough to sever employment, housing, and family ties that protect against reoffending, leaving people in a worse position on release. Community orders can attach conditions — unpaid work, drug treatment, alcohol monitoring, mental health treatment — while preserving those protective social ties. Completion rates improved to 68% in 2023, despite probation vacancy rates exceeding 20% in some regions and rising caseloads following COVID-19 court backlogs.</p>
            <p>Despite the reoffending evidence, sentencing trends have moved against community orders over the past decade. Mandatory minimums, knife possession thresholds, and political pressure to appear tough on crime have all pushed toward longer custodial sentences. The 2017 revision of magistrates' sentencing guidelines moved custody to the default for certain offences where community-first had previously applied. The evidence for community sentences is strongest for low-level acquisitive crime driven by drug dependence; drug rehabilitation requirement completion is associated with significant reoffending reductions. The gap between what the evidence supports and what sentencing policy delivers continues to widen.</p>
          </div>
        </section>

        <ScrollReveal>
          <PositiveCallout
            title="Better outcomes than prison"
            value="32%"
            description="Community sentence reoffending rates are consistently 13 percentage points lower than for short prison terms, suggesting alternatives to custody can be more effective."
            source="Source: Ministry of Justice — Proven reoffending statistics. Published annually."
          />
        </ScrollReveal>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Reoffending Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Community sentence reoffending"
              value="32%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 34% in 2015"
              sparklineData={[34, 33, 33, 33, 32, 32, 32, 32, 32]}
              href="#sec-chart"source="Ministry of Justice · Proven reoffending statistics"
            />
            <MetricCard
              label="Short prison sentence reoffending"
              value="45%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 47% in 2015 — still 13pp higher"
              sparklineData={[47, 47, 46, 46, 46, 45, 45, 45, 45]}
              href="#sec-chart"source="Ministry of Justice · Proven reoffending statistics"
            />
            <MetricCard
              label="Community orders completed"
              value="68%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Successfully completed without breach"
              sparklineData={[65, 66, 66, 67, 67, 66, 67, 68, 68]}
              href="#sec-chart"source="HMPPS · Community performance annual digest"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Reoffending rates: community vs custodial, 2015–2023"
              subtitle="One-year proven reoffending rates for community orders compared with sentences under 12 months."
              series={reoffendingSeries}
              yLabel="Reoffending rate (%)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Proven reoffending statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice — Proven reoffending statistics. Published annually. gov.uk/government/collections/proven-reoffending-statistics</p>
            <p>HMPPS — Community performance annual digest. Published annually. gov.uk/government/organisations/her-majestys-prison-and-probation-service</p>
            <p>Criminal Justice Joint Inspectorates — Inspections of probation and community supervision. justiceinspectorates.gov.uk</p>
            <p>Reoffending rate is the proportion of offenders committing at least one proven reoffence within a one-year follow-up period. Proven reoffending captures only recorded offences — actual reoffending is higher. Comparison between community and custodial groups does not constitute a randomised trial; selection effects apply as judges assign sentence type partly based on risk assessment.</p>
          </div>
        </section>
      </main>
    </>
  )
}
