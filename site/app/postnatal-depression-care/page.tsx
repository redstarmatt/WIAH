'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function PostnatalDepressionCarePage() {
  return (
    <>
      <TopicNav topic="Postnatal Depression Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Postnatal Depression Care"
          question="Are New Mothers Getting Mental Health Support?"
          finding="Around 1 in 5 new mothers experience perinatal mental health problems, but access to specialist support varies widely."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Mothers with perinatal mental health issues"
              value="20%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="approximately 1 in 5"
              sparklineData={[18,18,19,19,19,20,20,20,20]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Access to specialist PMH services"
              value="66%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 40% in 2018"
              sparklineData={[40,44,48,52,55,58,61,64,66]}
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
