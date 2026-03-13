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
  { num: 1, name: 'ONS', dataset: 'UK Trade Statistical Bulletin 2024', url: 'https://www.ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade/latest', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'UK manufacturing as share of GDP', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp', date: '2024', note: 'Manufacturing fell from 28% of GDP in 1970 to 9% in 2023' },
  { num: 3, name: 'UK Trade Policy Observatory', dataset: 'UK goods exports to the EU post-Brexit', url: 'https://blogs.sussex.ac.uk/uktpo/', date: '2024', note: 'UK goods exports to EU 15-25% below trend' },
];

interface TradeDeficitData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    goodsDeficitBn: number
    servicesSurplusBn: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function TradeDeficitPage() {
  const [data, setData] = useState<TradeDeficitData | null>(null)

  useEffect(() => {
    fetch('/data/trade-deficit/trade_deficit.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'goods',
          label: 'Goods deficit',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.goodsDeficitBn })),
        },
        {
          id: 'services',
          label: 'Services surplus',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.servicesSurplusBn })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Trade Deficit" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Trade Deficit"
          question="What Is Britain Actually Exporting?"
          finding="Britain runs a persistent goods deficit of £165 billion, only partially offset by a £125 billion services surplus — making trade balance heavily dependent on financial services."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK goods trade deficit stood at £165 billion in 2023 — the largest in peacetime history — while the services surplus reached £125 billion, producing a net trade deficit of approximately £40 billion.<Cite nums={1} /> The goods deficit reflects four decades of manufacturing decline: UK manufacturing fell from 28% of GDP in 1970 to 9% in 2023, meaning a higher share of physical goods are imported than produced.<Cite nums={2} /> Energy is an increasingly important component: the UK became a net energy importer in 2004, and Russia's invasion of Ukraine drove the 2022 goods deficit to a record £186 billion before moderating as energy prices fell. The UK is the world's second-largest exporter of financial services after the US, and the services surplus has proved resilient post-Brexit despite some wholesale banking activity relocating to EU financial centres.</p>
            <p>The trade balance's structural vulnerabilities fall on specific sectors and regions. Post-Brexit non-tariff barriers have added administrative friction to goods exports — academic evidence consistently finds UK goods exports to the EU are 15–25% below trend<Cite nums={3} /> — while agricultural and small business exporters bear the highest per-transaction costs. Post-Brexit bilateral free trade agreements with Australia, New Zealand, and the CPTPP bloc are too small individually to materially affect the aggregate deficit; the combined GDP of Australia and New Zealand is smaller than the Netherlands. A veterinary and SPS agreement with the EU would have greater trade balance impact than any other available policy lever, but requires navigating the political constraints of the current Brexit settlement.</p>
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
              label="Goods trade deficit"
              value="£165bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+£40bn since 2019 · largest in peacetime"
              sparklineData={[100, 110, 118, 122, 125, 145, 160, 162, 165]}
              href="#sec-chart"source="ONS · UK Trade Statistical Bulletin 2024"
            />
            <MetricCard
              label="Services trade surplus"
              value="£125bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£18bn since 2019 · finance dominates"
              sparklineData={[83, 88, 92, 95, 107, 98, 108, 115, 125]}
              href="#sec-chart"source="ONS · UK Trade Statistical Bulletin 2024"
            />
            <MetricCard
              label="Net trade balance"
              value="-£40bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Better than 2022 peak of -£60bn"
              sparklineData={[-17, -22, -26, -27, -18, -47, -52, -47, -40]}
              href="#sec-chart"source="ONS · UK Trade Statistical Bulletin 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK goods deficit and services surplus, 2016–2024"
              subtitle="Annual trade flows in goods and services (£ billions)."
              series={series}
              yLabel="£ billions"
              source={{
                name: 'ONS',
                dataset: 'UK Trade Statistical Bulletin',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — UK Trade Statistical Bulletin 2024. Published monthly. ons.gov.uk/economy/nationalaccounts/balanceofpayments/bulletins/uktrade</p>
            <p>Goods deficit is the value of goods imports minus goods exports (Balance of Payments basis). Services surplus is the value of services exports minus services imports. Net trade balance is the sum of goods and services balances. All figures in current prices. Historical series revised in line with ONS Blue Book methodology updates.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
