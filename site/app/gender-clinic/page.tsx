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

interface GenderClinicPoint {
  date: string
  waitingListSize: number
  avgWaitMonths: number
}

interface GenderClinicData {
  national: {
    timeSeries: GenderClinicPoint[]
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function GenderClinicPage() {
  const [data, setData] = useState<GenderClinicData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/gender-clinic/gender_clinic.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load gender clinic data:', err)
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
      label: 'Gender identity clinic waiting list',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.waitingListSize,
      })),
    },
  ]

  const waitTimeSeries: Series[] = [
    {
      id: 'avg-wait',
      label: 'Average wait (months)',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.avgWaitMonths,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Gender Clinics" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gender Clinics"
          question="How Long Are People Waiting for Gender Care?"
          finding="The average wait for a gender identity clinic first appointment reached 5&ndash;7 years in 2023, with over 26,000 people on waiting lists &mdash; a sevenfold increase in eight years, driven by surging demand against static NHS capacity."
          colour="#E63946"
          preposition="at"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS gender dysphoria services were small and stable for decades: a few hundred referrals a year nationally, a handful of clinics. From around 2012, referrals began rising rapidly &mdash; accelerating after 2016, with GIDS alone receiving over 5,000 new referrals annually by 2022, a tenfold increase in a decade. Capacity did not move. The waiting list grew from around 3,500 people in 2016 to over 26,000 by 2023. The 2024 Cass Review recommended closing GIDS and replacing it with seven regional hubs; NHS England is implementing this, but the transition has disrupted referral pathways and extended waits further for many patients already on the list.</p>
            <p>Waiting five to seven years for a first appointment has documented consequences. A 2023 Gendered Intelligence survey found 72% of people waiting reported their mental health had deteriorated during the wait. Many pursue private care in parallel at &pound;200&ndash;&pound;500 per consultation, creating a two-tier system. The burden falls unevenly: waiting lists are longest in the South West, East of England, and parts of the Midlands, where local NHS provision was historically absent. Referrals are concentrated in more affluent areas &mdash; getting onto the pathway requires navigating bureaucracy that not everyone can manage equally.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-waiting-list', label: 'Waiting List' },
          { id: 'sec-wait-time', label: 'Wait Time' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Gender clinic waiting list"
              value="26,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Up from 3,500 in 2016"
              sparklineData={[3500, 5000, 7500, 10000, 14000, 18000, 22000, 26000]}
              href="#sec-waiting-list"/>
            <MetricCard
              label="Average wait for first appointment"
              value="5.5"
              unit="yrs"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Up from 1.5 years in 2016"
              sparklineData={[1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 5.5]}
              href="#sec-wait-time"/>
            <MetricCard
              label="Young people waiting (under 18)"
              value="5,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Peak figure &middot; Before GIDS closure"
              sparklineData={[300, 500, 800, 1500, 2500, 4000, 5000, 4800]}
              href="#sec-wait-time"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waiting-list" className="mb-12">
            <LineChart
              title="Gender identity clinic waiting list, England, 2016&ndash;2023"
              subtitle="Total patients on NHS gender identity clinic waiting lists. Adults and young people combined."
              series={waitingListSeries}
              yLabel="Patients waiting"
              source={{
                name: 'NHS England',
                dataset: 'Gender Dysphoria Clinic Waiting Times',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-wait-time" className="mb-12">
            <LineChart
              title="Average gender clinic waiting time, England, 2016&ndash;2023"
              subtitle="Median months from referral to first clinical appointment. NHS gender identity clinics."
              series={waitTimeSeries}
              yLabel="Wait (months)"
              source={{
                name: 'NHS England',
                dataset: 'Gender Dysphoria Clinic Waiting Times',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Seven new regional gender clinics commissioned"
            value="7"
            description="The NHS commissioned 7 new regional gender clinics in 2023 to replace the centralised GIDS model, aiming to cut waits significantly by providing more localised, holistic, multidisciplinary care closer to where patients live. The new services integrate mental health, endocrinology, and social support under one pathway, reducing the fragmentation that characterised the old system. If fully staffed and funded to capacity, the regional model could substantially reduce geographic inequity in access and bring waiting times closer to the 18-week NHS standard."
            source="Source: NHS England &mdash; Gender Dysphoria Programme, Service Specification 2023."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Gender Dysphoria Clinic Waiting Times. Quarterly data from all commissioned gender identity clinics in England. Includes referral numbers, waiting list size, and waiting time statistics.</p>
            <p>The Cass Review &mdash; Independent Review of Gender Identity Services for Children and Young People. Final report April 2024. Commissioned by NHS England. Covers clinical evidence, service design, and policy recommendations.</p>
            <p>Gendered Intelligence &mdash; Trans and Non-Binary Experiences of Healthcare. Annual survey of trans and non-binary people&apos;s NHS experiences. Self-selected sample. Covers access, waiting times, and care quality.</p>
            <p>Waiting list size from NHS England quarterly returns. Average wait data from NHS England and Gendered Intelligence surveys combined. Under-18 figures from former GIDS annual reports. Service redesign timeline from NHS England programme communications. Data covers England unless stated.</p>
          </div>
        </section>
      </main>
    </>
  )
}
