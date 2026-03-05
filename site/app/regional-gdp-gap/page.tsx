'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface RegionalGdpGapData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    londonGdpPerHead: number
    northEastGdpPerHead: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function RegionalGdpGapPage() {
  const [data, setData] = useState<RegionalGdpGapData | null>(null)

  useEffect(() => {
    fetch('/data/regional-gdp-gap/regional_gdp_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'london',
          label: 'London',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.londonGdpPerHead })),
        },
        {
          id: 'northeast',
          label: 'North East England',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.northEastGdpPerHead })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Regional GDP Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Regional GDP Gap"
          question="How Unequal Are Britain's Regional Economies?"
          finding="London's GDP per head is £67,500 — three times higher than the North East at £22,100 — the widest regional divide of any comparable economy."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has the most geographically unequal economy of any comparable high-income country. GDP per head in London stood at £67,500 in 2022, while the North East registered £22,100 — a ratio of 3.1 to 1. By comparison, the most-to-least productive regional ratio in Germany is 1.9, France 1.7, and the United States 1.8. This extraordinary concentration is not simply a product of London&apos;s global financial centre status: even excluding the City, Inner London West generates GDP per head exceeding £100,000. The regional inequality has widened significantly since the 1990s, accelerated by the shift from manufacturing to financial and professional services which concentrated productivity gains in a small number of urban centres.</p>
            <p>The gap has deep structural roots. The deindustrialisation of the 1980s removed the economic base of Northern England, the Midlands, and coastal communities, without a comparable private sector replacement. Public sector employment partially filled the gap — and some regions remain more dependent on public sector jobs as a share of total employment — but it does not generate the export-oriented productivity growth that manufacturing did. Investment in infrastructure, research and development, and business support has been heavily geographically skewed toward London and the South East: Treasury analysis has found that London received approximately £4,000 more per head in public investment than comparable regions between 2000 and 2019.</p>
            <p>Transport connectivity is both a symptom and a cause of regional economic inequality. Journey times between northern cities by rail are typically longer and less reliable than equivalent journeys in comparable European countries. The case for HS2 was substantially about rebalancing: faster connections to Birmingham, Manchester, and Leeds were projected to increase agglomeration effects in those cities, making them more attractive to investment. The cancellation of the full HS2 programme in 2023, reducing it to London-Birmingham only, removed much of this rationale. Road investment has also been geographically skewed, with motorway and A-road investment per head significantly higher in the South East than in regions that depend more heavily on road networks for economic activity.</p>
            <p>The Levelling Up agenda, announced with ambition in 2019 and expressed in the Levelling Up White Paper of 2022, represented the most systematic attempt to address regional inequality in decades. Its 12 missions covered productivity, transport, digital connectivity, housing, health, education, and community cohesion. Early assessments by the Levelling Up Hub found that on several missions — including transport, broadband, and skills — there had been measurable improvement in lagging areas, but that on others, including wages and life expectancy, the gap had continued to widen. Total Levelling Up Fund and UKSPF expenditure was approximately £8 billion over 2020-25, compared to the £12 billion additional annual investment that Centre for Cities estimated would be needed to meaningfully close the productivity gap within a decade.</p>
            <p>The current government&apos;s growth mission frames regional economic development through the lens of Industrial Strategy and metro mayor devolution rather than place-based grants. The eight combined authorities with elected mayors now have greater economic development powers than at any point in recent history, and city-region deals covering skills, transport, and business support have delivered localised improvements. But the fundamental structural dynamics — concentrations of highly productive service industries in London, agglomeration effects that attract talent and capital to already-successful places — are not easily reversed by policy. Economists broadly agree that closing the regional gap requires sustained investment over decades, not years, and that the political economy of UK fiscal policy — where spending decisions favour areas that are already productive — is a structural obstacle as significant as any individual policy failure.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Regional GDP' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="London GDP per head"
              value="£67,500"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="3× North East average · gap widening"
              sparklineData={[48000, 50000, 52000, 54000, 55000, 54000, 57000, 62000, 67500]}
              onExpand={() => {}}
              source="ONS · Regional GDP Statistics 2024"
            />
            <MetricCard
              label="North East GDP per head"
              value="£22,100"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+£3,200 since 2015 · gap with London growing"
              sparklineData={[18500, 19000, 19200, 19500, 19800, 19600, 20100, 21000, 22100]}
              onExpand={() => {}}
              source="ONS · Regional GDP Statistics 2024"
            />
            <MetricCard
              label="London:North East GDP ratio"
              value="3.1×"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Widest gap since 1997 · UK far above OECD peers"
              sparklineData={[2.6, 2.6, 2.7, 2.8, 2.8, 2.8, 2.8, 3.0, 3.1]}
              onExpand={() => {}}
              source="ONS · Regional GDP Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="GDP per head: London vs North East England, 2016–2024"
              subtitle="Gross Value Added per head of population by region (£)."
              series={series}
              yLabel="£ per head"
              source={{
                name: 'ONS',
                dataset: 'Regional GDP Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Regional Economic Activity by Gross Value Added (Balanced) UK 2024. Published annually. ons.gov.uk/economy/grossdomesticproductgdp/datasets/regionalgrossdomesticproductlocalauthorities</p>
            <p>GDP per head is Gross Value Added (balanced) divided by ONS mid-year population estimates. London figures include all NUTS1 London region. North East figures are the NUTS1 North East region. Figures are current price estimates and not adjusted for regional price variation. International comparisons use OECD TL2 regional statistics on purchasing-power-parity adjusted GDP per capita.</p>
          </div>
        </section>
      </main>
    </>
  )
}
