'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'

// ── Types ────────────────────────────────────────────────────────────────────

interface MentalHealthPoint {
  year: number
  pctMHDifficulties: number
}

interface CaringHours {
  band: string
  pct: number
}

interface ConditionCaredFor {
  condition: string
  pct: number
}

interface YoungCarersData {
  youngCarersMentalHealth: MentalHealthPoint[]
  caregivingHours: CaringHours[]
  byConditionCaredFor: ConditionCaredFor[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// ── Component ────────────────────────────────────────────────────────────────

export default function YoungCarersPage() {
  const [data, setData] = useState<YoungCarersData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/young-carers/young_carers.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load young carers data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!data) {
    return <div className="p-8 text-center">Failed to load data</div>
  }

  // ── Mental health trend chart ────────────────────────────────────────────

  const mhSeries: Series[] = [
    {
      id: 'mh',
      label: 'Young carers experiencing mental health difficulties',
      colour: '#264653',
      data: data.youngCarersMentalHealth.map((d) => ({
        date: yearToDate(d.year),
        value: d.pctMHDifficulties,
      })),
    },
  ]

  // ── Max value for bar charts ─────────────────────────────────────────────

  const maxCaringHours = Math.max(...data.caregivingHours.map((d) => d.pct))
  const maxCondition = Math.max(...data.byConditionCaredFor.map((d) => d.pct))

  return (
    <>
      <TopicNav topic="Young Carers" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Young Carers"
          question="How many children are caring for adults?"
          finding="800,000 children in the UK are providing unpaid care for a family member, often missing school and missing out on childhood — yet most are invisible to the services that could support them."
          colour="#264653"
        />

        {/* Context section */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 2021 Census recorded approximately 800,000 young carers in the UK—children and young people under 18 who provide unpaid care for a parent, sibling, or other family member living with illness, disability, or addiction. Researchers and charities consider this a significant undercount. Families do not readily identify a child as a carer; children themselves often regard what they do as simply &ldquo;helping out.&rdquo; Estimates accounting for unidentified carers put the true figure above one million. Many are caring for multiple hours a day, managing medication, providing physical assistance, or acting as translators and emotional supports for parents with mental illness.</p>
            <p>The educational and psychological toll is substantial. Young carers miss an average of 48 days of school per year—three times the general average—and 27% miss school regularly because of caring responsibilities. The cumulative absence directly depresses attainment: young carers are significantly less likely to achieve five GCSEs at grade C or above than their peers. The mental health consequences are equally stark. Around 42% of young carers report experiencing mental health difficulties, three times the rate of non-carers the same age. Higher rates of depression, anxiety, and social isolation compound the academic disadvantage. A quarter report having no-one they can turn to for support, which itself is a symptom of a system that has failed to find them.</p>
            </div>
        </section>

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <ScrollReveal>
            <MetricCard
              label="Young carers in UK"
              value="800,000"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="1 in 12 secondary school children"
              sparklineData={[650, 680, 720, 760, 800]}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Young carers missing school due to caring"
              value="27"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Average absence 48 days/year"
              sparklineData={[18, 20, 22, 25, 27]}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Young carers experiencing mental health difficulties"
              value="42"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="3x the rate for non-carers"
              sparklineData={[28, 32, 36, 39, 42]}
            />
          </ScrollReveal>
        </div>

        {/* Charts section */}
        <div className="max-w-4xl space-y-12 mb-12">
          {/* Mental health chart */}
          <ScrollReveal>
            <LineChart
              title="Young carers experiencing mental health difficulties"
              subtitle="Percentage of young carers reporting mental health difficulties. Carers Trust survey data."
              series={mhSeries}
              yLabel="Percent"
              source={{
                name: 'Carers Trust',
                dataset: 'Young Carers Survey',
                frequency: 'annual',
              }}
            />
          </ScrollReveal>

          {/* Caring hours chart */}
          <ScrollReveal>
            <div>
              <h3 className="text-xl font-bold text-wiah-black mb-2">
                Young carers: hours of care provided per week
              </h3>
              <div className="space-y-2 mt-4">
                {data.caregivingHours.map((item) => {
                  const width = (item.pct / maxCaringHours) * 100
                  return (
                    <div key={item.band} className="flex items-center gap-4">
                      <div className="w-40">
                        <p className="text-sm text-wiah-black font-sans">{item.band}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div
                          className="h-6 transition-all"
                          style={{
                            width: `${width}%`,
                            backgroundColor: '#264653',
                            borderRadius: '2px',
                          }}
                        />
                        <span className="text-sm font-mono text-wiah-black w-12 text-right">
                          {item.pct}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-wiah-mid font-mono mt-6">
                Source: Carers Trust, Young Carers Survey 2023
              </p>
            </div>
          </ScrollReveal>

          {/* Condition cared for chart */}
          <ScrollReveal>
            <div>
              <h3 className="text-xl font-bold text-wiah-black mb-2">
                What young carers are caring for
              </h3>
              <div className="space-y-2 mt-4">
                {data.byConditionCaredFor.map((item) => {
                  const width = (item.pct / maxCondition) * 100
                  return (
                    <div key={item.condition} className="flex items-center gap-4">
                      <div className="w-40">
                        <p className="text-sm text-wiah-black font-sans">{item.condition}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div
                          className="h-6 transition-all"
                          style={{
                            width: `${width}%`,
                            backgroundColor: '#264653',
                            borderRadius: '2px',
                          }}
                        />
                        <span className="text-sm font-mono text-wiah-black w-12 text-right">
                          {item.pct}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-wiah-mid font-mono mt-6">
                Source: Carers Trust, Young Carers Survey 2023
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="Young Carers Act gives rights to support"
          value="Right to support"
          description="The Care Act 2014 and Children and Families Act 2014 gave young carers the right to a needs assessment from their local authority and established a duty on local authorities to consider the impact of caring on a child's wellbeing. But only a minority of young carers are identified, and fewer still receive any formal support."
          source="Source: UK legislation — Care Act 2014, Children and Families Act 2014."
        />
        </ScrollReveal>

      </main>
    </>
  )
}
