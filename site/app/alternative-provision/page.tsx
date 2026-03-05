'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function AlternativeProvisionPage() {
  return (
    <>
      <TopicNav topic="Alternative Provision" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Alternative Provision"
          question="What Happens to Pupils Outside Mainstream Schools?"
          finding="Over 40,000 children are in alternative provision at any one time, with poor outcomes and limited oversight."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children in alternative provision"
              value="41,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="rising due to exclusions"
              sparklineData={[32000,33500,35000,36000,37000,38000,39000,40000,41000]}
              source=""
            />
            <MetricCard
              label="AP pupils achieving grade 4+ English and Maths"
              value="4%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="vs 65% mainstream"
              sparklineData={[3,3,3,4,4,4,4,4,4]}
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
