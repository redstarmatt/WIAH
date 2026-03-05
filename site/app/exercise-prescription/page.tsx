'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  referrals: number
  completionRate: number
}

interface ExercisePrescriptionData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ExercisePrescriptionPage() {
  const [data, setData] = useState<ExercisePrescriptionData | null>(null)

  useEffect(() => {
    fetch('/data/exercise-prescription/exercise_prescription.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const referralSeries: Series[] = data
    ? [
        {
          id: 'referrals',
          label: 'Annual referrals',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.referrals })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Exercise Prescription" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Exercise Prescription"
          question="Are Doctors Prescribing Exercise?"
          finding="Physical activity referrals have reached 680,000 a year and show strong evidence of benefit &mdash; yet most GPs still default to medication."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Physical activity referral schemes &mdash; exercise on prescription &mdash; have grown from 290,000 referrals in 2018 to 680,000 in 2024, a 134&percnt; increase. The evidence base is robust: a Cochrane review found significant improvements in activity levels at 12 months with benefits for depression, anxiety, cardiovascular risk, and weight management, and NICE recommends these interventions for conditions where exercise is at least as effective as medication. Completion rates have reached 65&percnt;, up from below 50&percnt; in earlier schemes, against a target of 75&percnt;. The economic case is compelling: a 12-week exercise referral programme costs approximately &pound;160 per person versus &pound;480 for a year of antidepressant medication. Despite this, many GPs still default to medication, partly because prescribing is faster and partly because referral schemes are not consistently available or well-known.</p>
            <p>The expansion is a genuine success story of NHS preventive medicine, but provision remains patchy and under-systematised. Scheme availability varies significantly across England, with better provision where local authorities and NHS commissioners have invested in leisure infrastructure and community health partnerships. There is no national registry of schemes, no consistent quality standard, and referral pathways are inconsistent. Schemes delivering sessions in community settings with accessible timing achieve higher completion rates than those based in commercial leisure centres &mdash; meaning the design of provision matters as much as the quantity, and the areas with fewest resources tend to run the least accessible schemes.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Referrals' },
          { id: 'sec-callout', label: 'Evidence' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual referrals"
              value="680k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up 134% since 2018 &middot; NICE recommended"
              sparklineData={[290, 340, 210, 420, 560, 620, 680]}
              href="#sec-chart"source="Sport England / NHS England &middot; 2024"
            />
            <MetricCard
              label="Programme completion rate"
              value="65%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Improving &middot; target 75%"
              sparklineData={[54, 56, 49, 58, 61, 63, 65]}
              href="#sec-callout"source="Sport England &middot; Exercise Referral 2024"
            />
            <MetricCard
              label="Cost vs medication"
              value="£160/yr"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="vs £480 antidepressant &middot; 3x cheaper"
              sparklineData={[155, 157, 158, 159, 159, 160, 160]}
              href="#sec-callout"source="NHS England &middot; Cost Analysis 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Exercise prescription referrals, 2018&ndash;2024"
              subtitle="Annual referrals to physical activity referral schemes by GPs and other health professionals. England."
              series={referralSeries}
              yLabel="Referrals"
              annotations={[
                { date: new Date(2020, 0, 1), label: '2020: COVID-19 closures' },
              ]}
              source={{
                name: 'Sport England / NHS England',
                dataset: 'Exercise Referral Scheme Monitoring',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Exercise on Prescription"
              value="65%"
              unit="completion rate"
              description="Physical activity referral schemes have expanded rapidly. A Cochrane review found exercise on prescription increases activity levels by 16% at 12 months, with fewer side effects than medication for mild-moderate depression."
              source="NHS England / Sport England, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Sport England &mdash; Physical Activity Referral Schemes. sportengland.org/research-and-data/research/physical-activity-referral-schemes</p>
            <p>NICE &mdash; Physical Activity: Exercise Referral Schemes. nice.org.uk/guidance/ph54</p>
            <p>Referral counts include all referrals to NHS-commissioned or local-authority-commissioned physical activity referral schemes in England. Completion rate measures participants who attend the full prescribed programme. Cost comparison uses average scheme cost per participant against defined daily dose cost for common antidepressant prescriptions.</p>
          </div>
        </section>
      </main>
    </>
  )
}
