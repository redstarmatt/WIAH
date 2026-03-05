'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface SchoolOvercrowdingDataPoint {
  year: number
  pupilsOvercrowdedK: number
  secondaryOverCapacityPct: number
}

interface SchoolOvercrowdingData {
  topic: string
  lastUpdated: string
  timeSeries: SchoolOvercrowdingDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function SchoolOvercrowdingPage() {
  const [data, setData] = useState<SchoolOvercrowdingData | null>(null)

  useEffect(() => {
    fetch('/data/school-overcrowding/school_overcrowding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'pupils-overcrowded',
          label: 'Pupils in overcrowded schools (thousands)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pupilsOvercrowdedK })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are British Schools Running Out of Space?"
          finding="400,000 children are in schools operating above capacity, with secondary school overcrowding set to peak around 2026–27."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>School capacity planning is one of the more technically complex aspects of education policy, requiring local authorities to forecast pupil numbers 5-10 years ahead, account for demographic change and housing development, and commission or expand school places in time to meet projected demand. When this planning fails — or when demographic trends exceed projections — the result is school overcrowding: children taught in conditions above designed capacity. The DfE&apos;s School Capacity survey provides annual data on school capacity and pupil numbers, enabling identification of schools operating over capacity at national and local level.</p>
            <p>Approximately 400,000 children attend schools that are operating above their designed capacity. The distribution is uneven: secondary schools are more overcrowded than primaries in aggregate, reflecting the secondary demographic bulge as the large primary cohorts of the early 2010s (when UK birth rates were higher) progress through the system. The secondary places &apos;crunch&apos; is projected to peak in 2026-27 in many areas, after which falling birth rates will gradually ease secondary school pressure. In areas of high housing growth — particularly London commuter belt areas, large new urban extensions, and growing market towns — new schools are required ahead of or alongside housing development.</p>
            <p>The condition of school buildings adds a further dimension to the capacity picture. The government&apos;s estimates suggest that approximately 400,000 pupils are in school buildings with RAAC (reinforced autoclaved aerated concrete) structures that require urgent remediation, and that the school condition backlog nationally exceeds £14 billion. When schools are taken wholly or partially out of use for structural or safety reasons, their effective capacity is reduced — sometimes dramatically — creating additional pressure on neighbouring schools. The RAAC crisis, which became publicly prominent in 2023 when a number of schools had to close or partially close affected blocks, is an acute version of a more chronic problem of deferred maintenance.</p>
            <p>Class sizes in English schools have grown as budgetary pressures interact with rising pupil numbers. The proportion of primary classes with 30 or more pupils — the statutory maximum for reception, Year 1, and Year 2 — has grown over the past decade. In secondary schools, average class sizes have increased in most subjects, with particular pressure in STEM subjects where teacher shortages mean available teachers are covering larger groups. Large class sizes have a well-evidenced negative relationship with pupil progress for children with additional needs, English as an additional language, or those requiring individualised support.</p>
            <p>The supply response to school place pressure involves a combination of capital expansion at existing schools (adding temporary or permanent classroom blocks), the opening of new schools including free schools and academy sponsor expansions, and in some cases the use of temporary modular buildings. Free Schools — government-funded schools not controlled by local authorities — have added supply in some areas but their locations are not always optimally aligned with demographic pressure. The Academy system&apos;s ability to expand popular oversubscribed schools is constrained by capital funding availability and planning constraints. The net result is that place supply, while generally meeting demand in aggregate, has significant local mismatches that create overcrowding in popular schools and underutilisation in less popular ones.</p>
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
              label="Pupils in overcrowded schools"
              value="400,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+85k since 2019 · secondary peak approaching"
              sparklineData={[200000, 220000, 240000, 270000, 290000, 310000, 340000, 370000, 400000]}
              source="DfE · School Capacity Survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Secondary schools over capacity"
              value="22%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="22% of secondaries over capacity in 2024"
              sparklineData={[14, 15, 16, 17, 18, 19, 20, 21, 22]}
              source="DfE · School Capacity Survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="New school places created 2023"
              value="65,000"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="65,000 new places · below 80,000/yr target"
              sparklineData={[82000, 80000, 78000, 76000, 72000, 55000, 60000, 68000, 65000]}
              source="DfE · Education and Skills Funding Agency 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Pupils in overcrowded schools, 2016–2024"
              subtitle="Number of pupils in schools operating above designed capacity (thousands)."
              series={series}
              yLabel="Pupils (thousands)"
              source={{ name: 'DfE', dataset: 'School Capacity Survey', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">DfE</strong> — School Capacity (SCAP) Survey. Annual data on net capacity, pupil numbers, and over/under capacity status for all state-funded schools in England.</p>
            <p><strong className="text-wiah-black">DfE / ESFA</strong> — Education and Skills Funding Agency Capital Programmes. Annual data on new school places created through the Basic Need capital programme.</p>
            <p>Note: Net capacity is a DfE-defined measure based on usable teaching space. Temporary buildings count toward net capacity if approved, which may understate true overcrowding in some schools.</p>
          </div>
        </section>
      </main>
    </>
  )
}
