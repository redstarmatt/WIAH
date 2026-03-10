'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

export default function BusinessInvestmentRatePage() {
  return (
    <>
      <TopicNav topic="Business Investment Rate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Business Investment Rate"
          question="Are UK Businesses Investing Enough?"
          finding="UK business investment as a share of GDP remains among the lowest in the G7, constraining productivity growth."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Business investment as % GDP"
              value="10.2%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="G7 average: 13.1%"
              sparklineData={[10.5,10.3,10.1,9.8,10.0,10.1,10.0,10.1,10.2]}
              source=""
            />
            <MetricCard
              label="Annual investment growth"
              value="1.2%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="well below pre-2016 trend"
              sparklineData={[3.2,2.8,2.4,1.8,1.5,0.8,0.5,0.9,1.2]}
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
