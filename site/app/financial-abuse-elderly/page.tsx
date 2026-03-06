'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface FinancialAbuseElderlyData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    victimsK: number
    lossesEstBn: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function FinancialAbuseElderlyPage() {
  const [data, setData] = useState<FinancialAbuseElderlyData | null>(null)

  useEffect(() => {
    fetch('/data/financial-abuse-elderly/financial_abuse_elderly.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'victimsK',
          label: 'Victims (thousands)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.victimsK })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Elder Financial Abuse" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Elder Abuse"
          question="How Widespread Is Financial Abuse of Older People?"
          finding="Over 190,000 older people experience financial abuse every year in the UK, with £3.6 billion stolen annually — but fewer than 1 in 20 cases is ever reported."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Financial abuse of older people is the most common form of elder abuse in the UK after neglect. Age UK and Action on Elder Abuse estimate over 190,000 older people experience some form of financial abuse each year — theft by family members or carers, fraud by strangers, and misuse of powers of attorney — costing approximately £3.6 billion annually. Phone and online scams impersonating banks, HMRC, and government agencies generated £1.2 billion in losses from people over 65 in 2023 alone. Office of the Public Guardian referrals for attorney misconduct have nearly doubled, from around 5,000 per year in 2019 to over 9,000 in 2024. Yet fewer than 5% of incidents are ever reported, meaning official data dramatically understates the true scale.</p>
            <p>The low reporting rate reflects the particular vulnerability of older victims: many do not recognise abuse is occurring, especially where cognitive decline reduces financial decision-making capacity. Where the perpetrator is a family member — the most common scenario in domestic settings — victims often stay silent out of loyalty, shame, or fear of losing the care that the abusive relative also provides. The adult safeguarding system, strengthened by the Care Act 2014, is the primary statutory mechanism for response — but it is under severe pressure, with social care workforces stretched and inadequate capacity to investigate the forensic complexity of multi-party financial abuse.</p>
          </div>
        </section>

        <SectionNav
          sections={[
            { id: 'sec-metrics', label: 'Metrics' },
            { id: 'sec-chart', label: 'Chart' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Older people financially abused"
              value="190,000/yr"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+30k since 2019 · digital fraud driving rise"
              sparklineData={[130000, 140000, 150000, 155000, 160000, 165000, 170000, 180000, 190000]}
              source="Age UK / Action on Elder Abuse 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Annual financial losses"
              value="£3.6bn"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="£3.6bn stolen from older people annually"
              sparklineData={[2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.1, 3.3, 3.6]}
              source="UK Finance / Age UK 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Reporting rate"
              value="<5%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="<5% reported · shame and capacity barriers"
              sparklineData={[4, 4, 4, 4, 4, 4, 4, 4, 4]}
              source="Action on Elder Abuse / OPG 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Estimated older people experiencing financial abuse, 2016–2024"
              subtitle="Annual estimated victims of elder financial abuse in the UK (thousands)."
              series={series}
              yLabel="Victims (thousands)"
              source={{ name: 'Age UK', dataset: 'Later Life in the UK', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Victim estimates from Age UK Later Life in the UK factsheet and Action on Elder Abuse survey research. Financial loss estimates from UK Finance Annual Fraud Report supplemented by academic survey estimates to account for unreported cases. OPG referral data from Ministry of Justice Office of the Public Guardian annual report. Safeguarding Adults data from NHS Digital Adult Social Care Statistics: Safeguarding Adults annual collection.</p>
          </div>
        </section>
      </main>
    </>
  )
}
