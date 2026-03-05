'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function KinshipCareSupportPage() {
  return (
    <>
      <TopicNav topic="Kinship Care Support" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Kinship Care Support"
          question="Are Kinship Carers Getting Enough Help?"
          finding="An estimated 180,000 children live in kinship care arrangements, yet most kinship carers receive no financial support."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children in kinship care"
              value="180,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="rising as fostering declines"
              sparklineData={[140,145,150,155,160,165,170,175,180]}
              source=""
            />
            <MetricCard
              label="Kinship carers receiving allowance"
              value="22%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 15% in 2019"
              sparklineData={[15,16,17,17,18,19,19,20,22]}
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
