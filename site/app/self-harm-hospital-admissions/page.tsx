'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function SelfHarmHospitalAdmissionsPage() {
  return (
    <>
      <TopicNav topic="Self-Harm Hospital Admissions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Self-Harm Hospital Admissions"
          question="How Many Young People Are Being Admitted for Self-Harm?"
          finding="Hospital admissions for self-harm among young women aged 15-19 have risen by over 70% in a decade."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Young women self-harm admissions"
              value="14,800"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+70% since 2012"
              sparklineData={[8700,9500,10200,11000,11800,12500,13200,14000,14800]}
              source=""
              onExpand={() => {}}
            />
            <MetricCard
              label="All-age self-harm admissions"
              value="52,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="per year in England"
              sparklineData={[42000,44000,45000,46000,47000,48000,50000,51000,52000]}
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
