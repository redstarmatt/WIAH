'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  btrStockK: number
  pipelineK: number
}

interface BuildToRentSectorData {
  timeSeries: TimeSeriesPoint[]
  btRentPremiumPct: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function BuildToRentSectorPage() {
  const [data, setData] = useState<BuildToRentSectorData | null>(null)

  useEffect(() => {
    fetch('/data/build-to-rent-sector/build_to_rent_sector.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const btrSeries: Series[] = data
    ? [
        {
          id: 'stock',
          label: 'BTR units in operation (thousands)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.btrStockK,
          })),
        },
        {
          id: 'pipeline',
          label: 'Units in pipeline (thousands)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pipelineK,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Who Is Building the Homes of the Future?"
          finding="The build-to-rent sector has grown to 97,000 units with 250,000 in the pipeline &mdash; but average rents run 7% above comparable market-rate properties."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Build-to-rent (BTR) is the fastest-growing segment of the UK housing market, expanding from around 26,000 purpose-built units in 2016 to approximately 105,000 operational units by 2024, with a further 268,000 in the development pipeline. Backed by institutional capital from pension funds and real estate investment trusts, BTR developments offer features the fragmented private rental market cannot match &mdash; professional management, longer tenancies, in-house maintenance &mdash; but analysis consistently finds rents running approximately 7% above comparable market-rate properties in the same postcode. In cities where BTR has been concentrated, notably Manchester and Birmingham, institutional landlords now account for a significant share of all rental supply. The planning policy debate turns on whether BTR adds net supply or displaces mixed-tenure developments that would have included a higher proportion of affordable homes.</p>
            <p>The distributional consequences are emerging but not yet fully understood. Evidence from the United States and Germany, where institutional rental housing has a longer history, suggests professional management standards improve, but rents in landlord-concentrated cities tend to rise faster than in comparable markets. BTR development is heavily urban and city-centre focused, meaning its supply benefits primarily reach higher-income renters while mid-market and family-sized rental supply in suburban areas remains dominated by small private landlords whose numbers are shrinking. The decisions being made now on planning obligations, rent regulation, and permitted development rights will shape the character of Britain&apos;s rental market for decades.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Sector Growth' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="BTR stock"
              value="105k units"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="quadrupled since 2016 &middot; new supply mode"
              sparklineData={[26, 34, 43, 54, 63, 73, 83, 97, 105]}
              href="#sec-chart"source="BPF &middot; Build to Rent Report 2024"
            />
            <MetricCard
              label="Pipeline"
              value="268k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="significant investor interest &middot; planning key"
              sparklineData={[89, 102, 124, 148, 173, 198, 222, 250, 268]}
              href="#sec-chart"source="BPF &middot; Build to Rent Report 2024"
            />
            <MetricCard
              label="BTR rent premium"
              value="7%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="above market rate &middot; amenity premium or monopoly rent?"
              sparklineData={[4, 4, 5, 5, 6, 6, 7, 7, 7]}
              href="#sec-chart"source="Savills &middot; UK Build to Rent Market Update 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Build-to-rent sector growth: stock and pipeline, 2016&ndash;2024"
              subtitle="Completed BTR units in operation (dark) and units in development pipeline (grey). Thousands. UK."
              series={btrSeries}
              yLabel="Units (thousands)"
              source={{
                name: 'British Property Federation',
                dataset: 'Build to Rent Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>British Property Federation &mdash; Build to Rent Report. Annual sector census. bpf.org.uk/what-we-do/residential/build-to-rent/</p>
            <p>Savills &mdash; UK Build to Rent Market Update. Quarterly research. savills.co.uk</p>
            <p>DLUHC &mdash; Private Rented Sector Survey. Annual housing market data. gov.uk/government/collections/private-rented-sector</p>
            <p>BTR defined as purpose-built private rental developments of 20 or more units retained in single institutional ownership. Excludes single-family BTR (houses rather than flats) unless specified. Pipeline includes units with planning permission, under construction, or in pre-application stage.</p>
          </div>
        </section>
      </main>
    </>
  )
}
