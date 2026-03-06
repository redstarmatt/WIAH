'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface WageTheftData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    workersUnderpaid: number
    arrearsRecoveredM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function WageTheftPage() {
  const [data, setData] = useState<WageTheftData | null>(null)

  useEffect(() => {
    fetch('/data/wage-theft/wage_theft.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'workers',
          label: 'Workers underpaid NLW',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.workersUnderpaid })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Wage Theft" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wage Theft"
          question="How Much Wage Theft Goes Unpunished?"
          finding="355,000 workers are paid below the National Living Wage each year, but prosecutions average just 9 per year — leaving billions in stolen wages unrecovered."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Wage theft &mdash; the non-payment or underpayment of wages legally owed &mdash; is one of the most pervasive and least prosecuted economic crimes in the UK. HMRC estimates approximately 355,000 workers are paid below the National Living Wage at any point, with total underpayment running at &pound;1.9 billion per year, concentrated in hospitality, social care, retail, and agriculture. Enforcement is strikingly weak: criminal prosecutions average just 9 per year, and in 2023&ndash;24 HMRC recovered &pound;16.8 million in unpaid wages &mdash; under 1% of the estimated annual theft. The problem extends beyond minimum wage violations to unpaid pre-shift time, unlawful deductions for uniforms and breakages, and worker misclassification as self-employed to avoid holiday pay, sick pay, and pension obligations.</p>
            <p>Redress is structurally inaccessible to the workers most affected. Bringing a tribunal claim is complex and intimidating, particularly for those on zero-hours or agency contracts who fear losing work if they complain. Legal aid cuts since 2013 have reduced support for low-income claimants, and trade union membership &mdash; the most effective protection &mdash; has declined sharply in the sectors where theft is most prevalent. The 2024 Employment Rights Bill increased HMRC enforcement resource and extended tribunal time limits, but enforcement advocates argue the fundamental issue is resource: the ratio of workers at risk to enforcement officers is estimated at over 50,000:1, and prosecutions at nine per year cannot deter systematic non-compliance.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Underpaid Workers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Workers underpaid NLW"
              value="355,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+85k since 2019 · £1.9bn stolen wages/yr"
              sparklineData={[215, 230, 245, 260, 270, 295, 320, 340, 355]}
              href="#sec-chart"source="HMRC · NMW Enforcement Statistics 2024"
            />
            <MetricCard
              label="Criminal prosecutions per year"
              value="9"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="Avg 9/yr · unchanged since 2016"
              sparklineData={[8, 10, 9, 8, 9, 10, 8, 9, 9]}
              href="#sec-chart"source="HMRC · NMW Enforcement Statistics 2024"
            />
            <MetricCard
              label="NMW arrears recovered"
              value="£16.8m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£4m since 2019 · covers <1% of estimated theft"
              sparklineData={[9.2, 10.4, 11.8, 12.7, 12.8, 14.1, 15.2, 15.9, 16.8]}
              href="#sec-chart"source="HMRC · NMW Enforcement Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Workers underpaid National Living Wage, 2016–2024"
              subtitle="Estimated number of workers receiving below the legal minimum wage."
              series={series}
              yLabel="Workers"
              source={{
                name: 'HMRC',
                dataset: 'National Minimum Wage Enforcement Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HMRC — National Minimum Wage Enforcement Statistics 2024. Published annually. gov.uk/government/collections/national-minimum-wage-statistics</p>
            <p>Worker underpayment estimates are based on HMRC survey evidence and employer compliance data. Arrears recovered are total wages identified for repayment through HMRC enforcement activity. Criminal prosecution figures are from CPS and HMRC joint reporting. The 2019 figure reflects pre-pandemic baseline. Annual prosecution figures are approximate averages due to case timing variation.</p>
          </div>
        </section>
      </main>
    </>
  )
}
