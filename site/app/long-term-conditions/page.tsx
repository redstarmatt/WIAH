'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface LongTermConditionsData {
  prevalence: Array<{ year: number; millionPeople: number; projected?: boolean }>
  topConditions: Array<{ condition: string; millions: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function LongTermConditionsPage() {
  const [data, setData] = useState<LongTermConditionsData | null>(null)

  useEffect(() => {
    fetch('/data/long-term-conditions/long_term_conditions.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const actualSeries: Series[] = data
    ? [{
        id: 'actual',
        label: 'People with 2+ long-term conditions',
        colour: '#E63946',
        data: data.prevalence
          .filter(d => !d.projected)
          .map(d => ({
            date: yearToDate(d.year),
            value: d.millionPeople,
          })),
      }]
    : []

  const projectedSeries: Series[] = data
    ? [{
        id: 'projected',
        label: 'Projected (millions)',
        colour: '#F4A261',
        data: data.prevalence
          .filter(d => d.projected)
          .map(d => ({
            date: yearToDate(d.year),
            value: d.millionPeople,
          })),
      }]
    : []

  const allSeries: Series[] = [...actualSeries, ...projectedSeries]

  return (
    <>
      <TopicNav topic="Long-Term Conditions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Long-Term Conditions"
          question="How many people are managing multiple long-term illnesses?"
          finding="15.4 million people in England live with two or more long-term conditions — accounting for 77% of all NHS spending. By 2035, this is projected to rise to 17.9 million as the population ages."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>15.4 million people in England now live with two or more long-term conditions — almost double the 8.2 million in 2000 — accounting for 77% of all NHS spending, approximately £120 billion a year. The most common conditions are hypertension (12.4 million), depression (8.1 million), asthma (5.4 million), diabetes (4.4 million), COPD (1.2 million), and heart failure (0.9 million), and they frequently co-occur in the same patient. Multimorbidity rises steeply with age: 14% of under-45s, over 60% of those aged 65 and over, and over 80% of those aged 75 and over. England's ageing population means 17.9 million people are projected to have two or more long-term conditions by 2035, a 16% increase in 14 years. The NHS Long Term Plan invested in the NHS Diabetes Prevention Programme and social prescribing, but prevention is slow; the people who will be 75 in 2035 are already in their 60s today.</p>
            <p>The NHS was designed around single-condition specialities — cardiac, respiratory, endocrine — and the organisation of care has struggled to adapt to a patient population typically managing three, four, or five conditions simultaneously. Integrated Care Systems, introduced in 2022, are intended to align primary, community, mental health, and hospital care around population need rather than organisational silos. Whether they will prove equal to the challenge of 17.9 million people with complex multimorbidity by 2035 is the defining question in NHS sustainability — and the burden falls disproportionately on deprived communities where multiple conditions onset earlier, cluster more severely, and where prevention infrastructure is weakest.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Prevalence Trend' },
          { id: 'sec-conditions', label: 'Top Conditions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People with 2+ long-term conditions"
              value="15.4m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 8.2m in 2000 · driven by ageing + obesity"
              sparklineData={[8.2, 9.4, 11.2, 13.1, 14.3, 15.4]}
              href="#sec-chart"source="NHS England · 2021"
            />
            <MetricCard
              label="Share of NHS spending on LTCs"
              value="77"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="£77bn/year · preventable complications cost £9bn"
              sparklineData={[65, 68, 70, 72, 74, 75, 77]}
              href="#sec-conditions"source="NHS England Long Term Plan"
            />
            <MetricCard
              label="Projected by 2035"
              value="17.9m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="16% increase in 14 years · ageing demographics driving rise"
              sparklineData={[11.2, 13.1, 14.3, 15.4, 16.2, 17.2, 17.9]}
              href="#sec-conditions"source="NHS England projection"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="People with 2+ long-term conditions, 2000–2035"
              subtitle="England. Actual data to 2021; NHS England projections to 2035 shown in amber."
              series={allSeries}
              yLabel="Millions of people"
              source={{
                name: 'NHS England',
                dataset: 'Long Term Plan &amp; multimorbidity projections',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-conditions" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Most prevalent long-term conditions in England</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Estimated number of people diagnosed with each condition. Many people have multiple conditions simultaneously.</p>
            {data && (
              <div className="space-y-3">
                {[...data.topConditions].sort((a, b) => b.millions - a.millions).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-36 text-sm text-wiah-black flex-shrink-0">{item.condition}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.millions / 14) * 100}%`,
                          backgroundColor: '#264653',
                        }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-mono text-wiah-black">{item.millions.toFixed(1)}m</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England — Quality and Outcomes Framework (QOF) disease registers, 2022/23</p>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England — NHS Long Term Plan, 2019. Multimorbidity prevalence and projection data. england.nhs.uk/long-term-plan</p>
            <p>The Health Foundation — Multimorbidity: a priority for global health research. health.org.uk</p>
            <p>NHS Digital — Quality and Outcomes Framework (QOF). Annual disease register data for primary care long-term conditions. digital.nhs.uk/data-and-information/publications/statistical/quality-and-outcomes-framework-achievement-prevalence-and-exceptions-data</p>
            <p>Multimorbidity is defined as the presence of two or more long-term conditions. Prevalence estimates are modelled from QOF disease registers and primary care records. Projections to 2035 use demographic projections from ONS combined with observed trends in condition incidence and prevalence.</p>
          </div>
        </section>
      </main>
    </>
  )
}
