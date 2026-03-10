'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

export default function ScreenTimeWellbeingPage() {
  return (
    <>
      <TopicNav topic="Screen Time & Wellbeing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Screen Time & Wellbeing"
          question="Is Screen Time Harming Children's Wellbeing?"
          finding="Average screen time for 5-15 year olds exceeds 4 hours daily, though the relationship with wellbeing is more nuanced than headlines suggest."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average daily screen time (5-15s)"
              value="4.2 hrs"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="up from 3.5 hrs in 2018"
              sparklineData={[3.5,3.6,3.7,3.8,4.5,4.5,4.3,4.2,4.2]}
              source=""
            />
            <MetricCard
              label="Children with problematic use"
              value="17%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Ofcom definition"
              sparklineData={[10,11,12,13,14,15,16,16,17]}
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
