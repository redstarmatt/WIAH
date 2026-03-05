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
            <p>The funding of postgraduate education in England underwent a significant change in 2016 when postgraduate master&apos;s loans were introduced, followed by doctoral loans in 2018. For the first time, students could access government-backed loans for master&apos;s and PhD study, with repayments collected through the income-contingent student loan system alongside undergraduate loan repayments. The policy was intended to increase participation in postgraduate education by reducing the upfront cost barrier. It succeeded in expanding the postgraduate loans market: PG loan take-up grew substantially through 2019-2022 as students accessed funding that had previously required self-finance or scholarship.</p>
            <p>The interaction between undergraduate and postgraduate loan repayments creates what some economists have called a &apos;graduate tax&apos;: a total repayment obligation that, for some graduates, represents a significant marginal disincentive to earning above the repayment thresholds. Under Plan 2 undergraduate loans combined with a postgraduate master&apos;s loan, a graduate earning above both repayment thresholds simultaneously faces a combined student loan repayment rate of 15% of income above thresholds, on top of income tax and National Insurance contributions. For a graduate on £40,000 per year, the combined marginal effective tax rate from income tax, NI, undergraduate loan repayment, and PG loan repayment can reach 67-68%.</p>
            <p>The impact on postgraduate participation is beginning to show in the data. Postgraduate enrolments, after growing through 2020-22 (partly driven by pandemic-era deferrals and career pivots), fell approximately 8% in 2023-24. The fall was concentrated among home students on taught master&apos;s programmes — the group most likely to fund through loans — while international student numbers remained resilient. The IFS modelling of the combined loan repayment burden suggests that the current structure creates particularly strong disincentives for students from lower-income backgrounds, who are more likely to use the full loan facility and who are more sensitive to effective marginal tax rates when considering whether advanced study is economically worthwhile.</p>
            <p>Research funding and doctoral study present a separate but related funding picture. UK Research and Innovation (UKRI) studentships provide stipend and fee funding for research doctorates at stipend rates of approximately £19,000 per year — the minimum level set by UKRI and followed by most research councils. This stipend has consistently fallen behind inflation and has not kept pace with increases in living costs, particularly in London and other high-cost cities where many leading research universities are located. The real-terms decline in UKRI stipend value is contributing to a widening gap between stipend income and cost of living that affects the economic accessibility of research doctorate study.</p>
            <p>International comparison is instructive. Germany provides heavily subsidised or free postgraduate education at state institutions. France and the Netherlands both have lower postgraduate tuition fees than England. The United States offers a more complex picture of extremely high fees at elite institutions combined with extensive fellowship and assistantship funding at research universities. The common thread in systems that achieve broad postgraduate participation is that funding structures do not create debt mountains that carry prohibitive effective marginal tax rates. England&apos;s current structure — high tuition fees combined with income-contingent loan repayments stacked on top of existing undergraduate repayments — is unusual among comparable countries, and its long-term effects on postgraduate participation and the composition of advanced qualification holders are a legitimate policy concern.</p>
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
