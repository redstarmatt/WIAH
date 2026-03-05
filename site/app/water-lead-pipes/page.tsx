'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function WaterLeadPipesPage() {
  return (
    <>
      <TopicNav topic="Lead Water Pipes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Lead Water Pipes"
          question="Is Lead Poisoning Britain's Drinking Water?"
          finding="An estimated 8 million UK homes still have lead water pipes, with no national replacement programme."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes with lead pipes"
              value="8m"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="no national replacement programme"
              sparklineData={[9.5,9.3,9.1,8.9,8.7,8.5,8.3,8.1,8.0]}
              source=""
            />
            <MetricCard
              label="Schools with lead pipes tested"
              value="12%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="most untested"
              sparklineData={[2,3,4,5,6,7,8,10,12]}
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
