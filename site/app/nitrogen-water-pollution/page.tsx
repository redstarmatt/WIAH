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
            <p>Eighty-three percent of English rivers fail nitrate water quality standards &mdash; a figure stubbornly static for years despite Nitrate Vulnerable Zone designations covering 60% of England&rsquo;s agricultural land. Agriculture accounts for approximately 70% of nitrate pollution in UK rivers, primarily synthetic fertiliser runoff after rainfall. Excess nitrogen fuels algal blooms that deplete oxygen and create dead zones, driving eutrophication that has collapsed fish and invertebrate populations. The Environment Agency estimates no English river currently achieves good ecological status across all Water Framework Directive measures. Post-Brexit Environmental Land Management schemes &mdash; particularly Sustainable Farming Incentive &mdash; aim to redirect subsidies toward reduced fertiliser use, but uptake has been slower than hoped and the scheme has undergone multiple revisions amid farming sector protests.</p>
            <p>The costs fall on the public, not the polluters. Water companies remove nitrates from abstracted water in the most affected catchments &mdash; east England and the East Midlands &mdash; at tens of millions of pounds per year, costs passed on through bills. Nitrates in drinking water above safe thresholds cause infant methaemoglobinaemia and are linked to colorectal cancer at sustained elevated exposures. Enforcement of NVZ rules is under-resourced: the Environment Agency completes far fewer farm inspections than target, a direct consequence of the sustained budget cuts that reduced its staff and capacity through the 2010s. The incentive to pollute has historically been stronger than the incentive to comply.</p>
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
              href="#sec-chart"source="Environment Agency &middot; Water Framework Directive 2023"
            />
            <MetricCard
              label="NVZ coverage"
              value="60%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Of England now in nitrate vulnerable zones"
              sparklineData={[55, 55, 56, 58, 59, 60]}
              href="#sec-chart"source="Defra &middot; NVZ Designation Review 2022"
            />
            <MetricCard
              label="N leaching rate"
              value="380kt N/yr"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Agricultural runoff from fertiliser application"
              sparklineData={[380, 378, 381, 379, 380, 380]}
              href="#sec-chart"source="Defra &middot; Fertiliser Usage Survey 2023"
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
