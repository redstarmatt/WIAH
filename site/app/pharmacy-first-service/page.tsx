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
            <p>Pharmacy First launched in January 2024, allowing community pharmacists to assess and treat patients for seven common conditions without a GP referral: urinary tract infections in women, sinusitis, sore throat, infected insect bites, impetigo, shingles, and acute otitis media (earache) in children. In its first year, over 1.4 million consultations took place, with 89% of cases resolved without the patient needing to see a GP. The scheme represents the most significant expansion of pharmacy clinical services in the history of the NHS.</p>
            <p>The clinical case is strong. For uncomplicated UTIs, sinusitis and earache, pharmacist assessment is clinically equivalent to GP assessment for the vast majority of presentations. Pharmacists can prescribe antibiotics under a patient group direction, issue advice, and refer to a GP or emergency care if the presentation is more complex. The 89% resolution rate confirms that the overwhelming majority of eligible presentations are appropriate for pharmacy management. The scheme also enables same-day or next-day access, compared to an average 2.4-day wait for a routine GP appointment.</p>
            <p>Access is not uniform. Participation rates vary significantly between pharmacy chains and between geographies. Independent pharmacies, which serve a disproportionately high share of deprived communities, have been slower to enrol due to IT system requirements and the administrative burden of registration. There are also areas, particularly rural communities with few pharmacies, where the scheme offers limited benefit. The NHS England roll-out has been geographically concentrated, and there are measurable disparities in uptake by deprivation quintile.</p>
            <p>The scheme is well received by patients. Satisfaction surveys show high rates of positive experience, with patients valuing the convenience, speed, and approachability of pharmacy consultations. Pharmacists report high job satisfaction from the expanded clinical role. There are also early signals of systemic benefit: GP practices reporting the highest Pharmacy First utilisation in their area show modest reductions in appointment demand for the seven covered conditions.</p>
            <p>The critical question is whether Pharmacy First can be expanded. NHS England has indicated an aspiration to extend the scheme to additional conditions, including skin conditions, minor injuries, and respiratory infections. This would require investment in pharmacist training, pharmacy IT infrastructure, and remuneration that makes participation sustainable for independent pharmacies. The current payment per consultation of &pound;15 is considered by many pharmacy owners to be below cost once staff time, consumables, and administration are accounted for. Scaling Pharmacy First requires pricing it to survive.</p>
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
              onExpand={() => {}}
              source="NHS England &middot; Pharmacy First Dashboard 2024"
            />
            <MetricCard
              label="Resolution rate"
              value="89%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="conditions resolved without GP referral"
              sparklineData={[0, 0, 0, 0, 0, 0, 0, 89]}
              onExpand={() => {}}
              source="NHS England &middot; Pharmacy First Dashboard 2024"
            />
            <MetricCard
              label="Pharmacy wait time"
              value="0.5 days"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="vs 2.4-day GP wait &middot; same-day access"
              sparklineData={[2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 0.5]}
              onExpand={() => {}}
              source="NHS England &middot; Pharmacy First Evaluation 2024"
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
