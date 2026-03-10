'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

export default function MentalHealthCrisisBedsPage() {
  return (
    <>
      <TopicNav topic="Mental Health Crisis Beds" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health Crisis Beds"
          question="Are There Enough Mental Health Beds?"
          finding="Mental health inpatient beds have been cut by over 40% since 1998, with occupancy rates regularly exceeding 100%."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Mental health beds"
              value="18,400"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="down from 33,000 in 1998"
              sparklineData={[33000,30000,27000,25000,23000,21000,20000,19200,18400]}
              source=""
            />
            <MetricCard
              label="Average bed occupancy"
              value="92%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="often exceeds 100% locally"
              sparklineData={[85,86,87,88,89,90,91,91,92]}
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
              <RelatedTopics />
      </main>
    </>
  )
}
