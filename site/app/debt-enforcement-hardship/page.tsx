'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  bailiffVisitsM?: number
  avgFeesCharged?: number
}

interface DebtEnforcementData {
  timeSeries: TimeSeries[]
  vulnerabilityNotFlaggedPct: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DebtEnforcementHardshipPage() {
  const [data, setData] = useState<DebtEnforcementData | null>(null)

  useEffect(() => {
    fetch('/data/debt-enforcement-hardship/debt_enforcement_hardship.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const bailiffSeries: Series[] = data
    ? [{
        id: 'bailiff-visits',
        label: 'Bailiff visits (millions)',
        colour: '#E63946',
        data: data.timeSeries
          .filter(d => d.bailiffVisitsM !== undefined)
          .map(d => ({ date: yearToDate(d.year), value: d.bailiffVisitsM as number })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Debt Enforcement" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Debt Enforcement &amp; Hardship"
          question="What Happens When You Fall Behind on Bills?"
          finding="2.4 million bailiff visits took place in 2023, with an average charge of &pound;310 added to debts &mdash; and nearly half of debtors show signs of vulnerability."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When people fall behind on bills, the enforcement system can transform a manageable debt into an unmanageable one. Bailiffs &mdash; officially called enforcement agents &mdash; add a compliance fee of &pound;75 immediately on instruction, followed by an enforcement fee of &pound;235 if they attend the property; these fees are statutory and non-discretionary. The 2.4 million bailiff visits recorded in 2023 are the highest since before COVID-19 suspended enforcement in 2020, with council tax accounting for around half of all referrals. Local authorities routinely refer debt earlier and for smaller amounts than commercial creditors, because council tax carries automatic priority status. The government introduced a breathing space scheme in 2021 providing temporary enforcement protection for people seeking debt advice, but uptake has been lower than projected. A single statutory regulator &mdash; called for by the Law Commission, consumer groups, and parliamentary committees &mdash; does not yet exist.</p>
            <p>The vulnerability problem is systemic and largely invisible to the creditors initiating enforcement. Research by the Money Advice Trust finds that 44% of visited debtors show signs of vulnerability &mdash; mental health problems, disability, or crisis circumstances &mdash; that were not identified before enforcement began. The consequences fall hardest on people already in the most precarious financial positions: those in deprived areas, single-parent households, and renters disproportionately face bailiff action for council tax and rent arrears, and the additional fees can push debts beyond any realistic capacity to repay. StepChange estimates that early debt advice, before enforcement is initiated, would improve outcomes for both debtors and creditors &mdash; but the referral infrastructure to make that happen at scale does not exist.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Bailiff Visits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Bailiff visits in 2023"
              value="2.4m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+26% since 2015 &middot; council tax biggest driver"
              sparklineData={[1.9, 2.0, 2.0, 2.1, 2.2, 1.4, 1.8, 2.2, 2.4]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; Enforcement Statistics 2023"
            />
            <MetricCard
              label="Average fees charged"
              value="&pound;310"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+15% since 2015 &middot; fees compound debt problem"
              sparklineData={[270, 275, 280, 290, 295, 295, 300, 305, 310]}
              onExpand={() => {}}
              source="Taking Control of Goods Regulations &middot; 2023"
            />
            <MetricCard
              label="Vulnerability not flagged"
              value="44%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="44% of visited debtors show vulnerability signs &middot; not identified"
              sparklineData={[44, 44, 44, 44, 44, 44]}
              onExpand={() => {}}
              source="Money Advice Trust &middot; Debt Collection Survey 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Bailiff visits in England and Wales, 2015&ndash;2023"
              subtitle="Total enforcement agent visits (millions). 2020 low reflects COVID-19 enforcement suspension."
              series={bailiffSeries}
              yLabel="Visits (millions)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Enforcement Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice &mdash; Enforcement Statistics Quarterly. Published quarterly. gov.uk/government/collections/enforcement-statistics-quarterly</p>
            <p>Money Advice Trust &mdash; Personal Debt Statistics. moneyadvicetrust.org</p>
            <p>StepChange Debt Charity &mdash; Statistics Yearbook. stepchange.org/policy-and-research/statistics-yearbook.aspx</p>
            <p>Taking Control of Goods (Fees) Regulations 2014 &mdash; statutory fee schedule. legislation.gov.uk/uksi/2014/1</p>
            <p>Bailiff visits data drawn from Ministry of Justice quarterly enforcement statistics. Average fees reflect statutory schedule under Taking Control of Goods regulations. Vulnerability figures drawn from Money Advice Trust and StepChange research surveys. COVID-19 period data reflects enforcement suspension from March to June 2020.</p>
          </div>
        </section>
      </main>
    </>
  )
}
