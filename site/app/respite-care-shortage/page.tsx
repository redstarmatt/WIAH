'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>Respite care &mdash; temporary relief for carers from their caring responsibilities, whether through short-break residential care, day centres, or sitter services &mdash; is recognised as essential to sustaining unpaid carers in their role. Without it, carers face burnout, deteriorating health, and a higher risk of care breakdown that results in emergency hospital admissions or care home placements. Yet the proportion of carers who can access respite when they need it has fallen from 56% in 2015 to 41% in 2024, a decline driven by cuts to local authority short-break provision, workforce shortages in the care sector, and increased care complexity among those being cared for.</p>
            <p>England has approximately 5.8 million unpaid carers &mdash; people providing unpaid care to a family member or friend. This figure almost certainly understates the true number, as many people providing significant care time do not identify themselves as carers. The annual replacement value of this care &mdash; calculated on the basis of what equivalent professional care agency support would cost &mdash; is estimated at &pound;162 billion. This exceeds total NHS spending on acute care. Without unpaid carers, the formal health and social care system would collapse within days. Yet investment in supporting carers to sustain their caring role represents a fraction of this value.</p>
            <p>The Care Act 2014 gave carers a legal right to a carer&apos;s assessment and to support that meets their eligible needs. Short breaks are explicitly recognised as a form of support. But local authority eligibility criteria have tightened as budgets have been cut, meaning many carers who would previously have been eligible for funded respite are now told their needs do not meet the threshold. The number of carers receiving direct payments for short breaks has fallen despite rising carer numbers.</p>
            <p>Day centres for older and disabled people &mdash; which provide a regular break for carers alongside social contact and activity for the person cared for &mdash; have been particularly hard hit by local authority budget reductions. A significant number closed permanently during the COVID-19 pandemic and did not reopen. For carers of people with dementia, who represent a large proportion of the carer population, the loss of day centre provision has been especially acute as alternative respite options are limited.</p>
            <p>The economic case for investing in respite care is well established. Research consistently shows that preventive respite support reduces carer breakdown rates, delays care home admission, and reduces emergency NHS usage. The NHS Five Year Forward View and subsequent plans have referenced the importance of carer support, but the financial mechanisms for funding respite sit primarily with local authorities rather than the NHS, and no national funding uplift specifically for carer short breaks has been sustained.</p>
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
              onExpand={() => {}}
              source="Carers UK &middot; State of Caring Survey"
            />
            <MetricCard
              label="Unpaid carers in England"
              value="5.8m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 5.4m in 2015"
              sparklineData={[5.4, 5.5, 5.5, 5.6, 5.6, 5.7, 5.7, 5.8, 5.8]}
              onExpand={() => {}}
              source="Carers UK &middot; DWP"
            />
            <MetricCard
              label="Annual value of unpaid care"
              value="&pound;162bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Up from &pound;119bn in 2015"
              sparklineData={[119, 125, 130, 135, 140, 145, 150, 156, 162]}
              onExpand={() => {}}
              source="Carers UK &middot; Replacement cost estimate"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Respite care access, 2015&ndash;2024"
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
            <p>Carers UK &mdash; State of Caring Survey. Annual survey of carers in England, Wales, and Scotland. carersuk.org/research-and-policy/state-of-caring-report/</p>
            <p>NHS England &mdash; Adult Social Care Activity and Finance Report. Annual report on local authority social care. england.nhs.uk/publication/adult-social-care-activity-and-finance-report/</p>
            <p>ADASS &mdash; Adult Social Care Survey. Association of Directors of Adult Social Services. adass.org.uk/surveys</p>
            <p>Local Government Association &mdash; Adult Social Care Funding Data. local.gov.uk/topics/social-care-health-and-integration</p>
            <p>Respite access rate is from Carers UK survey. Unpaid carer total is estimated using DWP Carer&apos;s Allowance claimant counts uplifted from census-based estimates. Annual replacement value uses home care agency hourly rates applied to estimated hours of care provided.</p>
          </div>
        </section>
      </main>
    </>
  )
}
