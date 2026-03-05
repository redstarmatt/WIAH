'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface CarerMentalHealthData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    poorMentalHealthPct: number
    accessingSupportPct: number
    quitWorkPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CarerMentalHealthPage() {
  const [data, setData] = useState<CarerMentalHealthData | null>(null)

  useEffect(() => {
    fetch('/data/carer-mental-health/carer_mental_health.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const wellbeingSeries: Series[] = data
    ? [
        {
          id: 'poorMentalHealth',
          label: 'Carers with poor mental health (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.poorMentalHealthPct,
          })),
        },
        {
          id: 'accessingSupport',
          label: 'Accessing professional support (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.accessingSupportPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Carer Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Carer Mental Health"
          question="What happens to carers&apos; mental health?"
          finding="72% of unpaid carers report mental health problems, yet just 1 in 4 receives any professional support."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s 5.8 million unpaid carers provide care worth an estimated &pound;162 billion per year &mdash; a hidden pillar of the social care and NHS system. Yet the mental health toll on carers has worsened progressively: 72% now report that caring has had a negative impact on their mental health, up from 61% in 2015. Despite this, only 24% have accessed professional support &mdash; down from 34% in 2015. The 2014 Care Act introduced a right to a carer&apos;s assessment, but fewer than 40% of eligible carers have ever had one, and the proportion receiving any support following assessment has fallen as local authority budgets contracted. The NHS Long Term Plan committed to improved carer identification in primary care, but implementation has been inconsistent.</p>
            <p>The consequences extend well beyond individual wellbeing. Carer breakdown is one of the leading triggers for emergency social care admissions and unplanned hospital stays &mdash; a crisis that costs far more to respond to than early preventive support would have. One in seven carers has left full-time employment because of caring responsibilities, with mental health cited as the primary reason in most cases. Women are disproportionately represented among those leaving work, compounding existing gender inequalities in lifetime earnings and pension savings. The gap between the scale of carer mental health need and available support is unlikely to close without structural funding and clearer accountability.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Wellbeing Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Carers with mental health problems"
              value="72%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+11pp since 2015"
              sparklineData={[61, 63, 64, 65, 66, 69, 70, 71, 72]}
              onExpand={() => {}}
              source="Carers UK &middot; State of Caring Survey"
            />
            <MetricCard
              label="Accessing professional support"
              value="24%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 34% in 2015"
              sparklineData={[34, 32, 31, 30, 28, 26, 25, 25, 24]}
              onExpand={() => {}}
              source="Carers UK &middot; State of Caring Survey"
            />
            <MetricCard
              label="Full-time workers who quit to care"
              value="1 in 7"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Mental health primary reason"
              sparklineData={[11, 11, 12, 12, 13, 14, 14, 14, 14]}
              onExpand={() => {}}
              source="Carers UK &middot; State of Caring Survey"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Carer wellbeing decline, 2015&ndash;2024"
              subtitle="Percentage of unpaid carers reporting poor mental health and accessing professional support, England."
              series={wellbeingSeries}
              yLabel="Percentage (%)"
              source={{
                name: 'Carers UK',
                dataset: 'State of Caring Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Carers UK &mdash; State of Caring Survey. Annual survey of unpaid carers in England, Wales, and Scotland. carersuk.org/research-and-policy/state-of-caring-report/</p>
            <p>NHS Digital &mdash; Adult Psychiatric Morbidity Survey. Population-level mental health prevalence data. digital.nhs.uk/data-and-information/publications/statistical/adult-psychiatric-morbidity-survey</p>
            <p>DWP &mdash; Carer&apos;s Allowance Statistics. Quarterly claimant count data used to estimate carer population. gov.uk/government/collections/carers-allowance-statistics</p>
            <p>Mental health figures are self-reported by survey respondents. Professional support access includes any contact with a GP, IAPT service, or community mental health team in the past twelve months. Survey methodology changed slightly in 2020; pre/post figures are broadly comparable.</p>
          </div>
        </section>
      </main>
    </>
  )
}
