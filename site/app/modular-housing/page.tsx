'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function ModularHousingPage() {
  return (
    <>
      <TopicNav topic="Modular Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Modular Housing"
          question="Can Factory-Built Homes Fix the Housing Crisis?"
          finding="Modular housing completions remain below 10,000 a year despite government targets, though quality outcomes are improving."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual modular completions"
              value="8,200"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="target: 30,000+"
              sparklineData={[3000,3500,4200,5000,5800,6400,7000,7600,8200]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="Modular share of new builds"
              value="3.5%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="still a small fraction"
              sparklineData={[1.2,1.4,1.7,2.0,2.3,2.6,2.9,3.2,3.5]}
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
