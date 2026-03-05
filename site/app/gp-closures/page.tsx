'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface GpClosuresData {
  practiceCount: Array<{ year: number; practices: number }>
  patientsPerPractice: Array<{ year: number; patients: number }>
  closuresByYear: Array<{ year: number; closures: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function GpClosuresPage() {
  const [data, setData] = useState<GpClosuresData | null>(null)

  useEffect(() => {
    fetch('/data/gp-closures/gp_closures.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const practiceCountSeries: Series[] = data
    ? [{
        id: 'practices',
        label: 'GP practices in England',
        colour: '#E63946',
        data: data.practiceCount.map(d => ({
          date: yearToDate(d.year),
          value: d.practices,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="GP Closures" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="GP Closures"
          question="How many GP practices have closed?"
          finding="1,640 GP practices have closed since 2013. Average practice list sizes have grown from 6,900 to 9,600 patients &mdash; creating larger, less personal surgeries where continuity of care is harder."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has lost 1,640 GP practices since 2013 &mdash; a fall from 8,221 to 6,581 surgeries &mdash; with 268 closures or mergers in 2023 alone, the highest annual total on record. The causes are structural: an ageing GP workforce approaching retirement, contract arrangements that make small practices financially marginal, and rising indemnity costs that disproportionately hit single-handed surgeries. As smaller practices close, their patient lists are absorbed by remaining surgeries, driving average list sizes from 6,900 patients per practice in 2013 to 9,600 in 2023. The NHS Long Term Plan committed to training 6,000 additional GPs by 2024 &mdash; a target that was not met &mdash; and around 40% of GPs are now aged over 50, with surveys showing high burnout and early retirement intent.</p>
            <p>The burden of closures is not evenly spread. Rural areas are most exposed: when the only surgery within 20 miles closes because a GP has retired and no successor can be recruited, patients face long travel times or cannot register anywhere at all. GP deserts are emerging in coastal and rural communities. Consolidation also erodes continuity &mdash; seeing the same GP repeatedly is associated with better outcomes for long-term conditions and lower emergency admissions &mdash; and a 9,600-patient practice is structurally unable to deliver it in the way smaller surgeries historically did, redirecting demand to A&amp;E and urgent care walk-ins.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Practice Numbers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="GP practices since 2013"
              value="&minus;1,640"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="From 8,221 in 2013 to 6,581 in 2023 &middot; accelerating"
              sparklineData={[8221, 7989, 7672, 7394, 7128, 6581]}
              href="#sec-chart"source="NHS Digital &middot; GP Workforce 2023"
            />
            <MetricCard
              label="Average patients per practice"
              value="9,600"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 6,900 in 2013 &middot; smaller practices merged or closed"
              sparklineData={[6900, 7200, 7600, 8100, 8700, 9600]}
              href="#sec-chart"source="NHS Digital &middot; 2023"
            />
            <MetricCard
              label="Practice closures in 2023"
              value="268"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Highest annual total on record &middot; retirement and financial pressure"
              sparklineData={[145, 189, 201, 178, 234, 268]}
              href="#sec-chart"source="NHS Digital &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Number of GP practices in England, 2013&ndash;2023"
              subtitle="Total NHS GP practices. Closures include both permanent closures and mergers where one practice absorbs another."
              series={practiceCountSeries}
              yLabel="Number of practices"
              source={{
                name: 'NHS Digital',
                dataset: 'GP Workforce Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; General Practice Workforce Statistics. Published annually. digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services</p>
            <p>BMA &mdash; General Practice Analysis. bma.org.uk/advice-and-support/nhs-delivery-and-workforce/pressures/pressures-in-general-practice-data-analysis</p>
            <p>Practice count reflects NHS organisations with a registered GMS, PMS, or APMS contract providing primary medical services. Practices that merge into a single entity count as one closure. List size data is derived from the NHS Digital Patient Registered at a GP Practice dataset, divided by active practice count at the same date.</p>
          </div>
        </section>
      </main>
    </>
  )
}
