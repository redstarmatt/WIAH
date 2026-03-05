'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface EyeCarePoint {
  date: string
  waitingListThousands: number
  waiting18WeeksThousands: number
}

interface EyeCareData {
  national: {
    timeSeries: EyeCarePoint[]
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function EyeCarePage() {
  const [data, setData] = useState<EyeCareData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/eye-care/eye_care.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load eye care data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const waitingListSeries: Series[] = [
    {
      id: 'waiting-list',
      label: 'Ophthalmology waiting list (thousands)',
      colour: '#6B7280',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.waitingListThousands,
      })),
    },
  ]

  const waiting18WeeksSeries: Series[] = [
    {
      id: 'waiting-18-weeks',
      label: 'Patients waiting 18+ weeks (thousands)',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.waiting18WeeksThousands,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Eye Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Eye Care"
          question="Is the NHS Losing Its Sight on Eye Care?"
          finding="Over 630,000 patients are waiting for NHS ophthalmology appointments, and 22,000 people are at risk of preventable sight loss due to delayed follow-ups &mdash; described as a &ldquo;patient safety scandal&rdquo; by the Royal College of Ophthalmologists."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ophthalmology is the largest outpatient specialty in the NHS by volume, with over 8 million appointments per year. The waiting list stood at over 630,000 in 2024 &mdash; up more than 50% since 2018 &mdash; with 250,000 patients waiting longer than 18 weeks. The Royal College of Ophthalmologists estimates that at any given time approximately 22,000 patients are at risk of preventable, irreversible sight loss because follow-up appointments have been delayed beyond clinically safe intervals. Conditions such as wet AMD and advanced glaucoma are acutely time-sensitive: delays of even a few weeks can result in permanent vision loss. A 2023 clinical audit found 28% of wet AMD patients had experienced delays beyond their recommended date, with measurably higher rates of visual deterioration among those seen late. The crisis has been compounded by a 40% shortfall in consultant ophthalmologists nationally and a 75% shortfall in orthoptists.</p>
            <p>The burden falls hardest on older people and people with diabetes, who have a roughly 25-fold higher blindness risk than the general population &mdash; diabetic eye disease being the leading cause of preventable blindness in working-age adults. South Asian communities have higher type 2 diabetes prevalence and therefore higher diabetic retinopathy risk, yet NHS Diabetic Eye Screening attendance falls below 70% in some South Asian communities versus 80% nationally. People in rural areas face limited community provision, with services concentrated in district general and teaching hospitals. Deprivation is associated with later presentation and worse outcomes, driven by lower rates of routine optometry visits where serious conditions are often first detected.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-waiting-list', label: 'Waiting List' },
          { id: 'sec-18-weeks', label: '18-Week Breaches' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Ophthalmology waiting list"
              value="630K"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2024 &middot; Up 57% from 400K in 2018"
              sparklineData={[400, 430, 460, 490, 520, 560, 600, 630]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Patients at risk of preventable sight loss"
              value="22,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Delayed beyond safe clinical intervals"
              sparklineData={[8000, 10000, 12000, 15000, 18000, 20000, 21000, 22000]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Patients waiting 18+ weeks"
              value="250K"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2024 &middot; Breaching NHS constitution standard"
              sparklineData={[130, 145, 160, 180, 200, 220, 245, 250]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waiting-list" className="mb-12">
            <LineChart
              title="NHS ophthalmology waiting list, England, 2018&ndash;2024"
              subtitle="Total patients on NHS ophthalmology incomplete referral-to-treatment pathways. Thousands."
              series={waitingListSeries}
              yLabel="Patients waiting (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Consultant-Led Referral to Treatment Waiting Times',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-18-weeks" className="mb-12">
            <LineChart
              title="Ophthalmology patients waiting 18+ weeks, England, 2018&ndash;2024"
              subtitle="Patients breaching the NHS 18-week referral-to-treatment standard. Thousands."
              series={waiting18WeeksSeries}
              yLabel="Patients (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Consultant-Led Referral to Treatment Waiting Times',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Community optometry pilots freeing up 500,000 appointments annually"
            value="500K"
            description="Community optometry schemes &mdash; where high-street opticians handle routine follow-up appointments for stable conditions such as glaucoma monitoring and post-cataract checks &mdash; are reducing hospital pressure in pilot areas, with potential to free up 500,000 hospital appointments annually if rolled out nationally. NHS England&apos;s Community Eye Care Service reforms, piloted in several ICSs from 2022, have shown that accredited community optometrists can safely manage a significant proportion of low-risk follow-up caseload, freeing ophthalmologists to focus on complex and sight-threatening cases."
            source="Source: Royal College of Ophthalmologists &mdash; The Way Forward: Ophthalmology, 2023 Update."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Consultant-Led Referral to Treatment Waiting Times. Monthly data on all incomplete and completed RTT pathways in England by specialty. Ophthalmology specialty code 130. Does not include follow-up appointment waits.</p>
            <p>Royal College of Ophthalmologists &mdash; The Way Forward: Ophthalmology. Service capacity analysis covering consultant and allied health professional workforce, demand projections, and patient safety implications of delayed appointments. Updated 2022.</p>
            <p>NHS Diabetic Eye Screening Programme &mdash; Annual statistical report. Covers uptake, screening outcomes, and referral rates by demographics and geography.</p>
            <p>Waiting list figures from NHS England RTT data. Preventable sight loss estimate from RCOphth clinical audit. Workforce vacancy data from NHS England workforce statistics. Follow-up wait data not systematically collected nationally; estimates from trust-level clinical audits. Data covers England.</p>
          </div>
        </section>
      </main>
    </>
  )
}
