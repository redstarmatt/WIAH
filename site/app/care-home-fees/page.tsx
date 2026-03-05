'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface CareHomeFeesData {
  averageWeeklyFee: Array<{ year: number; residential: number; nursing: number }>
  selfFunderVsCouncilRate: Array<{ year: number; selfFunderWeekly: number; councilWeekly: number }>
  capacityTrend: Array<{ year: number; bedsThousands: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function CareHomeFessPage() {
  const [data, setData] = useState<CareHomeFeesData | null>(null)

  useEffect(() => {
    fetch('/data/care-home-fees/care_home_fees.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const feesSeries: Series[] = data
    ? [
        {
          id: 'residential',
          label: 'Residential care (£/week)',
          colour: '#E63946',
          data: data.averageWeeklyFee.map(d => ({
            date: yearToDate(d.year),
            value: d.residential,
          })),
        },
        {
          id: 'nursing',
          label: 'Nursing care (£/week)',
          colour: '#264653',
          data: data.averageWeeklyFee.map(d => ({
            date: yearToDate(d.year),
            value: d.nursing,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Care Home Fees" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Home Fees"
          question="How much does a care home actually cost?"
          finding="The average care home fee in England is &pound;1,200 per week &mdash; &pound;62,400 per year. Self-funders pay 41% more than council-funded residents. The CMA found self-funders effectively cross-subsidise those funded by councils by &pound;8,600 per year."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The average cost of a residential care home in England reached approximately &pound;1,100 per week in 2023, according to LaingBuisson data. For nursing care &mdash; for those with more complex medical needs &mdash; the figure is &pound;1,300 per week. This equates to &pound;57,200 and &pound;67,600 per year respectively. For someone requiring two to three years of care &mdash; the average duration before death for care home residents &mdash; the total cost routinely exceeds &pound;100,000 and can reach &pound;200,000 or more. These sums represent the entirety of many people&apos;s life savings and the value of their homes.</p>
            <p>The means-testing system determines who pays. In England, those with capital above &pound;23,250 &mdash; including housing wealth if they move into a care home &mdash; must fund their own care entirely. Those with capital between &pound;14,250 and &pound;23,250 receive partial support. Those below &pound;14,250 have their fees paid by their local council. This threshold has not been uprated significantly since 2010, and in real terms has substantially eroded. The consequence is that the care home sector operates with two distinct fee structures: one for self-funders, who pay whatever the market charges, and one for council-funded residents, who pay a rate negotiated between councils and providers.</p>
            <p>The Competition and Markets Authority&apos;s 2017 care homes market study found that self-funders paid approximately 41% more than council-funded residents for equivalent rooms and services. The estimated cross-subsidy &mdash; the amount self-funders effectively pay to compensate for below-cost council rates &mdash; was around &pound;8,600 per person per year. This cross-subsidy reflects the structural power imbalance between large care home providers and individual families in acute need: self-funders have little bargaining power and often make decisions under severe time pressure following a hospital discharge or a sudden deterioration in a relative&apos;s condition.</p>
            <p>Care home bed capacity in England has been falling. LaingBuisson estimates there were 412,000 beds in 2023, down from 452,000 in 2012 &mdash; a loss of 40,000 beds in a decade, against a rising and ageing population. This contraction reflects the financial fragility of the care home sector: council-funded rates that do not cover costs, rising wage bills driven by minimum wage increases, inflationary cost pressures, and an inability to raise self-funder fees fast enough to compensate. Several large providers have entered administration in recent years. The consequence for families is reduced choice, longer waits for appropriate placements, and older people remaining in hospital beds because no suitable care home place is available.</p>
            <p>The &pound;86,000 care cap &mdash; announced by Boris Johnson&apos;s government in 2021 and intended to limit the lifetime amount any individual would need to spend on personal care &mdash; was delayed to October 2025, and subsequently further delayed with its future uncertain. The cap, derived from the Dilnot Commission&apos;s 2011 recommendations, was designed to address the catastrophic cost risk that forces families to sell homes. Its delay leaves the system unreformed. The 2021 announcement did not provide new money for the day-to-day costs of care &mdash; known as &apos;hotel costs&apos; &mdash; which remain uncapped and are the most significant component of most care home bills.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-fees', label: 'Fee Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average residential care home fee"
              value="&pound;1,100"
              unit="/week"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from &pound;635 in 2015 &middot; nursing care &pound;1,300/week"
              sparklineData={[635, 680, 750, 850, 980, 1100]}
              source="LaingBuisson Care of Older People &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Self-funder premium over council-funded"
              value="41"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Self-funders pay &pound;1,240/wk vs council-funded &pound;880/wk"
              sparklineData={[41, 46, 46, 41]}
              source="CMA Care Homes Market Study &middot; 2017 / LaingBuisson 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Care home bed capacity"
              value="412k"
              unit="beds"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 452,000 in 2012 &middot; 40,000 beds lost as homes closed"
              sparklineData={[452, 446, 437, 418, 412]}
              source="CQC State of Care &middot; 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-fees" className="mb-12">
            <LineChart
              title="Average care home weekly fees, England, 2015&ndash;2023"
              subtitle="Average fees for residential and nursing care. England average. Excludes local authority in-house provision."
              series={feesSeries}
              yLabel="&pound; per week"
              source={{
                name: 'LaingBuisson',
                dataset: 'Care of Older People UK Market Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>LaingBuisson &mdash; Care of Older People UK Market Report. Annual analysis of care home fee rates, capacity, and market structure. Available at laingbuisson.com.</p>
            <p>CMA &mdash; Care Homes Market Study (2017). Investigation into pricing practices, self-funder premiums, and competition in the care home market. Available at gov.uk/cma-cases/care-homes-market-study.</p>
            <p>CQC &mdash; State of Care Annual Report. Capacity data and quality assessments across the regulated care sector. Available at cqc.org.uk.</p>
            <p>Fee data represents average weekly charges inclusive of all personal care, accommodation, and meals. Nursing care fees include provision of registered nursing. Fees vary substantially by region, with London and the South East typically 20&ndash;30% above the national average.</p>
          </div>
        </section>
      </main>
    </>
  )
}
