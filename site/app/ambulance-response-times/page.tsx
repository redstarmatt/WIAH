'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface AmbulanceDataPoint {
  year: number
  cat1Minutes: number
  cat2Minutes: number
}

interface AmbulanceResponseTimesData {
  topic: string
  lastUpdated: string
  timeSeries: AmbulanceDataPoint[]
  targets: { cat1: number; cat2: number }
  trustVariation: { best: number; worst: number }
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function AmbulanceResponseTimesPage() {
  const [data, setData] = useState<AmbulanceResponseTimesData | null>(null)

  useEffect(() => {
    fetch('/data/ambulance-response-times/ambulance_response_times.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const cat1Series: Series[] = data
    ? [{
        id: 'cat1',
        label: 'Cat 1 response (minutes)',
        colour: '#0D1117',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cat1Minutes })),
      }]
    : []

  const cat2Series: Series[] = data
    ? [{
        id: 'cat2',
        label: 'Cat 2 response (minutes)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cat2Minutes })),
      }]
    : []

  const allSeries: Series[] = [...cat1Series, ...cat2Series]

  return (
    <>
      <TopicNav topic="Ambulance Response Times" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ambulance Response Times"
          question="Are Ambulances Getting There in Time?"
          finding="Category 1 response times are 20% above target; Category 2 takes more than twice the target time."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s ambulance services operate under two key targets: Category 1 calls &mdash; immediately life-threatening emergencies including cardiac arrests &mdash; should receive a response within 7 minutes on average. Category 2 calls, covering strokes and heart attacks, carry an 18-minute target. Both are being missed. Category 2 deteriorated from exactly on target in 2017 to 48 minutes in 2022, before partial recovery to 38.6 minutes in 2024. For a stroke patient, 1.9 million neurons are lost for each minute without treatment &mdash; a 38-minute average means many patients routinely wait an hour. The primary structural cause is ambulance handover delays: NHS England data shows over 40% of ambulance time now spent off-road outside A&amp;E departments, with 1.8 million crew-hours lost to queuing in 2023/24. Workforce vacancies and the 2022&ndash;23 industrial action over pay further compressed capacity during the worst winters.</p>
            <p>Performance variation between trusts is severe. The best-performing trust achieved a Category 1 average of 7.1 minutes in 2024; the worst reached 12.3 minutes &mdash; nearly double the target. Rural ambulance services are disproportionately affected: geography means a crew trapped at a distant hospital for hours can leave hundreds of square miles without emergency cover, and longer individual call times mean the cascading effect of each delay is more pronounced. The national average conceals a postcode lottery in emergency care that is, by definition, life-or-death: a patient in a rural area served by an under-pressure trust faces materially worse outcomes than one in a well-staffed urban area.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Response Times' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Cat 1 response time"
              value="8.2 min"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+1.2 min above 7-min target &middot; 2017: 7.0 min"
              sparklineData={[7.0, 7.2, 7.3, 7.8, 8.0, 8.7, 8.4, 8.2]}
              href="#sec-chart"source="NHS England &middot; Ambulance Quality Indicators 2024"
            />
            <MetricCard
              label="Cat 2 response time"
              value="38.6 min"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+20.6 min above 18-min target &middot; 2017: 18.0 min"
              sparklineData={[18.0, 21.4, 22.9, 29.1, 32.4, 48.3, 41.3, 38.6]}
              href="#sec-chart"source="NHS England &middot; Ambulance Quality Indicators 2024"
            />
            <MetricCard
              label="Trust variation (Cat 1)"
              value="1.7&times;"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="best trust 7.1 min vs worst 12.3 min"
              sparklineData={[1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.7]}
              href="#sec-chart"source="NHS England &middot; Trust-level AQI 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Ambulance response times, England, 2017&ndash;2024"
              subtitle="Average Category 1 and Category 2 response times in minutes. Category 1 target: 7 min. Category 2 target: 18 min."
              series={allSeries}
              yLabel="Minutes"
              source={{
                name: 'NHS England',
                dataset: 'Ambulance Quality Indicators',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Ambulance Quality Indicators. Published monthly. england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/</p>
            <p>Response time targets set under the Ambulance Response Programme (ARP) 2017. Category 1: mean 7 minutes, 90th percentile 15 minutes. Category 2: mean 18 minutes, 90th percentile 40 minutes. Data represents annual means derived from monthly trust-level publications. Trust variation figures are the best and worst annual mean Cat 1 response time across the 10 NHS ambulance trusts in England in 2024.</p>
          </div>
        </section>
      </main>
    </>
  )
}
