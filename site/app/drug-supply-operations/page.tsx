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
            <p>The county lines model &mdash; in which urban drug networks exploit children and vulnerable adults to distribute drugs into smaller towns &mdash; became the defining drug supply story of the 2010s. In response, the National Crime Agency coordinated a multi-year disruption programme that ramped up from around 1,100 line disruptions in 2017 to 6,500 in 2024. By any operational measure, enforcement activity has increased substantially. By the most important outcome measure &mdash; drug deaths &mdash; the picture is far less encouraging. Drug poisoning deaths rose from 3,744 in 2017 to a peak of 4,907 in 2022, before falling slightly to 4,700 in 2024. Drug deaths remain at near-record levels.</p>
            <p>The disconnect between enforcement activity and drug deaths reflects a well-documented feature of drug markets: supply is elastic and resilient. When a county line is disrupted &mdash; through arrest of the controller, seizure of phones and drugs, or injunctions on key dealers &mdash; the demand for drugs in the target community does not disappear. Within weeks or months, a new supply line typically emerges to serve existing users. The disruption absorbs significant police and NCA resource, removes some individual exploiters from the community, and prevents some specific harm to the children and young adults used as runners. It does not reduce aggregate drug supply or demand at the population level.</p>
            <p>The composition of drug deaths has shifted significantly. Synthetic opioids &mdash; particularly fentanyl and nitazenes &mdash; are now appearing with increasing frequency in the UK drug supply, after years in which they were primarily an American and Canadian problem. Both are far more potent than heroin and are difficult to detect without drug testing. As the illicit opioid supply becomes more adulterated with synthetic compounds, the risk of accidental overdose increases even at doses that would previously have been considered safe. This is not primarily a county lines problem; it is a manufacturing and supply chain problem that enforcement against specific distribution networks cannot address.</p>
            <p>Treatment services offer the strongest evidence base for reducing drug-related harm. Evidence from Scotland &apos;s drug treatment expansion, from heroin-assisted treatment programmes, and from needle exchange and naloxone distribution consistently shows that connecting people who use drugs with medical and social support reduces overdose deaths, blood-borne virus transmission, and criminal offending. England&apos;s drug treatment system is recovering from years of funding cuts &mdash; treatment capacity fell significantly between 2013 and 2021 &mdash; and the 10-year drugs strategy published in 2021 committed to rebuilding it. Investment has partially restored capacity, but waiting lists remain in many areas and coverage for specific groups, including stimulant users who do not engage with traditional opioid-focused services, remains inadequate.</p>
            <p>The honest assessment is that enforcement-led responses to drug supply, pursued at current levels, have not demonstrably reduced drug deaths in England and Wales. This does not mean enforcement has no value: removing the most exploitative individuals from communities and disrupting organised crime networks has real benefits that do not fully appear in drug mortality statistics. But a strategy that measures success by county line disruptions while drug deaths remain near record levels is measuring the wrong thing. The evidence base for harm reduction &mdash; naloxone, supervised consumption, drug checking, and low-threshold treatment &mdash; is stronger than for enforcement, and the political obstacles to harm reduction, not its effectiveness, represent the primary barrier to better outcomes.</p>
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
