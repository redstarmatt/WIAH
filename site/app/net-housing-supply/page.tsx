'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface NetHousingSupplyData {
  netAdditions: { year: number; dwellings: number }[]
  targetLine: number
  cumulativeShortfall: { year: number; shortfall: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NetHousingSupplyPage() {
  const [data, setData] = useState<NetHousingSupplyData | null>(null)

  useEffect(() => {
    fetch('/data/net-housing-supply/net_housing_supply.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const additionsSeries: Series[] = data
    ? [
        {
          id: 'additions',
          label: 'Net dwellings added',
          colour: '#E63946',
          data: data.netAdditions.map(d => ({
            date: yearToDate(d.year),
            value: d.dwellings,
          })),
        },
        {
          id: 'target',
          label: '300,000 target',
          colour: '#2A9D8F',
          data: data.netAdditions.map(d => ({
            date: yearToDate(d.year),
            value: data.targetLine,
          })),
        },
      ]
    : []

  const shortfallSeries: Series[] = data
    ? [{
        id: 'shortfall',
        label: 'Cumulative housing shortfall',
        colour: '#E63946',
        data: data.cumulativeShortfall.map(d => ({
          date: yearToDate(d.year),
          value: d.shortfall,
        })),
      }]
    : []

  const latestAdditions = data?.netAdditions.at(-1)

  return (
    <>
      <TopicNav topic="Housing Supply" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing Supply"
          question="Is England building enough homes?"
          finding="England added 234,400 net dwellings in 2022/23 — against a government target of 300,000. The target has been missed every year since 2010 except once. The cumulative shortfall since 2010 is estimated at over 2 million homes."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's 300,000 annual housebuilding target, set by the 2017 Housing White Paper, has never been met. The best year was 2019/20 with 243,770 net additions; 2022/23 delivered 234,400. The gap of 65,600 homes in a single year compounds annually: the estimated cumulative shortfall since 2010 exceeded 2 million homes by 2023. The planning system in England requires most new homes to pass through a discretionary permissions process in which only around 60% of local authorities have an up-to-date plan, community opposition consistently delays or reduces proposals, and local politicians face stronger incentives to oppose than to permit. Skills shortages in construction — bricklayers, plasterers, plumbers — compound the delivery problem, worsened by the loss of EU-born labour since Brexit. Labour's 2024 Planning and Infrastructure Bill reintroduces mandatory local housing targets, allows development on degraded &ldquo;grey belt&rdquo; land, and simplifies plan-making — the most ambitious planning reform in a generation, targeting 1.5 million homes over five years.</p>
            <p>The shortfall does not fall equally. The gap between planning permissions granted and homes started consistently shows large volumes of consented development that never gets built, reflecting the market incentives of volume housebuilders to pace output rather than maximise it. The affordable and social rented homes most needed by those locked out of the market are the component most often challenged as unviable and removed from schemes. Those bearing the cost of the shortage — renters paying 36% or more of earnings on housing, young people unable to save deposits, households on social housing waiting lists — have no mechanism to compel the delivery of homes they need but could not finance.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-additions', label: 'Net Additions' },
          { id: 'sec-shortfall', label: 'Cumulative Shortfall' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Net dwellings added (2022/23)"
            value={latestAdditions ? latestAdditions.dwellings.toLocaleString() : '234,400'}
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Below 300,000 target · best year was 2019/20 at 243,770"
            sparklineData={[124360, 141980, 189750, 221090, 234820, 243770, 216490, 232820, 234400]}
            source="DLUHC Housing Supply Statistics · 2023"
            href="#sec-additions"/>
          <MetricCard
            label="Government annual target"
            value="300,000"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText="Years target met since 2010: 0 · closest was 2019/20 (97%)"
            sparklineData={[300000, 300000, 300000, 300000, 300000, 300000, 300000]}
            source="DLUHC Housing Policy"
            href="#sec-shortfall"/>
          <MetricCard
            label="Cumulative shortfall since 2010"
            value="2.1m"
            unit="homes"
            direction="up"
            polarity="up-is-bad"
            changeText="Estimated households needing homes that don't exist"
            sparklineData={[350000, 850000, 1600000, 2100000]}
            source="Shelter / DLUHC estimates · 2023"
            href="#sec-shortfall"/>
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-additions" className="mb-12">
          <LineChart
            title="Net housing additions vs target, England, 2010–2023"
            subtitle="Net additional dwellings per year compared to the government's 300,000 annual target. DLUHC."
            series={additionsSeries}
            annotations={[
              { date: new Date(2017, 6, 1), label: 'Housing White Paper: 300k target' },
            ]}
            yLabel="Dwellings"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-shortfall" className="mb-12">
          <LineChart
            title="Estimated cumulative housing shortfall, England, 2015–2023"
            subtitle="Estimated gap between homes built and homes needed since 2010. Shelter / DLUHC."
            series={shortfallSeries}
            yLabel="Homes (shortfall)"
          />
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-housing-supply" className="underline" target="_blank" rel="noopener noreferrer">
              DLUHC Housing Supply Statistics (gov.uk)
            </a>
            {' '}· Savills UK Housing Market Research · House of Commons Library
          </p>
        </section>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  )
}
