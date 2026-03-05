'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface LookedAfterDataPoint {
  year: number
  lacGcsePct: number
  lacNeetPct: number
}

interface LookedAfterData {
  topic: string
  lastUpdated: string
  timeSeries: LookedAfterDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function LookedAfterChildrenEducationPage() {
  const [data, setData] = useState<LookedAfterData | null>(null)

  useEffect(() => {
    fetch('/data/looked-after-children-education/looked_after_children_education.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'lac-gcse',
          label: 'Looked-after children',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.lacGcsePct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Are Children in Care Faring in School?"
          finding="Only 14% of looked-after children achieve expected GCSE standards, compared to 48% of all pupils, and 1 in 3 changes school mid-year."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Looked-after children &mdash; those in local authority care, typically in foster placements, children&apos;s homes, or kinship arrangements &mdash; represent the most educationally disadvantaged identifiable group in England. In 2023, just 14% of looked-after children achieved the expected standard in English and maths at GCSE, compared with 48% of all pupils &mdash; a 34 percentage point gap that has persisted despite sustained policy attention, Pupil Premium Plus funding of &pound;2,570 per pupil per year, and the statutory oversight of Virtual School Heads. Approximately one in three looked-after children changes school mid-year, against under 5% of all pupils, compounding the educational disruption caused by earlier trauma, abuse, and neglect.</p>
            <p>The consequences extend well beyond school. 38% of care leavers aged 19 are NEET, compared with 12% of all young people &mdash; a gap that reflects the collision of placement instability, developmental trauma, and the abrupt withdrawal of formal support at age 18. Geographic and demographic inequalities are substantial: children in some local authorities face far longer waits for stable placements and higher placement breakdown rates, and children from Black and mixed-heritage backgrounds are overrepresented in the care system relative to their share of the population. The attainment gap is largest of all for children who have spent the most years in care.</p>
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
              label="LAC achieving expected GCSEs"
              value="14%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+3pp since 2015 · still 34pp below all pupils"
              sparklineData={[11, 11, 12, 12, 12, 13, 13, 13, 14]}
              source="DfE · Outcomes for Children Looked After 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="LAC changing school mid-year"
              value="33%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="1 in 3 disrupted by mid-year school move"
              sparklineData={[35, 35, 34, 33, 33, 34, 33, 33, 33]}
              source="DfE · Outcomes for Children Looked After 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="LAC NEET at age 19"
              value="38%"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="38% NEET vs 12% all young people"
              sparklineData={[42, 41, 41, 40, 40, 39, 39, 38, 38]}
              source="DfE · Care Leavers Statistics 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Looked-after children: GCSE attainment vs all pupils, 2016–2024"
              subtitle="Percentage achieving expected standard at Key Stage 4."
              series={series}
              yLabel="Achieving expected standard (%)"
              source={{ name: 'DfE', dataset: 'Outcomes for Children Looked After by Local Authorities', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">DfE</strong> — Outcomes for Children Looked After by Local Authorities in England. Annual statistical release on educational outcomes for children in care.</p>
            <p><strong className="text-wiah-black">DfE</strong> — Care Leavers in England. Annual data on NEET rates and outcomes for young people leaving care.</p>
            <p>Note: 2020 GCSE data was affected by teacher-assessed grades — year-on-year comparison with 2019 and 2021 requires caution. The looked-after population changes composition each year.</p>
          </div>
        </section>
      </main>
    </>
  )
}
