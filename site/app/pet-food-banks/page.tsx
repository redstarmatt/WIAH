'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function PetFoodBanksPage() {
  return (
    <>
      <TopicNav topic="Pet Poverty" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pet Poverty"
          question="Can People Afford Their Pets?"
          finding="Pet food bank demand has risen 500% since 2020, with an estimated 2 million pet owners struggling to afford veterinary care."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Pet food bank parcels distributed"
              value="320,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+500% since 2020"
              sparklineData={[50,55,80,120,160,200,240,280,320]}
              source=""
            />
            <MetricCard
              label="Pet owners unable to afford vet care"
              value="2m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="estimated"
              sparklineData={[0.8,0.9,1.0,1.2,1.4,1.5,1.7,1.8,2.0]}
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
