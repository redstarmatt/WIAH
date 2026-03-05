'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface HealthInequalitiesData {
  hleByDeprivation: Array<{ decile: number; label: string; hle: number; le: number }>
  gapTimeSeries: Array<{ year: number; hleGap: number; leGap: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function HealthInequalitiesPage() {
  const [data, setData] = useState<HealthInequalitiesData | null>(null)

  useEffect(() => {
    fetch('/data/health-inequalities/health_inequalities.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const gapSeries: Series[] = data
    ? [
        {
          id: 'hle-gap',
          label: 'Healthy life expectancy gap',
          colour: '#E63946',
          data: data.gapTimeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.hleGap,
          })),
        },
        {
          id: 'le-gap',
          label: 'Life expectancy gap',
          colour: '#F4A261',
          data: data.gapTimeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.leGap,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Health Inequalities" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health Inequalities"
          question="How much does where you&rsquo;re born determine your health?"
          finding="There is an 18.4-year healthy life expectancy gap between England&rsquo;s most and least deprived areas. A child born in Blackpool can expect 18 fewer years of good health than one born in Hart, Hampshire."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Healthy life expectancy &mdash; the number of years a person can expect to live in good health &mdash; varies by 18.4 years between England&rsquo;s most and least deprived areas. A woman born in Blackpool&rsquo;s most deprived neighbourhoods can expect just 52 years of healthy life. A woman born in Hart, Hampshire &mdash; one of England&rsquo;s most affluent districts &mdash; can expect 70.7. They will spend roughly the same number of years alive, but the gap in years spent in good health is vast. This is the clearest single measure of health inequality in England, and it has been widening, not narrowing.</p>
            <p>The gap between the most and least deprived deciles for healthy life expectancy stood at 16.2 years in 2001. By 2018&ndash;20, it had grown to 18.4 years. Life expectancy &mdash; a simpler measure of how long people live regardless of health &mdash; shows a smaller but still substantial 10.2-year gap. The divergence between these two measures matters: people in deprived areas live shorter lives and spend a far higher proportion of those shorter lives in poor health or with disability. They are not just dying younger; they are suffering more for longer.</p>
            <p>These inequalities have a strong regional dimension. The North East of England has a life expectancy of 74.1 years for men &mdash; 7.7 years below the South East&rsquo;s 81.8 years. This so-called &ldquo;North-South divide&rdquo; in health has persisted for decades and, in some measures, has widened since the 2008 financial crisis. Austerity policies disproportionately reduced public services and welfare support in the most deprived areas, which are concentrated in the North of England, Midlands, coastal communities, and post-industrial towns.</p>
            <p>The Marmot Review &mdash; Fair Society, Healthy Lives &mdash; published in 2010 and updated in 2020, identified the social determinants of health that explain these gaps: income, education, employment, housing, the quality of the built environment, and access to services. The 2020 review found that for the first time in over 100 years, life expectancy in England had stopped improving. In the most deprived communities, it was actually declining. This stalling of progress was attributed to reduced investment in public health, welfare cuts, and rising poverty.</p>
            <p>The NHS can treat the consequences of inequality but cannot address its causes. Reducing the health gap requires action on housing, poverty, employment, education, and the physical environment. NHS England&rsquo;s Core20PLUS5 framework, introduced in 2021, identifies the most deprived 20% of the population as the priority group for targeted interventions across five clinical areas where inequality is most pronounced. Whether this translates into measurable change in healthy life expectancy remains to be seen &mdash; the gap took decades to develop and will take decades to close even under the most optimistic scenarios.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-gap', label: 'Widening Gap' },
          { id: 'sec-deprivation', label: 'By Deprivation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Healthy life expectancy gap"
              value="18.4"
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText="Between most and least deprived decile &middot; widened since 2001"
              sparklineData={[16.2, 17.1, 17.8, 18.1, 18.4, 18.6]}
              onExpand={() => {}}
              source="ONS Health State Life Expectancies &middot; 2018&ndash;20"
            />
            <MetricCard
              label="Life expectancy gap"
              value="10.2"
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText="Most deprived 74.1 yrs vs least deprived 83.5 yrs"
              sparklineData={[8.9, 9.2, 9.6, 9.9, 10.2, 10.4]}
              onExpand={() => {}}
              source="ONS &middot; 2018&ndash;20"
            />
            <MetricCard
              label="North-South LE gap"
              value="7.7"
              unit="years"
              direction="flat"
              polarity="up-is-bad"
              changeText="NE England 74.1 years vs SE 81.8 years"
              sparklineData={[7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.7, 7.7]}
              onExpand={() => {}}
              source="ONS &middot; 2020&ndash;22"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gap" className="mb-12">
            <LineChart
              title="Health inequality gap, 2001&ndash;2020"
              subtitle="Difference in healthy life expectancy and life expectancy between most and least deprived deciles, England."
              series={gapSeries}
              yLabel="Years between most/least deprived"
              source={{
                name: 'ONS',
                dataset: 'Health State Life Expectancies by national deprivation deciles',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deprivation" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Healthy life expectancy by deprivation decile</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Years of healthy life expected at birth, by deprivation decile. England, 2018&ndash;20.</p>
            {data && (
              <div className="space-y-3">
                {data.hleByDeprivation.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-wiah-black flex-shrink-0 truncate">{item.label}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.hle / 80) * 100}%`,
                          backgroundColor: item.decile === 1 ? '#E63946' : item.decile === 10 ? '#2A9D8F' : '#6B7280',
                        }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-mono text-wiah-black">{item.hle.toFixed(1)} yrs</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Health State Life Expectancies, UK: 2018 to 2020</p>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Health State Life Expectancies by national deprivation deciles for England. Published 2022. ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthinequalities</p>
            <p>The Health Foundation &mdash; Marmot Review 10 Years On. 2020. health.org.uk/publications/reports/the-marmot-review-10-years-on</p>
            <p>Healthy life expectancy uses self-reported general health from the Annual Population Survey to classify years as &ldquo;in good health&rdquo;. Deprivation deciles are based on the Index of Multiple Deprivation 2019, applied at Lower Super Output Area level. Life expectancy uses the Sullivan method.</p>
          </div>
        </section>
      </main>
    </>
  )
}
