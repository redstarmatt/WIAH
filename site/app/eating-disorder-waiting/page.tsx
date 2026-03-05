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
  urgentMeetTarget: number
  routineMeetTarget: number
  inpatientBedsPer1m: number
}

interface EatingDisorderWaitingData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function EatingDisorderWaitingPage() {
  const [data, setData] = useState<EatingDisorderWaitingData | null>(null)

  useEffect(() => {
    fetch('/data/eating-disorder-waiting/eating_disorder_waiting.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const targetSeries: Series[] = data
    ? [
        {
          id: 'urgent',
          label: 'Urgent referrals meeting target (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.urgentMeetTarget })),
        },
        {
          id: 'routine',
          label: 'Routine referrals meeting target (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.routineMeetTarget })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Eating Disorder Waiting Times" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Eating Disorder Waiting Times"
          question="How Long Are People Waiting for Eating Disorder Treatment?"
          finding="More than 40% of urgent eating disorder referrals miss the one-week target, and inpatient beds have declined despite rising demand."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Eating disorders carry the highest mortality rate of any mental illness, and for anorexia nervosa early intervention is strongly associated with recovery. The NHS standard, introduced in 2016, set a target that 95% of urgent cases should be seen within one week and 95% of routine cases within four weeks. By 2024, only 62% of urgent cases and 47% of routine cases met those targets &mdash; down from 72% urgent in 2018, with a pandemic-driven surge from 2020 pushing services further behind. Inpatient bed provision has risen modestly, from 5.8 to 6.3 per million people, but out-of-area placements remain common because local capacity is insufficient; these placements &mdash; sometimes hundreds of miles from home &mdash; are associated with worse outcomes and disrupt family contact, which is a core component of treatment. Referral volumes have continued rising across all age groups and, increasingly, among boys and young men.</p>
            <p>The consequences of delay are medical as well as psychological: prolonged malnutrition causes irreversible cardiac, skeletal, and hormonal damage, meaning each week of waiting has physical costs that cannot be fully reversed by later treatment. The central constraint is workforce: dietitians, psychiatrists, and clinical psychologists with eating disorder specialism take years to train, and NHS England&apos;s Long Term Plan commitments have not kept pace with post-pandemic demand. For every ten people referred urgently, nearly four wait longer than clinicians judge safe &mdash; a rationing outcome that is directly traceable to sustained underinvestment in a specialist workforce that cannot be quickly rebuilt.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Target Performance' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Urgent target met (1 week)"
              value="62%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Target 95% &middot; 38% missing one-week standard"
              sparklineData={[72, 68, 61, 57, 54, 59, 62]}
              onExpand={() => {}}
              source="NHS England &middot; Eating Disorder Waiting Times 2024"
            />
            <MetricCard
              label="Routine target met (4 weeks)"
              value="47%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Target 95% &middot; less than half get timely care"
              sparklineData={[62, 59, 53, 48, 44, 45, 47]}
              onExpand={() => {}}
              source="NHS England &middot; Eating Disorder Waiting Times 2024"
            />
            <MetricCard
              label="Inpatient beds per 1m"
              value="6.3"
              unit="per 1m"
              direction="up"
              polarity="up-is-good"
              changeText="Slight increase &middot; still below 2015 levels"
              sparklineData={[5.8, 5.9, 5.6, 5.8, 6.0, 6.2, 6.3]}
              onExpand={() => {}}
              source="NHS England &middot; Mental Health Dashboard 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Eating disorder waiting time targets met, 2018&ndash;2024"
              subtitle="Percentage of urgent (1-week) and routine (4-week) eating disorder referrals meeting NHS access standards. England. Target: 95%."
              series={targetSeries}
              yLabel="% meeting target"
              annotations={[
                { date: new Date(2020, 0, 1), label: '2020: Pandemic' },
              ]}
              targetLine={{ value: 95, label: 'Target 95%' }}
              source={{
                name: 'NHS England',
                dataset: 'Eating Disorder Waiting Times',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Eating Disorder Waiting Times. Published quarterly. england.nhs.uk/mental-health/taskforce/imp/mh-dashboard/</p>
            <p>NHS England &mdash; Mental Health Services Data Set (MHSDS). digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/mental-health-services-data-set</p>
            <p>Waiting time standards apply to specialist community eating disorder services. Urgent cases are those judged to require treatment within one week; routine cases within four weeks. Inpatient bed data covers adult and adolescent specialist eating disorder wards in England, normalised per million population.</p>
          </div>
        </section>
      </main>
    </>
  )
}
