'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  fundingPerStudentReal: number
  collegesInDifficultyPct?: number
}

interface FeCollegeFundingData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FeCollegeFundingPage() {
  const [data, setData] = useState<FeCollegeFundingData | null>(null)

  useEffect(() => {
    fetch('/data/fe-college-funding/fe_college_funding.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const fundingSeries: Series[] = data
    ? [{
        id: 'funding',
        label: 'Real funding per FE student (£)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.fundingPerStudentReal,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are Further Education Colleges Being Starved of Cash?"
          finding="Funding per further education student has fallen 28% in real terms since 2010 &mdash; and 22% of colleges are in financial difficulty."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Further education colleges educate 1.6 million students annually, train apprentices, and deliver the vocational qualifications that engineers, electricians, and care workers depend on &mdash; yet real funding per FE student has fallen 28% since 2010, from approximately &pound;5,400 to &pound;3,900 in 2023. The contrast with higher education is stark: university funding per student rose over the same period following the 2012 tuition fee reforms, while the adult skills budget was cut by a third. The consequence is that 22% of colleges are now rated as in financial difficulty by the Education and Skills Funding Agency &mdash; up from 8% in 2010 &mdash; with some forced into mergers that reduce local choice, particularly in rural areas with a single provider. FE teacher pay has fallen well behind school teacher pay and even further behind the private sector wages available to people with specialist vocational expertise, producing shortages of lecturers in construction, digital, and care &mdash; the sectors where skills gaps are most acute.</p>
            <p>These differentials are not based on any principled analysis of cost or need; they reflect the relative political salience of different education sectors. The students who depend on FE colleges are disproportionately from lower-income backgrounds, returning to education after gaps, or seeking skills rather than credentials &mdash; groups with less political voice than university students. The government&apos;s Skills England agenda, launched in 2024, commits to reforming technical qualifications, but the history of FE reform is one of promising initiatives that have not translated into sustained per-student funding uplift. Until parity with school and higher education funding is achieved, structural disadvantage for 1.6 million students will persist.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Funding Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Funding per FE student"
              value="&pound;3,900"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-28% real since 2010 &middot; well below HE funding"
              sparklineData={[5400, 5100, 4700, 4400, 4100, 4050, 4100, 4050, 4000, 3900]}
              href="#sec-chart"source="ESFA &middot; FE Funding Allocations 2024"
            />
            <MetricCard
              label="Colleges in financial difficulty"
              value="22%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from 8% in 2010 &middot; merger pressure"
              sparklineData={[8, 10, 12, 13, 14, 16, 18, 20, 21, 22]}
              href="#sec-chart"source="ESFA &middot; College Financial Health 2024"
            />
            <MetricCard
              label="Adult skills budget"
              value="-35%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="adult education budget cut by a third since 2010"
              sparklineData={[100, 92, 83, 76, 71, 70, 70, 68, 66, 65]}
              href="#sec-chart"source="AELP &middot; Adult Education Budget Analysis 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Real funding per further education student, England, 2010&ndash;2023"
              subtitle="Funding in constant 2023 prices. Includes 16&ndash;18 and adult funding streams. Real terms cut of 28% since 2010."
              series={fundingSeries}
              yLabel="Funding per student (£, real)"
              source={{
                name: 'ESFA / AoC',
                dataset: 'FE Funding Allocations',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Education and Skills Funding Agency &mdash; FE Funding Allocations. Annual funding statements. gov.uk/government/collections/fe-college-financial-health-and-intervention</p>
            <p>Association of Colleges &mdash; College Key Facts. Annual sector survey. aoc.co.uk/about-colleges/research-and-stats/college-key-facts</p>
            <p>AELP &mdash; Adult Education Budget Analysis. aelp.org.uk</p>
            <p>Real terms funding deflated using HM Treasury GDP deflator series. Per-student funding calculated by dividing total ESFA allocation to FE colleges by total FE student enrolments (16&ndash;18 and adult). Excludes higher education provision within FE colleges and apprenticeship funding.</p>
          </div>
        </section>
      </main>
    </>
  )
}
