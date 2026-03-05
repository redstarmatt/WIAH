'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>The growth of short-term letting platforms &mdash; primarily Airbnb, VRBO, and similar services &mdash; has transformed the economics of residential property in tourism-dependent and urban areas. Short-term lets can generate two to four times the income of a long-term tenancy for a comparable property, creating strong financial incentives for landlords to withdraw from the long-term rental market. The estimated 280,000 short-term let properties in the UK in 2024 represent an extraction of housing supply from communities &mdash; particularly coastal towns, rural tourist areas, and central London &mdash; that has contributed to rental inflation and, in some places, to local housing market dysfunction where incoming tourism income competes directly with local people&apos;s ability to afford homes.</p>
            <p>The geographic concentration of the impact is stark. In destinations such as St Ives in Cornwall, parts of the Lake District, the Yorkshire Dales, and coastal areas of Devon and Dorset, the share of residential property listed on short-term letting platforms is estimated at between 20% and 40% of the housing stock. This is not simply a housing availability issue: it changes the demographic composition of communities, reducing the population of year-round residents &mdash; particularly working-age families with children &mdash; who sustain local schools, shops, and services. St Ives introduced a planning restriction in 2016 preventing new-build homes from being used as second homes or holiday lets, but existing properties were unaffected, and the restriction has not prevented continued pressure on the existing stock.</p>
            <p>In London, the short-term let market operates under a different set of constraints. The Deregulation Act 2015 introduced a 90-day per year limit on short-term letting of primary residences in Greater London, but compliance and enforcement has been inconsistent. Entire-property listings in central London boroughs &mdash; properties rented to tourists on a full-time basis without complying with the 90-day limit &mdash; have continued to grow. The Greater London Authority has called for stronger enforcement powers and a registration system for short-term lets. The English data suggests that short-term lets are disproportionately concentrated in the areas of highest rental demand, where their displacement effect on long-term supply is most acute.</p>
            <p>The government&apos;s response has evolved from hands-off to regulatory. A mandatory short-term lets registration scheme in England was announced in 2023 but is yet to be fully implemented. The scheme will require all STL operators to register with their local council, providing the baseline data needed for planning authorities to understand the scale of the local market and &mdash; potentially &mdash; to set caps on STL concentration in particular areas. The Scottish Government introduced a licensing regime in 2023 that allows local authorities to designate STL control areas where new operations require planning permission. Early results in Edinburgh, where the whole city has been designated a control area, suggest significant compliance activity and some reduction in new applications.</p>
            <p>The economic case for short-term lets is not entirely negative. In rural and coastal communities with limited alternative economic drivers, tourism income &mdash; some of which circulates as Airbnb revenue &mdash; supports local businesses and services. The platform economy has enabled many property owners to supplement income in a period of high mortgage and living costs. The policy challenge is not to eliminate short-term letting but to prevent the concentration of STLs in areas where housing supply is most constrained from displacing long-term residents at scale. A registration system with supply monitoring, combined with local authority powers to impose STL caps in designated areas, represents the regulatory approach being developed &mdash; though its implementation speed has been slow relative to the pace of market growth.</p>
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
              onExpand={() => {}}
              source="AirDNA / Short Term Accommodation Association 2024"
            />
            <MetricCard
              label="STL share in coastal hotspots"
              value="up to 40%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up to 40% of stock in tourist destinations"
              sparklineData={[15, 17, 19, 22, 25, 26, 30, 36, 40]}
              onExpand={() => {}}
              source="ONS / local authority estimates 2024"
            />
            <MetricCard
              label="Rent premium in high-STL areas"
              value="+15%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Rents 15% higher in high-STL areas"
              sparklineData={[4, 5, 6, 7, 8, 9, 10, 12, 15]}
              onExpand={() => {}}
              source="Resolution Foundation &middot; Rental Market Analysis 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Short-term let properties in the UK, 2016&ndash;2024"
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

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>AirDNA &mdash; Short Term Rental Market Report. Published annually. airdna.co</p>
            <p>Short Term Accommodation Association &mdash; UK Market Report 2024. staa.org.uk</p>
            <p>Resolution Foundation &mdash; Rental Market Analysis 2024. resolutionfoundation.org</p>
            <p>STL property figures are estimated active listings across all platforms. Coastal hotspot percentages are local authority estimates based on planning and licensing data. Rent premium figures are from econometric analysis of rental prices in high versus low STL concentration areas.</p>
          </div>
        </section>
      </main>
    </>
  )
}
