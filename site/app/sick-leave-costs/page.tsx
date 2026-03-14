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
  { num: 1, name: 'ONS', dataset: 'Sickness Absence in the UK Labour Market', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket', date: '2023', note: '185 million working days lost; 35% increase on 2015; mental health conditions 17% of all days lost (up from 11%)' },
  { num: 2, name: 'ONS', dataset: 'Labour Force Survey — Economic Inactivity', url: 'https://www.ons.gov.uk/surveys/informationforhouseholdsandindividuals/householdandindividualsurveys/labourforcesurvey', date: '2023', note: '2.8 million long-term sick (up from 1.9M in 2015; +47%); 200-400K substantially limited by long COVID' },
  { num: 3, name: 'Deloitte', dataset: 'Mental Health and Employers', url: 'https://www.deloitte.com/uk/en/pages/consulting/articles/mental-health-and-employers.html', date: '2023', note: '£32 billion annual economic cost; combines employer direct costs and output loss' },
];

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
          finding="185 million working days were lost to sickness absence in 2023, costing the economy an estimated £32 billion — driven by a surge in long-term sick."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>British workers lost an estimated 185 million working days to sickness absence in 2023 — a 35% increase on 2015 and the highest level in a decade — at an economic cost of £32 billion annually.<Cite nums={[1, 3]} /> Mental health conditions (anxiety and depression) now account for approximately 17% of all days lost, up from 11% in 2015, with pandemic-related trauma persisting well beyond the acute crisis.<Cite nums={1} /> Musculoskeletal conditions remain the largest single category at around 22%. The most economically significant trend is the growth of long-term sickness inactivity: working-age people classified as economically inactive due to long-term sickness rose from 1.9 million in 2015 to 2.8 million in 2023 — a 47% increase — as an estimated 200,000–400,000 people are substantially limited by long COVID.<Cite nums={2} /> People who leave the labour market entirely represent a permanent reduction in labour supply, with compounded fiscal impacts as they cease paying tax and National Insurance while drawing benefits.</p>
            <p>Occupational health access is deeply unequal: large employers in white-collar sectors are far more likely to offer structured return-to-work support than SMEs or manual sector employers. Workers in low-paid, physically demanding jobs are most likely to develop health conditions and least likely to have access to the occupational health, flexible working arrangements, or statutory sick pay levels that would enable recovery and return. The government's proposed reforms to statutory sick pay aim to address some of these gaps, but the distance between policy intent and workforce outcomes remains large.</p>
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
              changeText="35% more than 2015 · mental health biggest cause"
              sparklineData={[137, 141, 141, 141, 146, 130, 155, 176, 185]}
              href="#sec-chart"source="ONS / CIPD · 2023"
            />
            <MetricCard
              label="Economic cost"
              value="£32bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £24bn in 2015 · productivity + sick pay"
              sparklineData={[24, 25, 25, 25, 26, 23, 27, 30, 32]}
              href="#sec-chart"source="Deloitte / ONS · 2023"
            />
            <MetricCard
              label="Long-term sick (economically inactive)"
              value="2.8m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1.9m in 2015 · mental health surge"
              sparklineData={[1.9, 1.9, 1.9, 1.9, 1.9, 2.0, 2.2, 2.5, 2.8]}
              href="#sec-chart"source="ONS Labour Force Survey · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Working days lost to sickness absence and long-term sick, 2015–2023"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Sickness Absence in the UK Labour Market. Published annually. ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket</p>
            <p>ONS — Labour Force Survey (LFS). Quarterly. ons.gov.uk/surveys/informationforhouseholdsandindividuals/householdandindividualsurveys/labourforcesurvey</p>
            <p>CIPD — Health and Wellbeing at Work survey. Published annually. cipd.org/uk/knowledge/reports/health-wellbeing-work</p>
            <p>Deloitte — Mental health and employers. Cost estimates. deloitte.com/uk/en/pages/consulting/articles/mental-health-and-employers.html</p>
            <p>Days lost figures cover all employed workers. Long-term sick figures are ONS LFS estimates of economically inactive working-age people (16–64) who give long-term sickness as their main reason for inactivity. Economic cost estimates combine employer direct costs and output loss.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
