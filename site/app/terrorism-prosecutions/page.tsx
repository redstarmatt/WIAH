'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Operation of police powers under the Terrorism Act 2000', url: 'https://www.gov.uk/government/collections/operation-of-police-powers-under-the-terrorism-act-2000-quarterly-updates', date: '2024' },
  { num: 2, name: 'Crown Prosecution Service', dataset: 'CPS data summary — terrorism prosecutions', url: 'https://www.cps.gov.uk/publication/cps-data-summary', date: '2024', note: '74% conviction rate at trial' },
  { num: 3, name: 'HMPPS', dataset: 'Offender management caseload statistics', url: 'https://www.gov.uk/government/collections/offender-management-statistics-quarterly', date: '2024', note: '220 people on terrorism-related licence in 2024' },
  { num: 4, name: 'HM Government', dataset: 'Counter-Terrorism and Sentencing Act 2021', url: 'https://www.legislation.gov.uk/ukpga/2021/11/contents/enacted', date: '2021' },
];

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
            <p>Counter Terrorism Policing made 350 terrorism-related arrests in 2023, a figure that reflects both the ongoing threat level and the intelligence-led posture developed since the 2005 London bombings.<Cite nums={1} /> Of cases that reach trial, the conviction rate was 74% — stable over the past decade — reflecting the thoroughness of specialist CPS case preparation and the use of intelligence-derived evidence in admissible form.<Cite nums={2} /> The threat picture has shifted: right-wing terrorism now accounts for around 25% of arrests, up from a marginal category in 2015, while Islamist terrorism remains the largest category.<Cite nums={1} /> Around 220 people were on terrorism-related licence in 2024, subject to supervision conditions under a framework tightened by the Counter-Terrorism and Sentencing Act 2021 following the Fishmongers' Hall attack.<Cite nums={[3, 4]} /></p>
            <p>The consequences of terrorism prosecutions fall along predictable demographic lines. Muslim communities have borne a disproportionate share of Terrorism Act stop and search powers and Prevent referrals — referrals number tens of thousands annually — raising sustained civil liberties concerns about proportionality and the broad UK definition of terrorism, which is wide enough to capture some politically motivated but non-violent activity. The legal architecture of terrorism prosecution is among the most extensive in any democracy, including pre-charge detention of up to 14 days in exceptional cases and Special Immigration Appeals Commission proceedings for non-citizens; independent review of these powers' necessity and proportionality remains contested.</p>
          </div>
        </section>

        <ScrollReveal>
          <PositiveCallout
            title="High conviction rate"
            value="74%"
            description="Of terrorism cases that reach trial, 74% result in conviction — reflecting the strength of the Crown's case preparation and specialist prosecution teams."
            source="Source: Crown Prosecution Service — CPS data summary; Home Office terrorism statistics."
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
              href="#sec-chart"source="Home Office · Operation of police powers under Terrorism Act"
            />
            <MetricCard
              label="Conviction rate at trial"
              value="74%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="Stable over the past decade"
              sparklineData={[74, 75, 74, 74, 74, 74, 74, 74, 74]}
              href="#sec-chart"source="Crown Prosecution Service · CPS data summary"
            />
            <MetricCard
              label="On terrorism-related licence"
              value="220"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Released from custody, under supervision"
              sparklineData={[110, 128, 142, 155, 168, 178, 192, 207, 220]}
              href="#sec-chart"source="HMPPS · Offender management caseload statistics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Terrorism arrests and convictions, 2015–2024"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office — Operation of police powers under the Terrorism Act 2000 and subsequent legislation. Published quarterly. gov.uk/government/collections/operation-of-police-powers-under-the-terrorism-act-2000-quarterly-updates</p>
            <p>Crown Prosecution Service — CPS data summary. Published annually. cps.gov.uk/publication/cps-data-summary</p>
            <p>MI5 — Threat level assessments and annual reporting. mi5.gov.uk</p>
            <p>Counter Terrorism Policing — Annual review. counterterrorism.police.uk</p>
            <p>Conviction rate is convictions as a proportion of completed trials; it excludes cases still awaiting trial. Arrest figures include all terrorism-related arrests under relevant legislation regardless of outcome. Licence population is HMPPS monthly average for terrorism-classified offenders.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
