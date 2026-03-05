'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function NhsEstateBacklogPage() {
  return (
    <>
      <TopicNav topic="NHS Estate Backlog" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Estate Backlog"
          question="How Run-Down Are NHS Buildings?"
          finding="The NHS maintenance backlog exceeds £11 billion, with a growing proportion rated as high or significant risk."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Maintenance backlog"
              value="£11.6bn"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="up from £6bn in 2017"
              sparklineData={[6.0,6.5,7.2,7.9,8.6,9.2,10.0,10.8,11.6]}
              source=""
            />
            <MetricCard
              label="High-risk backlog share"
              value="20%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="posing patient safety risk"
              sparklineData={[12,13,14,15,16,17,18,19,20]}
              source=""
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
