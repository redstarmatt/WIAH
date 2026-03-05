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
          finding="Young people on vocational routes earn &pound;4,200 less than those with equivalent A-levels &mdash; a gap that fuels the perceived hierarchy between academic and technical education."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s vocational education system has long promised parity with academic routes &mdash; yet the earnings data tells a different story. Young people who complete BTEC or equivalent level 3 vocational qualifications earn, on average, &pound;4,200 less per year than peers who studied for A-levels and entered similar occupations. That gap has widened steadily since 2015, driven by both wage growth concentrated in graduate-entry roles and persistent employer perceptions that vocational qualifications signal lower capability.</p>
            <p>Completion rates compound the problem. In 2015, 72% of students who began a BTEC level 3 programme completed it. By 2023, that figure had fallen to 68%. The causes are not hard to find: successive funding reforms have reduced the support available to further education colleges, which educate the majority of vocational learners. The pupil funding gap between schools and FE colleges &mdash; around &pound;3,000 per 16-to-18-year-old per year &mdash; means vocational students receive materially less teaching time, pastoral support, and resources than their A-level counterparts in the same cohort.</p>
            <p>Employer satisfaction with vocational leavers has also fallen, from 58% in 2015 to 54% in 2023. This is not simply an employer perception problem: it reflects a genuine mismatch between what qualifications test and what workplaces require. The proliferation of qualifications &mdash; England had over 12,000 approved vocational qualifications before T Level reform began &mdash; meant that employers could not easily interpret what any given certificate demonstrated. T Levels, introduced from 2020, are designed to address this, but take-up remains low and many providers lack the employer partnerships required to deliver the industry placements at the centre of the model.</p>
            <p>The apprenticeship system, reformed via the levy in 2017, has shifted significantly towards higher-level apprenticeships taken by existing employees rather than young school-leavers entering new occupations. In 2023, fewer than 200,000 under-19s started apprenticeships &mdash; down from over 350,000 a decade earlier. The levy was designed to increase training overall, but in practice large employers have used it to fund degree apprenticeships and management training for existing staff, while the levy-funded opportunities available to 16-year-olds from disadvantaged backgrounds have shrunk.</p>
            <p>The consequences are generational. Young people from lower-income households are significantly more likely to take vocational routes, meaning the earnings disadvantage maps closely onto existing inequality. A system that consistently undervalues technical and vocational skills does not just harm individual earners &mdash; it perpetuates the skills shortages in construction, engineering, healthcare, and digital sectors that constrain economic growth. The evidence base for what works is strong: structured industry placements, employer-led qualification design, and FE funding parity with schools have all been shown to improve outcomes. The barrier has been consistent political prioritisation of academic routes and chronic underfunding of the institutions that serve vocational learners.</p>
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
              value="-&pound;4,200/yr"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="worsening &middot; structural undervaluation of vocational routes"
              sparklineData={[-3800, -3900, -4000, -4000, -4100, -4000, -4100, -4200, -4200]}
              onExpand={() => {}}
              source="DfE &middot; Longitudinal Education Outcomes 2023"
            />
            <MetricCard
              label="BTEC completion rate"
              value="68%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="declining from 72% &middot; funding cuts bite"
              sparklineData={[72, 71, 71, 70, 70, 69, 69, 68, 68]}
              onExpand={() => {}}
              source="DfE &middot; 16-18 Qualifications 2023"
            />
            <MetricCard
              label="Employer satisfaction"
              value="54%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="below half satisfied with vocational leavers &middot; skills mismatch"
              sparklineData={[58, 57, 57, 56, 56, 55, 55, 54, 54]}
              onExpand={() => {}}
              source="CBI &middot; Education &amp; Skills Survey 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Earnings gap: vocational vs A-level routes, 2015&ndash;2023"
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
            <p>Department for Education &mdash; Longitudinal Education Outcomes (LEO). Tracks earnings of qualification completers via HMRC data. Published annually. explore-education-statistics.service.gov.uk</p>
            <p>DfE &mdash; 16-18 Qualifications Achieved. Annual attainment data for vocational qualifications by type and awarding body. explore-education-statistics.service.gov.uk</p>
            <p>CBI &mdash; Education and Skills Survey. Annual employer survey on satisfaction with school and college leavers. cbi.org.uk</p>
            <p>Earnings gap calculated as median annual earnings at age 25-29 for level 3 vocational completers minus median earnings for A-level completers entering comparable occupation groups, controlling for prior attainment. Figures are in nominal terms; the real gap has grown more slowly but remains substantial.</p>
          </div>
        </section>
      </main>
    </>
  )
}
