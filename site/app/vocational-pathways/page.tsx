'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface VocationalPathwaysRow {
  year: number
  vocEarningsPremiumVsALevel?: number
  btecCompletionRatePct?: number
  employerSatisfiedPct?: number
}

interface VocationalPathwaysData {
  topic: string
  lastUpdated: string
  timeSeries: VocationalPathwaysRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function VocationalPathwaysPage() {
  const [data, setData] = useState<VocationalPathwaysData | null>(null)

  useEffect(() => {
    fetch('/data/vocational-pathways/vocational_pathways.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const earningsGapSeries: Series[] = data
    ? [
        {
          id: 'earningsGap',
          label: 'Earnings gap vs A-level (£/yr)',
          colour: '#264653',
          data: data.timeSeries
            .filter(d => d.vocEarningsPremiumVsALevel !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.vocEarningsPremiumVsALevel!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Vocational Pathways" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Vocational Pathways"
          question="Does Vocational Training Work for Young People?"
          finding="Young people on vocational routes earn £4,200 less than those with equivalent A-levels — a gap that fuels the perceived hierarchy between academic and technical education."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's vocational education system has long promised parity with academic routes — yet the earnings data tells a different story. Young people who complete BTEC or equivalent level 3 vocational qualifications earn on average £4,200 less per year than peers who studied A-levels and entered similar occupations, a gap that has widened steadily since 2015. BTEC completion rates fell from 72% in 2015 to 68% in 2023, partly driven by the per-pupil funding gap between FE colleges and schools of around £3,000 per 16–18-year-old per year. Employer satisfaction with vocational leavers fell from 58% to 54% over the same period, reflecting a genuine mismatch between what qualifications test and what workplaces require. The apprenticeship levy, reformed in 2017, has shifted funding towards degree apprenticeships and management training for existing employees rather than Level 2 and 3 routes for school leavers; under-19 starts fell from over 350,000 a decade ago to fewer than 200,000 in 2023.</p>
            <p>The consequences are generational and regressive. Young people from lower-income households are significantly more likely to take vocational routes, so the earnings disadvantage maps directly onto existing inequality. A system that consistently undervalues technical skills also perpetuates the shortages in construction, engineering, healthcare, and digital that constrain growth. The evidence base for solutions is strong — structured industry placements, employer-led qualification design, FE funding parity — but chronic underfunding of colleges and consistent political prioritisation of academic routes have prevented sustained reform.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Earnings Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Earnings gap vs A-levels"
              value="-£4,200/yr"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="worsening · structural undervaluation of vocational routes"
              sparklineData={[-3800, -3900, -4000, -4000, -4100, -4000, -4100, -4200, -4200]}
              href="#sec-chart"source="DfE · Longitudinal Education Outcomes 2023"
            />
            <MetricCard
              label="BTEC completion rate"
              value="68%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="declining from 72% · funding cuts bite"
              sparklineData={[72, 71, 71, 70, 70, 69, 69, 68, 68]}
              href="#sec-chart"source="DfE · 16-18 Qualifications 2023"
            />
            <MetricCard
              label="Employer satisfaction"
              value="54%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="below half satisfied with vocational leavers · skills mismatch"
              sparklineData={[58, 57, 57, 56, 56, 55, 55, 54, 54]}
              href="#sec-chart"source="CBI · Education &amp; Skills Survey 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Earnings gap: vocational vs A-level routes, 2015–2023"
              subtitle="Annual earnings difference (negative = vocational earns less). England, level 3 qualifications, age 25-29."
              series={earningsGapSeries}
              yLabel="Earnings gap (£/yr)"
              source={{
                name: 'Department for Education',
                dataset: 'Longitudinal Education Outcomes',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Education — Longitudinal Education Outcomes (LEO). Tracks earnings of qualification completers via HMRC data. Published annually. explore-education-statistics.service.gov.uk</p>
            <p>DfE — 16-18 Qualifications Achieved. Annual attainment data for vocational qualifications by type and awarding body. explore-education-statistics.service.gov.uk</p>
            <p>CBI — Education and Skills Survey. Annual employer survey on satisfaction with school and college leavers. cbi.org.uk</p>
            <p>Earnings gap calculated as median annual earnings at age 25-29 for level 3 vocational completers minus median earnings for A-level completers entering comparable occupation groups, controlling for prior attainment. Figures are in nominal terms; the real gap has grown more slowly but remains substantial.</p>
          </div>
        </section>
      </main>
    </>
  )
}
