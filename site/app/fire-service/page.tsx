'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface WorkforcePoint {
  year: number
  fte: number
}

interface ResponseTimePoint {
  year: number
  avgMinutes: number
}

interface FatalityPoint {
  year: number
  deaths: number
}

interface FireServiceData {
  national: {
    workforce: { timeSeries: WorkforcePoint[] }
    responseTimes: { timeSeries: ResponseTimePoint[] }
    fatalities: { timeSeries: FatalityPoint[] }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FireServicePage() {
  const [data, setData] = useState<FireServiceData | null>(null)

  useEffect(() => {
    fetch('/data/fire-service/fire_service.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const workforceSeries: Series[] = data
    ? [{
        id: 'fte',
        label: 'Firefighters (FTE)',
        colour: '#E63946',
        data: data.national.workforce.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.fte })),
      }]
    : []

  const responseSeries: Series[] = data
    ? [{
        id: 'responseTime',
        label: 'Avg response time (minutes)',
        colour: '#E63946',
        data: data.national.responseTimes.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgMinutes })),
      }]
    : []

  const fatalitySeries: Series[] = data
    ? [{
        id: 'fatalities',
        label: 'Fire-related deaths',
        colour: '#0D1117',
        data: data.national.fatalities.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.deaths })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Fire Service" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fire Service"
          question="Will the Fire Service Actually Reach You?"
          finding="England has lost 12,000 firefighters since 2010 while response times have risen by nearly two minutes and fire deaths are climbing again."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's fire and rescue services have undergone a quiet contraction that is now showing up in the numbers that matter most. The workforce has fallen from around 42,000 full-time equivalent firefighters in 2010 to approximately 30,000 in 2024 — a loss of roughly 12,000 posts, or 29% of total strength. More than 40 fire stations have closed outright since 2010, and many more have lost night-time crewing, switching to daytime-only or on-call cover that adds critical minutes to response times after dark. The average time from 999 call to arrival at a dwelling fire has risen from just over 7 minutes to nearly 9 minutes nationally, with some rural areas routinely exceeding 12 minutes. Fire-related deaths, which fell to a historic low of 212 in 2020/21, have climbed back above 300 by 2023/24. Deliberate fires — arson — have also increased, placing further strain on reduced crews. The Grenfell Tower fire in 2017, which killed 72 people, exposed systemic failures in building safety regulation and operational doctrine that are still being addressed through the Building Safety Act and ongoing inquiry recommendations. HMICFRS inspections have found &ldquo;requires improvement&rdquo; ratings at a significant number of services, citing workforce planning, diversity, and the pace of reform as persistent weaknesses.</p>
            <p>The strain extends well beyond traditional firefighting. Fire services now respond to a growing burden of flooding incidents driven by more frequent extreme weather, wildfire callouts that were once rare in England, and medical co-response duties where crews attend cardiac arrests and other emergencies alongside or ahead of ambulances. Meanwhile, fire prevention work — the home fire safety checks that fit smoke alarms and identify vulnerable residents — fell by roughly 40% between 2010 and 2020 as services prioritised response over prevention with shrinking budgets. Retained firefighters, the on-call workforce that provides the backbone of rural fire cover, are increasingly difficult to recruit: employers are reluctant to release staff, pay is low relative to the disruption, and the pool of people living close enough to a station to meet the response-time requirement is shrinking as housing costs push workers further from their communities. The result is a service asked to do more with materially less, in a risk environment that is becoming more complex and less predictable with each passing year.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-callout', label: 'Prevention' },
          { id: 'sec-workforce', label: 'Workforce' },
          { id: 'sec-response', label: 'Response Times' },
          { id: 'sec-fatalities', label: 'Fatalities' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Firefighter FTE"
              value="30,100"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-11,950 since 2010 · 29% reduction"
              sparklineData={[42050, 39300, 36200, 34250, 32700, 31600, 30900, 30100]}
              href="#sec-workforce"source="Home Office · Fire workforce statistics 2024"
            />
            <MetricCard
              label="Avg response time"
              value="8.9 min"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+1.8 min since 2010 · was 7.1 min"
              sparklineData={[7.1, 7.4, 7.7, 8.0, 8.2, 8.4, 8.6, 8.9]}
              href="#sec-response"source="Home Office · Fire incident statistics 2024"
            />
            <MetricCard
              label="Fire-related deaths"
              value="310"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+98 from 2020 low of 212 · rising since 2021"
              sparklineData={[380, 350, 303, 280, 275, 212, 268, 310]}
              href="#sec-fatalities"source="Home Office · Fire fatality statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Fire Prevention Visits Recovering"
              value="600,000+"
              unit="home fire safety visits per year by 2023/24"
              description="Home fire safety visits recovered to over 600,000 per year by 2023/24 after falling 40% during the austerity period and COVID disruption. Smoke alarm ownership reached 96% of households. Fire death rates, while rising, remain well below the 1980s peak of over 700 per year."
              source="Home Office, Fire prevention and protection statistics, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workforce" className="mb-12">
            <LineChart
              title="Firefighter numbers, England, 2010–2024"
              subtitle="Full-time equivalent firefighters employed by fire and rescue authorities. Excludes fire control and support staff."
              series={workforceSeries}
              yLabel="Firefighters (FTE)"
              source={{
                name: 'Home Office',
                dataset: 'Fire and rescue workforce statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-response" className="mb-12">
            <LineChart
              title="Average response time to dwelling fires, England, 2010–2024"
              subtitle="Mean time in minutes from emergency call to first appliance arriving at dwelling fires."
              series={responseSeries}
              yLabel="Minutes"
              source={{
                name: 'Home Office',
                dataset: 'Fire and rescue incident statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-fatalities" className="mb-12">
            <LineChart
              title="Fire-related fatalities, England, 2010–2024"
              subtitle="Deaths in fires recorded by fire and rescue services. Includes the 72 Grenfell Tower deaths in 2017."
              series={fatalitySeries}
              yLabel="Deaths"
              source={{
                name: 'Home Office',
                dataset: 'Fire and rescue incident statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office — Fire statistics data tables. Annual publications covering incidents, fatalities, response times, workforce, and prevention activity. gov.uk/government/statistical-data-sets/fire-statistics-data-tables</p>
            <p>HMICFRS — Fire and rescue service inspections. Annual assessments of effectiveness, efficiency, and people management. justiceinspectorates.gov.uk/hmicfrs/fire-and-rescue-services/</p>
            <p>Workforce figures are full-time equivalent firefighters employed by fire and rescue authorities in England. Excludes fire control staff, support staff, and retained (on-call) firefighters unless otherwise stated. Response times are the average interval from 999 call to first appliance arrival at primary dwelling fires. Fatality figures are fire-related deaths recorded in Home Office incident returns; the 2017 figure includes 72 Grenfell Tower deaths. Home fire safety visit data covers visits conducted by fire and rescue services under their community fire safety programmes. COVID-19 restrictions significantly reduced visit volumes in 2020/21.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
