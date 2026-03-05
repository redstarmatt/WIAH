'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  successfulCompletionsPct: number
  drugDeaths: number
  avgWaitWeeks: number
}

interface AddictionTreatmentData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function AddictionTreatmentOutcomesPage() {
  const [data, setData] = useState<AddictionTreatmentData | null>(null)

  useEffect(() => {
    fetch('/data/addiction-treatment-outcomes/addiction_treatment_outcomes.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const outcomeSeries: Series[] = data
    ? [
        {
          id: 'drugdeaths',
          label: 'Drug misuse deaths',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.drugDeaths })),
        },
        {
          id: 'completions',
          label: 'Successful completions (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.successfulCompletionsPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Addiction Treatment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Addiction Treatment"
          question="Is Drug and Alcohol Treatment Working?"
          finding="Only 47% of people completing drug or alcohol treatment achieve sustained recovery, and over 4,900 died from drug misuse in 2023."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has the highest rate of drug-related deaths in Europe. In 2023, 4,800 people died from drug misuse in England and Wales &mdash; a slight fall from the record 4,907 in 2022 but still close to the highest figures ever recorded. Scotland, measured separately, has an even higher rate per capita. The deaths are not evenly distributed: they are concentrated in deprived communities, among middle-aged men, and disproportionately in post-industrial areas of the north of England, the Midlands, and Scotland where heroin use is associated with long-term economic marginalisation.</p>
            <p>Drug and alcohol treatment services in England are commissioned by local authorities using public health grant funding. The grant was cut significantly in real terms between 2015 and 2022, reducing treatment capacity at precisely the period when drug deaths were rising sharply. The 2021 Dame Carol Black review of drugs policy found that treatment services were systematically underfunded, with waiting times rising, workforce quality declining, and recovery outcomes deteriorating. The government&apos;s subsequent ten-year drugs strategy committed additional funding &mdash; £780 million over three years &mdash; with a target to rebuild treatment capacity.</p>
            <p>The successful completion rate &mdash; the proportion of people who complete treatment free from dependency &mdash; has hovered stubbornly below 50% throughout the period, at 47.4% in 2023. This figure masks significant variation by substance: completion rates for alcohol treatment are higher than for opioid treatment, where the complexity of addiction, social circumstances, and health co-morbidities makes sustained recovery harder to achieve. Average waiting times grew from 3.1 weeks in 2016 to 4.1 weeks in 2023, a modest but meaningful increase in a service where prompt access is associated with better engagement.</p>
            <p>The evidence base for effective treatment is strong. Opiate substitution therapy &mdash; methadone and buprenorphine &mdash; reduces mortality, reduces crime, and provides a platform for recovery. Naloxone distribution prevents overdose deaths. These interventions are cost-effective. The challenge is not lack of evidence but lack of resource, lack of workforce capacity, and a political and public discourse that has historically treated addiction as a moral failing rather than a health condition.</p>
            <p>The ten-year drugs strategy is beginning to show results in some areas. New investment has expanded treatment capacity, including in residential rehabilitation settings that were previously inaccessible to people without financial resources. But the geography of provision remains deeply unequal. Areas with the highest rates of drug-related harm are often the same areas with the weakest treatment infrastructure &mdash; a legacy of decades of underinvestment that cannot be reversed in two or three years of additional spending.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Outcomes' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Successful treatment completions"
              value="47.4%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Slight improvement &middot; still below 50%"
              sparklineData={[49.2, 48.6, 48.1, 47.9, 46.3, 46.0, 47.1, 47.4]}
              onExpand={() => {}}
              source="OHID &middot; Drug and Alcohol Treatment Statistics 2023"
            />
            <MetricCard
              label="Drug misuse deaths 2023"
              value="4,800"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Slight fall but near record levels"
              sparklineData={[3744, 3756, 4359, 4393, 4561, 4859, 4907, 4800]}
              onExpand={() => {}}
              source="ONS &middot; Drug Misuse Deaths 2023"
            />
            <MetricCard
              label="Average wait for treatment"
              value="4.1 wks"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 3.1 weeks in 2016"
              sparklineData={[3.1, 3.3, 3.6, 3.8, 4.2, 4.0, 4.3, 4.1]}
              onExpand={() => {}}
              source="OHID &middot; Drug and Alcohol Treatment Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Drug misuse deaths and treatment completion rates, 2016&ndash;2023"
              subtitle="Deaths from drug misuse in England and Wales (left scale) and % of treatment episodes ending in successful completion (right scale)."
              series={outcomeSeries}
              yLabel="Deaths / Completion %"
              source={{
                name: 'ONS / OHID',
                dataset: 'Drug Misuse Deaths and Treatment Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Deaths Related to Drug Poisoning in England and Wales. Published annually. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoninginenglandandwales</p>
            <p>OHID &mdash; Adult Substance Misuse Treatment Statistics. Published annually. fingertips.phe.org.uk/profile/drugs-alcohol</p>
            <p>Drug misuse deaths include deaths where the underlying cause was drug dependence, non-dependent drug use, or accidental drug poisoning. Successful completion rate measures episodes where the person was discharged as free of dependency after completing a structured treatment programme.</p>
          </div>
        </section>
      </main>
    </>
  )
}
