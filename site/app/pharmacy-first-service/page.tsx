'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface PharmacyCondition {
  condition: string
  resolutionRate: number
}

interface PharmacyFirstDataPoint {
  year: number
  consultations: number
  resolutionRate: number
  avgWaitDays: number
  gpWaitDays: number
}

interface PharmacyFirstServiceData {
  topic: string
  lastUpdated: string
  timeSeries: PharmacyFirstDataPoint[]
  conditions: PharmacyCondition[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PharmacyFirstServicePage() {
  const [data, setData] = useState<PharmacyFirstServiceData | null>(null)

  useEffect(() => {
    fetch('/data/pharmacy-first-service/pharmacy_first_service.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const resolutionSeries: Series[] = data
    ? [{
        id: 'resolution-rate',
        label: 'Resolution rate (%)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.resolutionRate })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Pharmacy First Service" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pharmacy First Service"
          question="Can Pharmacists Replace GPs for Common Conditions?"
          finding="The Pharmacy First scheme has freed up over 1.4 million GP appointments in its first year &mdash; but access remains patchy."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Pharmacy First launched in January 2024, enabling community pharmacists to assess and treat seven common conditions without GP referral: UTIs in women, sinusitis, sore throat, infected insect bites, impetigo, shingles, and earache in children. In its first year, 1.4 million consultations took place, with 89% of cases resolved without GP involvement &mdash; the most significant expansion of pharmacy clinical services in NHS history. Pharmacists can prescribe antibiotics under a patient group direction and refer to a GP or A&amp;E for complex presentations. The scheme delivers same-day access compared to an average 2.4-day wait for a routine GP appointment, and early signals suggest GP practices in high-utilisation areas are seeing modest reductions in appointment demand for covered conditions.</p>
            <p>Access is not uniform. Independent pharmacies, which serve a disproportionately high share of deprived communities, have been slower to enrol due to IT system requirements and administrative burden. Rural areas with few pharmacies derive limited benefit from the scheme. The payment per consultation of &pound;15 is considered by many owners to be below cost after staff time, consumables, and administration &mdash; creating a financial sustainability problem that threatens expansion to additional conditions including skin conditions, minor injuries, and respiratory infections. Deprived communities, who would benefit most from accessible same-day care, are currently least well served by a scheme whose commercial structure disadvantages the pharmacies that reach them.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-positive', label: 'Good News' },
          { id: 'sec-chart', label: 'Performance' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="GP appointments freed"
              value="1.4m"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="in first year &middot; launched Jan 2024"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 1400000]}
              href="#sec-positive"source="NHS England &middot; Pharmacy First Dashboard 2024"
            />
            <MetricCard
              label="Resolution rate"
              value="89%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="conditions resolved without GP referral"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 89]}
              href="#sec-chart"source="NHS England &middot; Pharmacy First Dashboard 2024"
            />
            <MetricCard
              label="Pharmacy wait time"
              value="0.5 days"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="vs 2.4-day GP wait &middot; same-day access"
              sparklineData={[2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 0.5]}
              href="#sec-chart"source="NHS England &middot; Pharmacy First Evaluation 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-positive" className="mb-12">
            <PositiveCallout
              title="1.4 Million GP Appointments Saved"
              value="89%"
              unit="resolution rate"
              description="Community pharmacists now treat 7 common conditions including UTIs, sinusitis and shingles. In the first year, 89% of cases were resolved without GP referral &mdash; delivering same-day access at a fraction of the cost of a GP appointment."
              source="NHS England, Pharmacy First, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Pharmacy First: resolution rate by condition, 2024"
              subtitle="Percentage of consultations resolved without GP referral. All seven Pharmacy First conditions shown."
              series={resolutionSeries}
              yLabel="Resolution rate (%)"
              source={{
                name: 'NHS England',
                dataset: 'Pharmacy First Service Dashboard',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Pharmacy First Service Dashboard. Published monthly. england.nhs.uk/primary-care/pharmacy/pharmacy-first/</p>
            <p>NHS England &mdash; Pharmacy First Evaluation Report. 2024. england.nhs.uk/publications/pharmacy-first-evaluation/</p>
            <p>Pharmacy First launched 31 January 2024. Consultation figures are cumulative across the first year of operation. Resolution rate is defined as the proportion of consultations where the patient did not require onward referral to a GP or emergency department within 7 days. GP wait time comparison derived from NHS Appointments in General Practice data (average days from booking to appointment for routine appointments, October 2024).</p>
          </div>
        </section>
      </main>
    </>
  )
}
