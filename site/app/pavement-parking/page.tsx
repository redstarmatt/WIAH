'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function PavementParkingPage() {
  return (
    <>
      <TopicNav topic="Pavement Parking" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pavement Parking"
          question="How Bad Is Pavement Parking?"
          finding="An estimated 80% of wheelchair users report difficulty navigating pavements due to illegal parking, with limited enforcement."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Wheelchair users affected"
              value="80%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="reporting pavement access issues"
              sparklineData={[78,78,79,79,79,80,80,80,80]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Councils with pavement parking enforcement"
              value="18%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 8% in 2019"
              sparklineData={[8,9,10,11,12,13,14,16,18]}
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
