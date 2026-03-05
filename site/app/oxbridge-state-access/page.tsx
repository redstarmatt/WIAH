'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  oxfordStatePct: number
  cambridgeStatePct: number
  stateALevelSharePct?: number
}

interface OxbridgeStateAccessData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function OxbridgeStateAccessPage() {
  const [data, setData] = useState<OxbridgeStateAccessData | null>(null)

  useEffect(() => {
    fetch('/data/oxbridge-state-access/oxbridge_state_access.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const accessSeries: Series[] = data
    ? [
        {
          id: 'oxford',
          label: 'Oxford: state school students (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.oxfordStatePct,
          })),
        },
        {
          id: 'cambridge',
          label: 'Cambridge: state school students (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cambridgeStatePct,
          })),
        },
      ]
    : []

  const stateSchoolTarget = { value: 93, label: 'State A-level share (93%)' }

  return (
    <>
      <TopicNav topic="Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Can State School Students Get Into Oxbridge?"
          finding="Oxford and Cambridge have made progress &mdash; but state school students are still 23 percentage points underrepresented relative to their share of A-level pupils."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Oxford and Cambridge are two of the world&apos;s leading universities. They also educate a disproportionate share of Britain&apos;s future leaders in politics, law, finance, and the media. Whether state school students can access them on fair terms is therefore not merely an educational question &mdash; it is a question about how power is distributed in British society. State schools educate approximately 93% of all A-level pupils in England. In 2023, Cambridge admitted 70% state school students and Oxford 61%. The gap between representation and entitlement is 23 percentage points at Oxford and 23 points at Cambridge.</p>
            <p>Progress, however, is real and sustained. In 2015, only 55.6% of Oxford&apos;s intake came from state schools. By 2023, the figure had risen to 61.0% &mdash; a gain of 5.4 percentage points over eight years. At Cambridge, the improvement has been even more marked: from 61.8% in 2015 to 70.0% in 2023, a gain of over 8 percentage points. Both universities have invested heavily in outreach programmes &mdash; residential summer schools, partnerships with schools in disadvantaged areas, contextual offer systems that lower entry grade requirements for students from underperforming schools, and financial support packages designed to remove the cost barriers that deter state school applicants.</p>
            <p>Critics of Oxbridge admissions point to the persistent gap and argue that the self-reported progress masks structural advantages enjoyed by independent school students. Private schools typically offer smaller class sizes, more experienced teachers in high-demand subjects such as mathematics and physics, explicit coaching for Oxbridge admissions tests, and access to Oxbridge alumni networks who can provide guidance and mock interview experience. A state school student with identical academic ability faces a more demanding path to the offer stage.</p>
            <p>The contextual admissions debate reflects a deeper tension: should Oxbridge select the students with the highest demonstrated achievement, or those with the most potential given their starting point? The universities argue they do both, using a range of contextual indicators to identify exceptional candidates from disadvantaged backgrounds. Independent schools argue that focusing on contextual factors risks undervaluing genuine academic achievement. The evidence suggests that students admitted with lower contextual offers perform at least as well as those admitted through standard routes, which challenges the argument that contextual admissions compromise academic standards.</p>
            <p>The 70% Cambridge milestone reached in 2023 is genuinely significant. But 70% state school admissions in a country where 93% of A-level students attend state schools still represents a substantial imbalance. The remaining gap will be harder to close than the progress already made &mdash; it reflects deep structural inequalities in school quality, teacher expertise, and social capital that universities alone cannot fix. Continued progress requires sustained effort on both supply and demand: better teaching in state schools, more ambitious career expectations for state school students, and Oxbridge admissions processes that remain rigorous while genuinely levelling the playing field.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'State School Access' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Oxford: state school intake"
              value="61%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="record high &middot; up 5.4pp since 2015"
              sparklineData={[55.6, 57.3, 57.8, 58.3, 58.9, 59.5, 60.1, 60.4, 61.0]}
              onExpand={() => {}}
              source="Oxford University &middot; Access and Participation Report 2024"
            />
            <MetricCard
              label="Cambridge: state school intake"
              value="70%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="70% milestone reached &middot; 2023"
              sparklineData={[61.8, 63.1, 64.4, 65.0, 66.2, 68.7, 69.5, 69.9, 70.0]}
              onExpand={() => {}}
              source="Cambridge University &middot; Access and Participation Report 2024"
            />
            <MetricCard
              label="Remaining gap"
              value="23pp"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="vs 93% state school A-level share &middot; closing slowly"
              sparklineData={[31, 30, 29, 28, 27, 26, 25, 24, 23]}
              onExpand={() => {}}
              source="UCAS &middot; Oxbridge Admissions 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="State school students at Oxford and Cambridge, 2015&ndash;2023"
              subtitle="Oxford (dark) and Cambridge (green) percentage of UK-domiciled undergraduates from state schools. State schools educate 93% of all A-level students."
              series={accessSeries}
              yLabel="State school share (%)"
              targetLine={stateSchoolTarget}
              source={{
                name: 'Oxford University / Cambridge University',
                dataset: 'Access and Participation Reports',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Progress on Widening Access"
            value="70%"
            unit="state school students at Cambridge"
            description="Both Oxford and Cambridge have made consistent progress on admitting state school students, with Cambridge reaching 70% in 2023 — its highest ever. Contextual offers, bursary programmes and outreach are all contributing."
            source="Source: Oxford University / Cambridge University Access Reports, 2024"
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>University of Oxford &mdash; Access and Participation Plan. Annual report to OfS. ox.ac.uk/about/facts-and-figures/admissions-statistics</p>
            <p>University of Cambridge &mdash; Access and Participation Plan. Annual report to OfS. cam.ac.uk/about-the-university/facts-and-figures</p>
            <p>UCAS &mdash; Undergraduate End of Cycle Data Resources. ucas.com/data-and-analysis/undergraduate-statistics-and-reports</p>
            <p>State school percentage defined as proportion of UK-domiciled undergraduate entrants who attended a state-maintained school or college (including grammar schools, academies, free schools, and further education colleges). Excludes overseas students and postgraduates.</p>
          </div>
        </section>
      </main>
    </>
  )
}
