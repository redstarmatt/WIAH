'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function SpikingReportsPage() {
  return (
    <>
      <TopicNav topic="Spiking Reports" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Spiking Reports"
          question="How Common Is Spiking?"
          finding="Police recorded spiking reports more than doubled between 2019 and 2024, though under-reporting remains significant."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Recorded spiking incidents"
              value="6,700"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+110% since 2019"
              sparklineData={[3200,3500,3800,4200,4800,5200,5600,6200,6700]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Estimated reporting rate"
              value="15%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="vast majority unreported"
              sparklineData={[14,14,14,15,15,15,15,15,15]}
              source=""
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Official data sources. See individual metric cards for specific attributions. Updated periodically as new data is published.</p>
          </div>
        </section>
      </main>
    </>
  )
}
