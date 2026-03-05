'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function SchoolBuildingConditionPage() {
  return (
    <>
      <TopicNav topic="School Building Condition" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Building Condition"
          question="Are School Buildings Safe?"
          finding="Over 700,000 pupils are in schools rated as having critical or poor building conditions, with a maintenance backlog exceeding 11 billion pounds."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Schools with critical condition ratings"
              value="1,100"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="RAAC and structural issues"
              sparklineData={[500,550,600,650,700,800,850,950,1100]}
              source=""
            />
            <MetricCard
              label="Maintenance backlog"
              value="£11.4bn"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="up from £6.6bn in 2017"
              sparklineData={[6.6,7.0,7.5,8.0,8.5,9.0,9.8,10.6,11.4]}
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
