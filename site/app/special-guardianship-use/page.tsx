'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Children Looked After in England including Adoptions', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2023' },
  { num: 2, name: 'Kinship (formerly Grandparents Plus)', dataset: 'State of Kinship Care Survey', url: 'https://kinship.org.uk/policy-and-research/', date: '2023', note: '44% of kinship carers receive no financial or practical support' },
  { num: 3, name: 'Kinship Care Act 2023', dataset: 'National Strategy and Support Framework', date: '2023', note: 'Framework commitments rather than funded entitlements', url: 'https://www.legislation.gov.uk/ukpga/2023/27/contents' },
];

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
          finding="36,000 children live under special guardianship orders — a route that offers permanence without adoption, but with far less state support."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Special guardianship orders (SGOs) have grown from a few thousand when introduced in 2005 to 36,000 in force in England in 2024 — representing children living with grandparents, aunts and uncles, family friends, or former foster carers who have taken legal responsibility without adopting.<Cite nums={1} /> This growth has occurred alongside a 43% fall in adoptions from care, which peaked at 5,050 in 2012 and 2014 before falling to 2,880 in 2023, following Supreme Court case law that raised the bar for adoption and made local authorities more cautious.<Cite nums={1} /> Kinship care more broadly — including informal arrangements without a court order — supports an estimated 162,000 children in England, making it far larger than the formal care system. SGO support payments are means-tested, discretionary, and vary enormously between local authorities: surveys consistently find that around 44% of kinship carers receive no financial or practical support from their council whatsoever.<Cite nums={2} /></p>
            <p>The consequences of inadequate support are direct and serious. SGOs break down at a rate of 8–10%, typically because financial and emotional pressures become unsustainable, at which point the child re-enters the care system often more traumatised than before. The postcode lottery in support means a grandparent in one borough may receive substantial help while an identical arrangement next door receives nothing. The Kinship Care Act 2023 committed to a national strategy, training budgets, and an expectation that local authorities will develop support offers — but these remain framework commitments rather than funded entitlements,<Cite nums={3} /> leaving carers who are often older, less financially secure, and managing children with complex needs to absorb costs the state declines to meet.</p>
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
              changeText="growing permanence route · less disruption than care"
              sparklineData={[12000, 17000, 22000, 27000, 31000, 34000, 36000]}
              href="#sec-chart"source="DfE · Children Looked After Statistics 2023"
            />
            <MetricCard
              label="Adoptions per year"
              value="2,880"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="-43% since 2012 · process too slow and risky for carers"
              sparklineData={[5050, 5050, 4690, 3820, 3152, 2985, 2880]}
              href="#sec-callout"source="DfE · Children Looked After Statistics 2023"
            />
            <MetricCard
              label="Kinship carers with no support"
              value="44%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="44% of kinship carers receive no financial or practical support"
              sparklineData={[44, 44, 44, 44, 44, 44]}
              href="#sec-callout"source="Kinship · State of Kinship Care Survey 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Special guardianship orders in force and adoptions per year, 2012–2023"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Education — Children Looked After in England including Adoptions. explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions</p>
            <p>Kinship — State of Kinship Care in England. Annual survey of kinship carers. kinship.org.uk/policy-and-research/</p>
            <p>Special guardianship orders are granted by the family court under section 14A of the Children Act 1989. &ldquo;In force&rdquo; figures are cumulative and include all SGOs that have not been revoked. Annual adoption figures are adoptions from care only. Kinship carer support figures from Kinship (formerly Grandparents Plus) survey data, not official statistics.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
