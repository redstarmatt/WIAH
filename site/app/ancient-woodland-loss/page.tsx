'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface AncientWoodlandData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{ year: number; sitesAtRisk: number; hs2LossHa: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function AncientWoodlandLossPage() {
  const [data, setData] = useState<AncientWoodlandData | null>(null)

  useEffect(() => {
    fetch('/data/ancient-woodland-loss/ancient_woodland_loss.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'sitesAtRisk',
        label: 'Ancient woodland sites at risk',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.sitesAtRisk })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Ancient Woodland Loss" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ancient Woodland Loss"
          question="How Much Ancient Woodland Is Being Destroyed?"
          finding="Over 1,000 ancient woodland sites are under threat from development, and 700 hectares were lost to HS2 alone — irreplaceable ecosystem lost for good."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ancient woodland &mdash; woodland in continuous existence since at least 1600 AD &mdash; covers approximately 340,000 hectares in England, around 2% of total land area. It takes over 400 years for the complex soil fungi networks, invertebrate communities, and specialist plant species to develop; once destroyed, it cannot be recreated. The National Planning Policy Framework treats ancient woodland as &apos;irreplaceable habitat&apos; that should be refused unless there are wholly exceptional reasons, yet the Woodland Trust consistently records over 1,000 active planning threats at any one time. HS2 became the most high-profile single case: approximately 108 ancient woodland sites were affected, with an estimated 700 hectares lost to the London-Birmingham section despite mitigation commitments including soil translocation. Motorway widening schemes and the Roads Investment Strategy have accounted for additional losses, with nationally significant infrastructure projects assessed under a different and generally less protective planning regime than local applications.</p>
            <p>The England Trees Action Plan commits to adding 400,000 hectares of woodland by 2050, and the Nature Recovery Network framework identifies ancient woodland expansion areas as among the highest-value uses of new planting. But the gap between protection policy and planning outcomes persists. Successful objection to ancient woodland loss depends on the quality of ecological assessments, local authority planning capacity, and in contested cases the outcome of appeals &mdash; all of which are unequally distributed. The Woodland Trust&apos;s Treeconomics programme is building the economic case for ancient woodland ecosystem services &mdash; flood attenuation, carbon storage, air quality &mdash; to make retention more compelling in cost-benefit analyses that currently value development above heritage habitat.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Ancient woodland sites under threat"
              value="1,000+"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="1,000+ sites at risk in planning system"
              sparklineData={[850, 900, 950, 1000, 1050, 1080, 1050, 1020, 1000]}
              source="Woodland Trust · Ancient Woodland Threat Register 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Hectares lost to HS2"
              value="700ha"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="700ha ancient woodland lost to HS2"
              sparklineData={[0, 0, 50, 150, 300, 450, 550, 650, 700]}
              source="Woodland Trust / HS2 Ltd Environmental Assessment 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Total ancient woodland (England)"
              value="340,000ha"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="340,000ha total · 2% of land area · centuries to form"
              sparklineData={[340500, 340400, 340300, 340200, 340100, 340000, 339900, 339800, 340000]}
              source="Natural England · Ancient Woodland Inventory 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Ancient woodland sites under planning threat, 2016–2024"
              subtitle="Number of ancient woodland sites in England with active planning applications affecting them."
              series={series}
              yLabel="Sites at risk"
              source={{ name: 'Woodland Trust', dataset: 'Ancient Woodland Threat Register', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Woodland Trust. Ancient Woodland Threat Register. Updated continuously. <a href="https://www.woodlandtrust.org.uk/protecting-trees-and-woods/ancient-woodland-inventory/" className="underline" target="_blank" rel="noopener noreferrer">woodlandtrust.org.uk</a>. Sites at risk reflects active planning applications only.</p>
            <p>Natural England. Ancient Woodland Inventory for England. <a href="https://www.data.gov.uk/dataset/9461f463-c363-4309-ae77-fdcd7e9df7d3/ancient-woodland-england" className="underline" target="_blank" rel="noopener noreferrer">data.gov.uk</a>. HS2 loss estimates from HS2 Ltd Environmental Impact Assessments and Woodland Trust monitoring.</p>
          </div>
        </section>
      </main>
    </>
  )
}
