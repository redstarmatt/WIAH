'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface RedundancyRatesData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    notificationsK: number
    redundancyRatePer1000: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function RedundancyRatesPage() {
  const [data, setData] = useState<RedundancyRatesData | null>(null)

  useEffect(() => {
    fetch('/data/redundancy-rates/redundancy_rates.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'notifications',
          label: 'Redundancy notifications (thousands)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.notificationsK })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Redundancy Rates" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Redundancy Rates"
          question="How Many Jobs Are Being Cut?"
          finding="Redundancy notifications hit 175,000 in 2024, rising sharply after April's National Insurance change, with retail and hospitality leading losses."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Redundancy rates in the UK are measured through two main series: notifications made to the government under the collective redundancy regime (where employers proposing 20 or more redundancies must notify the Insolvency Service 30 or 45 days in advance) and the ONS Labour Force Survey measure of people leaving employment through redundancy. Both series captured a sharp rise in 2024 following the announcement in October 2023 and implementation in April 2024 of the increase in employer National Insurance contributions, combined with a significant rise in the National Living Wage. Collective redundancy notifications for 2024 totalled approximately 175,000 proposed job losses, the highest level since the pandemic.</p>
            <p>The sectoral distribution of 2024 redundancies is instructive. Retail and hospitality — the two sectors most exposed to the combination of rising employer NIC costs, higher minimum wage floors, and post-pandemic structural shifts in consumer behaviour — account for approximately 31% of all collective redundancy notifications. These are sectors with thin margins, high labour intensity, and limited ability to absorb cost increases through productivity gains or price rises. The retail landscape has been in structural adjustment for over a decade as online commerce substitutes for physical store networks, and higher employment costs have accelerated site closure decisions that were already in progress.</p>
            <p>Redundancy is not evenly distributed geographically. Areas with higher concentrations of labour-intensive manufacturing, retail, and hospitality are more exposed. Northern England, the Midlands, and parts of coastal communities — where these sectors form a larger share of local employment — see higher redundancy rates per capita than London and the South East, where the economy is more oriented toward services and professional work. This geography of redundancy interacts with local labour market resilience: in areas with diverse, high-demand employment, displaced workers are reabsorbed relatively quickly. In areas with limited alternative employment, redundancy translates more directly into long-term worklessness.</p>
            <p>The relationship between redundancies and unemployment in the current cycle is complicated by the high level of economic inactivity in the UK workforce. Following the pandemic, approximately 600,000 more people are economically inactive than pre-pandemic trends would predict, concentrated among older workers and those with long-term health conditions. Some workers made redundant are re-entering a category of inactivity rather than moving into unemployment, which means headline unemployment figures understate the true degree of labour market slack. This has policy implications: an unemployment-focused policy response may miss the structural problem of people who have left the labour market entirely.</p>
            <p>The government&apos;s response to the rising redundancy notifications in 2024 included announcements of expanded Rapid Response Service provision — job centres&apos; capacity to provide immediate outplacement support to workers notified of redundancy — and consultation on strengthening protective award processes for workers whose employers do not comply with collective consultation requirements. The 2024 Employment Rights Bill&apos;s provisions on day-one dismissal protections and enhanced consultation rights were designed partly to raise the cost of mass redundancy as a business strategy. However, critics noted that these provisions, combined with the employer NIC rises that themselves contributed to the redundancy surge, created a complex and potentially contradictory set of incentives for employers navigating difficult trading conditions.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Redundancy Notifications' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Collective redundancy notifications 2024"
              value="175,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+45k on 2023 · highest since pandemic"
              sparklineData={[70, 75, 72, 80, 85, 130, 82, 88, 175]}
              onExpand={() => {}}
              source="Insolvency Service · HR1 Notifications 2024"
            />
            <MetricCard
              label="Redundancy rate per 1,000 employees"
              value="4.1"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+1.2 since 2023 · approaching 2020 levels"
              sparklineData={[3.2, 3.1, 3.0, 3.3, 3.4, 5.1, 2.9, 2.9, 4.1]}
              onExpand={() => {}}
              source="ONS · Labour Force Survey 2024"
            />
            <MetricCard
              label="Retail &amp; hospitality share"
              value="31%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="31% of all 2024 notifications in two sectors"
              sparklineData={[21, 22, 22, 23, 24, 28, 22, 23, 31]}
              onExpand={() => {}}
              source="Insolvency Service · HR1 Notifications 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Collective redundancy notifications, 2016–2024"
              subtitle="Proposed job losses in collective redundancy notifications submitted to the Insolvency Service."
              series={series}
              yLabel="Proposed jobs lost (thousands)"
              source={{
                name: 'Insolvency Service',
                dataset: 'HR1 Collective Redundancy Notifications',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Insolvency Service — HR1 Collective Redundancy Notifications 2024. Published quarterly. gov.uk/government/statistical-data-sets/redundancies-notified-to-the-insolvency-service</p>
            <p>ONS — Labour Force Survey 2024. Published quarterly. ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket</p>
            <p>Notification figures are total proposed redundancies from HR1 forms submitted by employers proposing 20 or more redundancies. Not all proposed redundancies result in actual job losses. Redundancy rate is LFS-measured redundancies per 1,000 employees, seasonally adjusted, annual average. Sector share is proportion of 2024 HR1 notifications by industry classification.</p>
          </div>
        </section>
      </main>
    </>
  )
}
