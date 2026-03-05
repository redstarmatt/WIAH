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
            <p>Approximately 400,000 children attend schools operating above their designed capacity. Secondary schools are more overcrowded than primaries in aggregate, reflecting a demographic bulge as the large primary cohorts of the early 2010s progress through the system &mdash; the secondary places crunch is projected to peak in 2026&ndash;27. The school condition backlog exceeds &pound;14 billion, and RAAC remediation has further reduced effective capacity in 174 schools, creating additional pressure on neighbouring institutions. Class sizes have grown as budget pressures interact with rising pupil numbers; in STEM subjects, teacher shortages mean available teachers cover larger groups. Place supply meets demand in aggregate but has significant local mismatches that create overcrowding in popular schools and underutilisation in less popular ones.</p>
            <p>Large class sizes have a well-evidenced negative relationship with progress for children with additional needs, EAL pupils, and those requiring individualised support &mdash; the pupils who bear the heaviest cost of overcrowding are those who can least afford it. In areas of high housing growth, new schools are required ahead of or alongside development but capital funding constraints mean schools frequently open late, leaving interim overcrowding as parents in new developments have limited choice. The RAAC crisis is the acute face of a chronic problem: deferred capital maintenance compressing effective capacity in the schools that serve communities with the fewest alternatives.</p>
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
              href="#sec-chart"/>
            <MetricCard
              label="Secondary schools over capacity"
              value="22%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="22% of secondaries over capacity in 2024"
              sparklineData={[14, 15, 16, 17, 18, 19, 20, 21, 22]}
              source="DfE · School Capacity Survey 2024"
              href="#sec-chart"/>
            <MetricCard
              label="New school places created 2023"
              value="65,000"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="65,000 new places · below 80,000/yr target"
              sparklineData={[82000, 80000, 78000, 76000, 72000, 55000, 60000, 68000, 65000]}
              source="DfE · Education and Skills Funding Agency 2024"
              href="#sec-chart"/>
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
