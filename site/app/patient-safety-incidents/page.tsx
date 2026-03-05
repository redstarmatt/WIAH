'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface SafetyDataPoint {
  year: number
  neverEvents: number
  seriousIncidents: number
  maternityIncidents: number
}

interface PatientSafetyIncidentsData {
  topic: string
  lastUpdated: string
  timeSeries: SafetyDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PatientSafetyIncidentsPage() {
  const [data, setData] = useState<PatientSafetyIncidentsData | null>(null)

  useEffect(() => {
    fetch('/data/patient-safety-incidents/patient_safety_incidents.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const allSeries: Series[] = data
    ? [
        {
          id: 'never-events',
          label: 'Never events',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.neverEvents })),
        },
        {
          id: 'serious-incidents',
          label: 'Serious incidents (÷10)',
          colour: '#0D1117',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: Math.round(d.seriousIncidents / 10) })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Patient Safety Incidents" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Patient Safety Incidents"
          question="How Often Does the NHS Make Serious Mistakes?"
          finding="392 &lsquo;never events&rsquo; &mdash; mistakes so serious they should never occur &mdash; were recorded in 2023/24, alongside 12,400 serious incidents."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>&ldquo;Never events&rdquo; are defined by NHS England as serious, largely preventable incidents that known safeguards should prevent &mdash; wrong-site surgery, retained surgical instruments, misplaced nasogastric tubes. In 2024, 367 were recorded across NHS England, down from a peak of 487 but still indicative of persistent system-level failure. Serious incidents &mdash; a broader category covering significant patient harm &mdash; rose from 10,800 in 2018 to a peak of 12,400 in 2023, before falling to 11,800 in 2024. Maternity incidents account for 28% of all serious incidents, disproportionate to maternity&apos;s share of NHS activity, with the Ockenden, Kirkup and East Kent reviews all finding that systemic failures went uninvestigated and uncorrected for years. The Patient Safety Incident Response Framework, introduced in 2022, aims to shift from individual blame toward systemic learning.</p>
            <p>The burden of unsafe care falls on the patients least able to advocate for themselves. Those in maternity services, mental health inpatient units, and emergency departments account for a disproportionate share of serious incidents. Deprived communities face higher rates of harm partly because the trusts serving them are more likely to face staffing shortages and infrastructure constraints that create the conditions for error. Rising reporting rates can reflect improving safety culture as much as worsening performance &mdash; psychologically safe organisations tend to report more because staff trust they can flag concerns without personal consequences &mdash; making crude comparisons between trusts unreliable without cultural context.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Incident Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Never events (2024)"
              value="367"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="down from 487 peak &middot; wrong-site surgery most common"
              sparklineData={[413, 487, 358, 349, 378, 392, 367, 367]}
              onExpand={() => {}}
              source="NHS England &middot; Never Events Data 2023/24"
            />
            <MetricCard
              label="Serious incidents"
              value="11,800"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+9% since 2018 &middot; maternity highest risk area"
              sparklineData={[10800, 11200, 9900, 10100, 11600, 12400, 11800, 11800]}
              onExpand={() => {}}
              source="NHS England &middot; Serious Incidents Report 2023/24"
            />
            <MetricCard
              label="Maternity incidents"
              value="3,300"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="28% of all serious incidents &middot; Donna Ockenden review"
              sparklineData={[2700, 2900, 2600, 2900, 3200, 3500, 3300, 3300]}
              onExpand={() => {}}
              source="NHS England &middot; Maternity Safety Data 2023/24"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Patient safety incidents, England, 2018&ndash;2024"
              subtitle="Never events (left scale) and serious incidents &divide;10 (right scale, shown on same axis for comparison). Never events are a subset of serious incidents meeting a specific preventability definition."
              series={allSeries}
              yLabel="Count"
              source={{
                name: 'NHS England',
                dataset: 'Patient Safety Incident Management System (PSIMS)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Never events data. Published annually. england.nhs.uk/patient-safety/never-events/</p>
            <p>NHS England &mdash; Patient Safety Incident Management System (PSIMS). england.nhs.uk/patient-safety/patient-safety-incident-management-system/</p>
            <p>Donna Ockenden &mdash; Independent Review of Maternity Services at Shrewsbury and Telford NHS Trust. March 2022.</p>
            <p>Never events are defined under the NHS England Never Events Policy and Framework. Serious incidents are reported to the Patient Safety Incident Management System and include all events meeting the Serious Incident criteria under PSIRF (from 2022) or the previous Serious Incident Framework. Maternity incidents are a subset of serious incidents classified under the Maternity Incentive Scheme reporting criteria.</p>
          </div>
        </section>
      </main>
    </>
  )
}
