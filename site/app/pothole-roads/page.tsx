'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

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
          question="Are Britain's Roads Actually Falling Apart?"
          finding="The local road maintenance backlog has reached £16.3 billion, up 63% from 2015. Councils filled around 2.1 million potholes in 2024, but the rate of new damage continues to outpace repairs."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's local road network stretches approximately 188,000 miles — around 97% of all roads — and is maintained by 153 local highway authorities. The Annual Local Authority Road Maintenance (ALARM) survey, conducted by the Asphalt Industry Alliance, estimated the one-time cost to bring all local roads up to a reasonable standard at £16.3 billion in 2024, up from £10 billion in 2015. The survey found that the average road surface is resurfaced only once every 77 years against a recommended lifecycle of 10–20 years. The RAC reported 29,377 breakdowns caused by pothole damage in 2023 — the highest number since it began tracking in 2006 — with an average repair cost to motorists of £290 per incident.</p>
            <p>The situation has deteriorated significantly over the past decade. Local authority highway maintenance spending in England fell 22% in real terms between 2010/11 and 2022/23, from £4.7 billion to £3.7 billion, according to the National Audit Office. During the same period, total vehicle-miles on local roads increased 8%, and extreme weather events — particularly freeze-thaw cycles — have become more frequent and damaging. The winter of 2023/24 was the sixth-wettest on record, accelerating road surface failure across much of England. Councils reported that the pothole repair cycle has become increasingly reactive, with 54% of spending going on emergency repairs rather than planned resurfacing that addresses underlying structural failure.</p>
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
              value="£16.3bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 63% from £10bn in 2015"
              sparklineData={[10, 10.5, 11.2, 11.8, 12.3, 12.7, 13.2, 14, 14.8, 16.3]}
              source="ALARM Survey 2024"
              href="#sec-backlog"
            />
            <MetricCard
              label="RAC pothole breakdowns (2023)"
              value="29,377"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest since tracking began in 2006; avg repair cost £290"
              sparklineData={[18200, 19100, 21300, 23400, 24800, 26100, 27900, 29377]}
              source="RAC Pothole Index"
              href="#sec-backlog"
            />
            <MetricCard
              label="Average road resurfacing cycle"
              value="77"
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText="Recommended lifecycle: 10–20 years"
              sparklineData={[44, 48, 53, 58, 63, 68, 72, 77]}
              source="ALARM Survey 2024"
              href="#sec-backlog"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Local road maintenance backlog, England, 2015–2024"
              subtitle="Estimated one-time cost (£bn) to bring all local roads to acceptable standard. Asphalt Industry Alliance ALARM survey."
              series={backlogSeries}
              yLabel="£ billion"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-filled" className="mb-12">
            <LineChart
              title="Potholes filled per year, England, 2015–2024"
              subtitle="Millions of pothole repairs completed by local highway authorities annually."
              series={filledSeries}
              yLabel="Millions filled"
            />
          </section>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  )
}
