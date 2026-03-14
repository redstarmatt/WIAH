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
  { num: 1, name: 'Versus Arthritis / NICE', dataset: 'Chronic pain prevalence estimates', date: '2024' },
  { num: 2, name: 'Faculty of Pain Medicine', dataset: 'National pain audit and workforce survey', date: '2024' },
  { num: 3, name: 'Health and Safety Executive', dataset: 'Working days lost statistics', url: 'https://www.hse.gov.uk/statistics/', date: '2024' },
];

// -- Types ------------------------------------------------------------------

interface ChronicPainData {
  national: {
    prevalence: {
      timeSeries: Array<{ year: number; millionsAffected: number }>
    }
    workImpact: {
      timeSeries: Array<{ year: number; daysLostMillions: number }>
    }
    painClinicWait: {
      timeSeries: Array<{ year: number; weeks: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function ChronicPainPage() {
  const [data, setData] = useState<ChronicPainData | null>(null)

  useEffect(() => {
    fetch('/data/chronic-pain/chronic_pain.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const prevalenceSeries: Series[] = data
    ? [{
        id: 'prevalence',
        label: 'People with chronic pain (millions)',
        colour: '#F4A261',
        data: data.national.prevalence.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsAffected,
        })),
      }]
    : []

  const workSeries: Series[] = data
    ? [{
        id: 'work-days',
        label: 'Working days lost (millions)',
        colour: '#E63946',
        data: data.national.workImpact.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.daysLostMillions,
        })),
      }]
    : []

  const waitSeries: Series[] = data
    ? [{
        id: 'clinic-wait',
        label: 'Average wait for pain clinic (weeks)',
        colour: '#E63946',
        data: data.national.painClinicWait.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.weeks,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Chronic Pain" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Chronic Pain"
          question="Why Are 28 Million People in Pain?"
          finding="Chronic pain affects an estimated 28 million adults in the UK — more than 40% of the population. It is the leading cause of disability and costs the economy 37 million lost working days per year, yet specialist pain clinic waits average 28 weeks."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Chronic pain — pain persisting for three months or more — affects an estimated 28 million adults in the UK, up from 18 million in 2012, of whom around 8 million have severely disabling pain.<Cite nums={1} /> It is the leading reason people visit their GP, the largest single cause of work disability, and a primary driver of opioid prescribing and economic inactivity, yet receives a fraction of the research funding of conditions with comparable burden. The average wait for a specialist NHS pain clinic appointment is 28 weeks — down from a post-COVID peak of 38 weeks but still nearly seven months.<Cite nums={2} /> The Faculty of Pain Medicine estimates England needs 1,200 pain medicine consultants; it has around 450.<Cite nums={2} /> Some integrated care boards commission no standalone pain service at all.</p>
            <p>Chronic pain accounts for 36.8 million lost working days per year — more than any other health condition — and costs the economy an estimated £12–14 billion annually in lost productivity.<Cite nums={3} /> It is a major driver of the post-COVID rise in economic inactivity, with musculoskeletal and pain conditions the most commonly cited reason for long-term sickness. Prevalence is highest in the most deprived communities, mirroring almost every other health inequality, and women are disproportionately affected.<Cite nums={1} /> Community pain management programmes with a strong evidence base are patchily available and often have their own waiting lists.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-work', label: 'Work Impact' },
          { id: 'sec-waits', label: 'Clinic Waits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People with chronic pain"
              value="28"
              unit="million"
              direction="up"
              polarity="up-is-bad"
              changeText="UK, 2024 · Up from 18M in 2012 · Leading cause of disability"
              sparklineData={[18.2, 20.1, 22.4, 24.6, 25.8, 27.1, 28.0]}
              href="#sec-prevalence"/>
            <MetricCard
              label="Working days lost per year"
              value="36.8"
              unit="million"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · More than any other condition · Key driver of economic inactivity"
              sparklineData={[24.8, 26.3, 28.1, 30.4, 34.2, 36.8]}
              href="#sec-work"/>
            <MetricCard
              label="Average pain clinic wait"
              value="28"
              unit="weeks"
              direction="down"
              polarity="up-is-bad"
              changeText="2024 · Down from 38-week COVID peak · Some areas have no service"
              sparklineData={[18, 20, 22, 24, 32, 38, 34, 30, 28]}
              href="#sec-waits"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Estimated chronic pain prevalence, UK, 2012–2024"
              subtitle="Adults reporting pain lasting 3 or more months, in millions."
              series={prevalenceSeries}
              yLabel="Millions affected"
              source={{
                name: 'Versus Arthritis / NICE',
                dataset: 'Chronic pain prevalence estimates',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-work" className="mb-12">
            <LineChart
              title="Working days lost to chronic pain, UK, 2014–2024"
              subtitle="Millions of working days lost per year due to musculoskeletal and pain conditions."
              series={workSeries}
              yLabel="Days lost (millions)"
              source={{
                name: 'HSE',
                dataset: 'Health and Safety Executive, Working days lost',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart
              title="Average wait for specialist pain clinic, England, 2016–2024"
              subtitle="Weeks from referral to first appointment at a specialist pain management service."
              series={waitSeries}
              yLabel="Weeks"
              source={{
                name: 'Faculty of Pain Medicine',
                dataset: 'National pain audit and workforce survey',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Versus Arthritis / NICE — Chronic pain prevalence estimates, derived from Health Survey for England and GP practice data. Uses the broadest validated definition (pain lasting 3+ months). Retrieved March 2026.</p>
            <p>Health and Safety Executive — Working days lost statistics, from the Labour Force Survey. Musculoskeletal conditions including chronic pain. Published annually.</p>
            <p>Faculty of Pain Medicine — National pain audit and workforce survey. Pain clinic waiting times and consultant numbers. Published periodically.</p>
            <p>Prevalence estimates vary substantially by definition: 28 million uses the broadest measure (any pain 3+ months); severe and disabling chronic pain is estimated at 8 million. Work impact data combines HSE figures for musculoskeletal conditions with DWP data on health-related economic inactivity. Pain clinic wait data is incomplete as some ICBs do not commission standalone pain services.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
