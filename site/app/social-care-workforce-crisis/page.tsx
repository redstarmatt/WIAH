'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  vacancyRate?: number
  turnoverPct?: number
  internationalWorkers?: number
}

interface SocialCareWorkforceData {
  timeSeries: TimeSeries[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SocialCareWorkforceCrisisPage() {
  const [data, setData] = useState<SocialCareWorkforceData | null>(null)

  useEffect(() => {
    fetch('/data/social-care-workforce-crisis/social_care_workforce_crisis.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const workforceSeries: Series[] = data
    ? [
        {
          id: 'vacancy-rate',
          label: 'Vacancy rate (%)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.vacancyRate !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.vacancyRate as number })),
        },
        {
          id: 'turnover',
          label: 'Turnover rate (%)',
          colour: '#F4A261',
          data: data.timeSeries
            .filter(d => d.turnoverPct !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.turnoverPct as number })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Social Care Workforce" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care Workforce Crisis"
          question="Are There Enough Social Care Workers?"
          finding="The social care sector has 152,000 vacancies &mdash; a 9.9% vacancy rate that leaves vulnerable people without the support they need."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&rsquo;s social care workforce numbers approximately 1.52 million people, making it one of the largest employment sectors in the country. They work in care homes, domiciliary care, day services, and supported living, providing personal care, support, and companionship to older people and adults with disabilities. The sector is characterised by low pay, high turnover, and chronic vacancy rates &mdash; structural features that have worsened over a decade of local authority funding constraint that has suppressed the rates paid to care providers and, in turn, to care workers.</p>
            <p>The vacancy rate peaked at 10.6% in 2022 &mdash; a record high and more than double the economy-wide vacancy rate at the time. The introduction of international recruitment routes for care workers in 2022 brought around 70,000 overseas workers into the sector by 2023, partially stabilising the position. The vacancy rate fell to 9.9% in 2023, but this is still roughly twice the pre-pandemic level and represents around 152,000 unfilled posts. Every vacancy represents a person whose care needs are unmet or are met by overstretched existing workers: delayed visits, shortened care calls, missed medication, and degraded relationships.</p>
            <p>The turnover rate &mdash; around 28% per year &mdash; is a different kind of problem. High turnover means that the workforce is constantly cycling through new joiners with limited experience, that relationships between workers and the people they support are repeatedly disrupted, and that investment in training and development is repeatedly lost. Social care is a relational occupation: the quality of care provided by someone who has worked with a service user for years is qualitatively different from that provided by someone new. A sector with 28% annual turnover cannot consistently deliver the kind of continuity that vulnerable people need.</p>
            <p>Pay is the primary driver of both vacancy rates and turnover. The median hourly rate for a care worker in the independent sector is around &pound;11 per hour &mdash; above the National Living Wage but below the Real Living Wage, and significantly below comparable NHS roles. Skills for Care data consistently finds that pay is the primary reason workers leave social care, and that pay improvement is the primary factor in their decision to stay or join. The sector cannot raise wages without increases in local authority commissioning rates, which depend on council budgets, which depend on government grant settlements &mdash; a chain of constraints that has been repeatedly identified but not resolved.</p>
            <p>The ethical dimensions of international recruitment deserve attention. The care sector&rsquo;s dependence on overseas workers has grown rapidly, and there are documented concerns about recruitment practices: fees charged to workers in source countries, employment terms that differ from advertisements, and sponsor licence holders who use the tied nature of sponsored visas to impose poor conditions. The Home Office has taken action against a number of sponsors, and the sector regulator Skills for Care has guidance on ethical recruitment. But the structural incentive to recruit overseas at lower cost than domestic workforce development creates ongoing risks. The government&rsquo;s decision to restrict dependant visas for care workers in 2024 reduced some of these risks but also tightened the supply of an already scarce workforce.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Vacancy &amp; Turnover' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Vacancy rate (2023)"
              value="9.9%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slight improvement from 10.6% peak &middot; 152k vacancies"
              sparklineData={[5.8, 6.2, 6.8, 7.1, 7.8, 7.0, 9.5, 10.6, 9.9]}
              onExpand={() => {}}
              source="Skills for Care &middot; State of the Workforce 2023"
            />
            <MetricCard
              label="Annual turnover rate"
              value="28.3%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="nearly 1 in 3 workers leaves annually &middot; workforce instability"
              sparklineData={[27.0, 27.4, 27.6, 27.8, 28.1, 27.5, 28.0, 28.5, 28.3]}
              onExpand={() => {}}
              source="Skills for Care &middot; State of the Workforce 2023"
            />
            <MetricCard
              label="International recruitment"
              value="70k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="overseas workers filling gap &middot; ethical concerns remain"
              sparklineData={[25000, 26000, 27000, 28000, 30000, 30000, 40000, 70000, 70000]}
              onExpand={() => {}}
              source="Home Office / Skills for Care &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Social care vacancy and turnover rates, 2015&ndash;2023"
              subtitle="Vacancy rate (% of posts unfilled) and annual staff turnover rate (%) in the adult social care sector in England."
              series={workforceSeries}
              yLabel="Rate (%)"
              source={{
                name: 'Skills for Care',
                dataset: 'State of the Adult Social Care Sector and Workforce in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Skills for Care &mdash; State of the Adult Social Care Sector and Workforce in England. Published annually. skillsforcare.org.uk/adult-social-care-workforce-data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx</p>
            <p>Home Office &mdash; Immigration statistics: work. gov.uk/government/collections/immigration-statistics-quarterly-release</p>
            <p>NHS Benchmarking Network &mdash; Social care workforce comparisons. nhsbenchmarking.nhs.uk</p>
            <p>Vacancy rate calculated as number of vacant posts as percentage of total posts (filled and vacant). Turnover rate is the number of leavers in the year as percentage of average employment. International recruitment figures from Home Office Health and Care visa data. Figures cover independent sector adult social care providers in England; NHS-provided adult social care excluded.</p>
          </div>
        </section>
      </main>
    </>
  )
}
