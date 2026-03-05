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

interface AbsencePoint {
  year: number
  absenceRate: number
}

interface CausePoint {
  year: number
  mentalHealth: number
  musculoskeletal: number
  respiratory: number
}

interface SicknessData {
  national: {
    absenceRate: { timeSeries: AbsencePoint[] }
    topCauses: { timeSeries: CausePoint[] }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function NHSSicknessAbsencePage() {
  const [data, setData] = useState<SicknessData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/nhs-sickness-absence/nhs_sickness_absence.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load NHS sickness absence data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const absenceRateSeries: Series[] = [
    {
      id: 'absence-rate',
      label: 'NHS sickness absence rate (%)',
      colour: '#F4A261',
      data: data.national.absenceRate.timeSeries.map(d => ({
        date: yearToDate(d.year),
        value: d.absenceRate,
      })),
    },
  ]

  const causesSeries: Series[] = [
    {
      id: 'mental-health',
      label: 'Mental health / stress',
      colour: '#E63946',
      data: data.national.topCauses.timeSeries.map(d => ({
        date: yearToDate(d.year),
        value: d.mentalHealth,
      })),
    },
    {
      id: 'musculoskeletal',
      label: 'Musculoskeletal',
      colour: '#264653',
      data: data.national.topCauses.timeSeries.map(d => ({
        date: yearToDate(d.year),
        value: d.musculoskeletal,
      })),
    },
    {
      id: 'respiratory',
      label: 'Respiratory',
      colour: '#6B7280',
      data: data.national.topCauses.timeSeries.map(d => ({
        date: yearToDate(d.year),
        value: d.respiratory,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="NHS Staff Absence" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Staff Absence"
          question="How Much Time Are NHS Staff Losing to Sickness?"
          finding="NHS staff absence hit 5.6% in 2022/23 &mdash; the equivalent of 75,000 full-time staff off sick every day, costing over &pound;3.3 billion annually and compounding existing workforce shortages."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS sickness absence reached 5.6% in 2022/23 &mdash; the highest rate since consistent records began in 2009 &mdash; equivalent to around 75,000 full-time staff absent on any given day and a direct cost exceeding &pound;3.3 billion annually. This is roughly 50% above the private sector average of 3.4%, a gap that has widened since the pandemic. Mental health conditions and stress have overtaken musculoskeletal problems as the leading cause, accounting for approximately 30% of all days lost. The 2023 NHS Staff Survey found that 44% of staff reported illness from work-related stress, and 33% said their organisation did not take positive action on wellbeing. COVID-19 marked a step change &mdash; long COVID affected an estimated 80,000&ndash;120,000 staff &mdash; and the underlying rate has not returned to pre-pandemic levels.</p>
            <p>The burden is not evenly distributed. Ambulance trusts record absence rates over 7%, almost double community health trusts. North East and Yorkshire trusts have the highest rates; London and the South East the lowest. Healthcare assistants and domestic staff have absence rates roughly 60% higher than medical and dental staff; women, who make up 77% of the NHS workforce, have higher rates than men in every staff group, partly because they are concentrated in the highest-absence roles and carry disproportionate caring responsibilities outside work. The relationship between pressure and absence is self-reinforcing: understaffing raises workload, which raises stress absence, which further reduces available staff.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-absence-rate', label: 'Absence Rate' },
          { id: 'sec-causes', label: 'Top Causes' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS sickness absence rate"
              value="5.6"
              unit="%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2022/23 &middot; Up from 4.2% in 2015 &middot; Target: 3.5%"
              sparklineData={[4.23, 4.16, 4.22, 4.19, 4.58, 4.86, 5.22, 5.64, 5.28]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Days lost per year"
              value="27.8M"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2022/23 &middot; Up from 22M in 2015"
              sparklineData={[22.0, 21.8, 22.4, 22.9, 23.8, 25.1, 26.4, 27.8, 26.9]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Estimated annual cost"
              value="3.3"
              unit="bn"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2022/23 &middot; Direct cost to NHS England"
              sparklineData={[2.1, 2.2, 2.3, 2.4, 2.6, 2.8, 3.0, 3.3, 3.1]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-absence-rate" className="mb-12">
            <LineChart
              title="NHS sickness absence rate, England, 2015&ndash;2024"
              subtitle="Percentage of available working days lost to sickness absence. All HCHS staff."
              series={absenceRateSeries}
              yLabel="Absence rate (%)"
              targetLine={{ value: 3.5, label: 'NHS target (3.5%)' }}
              source={{
                name: 'NHS Digital',
                dataset: 'NHS Sickness Absence Rates',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-causes" className="mb-12">
            <LineChart
              title="Top causes of NHS sickness absence, 2015&ndash;2024"
              subtitle="Percentage of total absence days by cause category. England."
              series={causesSeries}
              yLabel="Share of absence (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'NHS Sickness Absence Rates by Reason',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Mental health support reducing absence duration"
            value="15%"
            description="NHS trusts that have implemented dedicated mental health support programmes &mdash; including staff psychological wellbeing hubs, trauma-informed peer support, and rapid-access counselling &mdash; have reported reductions in average absence episode duration of up to 15%. The NHS England Wellbeing Guardian programme, rolled out nationally in 2021, requires every trust board to have a designated director responsible for staff mental health."
            source="Source: NHS England &mdash; NHS People Plan, 2023 progress update."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; NHS Sickness Absence Rates. Monthly publication covering all directly employed NHS Hospital &amp; Community Health Service (HCHS) staff in England. Absence rate calculated as FTE days lost as a proportion of FTE days available.</p>
            <p>NHS England &mdash; NHS Staff Survey. Annual survey of over 700,000 NHS staff. Covers health and wellbeing, workload, and organisational culture. Response rate approximately 45%.</p>
            <p>NHS England &mdash; NHS People Plan and Workforce Statistics. Workforce composition, demographics, and supply data.</p>
            <p>Cost estimates based on NHS Employers methodology: direct salary costs of absent staff plus estimated agency and bank cover costs. Does not include productivity losses or delayed treatment impacts. Absence data excludes primary care, social care, and non-directly employed staff (bank, agency, locum).</p>
          </div>
        </section>
      </main>
    </>
  )
}
