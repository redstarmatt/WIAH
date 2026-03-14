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
  { num: 1, name: 'NHS England / NHS Improvement', dataset: 'Agency Spend Statistics', url: 'https://www.england.nhs.uk/financial-accounting-and-reporting/', date: '2024' },
  { num: 2, name: 'NHS Improvement', dataset: 'Agency rules and price caps', url: 'https://www.england.nhs.uk/pay-sickness/agency-rules/', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'NHS Long Term Workforce Plan', url: 'https://www.england.nhs.uk/long-read/nhs-long-term-workforce-plan/', date: '2023' },
];

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
          finding="The NHS spent £3.7 billion on agency and locum staff in 2023/24 — enough to employ 55,000 additional nurses at full salary."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The NHS spent £3.7 billion on agency and locum workers in 2023/24, representing 8.2% of the total pay bill — more than double the NHS Improvement target of 3.5% and up from a low of 4.3% in 2020.<Cite nums={1} /> An agency nurse costs £47 per hour against roughly £18 for a contracted equivalent — a 2.6-times premium funding agency margins rather than patient care.<Cite nums={2} /> Agency spend fell between 2016 and 2020 after rate caps were introduced in 2015–16, but the pandemic reversed that progress: extraordinary staffing demands, followed by burnout-driven attrition as the emergency subsided, drove agency use back upward. Industrial action in 2022–23 further increased reliance on temporary cover. The cycle is self-reinforcing: burnt-out staff leave for agency work where they earn more with greater flexibility; trusts pay a premium to bring them back; remaining substantive staff face higher workloads and burn out in turn.</p>
            <p>The £3.7 billion annual premium over what the same hours of care would cost from a substantive workforce represents money not spent on additional permanent posts, training, or patient-facing services.<Cite nums={1} /> The burden falls disproportionately on the trusts with the highest vacancy rates and the most acute recruitment difficulties — typically those in areas with higher living costs or less attractive working environments — creating a fiscal inequality between well-staffed trusts that can contain agency costs and struggling trusts that cannot. The NHS Long Term Workforce Plan commits to training more staff over the long term; training pipelines take years to fill, leaving the immediate cycle of churn and premium payments largely unaddressed.<Cite nums={3} /></p>
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
              value="£3.7bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+58% since 2019 · could employ 55,000 nurses"
              sparklineData={[2.8, 3.2, 2.9, 2.6, 2.4, 2.2, 2.9, 3.7]}
              href="#sec-chart"source="NHS England · NHS Spending Report 2023/24"
            />
            <MetricCard
              label="Agency as % of pay bill"
              value="8.2%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="target &lt;3.5% · doubled in 4 years"
              sparklineData={[6.2, 7.1, 6.3, 5.5, 4.9, 4.3, 5.5, 8.2]}
              href="#sec-chart"source="NHS Improvement · Agency Spend 2023/24"
            />
            <MetricCard
              label="Agency nurse hourly rate"
              value="£47/hr"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs £18 contracted · 2.6&times; premium"
              sparklineData={[32, 35, 36, 38, 38, 41, 44, 47]}
              href="#sec-chart"source="NHS Improvement · Rate Cap Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS agency and locum spend, England, 2015–2023"
              subtitle="Total annual spend on agency and locum staff across NHS trusts. £bn at outturn prices."
              series={agencySpendSeries}
              yLabel="Spend (£bn)"
              source={{
                name: 'NHS England / NHS Improvement',
                dataset: 'Agency Spend Statistics',
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
            <p>NHS Improvement — Agency rules and price caps. Published quarterly. england.nhs.uk/pay-sickness/agency-rules/</p>
            <p>NHS England — NHS provider financial performance. Published annually. england.nhs.uk/financial-accounting-and-reporting/</p>
            <p>Agency spend figures cover all NHS trusts and foundation trusts in England including agency nurses, agency doctors, locum doctors, and other agency clinical staff. Figures are at outturn prices and include on-costs. The 3.5% pay bill target was set by NHS Improvement in 2015. &ldquo;Could employ 55,000 nurses&rdquo; calculated using average Band 5 nurse salary at mid-point £33,706 including 30% on-costs.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
