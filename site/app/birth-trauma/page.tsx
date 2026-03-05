'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function BirthTraumaPage() {
  return (
    <>
      <TopicNav topic="Birth Trauma" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Birth Trauma"
          question="How Common Is Birth Trauma?"
          finding="An estimated 1 in 3 women describe their birth experience as traumatic, with significant variation in postnatal support."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Women reporting birth trauma"
              value="30%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="approximately 1 in 3"
              sparklineData={[28,28,29,29,29,30,30,30,30]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Access to birth reflections service"
              value="52%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="trusts offering the service"
              sparklineData={[30,33,36,39,42,44,46,49,52]}
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
