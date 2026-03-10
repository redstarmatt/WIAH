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
          finding="Hospices provide care for over 200,000 people each year but receive just 27% of their funding from the NHS — the rest comes from charity shops, donations, and fundraising. Only 48% of people die in their preferred place."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 600,000 people die in England each year, the majority from expected conditions including cancer, heart failure, and dementia. England's approximately 200 hospices care for over 200,000 people annually, but the NHS contributes just 27% of hospice income — down from 32% a decade ago — leaving the remaining 73% to donations, charity shops, and fundraising. Hospice UK estimates a collective sector deficit of £77 million per year, with some hospices at risk of closure. Specialist palliative care referrals have risen from 188,000 in 2014 to 274,000 in 2024 as the population ages, but the workforce is not keeping pace: there are only around 600 palliative medicine consultants in England and specialist nursing vacancies are high.</p>
            <p>Access is unequal in ways that compound existing NHS inequalities. People dying from heart failure, COPD, or dementia receive specialist palliative care far less often than cancer patients, despite comparable symptom burden. Black and Asian patients are significantly less likely to be referred to hospice services. The proportion dying in their usual place of residence — the outcome most people say they want — peaked at 52% during COVID and has since fallen back to around 48%. Some ICBs commission 24/7 community palliative care; others have no out-of-hours provision, meaning those who become acutely unwell at night frequently end in A&amp;E — the place most people say they least want to die.</p>
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
              changeText="2024 · Down from 32% in 2014 · 73% funded by charity"
              sparklineData={[32, 31, 30, 29, 28, 28, 34, 31, 29, 28, 27]}
              href="#sec-funding"/>
            <MetricCard
              label="Deaths in usual place of residence"
              value="47.5"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="2024 · Peaked at 52% during COVID · Most people want to die at home"
              sparklineData={[45.2, 46.0, 46.8, 47.1, 47.5, 47.6, 52.4, 49.1, 48.3, 47.8, 47.5]}
              href="#sec-place"/>
            <MetricCard
              label="Palliative care referrals"
              value="274K"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Up 46% since 2014 · Demand growing faster than capacity"
              sparklineData={[188, 195, 203, 210, 218, 224, 231, 242, 251, 262, 274]}
              href="#sec-referrals"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            <LineChart
              title="NHS share of hospice income, England, 2014–2024"
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
              title="Deaths in usual place of residence, England, 2014–2024"
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
              title="Specialist palliative care referrals, England, 2014–2024"
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
            <p>Hospice UK — Hospice accounts and funding data. Annual survey covering approximately 75–85% of hospices in England. NHS funding share as proportion of total income. Retrieved March 2026.</p>
            <p>ONS — Deaths registered by place of occurrence, England. &ldquo;Usual place of residence&rdquo; includes own home and care homes. Published annually.</p>
            <p>NHS England — Palliative and end of life care profiles (OHID Fingertips). Referral and activity data from commissioner returns. Retrieved March 2026.</p>
            <p>The COVID period (2020–2021) saw a temporary increase in both NHS hospice funding and proportion of deaths at home, reflecting emergency government support and hospital avoidance. Neither shift was sustained. Referral data reflects specialist palliative care only; generalist palliative care provided by GPs, district nurses, and care home staff is not captured.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
