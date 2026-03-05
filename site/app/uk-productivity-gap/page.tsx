'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function UkProductivityGapPage() {
  return (
    <>
      <TopicNav topic="UK Productivity Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="UK Productivity Gap"
          question="Why Is UK Productivity Lagging?"
          finding="UK output per hour is 16% below the G7 average, a gap that has widened since 2008."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Productivity gap vs G7 average"
              value="16%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="widened since 2008"
              sparklineData={[10,11,12,13,13,14,14,15,16]}
              source=""
            />
            <MetricCard
              label="Output per hour growth pa"
              value="0.4%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="well below pre-2008 trend of 2%"
              sparklineData={[2.0,1.8,1.5,1.2,0.9,0.7,0.5,0.4,0.4]}
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
      </main>
    </>
  )
}
