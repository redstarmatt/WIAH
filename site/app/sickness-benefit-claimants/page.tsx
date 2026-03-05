'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface ClaimantsRow {
  year: number
  claimantsM: number
}

interface ConditionRow {
  condition: string
  pct: number
}

interface SicknessBenefitData {
  topic: string
  lastUpdated: string
  timeSeries: ClaimantsRow[]
  topConditions: ConditionRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SicknessBenefitClaimantsPage() {
  const [data, setData] = useState<SicknessBenefitData | null>(null)

  useEffect(() => {
    fetch('/data/sickness-benefit-claimants/sickness_benefit_claimants.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const claimantsSeries: Series[] = data
    ? [
        {
          id: 'claimants',
          label: 'Health-related benefit claimants (millions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.claimantsM,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Sickness Benefit Claimants" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sickness Benefit Claimants"
          question="How Many People Are Too Ill to Work?"
          finding="3.1 million people are on health-related benefits &mdash; a 30% rise in two years driven by mental health, musculoskeletal and long COVID conditions."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Working-age people on health-related benefits (PIP, DLA, and the UC health component) rose from 2.2 million in 2019 to 3.2 million in 2024 &mdash; a 45&percnt; increase and the fastest rise in three decades. Mental health is now the most common primary condition cited by new claimants, at around 39&percnt; of all new awards, with anxiety, depression, and a growing contribution from ADHD and autism diagnoses. Musculoskeletal conditions account for a further 18&percnt;; long COVID has added a medically distinct new category. PIP and the UC health element together cost an estimated &pound;21 billion per year in 2024 &mdash; more than the defence budget &mdash; and the OBR projects continued growth absent policy intervention. Under-35 claimants have nearly doubled since 2020. The government&apos;s response has focused on assessment reform and new conditionality requirements for those assessed as able to undertake some work activity.</p>
            <p>Critics argue these measures are punitive responses to a genuine health crisis. Achieving the government&apos;s stated goal of bringing 200,000 economically inactive people back into work by 2028 requires not just benefit reform but genuine progress on NHS waiting lists, occupational health access, and the availability of flexible employment for people managing health conditions &mdash; none of which is currently on a sufficient trajectory. The burden falls hardest on people with the most complex and least well-understood conditions: those with mental illness, long COVID, and neurodevelopmental conditions face the most contested assessments and the longest distances to sustainable employment.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Claimants' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Health benefit claimants"
              value="3.2m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+45% since 2019 &middot; fastest rise in 30 years"
              sparklineData={[2.3, 2.2, 2.2, 2.2, 2.2, 2.4, 2.5, 2.8, 3.1, 3.2]}
              href="#sec-chart"source="DWP stat-xplore &middot; 2024"
            />
            <MetricCard
              label="Under-35 claimants"
              value="620k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+87% since 2020 &middot; mental health surge"
              sparklineData={[330, 300, 290, 290, 330, 380, 430, 520, 590, 620]}
              href="#sec-chart"source="DWP stat-xplore &middot; 2024"
            />
            <MetricCard
              label="DWP health/disability cost"
              value="&pound;21bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="UC health + PIP &middot; exceeds defence budget"
              sparklineData={[14, 14, 15, 15, 15, 16, 17, 18, 20, 21]}
              href="#sec-chart"source="DWP / OBR &middot; 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Health-related benefit claimants, 2015&ndash;2024"
              subtitle="Working-age people receiving Personal Independence Payment (PIP), Disability Living Allowance, or the UC health element as their primary benefit. Millions."
              series={claimantsSeries}
              yLabel="Claimants (millions)"
              source={{
                name: 'DWP',
                dataset: 'Stat-Xplore: PIP and UC health element claimants',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DWP &mdash; Stat-Xplore. Personal Independence Payment statistics. stat-xplore.dwp.gov.uk</p>
            <p>DWP &mdash; Universal Credit statistics. gov.uk/government/collections/universal-credit-statistics</p>
            <p>OBR &mdash; Economic and Fiscal Outlook. Welfare spending projections. obr.uk/efo</p>
            <p>ONS &mdash; Long COVID prevalence estimates. ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/bulletins/prevalenceofongoingsymptomsfollowingcoronaviruscovid19infectionintheuk</p>
            <p>Claimant figures represent unduplicated headcount of working-age people (16&ndash;64) whose primary benefit relates to a health condition or disability. Pre-2020 figures use DLA award data adjusted for PIP migration. Cost estimates are central DWP/OBR projections including both benefit payments and associated administrative costs.</p>
          </div>
        </section>
      </main>
    </>
  )
}
