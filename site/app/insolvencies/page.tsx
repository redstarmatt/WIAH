'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface InsolvenciesData {
  companyInsolvencies: Array<{ year: number; count: number }>
  personalInsolvencies: Array<{ year: number; count: number }>
  bySector2023: Array<{ sector: string; count: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function InsolvenciesPage() {
  const [data, setData] = useState<InsolvenciesData | null>(null)

  useEffect(() => {
    fetch('/data/insolvencies/insolvencies.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const companyInsolvencySeries: Series[] = data
    ? [{
        id: 'company',
        label: 'Company insolvencies',
        colour: '#E63946',
        data: data.companyInsolvencies.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Business Insolvencies" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Business Insolvencies"
          question="How many businesses are going bust?"
          finding="25,158 company insolvencies were registered in England &amp; Wales in 2023 — the highest since 1993, and 50% higher than the pre-pandemic average. Hospitality and construction are the worst-hit sectors."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Company insolvencies in England and Wales reached 25,158 in 2023 — the highest total since 1993 and 50% above the pre-pandemic average of around 16,500 per year. The pandemic year of 2020 paradoxically saw insolvencies fall to 12,557 as furlough, CBILS, BBLS, and VAT deferrals kept businesses alive artificially; the crisis became apparent when those supports were withdrawn. CBILS and BBLS repayments coming due in 2022 and 2023 coincided with the fastest interest rate tightening cycle in 30 years, from near-zero to 5.25%, making pandemic-era debt burdens fatal for &ldquo;zombie companies.&rdquo; Construction (4,214 insolvencies) faced fixed-price contracts signed before the 2021–2022 inflation spike and a housebuilding slowdown; hospitality (3,891) faced post-pandemic debt, energy costs, and consumers cutting discretionary spending. Personal insolvencies remain elevated at 99,825 in 2023, with the debt advice sector reporting record demand since 2022.</p>
            <p>For workers, company insolvency means immediate uncertainty: redundancy pay, unpaid wages (up to eight weeks), and holiday pay can be claimed from the National Insurance Fund but are capped, and workers sit at the bottom of the creditor queue for outstanding wage claims and pension contributions. The cost-of-living crisis — falling real wages, high energy costs, rising mortgage rates, and depleted savings — has created a pipeline of personal debt problems that are a lagging indicator of financial distress. Households typically exhaust credit cards, overdrafts, and family borrowing before entering formal insolvency, meaning the full impact of the cost-of-living squeeze may still be working through the data.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Insolvency Trend' },
          { id: 'sec-sectors', label: 'By Sector' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Company insolvencies (2023)"
              value="25,158"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Highest since 1993 · up 50% vs pre-pandemic average"
              sparklineData={[19077, 17435, 15385, 16090, 19196, 12557, 14049, 22109, 25158]}
              href="#sec-chart"source="Insolvency Service · 2023"
            />
            <MetricCard
              label="Personal insolvencies (2023)"
              value="99,825"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Still elevated · cost-of-living and debt pile-up driving rise"
              sparklineData={[135045, 99196, 90928, 122009, 80000, 119932, 106820, 99825]}
              href="#sec-sectors"source="Insolvency Service · 2023"
            />
            <MetricCard
              label="Hospitality failures"
              value="3,891"
              unit="in 2023"
              direction="up"
              polarity="up-is-bad"
              changeText="2nd highest sector · energy costs + post-COVID debt burden"
              sparklineData={[2100, 2400, 2200, 2600, 1800, 2200, 3100, 3891]}
              href="#sec-sectors"source="Insolvency Service · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Company insolvencies, England &amp; Wales, 2010–2023"
              subtitle="Total company insolvencies registered per year. 2020 fall reflects pandemic support measures masking underlying distress."
              series={companyInsolvencySeries}
              yLabel="Number of insolvencies"
              source={{
                name: 'The Insolvency Service',
                dataset: 'Insolvency Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sectors" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Company insolvencies by sector, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Construction and hospitality account for the highest number of insolvencies, reflecting pandemic debt, energy costs, and fixed-price contract losses.</p>
            {data && (
              <div className="space-y-3">
                {[...data.bySector2023].sort((a, b) => b.count - a.count).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-36 text-sm text-wiah-black flex-shrink-0">{item.sector}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.count / 4500) * 100}%`,
                          backgroundColor: idx === 0 ? '#E63946' : '#6B7280',
                        }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.count.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: The Insolvency Service — Insolvency Statistics Q4 2023</p>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>The Insolvency Service — Insolvency Statistics, England and Wales. Quarterly and annual publications. insolvency.service.gov.uk/about-us/research-and-evaluation/insolvency-statistics</p>
            <p>ONS — Business Demography. Annual publication on business births, deaths, and survival rates. ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography</p>
            <p>Company insolvencies include compulsory liquidations (court-ordered), creditors&rsquo; voluntary liquidations (directors-initiated), administrations, receiverships, and company voluntary arrangements. Personal insolvencies include bankruptcies, debt relief orders (DROs), and individual voluntary arrangements (IVAs). Sector data is based on Standard Industrial Classification (SIC) codes.</p>
          </div>
        </section>
      </main>
    </>
  )
}
