'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  euGoodsExportBn: number
  euGoodsImportBn: number
  tradeFormsMonthlyM?: number
}

interface UkEuTradeData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function UkEuTradePage() {
  const [data, setData] = useState<UkEuTradeData | null>(null)

  useEffect(() => {
    fetch('/data/uk-eu-trade/uk_eu_trade.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const tradeSeries: Series[] = data
    ? [
        {
          id: 'exports',
          label: 'UK goods exports to EU (£bn)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.euGoodsExportBn })),
        },
        {
          id: 'imports',
          label: 'UK goods imports from EU (£bn)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.euGoodsImportBn })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="UK-EU Trade" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="UK-EU Trade"
          question="What Has Brexit Done to British Trade?"
          finding="UK goods exports to the EU fell by an estimated 15% relative to trend after Brexit, while the administrative burden has added over 1.8 million forms a month."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s departure from the EU single market on 1 January 2021 introduced customs formalities and regulatory checks between Great Britain and its largest trading partner for the first time since 1993. Academic studies consistently find UK goods exports to the EU were 15&ndash;25% lower by 2023 than they would have been under continued single market membership, with the negative effect concentrated in food and agricultural products, SME exporters, and just-in-time supply chains. UK goods exports were &pound;167 billion in 2024 &mdash; below the pre-Brexit trend &mdash; while goods imports from the EU reached &pound;241 billion, producing a &pound;74 billion bilateral deficit. The UK introduced approximately 1.8 million new customs declarations per month from January 2021, with compliance costs estimated at &pound;7 billion per year by industry groups; many smaller businesses have withdrawn from EU markets entirely.</p>
            <p>The impact of Brexit trade barriers falls asymmetrically. Goods exporters face customs declarations, rules of origin requirements, and sector-specific compliance costs that are absent for service exporters &mdash; meaning London&apos;s financial services sector has been relatively insulated while food processing, automotive, and agricultural exporters in Leave-voting regions have borne the highest costs. The TCA&apos;s rules of origin requirements have driven supply chain restructuring in automotive and aerospace. Services trade has been more resilient, though the loss of financial services passporting resulted in significant relocation of EU-facing business to Dublin, Amsterdam, Frankfurt, and Paris.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Trade Flows' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="EU goods exports 2024"
              value="£167bn"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="15% below pre-Brexit trend &middot; services growing"
              sparklineData={[152, 161, 160, 159, 128, 148, 158, 164, 167]}
              onExpand={() => {}}
              source="ONS &middot; UK Trade Statistics 2024"
            />
            <MetricCard
              label="Trade in goods deficit"
              value="£74bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="UK imports more goods than it exports"
              sparklineData={[39, 42, 58, 60, 39, 65, 94, 84, 74]}
              onExpand={() => {}}
              source="ONS &middot; UK Trade Statistics 2024"
            />
            <MetricCard
              label="Monthly admin forms"
              value="1.8m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="New since Jan 2021 &middot; cost to exporters est. £7bn/yr"
              sparklineData={[0.2, 0.2, 0.2, 0.2, 0.2, 1.6, 1.7, 1.8, 1.8]}
              onExpand={() => {}}
              source="HMRC &middot; Trade Statistics / British Chambers 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK goods trade with the EU, 2016&ndash;2024"
              subtitle="UK goods exports to and imports from the European Union. Current prices, £ billions. Data covers Great Britain only from 2021."
              series={tradeSeries}
              yLabel="£ billions"
              annotations={[
                { date: new Date(2020, 0, 1), label: '2020: COVID-19' },
                { date: new Date(2021, 0, 1), label: '2021: TCA takes effect' },
              ]}
              source={{
                name: 'ONS',
                dataset: 'UK Trade in Goods Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; UK Trade Statistics. Published monthly. ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade</p>
            <p>Centre for European Reform &mdash; The hit to UK trade from Brexit. cer.eu/publications</p>
            <p>HMRC &mdash; UK trade in goods by all countries and commodities. uktradeinfo.com</p>
            <p>Goods trade figures include all merchandise trade between the UK and EU-27 member states. Trade deficit is calculated as imports minus exports for goods only; services are excluded. Monthly form estimate derived from HMRC customs declaration data and British Chambers of Commerce survey evidence. Pre-Brexit trend estimated using OLS regression on 2010&ndash;2019 trade data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
