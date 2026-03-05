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
            <p>NHS Resolution, the body that handles clinical negligence claims on behalf of NHS trusts, reported an outstanding liability of &pound;86.1 billion in 2024 &mdash; a figure that exceeds the NHS&apos;s entire annual budget. This is not money already spent: it is the estimated future cost of settling claims already made or anticipated from incidents that have already occurred. Annual payments reached &pound;2.8 billion in 2023/24, consuming resources that might otherwise fund clinical services.</p>
            <p>The largest single component of liability is obstetric care. Birth injury claims represent around 63% of the total claim value despite being a small fraction of total claims by volume. The reason is the severity of harm: a baby who suffers brain damage at birth may require a lifetime of care worth tens of millions of pounds. A single case can generate a claim of &pound;20&ndash;30 million. The NHS has faced sustained criticism for failures in maternity safety, most recently from the Donna Ockenden review into Shrewsbury and Telford NHS Trust, which found systematic and repeated failures over two decades that could have been avoided.</p>
            <p>The growth in liability is not simply explained by more errors occurring. Several factors compound the headline figures. Legal costs have grown substantially as cases become more complex. The Ogden rate &mdash; used to calculate future care costs in large personal injury awards &mdash; changed in 2017 and 2019, significantly affecting the discount applied to future payments and inflating headline liability figures. The NHS is also becoming more transparent about incidents, with more claims being made as patient awareness and legal capacity improve.</p>
            <p>A significant share of claims is settled without an admission of liability. The current system requires patients and families to go through an adversarial legal process to obtain compensation, often waiting years. This is traumatic for claimants, expensive for the NHS, and generates limited learning from incidents. The Health and Social Care Act 2022 introduced a duty of candour, and NHS Resolution has invested in a &ldquo;Rapid Resolution and Redress&rdquo; scheme for maternity cases &mdash; but these are partial responses to a systemic problem.</p>
            <p>The true cost of clinical negligence extends beyond financial settlements. Families living with the consequences of preventable harm describe a system that is closed, defensive, and slow. Junior doctors and midwives practise in environments of fear, reluctant to report near misses or speak up about safety concerns. Changing this culture &mdash; making the NHS genuinely learning and open &mdash; is the prerequisite for reducing harm. Financial liability is the downstream result of upstream safety failures. The liability figure is, at its core, a measure of preventable suffering.</p>
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
