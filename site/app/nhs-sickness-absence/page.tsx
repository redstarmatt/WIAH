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
            <p>The National Health Service employs approximately 1.4 million people in England, making it one of the largest employers in the world. Keeping that workforce healthy and present is fundamental to delivering care. Yet sickness absence in the NHS has been rising steadily for a decade, reaching 5.6&percnt; in 2022/23 &mdash; the highest rate since consistent records began in 2009. In practical terms, this means the equivalent of around 75,000 full-time staff were absent on any given day. The direct cost to the NHS exceeded &pound;3.3 billion in that year alone, a figure that does not account for the knock-on costs of agency cover, delayed treatments, or the additional burden placed on colleagues who remain at work. The NHS absence rate is roughly 50&percnt; higher than the private sector average of 3.4&percnt;, a gap that has widened since the pandemic and reflects both the physical demands of healthcare work and systemic workforce pressures.</p>
            <p>Mental health conditions and stress have overtaken musculoskeletal problems as the leading cause of NHS absence, accounting for approximately 30&percnt; of all days lost. Anxiety, depression, and work-related stress are not distributed evenly across the workforce: nursing staff, healthcare assistants, and ambulance paramedics report the highest rates. The 2023 NHS Staff Survey found that 44&percnt; of staff reported feeling unwell as a result of work-related stress in the previous 12 months, and 33&percnt; said their organisation did not take positive action on health and wellbeing. Staff working in emergency departments, mental health services, and social care interfaces &mdash; the parts of the system under greatest operational pressure &mdash; consistently show the highest absence rates. The relationship between workforce pressure and absence is self-reinforcing: understaffing increases workload, which increases stress absence, which further reduces available staff.</p>
            <p>The pandemic marked a step change in NHS sickness absence. In April 2020, the monthly absence rate spiked to 6.2&percnt;, driven initially by COVID-19 infection and subsequently by long COVID, burnout, and the psychological toll of working through successive waves. While the acute spike subsided, the underlying rate has not returned to pre-pandemic levels. Long COVID alone is estimated to have affected between 80,000 and 120,000 NHS staff to some degree, with a significant minority experiencing symptoms lasting over 12 months that affect their capacity to work full duties. The pandemic also accelerated pre-existing trends: the average age of NHS staff has been increasing, and older workers tend to have higher absence rates due to chronic conditions. Between 2019 and 2023, the proportion of NHS staff aged over 55 increased from 17&percnt; to 21&percnt;, adding further upward pressure on absence figures.</p>
            <p>Absence rates vary substantially by region, staff group, and trust type. Ambulance trusts consistently record the highest absence rates, averaging over 7&percnt; &mdash; almost double the rate in community health trusts. Within individual organisations, the gap between the best- and worst-performing units can exceed three percentage points. Geographically, the North East and Yorkshire have the highest absence rates, while London and the South East have the lowest, reflecting broader patterns in population health, deprivation, and labour market dynamics. The burden also falls disproportionately on lower-paid staff: healthcare assistants and domestic staff have absence rates roughly 60&percnt; higher than medical and dental staff. Women, who make up 77&percnt; of the NHS workforce, have higher absence rates than men across every staff group &mdash; partly reflecting the additional caring responsibilities that disproportionately fall on women, and partly reflecting that women are concentrated in the highest-absence roles.</p>
            <p>NHS sickness absence data, while more comprehensive than most sectors, has notable limitations. The figures capture only directly employed staff and exclude the growing number of bank, agency, and locum workers who now fill a significant proportion of shifts &mdash; estimated at over 70,000 full-time equivalent posts in 2023. When temporary staff are unwell, they simply do not take shifts, meaning their absence is invisible in the statistics but its operational impact is real. The data also does not distinguish between short-term and long-term absence in published headline figures, despite the two having very different causes and requiring different management approaches. Short-term absence (one to seven days) is often driven by acute illness and is relatively difficult to reduce; long-term absence (28 days or more) is more amenable to intervention through occupational health support, phased return programmes, and workplace adjustments. Perhaps most critically, the data does not capture presenteeism &mdash; staff attending work while unwell. Survey evidence suggests this is widespread in the NHS: the 2023 Staff Survey found that 52&percnt; of staff had attended work in the previous three months despite feeling unwell enough to stay at home, raising questions about both patient safety and the true scale of workforce ill-health.</p>
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
            description="NHS trusts that have implemented dedicated mental health support programmes &mdash; including staff psychological wellbeing hubs, trauma-informed peer support, and rapid-access counselling &mdash; have reported reductions in average absence episode duration of up to 15&percnt;. The NHS England Wellbeing Guardian programme, rolled out nationally in 2021, requires every trust board to have a designated director responsible for staff mental health."
            source="Source: NHS England &mdash; NHS People Plan, 2023 progress update."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; NHS Sickness Absence Rates. Monthly publication covering all directly employed NHS Hospital &amp; Community Health Service (HCHS) staff in England. Absence rate calculated as FTE days lost as a proportion of FTE days available.</p>
            <p>NHS England &mdash; NHS Staff Survey. Annual survey of over 700,000 NHS staff. Covers health and wellbeing, workload, and organisational culture. Response rate approximately 45&percnt;.</p>
            <p>NHS England &mdash; NHS People Plan and Workforce Statistics. Workforce composition, demographics, and supply data.</p>
            <p>Cost estimates based on NHS Employers methodology: direct salary costs of absent staff plus estimated agency and bank cover costs. Does not include productivity losses or delayed treatment impacts. Absence data excludes primary care, social care, and non-directly employed staff (bank, agency, locum).</p>
          </div>
        </section>
      </main>
    </>
  )
}
