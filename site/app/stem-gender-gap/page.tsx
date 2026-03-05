'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>Gender gaps in STEM education — science, technology, engineering, and mathematics — persist at every stage of the education pipeline in the UK. The pattern is nuanced: girls outperform boys in science GCSEs, and biology A-level entries are nearly equal by gender. But physics, computing, and engineering diverge sharply. In 2024, girls represented 22% of A-level physics entries — up from 19% in 2015 but still leaving 78% of the subject to boys. Computing A-level is even more skewed: girls were 16% of 2024 entrants, though this is a significant improvement on 9% in 2015, driven partly by the inclusion of digital and data topics that broaden the perceived relevance of the subject.</p>
            <p>The causes of gender gaps in STEM are structural and social rather than cognitive. Large-scale meta-analyses consistently show no statistically significant differences in mathematical ability between girls and boys. The divergence begins in secondary school, where subject self-concept — beliefs about whether a subject is &apos;for me&apos; — diverges by gender. Girls in the UK are significantly less likely than boys to describe themselves as &apos;good at physics&apos; or &apos;interested in computing&apos; even when their test scores are identical. This pattern is reinforced by teaching practices, by the gender composition of subject departments, by career guidance that does not actively challenge gender stereotypes, and by the overwhelmingly male visible presence in technology industries.</p>
            <p>The educational pipeline gap translates directly into workforce gaps. Women represent 19% of the UK tech workforce, 13% of engineers in professional engineering roles, and 26% of computing and mathematical professionals. These proportions have improved over the past decade but are far below gender parity. The consequence is both a productivity loss — the UK is not fully utilising the potential of 50% of the population in its most high-value and high-growth sectors — and a diversity loss — products and systems designed without female perspectives embedded in the design process systematically fail to serve female users optimally. The technology sector&apos;s gender gap is not simply an equity issue but a quality and innovation issue.</p>
            <p>Interventions at school level have shown mixed but generally positive results where sustained and well-designed. The WISE (Women into Science and Engineering) campaign, Tomorrow&apos;s Engineers, Raspberry Pi Foundation&apos;s educational programmes, and Code First Girls have all increased exposure to STEM for girls and young women. The most effective interventions combine three elements: female role models who share relatable pathways into STEM; hands-on project-based learning that contextualises abstract concepts in real-world applications relevant to a broad range of interests; and teacher professional development that addresses implicit bias in how STEM subjects are taught and who they are presented as being for.</p>
            <p>The gender gap in higher education STEM has narrowed somewhat faster than at school level. Women now represent 38% of STEM graduates — up from 32% in 2015 — with particular growth in biological sciences, environmental science, and mathematics. The remaining gaps are most acute in computing, electronic engineering, and mechanical engineering. University Computer Science departments have implemented targeted outreach and female mentoring programmes, and some have seen notable improvements in female entry rates. The systemic challenge is that widening participation at university requires a pipeline of girls choosing STEM subjects at school — and that pipeline is shaped by experiences and perceptions that begin in primary school and are well established by the time subject choices are made at 14.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Girls in computing A-level"
              value="16%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+7pp since 2015 · biggest growth from lowest base"
              sparklineData={[9, 10, 10, 11, 12, 13, 14, 15, 16]}
              source="JCQ · A-level Results by Subject and Gender 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Female STEM graduates"
              value="38%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+6pp since 2015 · but tech sector 19% female"
              sparklineData={[32, 33, 33, 34, 34, 35, 36, 37, 38]}
              source="HESA · Higher Education Graduate Outcomes 2024"
              onExpand={() => {}}
            />
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
      </main>
    </>
  )
}
