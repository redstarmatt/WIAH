'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'AirDNA / STAA', dataset: 'UK Short-Term Rental Market Report', date: '2024', note: '280,000 STL properties listed across UK in 2024; up 65% since 2019; 2-4x income vs long-term tenancy' },
  { num: 2, name: 'DLUHC', dataset: 'Short-Term Lets Registration Scheme', url: 'https://www.gov.uk/government/organisations/ministry-of-housing-communities-and-local-government', date: '2024', note: 'London 90-day limit inconsistently enforced; Scotland mandatory licensing from 2023; England registration scheme launched 2024' },
  { num: 3, name: 'Resolution Foundation', dataset: 'Rental Market Analysis', url: 'https://www.resolutionfoundation.org', date: '2024', note: 'Rents 15% higher in high-STL areas; 20-40% of stock on platforms in tourist destinations' },
];

interface ShortTermLetsImpactData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    stlPropertiesK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function ShortTermLetsImpactPage() {
  const [data, setData] = useState<ShortTermLetsImpactData | null>(null)

  useEffect(() => {
    fetch('/data/short-term-lets-impact/short_term_lets_impact.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'stlProperties',
          label: 'STL properties (thousands)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.stlPropertiesK,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Short-Term Lets Impact" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Short-Term Lets Impact"
          question="What Is Short-Term Letting Doing to British Housing?"
          finding="Short-term lets have removed an estimated 250,000 homes from the long-term rental market, with coastal communities seeing up to 40% of stock listed on platforms."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>An estimated 280,000 short-term let properties were listed across the UK in 2024, up 65% since 2019.<Cite nums={1} /> Short-term lets can generate two to four times the income of a long-term tenancy, creating strong financial incentives for landlords to withdraw from the residential market — particularly in coastal towns, rural tourist areas, and central London. In destinations such as St Ives, parts of the Lake District, and the Yorkshire Dales, the share of residential property on short-term letting platforms is estimated at between 20% and 40% of the housing stock. London's 90-day annual limit on STLs (introduced under the Deregulation Act 2015) has been inconsistently enforced. Scotland introduced a mandatory STL licensing regime in 2023, designating Edinburgh a full STL control area; England launched a registration scheme in 2024 but implementation has lagged the pace of market growth.<Cite nums={2} /></p>
            <p>The impact is concentrated in communities where local earnings are already constrained relative to property prices.<Cite nums={3} /> Working-age families with children are displaced first, reducing the population that sustains local schools, shops, and services — a hollowing out that accelerates further service closures and makes permanent residency progressively less viable. The policy challenge is not to eliminate short-term letting but to prevent its concentration where housing supply is most constrained from displacing long-term residents at scale, and the gap between regulatory intent and enforcement capacity remains the central obstacle.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'STL Growth' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Short-term let properties (UK)"
              value="280,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+65% since 2019 · 250k removed from long-term market"
              sparklineData={[90000, 110000, 130000, 150000, 170000, 160000, 200000, 245000, 280000]}
              href="#sec-chart"source="AirDNA / Short Term Accommodation Association 2024"
            />
            <MetricCard
              label="STL share in coastal hotspots"
              value="up to 40%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up to 40% of stock in tourist destinations"
              sparklineData={[15, 17, 19, 22, 25, 26, 30, 36, 40]}
              href="#sec-chart"source="ONS / local authority estimates 2024"
            />
            <MetricCard
              label="Rent premium in high-STL areas"
              value="+15%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Rents 15% higher in high-STL areas"
              sparklineData={[4, 5, 6, 7, 8, 9, 10, 12, 15]}
              href="#sec-chart"source="Resolution Foundation · Rental Market Analysis 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Short-term let properties in the UK, 2016–2024"
              subtitle="Estimated active short-term rental listings across all platforms."
              series={series}
              yLabel="Properties (thousands)"
              source={{
                name: 'AirDNA',
                dataset: 'Short Term Rental Market Report',
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
            <p>AirDNA — Short Term Rental Market Report. Published annually. airdna.co</p>
            <p>Short Term Accommodation Association — UK Market Report 2024. staa.org.uk</p>
            <p>Resolution Foundation — Rental Market Analysis 2024. resolutionfoundation.org</p>
            <p>STL property figures are estimated active listings across all platforms. Coastal hotspot percentages are local authority estimates based on planning and licensing data. Rent premium figures are from econometric analysis of rental prices in high versus low STL concentration areas.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
