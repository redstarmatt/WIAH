'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface ChildhoodObesityData {
  year6Obesity: Array<{ year: number; rate: number }>
  receptionObesity: Array<{ year: number; rate: number }>
  byDeprivation: Array<{ quintile: string; rate: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ChildhoodObesityPage() {
  const [data, setData] = useState<ChildhoodObesityData | null>(null)

  useEffect(() => {
    fetch('/data/childhood-obesity/childhood_obesity.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const obesitySeries: Series[] = data
    ? [
        {
          id: 'year6',
          label: 'Year 6 obesity rate',
          colour: '#E63946',
          data: data.year6Obesity.map(d => ({
            date: yearToDate(d.year),
            value: d.rate,
          })),
        },
        {
          id: 'reception',
          label: 'Reception obesity rate',
          colour: '#F4A261',
          data: data.receptionObesity.map(d => ({
            date: yearToDate(d.year),
            value: d.rate,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Childhood Obesity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Childhood Obesity"
          question="How many children are obese by the time they leave primary school?"
          finding="22.7% of Year 6 children in England are obese — more than 1 in 5. Children in the most deprived areas are 3 times more likely to be obese than those in the least deprived."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>22.7% of Year 6 children in England were classified as obese in 2023/24 — up from 17.3% when measurement began in 2006 and substantially above the 20.2% recorded before the pandemic. Between 2019/20 and 2021/22, Year 6 obesity jumped 3.2 percentage points in two years as school closures, reduced physical activity, and disrupted food environments accelerated a pre-existing trend. The National Child Measurement Programme covers nearly all Reception and Year 6 children each year and provides one of the most consistent public health datasets in the country. The Soft Drinks Industry Levy (2018) and HFSS advertising watershed (2023) are the main policy responses, but their cumulative effect remains modest relative to the scale of deterioration.</p>
            <p>The deprivation gradient is stark and widening: children in the most deprived fifth of areas have an obesity rate of 35.7%, compared to 11.2% in the least deprived — a 3.2-times gap. Obese children are more likely to become obese adults, facing higher risks of Type 2 diabetes, cardiovascular disease, certain cancers, and mental health conditions. The NHS Long Term Plan estimates obesity costs the health service £6.5 billion a year in direct treatment costs, with an additional £27 billion in indirect economic costs. A child growing up in a deprived neighbourhood is more than three times as likely to be obese at the end of primary school as a child growing up in an affluent one.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Obesity Rates' },
          { id: 'sec-deprivation', label: 'Deprivation Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Year 6 obesity rate"
              value="22.7"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 17.3% in 2006 · COVID accelerated the rise"
              sparklineData={[17.3, 18.2, 19.1, 19.8, 20.0, 20.2, 21.0, 21.9, 23.4, 22.7]}
              href="#sec-chart"source="NHS NCMP · 2023/24"
            />
            <MetricCard
              label="Reception obesity rate"
              value="9.2"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Relatively stable but underlying trend upward since 2000s"
              sparklineData={[9.5, 9.8, 9.4, 9.6, 9.7, 9.9, 9.7, 9.7, 9.2]}
              href="#sec-deprivation"source="NHS NCMP · 2023/24"
            />
            <MetricCard
              label="Deprivation gap"
              value="3.2"
              unit="&times;"
              direction="up"
              polarity="up-is-bad"
              changeText="Most deprived 35.7% vs least deprived 11.2%"
              sparklineData={[2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.3, 3.2]}
              href="#sec-deprivation"source="NHS NCMP · 2023/24"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Childhood obesity rates, 2006–2023"
              subtitle="Percentage of children classified obese, England. Year 6 (age 10–11) and Reception (age 4–5)."
              series={obesitySeries}
              yLabel="% obese"
              source={{
                name: 'NHS Digital',
                dataset: 'National Child Measurement Programme',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deprivation" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Year 6 obesity by deprivation quintile, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Children in the most deprived areas are 3.2 times more likely to be obese than those in the least deprived.</p>
            {data && (
              <div className="space-y-3">
                {data.byDeprivation.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-36 text-sm text-wiah-black flex-shrink-0">{item.quintile}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.rate / 40) * 100}%`,
                          backgroundColor: item.quintile === 'Most deprived' ? '#E63946' : '#6B7280',
                        }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.rate.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS NCMP — National Child Measurement Programme 2023/24</p>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital — National Child Measurement Programme (NCMP). Annual measurement of height and weight of children in Reception (ages 4–5) and Year 6 (ages 10–11) in state-maintained schools in England. digital.nhs.uk/data-and-information/publications/statistical/national-child-measurement-programme</p>
            <p>Obesity is defined using the UK90 growth reference charts. Children at or above the 95th centile for their age and sex are classified as obese. The programme covers approximately 95% of eligible children in state schools.</p>
            <p>Deprivation quintiles are based on the Index of Multiple Deprivation (IMD) 2019, assigned to children using their school&rsquo;s Lower Super Output Area.</p>
          </div>
        </section>
      </main>
    </>
  )
}
