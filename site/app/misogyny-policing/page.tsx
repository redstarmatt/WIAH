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
            <p>The rate at which rape reports result in a criminal charge in England and Wales has fallen dramatically over the past decade, despite a period of significant increase in the number of reports. In 2015, the charge rate was approximately 6.2% — already far below levels that might constitute meaningful accountability. By 2023 it had fallen to 3.3%, meaning that for every 30 women who reported a rape to police, only one saw a charge brought. The number of reports over the same period has more than doubled, from around 34,000 to over 72,000 annually, reflecting increased willingness to report following the #MeToo movement and improved police communication. The system has not kept pace.</p>
            <p>Attrition in rape cases occurs at multiple stages. Many cases are closed before charge because the complainant withdraws — research consistently shows that the investigation process itself is experienced as traumatic, re-traumatising, and protracted, leading many survivors to disengage before a decision is reached. The average time from report to first Crown Court hearing was 42 months in 2023, meaning that a survivor who reported a rape in early 2020 might still be waiting for trial in mid-2023. This delay has been identified as one of the most significant drivers of complainant withdrawal and poor jury outcomes.</p>
            <p>Police investigation quality has been a persistent concern. HMICFRS inspections have found that some forces fail to investigate rape allegations adequately, pursuing early closure on grounds of lack of evidence before investigations have been completed, and failing to make use of all available digital and forensic evidence. The use of Achieving Best Evidence interviews — the specialist technique for taking statements from vulnerable witnesses including rape survivors — has been inconsistent. Digital material requests from complainants, including access to years of mobile phone data, have been identified by the End-to-End Rape Review as invasive and disproportionate, deterring reporting and complainant engagement.</p>
            <p>The Crown Prosecution Service has taken steps to address the charge rate decline. Operation Soteria, a joint Home Office and CPS programme, involves embedding police and CPS prosecutors in joint investigation teams and shifting the investigative focus to the behaviour of the suspect rather than the credibility of the complainant. Early results from Soteria pilots have shown modest improvements in charge rates. The CPS Violence Against Women and Girls Report acknowledged the scale of the challenge and set out commitments to increase charging and improve engagement with complainants at the pre-charge stage.</p>
            <p>Cases that do reach court face additional challenges. Rape myths — false beliefs about how genuine victims behave, what they wear, whether they reported immediately — continue to influence jury outcomes despite judge-directed education. Conviction rates among tried cases are around 68%, lower than the overall Crown Court conviction rate of approximately 80%, suggesting that acquittal by jury in rape cases is more common than in other offences. Expert witnesses on trauma responses and rape myths are used by prosecution but their effectiveness is variable. The joint enterprise of increasing report-to-charge rates, reducing the time cases take, and improving courtroom outcomes represents one of the most complex challenges in the criminal justice system.</p>
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
              onExpand={() => {}}
              source="Crown Prosecution Service &middot; VAWG report"
            />
            <MetricCard
              label="Cases reaching court"
              value="6%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="Of reported rapes result in a Crown Court hearing"
              sparklineData={[9.1, 8.8, 8.4, 7.9, 7.3, 6.8, 6.4, 6.2, 6.0]}
              onExpand={() => {}}
              source="Crown Prosecution Service &middot; VAWG report"
            />
            <MetricCard
              label="Average time from report to trial"
              value="42 months"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Up from 29 months in 2015"
              sparklineData={[29, 31, 33, 35, 36, 38, 40, 41, 42]}
              onExpand={() => {}}
              source="HMCTS &middot; Criminal court statistics"
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
