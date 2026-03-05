'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface SpecialSchoolDataPoint {
  year: number
  childrenWaitingK: number
  perPupilCost: number
}

interface SpecialSchoolData {
  topic: string
  lastUpdated: string
  timeSeries: SpecialSchoolDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function SpecialSchoolPlacesPage() {
  const [data, setData] = useState<SpecialSchoolData | null>(null)

  useEffect(() => {
    fetch('/data/special-school-places/special_school_places.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'children-waiting',
          label: 'Children waiting for placement (thousands)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childrenWaitingK })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are There Enough Places for Children With Complex Needs?"
          finding="Special school applications outstrip places by 30%, with 5,200 children currently without a placement — some waiting over a year for a school."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The number of children with Education, Health and Care (EHC) plans — the statutory assessments and plans for children with special educational needs and disabilities — has risen dramatically over the past decade, from approximately 240,000 in 2015 to over 575,000 in 2024. This growth reflects a combination of rising need, improved identification, greater parental awareness of rights under the SEND framework, and the expansion of EHC plan eligibility through the Children and Families Act 2014. The consequence is an enormous increase in demand for specialist educational settings — particularly special schools — that provision has not kept pace with.</p>
            <p>Special schools in England provide education specifically for children with the most complex special educational needs — profound and multiple learning disabilities, severe autism, complex communication needs, physical and sensory impairments. Places in special schools are typically the most suitable provision for children with high-level needs, and when special school places are not available, local authorities are obliged to find alternative provision, often in resourced mainstream schools, specialist units, or independent special schools (which are significantly more expensive for local authorities). The shortage of maintained special school places has created a system under severe pressure, with local authorities spending heavily on independent and non-maintained special schools to meet statutory duties.</p>
            <p>The 5,200 children without a special school placement as of 2024 — some waiting over 12 months — is an estimate based on Freedom of Information requests to local authorities and SEND advocacy organisations including IPSEA and the NAS. The official DfE statistics do not publish a single &apos;waiting for placement&apos; metric, making the true scale of the gap difficult to measure precisely. What is clear is that SEND Tribunal casework — families challenging local authority placement decisions — has risen 60% since 2019, and that a high proportion of successful appeals result in independent special school placements at greater cost to the local authority than the maintained provision they refused.</p>
            <p>Special school unit costs reflect the high staff-to-pupil ratios and specialist expertise required for complex needs education. The average per-pupil cost in a maintained special school was £27,800 per year in 2024 — approximately four times the mainstream rate — with independent special school placements averaging £65,000-£120,000 per year depending on complexity. Total local authority SEND spending reached £10.3 billion in 2023-24, a rise of 55% in five years. The high-needs funding block within the schools national funding formula has grown substantially, but not sufficiently to eliminate the deficits that most local authorities are accumulating in their SEND budgets — deficits that are creating significant financial distress in the local government sector.</p>
            <p>The government&apos;s SEND Review, published in March 2023, set out a plan to reform the SEND system with a new national SEND and alternative provision framework, standardised local inclusion plans, and a commitment to build more maintained special school capacity. The Capital programme to create 60,000 new SEND places was announced but progress has been slow — new special schools typically take 3-5 years from planning to opening. Critics of the review argued that it did not adequately address the fundamental resource gap, particularly for the local authorities facing the most severe high-needs budget deficits. The Delivered in Partnership statutory guidance (2024) represented a further iteration, but the structural mismatch between rising demand and constrained supply remains the defining challenge.</p>
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
              label="Children without special school place"
              value="5,200"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+2,100 since 2020 · some waiting 12+ months"
              sparklineData={[1500, 1800, 2000, 2200, 2400, 2800, 3500, 4200, 5200]}
              source="IPSEA / NAS · SEND Provision Analysis 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Special school demand vs supply"
              value="130%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="30% more applications than available places"
              sparklineData={[105, 107, 110, 113, 116, 120, 123, 127, 130]}
              source="DfE · SEND Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Special school per-pupil cost"
              value="£27,800"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="4× mainstream · rising annually"
              sparklineData={[18000, 19000, 20000, 21000, 22000, 23000, 24500, 26000, 27800]}
              source="DfE · Local Authority Revenue Expenditure 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Children waiting for special school places, 2016–2024"
              subtitle="Estimated number of children with EHC plans waiting for a special school placement."
              series={series}
              yLabel="Children (thousands)"
              source={{ name: 'DfE', dataset: 'SEND Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">DfE</strong> — Education, Health and Care Plans: England. Annual statistical release on EHC plan numbers, timeliness and placements.</p>
            <p><strong className="text-wiah-black">DfE</strong> — Local Authority Revenue Expenditure and Financing. Annual data on per-pupil spending in maintained special schools.</p>
            <p><strong className="text-wiah-black">IPSEA / NAS</strong> — SEND Provision Analysis 2024. Freedom of Information-based estimate of children without special school placement.</p>
            <p>Note: The waiting list figure is an FoI-based estimate and may not capture all children waiting across all local authorities. DfE does not publish a single national metric for this figure.</p>
          </div>
        </section>
      </main>
    </>
  )
}
