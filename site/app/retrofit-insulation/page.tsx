'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface RetrofitInsulationData {
  timeSeries: Array<{
    year: number
    epcABCPct: number
    retrofitsK: number
  }>
  target2000kPerYear: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function RetrofitInsulationPage() {
  const [data, setData] = useState<RetrofitInsulationData | null>(null)

  useEffect(() => {
    fetch('/data/retrofit-insulation/retrofit_insulation.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const epcSeries: Series[] = data
    ? [{
        id: 'epcABC',
        label: 'Homes rated EPC A-C (%)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.epcABCPct,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Retrofit &amp; Insulation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Retrofit &amp; Insulation"
          question="Are Homes Being Made Energy Efficient?"
          finding="Only 250,000 homes are retrofitted per year — but meeting net zero requires 2 million per year, meaning the programme must scale 8-fold."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has some of the oldest, least energy-efficient housing stock in Europe. Meeting the government&rsquo;s net zero pathway requires retrofitting approximately 2 million homes per year from the late 2020s onward; the current rate is around 250,000 — an eightfold shortfall. EPC ratings of A–C have risen from 38% of English homes in 2015 to 48% in 2023, driven by cavity wall insulation programmes and the Energy Company Obligation, but at this pace reaching the 80% target by 2035 would require acceleration that current programmes cannot deliver. Minimum EPC C requirements for the private rented sector were proposed and then dropped in 2023 amid landlord lobbying, leaving 4.5 million rented households in disproportionately poorly insulated homes. The average whole-house retrofit costs £15,000–£25,000, which most households cannot fund from savings, and a national retrofit financing mechanism remains absent.</p>
            <p>The workforce challenge matches the funding gap: retrofitting 2 million homes per year requires an estimated 500,000 trained workers, against a current trained workforce of under 50,000. The burden of cold, expensive-to-heat homes falls hardest on private renters and low-income owner-occupiers, who cannot direct or fund improvements and face the highest energy bills as a share of income. An average household moving from EPC F to EPC C saves around £1,300 per year — but ECO4 and the Great British Insulation Scheme fund only the lowest-income households, leaving the majority of the retrofit task unfunded at household level.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'EPC Progress' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes rated EPC A–C"
              value="48%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Steady improvement · target 80% by 2035"
              sparklineData={[38, 39, 40, 41, 42, 44, 45, 46, 48]}
              href="#sec-chart"source="DESNZ · Energy Performance of Buildings 2023"
            />
            <MetricCard
              label="Retrofits per year"
              value="250k"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Need 2 million p/a for net zero · 8x shortfall"
              sparklineData={[380, 360, 340, 310, 290, 250, 270, 250, 250]}
              href="#sec-chart"source="DESNZ / National Infrastructure Commission · 2023"
            />
            <MetricCard
              label="EPC F/G rated homes"
              value="12%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Privately rented sector still worst performing"
              sparklineData={[20, 19, 18, 17, 16, 15, 14, 13, 12]}
              href="#sec-chart"source="DESNZ · Energy Performance of Buildings 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Homes rated EPC A–C (energy efficient), 2015–2023"
              subtitle="Percentage of all English homes with an Energy Performance Certificate rating of A, B, or C. Data from the EPC register; not all homes have a current certificate."
              series={epcSeries}
              yLabel="EPC A-C (%)"
              source={{
                name: 'DESNZ',
                dataset: 'Energy Performance of Buildings Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ — Energy Performance of Buildings Statistics. Published quarterly. gov.uk/government/collections/energy-performance-certificates</p>
            <p>National Infrastructure Commission — Baseline Report and Net Zero housing analysis. nic.org.uk</p>
            <p>DESNZ — Energy Company Obligation (ECO) and Great British Insulation Scheme statistics. gov.uk/government/collections/energy-company-obligation</p>
            <p>EPC data is based on lodged certificates from the national EPC register. Not all homes have a current valid EPC; the dataset therefore covers only homes where a certificate has been issued, typically those sold or let recently. The proportion of EPC A-C homes may be slightly higher in the total stock if energy-efficient owner-occupied homes without recent EPCs are included. Retrofit rate estimates are from industry analysis combining ECO scheme data, local authority returns, and energy efficiency survey data. The 2 million/year target is from Climate Change Committee Net Zero pathway modelling.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
