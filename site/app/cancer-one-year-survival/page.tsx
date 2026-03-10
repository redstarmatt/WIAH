'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

export default function CancerOneYearSurvivalPage() {
  return (
    <>
      <TopicNav topic="Cancer One-Year Survival" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cancer One-Year Survival"
          question="How Many Cancer Patients Survive One Year?"
          finding="One-year cancer survival has improved steadily but the UK still lags behind comparable European nations."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="One-year cancer survival"
              value="73.7%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="up from 68% in 2010"
              sparklineData={[68,69,70,70.5,71,71.8,72.3,73,73.7]}
              source=""
            />
            <MetricCard
              label="Late-stage diagnosis rate"
              value="24%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="quarter of cancers diagnosed at stage 4"
              sparklineData={[25,25,24.5,24,24,24,24,24,24]}
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
              <RelatedTopics />
      </main>
    </>
  )
}
