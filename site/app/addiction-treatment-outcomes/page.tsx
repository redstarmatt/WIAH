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
            <p>The UK has the highest rate of drug-related deaths in Europe: 4,800 people died from drug misuse in England and Wales in 2023, near the record 4,907 set in 2022, with Scotland recording an even higher rate per capita. Drug and alcohol treatment services, commissioned by local authorities using public health grant funding, were cut significantly between 2015 and 2022 &mdash; reducing capacity precisely when deaths were rising. The 2021 Dame Carol Black review found services systematically underfunded, with waiting times rising from 3.1 to 4.1 weeks and the successful completion rate &mdash; the proportion leaving treatment free from dependency &mdash; stubbornly below 50%, at 47.4% in 2023. The government&apos;s subsequent ten-year drugs strategy committed &pound;780 million over three years to rebuild capacity, with new investment in naloxone distribution and residential rehabilitation &mdash; but workforce erosion from a decade of cuts limits how quickly services can recover.</p>
            <p>The consequences fall hardest on the most deprived. Deaths are concentrated in deprived communities, among middle-aged men, and in post-industrial areas of northern England, the Midlands, and Scotland where heroin use is tied to long-term economic marginalisation. Areas with the highest rates of drug-related harm are often those with the weakest treatment infrastructure, a legacy that additional spending cannot reverse in two or three years. The evidence base for effective treatment &mdash; opiate substitution therapy, naloxone, naltrexone &mdash; is strong; the barrier is resource, workforce capacity, and a discourse that has historically treated addiction as a moral failing rather than a health condition.</p>
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
              href="#sec-chart"source="OHID &middot; Drug and Alcohol Treatment Statistics 2023"
            />
            <MetricCard
              label="Drug misuse deaths 2023"
              value="4,800"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Slight fall but near record levels"
              sparklineData={[3744, 3756, 4359, 4393, 4561, 4859, 4907, 4800]}
              href="#sec-chart"source="ONS &middot; Drug Misuse Deaths 2023"
            />
            <MetricCard
              label="Average wait for treatment"
              value="4.1 wks"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 3.1 weeks in 2016"
              sparklineData={[3.1, 3.3, 3.6, 3.8, 4.2, 4.0, 4.3, 4.1]}
              href="#sec-chart"source="OHID &middot; Drug and Alcohol Treatment Statistics 2023"
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
