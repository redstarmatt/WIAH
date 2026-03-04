'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface PalliativeCareData {
  national: {
    hospiceFunding: {
      timeSeries: Array<{ year: number; nhsPct: number }>
    }
    deathsInUsualPlace: {
      timeSeries: Array<{ year: number; pct: number }>
    }
    palliativeCareReferrals: {
      timeSeries: Array<{ year: number; thousands: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function PalliativeCarePage() {
  const [data, setData] = useState<PalliativeCareData | null>(null)

  useEffect(() => {
    fetch('/data/palliative-care/palliative_care.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const fundingSeries: Series[] = data
    ? [{
        id: 'nhs-funding',
        label: 'NHS share of hospice income (%)',
        colour: '#6B7280',
        data: data.national.hospiceFunding.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.nhsPct,
        })),
      }]
    : []

  const deathsPlaceSeries: Series[] = data
    ? [{
        id: 'usual-place',
        label: 'Deaths in usual place of residence (%)',
        colour: '#2A9D8F',
        data: data.national.deathsInUsualPlace.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : []

  const referralSeries: Series[] = data
    ? [{
        id: 'referrals',
        label: 'Palliative care referrals (thousands)',
        colour: '#264653',
        data: data.national.palliativeCareReferrals.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.thousands,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Palliative Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Palliative Care"
          question="Can You Die Well in England?"
          finding="Hospices provide care for over 200,000 people each year but receive just 27% of their funding from the NHS &mdash; the rest comes from charity shops, donations, and fundraising. Only 48% of people die in their preferred place."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 600,000 people die in England each year. The majority of those deaths are expected: cancer, heart failure, respiratory disease, dementia. For most, the question is not whether they will die but how, where, and with what support. Palliative care &mdash; the medical, nursing, and psychosocial support for people approaching the end of life &mdash; is one of the areas where England has been historically strong by international standards. The UK ranks first in the Economist Intelligence Unit&rsquo;s Quality of Death Index. But that ranking reflects the availability of palliative care in principle, not in practice for everyone who needs it.</p>
            <p>England has approximately 200 hospices, providing inpatient beds, community outreach, and bereavement support. They are, in effect, a parallel healthcare system funded primarily by charity. The NHS contributes just 27% of hospice income &mdash; down from 32% a decade ago. The remaining 73% comes from donations, legacies, charity shops, and fundraising events. This model is unique in the developed world: no other comparable country relies on bake sales and charity shops to fund the care of dying people. Hospice UK estimates the sector faces a collective deficit of &pound;77 million per year, with some hospices at genuine risk of closure.</p>
            <p>Access to specialist palliative care is unequal in ways that mirror broader NHS inequalities. People with cancer are far more likely to receive specialist palliative care than those dying from heart failure, COPD, or dementia &mdash; even though the symptom burden can be comparable. People in deprived areas receive fewer community palliative care visits. Black and Asian patients are significantly less likely to be referred to hospice services, and research consistently shows they are less likely to die in their preferred place. The proportion of people dying in their &ldquo;usual place of residence&rdquo; &mdash; typically home or a care home, the outcome most people say they want &mdash; peaked at 52% during COVID and has since settled back to around 48%.</p>
            <p>The NHS Long-Term Plan mentioned palliative care but set no specific targets or funding commitments. The 2024 NICE guideline on end-of-life care recommended that all adults in the last year of life should have access to specialist palliative care if needed, but implementation relies on local commissioning decisions and varies substantially by integrated care board. Some ICBs commission 24/7 community palliative care; others have no out-of-hours provision. The consequence is that people who become acutely unwell at night or on weekends often end up in A&amp;E &mdash; the place most people say they least want to die.</p>
            <p>Demand for palliative care is growing. Referrals have increased from 188,000 in 2014 to 274,000 in 2024, driven by an ageing population and growing recognition that palliative care improves quality of life. The workforce is not keeping pace: there are approximately 600 palliative medicine consultants in England, and vacancies in specialist nursing are high. The number of people dying each year is projected to increase by 25% by 2040 due to demographic change. Without structural funding reform &mdash; moving hospice funding from charity to commissioning &mdash; the gap between need and provision will widen.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-funding', label: 'Hospice Funding' },
          { id: 'sec-place', label: 'Place of Death' },
          { id: 'sec-referrals', label: 'Referrals' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS share of hospice funding"
              value="27"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="2024 &middot; Down from 32% in 2014 &middot; 73% funded by charity"
              sparklineData={[32, 31, 30, 29, 28, 28, 34, 31, 29, 28, 27]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Deaths in usual place of residence"
              value="47.5"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="2024 &middot; Peaked at 52% during COVID &middot; Most people want to die at home"
              sparklineData={[45.2, 46.0, 46.8, 47.1, 47.5, 47.6, 52.4, 49.1, 48.3, 47.8, 47.5]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Palliative care referrals"
              value="274K"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Up 46% since 2014 &middot; Demand growing faster than capacity"
              sparklineData={[188, 195, 203, 210, 218, 224, 231, 242, 251, 262, 274]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            <LineChart
              title="NHS share of hospice income, England, 2014&ndash;2024"
              subtitle="Percentage of total hospice income from NHS commissioning. Remainder from charity and donations."
              series={fundingSeries}
              yLabel="NHS share (%)"
              source={{
                name: 'Hospice UK',
                dataset: 'Hospice accounts and funding data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-place" className="mb-12">
            <LineChart
              title="Deaths in usual place of residence, England, 2014&ndash;2024"
              subtitle="Proportion of deaths occurring at home or in a care home (the outcome most people prefer)."
              series={deathsPlaceSeries}
              yLabel="Percentage"
              source={{
                name: 'ONS',
                dataset: 'Deaths registered by place of occurrence',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-referrals" className="mb-12">
            <LineChart
              title="Specialist palliative care referrals, England, 2014&ndash;2024"
              subtitle="Annual referrals to specialist palliative care services, in thousands."
              series={referralSeries}
              yLabel="Referrals (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Palliative and end of life care profiles',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Hospice UK &mdash; Hospice accounts and funding data. Annual survey covering approximately 75&ndash;85% of hospices in England. NHS funding share as proportion of total income. Retrieved March 2026.</p>
            <p>ONS &mdash; Deaths registered by place of occurrence, England. &ldquo;Usual place of residence&rdquo; includes own home and care homes. Published annually.</p>
            <p>NHS England &mdash; Palliative and end of life care profiles (OHID Fingertips). Referral and activity data from commissioner returns. Retrieved March 2026.</p>
            <p>The COVID period (2020&ndash;2021) saw a temporary increase in both NHS hospice funding and proportion of deaths at home, reflecting emergency government support and hospital avoidance. Neither shift was sustained. Referral data reflects specialist palliative care only; generalist palliative care provided by GPs, district nurses, and care home staff is not captured.</p>
          </div>
        </section>
      </main>
    </>
  )
}
