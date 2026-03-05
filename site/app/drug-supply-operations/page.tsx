'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface DrugSupplyRow {
  year: number
  countyLinesDisrupted?: number
  drugDeaths?: number
}

interface DrugSupplyOperationsData {
  topic: string
  lastUpdated: string
  timeSeries: DrugSupplyRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DrugSupplyOperationsPage() {
  const [data, setData] = useState<DrugSupplyOperationsData | null>(null)

  useEffect(() => {
    fetch('/data/drug-supply-operations/drug_supply_operations.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const countyLinesSeries: Series[] = data
    ? [
        {
          id: 'countyLinesDisrupted',
          label: 'County lines disrupted',
          colour: '#6B7280',
          data: data.timeSeries
            .filter(d => d.countyLinesDisrupted !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.countyLinesDisrupted!,
            })),
        },
      ]
    : []

  const drugDeathsSeries: Series[] = data
    ? [
        {
          id: 'drugDeaths',
          label: 'Drug deaths',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.drugDeaths !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.drugDeaths!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Drug Supply Operations" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Drug Supply Operations"
          question="Is the War on Drugs Working?"
          finding="Thousands of county lines are dismantled each year &mdash; but drug deaths continue to rise, suggesting supply is replaced faster than it is disrupted."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The National Crime Agency&apos;s county lines disruption programme ramped from around 1,100 line disruptions in 2017 to 6,500 in 2024. By any operational measure, enforcement activity has increased substantially. By the most important outcome measure &mdash; drug deaths &mdash; the picture is far less encouraging: drug poisoning deaths rose from 3,744 in 2017 to a peak of 4,907 in 2022, before falling slightly to 4,700 in 2024. Drug deaths remain at near-record levels. The disconnect reflects a well-documented feature of drug markets: supply is elastic and resilient. When a county line is disrupted, demand does not disappear; within weeks or months, a new supply line typically emerges. Disruption removes individual exploiters and prevents specific harm to children used as runners, but does not reduce aggregate supply or demand at the population level. Synthetic opioids &mdash; particularly fentanyl and nitazenes &mdash; are now appearing with increasing frequency in the UK drug supply; both are far more potent than heroin and difficult to detect without drug testing, raising overdose risk at doses that would previously have been considered safe.</p>
            <p>Treatment services offer the strongest evidence base for reducing drug-related harm. Evidence from heroin-assisted treatment, needle exchange, and naloxone distribution consistently shows that connecting people who use drugs with medical and social support reduces overdose deaths and criminal offending. England&apos;s drug treatment system is recovering from a 35% real-terms funding cut between 2013 and 2021, and the 2021 ten-year drugs strategy committed &pound;780 million to rebuilding it &mdash; but waiting lists remain in many areas and coverage for stimulant users outside traditional opioid-focused services is inadequate. The honest assessment is that enforcement-led responses at current levels have not demonstrably reduced drug deaths; the political obstacles to harm reduction, not its effectiveness, represent the primary barrier to better outcomes.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Lines vs Deaths' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="County lines disrupted"
              value="6,500"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="record disruptions &middot; new lines emerge rapidly"
              sparklineData={[1100, 1400, 2100, 3000, 4200, 5500, 6240, 6500]}
              onExpand={() => {}}
              source="Home Office / NCA &middot; County Lines Annual 2024"
            />
            <MetricCard
              label="Drug deaths 2024"
              value="4,700"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slight fall &middot; but near record level"
              sparklineData={[3744, 4359, 4393, 4561, 4859, 4907, 4800, 4700]}
              onExpand={() => {}}
              source="ONS &middot; Deaths Related to Drug Poisoning 2024"
            />
            <MetricCard
              label="Drug arrests"
              value="146k/yr"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="enforcement sustained &middot; but substitution effect"
              sparklineData={[156000, 154000, 151000, 148000, 143000, 138000, 141000, 146000]}
              onExpand={() => {}}
              source="Home Office &middot; Drug Misuse Statistical Bulletin 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="County lines disrupted vs drug deaths, 2017&ndash;2024"
              subtitle="Enforcement activity rising sharply; drug deaths remain near record levels. England and Wales."
              series={[...countyLinesSeries, ...drugDeathsSeries]}
              yLabel="Count"
              source={{
                name: 'Home Office / ONS',
                dataset: 'County Lines Data / Drug Poisoning Deaths',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office / National Crime Agency &mdash; County Lines Data and Trends. Annual published data on county line disruptions. gov.uk/government/publications/county-lines-data-and-trends</p>
            <p>ONS &mdash; Deaths Related to Drug Poisoning in England and Wales. Annual publication. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoninginenglandandwales</p>
            <p>Home Office &mdash; Drug Misuse: Findings from the Crime Survey for England and Wales. Annual. gov.uk/government/collections/drug-misuse-declared</p>
            <p>A county line disruption is defined as an operation that closes down or significantly degrades a drug supply line, typically measured through NCA and regional organised crime unit (ROCU) reporting. Definitions have been refined over time and figures should not be compared directly across all years. Drug deaths are defined as deaths where the underlying cause is drug poisoning, including both accidental and intentional poisoning.</p>
          </div>
        </section>
      </main>
    </>
  )
}
