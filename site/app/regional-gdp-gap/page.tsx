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

interface RegionalGdpGapData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    londonGdpPerHead: number
    northEastGdpPerHead: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Regional Economic Activity by Gross Value Added (Balanced)', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/datasets/regionalgrossdomesticproductlocalauthorities', date: '2024' },
  { num: 2, name: 'HM Treasury', dataset: 'Public Expenditure Statistical Analyses (PESA)', url: 'https://www.gov.uk/government/collections/public-expenditure-statistical-analyses-pesa', date: '2023' },
  { num: 3, name: 'OECD', dataset: 'TL2 Regional Statistics', date: '2022', note: 'International regional inequality comparison' },
];

export default function RegionalGdpGapPage() {
  const [data, setData] = useState<RegionalGdpGapData | null>(null)

  useEffect(() => {
    fetch('/data/regional-gdp-gap/regional_gdp_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'london',
          label: 'London',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.londonGdpPerHead })),
        },
        {
          id: 'northeast',
          label: 'North East England',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.northEastGdpPerHead })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Regional GDP Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Regional GDP Gap"
          question="How Unequal Are Britain's Regional Economies?"
          finding="London's GDP per head is £67,500 — three times higher than the North East at £22,100 — the widest regional divide of any comparable economy."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has the most geographically unequal economy of any comparable high-income country.<Cite nums={3} /> GDP per head in London stood at £67,500 in 2022, while the North East registered £22,100 — a ratio of 3.1 to 1, compared with 1.9 in Germany and 1.7 in France.<Cite nums={[1, 3]} /> The Levelling Up agenda, backed by £8 billion in fund expenditure over 2020–25, produced measurable improvements on some missions but failed to narrow the core gaps: wages and life expectancy continued diverging, and the cancellation of HS2's northern leg in October 2023 removed much of the connectivity rationale for rebalancing. The current government's growth mission relies on metro-mayor devolution rather than place-based grants, with combined authority deals covering skills, transport, and business support. Treasury analysis has found London received approximately £4,000 more per head in public investment than comparable regions between 2000 and 2019.<Cite nums={2} /></p>
            <p>The burden falls hardest on post-industrial communities, coastal towns, and areas with older populations that never recovered from the deindustrialisation of the 1980s. Per-capita transport spending in London was £902 in 2022/23, versus £337 in the North East and £296 in Yorkshire — a structural imbalance that compounds the underlying productivity gap.<Cite nums={2} /> Agglomeration effects continue to concentrate high-value financial and professional services in London, and economists broadly agree that reversing this dynamic requires sustained investment over decades, not years.<Cite nums={1} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Regional GDP' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="London GDP per head"
              value="£67,500"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="3× North East average · gap widening"
              sparklineData={[48000, 50000, 52000, 54000, 55000, 54000, 57000, 62000, 67500]}
              href="#sec-chart"source="ONS · Regional GDP Statistics 2024"
            />
            <MetricCard
              label="North East GDP per head"
              value="£22,100"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£3,200 since 2015 · gap with London growing"
              sparklineData={[18500, 19000, 19200, 19500, 19800, 19600, 20100, 21000, 22100]}
              href="#sec-chart"source="ONS · Regional GDP Statistics 2024"
            />
            <MetricCard
              label="London:North East GDP ratio"
              value="3.1×"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Widest gap since 1997 · UK far above OECD peers"
              sparklineData={[2.6, 2.6, 2.7, 2.8, 2.8, 2.8, 2.8, 3.0, 3.1]}
              href="#sec-chart"source="ONS · Regional GDP Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="GDP per head: London vs North East England, 2016–2024"
              subtitle="Gross Value Added per head of population by region (£)."
              series={series}
              yLabel="£ per head"
              source={{
                name: 'ONS',
                dataset: 'Regional GDP Statistics',
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
            <p>ONS — Regional Economic Activity by Gross Value Added (Balanced) UK 2024. Published annually. ons.gov.uk/economy/grossdomesticproductgdp/datasets/regionalgrossdomesticproductlocalauthorities</p>
            <p>GDP per head is Gross Value Added (balanced) divided by ONS mid-year population estimates. London figures include all NUTS1 London region. North East figures are the NUTS1 North East region. Figures are current price estimates and not adjusted for regional price variation. International comparisons use OECD TL2 regional statistics on purchasing-power-parity adjusted GDP per capita.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
