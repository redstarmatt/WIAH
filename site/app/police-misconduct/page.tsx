'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PoliceMisconductData {
  misconductHearings: Array<{ year: number; hearings: number; dismissed: number }>
  stopSearchByEthnicity: Array<{ year: number; blackToWhiteRatio: number }>
  ioplcCasesOutstanding: Array<{ year: number; cases: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function PoliceMisconductPage() {
  const [data, setData] = useState<PoliceMisconductData | null>(null)

  useEffect(() => {
    fetch('/data/police-misconduct/police_misconduct.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const hearingsSeries: Series[] = data
    ? [{
        id: 'hearings',
        label: 'Misconduct hearings per year',
        colour: '#6B7280',
        data: data.misconductHearings.map(d => ({
          date: yearToDate(d.year),
          value: d.hearings,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Police Misconduct" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Police Misconduct"
          question="How many police officers face misconduct proceedings?"
          finding="1,738 police misconduct hearings were held in 2022/23, with 122 officers dismissed. A Black person is 4 times more likely to be stopped and searched than a white person. There are 2,057 outstanding IOPC cases, with an average resolution time of over 3 years."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Misconduct proceedings in England and Wales reached 1,738 hearings in 2022/23, with 122 officers dismissed — a dismissal rate critics argue is too low given the volume of complaints. The IOPC had 2,057 outstanding investigations as of 2022/23, up from 1,240 in 2019, with average resolution times exceeding three years. High-profile failures sharpened public scrutiny: David Carrick, a serving Metropolitan Police officer, committed offences over more than a decade during which 17 allegations against him were recorded; Wayne Couzens was serving when he murdered Sarah Everard. Baroness Casey's 2023 review found institutional racism, misogyny, and homophobia embedded in the Met's culture. Stop and search disproportionality remains stark: in 2022/23 a Black person was 4.1 times more likely to be stopped and searched than a white person, down from 9.7 in 2018 but with similar hit rates across ethnic groups, indicating the disparity is not explained by offending rates.</p>
            <p>The burden of police misconduct and discriminatory practice falls most heavily on Black and minority ethnic communities, women experiencing domestic violence who face officers with abuse histories still in post, and complainants navigating a system in which resolution takes years. HMICFRS inspections found multiple forces with inadequate vetting, officers with domestic abuse convictions still in post, and complaint handling that failed victims at each stage. Reform proposals — a national barred register preventing dismissed officers from re-employment in any force, stronger IOPC compulsion powers, and independent disciplinary panels — face resistance from forces that guard operational independence. Implementation of the Casey Review's 49 recommendations across 43 operationally independent forces represents the core accountability challenge.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-hearings', label: 'Misconduct Hearings' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Misconduct hearings (2022/23)"
              value="1,738"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="122 officers dismissed · but critics say too few for scale of complaints"
              sparklineData={[1240, 1320, 1410, 1520, 1580, 1640, 1710, 1738]}
              source="College of Policing / HMICFRS · 2023"
              href="#sec-hearings"/>
            <MetricCard
              label="Stop and search: Black to white ratio"
              value="4.1"
              unit="&times;"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 9.7&times; in 2018 but still 4&times; more likely · deeply disproportionate"
              sparklineData={[9.7, 9.4, 6.3, 6.7, 5.1, 4.1]}
              source="Home Office Stop and Search Statistics · 2023"
              href="#sec-hearings"/>
            <MetricCard
              label="Outstanding IOPC investigations"
              value="2,057"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1,240 in 2019 · average resolution &gt;3 years"
              sparklineData={[1240, 1580, 1890, 2010, 2057]}
              source="IOPC Annual Report · 2022/23"
              href="#sec-hearings"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-hearings" className="mb-12">
            <LineChart
              title="Police misconduct hearings in England &amp; Wales, 2016–2023"
              subtitle="Total formal misconduct hearings held per year across all 43 forces."
              series={hearingsSeries}
              yLabel="Hearings per year"
              source={{
                name: 'College of Policing / HMICFRS',
                dataset: 'Police Misconduct Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HMICFRS — Her Majesty's Inspectorate of Constabulary and Fire &amp; Rescue Services. Annual inspection reports and thematic reviews of police integrity and misconduct. Available at justiceinspectorates.gov.uk.</p>
            <p>IOPC — Independent Office for Police Conduct. Annual report covering complaints received, outstanding cases, and case outcomes. Available at policeconduct.gov.uk.</p>
            <p>Home Office — Police Powers and Procedures: Stop and Search. Annual statistics on stop and search use by police force area and ethnicity. Available at gov.uk/government/statistics.</p>
            <p>Stop and search ratios are calculated as the rate per 1,000 population for each ethnic group. The Black to white ratio shown is England and Wales combined. Individual force ratios vary significantly.</p>
          </div>
        </section>
      </main>
    </>
  )
}
