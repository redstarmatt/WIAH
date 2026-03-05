'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface HabitatConditionData {
  sssiFavourableCondition: { year: number; percent: number }[]
  habitatTimeSeries: { type: string; current: number; historical: number }[]
  priorityHabitatCondition: { habitat: string; percentFavourable: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HabitatConditionPage() {
  const [data, setData] = useState<HabitatConditionData | null>(null)

  useEffect(() => {
    fetch('/data/habitat-condition/habitat_condition.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const sssitSeries: Series[] = data
    ? [{
        id: 'sssi',
        label: 'SSSIs in favourable condition',
        colour: '#E63946',
        data: data.sssiFavourableCondition.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Habitat Condition" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Habitat Condition"
          question="What condition is Britain&apos;s protected natural environment in?"
          finding="Only 53.6% of England&apos;s Sites of Special Scientific Interest are in favourable condition &mdash; well below the 70% target. Lowland meadows have declined by 99.6% since 1940. Hedgerow length has halved since 1950."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s 4,120 Sites of Special Scientific Interest cover 8&percnt; of the land area and represent the best-protected habitats in the country &mdash; yet only 53.6&percnt; are in favourable or recovering condition, well below the 70&percnt; government target, and the figure has barely moved since 2010. Lowland meadows have declined by 99.6&percnt; since 1940, from 3.7 million hectares to around 15,000 hectares, driven by fertiliser use, drainage, and conversion to intensive silage. Ancient woodland &mdash; woodland in continuous existence since 1600 &mdash; has fallen 74&percnt; from 2.5 million to 643,000 hectares, and cannot be recreated through new planting. Hedgerow length has roughly halved from 800,000 to 390,000 kilometres since 1950, erasing the wildlife corridors on which species movement between fragmented habitats depends.</p>
            <p>The mechanisms of decline are well understood; the question is whether the policy response can match the scale required. The Environmental Land Management schemes (ELMs) are designed to pay farmers to restore habitats, but in 2024 only 8&percnt; of farms had joined. At current uptake, the Environment Act 2021 targets &mdash; halting species decline and 30&times;30 protected area coverage by 2030 &mdash; will not be met. The loss of lowland meadows is directly connected to the collapse of insect abundance documented since the 1970s, with cascading effects on pollination, bird populations, and the broader food web that no amount of SSSI management can reverse without also transforming the surrounding agricultural landscape.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sssi', label: 'SSSI Condition' },
          { id: 'sec-habitats', label: 'Priority Habitats' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="SSSIs in favourable condition"
            value="53.6"
            unit="%"
            direction="flat"
            polarity="up-is-good"
            changeText="Target is 70% &middot; barely moved from 52% since 2010"
            sparklineData={[58.2, 52.4, 51.1, 52.6, 53.0, 53.2, 53.4, 53.6]}
            source="Natural England &middot; 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="Ancient woodland remaining"
            value="643k"
            unit="ha"
            direction="flat"
            polarity="up-is-good"
            changeText="Down from 2.5m ha &mdash; a 74% loss over 200 years"
            sparklineData={[2500, 1900, 1400, 1000, 800, 700, 643]}
            source="Woodland Trust &middot; 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="Lowland meadow remaining"
            value="15,000"
            unit="ha"
            direction="flat"
            polarity="up-is-good"
            changeText="From 3.7 million ha in 1940 &mdash; 99.6% lost"
            sparklineData={[3700000, 1200000, 400000, 100000, 30000, 15000]}
            source="Wildlife Trusts / Natural England"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-sssi" className="mb-12">
          <LineChart
            title="England&apos;s SSSIs in favourable condition, 2003&ndash;2023"
            subtitle="Percentage of total SSSI area meeting favourable or recovering condition assessment. Natural England."
            series={sssitSeries}
            annotations={[
              { date: new Date(2010, 6, 1), label: '70% target set by government' },
            ]}
            yLabel="% in favourable condition"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-habitats" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Priority habitat condition</h3>
          <p className="text-sm text-wiah-mid mb-6">Percentage of each priority habitat type assessed as being in favourable condition. Natural England.</p>
          <div className="space-y-3">
            {data?.priorityHabitatCondition.map(item => (
              <div key={item.habitat} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-40 text-sm text-wiah-black">{item.habitat}</div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 rounded"
                    style={{
                      width: `${item.percentFavourable}%`,
                      backgroundColor: item.percentFavourable < 20 ? '#E63946' : item.percentFavourable < 50 ? '#F4A261' : '#2A9D8F',
                    }}
                  />
                </div>
                <div className="flex-shrink-0 w-12 text-right font-mono text-sm text-wiah-black">
                  {item.percentFavourable}%
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/organisations/natural-england" className="underline" target="_blank" rel="noopener noreferrer">
              Natural England SSSI condition reports
            </a>
            {' '}&middot; Woodland Trust (woodlandtrust.org.uk) &middot; Wildlife Trusts
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
