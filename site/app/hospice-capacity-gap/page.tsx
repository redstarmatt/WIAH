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
          finding="England has around 3,300 specialist palliative care beds &mdash; an estimated shortfall of 1,200 against need."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has approximately 3,300 specialist palliative care inpatient beds, the majority operated by the voluntary sector charitable hospice movement rather than directly by the NHS. Against projected need &mdash; based on the number of people dying each year who would benefit from specialist end-of-life care &mdash; this represents a shortfall of around 1,200 beds. The gap has grown over the past decade as population ageing drives demand upward while bed numbers have stagnated or marginally declined.</p>
            <p>The hospice sector&apos;s dependence on charitable fundraising is one of the fundamental structural vulnerabilities in end-of-life care. NHS block grant funding to hospices has not kept pace with cost inflation, and the shortfall has been filled by charitable income &mdash; donations, legacies, and commercial activities such as hospice shops. Following the disruption to fundraising during the COVID-19 pandemic and the subsequent rise in energy and staffing costs, a significant number of hospices have reduced bed capacity, closed day services, or suspended community services entirely. This has not been captured systematically in national data.</p>
            <p>Access to good palliative care is deeply unequal. People living in deprived areas, those from ethnic minority backgrounds, and people with non-cancer diagnoses &mdash; including heart failure, COPD, and dementia &mdash; are significantly less likely to access specialist palliative care services. Hospices historically developed in more affluent areas, and the geographical distribution of beds has not been systematically planned against need. An estimated 25% of people who die each year in England do so without adequate palliative care support, often experiencing preventable pain, distress, and undignified deaths.</p>
            <p>Community-based palliative care &mdash; specialist nurses, advisory teams, and Hospice at Home services &mdash; can support a significant proportion of people with life-limiting illness to die at home or in care homes if they wish. Most surveys of patient preference indicate that the majority of people would prefer to die at home rather than in hospital, yet hospital remains the most common place of death for around 44% of people in England. The investment required to close the gap between preferred and actual place of death is primarily in community nursing capacity and 24-hour carer support rather than inpatient beds alone.</p>
            <p>NHS England&apos;s Long Term Plan included commitments to expand personalised care and improve end-of-life care, and a national ambition for 90% of people to have a personalised care and support plan in the last year of life. Recorded achievement of this target remains well below 90%, with primary care coding and care coordination across providers identified as the primary barriers.</p>
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
              onExpand={() => {}}
              source="Hospice UK &middot; Annual Monitoring Data"
            />
            <MetricCard
              label="Estimated shortfall"
              value="1,200"
              unit="beds"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Against modelled need"
              sparklineData={[800, 850, 900, 950, 1000, 1100, 1100, 1150, 1200]}
              onExpand={() => {}}
              source="Hospice UK &middot; NHS England"
            />
            <MetricCard
              label="Dying without palliative care"
              value="25%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 20% in 2015"
              sparklineData={[20, 21, 21, 22, 23, 24, 24, 25, 25]}
              onExpand={() => {}}
              source="Public Health England &middot; NELIC"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Hospice bed provision per 100k population, 2015&ndash;2024"
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
            <p>Hospice UK &mdash; Annual Monitoring Data. Covers all UK hospices including NHS and voluntary sector. hospiceuk.org/information-and-resources/facts-and-figures</p>
            <p>NHS England &mdash; Palliative and End of Life Care Statistics. england.nhs.uk/eolc/</p>
            <p>Public Health England &mdash; National End of Life Care Intelligence Network (NELIC). Cause of death data matched against palliative care contacts. gov.uk/guidance/national-end-of-life-care-intelligence-network</p>
            <p>Bed count includes specialist palliative care inpatient beds in NHS and voluntary sector hospices. Beds per 100,000 calculated against ONS mid-year population estimates. Estimated shortfall modelled from ONS mortality projections and national palliative care needs assessment. Dying without palliative care figures are estimates derived from death registration data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
