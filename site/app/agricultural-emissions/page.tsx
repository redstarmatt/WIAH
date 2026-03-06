'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface AgriculturalEmissionsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{ year: number; agriEmissionsSharePct: number; livestockMethaneMt: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function AgriculturalEmissionsPage() {
  const [data, setData] = useState<AgriculturalEmissionsData | null>(null)

  useEffect(() => {
    fetch('/data/agricultural-emissions/agricultural_emissions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'agriEmissionsSharePct',
        label: 'Agriculture share of UK emissions (%)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.agriEmissionsSharePct })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Agricultural Emissions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Agricultural Emissions"
          question="How Much Does British Farming Contribute to Climate Change?"
          finding="Agriculture accounts for 11% of UK greenhouse gas emissions, and progress in reducing farm emissions has stalled since 2010 — methane from livestock the hardest to cut."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Agriculture is the third-largest source of greenhouse gas emissions in the UK, accounting for approximately 11% of total emissions in 2023. Unlike energy or transport, agricultural emissions are primarily biological: methane from enteric fermentation and manure management, nitrous oxide from fertiliser application, and CO2 from machinery and land use change. Agricultural emissions fell significantly between 1990 and 2010 through efficiency gains, but have been broadly flat since, making the sector an increasingly prominent share of a declining national total. Livestock — particularly beef cattle and dairy cows — produce the largest share through enteric fermentation; methane-inhibiting feed additives (3-NOP, red seaweed) show promise but have not been scaled to commercial UK farming. Fertiliser N2O has fallen around 15% since 2010 through better application techniques and cost-driven reductions following the sharp rise in fertiliser prices after Russia's invasion of Ukraine in 2022.</p>
            <p>The tension between emissions reduction and food production runs through all farm policy. Farmers face competing demands: producing food affordably in a volatile market while reducing emissions, restoring biodiversity, and sequestering carbon. The government's Sustainable Farming Incentive and Environmental Land Management scheme offer payments for environmental outcomes — including peatland restoration, with 57,000 hectares under restoration by 2024 — but most UK peat remains in degraded or drained condition and transition costs are real. The absence of a clear decarbonisation technology equivalent to electrification, combined with financial pressure on farm businesses, means agricultural emissions are the hardest of any major sector to bring down on a predictable trajectory.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Agriculture share of UK emissions"
              value="11%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Flat since 2010 · slowest-improving major sector"
              sparklineData={[11.2, 11.1, 11.0, 11.0, 11.0, 11.1, 11.0, 11.0, 11.0]}
              source="DESNZ · UK Greenhouse Gas Emissions Statistics 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Livestock methane (MtCO2e)"
              value="49"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="49 MtCO2e/yr · technology solutions not yet scaled"
              sparklineData={[51, 51, 50, 50, 49, 49, 49, 49, 49]}
              source="DESNZ · UK Greenhouse Gas Emissions Statistics 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Fertiliser N2O reduction since 2010"
              value="-15%"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="-15% since 2010 · better application techniques"
              sparklineData={[0, -1, -3, -5, -7, -8, -10, -12, -15]}
              source="DESNZ · UK Greenhouse Gas Emissions Statistics 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Agricultural greenhouse gas emissions, 2016–2024"
              subtitle="Agriculture's share of total UK greenhouse gas emissions (%)."
              series={series}
              yLabel="Share of total UK emissions (%)"
              source={{ name: 'DESNZ', dataset: 'UK Greenhouse Gas Emissions Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ (Department for Energy Security and Net Zero). UK Greenhouse Gas Emissions Statistics. Published annually. <a href="https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics" className="underline" target="_blank" rel="noopener noreferrer">gov.uk</a>. Data carries a two-year publication lag. Territorial accounting basis.</p>
            <p>Agriculture's share covers IPCC category Agriculture: enteric fermentation, manure management, agricultural soils, and other agricultural sources. Livestock methane covers enteric fermentation and manure management combined, expressed as MtCO2e using GWP100.</p>
          </div>
        </section>
      </main>
    </>
  )
}
