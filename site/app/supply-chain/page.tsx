'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface SupplyChainData {
  foodImportDependency: Array<{ year: number; percent: number }>
  tradeDeficit: Array<{ year: number; goodsDeficitBn: number }>
  ukEuTradeShare: Array<{ year: number; euShareExports: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function SupplyChainPage() {
  const [data, setData] = useState<SupplyChainData | null>(null)

  useEffect(() => {
    fetch('/data/supply-chain/supply_chain.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const foodImportSeries: Series[] = data
    ? [{
        id: 'food-imports',
        label: 'Food import dependency (%)',
        colour: '#F4A261',
        data: data.foodImportDependency.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : []

  const foodAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: COVID supply chain disruption' },
    { date: yearToDate(2021), label: '2021: Brexit full border checks' },
  ]

  return (
    <>
      <TopicNav topic="Supply Chain Resilience" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Supply Chain Resilience"
          question="How dependent is Britain on imports?"
          finding="The UK imports 46% of its food &mdash; one of the highest ratios in the G7. The goods trade deficit hit &pound;186 billion in 2022. Supply chain disruptions since 2020 (COVID, Brexit, Ukraine) have revealed structural vulnerabilities in energy, medicines and food."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK imports approximately 46% of its total food supply, according to DEFRA&apos;s Food Statistics Pocketbook. This is up from 37% in 2000, and represents one of the highest food import ratios in the G7. The figure requires some interpretation: the UK grows more food than it imports in categories it can produce domestically (wheat, dairy, meat) but imports almost entirely in categories such as fruit, vegetables, and processed foods from warm climates. DEFRA estimates that the UK produces 60% of the food it is capable of producing given its land and climate &mdash; meaning there is a meaningful self-sufficiency gap even in domestically producible categories. Food supply chain resilience became highly visible in 2023 when specific vegetable shortages &mdash; tomatoes, peppers, cucumbers &mdash; produced empty supermarket shelves, driven by a combination of cold Spanish and North African growing seasons and post-Brexit import friction.</p>
            <p>The goods trade deficit reached &pound;186 billion in 2022, a record driven partly by elevated energy import costs following Russia&apos;s invasion of Ukraine. It fell to &pound;162 billion in 2023 as energy prices moderated. The structural goods trade deficit &mdash; the UK imports more goods than it exports &mdash; is a longstanding feature of the economy, offset by a surplus in services (financial services, professional services, education). Whether this structure represents a vulnerability or simply an efficient specialisation is a subject of genuine debate among economists. What the post-2020 shocks have demonstrated is that the UK&apos;s goods import dependency creates exposure to supply disruptions that cannot always be managed through services surpluses.</p>
            <p>Medicines supply chain resilience became an acute concern during COVID-19 and has remained one since. The NHS relies on imports for approximately 86% of its active pharmaceutical ingredients (APIs), predominantly manufactured in India and China. The Lords Science and Technology Committee&apos;s 2021 report on UK science and technology identified this concentration as a strategic vulnerability. Shortages of specific medicines &mdash; ADHD medication, antibiotics, hormone replacement therapy &mdash; have been intermittent features of the NHS supply picture since 2022, driven by global demand surges and manufacturing constraints rather than Brexit specifically, but amplified by the UK&apos;s limited domestic manufacturing capacity.</p>
            <p>Brexit&apos;s impact on UK-EU trade has been a subject of significant analysis. The UK-EU goods trade share as a proportion of total UK exports has remained broadly stable at around 42%, below its pre-2016 peak of 45&ndash;46%, with some diversion to US and Asian markets. This stability partly reflects the UK-EU Trade and Cooperation Agreement maintaining tariff-free trade. But the introduction of new documentary requirements, checks, and compliance costs has introduced friction that disproportionately affects SMEs and perishable goods. ONS trade data shows that UK goods exports to the EU grew more slowly than to non-EU markets in the years following Brexit. Causation is difficult to isolate given COVID-19, but the direction of academic evidence is consistent: Brexit has imposed trade costs that would not have occurred under continued single market membership.</p>
            <p>The strategic responses being developed to reduce supply chain vulnerability operate at several levels. In food, the Henry Dimbleby National Food Strategy (2021) recommended greater domestic food production investment and a long-term food security framework; the government&apos;s response was widely regarded as inadequate. In medicines, NHS England has developed the Medicines Supply Contingency Programme and increased strategic stockpile levels. In energy, the scale-up of domestic renewable generation &mdash; offshore wind, solar &mdash; directly reduces fossil fuel import dependency. In critical goods more broadly, the government&apos;s Critical Imports and Supply Chains Strategy (2023) identified 50+ categories of concern. The challenge is translating strategic risk identification into funded mitigation at the scale the vulnerabilities require.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-food', label: 'Food Import Dependency' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK food import dependency"
              value="46"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 37% in 2000 &middot; UK produces 60% of food it can grow domestically"
              sparklineData={[37, 39, 42, 44, 46, 46]}
              source="DEFRA Food Statistics Pocketbook &middot; 2022"
              onExpand={() => {}}
            />
            <MetricCard
              label="Goods trade deficit (2022)"
              value="&pound;186bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high &middot; down to &pound;162bn in 2023 as energy prices fell"
              sparklineData={[120, 141, 148, 172, 186, 162]}
              source="ONS Trade Statistics &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK-EU trade as % of total exports"
              value="42"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Stable since Brexit &middot; diversification to US and Asia partly offsetting"
              sparklineData={[44, 45, 43, 42, 42, 42]}
              source="ONS UK Trade (2023)"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-food" className="mb-12">
            <LineChart
              title="UK food import dependency, 2000&ndash;2022"
              subtitle="Total food supply imported as a % of total food supply available. Source: DEFRA Food Statistics Pocketbook."
              series={foodImportSeries}
              annotations={foodAnnotations}
              yLabel="% of food supply imported"
              source={{
                name: 'DEFRA',
                dataset: 'Food Statistics Pocketbook — food security indicators',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DEFRA &mdash; Food Statistics Pocketbook. Annual statistical publication covering food security, supply, and import dependency. Available at gov.uk/government/statistics/food-statistics-pocketbook.</p>
            <p>ONS &mdash; UK Trade in Goods. Monthly and annual statistics on UK imports and exports by commodity and partner country. Available at ons.gov.uk/economy/nationalaccounts/balanceofpayments.</p>
            <p>House of Lords Food, Diet and Obesity Committee &mdash; Recipe for Health (2024). Analysis of food system resilience, import dependency, and domestic production. Available at committees.parliament.uk.</p>
            <p>Food import dependency is measured as imports as a share of total food supply (domestic production plus imports minus exports). The goods trade deficit is measured in current prices. UK-EU trade share uses HMRC trade data and covers goods only; services are excluded.</p>
          </div>
        </section>
      </main>
    </>
  )
}
