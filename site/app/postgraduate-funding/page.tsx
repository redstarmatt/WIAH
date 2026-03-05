'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PostgraduateFundingDataPoint {
  year: number
  pgEnrolmentsK: number
  combinedDebtK: number
}

interface PostgraduateFundingData {
  topic: string
  lastUpdated: string
  timeSeries: PostgraduateFundingDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function PostgraduateFundingPage() {
  const [data, setData] = useState<PostgraduateFundingData | null>(null)

  useEffect(() => {
    fetch('/data/postgraduate-funding/postgraduate_funding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'pg-enrolments',
          label: 'Postgraduate enrolments (thousands)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pgEnrolmentsK })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Can You Still Afford a Postgraduate Degree?"
          finding="Stacked postgraduate loan repayments now give some graduates a marginal effective tax rate of up to 68% — making advanced study financially ruinous for many."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Postgraduate master&apos;s loans were introduced in 2016 and doctoral loans in 2018, allowing students to access government-backed funding repaid through the income-contingent loan system alongside undergraduate repayments. The policy expanded access, but the interaction between the two loan plans creates an acute marginal tax problem: a graduate on &pound;40,000 per year with both Plan 2 undergraduate and postgraduate loans faces a combined marginal effective tax rate &mdash; including income tax and National Insurance &mdash; of up to 67&ndash;68%. Postgraduate enrolments fell approximately 8% in 2023&ndash;24, concentrated among home students on taught master&apos;s programmes who are most exposed to this combined burden. UKRI doctoral stipends of approximately &pound;19,000 per year have also failed to keep pace with living costs, particularly in London and other high-cost cities.</p>
            <p>The disincentive falls hardest on students from lower-income backgrounds, who are more likely to use the full loan facility and more sensitive to marginal effective tax rates when calculating whether postgraduate study is worth it. England&apos;s current structure &mdash; high fees stacked on top of existing undergraduate debt with no effective cap on combined repayment rates &mdash; is unusual among comparable countries and risks channelling advanced qualification into the hands of those who can afford not to borrow.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Combined graduate marginal tax rate"
              value="up to 68%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="UG + PG loans + income tax + NI combined"
              sparklineData={[55, 56, 58, 60, 61, 62, 63, 65, 68]}
              source="IFS · Graduate Repayment Analysis 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="PG applications declined 2023-24"
              value="-8%"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="-8% taught PG applications · loan threshold effect"
              sparklineData={[0, 2, 4, 6, 5, 3, 2, 1, -8]}
              source="HESA · Higher Education Student Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average combined graduate debt"
              value="£42,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+£14,000 since 2020 · combined UG+PG"
              sparklineData={[22000, 24000, 26000, 28000, 30000, 32000, 35000, 38000, 42000]}
              source="SLC · Student Loans Outstanding 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Postgraduate enrolments in England, 2016–2024"
              subtitle="Total postgraduate student enrolments at English higher education providers (thousands)."
              series={series}
              yLabel="Enrolments (thousands)"
              source={{ name: 'HESA', dataset: 'Higher Education Student Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">HESA</strong> — Higher Education Student Statistics. Annual postgraduate enrolments by level and mode of study at English HE providers.</p>
            <p><strong className="text-wiah-black">IFS (Institute for Fiscal Studies)</strong> — Graduate Repayment Analysis 2024. Modelling of effective marginal tax rates for graduates with combined undergraduate and postgraduate loan repayment obligations.</p>
            <p><strong className="text-wiah-black">SLC (Student Loans Company)</strong> — Student Loans Outstanding 2024. Average outstanding balances for graduates with undergraduate and postgraduate loans.</p>
            <p>Note: Postgraduate loan scheme launched in 2016 for master&apos;s and 2018 for doctoral. Combined marginal tax rate calculation assumes Plan 2 undergraduate loan combined with postgraduate master&apos;s loan at standard rates for a graduate earning £40,000.</p>
          </div>
        </section>
      </main>
    </>
  )
}
