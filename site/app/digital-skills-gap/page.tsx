'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface DigitalSkillsDataPoint {
  year: number
  adultsLackingSkillsM: number
  jobsRequiringDigitalPct: number
}

interface DigitalSkillsData {
  topic: string
  lastUpdated: string
  timeSeries: DigitalSkillsDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function DigitalSkillsGapPage() {
  const [data, setData] = useState<DigitalSkillsData | null>(null)

  useEffect(() => {
    fetch('/data/digital-skills-gap/digital_skills_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'adults-lacking-skills',
          label: 'Adults lacking essential digital skills (millions)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.adultsLackingSkillsM })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Does Britain Have Enough Digital Skills?"
          finding="12.6 million UK adults lack essential digital skills, while 82% of job vacancies now require some digital competency — leaving a third of the working-age population at risk."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s digital skills gap is a persistent structural challenge that sits at the intersection of education, employment, and economic productivity. The Good Things Foundation&apos;s 2024 Lloyds Bank UK Consumer Digital Index defines essential digital skills as the ability to communicate online, handle information and content, transact online, solve problems using digital tools, and be safe online. By this definition, approximately 12.6 million UK adults — roughly 23% of the adult population — lack one or more of these essential skills. This group is disproportionately composed of older adults, people with low formal educational attainment, disabled people, and those in lower-income households.</p>
            <p>The mismatch between skills supply and labour market demand has grown sharply. The proportion of job vacancies explicitly requiring some digital competency has risen from 67% in 2018 to 82% in 2024, driven by the digitalisation of operations across all sectors. Even traditionally non-digital roles — care work, logistics, construction — increasingly require basic digital literacy for scheduling, reporting, and compliance. The automation wave associated with AI and machine learning is accelerating this trend: roles that survive automation will disproportionately require digital fluency, while roles most at risk of displacement are those currently held by workers with the least digital skill.</p>
            <p>The digital skills gap has a significant geographic dimension. Digital exclusion rates are higher in coastal communities, post-industrial towns, and rural areas — both because the population skews older and because broadband connectivity has historically been poorer. The rollout of gigabit-capable broadband — reaching 65% of UK premises by 2024 — is a necessary precondition for digital participation but not sufficient: people who lack devices, skills, or confidence will not benefit from faster internet. The government&apos;s Digital Inclusion Strategy, published in 2023, identified 10 million people as needing support to improve their digital capabilities and set targets for improvement.</p>
            <p>The education pipeline is improving but slowly. Computer science is now a core national curriculum subject at Key Stage 3 and 4, GCSE Computer Science entries have grown significantly, and A-level Computing numbers are rising. T Levels in Digital were introduced from 2021 as a vocational alternative. Apprenticeships in data and AI are growing in number. But these pipeline improvements take a decade or more to address the existing adult skills deficit: the 12.6 million adults who currently lack basic digital skills cannot wait for the educational pipeline to renew the workforce. Adult digital skills provision — through colleges, libraries, community organisations, and employer programmes — is the necessary complement.</p>
            <p>Employer investment in digital skills training has increased but remains patchy. Large employers in financial services, technology, and professional services have invested substantially in upskilling programmes, sometimes in partnership with Further Education colleges. SMEs — which represent the majority of employment — typically have neither the resource nor the HR infrastructure to run systematic digital skills programmes. The government&apos;s Digital Skills Bootcamps — intensive short courses funded by DfE and delivered by private providers — had supported approximately 43,000 learners by 2024, a fraction of the scale needed. The longer-term challenge is to embed digital skills development as a normal part of working life, as routine as health and safety training, rather than a special initiative requiring extra motivation and effort from individuals.</p>
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
              label="Adults lacking basic digital skills"
              value="12.6m"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down from 14.5m in 2018 · pace slowing"
              sparklineData={[14.5, 14.2, 13.9, 13.7, 13.5, 13.3, 13.1, 12.9, 12.6]}
              source="Lloyds Bank UK Consumer Digital Index 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Jobs requiring digital skills"
              value="82%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+15pp since 2018 · AI accelerating demand"
              sparklineData={[67, 68, 70, 71, 73, 75, 77, 80, 82]}
              source="DCMS / Burning Glass Labour Insight 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Digital skills salary premium"
              value="29%"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+29% wage premium for high-digital roles"
              sparklineData={[18, 19, 20, 21, 22, 24, 26, 27, 29]}
              source="DCMS · UK Digital Strategy Evaluation 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Adults lacking essential digital skills, 2016–2024"
              subtitle="Estimated number of adults without one or more essential digital skills (millions)."
              series={series}
              yLabel="Adults (millions)"
              source={{ name: 'Lloyds Bank', dataset: 'UK Consumer Digital Index', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">Lloyds Bank / Good Things Foundation</strong> — UK Consumer Digital Index 2024. Annual survey of 4,000+ UK adults measuring digital skills, access, and motivation.</p>
            <p><strong className="text-wiah-black">DCMS / Burning Glass Technologies</strong> — Labour Insight job postings analysis 2024. Digital skills requirements extracted from 16 million UK job vacancies.</p>
            <p><strong className="text-wiah-black">DCMS</strong> — UK Digital Strategy Evaluation 2024. Salary premium analysis based on ONS Annual Survey of Hours and Earnings matched to digital occupation codes.</p>
            <p>Note: The Essential Digital Skills framework was updated in 2021, creating a slight discontinuity in the time series.</p>
          </div>
        </section>
      </main>
    </>
  )
}
