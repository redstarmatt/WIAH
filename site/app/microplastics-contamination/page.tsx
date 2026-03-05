'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface MicroplasticsData {
  timeSeries: Array<{
    year: number
    drinkingWaterParticlesPerL: number
    seabedPiecesPerM2: number
  }>
  humanBloodPositivePct: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function MicroplasticsContaminationPage() {
  const [data, setData] = useState<MicroplasticsData | null>(null)

  useEffect(() => {
    fetch('/data/microplastics-contamination/microplastics_contamination.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const drinkingWaterSeries: Series[] = data
    ? [{
        id: 'drinkingWater',
        label: 'Drinking water (particles/L)',
        colour: '#264653',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.drinkingWaterParticlesPerL,
        })),
      }, {
        id: 'seabed',
        label: 'Seabed density (pieces/m² ÷ 100)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.seabedPiecesPerM2 / 100,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Microplastics Contamination" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Microplastics Contamination"
          question="Are Microplastics in Everything?"
          finding="Microplastics have been found in human blood (77%), lung tissue, and drinking water &mdash; but the health impacts remain poorly understood."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Microplastics &mdash; particles smaller than 5mm, and nanoplastics smaller still &mdash; have now been detected in virtually every environment scientists have looked. They are present in Arctic sea ice and the deepest ocean trenches. They are in the air we breathe, the water we drink, and the food we eat. In 2022, researchers published the first study confirming microplastics in human blood, finding particles in 77% of donors tested. Subsequent studies have found them in lung tissue, the placenta, and breast milk.</p>
            <p>UK drinking water contains an estimated 5 microplastic particles per litre &mdash; a figure that has risen steadily since systematic measurement began in 2018. The particles enter water systems from multiple sources: the degradation of plastic pipes and fittings, synthetic fibres washed from clothing, road runoff carrying tyre particles, and the breakdown of surface plastics in water catchments. Water treatment removes some particles, but the smallest nanoplastics pass through conventional filtration entirely.</p>
            <p>The UK seabed is among the most contaminated environments measured. The North Sea receives plastic input from multiple directions: UK rivers and coastal areas, Dutch and German shipping lanes, and Norwegian fishing gear. Seabed particle densities have increased from an estimated 800 pieces per square metre in 2018 to 1,000 in 2023. Seabed sediment acts as a long-term sink for plastic pollution &mdash; particles accumulate and concentrate there rather than dispersing, creating persistent hotspots of contamination around river outflows and shipping lanes.</p>
            <p>The critical scientific uncertainty is toxicological. We know microplastics are ubiquitous. We do not yet know, with confidence, what they do to human health at environmentally relevant exposures. Laboratory studies show that microplastics can cause oxidative stress, inflammation, and endocrine disruption in cells and animal models. But translating those findings to real-world human health outcomes requires epidemiological studies that are only beginning to emerge. A 2024 study found higher concentrations of microplastics in the carotid arteries of people who subsequently had cardiovascular events, but causation has not been established.</p>
            <p>Regulatory responses have been cautious, in part because the science is genuinely uncertain, and in part because regulating microplastic pollution requires confronting the systemic role of plastic in modern economies. The UK has banned microbeads in rinse-off cosmetics, extended producer responsibility for packaging, and is consulting on limits for single-use plastics. But these measures address only a fraction of the input pathways. Tyres, synthetic textiles, and the fragmentation of existing plastic waste in the environment remain largely unregulated sources &mdash; and the stock of plastic already in circulation will continue to break down for decades regardless of what is done at source.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Contamination Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Human blood positive"
              value="77%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Most people tested &middot; first detected 2022"
              sparklineData={[0, 0, 0, 0, 77, 77]}
              onExpand={() => {}}
              source="Vrije Universiteit Amsterdam &middot; 2022"
            />
            <MetricCard
              label="Drinking water"
              value="5 particles/L"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Rising trend &middot; from plastic pipes and packaging"
              sparklineData={[4.0, 4.3, 4.6, 4.8, 5.0, 5.0]}
              onExpand={() => {}}
              source="DWQR / WHO &middot; 2023"
            />
            <MetricCard
              label="UK seabed density"
              value="1,000/m&sup2;"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 800 in 2018 &middot; Arctic spreading"
              sparklineData={[800, 870, 910, 950, 980, 1000]}
              onExpand={() => {}}
              source="CEFAS / Plymouth Marine Laboratory &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Microplastic contamination trends, 2018&ndash;2023"
              subtitle="Drinking water particles per litre (left axis). Seabed density shown scaled (divide by 100 for pieces/m&sup2;)."
              series={drinkingWaterSeries}
              yLabel="Particles / L (drinking water scale)"
              source={{
                name: 'DWQR / CEFAS / Plymouth Marine Laboratory',
                dataset: 'Microplastics monitoring data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Vrije Universiteit Amsterdam &mdash; Human blood microplastic study (Leslie et al., 2022). Environment International. doi.org/10.1016/j.envint.2022.107199</p>
            <p>WHO &mdash; Microplastics in drinking-water (2019). who.int/publications/i/item/9789241516198</p>
            <p>CEFAS / Plymouth Marine Laboratory &mdash; UK seabed microplastic monitoring. cefas.co.uk</p>
            <p>Drinking water particle estimates are indicative ranges derived from multiple peer-reviewed studies and WHO synthesis data. Seabed density figures represent North Sea estimates from trawl and sediment core surveys. Particle counts vary substantially by measurement methodology; comparisons across studies should be treated with caution. Blood detection figures are from a single Dutch study; UK-specific blood prevalence data are not yet available.</p>
          </div>
        </section>
      </main>
    </>
  )
}
