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
            <p>Each year around 600,000 people die in England. Using bereavement research estimates of five close bereaved people per death, that represents approximately 3 million people newly bereaved annually. Of these, a significant proportion will experience grief that significantly impairs their daily functioning &mdash; complicated grief, prolonged grief disorder, or grief-associated depression or anxiety. Clinical estimates suggest around 10&ndash;15% of bereaved people will need specialist support. Fewer than 10% currently access it.</p>
            <p>Bereavement support is provided through a patchwork of NHS, voluntary sector, and private provision. Cruse Bereavement Support, the largest national charity, handles over 80,000 contacts per year but is funded primarily through charitable donations and volunteer counsellors rather than NHS contract. Marie Curie provides bereavement support to families of those who have died of cancer or terminal illness, often extending to community bereavement cafes and peer support groups. NHS IAPT services are theoretically accessible for grief-related anxiety and depression, but clinical thresholds, waiting times, and the limited grief-specific training of IAPT practitioners mean many bereaved people are not effectively served.</p>
            <p>Wait times for bereavement support have grown. Average referral-to-assessment gaps at Cruse and comparable services rose sharply during the COVID-19 pandemic &mdash; when demand surged and many face-to-face services closed &mdash; and have only partially recovered. At 11 weeks in 2024, the average wait is more than twice what it was in 2015. For people in acute grief, weeks of waiting without support while processing a death can result in significant mental health deterioration that is harder and more expensive to treat subsequently.</p>
            <p>Children and young people are particularly poorly served. School-based bereavement support is inconsistent &mdash; dependent on individual school pastoral provision &mdash; and specialist bereavement therapy for under-18s is limited in most areas. Research shows that unaddressed childhood bereavement significantly increases the risk of mental health problems in adulthood. Winston&apos;s Wish and similar children&apos;s bereavement charities cover part of this gap but on a fraction of the funding that the scale of need would require.</p>
            <p>Workplace bereavement policy is a related area of significant inadequacy. Statutory bereavement leave in England is three days for the death of a dependant, with no additional entitlement for bereavement of a partner, parent, or sibling. The Parental Bereavement (Leave and Pay) Act 2020 introduced two weeks of paid leave for parents bereaved of a child, which was a significant reform. But for all other bereavement categories, employers rely on contractual and goodwill provisions that vary enormously and leave many workers in acute grief with no protected time to process their loss.</p>
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
              onExpand={() => {}}
              source="ONS &middot; Death registrations"
            />
            <MetricCard
              label="Accessing specialist support"
              value="9%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 12% in 2015"
              sparklineData={[12, 11, 11, 10, 10, 9, 9, 9, 9]}
              onExpand={() => {}}
              source="Cruse &middot; NHS England"
            />
            <MetricCard
              label="Average grief support wait"
              value="11 wks"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 7 weeks in 2015"
              sparklineData={[7, 8, 8, 9, 9, 12, 11, 11, 11]}
              onExpand={() => {}}
              source="Cruse Bereavement Support"
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
