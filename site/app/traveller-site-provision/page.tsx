'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Friends Families and Travellers', dataset: 'Site Provision Analysis 2024', url: 'https://www.gypsy-traveller.org', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Planning Application Statistics 2024', url: 'https://www.gov.uk/government/collections/planning-applications-statistics', date: '2024' },
  { num: 3, name: 'Police, Crime, Sentencing and Courts Act 2022', dataset: 'Legislation and EHRC response', url: 'https://www.legislation.gov.uk/ukpga/2022/32', date: '2022' },
  { num: 4, name: 'DLUHC', dataset: 'Traveller Caravan Count', url: 'https://www.gov.uk/government/collections/traveller-caravan-count', date: '2024' },
  { num: 5, name: 'DfE', dataset: 'GCSE attainment by ethnicity — GRT outcomes', url: 'https://explore-education-statistics.service.gov.uk', date: '2024' },
];

interface TravellerSiteProvisionData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    shortfallEstimate: number
    unauthorisedEncampments: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function TravellerSiteProvisionPage() {
  const [data, setData] = useState<TravellerSiteProvisionData | null>(null)

  useEffect(() => {
    fetch('/data/traveller-site-provision/traveller_site_provision.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'shortfall',
          label: 'Pitch shortfall (estimate)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.shortfallEstimate,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Traveller Site Provision" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Traveller Site Provision"
          question="Is There Enough Authorised Space for Traveller Communities?"
          finding="England has a shortfall of around 5,000 authorised Traveller pitches, and planning refusal rates for Traveller applications run double those for settled communities."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has a shortfall of around 5,000 authorised Traveller pitches, according to the Traveller Movement and Friends Families and Travellers.<Cite nums={1} /> Planning applications for Traveller sites are refused at approximately double the rate of equivalent settled community applications — a disparity consistent across decades of data.<Cite nums={2} /> Gypsy and Traveller Accommodation Needs Assessments require local authorities to identify and allocate sufficient sites in their local plans; in practice, the majority fall short of identified need. The Police, Crime, Sentencing and Courts Act 2022 introduced new powers to direct Travellers off land without permission — including vehicle seizure — without addressing the root cause: the shortage of anywhere legal to go. The Equality and Human Rights Commission criticised the powers as disproportionate.<Cite nums={3} /></p>
            <p>The consequences of inadequate provision fall across every dimension of life for Gypsy, Roma and Traveller communities. GCSE attainment rates are the lowest of any ethnic group at approximately 13% achieving expected standard; life expectancy is lower than the general population; maternity outcomes are significantly worse; and mental ill health rates are higher.<Cite nums={5} /> These outcomes are structurally linked to insecure housing, mobility-related barriers to NHS registration, and social exclusion.<Cite nums={4} /> The Equality Act 2010 protects GRT ethnicity as a protected characteristic, but enforcement of equality duties in housing allocation and site provision has been consistently limited.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Pitch Shortfall' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Authorised pitch shortfall"
              value="~5,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Growing gap · inadequate local plan allocation"
              sparklineData={[3500, 3700, 3900, 4100, 4300, 4500, 4600, 4800, 5000]}
              href="#sec-chart"source="Friends Families and Travellers · Site Provision Analysis 2024"
            />
            <MetricCard
              label="Traveller planning refusal rate"
              value="48%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="48% vs 21% for settled community applications"
              sparklineData={[46, 47, 47, 48, 49, 50, 48, 48, 48]}
              href="#sec-chart"source="DLUHC · Planning Application Statistics 2024"
            />
            <MetricCard
              label="Unauthorised encampments per year"
              value="3,200"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Result of authorised provision shortage"
              sparklineData={[2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200]}
              href="#sec-chart"source="DLUHC · Traveller Caravan Count 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Estimated authorised Traveller pitch shortfall, 2016–2024"
              subtitle="Estimated gap between authorised pitch supply and assessed need in England."
              series={series}
              yLabel="Pitch shortfall (estimate)"
              source={{
                name: 'Friends Families and Travellers',
                dataset: 'Site Provision Analysis',
                frequency: 'annual',
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
            <p>Friends Families and Travellers — Site Provision Analysis 2024. gypsy-traveller.org</p>
            <p>DLUHC — Traveller Caravan Count. Published biannually. gov.uk/government/collections/traveller-caravan-count</p>
            <p>DLUHC — Planning Application Statistics. gov.uk/government/collections/planning-applications-statistics</p>
            <p>Pitch shortfall estimates are modelled from Gypsy and Traveller Accommodation Needs Assessments versus allocated supply. Refusal rates compare Traveller site applications to all other residential applications. Unauthorised encampment figures from biannual Traveller Caravan Count.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
