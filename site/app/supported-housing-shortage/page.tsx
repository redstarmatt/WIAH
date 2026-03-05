'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>Supported housing &mdash; accommodation that comes with care, support, or supervision for people who cannot live independently &mdash; is among the most critical and least visible parts of Britain&apos;s welfare system. It serves older people with care needs, people with physical disabilities, people with learning disabilities, those with mental health conditions, and people leaving homelessness or domestic abuse situations. Without it, many thousands of vulnerable adults would be either in hospital, in residential care homes, or on the street. And the supply is falling while demand rises.</p>
            <p>Since 2016, supported housing stock has contracted from approximately 458,000 units to 448,000 &mdash; a loss of 10,000 units at exactly the moment when an ageing population is driving demand upward. The waiting list for supported housing has more than doubled over the same period, from 32,000 to 58,000 people. Behind each of those 58,000 cases is a person &mdash; often an older person with complex needs, a young adult with a learning disability, or someone leaving mental health inpatient care &mdash; waiting for accommodation that does not exist in sufficient quantity.</p>
            <p>The shortage has several root causes. Local housing allowance rates &mdash; the benefit that funds the housing costs of lower-income tenants &mdash; have repeatedly failed to keep pace with actual rents, making it financially unviable for providers to build or maintain supported units in high-cost areas. Registered social landlords, who provide the majority of supported housing, face the same cost pressures as all social housing providers: inflation in construction and maintenance costs, reduced grant funding, and competing demands on their development programmes. The specialised nature of supported housing &mdash; which typically requires en-suite accommodation, wider corridors, staff facilities, and proximity to transport &mdash; makes it significantly more expensive to build than general needs housing.</p>
            <p>The consequences of the shortage play out across other public services. NHS England has estimated that around 13,000 people are stuck in hospital because there is no appropriate supported housing for them to move into &mdash; so-called &apos;delayed transfers of care&apos;. Each additional hospital day for a patient who is medically fit to leave costs over &pound;300. Adult social care services routinely place people with learning disabilities in residential care settings because supported housing in their local area is unavailable, at greater cost and with worse outcomes for the individual. The financial case for investment in supported housing is unambiguous; the political and funding mechanisms to enable it remain blocked.</p>
            <p>The government&apos;s Supported Housing (Regulatory Oversight) Act 2023 introduced new licensing requirements and quality standards, addressing a genuine problem with unscrupulous providers but doing nothing to increase supply. What is needed is a combination of increased capital grant funding for specialist housing providers, reform of the housing benefit system to make supported housing economically viable in all areas, and a long-term strategic programme linked to the NHS Long Term Plan and social care reform. Without supply-side action, the waiting list will continue to grow and the most vulnerable people in Britain will continue to be housed inappropriately &mdash; or not at all.</p>
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
              changeText="declining while need rises &middot; 10k lost since 2016"
              sparklineData={[458000, 456000, 454000, 452000, 451000, 450000, 449000, 448000]}
              onExpand={() => {}}
              source="DLUHC &middot; Supported Housing Review 2024"
            />
            <MetricCard
              label="Waiting list"
              value="58k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+81% in 7 years &middot; for older and disabled people"
              sparklineData={[32000, 36000, 40000, 44000, 48000, 52000, 56000, 58000]}
              onExpand={() => {}}
              source="DLUHC &middot; Supported Housing Review 2024"
            />
            <MetricCard
              label="Shortfall"
              value="45,000 units"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="gap between need and supply &middot; growing annually"
              sparklineData={[20000, 24000, 28000, 32000, 36000, 40000, 43000, 45000]}
              onExpand={() => {}}
              source="Housing LIN &middot; Supported Housing Deficit Report 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Supported housing: units and waiting list, 2016&ndash;2023"
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
            <p>DLUHC &mdash; Supported Housing Review. gov.uk/government/publications/supported-housing-review</p>
            <p>Housing LIN &mdash; Supported Housing Deficit Report 2024. housinglin.org.uk</p>
            <p>NHS England &mdash; Delayed Transfers of Care statistics. england.nhs.uk/statistics/statistical-work-areas/delayed-transfers-of-care/</p>
            <p>Supported housing defined as housing where housing, care, and support are provided together to help vulnerable people live as independently as possible. Includes sheltered housing, extra care, and specialist supported accommodation.</p>
          </div>
        </section>
      </main>
    </>
  )
}
