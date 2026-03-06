'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface CareWorkerWagesData {
  medianHourlyPay: Array<{ year: number; pay: number }>
  vacancyRate: Array<{ year: number; percent: number }>
  turnoverRate: Array<{ year: number; percent: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function CareWorkerWagesPage() {
  const [data, setData] = useState<CareWorkerWagesData | null>(null)

  useEffect(() => {
    fetch('/data/care-worker-wages/care_worker_wages.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const wageSeries: Series[] = data
    ? [{
        id: 'median-pay',
        label: 'Median hourly pay (£)',
        colour: '#E63946',
        data: data.medianHourlyPay.map(d => ({
          date: yearToDate(d.year),
          value: d.pay,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Care Worker Wages" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Worker Wages"
          question="How much do people caring for your relatives actually earn?"
          finding="The median care worker earns &pound;10.66 an hour &mdash; below the Real Living Wage of &pound;12.00 and far below comparable NHS roles. There are 152,000 vacancies in adult social care, and annual turnover is 28% &mdash; meaning a new workforce every 3&ndash;4 years."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The median hourly rate for adult social care workers in England was &pound;10.66 in 2023 &mdash; below the Real Living Wage of &pound;12.00 and significantly below the NHS Band 2 rate of &pound;12.45 for comparable healthcare support roles. The vacancy rate stood at 9.9% (152,000 unfilled posts), down from a record 10.6% in 2022 but still far above the pre-pandemic 6.3%. Annual staff turnover is 28.3%, meaning the entire workforce is effectively replaced every three and a half years. International recruitment &mdash; expanded through the health and social care visa from 2022 &mdash; has provided a short-term stopgap but does not address the domestic supply problem. Research by ADASS, the King&apos;s Fund, and Skills for Care consistently identifies three requirements for meaningful change: a pay floor closing the gap with NHS equivalents (estimated at &pound;1.2bn per year), reform of zero-hours contracts, and investment in career progression routes.</p>
            <p>The human consequences of this workforce crisis fall hardest on those who depend on care. A 28% turnover rate is incompatible with continuity of care, which is a recognised quality indicator &mdash; particularly for people with dementia who can be distressed by unfamiliar carers. Homecare workers are the most exposed: travelling between clients on zero-hours contracts, often without pay for travel time, and with the least job security in the sector. The structural cause is clear: the pay gap between independent sector social care (fragmented, locally contracted) and NHS employment (national wage scale, trade union representation) means workers move to better-paid alternatives whenever they become available, and the sector bears the cost.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-wages', label: 'Pay Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Median care worker hourly pay"
              value="&pound;10.66"
              unit="/hr"
              direction="up"
              polarity="up-is-good"
              changeText="Still below Real Living Wage (&pound;12.00) &middot; NHS Band 2 equivalent gets &pound;12.45"
              sparklineData={[7.42, 7.91, 9.12, 9.50, 10.08, 10.66]}
              source="Skills for Care Workforce Intelligence &middot; 2023"
              href="#sec-wages"/>
            <MetricCard
              label="Adult social care vacancy rate"
              value="9.9"
              unit="%"
              direction="down"
              polarity="up-is-bad"
              changeText="152,000 vacancies &middot; down from 10.6% peak in 2022"
              sparklineData={[6.3, 6.4, 9.5, 10.6, 9.9]}
              source="Skills for Care &middot; 2023"
              href="#sec-wages"/>
            <MetricCard
              label="Annual staff turnover rate"
              value="28.3"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Means entire workforce replaced every 3.5 years &middot; continuity impossible"
              sparklineData={[30.8, 28.5, 29.1, 28.9, 28.3]}
              source="Skills for Care Workforce Intelligence &middot; 2023"
              href="#sec-wages"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-wages" className="mb-12">
            <LineChart
              title="Median hourly pay for adult social care workers, England, 2015&ndash;2023"
              subtitle="Median hourly pay for direct care roles in the independent sector. Excludes local authority employees."
              series={wageSeries}
              yLabel="&pound; per hour"
              source={{
                name: 'Skills for Care',
                dataset: 'Adult Social Care Workforce Data Set — annual report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Skills for Care &mdash; The State of the Adult Social Care Sector and Workforce in England. Annual report drawing on the Adult Social Care Workforce Data Set, covering approximately 25,000 organisations. Available at skillsforcare.org.uk.</p>
            <p>ADASS &mdash; Spring and Autumn Survey data on vacancy rates and workforce pressure. Available at adass.org.uk.</p>
            <p>NHS Agenda for Change Pay Scales. Published pay rates for NHS employees. Band 2 covers healthcare support workers in direct care roles. Available at nhsemployers.org.</p>
            <p>Median pay figures are for directly employed care workers in independent sector roles and exclude management and non-care functions. The Real Living Wage is set annually by the Living Wage Foundation based on cost of living research. Vacancy rate is calculated as unfilled posts as a proportion of all posts (filled and unfilled).</p>
          </div>
        </section>
      </main>
    </>
  )
}
