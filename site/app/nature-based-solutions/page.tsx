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
            <p>Nature-based solutions &mdash; actions that protect, restore, or manage natural ecosystems to deliver climate, biodiversity, and human wellbeing benefits &mdash; represent one of the most cost-effective elements of net zero strategy if deployed at scale. For the UK, the principal nature-based solutions are peatland restoration, woodland creation, wetland and saltmarsh restoration, and sustainable soil management. The Climate Change Committee&apos;s analysis suggests that these interventions could collectively contribute approximately 15% of the UK&apos;s required greenhouse gas reductions by 2035, primarily through reduced peatland emissions, enhanced carbon sequestration in new woodland, and carbon storage in recovering grassland and wetland systems.</p>
            <p>Peatland is the single most important nature-based solution in the UK context. The UK holds approximately 13% of the world&apos;s blanket bog peat &mdash; an extraordinary concentration in a small country &mdash; and this peat stores approximately 3.2 billion tonnes of carbon, equivalent to 100 years of UK CO2 emissions. Most of the UK&apos;s peatland is in a degraded state: drained for agriculture and forestry, burned for grouse management, or over-grazed by livestock. Degraded peat oxidises and releases CO2 &mdash; the UK&apos;s 3 million hectares of degraded peatland currently emits approximately 23 million tonnes of CO2 equivalent per year. Rewetting and restoring peatland stops this emission flux and, over decades, begins to rebuild the carbon-storing function.</p>
            <p>The acceleration in peatland restoration is one of the more genuine success stories in UK environmental policy. By 2024, 57,000 hectares of peatland were under active restoration &mdash; up from around 13,000 in 2019, a 340% increase. The Peatland Action programme in Scotland, the Nature for Climate Peatland Grant Scheme in England, and the inclusion of peatland actions in the Sustainable Farming Incentive (SFI) have all contributed funding. The Peatland Code &mdash; a voluntary standard that enables peatland restoration to generate verified carbon credits &mdash; has attracted private investment from companies seeking to offset residual emissions. The restoration pipeline is large: over 400,000 hectares of English peatland has been identified as restorable, and the current pace covers only a fraction of this.</p>
            <p>Woodland creation is the second main nature-based solution component. The England Trees Action Plan targets 30,000 hectares of woodland creation per year by 2025, as part of the UK-wide goal of increasing woodland cover from 13% to 17% of land area by 2050. Progress has been significantly slower than targets: England created approximately 8,500 hectares of new woodland in 2023 &mdash; less than 30% of the annual target. Constraints include land availability (competition with food production and other uses), planning requirements for larger schemes, the 20&ndash;30 year time horizon before new woodland provides meaningful carbon storage, and the dependence on continued maintenance that makes permanent woodland retention less certain than the permanence of stored peat carbon.</p>
            <p>The broader nature recovery agenda &mdash; Biodiversity Net Gain, Local Nature Recovery Strategies, Marine Protected Areas, and the 30x30 target (protecting 30% of land and sea by 2030) &mdash; creates overlapping goals with nature-based climate solutions. Habitats that are good for biodiversity are often also good carbon stores and vice versa, making nature recovery and climate mitigation complementary rather than competing objectives in most contexts. The government&apos;s Nature Recovery Network, published in 2022, attempts to coordinate these overlapping goals into a coherent landscape-scale strategy. The implementation challenge is significant: it requires sustained funding, strong land management support, and planning systems that protect nature recovery sites from subsequent development pressure.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="NBS share of net zero contribution"
              value="3%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="3% of 15% potential · large gap to fill"
              sparklineData={[0.5, 0.7, 0.9, 1.1, 1.4, 1.7, 2.1, 2.5, 3.0]}
              source="Climate Change Committee · 2024 Progress Report"
              onExpand={() => {}}
            />
            <MetricCard
              label="New woodland planted 2023"
              value="8,500ha"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+3,200ha on 2022 · but below 30,000ha target"
              sparklineData={[3500, 4200, 5000, 6100, 7200, 4800, 5500, 5300, 8500]}
              source="Forestry Commission · Woodland Statistics 2024"
              onExpand={() => {}}
            />
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
