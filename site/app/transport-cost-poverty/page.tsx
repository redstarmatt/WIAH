'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TransportCostRow {
  year: number
  trainFareIndex: number
  wageIndex: number
  ruralBusRoutes?: number
}

interface TransportCostData {
  topic: string
  lastUpdated: string
  timeSeries: TransportCostRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function TransportCostPovertyPage() {
  const [data, setData] = useState<TransportCostData | null>(null)

  useEffect(() => {
    fetch('/data/transport-cost-poverty/transport_cost_poverty.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const transportSeries: Series[] = data
    ? [
        {
          id: 'trainFareIndex',
          label: 'Train fares (index, 2010=100)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.trainFareIndex,
          })),
        },
        {
          id: 'wageIndex',
          label: 'Average wages (index, 2010=100)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.wageIndex,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Transport Cost Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport Cost Poverty"
          question="Is Getting Around Too Expensive for Low-Income Families?"
          finding="Car-free households in rural areas spend 20% or more of their income on transport — while train fares have risen 54% since 2010 versus 28% wage growth."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Train fares have risen 54% since 2010 while average wages grew only 28% in nominal terms — a 26 percentage point affordability gap. The rural bus network has halved: approximately 16,000 routes operated in 2010, falling to around 8,200 by 2023 as commercial viability and local authority funding declined in tandem. The Bus Service Operators Grant has been repeatedly reduced in real terms; the Bus Back Better strategy's promised £3 billion transformation fund has not materialised at the scale needed to reverse a decade of route withdrawal. Car-free rural households — disproportionately elderly, low-income, or disabled — can spend more than 20% of household income on transport, compared to 10–15% for the wider population.</p>
            <p>The consequences of transport poverty extend far beyond inconvenience: limited affordable transport reduces access to employment, healthcare, education, and social participation. People unable to afford travel to job interviews or training are structurally excluded from the labour market; those who cannot afford hospital transport miss clinical appointments. Electric vehicle incentives and EV infrastructure investment have primarily benefited higher-income households with off-street parking, widening the gap between car-dependent and car-free households rather than reducing it. Transport cost is categorised as a household expenditure choice in national statistics, rendering the scale of transport poverty largely invisible to policymakers.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Cost Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Train fares vs wages"
              value="+54% vs +28%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="since 2010 · affordability gap growing"
              sparklineData={[100, 111, 119, 126, 136, 140, 141, 143, 148, 154]}
              href="#sec-chart"source="ORR / ONS · Rail Fares Index 2023"
            />
            <MetricCard
              label="Rural bus routes"
              value="8,200"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="halved since 2010 · 16k to 8.2k routes cut"
              sparklineData={[16000, 14000, 12500, 11000, 10000, 9200, 8600, 8200]}
              href="#sec-chart"source="DfT · Bus Statistics 2023"
            />
            <MetricCard
              label="Transport poverty rate"
              value="20%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="rural car-free households spending >20% of income"
              sparklineData={[18, 19, 19, 20, 20]}
              href="#sec-chart"source="Campaign for Better Transport · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Train fares vs wages, 2010–2023 (indexed to 100)"
              subtitle="Train fare index and average wage index, both set to 100 in 2010. The widening gap shows rail affordability deteriorating year on year."
              series={transportSeries}
              yLabel="Index (2010 = 100)"
              source={{
                name: 'ORR / ONS',
                dataset: 'Rail Fares Index / Average Weekly Earnings',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Office of Rail and Road — Rail Fares Index. Annual data on regulated and unregulated rail fares. orr.gov.uk/monitoring-regulation/rail/rail-markets/fares-ticketing</p>
            <p>ONS — Average Weekly Earnings (AWE). Monthly earnings series, used here as annual average. ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours</p>
            <p>Department for Transport — Bus Statistics. Annual publication on bus routes, funding, and patronage. gov.uk/government/collections/bus-statistics</p>
            <p>Campaign for Better Transport — Buses in Crisis. campaignforbettertransport.org.uk/research</p>
            <p>Train fare index uses ORR regulated fares data indexed to 2010=100. Wage index uses ONS AWE total pay (including bonuses) indexed to 2010=100. Rural bus route count from DfT supported and commercial routes combined; rural defined as areas outside urban settlements of 10,000+ population. Transport poverty rate from CBT research into expenditure patterns of car-free households in rural local authorities.</p>
          </div>
        </section>
      </main>
    </>
  )
}
