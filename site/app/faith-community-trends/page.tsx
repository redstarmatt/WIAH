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
            <p>The 2021 census recorded that 53.3% of people in England and Wales described themselves as having no religion &mdash; the first time a majority had done so &mdash; with polling by 2023 putting the figure at around 55%. Weekly religious attendance has fallen from 15% of the population in 2001 to approximately 6% in 2023. The Church of England has experienced the most dramatic absolute decline, with average Sunday attendance having more than halved since 2000; the Roman Catholic Church, evangelical and Pentecostal churches, and black-majority churches have shown greater resilience, while Islam has grown as a share of religious practice through demographic change. Despite declining affiliation, faith organisations contribute an estimated &pound;12 billion in social value annually &mdash; food banks, debt advice, community cafes, homeless shelters, elderly befriending &mdash; much of it invisible to secular policymakers because it is not contracted or regulated by the state.</p>
            <p>The relationship between secularisation and social provision creates a planning gap that public policy has not addressed. As congregations age and shrink, they become less able to sustain the community services that depend on their buildings, volunteers, and operational capacity. When a congregation closes, the community cafe, the toddler group, and the food bank often close with it. The growth of non-religious identities has not been matched by growth in secular equivalents &mdash; humanist and atheist organisations exist but do not replicate the weekly gathering, lifecycle rituals, mutual support networks, or community service that organised religion provides for its members. How secular society reproduces those social functions remains largely unasked in public policy.</p>
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
              href="#sec-chart"source="ONS &middot; Census 2021 / British Social Attitudes 2023"
            />
            <MetricCard
              label="Weekly attendance"
              value="6%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="from 15% in 2001 &middot; rapid secularisation"
              sparklineData={[15, 10, 8, 7, 6, 6]}
              href="#sec-chart"source="Church of England / British Social Attitudes 2023"
            />
            <MetricCard
              label="Faith charity value"
              value="£12bn"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="faith organisations still major social infrastructure"
              sparklineData={[11, 11, 12, 12, 12, 12]}
              href="#sec-chart"source="Church Urban Fund / NCVO &middot; 2023"
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
