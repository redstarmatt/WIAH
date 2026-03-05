'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface NoiseData {
  national: {
    noiseComplaints: Array<{ year: number; thousands: number }>
    roadTrafficExposure: Array<{ year: number; millionsExposed: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function NoisePollutionPage() {
  const [data, setData] = useState<NoiseData | null>(null)

  useEffect(() => {
    fetch('/data/noise-pollution/noise_pollution.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const complaintsSeries: Series[] = data
    ? [{
        id: 'complaints',
        label: 'Noise complaints to local authorities',
        colour: '#F4A261',
        data: data.national.noiseComplaints.map(d => ({ date: yearToDate(d.year), value: d.thousands })),
      }]
    : []

  const exposureSeries: Series[] = data
    ? [{
        id: 'traffic-exposure',
        label: 'Population exposed to harmful road noise',
        colour: '#E63946',
        data: data.national.roadTrafficExposure.map(d => ({ date: yearToDate(d.year), value: d.millionsExposed })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Noise Pollution" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Noise Pollution"
          question="Is Britain Actually Getting Noisier?"
          finding="An estimated 9.7 million people in England are exposed to road traffic noise above the WHO&apos;s recommended safety threshold. Noise complaints to local authorities peaked at 435,000 in 2021 and remain well above pre-pandemic levels."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Environmental noise is the second most harmful environmental health risk in Europe after air pollution. DEFRA&apos;s 2024 strategic noise mapping estimates 9.7 million people in England are exposed to road traffic noise above the WHO&apos;s 55 dB Lden threshold, up from 8.3 million in 2012; a further 2 million face harmful railway noise and 680,000 airport noise around Heathrow, Gatwick, Manchester, and Stansted. The WHO estimates environmental noise causes 12,000 premature deaths and 48,000 new cases of ischaemic heart disease across Europe annually. Noise complaints to local authorities peaked at 435,000 in 2021 &mdash; 20&percnt; above the pre-pandemic baseline &mdash; driven partly by home-working making daytime neighbourhood noise more intrusive; they fell to 395,000 in 2024 but remain 20&percnt; above 2014 levels. Some 2.9 million people are exposed to road traffic night noise above 50 dB, a level associated with significant sleep disturbance.</p>
            <p>Noise exposure is concentrated in the communities with least power to challenge it. PHE analysis found the most deprived 20&percnt; of English neighbourhoods are twice as likely to be affected by harmful road noise as the least deprived. Aviation noise falls heaviest on communities west of Heathrow where property values and political influence are lower. The regulatory framework offers no meaningful protection: Noise Action Plans under the 2006 Regulations carry no binding targets and no enforcement mechanism; local authorities address statutory nuisance but set no quantitative noise standards; and night flight restrictions at major airports have not been tightened since 2017. Electric vehicles will reduce noise at low speeds but make little difference at motorway speeds where tyre noise dominates.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-complaints', label: 'Complaints' },
          { id: 'sec-exposure', label: 'Traffic Noise' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People exposed to harmful road noise"
              value="9.7m"
              direction="up"
              polarity="up-is-bad"
              changeText="Above WHO 55 dB Lden threshold; up from 8.3m in 2012"
              sparklineData={[8.3, 8.5, 8.9, 9.2, 9.5, 9.7]}
              source="DEFRA strategic noise mapping"
              onExpand={() => {}}
            />
            <MetricCard
              label="Noise complaints (2024)"
              value="395,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Down from 435k peak in 2021 but still 20% above 2014 levels"
              sparklineData={[330, 345, 365, 410, 435, 420, 405, 395]}
              source="DEFRA noise statistics"
              onExpand={() => {}}
            />
            <MetricCard
              label="People exposed to night noise above WHO limit"
              value="2.9m"
              direction="up"
              polarity="up-is-bad"
              changeText="Road traffic above 50 dB Lnight; causes significant sleep disturbance"
              sparklineData={[2.3, 2.4, 2.6, 2.7, 2.8, 2.9]}
              source="DEFRA strategic noise mapping"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complaints" className="mb-12">
            <LineChart
              title="Noise complaints to local authorities, England, 2014&ndash;2024"
              subtitle="Thousands of complaints per year. DEFRA noise statistics. Includes domestic, commercial, and construction noise."
              series={complaintsSeries}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-exposure" className="mb-12">
            <LineChart
              title="Population exposed to harmful road traffic noise, England, 2012&ndash;2024"
              subtitle="Millions of people exposed above 55 dB Lden (WHO threshold). DEFRA strategic noise mapping."
              series={exposureSeries}
              yLabel="Millions exposed"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
