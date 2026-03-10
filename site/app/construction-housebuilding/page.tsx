'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  netAdditions: number
  completions: number
}

interface ConstructionHousebuildingData {
  timeSeries: TimeSeriesPoint[]
  target: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ConstructionHousebuildingPage() {
  const [data, setData] = useState<ConstructionHousebuildingData | null>(null)

  useEffect(() => {
    fetch('/data/construction-housebuilding/construction_housebuilding.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const netAdditionsSeries: Series[] = data
    ? [{
        id: 'net-additions',
        label: 'Net dwelling additions',
        colour: '#F4A261',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.netAdditions,
        })),
      }]
    : []

  const targetAnnotation = data ? data.target : 300000

  return (
    <>
      <TopicNav topic="Housebuilding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housebuilding"
          question="Are We Building Enough Homes?"
          finding="England built 234,400 net new homes in 2022/23 — a third fewer than the government's 300,000-a-year target."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England added 234,400 net new dwellings in 2022/23 — 65,600 short of the government&rsquo;s 300,000-a-year target, which has never been met in the post-war era. The closest was 2019/20 at 241,130, before the pandemic disrupted construction. Cumulative under-supply runs into millions of units and is widely regarded as the primary driver of the English housing affordability crisis. Planning permissions fell 18% year-on-year, with nutrient neutrality rulings alone halting an estimated 160,000 homes in the pipeline. Social and affordable housing completions were approximately 30,000 in 2022/23 — a fraction of assessed need. The 2024 government reforms aim to mandate rather than merely target local housebuilding and reintroduce mandatory housing targets into local plans.</p>
            <p>The shortfall is geographically concentrated. London, the South East, and the commuter belt face the most acute need, with high land costs and viability constraints making development difficult. Parts of northern England and the Midlands face a different challenge: areas of low demand where construction risks oversupply in already-struggling markets. Labour shortages, materials cost inflation, and the economics of high-density development constrain builders independently of planning policy. Private rents have risen sharply as supply remains constrained, and affordable housing grant funding has been eroded in real terms by construction cost inflation, meaning the same budget now delivers fewer homes than in 2019.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Net Additions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Net dwelling additions 2022/23"
              value="234,400"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="78% of 300k target · shortfall 65,600/year"
              sparklineData={[170990, 189650, 217350, 222190, 241130, 215920, 221070, 232820, 234400]}
              href="#sec-chart"source="DLUHC · Housing Supply England 2023"
            />
            <MetricCard
              label="New home completions"
              value="187,000"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="lowest since 2013 · materials costs hit output"
              sparklineData={[142850, 163940, 183570, 195290, 204590, 178580, 188610, 191010, 187000]}
              href="#sec-chart"source="DLUHC · 2023"
            />
            <MetricCard
              label="Planning permissions granted"
              value="257k"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="down 18% year-on-year · planning reform needed"
              sparklineData={[350000, 340000, 320000, 330000, 325000, 290000, 310000, 314000, 257000]}
              href="#sec-chart"source="DLUHC · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Net new homes built in England, 2015–2023"
              subtitle={`Annual net dwelling additions. Target: ${targetAnnotation.toLocaleString()} homes per year. England has never met this target.`}
              series={netAdditionsSeries}
              yLabel="Net additions"
              source={{
                name: 'DLUHC',
                dataset: 'Housing Supply: Net Additional Dwellings England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DLUHC — Housing Supply: Net Additional Dwellings England. Published annually. gov.uk/government/statistical-data-sets/live-tables-on-net-supply-of-housing</p>
            <p>Homes England — Affordable Homes Programme Data. homesengland.gov.uk</p>
            <p>DLUHC — Planning Permission Statistics. gov.uk/government/collections/planning-permissions-england</p>
            <p>Net additions include new build completions, conversions from other uses, changes of use within residential, and minus demolitions. Data is for England only; Scotland, Wales, and Northern Ireland have separate housing statistics. The 300,000 target was set by the Conservative government in 2019; the current government has maintained this target. Financial year data (April-March) is used.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
