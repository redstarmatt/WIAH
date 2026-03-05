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
            <p>The UK&rsquo;s venture capital market surged to an extraordinary £29.4 billion in 2021, driven by record-low interest rates, pandemic-era digital acceleration, and deep pools of institutional capital flowing into technology. That peak was not sustainable. As central banks raised rates sharply from 2022, the cost of capital rose and the valuation multiples that underpinned late-stage tech funding collapsed. UK VC investment fell to £13.2 billion in 2023 &mdash; less than half the 2021 total &mdash; before beginning to recover toward £15.1 billion in 2024.</p>
            <p>What the headline figures obscure is the resilience of the underlying ecosystem. Despite the downturn, the UK continued adding unicorn companies &mdash; privately held startups valued at over $1 billion &mdash; every year. The total reached 154 by 2024, the third highest in the world behind the United States and China. On a per-capita basis, the UK creates unicorns faster than any country except the US, reflecting deep advantages in talent density, research institutions, and a sophisticated financial services sector willing to back early-stage companies.</p>
            <p>London accounts for approximately 62% of UK startup investment, a concentration that creates both strength and fragility. The capital benefits from a unique clustering of talent, capital, and customers, but the gap between London and the rest of the UK is significant. Manchester, Cambridge, Oxford, and Edinburgh have genuine startup ecosystems, but the funding available outside London remains a fraction of equivalent cities in the United States. Government initiatives including the British Patient Capital programme and regional development funds have attempted to address this, with limited success to date.</p>
            <p>The sectoral composition of UK startup investment has shifted meaningfully over the past decade. Fintech &mdash; an area where London has genuine global dominance &mdash; remains the largest single category. But deep tech, including quantum computing, synthetic biology, and defence technology, has grown rapidly, partly driven by government investment following the Integrated Review and partly by the commercialisation of world-class university research. The UK&rsquo;s universities collectively produce more spinouts than any European country, and the pipeline of research-intensive startups has strengthened considerably since 2018.</p>
            <p>The structural challenges are real. UK pension funds have historically been reluctant to invest in domestic venture capital at the scale seen in Australia or Canada, depriving the ecosystem of patient capital that could support longer investment cycles. The Mansion House reforms announced in 2023 aimed to redirect a portion of pension assets toward productive finance, but implementation has been slow. Meanwhile, the exit environment &mdash; crucial for recycling capital back into early-stage companies &mdash; remains constrained: London stock market IPOs have fallen and several high-profile UK startups have listed in the United States instead, raising questions about whether the UK can retain the companies it creates.</p>
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
              onExpand={() => {}}
              source="Beauhurst / DCMS Tech Nation &middot; 2024"
            />
            <MetricCard
              label="UK unicorn companies"
              value="154"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="3rd globally behind US and China"
              sparklineData={[29, 38, 53, 72, 98, 118, 133, 147, 154]}
              onExpand={() => {}}
              source="Beauhurst / DCMS Tech Nation &middot; 2024"
            />
            <MetricCard
              label="London share of investment"
              value="62%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="concentration risk &middot; regional gap growing"
              sparklineData={[61, 62, 63, 62, 63, 64, 63, 62, 62]}
              onExpand={() => {}}
              source="Beauhurst &middot; 2024"
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
