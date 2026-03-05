'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface CivilLegalAidDesertsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    totalCases: number
    housingDesertsPct: number
    litigantsInPersonPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CivilLegalAidDesertsPage() {
  const [data, setData] = useState<CivilLegalAidDesertsData | null>(null)

  useEffect(() => {
    fetch('/data/civil-legal-aid-deserts/civil_legal_aid_deserts.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const legalAidSeries: Series[] = data
    ? [
        {
          id: 'housingDeserts',
          label: 'Areas with no housing legal aid (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.housingDesertsPct,
          })),
        },
        {
          id: 'litigantsInPerson',
          label: 'Litigants in person in family courts (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.litigantsInPersonPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Civil Legal Aid Deserts" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Civil Legal Aid Deserts"
          question="Can you get legal advice if you can&apos;t afford a solicitor?"
          finding="54% of local authority areas in England and Wales have no housing legal aid provider, leaving millions without access to legal help."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Legal Aid, Sentencing and Punishment of Offenders Act 2012 removed housing, family, welfare benefits, immigration, and employment advice from civil legal aid scope, cutting total cases from around 968,000 in 2010 to under 400,000 by 2024 &mdash; a 60% reduction. The Law Society&apos;s provider mapping found that 54% of local authority areas in England and Wales now have no housing legal aid provider and 40% have no immigration legal aid provider. These legal aid deserts are concentrated in rural areas, coastal towns, and deprived communities where demand is highest but the commercial case for a legal aid practice is weakest. In the family courts, litigants in person rose from 17% of parties in 2010 to 36% in 2023, with domestic abuse survivors among those navigating complex child arrangements proceedings without legal help.</p>
            <p>Law centres, Citizens Advice, and voluntary sector providers have partially filled the gap, but all face sustained funding pressure from local authority and charitable cuts while demand has risen sharply with cost-of-living pressures. The government increased means test thresholds in 2023 and restored some family law legal aid, but the post-LASPO architecture remains intact. Provider markets in many areas of law have contracted to a point where even restored funding would take years to produce available advice &mdash; the firms and practitioners no longer exist. The Access to Justice Foundation estimates millions of people face legal problems each year with no legal help, allowing problems to compound into crises.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Legal Aid Deserts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Areas with no housing legal aid"
              value="54%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Of local authority areas — up from 21% in 2010"
              sparklineData={[21, 24, 27, 33, 36, 38, 40, 43, 46]}
              href="#sec-chart"source="Law Society &middot; Legal aid desert mapping"
            />
            <MetricCard
              label="Fall in legal aid cases since 2010"
              value="60%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="From 968,000 to under 400,000 annually"
              sparklineData={[968, 924, 876, 598, 527, 489, 467, 445, 421]}
              href="#sec-chart"source="Ministry of Justice &middot; Legal aid statistics"
            />
            <MetricCard
              label="Litigants in person in family courts"
              value="36%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 17% in 2010"
              sparklineData={[17, 19, 21, 25, 27, 28, 29, 30, 31]}
              href="#sec-chart"source="HMCTS &middot; Family court statistics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Legal aid cases and deserts, 2010&ndash;2024"
              subtitle="Percentage of local authority areas with no housing legal aid provider and litigants in person rate."
              series={legalAidSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'Ministry of Justice / Law Society',
                dataset: 'Legal aid statistics; legal aid desert mapping',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice &mdash; Legal aid statistics. Published quarterly. gov.uk/government/collections/legal-aid-statistics</p>
            <p>Legal Aid Agency &mdash; Provider data and contract information. gov.uk/government/organisations/legal-aid-agency</p>
            <p>Law Society &mdash; Legal aid deserts report and provider mapping. lawsociety.org.uk</p>
            <p>Access to Justice Foundation &mdash; Civil legal need research. atjf.org.uk</p>
            <p>Legal aid desert classification is based on absence of a registered legal aid provider under the Legal Aid Agency framework for that area of law within the local authority boundary. The large reduction in total cases in 2013 reflects the LASPO Act removing categories of civil law from scope. Litigants in person data is from HMCTS family court quarterly statistics.</p>
          </div>
        </section>
      </main>
    </>
  )
}
