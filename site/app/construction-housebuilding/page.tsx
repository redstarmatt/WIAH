'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>England added 234,400 net new dwellings in 2022/23, falling short of the government&rsquo;s 300,000-a-year target by 65,600 homes. This shortfall is not new: the 300,000 target has never been met in the post-war era. The closest England came was 2019/20, with 241,130 net additions, before the pandemic disrupted construction activity. The gap between supply and the target has persisted for decades, and the cumulative shortfall &mdash; the number of homes that would have been built if the target had been consistently met &mdash; runs into millions of units. Most housing economists believe the under-supply of the past thirty years is the primary driver of the affordability crisis in English housing.</p>
            <p>The planning system is frequently blamed for the shortfall, and there is evidence to support this. Planning permission grants have fallen 18% year-on-year, with local authorities citing resource constraints, political opposition, and legal uncertainty following court challenges to housing policy. The nutrient neutrality rulings, which blocked development in environmentally sensitive river catchments, alone halted an estimated 160,000 homes in the planning pipeline. But planning is not the sole constraint: builders also point to labour shortages, materials cost inflation, and the economics of viability that make high-density development in many areas unprofitable at current build costs and land values.</p>
            <p>The composition of what is being built matters as much as the quantity. England has a chronic shortage of social and affordable rented housing: housing associations and local authorities together completed approximately 30,000 new social rent homes in 2022/23 &mdash; a fraction of the estimated need. Government grant funding through Homes England has been maintained in cash terms but eroded in real terms by construction cost inflation, meaning the same budget delivers fewer homes than it did in 2019. The private rented sector has partially compensated, but private rents have risen sharply as supply has remained constrained, creating affordability problems of a different kind.</p>
            <p>The geography of the shortfall is significant. London has a structural housing need far in excess of current supply, with planning constraints, high land costs, and complex viability economics making new development difficult. The South East and commuter belt face similar pressures. But some parts of northern England and the Midlands face a different problem: areas of low demand where existing housing stock is in poor condition and construction of new homes without demand management risks creating further oversupply in local markets that are already struggling. A single national target obscures this geographic complexity.</p>
            <p>The new government&rsquo;s reforms announced in 2024 aim to mandate rather than merely target housebuilding at local level, reintroduce mandatory housing targets into local plans, and simplify the infrastructure levy system that funds affordable housing. Whether these reforms will translate into materially higher completions depends on the planning system&rsquo;s capacity to process applications, the availability of skilled construction workers, and whether the viability of development can be maintained through the interest rate and cost environment. The target of 300,000 homes per year remains more aspirational than achievable in the medium term.</p>
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
              changeText="78% of 300k target &middot; shortfall 65,600/year"
              sparklineData={[170990, 189650, 217350, 222190, 241130, 215920, 221070, 232820, 234400]}
              onExpand={() => {}}
              source="DLUHC &middot; Housing Supply England 2023"
            />
            <MetricCard
              label="New home completions"
              value="187,000"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="lowest since 2013 &middot; materials costs hit output"
              sparklineData={[142850, 163940, 183570, 195290, 204590, 178580, 188610, 191010, 187000]}
              onExpand={() => {}}
              source="DLUHC &middot; 2023"
            />
            <MetricCard
              label="Planning permissions granted"
              value="257k"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="down 18% year-on-year &middot; planning reform needed"
              sparklineData={[350000, 340000, 320000, 330000, 325000, 290000, 310000, 314000, 257000]}
              onExpand={() => {}}
              source="DLUHC &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Net new homes built in England, 2015&ndash;2023"
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
            <p>DLUHC &mdash; Housing Supply: Net Additional Dwellings England. Published annually. gov.uk/government/statistical-data-sets/live-tables-on-net-supply-of-housing</p>
            <p>Homes England &mdash; Affordable Homes Programme Data. homesengland.gov.uk</p>
            <p>DLUHC &mdash; Planning Permission Statistics. gov.uk/government/collections/planning-permissions-england</p>
            <p>Net additions include new build completions, conversions from other uses, changes of use within residential, and minus demolitions. Data is for England only; Scotland, Wales, and Northern Ireland have separate housing statistics. The 300,000 target was set by the Conservative government in 2019; the current government has maintained this target. Financial year data (April-March) is used.</p>
          </div>
        </section>
      </main>
    </>
  )
}
