'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface FloodInsuranceGapsData {
  timeSeries: Array<{
    year: number
    floodReProperties: number
    propertiesAtFloodRisk: number
  }>
  floodReLiabilityBn: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FloodInsuranceGapsPage() {
  const [data, setData] = useState<FloodInsuranceGapsData | null>(null)

  useEffect(() => {
    fetch('/data/flood-insurance-gaps/flood_insurance_gaps.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const atRiskSeries: Series[] = data
    ? [{
        id: 'atFloodRisk',
        label: 'Properties at flood risk',
        colour: '#F4A261',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.propertiesAtFloodRisk,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Flood Insurance Gaps" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Flood Insurance Gaps"
          question="Can Everyone Get Flood Insurance?"
          finding="200,000 properties are only insurable through the Flood Re scheme — and 5.2 million are in areas at significant flood risk."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2016, the UK government and insurance industry jointly created Flood Re — a reinsurance pool allowing high-flood-risk properties to obtain affordable home insurance. Without it, the market would simply not cover around 200,000 properties at commercially viable premiums. The scheme works by allowing insurers to cede the flood risk element of high-risk policies at a regulated fixed price, subsidised by a levy on all home insurance. But Flood Re is legislated to close in 2039, by which point the assumption was that improved flood risk data and property-level mitigation would make the commercial market viable. That assumption is increasingly questionable: 5.2 million properties — 13% of all UK properties — are now in areas of significant flood risk, and climate projections indicate return periods are shortening. Between 2013 and 2023, over 40,000 new homes were built in areas the Environment Agency had flagged as high risk, adding new exposure year by year.</p>
            <p>The government&rsquo;s contingent liability under Flood Re is estimated at £2.2 billion — the amount that would crystallise in a catastrophic flood year. As climate risks intensify, this liability is more likely to grow than shrink. The communities most exposed to uninsurable flood risk are not always those with the greatest resources to adapt: properties that lose insurance coverage also lose market value and mortgageability, effectively creating unmortgageable zones in some of the UK&rsquo;s most deprived coastal and floodplain towns. The question of who ultimately bears the cost — individual homeowners, government, or a reformed insurance framework — remains unresolved.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Properties at Risk' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Flood Re properties"
              value="200,000"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Can only insure via govt-backed pool"
              sparklineData={[200000, 200000, 200000, 200000, 200000, 200000, 200000, 200000]}
              href="#sec-chart"source="Flood Re · Annual Report 2023"
            />
            <MetricCard
              label="At flood risk"
              value="5.2m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="13% of all properties · growing with climate"
              sparklineData={[5000000, 5100000, 5100000, 5200000, 5200000, 5200000, 5200000, 5200000]}
              href="#sec-chart"source="Environment Agency · National Flood Risk Assessment 2023"
            />
            <MetricCard
              label="Flood Re liability"
              value="£2.2bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Government contingent liability · ends 2039"
              sparklineData={[1.8, 1.9, 2.0, 2.0, 2.1, 2.1, 2.2, 2.2]}
              href="#sec-chart"source="HM Treasury · Flood Re Review 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Properties at significant flood risk, 2016–2023"
              subtitle="Number of residential and commercial properties in areas classified as having significant flood risk by the Environment Agency."
              series={atRiskSeries}
              yLabel="Properties at flood risk"
              source={{
                name: 'Environment Agency',
                dataset: 'National Flood Risk Assessment (NaFRA2)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Flood Re — Annual Report and Accounts. floodre.co.uk</p>
            <p>Environment Agency — National Flood Risk Assessment 2 (NaFRA2). environment-data.gov.uk/flood-risk</p>
            <p>HM Treasury — Contingent Liability disclosures in Consolidated Accounts. gov.uk/government/collections/hm-treasury-annual-report</p>
            <p>Properties at flood risk represent those in areas with a 1 in 75 chance or greater of flooding per year from rivers, sea, or surface water, based on Environment Agency modelling. Flood Re covers residential properties only built before 2009. The 200,000 figure represents properties actively ceded into the Flood Re pool; the wider pool of potentially eligible properties is larger. Government contingent liability is an illustrative estimate and depends on the severity of flood years during the scheme&rsquo;s operation.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
