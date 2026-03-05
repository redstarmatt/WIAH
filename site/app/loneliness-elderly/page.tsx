'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>Around 1.4 million people aged 65 and over in England experience chronic loneliness &mdash; defined as feeling lonely often or always over a sustained period of three months or more. This figure has grown from approximately 1.2 million in 2015, driven by an ageing population, the decline of local community infrastructure, and the loss of natural social networks through bereavement, retirement, and mobility limitations. The COVID-19 pandemic caused a spike to over 1.4 million in 2020, and numbers have not fully recovered.</p>
            <p>The health consequences of chronic loneliness are comparable in magnitude to well-established risk factors for premature death. Meta-analysis across multiple longitudinal studies, including the English Longitudinal Study of Ageing (ELSA), shows a 26% increased risk of premature mortality associated with loneliness. The biological and psychological pathways are multiple: chronic loneliness is associated with elevated cortisol, disrupted sleep, reduced immune function, and higher rates of cardiovascular disease, cognitive decline, and depression. For older adults already managing multiple long-term conditions, loneliness accelerates deterioration.</p>
            <p>One in ten people over 65 says they rarely or never see family or friends in person. For those living alone &mdash; around 3.8 million people aged 65 and over in England &mdash; the risk of social isolation is particularly acute. Bereavement is the single most common precipitant: losing a partner typically removes both the primary source of companionship and a key broker of wider social connections. Subsequent social re-engagement for bereaved older people is often dependent on voluntary sector initiatives, faith communities, or family support that is not universally available.</p>
            <p>The social prescribing framework, embedded in NHS primary care since 2019, represents the most significant policy response to loneliness in recent years. Link workers based in GP practices can refer patients to community activities, befriending services, and social groups as a non-clinical intervention. Evidence on impact is growing but mixed: social prescribing works well for people who are mildly or moderately lonely and have mobility and transport access to activities, but is less effective for the most chronically isolated, who often face compound barriers including poverty, disability, and rural isolation.</p>
            <p>Digital connection has been promoted as a partial solution, particularly following the pandemic. While video calling, online communities, and social media can supplement face-to-face contact for digitally confident older people, they are less accessible to those with the highest rates of loneliness, who are disproportionately older, less educated, and have lower digital literacy. A significant proportion of the over-75 population does not have access to the internet or a device capable of video calling, making digital substitution for in-person connection a partial answer at best.</p>
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
              onExpand={() => {}}
              source="Age UK &middot; ELSA &middot; ONS"
            />
            <MetricCard
              label="Rarely see family or friends"
              value="1 in 10"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="9&ndash;11% over-65s affected"
              sparklineData={[9, 9, 9, 10, 10, 11, 10, 10, 10]}
              onExpand={() => {}}
              source="ONS &middot; Community Life Survey"
            />
            <MetricCard
              label="Increased premature death risk"
              value="26%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Meta-analysis of loneliness studies"
              sparklineData={[26, 26, 26, 26, 26, 26, 26, 26, 26]}
              onExpand={() => {}}
              source="Holt-Lunstad et al &middot; ELSA"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Elderly loneliness prevalence, 2015&ndash;2024"
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
            <p>Age UK &mdash; Loneliness in Later Life. ageuk.org.uk/information-advice/health-wellbeing/loneliness/</p>
            <p>Campaign to End Loneliness &mdash; Loneliness Measurement Framework for the UK. campaigntoendloneliness.org/loneliness-research/</p>
            <p>ELSA &mdash; English Longitudinal Study of Ageing. Biennial longitudinal survey of adults aged 50+. elsa-project.ac.uk/</p>
            <p>ONS &mdash; Characteristics and circumstances associated with loneliness. ons.gov.uk/peoplepopulationandcommunity/wellbeing</p>
            <p>Chronic loneliness defined as often or always lonely for 3+ months. Figures derived from ELSA biennial surveys and ONS Community Life Survey with interpolation between survey years. Risk increase figure from Holt-Lunstad et al meta-analysis. Family contact frequency from ONS Community Life Survey.</p>
          </div>
        </section>
      </main>
    </>
  )
}
