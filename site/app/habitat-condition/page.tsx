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
            <p>England&apos;s Sites of Special Scientific Interest are the backbone of statutory nature protection &mdash; 4,120 sites covering 8% of the land area, selected for their geological or biological significance. The government target is 70% in favourable or recovering condition. In 2023, only 53.6% met that threshold, a figure that has barely moved since 2010 despite decades of policy commitment. The number is all the more striking because it represents the best-protected habitats in the country. If the protected sites are in poor condition, the unprotected landscape is almost certainly worse.</p>
            <p>The ancient woodland story is one of the starkest in British environmental history. Before agriculture and industry, roughly 2.5 million hectares of ancient woodland &mdash; woodland that has existed continuously since 1600 &mdash; covered England. Today 643,000 hectares remain, a reduction of 74%. The losses accelerated in the twentieth century as planning permitted road and housing development directly through ancient woods. Ancient woodland cannot be recreated: the term refers specifically to its centuries of continuous existence, and new planting cannot substitute for the species assemblages that develop over hundreds of years in undisturbed soil.</p>
            <p>Lowland meadows are Britain&apos;s most acutely threatened habitat. In 1940 there were approximately 3.7 million hectares of traditional, flower-rich grassland managed by hay-cutting. Fertiliser use, drainage, ploughing and conversion to intensive silage production have reduced this to around 15,000 hectares &mdash; a loss of 99.6%. These meadows are not merely picturesque. They support exceptionally high plant diversity, and consequently insect, bird and mammal diversity. Their loss is inseparable from the collapse in insect abundance recorded across Britain since the 1970s.</p>
            <p>Hedgerows &mdash; the network of woody boundaries that divided the pre-agricultural landscape into fields &mdash; totalled around 800,000 kilometres in 1950. Intensive farming consolidation, driven partly by subsidy structures that favoured larger field sizes and machinery access, reduced this to approximately 390,000 kilometres by the early 2000s. Hedgerows function as wildlife corridors, allowing species to move between fragmented habitats. Their loss compounds the isolation of nature reserves and SSSI sites, making it harder for populations to recover or recolonise.</p>
            <p>The causes of habitat loss are well understood: intensive agriculture remains the dominant driver through drainage, fertiliser run-off, and the conversion of non-productive land. But the levers for change exist. The Environmental Land Management schemes (ELMs) are designed to pay farmers to maintain and restore habitats. Higher-tier Countryside Stewardship agreements can require specific management of ancient woodland, hay meadow restoration, and hedgerow maintenance. The question is whether uptake reaches the scale needed. In 2024, only 8% of farms had joined ELMs. At that pace of uptake, the 2030 biodiversity targets enshrined in the Environment Act 2021 &mdash; halting species decline, and 30×30 protected area coverage &mdash; will not be met on current trajectory.</p>
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
