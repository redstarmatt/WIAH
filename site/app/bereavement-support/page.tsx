'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface BereavementSupportData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    bereavedAnnuallyK: number
    accessingSpecialistPct: number
    avgWaitWeeks: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function BereavementSupportPage() {
  const [data, setData] = useState<BereavementSupportData | null>(null)

  useEffect(() => {
    fetch('/data/bereavement-support/bereavement_support.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const bereavementSeries: Series[] = data
    ? [
        {
          id: 'accessingSpecialist',
          label: 'Accessing specialist support (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.accessingSpecialistPct,
          })),
        },
        {
          id: 'avgWait',
          label: 'Average wait (weeks)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgWaitWeeks,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Bereavement Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bereavement Support"
          question="How much support do bereaved people receive?"
          finding="Around 600,000 people are bereaved each year in England. Fewer than 10% access specialist bereavement support."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 600,000 people die in England each year, leaving an estimated 3 million people newly bereaved annually. Clinical estimates suggest 10&ndash;15% will need specialist support for complicated grief, prolonged grief disorder, or grief-associated depression &mdash; yet fewer than 10% currently access it. Cruse Bereavement Support, the largest national charity, handles over 80,000 contacts per year but is funded primarily through donations rather than NHS contract. Average referral-to-assessment wait times rose sharply during the COVID-19 pandemic, reaching 11 weeks in 2024 &mdash; more than twice the 2015 figure of 7 weeks. NHS Talking Therapies services are theoretically accessible for grief-related conditions, but limited grief-specific training and clinical thresholds leave many bereaved people unserved.</p>
            <p>Children and people without workplace protections bear a disproportionate share of the support gap. School-based bereavement provision is inconsistent and dependent on individual pastoral capacity; specialist therapy for under-18s is limited in most areas, despite evidence that unaddressed childhood bereavement significantly raises the risk of adult mental health problems. Statutory bereavement leave in England is three days for the death of a dependant &mdash; with no entitlement for the loss of a partner, parent, or sibling &mdash; leaving many workers in acute grief with no protected time and no access to support.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Service Access' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Bereaved annually in England"
              value="600k"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="~3m newly bereaved annually"
              sparklineData={[570, 575, 578, 580, 582, 640, 610, 595, 600]}
              href="#sec-chart"source="ONS &middot; Death registrations"
            />
            <MetricCard
              label="Accessing specialist support"
              value="9%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 12% in 2015"
              sparklineData={[12, 11, 11, 10, 10, 9, 9, 9, 9]}
              href="#sec-chart"source="Cruse &middot; NHS England"
            />
            <MetricCard
              label="Average grief support wait"
              value="11 wks"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 7 weeks in 2015"
              sparklineData={[7, 8, 8, 9, 9, 12, 11, 11, 11]}
              href="#sec-chart"source="Cruse Bereavement Support"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Bereavement service referrals, 2015&ndash;2024"
              subtitle="Percentage of bereaved people accessing specialist support and average referral-to-assessment wait in weeks, England."
              series={bereavementSeries}
              yLabel="Value"
              source={{
                name: 'Cruse Bereavement Support',
                dataset: 'Annual Report and service activity data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Cruse Bereavement Support &mdash; Annual Report. cruse.org.uk/about-us/annual-report/</p>
            <p>ONS &mdash; Death registrations summary tables. Annual deaths by age, sex, and cause, England and Wales. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths</p>
            <p>NHS England &mdash; Talking Therapies (IAPT) annual report. england.nhs.uk/mental-health/adults/iapt/</p>
            <p>Marie Curie &mdash; Understanding Grief in the UK. mariecurie.org.uk</p>
            <p>Bereaved annually figure is the annual death count in England. Specialist support access is estimated from Cruse referral volumes and NHS IAPT grief-related contacts as a proportion of total bereaved. Wait time is average referral-to-assessment gap. 2020 figure reflects COVID-19 excess mortality.</p>
          </div>
        </section>
      </main>
    </>
  )
}
