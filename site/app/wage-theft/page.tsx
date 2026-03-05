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
            <p>Wage theft — the non-payment or underpayment of wages legally owed — is one of the most pervasive and least prosecuted economic crimes in the UK. The most visible form is non-compliance with the National Living Wage and National Minimum Wage. HMRC&apos;s national minimum wage enforcement team estimates that approximately 355,000 workers are paid below the legal minimum at any point, with total underpayment running at £1.9 billion per year. The gap between what workers are owed and what they receive is concentrated in a small number of sectors: hospitality, social care, retail, and agriculture account for the majority of identified cases.</p>
            <p>Enforcement is strikingly weak relative to the scale of the problem. HMRC&apos;s NMW enforcement team issues civil penalties and naming orders for non-compliant employers, but criminal prosecutions are vanishingly rare — averaging just 9 per year across the whole country. The gap between the value of wages stolen and the value recovered is vast: in 2023-24, HMRC identified and instructed repayment of £16.8 million in underpaid wages, while its own estimate of underpayment runs to £1.9 billion annually. Only 0.9% of estimated theft is recovered each year.</p>
            <p>The problem extends beyond minimum wage non-compliance. Wage theft also encompasses the failure to pay for all hours worked — including pre-shift briefing time, post-shift cleaning, and travel between work sites — the unlawful deduction of wages for uniforms, breakages, or customer complaints, and the misclassification of employees as self-employed in order to avoid holiday pay, sick pay, and pension contributions obligations. The Taylor Review of Modern Working Practices (2017) estimated that worker misclassification cost the Exchequer £5 billion per year in unpaid National Insurance contributions and cost affected workers significant entitlements.</p>
            <p>The barriers to redress for workers are substantial. Bringing an Employment Tribunal claim requires the claimant to have been employed for at least two years (for unfair dismissal), though NMW claims can be brought immediately. The process is complex, often slow, and intimidating — particularly for workers in precarious employment who fear losing their job or their visa status if they complain. Workers on zero-hours contracts or short-term agency arrangements have limited leverage. Since the legal aid cuts of 2013 (LASPO Act), fewer workers have access to legal support in preparing tribunal claims, and trade union representation — the most effective protection against wage theft — has declined significantly in the sectors where theft is most prevalent.</p>
            <p>The 2024 Employment Rights Bill introduced new measures to strengthen wage enforcement, including increased HMRC enforcement resource and a new duty to provide written pay statements to all workers regardless of contract type. The Bill also proposed extending tribunal time limits for wage theft claims from 3 to 6 months. But enforcement advocates argue that the fundamental issue is not the law — which is clear — but the resource allocated to policing it. The ratio of workers at risk to enforcement officers is estimated at over 50,000:1. Increasing criminal prosecutions from 9 per year to a level that would actually deter widespread non-compliance would require a transformation in both resource and political will.</p>
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
              onExpand={() => {}}
              source="HMRC · NMW Enforcement Statistics 2024"
            />
            <MetricCard
              label="Criminal prosecutions per year"
              value="9"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="Avg 9/yr · unchanged since 2016"
              sparklineData={[8, 10, 9, 8, 9, 10, 8, 9, 9]}
              onExpand={() => {}}
              source="HMRC · NMW Enforcement Statistics 2024"
            />
            <MetricCard
              label="NMW arrears recovered"
              value="£16.8m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£4m since 2019 · covers <1% of estimated theft"
              sparklineData={[9.2, 10.4, 11.8, 12.7, 12.8, 14.1, 15.2, 15.9, 16.8]}
              onExpand={() => {}}
              source="HMRC · NMW Enforcement Statistics 2024"
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
