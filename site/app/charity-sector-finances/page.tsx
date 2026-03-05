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
            <p>The UK voluntary sector faces a structural crisis that is simultaneously a demand crisis and a resource crisis. As local authority budgets have contracted by around 30% in real terms since 2010, the services that communities once received from councils &mdash; social care, mental health support, debt advice, food assistance, youth work &mdash; have increasingly been expected to be provided by charities operating on smaller grants, higher demand, and a less predictable funding environment. The sector is being asked to fill a gap it did not create and cannot sustainably fill.</p>
            <p>6,200 charities ceased operations in 2023, a 19% increase since 2015. The causes are mixed: some were small organisations with a specific mission that they completed; others were casualties of the cost-of-living crisis hitting both their funding and their clients simultaneously. Energy costs, staff costs, and premises costs all rose sharply after 2022, while grant funding from both local authorities and central government remained flat or fell in real terms. Many charities have experienced a perfect storm of rising costs and rising demand with static or declining income.</p>
            <p>The government&rsquo;s share of charity sector income has risen to 37% &mdash; a figure that sounds supportive but reflects a problematic dependency. Government-funded charities are increasingly operating as delivery vehicles for contracted public services rather than as independent civil society organisations. This shift towards commissioning and contracting &mdash; begun under New Labour and accelerated under the Coalition &mdash; has fundamentally changed the relationship between state and sector. Charities that depend on government contracts lose the independence to advocate, innovate, or prioritise needs that commissioners do not fund.</p>
            <p>The National Council for Voluntary Organisations estimates that 70% of charities report unmet demand &mdash; people who need their services but cannot be served because of capacity constraints. This is not a rounding error: it represents a systematic shortfall in the provision of welfare that the sector is structurally unable to fill. The gap is most acute in mental health, homelessness, food poverty, and domestic abuse services &mdash; precisely the areas where statutory provision has been most comprehensively cut.</p>
            <p>Charity giving from the public has remained relatively stable in aggregate, but is increasingly concentrated in a small number of large, well-known charities. Smaller, specialist charities &mdash; often more effective per pound and more trusted by specific communities &mdash; are disproportionately affected by donor concentration. Payroll giving, legacy giving, and gift aid have not grown fast enough to compensate for the loss of public sector funding. The sector is not failing for lack of effort or commitment; it is failing because the demand it faces is a structural consequence of public sector austerity that voluntary income alone cannot replace.</p>
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
              changeText="+19% since 2015 &middot; demand outstripping resources"
              sparklineData={[5200, 5100, 5100, 5200, 5300, 5800, 5600, 5900, 6200]}
              onExpand={() => {}}
              source="Charity Commission &middot; Register of Charities 2023"
            />
            <MetricCard
              label="Govt income share"
              value="37%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="charity sector increasingly govt-funded &middot; independence at risk"
              sparklineData={[34, 35, 35, 37, 37]}
              onExpand={() => {}}
              source="NCVO &middot; UK Civil Society Almanac 2023"
            />
            <MetricCard
              label="Unmet demand"
              value="70%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="of charities cannot serve everyone who needs them &middot; state gap"
              sparklineData={[65, 67, 68, 70, 70]}
              onExpand={() => {}}
              source="NCVO &middot; State of the Sector 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Charity closures and government income dependency, 2015&ndash;2023"
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
            <p>Charity Commission for England and Wales &mdash; Register of Charities. Annual data on registrations and removals. register-of-charities.charitycommission.gov.uk</p>
            <p>NCVO &mdash; UK Civil Society Almanac. Annual financial analysis of the voluntary sector. ncvo.org.uk/facts-and-stats/uk-civil-society-almanac</p>
            <p>NCVO &mdash; State of the Sector. Survey of voluntary organisations. ncvo.org.uk</p>
            <p>Charity closure figures reflect organisations removed from the Charity Commission register in the calendar year, excluding those removed for administrative reasons (duplicate registration, dormancy). Government income share is NCVO analysis of charity accounts, covering grants and contracts from central and local government.</p>
          </div>
        </section>
      </main>
    </>
  )
}
