'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="786,000 Universal Credit sanctions were applied in 2023 &mdash; and research shows sanctions increase food bank referrals and destitution without improving employment."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>A benefit sanction means a claimant&rsquo;s Universal Credit payment is reduced or stopped entirely for a fixed period &mdash; typically for missing a meeting with a work coach or failing to meet job search requirements. The stated purpose is to incentivise compliance with conditionality requirements. In practice, the evidence on whether sanctions achieve their stated purpose is contested, and the evidence on harm is substantial.</p>
            <p>Sanctions numbers peaked in 2015 at over a million, fell as UC rolled out more slowly than planned and sanction rates were revised, and collapsed in 2020 when the government suspended conditionality requirements during COVID-19. The sharp re-acceleration after 2021 reflects both the resumption of conditionality and the continued rollout of Universal Credit, which has a higher sanction rate than the legacy benefits it replaced. The 786,000 sanctions applied in 2023 represent a significant increase on pre-pandemic levels when adjusted for the UC caseload.</p>
            <p>The food bank link is well-documented. The Trussell Trust, which operates the largest food bank network in the UK, consistently reports that benefit delays, errors, and sanctions are among the top reasons for referral. Around 18% of food bank referrals cite benefit-related issues as a primary driver. The Trussell Trust and independent poverty researchers have argued that this link is causal: removing income from households with no savings buffer produces immediate hunger. Several peer-reviewed studies have found statistically significant increases in food bank use following sanction policy changes.</p>
            <p>The employment evidence is more nuanced. Some experimental studies from other countries have found that conditionality can increase short-term employment rates. But UK-specific research, including work by the National Audit Office, has consistently failed to find robust evidence that UK sanctions improve sustained employment outcomes. The NAO found in 2016 that DWP could not demonstrate that sanctions were achieving their goals. An independent review commissioned by the government in 2023 made recommendations on safeguards, targets, and data collection that have been partially implemented.</p>
            <p>The vulnerability question is critical. Sanctions are meant to be applied with discretion: the system allows work coaches to take personal circumstances into account. In practice, disabled people, people with mental health conditions, and people with caring responsibilities are disproportionately sanctioned &mdash; partly because these groups are more likely to miss appointments, and partly because the system&rsquo;s capacity for individual assessment is limited. The DWP has committed to improvements in vulnerability identification, but critics argue that a conditionality system whose primary tool is income removal is structurally incompatible with adequate protection for the most vulnerable claimants.</p>
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
              changeText="rising strongly from 2020 low &middot; UC rollout driving surge"
              sparklineData={[1080, 890, 780, 730, 740, 193, 378, 640, 786]}
              onExpand={() => {}}
              source="DWP &middot; Universal Credit Sanctions Statistics 2023"
            />
            <MetricCard
              label="Food bank referrals citing benefits"
              value="18%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="of food bank referrals cite benefit issues as cause"
              sparklineData={[18, 18, 18, 18, 18, 18]}
              onExpand={() => {}}
              source="Trussell Trust &middot; End of Year Stats 2023"
            />
            <MetricCard
              label="Average sanction duration"
              value="33 days"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="of sanction &middot; hunger and rent arrears during period"
              sparklineData={[22, 24, 26, 27, 28, 28, 30, 32, 33]}
              onExpand={() => {}}
              source="DWP &middot; Benefit Sanctions Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Universal Credit sanctions applied, 2015&ndash;2023"
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
            <p>DWP &mdash; Benefit Sanctions Statistics. Published quarterly. gov.uk/government/collections/benefit-sanctions-statistics</p>
            <p>Trussell Trust &mdash; End of Year Statistics. trusselltrust.org/news-and-blog/latest-stats/end-year-stats</p>
            <p>National Audit Office (2016) &mdash; Benefit Sanctions. nao.org.uk/reports/benefit-sanctions</p>
            <p>Independent Review of DWP Conditionality &mdash; Matthew Oakley Report (2023). gov.uk</p>
            <p>Sanctions figures cover Universal Credit standard conditionality sanctions. Pre-2016 figures include legacy benefit sanctions on JSA and ESA converted to UC-equivalent for comparability. 2020 data reflects April&ndash;December enforcement suspension. Food bank referral percentage derived from Trussell Trust case outcome data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
