'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>British farming uses fewer pesticides than it did a decade ago, and that trend is real. Total pesticide applications &mdash; measured in millions of hectare-treatments &mdash; have fallen from 85 million in 2012 to 71 million in 2023, a reduction of 17%. This has been driven by a combination of improved precision application technology, integrated pest management practices, and the withdrawal of some actives from the market following European regulatory decisions that, post-Brexit, the UK has broadly followed. The long-run direction of travel is positive for insects, birds and soil biology that are damaged by intensive pesticide use.</p>
            <p>However, the headline number obscures important complications. Total volume of applications does not capture the toxicity of individual actives. Some modern pesticides are applied at far lower volumes but are considerably more potent per unit than the older, higher-volume chemicals they replaced. The story of the neonicotinoids illustrates this complexity: these systemic insecticides are applied at very low rates but persist in soil, water and plant tissue, with documented effects on pollinator behaviour and reproduction at concentrations well below application rates.</p>
            <p>Three neonicotinoids &mdash; clothianidin, imidacloprid and thiamethoxam &mdash; were banned under EU regulations for outdoor use in 2018. The UK government has granted emergency derogations allowing their use on sugar beet each year since 2021, on the grounds that no viable alternative exists for beet yellows virus control. Environmental groups have challenged these derogations in court; the government has maintained them. The scientific debate about whether derogations at the scale permitted pose unacceptable risks to pollinators remains genuinely contested, with the CRD (Chemicals Regulation Division) and the HSE reaching different assessments to those of independent ecologists.</p>
            <p>Organic farming represents one pathway to farming without synthetic pesticides, but uptake in the UK has been slow. Just 2.8% of agricultural land is certified organic in England &mdash; compared to an EU average of 9.7% and a target of 25% by 2030 under the EU Farm to Fork strategy. Post-Brexit, the UK has not adopted equivalent targets. The transition to organic farming is financially and agronomically challenging: yields typically fall during the transition period, and organic premiums are not always sufficient to compensate. The restructuring of farm subsidies through the Environmental Land Management (ELM) scheme could incentivise more farmers to transition, but uptake of the higher tiers that reward organic conversion has been limited.</p>
            <p>The target under the previous government&apos;s 25 Year Environment Plan was to reduce pesticide use &ldquo;where possible&rdquo; &mdash; notably vaguer than the EU&apos;s 50% reduction target under the Farm to Fork strategy. The current government&apos;s environmental targets do not include a specific pesticide reduction target. Without clear measurable objectives, progress risks being driven more by economic factors &mdash; pesticides are an input cost that farmers seek to minimise &mdash; than by deliberate environmental policy. The gap between stated commitment to nature recovery and the absence of binding pesticide reduction targets represents an unresolved tension at the heart of UK agricultural and environmental policy.</p>
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
              changeText="-17% since 2012 &middot; glyphosate still widely used"
              sparklineData={[85.4, 82.1, 78.3, 75.2, 73.1, 72.8, 73.4, 72.1, 71.0]}
              onExpand={() => {}}
              source="Defra / CRD &middot; Pesticide Usage Survey 2023"
            />
            <MetricCard
              label="Neonicotinoids in use"
              value="3"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Emergency derogations &middot; EU ban not followed"
              sparklineData={[0, 0, 0, 3, 3, 3, 3, 3, 3]}
              onExpand={() => {}}
              source="HSE / CRD &middot; 2023"
            />
            <MetricCard
              label="Organic farmland"
              value="2.8%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Slow growth &middot; well below EU avg 9.7%"
              sparklineData={[2.4, 2.5, 2.6, 2.7, 2.7, 2.7, 2.7, 2.8, 2.8]}
              onExpand={() => {}}
              source="Defra / Organic Research Centre &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Pesticide applications and organic area, 2012&ndash;2023"
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

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Defra / HSE CRD &mdash; Pesticide Usage Survey. Published every 2 years. data.gov.uk/dataset/bee7b2c0-e51b-46b1-a5e8-f2b09e0dc84e/pesticide-usage-in-the-uk</p>
            <p>HSE &mdash; Chemicals Regulation Division. Emergency derogation decisions. hse.gov.uk/pesticides/resources/R/Rothamsted-neonics-report.pdf</p>
            <p>Defra &mdash; Organic farming statistics. gov.uk/government/statistical-data-sets/structure-of-the-agricultural-industry-in-england-and-the-uk-at-june</p>
            <p>Pesticide application figures are measured in thousands of hectare-treatments (standardised applications per area). Figures cover arable, horticultural, soft fruit and other agricultural uses. Organic area covers certified and in-conversion land registered under approved organic certification bodies.</p>
          </div>
        </section>
      </main>
    </>
  )
}
