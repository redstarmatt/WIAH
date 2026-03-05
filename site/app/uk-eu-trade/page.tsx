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
            <p>The UK&apos;s departure from the European Union&apos;s single market and customs union on 1 January 2021 introduced customs formalities and regulatory checks between Great Britain and its largest trading partner for the first time since 1993. The effects on goods trade have been substantial and are now well-documented. Academic studies, including work by the Centre for European Reform and the Bank of England, consistently find that UK goods exports to the EU were 15% to 25% lower by 2023 than they would have been had the UK remained a member of the single market, with the negative effect concentrated in food and agricultural products, small and medium-sized exporters, and businesses that relied on frictionless just-in-time supply chains.</p>
            <p>The raw trade figures tell part of the story. UK goods exports to the EU were £167 billion in 2024, recovering from the sharp COVID-era dip of £128 billion in 2020 but remaining below the pre-Brexit trend implied by the growth trajectory of 2016&ndash;2019. The goods trade deficit with the EU has widened significantly: UK goods imports from the EU reached £241 billion in 2024, creating a goods trade deficit of £74 billion. The divergence partly reflects the different composition of UK exports and imports, but it also reflects the asymmetric impact of Brexit barriers &mdash; more damaging to goods exporters, who face customs declarations and rules of origin requirements, than to service exporters, who are less affected.</p>
            <p>The administrative burden is quantifiable. The UK introduced approximately 1.8 million new customs declarations per month from January 2021, covering goods that previously moved without documentation. The cost of this paperwork &mdash; in compliance staff, customs agents, and delays at borders &mdash; has been estimated at £7 billion per year by industry groups. Many smaller businesses have concluded that the administrative cost of exporting to the EU exceeds the commercial benefit and have withdrawn from EU markets entirely, a structural loss of market engagement that is difficult to reverse.</p>
            <p>The Trade and Cooperation Agreement (TCA) provides tariff-free access for goods meeting rules of origin requirements, but it does not replicate the frictionless trade of single market membership. Rules of origin requirements &mdash; which specify what proportion of a product&apos;s content must originate in the UK for it to qualify for zero tariffs &mdash; create compliance complexity for manufacturers with integrated European supply chains. The automotive, aerospace, and food processing sectors have been particularly affected. Several major manufacturers have restructured supply chains or shifted production to EU member states to avoid the complexity.</p>
            <p>Services trade, by contrast, has been more resilient. Financial services, professional services, and creative industries continue to trade substantially with the EU, though the loss of passporting rights for financial services has resulted in significant relocation of EU-facing business to Dublin, Amsterdam, Frankfurt, and Paris. The overall picture is one of genuine structural disruption to goods trade, partially offset by resilience in services, against a counterfactual that can never be observed but that academic modelling suggests was significantly better for the UK economy.</p>
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
