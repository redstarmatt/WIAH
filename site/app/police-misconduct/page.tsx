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
            <p>Misconduct proceedings in England and Wales have risen steadily over the past decade, reaching 1,738 hearings in 2022/23. Of these, 122 officers were dismissed. Critics of the disciplinary system argue that dismissal rates remain too low given the scale of the complaints received by forces, and that the legal protections available to officers &mdash; particularly the requirement to prove misconduct to the criminal standard in some cases &mdash; make it difficult to remove unsuitable individuals. The College of Policing and HMICFRS have acknowledged that the misconduct system is complex, slow, and inconsistent in its outcomes across forces.</p>
            <p>Stop and search disproportionality remains one of the most persistent and contested issues in UK policing. In 2022/23, a Black person in England and Wales was 4.1 times more likely to be stopped and searched than a white person. This is an improvement from a ratio of 9.7 in 2018 &mdash; itself a reduction from even higher historic levels &mdash; but the disproportionality remains significant. The Home Office&apos;s own data shows that the hit rate for stop and search (the proportion resulting in arrest or further action) is similar across ethnic groups, which implies that the higher rate of stops of Black people is not explained by higher offending rates and is instead driven by other factors including unconscious bias and geographic targeting of policing in poorer areas.</p>
            <p>The Independent Office for Police Conduct (IOPC) had 2,057 cases outstanding as of 2022/23, up from 1,240 in 2019. Average resolution time has extended to more than three years. High-profile failures of police vetting and misconduct processes came into sharp focus following the murders committed by serving Metropolitan Police officer David Carrick &mdash; who had 17 allegations against him recorded over a decade &mdash; and the murder of Sarah Everard by Wayne Couzens. Baroness Casey&apos;s 2023 review of the Metropolitan Police found institutional racism, misogyny, and homophobia embedded in the force&apos;s culture, and concluded that the public should not place unconditional trust in the institution.</p>
            <p>The Casey Review made 49 recommendations, including an overhaul of vetting, new fitness-to-practise powers, and a root-and-branch reform of how complaints are handled. The Metropolitan Police accepted the recommendations in principle. But implementation at scale across 43 forces in England and Wales &mdash; each operationally independent &mdash; presents a profound challenge. HMICFRS inspections in the years following the Carrick and Couzens cases found multiple forces with inadequate vetting processes, officers with domestic abuse convictions still in post, and complaint handling that failed victims at multiple stages.</p>
            <p>Reform debate has centred on several axes: whether the IOPC should have stronger powers to compel forces; whether a national police disciplinary panel &mdash; independent of individual forces &mdash; would produce more consistent outcomes; whether a police register analogous to the medical or teaching registers would allow barred officers to be prevented from re-employment in any force; and whether body-worn camera deployment and footage release rules need strengthening. Each of these reforms has advocates within policing and outside it. The core tension is between operational independence, which forces guard jealously, and the public interest in consistent, transparent accountability.</p>
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
              changeText="122 officers dismissed &middot; but critics say too few for scale of complaints"
              sparklineData={[1240, 1320, 1410, 1520, 1580, 1640, 1710, 1738]}
              source="College of Policing / HMICFRS &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Stop and search: Black to white ratio"
              value="4.1"
              unit="&times;"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 9.7&times; in 2018 but still 4&times; more likely &middot; deeply disproportionate"
              sparklineData={[9.7, 9.4, 6.3, 6.7, 5.1, 4.1]}
              source="Home Office Stop and Search Statistics &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Outstanding IOPC investigations"
              value="2,057"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1,240 in 2019 &middot; average resolution &gt;3 years"
              sparklineData={[1240, 1580, 1890, 2010, 2057]}
              source="IOPC Annual Report &middot; 2022/23"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-hearings" className="mb-12">
            <LineChart
              title="Police misconduct hearings in England &amp; Wales, 2016&ndash;2023"
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
            <p>HMICFRS &mdash; Her Majesty&apos;s Inspectorate of Constabulary and Fire &amp; Rescue Services. Annual inspection reports and thematic reviews of police integrity and misconduct. Available at justiceinspectorates.gov.uk.</p>
            <p>IOPC &mdash; Independent Office for Police Conduct. Annual report covering complaints received, outstanding cases, and case outcomes. Available at policeconduct.gov.uk.</p>
            <p>Home Office &mdash; Police Powers and Procedures: Stop and Search. Annual statistics on stop and search use by police force area and ethnicity. Available at gov.uk/government/statistics.</p>
            <p>Stop and search ratios are calculated as the rate per 1,000 population for each ethnic group. The Black to white ratio shown is England and Wales combined. Individual force ratios vary significantly.</p>
          </div>
        </section>
      </main>
    </>
  )
}
