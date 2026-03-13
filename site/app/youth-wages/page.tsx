'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// -- Types ------------------------------------------------------------------

interface YouthWagesRow {
  year: number
  youthMedianWage: number
  adultMedianWage: number
  gapPct?: number
}

interface YouthWagesData {
  topic: string
  lastUpdated: string
  timeSeries: YouthWagesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function YouthWagesPage() {
  const [data, setData] = useState<YouthWagesData | null>(null)

  useEffect(() => {
    fetch('/data/youth-wages/youth_wages.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const wageSeries: Series[] = data
    ? [
        {
          id: 'youth',
          label: 'Youth median wage (18–24)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.youthMedianWage,
          })),
        },
        {
          id: 'adult',
          label: 'All-worker median wage',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.adultMedianWage,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Youth Wages" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Youth Wages"
          question="What Are Young People Actually Earning?"
          finding="Workers aged 18–24 earn 41% less than the median adult wage — a gap that has widened since 2010 despite minimum wage increases."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Young workers in Britain have experienced a decade of stagnating real wages. In 2023, the youth median gross annual wage stood at approximately £19,200 — compared to £33,000 for the full workforce median, a 42% gap that has barely shifted since 2010 when it stood at 43%. In real terms, youth wages in 2023 are roughly 7.3% below their 2010 level, meaning the young worker of 2024 starts on a lower real wage than their equivalent 14 years ago, yet faces significantly higher housing costs, energy bills, and transport fares. The gap is partly structural: younger workers disproportionately occupy lower-wage roles in hospitality, retail, and social care where career progression is limited. Age-differentiated minimum wage rates historically allowed workers under 23 to be paid less than older colleagues for identical work; the October 2024 extension of the full National Living Wage to workers aged 21 and over closed part of this gap, but those aged 18–20 remain on a lower statutory rate.</p>
            <p>Around 40% of zero-hours contract workers are under 25, compounding wage insecurity with income uncertainty, limited sick pay, and no employer pension contributions. The headline wage gap therefore understates the full earnings disadvantage faced by many young workers. Policy debate centres on whether age-differentiated minimum wage rates are justified: proponents argue younger workers have lower productivity, but the evidence for this is weak, and economists and campaigners have called for full equalisation from age 18 as the next step in narrowing a gap that has stubbornly resisted two decades of policy attention.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Wage Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Youth median wage (2023)"
              value="£19,200"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Rising in nominal terms · NLW helping"
              sparklineData={[14800, 14200, 14100, 14800, 16200, 17100, 17000, 17800, 18600, 19200]}
              href="#sec-chart"source="ONS ASHE · 2023"
            />
            <MetricCard
              label="Youth–adult wage gap"
              value="42%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Gap barely closed since 2010 · was 43%"
              sparklineData={[43, 46, 47, 46, 45, 44, 45, 44, 44, 42]}
              href="#sec-chart"source="ONS ASHE · 2023"
            />
            <MetricCard
              label="Real youth wages since 2010"
              value="&minus;7.3%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Inflation-adjusted fall despite NLW growth"
              sparklineData={[100, 97, 95, 95, 97, 101, 98, 97, 94, 93]}
              href="#sec-chart"source="ONS ASHE / CPI · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Youth vs adult median wages, 2010–2023"
              subtitle="Gross annual median earnings. Youth = workers aged 18–24. Adult = all workers. Nominal terms."
              series={wageSeries}
              yLabel="Gross annual earnings (£)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings (ASHE)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Annual Survey of Hours and Earnings (ASHE). Published annually in October. ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings</p>
            <p>Low Pay Commission — National Minimum Wage and National Living Wage Rates. gov.uk/national-minimum-wage-rates</p>
            <p>Youth wage figures cover employees aged 18–24 in full-time and part-time employment. Median gross annual earnings used throughout. Real-terms comparisons use ONS CPI all items index, rebased to 2010. Gap percentage calculated as (adult median minus youth median) divided by adult median, expressed as a percentage.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
