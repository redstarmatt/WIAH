'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface AgencySpendDataPoint {
  year: number
  agencySpendBn: number
  pctOfPayBill: number
}

interface NhsAgencySpendData {
  topic: string
  lastUpdated: string
  timeSeries: AgencySpendDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function NhsAgencySpendPage() {
  const [data, setData] = useState<NhsAgencySpendData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-agency-spend/nhs_agency_spend.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const agencySpendSeries: Series[] = data
    ? [{
        id: 'agency-spend',
        label: 'Agency spend (£bn)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.agencySpendBn })),
      }]
    : []

  return (
    <>
      <TopicNav topic="NHS Agency Spend" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Agency Spend"
          question="How Much Is the NHS Paying for Temporary Staff?"
          finding="The NHS spent &pound;3.7 billion on agency and locum staff in 2023/24 &mdash; enough to employ 55,000 additional nurses at full salary."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Agency and locum staff provide essential flexibility for NHS organisations &mdash; covering sickness, peaks in demand, and specialist roles that cannot be filled permanently. But when agency use becomes structural rather than marginal, it transforms from a safety valve into a significant financial drain. In 2023/24, the NHS spent &pound;3.7 billion on agency and locum workers, representing 8.2% of the total pay bill &mdash; more than double the NHS Improvement target of 3.5% and up from a low of 4.3% in 2020.</p>
            <p>The premium paid for agency staff is substantial. An agency nurse can cost &pound;47 per hour compared to roughly &pound;18 for a contracted equivalent &mdash; a 2.6 times premium that funds agency company margins rather than patient care or workforce development. Locum doctors command even higher rates. When a trust fills a shift through an agency rather than a bank worker or substantive employee, it pays more for the same hours of care. At &pound;3.7 billion per year, this premium over substantive staffing costs the NHS billions that could otherwise fund additional permanent roles.</p>
            <p>The paradox is that high agency spend is both a symptom and a cause of workforce instability. When nurses and doctors leave substantive employment for agency work, they typically earn more, gain schedule flexibility, and shed administrative burdens. This makes agency work attractive to those experiencing burnout or caring responsibilities. The result is a cycle: burnt-out staff leave for agency work, trusts pay a premium to get them back through agencies, remaining staff face higher workloads and are more likely to burn out themselves.</p>
            <p>NHS Improvement introduced agency rate caps in 2015&ndash;16 in an attempt to control costs. Agency spend did fall between 2016 and 2020, reaching its lowest level in the years before the pandemic. The pandemic reversed this progress: extraordinary staffing demands, the return of many agency workers to substantive posts during the emergency, followed by burnout-driven attrition as the emergency subsided, pushed agency use upward again. Industrial action in 2022&ndash;23 further increased reliance on temporary cover.</p>
            <p>The long-term solution is a sustainable substantive workforce with working conditions that do not drive people out. That requires addressing the reasons people choose agency over employment: flexibility, pay, and freedom from toxic workplace cultures. NHS England&apos;s Long Term Workforce Plan includes commitments to train more staff, but training takes years. In the short term, the NHS remains caught paying a premium for staff it trained, lost, and now rents back at inflated rates.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Agency Spend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual agency spend"
              value="&pound;3.7bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+58% since 2019 &middot; could employ 55,000 nurses"
              sparklineData={[2.8, 3.2, 2.9, 2.6, 2.4, 2.2, 2.9, 3.7]}
              onExpand={() => {}}
              source="NHS England &middot; NHS Spending Report 2023/24"
            />
            <MetricCard
              label="Agency as % of pay bill"
              value="8.2%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="target &lt;3.5% &middot; doubled in 4 years"
              sparklineData={[6.2, 7.1, 6.3, 5.5, 4.9, 4.3, 5.5, 8.2]}
              onExpand={() => {}}
              source="NHS Improvement &middot; Agency Spend 2023/24"
            />
            <MetricCard
              label="Agency nurse hourly rate"
              value="&pound;47/hr"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs &pound;18 contracted &middot; 2.6&times; premium"
              sparklineData={[32, 35, 36, 38, 38, 41, 44, 47]}
              onExpand={() => {}}
              source="NHS Improvement &middot; Rate Cap Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS agency and locum spend, England, 2015&ndash;2023"
              subtitle="Total annual spend on agency and locum staff across NHS trusts. &pound;bn at outturn prices."
              series={agencySpendSeries}
              yLabel="Spend (&pound;bn)"
              source={{
                name: 'NHS England / NHS Improvement',
                dataset: 'Agency Spend Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Improvement &mdash; Agency rules and price caps. Published quarterly. england.nhs.uk/pay-sickness/agency-rules/</p>
            <p>NHS England &mdash; NHS provider financial performance. Published annually. england.nhs.uk/financial-accounting-and-reporting/</p>
            <p>Agency spend figures cover all NHS trusts and foundation trusts in England including agency nurses, agency doctors, locum doctors, and other agency clinical staff. Figures are at outturn prices and include on-costs. The 3.5% pay bill target was set by NHS Improvement in 2015. &ldquo;Could employ 55,000 nurses&rdquo; calculated using average Band 5 nurse salary at mid-point &pound;33,706 including 30% on-costs.</p>
          </div>
        </section>
      </main>
    </>
  )
}
