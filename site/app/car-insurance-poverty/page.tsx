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
            <p>Average UK car insurance premiums rose 58% in the year to December 2023, reaching &pound;924 &mdash; the highest level since comparable data began. The rise followed a period of below-inflation increases in 2020&ndash;22 and represents a sharp correction as claims costs caught up with price levels: vehicle repair costs surged due to complex electronics, supply chain disruption, and the high cost of EV battery replacements; legal claims management costs added further pressure; and reinsurance costs rose globally. For an 18-year-old in a major city, average premiums can exceed &pound;3,500 per year &mdash; a sum larger than many young workers&rsquo; annual after-tax income from part-time employment. Over one million vehicles are estimated to be driven uninsured, with uncompensated losses funded through the Motor Insurers&rsquo; Bureau adding approximately &pound;15&ndash;30 to every insured driver&rsquo;s premium.</p>
            <p>The &lsquo;insurance poverty trap&rsquo; is most acute for workers in areas with poor public transport who need a car to access employment. Delivery drivers, construction workers, and care workers in rural and suburban areas face a situation where legal insurance can exceed any realistic return from employment. The burden falls disproportionately on young drivers and those in high-risk postcode areas &mdash; typically deprived urban communities &mdash; creating a transport access penalty that compounds existing disadvantage. Telematics insurance offers some relief for safe young drivers, but premiums remain very high in actuarial risk categories regardless of individual driving behaviour.</p>
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
