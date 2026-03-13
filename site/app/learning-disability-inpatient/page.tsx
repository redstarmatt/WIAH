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
  { num: 1, name: 'NHS England', dataset: 'Assuring Transformation — Learning Disability', url: 'https://www.england.nhs.uk/learning-disabilities/care/progress/assuring-transformation/', date: '2024' },
  { num: 2, name: 'CQC', dataset: 'Mental health restraint and seclusion data', url: 'https://www.cqc.org.uk/', date: '2024' },
  { num: 3, name: 'BBC Panorama', dataset: 'Whorlton Hall investigation', date: '2019', note: 'Documented abuse and systematic restraint in private units' },
];

// -- Types ------------------------------------------------------------------

interface LearningDisabilityInpatientData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    inpatientCount: number
    avgStayYears: number
    restraintIncidents: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function LearningDisabilityInpatientPage() {
  const [data, setData] = useState<LearningDisabilityInpatientData | null>(null)

  useEffect(() => {
    fetch('/data/learning-disability-inpatient/learning_disability_inpatient.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const inpatientSeries: Series[] = data
    ? [
        {
          id: 'inpatientCount',
          label: 'People in long-stay inpatient settings',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.inpatientCount,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Learning Disability Inpatient" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Learning Disability Inpatient"
          question="Why are people with learning disabilities still in long-stay hospitals?"
          finding="Over 2,000 people with learning disabilities and autism remain in inpatient psychiatric facilities, many for years at a time."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>More than 2,000 people with learning disabilities and autism are detained in inpatient psychiatric facilities in England, often hundreds of miles from their families.<Cite nums={1} /> The NHS committed, following the Winterbourne View scandal in 2012 and the Transforming Care programme, to move the majority into community-based support by 2019; that deadline was missed by a significant margin. The average length of stay is 5.4 years, and BBC Panorama's 2019 investigation into Whorlton Hall, alongside numerous CQC inspection reports, documented abuse, systematic restraint, and deprivation across private units operating under NHS contract.<Cite nums={3} /> Over 51,000 restraint incidents — physical, mechanical, and chemical — are recorded per year.<Cite nums={2} /> NHS England's Assuring Transformation programme has reduced numbers from over 3,200 in 2015, but the remaining cohort is disproportionately those with the most complex needs where community alternatives are fewest.<Cite nums={1} /></p>
            <p>The barriers to discharge are structural: community providers willing to take people with complex autism presentations are in short supply, and local authority funding incentives favour deferring discharge to NHS-funded inpatient settings. Families frequently report being excluded from discharge planning. The right of disabled people to live in the community, enshrined in the UN Convention on the Rights of Persons with Disabilities, is being systematically denied — advocates argue that continued institutional reliance reflects not a lack of community alternatives but a lack of political will to fund the transformation promised over a decade ago.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Inpatient Population' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="In long-stay inpatient settings"
              value="2,150"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 3,230 in 2015"
              sparklineData={[3230, 2990, 2780, 2630, 2490, 2380, 2290, 2210, 2150]}
              href="#sec-chart"source="NHS England · Assuring Transformation"
            />
            <MetricCard
              label="Average length of stay"
              value="5.4 yrs"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 5.1 years in 2015"
              sparklineData={[5.1, 5.2, 5.2, 5.3, 5.3, 5.3, 5.4, 5.4, 5.4]}
              href="#sec-chart"source="NHS Digital · LDSS"
            />
            <MetricCard
              label="Restraint incidents per year"
              value="51,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Physical, mechanical, chemical"
              sparklineData={[62000, 59000, 56000, 55000, 53000, 50000, 51000, 51000, 51000]}
              href="#sec-chart"source="CQC · Mental health restraint data"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Long-stay inpatient population, 2015–2024"
              subtitle="People with learning disabilities and autism in inpatient psychiatric settings, England."
              series={inpatientSeries}
              yLabel="People"
              source={{
                name: 'NHS England',
                dataset: 'Assuring Transformation',
                frequency: 'monthly',
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
            <p>NHS England — Assuring Transformation. Monthly snapshot of people with learning disabilities and/or autism in inpatient settings. england.nhs.uk/learning-disabilities/care/progress/assuring-transformation/</p>
            <p>NHS Digital — Learning Disability Services Data Set (LDSS). Monthly data on inpatient and community contacts. digital.nhs.uk/data-and-information/publications/statistical/learning-disability-services-statistics</p>
            <p>CQC — Restraint and seclusion reporting. Mental Health Units (Use of Force) Act reporting. cqc.org.uk</p>
            <p>Inpatient count is snapshot figure at end of reference period. Average length of stay is median for those discharged in the reference year. Restraint figures include all recorded incidents under the Mental Health Units (Use of Force) Act 2018 reporting requirements from April 2021; prior years are estimated from CQC inspection data.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
