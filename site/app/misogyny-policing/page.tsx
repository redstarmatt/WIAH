'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface MisogynyPolicingData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    reportsK: number
    chargeRatePct: number
    caseReachingCourtPct: number
    monthsToTrialAvg: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function MisogynyPolicingPage() {
  const [data, setData] = useState<MisogynyPolicingData | null>(null)

  useEffect(() => {
    fetch('/data/misogyny-policing/misogyny_policing.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const prosecutionSeries: Series[] = data
    ? [
        {
          id: 'reports',
          label: 'Rape reports (thousands)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.reportsK,
          })),
        },
        {
          id: 'chargeRate',
          label: 'Charge rate (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.chargeRatePct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Violence Against Women" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Violence Against Women"
          question="How well does the criminal justice system respond to violence against women?"
          finding="The charge rate for rape in England and Wales is just 3.3%, meaning fewer than 1 in 30 reported rapes results in a charge."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The rape charge rate in England and Wales fell from 6.2% in 2015 to 3.3% in 2023, even as the number of reports more than doubled from around 34,000 to over 72,000 annually. For every 30 women who reported a rape, only one saw a charge brought. Many cases close before charge because complainants withdraw &mdash; the investigation process is frequently experienced as traumatic and protracted &mdash; with the average time from report to first Crown Court hearing reaching 42 months in 2023. HMICFRS inspections have found that some forces pursue early closure before investigations are complete and make disproportionate demands for complainants&apos; mobile phone data, deterring reporting. Operation Soteria, embedding CPS prosecutors in joint investigation teams focused on suspect behaviour rather than complainant credibility, has shown modest early improvements in charge rates.</p>
            <p>Cases that reach court face further attrition. Conviction rates in tried rape cases run at around 68%, below the overall Crown Court conviction rate of approximately 80%, with rape myths &mdash; false beliefs about how genuine victims behave &mdash; continuing to influence jury outcomes despite judge-directed education. The system&apos;s failures fall almost entirely on women: disproportionately those who are young, those who know their attacker (the majority of rape cases), and those in communities with historically fraught relationships with police who are least likely to report at all.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Prosecution Outcomes' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rape charge rate"
              value="3.3%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Down from 6.2% in 2015 — fewer than 1 in 30 reports"
              sparklineData={[6.2, 5.7, 5.3, 4.8, 4.4, 3.9, 3.6, 3.4, 3.3]}
              href="#sec-chart"source="Crown Prosecution Service &middot; VAWG report"
            />
            <MetricCard
              label="Cases reaching court"
              value="6%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Of reported rapes result in a Crown Court hearing"
              sparklineData={[9.1, 8.8, 8.4, 7.9, 7.3, 6.8, 6.4, 6.2, 6.0]}
              href="#sec-chart"source="Crown Prosecution Service &middot; VAWG report"
            />
            <MetricCard
              label="Average time from report to trial"
              value="42 months"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 29 months in 2015"
              sparklineData={[29, 31, 33, 35, 36, 38, 40, 41, 42]}
              href="#sec-chart"source="HMCTS &middot; Criminal court statistics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Rape prosecution outcomes, 2015&ndash;2024"
              subtitle="Total rape reports (thousands) and charge rate as a percentage of recorded offences, England and Wales."
              series={prosecutionSeries}
              yLabel="Reports (k) / charge rate (%)"
              source={{
                name: 'CPS / ONS / Home Office',
                dataset: 'VAWG report; Sexual offences; Police recorded crime',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Crown Prosecution Service &mdash; Violence against women and girls report. Published annually. cps.gov.uk/publication/cps-violence-against-women-and-girls-report</p>
            <p>ONS &mdash; Sexual offences in England and Wales. Published annually. ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/sexualoffencesinenglandandwales/latest</p>
            <p>Rape Crisis England &amp; Wales &mdash; Statistics and data. rapecrisis.org.uk/get-informed/statistics-sexual-violence/</p>
            <p>Home Office &mdash; Police recorded sexual offences. gov.uk/government/statistics/police-recorded-crime-open-data-tables</p>
            <p>Reports are police recorded rape offences. Charge rate is charges as a proportion of recorded offences. Cases reaching court is the proportion of recorded offences resulting in a Crown Court hearing. Months to trial is from offence date to first Crown Court listing. Rape is severely under-reported; approximately 1 in 6 rapes are estimated to be reported to police.</p>
          </div>
        </section>
      </main>
    </>
  )
}
