'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

export default function LonelinessYoungPeoplePage() {
  return (
    <>
      <TopicNav topic="Loneliness in Young People" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Loneliness in Young People"
          question="How Lonely Are Young People?"
          finding="Young adults aged 16-24 report the highest rates of chronic loneliness in the UK, with one in six experiencing it often or always."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="16-24s chronically lonely"
              value="16%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="highest of any age group"
              sparklineData={[10,11,12,13,14,14,15,15,16]}
              source=""
            />
            <MetricCard
              label="Young people lacking close friends"
              value="22%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="up from 15% in 2018"
              sparklineData={[15,16,17,18,19,20,21,21,22]}
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
