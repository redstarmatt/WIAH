'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function SleepDisorderPrevalencePage() {
  return (
    <>
      <TopicNav topic="Sleep Disorder Prevalence" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sleep Disorder Prevalence"
          question="Is Britain Sleeping Badly?"
          finding="An estimated 1 in 3 UK adults report poor sleep, with insomnia prescriptions rising and links to chronic disease well established."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults reporting poor sleep"
              value="36%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="approximately 1 in 3"
              sparklineData={[28,29,30,31,32,33,34,35,36]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Insomnia prescriptions"
              value="15.3m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+30% in five years"
              sparklineData={[10.5,11.2,12.0,12.8,13.5,14.0,14.5,15.0,15.3]}
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
