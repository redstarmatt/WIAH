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
          finding="800,000 children in the UK are providing unpaid care for a family member, often missing school and missing out on childhood &mdash; yet most are invisible to the services that could support them."
          colour="#264653"
        />

        {/* Context section */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 2021 Census recorded approximately 800,000 young carers in the UK &mdash; children under 18 providing unpaid care for a parent, sibling, or other family member living with illness, disability, or addiction &mdash; and researchers consider this a significant undercount, with the true figure likely above one million. The educational and psychological toll is substantial: young carers miss an average of 48 days of school per year, three times the general average, and 27% miss school regularly. Around 42% report experiencing mental health difficulties, three times the rate of non-carers the same age. The Care Act 2014 gave young carers the legal right to a needs assessment from their local authority, but only one in three has ever received one, and local authority budgets for young carer services have been cut significantly since 2010.</p>
            <p>The burden falls hardest on children already facing multiple disadvantages. Families reliant on young carers are disproportionately in the lowest income quintiles, with single-parent households and those affected by parental disability or chronic mental illness most exposed. Children from Pakistani, Bangladeshi, and Black Caribbean backgrounds are overrepresented, partly reflecting higher rates of multigenerational households and language barriers that make children de facto interpreters for NHS and benefits interactions. Girls carry a heavier load: among carers aged 11&ndash;15, girls average four hours more care per week than boys. A 2023 Carers Trust report found that former young carers earned on average 12&percnt; less in their late twenties than peers, a gap attributable almost entirely to lower qualification levels.</p>
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
          description="The Care Act 2014 and Children and Families Act 2014 gave young carers the right to a needs assessment from their local authority and established a duty on local authorities to consider the impact of caring on a child&apos;s wellbeing. But only a minority of young carers are identified, and fewer still receive any formal support."
          source="Source: UK legislation — Care Act 2014, Children and Families Act 2014."
        />
        </ScrollReveal>

      </main>
    </>
  )
}
