'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function ReturnershipsPage() {
  return (
    <>
      <TopicNav topic="Returnerships & Over-50s Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Returnerships & Over-50s Work"
          question="Are Over-50s Being Left Behind at Work?"
          finding="Over 3.5 million people aged 50-64 are economically inactive, with limited returner programmes available."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Economically inactive 50-64s"
              value="3.5m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+400k since 2020"
              sparklineData={[2.9,3.0,3.0,3.1,3.2,3.3,3.3,3.4,3.5]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Employers offering returnerships"
              value="8%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 3% in 2020"
              sparklineData={[3,3,4,4,5,6,6,7,8]}
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
