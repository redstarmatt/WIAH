'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface CarInsuranceData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    avgPremium: number
    youngDriverPremium: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function CarInsurancePovertyPage() {
  const [data, setData] = useState<CarInsuranceData | null>(null)

  useEffect(() => {
    fetch('/data/car-insurance-poverty/car_insurance_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'avgPremium',
          label: 'Average premium (£)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgPremium })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Car Insurance" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Is Car Insurance Becoming Unaffordable?"
          finding="Average UK car insurance premiums rose 58% in 2023 to £924 — with young drivers in cities facing premiums over £2,800 — leaving some workers unable to afford to drive to work."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Car insurance is a legal requirement for all drivers in the UK — the Road Traffic Act 1988 mandates a minimum of third-party liability insurance for any vehicle used on public roads. Yet the cost of car insurance has risen at a pace that is pricing some drivers, particularly younger people and those in urban areas, out of legal motoring. The Association of British Insurers (ABI) reported that average car insurance premiums rose 58% in the year to December 2023, reaching an average of £924 — the highest level since comparable data began. This rise followed a period of below-inflation increases in 2020-22 as the pandemic reduced driving frequency and claims, and represents a sharp correction as claims costs caught up with price levels.</p>
            <p>The drivers of insurance cost inflation are multiple and interacting. Vehicle repair costs have risen sharply: the shift toward complex electronics in modern vehicles has made repairs more expensive, supply chain disruption has raised parts costs, and the transition to electric vehicles brings high-cost battery replacements into the repair economy. The cost of replacement vehicles provided during repair periods has also risen. Legal costs — particularly claims management companies securing personal injury settlements from rear-end collisions — add further to the claims pool. Insurers' own investment income was compressed by low interest rates in 2020-22 (though rising rates in 2023-24 provided some relief) and reinsurance costs have increased globally.</p>
            <p>Young driver premiums are in a different category from the average. For an 18-year-old male in a major city, average premiums can exceed £3,500-4,000 per year, representing a sum larger than many young workers' annual after-tax income from part-time employment. The actuarial basis for these premiums is real: young drivers, particularly young male drivers, have significantly higher accident rates than older drivers. Telematics ('black box') insurance — where premiums are adjusted based on observed driving behaviour — offers one mechanism to reduce premiums for safe young drivers, with take-up growing significantly. But even with telematics, premiums remain very high in actuarial risk categories.</p>
            <p>The 'insurance poverty trap' — the situation where not being able to afford insurance prevents access to the work or healthcare that would enable someone to afford insurance — is particularly acute for workers in areas with poor public transport who need a car to access employment. The AA and RAC have documented cases of workers in rural and suburban areas — delivery drivers, construction workers, care workers — making economic decisions about whether to drive uninsured because legal insurance exceeds any realistic return from employment. Uninsured driving has a social cost beyond the individual risk: uninsured drivers create uncompensated losses for other road users, funded through the Motor Insurers' Bureau (MIB), which adds approximately £15-30 to each insured driver's premium.</p>
            <p>Regulatory response has been limited. The FCA's General Insurance Pricing Practices (GIPP) reforms, implemented in January 2022, ended the practice of charging renewal customers more than new customers ('price walking') — a practice that had penalised loyal customers and particularly disadvantaged older people with low switching rates. The reforms reduced the scale of renewal premium hikes but did not address the underlying cost inflation driving new customer premiums higher. Government has been reluctant to interfere in what is a commercial market, though the Treasury Select Committee has examined insurance affordability. The Competition and Markets Authority's review of motor insurance — published in 2024 — found competition working broadly but recommended improvements in comparison tool transparency and data sharing to improve market efficiency.</p>
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
              label="Average car insurance premium"
              value="£924"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+58% in 2023 · highest in 20 years"
              sparklineData={[465, 470, 475, 490, 515, 500, 520, 585, 924]}
              source="ABI · Motor Insurance Premium Tracker 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Young driver average premium (18yr)"
              value="£2,800"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+£900 in 2023 · often exceeds annual income"
              sparklineData={[1500, 1550, 1600, 1650, 1700, 1700, 1800, 1900, 2800]}
              source="Confused.com / Compare the Market 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Uninsured drivers estimate"
              value="1m+"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1m+ uninsured · cost pressuring compliance"
              sparklineData={[800, 800, 820, 830, 840, 850, 870, 900, 1000]}
              source="Motor Insurers Bureau 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Average car insurance premium, 2016–2024"
              subtitle="Average annual motor insurance premium paid by UK drivers (£)."
              series={series}
              yLabel="Average premium (£)"
              source={{ name: 'ABI', dataset: 'Motor Insurance Premium Tracker', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Average premium data from ABI Motor Insurance Premium Tracker (comprehensive cover, annual average). Young driver premium data from price comparison site composite (Confused.com, Compare the Market, MoneySupermarket). Uninsured driver estimates from Motor Insurers Bureau annual report. FCA GIPP reform impact from FCA general insurance pricing practices evaluation.</p>
          </div>
        </section>
      </main>
    </>
  )
}
