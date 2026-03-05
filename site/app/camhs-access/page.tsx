'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  referrals: number
  rejected: number
  waitOver18Weeks: number
}

interface CamhsAccessData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CamhsAccessPage() {
  const [data, setData] = useState<CamhsAccessData | null>(null)

  useEffect(() => {
    fetch('/data/camhs-access/camhs_access.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const referralSeries: Series[] = data
    ? [
        {
          id: 'referrals',
          label: 'Total referrals',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.referrals })),
        },
        {
          id: 'rejected',
          label: 'Rejected referrals',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rejected })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="CAMHS Access" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="CAMHS Access"
          question="Can Children Get Mental Health Help?"
          finding="More than half of children referred to CAMHS wait over 18 weeks, and over a quarter of referrals are rejected outright."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Child and Adolescent Mental Health Services received 481,000 referrals in 2024 &mdash; a 72% increase on the 280,000 referred in 2016. This surge reflects a genuine and well-documented deterioration in children&apos;s mental health: rising rates of anxiety, depression, and eating disorders, accelerated by the disruption of the pandemic years and the structural pressures of social media, school attainment pressure, and family economic stress. The services designed to catch these children have not grown at anything like the same pace.</p>
            <p>The rejection rate is one of the most troubling indicators in the dataset. Of the 481,000 referrals in 2024, approximately 128,000 &mdash; 27% &mdash; were rejected before assessment. These are children who a GP, school, or parent believed needed specialist help, but who were turned away, typically because they did not meet the increasingly high threshold for CAMHS intervention. Thresholds have been raised not because clinicians believe lower-acuity children do not need help, but because capacity is insufficient to see everyone who is referred.</p>
            <p>Waits for those who do gain access have remained persistently long. In 2024, 49% of children who entered CAMHS waited more than 18 weeks from referral to treatment. This is a slight improvement from the 52% recorded in 2023, but still represents a substantial population of children and young people spending months in distress, often deteriorating, while waiting for care. For adolescents with eating disorders, where early intervention is associated with significantly better outcomes, such delays can be clinically serious.</p>
            <p>The geography of access is deeply unequal. Children in rural and coastal communities face longer waits and higher rejection rates than those in urban areas, partly because specialist services are concentrated in cities and partly because community mental health infrastructure &mdash; the school nurses, youth workers, and voluntary sector organisations that provide sub-threshold support &mdash; is thinner in deprived rural areas. Children from lower-income families are more likely to be referred by a GP but less likely to have parents able to navigate the system or fund private alternatives if rejected.</p>
            <p>NHS England&apos;s Long Term Plan set a target to see an additional 345,000 children and young people per year by 2024. Progress against this target has been made, but the denominator &mdash; the number of children who need help &mdash; has grown faster than the expansion of services. CAMHS remains one of the most underfunded areas of NHS provision relative to need, accounting for a smaller share of the mental health budget than adult mental health despite the established evidence that early intervention in childhood mental health prevents far more costly adult crises.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Referrals' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="CAMHS referrals 2024"
              value="481k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 72% since 2016 &middot; post-pandemic surge"
              sparklineData={[280, 306, 332, 356, 334, 412, 438, 460, 481]}
              onExpand={() => {}}
              source="NHS England &middot; CAMHS Referrals 2024"
            />
            <MetricCard
              label="Rejected referrals"
              value="128k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="27% rejected &middot; thresholds too high"
              sparklineData={[68, 74, 82, 87, 91, 106, 114, 122, 128]}
              onExpand={() => {}}
              source="NHS England &middot; CAMHS Referrals 2024"
            />
            <MetricCard
              label="Wait &gt;18 weeks"
              value="49%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Nearly half wait 4+ months"
              sparklineData={[38, 40, 42, 44, 48, 50, 51, 52, 49]}
              onExpand={() => {}}
              source="NHS England &middot; CAMHS Waiting Times 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="CAMHS referrals and rejections, 2016&ndash;2024"
              subtitle="Total referrals to Child and Adolescent Mental Health Services, and referrals rejected before assessment. England."
              series={referralSeries}
              yLabel="Referrals"
              source={{
                name: 'NHS England',
                dataset: 'CAMHS Referrals and Waiting Times',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Mental Health Services Monthly Statistics. england.nhs.uk/statistics/statistical-work-areas/mental-health-statistics/</p>
            <p>NHS Digital &mdash; Children and Young People&apos;s Mental Health Services. digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics</p>
            <p>Referral counts include first contact referrals to CAMHS Tier 2 and Tier 3 services. Rejected referrals are those closed before first appointment or assessment. Wait times measure weeks from referral receipt to start of treatment. Data covers England only.</p>
          </div>
        </section>
      </main>
    </>
  )
}
