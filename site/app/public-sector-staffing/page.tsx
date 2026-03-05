'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function PublicSectorStaffingPage() {
  return (
    <>
      <TopicNav topic="Public Sector Staffing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Sector Staffing"
          question="Is the Public Sector Losing Staff?"
          finding="Civil service vacancy rates hit record highs while experienced staff leave for the private sector."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Civil service vacancy rate"
              value="4.8%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="highest on record"
              sparklineData={[2.5,2.8,3.0,3.2,3.5,3.8,4.2,4.5,4.8]}
              source=""
            />
            <MetricCard
              label="Average civil service turnover"
              value="14%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="up from 9% in 2018"
              sparklineData={[9,10,10,11,11,12,13,13,14]}
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
