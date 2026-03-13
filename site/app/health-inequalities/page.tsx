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

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Health State Life Expectancies by national deprivation deciles', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthinequalities', date: '2022' },
  { num: 2, name: 'The Health Foundation', dataset: 'Marmot Review 10 Years On', url: 'https://www.health.org.uk/publications/reports/the-marmot-review-10-years-on', date: '2020' },
];

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
            <p>Healthy life expectancy — years lived without disability or chronic illness — varies by 18.4 years between England&rsquo;s most and least deprived areas, up from a 16.2-year gap in 2001.<Cite nums={1} /> A woman born in Blackpool&rsquo;s most deprived neighbourhoods can expect just 52 years of good health; one born in Hart, Hampshire can expect 70.7.<Cite nums={1} /> People in deprived areas are not just dying younger; they are suffering more for longer, spending a far higher proportion of shorter lives in poor health. The North-South divide reinforces this: men in the North East live 74.1 years against 81.8 in the South East — a 7.7-year gap that widened after the 2008 financial crisis as austerity disproportionately cut public services and welfare in already-deprived communities.<Cite nums={1} /> The 2020 Marmot Review found that for the first time in over a century, life expectancy in England had stopped improving — and in the most deprived communities was actually declining.<Cite nums={2} /></p>
            <p>The NHS can treat the consequences of inequality but cannot address its causes, which are material: income, housing quality, employment conditions, and early childhood environment. NHS England&rsquo;s Core20PLUS5 framework targets the most deprived 20% across five clinical areas, but the health gap took decades to widen and will take decades to close even under optimistic scenarios. Public health spending fell 24% in real terms between 2015 and 2023, reducing the investment in prevention that could compress morbidity and narrow the gap.</p>
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
              changeText="Between most and least deprived decile · widened since 2001"
              sparklineData={[16.2, 17.1, 17.8, 18.1, 18.4, 18.6]}
              href="#sec-gap"source="ONS Health State Life Expectancies · 2018–20"
            />
            <MetricCard
              label="Life expectancy gap"
              value="10.2"
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText="Most deprived 74.1 yrs vs least deprived 83.5 yrs"
              sparklineData={[8.9, 9.2, 9.6, 9.9, 10.2, 10.4]}
              href="#sec-deprivation"source="ONS · 2018–20"
            />
            <MetricCard
              label="North-South LE gap"
              value="7.7"
              unit="years"
              direction="flat"
              polarity="up-is-bad"
              changeText="NE England 74.1 years vs SE 81.8 years"
              sparklineData={[7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.7, 7.7]}
              href="#sec-deprivation"source="ONS · 2020–22"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gap" className="mb-12">
            <LineChart
              title="Health inequality gap, 2001–2020"
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
            <p className="text-sm text-wiah-mid font-mono mb-6">Years of healthy life expected at birth, by deprivation decile. England, 2018–20.</p>
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS — Health State Life Expectancies, UK: 2018 to 2020</p>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Health State Life Expectancies by national deprivation deciles for England. Published 2022. ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthinequalities</p>
            <p>The Health Foundation — Marmot Review 10 Years On. 2020. health.org.uk/publications/reports/the-marmot-review-10-years-on</p>
            <p>Healthy life expectancy uses self-reported general health from the Annual Population Survey to classify years as &ldquo;in good health&rdquo;. Deprivation deciles are based on the Index of Multiple Deprivation 2019, applied at Lower Super Output Area level. Life expectancy uses the Sullivan method.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
