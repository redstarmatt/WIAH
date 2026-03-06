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
  belowLevel1LiteracyM: number
  belowLevel2NumeracyM: number
}

interface EuComparison {
  ukRank: number
  outOf: number
}

interface AdultLiteracyLevelsData {
  timeSeries: TimeSeriesPoint[]
  euComparison: EuComparison
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function AdultLiteracyLevelsPage() {
  const [data, setData] = useState<AdultLiteracyLevelsData | null>(null)

  useEffect(() => {
    fetch('/data/adult-literacy-levels/adult_literacy_levels.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const literacySeries: Series[] = data
    ? [
        {
          id: 'literacy',
          label: 'Below Level 1 literacy (millions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.belowLevel1LiteracyM,
          })),
        },
      ]
    : []

  const numeracySeries: Series[] = data
    ? [
        {
          id: 'numeracy',
          label: 'Below Level 2 numeracy (millions)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.belowLevel2NumeracyM,
          })),
        },
      ]
    : []

  const combinedSeries: Series[] = [...literacySeries, ...numeracySeries]

  return (
    <>
      <TopicNav topic="Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many Adults Can't Read or Do Maths Properly?"
          finding="7.1 million adults in England have literacy skills at or below the level expected of a primary school child."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In the sixth-largest economy in the world, 7.1 million adults — one in nine of the working-age population — have literacy skills at or below Level 1, broadly equivalent to the expectation for an 11-year-old: able to read simple texts but struggling with medication instructions, utility bills, or benefit claim forms. The numeracy picture is starker still: 16.8 million adults, roughly half the working-age population, have numeracy skills below Level 2, unable to reliably compare loan offers, read payslips, or follow a budget. The OECD's PIAAC survey ranked the UK 24th out of 27 participating EU nations for adult numeracy, a position that has not materially improved since 2011. The Centre for Economics and Business Research estimates low literacy and numeracy costs the UK economy £81 billion per year in reduced productivity, higher welfare dependency, and increased public service costs.</p>
            <p>Those with low skills are disproportionately concentrated in deprived communities, among older workers, and in the post-industrial towns and cities of northern England, Wales, and the Midlands. Workers with low literacy earn significantly less, face higher unemployment, and are more likely to be in insecure employment. They are also more likely to have children who themselves struggle — a cycle the adult education system, cut by 35% in real terms since 2010, is increasingly unable to break. The previous government's £560 million Multiply numeracy programme was widely criticised for targeting the wrong population and failing to demonstrate impact before funding was withdrawn; the current government has not yet articulated a specific strategy for basic skills in the existing workforce.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Literacy &amp; Numeracy' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Below Level 1 literacy"
              value="7.1m adults"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="unchanged since 2011 · no improvement in 13 years"
              sparklineData={[7.1, 7.0, 7.1, 7.1]}
              href="#sec-chart"source="OECD · PIAAC Survey / DfE Skills for Life 2024"
            />
            <MetricCard
              label="Below Level 2 numeracy"
              value="16.8m"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="49% of working-age adults · OECD below average"
              sparklineData={[16.8, 16.6, 17.0, 16.8]}
              href="#sec-chart"source="OECD · PIAAC Survey 2024"
            />
            <MetricCard
              label="EU literacy ranking"
              value="24th of 27"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="near bottom of EU literacy rankings · skills emergency"
              sparklineData={[24, 24, 24, 24]}
              href="#sec-chart"source="OECD · PIAAC 2023 Survey"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Adult literacy and numeracy skills deficit, England, 2011–2024"
              subtitle="Adults below Level 1 literacy (red) and below Level 2 numeracy (amber). Millions. Flat line demonstrates stagnation over 13 years."
              series={combinedSeries}
              yLabel="Adults (millions)"
              source={{
                name: 'OECD / DfE',
                dataset: 'PIAAC / Skills for Life Survey',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>OECD — Programme for the International Assessment of Adult Competencies (PIAAC). International literacy and numeracy survey. oecd.org/skills/piaac/</p>
            <p>DfE — Skills for Life Survey. National adult skills assessment for England. gov.uk/government/statistics/skills-for-life-survey</p>
            <p>National Literacy Trust — Adult Literacy Report. literacytrust.org.uk</p>
            <p>Level 1 literacy corresponds to NQF Level 1 (GCSE grades 3–1, former grade D–G). Adults at this level can read simple texts but struggle with complex or multi-page documents. Level 2 numeracy corresponds to GCSE grade 4 (former grade C) mathematics. All figures refer to England unless otherwise stated.</p>
          </div>
        </section>
      </main>
    </>
  )
}
