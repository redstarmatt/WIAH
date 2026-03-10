'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface NhsDentistryData {
  coursesTreatment: Array<{ year: number; millions: number }>
  adultAccess: Array<{ year: number; percentSeen: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function NhsDentistryAccessPage() {
  const [data, setData] = useState<NhsDentistryData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-dentistry-access/nhs_dentistry_access.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const treatmentSeries: Series[] = data
    ? [{
        id: 'courses',
        label: 'Courses of treatment (millions)',
        colour: '#E63946',
        data: data.coursesTreatment.map(d => ({
          date: yearToDate(d.year),
          value: d.millions,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="NHS Dental Access" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Dental Access"
          question="Can you actually get an NHS dentist?"
          finding="43 million adults in England cannot access an NHS dentist when they need one. The number of NHS dental treatments completed has fallen by 4.7 million since 2019/20, and has never recovered from COVID."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS dental treatment completions fell from 30.1 million courses in 2019/20 to 25.4 million in 2022/23 — a reduction of 4.7 million treatments a year that has not recovered despite three years since the COVID-19 pandemic. Around 43 million adults in England, roughly 77% of the adult population, cannot get an NHS dental appointment when they need one; in some areas no NHS surgery accepts new adult patients at all. The structural cause is the Unit of Dental Activity (UDA) contract introduced in 2006, which pays the same whether a dentist provides a check-up or complex multi-appointment treatment, creating strong incentives to see simpler cases privately and abandon NHS work. NHS England&rsquo;s Dentistry Recovery Plan (2023) introduced a &ldquo;golden hello&rdquo; payment and increased UDA values, but critics argue full contract reform is necessary — the share of adults seen within two years stood at 46.1% in 2022/23 against 54.9% pre-pandemic.</p>
            <p>Unmet need translates directly into harm. Hospital admissions for dental conditions treatable in primary care have risen, children miss school due to dental pain, and the private market that fills the gap is unaffordable for large parts of the population. Rural and coastal communities — parts of Cornwall, North Yorkshire, and Lincolnshire — report dental deserts where patients travel 50 or more miles for NHS care. Deprivation compounds access: the most deprived communities have both the highest dental need and the lowest availability of NHS provision.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Treatments Completed' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults unable to access NHS dentist"
              value="43m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Out of 56m adults in England · 77% unable to get NHS appointment"
              sparklineData={[35, 37, 38, 40, 43, 43]}
              href="#sec-chart"source="NHS England survey · 2023"
            />
            <MetricCard
              label="Courses of treatment completed"
              value="25.4m"
              unit="per yr"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 30.1m in 2019/20 · not yet recovered from COVID"
              sparklineData={[29.8, 30.2, 30.5, 30.1, 17.0, 21.3, 23.7, 25.4]}
              href="#sec-chart"source="NHS Business Services Authority · 2022/23"
            />
            <MetricCard
              label="Adults seen in last 2 years"
              value="46.1"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 54.9% peak in 2018 · COVID wiped out gains"
              sparklineData={[52.7, 54.1, 53.8, 54.9, 38.2, 43.6, 46.1]}
              href="#sec-chart"source="NHS Digital · 2022/23"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS dental courses of treatment completed, England"
              subtitle="Total courses of NHS dental treatment per year (millions). COVID-19 caused a sharp 2020 collapse that has not fully recovered."
              series={treatmentSeries}
              yLabel="Millions of courses"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'NHS Dental Statistics for England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Business Services Authority — NHS Dental Statistics for England. Annual publication. nhsbsa.nhs.uk/statistical-collections/dental-statistics</p>
            <p>NHS England — Dentistry Recovery Plan 2023. england.nhs.uk/long-read/nhs-dentistry-recovery-plan</p>
            <p>Courses of treatment represent a period of NHS dental care, from the first appointment to when the dentist certifies the treatment is complete. One course may include multiple appointments. Adult access is measured as the percentage of adults (aged 18+) who have received at least one course of NHS dental treatment in the preceding 24-month period.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
