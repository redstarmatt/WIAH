'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface PrisonerRecallRow {
  year: number
  recalledPrisoners?: number
  recallAsPctPrisonPop?: number
}

interface PrisonerRecallData {
  topic: string
  lastUpdated: string
  timeSeries: PrisonerRecallRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PrisonerRecallPage() {
  const [data, setData] = useState<PrisonerRecallData | null>(null)

  useEffect(() => {
    fetch('/data/prisoner-recall/prisoner_recall.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const recallSeries: Series[] = data
    ? [
        {
          id: 'recalledPrisoners',
          label: 'Recalled prisoners',
          colour: '#6B7280',
          data: data.timeSeries
            .filter(d => d.recalledPrisoners !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.recalledPrisoners!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Prisoner Recall" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prisoner Recall"
          question="How Many People Are Being Sent Back to Prison?"
          finding="14,000 prisoners are recalled to custody at any given time — making recall one of the fastest-growing drivers of the prison population crisis."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Recalled prisoners — those returned to custody after breaching licence conditions — numbered around 7,400 in custody in 2015. By 2024 that figure had nearly doubled to 14,200, representing around 12% of the total prison population. Licence conditions have become more numerous and more prescriptive; overburdened probation officers initiate recall as a risk management tool when contact is lost; and a shortage of approved premises means some recalls are triggered by failure to find housing rather than by breaching behaviour. Each recalled prisoner consumes a prison place for an average of around four months — the equivalent of several medium-sized prisons occupied by people whose recall may have been avoidable.</p>
            <p>IPP (Imprisonment for Public Protection) sentences, abolished in 2012 but still affecting around 1,700 prisoners sentenced before abolition, add a particularly acute dimension: recalled IPP prisoners return to an indeterminate sentence with no automatic release point. The interaction with the court backlog creates a perverse dynamic — courts cannot sentence because prisons are full; prisons are partly full because recalled licence-breakers are occupying places. Reconviction rates among recalled and re-released prisoners are not significantly lower than among those not recalled, suggesting that automatic recall disrupts employment, housing, and family relationships without proportionate protective benefit.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Recall Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Recalled prisoners"
              value="14,200"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+92% since 2015 · recall now 12% of prison population"
              sparklineData={[7400, 8100, 8900, 9800, 10600, 9800, 11200, 12600, 14000, 14200]}
              href="#sec-chart"source="HMPPS · Offender Management Statistics 2024"
            />
            <MetricCard
              label="Post-sentence recall growth"
              value="+87%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 2015 · new IPP recall orders driving surge"
              sparklineData={[100, 109, 120, 132, 143, 132, 151, 170, 189, 187]}
              href="#sec-chart"source="Ministry of Justice · Prison Population Statistics 2024"
            />
            <MetricCard
              label="Avg recall duration"
              value="4 months"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="growing in-custody time · prison places consumed"
              sparklineData={[2.8, 2.9, 3.0, 3.2, 3.4, 3.5, 3.7, 3.9, 4.1, 4.0]}
              href="#sec-chart"source="MoJ · Offender Management Statistics Quarterly 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Prisoners in custody due to recall, 2015–2024"
              subtitle="Number of people recalled to prison under licence conditions. England and Wales. Snapshot count at end of each year."
              series={recallSeries}
              yLabel="Recalled prisoners"
              source={{
                name: 'HMPPS / Ministry of Justice',
                dataset: 'Offender Management Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice / HMPPS — Offender Management Statistics Quarterly. Published quarterly with annual bulletins. gov.uk/government/collections/offender-management-statistics-quarterly</p>
            <p>Ministry of Justice — Prison Population Statistics. Monthly and quarterly population tables by sentence type. gov.uk/government/collections/prison-population-statistics</p>
            <p>Recalled prisoner count is the snapshot count of prisoners held in custody whose most recent reason for custody is recall under licence. Includes standard determinate sentence recalls, IPP recalls, and extended determinate sentence recalls. Average duration calculated from HMPPS time-in-custody data for recall completions in each calendar year.</p>
          </div>
        </section>
      </main>
    </>
  )
}
