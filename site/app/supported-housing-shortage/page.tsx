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

interface TimeSeriesPoint {
  year: number
  supportedHousingUnits: number
  waitingList: number
}

interface SupportedHousingShortageData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SupportedHousinShortage() {
  const [data, setData] = useState<SupportedHousingShortageData | null>(null)

  useEffect(() => {
    fetch('/data/supported-housing-shortage/supported_housing_shortage.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const unitsSeries: Series[] = data
    ? [{
        id: 'units',
        label: 'Supported housing units',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.supportedHousingUnits,
        })),
      }]
    : []

  const waitingSeries: Series[] = data
    ? [{
        id: 'waiting',
        label: 'Waiting list',
        colour: '#F4A261',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.waitingList,
        })),
      }]
    : []

  const combinedSeries: Series[] = [...unitsSeries, ...waitingSeries]

  return (
    <>
      <TopicNav topic="Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Is There Enough Housing for Vulnerable People?"
          finding="There is a shortfall of 45,000 supported housing units, leaving tens of thousands of vulnerable adults in inappropriate settings."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Supported housing stock has contracted from approximately 458,000 units in 2016 to 448,000 today — a loss of 10,000 units at exactly the moment when an ageing population is driving demand upward. The waiting list has more than doubled over the same period, from 32,000 to 58,000 people. Local housing allowance rates have repeatedly failed to keep pace with actual rents, making it financially unviable to build or maintain supported units in high-cost areas; the specialised construction requirements — en-suite, wider corridors, staff facilities — add further cost. The Supported Housing (Regulatory Oversight) Act 2023 improved quality standards but did nothing to increase supply.</p>
            <p>The shortage cascades across other public services. NHS England estimates around 13,000 people are stuck in hospital because no appropriate supported housing exists for them — at over £300 per unnecessary hospital day. Adult social care routinely places people with learning disabilities in residential care settings at greater cost and worse outcomes because local supported housing is unavailable. The burden falls on older people with complex needs, young adults with learning disabilities, and those leaving mental health inpatient care — the groups with the fewest options when the system fails.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Supply vs Demand' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Supported housing units"
              value="448k"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="declining while need rises · 10k lost since 2016"
              sparklineData={[458000, 456000, 454000, 452000, 451000, 450000, 449000, 448000]}
              href="#sec-chart"source="DLUHC · Supported Housing Review 2024"
            />
            <MetricCard
              label="Waiting list"
              value="58k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+81% in 7 years · for older and disabled people"
              sparklineData={[32000, 36000, 40000, 44000, 48000, 52000, 56000, 58000]}
              href="#sec-chart"source="DLUHC · Supported Housing Review 2024"
            />
            <MetricCard
              label="Shortfall"
              value="45,000 units"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="gap between need and supply · growing annually"
              sparklineData={[20000, 24000, 28000, 32000, 36000, 40000, 43000, 45000]}
              href="#sec-chart"source="Housing LIN · Supported Housing Deficit Report 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Supported housing: units and waiting list, 2016–2023"
              subtitle="Units in supply (red) contracting while waiting list (amber) grows. England."
              series={combinedSeries}
              yLabel="Count"
              source={{
                name: 'DLUHC / Housing LIN',
                dataset: 'Supported Housing Review',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DLUHC — Supported Housing Review. gov.uk/government/publications/supported-housing-review</p>
            <p>Housing LIN — Supported Housing Deficit Report 2024. housinglin.org.uk</p>
            <p>NHS England — Delayed Transfers of Care statistics. england.nhs.uk/statistics/statistical-work-areas/delayed-transfers-of-care/</p>
            <p>Supported housing defined as housing where housing, care, and support are provided together to help vulnerable people live as independently as possible. Includes sheltered housing, extra care, and specialist supported accommodation.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
