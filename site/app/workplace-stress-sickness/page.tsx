'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  daysLostMillions: number
  pctWorkforceAffected: number
}

interface WorkplaceStressData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function WorkplaceStressSicknessPage() {
  const [data, setData] = useState<WorkplaceStressData | null>(null)

  useEffect(() => {
    fetch('/data/workplace-stress-sickness/workplace_stress_sickness.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const daysLostSeries: Series[] = data
    ? [
        {
          id: 'dayslost',
          label: 'Working days lost to stress (millions)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.daysLostMillions })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Workplace Stress" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Workplace Stress"
          question="Is Stress Breaking the Workforce?"
          finding="Work-related stress and mental ill-health now account for over 17 million lost working days a year — more than any other cause of workplace absence."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Work-related stress, depression, and anxiety now account for 17.1 million lost working days per year in Great Britain — the single largest cause of occupational ill health and absence, and a 73% increase since 2015 when 9.9 million days were lost. The trend predates COVID and has not reversed: 2023 matched the elevated levels of 2022, suggesting the post-pandemic peak has become the new baseline. Healthcare, education, and public administration are the worst-affected sectors, where the causes are well-documented: chronic understaffing, lack of control over working conditions, and exposure to traumatic or emotionally demanding situations. The NHS workforce crisis and the teacher recruitment emergency both have workplace stress as a central driver and consequence. The HSE estimates the economic cost at approximately £28 billion per year in lost productivity, staff turnover, and healthcare expenditure.</p>
            <p>Employer responses have been uneven and largely inadequate. Large employers have adopted Employee Assistance Programmes, mental health first aiders, and wellbeing apps — interventions with a weak evidence base that address symptoms rather than causes: a mental health first aider cannot compensate for chronic understaffing. The HSE's Management Standards framework is voluntary and unenforced, meaning the employers most likely to apply it are those already managing stress effectively. HSE inspection capacity has declined significantly over the past decade, and the rise of remote working, always-on communications, and gig economy arrangements has created new stressors that existing health and safety regulation was not designed to address.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Days Lost' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Working days lost to stress"
              value="17.1m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Highest non-COVID cause · up 73% since 2015"
              sparklineData={[9.9, 11.7, 12.5, 15.4, 17.9, 16.3, 18.0, 17.1, 17.1]}
              href="#sec-chart"source="HSE · Work-related Stress Statistics 2023"
            />
            <MetricCard
              label="% workforce affected"
              value="5.6%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 18 workers · public sector highest"
              sparklineData={[3.7, 4.2, 4.5, 5.4, 6.0, 5.6, 6.1, 5.9, 5.6]}
              href="#sec-chart"source="HSE · Work-related Stress Statistics 2023"
            />
            <MetricCard
              label="Economic cost"
              value="£28bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Lost productivity annually · HSE estimate"
              sparklineData={[16, 18, 20, 23, 26, 24, 27, 27, 28]}
              href="#sec-chart"source="HSE · Cost to Britain 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Working days lost to work-related stress, 2015–2023"
              subtitle="Estimated working days lost due to work-related stress, depression or anxiety. Great Britain. Millions of days."
              series={daysLostSeries}
              yLabel="Days lost (millions)"
              annotations={[
                { date: new Date(2020, 0, 1), label: '2020: COVID-19' },
              ]}
              source={{
                name: 'Health and Safety Executive',
                dataset: 'Work-related Stress, Depression or Anxiety Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Health and Safety Executive — Work-related Stress, Depression or Anxiety Statistics in Great Britain. Published annually. hse.gov.uk/statistics/causdis/stress.pdf</p>
            <p>Labour Force Survey (LFS) — Self-reported work-related illness. ONS. ons.gov.uk/surveys/informationforhouseholdsandindividuals/labourforcesurvey</p>
            <p>Data derived from the Labour Force Survey self-reported module. Figures cover cases where the worker believed their condition was caused or made worse by their work. Days lost are estimated from average absence durations. Data covers Great Britain; Northern Ireland reported separately.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
