'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface CourtInterpreterServicesData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    bookingFailures: number
    delayedCasesPct: number
    avgCostPerFailure: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CourtInterpreterServicesPage() {
  const [data, setData] = useState<CourtInterpreterServicesData | null>(null)

  useEffect(() => {
    fetch('/data/court-interpreter-services/court_interpreter_services.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const interpreterSeries: Series[] = data
    ? [
        {
          id: 'bookingFailures',
          label: 'Interpreter booking failures',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bookingFailures,
          })),
        },
        {
          id: 'delayedCases',
          label: 'Cases delayed by interpreter issues (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.delayedCasesPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Court Interpreter Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Court Interpreter Services"
          question="How reliable are court interpreter services?"
          finding="There were 10,200 interpreter booking failures in Crown and magistrates courts in 2023, causing delays to justice."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2023 there were 10,200 recorded interpreter booking failures in Crown and magistrates courts in England and Wales, with 8% of hearings requiring an interpreter delayed or adjourned as a result. The Ministry of Justice outsourced interpretation to a single contractor in 2012; the NAO found 34% of bookings were not fulfilled on time in the first six months, and the fragmented market of agencies and freelance interpreters that replaced the original framework has never fully recovered public confidence. Pay rates offered by framework contracts have deterred qualified interpreters, and supply in high-demand languages &mdash; Kurdish, Albanian, Arabic, Somali &mdash; is genuinely scarce. The NAO estimates interpreter failures cost the system over &pound;50 million annually in direct and indirect costs.</p>
            <p>Each failed hearing delays justice for defendants, victims, and witnesses &mdash; some of whom are already in custody or in acute distress. A Crown Court day costs approximately &pound;10,000; adjournments compound existing backlogs that built up through the COVID-19 pandemic and have not been cleared. Remote interpretation via video link has been partially adopted but raises quality concerns in complex criminal hearings. Reform of the procurement framework has been repeatedly deferred despite sustained criticism from the judiciary, practitioners, and Parliament.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Interpreter Failures' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Interpreter booking failures (2023)"
              value="10,200"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Rising after COVID-period lull"
              sparklineData={[14200, 13100, 12400, 11800, 11200, 8400, 9100, 9700, 10200]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; HMCTS interpreter services data"
            />
            <MetricCard
              label="Cases delayed by interpreter issues"
              value="8%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Of hearings requiring an interpreter"
              sparklineData={[11, 10, 9, 9, 9, 7, 7, 8, 8]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; HMCTS interpreter services data"
            />
            <MetricCard
              label="Average cost per failed hearing"
              value="£1,250"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from £980 in 2015"
              sparklineData={[980, 1000, 1020, 1050, 1080, 1100, 1130, 1180, 1250]}
              onExpand={() => {}}
              source="National Audit Office &middot; Language services in the justice system"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Court interpreter failures, 2015&ndash;2024"
              subtitle="Annual interpreter booking failures and proportion of cases delayed by interpreter unavailability."
              series={interpreterSeries}
              yLabel="Failures / % delayed"
              source={{
                name: 'Ministry of Justice',
                dataset: 'HMCTS interpreter services data; NAO reports',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice &mdash; HMCTS interpreter services data. gov.uk/government/organisations/hm-courts-and-tribunals-service</p>
            <p>National Audit Office &mdash; Language services in the justice system. nao.org.uk</p>
            <p>Judiciary statistics &mdash; Published quarterly. gov.uk/government/collections/court-statistics-quarterly</p>
            <p>Booking failure is defined as a requested interpreter not provided at the time required. Delayed cases are hearings adjourned or delayed directly due to interpreter unavailability, as a proportion of all hearings requiring interpretation. Cost per failure is an NAO-derived estimate including court time, legal representation, and rescheduling costs. 2020 figures reduced due to COVID-19 court closures.</p>
          </div>
        </section>
      </main>
    </>
  )
}
