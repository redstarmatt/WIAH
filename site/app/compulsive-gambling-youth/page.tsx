'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function CompulsiveGamblingYouthPage() {
  return (
    <>
      <TopicNav topic="Youth Gambling Harm" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Youth Gambling Harm"
          question="How Many Young People Are Harmed by Gambling?"
          finding="An estimated 55,000 children aged 11-16 are classified as problem gamblers, with online gambling increasingly accessible."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Problem gamblers aged 11-16"
              value="55,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Gambling Commission youth survey"
              sparklineData={[30,35,38,40,42,45,48,52,55]}
              source=""
            />
            <MetricCard
              label="Children gambling online weekly"
              value="7%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="up from 4% in 2019"
              sparklineData={[4.0,4.5,5.0,5.5,6.0,6.2,6.5,6.8,7.0]}
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
