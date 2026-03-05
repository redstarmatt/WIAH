'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface UniversityDropoutDataPoint {
  year: number
  dropoutRatePct: number
  disadvantagedDropoutPct: number
}

interface UniversityDropoutData {
  topic: string
  lastUpdated: string
  timeSeries: UniversityDropoutDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function UniversityDropoutRatesPage() {
  const [data, setData] = useState<UniversityDropoutData | null>(null)

  useEffect(() => {
    fetch('/data/university-dropout-rates/university_dropout_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'all-students',
          label: 'All students',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.dropoutRatePct })),
        },
        {
          id: 'disadvantaged-students',
          label: 'Disadvantaged students',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.disadvantagedDropoutPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many Students Are Dropping Out of University?"
          finding="6.3% of UK university students drop out in their first year, with rates of 12% among disadvantaged students — driven sharply upward by cost of living pressures."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>University continuation rates — the proportion of students who progress from first year to second year — are a critical measure of higher education system performance. High dropout rates represent significant waste: public and private investment in fees and maintenance support for students who do not complete their qualification, and the personal cost to students who accumulate debt without the qualification premium that justifies it. HESA data for 2022-23 shows a non-continuation rate (students not continuing after year one) of 6.3% across UK higher education — up from 5.1% in 2019 — with rates varying significantly between institutions, courses, and student backgrounds.</p>
            <p>The cost of living crisis has been directly implicated in the rise in dropouts. Student maintenance loans, which have not kept pace with inflation, cover a diminishing share of actual living costs. In 2024, the maximum maintenance loan for a student outside London living away from home was £10,227 — below the NUS&apos;s estimated living cost of £12,600 for the academic year. Students from lower-income backgrounds, who are more likely to receive the maximum loan, are also less likely to have family financial support to bridge the gap. Working part-time while studying is common but constrains study time and correlates with worse academic outcomes and higher withdrawal rates.</p>
            <p>The gap between advantaged and disadvantaged students is stark. Students from the most deprived quintile of areas have a non-continuation rate of 12% — nearly three times the 4.5% rate for students from the least deprived areas. This gap has widened since 2019, suggesting that the cost of living pressures have fallen harder on already-disadvantaged students. POLAR4 data from HESA shows that first-generation university attenders — students who are the first in their family to go to university — have non-continuation rates approximately double those of students whose parents also attended university.</p>
            <p>Course and institution type are significant factors. BTEC entry route students — who typically enter with vocational rather than A-level qualifications — have higher dropout rates than A-level entrants. Nursing, computing, and certain creative arts courses have above-average dropout rates related to the specific challenges of those programmes. Post-1992 institutions (former polytechnics) generally have higher dropout rates than pre-1992 universities, reflecting their higher proportions of mature students, students from disadvantaged backgrounds, and students with caring responsibilities — all groups with higher-than-average dropout rates, though also groups who have more life complexity rather than lower capability.</p>
            <p>Universities have significantly expanded their wellbeing and support services in response to rising student mental health needs and dropout pressures, but the adequacy of these services is debated. The OfS (Office for Students) Access and Participation Plans — required from all higher education providers — now require institutions to set continuation targets and demonstrate progress against them. The OfS&apos;s new B conditions, focusing on student outcomes including continuation, retention and completion, have sharpened institutional accountability for dropout rates. Whether this accountability framework translates into sufficient investment in student support — particularly for the most vulnerable students — depends on institutional financial positions that are under increasing pressure.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="First-year dropout rate"
              value="6.3%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+1.2pp since 2020 · cost of living driver"
              sparklineData={[4.8, 4.9, 5.0, 5.1, 5.2, 5.5, 5.8, 6.0, 6.3]}
              source="HESA · Higher Education Student Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Dropout rate, disadvantaged students"
              value="12%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="12% vs 4.5% advantaged · widening gap"
              sparklineData={[8.5, 8.8, 9.0, 9.2, 9.5, 10.0, 10.8, 11.4, 12.0]}
              source="HESA · Higher Education Student Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Students withdrawn 2023"
              value="32,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+8,000 vs pre-pandemic"
              sparklineData={[20000, 21000, 22000, 24000, 25000, 27000, 28000, 30000, 32000]}
              source="HESA · Higher Education Student Statistics 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="University first-year dropout rates, 2016–2024"
              subtitle="Percentage of first-year students not continuing to second year, by student background."
              series={series}
              yLabel="Non-continuation rate (%)"
              source={{ name: 'HESA', dataset: 'Higher Education Student Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">HESA</strong> — Higher Education Student Statistics. Annual non-continuation data for UK-domiciled full-time first-degree students at English HE providers.</p>
            <p><strong className="text-wiah-black">Office for Students</strong> — Access and Participation data. Continuation rates by POLAR4 deprivation quintile.</p>
            <p>Note: POLAR4 deprivation quintile methodology may slightly undercount disadvantage in urban areas compared with IMD-based measures.</p>
          </div>
        </section>
      </main>
    </>
  )
}
