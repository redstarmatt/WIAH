'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Justice', dataset: 'Proven Reoffending Statistics', url: 'https://www.gov.uk/government/collections/proven-reoffending-statistics', date: '2024' },
  { num: 2, name: 'HMPPS', dataset: 'Prison Discharge Rules — Discharge Grant', date: '2023' },
  { num: 3, name: 'HMPPS', dataset: 'Prison Population Data — Accommodation on Release', url: 'https://www.gov.uk/government/statistics/prison-population-figures-2024', date: '2024' },
  { num: 4, name: 'Prison Reform Trust', dataset: 'Bromley Briefings Prison Factfile', url: 'https://prisonreformtrust.org.uk/publication/bromley-briefings-prison-factfile/', date: '2024' },
];

// -- Types ------------------------------------------------------------------

interface PrisonReentrySupportData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    reoffendingPct: number
    dischargeGrantGBP: number
    noAccommodationPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PrisonReentrySupportPage() {
  const [data, setData] = useState<PrisonReentrySupportData | null>(null)

  useEffect(() => {
    fetch('/data/prison-reentry-support/prison_reentry_support.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const reentrySeries: Series[] = data
    ? [
        {
          id: 'reoffending',
          label: 'Reoffending within 1 year (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.reoffendingPct,
          })),
        },
        {
          id: 'noAccommodation',
          label: 'Released with no accommodation (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.noAccommodationPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Prison Reentry Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Reentry Support"
          question="What support do people get when they leave prison?"
          finding="46% of adults reoffend within one year of release. Those released with less than £50 are nearly twice as likely to reoffend."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Every year around 55,000 adults are released from prison in England and Wales.<Cite nums={1} /> Nearly half will commit a proven further offence within twelve months — a rate that has barely shifted over the past decade, hovering between 44% and 47%.<Cite nums={1} /> The discharge grant — the lump sum given to people leaving prison with no other financial support — has remained at £46 since 2008, losing around a third of its real value to inflation.<Cite nums={2} /> Fifteen per cent of people are still released without settled housing confirmed.<Cite nums={3} /> Research consistently shows accommodation insecurity is the single strongest predictor of reoffending, and that the first 24–72 hours after release are the highest risk period — a window the current system does almost nothing to support.<Cite nums={4} /></p>
            <p>The conditions that drive reoffending are being reproduced at release rather than addressed during sentence. People who secure employment after release reoffend at roughly half the rate of those without work, yet employer attitudes and DBS check requirements make job search extremely difficult.<Cite nums={4} /> The period immediately after release is also a high-risk time for drug overdose, as opioid tolerance drops during custody.<Cite nums={4} /> These are known, solvable problems; what has been missing is the political will to fund the answer at scale, for a population with limited political voice.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Reoffending Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Reoffending within 1 year"
              value="46%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Unchanged for a decade"
              sparklineData={[46, 47, 47, 46, 46, 44, 45, 46, 46]}
              href="#sec-chart"source="Ministry of Justice · Proven Reoffending Statistics"
            />
            <MetricCard
              label="Discharge grant"
              value="£46"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="Unchanged since 2008"
              sparklineData={[46, 46, 46, 46, 46, 46, 46, 46, 46]}
              href="#sec-chart"source="HMPPS · Prison Discharge Rules"
            />
            <MetricCard
              label="Released with no accommodation"
              value="15%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 11% in 2015"
              sparklineData={[11, 12, 12, 12, 13, 14, 14, 15, 15]}
              href="#sec-chart"source="HMPPS · Prison Population Data"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Reoffending rates post-release, 2015–2023"
              subtitle="Proven reoffending within one year of release and percentage released without settled accommodation, England &amp; Wales."
              series={reentrySeries}
              yLabel="Percentage (%)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Proven Reoffending Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice — Proven Reoffending Statistics. Annual data on reoffending within one year. gov.uk/government/collections/proven-reoffending-statistics</p>
            <p>HMPPS — Prison Population Data. Monthly statistics. gov.uk/government/statistics/prison-population-figures-2024</p>
            <p>Prison Reform Trust — Bromley Briefings Prison Factfile. Annual factfile on the prison population. prisonreformtrust.org.uk/publication/bromley-briefings-prison-factfile/</p>
            <p>Proven reoffending is defined as a caution or conviction in the 12 months following release, excluding reoffences from the index period. Discharge grant figure is the standard rate for adult prisoners with no other financial support. Accommodation figure is recorded at point of release. Data covers England and Wales.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
