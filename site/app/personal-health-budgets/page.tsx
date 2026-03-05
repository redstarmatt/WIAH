'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function PersonalHealthBudgetsPage() {
  return (
    <>
      <TopicNav topic="Personal Health Budgets" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Personal Health Budgets"
          question="Are Personal Health Budgets Working?"
          finding="Uptake of personal health budgets has grown but remains below NHS targets, with wide regional variation."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Active personal health budgets"
              value="105,000"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="target: 200,000 by 2024"
              sparklineData={[20,30,42,55,68,78,88,96,105]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="ICBs meeting PHB target"
              value="38%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="wide regional variation"
              sparklineData={[10,14,18,22,25,28,32,35,38]}
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
