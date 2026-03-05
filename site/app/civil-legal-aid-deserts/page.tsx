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
            <p>Access to legal advice is a precondition for access to justice, and access to legal advice depends on either being able to afford a solicitor or being eligible for legal aid. Since the Legal Aid, Sentencing and Punishment of Offenders Act 2012 came into force in April 2013, the scope of civil legal aid has been dramatically narrowed. Housing, family, welfare benefits, immigration, and employment advice — previously available to those below income thresholds — were removed from scope or made subject to much stricter merits and means tests. Total civil legal aid cases fell from around 968,000 in 2010 to under 400,000 by 2024, a reduction of approximately 60%.</p>
            <p>The consequence for geographic access to legal advice has been severe. The Law Society has mapped the location of legal aid providers across England and Wales and found that 54% of local authority areas have no housing legal aid provider. For immigration law, 40% of areas have no provider. These &apos;legal aid deserts&apos; are not evenly distributed — they are concentrated in rural areas, coastal towns, and areas of high deprivation where demand for legal advice is greatest but the economic case for a legal aid practice is weakest. A person in Scarborough, Burnley, or Barrow-in-Furness facing eviction has no nearby solicitor who can help them on legal aid.</p>
            <p>The growth of litigants in person — individuals representing themselves in court proceedings because they cannot afford or find legal representation — is one of the most significant practical consequences of legal aid cuts. In the family courts, 36% of parties in 2023 were litigants in person, up from 17% in 2010. Unrepresented litigants take longer to prepare and present their cases, courts need to spend more judicial time providing guidance, and outcomes are often worse for people unfamiliar with procedure. The family courts have experienced particular pressure as domestic violence survivors — many of whom previously received legal aid for family proceedings — navigate complex proceedings involving child arrangements without representation.</p>
            <p>Law centres, Citizens Advice, and other voluntary sector legal advice providers have partially filled the gap created by legal aid withdrawal, but their resources have also been under sustained pressure from cuts to local authority and charitable funding. Many organisations that provided welfare benefits advice — tribunals for universal credit decisions, personal independence payment assessments, and housing benefit disputes — have closed or dramatically reduced capacity. The consequence is that a very large volume of legal need is unmet: research by the Law Society and the Access to Justice Foundation consistently finds that millions of people each year face legal problems with no legal help, often allowing problems to compound until they become crises.</p>
            <p>The government has made incremental improvements to legal aid in response to Law Society lobbying and judicial concern: legal aid has been restored for some private family law cases involving domestic abuse, and the means test thresholds — which had not been uprated for many years — were increased in 2023. But the fundamental architecture of the post-LASPO system remains in place, and the provider market in many areas of law and geography has contracted to a point where restoration of funding would take years to translate into available advice because the firms and practitioners no longer exist.</p>
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
              onExpand={() => {}}
              source="Law Society &middot; Legal aid desert mapping"
            />
            <MetricCard
              label="Fall in legal aid cases since 2010"
              value="60%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="From 968,000 to under 400,000 annually"
              sparklineData={[968, 924, 876, 598, 527, 489, 467, 445, 421]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; Legal aid statistics"
            />
            <MetricCard
              label="Litigants in person in family courts"
              value="36%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 17% in 2010"
              sparklineData={[17, 19, 21, 25, 27, 28, 29, 30, 31]}
              onExpand={() => {}}
              source="HMCTS &middot; Family court statistics"
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
