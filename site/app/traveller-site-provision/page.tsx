'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface TravellerSiteProvisionData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    shortfallEstimate: number
    unauthorisedEncampments: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function TravellerSiteProvisionPage() {
  const [data, setData] = useState<TravellerSiteProvisionData | null>(null)

  useEffect(() => {
    fetch('/data/traveller-site-provision/traveller_site_provision.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'shortfall',
          label: 'Pitch shortfall (estimate)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.shortfallEstimate,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Traveller Site Provision" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Traveller Site Provision"
          question="Is There Enough Authorised Space for Traveller Communities?"
          finding="England has a shortfall of around 5,000 authorised Traveller pitches, and planning refusal rates for Traveller applications run double those for settled communities."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Gypsy, Roma and Traveller communities in England face a persistent and documented shortage of authorised sites on which to park their caravans and live in accordance with their traditional way of life. The Ministry of Housing&apos;s biannual Traveller Caravan Count identifies the number of caravans on authorised and unauthorised sites. Authorised sites &mdash; both local authority-managed sites and privately owned authorised sites &mdash; have a total pitch capacity that falls significantly short of need: estimates by the Traveller Movement and Friends Families and Travellers organisation suggest a national shortfall of approximately 5,000 pitches, with significant regional variation.</p>
            <p>The planning system has historically failed Traveller communities. Planning applications for Traveller sites are refused at approximately double the rate of equivalent applications for settled community development, and this disparity has been consistent across multiple decades of data. The reasons are not purely planning-related: local opposition to Traveller sites, expressed through planning objections, is high, and planning committees are sensitive to this opposition. The result is that even Travellers who own land and seek authorised site status for it find the planning route systematically more difficult to navigate than for comparable development proposals.</p>
            <p>The shortage of authorised provision is the direct cause of unauthorised encampments. When there is nowhere to legally park, families park on land without permission. The Police, Crime, Sentencing and Courts Act 2022 introduced new police powers to direct Travellers to leave land where they are encamped without permission, with seizure of vehicles and property for non-compliance. Critics &mdash; including the Equality and Human Rights Commission &mdash; argued that the powers disproportionately targeted Gypsy and Traveller communities and did not address the root cause of unauthorised encampments: the lack of authorised alternatives. Directing families off land without providing anywhere for them to go simply displaces the encampment rather than resolving it.</p>
            <p>The specific vulnerabilities of Gypsy, Roma and Traveller communities extend beyond site provision. GCSE attainment rates for Gypsy, Roma and Traveller pupils are the lowest of any ethnic group, at approximately 13% achieving expected standard. Health outcomes are significantly worse than for the general population, with lower life expectancy, higher rates of mental ill health, and poorer maternity outcomes. These outcomes are linked to insecure housing, mobility-related barriers to accessing NHS registration and services, and social exclusion. The Equality Act 2010 protects Gypsy, Roma and Traveller ethnicity as a protected characteristic, but enforcement of equality duties in housing allocation and site provision has been limited.</p>
            <p>Planning policy requires local authorities to carry out Gypsy and Traveller Accommodation Needs Assessments (GTANAs) and to allocate sites in their local plans to meet identified need. In practice, the number of local plans that identify and allocate sufficient sites is a minority, and the gap between identified need and allocated provision in adopted local plans is substantial. The National Planning Policy Framework&apos;s Traveller policy has been revised multiple times since 2012, each revision generally tightening the definition of &apos;Traveller&apos; for planning purposes. The 2015 definition &mdash; which excludes Travellers who have permanently ceased to travel &mdash; was particularly controversial, as it removed planning protection from a large proportion of the Traveller population. Government guidance remains at odds with the practical reality of a community for whom site provision falls far short of need.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Pitch Shortfall' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Authorised pitch shortfall"
              value="~5,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Growing gap &middot; inadequate local plan allocation"
              sparklineData={[3500, 3700, 3900, 4100, 4300, 4500, 4600, 4800, 5000]}
              onExpand={() => {}}
              source="Friends Families and Travellers &middot; Site Provision Analysis 2024"
            />
            <MetricCard
              label="Traveller planning refusal rate"
              value="48%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="48% vs 21% for settled community applications"
              sparklineData={[46, 47, 47, 48, 49, 50, 48, 48, 48]}
              onExpand={() => {}}
              source="DLUHC &middot; Planning Application Statistics 2024"
            />
            <MetricCard
              label="Unauthorised encampments per year"
              value="3,200"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Result of authorised provision shortage"
              sparklineData={[2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200]}
              onExpand={() => {}}
              source="DLUHC &middot; Traveller Caravan Count 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Estimated authorised Traveller pitch shortfall, 2016&ndash;2024"
              subtitle="Estimated gap between authorised pitch supply and assessed need in England."
              series={series}
              yLabel="Pitch shortfall (estimate)"
              source={{
                name: 'Friends Families and Travellers',
                dataset: 'Site Provision Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Friends Families and Travellers &mdash; Site Provision Analysis 2024. gypsy-traveller.org</p>
            <p>DLUHC &mdash; Traveller Caravan Count. Published biannually. gov.uk/government/collections/traveller-caravan-count</p>
            <p>DLUHC &mdash; Planning Application Statistics. gov.uk/government/collections/planning-applications-statistics</p>
            <p>Pitch shortfall estimates are modelled from Gypsy and Traveller Accommodation Needs Assessments versus allocated supply. Refusal rates compare Traveller site applications to all other residential applications. Unauthorised encampment figures from biannual Traveller Caravan Count.</p>
          </div>
        </section>
      </main>
    </>
  )
}
