'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'

// ── Types ────────────────────────────────────────────────────────────────────

interface ScreeningPoint {
  year: number
  uptakePct: number
}

interface DeprivationItem {
  quintile: string
  cervicalPct: number
}

interface NHSScreeningData {
  breastScreening: ScreeningPoint[]
  cervicalScreening: ScreeningPoint[]
  byDeprivation: DeprivationItem[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// ── Component ────────────────────────────────────────────────────────────────

export default function NHSScreeningPage() {
  const [data, setData] = useState<NHSScreeningData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/nhs-screening/nhs_screening.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load NHS screening data:', err)
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

  // ── Two-series screening chart ───────────────────────────────────────────

  const screeningSeries: Series[] = [
    {
      id: 'breast',
      label: 'Breast screening',
      colour: '#2A9D8F',
      data: data.breastScreening.map((d) => ({
        date: yearToDate(d.year),
        value: d.uptakePct,
      })),
    },
    {
      id: 'cervical',
      label: 'Cervical screening',
      colour: '#264653',
      data: data.cervicalScreening.map((d) => ({
        date: yearToDate(d.year),
        value: d.uptakePct,
      })),
    },
  ]

  // ── Max value for deprivation bar chart ──────────────────────────────────

  const maxDeprivation = Math.max(...data.byDeprivation.map((d) => d.cervicalPct))

  return (
    <>
      <TopicNav topic="Cancer Screening" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cancer Screening"
          question="Are people taking up cancer screening?"
          finding="Cancer screening uptake in England has fallen below recommended thresholds for all three national screening programmes, with younger age groups and deprived communities significantly less likely to attend."
          colour="#2A9D8F"
        />

        {/* Context section */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cancer screening works best when it catches disease early. For cervical cancer, early-stage survival is close to 100%; late-stage survival is around 5%. Yet cervical screening uptake in England has fallen from 79% in 2010 to 71% in 2022 — the lowest since records began — and the 80% target has not been met since 2009. Around 850 women die of cervical cancer each year in England, most in cases where screening either was not taken up or was too late. Breast screening uptake has fallen similarly, from 72% to 65% over the same period. Bowel cancer — the UK's second deadliest cancer at 16,000 deaths a year — remains treatable in 90% of cases if caught early, but bowel screening uptake sits at 68% against a 75% target.</p>
            <p>Non-participation is not evenly distributed. Across all three programmes, uptake falls sharply with deprivation: cervical screening is taken up by 78% of women in the least deprived areas, but only 63% in the most deprived — the same communities where cancer incidence is already highest. The result is a compounding inequality: those most likely to develop cancer are least likely to be screened. The drivers of non-participation differ by programme — embarrassment and the practicalities of stool sampling suppress bowel screening uptake, while for cervical and breast screening, barriers include distrust of clinical services, difficulty taking time off work, and — for breast screening — lingering public uncertainty following the 2012 Marmot review, which raised questions about the risk of over-diagnosis. The NHS evidence is clear: breast screening reduces breast cancer mortality by 20%.</p>
            </div>
        </section>

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <ScrollReveal>
            <MetricCard
              label="Bowel cancer screening uptake"
              value="68"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Target 75%; 1,200 cancers prevented annually"
              sparklineData={[72, 71, 70, 69, 68]}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Breast screening uptake"
              value="65"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 72% in 2010; target 70%"
              sparklineData={[72, 71, 70, 67, 65]}
            />
          </ScrollReveal>
          <ScrollReveal>
            <MetricCard
              label="Cervical screening uptake"
              value="71"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Lowest since records began; target 80%"
              sparklineData={[79, 77, 74, 73, 71]}
            />
          </ScrollReveal>
        </div>

        {/* Charts section */}
        <div className="max-w-4xl space-y-12 mb-12">
          {/* Screening uptake trend chart */}
          <ScrollReveal>
            <LineChart
              title="NHS cancer screening uptake, England"
              subtitle="Percentage of eligible women invited who are screened. NHS Digital."
              series={screeningSeries}
              yLabel="Percent"
              source={{
                name: 'NHS Digital',
                dataset: 'Cancer Screening Programmes Data',
                frequency: 'annual',
              }}
            />
          </ScrollReveal>

          {/* Deprivation chart */}
          <ScrollReveal>
            <div>
              <h3 className="text-xl font-bold text-wiah-black mb-2">
                Cervical screening uptake by deprivation quintile
              </h3>
              <div className="space-y-2 mt-4">
                {data.byDeprivation.map((item) => {
                  const width = (item.cervicalPct / maxDeprivation) * 100
                  return (
                    <div key={item.quintile} className="flex items-center gap-4">
                      <div className="w-40">
                        <p className="text-sm text-wiah-black font-sans">{item.quintile}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div
                          className="h-6 transition-all"
                          style={{
                            width: `${width}%`,
                            backgroundColor: '#2A9D8F',
                            borderRadius: '2px',
                          }}
                        />
                        <span className="text-sm font-mono text-wiah-black w-12 text-right">
                          {item.cervicalPct}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-wiah-mid font-mono mt-6">
                Source: NHS Digital, Cancer Screening Programmes Data
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="HPV vaccination nearly eliminated cervical cancer in young women"
          value="87%"
          description="The HPV vaccination programme, introduced in 2008 for girls aged 12–13 and extended to boys in 2019, has been transformative. A 2021 Lancet study found an 87% reduction in cervical cancer in women who received the vaccine at the recommended age — suggesting the programme will prevent thousands of cancers over the coming decades."
          source="Source: Lancet, 2021 — Long-term cervical cancer prevention after HPV vaccination."
        />
        </ScrollReveal>

      </main>
    </>
  )
}
