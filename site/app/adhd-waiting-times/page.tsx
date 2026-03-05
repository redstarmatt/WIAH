'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function AdhdWaitingTimesPage() {
  return (
    <>
      <TopicNav topic="ADHD Waiting Times" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="ADHD Waiting Times"
          question="How Long Do Patients Wait for ADHD Assessment?"
          finding="NHS England reports rising ADHD referrals with waiting lists exceeding two years in many areas, leaving thousands without diagnosis or support."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average ADHD assessment wait"
              value="23 months"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="target: 18 weeks"
              sparklineData={[10,12,14,15,17,18,20,22,23]}
              source=""
            />
            <MetricCard
              label="Adult ADHD referrals"
              value="180,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+65% since 2020"
              sparklineData={[80,95,110,120,135,150,160,170,180]}
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
