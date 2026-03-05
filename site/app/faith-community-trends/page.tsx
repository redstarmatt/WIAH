'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface FaithCommunityRow {
  year: number
  noReligionPct: number
  weeklyAttendancePct?: number
}

interface FaithCommunityData {
  topic: string
  lastUpdated: string
  timeSeries: FaithCommunityRow[]
  faithCharitiesTurnoverBn: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FaithCommunityTrendsPage() {
  const [data, setData] = useState<FaithCommunityData | null>(null)

  useEffect(() => {
    fetch('/data/faith-community-trends/faith_community_trends.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const faithSeries: Series[] = data
    ? [
        {
          id: 'noReligionPct',
          label: 'No religion (%)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.noReligionPct,
          })),
        },
        {
          id: 'weeklyAttendancePct',
          label: 'Weekly attendance (%)',
          colour: '#264653',
          data: data.timeSeries
            .filter(d => d.weeklyAttendancePct !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.weeklyAttendancePct as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Faith Community Trends" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Faith Community Trends"
          question="Is Britain Becoming Secular?"
          finding="For the first time, more than half of people in England and Wales have no religion — but faith communities still provide £12 billion of social value annually."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 2021 census recorded that, for the first time in the history of census-taking in England and Wales, a majority of people &mdash; 53.3% &mdash; described themselves as having no religion. By 2023, polling estimates put that figure at around 55%. The shift is generational: younger cohorts are substantially more likely to report no religious affiliation, and this pattern has been consistent across decades of survey data. Secularisation in Britain is not a new phenomenon, but the 2021 census mark represents a cultural and statistical watershed.</p>
            <p>Weekly religious attendance has fallen from around 15% of the population in 2001 to approximately 6% in 2023. The Church of England has experienced the most dramatic absolute decline: average Sunday attendance has more than halved since 2000, and the Church projects that without significant change, active membership will fall to very low levels within two decades. The Roman Catholic Church, evangelical and Pentecostal churches, and black-majority churches have shown greater resilience, while Islam has grown as a share of religious practice due to demographic change.</p>
            <p>Despite declining affiliation, faith communities continue to provide substantial social infrastructure. The NCVO and Church Urban Fund estimate that faith organisations contribute around £12 billion in social value annually through food banks, debt advice centres, community cafes, homeless shelters, parent-and-toddler groups, elderly befriending schemes, and mental health support. Much of this provision is invisible to secular policymakers because it is not contracted or regulated by the state &mdash; it simply exists because congregations decide to serve their neighbourhoods.</p>
            <p>The relationship between secularisation and social provision creates a planning challenge. As congregations age and shrink, they become less able to sustain the community services that depend on their buildings, volunteers, and operational capacity. Church buildings &mdash; many of them listed, all of them expensive to maintain &mdash; often house community activities that have no alternative home. When a congregation closes, the community cafe, the toddler group, and the food bank often close with it. The heritage and social value embedded in these buildings is poorly captured in planning and property frameworks.</p>
            <p>The growth of non-religious identities has not been matched by growth in secular equivalents of faith community infrastructure. Humanist and atheist organisations exist, but they do not replicate the weekly gathering, the lifecycle rituals, the mutual support networks, or the community service that organised religion provides for its members. The question of how secular society reproduces the social functions of religion without its metaphysical commitments remains unresolved &mdash; and largely unasked in public policy.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Faith Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="No religion"
              value="55%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="majority non-religious &middot; 2021 census landmark"
              sparklineData={[14.8, 25.1, 38.0, 43.1, 53.3, 55.0]}
              onExpand={() => {}}
              source="ONS &middot; Census 2021 / British Social Attitudes 2023"
            />
            <MetricCard
              label="Weekly attendance"
              value="6%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="from 15% in 2001 &middot; rapid secularisation"
              sparklineData={[15, 10, 8, 7, 6, 6]}
              onExpand={() => {}}
              source="Church of England / British Social Attitudes 2023"
            />
            <MetricCard
              label="Faith charity value"
              value="£12bn"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="faith organisations still major social infrastructure"
              sparklineData={[11, 11, 12, 12, 12, 12]}
              onExpand={() => {}}
              source="Church Urban Fund / NCVO &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Religious identity and attendance, 2001&ndash;2023"
              subtitle="Percentage of population with no religion and percentage attending religious services weekly."
              series={faithSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'ONS / British Social Attitudes',
                dataset: 'Census / Annual Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Census 2021, England and Wales. Religious affiliation question. ons.gov.uk/peoplepopulationandcommunity/culturalidentity/religion</p>
            <p>NatCen &mdash; British Social Attitudes Survey. Annual survey of attitudes and behaviours including religious practice. natcen.ac.uk/research/research-that-shapes-policy/british-social-attitudes</p>
            <p>Church Urban Fund &mdash; Near Neighbours and Community Research. cuf.org.uk</p>
            <p>No religion percentage is from ONS Census for 2001 and 2021 data points; intermediate years and 2023 from British Social Attitudes interpolation. Weekly attendance from BSA self-reported religious practice data. Faith charity social value estimate from Church Urban Fund / NCVO modelling of volunteer time, buildings use, and direct service provision.</p>
          </div>
        </section>
      </main>
    </>
  )
}
