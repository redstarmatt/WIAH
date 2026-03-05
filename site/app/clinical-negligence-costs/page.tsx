'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface NegligenceDataPoint {
  year: number
  annualCostBn: number
  outstandingLiabilityBn: number
}

interface ClinicalNegligenceCostsData {
  topic: string
  lastUpdated: string
  timeSeries: NegligenceDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ClinicalNegligenceCostsPage() {
  const [data, setData] = useState<ClinicalNegligenceCostsData | null>(null)

  useEffect(() => {
    fetch('/data/clinical-negligence-costs/clinical_negligence_costs.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const allSeries: Series[] = data
    ? [
        {
          id: 'annual-cost',
          label: 'Annual negligence cost (&pound;bn)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.annualCostBn })),
        },
        {
          id: 'outstanding-liability',
          label: 'Outstanding liability (&pound;bn)',
          colour: '#0D1117',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.outstandingLiabilityBn })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Clinical Negligence Costs" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Clinical Negligence Costs"
          question="What Are NHS Medical Errors Costing?"
          finding="NHS negligence liability has reached &pound;83 billion &mdash; more than the NHS&apos;s entire annual budget."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS Resolution&apos;s outstanding clinical negligence liability reached &pound;86.1 billion in 2024 &mdash; exceeding the NHS&apos;s entire annual budget &mdash; while annual payments hit &pound;2.8 billion in 2023/24, up from &pound;1.1 billion a decade earlier. Obstetric claims dominate: birth injury cases represent around 63% of total claim value despite being a small fraction by volume, as a single case of birth-related brain damage can generate a claim of &pound;20&ndash;30 million for lifetime care. The Donna Ockenden review into Shrewsbury and Telford NHS Trust found systematic and repeated maternity failures over two decades that could have been avoided. Annual payments consume resources that would otherwise fund clinical services and have more than doubled in a decade.</p>
            <p>The adversarial claims process requires families to pursue litigation for years before receiving compensation, is traumatic for claimants, expensive for the NHS, and generates limited learning. A significant share of claims is settled without admission of liability. The duty of candour introduced by the Health and Social Care Act 2022 and the Rapid Resolution and Redress scheme for maternity cases are partial responses. The liability figure is ultimately a measure of preventable harm: hospitals where staff are reluctant to report near misses or speak up about safety concerns generate the incidents that, years later, appear as liability on Resolution&apos;s balance sheet.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Negligence Costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual negligence cost"
              value="&pound;2.8bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from &pound;1.1bn in 2014 &middot; 2.5&times; in a decade"
              sparklineData={[1.1, 1.5, 1.8, 2.2, 2.4, 2.6, 2.8, 2.8]}
              onExpand={() => {}}
              source="NHS Resolution &middot; Annual Report 2023/24"
            />
            <MetricCard
              label="Outstanding liability"
              value="&pound;86.1bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="exceeds entire NHS annual budget"
              sparklineData={[26.1, 36.4, 56.1, 65.0, 78.2, 83.4, 86.1, 86.1]}
              onExpand={() => {}}
              source="NHS Resolution &middot; Annual Report 2023/24"
            />
            <MetricCard
              label="Obstetric share of claims value"
              value="63%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="of total claim value &middot; birth injuries dominant"
              sparklineData={[48, 51, 54, 57, 59, 61, 63, 63]}
              onExpand={() => {}}
              source="NHS Resolution &middot; Maternity Claims Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS clinical negligence costs, England, 2014&ndash;2024"
              subtitle="Annual payments (&pound;bn) and outstanding total liability (&pound;bn). Outstanding liability includes estimated future costs of settled and anticipated claims."
              series={allSeries}
              yLabel="&pound;bn"
              source={{
                name: 'NHS Resolution',
                dataset: 'Annual Report and Accounts',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Resolution &mdash; Annual Report and Accounts. Published annually. resolution.nhs.uk/resources/nhsr-annual-report-and-accounts/</p>
            <p>Donna Ockenden &mdash; Findings, Conclusions and Essential Actions from the Independent Review of Maternity Services at Shrewsbury and Telford NHS Trust. March 2022.</p>
            <p>Annual cost represents total claims payments made by NHS Resolution in the financial year. Outstanding liability is the actuarially assessed present value of all known and estimated future claims. Figures are at nominal prices. The change in Ogden discount rate (from &minus;0.75% to &minus;0.25% in 2019) increased headline liability figures independently of underlying claim volumes.</p>
          </div>
        </section>
      </main>
    </>
  )
}
