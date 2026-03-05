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
            <p>Air pollution causes an estimated 28,000&ndash;36,000 premature deaths per year in the UK and costs approximately &pound;20 billion annually. Children are disproportionately exposed: their lungs are still developing, they breathe more air relative to body size, and they spend significant time outdoors. Approximately 970,000 UK children attend schools in areas exceeding the WHO annual mean NO2 guideline of 10 &mu;g/m&sup3; &mdash; down from 1.15 million in 2019, with most of the improvement attributable to London&apos;s ULEZ expansion. Central London school NO2 readings have historically reached up to five times the WHO guideline. The WHO tightened its guideline from 20 to 10 &mu;g/m&sup3; in 2021, and against this stricter standard the number of schools in breach is substantially higher than against the UK legal limit of 40 &mu;g/m&sup3;. Independently monitored school street schemes &mdash; over 600 in London by 2024 &mdash; reduce immediate NO2 by 20&ndash;30% during restriction hours.</p>
            <p>The burden falls hardest on children in the most deprived urban areas, who are 1.5 times more likely to live near a major road and thus experience the highest chronic exposures. PM2.5 particles &mdash; which penetrate deep into lung tissue and the bloodstream &mdash; cause irreversible developmental damage: children in high-pollution areas show measurably smaller lung capacity by age 8, with deficits that persist into adulthood. Research links long-term childhood NO2 exposure to reduced cognitive development and attainment. Indoor air quality in schools adds a further layer: CO2 monitor data gathered during the pandemic revealed elevated concentrations in many classrooms, with poor ventilation associated with impaired concentration and higher absence rates, but monitoring has not been systematically followed through with investment in ventilation improvements.</p>
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
              href="#sec-chart"/>
            <MetricCard
              label="Schools exceeding WHO NO2 limit"
              value="8,500"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 10,200 · improving but widespread"
              sparklineData={[10200, 10000, 9800, 9500, 9200, 9100, 8900, 8700, 8500]}
              source="DEFRA · Air Quality in Schools 2024"
              href="#sec-chart"/>
            <MetricCard
              label="London NO2 near schools"
              value="up to 5× WHO"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Improving but still far above safe levels"
              sparklineData={[7, 7, 6, 6, 6, 5.5, 5.5, 5, 5]}
              source="King's College London · Air Quality Monitoring 2024"
              href="#sec-chart"/>
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
