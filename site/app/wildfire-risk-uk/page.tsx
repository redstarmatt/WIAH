'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function WildfireRiskUkPage() {
  return (
    <>
      <TopicNav topic="UK Wildfire Risk" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="UK Wildfire Risk"
          question="Is Wildfire Becoming a Risk in Britain?"
          finding="Wildfires in the UK have increased by 50% in the last decade, with climate change extending fire seasons."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual wildfire incidents"
              value="73,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+50% in a decade"
              sparklineData={[48,50,52,55,58,61,64,68,73]}
              source=""
            />
            <MetricCard
              label="Hectares burned per year"
              value="79,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="three-year rolling average"
              sparklineData={[50,53,56,59,62,65,70,74,79]}
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
