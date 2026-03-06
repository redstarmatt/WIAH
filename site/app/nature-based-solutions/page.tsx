'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface NatureBasedSolutionsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{ year: number; peatlandRestorationHa: number; newWoodlandHa: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function NatureBasedSolutionsPage() {
  const [data, setData] = useState<NatureBasedSolutionsData | null>(null)

  useEffect(() => {
    fetch('/data/nature-based-solutions/nature_based_solutions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'peatlandRestorationHa',
        label: 'Peatland under restoration (ha)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.peatlandRestorationHa })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Nature-Based Solutions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nature-Based Solutions"
          question="Is Nature Being Used to Fight Climate Change?"
          finding="Nature-based solutions could provide 15% of the UK's net zero pathway but are currently delivering just 3% of potential — though peatland restoration is accelerating fast."
          colour="#2A9D8F"
        />

        <PositiveCallout
          title="Peatland restoration up 340% since 2019"
          value="340%"
          description="Peatland restoration increased 340% since 2019, with 57,000 hectares now under active restoration. Peatland is the UK's most carbon-dense terrestrial habitat, storing approximately 3.2 billion tonnes of carbon. The government's Peatland Code, Natural England's Peatland Action programme, and the inclusion of peatland restoration in the Sustainable Farming Incentive have combined to accelerate what was previously a very slow programme. Rewetting degraded peatland prevents CO2 release and, over time, rebuilds the carbon storage function."
          source="DESNZ / Natural England · Peatland Action Programme 2024"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Climate Change Committee estimates that nature-based solutions — peatland restoration, woodland creation, wetland recovery, and sustainable soil management — could contribute approximately 15% of the UK's required greenhouse gas reductions by 2035. Peatland is the highest-priority intervention: the UK holds 13% of the world's blanket bog, storing 3.2 billion tonnes of carbon, but 3 million hectares of degraded peat currently emits approximately 23 million tonnes of CO2 equivalent per year. By 2024, 57,000 hectares were under active restoration — a 340% increase from 13,000 in 2019 — funded through the Peatland Action programme, the Nature for Climate Grant Scheme, and the Sustainable Farming Incentive. Over 400,000 hectares of English peatland has been identified as restorable. Woodland creation is falling far short: England created approximately 8,500 hectares of new woodland in 2023, less than 30% of the 30,000-hectare annual target required to reach 17% woodland cover by 2050.</p>
            <p>Delivery is constrained across all pathways. Land for woodland competes with food production; large schemes face planning delays; new trees take 20–30 years to provide meaningful carbon storage. The restoration pipeline for peatland dwarfs current funding. Nature-based climate solutions and biodiversity recovery are largely complementary — carbon-rich habitats typically support high biodiversity — but coordinating them across thousands of private landholdings requires sustained long-term payment schemes and planning protections that have repeatedly been eroded or underfunded in previous policy cycles.</p>
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
              label="Peatlands under restoration"
              value="57,000ha"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+44,000ha since 2019 · 340% increase"
              sparklineData={[13000, 15000, 19000, 25000, 32000, 40000, 47000, 52000, 57000]}
              source="DESNZ / Natural England · Peatland Action 2024"
              href="#sec-chart"/>
            <MetricCard
              label="NBS share of net zero contribution"
              value="3%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="3% of 15% potential · large gap to fill"
              sparklineData={[0.5, 0.7, 0.9, 1.1, 1.4, 1.7, 2.1, 2.5, 3.0]}
              source="Climate Change Committee · 2024 Progress Report"
              href="#sec-chart"/>
            <MetricCard
              label="New woodland planted 2023"
              value="8,500ha"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+3,200ha on 2022 · but below 30,000ha target"
              sparklineData={[3500, 4200, 5000, 6100, 7200, 4800, 5500, 5300, 8500]}
              source="Forestry Commission · Woodland Statistics 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Peatland restoration area, 2016–2024"
              subtitle="Cumulative hectares of UK peatland under active restoration."
              series={series}
              yLabel="Hectares under restoration"
              source={{ name: 'DESNZ', dataset: 'Peatland Action Programme', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ / Natural England. Peatland Action Programme. Annual. <a href="https://www.gov.uk/government/publications/peatland-grant-scheme" className="underline" target="_blank" rel="noopener noreferrer">gov.uk</a>. Restoration hectares covers rewetting and active management under approved schemes.</p>
            <p>Forestry Commission. Woodland Statistics. Annual. <a href="https://www.forestresearch.gov.uk/tools-and-resources/statistics/statistics-by-topic/woodland-statistics/" className="underline" target="_blank" rel="noopener noreferrer">forestresearch.gov.uk</a>. Woodland creation covers England only. Climate Change Committee. Sixth Carbon Budget and 2024 Progress Report.</p>
          </div>
        </section>
      </main>
    </>
  )
}
