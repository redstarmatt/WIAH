'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface HospiceCapacityGapData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    hospiceBedsTotal: number
    bedsPer100k: number
    pctDyingWithoutCare: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function HospiceCapacityGapPage() {
  const [data, setData] = useState<HospiceCapacityGapData | null>(null)

  useEffect(() => {
    fetch('/data/hospice-capacity-gap/hospice_capacity_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const bedsSeries: Series[] = data
    ? [
        {
          id: 'bedsPer100k',
          label: 'Hospice beds per 100k population',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bedsPer100k,
          })),
        },
        {
          id: 'pctDyingWithoutCare',
          label: 'Dying without palliative care (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pctDyingWithoutCare,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Hospice Capacity Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hospice Capacity Gap"
          question="Is there enough hospice capacity in England?"
          finding="England has around 3,300 specialist palliative care beds — an estimated shortfall of 1,200 against need."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has approximately 3,300 specialist palliative care inpatient beds — down slightly from around 3,450 in 2015 — against a projected need requiring roughly 1,200 more. The majority are operated by the charitable hospice movement rather than directly by the NHS, and NHS block grant funding has not kept pace with cost inflation, with the shortfall filled by donations, legacies, and commercial income. Following the COVID-19 disruption to fundraising and subsequent energy and staffing cost rises, a significant number of hospices reduced bed capacity, closed day services, or suspended community programmes. An estimated 25% of people who die each year in England do so without adequate palliative care support, often experiencing preventable pain and distress, up from 20% in 2015. Hospital remains the most common place of death for around 44% of people, despite surveys consistently showing that most people prefer to die at home or in a hospice.</p>
            <p>Access to good palliative care is deeply unequal. People in deprived areas, those from ethnic minority backgrounds, and those with non-cancer diagnoses — heart failure, COPD, dementia — are significantly less likely to access specialist services. Hospices historically developed in more affluent areas and the geographic distribution of beds has never been systematically planned against need. Closing the gap between preferred and actual place of death requires investment primarily in community nursing capacity and 24-hour carer support rather than inpatient beds alone, but NHS England&rsquo;s ambition for 90% of people to have a personalised care plan in their last year of life remains far from achieved, with primary care coding and cross-provider coordination identified as the persistent barriers.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Bed Provision' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Hospice beds in England"
              value="3,300"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from ~3,450 in 2015"
              sparklineData={[3450, 3420, 3400, 3380, 3360, 3310, 3320, 3310, 3300]}
              href="#sec-chart"source="Hospice UK · Annual Monitoring Data"
            />
            <MetricCard
              label="Estimated shortfall"
              value="1,200"
              unit="beds"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Against modelled need"
              sparklineData={[800, 850, 900, 950, 1000, 1100, 1100, 1150, 1200]}
              href="#sec-chart"source="Hospice UK · NHS England"
            />
            <MetricCard
              label="Dying without palliative care"
              value="25%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 20% in 2015"
              sparklineData={[20, 21, 21, 22, 23, 24, 24, 25, 25]}
              href="#sec-chart"source="Public Health England · NELIC"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Hospice bed provision per 100k population, 2015–2024"
              subtitle="Specialist palliative care inpatient beds per 100,000 population and percentage dying without palliative care, England."
              series={bedsSeries}
              yLabel="Value"
              source={{
                name: 'Hospice UK',
                dataset: 'Annual Monitoring Data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Hospice UK — Annual Monitoring Data. Covers all UK hospices including NHS and voluntary sector. hospiceuk.org/information-and-resources/facts-and-figures</p>
            <p>NHS England — Palliative and End of Life Care Statistics. england.nhs.uk/eolc/</p>
            <p>Public Health England — National End of Life Care Intelligence Network (NELIC). Cause of death data matched against palliative care contacts. gov.uk/guidance/national-end-of-life-care-intelligence-network</p>
            <p>Bed count includes specialist palliative care inpatient beds in NHS and voluntary sector hospices. Beds per 100,000 calculated against ONS mid-year population estimates. Estimated shortfall modelled from ONS mortality projections and national palliative care needs assessment. Dying without palliative care figures are estimates derived from death registration data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
