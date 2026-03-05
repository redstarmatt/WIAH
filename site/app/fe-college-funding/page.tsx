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
            <p>Further education colleges are the backbone of England&apos;s vocational and technical skills system. They educate 1.6 million students annually, train apprentices, deliver adult education, and provide the technical qualifications that engineers, construction workers, health care assistants, and electricians depend on. They also serve students who have been failed by or disengaged from the school system, offering a second chance to people who would otherwise have no pathway to skills and employment. And for fifteen years, they have been systematically underfunded.</p>
            <p>Real funding per further education student has fallen from approximately &pound;5,400 in 2010 to &pound;3,900 in 2023 &mdash; a cut of 28% in real terms. The contrast with higher education is striking: university funding per student has risen over the same period, as tuition fees increased following the 2012 reforms. A student studying A-levels at school attracts significantly more funding per head than the same student would at a college. A university student studying the same subject attracts three to four times as much funding as an FE student studying a vocational equivalent. These differentials are not based on any principled analysis of cost or need; they reflect the political salience of different sectors.</p>
            <p>The consequences of sustained underfunding are becoming structural. The proportion of colleges rated as in financial difficulty by the Education and Skills Funding Agency has risen from around 8% in 2010 to 22% in 2023. Colleges in financial difficulty face restrictions on their activities, are subjected to intervention by the agency, and in some cases have been forced to merge with other institutions or have governing bodies replaced. Mergers reduce choice for students and can reduce provision in the communities that most need it, particularly in rural areas where a single college may be the only local provider.</p>
            <p>Staff recruitment and retention has deteriorated. FE teacher pay has fallen significantly behind school teacher pay and even further behind the private sector salaries available to people with the vocational expertise that colleges need. A qualified electrician, plumber, or software developer can earn considerably more in the private sector than teaching their specialism at a college. The result is a growing shortage of specialist lecturers in the subjects where skills gaps are most acute, particularly in construction trades, digital technologies, and health and social care.</p>
            <p>The government&apos;s Skills England agenda, launched in 2024, represents the most ambitious attempt to reform technical education since the Sainsbury review. It proposes a new system of qualifications &mdash; T Levels and their successors &mdash; backed by additional investment and employer co-design. Whether this translates into the sustained, decade-long uplift in per-student funding that the sector needs remains to be seen. The history of FE reform is one of promising initiatives that have not survived contact with the Treasury. Until funding per FE student is brought into alignment with school and higher education funding, the structural disadvantage facing the 1.6 million students who depend on colleges will persist.</p>
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
              onExpand={() => {}}
              source="ESFA &middot; FE Funding Allocations 2024"
            />
            <MetricCard
              label="Colleges in financial difficulty"
              value="22%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from 8% in 2010 &middot; merger pressure"
              sparklineData={[8, 10, 12, 13, 14, 16, 18, 20, 21, 22]}
              onExpand={() => {}}
              source="ESFA &middot; College Financial Health 2024"
            />
            <MetricCard
              label="Adult skills budget"
              value="-35%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="adult education budget cut by a third since 2010"
              sparklineData={[100, 92, 83, 76, 71, 70, 70, 68, 66, 65]}
              onExpand={() => {}}
              source="AELP &middot; Adult Education Budget Analysis 2024"
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
