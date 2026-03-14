'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'HESA', dataset: 'Higher Education Student Statistics 2022-23', url: 'https://www.hesa.ac.uk/data-and-analysis/students', date: '2024', note: 'Non-continuation rates for UK-domiciled full-time first-degree students' },
  { num: 2, name: 'Office for Students', dataset: 'Access and Participation data', url: 'https://www.officeforstudents.org.uk/data-and-analysis/', date: '2024', note: 'Continuation rates by POLAR4 deprivation quintile' },
  { num: 3, name: 'NUS', dataset: 'Estimated student living costs', url: 'https://www.nus.org.uk', date: '2024' },
];

interface UniversityDropoutDataPoint {
  year: number
  dropoutRatePct: number
  disadvantagedDropoutPct: number
}

interface UniversityDropoutData {
  topic: string
  lastUpdated: string
  timeSeries: UniversityDropoutDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function UniversityDropoutRatesPage() {
  const [data, setData] = useState<UniversityDropoutData | null>(null)

  useEffect(() => {
    fetch('/data/university-dropout-rates/university_dropout_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'all-students',
          label: 'All students',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.dropoutRatePct })),
        },
        {
          id: 'disadvantaged-students',
          label: 'Disadvantaged students',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.disadvantagedDropoutPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many Students Are Dropping Out of University?"
          finding="6.3% of UK university students drop out in their first year, with rates of 12% among disadvantaged students — driven sharply upward by cost of living pressures."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>HESA data for 2022–23 shows a non-continuation rate (students not returning after year one) of 6.3% across UK higher education — up from 5.1% in 2019 — with 32,000 students withdrawing in 2023 compared to around 24,000 pre-pandemic.<Cite nums={1} /> The cost of living crisis is directly implicated: the maximum maintenance loan for students outside London (£10,227) falls below the NUS estimated living cost of £12,600 per year, and students from lower-income backgrounds are most likely to receive the maximum loan with least family support to bridge the gap.<Cite nums={3} /> Post-1992 institutions, where disadvantaged students are concentrated, have higher dropout rates than pre-1992 universities. The OfS's B conditions on continuation, retention and completion now require institutional accountability for dropout rates.<Cite nums={2} /></p>
            <p>The deprivation gap is stark and widening. Students from the most deprived quintile have a non-continuation rate of 12% — nearly three times the 4.5% for those from the least deprived areas.<Cite nums={2} /> First-generation university attenders have non-continuation rates approximately double those of students whose parents also attended. Working part-time while studying — common among lower-income students bridging the maintenance gap — constrains study time and correlates with worse academic outcomes and higher withdrawal rates. The financial structure of the system creates a compounding disadvantage: the students most likely to leave without graduating are also those who entered with the greatest financial burden.</p>
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
              label="First-year dropout rate"
              value="6.3%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+1.2pp since 2020 · cost of living driver"
              sparklineData={[4.8, 4.9, 5.0, 5.1, 5.2, 5.5, 5.8, 6.0, 6.3]}
              source="HESA · Higher Education Student Statistics 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Dropout rate, disadvantaged students"
              value="12%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="12% vs 4.5% advantaged · widening gap"
              sparklineData={[8.5, 8.8, 9.0, 9.2, 9.5, 10.0, 10.8, 11.4, 12.0]}
              source="HESA · Higher Education Student Statistics 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Students withdrawn 2023"
              value="32,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+8,000 vs pre-pandemic"
              sparklineData={[20000, 21000, 22000, 24000, 25000, 27000, 28000, 30000, 32000]}
              source="HESA · Higher Education Student Statistics 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="University first-year dropout rates, 2016–2024"
              subtitle="Percentage of first-year students not continuing to second year, by student background."
              series={series}
              yLabel="Non-continuation rate (%)"
              source={{ name: 'HESA', dataset: 'Higher Education Student Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">HESA</strong> — Higher Education Student Statistics. Annual non-continuation data for UK-domiciled full-time first-degree students at English HE providers.</p>
            <p><strong className="text-wiah-black">Office for Students</strong> — Access and Participation data. Continuation rates by POLAR4 deprivation quintile.</p>
            <p>Note: POLAR4 deprivation quintile methodology may slightly undercount disadvantage in urban areas compared with IMD-based measures.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
