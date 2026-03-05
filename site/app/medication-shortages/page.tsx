'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface MedicationDataPoint {
  year: number
  shortagesCount: number
  patientComplaints: number
}

interface MedicationShortagesData {
  topic: string
  lastUpdated: string
  timeSeries: MedicationDataPoint[]
  topShortages: string[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function MedicationShortagesPage() {
  const [data, setData] = useState<MedicationShortagesData | null>(null)

  useEffect(() => {
    fetch('/data/medication-shortages/medication_shortages.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const shortagesSeries: Series[] = data
    ? [{
        id: 'shortages',
        label: 'Medicines in shortage',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.shortagesCount })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Medication Shortages" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Medication Shortages"
          question="Can You Get Your Medication?"
          finding="Over 100 medicines were in shortage in 2023, affecting hundreds of thousands of patients."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>A medicine shortage occurs when a licensed product is unavailable or in insufficient supply to meet patient demand. In 2023, 121 medicines were formally classified as in shortage in England &mdash; more than three times the number in 2018. The shortages have affected some of the most commonly prescribed medicines including HRT, ADHD medications, antibiotics, GLP-1 diabetes drugs, and epilepsy treatments. For patients dependent on these medicines, shortages are not an inconvenience &mdash; they are a medical risk.</p>
            <p>The causes are global. Pharmaceutical supply chains are highly concentrated: the active pharmaceutical ingredients for many common medicines are manufactured in a small number of factories in India and China. A single factory fire, regulatory closure, or production problem can remove a product from global markets within weeks. The COVID-19 pandemic exposed this fragility acutely, accelerating shortages that have not fully resolved. Brexit added additional complexity through regulatory divergence and border friction, particularly affecting medicines that required re-labelling for UK markets.</p>
            <p>ADHD medication shortages were among the most severe and prolonged. Demand for ADHD diagnosis and treatment grew substantially from 2020 onwards as pandemic disruption increased symptom visibility. Manufacturers had not expanded production capacity to match demand, creating a structural shortage that persisted for over 18 months. Patients who had been stable on established medication were forced to switch formulations, often with adverse effects. Some went without treatment entirely, with consequences for employment, education and mental health.</p>
            <p>HRT shortages disproportionately affected menopausal women at a moment when awareness of HRT&apos;s benefits was growing. The Menopause Task Force, established in 2022, identified medicine supply as a significant barrier to access. Several HRT products were in shortage for 12 months or more. Women who had found an effective treatment were left unable to obtain it, a situation that was clinically unnecessary and preventable with better supply chain resilience.</p>
            <p>The government introduced a statutory medicine supply notification system and the NHS created a Medicines Shortage Response Group. Pharmacists have been given expanded authority to substitute equivalent products without returning to the prescriber. These are useful operational responses, but they treat the symptom rather than the cause. Greater domestic manufacturing capacity, strategic stockpiles for critical medicines, and diversified global supply chains represent the structural solutions &mdash; all of which require long-term political and financial commitment.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Shortage Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Medicines in shortage"
              value="108"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from 34 in 2018 &middot; includes ADHD, HRT, antibiotics"
              sparklineData={[34, 42, 67, 71, 89, 121, 108, 108]}
              onExpand={() => {}}
              source="DHSC &middot; Medicine Supply Notifications 2024"
            />
            <MetricCard
              label="Patient complaints"
              value="290k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+241% since 2018 &middot; 800 per day"
              sparklineData={[85000, 110000, 160000, 190000, 250000, 340000, 290000, 290000]}
              onExpand={() => {}}
              source="NHSBSA &middot; Prescription Issues Data 2024"
            />
            <MetricCard
              label="Average shortage duration"
              value="3.4 months"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="range 1&ndash;18 months &middot; some chronic"
              sparklineData={[1.2, 1.5, 1.8, 2.1, 2.4, 3.8, 3.6, 3.4]}
              onExpand={() => {}}
              source="DHSC &middot; Shortage Assessment Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Medicines in shortage, England, 2018&ndash;2024"
              subtitle="Number of licensed medicines formally classified as in shortage at any point during the year."
              series={shortagesSeries}
              yLabel="Number of medicines"
              source={{
                name: 'Department of Health and Social Care',
                dataset: 'Medicine Supply Notifications',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department of Health and Social Care &mdash; Medicine Supply Notifications. Published as required. gov.uk/government/collections/medicine-supply-notifications</p>
            <p>NHS Business Services Authority &mdash; Prescription data. Published monthly. nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis-england</p>
            <p>A medicine is classified as in shortage when the DHSC issues a Medicine Supply Notification (MSN) indicating that a product or formulation is not available or in critically low supply. Shortage count represents the number of distinct MSNs active at any point during the calendar year. Patient complaints figure is derived from NHSBSA patient experience reporting and pharmacy feedback mechanisms.</p>
          </div>
        </section>
      </main>
    </>
  )
}
