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
            <p>When people fall behind on bills, the enforcement system can transform a manageable debt into an unmanageable one. Bailiffs &mdash; officially called enforcement agents &mdash; can add substantial fees to existing debts the moment they are instructed. A compliance stage fee of &pound;75 is added immediately on instruction, followed by an enforcement stage fee of &pound;235 if they attend the property. These fees are not discretionary: they are set by regulations, and they compound an already precarious financial situation.</p>
            <p>The 2.4 million bailiff visits recorded in 2023 represent the highest figure since before COVID-19 restricted enforcement activity in 2020. Council tax debt is the single largest driver, accounting for around half of all enforcement referrals. Local authorities routinely refer debt to enforcement agents earlier and for smaller amounts than commercial creditors, partly because council tax carries automatic priority status and partly because local authority enforcement budgets are under pressure. A household that misses two council tax payments can find themselves facing bailiff action within months.</p>
            <p>The vulnerability problem is systemic. Research by the Money Advice Trust and others consistently finds that a significant proportion of people subject to enforcement action are experiencing mental health problems, disability, or other vulnerability indicators. The government&rsquo;s own &lsquo;Taking Control of Goods&rsquo; regulations require enforcement agents to take vulnerability into account &mdash; but there is no independent verification mechanism, and creditors who refer debt do not routinely screen for vulnerability before doing so. The result is that 44% of visited debtors show signs of vulnerability that were not identified or acted upon before enforcement began.</p>
            <p>The evidence base on enforcement outcomes is mixed. Bailiff action does recover some debt &mdash; but at significant cost to debtor welfare and, in some cases, at greater ultimate cost to creditors who pursue collection that drives debtors into insolvency. The Centre for Social Justice and StepChange both argue that more pre-enforcement debt advice, breathing space before enforcement begins, and earlier identification of vulnerability would improve outcomes for all parties. The government introduced a &lsquo;breathing space&rsquo; scheme in 2021 that provides temporary protection from enforcement for people seeking debt advice &mdash; but uptake has been lower than projected.</p>
            <p>Bailiff misconduct complaints remain elevated, though the industry is now regulated by the Civil Enforcement Association and the High Court Enforcement Officers Association. The absence of a single independent regulator means that complaints handling varies significantly between firms. Calls for a single statutory regulator have been made by the Law Commission, consumer groups, and parliamentary committees &mdash; but legislation has not followed. In the meantime, hundreds of thousands of people each year encounter enforcement agents at their most financially vulnerable, with limited protection and significant financial consequences if things go wrong.</p>
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
