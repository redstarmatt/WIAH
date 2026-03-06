'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface CharitySectorRow {
  year: number
  charitiesFolded: number
  govtIncomePct?: number
}

interface CharitySectorData {
  topic: string
  lastUpdated: string
  timeSeries: CharitySectorRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CharitySectorFinancesPage() {
  const [data, setData] = useState<CharitySectorData | null>(null)

  useEffect(() => {
    fetch('/data/charity-sector-finances/charity_sector_finances.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const charitySeries: Series[] = data
    ? [
        {
          id: 'charitiesFolded',
          label: 'Charities folded',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.charitiesFolded,
          })),
        },
        {
          id: 'govtIncomePct',
          label: 'Govt income share (%)',
          colour: '#6B7280',
          data: data.timeSeries
            .filter(d => d.govtIncomePct !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.govtIncomePct as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Charity Sector Finances" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Charity Sector Finances"
          question="Are Charities Filling the Gaps Left by the State?"
          finding="6,200 charities folded in 2023 as demand for services soared — while 70% of those still operating report unmet demand they cannot serve."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK voluntary sector faces a simultaneous demand crisis and resource crisis. Local authority budgets have contracted by around 30% in real terms since 2010, shifting responsibility for social care, mental health support, debt advice, and food assistance onto charities operating with smaller grants and less predictable funding. 6,200 charities ceased operations in 2023 — a 19% increase since 2015 — as energy, staff, and premises costs rose sharply while grant income remained flat or fell. Government income now accounts for 37% of the sector&rsquo;s total revenue, but this dependency has transformed many charities into contracted public service delivery vehicles, eroding the independence to advocate or innovate beyond what commissioners will fund.</p>
            <p>The National Council for Voluntary Organisations estimates that 70% of charities report unmet demand — a systematic shortfall most acute in mental health, homelessness, food poverty, and domestic abuse services, precisely the areas where statutory provision has been most comprehensively cut. Smaller, specialist charities are disproportionately affected: donor concentration has shifted public giving toward large, well-known organisations, leaving the community-level charities that serve specific populations most vulnerable to closure. The sector is not failing for lack of effort; it is failing because voluntary income alone cannot replace the structural gap left by public sector retrenchment.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Charity Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Charities folded 2023"
              value="6,200"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+19% since 2015 · demand outstripping resources"
              sparklineData={[5200, 5100, 5100, 5200, 5300, 5800, 5600, 5900, 6200]}
              href="#sec-chart"source="Charity Commission · Register of Charities 2023"
            />
            <MetricCard
              label="Govt income share"
              value="37%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="charity sector increasingly govt-funded · independence at risk"
              sparklineData={[34, 35, 35, 37, 37]}
              href="#sec-chart"source="NCVO · UK Civil Society Almanac 2023"
            />
            <MetricCard
              label="Unmet demand"
              value="70%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="of charities cannot serve everyone who needs them · state gap"
              sparklineData={[65, 67, 68, 70, 70]}
              href="#sec-chart"source="NCVO · State of the Sector 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Charity closures and government income dependency, 2015–2023"
              subtitle="Annual charity closures and percentage of sector income from government sources."
              series={charitySeries}
              yLabel="Value"
              source={{
                name: 'Charity Commission / NCVO',
                dataset: 'Register of Charities / UK Civil Society Almanac',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Charity Commission for England and Wales — Register of Charities. Annual data on registrations and removals. register-of-charities.charitycommission.gov.uk</p>
            <p>NCVO — UK Civil Society Almanac. Annual financial analysis of the voluntary sector. ncvo.org.uk/facts-and-stats/uk-civil-society-almanac</p>
            <p>NCVO — State of the Sector. Survey of voluntary organisations. ncvo.org.uk</p>
            <p>Charity closure figures reflect organisations removed from the Charity Commission register in the calendar year, excluding those removed for administrative reasons (duplicate registration, dormancy). Government income share is NCVO analysis of charity accounts, covering grants and contracts from central and local government.</p>
          </div>
        </section>
      </main>
    </>
  )
}
