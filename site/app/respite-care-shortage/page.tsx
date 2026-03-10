'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface RespiteCareShortageData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    accessRespitePct: number
    unpaidCarersM: number
    annualValueBn: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function RespiteCareShortage() {
  const [data, setData] = useState<RespiteCareShortageData | null>(null)

  useEffect(() => {
    fetch('/data/respite-care-shortage/respite_care_shortage.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const respiteSeries: Series[] = data
    ? [
        {
          id: 'accessRespite',
          label: 'Carers able to access respite (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.accessRespitePct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Respite Care Shortage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Respite Care Shortage"
          question="Can carers actually get a break?"
          finding="Just 41% of unpaid carers say they can access respite care when they need it, down from 56% in 2015."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has approximately 5.8 million unpaid carers whose replacement value — the cost of equivalent professional care — is estimated at £162 billion annually, exceeding total NHS acute spending. Yet the share of carers who can access respite when they need it has fallen from 56% in 2015 to 41% in 2024, driven by local authority budget cuts, care sector workforce shortages, and increased complexity of need. The Care Act 2014 gave carers a legal right to an assessment and eligible support, including short breaks, but eligibility thresholds have tightened sharply as council budgets contracted — the number of carers receiving direct payments for short breaks has fallen despite rising carer numbers. Day centres, particularly vital for carers of people with dementia, were hard hit: many closed permanently during COVID and did not reopen.</p>
            <p>The consequences fall most heavily on those providing the most intensive care — typically women in middle age caring for a spouse or parent with dementia. Without reliable respite, burnout accelerates and care breakdown leads to emergency hospital admissions and care home placements that cost far more than preventive support would have. Research consistently shows respite care delays care home admission and reduces unplanned NHS usage, but funding sits with local authorities rather than the NHS, and no sustained national uplift specifically for carer short breaks has been delivered.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Respite Access' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Carers able to access respite"
              value="41%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 56% in 2015"
              sparklineData={[56, 54, 52, 50, 49, 43, 43, 42, 41]}
              href="#sec-chart"source="Carers UK · State of Caring Survey"
            />
            <MetricCard
              label="Unpaid carers in England"
              value="5.8m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 5.4m in 2015"
              sparklineData={[5.4, 5.5, 5.5, 5.6, 5.6, 5.7, 5.7, 5.8, 5.8]}
              href="#sec-chart"source="Carers UK · DWP"
            />
            <MetricCard
              label="Annual value of unpaid care"
              value="£162bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Up from £119bn in 2015"
              sparklineData={[119, 125, 130, 135, 140, 145, 150, 156, 162]}
              href="#sec-chart"source="Carers UK · Replacement cost estimate"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Respite care access, 2015–2024"
              subtitle="Percentage of unpaid carers in England able to access respite care when needed."
              series={respiteSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'Carers UK',
                dataset: 'State of Caring Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Carers UK — State of Caring Survey. Annual survey of carers in England, Wales, and Scotland. carersuk.org/research-and-policy/state-of-caring-report/</p>
            <p>NHS England — Adult Social Care Activity and Finance Report. Annual report on local authority social care. england.nhs.uk/publication/adult-social-care-activity-and-finance-report/</p>
            <p>ADASS — Adult Social Care Survey. Association of Directors of Adult Social Services. adass.org.uk/surveys</p>
            <p>Local Government Association — Adult Social Care Funding Data. local.gov.uk/topics/social-care-health-and-integration</p>
            <p>Respite access rate is from Carers UK survey. Unpaid carer total is estimated using DWP Carer's Allowance claimant counts uplifted from census-based estimates. Annual replacement value uses home care agency hourly rates applied to estimated hours of care provided.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
