'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function HealthTechAdoptionPage() {
  return (
    <>
      <TopicNav topic="Health Tech Adoption" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health Tech Adoption"
          question="Is the NHS Embracing Digital Health?"
          finding="NHS digital transformation remains patchy, with wide variation in electronic records, telemedicine, and AI adoption across trusts."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Trusts with full EPR"
              value="68%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 41% in 2019"
              sparklineData={[41,45,48,52,55,58,62,65,68]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="GP online consultation rate"
              value="28%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 1% pre-pandemic"
              sparklineData={[1,2,5,15,25,30,32,30,28]}
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
