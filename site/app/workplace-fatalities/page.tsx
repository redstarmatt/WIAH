'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface FatalitiesRow {
  year: number
  fatalInjuries: number
  ratePer100k: number
}

interface WorkplaceFatalitiesData {
  topic: string
  lastUpdated: string
  timeSeries: FatalitiesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function WorkplaceFatalitiesPage() {
  const [data, setData] = useState<WorkplaceFatalitiesData | null>(null)

  useEffect(() => {
    fetch('/data/workplace-fatalities/workplace_fatalities.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const fatalitiesSeries: Series[] = data
    ? [
        {
          id: 'fatalities',
          label: 'Fatal workplace injuries',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fatalInjuries,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Workplace Fatalities" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Workplace Fatalities"
          question="How Dangerous Is Going to Work?"
          finding="138 workers were killed at work in 2023/24 &mdash; the lowest rate since records began, but construction and agriculture remain disproportionately deadly."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has one of the lowest rates of fatal workplace injury in the world, and that rate has fallen dramatically over the past 35 years. In 1990, approximately 500 workers died at work each year. By 2024, that figure had fallen to 128 &mdash; a reduction of nearly 75% over a period in which the working population has grown. The rate per 100,000 workers now stands at 0.38, compared to over 1.0 in the early 1990s. This is a genuine achievement of regulation, enforcement, industry standards and cultural change.</p>
            <p>However, the improvement is not evenly distributed across sectors. Construction accounted for 45 of the 128 fatal injuries in 2024 &mdash; around 33% of the total, despite employing approximately 7% of the workforce. Agriculture, forestry and fishing showed similarly disproportionate rates, with a fatal injury rate per 100,000 roughly 18 times the all-industry average. Falls from height remain the leading cause of fatal injury in construction, while agriculture deaths frequently involve contact with moving vehicles and machinery.</p>
            <p>The HSE publishes detailed sector and cause breakdowns each year, enabling targeted enforcement. Following major fatalities or enforcement actions, sectors often show step-change improvements. The 2015 Working at Height Regulations, for example, contributed to a measurable reduction in construction falls. Proactive inspection campaigns in agriculture have similarly driven improvement in farm safety cultures that historically accepted high risk as inherent to the work.</p>
            <p>Non-fatal workplace injuries tell a different story. Around 600,000 workers sustain non-fatal injuries at work each year, with a further 1.8 million suffering from work-related ill health. These figures have proven more resistant to improvement than fatal injury rates, partly because they are harder to measure accurately and partly because the causal chain between working conditions and outcomes like musculoskeletal disorders or occupational stress spans many years.</p>
            <p>The long-run trajectory is one of genuine progress, but there is no room for complacency. Around 1.7 million working days are lost each year to workplace injuries alone, with economic costs estimated at over &pound;18 billion annually when ill health is included. The HSE&apos;s budget has been constrained for over a decade, and employer enforcement activity has not kept pace with the growth of new work sectors like gig economy logistics and warehouse fulfilment, where injury rates are rising from a low base.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Fatal Injuries' },
          { id: 'sec-callout', label: 'Progress' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Fatal injuries 2024"
              value="128"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Record low rate &middot; long-term improvement"
              sparklineData={[142, 137, 135, 147, 149, 111, 123, 135, 138, 128]}
              onExpand={() => {}}
              source="HSE &middot; Fatal injuries 2024"
            />
            <MetricCard
              label="Rate per 100k workers"
              value="0.38"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="2.5&times; safer than 1990 &middot; G7 lowest"
              sparklineData={[0.46, 0.43, 0.43, 0.45, 0.45, 0.34, 0.38, 0.41, 0.41, 0.38]}
              onExpand={() => {}}
              source="HSE &middot; 2024"
            />
            <MetricCard
              label="Construction fatalities 2024"
              value="45"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="33% of total despite being 7% of workforce"
              sparklineData={[47, 43, 38, 38, 30, 39, 35, 45, 45, 45]}
              onExpand={() => {}}
              source="HSE &middot; Construction sector 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Fatal workplace injuries, 2015&ndash;2024"
              subtitle="Worker fatalities reported under RIDDOR. Includes employees and self-employed. Excludes road traffic incidents."
              series={fatalitiesSeries}
              yLabel="Fatal injuries"
              source={{
                name: 'Health and Safety Executive (HSE)',
                dataset: 'Fatal injuries in Great Britain',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Long-Term Safety Improvements"
              value="0.38"
              unit="per 100k workers"
              description="Britain has dramatically improved workplace safety over 35 years. The fatal injury rate is now 2.5 times lower than in 1990, driven by regulation, enforcement and cultural change. The HSE ranks the UK among the safest in Europe."
              source="HSE, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Health and Safety Executive &mdash; Fatal injuries in Great Britain. Published annually. hse.gov.uk/statistics/fatals.htm</p>
            <p>HSE &mdash; RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) data. hse.gov.uk/riddor</p>
            <p>Fatal injuries include employees and self-employed workers killed as a result of a work-related accident. Road traffic incidents are excluded unless the fatality occurred in a workplace. Rates are calculated per 100,000 workers using ONS Labour Force Survey employment figures. Construction sector breakdown uses SIC codes 41&ndash;43.</p>
          </div>
        </section>
      </main>
    </>
  )
}
