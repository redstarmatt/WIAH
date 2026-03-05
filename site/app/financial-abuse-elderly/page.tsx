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
            <p>Financial abuse of older people — the illegal or improper use of an older person's money, property, or financial resources — is the most common form of elder abuse in the UK after neglect. Age UK and Action on Elder Abuse estimate that over 190,000 older people experience some form of financial abuse each year, including theft by family members or carers, fraud by strangers (phone scams, romance fraud, investment fraud), and misuse of powers of attorney. The estimated annual financial loss from elder financial abuse in the UK is approximately £3.6 billion. These figures are inherently uncertain: the reporting rate is very low — estimated at below 5% of incidents — meaning official recorded data dramatically understates the true scale.</p>
            <p>The low reporting rate reflects several compounding factors. Victims may not recognise that abuse is occurring, particularly in the early stages of dementia or cognitive decline when financial decision-making capacity is reduced. Where the abuser is a family member — the most common perpetrator in cases involving older people in their own homes — victims are often reluctant to report because of family loyalty, shame, and fear of losing care or support that the abusive family member also provides. Victims may fear not being believed, or may fear losing independence if abuse disclosure leads to a safeguarding response that restricts their autonomy. The intersection of financial abuse with cognitive decline makes the legal and evidential burden of proving abuse particularly challenging.</p>
            <p>Powers of attorney — legal instruments that allow a named person to manage another person's financial affairs — are a legitimate and widely used mechanism for planning for cognitive decline in old age. But they are also a significant vector for financial abuse. Attorneys who act outside the scope of their authority, misappropriate funds, or exercise undue influence over a person with reduced mental capacity commit a criminal offence. The Office of the Public Guardian (OPG) investigates concerns about attorney conduct and can revoke powers of attorney where abuse is identified. OPG referrals for investigation have grown significantly: from approximately 5,000 per year in 2019 to over 9,000 in 2024.</p>
            <p>Digital financial fraud has increasingly targeted older people. Phone and online scams — impersonating banks, HMRC, utility companies, or government agencies — generated £1.2 billion in losses from people over 65 in 2023 according to UK Finance and Action Fraud data. The combination of higher average savings (older people typically have more accumulated wealth than younger people), lower digital literacy, and higher likelihood of social isolation (which reduces the 'reality check' function of trusted others in identifying scam attempts) makes older people a priority target for fraudsters. Romance fraud — where online relationships are developed specifically to extract money from victims — disproportionately affects recently widowed or divorced older people.</p>
            <p>Adult safeguarding — the local authority function of protecting adults at risk of abuse or neglect — is the primary statutory mechanism for responding to elder financial abuse. The Care Act 2014 created a statutory duty on local authorities to enquire into abuse and neglect of adults with care and support needs, and to establish Safeguarding Adults Boards. Responses to financial abuse include emergency protective orders, referrals to police, OPG notifications, and interventions with families. However, the safeguarding system is under severe pressure: the number of safeguarding enquiries under the Care Act has grown significantly, social care workforces are stretched, and the resource to investigate complex multi-party financial abuse — which may require forensic accounting expertise — is frequently inadequate.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual financial losses"
              value="£3.6bn"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="£3.6bn stolen from older people annually"
              sparklineData={[2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.1, 3.3, 3.6]}
              source="UK Finance / Age UK 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Reporting rate"
              value="<5%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="<5% reported · shame and capacity barriers"
              sparklineData={[4, 4, 4, 4, 4, 4, 4, 4, 4]}
              source="Action on Elder Abuse / OPG 2024"
              onExpand={() => {}}
            />
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
