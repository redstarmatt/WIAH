'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface SgoEntry {
  year: number
  sgosInForce: number
  adoptionsPerYear: number
  kinshipCarers?: number
}

interface SgoData {
  timeSeries: SgoEntry[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SpecialGuardianshipUsePage() {
  const [data, setData] = useState<SgoData | null>(null)

  useEffect(() => {
    fetch('/data/special-guardianship-use/special_guardianship_use.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'sgosInForce',
          label: 'Special guardianship orders in force',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.sgosInForce,
          })),
        },
        {
          id: 'adoptionsPerYear',
          label: 'Adoptions per year',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.adoptionsPerYear,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Special Guardianship" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Special Guardianship"
          question="Who Is Caring for Children When Parents Can&rsquo;t?"
          finding="36,000 children live under special guardianship orders &mdash; a route that offers permanence without adoption, but with far less state support."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Special guardianship orders (SGOs) have become one of the most significant but least visible forms of substitute care in England. Since their introduction in 2005, SGOs in force have grown from a few thousand to 36,000 &mdash; representing children living with grandparents, aunts and uncles, family friends, or former foster carers who have taken on legal responsibility for a child without adopting them. SGOs offer legal permanence: the special guardian has parental responsibility and the child cannot be removed without a court order. But they are not adoption, and the legal, financial and practical support available is far more limited.</p>
            <p>The growth of SGOs has occurred in parallel with a sharp decline in adoption. The number of children adopted from care peaked at around 5,050 in 2012 and 2014, and has fallen steadily to 2,880 in 2023 &mdash; a 43% fall. The causes are complex: changes to the law following a Supreme Court case in 2013 made the bar for adoption higher, and local authorities became more cautious. Some practitioners argue that the bar is now too high and that children who could thrive in permanent adoptive families are instead drifting in the care system or in inadequately supported SGO arrangements.</p>
            <p>Kinship care &mdash; the broad category covering both SGOs and informal arrangements where children live with relatives without a court order &mdash; supports an estimated 162,000 children in England. Many of these carers receive no financial or practical support whatsoever: surveys consistently find that around 44% of kinship carers receive nothing from the local authority. This is despite the fact that kinship care is cheaper for the state, associated with better outcomes for children, and almost universally preferred by children themselves to placement with strangers.</p>
            <p>The financial situation for special guardians is particularly difficult. SGO support payments are means-tested, discretionary, and vary enormously between local authorities. A grandparent in one borough may receive substantial financial support to care for a grandchild; an identical arrangement in the next borough may receive nothing. This postcode lottery in support creates instability: SGOs break down at a rate of around 8-10%, often because the financial and emotional pressures on carers become unsustainable. When an SGO breaks down, the child re-enters the care system &mdash; often more traumatised than before.</p>
            <p>The Kinship Care Act 2023 and subsequent government commitments represent a partial improvement: a national kinship care strategy, training budgets for kinship carers, and an expectation that local authorities will develop kinship care support offers. But these remain framework commitments rather than funded entitlements. Until kinship carers &mdash; who are often older, less financially secure, and caring for children with complex needs &mdash; receive consistent, adequate support, the growth of SGOs will continue to create a two-tier system where some of England&rsquo;s most vulnerable children live with carers who are struggling.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'SGOs and Adoptions' },
          { id: 'sec-callout', label: 'Positive Signal' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="SGOs in force"
              value="36,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="growing permanence route &middot; less disruption than care"
              sparklineData={[12000, 17000, 22000, 27000, 31000, 34000, 36000]}
              onExpand={() => {}}
              source="DfE &middot; Children Looked After Statistics 2023"
            />
            <MetricCard
              label="Adoptions per year"
              value="2,880"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-43% since 2012 &middot; process too slow and risky for carers"
              sparklineData={[5050, 5050, 4690, 3820, 3152, 2985, 2880]}
              onExpand={() => {}}
              source="DfE &middot; Children Looked After Statistics 2023"
            />
            <MetricCard
              label="Kinship carers with no support"
              value="44%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="44% of kinship carers receive no financial or practical support"
              sparklineData={[44, 44, 44, 44, 44, 44]}
              onExpand={() => {}}
              source="Kinship &middot; State of Kinship Care Survey 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Special guardianship orders in force and adoptions per year, 2012&ndash;2023"
              subtitle="SGOs in force (green, cumulative) and annual adoptions from care (red). As adoption has declined, special guardianship has grown significantly."
              series={series}
              yLabel="Number"
              source={{
                name: 'Department for Education',
                dataset: 'Children Looked After in England including Adoptions',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Special Guardianship Offers Children Stability"
              value="36,000"
              unit="children in SGO placements"
              description="Special guardianship gives children legal permanence with a family member or trusted carer, without the finality of adoption. Evidence shows children in SGOs have better outcomes than those remaining in the care system."
              source="DfE, Children Looked After Statistics, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Education &mdash; Children Looked After in England including Adoptions. explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions</p>
            <p>Kinship &mdash; State of Kinship Care in England. Annual survey of kinship carers. kinship.org.uk/policy-and-research/</p>
            <p>Special guardianship orders are granted by the family court under section 14A of the Children Act 1989. &ldquo;In force&rdquo; figures are cumulative and include all SGOs that have not been revoked. Annual adoption figures are adoptions from care only. Kinship carer support figures from Kinship (formerly Grandparents Plus) survey data, not official statistics.</p>
          </div>
        </section>
      </main>
    </>
  )
}
