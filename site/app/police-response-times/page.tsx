'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface Call999Row {
  year: number
  avgAnswerSeconds: number
  pctWithin10s: number
}

interface Grade1Row {
  year: number
  medianMinutes: number
  pctTargetMet: number
}

interface PcsoRow {
  year: number
  pcsoCount: number
}

interface PoliceResponseData {
  topic: string
  lastUpdated: string
  timeSeries999: Call999Row[]
  timeSeriesGrade1: Grade1Row[]
  timeSeriesPCSO: PcsoRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PoliceResponseTimesPage() {
  const [data, setData] = useState<PoliceResponseData | null>(null)

  useEffect(() => {
    fetch('/data/police-response-times/police_response_times.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const call999Series: Series[] = data
    ? [
        {
          id: 'avgAnswerSeconds',
          label: 'Average 999 answer time (seconds)',
          colour: '#E63946',
          data: data.timeSeries999.map(d => ({
            date: yearToDate(d.year),
            value: d.avgAnswerSeconds,
          })),
        },
      ]
    : []

  const grade1Series: Series[] = data
    ? [
        {
          id: 'pctTargetMet',
          label: 'Grade 1 target met (%)',
          colour: '#E63946',
          data: data.timeSeriesGrade1.map(d => ({
            date: yearToDate(d.year),
            value: d.pctTargetMet,
          })),
        },
      ]
    : []

  const pcsoSeries: Series[] = data
    ? [
        {
          id: 'pcsoCount',
          label: 'PCSO headcount (FTE)',
          colour: '#264653',
          data: data.timeSeriesPCSO.map(d => ({
            date: yearToDate(d.year),
            value: d.pcsoCount,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Police Response Times" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Will the Police Actually Come?"
          finding="The 999 call answer target of 10 seconds has been missed in 14 of the last 24 months, Grade 1 emergency response targets are met just 85% of the time — down from 92% — and neighbourhood policing has lost 8,500 PCSOs since 2010."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 999 service-level target — answer within 10 seconds — has been missed in 14 of the last 24 reporting months. Average answer times have drifted above 13 seconds nationally, with some forces recording waits of over 20 seconds during peak periods. The 101 non-emergency line is worse: average waits now exceed 7 minutes, and in several forces callers routinely abandon before connection. Demand has not simply risen — it has shifted. Total police-recorded crime has fallen modestly since 2015, but the composition has changed dramatically. Domestic abuse referrals have surged as reporting barriers have lowered. Online fraud and cybercrime now account for a substantial share of offending. Mental health-related calls consume a growing proportion of patrol capacity, with officers frequently waiting hours at A&amp;E with detained individuals. Each of these categories demands more investigative time per incident than the volume acquisitive crime they have partially displaced, meaning that falling headline numbers mask rising operational pressure.</p>
            <p>Neighbourhood policing — the visible, relationship-based presence that underpins public confidence — has been hollowed out. England and Wales have lost over 8,500 Police Community Support Officers since 2010, a reduction of roughly half the total. The 20,000-officer uplift programme restored some sworn officer numbers, but the new recruits overwhelmingly filled response and investigation roles, not neighbourhood beats. Grade 1 emergency responses — the blue-light calls where life is at risk — are now met within target approximately 85% of the time, down from 92% a decade ago. Grade 2 priority responses, where attendance is expected within an hour, are frequently delayed well beyond that window. Some forces have adopted explicit policies of non-attendance for categories of crime judged low-harm, including some thefts, criminal damage, and vehicle offences. Public confidence in policing has fallen to its lowest recorded level in the Crime Survey for England and Wales, with satisfaction particularly low among younger adults and ethnic minority communities. The Peelian principle — policing by consent — depends on a contract of responsiveness that is under visible strain.</p>
          </div>
        </section>

        <div className="max-w-2xl mb-10 px-4 py-4 border-l-4 border-wiah-green bg-green-50 rounded-r">
          <p className="text-sm font-semibold text-wiah-green mb-1">Positive development</p>
          <p className="text-sm text-wiah-black leading-relaxed"><strong>Right Care, Right Person</strong> — police forces are partnering with NHS mental health teams to attend mental health crises jointly. Early results from Humberside show a 9% reduction in mental-health-related police deployments with better outcomes for patients.</p>
        </div>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-999', label: '999 Calls' },
          { id: 'sec-grade1', label: 'Grade 1 Response' },
          { id: 'sec-pcso', label: 'PCSO Numbers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="999 answer time"
              value="13.5s"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="target: 10s · missed 14 of last 24 months"
              sparklineData={[8.2, 8.5, 9.1, 9.8, 10.4, 11.7, 12.3, 13.1, 14.2, 13.8, 13.5]}
              href="#sec-999"
              source="Home Office · 999 Call Handling Statistics 2025"
            />
            <MetricCard
              label="Grade 1 target met"
              value="84.6%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="was 92.1% in 2015 · 15-min urban target"
              sparklineData={[92.1, 91.4, 90.2, 88.7, 87.1, 88.0, 86.3, 85.8, 84.9, 84.6]}
              href="#sec-grade1"
              source="HMICFRS · PEEL Assessments 2024"
            />
            <MetricCard
              label="PCSOs in post"
              value="8,387"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-8,531 since 2010 · neighbourhood policing gutted"
              sparklineData={[16918, 15820, 14393, 13066, 12331, 11904, 10943, 10213, 9547, 9284, 9114, 8810, 8672, 8491, 8387]}
              href="#sec-pcso"
              source="Home Office · Police Workforce Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-999" className="mb-12">
            <LineChart
              title="999 call answer performance, 2015–2025"
              subtitle="Average time to answer 999 calls, England and Wales. Seconds. 10-second service-level target."
              series={call999Series}
              yLabel="Seconds"
              targetLine={{ value: 10, label: 'Target: 10s' }}
              source={{
                name: 'Home Office',
                dataset: '999 Call Handling Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-grade1" className="mb-12">
            <LineChart
              title="Grade 1 emergency response — target met, 2015–2024"
              subtitle="Percentage of Grade 1 (immediate/emergency) responses arriving within target time. England and Wales."
              series={grade1Series}
              yLabel="% target met"
              source={{
                name: 'HMICFRS',
                dataset: 'PEEL Assessments',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pcso" className="mb-12">
            <LineChart
              title="Police Community Support Officers, 2010–2024"
              subtitle="PCSO headcount (FTE), England and Wales. Measured at 31 March each year."
              series={pcsoSeries}
              yLabel="PCSOs (FTE)"
              source={{
                name: 'Home Office',
                dataset: 'Police Workforce Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office — 999 Call Handling Statistics. Measures time from BT operator connection to force control room answer. Annual publication. gov.uk/government/collections/999-call-handling-statistics</p>
            <p>HMICFRS — PEEL Assessments (Police Effectiveness, Efficiency and Legitimacy). Grade 1 response data drawn from force-level inspection reports. Targets: 15 minutes urban, 20 minutes rural. hmicfrs.justiceinspectorates.gov.uk/peel-assessments</p>
            <p>Home Office — Police Workforce Statistics. PCSO headcount measured as full-time equivalent at 31 March each year. Includes both centrally and locally funded PCSOs. gov.uk/government/collections/police-workforce-england-and-wales</p>
            <p>Grade 1 response time definitions vary between forces — some measure from dispatch, others from call receipt. 999 methodology changed in 2020 to include abandoned calls in wait time calculations. National figures are blended across urban and rural force areas.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}