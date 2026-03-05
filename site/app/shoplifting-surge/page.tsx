'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function ShopliftingSurgePage() {
  return (
    <>
      <TopicNav topic="Shoplifting Surge" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Shoplifting Surge"
          question="Why Is Shoplifting Out of Control?"
          finding="Recorded shoplifting offences reached 469,000 in 2024, a 30% increase in a single year, with organised retail crime escalating."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Recorded shoplifting offences"
              value="469,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+30% in one year"
              sparklineData={[300,310,320,290,340,350,360,400,469]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Charge rate for shoplifting"
              value="12%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="down from 18% in 2015"
              sparklineData={[18,17,16,15,15,14,13,13,12]}
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
