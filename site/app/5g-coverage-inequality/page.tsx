'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function FiveGCoverageInequalityPage() {
  return (
    <>
      <TopicNav topic="5G Coverage Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="5G Coverage Inequality"
          question="Who Gets 5G and Who Doesn't?"
          finding="5G coverage reaches 50% of the UK population but only 12% of rural areas, creating a growing digital divide."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK population 5G coverage"
              value="50%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 0% in 2019"
              sparklineData={[0,5,12,20,28,35,40,45,50]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Rural 5G coverage"
              value="12%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="vs 65% urban"
              sparklineData={[0,0,1,2,4,6,7,9,12]}
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
