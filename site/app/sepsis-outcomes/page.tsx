'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

export default function SepsisOutcomesPage() {
  return (
    <>
      <TopicNav topic="Sepsis Outcomes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sepsis Outcomes"
          question="Is the NHS Getting Better at Treating Sepsis?"
          finding="Sepsis kills around 48,000 people a year in the UK, but survival rates are improving with better early recognition."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual sepsis deaths"
              value="48,000"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="down from 52,000 in 2018"
              sparklineData={[52000,51000,50500,50000,49500,49000,48800,48500,48000]}
              source=""
            />
            <MetricCard
              label="Sepsis bundle compliance"
              value="72%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="target: 90%"
              sparklineData={[50,54,58,62,64,66,68,70,72]}
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
