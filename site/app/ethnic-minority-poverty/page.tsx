'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface EthnicMinorityPovertyData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    ethnicMinorityPovertyPct: number
    bangladeshiPovertyPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function EthnicMinorityPovertyPage() {
  const [data, setData] = useState<EthnicMinorityPovertyData | null>(null)

  useEffect(() => {
    fetch('/data/ethnic-minority-poverty/ethnic_minority_poverty.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'ethnicMinorityPct',
          label: 'All ethnic minorities',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ethnicMinorityPovertyPct,
          })),
        },
        {
          id: 'bangladeshiPovertyPct',
          label: 'Bangladeshi households',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bangladeshiPovertyPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Ethnic Minority Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ethnic Minority Poverty"
          question="Are Ethnic Minorities More Likely to Live in Poverty?"
          finding="46% of people from ethnic minority backgrounds live in poverty — more than double the 21% rate for white British people — with Bangladeshi and Pakistani households at highest risk."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Forty-six percent of people from ethnic minority backgrounds live in poverty &mdash; more than double the 21&percnt; rate for white British people &mdash; a 25 percentage point gap that has persisted for decades without closing significantly, according to the Joseph Rowntree Foundation and Runnymede Trust. Bangladeshi households experience poverty at approximately 58&percnt;, Pakistani households at 50&percnt;, Black African at 45&percnt;, Black Caribbean at 40&percnt;; Indian households are close to the white British average at around 22&percnt;, reflecting different educational and labour market outcomes. Child poverty is starker still: 55&percnt; of children from ethnic minority backgrounds live in poverty versus 22&percnt; of white British children. The ethnicity pay gap stood at 5.8&percnt; in 2024, and CV studies consistently find that applicants with white British-sounding names are approximately 75&percnt; more likely to receive a callback than equally qualified ethnic minority applicants.</p>
            <p>The concentration of poverty in specific communities reflects compounding disadvantage across hiring, pay, and welfare policy. Larger average household sizes increase poverty risk under the two-child limit; restricted benefit eligibility affects some recent migrants; and labour market discrimination at hiring and promotion levels compounds lower initial earnings. The Commission on Race and Ethnic Disparities (2021) contested the centrality of structural racism in driving these outcomes, but its conclusions were strongly disputed by race equality organisations and academics. Ethnicity pay gap reporting remains voluntary, leaving employer incentives insufficient to drive structural change &mdash; and the aggregate &ldquo;ethnic minority&rdquo; figure masks the very different challenges facing Bangladeshi and Indian communities, which a single policy response cannot address.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Poverty rate, ethnic minorities"
              value="46%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 52% in 2015 · still 25pp above white British"
              sparklineData={[52, 51, 50, 49, 48, 47, 47, 46, 46]}
              href="#sec-chart"source="JRF / Runnymede Trust · Poverty and Ethnicity 2024"
            />
            <MetricCard
              label="Poverty rate, Bangladeshi households"
              value="58%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Highest of any group · improving slowly"
              sparklineData={[65, 64, 63, 62, 61, 60, 60, 59, 58]}
              href="#sec-chart"source="JRF / Runnymede Trust · Poverty and Ethnicity 2024"
            />
            <MetricCard
              label="Child poverty, ethnic minorities"
              value="55%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="55% vs 22% white British children in poverty"
              sparklineData={[58, 57, 57, 56, 56, 55, 55, 55, 55]}
              href="#sec-chart"source="JRF · Child Poverty Analysis 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Poverty rates by ethnicity, 2016–2024"
              subtitle="Percentage of each group living in poverty (below 60% median income after housing costs)."
              series={series}
              yLabel="Poverty rate (%)"
              source={{
                name: 'JRF',
                dataset: 'Poverty and Ethnicity Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Joseph Rowntree Foundation / Runnymede Trust &mdash; Poverty and Ethnicity 2024. jrf.org.uk/report/poverty-and-ethnicity-2024</p>
            <p>Poverty defined as below 60% of median household income after housing costs (AHC). Data drawn from Understanding Society (UKHLS) and the Family Resources Survey (FRS). Ethnicity classifications follow the ONS 2021 Census categories. Year-to-year variation in estimates for smaller ethnic groups reflects sample size constraints and should be interpreted with caution.</p>
          </div>
        </section>
      </main>
    </>
  )
}
