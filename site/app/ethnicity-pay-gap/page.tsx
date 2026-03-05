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
  bangladeshiGapPct: number
  pakistaniGapPct: number
  blackAfricanGapPct?: number
  indianGapPct?: number
}

interface EthnicityPayGapData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function EthnicityPayGapPage() {
  const [data, setData] = useState<EthnicityPayGapData | null>(null)

  useEffect(() => {
    fetch('/data/ethnicity-pay-gap/ethnicity_pay_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const paySeries: Series[] = data
    ? [
        {
          id: 'bangladeshi',
          label: 'Bangladeshi vs White British (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bangladeshiGapPct,
          })),
        },
        {
          id: 'pakistani',
          label: 'Pakistani vs White British (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pakistaniGapPct,
          })),
        },
        {
          id: 'black-african',
          label: 'Black African vs White British (%)',
          colour: '#6B7280',
          data: data.timeSeries
            .filter(d => d.blackAfricanGapPct !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.blackAfricanGapPct as number,
            })),
        },
        {
          id: 'indian',
          label: 'Indian vs White British (%)',
          colour: '#2A9D8F',
          data: data.timeSeries
            .filter(d => d.indianGapPct !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.indianGapPct as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Ethnicity Pay Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ethnicity Pay Gap"
          question="Are Ethnic Minority Workers Paid Less?"
          finding="Workers from Bangladeshi and Pakistani backgrounds earn over 20% less than their White British peers — a gap that has barely narrowed in a decade."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Workers from Bangladeshi and Pakistani backgrounds face pay gaps of around 20% and 16% relative to White British workers &mdash; gaps that have barely narrowed over a decade despite sustained attention from equality bodies and the introduction of ethnicity pay gap reporting guidance. Workers of Indian heritage, by contrast, now earn above the White British median, reflecting higher educational attainment and concentration in professional and managerial occupations. These divergences make aggregate &ldquo;BAME pay gap&rdquo; figures almost meaningless. Occupational segregation is a major driver for those groups with the largest gaps: Bangladeshi and Pakistani workers are overrepresented in retail, hospitality, transport, and social care &mdash; a legacy of 1960s and 1970s migration patterns that has persisted across generations. CV audit studies consistently find that applicants with ethnic minority-sounding names are significantly less likely to be called back, confirming that discrimination at hiring stage compounds structural disadvantage.</p>
            <p>The burden falls hardest where labour market geography and pay combine worst. Bangladeshi-heritage workers are concentrated in London boroughs where living costs are high but access to higher-paying employment difficult; Pakistani-heritage workers are concentrated in Midlands and Northern cities with lower-wage economies. Mandatory ethnicity pay gap reporting &mdash; analogous to the gender pay gap reporting introduced in 2017 &mdash; was proposed but not implemented, leaving employer incentives insufficient to drive structural change. The Sewell Commission (2021) concluded structural racism was not the primary driver of ethnic pay disparities; that finding was contested by equality organisations and researchers who identified discrimination as a measurable, independent factor that observable socioeconomic characteristics alone cannot explain.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Pay Gaps by Ethnicity' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Bangladeshi–White British pay gap"
              value="-20.2%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="barely changed in a decade"
              sparklineData={[-21.4, -21.1, -20.9, -20.6, -20.4, -20.3, -20.3, -20.2, -20.2]}
              href="#sec-chart"source="ONS &middot; ASHE Ethnicity Analysis 2023"
            />
            <MetricCard
              label="Pakistani–White British pay gap"
              value="-16.1%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="slight improvement but still deep"
              sparklineData={[-17.8, -17.4, -17.1, -16.8, -16.6, -16.5, -16.3, -16.2, -16.1]}
              href="#sec-chart"source="ONS &middot; ASHE Ethnicity Analysis 2023"
            />
            <MetricCard
              label="Indian workers vs White British"
              value="+1.4%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Indian workers now earn above White British median"
              sparklineData={[1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 1.4]}
              href="#sec-chart"source="ONS &middot; ASHE Ethnicity Analysis 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Ethnicity pay gap vs White British median, 2015&ndash;2023"
              subtitle="Percentage difference in median hourly pay compared to White British workers. Negative values indicate lower pay. Data partial for some groups."
              series={paySeries}
              yLabel="Pay gap vs White British (%)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings — Ethnicity Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Ethnicity Pay Gap in Great Britain. ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/ethnicitypaygapsingreatbritain</p>
            <p>ONS &mdash; Annual Survey of Hours and Earnings. ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/latest</p>
            <p>Pay gaps are calculated from ASHE and represent median gross hourly earnings, excluding overtime, for employees. Comparisons are to White British workers. Some ethnic minority groups have small sample sizes in ASHE, leading to wider confidence intervals; Black African and Indian figures are available only for some years. The analysis controls for hours worked but not for occupation, sector, qualifications, or experience &mdash; which are themselves subject to inequalities that cannot be treated as neutral controls.</p>
          </div>
        </section>
      </main>
    </>
  )
}
