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
            <p>Formal volunteering &mdash; defined as giving unpaid time through an organisation &mdash; has declined slowly but persistently over the past 15 years. NCVO&apos;s Time Well Spent survey found 24% of adults in England volunteering formally at least once a month in 2023, down from 28% in 2010. The decline is not dramatic but it is real, and it is concentrated among specific groups: working-age adults with children, people in lower-income groups, and those in insecure employment. Time pressure and financial constraint are the dominant barriers cited by people who have stopped volunteering or who would like to but do not.</p>
            <p>The COVID-19 pandemic disrupted this long-term decline in an unexpected way. The spring and summer of 2020 saw an explosion of mutual aid: around 4,000 local mutual aid groups formed in weeks, with an estimated 3 million people involved in informal neighbourhood support. Formal volunteering temporarily fell as organisations closed, but community helping &mdash; checking on neighbours, delivering food, running phone support lines &mdash; surged dramatically. The DCMS Community Life Survey recorded 39% of adults engaged in informal helping in 2020, up from 31% in 2018. This was the highest recorded level in the survey&apos;s history.</p>
            <p>The post-pandemic settlement has been partial. Mutual aid groups did not disappear entirely but most contracted significantly as immediate need receded. Informal helping in 2023 stands at 33% &mdash; below the COVID peak but above pre-pandemic levels. Whether this represents a lasting shift in civic culture or a residual from exceptional circumstances remains unclear. What is clear is that the organised voluntary sector &mdash; charities, voluntary organisations, community groups &mdash; is under considerable financial pressure: real-terms income has fallen and demand for services has risen in parallel with cost-of-living pressures.</p>
            <p>One measure of grassroots civic energy around need is Trussell Trust food bank volunteering. The network now relies on approximately 39,000 volunteers across 1,300 food banks in the UK. This number has grown from 22,000 in 2015 as the network has expanded in response to rising need. Food bank volunteering represents a particular kind of civic engagement: direct, local, tangible. But it also reflects a failure of the state to provide adequate income support, and campaigners including the Trussell Trust itself argue that reliance on charity food provision is a political choice that should not be normalised.</p>
            <p>The drivers of civic participation are structural as much as cultural. Research consistently finds that social trust, sense of local belonging, and time availability are the strongest predictors of volunteering. All three are unevenly distributed: higher in wealthier areas, lower in areas of high deprivation and social fragmentation. Precarious employment, longer commutes, declining community institutions (libraries, youth centres, pubs), and reduced public investment in community infrastructure all erode the conditions under which civic participation flourishes. Reversing the long-term decline in formal volunteering is likely to require investment in those conditions rather than appeals to individual civic spirit alone.</p>
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
