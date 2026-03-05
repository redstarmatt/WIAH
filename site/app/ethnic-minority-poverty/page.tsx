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
            <p>Poverty rates vary significantly by ethnicity in the UK, with people from ethnic minority backgrounds experiencing poverty at rates substantially higher than the white British population. The most comprehensive analysis, published by the Joseph Rowntree Foundation and the Runnymede Trust, found that 46% of people from ethnic minority backgrounds live in poverty (below 60% of median income after housing costs), compared to 21% of white British people. This 25 percentage point gap has persisted for decades and has not closed significantly despite periods of overall poverty reduction. The gap reflects a combination of factors including lower average wages, higher rates of unemployment and underemployment, concentration in lower-paid occupational sectors, and structural barriers to advancement.</p>
            <p>The variation between different ethnic groups is substantial and often obscured by aggregated &lsquo;ethnic minority&rsquo; statistics. Bangladeshi households experience poverty at approximately 58% — the highest rate of any group — followed by Pakistani households at around 50%. Black African and Black Caribbean households are at 45% and 40% respectively. Indian households, by contrast, have poverty rates closer to the white British average (approximately 22%), reflecting higher average educational attainment and labour market outcomes in this group. This variation matters for policy: it warns against treating &lsquo;ethnic minority poverty&rsquo; as a single phenomenon requiring a single response, and highlights the specific challenges facing particular communities.</p>
            <p>Child poverty rates are even more stark. Approximately 55% of children from ethnic minority backgrounds live in poverty, compared to 22% of white British children. The concentration of child poverty in ethnic minority families reflects the interaction of household structure (larger families, more likely to have more than two children, which increases poverty risk under welfare policy), lower parental earnings, and in some cases restricted benefit eligibility for recent migrants. Free School Meals uptake rates are significantly higher in ethnic minority school communities than white British communities, and the free school meals eligibility rate is a good proxy for the scale of child poverty in local areas.</p>
            <p>Labour market discrimination contributes significantly to the earnings gap. Field experiments — which involve sending identical CVs with different ethnically-coded names — consistently find that applicants with white British-sounding names are approximately 75% more likely to receive a callback than applicants with ethnic minority names, even when all other characteristics are identical. This discrimination operates at the hiring stage, and there is evidence of further discrimination in promotion, access to training, and assignment to desirable projects. The ethnicity pay gap — the difference in median hourly earnings between white British workers and ethnic minority workers — was 5.8% in 2024, with significant variation between groups and sectors.</p>
            <p>Government policy on ethnic minority poverty has been shaped by the Commission on Race and Ethnic Disparities (2021), which broadly concluded that structural racism was not the primary driver of ethnic disparities and emphasised family structure, culture, and educational attainment as explanatory factors. This framing was strongly contested by many race equality organisations and academics. Subsequent government policy has focused on improving educational attainment data by ethnicity, the Race Disparity Audit, and employer initiatives on ethnicity pay gap reporting — which remains voluntary. Critics argue that without mandatory ethnicity pay gap reporting, progress will be slow and employer incentives insufficient to drive the changes needed to close the poverty gap.</p>
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
              onExpand={() => {}}
              source="JRF / Runnymede Trust · Poverty and Ethnicity 2024"
            />
            <MetricCard
              label="Poverty rate, Bangladeshi households"
              value="58%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Highest of any group · improving slowly"
              sparklineData={[65, 64, 63, 62, 61, 60, 60, 59, 58]}
              onExpand={() => {}}
              source="JRF / Runnymede Trust · Poverty and Ethnicity 2024"
            />
            <MetricCard
              label="Child poverty, ethnic minorities"
              value="55%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="55% vs 22% white British children in poverty"
              sparklineData={[58, 57, 57, 56, 56, 55, 55, 55, 55]}
              onExpand={() => {}}
              source="JRF · Child Poverty Analysis 2024"
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
