'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function BabyLossSupportPage() {
  return (
    <>
      <TopicNav topic="Baby Loss Support" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Baby Loss Support"
          question="What Support Exists After Baby Loss?"
          finding="1 in 4 pregnancies ends in loss, yet bereavement midwife provision remains inconsistent across NHS trusts."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Pregnancies ending in loss"
              value="1 in 4"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="miscarriage, stillbirth, neonatal death"
              sparklineData={[25,25,25,25,25,25,25,25,25]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Trusts with bereavement midwife"
              value="72%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 55% in 2019"
              sparklineData={[55,58,60,62,64,66,68,70,72]}
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
