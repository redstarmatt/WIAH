'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface YouthSocialActionDataPoint {
  year: number
  youthVolunteeringPct: number
  regularVolunteersM: number
}

interface YouthSocialActionData {
  topic: string
  lastUpdated: string
  timeSeries: YouthSocialActionDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function YouthSocialActionPage() {
  const [data, setData] = useState<YouthSocialActionData | null>(null)

  useEffect(() => {
    fetch('/data/youth-social-action/youth_social_action.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'youth-volunteering',
          label: 'Youth volunteering rate (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.youthVolunteeringPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="Are Young People Engaged With Their Communities?"
          finding="Youth volunteering rates have fallen from 46% to 34% since 2010, reversing a generation of civic investment — though employer-supported programmes show new routes back."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Youth volunteering has been in sustained decline since 2010. Among 16&ndash;25 year olds, the proportion doing formal volunteering through an organisation fell from 46% in 2010 to 34% in 2024, according to the DCMS Community Life Survey, with regular volunteering &mdash; monthly or more &mdash; falling more sharply still. The pandemic delivered a sharp shock from which recovery has been partial: the brief mutual aid spike of 2020&ndash;21 did not translate into sustained rates. Structural causes run deep: the abolition of youth community programmes in 2010&ndash;12 (Connexions, Youth Opportunity Fund) removed volunteer development infrastructure, and the National Citizen Service &mdash; its successor &mdash; reached around 100,000 young people at peak before being discontinued in 2023. The cost-of-living crisis has added a time and financial barrier: young people working long hours in part-time employment to cover living costs have less discretionary time to volunteer, and travel costs present a real barrier for those on low incomes.</p>
            <p>The picture is not uniformly negative. Youth social enterprises employ over 840,000 people across the UK, up 120,000 since 2019, providing a civic pathway for young people who prefer action to volunteerism. The Duke of Edinburgh&apos;s Award continued to involve approximately 400,000 young people per year in 2024 with record Silver and Gold participation. Employer-supported volunteering has grown in the corporate and tech sectors, providing new infrastructure for civic engagement as young people enter the workforce. Sports-based volunteering has been more resilient than other forms. But the headline trend &mdash; 12 percentage points down in 14 years &mdash; represents a significant erosion of civic participation that will compound over time.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Youth volunteering rate 2024"
              value="34%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 46% in 2010 · pandemic accelerated"
              sparklineData={[42, 41, 40, 39, 38, 36, 34, 33, 34]}
              source="DCMS · Community Life Survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="16-25s doing regular volunteering"
              value="3.2m"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="3.2m regular volunteers · 600k fewer than 2010"
              sparklineData={[3.8, 3.7, 3.6, 3.5, 3.4, 3.2, 3.0, 3.0, 3.2]}
              source="NCVO · UK Civil Society Almanac 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Youth social enterprise employment"
              value="840,000"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+120k since 2019 · alternative civic pathway"
              sparklineData={[580, 600, 630, 660, 680, 700, 720, 780, 840]}
              source="Social Enterprise UK · State of Social Enterprise 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Youth volunteering rate, 2016–2024"
              subtitle="Percentage of 16–25 year olds doing formal volunteering through an organisation."
              series={series}
              yLabel="Volunteering rate (%)"
              source={{ name: 'DCMS', dataset: 'Community Life Survey', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">DCMS</strong> — Community Life Survey. Annual household survey of volunteering, civic participation and charitable giving among adults in England.</p>
            <p><strong className="text-wiah-black">NCVO</strong> — UK Civil Society Almanac 2024. Annual analysis of voluntary sector data including volunteering rates from the Community Life Survey and Voluntary Work Survey.</p>
            <p><strong className="text-wiah-black">Social Enterprise UK</strong> — State of Social Enterprise 2024. Biennial survey of social enterprise activity, employment and reach in the UK.</p>
            <p>Note: The Community Life Survey methodology changed in 2018, creating a slight discontinuity. 2020 and 2021 pandemic years saw reduced formal volunteering but increased informal mutual aid not fully captured in survey data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
