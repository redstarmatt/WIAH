'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface WaterAffordabilityRow {
  year: number
  avgBillAnnual: number
  waterPovertyPct?: number
}

interface WaterAffordabilityData {
  topic: string
  lastUpdated: string
  timeSeries: WaterAffordabilityRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function WaterAffordabilityPage() {
  const [data, setData] = useState<WaterAffordabilityData | null>(null)

  useEffect(() => {
    fetch('/data/water-affordability/water_affordability.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const waterSeries: Series[] = data
    ? [
        {
          id: 'avgBillAnnual',
          label: 'Average annual bill (£)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgBillAnnual,
          })),
        },
        {
          id: 'waterPovertyPct',
          label: 'In water poverty (%)',
          colour: '#6B7280',
          data: data.timeSeries
            .filter(d => d.waterPovertyPct !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.waterPovertyPct as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Water Affordability" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water Affordability"
          question="Can Everyone Afford Their Water Bills?"
          finding="Average water bills have risen to £448 a year, and 22% of households are in 'water poverty' — spending more than 3% of their income on water."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Water bills in England and Wales have risen sharply since privatisation, with the average annual bill reaching &pound;528 in 2024 &mdash; a 37% nominal increase since 2015. Ofwat&rsquo;s 2024 price review allowed a further 26% average increase over 2025&ndash;2030, partly to fund infrastructure investment, partly to service the large debt loads that companies accumulated during years of dividend extraction. Water poverty &mdash; defined as spending more than 3% of household income on water &mdash; affected an estimated 25% of households in 2024, up from 18% in 2015. Unlike energy bills during the 2022&ndash;23 crisis, water bills received no government subsidy, and social tariffs intended for low-income households are claimed by only around 8% of those eligible despite the scheme existing for over a decade.</p>
            <p>The affordability burden falls hardest on those with the least flexibility. A flat annual charge is inherently regressive, consuming a far higher share of a low-income household&rsquo;s budget than a high-income one. Metered households with larger families or medical conditions requiring high water use face bills that do not reflect their ability to pay. Social tariffs &mdash; the principal protective mechanism &mdash; remain inaccessible to most eligible households because of low awareness, complex applications, and inconsistent promotion by companies. Bill increases approved to fund infrastructure investment in failing networks are thus falling disproportionately on those least able to bear them.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Bill Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Avg water bill 2024"
              value="£528"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+37% since 2015 &middot; Ofwat approved rises"
              sparklineData={[386, 392, 397, 405, 410, 415, 419, 436, 448, 528]}
              onExpand={() => {}}
              source="Ofwat &middot; Water Company Performance 2024"
            />
            <MetricCard
              label="In water poverty"
              value="25%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 households &middot; social tariff uptake low"
              sparklineData={[18, 18, 21, 22, 25]}
              onExpand={() => {}}
              source="Consumer Council for Water &middot; 2024"
            />
            <MetricCard
              label="Social tariff coverage"
              value="8%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="only 8% of struggling customers on reduced rates"
              sparklineData={[6, 7, 7, 8, 8]}
              onExpand={() => {}}
              source="Ofwat &middot; Social Tariff Review 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Water bills and water poverty, 2015&ndash;2024"
              subtitle="Average annual household water bill in pounds and percentage of households in water poverty (spending more than 3% of income on water)."
              series={waterSeries}
              yLabel="Value"
              source={{
                name: 'Ofwat / Consumer Council for Water',
                dataset: 'Water Company Performance / Affordability Research',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ofwat &mdash; Water Company Performance Reports. Annual data on bills, investment, and service levels. ofwat.gov.uk/regulated-companies/company-obligations/annual-performance-reports</p>
            <p>Consumer Council for Water &mdash; Affordability and Debt Research. ccwater.org.uk/research</p>
            <p>Ofwat &mdash; Social Tariff Monitoring. ofwat.gov.uk/households/customer-and-affordability-information/social-tariffs</p>
            <p>Average annual bill is Ofwat published average for combined water and sewerage services. Water poverty definition: household spending more than 3% of disposable income on water bills. Social tariff coverage: percentage of households receiving a discounted tariff from their water company. Figures for 2024 reflect April 2024 price increases.</p>
          </div>
        </section>
      </main>
    </>
  )
}
