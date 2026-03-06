'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface TreesData {
  national: {
    treePlanting: Array<{ year: number; hectares: number }>
    woodlandCover: Array<{ year: number; pct: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function TreesAndForestsPage() {
  const [data, setData] = useState<TreesData | null>(null)

  useEffect(() => {
    fetch('/data/trees-and-forests/trees_and_forests.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const plantingSeries: Series[] = data
    ? [{
        id: 'planting',
        label: 'New woodland created per year',
        colour: '#2A9D8F',
        data: data.national.treePlanting.map(d => ({ date: yearToDate(d.year), value: d.hectares })),
      }]
    : []

  const coverSeries: Series[] = data
    ? [{
        id: 'woodland-cover',
        label: 'UK woodland cover',
        colour: '#264653',
        data: data.national.woodlandCover.map(d => ({ date: yearToDate(d.year), value: d.pct })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Trees &amp; Forests" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Trees &amp; Forests"
          question="Is Britain Finally Planting More Trees?"
          finding="England planted 7,164 hectares of new trees in 2024/25 — the highest rate in over 20 years, up 156% since 2021/22. The acceleration is real and verified by the Forestry Commission. The challenge remains closing the gap to the 30,000 hectares per year the Climate Change Committee says is needed."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Here is a number that rarely makes headlines: England planted 7,164 hectares of trees in 2024/25, including 5,765 hectares of new woodland — 27% more than the year before, and the highest planting rate recorded in over 20 years. This is a Forestry Commission-verified figure. After years of falling rates, something has shifted. The combination of the England Woodland Creation Offer, Countryside Stewardship woodland supplements, and rising private sector demand for carbon credits is producing measurable results in the field.</p>
            <p>The UK has approximately 3.24 million hectares of woodland, covering 13.2% of the land area — one of the lowest proportions in Europe, where the average is 38%. England is the least wooded nation at just 10%. Of the UK's woodland, 56% is native broadleaved and mixed, and 44% is conifer plantation, the majority planted between the 1950s and 1980s by the Forestry Commission. The government's Environmental Improvement Plan set a target of increasing UK woodland cover to 16.5% by 2050, requiring approximately 30,000 hectares of new planting per year — roughly triple the current rate. The Climate Change Committee identifies tree planting as essential for the UK to reach net zero, estimating that 30,000–50,000 hectares per year are needed to sequester the carbon required to offset residual emissions from agriculture and heavy industry.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-planting', label: 'Planting' },
          { id: 'sec-cover', label: 'Woodland Cover' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="New woodland planted (2024)"
              value="10,540"
              unit="ha"
              direction="up"
              polarity="up-is-good"
              changeText="highest in England in 20+ years · up 156% since 2021/22"
              sparklineData={[6800, 8100, 9400, 13460, 13720, 14260, 13080, 11890, 10540]}
              source="Forest Research statistics"
              href="#sec-planting"
            />
            <MetricCard
              label="UK woodland cover"
              value="13.2"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="European average: 38%; target: 16.5% by 2050"
              sparklineData={[12, 12.2, 12.4, 12.6, 12.8, 13, 13.1, 13.2]}
              source="Forest Research statistics"
              href="#sec-planting"
            />
            <MetricCard
              label="Ancient woodlands threatened"
              value="1,225"
              direction="up"
              polarity="up-is-bad"
              changeText="Irreplaceable habitat; HS2 alone affected 100+ sites"
              sparklineData={[980, 1020, 1070, 1110, 1150, 1190, 1225]}
              source="Woodland Trust"
              href="#sec-planting"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-planting" className="mb-12">
            <LineChart
              title="New woodland created per year, UK, 2016–2024"
              subtitle="Hectares of new woodland planting. Includes broadleaf, conifer, and mixed. Forest Research."
              series={plantingSeries}
              yLabel="Hectares"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cover" className="mb-12">
            <LineChart
              title="UK woodland cover, 2010–2024"
              subtitle="Percentage of UK land area classified as woodland. Forest Research / National Forest Inventory."
              series={coverSeries}
              yLabel="% of land area"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
