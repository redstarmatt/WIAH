'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface RefugeeMentalHealthSupportData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    traumaHistoryPct: number
    accessingSpecialistPct: number
    avgIaptWaitWeeks: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function RefugeeMentalHealthSupportPage() {
  const [data, setData] = useState<RefugeeMentalHealthSupportData | null>(null)

  useEffect(() => {
    fetch('/data/refugee-mental-health-support/refugee_mental_health_support.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const accessSeries: Series[] = data
    ? [
        {
          id: 'traumaHistory',
          label: 'With trauma history (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.traumaHistoryPct,
          })),
        },
        {
          id: 'accessingSpecialist',
          label: 'Accessing specialist support (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.accessingSpecialistPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Refugee Mental Health Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Refugee Mental Health Support"
          question="Are refugees getting mental health support in England?"
          finding="68% of refugees in England have a trauma history, yet only 15% can access specialist mental health support."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Refugees and asylum seekers arriving in England carry disproportionately high rates of trauma. Research across clinical and community samples consistently finds 65&ndash;70% have experienced one or more traumatic events including war, torture, sexual violence, bereavement, or dangerous migration journeys. Post-Traumatic Stress Disorder (PTSD), depression, and anxiety are significantly more prevalent in this population than in the general public, and the stresses of the asylum process &mdash; uncertainty about status, poor accommodation, restricted work rights, and potential destitution &mdash; compound pre-existing mental health difficulties.</p>
            <p>Access to specialist mental health support for refugees and asylum seekers is severely limited. Only around 15% of those with clinical need access services. Multiple barriers compound each other: language and communication, lack of awareness of available services, cultural differences in how distress is expressed and conceptualised, GP gatekeeping, and the specific barriers created by insecure immigration status. Asylum seekers are entitled to NHS care on the same basis as UK residents, but in practice many encounter difficulties registering with GPs and navigating a system designed with settled residents in mind.</p>
            <p>NHS IAPT (Improving Access to Psychological Therapies) services, now rebranded as NHS Talking Therapies, are theoretically the main pathway to psychological support for common mental health conditions including PTSD, depression, and anxiety. But IAPT was designed primarily for mild-to-moderate conditions in the general population, and its evidence base and practitioner training are less well aligned with trauma presentations of the severity commonly found in refugee populations. Complex PTSD, in particular, requires trauma-focused therapies delivered by practitioners with specific training that is not uniformly available in IAPT or community mental health team settings.</p>
            <p>Specialist refugee mental health services &mdash; such as those provided by Freedom from Torture and the Helen Bamber Foundation &mdash; offer highly skilled trauma therapy alongside social and legal support, but their capacity is a small fraction of the need. Referral pathways to these organisations from NHS services are inconsistent, and many people who would benefit never reach them. Wait times even at specialist services have grown as demand has increased.</p>
            <p>The interaction between mental health and the asylum determination process is clinically significant. Mental health conditions can impair an individual&apos;s ability to give coherent, consistent testimony about their experiences &mdash; the testimony on which Home Office asylum decisions are based. Without mental health treatment and medico-legal reports that contextualise the impact of trauma on memory and narration, individuals with strong cases may be refused asylum. The Joint Presidential Guidance on vulnerable witnesses provides some protection, but its application is inconsistent.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Service Access' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Refugees with trauma history"
              value="68%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Consistent across clinical studies"
              sparklineData={[65, 66, 66, 67, 67, 67, 68, 68, 68]}
              onExpand={() => {}}
              source="Refugee Council &middot; Mind &middot; British Red Cross"
            />
            <MetricCard
              label="Accessing specialist support"
              value="15%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 18% in 2016"
              sparklineData={[18, 17, 16, 16, 15, 15, 15, 15, 15]}
              onExpand={() => {}}
              source="NHS Digital &middot; Refugee Council"
            />
            <MetricCard
              label="Average wait for IAPT"
              value="18 wks"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 10 weeks in 2016"
              sparklineData={[10, 11, 12, 13, 16, 17, 18, 18, 18]}
              onExpand={() => {}}
              source="NHS Digital &middot; Talking Therapies report"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Refugee mental health service access, 2016&ndash;2024"
              subtitle="Percentage of refugees in England with trauma history and percentage accessing specialist mental health support."
              series={accessSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'IAPT Dataset and Refugee Council research',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Refugee Council &mdash; Mental health and wellbeing research. refugeecouncil.org.uk/our-work/research/mental-health/</p>
            <p>NHS Digital &mdash; Improving Access to Psychological Therapies (IAPT) Dataset. digital.nhs.uk/data-and-information/publications/statistical/psychological-therapies-report-on-the-use-of-iapt-services</p>
            <p>Mind &mdash; Refugees and mental health. mind.org.uk</p>
            <p>British Red Cross &mdash; Access to services for people seeking asylum. redcross.org.uk/about-us/what-we-do/uk-services/</p>
            <p>UNHCR &mdash; Global Trends: Forced Displacement. unhcr.org/global-trends</p>
            <p>Trauma history prevalence is derived from a systematic review of clinical and community research on refugees in the UK. Specialist support access includes NHS IAPT, CMHT contacts, and voluntary sector specialist services. Administrative recording of refugee status in NHS systems is incomplete; figures should be treated as estimates.</p>
          </div>
        </section>
      </main>
    </>
  )
}
