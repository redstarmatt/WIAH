'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface CommunityCohesionRow {
  year: number
  communityBelongingPct: number
  trustDifferentBackgroundsPct?: number
}

interface CommunityCohesionData {
  topic: string
  lastUpdated: string
  timeSeries: CommunityCohesionRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CommunityCohesionSurveyPage() {
  const [data, setData] = useState<CommunityCohesionData | null>(null)

  useEffect(() => {
    fetch('/data/community-cohesion-survey/community_cohesion_survey.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const cohesionSeries: Series[] = data
    ? [
        {
          id: 'communityBelongingPct',
          label: 'Community belonging (%)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.communityBelongingPct,
          })),
        },
        {
          id: 'trustDifferentBackgroundsPct',
          label: 'Trust across backgrounds (%)',
          colour: '#264653',
          data: data.timeSeries
            .filter(d => d.trustDifferentBackgroundsPct !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.trustDifferentBackgroundsPct as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Community Cohesion" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Cohesion"
          question="Do Communities Trust Each Other?"
          finding="59% of people feel their local community belongs together — a figure that has fallen 6 percentage points since the pandemic and varies sharply by deprivation."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Community belonging &mdash; the sense that people in an area belong together &mdash; has fallen from 65% of adults in 2016 to 59% in 2023, with a sharp dip during and after the pandemic. The deprivation gradient is stark: in the wealthiest local authority areas, belonging typically registers at 70% or above; in the most deprived areas it falls to around 55%, a 15 percentage-point gap. Deprivation predicts low cohesion more strongly than diversity or population density, because it correlates with reduced social trust, high residential turnover, and weaker civic infrastructure. Trust between people of different backgrounds has remained relatively stable at around 74%, but is substantially lower in areas where different groups have limited everyday contact.</p>
            <p>Political polarisation &mdash; Brexit, immigration, and cost-of-living debates &mdash; has sustained high-temperature public discourse that affects willingness to engage across difference in shared spaces. Cohesion programmes run by local authorities and voluntary organisations are typically underfunded, short-term, and difficult to evaluate. The Levelling Up agenda included cohesion rhetoric without sustained investment in the libraries, youth centres, parks, and civic spaces that cohesion actually depends on. Where community infrastructure has been cut most deeply &mdash; disproportionately in deprived areas &mdash; the conditions under which belonging is built have eroded furthest.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Cohesion Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Community belonging"
              value="59%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-6pp since 2019 &middot; polarisation and inequality"
              sparklineData={[65, 64, 64, 65, 63, 60, 59, 59]}
              href="#sec-chart"source="MHCLG &middot; Community Life Survey 2023"
            />
            <MetricCard
              label="Trust across backgrounds"
              value="74%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="lower in deprived areas &middot; cohesion challenge"
              sparklineData={[76, 75, 75, 74, 74, 74]}
              href="#sec-chart"source="MHCLG &middot; Community Life Survey 2023"
            />
            <MetricCard
              label="Deprivation gap"
              value="15pp"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="most deprived areas 15pp less cohesive than wealthiest"
              sparklineData={[15, 15, 15, 15, 15, 15]}
              href="#sec-chart"source="MHCLG &middot; Community Life Survey analysis 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Community cohesion indicators, 2016&ndash;2023"
              subtitle="Percentage feeling their community has a sense of belonging and trusting people from different backgrounds."
              series={cohesionSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'MHCLG',
                dataset: 'Community Life Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Housing, Communities and Local Government &mdash; Community Life Survey. Annual household survey of civic participation and cohesion. gov.uk/government/collections/community-life-survey</p>
            <p>IPPR &mdash; Divided and Connected: Community Cohesion in Britain. ippr.org/research/publications</p>
            <p>Community belonging measure: percentage agreeing or strongly agreeing that &ldquo;people in this area belong together.&rdquo; Trust across backgrounds: percentage agreeing or strongly agreeing that &ldquo;people in this area can be trusted.&rdquo; Deprivation gap derived from Index of Multiple Deprivation quintile analysis of Community Life Survey microdata.</p>
          </div>
        </section>
      </main>
    </>
  )
}
