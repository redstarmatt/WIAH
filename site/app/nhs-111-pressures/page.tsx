'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface Nhs111PressuresData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    callsM: number
    abandonedPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function Nhs111PressuresPage() {
  const [data, setData] = useState<Nhs111PressuresData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-111-pressures/nhs_111_pressures.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const callsSeries: Series[] = data
    ? [
        {
          id: 'calls',
          label: 'Total calls (millions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.callsM,
          })),
        },
        {
          id: 'abandoned',
          label: 'Abandoned calls (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.abandonedPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="NHS 111 Pressures" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS 111 Pressures"
          question="Is NHS 111 Actually Working?"
          finding="26 million calls a year, 1 in 7 abandoned &mdash; NHS 111 is overwhelmed as it absorbs demand from A&amp;E and GP services."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS 111 was launched in 2013 as a single point of access for non-emergency medical advice, replacing the fragmented NHS Direct telephone service and local out-of-hours providers. The theory was straightforward: a nationally consistent, algorithmically guided triage service would direct patients to the right part of the system &mdash; GP, pharmacy, urgent treatment centre, or A&amp;E &mdash; reducing unnecessary emergency department attendances and ensuring people got appropriate care faster. In 2015 the service received 12.1 million calls. By 2023 that had reached 26.3 million, a rise of 117% in eight years.</p>
            <p>The surge in demand is not simply a product of the service becoming more popular. It reflects a structural shift in where patients can turn for help. As GP practices close and appointment availability tightens, NHS 111 has become the first port of call for a growing share of conditions that would previously have been handled in primary care. A&amp;E waiting time targets were abandoned in 2020, further nudging patients towards 111 as an alternative. The service is catching an overflow it was not designed to absorb at this scale, and the strain is visible in the abandonment rate: in 2015, 8.2% of callers hung up before being answered. By 2023 that had risen to 15.2% &mdash; one in seven people giving up before anyone picks up.</p>
            <p>The abandonment rate matters because these are not people choosing to try another service. NHS 111 data consistently shows that a significant proportion of callers who abandon the call make no subsequent contact with the health system, at least not that day. For some this means the condition resolves. For others, symptoms progress and they present later at A&amp;E in a more acute state. The 111 Clinical Advisor model, introduced progressively from 2019, routes higher-risk callers to nurses and paramedics rather than non-clinical call handlers, improving safety for those who get through. But it also increases average call handling time, which reduces throughput and contributes to the queue that drives abandonment.</p>
            <p>Around 8% of NHS 111 calls result in a recommendation to attend A&amp;E. This figure has been broadly stable but represents a meaningful number: 8% of 26 million calls is over 2 million referrals to emergency departments annually, layered on top of walk-in and self-referred A&amp;E demand. The integrated urgent care model &mdash; which embeds 111 call handlers alongside out-of-hours GP services and urgent treatment centres &mdash; has shown promise in reducing inappropriate A&amp;E referrals where it has been fully implemented. But rollout has been uneven, with significant regional variation in the degree to which 111 and in-person urgent care are genuinely integrated rather than notionally co-located.</p>
            <p>Workforce is the underlying constraint. NHS 111 relies on a large volume of call handlers working to algorithmic decision support tools, supplemented by a smaller number of clinical advisors. Retention in call centre roles within health settings is historically poor, and the emotional labour of handling medical anxiety calls, including calls involving self-harm and mental health crisis, contributes to burnout. The NHS Long Term Plan set out ambitions for NHS 111 to evolve into a broader digital triage and booking platform, allowing patients to be directly booked into GP appointments or urgent treatment slots rather than simply advised. Progress on that ambition has been slower than planned, partly because it requires GP system integration that is still incomplete.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Call Volume' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Calls 2023"
              value="26.3m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+117% since 2015"
              sparklineData={[12.1, 13.4, 14.8, 16.2, 17.9, 22.4, 21.8, 24.1, 26.3]}
              onExpand={() => {}}
              source="NHS England &middot; NHS 111 Statistical Release"
            />
            <MetricCard
              label="Abandoned calls"
              value="15.2%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="1 in 7 hang up before answered"
              sparklineData={[8.2, 7.9, 8.5, 9.1, 9.8, 14.2, 12.6, 13.8, 15.2]}
              onExpand={() => {}}
              source="NHS England &middot; NHS 111 Statistical Release"
            />
            <MetricCard
              label="Referred to ED"
              value="8%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="111 calls escalating to A&amp;E attendance"
              sparklineData={[6, 6, 7, 7, 7, 8, 8, 8, 8]}
              onExpand={() => {}}
              source="NHS England &middot; NHS 111 Statistical Release"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS 111 call volume and abandonment rate, 2015&ndash;2023"
              subtitle="Total calls received (millions) and percentage of calls abandoned before being answered."
              series={callsSeries}
              yLabel="Value"
              source={{
                name: 'NHS England',
                dataset: 'NHS 111 Statistical Release',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; NHS 111 Statistical Release. Published monthly. england.nhs.uk/statistics/statistical-work-areas/urgent-and-emergency-care/nhs-111-minimum-data-set/</p>
            <p>Call volume figures are total calls offered to the service. Abandoned calls are those where the caller disconnected before speaking to a call handler or clinical advisor. ED referral rate is calls resulting in an &apos;Attend A&amp;E&apos; disposition as a proportion of total calls completed. Data for 2015&ndash;2019 sourced from published NHS 111 MDS annual summaries; 2020 onwards from monthly data releases aggregated to annual totals.</p>
          </div>
        </section>
      </main>
    </>
  )
}
