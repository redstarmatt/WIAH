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
          finding="An estimated 9.7 million people in England are exposed to road traffic noise above the WHO's recommended safety threshold. Noise complaints to local authorities peaked at 435,000 in 2021 and remain well above pre-pandemic levels."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Environmental noise is the second most harmful environmental health risk in Europe after air pollution, according to the World Health Organization. In England, DEFRA's strategic noise mapping estimated in 2024 that 9.7 million people are exposed to road traffic noise above 55 dB Lden — the WHO Environmental Noise Guidelines threshold above which adverse health effects become significant. An additional 2 million are exposed to harmful noise from railways, and 680,000 from major airports, predominantly around Heathrow, Gatwick, Manchester, and Stansted. The WHO estimates that environmental noise causes 12,000 premature deaths and 48,000 new cases of ischaemic heart disease across Europe annually, with sleep disturbance, cardiovascular disease, and cognitive impairment in children as the primary health pathways.</p>
            <p>Noise complaints to local authorities in England peaked at 435,000 in 2021, a 20% increase on the pre-pandemic baseline, driven by changed working patterns that made daytime neighbourhood noise more intrusive. By 2024, complaints had fallen to 395,000 but remained 20% above the 2014 level of 330,000. Construction noise complaints have risen sharply in London and other major cities where housebuilding targets are increasing activity. Night-time noise — particularly from hospitality, late-night deliveries, and traffic — is the most harmful category, as it disrupts sleep. The WHO recommends night-time noise levels below 40 dB Lnight, but DEFRA mapping shows that 2.9 million people in England are exposed to road traffic noise above 50 dB Lnight — a level associated with significant sleep disturbance.</p>
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
              href="#sec-complaints"
            />
            <MetricCard
              label="Noise complaints (2024)"
              value="395,000"
              direction="up"
              polarity="up-is-bad"
              changeText="Down from 435k peak in 2021 but still 20% above 2014 levels"
              sparklineData={[330, 345, 365, 410, 435, 420, 405, 395]}
              source="DEFRA noise statistics"
              href="#sec-complaints"
            />
            <MetricCard
              label="People exposed to night noise above WHO limit"
              value="2.9m"
              direction="up"
              polarity="up-is-bad"
              changeText="Road traffic above 50 dB Lnight; causes significant sleep disturbance"
              sparklineData={[2.3, 2.4, 2.6, 2.7, 2.8, 2.9]}
              source="DEFRA strategic noise mapping"
              href="#sec-complaints"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complaints" className="mb-12">
            <LineChart
              title="Noise complaints to local authorities, England, 2014–2024"
              subtitle="Thousands of complaints per year. DEFRA noise statistics. Includes domestic, commercial, and construction noise."
              series={complaintsSeries}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-exposure" className="mb-12">
            <LineChart
              title="Population exposed to harmful road traffic noise, England, 2012–2024"
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
