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
            <p>The evidence on community sentences versus short custodial sentences has been consistent for two decades: people sentenced to community orders reoffend at significantly lower rates than those sentenced to short prison terms. Ministry of Justice proven reoffending data shows that one-year reoffending rates for community orders have averaged around 32% since 2015, compared with approximately 45% for sentences of under 12 months in custody. This 13 percentage point gap has remained broadly stable despite significant changes to probation delivery, sentencing guidelines, and the scale of the prison population.</p>
            <p>The reasons for this difference are contested but plausible. Short prison sentences are too brief to deliver meaningful rehabilitation but long enough to rupture employment, housing, and family relationships that are protective against reoffending. A person serving a two-month sentence loses their flat, their job, and may lose contact with their children, returning to the community in a worse position than when they entered. Community orders, by contrast, can attach conditions — unpaid work, drug treatment, alcohol monitoring, mental health treatment — while preserving the social ties that support desistance.</p>
            <p>Completion rates for community orders — the proportion successfully completed without breach — were 68% in 2023, having improved modestly over the past decade despite the turbulence of the Transforming Rehabilitation privatisation experiment launched in 2013 and partially reversed with the National Probation Service reunification in 2021. The probation workforce crisis, with vacancy rates of over 20% in some regions, constrains the intensity of supervision that community sentences can deliver, and caseload levels have risen significantly as court throughput increased following COVID-19 delays.</p>
            <p>Sentencing trends have moved against community orders over the past decade despite the reoffending evidence. The proportion of indictable offence sentencing resulting in community orders has declined as average sentence lengths have increased. Mandatory minimum sentences for certain offences, knife possession thresholds, and political pressure to appear tough on crime have all contributed. Magistrates&apos; sentencing guidelines were revised in 2017 to emphasise custody as the default for certain offences where it would previously have been community-first.</p>
            <p>The case for expanding community sentencing is strongest for low-level acquisitive crime driven by drug dependence, where treatment orders have shown the most consistent evidence of effectiveness. Drug rehabilitation requirement completion is associated with significant reductions in reoffending. The case is weaker for serious violence, where both public protection and the evidence on sentence effectiveness point to custody. The policy challenge is ensuring that the sentencing framework — and judicial culture — directs community sentences to the cases where they are most likely to work.</p>
          </div>
        </section>

        <ScrollReveal>
          <PositiveCallout
            title="Better outcomes than prison"
            value="32%"
            description="Community sentence reoffending rates are consistently 13 percentage points lower than for short prison terms, suggesting alternatives to custody can be more effective."
            source="Source: Ministry of Justice &mdash; Proven reoffending statistics. Published annually."
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
              onExpand={() => {}}
              source="Ministry of Justice &middot; Proven reoffending statistics"
            />
            <MetricCard
              label="Short prison sentence reoffending"
              value="45%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 47% in 2015 — still 13pp higher"
              sparklineData={[47, 47, 46, 46, 46, 45, 45, 45, 45]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; Proven reoffending statistics"
            />
            <MetricCard
              label="Community orders completed"
              value="68%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Successfully completed without breach"
              sparklineData={[65, 66, 66, 67, 67, 66, 67, 68, 68]}
              onExpand={() => {}}
              source="HMPPS &middot; Community performance annual digest"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Reoffending rates: community vs custodial, 2015&ndash;2023"
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
            <p>Ministry of Justice &mdash; Proven reoffending statistics. Published annually. gov.uk/government/collections/proven-reoffending-statistics</p>
            <p>HMPPS &mdash; Community performance annual digest. Published annually. gov.uk/government/organisations/her-majestys-prison-and-probation-service</p>
            <p>Criminal Justice Joint Inspectorates &mdash; Inspections of probation and community supervision. justiceinspectorates.gov.uk</p>
            <p>Reoffending rate is the proportion of offenders committing at least one proven reoffence within a one-year follow-up period. Proven reoffending captures only recorded offences — actual reoffending is higher. Comparison between community and custodial groups does not constitute a randomised trial; selection effects apply as judges assign sentence type partly based on risk assessment.</p>
          </div>
        </section>
      </main>
    </>
  )
}
