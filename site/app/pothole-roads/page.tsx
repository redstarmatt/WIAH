'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PotholeData {
  national: {
    maintenanceBacklog: Array<{ year: number; billionGBP: number }>
    potholesFilled: Array<{ year: number; millions: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function PotholeRoadsPage() {
  const [data, setData] = useState<PotholeData | null>(null)

  useEffect(() => {
    fetch('/data/pothole-roads/pothole_roads.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const backlogSeries: Series[] = data
    ? [{
        id: 'backlog',
        label: 'Road maintenance backlog',
        colour: '#F4A261',
        data: data.national.maintenanceBacklog.map(d => ({ date: yearToDate(d.year), value: d.billionGBP })),
      }]
    : []

  const filledSeries: Series[] = data
    ? [{
        id: 'filled',
        label: 'Potholes filled per year',
        colour: '#264653',
        data: data.national.potholesFilled.map(d => ({ date: yearToDate(d.year), value: d.millions })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Pothole Roads" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pothole Roads"
          question="Are Britain&apos;s Roads Actually Falling Apart?"
          finding="The local road maintenance backlog has reached &pound;16.3 billion, up 63% from 2015. Councils filled around 2.1 million potholes in 2024, but the rate of new damage continues to outpace repairs."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The local road maintenance backlog in England reached &pound;16.3 billion in 2024, up from &pound;10 billion in 2015, according to the Asphalt Industry Alliance ALARM survey. The average road surface is now resurfaced only once every 77 years against a recommended lifecycle of 10&ndash;20 years. Local authority highway maintenance spending fell 22% in real terms between 2010/11 and 2022/23, from &pound;4.7 billion to &pound;3.7 billion, while vehicle-miles rose 8% and extreme weather &mdash; freeze-thaw cycles and wet winters &mdash; accelerated surface failure. The RAC recorded 29,377 breakdown callouts from pothole damage in 2023, the highest since tracking began, at an average repair cost of &pound;290 per incident. The government announced &pound;8.3 billion in additional maintenance funding from the cancelled HS2 northern leg, but the LGA argues this covers less than a quarter of the backlog, and 54% of council spending already goes on reactive emergency repairs rather than planned resurfacing.</p>
            <p>Road condition varies sharply by region and by who uses the road. London boroughs report 16% of their network below acceptable standard, with the North East (14%) and North West (13%) close behind. Rural authorities maintain longer networks with fewer resources per mile. Cyclists are disproportionately affected: damaged road edges and poor surfaces are cited as the primary safety concern by 71% of riders in British Cycling&apos;s 2024 survey. Scotland&apos;s equivalent backlog was estimated at &pound;1.7 billion; Wales and Northern Ireland face similar pressures, with rural roads in particularly poor condition.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-backlog', label: 'Backlog' },
          { id: 'sec-filled', label: 'Repairs' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Road maintenance backlog"
              value="&pound;16.3bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 63% from &pound;10bn in 2015"
              sparklineData={[10, 10.5, 11.2, 11.8, 12.3, 12.7, 13.2, 14, 14.8, 16.3]}
              source="ALARM Survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="RAC pothole breakdowns (2023)"
              value="29,377"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest since tracking began in 2006; avg repair cost &pound;290"
              sparklineData={[18200, 19100, 21300, 23400, 24800, 26100, 27900, 29377]}
              source="RAC Pothole Index"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average road resurfacing cycle"
              value="77"
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText="Recommended lifecycle: 10&ndash;20 years"
              sparklineData={[44, 48, 53, 58, 63, 68, 72, 77]}
              source="ALARM Survey 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Local road maintenance backlog, England, 2015&ndash;2024"
              subtitle="Estimated one-time cost (&pound;bn) to bring all local roads to acceptable standard. Asphalt Industry Alliance ALARM survey."
              series={backlogSeries}
              yLabel="&pound; billion"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-filled" className="mb-12">
            <LineChart
              title="Potholes filled per year, England, 2015&ndash;2024"
              subtitle="Millions of pothole repairs completed by local highway authorities annually."
              series={filledSeries}
              yLabel="Millions filled"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
