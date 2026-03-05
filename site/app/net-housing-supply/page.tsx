'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="England added 234,400 net dwellings in 2022/23 &mdash; against a government target of 300,000. The target has been missed every year since 2010 except once. The cumulative shortfall since 2010 is estimated at over 2 million homes."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s housing shortfall is one of the most persistent structural failures in British domestic policy. The 300,000 annual target &mdash; set by the Housing White Paper in 2017 based on estimates of household formation and backlog need &mdash; has never been met in its history as a formal government commitment. The best year was 2019/20, when 243,770 net additions were recorded. In 2022/23, 234,400 homes were added. The gap of 65,600 against the target in a single year means the shortfall compounds annually. By 2023, the estimated cumulative gap since 2010 exceeded 2 million homes.</p>
            <p>The reasons the target has never been met are structural and deeply entrenched. The planning system in England requires most new homes to obtain planning permission through a discretionary process determined by local planning authorities following the policies in local plans. Local plan preparation is slow, contested, and frequently delayed: only around 60% of local authorities have an up-to-date plan at any given time. Community opposition to development &mdash; often characterised as NIMBYism, though the underlying concerns about local infrastructure, character and environment are frequently legitimate &mdash; slows and reduces development proposals. Local politicians face stronger incentives to oppose than to permit development: existing homeowners vote, prospective residents do not.</p>
            <p>The construction sector itself is a constraint. Housebuilding in England is dominated by a small number of large volume builders who have historically rationed output to maintain land values and profit margins. The &ldquo;land banking&rdquo; critique &mdash; that developers sit on permitted land rather than building &mdash; is contested but has surface plausibility: the ratio of planning permissions granted to homes started has consistently shown a significant gap. Skills shortages in construction &mdash; bricklayers, plasterers, plumbers &mdash; compound the delivery challenge, with the sector struggling to attract younger entrants and having lost significant EU-born labour following Brexit.</p>
            <p>Labour&apos;s planning reforms, announced on taking office in 2024, are the most ambitious in a generation. The Planning and Infrastructure Bill reintroduces mandatory housing targets for local authorities, removes the ability of councils to block development on the basis of character or design objections where national guidance is met, and simplifies the plan-making process. New development rules allow building on &ldquo;grey belt&rdquo; &mdash; degraded greenbelt land &mdash; which was previously protected despite having low landscape or agricultural value. The government has also announced targets of 1.5 million homes over five years, equivalent to 300,000 per year, and backed a significant expansion of New Towns development.</p>
            <p>Modelling by Savills and the Centre for Cities suggests that the planning reforms, if implemented as written, could add 30,000&ndash;50,000 additional homes per year by the late 2020s. Whether the sector has the capacity to deliver at that scale within the planning window &mdash; given skills shortages, materials supply chains, and the viability of development at current build cost and sale price ratios &mdash; is a separate question. The delivery of affordable and social rented homes within any increased total output depends on the affordable housing obligations attached to planning permissions, which developers frequently challenge as making development unviable. Meeting the 300,000 target while also improving affordability requires not just more homes, but more of the right homes in the right places at prices people on ordinary incomes can afford.</p>
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
            changeText="Below 300,000 target &middot; best year was 2019/20 at 243,770"
            sparklineData={[124360, 141980, 189750, 221090, 234820, 243770, 216490, 232820, 234400]}
            source="DLUHC Housing Supply Statistics &middot; 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="Government annual target"
            value="300,000"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText="Years target met since 2010: 0 &middot; closest was 2019/20 (97%)"
            sparklineData={[300000, 300000, 300000, 300000, 300000, 300000, 300000]}
            source="DLUHC Housing Policy"
            onExpand={() => {}}
          />
          <MetricCard
            label="Cumulative shortfall since 2010"
            value="2.1m"
            unit="homes"
            direction="up"
            polarity="up-is-bad"
            changeText="Estimated households needing homes that don&apos;t exist"
            sparklineData={[350000, 850000, 1600000, 2100000]}
            source="Shelter / DLUHC estimates &middot; 2023"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-additions" className="mb-12">
          <LineChart
            title="Net housing additions vs target, England, 2010&ndash;2023"
            subtitle="Net additional dwellings per year compared to the government&apos;s 300,000 annual target. DLUHC."
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
            title="Estimated cumulative housing shortfall, England, 2015&ndash;2023"
            subtitle="Estimated gap between homes built and homes needed since 2010. Shelter / DLUHC."
            series={shortfallSeries}
            yLabel="Homes (shortfall)"
          />
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-housing-supply" className="underline" target="_blank" rel="noopener noreferrer">
              DLUHC Housing Supply Statistics (gov.uk)
            </a>
            {' '}&middot; Savills UK Housing Market Research &middot; House of Commons Library
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
