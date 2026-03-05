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
          finding="England&apos;s recycling rate has stalled at around 44% for a decade &mdash; below the EU average of 48% and far short of the 65% target for 2035. The good news: landfill has collapsed from 38% to 6% since 2010."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s recycling rate reached approximately 46% around 2017 and has drifted down since, standing at 43.5% in 2022. A decade of effective stagnation places England below the EU average of 48% and makes the 2035 target of 65% look implausible on current trajectory. The flat rate does not mean no progress has been made &mdash; the composition of what is recycled has improved, and the quality of recyclate has increased &mdash; but in headline terms the nation is not becoming more circular. The peak achieved in the mid-2010s was partly driven by the growth of kerbside recycling collection; without structural change to what is collected and processed, the easy gains have been made.</p>
            <p>Germany&apos;s 66.7% recycling rate provides a point of contrast. The German system is built on producer responsibility: manufacturers pay into a recycling fund that funds collection and processing, creating a financial incentive to design products for recyclability. The UK&apos;s Extended Producer Responsibility system &mdash; which shifts the cost of packaging collection and recycling onto producers &mdash; was legislated in the Environment Act 2021 and began phased implementation in 2024. If it works as designed, it could generate around £1.7 billion per year for local authority recycling services and create industry incentives to reduce packaging weight and complexity.</p>
            <p>One reason England&apos;s rate stalled after 2017 was China&apos;s &ldquo;National Sword&rdquo; policy, introduced in 2018, which banned imports of contaminated recyclate. Before National Sword, UK recycling processors had been sending large volumes of mixed plastic to China for sorting. When China closed its doors, processors were left with materials they could not economically handle domestically. Some materials that had been counted as &ldquo;recycled&rdquo; on the basis of being exported were no longer counted, and some were landfilled or incinerated. This was partly a statistical effect &mdash; removing the fiction that exported materials were being recycled &mdash; and partly a genuine capacity problem.</p>
            <p>The landfill success story is the counter-narrative. In 2010, 38% of England&apos;s municipal waste went to landfill. By 2022, that figure was 6%. This was achieved through the Landfill Tax, which rose steadily from its introduction in 1996, making landfill economically unattractive. The gap was filled by energy recovery &mdash; burning waste in energy-from-waste facilities to generate electricity and heat. Energy recovery now accounts for 50% of England&apos;s non-recycled waste. From a circular economy perspective, this is still a linear endpoint &mdash; materials are destroyed &mdash; but it is significantly better than landfill from both environmental and odour/leachate perspectives.</p>
            <p>The Simpler Recycling reforms, due for full implementation by 2026, aim to standardise what can be recycled across England&apos;s 317 local authority collection systems. Currently, a resident may be able to recycle plastic film in one borough and not in the neighbouring borough. Standardisation reduces confusion, which is the primary driver of contamination. Deposit Return Schemes for plastic bottles and cans, implemented in Scotland in 2023 and planned for England, add financial incentives for consumers to return high-value materials. If both reforms deliver as planned, England&apos;s recycling rate has genuine potential to improve in the late 2020s. But the 65% target for 2035 remains a significant stretch from 43.5%.</p>
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
            changeText="Peaked at 45.7% in 2016 &middot; stalling and slightly falling"
            sparklineData={[40.4, 43.0, 44.8, 45.7, 44.7, 44.0, 43.5]}
            source="DEFRA Waste Statistics &middot; 2022"
            onExpand={() => {}}
          />
          <MetricCard
            label="EU average recycling rate"
            value="48"
            unit="%"
            direction="up"
            polarity="up-is-good"
            changeText="Germany 66.7% &middot; England below EU average and falling behind"
            sparklineData={[44, 45, 46, 47, 47, 48]}
            source="Eurostat &middot; 2021"
            onExpand={() => {}}
          />
          <MetricCard
            label="Waste going to landfill"
            value="6"
            unit="%"
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 38% in 2010 &mdash; a genuine success story"
            sparklineData={[38, 30, 23, 15, 8, 6]}
            source="DEFRA &middot; 2022"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <PositiveCallout
          title="Landfill virtually eliminated"
          value="-32 pp"
          unit=""
          description="Landfill has fallen from 38% of waste in 2010 to just 6% in 2022 &mdash; one of England&apos;s most significant environmental improvements of the past decade."
          source="DEFRA Waste Statistics, 2022"
        />
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-recycling" className="mb-12">
          <LineChart
            title="England household recycling rate, 2010&ndash;2022"
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
            {' '}&middot;{' '}
            <a href="https://ec.europa.eu/eurostat/statistics-explained/index.php/Waste_statistics" className="underline" target="_blank" rel="noopener noreferrer">
              Eurostat Waste Statistics
            </a>
            {' '}&middot;{' '}
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
