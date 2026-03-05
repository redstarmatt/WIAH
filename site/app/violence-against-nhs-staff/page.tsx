'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function ViolenceAgainstNhsStaffPage() {
  return (
    <>
      <TopicNav topic="Violence Against NHS Staff" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Violence Against NHS Staff"
          question="How Safe Are NHS Workers?"
          finding="Over 200 assaults on NHS staff are reported every day, with the trend worsening post-pandemic."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Reported assaults per year"
              value="77,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+18% since 2019"
              sparklineData={[60000,62000,63000,65000,68000,70000,72000,74000,77000]}
              source=""
            />
            <MetricCard
              label="Staff feeling unsafe"
              value="15%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="NHS Staff Survey"
              sparklineData={[10,10,11,11,12,12,13,14,15]}
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
