'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="Chronic pain affects an estimated 28 million adults in the UK &mdash; more than 40% of the population. It is the leading cause of disability and costs the economy 37 million lost working days per year, yet specialist pain clinic waits average 28 weeks."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Chronic pain &mdash; pain persisting for three months or more &mdash; is the most common long-term health condition in the UK. An estimated 28 million adults live with some form of chronic pain, of whom approximately 8 million have pain that is severely disabling. That figure is larger than the populations of diabetes, heart disease, and cancer combined. It is the leading reason people visit their GP, the largest single cause of work disability, and a primary driver of both opioid prescribing and economic inactivity. Yet it receives a fraction of the research funding, policy attention, and clinical infrastructure of conditions with comparable burden.</p>
            <p>The prevalence of chronic pain has been rising steadily, driven by an ageing population, increasing rates of obesity and musculoskeletal conditions, and the long-term consequences of sedentary lifestyles. Between 2012 and 2024, the estimated number of people affected rose from 18 million to 28 million. Some of this increase reflects better recognition and recording rather than a genuine epidemic, but the scale is real. The Health Survey for England consistently finds that around one in three adults report chronic pain, with the highest rates in the most deprived communities &mdash; a gradient that mirrors almost every other health inequality.</p>
            <p>Access to specialist pain services is limited and worsening. The average wait for a first appointment at an NHS pain clinic is 28 weeks &mdash; down from a post-COVID peak of 38 weeks but still nearly seven months. Some integrated care boards do not commission standalone pain management services at all, relying instead on physiotherapy and GP management. The Faculty of Pain Medicine estimates that England needs approximately 1,200 pain medicine consultants; it currently has around 450. Community-based pain management programmes, which the evidence supports as effective, are patchily available and often have their own lengthy waiting lists.</p>
            <p>The economic impact is substantial and growing. Chronic pain accounts for 36.8 million lost working days per year in the UK &mdash; more than any other health condition. It is a major contributor to the rise in economic inactivity that has characterised the post-COVID labour market: around 2.5 million people are economically inactive due to long-term sickness, and musculoskeletal and pain conditions are the most commonly cited reason. The cost to the economy is estimated at &pound;12&ndash;14 billion annually in lost productivity, with additional costs in benefits, healthcare utilisation, and social care.</p>
            <p>Data on chronic pain is poor by the standards of other major conditions. There is no national pain registry, no standardised prevalence measure in routine health surveys, and no national audit of pain services comparable to SSNAP for stroke or NACR for cardiac rehabilitation. Prevalence estimates range from 15 million to 28 million depending on the definition used, which itself reflects the condition&rsquo;s complexity: chronic pain is simultaneously a symptom of other conditions, a condition in its own right, and a driver of further ill health including depression, sleep disorders, and reduced physical function. The data presented here uses the broadest validated estimate, which counts anyone reporting pain lasting three or more months.</p>
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
              changeText="UK, 2024 &middot; Up from 18M in 2012 &middot; Leading cause of disability"
              sparklineData={[18.2, 20.1, 22.4, 24.6, 25.8, 27.1, 28.0]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Working days lost per year"
              value="36.8"
              unit="million"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; More than any other condition &middot; Key driver of economic inactivity"
              sparklineData={[24.8, 26.3, 28.1, 30.4, 34.2, 36.8]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Average pain clinic wait"
              value="28"
              unit="weeks"
              direction="down"
              polarity="up-is-bad"
              changeText="2024 &middot; Down from 38-week COVID peak &middot; Some areas have no service"
              sparklineData={[18, 20, 22, 24, 32, 38, 34, 30, 28]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Estimated chronic pain prevalence, UK, 2012&ndash;2024"
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
              title="Working days lost to chronic pain, UK, 2014&ndash;2024"
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
              title="Average wait for specialist pain clinic, England, 2016&ndash;2024"
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

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Versus Arthritis / NICE &mdash; Chronic pain prevalence estimates, derived from Health Survey for England and GP practice data. Uses the broadest validated definition (pain lasting 3+ months). Retrieved March 2026.</p>
            <p>Health and Safety Executive &mdash; Working days lost statistics, from the Labour Force Survey. Musculoskeletal conditions including chronic pain. Published annually.</p>
            <p>Faculty of Pain Medicine &mdash; National pain audit and workforce survey. Pain clinic waiting times and consultant numbers. Published periodically.</p>
            <p>Prevalence estimates vary substantially by definition: 28 million uses the broadest measure (any pain 3+ months); severe and disabling chronic pain is estimated at 8 million. Work impact data combines HSE figures for musculoskeletal conditions with DWP data on health-related economic inactivity. Pain clinic wait data is incomplete as some ICBs do not commission standalone pain services.</p>
          </div>
        </section>
      </main>
    </>
  )
}
