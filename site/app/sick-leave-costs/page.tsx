'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface SickLeaveRow {
  year: number
  daysLostM: number
  costBn: number
  longTermSickM?: number
}

interface SickLeaveCostsData {
  topic: string
  lastUpdated: string
  timeSeries: SickLeaveRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SickLeaveCostsPage() {
  const [data, setData] = useState<SickLeaveCostsData | null>(null)

  useEffect(() => {
    fetch('/data/sick-leave-costs/sick_leave_costs.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const daysLostSeries: Series[] = data
    ? [
        {
          id: 'daysLost',
          label: 'Working days lost (millions)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.daysLostM,
          })),
        },
        {
          id: 'longTermSick',
          label: 'Long-term sick (millions)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.longTermSickM !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.longTermSickM as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Sick Leave Costs" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sick Leave Costs"
          question="How Much Is Illness Costing the Economy?"
          finding="185 million working days were lost to sickness absence in 2023, costing the economy an estimated &pound;32 billion &mdash; driven by a surge in long-term sick."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Sickness absence from work has reached its highest level in a decade. In 2023, British workers lost an estimated 185 million working days &mdash; a 35% increase on 2015 and far above the pre-pandemic baseline. The economic cost is estimated at &pound;32 billion annually, combining direct employer costs (sick pay, reduced productivity, cover costs) and broader impacts on output. This is a macroeconomic problem of the first order, touching fiscal sustainability through increased benefit spending as well as individual employer performance.</p>
            <p>The single most significant driver of the recent surge is mental health. Mental health conditions &mdash; particularly anxiety and depression &mdash; now account for approximately 17% of all working days lost to sickness absence, up from around 11% in 2015. Musculoskeletal conditions remain the largest single category at around 22%, but the rapid growth of mental health-related absence reflects a workforce under sustained stress from economic pressures, job insecurity and, in some sectors, pandemic-related trauma that has persisted years beyond the acute crisis.</p>
            <p>The most economically significant trend within sickness absence is the growth of long-term sickness inactivity. The number of working-age people classified as economically inactive due to long-term sickness rose from around 1.9 million in 2015 to 2.8 million in 2023 &mdash; a 47% increase. This is qualitatively different from short-term absence: people who leave the labour market entirely due to health conditions represent a permanent reduction in labour supply that employers, the Treasury and the welfare system must accommodate.</p>
            <p>Long COVID has added a medically distinct and numerically significant category of long-term sick. An estimated 200,000&ndash;400,000 people report that long COVID substantially limits their day-to-day activities, with a meaningful proportion unable to work. This sits on top of pre-existing trends in mental health-related inactivity and suggests that the long-term sick figures will remain elevated even as acute pandemic effects recede.</p>
            <p>Employer responses have varied. Some larger organisations have invested in occupational health, employee assistance programmes and flexible return-to-work pathways. But occupational health access is deeply unequal: large employers in white-collar sectors are far more likely to offer structured support than SMEs or those in manual sectors. The government&apos;s occupational health consultation and proposed reforms to statutory sick pay aim to address some of these structural gaps, but the distance between policy intent and workforce outcomes remains large.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Days Lost' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Working days lost (2023)"
              value="185m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="35% more than 2015 &middot; mental health biggest cause"
              sparklineData={[137, 141, 141, 141, 146, 130, 155, 176, 185]}
              onExpand={() => {}}
              source="ONS / CIPD &middot; 2023"
            />
            <MetricCard
              label="Economic cost"
              value="&pound;32bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from &pound;24bn in 2015 &middot; productivity + sick pay"
              sparklineData={[24, 25, 25, 25, 26, 23, 27, 30, 32]}
              onExpand={() => {}}
              source="Deloitte / ONS &middot; 2023"
            />
            <MetricCard
              label="Long-term sick (economically inactive)"
              value="2.8m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1.9m in 2015 &middot; mental health surge"
              sparklineData={[1.9, 1.9, 1.9, 1.9, 1.9, 2.0, 2.2, 2.5, 2.8]}
              onExpand={() => {}}
              source="ONS Labour Force Survey &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Working days lost to sickness absence and long-term sick, 2015&ndash;2023"
              subtitle="Days lost = all sickness absence from employment. Long-term sick = economically inactive working-age people citing long-term illness."
              series={daysLostSeries}
              yLabel="Millions"
              source={{
                name: 'ONS / CIPD',
                dataset: 'Sickness Absence in the UK / Labour Force Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Sickness Absence in the UK Labour Market. Published annually. ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket</p>
            <p>ONS &mdash; Labour Force Survey (LFS). Quarterly. ons.gov.uk/surveys/informationforhouseholdsandindividuals/householdandindividualsurveys/labourforcesurvey</p>
            <p>CIPD &mdash; Health and Wellbeing at Work survey. Published annually. cipd.org/uk/knowledge/reports/health-wellbeing-work</p>
            <p>Deloitte &mdash; Mental health and employers. Cost estimates. deloitte.com/uk/en/pages/consulting/articles/mental-health-and-employers.html</p>
            <p>Days lost figures cover all employed workers. Long-term sick figures are ONS LFS estimates of economically inactive working-age people (16&ndash;64) who give long-term sickness as their main reason for inactivity. Economic cost estimates combine employer direct costs and output loss.</p>
          </div>
        </section>
      </main>
    </>
  )
}
