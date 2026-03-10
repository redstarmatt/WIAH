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

interface LonelinessElderlyData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    chronicallyLonelyM: number
    rarelySeeFamilyPct: number
    prematureDeathRiskIncreasePct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function LonelinessElderlyPage() {
  const [data, setData] = useState<LonelinessElderlyData | null>(null)

  useEffect(() => {
    fetch('/data/loneliness-elderly/loneliness_elderly.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const lonelinessSeries: Series[] = data
    ? [
        {
          id: 'chronicallyLonely',
          label: 'Chronically lonely over-65s (millions)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.chronicallyLonelyM,
          })),
        },
        {
          id: 'rarelySeFamily',
          label: 'Rarely see family or friends (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.rarelySeeFamilyPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Elderly Loneliness" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Elderly Loneliness"
          question="How lonely are older people in England?"
          finding="1.4 million people over 65 are chronically lonely, with loneliness linked to a 26% increased risk of premature death."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 1.4 million people aged 65 and over in England experience chronic loneliness — defined as feeling lonely often or always for three months or more — up from approximately 1.2 million in 2015. Meta-analysis across multiple longitudinal studies, including ELSA, finds a 26% increased risk of premature mortality associated with chronic loneliness, with biological pathways including elevated cortisol, disrupted sleep, reduced immune function, and higher rates of cardiovascular disease and cognitive decline. One in ten people over 65 rarely or never sees family or friends in person; around 3.8 million older adults in England live alone, and bereavement is the single most common precipitant of isolation. The social prescribing framework, embedded in NHS primary care since 2019, represents the most significant policy response: link workers in GP practices can refer patients to community activities and befriending services as non-clinical interventions.</p>
            <p>The burden falls disproportionately on the most vulnerable older people, and those are precisely the ones hardest for policy to reach. Social prescribing works well for the mildly or moderately lonely with mobility and transport access; it is less effective for the most chronically isolated who face compound barriers of poverty, disability, and rural location. Digital connection — promoted as a partial solution post-pandemic — is least accessible to the over-75s with the highest isolation rates, who disproportionately lack internet access or devices. Rural areas, where transport links are poor and community infrastructure has eroded through pub, post office, and library closures, record significantly higher rates of elderly isolation than urban areas.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Loneliness Prevalence' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Over-65s chronically lonely"
              value="1.4m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 1.2m in 2015"
              sparklineData={[1.2, 1.22, 1.25, 1.28, 1.3, 1.4, 1.42, 1.39, 1.4]}
              href="#sec-chart"source="Age UK · ELSA · ONS"
            />
            <MetricCard
              label="Rarely see family or friends"
              value="1 in 10"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="9–11% over-65s affected"
              sparklineData={[9, 9, 9, 10, 10, 11, 10, 10, 10]}
              href="#sec-chart"source="ONS · Community Life Survey"
            />
            <MetricCard
              label="Increased premature death risk"
              value="26%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Meta-analysis of loneliness studies"
              sparklineData={[26, 26, 26, 26, 26, 26, 26, 26, 26]}
              href="#sec-chart"source="Holt-Lunstad et al · ELSA"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Elderly loneliness prevalence, 2015–2024"
              subtitle="Chronically lonely people aged 65+ (millions) and percentage rarely seeing family or friends, England."
              series={lonelinessSeries}
              yLabel="Value"
              source={{
                name: 'Age UK',
                dataset: 'Loneliness in Later Life',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Age UK — Loneliness in Later Life. ageuk.org.uk/information-advice/health-wellbeing/loneliness/</p>
            <p>Campaign to End Loneliness — Loneliness Measurement Framework for the UK. campaigntoendloneliness.org/loneliness-research/</p>
            <p>ELSA — English Longitudinal Study of Ageing. Biennial longitudinal survey of adults aged 50+. elsa-project.ac.uk/</p>
            <p>ONS — Characteristics and circumstances associated with loneliness. ons.gov.uk/peoplepopulationandcommunity/wellbeing</p>
            <p>Chronic loneliness defined as often or always lonely for 3+ months. Figures derived from ELSA biennial surveys and ONS Community Life Survey with interpolation between survey years. Risk increase figure from Holt-Lunstad et al meta-analysis. Family contact frequency from ONS Community Life Survey.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
