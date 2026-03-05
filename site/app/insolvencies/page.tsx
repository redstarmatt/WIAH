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
          finding="25,158 company insolvencies were registered in England &amp; Wales in 2023 &mdash; the highest since 1993, and 50% higher than the pre-pandemic average. Hospitality and construction are the worst-hit sectors."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Company insolvencies in England and Wales reached 25,158 in 2023 &mdash; the highest total since records were compiled in their current form in 1993 and 50% above the pre-pandemic average of approximately 16,500 per year. This surge is not primarily a story of COVID-19 damage; the pandemic year of 2020 paradoxically saw insolvencies fall to 12,557 as government support packages (furlough, CBILS, BBLS, business rates relief, VAT deferrals) kept businesses alive artificially. The crisis became apparent when those supports were withdrawn and the underlying structural weaknesses they had masked became visible.</p>
            <p>The &ldquo;zombie company&rdquo; phenomenon &mdash; businesses that were functionally insolvent but sustained by cheap credit and government support &mdash; is a significant part of the 2022&ndash;2023 insolvency surge. Coronavirus Business Interruption Loan Scheme (CBILS) and Bounce Back Loan Scheme (BBLS) repayments began coming due in 2022 and 2023, coinciding with a sharp rise in interest rates from near-zero to 5.25% &mdash; the fastest tightening cycle in 30 years. For businesses carrying pandemic-era debt, the combination of loan repayments and higher financing costs proved fatal. This is a structural, delayed consequence of the pandemic support architecture rather than a simple economic downturn story.</p>
            <p>Hospitality and construction are the two worst-affected sectors. Hospitality (3,891 insolvencies in 2023) faces a combination of post-pandemic debt burden, labour shortages following Brexit and the pandemic, elevated energy costs, and consumers who have cut discretionary spending in response to the cost-of-living squeeze. Construction (4,214 insolvencies) faces its own distinctive pressures: fixed-price contracts signed before the inflation spike of 2021&ndash;2022 became impossible to deliver profitably as materials and labour costs soared; the housebuilding slowdown reduced demand; and the industry&rsquo;s reliance on supply chains of specialist subcontractors creates contagion when a main contractor fails.</p>
            <p>For workers, company insolvency means immediate uncertainty. Employees of insolvent companies can claim redundancy pay, unpaid wages (up to eight weeks), and holiday pay from the National Insurance Fund &mdash; but these are capped and the process takes time. Workers in insolvencies are protected by the Insolvency Service&rsquo;s employee redundancy fund up to statutory limits, but many find themselves at the bottom of the creditor queue and may lose outstanding wage claims, pension contributions, and benefits accrued over years of service. For small companies with informal arrangements, recovery may be negligible.</p>
            <p>Personal insolvencies, while lower than their 2010 peak of 135,045, remain elevated at 99,825 in 2023. The cost-of-living crisis &mdash; falling real wages, high energy costs, rising mortgage rates, and depleted pandemic-era savings &mdash; has created a pipeline of personal debt problems. The debt advice sector, including StepChange, Citizens Advice, and National Debtline, has reported record demand since 2022. Problem debt is a lagging indicator: households typically exhaust other options (credit cards, overdrafts, borrowing from family) before entering formal insolvency, which means the full impact of the current cost-of-living squeeze on personal insolvencies may not be visible in the data for another 12&ndash;18 months.</p>
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
              changeText="Highest since 1993 &middot; up 50% vs pre-pandemic average"
              sparklineData={[19077, 17435, 15385, 16090, 19196, 12557, 14049, 22109, 25158]}
              onExpand={() => {}}
              source="Insolvency Service &middot; 2023"
            />
            <MetricCard
              label="Personal insolvencies (2023)"
              value="99,825"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Still elevated &middot; cost-of-living and debt pile-up driving rise"
              sparklineData={[135045, 99196, 90928, 122009, 80000, 119932, 106820, 99825]}
              onExpand={() => {}}
              source="Insolvency Service &middot; 2023"
            />
            <MetricCard
              label="Hospitality failures"
              value="3,891"
              unit="in 2023"
              direction="up"
              polarity="up-is-bad"
              changeText="2nd highest sector &middot; energy costs + post-COVID debt burden"
              sparklineData={[2100, 2400, 2200, 2600, 1800, 2200, 3100, 3891]}
              onExpand={() => {}}
              source="Insolvency Service &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Company insolvencies, England &amp; Wales, 2010&ndash;2023"
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: The Insolvency Service &mdash; Insolvency Statistics Q4 2023</p>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>The Insolvency Service &mdash; Insolvency Statistics, England and Wales. Quarterly and annual publications. insolvency.service.gov.uk/about-us/research-and-evaluation/insolvency-statistics</p>
            <p>ONS &mdash; Business Demography. Annual publication on business births, deaths, and survival rates. ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography</p>
            <p>Company insolvencies include compulsory liquidations (court-ordered), creditors&rsquo; voluntary liquidations (directors-initiated), administrations, receiverships, and company voluntary arrangements. Personal insolvencies include bankruptcies, debt relief orders (DROs), and individual voluntary arrangements (IVAs). Sector data is based on Standard Industrial Classification (SIC) codes.</p>
          </div>
        </section>
      </main>
    </>
  )
}
