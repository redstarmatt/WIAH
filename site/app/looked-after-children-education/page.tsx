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
            <p>Looked-after children — those in the care of local authorities, typically in foster care, children&apos;s homes, or kinship care — are among the most educationally disadvantaged group in England. The attainment gap between looked-after children and their peers has been documented for over two decades and, despite sustained policy attention and investment, remains very wide. In 2023, 14% of looked-after children aged 16 achieved the expected standard in English and maths at Key Stage 4 (GCSE level), compared to 48% of all pupils. The 34 percentage point gap is the largest attainment gap of any identifiable group in the school system.</p>
            <p>Educational disadvantage for looked-after children begins before care and is compounded by experiences within the care system. Most children entering care have experienced abuse, neglect, trauma, or family breakdown — all of which have well-evidenced negative effects on cognitive development, emotional regulation, and learning readiness. The instability of care placements is a significant additional barrier: children who move between foster carers or children&apos;s homes frequently change schools, with each transition causing disruption to relationships with teachers, loss of subject continuity, and gaps in the curriculum. Approximately one in three looked-after children changes school mid-year, compared to under 5% of all pupils.</p>
            <p>The school system has obligations to looked-after children that go beyond standard provision. Virtual School Heads — local authority statutory officers — are responsible for promoting the educational achievement of looked-after children in their area, supporting Personal Education Plans for every child, and providing advice and challenge to schools. The Pupil Premium Plus — additional funding for looked-after children of approximately £2,570 per pupil per year — is intended to fund extra support. Ring-fenced funding and named oversight create a more supported environment than children from other disadvantaged backgrounds receive, but the attainment gap remains stubbornly large, reflecting the scale of the underlying disadvantage.</p>
            <p>The NEET (not in education, employment or training) rate for care leavers is one of the starkest outcomes data points in the youth welfare system. 38% of young people who were in care at age 16 were NEET at age 19, compared to 12% of all young people. The transition out of care — typically at 18, with some support under &apos;staying put&apos; and &apos;staying close&apos; arrangements extended to 21 or 25 — often coincides with the most intensive period of educational participation. Care leavers report lower access to support with university applications, lower financial resilience to deal with setbacks during higher education, and a range of practical barriers that make sustained educational participation harder than for young people with stable family backgrounds.</p>
            <p>Therapeutic educational approaches — trauma-informed practice, attachment-based pedagogy, reduced class sizes for highly vulnerable pupils — have shown promising results in schools that have implemented them systematically. The Attachment Aware Schools programme, now operating in over 4,000 schools across England, trains staff in understanding how developmental trauma affects learning and behaviour, and how to create the relational safety that enables traumatised children to learn. Evidence from pilot schools shows improvements in attendance, behaviour, and — over time — attainment. But embedding these approaches at system scale requires ongoing CPD investment and sustained leadership commitment in schools that are simultaneously under pressure on multiple other dimensions.</p>
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
