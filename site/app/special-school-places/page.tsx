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
            <p>Children with Education, Health and Care (EHC) plans have risen from approximately 240,000 in 2015 to over 575,000 in 2024, driven by rising need, better identification, greater parental awareness of rights under the Children and Families Act 2014, and expanded eligibility. Provision has not kept pace: applications for special school places exceed available places by 30%, with an estimated 5,200 children currently without a placement &mdash; some waiting over 12 months. When maintained special school places are unavailable, local authorities must fund alternatives: independent special school placements averaging &pound;65,000&ndash;&pound;120,000 per year against the &pound;27,800 maintained average, four times the mainstream rate. Total local authority SEND spending reached &pound;10.3 billion in 2023&ndash;24 &mdash; a 55% rise in five years &mdash; yet most councils are accumulating high-needs budget deficits that are creating significant financial distress. SEND Tribunal casework has risen 60% since 2019, with a high proportion of successful appeals resulting in independent placements at greater cost than the provision originally refused.</p>
            <p>The government&apos;s SEND Review (March 2023) committed to a new national framework, standardised local inclusion plans, and a capital programme to create 60,000 new SEND places. New special schools typically take 3&ndash;5 years from planning to opening, and critics argued the review did not address the fundamental resource gap. The structural mismatch between rising demand and constrained supply is most severe for children with autism, complex communication needs, and profound learning disabilities &mdash; the populations for whom mainstream provision is least suitable and for whom waiting without an appropriate placement has the most serious developmental consequences.</p>
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
