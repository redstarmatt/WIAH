'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface ProtestPolicingRow {
  year: number
  protestArrests: number
}

interface ProtestPolicingData {
  topic: string
  lastUpdated: string
  timeSeries: ProtestPolicingRow[]
  newPowers2023: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ProtestPolicingPage() {
  const [data, setData] = useState<ProtestPolicingData | null>(null)

  useEffect(() => {
    fetch('/data/protest-policing/protest_policing.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const arrestsSeries: Series[] = data
    ? [
        {
          id: 'protestArrests',
          label: 'Protest-related arrests',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.protestArrests,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Protest Policing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Protest Policing"
          question="Are Protest Rights Under Threat?"
          finding="New public order powers introduced since 2022 give police sweeping authority to restrict protests — and have been used to arrest 4,278 people in 2023 alone."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Public Order Act 2023 and the Police, Crime, Sentencing and Courts Act 2022 together represent the most significant expansion of police powers over protest in England and Wales in a generation. New offences include &ldquo;locking on,&rdquo; tunnelling near infrastructure, and &ldquo;causing serious disruption&rdquo; &mdash; a concept so broad that its application has been contested in the courts. The legislation was introduced primarily in response to Extinction Rebellion and Just Stop Oil tactics, but its powers apply to all forms of protest.</p>
            <p>Protest-related arrests have increased sharply since 2019, rising from around 2,870 that year to a peak of 4,278 in 2023. The causes are multiple: the emergence of new protest movements using disruptive tactics, the creation of new offences that criminalise previously lawful activity, and changes to how police respond to planned protests. A significant proportion of arrests do not result in charge &mdash; arrest is sometimes used as a tool to disrupt protest activity rather than as a precursor to prosecution.</p>
            <p>Serious Disruption Prevention Orders (SDPOs) &mdash; a new form of civil order that can ban individuals from attending protests, associating with named groups, or using protest equipment &mdash; were introduced in the Public Order Act 2023. By 2024, four SDPOs had been issued, each targeting activists with prior protest convictions. Civil liberties organisations including Liberty and Amnesty International have argued that SDPOs represent a fundamental threat to the right to protest, as they can prohibit lawful future activity based on past protests.</p>
            <p>The legal framework is contested. The European Court of Human Rights has found the UK in breach of Article 11 (freedom of assembly) in several protest-related cases. Domestic courts have quashed some protest-related convictions and found parts of police protest guidance unlawful. However, the speed at which new legislation creates new offences means that legal challenges typically follow, rather than precede, the chilling effect on protest activity.</p>
            <p>Public opinion on protest policing is divided along lines that partly reflect attitudes to specific movements. Support for restrictions on disruptive protest is high in general polling, but falls sharply when the same powers are applied to causes the respondent supports. The practical question &mdash; who decides what constitutes &ldquo;serious disruption,&rdquo; and whether that determination should rest with the police rather than the courts &mdash; remains unresolved in both law and public debate.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Arrest Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Protest arrests 2023"
              value="4,278"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+381% since 2015 &middot; new powers and new movements"
              sparklineData={[890, 1100, 2870, 2200, 2900, 3600, 4278, 3900]}
              onExpand={() => {}}
              source="Home Office &middot; Police Powers and Procedures 2023"
            />
            <MetricCard
              label="New offences created"
              value="10"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Public Order Act 2023 &middot; serious disruption powers"
              sparklineData={[0, 0, 0, 0, 0, 3, 10]}
              onExpand={() => {}}
              source="Home Office &middot; Public Order Act 2023"
            />
            <MetricCard
              label="SDPO orders issued"
              value="4"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="first ever Serious Disruption Prevention Orders issued 2024"
              sparklineData={[0, 0, 0, 0, 0, 0, 4]}
              onExpand={() => {}}
              source="Home Office &middot; 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Protest-related arrests in England and Wales, 2015&ndash;2024"
              subtitle="Annual arrests linked to protest activity. Rise from 2022 coincides with new Public Order Act powers."
              series={arrestsSeries}
              yLabel="Arrests"
              source={{
                name: 'Home Office',
                dataset: 'Police Powers and Procedures, England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Police Powers and Procedures, England and Wales. Annual bulletin. gov.uk/government/collections/police-powers-and-procedures-england-and-wales</p>
            <p>Liberty &mdash; Protest Policing Research. libertyhumanrights.org.uk/issue/protest</p>
            <p>Amnesty International UK &mdash; Right to Protest. amnesty.org.uk/right-to-protest</p>
            <p>Protest arrest figures are drawn from Home Office police powers data and include arrests under public order, obstruction, and trespass legislation. Not all arrests result in charge or conviction. The definition of &ldquo;protest-related&rdquo; follows the Home Office classification. SDPO figures are from Ministry of Justice civil orders data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
