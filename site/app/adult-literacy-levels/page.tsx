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
          question="How Many Adults Can&apos;t Read or Do Maths Properly?"
          finding="7.1 million adults in England have literacy skills at or below the level expected of a primary school child."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In the sixth-largest economy in the world, 7.1 million adults &mdash; one in nine of the working-age population &mdash; have literacy skills at or below Level 1, broadly equivalent to what is expected of an 11-year-old. They can read simple texts and complete straightforward forms, but struggle with more complex written information: medication instructions, utility bills, employment contracts, benefit claim forms. For these 7.1 million people, navigating modern life involves a constant, invisible effort that most people take for granted.</p>
            <p>The numeracy picture is even starker. 16.8 million adults &mdash; roughly half the working-age population &mdash; have numeracy skills below Level 2, the threshold considered necessary to function effectively in the modern economy. They can perform basic arithmetic but struggle with percentages, fractions, and the kind of numerical reasoning required to compare loan offers, understand payslips, or follow a budget. The OECD&apos;s Programme for the International Assessment of Adult Competencies (PIAAC) ranked the UK 24th out of 27 participating EU nations for adult numeracy &mdash; a level that has not materially improved since the survey&apos;s first wave in 2011.</p>
            <p>The causes of low adult literacy and numeracy are multiple and interconnected. Early childhood deprivation affects brain development and school readiness. Schools in deprived areas face higher rates of disadvantage and lower per-pupil resources. Children who fall behind in primary school rarely catch up. The cohort that left school with poor literacy in the 1980s and 1990s is now the middle-aged workforce, carrying those deficits into economic life. And the adult education system that might have remediated these deficits has been cut by 35% in real terms since 2010.</p>
            <p>The economic consequences are substantial. The Centre for Economics and Business Research has estimated that low literacy and numeracy costs the UK economy approximately &pound;81 billion per year in reduced productivity, higher welfare dependency, and increased public service costs. Workers with low literacy earn significantly less, are more likely to be unemployed, and are more likely to be in insecure employment. They are also more likely to use health services more intensively, less likely to engage effectively with health information, and more likely to have children who themselves struggle at school &mdash; perpetuating the cycle across generations.</p>
            <p>The policy response has been fragmented. The previous government&apos;s Multiply programme, a &pound;560 million numeracy initiative, was widely criticised for targeting the wrong population with the wrong interventions and failing to demonstrate meaningful impact before its funding was withdrawn. The current government&apos;s Skills England agenda has not yet articulated a specific strategy for basic skills in the existing adult workforce. Without a sustained, evidence-based programme targeted at the 7.1 million adults with the lowest literacy skills, the human and economic cost of functional illiteracy will continue to be borne disproportionately by the most disadvantaged communities in Britain.</p>
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
              changeText="unchanged since 2011 &middot; no improvement in 13 years"
              sparklineData={[7.1, 7.0, 7.1, 7.1]}
              onExpand={() => {}}
              source="OECD &middot; PIAAC Survey / DfE Skills for Life 2024"
            />
            <MetricCard
              label="Below Level 2 numeracy"
              value="16.8m"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="49% of working-age adults &middot; OECD below average"
              sparklineData={[16.8, 16.6, 17.0, 16.8]}
              onExpand={() => {}}
              source="OECD &middot; PIAAC Survey 2024"
            />
            <MetricCard
              label="EU literacy ranking"
              value="24th of 27"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="near bottom of EU literacy rankings &middot; skills emergency"
              sparklineData={[24, 24, 24, 24]}
              onExpand={() => {}}
              source="OECD &middot; PIAAC 2023 Survey"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Adult literacy and numeracy skills deficit, England, 2011&ndash;2024"
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
            <p>OECD &mdash; Programme for the International Assessment of Adult Competencies (PIAAC). International literacy and numeracy survey. oecd.org/skills/piaac/</p>
            <p>DfE &mdash; Skills for Life Survey. National adult skills assessment for England. gov.uk/government/statistics/skills-for-life-survey</p>
            <p>National Literacy Trust &mdash; Adult Literacy Report. literacytrust.org.uk</p>
            <p>Level 1 literacy corresponds to NQF Level 1 (GCSE grades 3&ndash;1, former grade D&ndash;G). Adults at this level can read simple texts but struggle with complex or multi-page documents. Level 2 numeracy corresponds to GCSE grade 4 (former grade C) mathematics. All figures refer to England unless otherwise stated.</p>
          </div>
        </section>
      </main>
    </>
  )
}
