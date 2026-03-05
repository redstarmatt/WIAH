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
            <p>The right to a fair trial includes the right to understand proceedings and to participate fully in one&apos;s own defence. For defendants, witnesses, and victims who do not speak English fluently, court interpreter services are not a convenience — they are a legal necessity. When an interpreter fails to appear, hearings are adjourned, defendants may be held in custody for longer than necessary, victims face further delay, and the substantial cost of a court day is wasted. In 2023, there were 10,200 recorded interpreter booking failures in Crown and magistrates courts in England and Wales.</p>
            <p>The current court interpreter framework has been unstable since 2012, when the Ministry of Justice outsourced interpretation services to a single contractor under a framework agreement. The initial rollout was widely criticised: the National Audit Office found that in the first six months of the new contract, 34% of bookings were not fulfilled on time. Subsequent contract revisions and additional suppliers improved performance, but the system has never fully recovered public confidence. A fragmented market of agencies, freelance interpreters, and quality-varying providers now supplies the courts, with oversight that critics argue is inadequate.</p>
            <p>The languages most commonly required in UK courts reflect immigration and asylum flows: Polish, Romanian, Kurdish, Albanian, and Arabic feature prominently alongside the established demand for languages such as Punjabi, Urdu, and Somali. Supply of qualified interpreters in some languages is genuinely scarce. National Occupational Standards for interpreters exist but are not universally applied, and the pay rates offered by framework contracts have reportedly deterred qualified interpreters from court work in favour of better-paid private sector assignments.</p>
            <p>Each failed hearing has a direct cost to the justice system. A day in the Crown Court costs in the region of £10,000 when judicial, legal, and estate costs are included. Even for magistrates court hearings, the cost of adjournment runs to hundreds of pounds. The NAO has estimated that interpreter failures cost the system in excess of £50 million annually when direct and indirect costs are aggregated. Beyond financial cost, delays deepen backlogs that the court system has struggled to address since the COVID-19 pandemic.</p>
            <p>Technology-assisted interpretation — remote interpreting via video link — has been trialled and partially adopted. HMCTS has expanded its use of remote hearings following the pandemic, and some interpretation is now delivered remotely, reducing the geography constraint that makes it difficult to find a qualified interpreter willing to travel to smaller courts. Remote interpretation introduces its own quality concerns, particularly for complex hearings where nuance, tone, and body language matter. The judiciary has been cautious about expanding it for criminal cases. Full-scale reform of the interpreter procurement framework has been repeatedly deferred despite sustained criticism.</p>
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
