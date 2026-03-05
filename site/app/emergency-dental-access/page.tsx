'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface EmergencyDentalData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    cannotAccessM: number
    aeVisitsK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function EmergencyDentalAccessPage() {
  const [data, setData] = useState<EmergencyDentalData | null>(null)

  useEffect(() => {
    fetch('/data/emergency-dental-access/emergency_dental_access.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'aeVisitsK',
          label: 'A&E visits (thousands)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.aeVisitsK })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Dental Access" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dental Care"
          question="Can People Access Emergency Dental Treatment?"
          finding="14 million people cannot access an NHS dentist, and A&E visits for dental pain have reached 180,000 per year — a crisis playing out in hospital emergency departments."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS dental services in England have been in structural decline since the 2006 dental contract changed how dentists were paid and drove many out of NHS practice. The number of NHS dentists fell from around 23,500 in 2009 to 20,800 in 2024 while the population grew. Pandemic closures in 2020 generated a large backlog, and many mixed-practice dentists moved permanently to private-only when UDA (Units of Dental Activity) rates made NHS work financially unrewarding &mdash; NHS treatment volumes fell 24&percnt; between 2019&ndash;20 and 2022&ndash;23. The result: an estimated 14 million adults cannot access an NHS dentist. Approximately 180,000 people now attend hospital A&amp;E each year for acute dental pain, and tooth extraction is the most common reason for hospital admission among children under 10.</p>
            <p>The access crisis falls hardest on those least able to afford private alternatives. Rural areas and deprived communities have the fewest NHS dental places; people on lower incomes who cannot afford private fees are most exposed to the consequences of untreated decay progressing to extraction rather than restoration. The NHS England Dental Recovery Plan (February 2024) committed to 2.5 million new appointments, but the British Dental Association argued this was inadequate without fundamental UDA contract reform &mdash; the perverse incentive structure that pays the same flat rate for a check-up as for a complex restoration, effectively penalising dentists who take on vulnerable, high-need patients.</p>
          </div>
        </section>

        <SectionNav
          sections={[
            { id: 'sec-metrics', label: 'Metrics' },
            { id: 'sec-chart', label: 'Chart' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults unable to access NHS dentist"
              value="14m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+4m since 2019 · rural worst affected"
              sparklineData={[7, 7.5, 8, 9, 10, 10, 11, 12.5, 14]}
              source="Healthwatch England / BDA 2024"
              href="#sec-chart"/>
            <MetricCard
              label="A&E visits for dental pain"
              value="180,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+40% since 2019 · hospital not equipped for dental"
              sparklineData={[95000, 100000, 105000, 110000, 128000, 110000, 130000, 155000, 180000]}
              source="NHS England · Hospital Episode Statistics 2024"
              href="#sec-chart"/>
            <MetricCard
              label="NHS dental extractions share"
              value="45%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="45% of NHS treatments are extractions"
              sparklineData={[30, 31, 32, 33, 34, 35, 38, 42, 45]}
              source="NHS Business Services Authority · Dental Data 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="A&E visits for dental pain, 2016–2024"
              subtitle="Annual hospital emergency department attendances for acute dental pain in England (thousands)."
              series={series}
              yLabel="A&E visits (thousands)"
              source={{ name: 'NHS England', dataset: 'Hospital Episode Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Access estimates from Healthwatch England dental access survey and British Dental Association workforce analysis. A&E visit data from NHS England Hospital Episode Statistics (primary diagnosis codes for dental conditions). NHS dental treatment volumes from NHS Business Services Authority NHS Dental Statistics (annual). NHS Dental Recovery Plan from NHS England, February 2024. UDA contract analysis from British Dental Association policy research.</p>
          </div>
        </section>
      </main>
    </>
  )
}
