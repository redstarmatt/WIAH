'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

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
          finding="Oxford and Cambridge have made progress — but state school students are still 23 percentage points underrepresented relative to their share of A-level pupils."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>State schools educate approximately 93% of all A-level pupils in England, yet in 2023 Oxford admitted just 61% state school students and Cambridge 70% — gaps of 32 and 23 percentage points respectively. Progress is real: Oxford's state school share has risen from 55.6% in 2015, Cambridge's from 61.8%. Both universities have invested in outreach programmes, contextual offers lowering grade requirements for students from underperforming schools, and bursary packages — and evidence shows contextually admitted students perform at least as well as standard-route entrants. But the structural advantages of independent schooling — smaller classes, specialist teaching, explicit admissions test coaching, alumni networks — persist and are not fully offset by outreach.</p>
            <p>The question is not only educational but political. Oxbridge alumni disproportionately occupy senior positions across law, the civil service, media, and finance, meaning that persistent underrepresentation of state school students shapes who holds power in British society. The remaining gap will be harder to close than progress already made: it reflects deep inequalities in school quality and social capital that no university admissions process alone can fix.</p>
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
              changeText="record high · up 5.4pp since 2015"
              sparklineData={[55.6, 57.3, 57.8, 58.3, 58.9, 59.5, 60.1, 60.4, 61.0]}
              href="#sec-chart"source="Oxford University · Access and Participation Report 2024"
            />
            <MetricCard
              label="Cambridge: state school intake"
              value="70%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="70% milestone reached · 2023"
              sparklineData={[61.8, 63.1, 64.4, 65.0, 66.2, 68.7, 69.5, 69.9, 70.0]}
              href="#sec-chart"source="Cambridge University · Access and Participation Report 2024"
            />
            <MetricCard
              label="Remaining gap"
              value="23pp"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="vs 93% state school A-level share · closing slowly"
              sparklineData={[31, 30, 29, 28, 27, 26, 25, 24, 23]}
              href="#sec-chart"source="UCAS · Oxbridge Admissions 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="State school students at Oxford and Cambridge, 2015–2023"
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
            <p>University of Oxford — Access and Participation Plan. Annual report to OfS. ox.ac.uk/about/facts-and-figures/admissions-statistics</p>
            <p>University of Cambridge — Access and Participation Plan. Annual report to OfS. cam.ac.uk/about-the-university/facts-and-figures</p>
            <p>UCAS — Undergraduate End of Cycle Data Resources. ucas.com/data-and-analysis/undergraduate-statistics-and-reports</p>
            <p>State school percentage defined as proportion of UK-domiciled undergraduate entrants who attended a state-maintained school or college (including grammar schools, academies, free schools, and further education colleges). Excludes overseas students and postgraduates.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
