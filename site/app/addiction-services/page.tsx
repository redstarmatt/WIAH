'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface AddictionPoint {
  date: string
  drugDeaths: number
  treatmentThousands: number
}

interface AddictionData {
  national: {
    timeSeries: AddictionPoint[]
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function AddictionServicesPage() {
  const [data, setData] = useState<AddictionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/addiction-services/addiction_services.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load addiction services data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const drugDeathsSeries: Series[] = [
    {
      id: 'drug-deaths',
      label: 'Drug poisoning deaths',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.drugDeaths,
      })),
    },
  ]

  const treatmentSeries: Series[] = [
    {
      id: 'treatment',
      label: 'People in drug/alcohol treatment (thousands)',
      colour: '#264653',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.treatmentThousands,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Addiction Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Addiction Services"
          question="Is Britain Treating Its Addiction Crisis?"
          finding="Drug and alcohol treatment funding fell 36% in real terms between 2013 and 2020, contributing to 4,907 drug poisoning deaths in 2022 &mdash; the highest recorded rate in Europe &mdash; while 289,000 people remain in treatment, down from 311,000 a decade ago."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has a drug and alcohol crisis that is, by several measures, the worst in Europe. The Office for National Statistics recorded 4,907 drug poisoning deaths in England and Wales in 2022 &mdash; the highest annual total since records began, and a rate per million population that substantially exceeds that of any other large European nation. The crisis is concentrated in Scotland, which has the highest drug death rate in Europe by an extreme margin, but England and Wales&apos;s own figures have risen 46% since 2012. The driving forces are well understood: an ageing cohort of long-term heroin and crack cocaine users with deteriorating health, the increasing adulteration of the drug supply with highly potent synthetic opioids, and a decade of cuts to the treatment services that would once have been their lifeline. Between 2013 and 2020, local authority public health budgets &mdash; which fund drug and alcohol treatment &mdash; were cut by 24% in cash terms and 36% in real terms. Treatment numbers fell from 311,000 in 2010/11 to a low of around 271,000 in 2020/21. The number of people receiving opiate substitution therapy, the single most effective intervention for reducing drug-related deaths, fell proportionately.</p>
            <p>Alcohol causes more deaths and more overall harm than all illegal drugs combined, yet receives considerably less public and political attention. NHS data indicates that alcohol-specific deaths &mdash; those where alcohol was the direct cause &mdash; reached 9,641 in England in 2022, the highest on record, following a sharp rise during the pandemic. Alcohol-related hospital admissions run at over one million per year. The economic cost of alcohol harm to the NHS, criminal justice system, and employers is estimated at &pound;27 billion annually. Despite this, fewer than one in five people with alcohol dependence receive any treatment. Alcohol brief interventions &mdash; short conversations with GPs or nurses that can reduce hazardous drinking &mdash; were identified as a cost-effective population-level tool in the 2008 National Alcohol Strategy but were never fully funded or implemented. NHS alcohol care teams, which provide specialist support within hospital settings, are present in only a minority of trusts. The treatment gap for alcohol is, if anything, wider than for drugs.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-deaths', label: 'Drug Deaths' },
          { id: 'sec-treatment', label: 'Treatment Numbers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Drug poisoning deaths"
              value="4,907"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2022 &middot; Highest ever recorded &middot; Highest rate in Europe"
              sparklineData={[3346, 3674, 3756, 4359, 4359, 2996, 4561, 4907]}
              onExpand={() => {}}
            />
            <MetricCard
              label="People in drug/alcohol treatment"
              value="289K"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="2022/23 &middot; Down from 311K in 2010/11"
              sparklineData={[311, 309, 299, 293, 289, 279, 282, 289]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Treatment funding cut (real terms)"
              value="36"
              unit="%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="2013&ndash;2020 &middot; Local authority public health"
              sparklineData={[100, 96, 92, 88, 82, 76, 70, 64]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deaths" className="mb-12">
            <LineChart
              title="Drug poisoning deaths, England and Wales, 2010&ndash;2023"
              subtitle="Registered deaths where drug poisoning was the underlying cause. Includes illicit drugs and misuse of prescribed medicines."
              series={drugDeathsSeries}
              yLabel="Deaths"
              source={{
                name: 'ONS',
                dataset: 'Deaths Related to Drug Poisoning, England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-treatment" className="mb-12">
            <LineChart
              title="People in drug and alcohol treatment, England, 2010&ndash;2023"
              subtitle="Adults in structured drug and/or alcohol treatment. Thousands. Public funding only."
              series={treatmentSeries}
              yLabel="People in treatment (thousands)"
              source={{
                name: 'OHID',
                dataset: 'National Drug Treatment Monitoring System (NDTMS)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="&pound;532M investment driving first increase in treatment numbers since 2013"
            value="10%"
            description="A &pound;532 million government investment under the 10-year drugs strategy (2021) has increased treatment numbers for the first time since 2013, with 10% more people entering treatment by 2024. The strategy also funded the rollout of naloxone &mdash; a medication that reverses opioid overdose &mdash; to community settings, with over 200,000 kits distributed to people who use drugs and their families. Drug death review panels, established from 2023, are generating systematic learning from preventable deaths in the way domestic homicide reviews have transformed understanding of intimate partner violence."
            source="Source: OHID &mdash; From Harm to Hope: 10-Year Drug Strategy, 2024 Progress Report."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Deaths Related to Drug Poisoning in England and Wales. Annual publication based on registered deaths where drug poisoning was the underlying cause. Data by substance, age, sex, and geography.</p>
            <p>OHID / NDTMS &mdash; Adult Drug and Alcohol Statistics from the National Drug Treatment Monitoring System. Annual data on adults receiving structured treatment for drug and/or alcohol misuse in publicly funded services in England.</p>
            <p>OHID / NHS England &mdash; Local Authority Public Health Allocations. Annual data on public health grant payments to local authorities, including the substance misuse component. Real-terms figures adjusted to 2020/21 prices using GDP deflator.</p>
            <p>Drug poisoning deaths are based on death registration year; complex cases involving inquest may be registered 12&ndash;18 months after death. Treatment numbers cover structured treatment only, excluding brief interventions, harm reduction services, and mutual aid. Data covers England and Wales (deaths) and England only (treatment).</p>
          </div>
        </section>
      </main>
    </>
  )
}
