'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface MarineData {
  national: {
    fishStocks: Array<{ year: number; pctSustainable: number }>
    mpaCondition: Array<{ year: number; pctFavourable: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function MarineEnvironmentPage() {
  const [data, setData] = useState<MarineData | null>(null)

  useEffect(() => {
    fetch('/data/marine-environment/marine_environment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const fishStocksSeries: Series[] = data
    ? [{
        id: 'fish-stocks',
        label: 'Fish stocks at sustainable levels',
        colour: '#264653',
        data: data.national.fishStocks.map(d => ({ date: yearToDate(d.year), value: d.pctSustainable })),
      }]
    : []

  const mpaSeries: Series[] = data
    ? [{
        id: 'mpa-condition',
        label: 'MPAs in favourable condition',
        colour: '#2A9D8F',
        data: data.national.mpaCondition.map(d => ({ date: yearToDate(d.year), value: d.pctFavourable })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Marine Environment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Marine Environment"
          question="Are Britain&apos;s Seas Actually Being Protected?"
          finding="Only 36% of the UK&apos;s Marine Protected Areas are in favourable condition, and just 49% of assessed fish stocks are being harvested sustainably. Despite designating 38% of UK waters as MPAs, most receive little active management."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom manages one of the world&apos;s largest marine estates, covering approximately 900,000 square kilometres &mdash; roughly 3.5 times its land area. Some 38% of UK waters are designated as Marine Protected Areas under a patchwork of national and international frameworks, including Marine Conservation Zones (MCZs), Special Areas of Conservation (SACs), and Sites of Special Scientific Interest (SSSIs). On paper, this exceeds the global 30&times;30 target agreed at COP15 in Montreal. In practice, the picture is far less reassuring. A 2023 assessment by the Joint Nature Conservation Committee (JNCC) found that only 36% of MPA features were in favourable condition. Bottom trawling &mdash; the most destructive fishing method &mdash; continues in 90% of offshore MPAs, according to analysis by Oceana.</p>
            <p>UK fish stocks present a mixed picture. ICES (the International Council for the Exploration of the Sea) assessed 57 stocks in UK waters in 2024 and found that 49% were being harvested at or below the maximum sustainable yield &mdash; down from a peak of 57% in 2016. Cod in the Celtic Sea is in particularly poor condition, with spawning stock biomass well below safe biological limits. North Sea herring has recovered significantly since its near-collapse in the 1970s but faces renewed pressure from rising sea temperatures. Post-Brexit, the UK sets its own Total Allowable Catches independently from the EU, but negotiations remain politically fraught and quota-setting has sometimes exceeded scientific advice.</p>
            <p>Plastic pollution at sea is a persistent and growing problem. The Marine Conservation Society&apos;s annual beach clean data found an average of 385 litter items per 100 metres of UK coastline in 2023 &mdash; down from a peak of 718 in 2017, partly reflecting the impact of the carrier bag charge and single-use plastics ban. However, microplastics &mdash; fragments smaller than 5mm &mdash; are now found in every marine sample taken around UK coasts, from seabed sediments to surface waters. DEFRA&apos;s Marine Strategy assessment in 2024 found that the UK is not on track to achieve Good Environmental Status for marine litter. The government banned a range of single-use plastics in October 2023, but enforcement of dumping regulations at sea remains limited.</p>
            <p>The distribution of marine degradation varies significantly around the UK&apos;s coastline. The North Sea faces the most intensive fishing pressure, the busiest shipping lanes, and the highest concentration of oil and gas infrastructure. The Irish Sea has some of the UK&apos;s most degraded seabed habitats due to decades of scallop dredging. Scotland&apos;s west coast lochs are affected by salmon farming waste &mdash; an industry producing around 150,000 tonnes of fish annually while releasing significant volumes of organic waste and sea lice. The English Channel faces cross-border pollution challenges. Northern Ireland and Wales have smaller MPA networks, with fewer resources for monitoring and enforcement. Devolved administrations manage inshore waters, but offshore areas remain under Westminster control, creating governance fragmentation.</p>
            <p>Marine monitoring is expensive and methodologically challenging. Condition assessments for MPAs rely on intermittent survey data, with many sites assessed only once every six years. The JNCC&apos;s &ldquo;favourable condition&rdquo; metric evaluates specific habitat features within MPAs, not ecosystem health as a whole &mdash; meaning a site can be &ldquo;favourable&rdquo; for one feature and degraded for another. Fish stock assessments depend on ICES models that carry uncertainty margins of 20&ndash;30%. Plastic pollution statistics are typically measured through volunteer beach cleans, which are inherently variable in methodology. Microplastic data is still emerging, and standardised measurement protocols were only agreed internationally in 2022. The &ldquo;38% of waters protected&rdquo; figure measures designation, not management effectiveness &mdash; a distinction that fundamentally undermines its value as an indicator.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-fish', label: 'Fish Stocks' },
          { id: 'sec-mpa', label: 'MPA Condition' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Fish stocks at sustainable levels"
              value="49"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 57% in 2016; ICES assessment of 57 stocks"
              sparklineData={[48, 51, 55, 57, 54, 53, 51, 49]}
              source="ICES stock assessment 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="MPAs in favourable condition"
              value="36"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 44% in 2016; bottom trawling continues in 90% of offshore MPAs"
              sparklineData={[44, 42, 40, 38, 36]}
              source="JNCC MPA condition assessment"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK waters designated as MPAs"
              value="38"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Exceeds 30x30 target on paper; most lack active management"
              sparklineData={[24, 27, 30, 33, 36, 38]}
              source="JNCC protected area statistics"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-fish" className="mb-12">
            <LineChart
              title="UK fish stocks harvested sustainably, 2010&ndash;2024"
              subtitle="Percentage of assessed stocks fished at or below maximum sustainable yield. ICES annual assessment."
              series={fishStocksSeries}
              yLabel="% sustainable"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-mpa" className="mb-12">
            <LineChart
              title="Marine Protected Areas in favourable condition, 2016&ndash;2024"
              subtitle="Percentage of MPA features assessed as in favourable condition. JNCC."
              series={mpaSeries}
              yLabel="% favourable"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
