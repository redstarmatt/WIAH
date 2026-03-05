'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function MenMentalHealthGapPage() {
  return (
    <>
      <TopicNav topic="Men's Mental Health Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Men's Mental Health Gap"
          question="Are Men Getting the Mental Health Support They Need?"
          finding="Men account for 75% of suicides yet are significantly less likely to access mental health services."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Male share of suicides"
              value="75%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="three-quarters of all UK suicides"
              sparklineData={[76,76,75,75,75,75,75,75,75]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Men accessing IAPT"
              value="36%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 32% but still minority"
              sparklineData={[32,33,33,34,34,35,35,36,36]}
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
