'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>The UK&apos;s trade position is structurally unusual among major economies: a very large goods deficit, reflecting the shift away from manufacturing over forty years, partially but not fully offset by a services surplus built around financial services, insurance, professional services, and creative industries. In 2023, the goods trade deficit stood at £165 billion — the largest in peacetime history — while the services surplus reached £125 billion, producing a total trade deficit of approximately £40 billion. This structural pattern makes the UK economy more sensitive to financial sector performance and to bilateral trade relationships in services than most comparable economies.</p>
            <p>The goods deficit has structural and cyclical components. The structural element reflects the decline of UK manufacturing from 28% of GDP in 1970 to 9% in 2023, meaning that a higher proportion of physical goods — cars, electronics, machinery, chemicals — are imported than produced domestically. The cyclical element reflects exchange rate effects on import costs and demand fluctuations affecting export volumes. Post-Brexit, additional non-tariff barriers have added administrative friction to UK goods exports to the EU, the UK&apos;s largest trading partner, and evidence suggests that goods export growth has been slower than would otherwise have been expected — though disentangling Brexit effects from pandemic effects and the global trade slowdown is methodologically complex.</p>
            <p>The services surplus is the UK&apos;s greatest trade asset. Financial services — banking, insurance, asset management — generate the largest surplus of any services category. The UK is the world&apos;s second-largest exporter of financial services after the United States, and the City of London&apos;s global position has proved resilient post-Brexit, though some wholesale banking activity relocated to EU financial centres. Professional services — legal, consulting, accountancy — are a growing component, as are creative and digital industries. The UK is the world&apos;s largest exporter of music, second-largest of film, and a significant digital services exporter. These industries are less exposed to tariff barriers than goods and are therefore structurally better positioned in a world of fragmented trade.</p>
            <p>Energy has become an increasingly important component of the goods deficit. The UK became a net energy importer in 2004, and Russia&apos;s invasion of Ukraine exposed the cost of this dependency acutely in 2022, when global gas prices spiked and UK energy import costs surged. North Sea oil and gas production continues to decline. The UK&apos;s net zero ambitions — and specifically its renewable energy buildout — are therefore simultaneously an industrial policy, an energy security policy, and a trade balance policy: replacing imported hydrocarbons with domestically produced renewable electricity reduces the energy component of the goods deficit over time.</p>
            <p>Trade policy post-Brexit has produced a set of bilateral free trade agreements — with Australia, New Zealand, the CPTPP bloc, and discussions with India and GCC — but none of these agreements individually is large enough to materially affect the trade balance. The combined GDP of Australia and New Zealand is smaller than that of the Netherlands. The bigger prize — improved access to the EU single market — remains politically sensitive. Closer alignment with EU regulations, the potential removal of new border checks for agri-food goods, and a mutual recognition of professional qualifications would have the largest trade balance impact, but require navigating the political constraints of the current Brexit settlement.</p>
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
              onExpand={() => {}}
              source="ONS · UK Trade Statistical Bulletin 2024"
            />
            <MetricCard
              label="Services trade surplus"
              value="£125bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£18bn since 2019 · finance dominates"
              sparklineData={[83, 88, 92, 95, 107, 98, 108, 115, 125]}
              onExpand={() => {}}
              source="ONS · UK Trade Statistical Bulletin 2024"
            />
            <MetricCard
              label="Net trade balance"
              value="-£40bn"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Better than 2022 peak of -£60bn"
              sparklineData={[-17, -22, -26, -27, -18, -47, -52, -47, -40]}
              onExpand={() => {}}
              source="ONS · UK Trade Statistical Bulletin 2024"
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
      </main>
    </>
  )
}
