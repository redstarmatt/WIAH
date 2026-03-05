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
            <p>The average residential care home in England costs approximately &pound;1,100 per week in 2023, with nursing care at &pound;1,300 per week &mdash; equivalent to &pound;57,200 and &pound;67,600 per year. The means-testing threshold requiring full self-funding above &pound;23,250 in capital (including housing wealth) has not been significantly uprated since 2010, meaning far more people now qualify as self-funders than Parliament originally intended. The CMA&apos;s 2017 market study found self-funders pay approximately 41% more than council-funded residents for equivalent provision, with the cross-subsidy estimated at &pound;8,600 per person per year &mdash; a reflection of the structural power imbalance between large providers and families making decisions under acute time pressure. Care home bed capacity has fallen from 452,000 in 2012 to 412,000 in 2023, as council-funded rates below the cost of provision, rising wage bills, and inflationary cost pressures have made viability unsustainable for many operators.</p>
            <p>The consequences for families are reduced choice, longer waits, and older people occupying hospital beds while suitable placements are sought. The &pound;86,000 lifetime care cost cap &mdash; derived from the Dilnot Commission&apos;s 2011 recommendations and originally planned for October 2025 &mdash; has been delayed further with its future uncertain. Even if implemented, the cap addresses personal care costs only; the &ldquo;hotel costs&rdquo; of accommodation, food, and utilities &mdash; which constitute the majority of most bills &mdash; remain uncapped. The system continues to impose catastrophic and largely unpredictable costs on people at the end of their lives.</p>
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
