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

interface TimeSeriesPoint {
  year: number
  goodsExportBn: number
  servicesExportBn: number
  tradeDeficitBn: number
}

interface ExportGoodsServicesData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ExportGoodsServicesPage() {
  const [data, setData] = useState<ExportGoodsServicesData | null>(null)

  useEffect(() => {
    fetch('/data/export-goods-services/export_goods_services.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const exportSeries: Series[] = data
    ? [
        {
          id: 'goods',
          label: 'Goods exports (£bn)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.goodsExportBn,
          })),
        },
        {
          id: 'services',
          label: 'Services exports (£bn)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.servicesExportBn,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="UK Exports" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="UK Exports"
          question="Can Britain Sell to the World?"
          finding="UK services exports hit a record £400 billion in 2023, compensating for weak goods exports — but the trade deficit remains stubborn."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK services exports reached a record £400 billion in 2023, surpassing goods exports for the first time in modern history. The UK is one of the world&rsquo;s largest services exporters, with particular strengths in financial services, professional and business services, and technology. London&rsquo;s role as a global financial centre underpins substantial export revenues in banking, insurance, asset management, and legal services. This services strength has grown more important as goods export performance has been uneven &mdash; goods exports fell from £394 billion in 2022 to £367 billion in 2023, partly reflecting the unwinding of energy price distortions that inflated trade values in the immediate post-Ukraine period.</p>
            <p>Brexit has had a measurable effect on goods trade. Analysis by the UK in a Changing Europe and others estimates that UK goods exports to the EU are 15&ndash;20% lower than they would have been under continued membership, with the effect concentrated in sectors with complex cross-border supply chains &mdash; food and drink, automotive, and chemicals. The introduction of customs declarations, rules of origin requirements, and sanitary and phytosanitary checks has added friction and cost, particularly for small and medium-sized exporters that lack the resources to navigate the new administrative burden. Services trade has been less directly affected, though the loss of passporting rights has caused some financial services activity to relocate to Dublin, Paris, and Frankfurt.</p>
            <p>The UK trade deficit &mdash; the gap between the value of imports and exports &mdash; has been a persistent structural feature of the economy since the 1980s, reflecting both the erosion of the manufacturing base and the services surplus that does not fully compensate. The deficit stood at £36 billion in 2023, with energy accounting for approximately £13 billion of this total. As UK domestic energy production from North Sea fields declines and the transition to renewables is incomplete, the UK will remain a significant net energy importer for the foreseeable future, maintaining structural pressure on the trade account.</p>
            <p>The post-Brexit trade strategy has prioritised new free trade agreements with non-EU partners. Deals have been concluded with Australia, New Zealand, and most significantly, accession to the Comprehensive and Progressive Agreement for Trans-Pacific Partnership (CPTPP). The government projected significant long-run gains from these agreements, but the OBR and independent trade economists have generally estimated the impact as modest &mdash; adding perhaps 0.1&ndash;0.2% to GDP over 15 years &mdash; given that the UK&rsquo;s most important trading relationships are with geographically proximate markets where distance and cultural familiarity are advantages that geography does not easily offset.</p>
            <p>Technology and professional services represent the most promising growth sectors for UK exports. The UK has established a leading position in AI, cybersecurity, fintech, and life sciences &mdash; sectors where global demand is growing rapidly and where the UK&rsquo;s combination of research excellence, legal certainty, and English-language advantage confers genuine competitive strength. Sustaining and building on this position requires continued investment in research and development, immigration pathways for global talent, and regulatory frameworks that facilitate rather than impede digital trade. The strategic question for the UK&rsquo;s export trajectory is whether the services growth of recent years can be maintained as the global economy evolves.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Exports' },
          { id: 'sec-callout', label: 'Record Services' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Services exports 2023"
              value="£400bn"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="record high &middot; finance, professional services, tech"
              sparklineData={[284, 291, 297, 308, 322, 271, 306, 368, 400]}
              onExpand={() => {}}
              source="ONS &middot; UK Trade in Services 2023"
            />
            <MetricCard
              label="Goods exports 2023"
              value="£367bn"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="below 2022 &middot; energy price distortion unwinding"
              sparklineData={[288, 302, 339, 347, 348, 296, 336, 394, 367]}
              onExpand={() => {}}
              source="ONS &middot; UK Trade in Goods 2023"
            />
            <MetricCard
              label="Trade deficit"
              value="£36bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="persistent deficit &middot; £13bn in energy alone"
              sparklineData={[36, 38, 31, 33, 28, 34, 42, 31, 36]}
              onExpand={() => {}}
              source="ONS &middot; UK Trade Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK goods and services exports, 2015&ndash;2023"
              subtitle="Annual export values in £ billions. Services exports crossed above goods exports for the first time in 2023."
              series={exportSeries}
              yLabel="£ billions"
              source={{
                name: 'ONS',
                dataset: 'UK Trade Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Record Services Exports"
              value="£400bn"
              unit="services exported in 2023"
              description="The UK's services sector — led by financial services, business consultancy and technology — exported a record £400 billion in 2023. Services now make up over half of UK exports, a growing global competitive advantage."
              source="ONS, UK Trade, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; UK Trade in Goods and Services. Published monthly. ons.gov.uk/businessindustryandtrade/internationaltrade/bulletins/uktrade/latest</p>
            <p>ONS &mdash; Pink Book (UK Balance of Payments). Published annually. ons.gov.uk/economy/nationalaccounts/balanceofpayments/compendium/unitedkingdombalanceofpaymentsthepinkbook</p>
            <p>Trade figures are current prices, not adjusted for inflation. The goods/services breakdown follows the Balance of Payments framework (BPM6). Trade deficit refers to the total trade in goods and services balance. Energy trade includes both crude oil, natural gas, and refined petroleum products. Post-Brexit effects are estimated; the counterfactual is modelled not observed.</p>
          </div>
        </section>
      </main>
    </>
  )
}
