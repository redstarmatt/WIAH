'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface NitrogenWaterPollutionData {
  timeSeries: Array<{
    year: number
    riverFailingNitratePct: number
    nitrateVulnerableZonePct?: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function NitrogenWaterPollutionPage() {
  const [data, setData] = useState<NitrogenWaterPollutionData | null>(null)

  useEffect(() => {
    fetch('/data/nitrogen-water-pollution/nitrogen_water_pollution.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const riverSeries: Series[] = data
    ? [{
        id: 'riverFailing',
        label: 'Rivers failing nitrate standards (%)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.riverFailingNitratePct,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Nitrogen Water Pollution" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nitrogen Water Pollution"
          question="Is Farming Poisoning Our Rivers?"
          finding="83% of English rivers fail nitrate water quality standards, driven overwhelmingly by agricultural fertiliser runoff."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Eighty-three percent of English rivers fail to meet nitrate water quality standards. This figure has been stubbornly static for years, despite decades of regulation, agri-environment schemes, and the designation of Nitrate Vulnerable Zones covering 60% of England&rsquo;s agricultural land. The main cause is well-established: synthetic nitrogen fertiliser applied to fields runs off into watercourses, particularly after heavy rainfall. Agriculture accounts for approximately 70% of nitrate pollution in UK rivers. Sewage treatment contributes much of the remainder.</p>
            <p>The ecological consequences of excess nitrogen are severe. Nitrates fuel algal blooms that deplete oxygen in water, creating dead zones where aquatic life cannot survive. A process called eutrophication &mdash; the over-enrichment of water with nutrients &mdash; chokes rivers, lakes, and coastal waters, contributing to the collapse of fish and invertebrate populations. The UK has some of the most biologically impoverished river systems in Europe, and nitrogen pollution is among the primary reasons. The Environment Agency estimates that no English river currently achieves good ecological status under the Water Framework Directive across all measures.</p>
            <p>Nitrate Vulnerable Zones (NVZs) require farmers to comply with rules on fertiliser application rates, timing, and storage. Yet the evidence suggests compliance is variable and enforcement is under-resourced. The Environment Agency&rsquo;s own data shows it completes far fewer farm inspections than target levels &mdash; a consequence of sustained budget reductions that cut the agency&rsquo;s staff and capacity through the 2010s. Farmers are, in many cases, aware of the rules but face economic pressures that make compliance costly; the incentive structures created by the Basic Payment Scheme historically rewarded production over environmental outcomes.</p>
            <p>Agricultural policy post-Brexit offered the opportunity to redirect subsidies toward environmental outcomes. The Environmental Land Management scheme &mdash; particularly Sustainable Farming Incentive &mdash; pays farmers for environmental actions including reduced fertiliser use, cover cropping, and riparian buffer strips. Uptake has been slower than hoped, and the scheme has undergone multiple revisions amid protests from farming groups. The long-term ambition of rewiring British agriculture toward sustainable nitrogen management is real, but the transition is proving politically and practically difficult.</p>
            <p>The human health dimension is also significant. Nitrates in drinking water above certain concentrations cause methaemoglobinaemia in infants &mdash; &ldquo;blue baby syndrome&rdquo; &mdash; and there are suspected associations with colorectal cancer at sustained elevated exposures. Water companies spend significant sums removing nitrates from abstracted water, costs that are ultimately passed on to consumers. In the most affected catchments in the east of England and East Midlands, water treatment costs attributable to agricultural nitrate pollution run to tens of millions of pounds per year &mdash; an externality that is effectively subsidised by water bill payers rather than borne by the agricultural sector producing the pollution.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'River Failures' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rivers failing nitrate standard"
              value="83%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Of English rivers &middot; unchanged for years"
              sparklineData={[78, 79, 80, 81, 82, 83]}
              onExpand={() => {}}
              source="Environment Agency &middot; Water Framework Directive 2023"
            />
            <MetricCard
              label="NVZ coverage"
              value="60%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Of England now in nitrate vulnerable zones"
              sparklineData={[55, 55, 56, 58, 59, 60]}
              onExpand={() => {}}
              source="Defra &middot; NVZ Designation Review 2022"
            />
            <MetricCard
              label="N leaching rate"
              value="380kt N/yr"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Agricultural runoff from fertiliser application"
              sparklineData={[380, 378, 381, 379, 380, 380]}
              onExpand={() => {}}
              source="Defra &middot; Fertiliser Usage Survey 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="English rivers failing nitrate water quality standards, 2015&ndash;2023"
              subtitle="Percentage of monitored river bodies failing Good Ecological Status on nitrate criteria under the Water Framework Directive."
              series={riverSeries}
              yLabel="Rivers failing (%)"
              source={{
                name: 'Environment Agency',
                dataset: 'Water Framework Directive Classification',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Environment Agency &mdash; Water Framework Directive Classification Reports. Published annually. environment-data.gov.uk</p>
            <p>Defra &mdash; Nitrate Vulnerable Zone designations and Fertiliser Usage Survey. gov.uk/government/collections/fertiliser-usage</p>
            <p>Environment Agency &mdash; River quality and pollution statistics. environment.data.gov.uk/water-quality</p>
            <p>River failure rates are based on Environment Agency classification of water bodies against the Nitrates Directive and UK Water Framework Directive standards. NVZ coverage represents the percentage of England&rsquo;s agricultural land designated as nitrate vulnerable. Nitrogen leaching estimates are from Defra agricultural emissions inventory data. Not all rivers are monitored at the same frequency; figures represent monitored water bodies only.</p>
          </div>
        </section>
      </main>
    </>
  )
}
