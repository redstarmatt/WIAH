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
            <p>The ethnicity pay gap in the UK is not a single figure but a complex pattern that varies substantially across ethnic groups and cannot be understood without disaggregation. Workers from Bangladeshi and Pakistani backgrounds face the largest pay gaps relative to White British workers &mdash; around 20% and 16% respectively &mdash; and these gaps have barely narrowed over the past decade despite the introduction of ethnicity pay gap reporting guidance and sustained attention from equality bodies. Workers of Indian heritage, by contrast, now earn above the White British median on average, a pattern that reflects high rates of educational attainment and concentration in professional and managerial occupations. These divergences mean aggregate &ldquo;BAME pay gap&rdquo; figures are almost meaningless &mdash; they average together groups with radically different experiences.</p>
            <p>The causes of the persistent gaps for Bangladeshi and Pakistani workers are multiple and interacting. Occupational segregation is a major factor: workers from these communities are overrepresented in lower-paid sectors including retail, hospitality, transport, and social care, and underrepresented in senior professional and managerial roles. This reflects historical patterns of migration, settlement, and labour market access rather than recent choices &mdash; many of the communities with the largest pay gaps are descended from workers who arrived in the 1960s and 1970s to fill specific industrial and service sector roles, and patterns of occupational concentration have persisted across generations. Discrimination in hiring and promotion, documented in audit studies using matched CVs, also plays a measurable role.</p>
            <p>Geographic concentration matters for understanding the data. Bangladeshi-heritage workers are heavily concentrated in London, particularly Tower Hamlets and surrounding boroughs, where living costs are high but where lower-paid workers face particular difficulty accessing higher-paying employment. Pakistani-heritage workers are more dispersed but concentrated in Midlands and Northern cities. The relationship between geographic labour market conditions, housing costs, and pay outcomes is complex and cannot be captured in national average figures alone.</p>
            <p>The government commissioned the Sewell Report (Commission on Race and Ethnic Disparities) in 2021, which controversially concluded that the UK was not a systemically racist country and that ethnic disparities were explained primarily by socioeconomic and cultural factors rather than racial discrimination. This conclusion was disputed by a wide range of equality organisations and researchers, and subsequent analysis has suggested that discrimination measurably accounts for a portion of both pay gaps and employment disparities that cannot be explained by observable socioeconomic characteristics. Mandatory ethnicity pay gap reporting &mdash; analogous to the mandatory gender pay gap reporting introduced in 2017 &mdash; was proposed but not implemented.</p>
            <p>The picture is not uniformly negative. Educational attainment for many ethnic minority groups &mdash; and particularly for children of Indian, Chinese, and African heritage &mdash; now exceeds that of White British peers. These cohorts are entering the labour market with stronger qualifications and greater occupational choices, and their labour market outcomes are correspondingly better. The challenge is whether improved educational outcomes for some groups will translate into improved pay outcomes over careers &mdash; given the evidence that discrimination in promotion and selection for senior roles operates independently of qualifications &mdash; and whether the communities facing the largest current gaps will see material improvement in the coming decade.</p>
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
              onExpand={() => {}}
              source="ONS &middot; ASHE Ethnicity Analysis 2023"
            />
            <MetricCard
              label="Pakistani–White British pay gap"
              value="-16.1%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="slight improvement but still deep"
              sparklineData={[-17.8, -17.4, -17.1, -16.8, -16.6, -16.5, -16.3, -16.2, -16.1]}
              onExpand={() => {}}
              source="ONS &middot; ASHE Ethnicity Analysis 2023"
            />
            <MetricCard
              label="Indian workers vs White British"
              value="+1.4%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Indian workers now earn above White British median"
              sparklineData={[1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 1.4]}
              onExpand={() => {}}
              source="ONS &middot; ASHE Ethnicity Analysis 2023"
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
