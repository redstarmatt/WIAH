'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function GreenBeltPressurePage() {
  return (
    <>
      <TopicNav topic="Green Belt Pressure" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Green Belt Pressure"
          question="Is the Green Belt Being Eroded?"
          finding="Planning applications on green belt land have risen 40% since 2018, reigniting debate between housing need and environmental protection."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Green belt planning applications"
              value="12,400"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+40% since 2018"
              sparklineData={[8800,9200,9600,10000,10400,10800,11200,11800,12400]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Green belt land released (hectares)"
              value="4,500"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="in 2023-24"
              sparklineData={[1500,1800,2200,2600,3000,3400,3800,4200,4500]}
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
