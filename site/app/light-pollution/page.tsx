'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function LightPollutionPage() {
  return (
    <>
      <TopicNav topic="Light Pollution" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Light Pollution"
          question="How Dark Are Britain's Skies?"
          finding="Artificial sky glow increases by 2% annually, with only six designated Dark Sky areas in England."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Increase in artificial sky glow"
              value="2% pa"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="globally increasing year on year"
              sparklineData={[1.4,1.5,1.6,1.7,1.8,1.9,2,2,2]}
              source=""
            />
            <MetricCard
              label="Dark sky areas in England"
              value="6"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="International Dark Sky reserves"
              sparklineData={[3,3,4,4,5,5,6,6,6]}
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
