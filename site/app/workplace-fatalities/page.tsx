'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'HSE', dataset: 'Statistics on fatal injuries in the workplace in Great Britain', url: 'https://www.hse.gov.uk/statistics/fatals.htm', date: '2024', note: '128 fatalities; 0.38 per 100,000 workers' },
  { num: 2, name: 'HSE', dataset: 'Non-fatal injuries and work-related ill health', url: 'https://www.hse.gov.uk/statistics/causinj/', date: '2024', note: '600,000 non-fatal injuries; 1.8M work-related ill health cases' },
  { num: 3, name: 'HSE', dataset: 'RIDDOR — Reporting of Injuries, Diseases and Dangerous Occurrences', url: 'https://www.hse.gov.uk/riddor/', date: '2024' },
];

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
          finding={<>138 workers were killed at work in 2023/24 — the lowest rate since records began, but construction and agriculture remain disproportionately deadly.<Cite nums={1} /></>}
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has one of the lowest rates of fatal workplace injury in the world, and that rate has fallen dramatically over 35 years: from approximately 500 deaths a year in 1990 to 128 in 2024, a reduction of nearly 75% as the working population grew.<Cite nums={1} /> The rate per 100,000 workers now stands at 0.38, compared to over 1.0 in the early 1990s — a genuine achievement of regulation, enforcement, and cultural change. The improvement is not evenly distributed, however. Construction accounted for 45 of those 128 fatal injuries in 2024, around 33% of the total despite employing roughly 7% of the workforce. Agriculture, forestry, and fishing show a fatal injury rate approximately 18 times the all-industry average, with falls from height and contact with moving machinery the dominant causes across both sectors.<Cite nums={1} /></p>
            <p>Non-fatal injuries tell a harder story. Around 600,000 workers sustain non-fatal injuries at work each year, with a further 1.8 million suffering from work-related ill health that has proven more resistant to improvement than the fatal injury rate.<Cite nums={2} /> Around 1.7 million working days are lost annually to workplace injuries alone, with an economic cost estimated at over £18 billion when ill health is included. HSE's budget has been constrained for over a decade, and enforcement activity has not kept pace with gig economy logistics and warehouse fulfilment, where injury rates are rising from a low base.</p>
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
              changeText={<>Record low rate · long-term improvement<Cite nums={1} /></>}
              sparklineData={[142, 137, 135, 147, 149, 111, 123, 135, 138, 128]}
              href="#sec-chart"source="HSE · Fatal injuries 2024"
            />
            <MetricCard
              label="Rate per 100k workers"
              value="0.38"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="2.5&times; safer than 1990 · G7 lowest"
              sparklineData={[0.46, 0.43, 0.43, 0.45, 0.45, 0.34, 0.38, 0.41, 0.41, 0.38]}
              href="#sec-callout"source="HSE · 2024"
            />
            <MetricCard
              label="Construction fatalities 2024"
              value="45"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText={<>33% of total despite being 7% of workforce<Cite nums={1} /></>}
              sparklineData={[47, 43, 38, 38, 30, 39, 35, 45, 45, 45]}
              href="#sec-callout"source="HSE · Construction sector 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Fatal workplace injuries, 2015–2024"
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
              description={<>Britain has dramatically improved workplace safety over 35 years. The fatal injury rate is now 2.5 times lower than in 1990, driven by regulation, enforcement and cultural change.<Cite nums={1} /> The HSE ranks the UK among the safest in Europe.</>}
              source="HSE, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Health and Safety Executive — Fatal injuries in Great Britain. Published annually. hse.gov.uk/statistics/fatals.htm</p>
            <p>HSE — RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) data. hse.gov.uk/riddor</p>
            <p>Fatal injuries include employees and self-employed workers killed as a result of a work-related accident. Road traffic incidents are excluded unless the fatality occurred in a workplace. Rates are calculated per 100,000 workers using ONS Labour Force Survey employment figures. Construction sector breakdown uses SIC codes 41–43.</p>
          </div>
        </section>
        <References items={editorialRefs} />
              <RelatedTopics />
      </main>
    </>
  )
}
