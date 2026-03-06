'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  vcInvestmentBn: number
  unicorns: number
}

interface StartupInvestmentData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function StartupInvestmentPage() {
  const [data, setData] = useState<StartupInvestmentData | null>(null)

  useEffect(() => {
    fetch('/data/startup-investment/startup_investment.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const vcInvestmentSeries: Series[] = data
    ? [{
        id: 'vc',
        label: 'UK VC investment (£bn)',
        colour: '#264653',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.vcInvestmentBn,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Startup Investment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Startup Investment"
          question="Is Britain Building the Companies of Tomorrow?"
          finding="UK VC investment halved from its 2021 peak but Britain still produces more tech unicorns per capita than any country except the US."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&rsquo;s venture capital market surged to &pound;29.4 billion in 2021, driven by record-low interest rates, pandemic-era digital acceleration, and deep institutional capital flows. That peak was not sustainable. As central banks raised rates sharply from 2022, valuation multiples collapsed and VC investment fell to &pound;13.2 billion in 2023 before recovering toward &pound;15.1 billion in 2024. Despite the downturn, the UK continued adding unicorn companies &mdash; privately held startups valued at over $1 billion &mdash; reaching 154 by 2024, third globally behind the United States and China. On a per-capita basis, the UK creates unicorns faster than any country except the US, reflecting strong advantages in talent density, world-class university spinouts (more than any European country), and a sophisticated financial services sector willing to back early-stage companies. Fintech remains the largest investment category, with deep tech including quantum computing, synthetic biology, and defence technology growing rapidly since the 2021 Integrated Review.</p>
            <p>London accounts for 62% of UK startup investment &mdash; a concentration creating both strength and fragility. Manchester, Cambridge, Oxford, and Edinburgh have genuine ecosystems but funding available outside London remains a fraction of equivalent US cities. UK pension funds have historically been reluctant to invest in domestic venture capital at the scale seen in Australia or Canada, depriving the ecosystem of patient capital. The Mansion House reforms (2023) aimed to redirect pension assets toward productive finance but implementation has been slow. The exit environment also constrains the cycle: London market IPOs have fallen and several high-profile UK startups have listed in the United States, raising questions about whether the UK retains the companies it creates.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'VC Investment' },
          { id: 'sec-callout', label: 'Unicorns' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="VC investment 2024"
              value="£15.1bn"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="recovering from 2023 low &middot; still half 2021 peak"
              sparklineData={[4.8, 6.1, 8.3, 11.9, 14.2, 29.4, 17.2, 13.2, 15.1]}
              href="#sec-chart"source="Beauhurst / DCMS Tech Nation &middot; 2024"
            />
            <MetricCard
              label="UK unicorn companies"
              value="154"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="3rd globally behind US and China"
              sparklineData={[29, 38, 53, 72, 98, 118, 133, 147, 154]}
              href="#sec-callout"source="Beauhurst / DCMS Tech Nation &middot; 2024"
            />
            <MetricCard
              label="London share of investment"
              value="62%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="concentration risk &middot; regional gap growing"
              sparklineData={[61, 62, 63, 62, 63, 64, 63, 62, 62]}
              href="#sec-callout"source="Beauhurst &middot; 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK venture capital investment, 2016&ndash;2024"
              subtitle="Total VC investment into UK-headquartered companies, £ billions. Includes seed through growth rounds."
              series={vcInvestmentSeries}
              yLabel="Investment (£bn)"
              source={{
                name: 'Beauhurst / DCMS Tech Nation',
                dataset: 'UK Venture Capital Investment',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="Third Most Startup Investment in the World"
              value="154"
              unit="unicorn companies"
              description="Despite a global VC downturn, the UK remains the 3rd largest startup ecosystem globally, behind only the US and China. London consistently ranks top 3 in Europe for tech talent and capital."
              source="Beauhurst / DCMS Tech Nation, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Beauhurst &mdash; UK Startup and Venture Capital Data. beauhurst.com</p>
            <p>DCMS &mdash; Tech Nation Report. technation.io/report</p>
            <p>British Business Bank &mdash; Small Business Finance Markets Report. british-business-bank.co.uk</p>
            <p>VC investment figures cover equity investment into UK-headquartered companies across all stages. Unicorn count reflects companies that have reached $1bn+ valuation; once a company achieves unicorn status it is counted in all subsequent years unless it has been acquired, dissolved, or listed. London share based on company registered address at time of deal.</p>
          </div>
        </section>
      </main>
    </>
  )
}
