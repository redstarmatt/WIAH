'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function OceanAcidificationPage() {
  return (
    <>
      <TopicNav topic="Ocean Acidification" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ocean Acidification"
          question="How Acidic Are Britain's Seas?"
          finding="UK coastal waters have become approximately 30% more acidic since pre-industrial times, threatening marine ecosystems."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Increase in ocean acidity"
              value="30%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="since pre-industrial era"
              sparklineData={[20,21,22,23,24,25,26,28,30]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="pH change per decade"
              value="-0.02"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="continuing to decline"
              sparklineData={[-0.015,-0.016,-0.017,-0.017,-0.018,-0.018,-0.019,-0.019,-0.02]}
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
