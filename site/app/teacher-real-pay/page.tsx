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

interface TimeSeriesPoint {
  year: number
  startingSalaryReal: number
  experiencedSalaryReal: number
}

interface TeacherRealPayData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function TeacherRealPayPage() {
  const [data, setData] = useState<TeacherRealPayData | null>(null)

  useEffect(() => {
    fetch('/data/teacher-real-pay/teacher_real_pay.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const paySeries: Series[] = data
    ? [
        {
          id: 'experienced',
          label: 'Experienced teacher salary (real, £)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.experiencedSalaryReal,
          })),
        },
        {
          id: 'starting',
          label: 'Starting salary (real, £)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.startingSalaryReal,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Have Teachers Had a Real Pay Cut?"
          finding="Teacher salaries have fallen 9% in real terms since 2010, making Britain an increasingly unattractive place to enter the profession."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Between 2010 and 2023, experienced teacher pay fell approximately 9% in real terms — while the median graduate salary across all professions rose, creating an 18% gap. England ranked 21st of 28 OECD countries for teacher pay relative to other graduates in 2023, below the OECD average and falling. ITT recruitment targets have been missed consistently since 2016 in maths, physics, computing, chemistry, and modern foreign languages — precisely the subjects where private sector alternatives pay most. A 5.5% pay award in 2024 acknowledged the trajectory was unsustainable, but STRB analysis suggests an additional 10–15% real-terms increase is needed over five years simply to return to 2010 levels.</p>
            <p>The consequences fall hardest on pupils in shortage subjects and deprived areas. Schools facing vacancies reach for supply teachers, merge classes, or reduce options — effects rarely captured in aggregate statistics but consistently reported by headteachers and inspectors. Starting salaries have been partially restored in recent years, but the compressed gap between entry and progression pay reduces the financial incentive to stay beyond the early career period: roughly 40% of new teachers leave within five years. Countries consistently outperforming England in pupil attainment — Finland, South Korea, Singapore — treat teaching as a high-status, well-compensated profession; the link is not coincidental.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Real Pay Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Real pay vs 2010"
              value="-9%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="experienced teacher pay below 2010 in real terms"
              sparklineData={[36200, 34600, 33800, 33200, 33000, 33100, 33600, 33900, 32800, 33000]}
              href="#sec-chart"source="STRB · School Teachers' Pay Review Body 2024"
            />
            <MetricCard
              label="Pay gap vs graduate average"
              value="-18%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="teaching now pays 18% less than grad average"
              sparklineData={[-2, -5, -8, -10, -13, -14, -13, -14, -17, -18]}
              href="#sec-chart"source="OECD · Education at a Glance 2024"
            />
            <MetricCard
              label="OECD pay ranking"
              value="21st of 28"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="teacher pay below OECD average · falling"
              sparklineData={[15, 16, 17, 17, 18, 19, 19, 20, 21, 21]}
              href="#sec-chart"source="OECD · Education at a Glance 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Teacher real pay, England, 2010–2023"
              subtitle="Experienced teacher (red) and starting salary (amber) in constant 2023 prices. Both below 2010 levels in real terms."
              series={paySeries}
              yLabel="Annual salary (£, real 2023)"
              source={{
                name: 'STRB / DfE',
                dataset: 'School Teachers Pay Review Body',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>School Teachers' Review Body (STRB) — Annual Pay Report. gov.uk/government/collections/school-teachers-review-body-strb-reports</p>
            <p>DfE — School Workforce in England. Annual statistics. gov.uk/government/collections/statistics-school-workforce</p>
            <p>OECD — Education at a Glance. Annual international comparison. oecd.org/education/education-at-a-glance/</p>
            <p>Real pay calculated using HM Treasury GDP deflator. Experienced teacher pay reflects the top of the main pay range / lower leadership range. Starting salary reflects the minimum of the main pay range (Outside London). OECD ranking based on teacher pay relative to other tertiary-educated workers, 25–64 age group.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
