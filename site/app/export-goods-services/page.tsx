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
            <p>UK services exports reached a record £400 billion in 2023, surpassing goods exports for the first time. The UK is one of the world&rsquo;s largest services exporters, led by financial services, professional and business services, and technology — strengths underpinned by London's role as a global financial centre. Goods exports fell from £394 billion in 2022 to £367 billion in 2023, partly reflecting the unwinding of energy price distortions. Brexit has had a measurable effect on goods trade: UK in a Changing Europe estimates UK goods exports to the EU are 15–20% below where they would otherwise have been, with the burden concentrated in food and drink, automotive, and chemicals, where customs declarations and rules of origin requirements hit small and medium exporters hardest. The trade deficit stood at £36 billion in 2023, with energy accounting for approximately £13 billion.</p>
            <p>Post-Brexit trade strategy has prioritised FTAs with non-EU partners — deals with Australia, New Zealand, and accession to CPTPP — but the OBR estimates these add only 0.1–0.2% to GDP over 15 years, given that the UK's most important trading relationships are with geographically proximate markets. Technology and professional services represent the strongest growth prospects: the UK has established leading positions in AI, cybersecurity, fintech, and life sciences, sectors where English-language advantage and research excellence confer competitive strength. The strategic question is whether services growth can sustain the trade account as goods export weakness persists and the loss of passporting rights continues to relocate financial services activity to Dublin, Paris, and Frankfurt.</p>
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
              changeText="record high · finance, professional services, tech"
              sparklineData={[284, 291, 297, 308, 322, 271, 306, 368, 400]}
              href="#sec-chart"source="ONS · UK Trade in Services 2023"
            />
            <MetricCard
              label="Goods exports 2023"
              value="£367bn"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="below 2022 · energy price distortion unwinding"
              sparklineData={[288, 302, 339, 347, 348, 296, 336, 394, 367]}
              href="#sec-callout"source="ONS · UK Trade in Goods 2023"
            />
            <MetricCard
              label="Trade deficit"
              value="£36bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="persistent deficit · £13bn in energy alone"
              sparklineData={[36, 38, 31, 33, 28, 34, 42, 31, 36]}
              href="#sec-callout"source="ONS · UK Trade Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK goods and services exports, 2015–2023"
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
            <p>ONS — UK Trade in Goods and Services. Published monthly. ons.gov.uk/businessindustryandtrade/internationaltrade/bulletins/uktrade/latest</p>
            <p>ONS — Pink Book (UK Balance of Payments). Published annually. ons.gov.uk/economy/nationalaccounts/balanceofpayments/compendium/unitedkingdombalanceofpaymentsthepinkbook</p>
            <p>Trade figures are current prices, not adjusted for inflation. The goods/services breakdown follows the Balance of Payments framework (BPM6). Trade deficit refers to the total trade in goods and services balance. Energy trade includes both crude oil, natural gas, and refined petroleum products. Post-Brexit effects are estimated; the counterfactual is modelled not observed.</p>
          </div>
        </section>
      </main>
    </>
  )
}
