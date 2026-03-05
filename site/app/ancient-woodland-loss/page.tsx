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
            <p>Ancient woodland &mdash; woodland that has existed continuously since at least 1600 AD in England, Wales and Scotland &mdash; is one of the UK&apos;s most biodiverse and ecologically irreplaceable habitats. It takes over 400 years for the complex soil fungi networks, invertebrate communities, and specialist plant species characteristic of ancient woodland to develop. Once destroyed, an ancient woodland cannot simply be replanted or recreated: it is, in the most literal sense, irreplaceable. The Woodland Trust&apos;s Ancient Woodland Inventory records approximately 340,000 hectares of ancient woodland in England &mdash; approximately 2% of total land area &mdash; and identifies the sites under threat from development in the planning system.</p>
            <p>The number of ancient woodland sites under threat from planning applications has remained stubbornly high despite strengthened planning policy. The National Planning Policy Framework (NPPF) treats ancient woodland as &apos;irreplaceable habitat&apos; and states that development resulting in loss or deterioration should be refused unless there are wholly exceptional reasons. Yet the Woodland Trust regularly identifies over 1,000 sites at risk in the active planning system, and successful challenges to planning applications affecting ancient woodland depend heavily on the quality of ecological assessments, the robustness of local authority planning responses, and in contested cases the outcome of planning appeals or public inquiries.</p>
            <p>HS2 &mdash; High Speed 2 &mdash; became the most high-profile single threat to ancient woodland in recent decades. Environmental assessments of the full HS2 route (London to Birmingham and then north to Manchester and Leeds) identified approximately 108 ancient woodland sites affected. Mitigation commitments &mdash; including translocation of soils and ground flora, and connectivity enhancements for surviving woodland fragments &mdash; were included in HS2 Ltd&apos;s Environmental Management Plans. Following the cancellation of Phase 2 (the northern sections) in 2023, the remaining woodland loss is associated with the London-Birmingham section. Total ancient woodland loss attributable to HS2 is estimated at approximately 700 hectares, which the Woodland Trust describes as irreplaceable even with mitigation measures.</p>
            <p>Road building is the other major sector of concern. The Highways England Roads Investment Strategy has included schemes affecting several notable ancient woodland sites, and motorway widening &mdash; particularly on the M25 &mdash; has affected ancient woodland in multiple locations. The planning system&apos;s treatment of road schemes is different from private development: Nationally Significant Infrastructure Projects go through a Development Consent Order process with different decision-making standards than local planning applications. Environmental groups have argued that the bar for justifying ancient woodland loss in major infrastructure schemes is too low and that genuine alternatives analysis is not always rigorously conducted.</p>
            <p>The policy response has involved both stronger protection and restoration commitments. The government&apos;s Nature Recovery Network framework identifies ancient woodland as a priority habitat for expansion, and the England Trees Action Plan includes commitments to add 400,000 hectares of woodland by 2050. Creating new woodland adjacent to or connecting existing ancient woodland sites &mdash; &apos;ancient woodland expansion areas&apos; &mdash; is identified as one of the highest-value uses of new tree planting, both for biodiversity and for the long-term resilience of existing ancient woodland fragments. The Woodland Trust&apos;s Treeconomics programme is developing the economic case for ancient woodland ecosystem services &mdash; flood attenuation, carbon storage, biodiversity banking, air quality improvement &mdash; that could make retention more compelling in cost-benefit assessments that currently privilege development value.</p>
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
