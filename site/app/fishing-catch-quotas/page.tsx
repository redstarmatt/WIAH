'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface FishingCatchQuotasData {
  timeSeries: Array<{
    year: number
    totalCatchKt: number
    quotaValueMUK: number
  }>
  quotaSoldToForeignVesselsPct: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FishingCatchQuotasPage() {
  const [data, setData] = useState<FishingCatchQuotasData | null>(null)

  useEffect(() => {
    fetch('/data/fishing-catch-quotas/fishing_catch_quotas.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const catchSeries: Series[] = data
    ? [{
        id: 'catch',
        label: 'Total UK catch (kt)',
        colour: '#264653',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.totalCatchKt,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Fishing Catch &amp; Quotas" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fishing Catch &amp; Quotas"
          question="What Has Brexit Actually Done to British Fishing?"
          finding="UK fishing quota increased modestly after Brexit, but total catches continue a long-term decline &mdash; and 76% of quota is sold to foreign vessels."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Brexit was supposed to transform British fishing. The Trade and Cooperation Agreement signed in December 2020 did deliver a quota increase &mdash; around 25% more quota value from previously EU-shared stocks, phased in over five years from 2021. But total UK catches in 2023 stood at 430,000 tonnes, below the 2017 peak of 461,000 tonnes and far below the 600,000-plus tonne figures of the 1990s. The long-term decline reflects depletion of key stocks &mdash; North Sea cod, haddock, and plaice &mdash; that decades of overfishing left at critically low levels. Meanwhile, around 76% of UK fishing quota is held or sold to non-UK-owned vessels, a legal consequence of how quota was allocated in the 1980s that large Icelandic and Dutch-owned companies have since locked in through vessel acquisitions. Post-Brexit export red tape, particularly for time-sensitive live shellfish, has in many cases offset the modest quota gains for businesses that actually fish from UK ports.</p>
            <p>The communities Brexit was intended to benefit &mdash; small ports in Cornwall, Yorkshire, Scotland, and Wales &mdash; have seen mixed outcomes at best. Around 70% of UK fish by value is exported to EU markets, and new certification requirements have pushed some smaller operators out of the export market entirely. Employment in the UK fishing fleet has continued its long-term decline, and the structural problems of the industry &mdash; ageing fleets, succession challenges, concentrated quota ownership &mdash; remain largely unchanged. The quota allocation system, once celebrated as a post-CFP achievement, is now understood to perpetuate the same inequities that coastal communities complained about before 2016.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Catch Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total UK catch"
              value="430kt"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Long-term decline from 600kt+ in 1990s"
              sparklineData={[442, 449, 461, 447, 445, 404, 425, 433, 430]}
              href="#sec-chart"source="MMO &middot; UK Sea Fisheries Statistics 2023"
            />
            <MetricCard
              label="UK quota value"
              value="&pound;780m"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+&pound;40m post-Brexit &middot; modest gain"
              sparklineData={[740, 750, 760, 750, 748, 720, 772, 785, 780]}
              href="#sec-chart"source="MMO &middot; UK Sea Fisheries Statistics 2023"
            />
            <MetricCard
              label="Foreign vessel quota share"
              value="76%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Of UK quota held/sold to non-UK owners"
              sparklineData={[78, 77, 77, 76, 76, 76, 76, 76, 76]}
              href="#sec-chart"source="New Economics Foundation &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Total UK fish catch, 2015&ndash;2023"
              subtitle="Total weight of fish and shellfish landed by UK vessels from all waters. Thousands of tonnes (kt)."
              series={catchSeries}
              yLabel="Total catch (kt)"
              source={{
                name: 'Marine Management Organisation',
                dataset: 'UK Sea Fisheries Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Marine Management Organisation (MMO) &mdash; UK Sea Fisheries Statistics. Published annually. gov.uk/government/collections/uk-sea-fisheries-statistics</p>
            <p>New Economics Foundation &mdash; Who owns our oceans? Analysis of UK fishing quota ownership. neweconomics.org</p>
            <p>Defra &mdash; Trade and Cooperation Agreement fisheries annex. gov.uk</p>
            <p>Catch figures represent landings by UK-registered vessels from all waters, including UK, EU, and international waters. Quota value estimates are based on MMO allocation data and published market prices; they are indicative rather than exact. Foreign vessel quota share is based on NEF analysis of publicly available quota ownership data; the figure is contested by some industry bodies. COVID-19 reduced catches significantly in 2020.</p>
          </div>
        </section>
      </main>
    </>
  )
}
