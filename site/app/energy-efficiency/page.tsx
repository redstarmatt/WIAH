'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface EnergyEfficiencyData {
  national: {
    epcRating: Array<{ year: number; pctAtCOrAbove: number }>
    heatPumps: Array<{ year: number; installations: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function EnergyEfficiencyPage() {
  const [data, setData] = useState<EnergyEfficiencyData | null>(null)

  useEffect(() => {
    fetch('/data/energy-efficiency/energy_efficiency.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const epcSeries: Series[] = data
    ? [{
        id: 'epc',
        label: 'Homes rated EPC C or above',
        colour: '#2A9D8F',
        data: data.national.epcRating.map(d => ({ date: yearToDate(d.year), value: d.pctAtCOrAbove })),
      }]
    : []

  const heatPumpSeries: Series[] = data
    ? [{
        id: 'heat-pumps',
        label: 'Annual heat pump installations',
        colour: '#264653',
        data: data.national.heatPumps.map(d => ({ date: yearToDate(d.year), value: d.installations / 1000 })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Energy Efficiency" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy Efficiency"
          question="Are Britain&apos;s Homes Actually Getting More Efficient?"
          finding="Only 49&percnt; of English homes have an EPC rating of C or above, against a target of 100&percnt; by 2035. Heat pump installations reached 72,000 in 2024 &mdash; less than 12&percnt; of the 600,000 per year needed to meet net zero targets."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Heating homes accounts for approximately 17&percnt; of UK greenhouse gas emissions. The government&apos;s ambition is for all homes to reach EPC C or above by 2035, but only 49&percnt; of English homes currently meet that standard; 12.7 million remain at EPC D or below, with 3.2 million at the worst E, F, or G ratings. Bringing all homes to EPC C would cost an estimated &pound;65&ndash;&pound;80 billion; annual government spending on residential energy efficiency stands at around &pound;1.3 billion. Heat pump installations reached 72,000 in 2024 &mdash; up from 19,000 in 2017 &mdash; but the net zero strategy requires 600,000 per year by the late 2020s. Labour&apos;s Warm Homes Plan pledged &pound;6.6 billion over the 2025&ndash;2030 parliament, but previous insulation programmes &mdash; the Green Deal (2013&ndash;15) and the Green Homes Grant (2020&ndash;21) &mdash; were abandoned having delivered a fraction of their targets.</p>
            <p>The burden of energy inefficiency falls unequally. Private rented homes are the worst-performing sector: 29&percnt; rated EPC E or below versus 14&percnt; of owner-occupied homes. Minimum Energy Efficiency Standards require private rentals to reach EPC E, but the National Residential Landlords Association estimates only 3&percnt; of non-compliant properties have faced enforcement. Wales and the North East have the highest proportions of inefficient housing. Rural properties &mdash; off-grid and reliant on oil or LPG &mdash; face the highest heating costs and the most expensive retrofits. At current electricity-to-gas price ratios, a heat pump in a poorly insulated home can cost more to run than the gas boiler it replaces, actively discouraging the switch &mdash; meaning insulation and heat pump policy must advance together to work at all.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-epc', label: 'EPC Ratings' },
          { id: 'sec-heatpumps', label: 'Heat Pumps' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes rated EPC C or above"
              value="49"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 14% in 2012; target: 100% by 2035"
              sparklineData={[14, 19, 28, 34, 40, 46, 49]}
              source="English Housing Survey"
              href="#sec-epc"/>
            <MetricCard
              label="Heat pump installations (2024)"
              value="72,000"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 19,000 in 2017 &mdash; but 600,000/yr needed by 2028"
              sparklineData={[19, 22, 27, 32, 43, 55, 60, 72]}
              source="MCS installation data"
              href="#sec-heatpumps"/>
            <MetricCard
              label="Homes still rated EPC D or below"
              value="12.7m"
              direction="down"
              polarity="up-is-bad"
              changeText="3.2m at EPC E, F, or G &mdash; the worst categories"
              sparklineData={[17.1, 16.2, 15.4, 14.6, 13.8, 13.2, 12.7]}
              source="English Housing Survey"
              href="#sec-heatpumps"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-epc" className="mb-12">
            <LineChart
              title="Homes rated EPC C or above, England, 2012&ndash;2024"
              subtitle="Percentage of assessed homes meeting the government&apos;s 2035 target of EPC C. English Housing Survey."
              series={epcSeries}
              yLabel="% at EPC C+"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-heatpumps" className="mb-12">
            <LineChart
              title="Annual heat pump installations, UK, 2017&ndash;2024"
              subtitle="Thousands of MCS-certified heat pump installations per year. Excludes uncertified installations."
              series={heatPumpSeries}
              yLabel="Thousands installed"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
