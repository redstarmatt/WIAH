'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function LiverDiseaseDeathsPage() {
  return (
    <>
      <TopicNav topic="Liver Disease Deaths" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Liver Disease Deaths"
          question="Why Are Liver Disease Deaths Rising?"
          finding="Liver disease deaths have risen by over 40% since 2001, driven by alcohol, obesity, and hepatitis, making the UK an outlier in Western Europe."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Liver disease deaths per year"
              value="12,800"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+40% since 2001"
              sparklineData={[9000,9500,10000,10500,11000,11500,12000,12400,12800]}
              source=""
            />
            <MetricCard
              label="Under-65 liver deaths"
              value="4,100"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="premature deaths rising fastest"
              sparklineData={[2800,3000,3200,3400,3500,3700,3800,4000,4100]}
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
