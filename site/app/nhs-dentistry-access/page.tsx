'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>The collapse in NHS dental access is one of the most visible failures of NHS provision in England. In 2019/20, NHS dentists completed 30.1 million courses of treatment. By 2022/23, this had fallen to 25.4 million &mdash; a reduction of 4.7 million treatments a year. More than three years after the COVID-19 pandemic disrupted dental services, access has not recovered to pre-pandemic levels, and the underlying structural problems in NHS dentistry mean a full recovery may not be achievable without significant reform.</p>
            <p>The scale of unmet need is vast. Surveys suggest that 43 million adults in England &mdash; around 77% of the adult population &mdash; cannot get an NHS dental appointment when they need one. In some areas, no NHS dental surgery is accepting new adult patients at all. The consequences are predictable and measurable: hospital admissions for dental conditions that could have been treated in primary care, people pulling their own teeth, children missing school due to dental pain, and a growing market for private dental care that is simply unaffordable for a large proportion of the population.</p>
            <p>The Unit of Dental Activity (UDA) system &mdash; the NHS dental contract introduced in 2006 &mdash; is widely identified as the structural cause of declining access. UDAs pay dentists the same for a simple check-up as for a complex multi-appointment treatment. This creates strong financial incentives to see more patients for simpler treatments and strong disincentives to take on patients with complex needs, especially those who have not seen a dentist for years and have accumulated problems. Dentists leaving the NHS to work privately are often doing so not out of greed but because the NHS contract makes it economically impossible to deliver high-quality care.</p>
            <p>Rural and coastal communities are disproportionately affected by NHS dental deserts &mdash; areas where no NHS dentist is accepting patients. These tend to be areas where NHS dental practices were historically marginal businesses, where population is dispersed, and where recruitment of dental professionals is hardest. In some parts of Cornwall, North Yorkshire, and Lincolnshire, people are travelling 50 or more miles to access an NHS dentist or simply going without.</p>
            <p>NHS England&rsquo;s Dentistry Recovery Plan, published in 2023, introduced some reforms including a &ldquo;golden hello&rdquo; payment for dentists taking on new patients in underserved areas, increased UDA values, and a new patient premium. These measures have been welcomed by the profession as a step in the right direction but fall well short of the contract reform that most dental analysts argue is necessary. The proportion of adults seen by an NHS dentist in the past two years &mdash; the key access measure &mdash; stood at 46.1% in 2022/23, compared to 54.9% before the pandemic. Restoring access to pre-pandemic levels, let alone improving it, remains a distant prospect under the current funding settlement.</p>
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
              changeText="Out of 56m adults in England &middot; 77% unable to get NHS appointment"
              sparklineData={[35, 37, 38, 40, 43, 43]}
              onExpand={() => {}}
              source="NHS England survey &middot; 2023"
            />
            <MetricCard
              label="Courses of treatment completed"
              value="25.4m"
              unit="per yr"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 30.1m in 2019/20 &middot; not yet recovered from COVID"
              sparklineData={[29.8, 30.2, 30.5, 30.1, 17.0, 21.3, 23.7, 25.4]}
              onExpand={() => {}}
              source="NHS Business Services Authority &middot; 2022/23"
            />
            <MetricCard
              label="Adults seen in last 2 years"
              value="46.1"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 54.9% peak in 2018 &middot; COVID wiped out gains"
              sparklineData={[52.7, 54.1, 53.8, 54.9, 38.2, 43.6, 46.1]}
              onExpand={() => {}}
              source="NHS Digital &middot; 2022/23"
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
            <p>NHS Business Services Authority &mdash; NHS Dental Statistics for England. Annual publication. nhsbsa.nhs.uk/statistical-collections/dental-statistics</p>
            <p>NHS England &mdash; Dentistry Recovery Plan 2023. england.nhs.uk/long-read/nhs-dentistry-recovery-plan</p>
            <p>Courses of treatment represent a period of NHS dental care, from the first appointment to when the dentist certifies the treatment is complete. One course may include multiple appointments. Adult access is measured as the percentage of adults (aged 18+) who have received at least one course of NHS dental treatment in the preceding 24-month period.</p>
          </div>
        </section>
      </main>
    </>
  )
}
