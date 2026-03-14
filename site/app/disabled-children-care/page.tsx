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

// -- Types ------------------------------------------------------------------

interface DisabledChildrenCareData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    childrenNeedingSupport: number
    childrenReceivingSupport: number
    avgEhcpWaitWeeks: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- References -------------------------------------------------------------

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'SEND and AP Insights', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans', date: '2024' },
  { num: 2, name: 'NHS Digital', dataset: 'Children and Young People\'s Mental Health Services', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-of-children-and-young-people-in-england', date: '2024' },
  { num: 3, name: 'Contact', dataset: 'Research and policy on disabled children and families', url: 'https://contact.org.uk/research-and-policy/', date: '2024' },
];

// -- Page -------------------------------------------------------------------

export default function DisabledChildrenCarePage() {
  const [data, setData] = useState<DisabledChildrenCareData | null>(null)

  useEffect(() => {
    fetch('/data/disabled-children-care/disabled_children_care.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const supportSeries: Series[] = data
    ? [
        {
          id: 'needingSupport',
          label: 'Disabled children needing support',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenNeedingSupport / 1000,
          })),
        },
        {
          id: 'receivingSupport',
          label: 'Children receiving support',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenReceivingSupport / 1000,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Disabled Children's Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disabled Children's Care"
          question="Are disabled children getting the support they need?"
          finding="240,000 disabled children are estimated to need social care support, but fewer than 90,000 receive it."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 240,000 disabled children in England are estimated to need some level of social care support, yet only around 89,000 are receiving it — a gap that has widened over the past decade as demand has grown faster than local authority funding.<Cite nums={[1, 3]} /> The Education, Health and Care Plan (EHCP) system, introduced by the Children and Families Act 2014 to integrate support across education, health, and social care, has failed to keep pace: the average wait from request to final EHCP has grown from 19 weeks in 2015 to 28 weeks in 2024, well beyond the statutory 20-week limit.<Cite nums={1} /> In 2024, over 60% of EHCPs were issued outside the legal timeframe.<Cite nums={1} /> Tribunal challenges by families have reached record levels, with the SEND Tribunal upholding the majority of parental appeals. NHS children&apos;s therapy services — speech and language, occupational therapy, physiotherapy — have become the primary bottleneck, with NHS delays the most frequently cited reason for missed EHCP deadlines.<Cite nums={2} /> The SEND Review (2023) acknowledged systemic failure and set out a reform programme, but early implementation has been patchy.</p>
            <p>The consequences of unmet need accumulate across childhood and into adult life. Children with significant disabilities who do not receive timely support are more likely to experience educational exclusion, mental health crises, and family breakdown. Their parents — disproportionately mothers — are more likely to reduce or leave employment to fill the gap the system fails to supply, compounding financial hardship that the system does not account for in its costing of inadequate provision. Without significant new investment in both local authority children's services and NHS therapy capacity, the structural conditions driving the gap between need and support are unlikely to change.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Support Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Disabled children needing support"
              value="240k"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Estimated unmet need growing"
              sparklineData={[225, 228, 230, 232, 235, 237, 238, 239, 240]}
              href="#sec-chart"source="DfE · SEND and AP Insights"
            />
            <MetricCard
              label="Children receiving support"
              value="89k"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 98k in 2015"
              sparklineData={[98, 97, 96, 95, 93, 91, 90, 90, 89]}
              href="#sec-chart"source="DfE · SEND and AP Insights"
            />
            <MetricCard
              label="Average EHCP wait"
              value="28 wks"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Statutory limit is 20 weeks"
              sparklineData={[19, 20, 21, 22, 23, 25, 26, 27, 28]}
              href="#sec-chart"source="DfE · SEND and AP Insights"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Disabled children receiving care, 2015–2024"
              subtitle="Estimated children needing support vs those receiving local authority social care (thousands), England."
              series={supportSeries}
              yLabel="Children (thousands)"
              source={{
                name: 'DfE',
                dataset: 'SEND and AP Insights',
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
            <p>DfE — SEND and AP Insights. Annual statistical release covering EHCPs, specialist provision, and support. explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans</p>
            <p>NHS Digital — Children and Young People's Mental Health Services dataset. digital.nhs.uk/data-and-information/publications/statistical/mental-health-of-children-and-young-people-in-england</p>
            <p>Contact — Research and policy on disabled children and families. contact.org.uk/research-and-policy/</p>
            <p>Estimates of total disabled children needing support are modelled from population prevalence studies and disability benefit claimant data. Children receiving support counts those with an active EHCP or receiving a social care service. EHCP wait time is calculated from EHC needs assessment request to final plan issue date.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
