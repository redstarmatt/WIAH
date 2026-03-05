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
          question="What&apos;s happening to farm payments after Brexit?"
          finding="The Basic Payment Scheme &mdash; which paid UK farmers £1.9bn annually based on land area &mdash; is being phased out in favour of ELMs, which pays for environmental outcomes. By 2024, only 8% of farms had joined ELMs. Real farm incomes have fallen 29% since 2010."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Basic Payment Scheme was the centrepiece of post-war British agricultural policy for decades: a direct payment to farmers based on the area of land they held, regardless of what they produced or how they farmed it. At its peak, BPS distributed around £1.9 billion per year to approximately 85,000 farming businesses. Critics &mdash; including economists, conservationists, and successive government reviews &mdash; argued that paying for land area created perverse incentives: it rewarded holding land over farming it productively, and provided no requirement to manage land in environmentally beneficial ways.</p>
            <p>Environmental Land Management schemes (ELMs) are the replacement: a three-tier system that pays farmers for delivering environmental &ldquo;public goods&rdquo; &mdash; cleaner water, better soil health, restored habitats, reduced flooding. The principle is that public money should buy public benefit rather than subsidise land ownership. Sustainable Farming Incentive pays for basic environmental practices; Higher-tier Countryside Stewardship pays for more demanding habitat restoration and management; Landscape Recovery pays for large-scale rewilding-style projects. In design, it represents a fundamental shift in what the state rewards in agriculture.</p>
            <p>The transition has proved painful. BPS payments are being cut in annual tranches from 2021, reaching zero in 2028. ELMs uptake was 8% of eligible farms by 2024 &mdash; far below the pace needed to replace lost income. The gap has fallen hardest on mid-sized family farms, which typically received £20,000&ndash;£50,000 per year in BPS and lack the capital reserves to absorb a multi-year transition. Real farm incomes fell 29% between 2010 and 2023, with the BPS reduction compounding pre-existing cost pressures from energy, fertiliser, and labour inflation following the 2022 Ukraine war shock.</p>
            <p>The distribution of BPS payments illustrated a deeper inequality in British farming. The largest 2% of farm businesses &mdash; those receiving over £150,000 per year &mdash; captured 16% of the total payment value. Payments were not subject to any means-testing or income cap. Much of the money flowed to large estates, some of which were not farming in any conventional sense but owned significant land areas. The transition to ELMs is, in theory, more egalitarian: payments are for actions taken rather than land held. But smaller farmers face higher proportional bureaucratic costs in completing and managing ELMs agreements.</p>
            <p>The long-term environmental potential of ELMs is significant. If uptake reaches 50% of farmland by 2030, modelling by the Climate Change Committee and Natural England suggests it could deliver measurable improvements in river water quality, accelerate SSSI recovery, and create habitat connectivity at landscape scale. The risk is that if farm income pressure drives consolidation and exit, the result is fewer, larger farms with less incentive to participate in stewardship. The government&apos;s challenge is to make ELMs financially attractive enough that the transition is completed without destroying the farming sector that the schemes depend upon.</p>
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
            changeText="Down from £1.9bn/yr peak &middot; phasing out 2021&ndash;2028 transition"
            sparklineData={[2.4, 1.9, 1.8, 1.9, 1.5, 0.8]}
            source="DEFRA Farm Accounts &middot; 2024"
            onExpand={() => {}}
          />
          <MetricCard
            label="ELMs uptake"
            value="8"
            unit="% of farms"
            direction="up"
            polarity="up-is-good"
            changeText="Growing from near-zero in 2022 &middot; government wants rapid expansion"
            sparklineData={[0.5, 2.0, 8.0]}
            source="DEFRA &middot; 2024"
            onExpand={() => {}}
          />
          <MetricCard
            label="Real farm income change since 2010"
            value="-29"
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText="BPS reduction + input cost inflation squeezing margins"
            sparklineData={[100, 92, 81, 86, 89, 79, 71]}
            source="DEFRA Farm Business Survey &middot; 2023"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-bps" className="mb-12">
          <LineChart
            title="Basic Payment Scheme total payments, 2014&ndash;2024"
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
            title="Real farm income index, England, 2010&ndash;2023"
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
            {' '}&middot; Countryside Alliance &middot; NFU
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
