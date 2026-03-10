'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

export default function EWasteRecyclingPage() {
  return (
    <>
      <TopicNav topic="E-Waste Recycling" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="E-Waste Recycling"
          question="What Happens to Britain's Electronic Waste?"
          finding="The UK generates 1.5 million tonnes of e-waste annually, with less than half formally recycled."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="E-waste generated"
              value="1.5m tonnes"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="per year in UK"
              sparklineData={[1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5]}
              source=""
            />
            <MetricCard
              label="E-waste recycling rate"
              value="42%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="formally collected and recycled"
              sparklineData={[32,33,35,36,38,39,40,41,42]}
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
              <RelatedTopics />
      </main>
    </>
  )
}
