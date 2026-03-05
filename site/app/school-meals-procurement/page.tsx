'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function SchoolMealsProcurementPage() {
  return (
    <>
      <TopicNav topic="School Meals Quality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Meals Quality"
          question="Are School Meals Getting Worse?"
          finding="Average spend per primary school meal has risen only 15% in a decade while food costs have increased 40%, squeezing nutritional quality."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average cost per primary meal"
              value="£2.30"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+15% in 10 years vs 40% food inflation"
              sparklineData={[2.0,2.02,2.05,2.08,2.1,2.14,2.18,2.24,2.3]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Schools failing food standards checks"
              value="18%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="up from 12% in 2019"
              sparklineData={[12,13,13,14,15,16,16,17,18]}
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
