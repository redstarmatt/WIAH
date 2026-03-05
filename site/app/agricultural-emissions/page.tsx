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
            <p>Agriculture is the third-largest source of greenhouse gas emissions in the UK, accounting for approximately 11% of total emissions in 2023. Unlike energy or transport, where electrification offers a clear decarbonisation pathway, agricultural emissions are primarily biological in nature: methane from livestock digestion and manure management, nitrous oxide from fertiliser application and soil processes, and carbon dioxide from farm machinery and land use change. These biological emissions are harder to eliminate than fossil fuel combustion and have resisted the long-term declining trend seen in most other sectors. Agricultural emissions fell significantly between 1990 and 2010, largely through improvements in production efficiency, but have been broadly flat since, making agriculture an increasingly prominent share of a declining total.</p>
            <p>Livestock &mdash; particularly beef cattle and dairy cows &mdash; are responsible for the largest share of agricultural greenhouse gas emissions. Enteric fermentation (the digestive process in ruminants) produces methane, a potent greenhouse gas with approximately 80 times the warming effect of CO2 over a 20-year period. The UK has approximately 1.9 million dairy cows and 1.3 million beef cattle, and per-animal methane emissions have been reduced through breeding, nutrition, and management improvements but cannot be eliminated through currently available technology. Methane-inhibiting feed additives &mdash; particularly 3-nitrooxypropanol (3-NOP) and red seaweed (Asparagopsis) &mdash; are showing promise in research settings but have not been scaled to commercial UK farming.</p>
            <p>Fertiliser use is the second largest emissions source. Synthetic nitrogen fertilisers release nitrous oxide (N2O) during soil application and breakdown &mdash; N2O is approximately 270 times more potent than CO2 as a greenhouse gas. Reduced fertiliser application, precision agriculture techniques that apply fertiliser more accurately to actual crop needs, and the use of clover and legume leys (which fix atmospheric nitrogen) can all reduce N2O emissions. The UK government&apos;s Sustainable Farming Incentive (SFI) includes payment options for actions that reduce fertiliser dependence, and fertiliser application rates have declined since the Russian invasion of Ukraine sharply increased fertiliser costs in 2022.</p>
            <p>Land use and land management represent the carbon storage opportunity in farming. Agricultural soils hold enormous quantities of carbon &mdash; both in organic matter and in soil structure &mdash; and this stock can be increased through regenerative practices (cover cropping, reduced tillage, composting) or depleted through intensive arable production. Peatland soils are particularly significant: drained peatlands emit large quantities of CO2 as the organic material oxidises, and the UK&apos;s 3 million hectares of peatland has a critical role in net zero calculations. The government&apos;s peatland restoration programme has accelerated, with 57,000 hectares under restoration by 2024, but most UK peat is still in degraded or drained condition.</p>
            <p>The tension between agricultural emissions reduction and food production runs through all farm policy. Farmers face conflicting pressures: producing food affordably in a competitive market while simultaneously reducing emissions, improving water quality, restoring biodiversity, and sequestering carbon. The government&apos;s Sustainable Farming Incentive, Environmental Land Management (ELM) scheme, and Landscape Recovery scheme attempt to reward environmental outcomes financially, creating economic incentives to align with ecological needs. But transition costs are real, farm businesses are under financial pressure from input cost rises and market volatility, and the evidence base for which practices deliver the best combination of food production and emission reduction across different farm types and regions is still being built.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Livestock methane (MtCO2e)"
              value="49"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="49 MtCO2e/yr · technology solutions not yet scaled"
              sparklineData={[51, 51, 50, 50, 49, 49, 49, 49, 49]}
              source="DESNZ · UK Greenhouse Gas Emissions Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Fertiliser N2O reduction since 2010"
              value="-15%"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="-15% since 2010 · better application techniques"
              sparklineData={[0, -1, -3, -5, -7, -8, -10, -12, -15]}
              source="DESNZ · UK Greenhouse Gas Emissions Statistics 2024"
              onExpand={() => {}}
            />
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
            <p>Agriculture&apos;s share covers IPCC category Agriculture: enteric fermentation, manure management, agricultural soils, and other agricultural sources. Livestock methane covers enteric fermentation and manure management combined, expressed as MtCO2e using GWP100.</p>
          </div>
        </section>
      </main>
    </>
  )
}
