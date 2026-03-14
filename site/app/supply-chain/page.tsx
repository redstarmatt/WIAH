'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DEFRA', dataset: 'Food Statistics Pocketbook — Food Security Indicators', url: 'https://www.gov.uk/government/statistics/food-statistics-pocketbook', date: '2022', note: 'UK imports 46% of food (up from 37% in 2000); one of highest in G7' },
  { num: 2, name: 'ONS', dataset: 'UK Trade Statistics', url: 'https://www.ons.gov.uk/economy/nationalaccounts/balanceofpayments', date: '2023', note: 'Goods trade deficit £186bn (2022 record); £162bn in 2023; 42% of exports to EU' },
  { num: 3, name: 'House of Lords', dataset: 'Science and Technology Committee — Medicine Supply Chain Report', date: '2021', note: 'NHS relies on imports for ~86% of active pharmaceutical ingredients, predominantly India and China' },
];

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
          finding="The UK imports 46% of its food — one of the highest ratios in the G7. The goods trade deficit hit £186 billion in 2022. Supply chain disruptions since 2020 (COVID, Brexit, Ukraine) have revealed structural vulnerabilities in energy, medicines and food."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK imports approximately 46% of its total food supply — up from 37% in 2000, and one of the highest food import ratios in the G7.<Cite nums={1} /> The goods trade deficit reached £186 billion in 2022, a record driven partly by Russia's invasion of Ukraine pushing up energy import costs, before falling to £162 billion in 2023.<Cite nums={2} /> The NHS relies on imports for approximately 86% of its active pharmaceutical ingredients, predominantly from India and China — a concentration identified by the Lords Science and Technology Committee in 2021 as a strategic vulnerability.<Cite nums={3} /> The government's Critical Imports and Supply Chains Strategy (2023) identified over 50 categories of concern, and the 2023 vegetable shortages — empty shelves for tomatoes and peppers — illustrated the real-world consequences of food import dependency.</p>
            <p>The supply chain vulnerabilities exposed since 2020 fall hardest on communities with limited substitution options. Brexit added administrative friction that disproportionately affects SMEs and perishable goods exporters, while medicine shortages — ADHD medication, antibiotics, HRT — cluster in conditions where alternatives are limited.<Cite nums={3} /> The structural goods deficit reflects decades of deindustrialisation and is partially offset by a services surplus, but services surpluses cannot compensate when physical goods fail to arrive. Investment in domestic renewable energy reduces fossil fuel import exposure over time; the gap between strategic risk identification and funded mitigation at the required scale remains wide.</p>
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
              changeText="Up from 37% in 2000 · UK produces 60% of food it can grow domestically"
              sparklineData={[37, 39, 42, 44, 46, 46]}
              source="DEFRA Food Statistics Pocketbook · 2022"
              href="#sec-food"/>
            <MetricCard
              label="Goods trade deficit (2022)"
              value="£186bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · down to £162bn in 2023 as energy prices fell"
              sparklineData={[120, 141, 148, 172, 186, 162]}
              source="ONS Trade Statistics · 2023"
              href="#sec-food"/>
            <MetricCard
              label="UK-EU trade as % of total exports"
              value="42"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Stable since Brexit · diversification to US and Asia partly offsetting"
              sparklineData={[44, 45, 43, 42, 42, 42]}
              source="ONS UK Trade (2023)"
              href="#sec-food"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-food" className="mb-12">
            <LineChart
              title="UK food import dependency, 2000–2022"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DEFRA — Food Statistics Pocketbook. Annual statistical publication covering food security, supply, and import dependency. Available at gov.uk/government/statistics/food-statistics-pocketbook.</p>
            <p>ONS — UK Trade in Goods. Monthly and annual statistics on UK imports and exports by commodity and partner country. Available at ons.gov.uk/economy/nationalaccounts/balanceofpayments.</p>
            <p>House of Lords Food, Diet and Obesity Committee — Recipe for Health (2024). Analysis of food system resilience, import dependency, and domestic production. Available at committees.parliament.uk.</p>
            <p>Food import dependency is measured as imports as a share of total food supply (domestic production plus imports minus exports). The goods trade deficit is measured in current prices. UK-EU trade share uses HMRC trade data and covers goods only; services are excluded.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
