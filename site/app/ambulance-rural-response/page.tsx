'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function AmbulanceRuralResponsePage() {
  return (
    <>
      <TopicNav topic="Ambulance Rural Response" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ambulance Rural Response"
          question="How Long Do Rural Areas Wait for an Ambulance?"
          finding="Rural ambulance response times are on average 8 minutes longer than urban areas for Category 2 calls."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rural Cat 2 response time"
              value="48 min"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+8 min vs urban average"
              sparklineData={[32,34,36,38,40,42,44,46,48]}
              source=""
            />
            <MetricCard
              label="Rural ambulance stations closed since 2010"
              value="42"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="consolidation continues"
              sparklineData={[12,16,20,24,28,32,35,38,42]}
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
