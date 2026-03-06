'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface FarmingSubsidiesData {
  bpsPayments: { year: number; totalBn: number }[]
  elmsUptake: { year: number; percent: number }[]
  farmIncomeRealTerms: { year: number; index: number }[]
  bpsDistribution: { band: string; percentFarms: number; percentValue: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FarmingSubsidiesPage() {
  const [data, setData] = useState<FarmingSubsidiesData | null>(null)

  useEffect(() => {
    fetch('/data/farming-subsidies/farming_subsidies.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const bpsSeries: Series[] = data
    ? [{
        id: 'bps',
        label: 'BPS total payments (£bn)',
        colour: '#F4A261',
        data: data.bpsPayments.map(d => ({
          date: yearToDate(d.year),
          value: d.totalBn,
        })),
      }]
    : []

  const incomeSeries: Series[] = data
    ? [{
        id: 'income',
        label: 'Real farm income index (2010 = 100)',
        colour: '#264653',
        data: data.farmIncomeRealTerms.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Farm Subsidies" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Farm Subsidies"
          question="What's happening to farm payments after Brexit?"
          finding="The Basic Payment Scheme — which paid UK farmers £1.9bn annually based on land area — is being phased out in favour of ELMs, which pays for environmental outcomes. By 2024, only 8% of farms had joined ELMs. Real farm incomes have fallen 29% since 2010."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Basic Payment Scheme paid UK farmers around £1.9 billion per year based on land area, regardless of what they produced or how they farmed it. From 2021, BPS payments began being phased out in annual tranches, reaching zero by 2028. The replacement — Environmental Land Management schemes (ELMs) — pays for environmental public goods: cleaner water, better soil health, restored habitats, reduced flooding. In design, it is a fundamental shift from subsidising land ownership to buying public benefit. ELMs uptake reached only 8% of eligible farms by 2024, far below the pace needed to replace lost BPS income. Real farm incomes fell 29% between 2010 and 2023, with BPS reductions compounding energy, fertiliser, and labour cost pressures following the 2022 Ukraine war shock. Mid-sized family farms, which typically received £20,000–£50,000 per year in BPS, have been hardest hit, lacking the capital reserves to absorb a multi-year transition.</p>
            <p>BPS also illustrated deep inequality in British farming: the largest 2% of farm businesses, receiving over £150,000 per year, captured 16% of total payment value, with much flowing to large estates not farming in any conventional sense. ELMs is in theory more egalitarian — payments for actions taken, not land held — but smaller farmers face higher proportional bureaucratic costs completing and managing scheme agreements. If farm income pressure drives consolidation and exit, the result will be fewer, larger farms with less incentive to participate in stewardship; the government's challenge is to make ELMs financially attractive enough to complete the transition without destroying the farming sector the schemes depend upon.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-bps', label: 'BPS Payments' },
          { id: 'sec-income', label: 'Farm Incomes' },
          { id: 'sec-distribution', label: 'BPS Distribution' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="BPS total payments"
            value="£0.8bn"
            unit="(2024)"
            direction="down"
            polarity="up-is-bad"
            changeText="Down from £1.9bn/yr peak · phasing out 2021–2028 transition"
            sparklineData={[2.4, 1.9, 1.8, 1.9, 1.5, 0.8]}
            source="DEFRA Farm Accounts · 2024"
            href="#sec-bps"/>
          <MetricCard
            label="ELMs uptake"
            value="8"
            unit="% of farms"
            direction="up"
            polarity="up-is-good"
            changeText="Growing from near-zero in 2022 · government wants rapid expansion"
            sparklineData={[0.5, 2.0, 8.0]}
            source="DEFRA · 2024"
            href="#sec-income"/>
          <MetricCard
            label="Real farm income change since 2010"
            value="-29"
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText="BPS reduction + input cost inflation squeezing margins"
            sparklineData={[100, 92, 81, 86, 89, 79, 71]}
            source="DEFRA Farm Business Survey · 2023"
            href="#sec-distribution"/>
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-bps" className="mb-12">
          <LineChart
            title="Basic Payment Scheme total payments, 2014–2024"
            subtitle="Total BPS payments to English farmers, £ billions. DEFRA."
            series={bpsSeries}
            annotations={[
              { date: new Date(2021, 6, 1), label: 'BPS phase-down begins' },
            ]}
            yLabel="£ billions"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-income" className="mb-12">
          <LineChart
            title="Real farm income index, England, 2010–2023"
            subtitle="Index: 2010 = 100. Adjusted for inflation. DEFRA Farm Business Survey."
            series={incomeSeries}
            yLabel="Index (2010=100)"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-distribution" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Who received BPS payments?</h3>
          <p className="text-sm text-wiah-mid mb-6">Share of farms vs share of total BPS payment value, by payment band. DEFRA.</p>
          <div className="space-y-4">
            {data?.bpsDistribution.map(item => (
              <div key={item.band}>
                <div className="text-sm font-medium text-wiah-black mb-1">{item.band}</div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-mono text-wiah-mid w-20">% of farms</span>
                  <div className="flex-grow h-5 bg-[#E5E7EB] rounded relative">
                    <div
                      className="h-5 bg-[#264653] rounded"
                      style={{ width: `${item.percentFarms}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-wiah-black w-8 text-right">{item.percentFarms}%</span>
                </div>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-xs font-mono text-wiah-mid w-20">% of value</span>
                  <div className="flex-grow h-5 bg-[#E5E7EB] rounded relative">
                    <div
                      className="h-5 bg-[#F4A261] rounded"
                      style={{ width: `${item.percentValue}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-wiah-black w-8 text-right">{item.percentValue}%</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs" className="underline" target="_blank" rel="noopener noreferrer">
              DEFRA (gov.uk)
            </a>
            {' '}· Countryside Alliance · NFU
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
