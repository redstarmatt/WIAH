'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="Only 250,000 homes are retrofitted per year &mdash; but meeting net zero requires 2 million per year, meaning the programme must scale 8-fold."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has some of the oldest and least energy-efficient housing stock in Europe. Around 29 million existing homes will need to be improved to meet net zero carbon targets &mdash; insulated, fitted with heat pumps or low-carbon heat sources, and in many cases upgraded in structural and ventilation terms as well. The scale of the task dwarfs anything the country has attempted in peacetime construction. Meeting government&rsquo;s own pathway requires retrofitting approximately 2 million homes per year from the late 2020s onward. The current rate is around 250,000 per year &mdash; an eightfold shortfall.</p>
            <p>Progress on energy performance certificates (EPCs) has been steady but slow. In 2015, around 38% of English homes held an EPC rating of A, B, or C &mdash; the threshold the government has at various points targeted as a minimum standard for rented homes and the benchmark for fuel poverty policy. By 2023, that figure had risen to 48%. The improvement is real, driven by cavity wall insulation programmes in the 2010s, solid wall insulation under the Energy Company Obligation (ECO), and the natural turnover of old boilers. But at this pace, reaching the 80% target by 2035 would require a dramatic acceleration that current programmes cannot deliver.</p>
            <p>The privately rented sector remains the most problematic. The government proposed requiring landlords to achieve a minimum EPC C rating for new tenancies by 2025 and all tenancies by 2028. Those targets were dropped in 2023 amid lobbying from landlord groups and concerns about the cost burden on small landlords. The consequence is that 4.5 million households in the private rented sector remain disproportionately likely to live in poorly insulated homes, paying higher energy bills they cannot control because they neither own nor can direct improvement to the property they rent.</p>
            <p>The workforce challenge is as significant as the funding challenge. Retrofitting 2 million homes per year requires an estimated 500,000 trained workers &mdash; insulation fitters, heat pump engineers, window installers, and project managers. The current trained retrofit workforce is estimated at under 50,000. Training pipelines through the Retrofit Academy and apprenticeship schemes are expanding, but the trajectory required is not yet established. Supply chain constraints also affect the availability of insulation materials, heat pumps, and skilled tradespeople in ways that add cost and delay.</p>
            <p>The economic case for retrofit is clear over any medium-term horizon. An average household that moves from EPC F to EPC C saves around &pound;1,300 per year on energy bills at current prices. At scale, domestic retrofit reduces gas import dependency, improves energy security, and creates skilled jobs distributed across all parts of the country. The barrier is upfront cost: the average whole-house retrofit costs &pound;15,000&ndash;&pound;25,000, which most households cannot fund from savings, and loan financing adds cost and risk. Government grant schemes &mdash; ECO4, Great British Insulation Scheme &mdash; provide support for the lowest-income households but leave the majority of the retrofit task unfunded at a household level. A national retrofit financing mechanism that makes borrowing affordable and risk-managed remains the missing piece.</p>
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
              label="Homes rated EPC A&ndash;C"
              value="48%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Steady improvement &middot; target 80% by 2035"
              sparklineData={[38, 39, 40, 41, 42, 44, 45, 46, 48]}
              onExpand={() => {}}
              source="DESNZ &middot; Energy Performance of Buildings 2023"
            />
            <MetricCard
              label="Retrofits per year"
              value="250k"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Need 2 million p/a for net zero &middot; 8x shortfall"
              sparklineData={[380, 360, 340, 310, 290, 250, 270, 250, 250]}
              onExpand={() => {}}
              source="DESNZ / National Infrastructure Commission &middot; 2023"
            />
            <MetricCard
              label="EPC F/G rated homes"
              value="12%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Privately rented sector still worst performing"
              sparklineData={[20, 19, 18, 17, 16, 15, 14, 13, 12]}
              onExpand={() => {}}
              source="DESNZ &middot; Energy Performance of Buildings 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Homes rated EPC A&ndash;C (energy efficient), 2015&ndash;2023"
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
            <p>DESNZ &mdash; Energy Performance of Buildings Statistics. Published quarterly. gov.uk/government/collections/energy-performance-certificates</p>
            <p>National Infrastructure Commission &mdash; Baseline Report and Net Zero housing analysis. nic.org.uk</p>
            <p>DESNZ &mdash; Energy Company Obligation (ECO) and Great British Insulation Scheme statistics. gov.uk/government/collections/energy-company-obligation</p>
            <p>EPC data is based on lodged certificates from the national EPC register. Not all homes have a current valid EPC; the dataset therefore covers only homes where a certificate has been issued, typically those sold or let recently. The proportion of EPC A-C homes may be slightly higher in the total stock if energy-efficient owner-occupied homes without recent EPCs are included. Retrofit rate estimates are from industry analysis combining ECO scheme data, local authority returns, and energy efficiency survey data. The 2 million/year target is from Climate Change Committee Net Zero pathway modelling.</p>
          </div>
        </section>
      </main>
    </>
  )
}
