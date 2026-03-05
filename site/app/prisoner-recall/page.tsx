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
          finding="14,000 prisoners are recalled to custody at any given time &mdash; making recall one of the fastest-growing drivers of the prison population crisis."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Prisoner recall has become one of the most significant and least discussed drivers of England and Wales&apos;s prison population crisis. When a prisoner is released on licence, they remain subject to conditions &mdash; typically including reporting to a probation officer, residing at an approved address, and not committing further offences. If those conditions are breached, the Parole Board can direct recall to custody. In 2015, around 7,400 prisoners were in custody as a result of recall. By 2024, that number had nearly doubled to 14,200 &mdash; representing around 12% of the total prison population.</p>
            <p>The growth in recalls reflects several compounding factors. Licence conditions have become more numerous and more prescriptive. Probation caseloads have grown as the service was reunified following the partial privatisation under the Transforming Rehabilitation programme, and overburdened probation officers are more likely to initiate recall as a risk management tool when they lose contact with an offender or become concerned about behaviour. The shortage of approved premises &mdash; residential accommodation for released prisoners who cannot return to previous addresses &mdash; means that some recalls are triggered not by breaching behaviour but by the failure to find suitable housing, leaving prisoners technically in breach of their licence conditions through no personal fault.</p>
            <p>Indeterminate sentences for public protection, abolished in 2012 but still affecting around 1,700 prisoners who were sentenced before abolition and have never been released, contribute a particularly acute element of the recall problem. IPP prisoners who are released and then recalled return to an indeterminate sentence with no automatic release point. The number of IPP prisoners in recall has grown consistently, as the parole system struggles to manage a cohort whose sentence structure was designed to prevent release and who face an additional layer of stigma and supervision that makes sustained community reintegration difficult.</p>
            <p>Each recalled prisoner consumes a prison place for an average of around four months. With 14,200 recalled prisoners in custody, recall accounts for the equivalent of several medium-sized prisons &mdash; capacity that is unavailable for those who have received custodial sentences through the courts. The interaction with the court backlog creates a perverse dynamic: courts cannot sentence because prisons are full; prisons are partly full because recalled licence-breakers are occupying places; and the inability to move people efficiently through the system increases the risk of further breaches and further recalls.</p>
            <p>Reform options are not simple. Reducing recall rates by applying licence conditions less rigidly risks releasing people who would have committed further offences. But the current system is not demonstrably effective at preventing reoffending: reconviction rates among recalled and re-released prisoners are not significantly lower than among those released and not recalled, suggesting that the incapacitation effect of recall is partially offset by the disruption it causes to employment, housing, and family relationships. Greater investment in approved premises, probation support, and community-based breach responses &mdash; rather than automatic recall &mdash; has the strongest evidence base for reducing both recall rates and long-term reoffending.</p>
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
              changeText="+92% since 2015 &middot; recall now 12% of prison population"
              sparklineData={[7400, 8100, 8900, 9800, 10600, 9800, 11200, 12600, 14000, 14200]}
              onExpand={() => {}}
              source="HMPPS &middot; Offender Management Statistics 2024"
            />
            <MetricCard
              label="Post-sentence recall growth"
              value="+87%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 2015 &middot; new IPP recall orders driving surge"
              sparklineData={[100, 109, 120, 132, 143, 132, 151, 170, 189, 187]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; Prison Population Statistics 2024"
            />
            <MetricCard
              label="Avg recall duration"
              value="4 months"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="growing in-custody time &middot; prison places consumed"
              sparklineData={[2.8, 2.9, 3.0, 3.2, 3.4, 3.5, 3.7, 3.9, 4.1, 4.0]}
              onExpand={() => {}}
              source="MoJ &middot; Offender Management Statistics Quarterly 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Prisoners in custody due to recall, 2015&ndash;2024"
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
            <p>Ministry of Justice / HMPPS &mdash; Offender Management Statistics Quarterly. Published quarterly with annual bulletins. gov.uk/government/collections/offender-management-statistics-quarterly</p>
            <p>Ministry of Justice &mdash; Prison Population Statistics. Monthly and quarterly population tables by sentence type. gov.uk/government/collections/prison-population-statistics</p>
            <p>Recalled prisoner count is the snapshot count of prisoners held in custody whose most recent reason for custody is recall under licence. Includes standard determinate sentence recalls, IPP recalls, and extended determinate sentence recalls. Average duration calculated from HMPPS time-in-custody data for recall completions in each calendar year.</p>
          </div>
        </section>
      </main>
    </>
  )
}
