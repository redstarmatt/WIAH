'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface CivicParticipationData {
  formalVolunteering: Array<{ year: number; percent: number }>
  informalHelping: Array<{ year: number; percent: number }>
  foodBankVolunteers: Array<{ year: number; volunteers: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function CivicParticipationPage() {
  const [data, setData] = useState<CivicParticipationData | null>(null)

  useEffect(() => {
    fetch('/data/civic-participation/civic_participation.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const volunteeringSeries: Series[] = data
    ? [
        {
          id: 'formal',
          label: 'Formal volunteering (%)',
          colour: '#F4A261',
          data: data.formalVolunteering.map(d => ({
            date: yearToDate(d.year),
            value: d.percent,
          })),
        },
        {
          id: 'informal',
          label: 'Informal helping (%)',
          colour: '#264653',
          data: data.informalHelping.map(d => ({
            date: yearToDate(d.year),
            value: d.percent,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Civic Participation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Civic Participation"
          question="Is Britain becoming less civic?"
          finding="Formal volunteering has declined from 28% to 24% of adults since 2010. But mutual aid and grassroots activity grew dramatically during COVID and has partly sustained. Trussell Trust food banks now rely on 39,000 volunteers."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Formal volunteering &mdash; giving unpaid time through an organisation at least once a month &mdash; fell from 28% to 24% of adults in England between 2010 and 2023, with the decline concentrated among working-age adults with children, lower-income groups, and those in insecure employment. The pandemic disrupted this long-term trend: spring 2020 saw around 4,000 mutual aid groups form within weeks, informal helping surged to 39% of adults (up from 31% in 2018), and the Trussell Trust food bank network expanded to rely on 39,000 volunteers across 1,300 locations, up from 22,000 in 2015. Informal helping in 2023 stands at 33% &mdash; below the COVID peak but above pre-pandemic levels.</p>
            <p>The drivers of civic participation are structural. Social trust, local belonging, and time availability &mdash; the strongest predictors of volunteering &mdash; are all unevenly distributed, highest in wealthier areas and lowest in areas of deprivation and social fragmentation. Precarious employment, declining community institutions (libraries, youth centres, pubs), and cuts to community infrastructure funding erode the conditions in which participation flourishes. The organised voluntary sector is simultaneously under financial pressure from reduced public funding while facing rising demand driven by cost-of-living pressures, forcing many organisations to reduce services at the moment need is highest.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-volunteering', label: 'Volunteering Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Formal volunteering rate"
              value="24"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 28% in 2010 &middot; long-term secular decline"
              sparklineData={[28, 27, 26, 25, 23, 24, 24]}
              source="NCVO Time Well Spent &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Informal helping neighbours/community"
              value="33"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="COVID surge (39%) has largely receded &middot; but above 2010 levels"
              sparklineData={[35, 33, 31, 39, 34, 33]}
              source="NCVO / Community Life Survey &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Trussell Trust food bank volunteers"
              value="39,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 22,000 in 2015 &middot; grassroots civic energy around need"
              sparklineData={[22000, 28000, 36000, 39000]}
              source="Trussell Trust Annual Report &middot; 2022"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-volunteering" className="mb-12">
            <LineChart
              title="Volunteering rates, England, 2010&ndash;2023"
              subtitle="% of adults engaged in formal volunteering or informal community helping at least once a month."
              series={volunteeringSeries}
              yLabel="% of adults"
              source={{
                name: 'NCVO / DCMS',
                dataset: 'Time Well Spent / Community Life Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NCVO &mdash; Time Well Spent. Biennial survey of volunteering attitudes and behaviour in England. Available at ncvo.org.uk.</p>
            <p>DCMS &mdash; Community Life Survey. Annual survey of volunteering, charitable giving, and civic participation in England. Available at gov.uk/government/statistics/community-life-survey.</p>
            <p>Trussell Trust &mdash; Annual Report. Volunteer numbers and network statistics for the Trussell Trust food bank network. Available at trusselltrust.org.</p>
            <p>Formal volunteering is defined as giving unpaid time through an organisation at least once in the past 12 months. Informal helping covers unpaid help to individuals outside the household. COVID-19 significantly disrupted 2020 data collection, and year-on-year comparisons around 2020 should be treated with caution.</p>
          </div>
        </section>
      </main>
    </>
  )
}
