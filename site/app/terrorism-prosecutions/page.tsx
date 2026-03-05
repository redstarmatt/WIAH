'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TerrorismProsecutionsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    arrests: number
    charged: number
    convicted: number
    convictionRatePct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function TerrorismProsecutionsPage() {
  const [data, setData] = useState<TerrorismProsecutionsData | null>(null)

  useEffect(() => {
    fetch('/data/terrorism-prosecutions/terrorism_prosecutions.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const terrorismSeries: Series[] = data
    ? [
        {
          id: 'arrests',
          label: 'Terrorism arrests',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.arrests,
          })),
        },
        {
          id: 'convicted',
          label: 'Convictions',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.convicted,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Terrorism Prosecutions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Terrorism Prosecutions"
          question="How effective are UK terrorism prosecutions?"
          finding="In 2023, 350 terrorism-related arrests were made in the UK, with a 74% conviction rate at trial."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom&apos;s counter-terrorism prosecution system has developed significantly since the 2005 London bombings, building specialist capacity in the Crown Prosecution Service and the judiciary to handle the unique evidentiary and legal challenges that terrorism cases present. In 2023, Counter Terrorism Policing made 350 terrorism-related arrests under the Terrorism Act 2000 and associated legislation — a figure that reflects both ongoing threat and the active posture of the intelligence-led policing model that has evolved over two decades.</p>
            <p>Of those arrested, a significant proportion are released without charge after investigation — this is expected in intelligence-led arrest strategies, where arrest may be used to disrupt a plot before the evidentiary threshold for charge is met. Of cases that do reach trial, the conviction rate in 2023 was 74%, a figure that has remained broadly stable over the past decade. This reflects the thoroughness of case preparation by specialist CPS units and the use of intelligence-derived evidence transformed into admissible form, a legally complex process that the Terrorism Act framework facilitates through measures such as closed material proceedings.</p>
            <p>The threat picture has shifted significantly since 2015. Right-wing terrorism has grown as a share of arrests, moving from a marginal category to accounting for around 25% of terrorism-related arrests by 2023. Islamist terrorism remains the largest category. Referrals to the Prevent programme — which aims to intervene before radicalisation reaches the point of criminal action — number tens of thousands annually, reflecting the government&apos;s emphasis on upstream intervention. The relationship between Prevent and prosecution is indirect: successful diversion reduces the pipeline to arrest, while failed diversion increases it.</p>
            <p>Around 220 people were on terrorism-related licence in 2024, having been released from custodial sentences for terrorism offences and subject to supervision conditions. The management of terrorist offenders on licence has attracted significant public attention following attacks committed by individuals on licence, most notably the Fishmongers&apos; Hall attack in 2019. The Counter-Terrorism and Sentencing Act 2021 introduced Serious Terrorism Sentences with minimum two-thirds custody periods and extended licence periods, tightening the framework for the most serious offenders.</p>
            <p>The legal architecture underpinning terrorism prosecution is among the most extensive in any democracy, including schedule 7 examination powers at ports, pre-charge detention of up to 14 days in exceptional cases, the use of Terrorism Prevention and Investigation Measures, and Special Immigration Appeals Commission proceedings for non-citizens. Civil liberties groups have consistently raised concerns about the proportionality of some of these powers and the definition of &apos;terrorism&apos;, which in the UK is broad enough to capture some forms of politically motivated but non-violent activity.</p>
          </div>
        </section>

        <ScrollReveal>
          <PositiveCallout
            title="High conviction rate"
            value="74%"
            description="Of terrorism cases that reach trial, 74% result in conviction — reflecting the strength of the Crown&apos;s case preparation and specialist prosecution teams."
            source="Source: Crown Prosecution Service &mdash; CPS data summary; Home Office terrorism statistics."
          />
        </ScrollReveal>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Arrests & Convictions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Terrorism arrests in 2023"
              value="350"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+25% since 2015"
              sparklineData={[280, 299, 412, 351, 296, 256, 290, 312, 350]}
              onExpand={() => {}}
              source="Home Office &middot; Operation of police powers under Terrorism Act"
            />
            <MetricCard
              label="Conviction rate at trial"
              value="74%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="Stable over the past decade"
              sparklineData={[74, 75, 74, 74, 74, 74, 74, 74, 74]}
              onExpand={() => {}}
              source="Crown Prosecution Service &middot; CPS data summary"
            />
            <MetricCard
              label="On terrorism-related licence"
              value="220"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Released from custody, under supervision"
              sparklineData={[110, 128, 142, 155, 168, 178, 192, 207, 220]}
              onExpand={() => {}}
              source="HMPPS &middot; Offender management caseload statistics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Terrorism arrests and convictions, 2015&ndash;2024"
              subtitle="Annual terrorism-related arrests and convictions resulting from completed trials, England and Wales."
              series={terrorismSeries}
              yLabel="Count"
              source={{
                name: 'Home Office / CPS',
                dataset: 'Terrorism Act powers; CPS data summary',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Operation of police powers under the Terrorism Act 2000 and subsequent legislation. Published quarterly. gov.uk/government/collections/operation-of-police-powers-under-the-terrorism-act-2000-quarterly-updates</p>
            <p>Crown Prosecution Service &mdash; CPS data summary. Published annually. cps.gov.uk/publication/cps-data-summary</p>
            <p>MI5 &mdash; Threat level assessments and annual reporting. mi5.gov.uk</p>
            <p>Counter Terrorism Policing &mdash; Annual review. counterterrorism.police.uk</p>
            <p>Conviction rate is convictions as a proportion of completed trials; it excludes cases still awaiting trial. Arrest figures include all terrorism-related arrests under relevant legislation regardless of outcome. Licence population is HMPPS monthly average for terrorism-classified offenders.</p>
          </div>
        </section>
      </main>
    </>
  )
}
