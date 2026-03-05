'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function NhsWaitingListInequalityPage() {
  return (
    <>
      <TopicNav topic="NHS Waiting List Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Waiting List Inequality"
          question="Who Waits Longest for NHS Treatment?"
          finding="Patients in the most deprived areas wait on average 20% longer for elective treatment than those in the least deprived."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Deprivation wait gap"
              value="20%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="most vs least deprived quintile"
              sparklineData={[12,13,14,15,16,17,18,19,20]}
              source=""
            />
            <MetricCard
              label="Longest average wait region"
              value="22 weeks"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="North West England"
              sparklineData={[14,15,16,17,18,19,20,21,22]}
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
