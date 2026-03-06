'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface CircularEconomyData {
  recyclingRate: { year: number; percent: number }[]
  wasteByDestination: { year: number; landfill: number; recycling: number; recovery: number }[]
  euComparison2021: { country: string; rate: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CircularEconomyPage() {
  const [data, setData] = useState<CircularEconomyData | null>(null)

  useEffect(() => {
    fetch('/data/circular-economy/circular_economy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const recyclingSeries: Series[] = data
    ? [{
        id: 'recycling',
        label: 'Recycling rate (%)',
        colour: '#F4A261',
        data: data.recyclingRate.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Recycling & Circular Economy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Recycling &amp; Circular Economy"
          question="Is Britain actually recycling more?"
          finding="England's recycling rate has stalled at around 44% for a decade — below the EU average of 48% and far short of the 65% target for 2035. The good news: landfill has collapsed from 38% to 6% since 2010."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's household recycling rate peaked at around 45.7% in 2016, stalled, and stood at 43.5% in 2022 — below the EU average of 48% and far short of the 2035 target of 65%. China's 2018 National Sword policy, which banned imports of contaminated recyclate, partly explains the post-2017 drift: materials previously counted as recycled via export were no longer counted, exposing a genuine domestic processing capacity gap. The counter-narrative is landfill: driven by the Landfill Tax, the share of waste going to landfill fell from 38% in 2010 to just 6% in 2022, replaced largely by energy-from-waste incineration. The UK's Extended Producer Responsibility system, legislated in 2021 and entering phased implementation from 2024, could generate £1.7 billion per year for local authority recycling services.</p>
            <p>England's 317 local authorities operate incompatible recycling collection systems, creating confusion that drives contamination: a resident may be able to recycle plastic film in one borough and not the neighbouring one. Simpler Recycling reforms aim to standardise this by 2026, and Deposit Return Schemes for bottles and cans are planned following Scotland's 2023 implementation. Germany achieves 66.7% through deep producer responsibility and standardised collection — a model England has the legislative tools to approach but not yet the delivery infrastructure to match.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-recycling', label: 'Recycling Rate' },
          { id: 'sec-eu', label: 'EU Comparison' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="England household recycling rate"
            value="43.5"
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText="Peaked at 45.7% in 2016 · stalling and slightly falling"
            sparklineData={[40.4, 43.0, 44.8, 45.7, 44.7, 44.0, 43.5]}
            source="DEFRA Waste Statistics · 2022"
            href="#sec-recycling"/>
          <MetricCard
            label="EU average recycling rate"
            value="48"
            unit="%"
            direction="up"
            polarity="up-is-good"
            changeText="Germany 66.7% · England below EU average and falling behind"
            sparklineData={[44, 45, 46, 47, 47, 48]}
            source="Eurostat · 2021"
            href="#sec-eu"/>
          <MetricCard
            label="Waste going to landfill"
            value="6"
            unit="%"
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 38% in 2010 — a genuine success story"
            sparklineData={[38, 30, 23, 15, 8, 6]}
            source="DEFRA · 2022"
            href="#sec-eu"/>
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <PositiveCallout
          title="Landfill virtually eliminated"
          value="-32 pp"
          unit=""
          description="Landfill has fallen from 38% of waste in 2010 to just 6% in 2022 — one of England's most significant environmental improvements of the past decade."
          source="DEFRA Waste Statistics, 2022"
        />
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-recycling" className="mb-12">
          <LineChart
            title="England household recycling rate, 2010–2022"
            subtitle="Percentage of local authority collected waste sent for recycling, composting or reuse. DEFRA."
            series={recyclingSeries}
            annotations={[
              { date: new Date(2018, 6, 1), label: "China's National Sword policy" },
            ]}
            yLabel="% recycled"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-eu" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Recycling rates across Europe, 2021</h3>
          <p className="text-sm text-wiah-mid mb-6">Municipal waste recycling rate by country. Eurostat.</p>
          <div className="space-y-3">
            {data?.euComparison2021
              .sort((a, b) => b.rate - a.rate)
              .map(item => (
              <div key={item.country} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-28 text-sm text-wiah-black">{item.country}</div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 rounded"
                    style={{
                      width: `${item.rate}%`,
                      backgroundColor: item.country === 'UK' ? '#F4A261' : '#264653',
                    }}
                  />
                </div>
                <div className="flex-shrink-0 w-12 text-right font-mono text-sm text-wiah-black">
                  {item.rate}%
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/statistics/uk-waste-data" className="underline" target="_blank" rel="noopener noreferrer">
              DEFRA Waste Statistics (gov.uk)
            </a>
            {' '}·{' '}
            <a href="https://ec.europa.eu/eurostat/statistics-explained/index.php/Waste_statistics" className="underline" target="_blank" rel="noopener noreferrer">
              Eurostat Waste Statistics
            </a>
            {' '}·{' '}
            <a href="https://wrap.ngo" className="underline" target="_blank" rel="noopener noreferrer">
              WRAP (wrap.ngo)
            </a>
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
