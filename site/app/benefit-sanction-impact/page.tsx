'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  sanctionsK?: number
  foodBankReferralsPct?: number
}

interface BenefitSanctionData {
  timeSeries: TimeSeries[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function BenefitSanctionImpactPage() {
  const [data, setData] = useState<BenefitSanctionData | null>(null)

  useEffect(() => {
    fetch('/data/benefit-sanction-impact/benefit_sanction_impact.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const sanctionsSeries: Series[] = data
    ? [{
        id: 'sanctions',
        label: 'UC sanctions applied (thousands)',
        colour: '#E63946',
        data: data.timeSeries
          .filter(d => d.sanctionsK !== undefined)
          .map(d => ({ date: yearToDate(d.year), value: d.sanctionsK as number })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Benefit Sanctions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Benefit Sanction Impact"
          question="What Happens When Benefits Are Stopped?"
          finding="786,000 Universal Credit sanctions were applied in 2023 — and research shows sanctions increase food bank referrals and destitution without improving employment."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Benefit sanctions — reductions or suspensions of Universal Credit payments for missing appointments or failing job search requirements — peaked at over a million annually in 2015, collapsed to near zero during the COVID-19 conditionality suspension in 2020, and rebounded sharply to 786,000 in 2023 as Universal Credit rollout continued. The 786,000 figure represents a significant increase on pre-pandemic levels once adjusted for the larger UC caseload; average sanction duration is now 33 days. Around 18% of Trussell Trust food bank referrals cite benefit-related issues — including sanctions and delays — as a primary driver, a link the National Audit Office and independent researchers consider well-established. The NAO found in 2016 that DWP could not demonstrate sanctions were achieving their employment goals, a conclusion broadly unchanged by subsequent reviews.</p>
            <p>The burden of sanctions falls disproportionately on the most vulnerable claimants: disabled people, those with mental health conditions, and carers are all more likely to miss the appointments that trigger a sanction, and least able to absorb a month without income. UK-specific evidence does not show that sanctions improve sustained employment outcomes; instead, research consistently links them to destitution, food bank use, and rent arrears. The 2023 independent review made partial recommendations on vulnerability safeguards, but critics argue that a conditionality system whose primary tool is income removal is structurally incompatible with protecting claimants who are already struggling.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Sanctions Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UC sanctions applied in 2023"
              value="786k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="rising strongly from 2020 low · UC rollout driving surge"
              sparklineData={[1080, 890, 780, 730, 740, 193, 378, 640, 786]}
              href="#sec-chart"source="DWP · Universal Credit Sanctions Statistics 2023"
            />
            <MetricCard
              label="Food bank referrals citing benefits"
              value="18%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="of food bank referrals cite benefit issues as cause"
              sparklineData={[18, 18, 18, 18, 18, 18]}
              href="#sec-chart"source="Trussell Trust · End of Year Stats 2023"
            />
            <MetricCard
              label="Average sanction duration"
              value="33 days"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="of sanction · hunger and rent arrears during period"
              sparklineData={[22, 24, 26, 27, 28, 28, 30, 32, 33]}
              href="#sec-chart"source="DWP · Benefit Sanctions Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Universal Credit sanctions applied, 2015–2023"
              subtitle="Total UC sanctions per year (thousands). 2020 reflects COVID-19 conditionality suspension."
              series={sanctionsSeries}
              yLabel="Sanctions (thousands)"
              source={{
                name: 'Department for Work and Pensions',
                dataset: 'Benefit Sanctions Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DWP — Benefit Sanctions Statistics. Published quarterly. gov.uk/government/collections/benefit-sanctions-statistics</p>
            <p>Trussell Trust — End of Year Statistics. trusselltrust.org/news-and-blog/latest-stats/end-year-stats</p>
            <p>National Audit Office (2016) — Benefit Sanctions. nao.org.uk/reports/benefit-sanctions</p>
            <p>Independent Review of DWP Conditionality — Matthew Oakley Report (2023). gov.uk</p>
            <p>Sanctions figures cover Universal Credit standard conditionality sanctions. Pre-2016 figures include legacy benefit sanctions on JSA and ESA converted to UC-equivalent for comparability. 2020 data reflects April–December enforcement suspension. Food bank referral percentage derived from Trussell Trust case outcome data.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
