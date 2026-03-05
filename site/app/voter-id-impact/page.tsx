'use client'

import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

export default function VoterIdImpactPage() {
  return (
    <>
      <TopicNav topic="Voter ID Impact" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Voter ID Impact"
          question="Did Voter ID Laws Reduce Turnout?"
          finding="An estimated 14,000 people were turned away at polling stations in 2023 local elections after the new voter ID requirements."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Voters turned away at polls"
              value="14,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="first elections with ID requirement"
              sparklineData={[0,0,0,0,0,0,0,0,14]}
              source=""
            />
            <MetricCard
              label="Adults without accepted photo ID"
              value="3.5m"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="disproportionately young and minority"
              sparklineData={[4.0,4.0,3.8,3.8,3.7,3.6,3.6,3.5,3.5]}
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
