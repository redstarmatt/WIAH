'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

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
            <p>In 2023, 121 medicines were formally classified as in shortage in England — more than three times the number in 2018 — affecting HRT, ADHD medications, antibiotics, GLP-1 diabetes drugs, and epilepsy treatments. Pharmaceutical supply chains are highly concentrated: active ingredients for many common medicines are manufactured in a small number of Indian and Chinese factories, and a single production problem can remove a product from global markets within weeks. The COVID-19 pandemic exposed this fragility and shortages have not fully resolved; Brexit added complexity through regulatory divergence and re-labelling requirements. ADHD medication shortages persisted for over 18 months as surging post-pandemic demand outpaced manufacturer capacity, and over 30 HRT products were simultaneously restricted in 2022–23, disrupting treatment for thousands of menopausal women.</p>
            <p>The impact is not borne equally. Patients with chronic conditions who have been stable on established treatments face the most severe consequences when forced to switch formulations, often with significant adverse effects. ADHD patients, menopausal women, and those on anti-epileptic drugs — groups already navigating under-resourced NHS pathways — bore the greatest burden. The government's statutory supply notification system and the NHS Medicines Shortage Response Group provide useful operational tools, but they manage shortages after the fact rather than preventing them; structural fixes — domestic manufacturing capacity, strategic stockpiles, diversified supply chains — remain largely undelivered.</p>
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
              changeText="up from 34 in 2018 · includes ADHD, HRT, antibiotics"
              sparklineData={[34, 42, 67, 71, 89, 121, 108, 108]}
              href="#sec-chart"source="DHSC · Medicine Supply Notifications 2024"
            />
            <MetricCard
              label="Patient complaints"
              value="290k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+241% since 2018 · 800 per day"
              sparklineData={[85000, 110000, 160000, 190000, 250000, 340000, 290000, 290000]}
              href="#sec-chart"source="NHSBSA · Prescription Issues Data 2024"
            />
            <MetricCard
              label="Average shortage duration"
              value="3.4 months"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="range 1–18 months · some chronic"
              sparklineData={[1.2, 1.5, 1.8, 2.1, 2.4, 3.8, 3.6, 3.4]}
              href="#sec-chart"source="DHSC · Shortage Assessment Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Medicines in shortage, England, 2018–2024"
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
            <p>Department of Health and Social Care — Medicine Supply Notifications. Published as required. gov.uk/government/collections/medicine-supply-notifications</p>
            <p>NHS Business Services Authority — Prescription data. Published monthly. nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis-england</p>
            <p>A medicine is classified as in shortage when the DHSC issues a Medicine Supply Notification (MSN) indicating that a product or formulation is not available or in critically low supply. Shortage count represents the number of distinct MSNs active at any point during the calendar year. Patient complaints figure is derived from NHSBSA patient experience reporting and pharmacy feedback mechanisms.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
