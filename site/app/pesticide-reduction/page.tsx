'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Defra / HSE CRD', dataset: 'Pesticide Usage Survey', url: 'https://data.gov.uk/dataset/bee7b2c0-e51b-46b1-a5e8-f2b09e0dc84e/pesticide-usage-in-the-uk', date: '2023' },
  { num: 2, name: 'HSE', dataset: 'Chemicals Regulation Division — Neonicotinoid Emergency Derogations', url: 'https://www.hse.gov.uk/pesticides/resources/R/Rothamsted-neonics-report.pdf', date: '2023' },
  { num: 3, name: 'Defra / Organic Research Centre', dataset: 'Organic Farming Statistics', url: 'https://www.gov.uk/government/statistical-data-sets/structure-of-the-agricultural-industry-in-england-and-the-uk-at-june', date: '2023' },
  { num: 4, name: 'Defra', dataset: '25 Year Environment Plan', url: 'https://www.gov.uk/government/publications/25-year-environment-plan', date: '2018' },
];

// -- Types ------------------------------------------------------------------

interface PesticideRow {
  year: number
  applicationsM: number
  organicAreaPct: number
}

interface PesticideData {
  topic: string
  lastUpdated: string
  timeSeries: PesticideRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PesticideReductionPage() {
  const [data, setData] = useState<PesticideData | null>(null)

  useEffect(() => {
    fetch('/data/pesticide-reduction/pesticide_reduction.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const pesticideSeries: Series[] = data
    ? [
        {
          id: 'applications',
          label: 'Pesticide applications (millions)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.applicationsM,
          })),
        },
        {
          id: 'organic',
          label: 'Organic farmland (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.organicAreaPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Pesticide Reduction" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pesticide Reduction"
          question="Are Farmers Using Fewer Chemicals?"
          finding="Total pesticide applications have fallen 17% since 2012, but three neonicotinoids linked to bee deaths remain in emergency use."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Total pesticide applications in England fell from 85 million hectare-treatments in 2012 to 71 million in 2023 — a 17% reduction driven by precision application technology, integrated pest management, and the withdrawal of some actives from the market following EU regulatory decisions that the UK has broadly followed post-Brexit.<Cite nums={1} /> Three neonicotinoids (clothianidin, imidacloprid, thiamethoxam), banned under EU rules for outdoor use in 2018, have been granted emergency derogations for use on sugar beet each year since 2021.<Cite nums={2} /> Only 2.8% of agricultural land in England is certified organic, compared to a 9.7% EU average and a 25% EU target for 2030; the UK has set no equivalent benchmark.<Cite nums={3} /> The government's 25 Year Environment Plan committed to reducing pesticide use &ldquo;where possible&rdquo; — notably vaguer than any binding target.<Cite nums={4} /></p>
            <p>The headline reduction obscures important toxicity dynamics: volume of applications is not equivalent to environmental impact, as many modern actives are applied at lower volumes but are far more potent per unit than the older chemicals they replaced.<Cite nums={1} /> The burden of pesticide exposure falls on farmland biodiversity — insect populations, pollinator communities, and farmland birds — concentrated in arable landscapes of eastern England where pesticide application rates are highest. Small farmers and those transitioning to organic face yield reductions without the scale economies to absorb them, while the Environmental Land Management scheme's higher tiers that reward organic conversion have seen limited uptake, leaving policy ambition and farming incentives poorly aligned.<Cite nums={[3, 4]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Applications' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Pesticide applications (2023)"
              value="71m"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="-17% since 2012 · glyphosate still widely used"
              sparklineData={[85.4, 82.1, 78.3, 75.2, 73.1, 72.8, 73.4, 72.1, 71.0]}
              href="#sec-chart"source="Defra / CRD · Pesticide Usage Survey 2023"
            />
            <MetricCard
              label="Neonicotinoids in use"
              value="3"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Emergency derogations · EU ban not followed"
              sparklineData={[0, 0, 0, 3, 3, 3, 3, 3, 3]}
              href="#sec-chart"source="HSE / CRD · 2023"
            />
            <MetricCard
              label="Organic farmland"
              value="2.8%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Slow growth · well below EU avg 9.7%"
              sparklineData={[2.4, 2.5, 2.6, 2.7, 2.7, 2.7, 2.7, 2.8, 2.8]}
              href="#sec-chart"source="Defra / Organic Research Centre · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Pesticide applications and organic area, 2012–2023"
              subtitle="Applications in millions of hectare-treatments. Organic area as percentage of total utilised agricultural area in England."
              series={pesticideSeries}
              yLabel="Applications (M) / Organic area (%)"
              source={{
                name: 'Defra / HSE CRD',
                dataset: 'Pesticide Usage Survey / Organic Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Defra / HSE CRD — Pesticide Usage Survey. Published every 2 years. data.gov.uk/dataset/bee7b2c0-e51b-46b1-a5e8-f2b09e0dc84e/pesticide-usage-in-the-uk</p>
            <p>HSE — Chemicals Regulation Division. Emergency derogation decisions. hse.gov.uk/pesticides/resources/R/Rothamsted-neonics-report.pdf</p>
            <p>Defra — Organic farming statistics. gov.uk/government/statistical-data-sets/structure-of-the-agricultural-industry-in-england-and-the-uk-at-june</p>
            <p>Pesticide application figures are measured in thousands of hectare-treatments (standardised applications per area). Figures cover arable, horticultural, soft fruit and other agricultural uses. Organic area covers certified and in-conversion land registered under approved organic certification bodies.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
