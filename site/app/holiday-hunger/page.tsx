'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface HolidayHungerData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    childrenAtRiskM: number
    hafReachK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function HolidayHungerPage() {
  const [data, setData] = useState<HolidayHungerData | null>(null)

  useEffect(() => {
    fetch('/data/holiday-hunger/holiday_hunger.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'childrenAtRiskM',
          label: 'Children at risk (millions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childrenAtRiskM })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Holiday Hunger" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Poverty"
          question="Are Children Going Hungry in School Holidays?"
          finding="2.5 million children are at risk of holiday hunger when free school meal provision ends at half-terms and holidays."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Holiday hunger — the food insecurity experienced by children eligible for free school meals when schools close for holidays — is a well-documented but persistently contested welfare problem. During term time, approximately 1.9 million children in England receive free school meals, providing a reliable source of nutrition that many families depend on. When schools close for summer, half-term, Christmas, and Easter holidays, this provision stops. For households in severe food insecurity, the loss of a guaranteed meal can cause genuine nutritional deprivation, with evidence from food bank data, school nurse reports, and dietary survey data consistently showing deterioration in children's food security and diet quality during school holiday periods.</p>
            <p>The Holiday Activities and Food (HAF) programme, established in 2018 as a pilot and expanded nationally from 2021 using Covid Catch-Up Premium and later core DfE funding, provides free holiday activity and food provision for children eligible for benefits-related free school meals. The programme reached approximately 650,000 children in 2023-24, providing meals and enrichment activities during Easter, summer, and Christmas holidays. This represents approximately 34% of the eligible population — substantial but leaving the majority without provision. HAF is delivered through local authorities contracting with voluntary organisations, charities, sports clubs, and community groups, with significant variation in reach and quality between areas.</p>
            <p>The campaign for universal free school meals as a solution to holiday hunger has been prominent since Marcus Rashford's 2020 campaign, which successfully pressured the government into extending free meal vouchers during the summer 2020 holiday. The voucher scheme — which provided £15-20 per week per eligible child during Covid-affected holiday periods — demonstrated that universal targeted provision was administratively achievable and that take-up could be high when vouchers were accessible. The subsequent return to means-tested provision (rather than universal holiday provision) has left the policy position essentially unchanged from pre-2020.</p>
            <p>Food bank data provides consistent evidence of the holiday hunger phenomenon. The Trussell Trust records a systematic increase in food bank parcel distribution during school holiday periods, with the summer holiday typically generating the single highest monthly distribution of the year. In summer 2023, Trussell Trust food banks distributed approximately 1.2 million parcels — a figure substantially higher than the average monthly distribution during term-time. Families with children are the fastest-growing demographic seeking food bank support, and the overlap between holiday periods and food bank demand spikes is structurally consistent across years.</p>
            <p>The upstream policy response involves both extending free school meal eligibility — the threshold is currently household income below £7,400 after benefits, excluding many working poor families — and improving the HAF programme's reach. The Child Poverty Strategy published in 2024 included commitments to review FSM eligibility thresholds and to explore extending the school day and meals to encompass more holiday provision. The evidence base for holiday hunger interventions is well-established: studies of HAF-type programmes consistently find improved nutrition, lower parental stress, reduced safeguarding concerns, and better social outcomes for participating children compared to non-participants.</p>
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
              label="Children at risk of holiday hunger"
              value="2.5m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+300k since 2019 · FSM eligibility threshold"
              sparklineData={[1.8, 1.9, 2.0, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5]}
              source="Food Foundation / Trussell Trust 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="HAF programme reach"
              value="650,000"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="650k reached · 34% of eligible children"
              sparklineData={[0, 0, 0, 0, 50000, 200000, 400000, 550000, 650000]}
              source="DfE · Holiday Activities and Food Programme 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Food bank use increase in holidays"
              value="+40%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+40% food bank use during summer holidays"
              sparklineData={[20, 22, 24, 25, 27, 30, 33, 37, 40]}
              source="Trussell Trust · End of Year Statistics 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Children at risk of holiday hunger, 2016–2024"
              subtitle="Estimated children in England at risk of food insecurity during school holidays (millions)."
              series={series}
              yLabel="Children (millions)"
              source={{ name: 'Food Foundation', dataset: 'Child Food Insecurity Tracker', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Children at risk figures from Food Foundation Child Food Insecurity Tracker, cross-referenced with DfE free school meal eligibility statistics. HAF programme reach from DfE programme monitoring returns. Food bank data from Trussell Trust End of Year Statistics. Holiday period food bank uplift from Trussell Trust monthly distribution analysis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
