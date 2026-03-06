'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import PositiveCallout from '@/components/PositiveCallout'
import SectionNav from '@/components/SectionNav'

interface DementiaData {
  prevalence: Array<{ year: number; estimated: number; diagnosed: number }>
  diagnosisRate: Array<{ year: number; rate: number }>
  byCareType: Array<{ type: string; pct: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function DementiaPage() {
  const COLOUR = '#264653'
  const [data, setData] = useState<DementiaData | null>(null)

  useEffect(() => {
    fetch('/data/dementia/dementia.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const prevalenceSeries: Series[] = data
    ? [
        {
          id: 'estimated',
          label: 'Estimated with dementia',
          colour: COLOUR,
          data: data.prevalence.map(d => ({
            date: yearToDate(d.year),
            value: d.estimated,
          })),
        },
        {
          id: 'diagnosed',
          label: 'With a diagnosis',
          colour: '#E63946',
          data: data.prevalence.map(d => ({
            date: yearToDate(d.year),
            value: d.diagnosed,
          })),
        },
      ]
    : []

  const diagnosisRateSeries: Series[] = data
    ? [
        {
          id: 'rate',
          label: 'Diagnosis rate',
          colour: '#E63946',
          data: data.diagnosisRate.map(d => ({
            date: yearToDate(d.year),
            value: d.rate,
          })),
        },
      ]
    : []

  const prevalenceAnnotations: Annotation[] = [
    {
      date: yearToDate(2020),
      label: 'COVID-19: diagnosis activity paused',
    },
  ]

  const diagnosisRateTarget = { value: 66.7, label: 'NHS target: 66.7%' }

  const maxCareTypePct = data ? Math.max(...data.byCareType.map(d => d.pct)) : 100

  return (
    <main className="min-h-screen bg-white">
      <TopicNav topic="Dementia" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionNav
          sections={[
            { id: 'sec-overview', label: 'Overview' },
            { id: 'sec-context', label: 'Context' },

            { id: 'sec-charts', label: 'Charts' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <section id="sec-overview" className="pt-12 pb-8">
          <TopicHeader
            topic="Dementia"
            colour={COLOUR}
            question="Are we ready for the dementia crisis?"
            finding="Almost a million people in the UK are living with dementia, but diagnosis rates are falling and care capacity is being overwhelmed."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <MetricCard
              label="People with dementia"
              value="944,000"
              direction="up"
              polarity="up-is-bad"
              changeText="+280,000 since 2012"
              onExpand={() => {}}
            />
            <MetricCard
              label="Diagnosed with dementia"
              value="63.4%"
              direction="down"
              polarity="up-is-good"
              changeText="Target 66.7% — last met 2019"
              onExpand={() => {}}
            />
            <MetricCard
              label="Unpaid carer hours/week"
              value="4.5 billion"
              direction="up"
              polarity="up-is-bad"
              changeText="+900M since 2015"
              onExpand={() => {}}
            />
          </div>
        </section>

        <section id="sec-context" className="py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Context</h2>
          <div className="max-w-2xl mt-4 mb-12">
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Dementia is the UK's leading cause of death, responsible for around 66,000 deaths per year and having overtaken heart disease in 2011. An estimated 944,000 people in the UK live with the condition now; by 2040, as the population ages, that figure is projected to reach 1.6 million. The total cost to the UK economy is £34.7 billion per year — more than cancer, heart disease, and stroke combined, according to the Alzheimer's Society. Direct NHS costs account for £4.3 billion; social care costs £16.4 billion; and unpaid family carers absorb an estimated £13.9 billion of largely invisible labour. Dementia is not merely a health crisis: it is a fiscal and social one that scales with an ageing society.</p>
              <p>Only 63.4% of estimated cases carry a formal diagnosis — below the NHS target of 66.7%, and a level last consistently met before 2019. The COVID-19 pandemic caused diagnosis activity to collapse to 55.7%, creating a backlog that has not fully cleared. Late or absent diagnosis matters because it delays access to treatment, support, and legal planning. Two-thirds of people with dementia live at home rather than in care, supported overwhelmingly by unpaid family carers who provide an average of 71 hours of care per week. This is not a choice made in full knowledge of alternatives: it is the structural consequence of a social care system that cannot absorb the scale of need. The carer burden — physical, financial, and psychological — is itself a significant public health issue.</p>
            </div>
          </div>
        </section>

        <PositiveCallout
          title="New drug treatments emerging"
          value="−35%"
          description="Lecanemab and donanemab — the first drugs shown to slow Alzheimer's progression — received FDA approval in 2023. NICE is currently evaluating both for NHS use. They slow cognitive decline by around 35% in early-stage patients."
          source="Source: FDA &amp; NICE"
        />

        <section id="sec-charts" className="py-12 border-t border-wiah-border">
          <ScrollReveal>
            <div className="mb-10">
              {data && (
                <LineChart
                  title="Estimated dementia prevalence and diagnoses, England"
                  subtitle="Thousands of people. Estimated total vs those with a formal diagnosis."
                  series={prevalenceSeries}
                  annotations={prevalenceAnnotations}
                />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              {data && (
                <LineChart
                  title="Dementia diagnosis rate, England"
                  subtitle="Percentage of estimated cases with a formal diagnosis. NHS target: 66.7%."
                  series={diagnosisRateSeries}
                  targetLine={diagnosisRateTarget}
                />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-10 mb-10">
              <h2 className="text-xl font-bold text-wiah-black mb-6">
                How people with dementia are supported
              </h2>
              <div className="space-y-2">
                {data &&
                  data.byCareType.map(item => (
                    <div key={item.type} className="flex items-center gap-3">
                      <div className="w-48 text-xs font-mono text-wiah-mid text-right">
                        {item.type}
                      </div>
                      <div className="flex-1 bg-wiah-light rounded-sm h-6 overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all duration-300"
                          style={{
                            width: `${(item.pct / maxCareTypePct) * 100}%`,
                            backgroundColor: COLOUR,
                          }}
                        />
                      </div>
                      <div className="w-8 text-xs font-mono text-wiah-mid text-right">
                        {item.pct}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="sec-sources" className="py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">
            Sources &amp; methodology
          </h2>
          <div className="space-y-2 font-mono text-xs text-wiah-mid">
            <p>Dementia prevalence and diagnosis rates: Alzheimer's Society, 2024</p>
            <p>
              Carer hours and care breakdown: Carers UK, 2023 State of Caring Report
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
