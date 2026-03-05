'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface AirQualitySchoolsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{ year: number; childrenHighPollutionK: number; schoolsExceedingWHO: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function AirQualitySchoolsPage() {
  const [data, setData] = useState<AirQualitySchoolsData | null>(null)

  useEffect(() => {
    fetch('/data/air-quality-schools/air_quality_schools.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'schoolsExceedingWHO',
        label: 'Schools exceeding WHO NO2 guideline',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.schoolsExceedingWHO })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Air Quality in Schools" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Air Quality in Schools"
          question="Are Children Breathing Clean Air at School?"
          finding="Nearly 1 million UK children attend schools in areas exceeding WHO pollution guidelines, though London's ULEZ has begun to show measurable progress."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Air pollution is the largest environmental health risk in the UK, estimated to cause approximately 28,000&ndash;36,000 premature deaths per year and to cost the economy approximately &pound;20 billion annually. Children are disproportionately affected: their lungs are still developing, they breathe more air relative to body size than adults, and they spend significant amounts of time outdoors. Schools located near busy roads or in areas with high traffic density are exposure hot-spots. The WHO revised its air quality guidelines downward in 2021, setting an annual mean NO2 guideline of 10 micrograms per cubic metre &mdash; half the previous level of 20 &mu;g/m&sup3; and well below the EU legal limit of 40 &mu;g/m&sup3;. Against this stricter standard, a larger proportion of schools exceed safe levels.</p>
            <p>Analysis by the Royal College of Physicians, ClientEarth, and the Greater London Authority has consistently found that hundreds of thousands of children attend schools in areas exceeding WHO guidelines for NO2 and particulate matter. The most recent comprehensive analysis, updated in 2024, estimated approximately 970,000 children across the UK attend schools in areas exceeding WHO NO2 guidelines &mdash; down from approximately 1.15 million in 2019, with the improvement largely attributable to London&apos;s Ultra Low Emission Zone expansion. In central London, NO2 levels near schools have historically been up to five times the WHO guideline, with King&apos;s College London monitoring data showing significant concentrations around primary schools in high-traffic zones.</p>
            <p>Particulate matter &mdash; PM2.5, the finest particles associated with combustion &mdash; is in some respects a greater health concern than NO2. PM2.5 particles penetrate deep into the lungs and bloodstream, causing cardiovascular and respiratory damage. Agricultural burning, domestic wood burning, diesel vehicles, and secondary formation from atmospheric chemistry all contribute to PM2.5 levels. There is no &apos;safe&apos; level of PM2.5 exposure in epidemiological terms, and the UK&apos;s annual mean PM2.5 target of 10 &mu;g/m&sup3; (set for 2040 under the Environment Act 2021) means that all schools in areas above this level are in an environment with measurable health risk.</p>
            <p>School streets &mdash; traffic restriction schemes that prevent cars from driving in the street outside a school during drop-off and pick-up times &mdash; have been shown in independent monitoring to reduce NO2 levels by 20&ndash;30% in the immediate school area during restriction hours. Over 600 school streets had been implemented in London by 2024 and dozens more in Bristol, Brighton, Edinburgh, and other cities. The evidence base for school streets is strong, and they require relatively limited capital investment, but they depend on local council enforcement and political support that is not universally available. Clean air zones and low emission zones at city scale complement school street interventions by reducing background pollution levels.</p>
            <p>Indoor air quality in schools presents a different but related challenge. Studies have found elevated CO2 levels &mdash; a proxy for poor ventilation and an indicator of potential airborne pathogen risk &mdash; in a significant proportion of school classrooms, particularly older buildings with limited ventilation provision. The pandemic-era installation of CO2 monitors in schools provided data that drove ventilation improvements in many cases, but the monitor programme has not been universally followed through into sustained ventilation investment. The relationship between indoor air quality, cognitive performance, and school attendance is an increasingly active area of research, with evidence that poor indoor air quality is associated with impaired concentration and higher absence rates.</p>
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
              label="Children in high-pollution school areas"
              value="970,000"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="-180k since 2019 · ULEZ progress in London"
              sparklineData={[1150, 1120, 1100, 1080, 1060, 1050, 1030, 1000, 970]}
              source="ClientEarth / GLA · Air Quality Schools Analysis 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Schools exceeding WHO NO2 limit"
              value="8,500"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 10,200 · improving but widespread"
              sparklineData={[10200, 10000, 9800, 9500, 9200, 9100, 8900, 8700, 8500]}
              source="DEFRA · Air Quality in Schools 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="London NO2 near schools"
              value="up to 5× WHO"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Improving but still far above safe levels"
              sparklineData={[7, 7, 6, 6, 6, 5.5, 5.5, 5, 5]}
              source="King's College London · Air Quality Monitoring 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Schools in areas exceeding WHO pollution guidelines, 2016–2024"
              subtitle="Number of schools in England in areas above WHO annual mean NO2 guideline."
              series={series}
              yLabel="Schools"
              source={{ name: 'DEFRA', dataset: 'Air Quality in Schools Analysis', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DEFRA. Air Quality in Schools Analysis. 2024. Based on AURN monitoring network modelled estimates at school locations. WHO NO2 guideline is 10 &mu;g/m&sup3; annual mean (2021 revision).</p>
            <p>ClientEarth / Greater London Authority. Air Quality and Schools Analysis. 2024. Children estimates based on school roll data and local authority NO2 monitoring. King&apos;s College London. London Air Quality Network. Continuous monitoring data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
