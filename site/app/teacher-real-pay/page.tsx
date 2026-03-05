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
            <p>The austerity decade that followed the 2008 financial crisis imposed public sector pay restraint across the board. But in no profession has that restraint had more visible consequences than teaching. Between 2010 and 2023, real teacher pay fell by approximately 9% for experienced teachers &mdash; those at the upper part of the main pay range and above. For starting teachers, the picture was slightly more complex: a succession of above-inflation starting salary increases in recent years has partially restored the nominal value of entry-level pay, but the gap between starting and progression salaries has compressed significantly, reducing the financial incentive to stay in teaching beyond the early career period.</p>
            <p>The labour market consequences are clear in the data. Applications to teacher training programmes have fallen for most subjects over the past decade. The DfE&apos;s own targets for Initial Teacher Training recruitment have been missed consistently since 2016 in secondary subjects including mathematics, physics, computing, chemistry, and modern foreign languages. These are precisely the subjects where graduates face the highest private sector salaries and where the financial sacrifice of choosing teaching over alternative careers is greatest. A physics graduate choosing teaching over a career in engineering or finance forgoes an estimated &pound;500,000 in lifetime earnings, even accounting for pension benefits.</p>
            <p>The comparison with other graduate professions is stark. In 2010, an experienced teacher&apos;s salary was broadly comparable with the median graduate salary across all professions. By 2023, the graduate median had risen in real terms while teacher pay had fallen, creating a gap of approximately 18%. This is not a minor differential &mdash; it is a structural signal to graduates considering their career options. Teaching now competes for graduates on the basis of non-financial rewards: job security, holidays, sense of purpose, and pension quality. These are genuine benefits, but they are harder to quantify and increasingly insufficient to attract the volume of high-quality graduates that a system of 8.9 million state school pupils requires.</p>
            <p>The OECD&apos;s Education at a Glance report, published annually, benchmarks teacher pay across member countries. In 2023, England ranked 21st out of 28 OECD countries for teacher pay relative to other graduates &mdash; below the OECD average and falling. Countries that outperform England in international assessments of pupil attainment &mdash; including Finland, Singapore, South Korea, and Canada &mdash; consistently pay teachers at or above the graduate median, reflecting a policy choice to treat teaching as a high-status profession. The connection between teacher quality, pay, and pupil outcomes is not deterministic, but it is directional and consistent.</p>
            <p>The government&apos;s decision to award a 5.5% pay rise to teachers in 2024 &mdash; partly above the School Teachers&apos; Pay Review Body recommendation &mdash; was a recognition that the pay trajectory was unsustainable. But a single above-inflation award does not undo a decade of real-terms cuts. The STRB&apos;s own analysis suggests that teacher pay needs to rise by an additional 10&ndash;15% in real terms over the next five years simply to return to 2010 levels, and that further increases beyond that point would be needed to restore competitiveness with graduate alternatives. Whether the fiscal space exists to fund this trajectory, given competing demands on the education budget, is the central question for the profession&apos;s future.</p>
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
              onExpand={() => {}}
              source="STRB &middot; School Teachers&apos; Pay Review Body 2024"
            />
            <MetricCard
              label="Pay gap vs graduate average"
              value="-18%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="teaching now pays 18% less than grad average"
              sparklineData={[-2, -5, -8, -10, -13, -14, -13, -14, -17, -18]}
              onExpand={() => {}}
              source="OECD &middot; Education at a Glance 2024"
            />
            <MetricCard
              label="OECD pay ranking"
              value="21st of 28"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="teacher pay below OECD average &middot; falling"
              sparklineData={[15, 16, 17, 17, 18, 19, 19, 20, 21, 21]}
              onExpand={() => {}}
              source="OECD &middot; Education at a Glance 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Teacher real pay, England, 2010&ndash;2023"
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
            <p>School Teachers&apos; Review Body (STRB) &mdash; Annual Pay Report. gov.uk/government/collections/school-teachers-review-body-strb-reports</p>
            <p>DfE &mdash; School Workforce in England. Annual statistics. gov.uk/government/collections/statistics-school-workforce</p>
            <p>OECD &mdash; Education at a Glance. Annual international comparison. oecd.org/education/education-at-a-glance/</p>
            <p>Real pay calculated using HM Treasury GDP deflator. Experienced teacher pay reflects the top of the main pay range / lower leadership range. Starting salary reflects the minimum of the main pay range (Outside London). OECD ranking based on teacher pay relative to other tertiary-educated workers, 25&ndash;64 age group.</p>
          </div>
        </section>
      </main>
    </>
  )
}
