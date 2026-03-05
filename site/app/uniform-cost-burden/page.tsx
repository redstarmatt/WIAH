'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function UniformCostBurdenPage() {
  return (
    <>
      <TopicNav topic="School Uniform Costs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Uniform Costs"
          question="How Much Are Families Spending on School Uniforms?"
          finding="Average annual school uniform cost exceeds 300 pounds per secondary pupil, with branded items a major driver."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average secondary uniform cost"
              value="£337"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+25% since 2020"
              sparklineData={[240,252,265,278,290,305,315,326,337]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Families cutting other spending for uniform"
              value="23%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="up from 16% in 2019"
              sparklineData={[16,17,18,19,20,21,21,22,23]}
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
