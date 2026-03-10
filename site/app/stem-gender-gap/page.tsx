'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

interface StemGenderDataPoint {
  year: number
  girlsPhysicsPct: number
  girlsComputingPct: number
}

interface StemGenderData {
  topic: string
  lastUpdated: string
  timeSeries: StemGenderDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function StemGenderGapPage() {
  const [data, setData] = useState<StemGenderData | null>(null)

  useEffect(() => {
    fetch('/data/stem-gender-gap/stem_gender_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'girls-physics',
          label: 'Physics',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.girlsPhysicsPct })),
        },
        {
          id: 'girls-computing',
          label: 'Computing',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.girlsComputingPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Why Are Girls Still Underrepresented in STEM?"
          finding="Girls make up only 22% of physics A-level entrants and 16% of computing — gaps that narrow the pipeline to well-paid technical careers."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Gender gaps in STEM persist at every stage of the UK education pipeline, but the pattern is nuanced: girls outperform boys in science GCSEs and biology A-level entries are nearly equal by gender. Physics and computing diverge sharply. In 2024, girls represented 22% of A-level physics entries — up from 19% in 2015 but still leaving 78% of the subject to boys. Computing was 16% female in 2024, improved from a remarkably low 9% in 2015. The causes are structural and social rather than cognitive: meta-analyses consistently show no statistically significant ability differences between girls and boys. The divergence begins in secondary school where subject self-concept — beliefs about whether a field is &ldquo;for me&rdquo; — separates by gender, reinforced by teaching practices, department composition, career guidance that does not challenge stereotypes, and an overwhelmingly male visible presence in technology. Women now represent 38% of STEM graduates — up from 32% in 2015 — but women remain only 19% of the tech workforce and 13% of professional engineers.</p>
            <p>The workforce gap is not simply an equity issue but a quality and productivity issue: the UK is not fully utilising 50% of its population in its highest-value growth sectors, and products designed without female perspectives systematically fail to serve female users. The most effective school interventions combine female role models sharing relatable STEM pathways, project-based learning contextualising concepts in real-world applications, and teacher professional development addressing implicit bias in how subjects are taught and who they are presented as being for. The systemic challenge is that widening university participation requires a school pipeline shaped by experiences that begin in primary school and are well established by the time subject choices are made at 14.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Girls in physics A-level"
              value="22%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+3pp since 2015 · still 28pp below boys"
              sparklineData={[19, 19, 20, 20, 20, 21, 21, 22, 22]}
              source="JCQ · A-level Results by Subject and Gender 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Girls in computing A-level"
              value="16%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+7pp since 2015 · biggest growth from lowest base"
              sparklineData={[9, 10, 10, 11, 12, 13, 14, 15, 16]}
              source="JCQ · A-level Results by Subject and Gender 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Female STEM graduates"
              value="38%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+6pp since 2015 · but tech sector 19% female"
              sparklineData={[32, 33, 33, 34, 34, 35, 36, 37, 38]}
              source="HESA · Higher Education Graduate Outcomes 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Girls' participation in STEM A-levels, 2016–2024"
              subtitle="Girls as percentage of total A-level entries in physics and computing."
              series={series}
              yLabel="Female share (%)"
              source={{ name: 'JCQ', dataset: 'A-level Results by Subject and Gender', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">JCQ (Joint Council for Qualifications)</strong> — A-level and AS-level results by subject and gender. Published annually following summer results.</p>
            <p><strong className="text-wiah-black">HESA</strong> — Higher Education Graduate Outcomes Survey. STEM graduate outcomes by gender and subject area.</p>
            <p><strong className="text-wiah-black">WISE Campaign</strong> — Women in STEM Workforce 2024. Annual workforce statistics for women in science, technology, engineering and mathematics.</p>
            <p>Note: 2020 data was affected by teacher-assessed grades replacing exams — gender share figures for 2020 are estimated from provisional data.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
